import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Inbox, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Loader } from "@/components/portal/ui";
import { adminList } from "@/lib/adminData";

// ---------------------------------------------------------------------------
// ADMIN NOTIFICATION CENTER
//
// The shared inbox for public form submissions. Each record is a real
// AdminNotification created by the backend when a visitor submitted a form.
// Records start unread; opening one marks it read and links to the submission.
// ---------------------------------------------------------------------------

const TYPE_LABEL = {
  quote_request: "Get a Quote",
  consultation_booking: "Consultation",
  contact_message: "Contact",
};

const TYPE_TONE = {
  quote_request: "bg-sky-50 text-sky-700",
  consultation_booking: "bg-violet-50 text-violet-700",
  contact_message: "bg-emerald-50 text-emerald-700",
};

export default function AdminNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  async function load() {
    setLoading(true);
    try {
      setItems(await adminList("AdminNotification", "-created_date", 200));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function markRead(item, read = true) {
    setBusy(item.id);
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read } : n)));
    try {
      await base44.entities.AdminNotification.update(item.id, { read });
    } catch {
      await load();
    } finally {
      setBusy("");
    }
  }

  async function markAllRead() {
    const unread = items.filter((n) => !n.read);
    if (!unread.length) return;
    setBusy("all");
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await Promise.all(unread.map((n) => base44.entities.AdminNotification.update(n.id, { read: true })));
    } catch {
      await load();
    } finally {
      setBusy("");
    }
  }

  if (loading) return <Loader />;

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={
          unreadCount
            ? `${unreadCount} unread submission${unreadCount === 1 ? "" : "s"}`
            : "All submission notifications have been read"
        }
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              disabled={busy === "all"}
              className="inline-flex items-center gap-2 rounded-md border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60"
            >
              <Check className="h-4 w-4" /> Mark all read
            </button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-16 text-center">
          <Inbox className="h-9 w-9 text-muted-foreground/40" />
          <h3 className="mt-3 font-serif-display text-lg font-semibold">No notifications yet</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Notifications appear here the moment a visitor submits the Get a Quote,
            Book a Consultation or Contact form.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <Card
              key={n.id}
              className={`p-5 transition-colors ${n.read ? "" : "border-l-4 border-l-primary bg-primary/[0.03]"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${TYPE_TONE[n.submission_type] || "bg-slate-100 text-slate-600"}`}>
                    <Bell className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif-display text-base font-semibold">{n.title}</h3>
                      {!n.read && (
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">New</span>
                      )}
                      <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${TYPE_TONE[n.submission_type] || "bg-slate-100 text-slate-600"}`}>
                        {TYPE_LABEL[n.submission_type] || n.submission_type || "Submission"}
                      </span>
                    </div>
                    {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {n.created_date ? new Date(n.created_date).toLocaleString() : ""}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {n.link && (
                    <Link
                      to={n.link}
                      onClick={() => markRead(n)}
                      className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90"
                    >
                      Open submission
                    </Link>
                  )}
                  <button
                    onClick={() => markRead(n, !n.read)}
                    disabled={busy === n.id}
                    className="rounded-md border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-60"
                  >
                    {n.read ? "Mark unread" : "Mark read"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}