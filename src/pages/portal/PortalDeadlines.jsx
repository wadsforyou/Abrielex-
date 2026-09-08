import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CalendarDays } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState } from "@/components/portal/ui";
import { titleCase } from "@/lib/portalConfig";

function daysUntil(d) { return Math.round((new Date(d) - new Date(new Date().toDateString())) / 86400000); }

export default function PortalDeadlines() {
  const [params] = useSearchParams();
  const companyFilter = params.get("company");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      let list = await base44.entities.Deadline.filter({}, "date", 200);
      if (companyFilter) list = list.filter((d) => d.company_id === companyFilter);
      setItems(list);
    } catch {} finally { setLoading(false); }
  })(); }, [companyFilter]);

  if (loading) return <Loader />;

  const computed = items.map((d) => {
    const dd = daysUntil(d.date);
    const status = d.status === "done" ? "done" : dd < 0 ? "overdue" : dd <= 7 ? "due_soon" : "upcoming";
    return { ...d, computedStatus: status, days: dd };
  });

  return (
    <div>
      <PageHeader title="Deadlines & Renewals" subtitle="Stay ahead of your compliance dates" />
      {computed.length === 0 ? <EmptyState icon={CalendarDays} title="No deadlines" message="Your deadlines and renewals will appear here." />
        : <Card className="divide-y divide-border">
          {computed.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-4">
              <div><div className="text-sm font-medium">{d.title}</div><div className="text-xs text-muted-foreground">{d.company_name} · {titleCase(d.type)} · {new Date(d.date).toLocaleDateString()}</div></div>
              <div className="flex items-center gap-3"><span className="text-xs text-muted-foreground">{d.days < 0 ? `${Math.abs(d.days)}d overdue` : d.days === 0 ? "Today" : `in ${d.days}d`}</span><StatusBadge status={d.computedStatus} /></div>
            </div>
          ))}
        </Card>}
    </div>
  );
}