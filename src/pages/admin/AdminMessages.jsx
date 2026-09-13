import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Mail, Phone, Check, Clock, RefreshCw } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, StatusBadge, inputClass } from "@/components/portal/ui";
import { logActivity } from "@/lib/audit";
import { adminList } from "@/lib/adminData";

const STATUSES = ["new", "read", "replied", "closed"];

export default function AdminMessages() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await adminList("ContactMessage", "-created_date", 200));
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Unable to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const active = rows.find((r) => r.id === activeId) || null;

  async function openMessage(row) {
    setActiveId(row.id);
    if (row.status === "new" || !row.status) {
      try {
        await base44.functions.invoke("adminControl", {
          action: "entity_mutation", entity: "ContactMessage", mutation: "update",
          id: row.id, data: { ...row, status: "read" }, auditDetails: `Contact message ${row.id} viewed`,
        });
        setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status: "read" } : r)));
      } catch { /* non-blocking */ }
    }
  }

  async function setStatus(row, status) {
    setSaving(true);
    try {
      await base44.functions.invoke("adminControl", {
        action: "entity_mutation", entity: "ContactMessage", mutation: "update",
        id: row.id, data: { ...row, status }, auditDetails: `Contact message ${row.id} marked ${status}`,
      });
      await logActivity({ action: "message_status_changed", targetType: "ContactMessage", targetId: row.id, details: `Status set to ${status}` });
      setRows((list) => list.map((r) => (r.id === row.id ? { ...r, status } : r)));
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Update failed");
    } finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Contact Us submissions from the public website"
        actions={[<button key="r" onClick={load} className="inline-flex items-center gap-2 rounded-md border-border px-3 py-2 text-sm font-medium hover:bg-muted"><RefreshCw className="h-4 w-4" /> Refresh</button>]}
      />
      {error && <div className="mb-4 rounded-md border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      {rows.length === 0 ? (
        <EmptyState icon={Mail} title="No messages" message="Contact Us submissions from the website will appear here." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="divide-y divide-border lg:col-span-1">
            {rows.map((m) => (
              <button key={m.id} onClick={() => openMessage(m)} className={`block w-full p-4 text-left hover:bg-muted/30 ${activeId === m.id ? "bg-accent/40" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{m.name || m.email || m.id}</span>
                  {(m.status === "new" || !m.status) && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <div className="truncate text-xs text-muted-foreground">{m.subject || m.message}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{m.created_date ? new Date(m.created_date).toLocaleString() : ""}</div>
              </button>
            ))}
          </Card>

          <Card className="lg:col-span-2">
            {!active ? (
              <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">Select a message to read it</div>
            ) : (
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <h2 className="font-serif-display text-lg font-semibold">{active.subject || "(no subject)"}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{active.name} · {active.created_date ? new Date(active.created_date).toLocaleString() : ""}</p>
                  </div>
                  <StatusBadge status={active.status || "new"} />
                </div>

                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {active.email && <a href={`mailto:${active.email}`} className="flex items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4" /> {active.email}</a>}
                  {active.phone && <a href={`tel:${active.phone}`} className="flex items-center gap-2 text-primary hover:underline"><Phone className="h-4 w-4" /> {active.phone}</a>}
                  {active.service_category && <div className="text-muted-foreground">Service: <span className="text-foreground">{active.service_category}</span></div>}
                  {active.city && <div className="text-muted-foreground">City: <span className="text-foreground">{active.city}</span></div>}
                </div>

                <div className="mt-5 whitespace-pre-wrap rounded-md border-border bg-muted/30 p-4 text-sm leading-relaxed">{active.message}</div>

                <div className="mt-6 flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Status</span>
                  <select
                    className={inputClass + " max-w-xs"}
                    value={active.status || "new"}
                    disabled={saving}
                    onChange={(e) => setStatus(active, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {active.email && (
                    <a href={`mailto:${active.email}?subject=${encodeURIComponent("Re: " + (active.subject || "Your enquiry"))}`} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
                      <Check className="h-4 w-4" /> Reply by email
                    </a>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}