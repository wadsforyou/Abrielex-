import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, Card, Loader } from "@/components/portal/ui";

export default function AdminCalendar() {
  const [cursor, setCursor] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      const [d, c, t] = await Promise.all([
        base44.entities.Deadline.filter({}, "date", 500),
        base44.entities.ConsultationBooking.filter({}, "-preferred_date", 500),
        base44.entities.PortalTask.filter({}, "-due_date", 500),
      ]);
      setEvents([
        ...d.map((x) => ({ date: x.date, label: x.title, tone: "rose" })),
        ...c.map((x) => ({ date: x.preferred_date, label: `${x.name} — ${x.consultation_type}`, tone: "sky" })),
        ...t.filter((x) => x.due_date).map((x) => ({ date: x.due_date, label: x.title, tone: "amber" })),
      ]);
    } catch {} finally { setLoading(false); }
  })(); }, []);

  const year = cursor.getFullYear(), month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  function evtsForDay(day) {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => (e.date || "").startsWith(ds));
  }
  const toneDot = { rose: "bg-rose-500", sky: "bg-sky-500", amber: "bg-amber-500" };

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Calendar" subtitle="Consultations, deadlines & tasks"
        actions={[<div key="nav" className="flex items-center gap-2">
          <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="rounded-md border border-border p-2 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-medium">{cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
          <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="rounded-md border border-border p-2 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
        </div>]} />
      <Card className="p-4">
        <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => (
            <div key={i} className={`min-h-[80px] rounded-md border border-border p-1.5 ${day ? "bg-card" : "bg-transparent"}`}>
              {day && <>
                <div className="text-xs font-medium text-muted-foreground">{day}</div>
                <div className="mt-1 space-y-1">
                  {evtsForDay(day).slice(0, 3).map((e, j) => (
                    <div key={j} className="flex items-center gap-1 text-[10px] text-foreground">
                      <span className={`h-1.5 w-1.5 rounded-full ${toneDot[e.tone]}`} />
                      <span className="truncate">{e.label}</span>
                    </div>
                  ))}
                  {evtsForDay(day).length > 3 && <div className="text-[10px] text-muted-foreground">+{evtsForDay(day).length - 3} more</div>}
                </div>
              </>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Deadline</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-500" /> Consultation</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Task</span>
        </div>
      </Card>
    </div>
  );
}