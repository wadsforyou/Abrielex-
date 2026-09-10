import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { RefreshCw } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState } from "@/components/portal/ui";
import { titleCase } from "@/lib/portalConfig";
import { adminFilter } from "@/lib/adminData";

function daysUntil(d) { return Math.round((new Date(d) - new Date(new Date().toDateString())) / 86400000); }

export default function AdminRenewals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      const [deadlines, compliance] = await Promise.all([
        adminFilter("Deadline", {}, "date", 500),
        adminFilter("ComplianceItem", {}, "-created_date", 500),
      ]);
      const dItems = deadlines.filter((d) => d.status !== "done").map((d) => ({ id: d.id, title: d.title, company_name: d.company_name, type: titleCase(d.type), date: d.date, days: daysUntil(d.date) }));
      const cItems = compliance.filter((c) => c.expiry_date && c.status !== "completed" && c.status !== "closed").map((c) => ({ id: c.id, title: c.label, company_name: c.company_name, type: titleCase(c.type), date: c.expiry_date, days: daysUntil(c.expiry_date) }));
      setItems([...dItems, ...cItems].sort((a, b) => a.days - b.days));
    } catch {} finally { setLoading(false); }
  })(); }, []);

  if (loading) return <Loader />;

  const groups = {
    overdue: items.filter((i) => i.days < 0),
    d1: items.filter((i) => i.days >= 0 && i.days <= 1),
    d7: items.filter((i) => i.days > 1 && i.days <= 7),
    d14: items.filter((i) => i.days > 7 && i.days <= 14),
    d30: items.filter((i) => i.days > 14 && i.days <= 30),
    later: items.filter((i) => i.days > 30),
  };
  const labels = { overdue: "Overdue", d1: "Due today / tomorrow", d7: "Within 7 days", d14: "Within 14 days", d30: "Within 30 days", later: "Later" };

  return (
    <div>
      <PageHeader title="Renewals" subtitle="Upcoming compliance renewals & expiries across all clients" />
      {items.length === 0 ? <EmptyState icon={RefreshCw} title="No renewals" message="Add deadlines or compliance expiry dates to track renewals." />
        : <div className="space-y-6">
          {Object.entries(groups).map(([k, list]) => list.length > 0 && (
            <Card key={k} className="p-5">
              <h2 className="mb-3 flex items-center gap-2 font-serif-display text-base font-semibold">
                <StatusBadge status={k === "overdue" ? "overdue" : k === "d1" ? "due_soon" : "upcoming"} /> {labels[k]} ({list.length})
              </h2>
              <ul className="divide-y divide-border">
                {list.map((i) => (
                  <li key={i.id} className="flex items-center justify-between py-3">
                    <div><div className="text-sm font-medium">{i.title}</div><div className="text-xs text-muted-foreground">{i.company_name} · {i.type} · {new Date(i.date).toLocaleDateString()}</div></div>
                    <span className="text-xs text-muted-foreground">{i.days < 0 ? `${Math.abs(i.days)}d overdue` : i.days === 0 ? "Today" : `in ${i.days}d`}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>}
    </div>
  );
}