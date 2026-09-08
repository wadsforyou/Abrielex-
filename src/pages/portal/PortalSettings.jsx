import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, Bell, Mail, MessageCircle } from "lucide-react";
import { PageHeader, Card, Loader, inputClass } from "@/components/portal/ui";

export default function PortalSettings() {
  const [prefs, setPrefs] = useState({ email_notify: true, whatsapp_notify: false, inapp_notify: true, reminder_days: "30,14,7,1" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      const me = await base44.auth.me();
      const p = me.data?.notify_prefs;
      if (p) setPrefs(p);
    } catch {} finally { setLoading(false); }
  })(); }, []);

  async function save() {
    setSaving(true);
    try { await base44.auth.updateMe({ notify_prefs: prefs }); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    catch (e) { alert("Failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your notification preferences" />
      <Card className="max-w-xl p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif-display text-lg font-semibold"><Bell className="h-5 w-5 text-primary" /> Notification channels</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> Email notifications</span><input type="checkbox" checked={prefs.email_notify} onChange={(e) => setPrefs({ ...prefs, email_notify: e.target.checked })} className="h-4 w-4" /></label>
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><MessageCircle className="h-4 w-4" /> WhatsApp notifications</span><input type="checkbox" checked={prefs.whatsapp_notify} onChange={(e) => setPrefs({ ...prefs, whatsapp_notify: e.target.checked })} className="h-4 w-4" /></label>
          <label className="flex items-center justify-between rounded-md border border-border p-3"><span className="flex items-center gap-2 text-sm"><Bell className="h-4 w-4" /> In-app notifications</span><input type="checkbox" checked={prefs.inapp_notify} onChange={(e) => setPrefs({ ...prefs, inapp_notify: e.target.checked })} className="h-4 w-4" /></label>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium">Reminder days (comma-separated)</label>
          <input className={inputClass} value={prefs.reminder_days} onChange={(e) => setPrefs({ ...prefs, reminder_days: e.target.value })} />
          <p className="mt-1 text-xs text-muted-foreground">Days before a deadline/renewal to receive reminders.</p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save preferences</button>
          {saved && <span className="text-sm text-emerald-600">Saved.</span>}
        </div>
      </Card>
    </div>
  );
}