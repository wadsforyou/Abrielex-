import React from "react";
import { coveragePoints, countries } from "@/lib/siteData";
import { cn } from "@/lib/utils";

export default function CoverageMap({ className }) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg border border-border bg-muted/30", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Abrielex international coverage map">
        {/* subtle grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-border" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* simplified region blocks */}
        <g className="text-secondary fill-secondary">
          {/* Africa block */}
          <path d="M20 25 L60 25 L62 60 L55 75 L48 72 L40 80 L30 78 L22 68 Z" fillOpacity="0.5" />
          {/* Australia block */}
          <path d="M78 80 L95 80 L95 95 L78 95 Z" fillOpacity="0.5" />
        </g>

        {/* connection lines from Bulawayo hub */}
        <g className="stroke-primary" strokeOpacity="0.25" strokeWidth="0.3" fill="none">
          {coveragePoints.filter((p) => !p.primary).map((p, i) => (
            <line key={i} x1="32" y1="58" x2={p.x} y2={p.y} strokeDasharray="0.6 0.6" />
          ))}
        </g>

        {/* coverage points */}
        {coveragePoints.map((p) => (
          <g key={p.city}>
            {p.primary && (
              <circle cx={p.x} cy={p.y} r="2.4" className="fill-primary/20">
                <animate attributeName="r" values="2.4;3.6;2.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={p.primary ? 1.6 : 0.9}
              className={p.primary ? "fill-primary" : "fill-primary/60"}
            />
            <text
              x={p.x + 2.2}
              y={p.y + 0.8}
              className="fill-foreground/70"
              style={{ fontSize: "2.2px", fontFamily: "Inter, sans-serif" }}
            >
              {p.city}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
        {countries.map((c) => (
          <span key={c.code} className="rounded border border-border bg-card/90 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
            {c.flag} {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}