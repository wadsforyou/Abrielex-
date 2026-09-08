import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Building2, FolderKanban, FileText, CalendarDays, Bell, ArrowRight } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date(new Date().toDateString());
  return Math.round(diff / 86400000);
}

export default function PortalDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [cases, setCases] = useState([]);
  const [docs, setDocs] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [c, cs, d, dl, n] = await Promise.all([
          base44.entities.Company.filter({}),
          base44.entities.ServiceCase.filter({}),
          base44.entities.PortalDocument.filter({ requested: true }),
          base44.entities.Deadline.filter({}, "date", 50),
          base44.entities.PortalNotification.filter({}, "-created_date", 5),
        ]);
        setCompanies(c); setCases(cs); setDocs(d); setDeadlines(dl); setNotifications(n);
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;
  const activeCases = cases.filter((c) => !["completed", "closed"].includes(c.status));
  const upcoming = deadlines
    .filter((d) => { const dd = daysUntil(d.date); return dd != null && dd >= -1 && d.status !== "done"; })
    .sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);

  const stats = [
    { label: "Companies", value: companies.length, icon: Building2, to: "/portal/companies" },
    { label: "Active cases", value: activeCases.length, icon: FolderKanban, to: "/portal/cases" },
    { label: "Documents requested", value: docs.length, icon: FileText, to: "/portal/documents" },
    { label: "Upcoming deadlines", value: upcoming.length, icon: CalendarDays, to: "/portal/deadlines" },
  ];

  return (
    <div>
      <PageHeader title={`Welcome, ${user?.full_name || user?.email?.split("@")[0] || ""}`} subtitle="Your Abrielex client overview" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="group">
            <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary"><s.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-semibold">Active cases</h2>
            <Link to="/portal/cases" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {activeCases.length === 0 ? <EmptyState icon={FolderKanban} title="No active cases" message="Request a service to get started." action={<Link to="/portal/cases" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">Request a service</Link>} />
            : <ul className="divide-y divide-border">{activeCases.slice(0, 5).map((c) => (
              <li key={c.id} className="flex items-center justify-between py-3">
                <Link to={`/portal/cases/${c.id}`} className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.company_name || "General"} · {c.service_category}</div>
                </Link>
                <StatusBadge status={c.status} />
              </li>
            ))}</ul>}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif-display text-lg font-semibold">Upcoming deadlines</h2>
            <Link to="/portal/deadlines" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {upcoming.length === 0 ? <EmptyState icon={CalendarDays} title="No upcoming deadlines" message="You're up to date." />
            : <ul className="divide-y divide-border">{upcoming.map((d) => {
              const dd = daysUntil(d.date);
              return (
                <li key={d.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{d.title}</div>
                    <div className="text-xs text-muted-foreground">{d.company_name || ""} · {new Date(d.date).toLocaleDateString()}</div>
                  </div>
                  <StatusBadge status={dd < 0 ? "overdue" : dd <= 7 ? "due_soon" : "upcoming"} />
                </li>
              );
            })}</ul>}
        </Card>
      </div>

      <Card className="mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif-display text-lg font-semibold">Recent notifications</h2>
          <Link to="/portal/notifications" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
        </div>
        {notifications.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">No notifications yet.</p>
          : <ul className="divide-y divide-border">{notifications.map((n) => (
            <li key={n.id} className="flex items-start gap-3 py-3">
              <Bell className="mt-0.5 h-4 w-4 text-primary" />
              <div><div className="text-sm font-medium text-foreground">{n.title}</div><div className="text-xs text-muted-foreground">{n.body}</div></div>
            </li>
          ))}</ul>}
      </Card>
    </div>
  );
}