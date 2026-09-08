import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import { countries as staticCountries } from "@/lib/siteData";
import { useCountry } from "@/lib/CountryContext";
import { base44 } from "@/api/base44Client";
import { cn } from "@/lib/utils";

export default function CountrySelector({ variant = "default" }) {
  const { country, countryCode, setCountry } = useCountry();
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState(staticCountries);
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.Country.list("sort_order", 100);
        const active = list.filter((c) => c.active !== false);
        if (active.length) {
          const byCode = Object.fromEntries(staticCountries.map((c) => [c.code, c]));
          active.forEach((c) => {
            byCode[c.code] = { ...byCode[c.code], code: c.code, name: c.name, confirmed: c.confirmed, currency: c.currency || byCode[c.code]?.currency };
          });
          // keep static order for known, append any new
          const ordered = staticCountries.filter((c) => active.some((a) => a.code === c.code)).map((c) => byCode[c.code]);
          active.filter((c) => !staticCountries.some((s) => s.code === c.code)).forEach((c) => ordered.push({ code: c.code, name: c.name, flag: "🌐", confirmed: c.confirmed, currency: c.currency }));
          setCountries(ordered);
        }
      } catch { /* fall back to static */ }
    })();
  }, []);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
          variant === "light"
            ? "border-white/20 text-white hover:bg-white/10"
            : "bg-card text-foreground hover:bg-accent"
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="text-base leading-none">{country.flag}</span>
        <span className="hidden sm:inline">{country.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-card shadow-lg"
        >
          {countries.map((c) => (
            <button
              key={c.code}
              role="option"
              aria-selected={c.code === countryCode}
              onClick={() => {
                setCountry(c.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                c.code === countryCode && "bg-accent/60"
              )}
            >
              <span className="text-base">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              {c.code === countryCode && <Check className="h-4 w-4 text-primary" />}
              {!c.confirmed && (
                <span className="text-[9px] uppercase tracking-wide text-muted-foreground">draft</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}