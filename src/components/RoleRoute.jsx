import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { isStaff, isCustomer } from "@/lib/roles";

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
  </div>
);

// Customer portal — only role "user".
export function CustomerRoute({ redirect = "/login" }) {
  const { isAuthenticated, isLoadingAuth, authChecked, user, checkUserAuth } = useAuth();
  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);
  if (isLoadingAuth || !authChecked) return <Spinner />;
  if (!isAuthenticated) return <Navigate to={redirect} replace />;
  if (!isCustomer(user)) return <Navigate to="/admin" replace />;
  return <Outlet />;
}

// Admin dashboard — any staff role.
export function StaffRoute({ redirect = "/admin-login" }) {
  const { isAuthenticated, isLoadingAuth, authChecked, user, checkUserAuth } = useAuth();
  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);
  if (isLoadingAuth || !authChecked) return <Spinner />;
  if (!isAuthenticated) return <Navigate to={redirect} replace />;
  if (!isStaff(user)) return <Navigate to="/portal" replace />;
  return <Outlet />;
}