import React from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-3 flex items-center gap-3" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <span className="h-px w-8 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
          {align === "center" && <span className="h-px w-8 bg-primary" />}
        </div>
      )}
      <h2 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}