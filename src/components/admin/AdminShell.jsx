import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { adminNav } from "@/lib/adminNav";
import { canAccess, setRoleOverrides } from "@/lib/roles";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import NotificationBell from "@/components/admin/NotificationBell";

export default function AdminShell() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [staffRole, setStaffRole] = useState("administrator");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        if (me?.data?.staff_role) setStaffRole(me.data.staff_role);
        const sp = await base44.entities.StaffProfile.filter({ user_id: me.id });
        if (sp[0]?.is_owner || sp[0]?.staff_role === "super_admin") setStaffRole("owner");
        else if (sp[0]?.staff_role) setStaffRole(sp[0].staff_role);
        const perms = await base44.entities.RolePermission.list("-created_date", 50);
        if (perms.length) {
          const map = {};
          perms.forEach((p) => { map[p.role] = (p.sections || "").split(",").map((s) => s.trim()).filter(Boolean); });
          setRoleOverrides(map);
        }
      } catch {}
    })();
  }, []);

  function handleLogout() {
    logout(false);
    navigate("/admin-login");
  }

  const items = adminNav.filter((n) => canAccess(staffRole, n.perm));

  const Sidebar = (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <Link to="/admin" className="flex items-center">
          <span className="flex h-[45px] items-center bg-white px-2">
            <Logo variant="light" className="h-[45px]" />
          </span>
        </Link>
        <button className="lg:hidden text-slate-400" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="border-b border-white/10 px-5 py-3 text-xs">
        <div className="font-semibold uppercase tracking-wide text-slate-500">Management</div>
        <div className="mt-1 text-slate-400">Signed in as {staffRole.replace("_", " ")}</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {items.map((n) => (
          <NavLink
            key={n.to} to={n.to} end={n.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-slate-400 hover:bg-white/5 hover:text-white")
            }
          >
            <n.icon className="h-4 w-4" /> {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-4 w-4" /> View public site
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-60 lg:block">{Sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-60">{Sidebar}</div>
        </div>
      )}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <span className="font-serif-display text-sm font-semibold text-slate-800">Abrielex Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <span className="hidden text-xs text-slate-500 sm:inline">{user?.email}</span>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}