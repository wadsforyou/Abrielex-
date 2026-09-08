import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, FolderKanban, X, Loader2 } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, StatusBadge, inputClass, Field } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { serviceCategories } from "@/lib/siteData";
import { CASE_STATUS, PRIORITY } from "@/lib/portalConfig";
import { notify } from "@/lib/notify";

const blank = { title: "", company_id: "", service_category: serviceCategories[0]?.title || "", specific_service: "", description: "", priority: "medium" };

export default function PortalCases() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const companyFilter = params.get("company");
  const [cases, setCases] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [cs, comps] = await Promise.all([
        base44.entities.ServiceCase.filter({}, "-created_date", 200),
        base44.entities.Company.filter({}, "-created_date", 200),
      ]);
      setCases(companyFilter ? cs.filter((c) => c.company_id === companyFilter) : cs);
      setCompanies(comps);
    } catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [companyFilter]);

  async function submitRequest() {
    if (!form.title || !form.service_category) return;
    setSaving(true);
    try {
      const comp = companies.find((c) => c.id === form.company_id);
      const payload = {
        ...form,
        customer_id: user.id,
        customer_name: user?.full_name || user?.email,
        company_name: comp?.name || "",
        status: "submitted",
      };
      await base44.entities.ServiceCase.create(payload);
      await notify({
        event: "service_request",
        variables: { service_name: form.service_category, company_name: comp?.name || "", client_name: user?.full_name || user?.email },
        recipientEmail: "abrielexconsultancy@gmail.com", recipientName: user?.full_name, adminNotify: true,
      });
      setForm(blank); setRequesting(false); await load();
    } catch (e) { alert("Failed: " + (e.message || "")); }
    finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="My Services / Cases" subtitle="Request services and track progress"
        actions={[<button key="req" onClick={() => setRequesting(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> Request a service</button>]} />

      {cases.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No cases yet" message="Request a service and our team will take it from there."
          action={<button onClick={() => setRequesting(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Request a service</button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((c) => (
            <Link key={c.id} to={`/portal/cases/${c.id}`}>
              <Card className="h-full p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif-display text-base font-semibold">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.company_name || "General"} · {c.service_category}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                {c.assigned_staff_name && <p className="mt-3 text-xs text-muted-foreground">Consultant: {c.assigned_staff_name}</p>}
                {c.due_date && <p className="text-xs text-muted-foreground">Due: {new Date(c.due_date).toLocaleDateString()}</p>}
              </Card>
            </Link>
          ))}
        </div>
      )}

      {requesting && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif-display text-lg font-semibold">Request a service</h2>
              <button onClick={() => setRequesting(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid gap-4 p-5">
              <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Register a new Pvt Ltd" /></Field>
              <Field label="Company (optional)"><select className={inputClass} value={form.company_id} onChange={(e) => setForm({ ...form, company_id: e.target.value })}><option value="">— General —</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
              <Field label="Service category"><select className={inputClass} value={form.service_category} onChange={(e) => setForm({ ...form, service_category: e.target.value })}>{serviceCategories.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}</select></Field>
              <Field label="Specific service"><input className={inputClass} value={form.specific_service} onChange={(e) => setForm({ ...form, specific_service: e.target.value })} placeholder="e.g. PRAZ Vendor Registration" /></Field>
              <Field label="Priority"><select className={inputClass} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>{PRIORITY.map((p) => <option key={p} value={p}>{p}</option>)}</select></Field>
              <Field label="Describe what you need"><textarea rows={4} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setRequesting(false)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={submitRequest} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Submit request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}