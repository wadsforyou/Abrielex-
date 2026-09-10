import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, Mail, MessageCircle, Bell } from "lucide-react";
import { PageHeader, Card, Loader, inputClass } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";

export default function AdminSettings() {
  const [s, setS] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { (async () => {
    try {
      const list = await adminList("NotificationSetting", "-created_date", 50);
      let rec = list.find((r) => r.key === "global") || list[0];
      if (!rec) {
        const created = await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "NotificationSetting", mutation: "create", data: { key: "global", email_enabled: true, whatsapp_enabled: false, inapp_enabled: true, sender_name: "Abrielex Business Consultancy", whatsapp_configured: false, reminder_levels: "30,14,7,1", admin_notify_email: "wads.foryou@gmail.com" }, auditDetails: "Global notification settings created" });
        rec = created.result;
      }
      setS(rec);
    } catch {} finally { setLoading(false); }
  })(); }, []);

  async function save() {
    setSaving(true);
    try { await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "NotificationSetting", mutation: "update", id: s.id, data: s, auditDetails: "Global notification settings updated" }); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    catch (e) { alert("Failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  if (loading || !s) return <Loader />;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Notification channels, email & WhatsApp configuration" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 font-serif-display text-lg font-semibold"><Bell className="h-5 w-5 text-primary" /> Channels</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> Email notifications</span><input type="checkbox" checked={!!s.email_enabled} onChange={(e) => setS({ ...s, email_enabled: e.target.checked })} className="h-4 w-4" /></label>
            <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><MessageCircle className="h-4 w-4" /> WhatsApp notifications</span><input type="checkbox" checked={!!s.whatsapp_enabled} onChange={(e) => setS({ ...s, whatsapp_enabled: e.target.checked })} className="h-4 w-4" /></label>
            <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><Bell className="h-4 w-4" /> In-app notifications</span><input type="checkbox" checked={!!s.inapp_enabled} onChange={(e) => setS({ ...s, inapp_enabled: e.target.checked })} className="h-4 w-4" /></label>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium">Reminder levels (days before deadline)</label>
            <input className={inputClass} value={s.reminder_levels || ""} onChange={(e) => setS({ ...s, reminder_levels: e.target.value })} placeholder="30,14,7,1" />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 font-serif-display text-lg font-semibold"><Mail className="h-5 w-5 text-primary" /> Email configuration</h2>
          <div className="space-y-3">
            <div><label className="mb-1 block text-sm font-medium">Sender name</label><input className={inputClass} value={s.sender_name || ""} onChange={(e) => setS({ ...s, sender_name: e.target.value })} /></div>
            <div><label className="mb-1 block text-sm font-medium">Admin notifications email</label><input className={inputClass} value={s.admin_notify_email || ""} onChange={(e) => setS({ ...s, admin_notify_email: e.target.value })} /></div>
          </div>
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Email delivery uses the platform's built-in email service. To reach addresses that are not registered app users, a paid plan with a custom domain is required.
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-serif-display text-lg font-semibold"><MessageCircle className="h-5 w-5 text-primary" /> WhatsApp configuration</h2>
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={!!s.whatsapp_configured} onChange={(e) => setS({ ...s, whatsapp_configured: e.target.checked })} className="h-4 w-4" id="wa" />
            <label htmlFor="wa" className="text-sm">A WhatsApp Business API provider is connected</label>
          </div>
          <div><label className="mb-1 mt-3 block text-sm font-medium">Provider (informational)</label><input className={inputClass} value={s.whatsapp_provider || ""} onChange={(e) => setS({ ...s, whatsapp_provider: e.target.value })} placeholder="e.g. Twilio, 360dialog, Meta Cloud API" /></div>
          <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            WhatsApp automated messaging is only sent when a provider is connected and this box is checked. Until then, the system reports WhatsApp as "not configured" and never pretends a message was sent. Public-site WhatsApp buttons use the client number 071 834 6001 via wa.me links.
          </div>
        </Card>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save settings</button>
        {saved && <span className="text-sm text-emerald-600">Saved.</span>}
      </div>
    </div>
  );
}