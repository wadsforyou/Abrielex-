import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Bell, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { portalNav } from "@/lib/portalNav";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function PortalShell() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await base44.entities.PortalNotification.filter({ read: false }, "-created_date", 50);
        if (alive) setUnread(list.length);
      } catch {}
    })();
    const unsub = base44.entities.PortalNotification?.subscribe?.(() => {});
    return () => { alive = false; if (unsub) unsub(); };
  }, []);

  function handleLogout() {
    logout(false);
    navigate("/login");
  }

  const Sidebar = (
    <div className="flex h-full flex-col bg-foreground text-white/80">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <Link to="/portal" className="flex items-center">
          <Logo variant="light" className="h-12" />
        </Link>
        <button className="lg:hidden text-white/70" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {portalNav.map((n) => (
          <NavLink
            key={n.to} to={n.to} end={n.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-white/70 hover:bg-white/10 hover:text-white")
            }
          >
            <n.icon className="h-4 w-4" /> {n.label}
            {n.label === "Notifications" && unread > 0 && (
              <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs">{unread}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className="mb-2 truncate px-3 text-xs text-white/50">{user?.email}</div>
        <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
          <ExternalLink className="h-4 w-4" /> Back to website
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">{Sidebar}</aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">{Sidebar}</div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <span className="font-serif-display text-sm font-semibold text-foreground">Client Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/portal/notifications" className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              {unread > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />}
            </Link>
            <Link to="/portal/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {(user?.full_name || user?.email || "U").charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}