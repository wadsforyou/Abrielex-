import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "@/components/ui/use-toast";
import { Noindex } from "@/components/Seo";
import { countries } from "@/lib/siteData";
import { CLIENT_TYPES, ENTITY_TYPES } from "@/lib/portalConfig";

const empty = {
  full_name: "", email: "", password: "", confirmPassword: "",
  phone: "", whatsapp: "", country: "ZW", state: "", city: "",
  client_type: "Individual", entity_type: "Private Limited Company", company_name: "",
};

export default function Register() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      await base44.auth.register({ email: form.email, password: form.password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email: form.email, otpCode });
      if (result?.access_token) base44.auth.setToken(result.access_token);
      // Persist extended profile on the user record.
      try {
        await base44.auth.updateMe({
          full_name: form.full_name,
          phone: form.phone,
          whatsapp: form.whatsapp,
          country: form.country,
          state: form.state,
          city: form.city,
          client_type: form.client_type,
          entity_type: form.entity_type,
          company_name: form.company_name,
        });
      } catch { /* profile can be completed later in Settings */ }
      // This app has no customer portal route, so /portal 404s. Send dashboard
      // users (role "admin") to the dashboard and everyone else to the public
      // home page, matching how the route guards behave.
      let destination = "/";
      try {
        const me = await base44.auth.me();
        if (me?.role === "admin") destination = "/admin";
      } catch { /* fall back to the public home page */ }
      window.location.href = destination;
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    try {
      await base44.auth.resendOtp(form.email);
      toast({ title: "Code sent", description: "Check your email for the new code." });
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  }

  if (showOtp) {
    return (
      <AuthLayout icon={Mail} title="Verify your email" subtitle={`We sent a code to ${form.email}`}>
        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
        <div className="mb-6 flex justify-center">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (<InputOTPSlot key={i} index={i} />))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="h-12 w-full font-medium" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
          {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying…</>) : "Verify & continue"}
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button onClick={handleResend} className="font-medium text-primary hover:underline">Resend</button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create your client account"
      subtitle="Register to manage your businesses, cases and documents"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </>
      }
    >
      {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" required value={form.full_name} onChange={set("full_name")} className="h-11" placeholder="Jane Moyo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" required value={form.email} onChange={set("email")} className="h-11 pl-9" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" required value={form.phone} onChange={set("phone")} className="h-11" placeholder="071 234 5678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" value={form.whatsapp} onChange={set("whatsapp")} className="h-11" placeholder="071 234 5678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select id="country" value={form.country} onChange={set("country")} className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm">
              {countries.map((c) => (<option key={c.code} value={c.code}>{c.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State / Province / Region</Label>
            <Input id="state" value={form.state} onChange={set("state")} className="h-11" placeholder="Matabeleland" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={set("city")} className="h-11" placeholder="Bulawayo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_type">Client type</Label>
            <select id="client_type" value={form.client_type} onChange={set("client_type")} className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm">
              {CLIENT_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="entity_type">Entity type</Label>
            <select id="entity_type" value={form.entity_type} onChange={set("entity_type")} className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm">
              {ENTITY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company_name">Company name (if applicable)</Label>
            <Input id="company_name" value={form.company_name} onChange={set("company_name")} className="h-11" placeholder="Acme Pvt Ltd" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required value={form.password} onChange={set("password")} className="h-11 pl-9" placeholder="••••••••" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirm" type="password" required value={form.confirmPassword} onChange={set("confirmPassword")} className="h-11 pl-9" placeholder="••••••••" />
            </div>
          </div>
        </div>
        <Button type="submit" className="h-12 w-full font-medium" disabled={loading}>
          {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…</>) : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}