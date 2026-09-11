import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessagesSquare, FileSpreadsheet, CalendarClock, Bell, Database } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";
import { base44 } from "@/api/base44Client";
import { buildCmsSeed } from "@/lib/cmsSeed";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [seeding, setSeeding] = useState(false);
  const [seedSummary, setSeedSummary] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [messages, quotes, consultations, notifs] = await Promise.all([
        adminList("ContactMessage"),
        adminList("QuoteRequest"),
        adminList("ConsultationBooking"),
        adminList("PortalNotification", "-created_date", 5),
      ]);
      setStats({
        messages: messages.filter((m) => m.status === "new" || !m.status).length,
        totalMessages: messages.length,
        quotes: quotes.filter((q) => q.status === "new").length,
        totalQuotes: quotes.length,
        consultations: consultations.filter((c) => c.status === "pending").length,
        totalConsultations: consultations.length,
      });
      setRecent(notifs);
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Unable to load dashboard data");
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  // One-click import of the existing live-site content into the database.
  // Idempotent: existing records (including admin edits) are never overwritten.
  async function syncContent() {
    setSeeding(true);
    setSeedSummary(null);
    try {
      const res = await base44.functions.invoke("adminControl", {
        action: "seed_cms",
        seed: buildCmsSeed(),
      });
      setSeedSummary(res?.result || {});
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Content sync failed");
    } finally { setSeeding(false); }
  }

  if (loading) return <Loader />;
  if (error) return <div><PageHeader title="Overview" subtitle="Abrielex management dashboard" /><EmptyState icon={Bell} title="Could not load dashboard" message={error} action={<button onClick={load} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Retry</button>} /></div>;
  const cards = [
    { label: "New messages", value: stats.messages, total: stats.totalMessages, icon: MessagesSquare, to: "/admin/messages" },
    { label: "New quote requests", value: stats.quotes, total: stats.totalQuotes, icon: FileSpreadsheet, to: "/admin/quotes" },
    { label: "Pending consultations", value: stats.consultations, total: stats.totalConsultations, icon: CalendarClock, to: "/admin/consultations" },
  ];

  return (
    <div>
      <PageHeader title="Overview" subtitle="Abrielex management dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to}>
            <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-slate-700"><c.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-bold">{c.value}<span className="text-sm font-normal text-muted-foreground"> / {c.total ?? 0}</span></div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="mt-6 p-5">
        <h2 className="mb-3 flex items-center gap-2 font-serif-display text-lg font-semibold"><Bell className="h-4 w-4" /> Recent notifications sent</h2>
        {recent.length === 0 ? <p className="text-sm text-muted-foreground">No notifications yet.</p>
          : <ul className="divide-y divide-border">{recent.map((n) => (
            <li key={n.id} className="flex items-start gap-3 py-3"><Bell className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-sm font-medium">{n.title}</div><div className="text-xs text-muted-foreground">{n.body}</div></div></li>
          ))}</ul>}
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="mb-2 flex items-center gap-2 font-serif-display text-lg font-semibold"><Database className="h-4 w-4" /> Website content &amp; database</h2>
        <p className="text-sm text-muted-foreground">
          Import the existing Abrielex website content (services, FAQs, resources, cities, company details and
          notification templates) into the database so every section is editable. Running this never overwrites
          content you have already edited.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={syncContent} disabled={seeding} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {seeding ? "Syncing…" : "Sync website content to database"}
          </button>
          {seedSummary && (
            <span className="text-xs text-muted-foreground">
              {Object.entries(seedSummary).map(([k, v]) => `${k}: +${v.created}/${v.skipped} skipped`).join(" · ")}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}