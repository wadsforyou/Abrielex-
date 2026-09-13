import React, { useState, useEffect } from "react";
import { Save, Loader2, Mail, Plus, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Loader, EmptyState, inputClass } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";

// ---------------------------------------------------------------------------
// NOTIFICATION RECIPIENTS
//
// Each public form has its own independent recipient list, stored in the
// NotificationSetting record (never in frontend code). A quote notification is
// only ever emailed to the quote list — to receive both, an address must be
// added to both lists.
//
// The delivery log below is read from real NotificationDelivery records, so a
// failed email is visible here rather than reported as sent.
// ---------------------------------------------------------------------------

const FORMS = [
  {
    field: "quote_recipients",
    label: "Get a Quote recipients",
    event: "quote_request",
    hint: "Everyone here is emailed when a visitor submits the Get a Quote form.",
  },
  {
    field: "consultation_recipients",
    label: "Book a Consultation recipients",
    event: "consultation_booking",
    hint: "Everyone here is emailed when a visitor books a consultation.",
  },
  {
    field: "contact_recipients",
    label: "Contact form recipients",
    event: "contact_message",
    hint: "Everyone here is emailed when a visitor sends a contact message.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseList(value) {
  return String(value || "")
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const STATUS_STYLE = {
  sent: { tone: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  partial: { tone: "bg-amber-50 text-amber-700", icon: AlertTriangle },
  failed: { tone: "bg-rose-50 text-rose-700", icon: XCircle },
  no_recipient: { tone: "bg-amber-50 text-amber-700", icon: AlertTriangle },
  disabled: { tone: "bg-slate-100 text-slate-600", icon: AlertTriangle },
  skipped: { tone: "bg-slate-100 text-slate-600", icon: AlertTriangle },
};

export default function AdminNotificationRecipients() {
  const [settings, setSettings] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [list, log] = await Promise.all([
        adminList("NotificationSetting", "-created_date", 50),
        adminList("NotificationDelivery", "-created_date", 50).catch(() => []),
      ]);
      setSettings(list.find((r) => r.key === "global") || list[0] || { key: "global" });
      setDeliveries(log);
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Unable to load settings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  // Per-field validation so a typo is caught before it silently drops mail.
  const invalid = [];
  if (settings) {
    for (const form of FORMS) {
      for (const entry of parseList(settings[form.field])) {
        if (!EMAIL_RE.test(entry)) invalid.push(`${entry} (${form.label})`);
      }
    }
  }

  async function save() {
    if (invalid.length) {
      setError("Fix these invalid addresses first: " + invalid.join(", "));
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const existing = settings.id
        ? settings
        : (await base44.functions.invoke("adminControl", {
            action: "entity_mutation", entity: "NotificationSetting", mutation: "create",
            data: { ...settings, key: "global" }, auditDetails: "Notification recipients created",
          })).result;

      await base44.functions.invoke("adminControl", {
        action: "entity_mutation", entity: "NotificationSetting", mutation: "update",
        id: existing.id, data: settings, auditDetails: "Notification recipients updated",
      });
      setMessage("Recipient lists saved. New submissions use these addresses immediately.");
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader />;
  if (!settings) {
    return (
      <div>
        <PageHeader title="Notification Recipients" subtitle="Who receives each form's notifications" actions={null} />
        <EmptyState icon={AlertTriangle} title="Could not load settings" message={error}
          action={<button onClick={load} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Retry</button>} />
      </div>
    );
  }

  const totalConfigured = FORMS.reduce((sum, f) => sum + parseList(settings[f.field]).length, 0);

  return (
    <div>
      <PageHeader
        title="Notification Recipients"
        subtitle="Choose which email addresses receive each form's notifications"
        actions={null}
      />

      <Card className="mb-6 p-4 text-sm text-muted-foreground">
        <p>
          New submissions always appear in the <strong>notification bell</strong> and in the
          Quote Requests / Consultations / Messages sections of this dashboard.
          Email delivery is sent by the server to the addresses below — the website never exposes
          these addresses to visitors.
        </p>
        {totalConfigured === 0 && (
          <p className="mt-2 rounded-md border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
            No recipient addresses are configured yet, so no notification emails are being sent.
            Add at least one address below and save.
          </p>
        )}
      </Card>

      {error && <p className="mb-4 rounded-md border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {message && <p className="mb-4 rounded-md border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        {FORMS.map((form) => {
          const entries = parseList(settings[form.field]);
          const inputId = `recip-${form.field}`;
          return (
            <Card key={form.field} className="p-6">
              <h2 className="mb-1 flex items-center gap-2 font-serif-display text-base font-semibold">
                <Mail className="h-4 w-4 text-primary" /> {form.label}
              </h2>
              <p className="mb-4 text-xs text-muted-foreground">{form.hint}</p>

              <div className="space-y-2">
                {(entries.length ? entries : [""]).map((value, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="email"
                      value={value}
                      placeholder="name@example.com"
                      onChange={(e) => {
                        const next = [...(entries.length ? entries : [""])];
                        next[index] = e.target.value;
                        setSettings({ ...settings, [form.field]: next.join("\n") });
                      }}
                      className={inputClass + (value && !EMAIL_RE.test(value) ? " border-rose-400" : "")}
                    />
                    <button
                      type="button"
                      aria-label="Remove address"
                      onClick={() => {
                        const next = [...entries];
                        next.splice(index, 1);
                        setSettings({ ...settings, [form.field]: next.join("\n") });
                      }}
                      className="shrink-0 rounded-md border-border px-2 text-xs text-muted-foreground hover:border-rose-300 hover:text-rose-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, [form.field]: [...entries, ""].join("\n") })}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add another recipient
              </button>

              <p className="mt-3 text-[11px] text-muted-foreground">
                {entries.length} recipient{entries.length === 1 ? "" : "s"} configured
              </p>
              <label htmlFor={inputId} className="sr-only">{form.label}</label>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save recipients
        </button>
        {invalid.length > 0 && (
          <span className="text-xs text-rose-600">
            Invalid address{invalid.length === 1 ? "" : "es"}: {invalid.join(", ")}
          </span>
        )}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="mb-1 font-serif-display text-lg font-semibold">Email delivery log</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          The real outcome of every submission's notification email. A failure here means the
          submission was still saved and is waiting in the dashboard.
        </p>

        {deliveries.length === 0 ? (
          <p className="rounded-md border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
            No notification emails have been sent yet.
          </p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-semibold">When</th>
                  <th className="px-3 py-2 font-semibold">Type</th>
                  <th className="px-3 py-2 font-semibold">Client</th>
                  <th className="px-3 py-2 font-semibold">Recipients</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {deliveries.map((d) => {
                  const style = STATUS_STYLE[d.status] || STATUS_STYLE.skipped;
                  const Icon = style.icon;
                  return (
                    <tr key={d.id}>
                      <td className="px-3 py-2 text-xs text-muted-foreground">
                        {d.created_date ? new Date(d.created_date).toLocaleString() : "—"}
                      </td>
                      <td className="px-3 py-2 text-xs capitalize">{String(d.event || "").replace(/_/g, " ")}</td>
                      <td className="px-3 py-2 text-xs">{d.client_name || "—"}</td>
                      <td className="px-3 py-2 text-xs">
                        <span className="block max-w-[240px] truncate" title={d.recipients}>{d.recipients || "—"}</span>
                        {d.failed && <span className="mt-0.5 block max-w-[240px] truncate text-rose-600" title={d.failed}>Failed: {d.failed}</span>}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${style.tone}`}>
                          <Icon className="h-3 w-3" /> {d.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
