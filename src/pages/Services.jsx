import React, { useState } from "react";
import { Search } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useCountry } from "@/lib/CountryContext";
import { getCountryServices } from "@/lib/siteData";

export default function Services() {
  const { country } = useCountry();
  const [query, setQuery] = useState("");
  const countryServices = getCountryServices(country.code);

  const filtered = countryServices.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.short.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Services</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">
            Our services — {country.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five core categories of professional business solutions, adapted to the regulatory
            bodies and terminology of {country.name}. Open any dossier for full details — what it
            is, who it's for, requirements, process and how to request it. Change your country in
            the header to see a different jurisdiction's services.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <SectionHeading eyebrow={`All services — ${country.name}`} title="Browse by category" />
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services…"
                className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center text-sm text-muted-foreground">
              No services match "{query}".
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}