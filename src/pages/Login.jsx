import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { safeReturnTo } from "@/lib/authReturnTo";
import { DEMO_CUSTOMER } from "@/lib/demoConfig";

function resolveReturnTo(fallback = "/portal") {
  const raw = new URLSearchParams(window.location.search).get("returnTo");
  if (!raw) return fallback;
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return fallback;
    const path = url.pathname + url.search;
    if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return fallback;
    return path;
  } catch {
    return fallback;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const returnTo = resolveReturnTo();

  async function doLogin(em, pw) {
    await base44.auth.loginViaEmailPassword(em, pw);
    window.location.href = returnTo;
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
      await doLogin(DEMO_CUSTOMER.email, DEMO_CUSTOMER.password);
    } catch (err) {
      setError(
        "Demo account isn't ready yet. Accept the invitation email sent to " +
          DEMO_CUSTOMER.email +
          " and set its password to the demo credential, then try again."
      );
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <AuthLayout
      icon={LogIn}
      title="Client Portal Login"
      subtitle="Access your Abrielex client dashboard"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
          <span className="mx-2 text-muted-foreground/40">·</span>
          <Link to="/admin-login" className="font-medium text-muted-foreground hover:text-primary hover:underline">
            Staff login
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email" type="email" autoComplete="email" autoFocus
              placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password" type="password" autoComplete="current-password"
              placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required
            />
          </div>
        </div>
        <Button type="submit" className="h-12 w-full font-medium" disabled={loading}>
          {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in…</>) : "Log in"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        type="button" variant="outline" className="h-12 w-full font-medium"
        onClick={handleDemo} disabled={demoLoading || loading}
      >
        {demoLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entering demo…</>)
          : (<><Sparkles className="mr-2 h-4 w-4 text-primary" /> Demo Mode</>)}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Explore the client portal instantly with a demo account.
      </p>
    </AuthLayout>
  );
}