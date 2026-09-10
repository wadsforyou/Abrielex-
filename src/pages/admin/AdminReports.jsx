import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Loader } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";

export default function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [r, setR] = useState({});

  useEffect(() => { (async () => {
    try {
      const [users, companies, cases, quotes, consultations, deadlines, docs, tasks] = await Promise.all([
        adminList("User"), adminList("Company"), adminList("ServiceCase"), adminList("Quote"),
        adminList("ConsultationBooking"), adminList("Deadline", "date"), adminList("PortalDocument"), adminList("PortalTask"),
      ]);
      const clients = users.filter((u) => u.role === "user");
      const byCountry = {};
      clients.forEach((u) => { const c = u.data?.country || "unknown"; byCountry[c] = (byCountry[c] || 0) + 1; });
      const servicesRequested = {};
      cases.forEach((c) => { servicesRequested[c.service_category] = (servicesRequested[c.service_category] || 0) + 1; });
      const workload = {};
      cases.forEach((c) => { if (c.assigned_staff_name) workload[c.assigned_staff_name] = (workload[c.assigned_staff_name] || 0) + 1; });
      setR({
        totalClients: clients.length, activeClients: new Set(cases.map((c) => c.customer_id)).size,
        activeCases: cases.filter((c) => !["completed", "closed"].includes(c.status)).length,
        completedCases: cases.filter((c) => c.status === "completed").length,
        pendingDocs: docs.filter((d) => d.status === "requested").length,
        upcomingDeadlines: deadlines.filter((d) => d.status !== "done" && new Date(d.date) >= new Date(new Date().toDateString())).length,
        quotes: quotes.length, consultations: consultations.length, tasks: tasks.length,
        byCountry, servicesRequested, workload,
      });
    } catch {} finally { setLoading(false); }
  })(); }, []);

  if (loading) return <Loader />;

  const stats = [
    ["Total clients", r.totalClients], ["Active clients", r.activeClients], ["Active cases", r.activeCases],
    ["Completed cases", r.completedCases], ["Pending documents", r.pendingDocs], ["Upcoming deadlines", r.upcomingDeadlines],
    ["Quotes", r.quotes], ["Consultations", r.consultations], ["Tasks", r.tasks],
  ];

  return (
    <div>
      <PageHeader title="Reports" subtitle="Operational insights" />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {stats.map(([label, value]) => (
          <Card key={label} className="p-5"><div className="text-3xl font-bold">{value}</div><div className="text-xs text-muted-foreground">{label}</div></Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5"><h2 className="mb-3 font-serif-display text-base font-semibold">Clients by country</h2>
          {Object.keys(r.byCountry || {}).length === 0 ? <p className="text-sm text-muted-foreground">No data.</p>
            : <ul className="space-y-2">{Object.entries(r.byCountry).map(([k, v]) => <li key={k} className="flex justify-between text-sm"><span>{k}</span><span className="font-medium">{v}</span></li>)}</ul>}
        </Card>
        <Card className="p-5"><h2 className="mb-3 font-serif-display text-base font-semibold">Services requested</h2>
          {Object.keys(r.servicesRequested || {}).length === 0 ? <p className="text-sm text-muted-foreground">No data.</p>
            : <ul className="space-y-2">{Object.entries(r.servicesRequested).map(([k, v]) => <li key={k} className="flex justify-between text-sm"><span className="truncate">{k}</span><span className="font-medium">{v}</span></li>)}</ul>}
        </Card>
        <Card className="p-5"><h2 className="mb-3 font-serif-display text-base font-semibold">Staff workload</h2>
          {Object.keys(r.workload || {}).length === 0 ? <p className="text-sm text-muted-foreground">No assignments.</p>
            : <ul className="space-y-2">{Object.entries(r.workload).map(([k, v]) => <li key={k} className="flex justify-between text-sm"><span className="truncate">{k}</span><span className="font-medium">{v} cases</span></li>)}</ul>}
        </Card>
      </div>
    </div>
  );
}