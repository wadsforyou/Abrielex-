import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Building2, X, Loader2, ArrowRight } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, StatusBadge, inputClass, Field } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { countries } from "@/lib/siteData";
import { ENTITY_TYPES } from "@/lib/portalConfig";
import { notify } from "@/lib/notify";

const blank = { name: "", entity_type: "Private Limited Company", country: "ZW", state: "", city: "", registration_number: "", tax_id: "", industry: "", status: "in_formation" };

export default function PortalCompanies() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { setCompanies(await base44.entities.Company.filter({}, "-created_date", 200)); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.name) return;
    setSaving(true);
    try {
      await base44.entities.Company.create(form);
      await notify({
        event: "service_request", variables: { company_name: form.name, client_name: user?.full_name || user?.email },
        recipientEmail: "abrielexconsultancy@gmail.com", recipientName: user?.full_name, adminNotify: true,
      });
      setForm(blank); setAdding(false); await load();
    } catch (e) { alert("Failed: " + (e.message || "")); }
    finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="My Companies" subtitle="Manage the businesses linked to your account"
        actions={[<button key="add" onClick={() => setAdding(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> Add company</button>]} />

      {companies.length === 0 ? (
        <EmptyState icon={Building2} title="No companies yet" message="Add a company to start requesting services and tracking compliance."
          action={<button onClick={() => setAdding(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Add your first company</button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <Card key={c.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary"><Building2 className="h-5 w-5" /></div>
                <StatusBadge status={c.status} />
              </div>
              <h3 className="mt-3 font-serif-display text-lg font-semibold">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.entity_type} · {c.country} · {c.city || c.state || ""}</p>
              {c.registration_number && <p className="mt-2 text-xs text-muted-foreground">Reg: {c.registration_number}</p>}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4 text-xs">
                <Link to={`/portal/cases?company=${c.id}`} className="font-medium text-primary hover:underline">Cases</Link>
                <Link to={`/portal/documents?company=${c.id}`} className="font-medium text-primary hover:underline">Documents</Link>
                <Link to={`/portal/business?company=${c.id}`} className="font-medium text-primary hover:underline">Compliance</Link>
                <Link to={`/portal/deadlines?company=${c.id}`} className="ml-auto inline-flex items-center text-primary hover:underline">View <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {adding && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif-display text-lg font-semibold">Add company</h2>
              <button onClick={() => setAdding(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Field label="Company name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Entity type"><select className={inputClass} value={form.entity_type} onChange={(e) => setForm({ ...form, entity_type: e.target.value })}>{ENTITY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
              <Field label="Country"><select className={inputClass} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>{countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</select></Field>
              <Field label="State / Province"><input className={inputClass} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></Field>
              <Field label="City"><input className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
              <Field label="Industry"><input className={inputClass} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></Field>
              <Field label="Registration number"><input className={inputClass} value={form.registration_number} onChange={(e) => setForm({ ...form, registration_number: e.target.value })} /></Field>
              <Field label="Tax ID"><input className={inputClass} value={form.tax_id} onChange={(e) => setForm({ ...form, tax_id: e.target.value })} /></Field>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setAdding(false)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Save company</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}