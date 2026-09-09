import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { MessagesSquare, FileSpreadsheet, CalendarClock, Bell } from "lucide-react";
import { PageHeader, Card, Loader } from "@/components/portal/ui";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);

  useEffect(() => { (async () => {
    try {
      const [messages, quotes, consultations, notifs] = await Promise.all([
        base44.entities.ContactMessage.list("-created_date", 500),
        base44.entities.QuoteRequest.list("-created_date", 500),
        base44.entities.ConsultationBooking.list("-created_date", 500),
        base44.entities.PortalNotification.list("-created_date", 5),
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
    } catch {} finally { setLoading(false); }
  })(); }, []);

  if (loading) return <Loader />;
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
    </div>
  );
}