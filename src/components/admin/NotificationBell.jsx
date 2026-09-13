import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, Inbox } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

// ---------------------------------------------------------------------------
// ADMIN NOTIFICATION BELL
//
// Shows an unread badge and a dropdown of the latest submissions. Public form
// submissions land in the shared AdminNotification inbox as unread; clicking
// one marks it read and navigates to the matching submission.
//
// Every value shown comes from real AdminNotification records — nothing is
// simulated, and the badge only counts what actually exists.
// ---------------------------------------------------------------------------

const TYPE_LABEL = {
  quote_request: "Get a Quote",
  consultation_booking: "Consultation",
  contact_message: "Contact",
};

function timeAgo(value) {
  if (!value) return "";
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(value).toLocaleDateString();
}

export default function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const wrapRef = useRef(null);

  const load = useCallback(async () => {
    if (!user?.id) return;
    try {
      const rows = await base44.entities.AdminNotification.list("-created_date", 25);
      setItems(rows || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { load(); }, [load]);

  // Refresh periodically so a new submission appears without a manual reload.
  useEffect(() => {
    const id = setInterval(load, 45000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const unread = items.filter((n) => !n.read);

  async function markRead(item) {
    if (item.read) return;
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    try {
      await base44.entities.AdminNotification.update(item.id, { read: true });
    } catch {
      // Revert if the write genuinely failed, so the badge stays truthful.
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: false } : n)));
    }
  }

  async function markAllRead() {
    const ids = unread.map((n) => n.id);
    if (!ids.length) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await Promise.all(ids.map((id) => base44.entities.AdminNotification.update(id, { read: true })));
    } catch {
      load();
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        aria-label={unread.length ? `Notifications, ${unread.length} unread` : "Notifications"}
      >
        <Bell className="h-5 w-5" />
        {unread.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
            {unread.length > 99 ? "99+" : unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-sm font-semibold text-slate-800">Notifications</span>
            {unread.length > 0 && (
              <button onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="px-4 py-6 text-center text-sm text-slate-400">Loading…</p>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center px-4 py-8 text-center">
                <Inbox className="h-7 w-7 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">No notifications yet.</p>
              </div>
            ) : (
              items.map((n) => (
                <Link
                  key={n.id}
                  to={n.link || "/admin"}
                  onClick={() => { markRead(n); setOpen(false); }}
                  className={`flex gap-3 border-b border-slate-50 px-4 py-3 last:border-0 hover:bg-slate-50 ${n.read ? "" : "bg-primary/5"}`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-slate-200" : "bg-primary"}`} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-slate-800">{n.title}</span>
                      {!n.read && <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">NEW</span>}
                    </span>
                    {n.body && <span className="mt-0.5 block truncate text-xs text-slate-500">{n.body}</span>}
                    <span className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{TYPE_LABEL[n.type] || n.type}</span>
                      <span>·</span>
                      <span>{timeAgo(n.created_date)}</span>
                    </span>
                  </span>
                </Link>
              ))
            )}
          </div>

          <Link
            to="/admin/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-slate-100 px-4 py-3 text-center text-xs font-semibold text-primary hover:bg-slate-50"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
