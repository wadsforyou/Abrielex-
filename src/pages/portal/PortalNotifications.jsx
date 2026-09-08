import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Bell, CheckCheck } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState } from "@/components/portal/ui";

export default function PortalNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await base44.entities.PortalNotification.filter({}, "-created_date", 100)); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function markAllRead() {
    const unread = items.filter((i) => !i.read);
    if (unread.length === 0) return;
    await base44.entities.PortalNotification.bulkUpdate(unread.map((i) => ({ id: i.id, read: true })));
    await load();
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Your activity and updates"
        actions={items.some((i) => !i.read) ? [<button key="r" onClick={markAllRead} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"><CheckCheck className="h-4 w-4" /> Mark all read</button>] : []} />
      {items.length === 0 ? <EmptyState icon={Bell} title="No notifications" message="You're all caught up." />
        : <Card className="divide-y divide-border">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 p-4 ${n.read ? "" : "bg-accent/30"}`}>
              <Bell className={`mt-0.5 h-4 w-4 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.body}</div>
                <div className="text-xs text-muted-foreground">{new Date(n.created_date).toLocaleString()}</div>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 rounded-full bg-primary" />}
            </div>
          ))}
        </Card>}
    </div>
  );
}