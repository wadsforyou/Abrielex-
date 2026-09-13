import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Noindex } from "@/components/Seo";

export default function AdminLogin() {
  const { isAuthenticated, isLoadingAuth, authChecked, user, checkUserAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    if (authChecked && isAuthenticated && user?.role === "admin") {
      window.location.replace("/admin");
    }
  }, [authChecked, isAuthenticated, user]);

  if (!authChecked || isLoadingAuth || (isAuthenticated && user?.role === "admin")) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Noindex />
      <AuthLayout
        icon={ShieldCheck}
        title="Staff & Admin Login"
        subtitle="Abrielex management dashboard"
        footer={
          <Link to="/forgot-password" className="font-medium text-muted-foreground hover:text-primary hover:underline">Forgot password?</Link>
        }
      >
      {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" required autoFocus placeholder="admin@abrielex.com"
              value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type="password" required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 pl-10" />
          </div>
        </div>
        <Button type="submit" className="h-12 w-full font-medium" disabled={loading}>
          {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in…</>) : "Log in to dashboard"}
        </Button>
      </form>
    </AuthLayout>
    </>
  );
}