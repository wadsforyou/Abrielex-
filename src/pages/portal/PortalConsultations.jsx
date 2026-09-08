import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CalendarClock, Plus, X, Loader2 } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState, inputClass, Field } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { useCountry } from "@/lib/CountryContext";
import { countries } from "@/lib/siteData";
import { notify } from "@/lib/notify";

const blank = { consultation_type: "General", preferred_date: "", preferred_time: "09:00", reason: "" };

export default function PortalConsultations() {
  const { user } = useAuth();
  const { country } = useCountry();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { setItems(await base44.entities.ConsultationBooking.filter({}, "-preferred_date", 100)); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function book() {
    if (!form.preferred_date) return;
    setSaving(true);
    try {
      await base44.entities.ConsultationBooking.create({
        ...form, customer_id: user.id, country: country?.code || "",
        name: user?.full_name || "", email: user?.email || "", phone: user?.data?.phone || "", whatsapp: user?.data?.whatsapp || "",
        status: "pending",
      });
      await notify({ event: "consultation_booking", variables: { client_name: user?.full_name || user?.email, consultation_date: form.preferred_date }, recipientEmail: "abrielexconsultancy@gmail.com", adminNotify: true });
      setForm(blank); setBooking(false); await load();
    } catch (e) { alert("Failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Consultations" subtitle="Book and manage consultations with Abrielex"
        actions={[<button key="b" onClick={() => setBooking(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> Book consultation</button>]} />
      {items.length === 0 ? <EmptyState icon={CalendarClock} title="No consultations" message="Book a consultation with our team." action={<button onClick={() => setBooking(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Book now</button>} />
        : <Card className="divide-y divide-border">
          {items.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4">
              <div><div className="text-sm font-medium">{c.consultation_type}</div><div className="text-xs text-muted-foreground">{new Date(c.preferred_date).toLocaleDateString()} · {c.preferred_time}</div>{c.reason && <div className="text-xs text-muted-foreground">{c.reason}</div>}</div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </Card>}

      {booking && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-md rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="font-serif-display text-lg font-semibold">Book consultation</h2><button onClick={() => setBooking(false)}><X className="h-5 w-5 text-muted-foreground" /></button></div>
            <div className="grid gap-4 p-5">
              <Field label="Type"><select className={inputClass} value={form.consultation_type} onChange={(e) => setForm({ ...form, consultation_type: e.target.value })}><option>General</option><option>Registration</option><option>Tax</option><option>Compliance</option><option>Bookkeeping</option></select></Field>
              <Field label="Preferred date"><input type="date" className={inputClass} value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} /></Field>
              <Field label="Preferred time"><input type="time" className={inputClass} value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} /></Field>
              <Field label="Reason"><textarea rows={3} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></Field>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setBooking(false)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={book} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}