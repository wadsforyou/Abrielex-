import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, User } from "lucide-react";
import { PageHeader, Card, Loader, inputClass, Field } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { countries } from "@/lib/siteData";
import { CLIENT_TYPES, ENTITY_TYPES } from "@/lib/portalConfig";

export default function PortalProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => { (async () => {
    try {
      const me = await base44.auth.me();
      setForm({
        full_name: me.full_name || "", phone: me.data?.phone || "", whatsapp: me.data?.whatsapp || "",
        country: me.data?.country || "ZW", state: me.data?.state || "", city: me.data?.city || "",
        client_type: me.data?.client_type || "Individual", entity_type: me.data?.entity_type || "Private Limited Company",
        company_name: me.data?.company_name || "",
      });
    } catch {} finally { setLoading(false); }
  })(); }, []);

  async function save() {
    setSaving(true);
    try {
      await base44.auth.updateMe({
        full_name: form.full_name,
        phone: form.phone, whatsapp: form.whatsapp, country: form.country, state: form.state, city: form.city,
        client_type: form.client_type, entity_type: form.entity_type, company_name: form.company_name,
      });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e) { alert("Failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your personal and business details" />
      <Card className="max-w-2xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white"><User className="h-6 w-6" /></div>
          <div><div className="font-serif-display text-lg font-semibold">{user?.email}</div><div className="text-xs text-muted-foreground">Client account</div></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name"><input className={inputClass} value={form.full_name || ""} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></Field>
          <Field label="Phone"><input className={inputClass} value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="WhatsApp"><input className={inputClass} value={form.whatsapp || ""} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></Field>
          <Field label="Country"><select className={inputClass} value={form.country || "ZW"} onChange={(e) => setForm({ ...form, country: e.target.value })}>{countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</select></Field>
          <Field label="State / Province"><input className={inputClass} value={form.state || ""} onChange={(e) => setForm({ ...form, state: e.target.value })} /></Field>
          <Field label="City"><input className={inputClass} value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          <Field label="Client type"><select className={inputClass} value={form.client_type || "Individual"} onChange={(e) => setForm({ ...form, client_type: e.target.value })}>{CLIENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field label="Entity type"><select className={inputClass} value={form.entity_type || "Private Limited Company"} onChange={(e) => setForm({ ...form, entity_type: e.target.value })}>{ENTITY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field label="Company name (if applicable)"><input className={inputClass} value={form.company_name || ""} onChange={(e) => setForm({ ...form, company_name: e.target.value })} /></Field>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save profile</button>
          {saved && <span className="text-sm text-emerald-600">Saved.</span>}
        </div>
      </Card>
    </div>
  );
}