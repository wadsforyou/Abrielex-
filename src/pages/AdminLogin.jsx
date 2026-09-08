import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { DEMO_ADMIN } from "@/lib/demoConfig";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  async function doLogin(em, pw) {
    await base44.auth.loginViaEmailPassword(em, pw);
    window.location.href = "/admin";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await doLogin(email, password);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemo() {
    setError("");
    setDemoLoading(true);
    try {
      await doLogin(DEMO_ADMIN.email, DEMO_ADMIN.password);
    } catch (err) {
      setError(
        "Demo admin isn't ready yet. Accept the invitation email sent to " +
          DEMO_ADMIN.email +
          " and set its password to the demo credential, then try again."
      );
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Staff & Admin Login"
      subtitle="Abrielex management dashboard"
      footer={
        <>
          <Link to="/login" className="font-medium text-muted-foreground hover:text-primary hover:underline">Client login</Link>
          <span className="mx-2 text-muted-foreground/40">·</span>
          <Link to="/forgot-password" className="font-medium text-muted-foreground hover:text-primary hover:underline">Forgot password?</Link>
        </>
      }
    >
      {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" required autoFocus placeholder="staff@abrielex.com"
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

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="h-12 w-full font-medium" onClick={handleDemo} disabled={demoLoading || loading}>
        {demoLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entering demo…</>)
          : (<><Sparkles className="mr-2 h-4 w-4 text-primary" /> Admin Demo Mode</>)}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Explore the management dashboard instantly with a demo admin account.
      </p>
    </AuthLayout>
  );
}