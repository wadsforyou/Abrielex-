import React from "react";
import { cn } from "@/lib/utils";
import { titleCase, statusTone } from "@/lib/portalConfig";

const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

export function StatusBadge({ status, className }) {
  const tone = statusTone(status);
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", toneClasses[tone], className)}>
      {titleCase(status)}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif-display text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className }) {
  return <div className={cn("rounded-lg border border-border bg-card", className)}>{children}</div>;
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
      {Icon && <Icon className="h-9 w-9 text-muted-foreground/40" />}
      <h3 className="mt-3 font-serif-display text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Loader({ label = "Loading…" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-20 text-sm text-muted-foreground">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label}
    </div>
  );
}

export function Field({ label, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "h-10 w-full rounded-md border border-input bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary";