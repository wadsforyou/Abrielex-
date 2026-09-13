import React, { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Plus, Pencil, Trash2, X, Loader2, CheckCircle2, AlertTriangle, Globe, BarChart3 } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, inputClass } from "@/components/portal/ui";
import { adminFilter } from "@/lib/adminData";

const DIALOG_LIMIT = 100;
const SITE_URL = "https://abrielex.wads-foryou.workers.dev";

// ---------------------------------------------------------------------------
// SEO STATUS — computed from the actual record fields, never faked.
// ---------------------------------------------------------------------------
function computeStatus(row) {
  let score = 0;
  const issues = [];
  const title = row.seo_title || row.page_title || "";
  const desc = row.meta_description || "";

  if (title) { score += 2; if (title.length > 60) issues.push("Title over 60 chars"); }
  else issues.push("Missing SEO title");
  if (desc) { score += 2; if (desc.length > 160) issues.push("Description over 160 chars"); }
  else issues.push("Missing meta description");
  if (row.primary_keyword || row.focus_keyword) score += 1;
  if (row.canonical_url) score += 1; else issues.push("Missing canonical URL");
  if (row.og_title && row.og_description) score += 1;
  else issues.push("Incomplete social metadata");
  if (row.image_alt_text) score += 1;

  let status = "Needs improvement";
  if (score >= 6 && issues.length === 0) status = "Optimized";
  else if (score === 0) status = "Not configured";
  return { score, status, issues };
}

const SEO_FIELDS = [
  { key: "path", label: "Public path", required: true, span: 2 },
  { key: "page_title", label: "Page title", required: true, span: 2 },
  { key: "seo_title", label: "SEO title (meta title)", span: 2 },
  { key: "meta_description", label: "Meta description", type: "textarea", span: 2 },
  { key: "primary_keyword", label: "Primary keyword", span: 1 },
  { key: "focus_keyword", label: "Focus keyword", span: 1 },
  { key: "secondary_keywords", label: "Secondary keywords (comma separated)", span: 2 },
  { key: "search_phrases", label: "Search phrases (one per line)", type: "textarea", span: 2 },
  { key: "slug", label: "URL slug", span: 1 },
  { key: "canonical_url", label: "Canonical URL", span: 1 },
  { key: "robots", label: "Robots / indexing", type: "select", span: 1, options: [
    { value: "index,follow", label: "Index & follow" },
    { value: "noindex,follow", label: "No index, follow" },
    { value: "index,nofollow", label: "Index, no follow" },
    { value: "noindex,nofollow", label: "Do not index" },
  ]},
  { key: "og_title", label: "Open Graph title", span: 2 },
  { key: "og_description", label: "Open Graph description", type: "textarea", span: 2 },
  { key: "og_image", label: "Open Graph image URL", span: 2 },
  { key: "social_image", label: "Social sharing image URL", span: 2 },
  { key: "image_alt_text", label: "Image alt text", span: 2 },
  { key: "related_keywords", label: "Related keywords (comma separated)", span: 2 },
  { key: "schema_type", label: "Schema.org type", type: "select", span: 1, options: [
    { value: "ProfessionalService", label: "ProfessionalService" },
    { value: "LocalBusiness", label: "LocalBusiness" },
    { value: "Service", label: "Service" },
    { value: "FAQPage", label: "FAQPage" },
    { value: "Article", label: "Article" },
    { value: "CollectionPage", label: "CollectionPage" },
    { value: "AboutPage", label: "AboutPage" },
    { value: "ContactPage", label: "ContactPage" },
    { value: "BreadcrumbList", label: "BreadcrumbList" },
    { value: "", label: "— None —" },
  ]},
  { key: "breadcrumb_label", label: "Breadcrumb label", span: 1 },
];

function FieldInput({ field, value, onChange }) {
  switch (field.type) {
    case "textarea":
      return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />;
    case "select":
      return (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="">— Select —</option>
          {(field.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    default:
      return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
  }
}

function StatusBadge({ row }) {
  const { status, issues } = computeStatus(row);
  const cls = status === "Optimized" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : status === "Needs improvement" ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <div>
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
        {status === "Optimized" ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
        {status}
      </span>
      {issues.length > 0 && <div className="mt-1 max-w-[180px] text-[10px] leading-tight text-muted-foreground">{issues.join(", ")}</div>}
    </div>
  );
}

function AuditChip({ label, value }) {
  return (
    <div className="rounded-md border border-border bg-muted/20 px-3 py-2">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

export default function AdminSEO() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setRows(await adminFilter("SeoPage", {}, "path", 200)); }
    catch { setRows([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const stats = {
    total: rows.length,
    optimized: rows.filter((r) => computeStatus(r).status === "Optimized").length,
    needsWork: rows.filter((r) => computeStatus(r).status === "Needs improvement").length,
    notConfigured: rows.filter((r) => computeStatus(r).status === "Not configured").length,
    missingTitle: rows.filter((r) => !(r.seo_title || r.page_title)).length,
    missingDesc: rows.filter((r) => !r.meta_description).length,
    missingCanonical: rows.filter((r) => !r.canonical_url).length,
    missingAlt: rows.filter((r) => !r.image_alt_text).length,
    noindex: rows.filter((r) => (r.robots || "").includes("noindex")).length,
    indexed: rows.filter((r) => !(r.robots || "index,follow").includes("noindex") && r.published !== false).length,
  };

  const visible = rows.filter((r) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return [r.path, r.page_title, r.seo_title, r.primary_keyword, r.focus_keyword, r.canonical_url]
      .some((v) => String(v || "").toLowerCase().includes(q));
  });

  function openNew() { setEditing({}); }
  function openEdit(row) { setEditing({ ...row }); }

  async function save() {
    setSaving(true);
    try {
      const payload = { ...editing, last_updated: new Date().toISOString().slice(0, 10), seo_status: computeStatus(editing).status };
      if (editing.id) {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "SeoPage", mutation: "update", id: editing.id, data: payload, auditDetails: "SEO record updated" });
      } else {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "SeoPage", mutation: "create", data: payload, auditDetails: "SEO record created" });
      }
      setEditing(null);
      await load();
    } catch (e) { alert("Save failed: " + (e.message || "unknown error")); }
    finally { setSaving(false); }
  }

  async function confirmDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "SeoPage", mutation: "delete", id: deleting.id, auditDetails: "SEO record deleted" });
      setDeleting(null);
      await load();
    } catch (e) { alert("Delete failed: " + (e.message || "unknown error")); }
    finally { setSaving(false); }
  }

  const summaryCards = [
    { label: "Total SEO records", value: stats.total, icon: Globe },
    { label: "Optimized", value: stats.optimized, icon: CheckCircle2, tone: "emerald" },
    { label: "Needs improvement", value: stats.needsWork, icon: AlertTriangle, tone: "amber" },
    { label: "Not configured", value: stats.notConfigured, icon: AlertTriangle, tone: "rose" },
  ];

  return (
    <div>
      <PageHeader title="SEO Management" subtitle="Every SEO record is a real database entry. Edits appear on the live website. Status is computed from actual fields — never faked."
        actions={[<button key="new" onClick={openNew} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Plus className="h-4 w-4" /> New SEO record</button>]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((c) => (
          <Card key={c.label} className="flex items-center gap-4 p-5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-md ${c.tone === "emerald" ? "bg-emerald-50 text-emerald-600" : c.tone === "amber" ? "bg-amber-50 text-amber-600" : c.tone === "rose" ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <div>
              <div className="text-2xl font-bold">{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-6 p-5">
        <h2 className="mb-3 flex items-center gap-2 font-serif-display text-lg font-semibold"><BarChart3 className="h-4 w-4" /> SEO audit (from database records)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <AuditChip label="Missing meta titles" value={stats.missingTitle} />
          <AuditChip label="Missing descriptions" value={stats.missingDesc} />
          <AuditChip label="Missing canonical URLs" value={stats.missingCanonical} />
          <AuditChip label="Missing alt text" value={stats.missingAlt} />
          <AuditChip label="Indexable pages" value={stats.indexed} />
          <AuditChip label="Noindex pages" value={stats.noindex} />
          <AuditChip label="Published pages" value={rows.filter((r) => r.published !== false).length} />
          <AuditChip label="Total records" value={stats.total} />
        </div>
      </Card>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages, keywords…" className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <span className="text-xs text-muted-foreground">{visible.length} record{visible.length !== 1 ? "s" : ""}</span>
      </div>

      {loading ? <Loader /> : visible.length === 0 ? (
        <EmptyState icon={Search} title="No SEO records" message="Create the first record, or run the content sync on the Overview page to auto-generate SEO records for every page, service and city." />
      ) : (
        <div className="overflow-hidden rounded-lg border-border bg-card">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-3 font-semibold">Page</th>
                <th className="px-3 py-3 font-semibold">Path</th>
                <th className="px-3 py-3 font-semibold">SEO title</th>
                <th className="px-3 py-3 font-semibold">Keyword</th>
                <th className="px-3 py-3 font-semibold">Canonical</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="break-words px-3 py-3 font-medium">{r.page_title || "—"}</td>
                  <td className="break-words px-3 py-3 font-mono text-xs text-muted-foreground">{r.path}</td>
                  <td className="break-words px-3 py-3 text-xs">{r.seo_title || "—"}</td>
                  <td className="break-words px-3 py-3 text-xs">{r.primary_keyword || r.focus_keyword || "—"}</td>
                  <td className="break-words px-3 py-3 text-xs">
                    {r.canonical_url ? <span className="text-primary" title={r.canonical_url}>{r.canonical_url.replace(SITE_URL, "")}</span> : "—"}
                  </td>
                  <td className="px-3 py-3"><StatusBadge row={r} /></td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(r)} className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-primary" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleting(r)} className="rounded p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
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
          <div className="my-8 w-full max-w-3xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif-display text-lg font-semibold">{editing.id ? "Edit" : "New"} SEO record</h2>
              <button onClick={() => setEditing(null)} aria-label="Close"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {SEO_FIELDS.map((f) => (
                  <div key={f.key} className={f.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}{f.required && <span className="text-rose-500"> *</span>}</label>
                    <FieldInput field={f} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                Last updated: {editing.last_updated || "—"} · Status: <span className="font-medium text-foreground">{computeStatus(editing).status}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setEditing(null)} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-card p-6 shadow-xl">
            <h3 className="font-serif-display text-lg font-semibold">Delete SEO record?</h3>
            <p className="mt-2 text-sm text-muted-foreground">This removes the record for <span className="font-medium text-foreground">{deleting.path || deleting.page_title}</span>. The page stays live but loses its database SEO overrides.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleting(null)} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Cancel</button>
              <button onClick={confirmDelete} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
