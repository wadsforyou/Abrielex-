import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Plus, X, Loader2, FolderKanban } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, StatusBadge, inputClass } from "@/components/portal/ui";
import { CASE_STATUS, PRIORITY } from "@/lib/portalConfig";
import { serviceCategories } from "@/lib/siteData";
import { notify } from "@/lib/notify";

const blank = { title: "", company_id: "", company_name: "", customer_id: "", customer_name: "", service_category: serviceCategories[0]?.title || "", specific_service: "", description: "", status: "submitted", priority: "medium", assigned_staff_id: "", assigned_staff_name: "", due_date: "", internal_notes: "" };

export default function AdminCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { setCases(await base44.entities.ServiceCase.filter({}, "-created_date", 500)); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true);
    try {
      const prev = cases.find((c) => c.id === editing.id);
      const statusChanged = prev && prev.status !== editing.status;
      const payload = { ...editing };
      delete payload.created_date; delete payload.updated_date; delete payload.id; delete payload.created_by_id;
      if (editing.id) {
        await base44.entities.ServiceCase.update(editing.id, payload);
        if (statusChanged) {
          await base44.entities.CaseUpdate.create({
            case_id: editing.id, customer_id: editing.customer_id, author_name: "Abrielex",
            title: `Status updated to ${editing.status.replace(/_/g, " ")}`, body: `Your case "${editing.title}" status is now: ${editing.status.replace(/_/g, " ")}.`, internal: false, new_status: editing.status,
          });
          await notify({ event: "case_status_update", variables: { case_number: editing.title, status: editing.status.replace(/_/g, " "), client_name: editing.customer_name }, recipientUserId: editing.customer_id, recipientEmail: "", adminNotify: false });
        }
        await base44.entities.AuditLog.create({ action: "case_update", target_type: "ServiceCase", target_id: editing.id, details: `Status: ${editing.status}`, actor_name: "admin" });
      } else {
        await base44.entities.ServiceCase.create(payload);
        await base44.entities.AuditLog.create({ action: "case_create", target_type: "ServiceCase", details: editing.title, actor_name: "admin" });
      }
      setEditing(null); await load();
    } catch (e) { alert("Save failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  const filtered = cases.filter((c) => {
    const mq = !query || [c.title, c.customer_name, c.company_name, c.service_category].some((v) => String(v || "").toLowerCase().includes(query.toLowerCase()));
    const ms = !statusFilter || c.status === statusFilter;
    return mq && ms;
  });

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Cases" subtitle="Manage all service cases"
        actions={[<button key="n" onClick={() => setEditing({ ...blank })} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> New case</button>]} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cases…" className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-input bg-card px-2 text-sm"><option value="">All statuses</option>{CASE_STATUS.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}</select>
        <span className="text-xs text-muted-foreground">{filtered.length} cases</span>
      </div>

      {filtered.length === 0 ? <EmptyState icon={FolderKanban} title="No cases" message="Create a case or adjust filters." />
        : <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Assignee</th><th className="px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setEditing({ ...c })}>
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3">{c.customer_name || "—"}</td>
                  <td className="px-4 py-3 text-xs">{c.service_category}</td>
                  <td className="px-4 py-3 text-xs">{c.assigned_staff_name || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="font-serif-display text-lg font-semibold">{editing.id ? "Edit case" : "New case"}</h2><button onClick={() => setEditing(null)}><X className="h-5 w-5 text-muted-foreground" /></button></div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">Title</label><input className={inputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Customer ID</label><input className={inputClass} value={editing.customer_id} onChange={(e) => setEditing({ ...editing, customer_id: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Customer name</label><input className={inputClass} value={editing.customer_name} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Service category</label><select className={inputClass} value={editing.service_category} onChange={(e) => setEditing({ ...editing, service_category: e.target.value })}>{serviceCategories.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}</select></div>
              <div><label className="mb-1 block text-sm font-medium">Specific service</label><input className={inputClass} value={editing.specific_service} onChange={(e) => setEditing({ ...editing, specific_service: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Status</label><select className={inputClass} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>{CASE_STATUS.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}</select></div>
              <div><label className="mb-1 block text-sm font-medium">Priority</label><select className={inputClass} value={editing.priority} onChange={(e) => setEditing({ ...editing, priority: e.target.value })}>{PRIORITY.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
              <div><label className="mb-1 block text-sm font-medium">Assigned staff ID</label><input className={inputClass} value={editing.assigned_staff_id} onChange={(e) => setEditing({ ...editing, assigned_staff_id: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Assigned staff name</label><input className={inputClass} value={editing.assigned_staff_name} onChange={(e) => setEditing({ ...editing, assigned_staff_name: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Due date</label><input type="date" className={inputClass} value={editing.due_date || ""} onChange={(e) => setEditing({ ...editing, due_date: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium">Fee</label><input type="number" className={inputClass} value={editing.fee ?? ""} onChange={(e) => setEditing({ ...editing, fee: e.target.value === "" ? "" : Number(e.target.value) })} /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">Description</label><textarea rows={3} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium">Internal notes (staff only — never shown to client)</label><textarea rows={3} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={editing.internal_notes} onChange={(e) => setEditing({ ...editing, internal_notes: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setEditing(null)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Save case</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}