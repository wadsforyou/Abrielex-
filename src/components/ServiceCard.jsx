import React from "react";
import {
  Building2,
  Receipt,
  FileCheck,
  Calculator,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const iconMap = {
  Building2,
  Receipt,
  FileCheck,
  Calculator,
  Briefcase,
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || Building2;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative flex flex-col border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-18px_rgba(42,130,197,0.35)]"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-accent text-primary">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <span className="font-serif-display text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-serif-display text-xl font-bold text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
        <span>Explore dossier</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <span className="absolute left-0 top-0 h-full w-0.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}