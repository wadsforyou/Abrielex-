import React, { useEffect, useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Loader, inputClass } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";

// Honest Google integration admin page.
// What this app DOES implement (real functionality, no simulation):
//   - GA4 measurement: injects the official gtag.js script with your
//     Measurement ID on every public page once status = connected.
//   - Search Console verification: injects the google-site-verification
//     meta tag (Google's official HTML-tag method) using your token.
// What REQUIRES action in your own Google account (this app cannot do it):
//   - Creating the GA4 property + web data stream (Google Analytics UI).
//   - Creating the Search Console property (Search Console UI).
//   - Completing verification by clicking "Verify" in Search Console after
//     this app serves the meta tag.
//   - Submitting the sitemap URL in Search Console.

const FIELDS = {
  search_console: [
    { key: "property_url", label: "Property URL (e.g. https://abrielex.wads-foryou.workers.dev)", type: "text" },
    { key: "verification_token", label: "Verification token (value from Google's HTML-tag snippet)", type: "text" },
    { key: "sitemap_url", label: "Sitemap URL submitted to Google", type: "text" },
    { key: "setup_notes", label: "Setup notes", type: "textarea" },
  ],
  analytics: [
    { key: "property_url", label: "GA4 property name/URL (reference only)", type: "text" },
    { key: "measurement_id", label: "Measurement ID (format G-XXXXXXXXXX)", type: "text" },
    { key: "data_stream_id", label: "Data stream ID (reference only)", type: "text" },
    { key: "setup_notes", label: "Setup notes", type: "textarea" },
  ],
};

const STEPS = {
  search_console: [
    "Open https://search.google.com/search-console and add a property for your site URL.",
    'Choose the "HTML tag" verification method and copy the content value of the google-site-verification meta tag.',
    "Paste that value into the Verification token field here and set status to Connected, then save.",
    "Publish this app so the meta tag is live, then click Verify in Search Console.",
    "Submit your sitemap URL (the dynamic sitemap function or /sitemap.xml) in Search Console.",
  ],
  analytics: [
    "Open https://analytics.google.com and create a GA4 property + web data stream for your site.",
    "Copy the Measurement ID (G-XXXXXXXXXX) from the data stream.",
    "Paste it here, set status to Connected, and save.",
    "Publish this app — the gtag.js script is then loaded on every public page and real measurement begins.",
  ],
};

export default function AdminIntegrations() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    try { setRows(await adminList("IntegrationSetting", "kind", 20)); } catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function rowFor(kind) { return rows.find((r) => r.kind === kind); }

  async function save(kind, data) {
    setMessage("");
    const existing = rowFor(kind);
    try {
      const payload = { ...data, kind, connected_at: data.status === "connected" ? (existing?.connected_at || new Date().toISOString()) : null };
      if (existing?.id) {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "IntegrationSetting", mutation: "update", id: existing.id, data: payload, auditDetails: `Google integration ${kind} updated` });
      } else {
        await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "IntegrationSetting", mutation: "create", data: payload, auditDetails: `Google integration ${kind} created` });
      }
      setMessage("Saved. Changes take effect on the public site after publish.");
      await load();
    } catch (error) { setMessage(error.message || "Save failed"); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Google Integrations" subtitle="Search Console verification and GA4 measurement" />
      {message && <p className="mb-4 text-sm text-primary">{message}</p>}

      <Card className="mb-6 flex gap-3 p-4 text-sm">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          This app implements the two parts of Google integration that work entirely from the website itself:
          the <strong>Search Console HTML-tag verification</strong> (served as a meta tag) and
          the <strong>official GA4 gtag.js measurement script</strong>. Property creation and the final
          "Verify"/"Submit" clicks always happen in your own Google account — this app cannot and does not
          simulate them.
        </p>
      </Card>

      {["search_console", "analytics"].map((kind) => {
        const existing = rowFor(kind) || {};
        return (
          <IntegrationCard
            key={kind}
            kind={kind}
            existing={existing}
            fields={FIELDS[kind]}
            steps={STEPS[kind]}
            onSave={(data) => save(kind, data)}
          />
        );
      })}
    </div>
  );
}

function IntegrationCard({ kind, existing, fields, steps, onSave }) {
  const [data, setData] = useState({ status: existing.status || "not_connected", ...existing });
  useEffect(() => { setData({ status: existing.status || "not_connected", ...existing }); }, [existing.id, existing.status]);
  const title = kind === "search_console" ? "Google Search Console" : "Google Analytics 4";

  return (
    <Card className="mb-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif-display text-lg font-semibold">{title}</h2>
        <span className={`rounded px-2 py-1 text-xs font-semibold ${data.status === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
          {String(data.status || "not_connected").replace("_", " ")}
        </span>
      </div>

      <ol className="mb-5 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">Connection status
          <select className={inputClass + " mt-1"} value={data.status || "not_connected"} onChange={(e) => setData({ ...data, status: e.target.value })}>
            <option value="not_connected">Not connected</option>
            <option value="setup_required">Setup required</option>
            <option value="connected">Connected</option>
          </select>
        </label>
        {fields.filter((f) => f.type !== "textarea").map((f) => (
          <label key={f.key} className="block text-sm">{f.label}
            <input className={inputClass + " mt-1"} value={data[f.key] || ""} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} />
          </label>
        ))}
        {fields.filter((f) => f.type === "textarea").map((f) => (
          <label key={f.key} className="block text-sm sm:col-span-2">{f.label}
            <textarea rows={3} className={inputClass + " mt-1"} value={data[f.key] || ""} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} />
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={() => onSave(data)} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">Save</button>
        {kind === "search_console" && <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Open Search Console</a>}
        {kind === "analytics" && <a href="https://analytics.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Open Google Analytics</a>}
      </div>
    </Card>
  );
}
