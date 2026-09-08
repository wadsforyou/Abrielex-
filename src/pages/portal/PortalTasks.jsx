import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CheckSquare } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState } from "@/components/portal/ui";
import { titleCase } from "@/lib/portalConfig";

export default function PortalTasks() {
  const [params] = useSearchParams();
  const companyFilter = params.get("company");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      let list = await base44.entities.PortalTask.filter({}, "-due_date", 200);
      if (companyFilter) list = list.filter((t) => t.company_id === companyFilter);
      setTasks(list);
    } catch {} finally { setLoading(false); }
  })(); }, [companyFilter]);

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Tasks" subtitle="Tasks assigned to you by Abrielex" />
      {tasks.length === 0 ? <EmptyState icon={CheckSquare} title="No tasks" message="Tasks assigned to you will appear here." />
        : <Card className="divide-y divide-border">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-start justify-between p-4">
              <div><div className="text-sm font-medium">{t.title}</div>{t.description && <div className="text-xs text-muted-foreground">{t.description}</div>}{t.due_date && <div className="text-xs text-muted-foreground">Due: {new Date(t.due_date).toLocaleDateString()}</div>}</div>
              <div className="flex items-center gap-2"><span className="text-xs capitalize text-muted-foreground">{titleCase(t.priority)}</span><StatusBadge status={t.status} /></div>
            </div>
          ))}
        </Card>}
    </div>
  );
}