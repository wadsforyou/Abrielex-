import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Users, Building2, FolderKanban, FileText, CalendarDays, FileSpreadsheet, CalendarClock, Bell } from "lucide-react";
import { PageHeader, Card, Loader } from "@/components/portal/ui";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);

  useEffect(() => { (async () => {
    try {
      const [users, companies, cases, docs, deadlines, quotes, consultations, notifs] = await Promise.all([
        base44.entities.User.list("-created_date", 500),
        base44.entities.Company.list("-created_date", 500),
        base44.entities.ServiceCase.list("-created_date", 500),
        base44.entities.PortalDocument.list("-created_date", 500),
        base44.entities.Deadline.list("date", 500),
        base44.entities.Quote.list("-created_date", 500),
        base44.entities.ConsultationBooking.list("-created_date", 500),
        base44.entities.PortalNotification.list("-created_date", 5),
      ]);
      const activeCases = cases.filter((c) => !["completed", "closed"].includes(c.status));
      setStats({
        clients: users.filter((u) => u.role === "user").length,
        companies: companies.length,
        activeCases: activeCases.length,
        pendingDocs: docs.filter((d) => d.status === "requested" || d.status === "uploaded").length,
        upcomingDeadlines: deadlines.filter((d) => d.status !== "done" && new Date(d.date) >= new Date(new Date().toDateString())).length,
        quotes: quotes.length,
        consultations: consultations.filter((c) => c.status === "pending").length,
      });
      setRecent(notifs);
    } catch {} finally { setLoading(false); }
  })(); }, []);

  if (loading) return <Loader />;
  const cards = [
    { label: "Clients", value: stats.clients, icon: Users, to: "/admin/clients" },
    { label: "Companies", value: stats.companies, icon: Building2, to: "/admin/companies" },
    { label: "Active cases", value: stats.activeCases, icon: FolderKanban, to: "/admin/cases" },
    { label: "Pending documents", value: stats.pendingDocs, icon: FileText, to: "/admin/documents" },
    { label: "Upcoming deadlines", value: stats.upcomingDeadlines, icon: CalendarDays, to: "/admin/deadlines" },
    { label: "Quotes", value: stats.quotes, icon: FileSpreadsheet, to: "/admin/quotes" },
    { label: "Pending consultations", value: stats.consultations, icon: CalendarClock, to: "/admin/consultations" },
  ];

  return (
    <div>
      <PageHeader title="Overview" subtitle="Abrielex management dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to}>
            <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-slate-700"><c.icon className="h-5 w-5" /></div>
              <div><div className="text-2xl font-bold">{c.value}</div><div className="text-xs text-muted-foreground">{c.label}</div></div>
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