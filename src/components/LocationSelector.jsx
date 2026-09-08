import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useCountry } from "@/lib/CountryContext";
import { cn } from "@/lib/utils";

export default function LocationSelector({ className, compact = false }) {
  const { country, location, setLocation } = useCountry();
  const [state, setLocalState] = useState(location.state || "");
  const [city, setCity] = useState(location.city || "");

  function handleState(value) {
    setLocalState(value);
    setCity("");
    setLocation({ state: value, city: "" });
  }
  function handleCity(value) {
    setCity(value);
    setLocation({ state, city: value });
  }

  const states = country.states || [];
  const cities = states.find((s) => s.name === state)?.cities || [];

  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3", className)}>
      <Field label="Country" icon={<MapPin className="h-4 w-4" />}>
        <div className="flex h-11 items-center rounded-md border border-border bg-muted/40 px-3 text-sm font-medium">
          {country.flag} {country.name}
        </div>
      </Field>
      <Field label="State / Province / Region">
        <Select value={state} onChange={(e) => handleState(e.target.value)} placeholder="Select region">
          {states.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </Select>
      </Field>
      <Field label="City">
        <Select value={city} onChange={(e) => handleCity(e.target.value)} placeholder="Select city" disabled={!state}>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </Field>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="flex items-center gap-1.5">{icon}{label}</span>
      </label>
      {children}
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="h-11 w-full appearance-none rounded-md border border-border bg-card px-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
      >
        <option value="">{props.placeholder || "Select"}</option>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}