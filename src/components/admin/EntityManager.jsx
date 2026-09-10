import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, X, Search, Loader2 } from "lucide-react";
import { PageHeader, Loader, EmptyState, inputClass } from "@/components/portal/ui";
import { adminFilter } from "@/lib/adminData";

const DIALOG_LIMIT = 500;

function FieldInput({ field, value, onChange, options }) {
  const [uploading, setUploading] = useState(false);
  switch (field.type) {
    case "textarea":
      return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />;
    case "select":
      return (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="">— Select —</option>
          {(field.options || options || []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    case "boolean":
      return <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />;
    case "number":
      return <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} className={inputClass} />;
    case "date":
      return <input type="date" value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
    case "file":
      return (
        <div className="flex items-center gap-2">
          <input type="file" onChange={async (e) => {
            const f = e.target.files && e.target.files[0]; if (!f) return;
            setUploading(true);
            try { const res = await base44.integrations.Core.UploadFile({ file: f }); onChange(res.file_url); }
            catch (err) { /* ignore */ } finally { setUploading(false); }
          }} className="text-xs" />
          {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          {value && <a href={value} target="_blank" rel="noreferrer" className="text-xs text-primary underline">view</a>}
        </div>
      );
    default:
      return <input type={field.type === "email" ? "email" : "text"} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
  }
}

export default function EntityManager({
  entity, title, subtitle, columns, fields, filters: fixedFilters = {},
  defaultSort = "-created_date", canCreate = true, canEdit = true, canDelete = true,
  extraActions, transformOnSave, searchKeys, renderForm,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [optionsCache, setOptionsCache] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await adminFilter(entity, fixedFilters, defaultSort, DIALOG_LIMIT);
      setRows(list);
    } catch (e) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [entity, JSON.stringify(fixedFilters), defaultSort]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fields.forEach(async (f) => {
      if (f.optionsEntity) {
        try {
          const list = await base44.entities[f.optionsEntity].list("-created_date", 200);
          const opts = list.map((r) => ({ value: r[f.optionsValue], label: r[f.optionsLabel] }));
          setOptionsCache((c) => ({ ...c, [f.key]: opts }));
        } catch (err) { /* ignore */ }
      }
    });
  }, [entity]);

  const visible = rows.filter((r) => {
    if (!query) return true;
    const keys = searchKeys || columns.map((c) => c.key);
    return keys.some((k) => String(r[k] ?? "").toLowerCase().includes(query.toLowerCase()));
  });

  function openNew() { setEditing({}); }
  function openEdit(row) { setEditing({ ...row }); }

  async function save() {
    setSaving(true);
    try {
      const payload = transformOnSave ? transformOnSave(editing) : editing;
      if (editing.id) {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity, mutation: "update", id: editing.id, data: payload, auditDetails: `${title} record updated` });
      } else {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity, mutation: "create", data: payload, auditDetails: `${title} record created` });
      }
      setEditing(null);
      await load();
    } catch (e) {
      alert("Save failed: " + (e.message || "unknown error"));
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      await base44.functions.invoke("adminControl", { action: "entity_mutation", entity, mutation: "delete", id: deleting.id, auditDetails: `${title} record deleted` });
      setDeleting(null);
      await load();
    } catch (e) {
      alert("Delete failed: " + (e.message || "unknown error"));
    } finally {
      setSaving(false);
    }
  }

  const hasActions = canEdit || canDelete;

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={canCreate ? [
          <button key="new" onClick={openNew} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" /> New
          </button>,
          ...(extraActions || []),
        ] : extraActions}
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <span className="text-xs text-muted-foreground">{visible.length} record{visible.length !== 1 ? "s" : ""}</span>
      </div>

      {loading ? <Loader /> : visible.length === 0 ? (
        <EmptyState icon={Search} title="No records" message="Nothing here yet. Create the first record or adjust your search." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-4 py-3 font-semibold">{c.label}</th>
                ))}
                {hasActions && <th className="px-4 py-3 text-right font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-top">
                      {c.render ? c.render(r) : (r[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      {canEdit && (
                        <button onClick={() => openEdit(r)} className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button onClick={() => setDeleting(r)} className="rounded p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif-display text-lg font-semibold">{editing.id ? "Edit" : "New"} {title}</h2>
              <button onClick={() => setEditing(null)} aria-label="Close"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">
              {renderForm ? renderForm(editing, (patch) => setEditing({ ...editing, ...patch })) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.key} className={f.span === 2 ? "sm:col-span-2" : ""}>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        {f.label}{f.required && <span className="text-rose-500"> *</span>}
                      </label>
                      <FieldInput field={f} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} options={optionsCache[f.key]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setEditing(null)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-card p-6 shadow-xl">
            <h3 className="font-serif-display text-lg font-semibold">Delete record?</h3>
            <p className="mt-2 text-sm text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleting(null)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={confirmDelete} disabled={saving} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">
                {saving ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}