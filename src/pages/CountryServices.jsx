import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LocationSelector from "@/components/LocationSelector";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useCountry } from "@/lib/CountryContext";
import { serviceCategories } from "@/lib/siteData";

export default function CountryServices() {
  const { country, isConfirmed, location } = useCountry();

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Country Services</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">
            Services for {country.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The same five service categories, adapted to the regulatory bodies, terminology and
            processes of your selected country. Select your location to personalise the information.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading eyebrow="Your location" title="Select your country & region" description="Your selection updates the regulatory bodies shown below." />
          <div className="mt-8 max-w-4xl">
            <LocationSelector />
            {(location.state || location.city) && (
              <p className="mt-4 text-sm text-muted-foreground">
                Showing services for <strong className="text-foreground">{country.name}</strong>
                {location.state && <> · {location.state}</>}
                {location.city && <> · {location.city}</>}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* regulatory DNA */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading eyebrow="Regulatory framework" title={`Regulatory bodies — ${country.name}`} description={isConfirmed ? "Confirmed regulatory authorities for this country." : "This country's framework is being prepared. Items marked 'to be confirmed' require verification before being presented as confirmed services."} />
          {!isConfirmed && (
            <div className="mt-6 flex items-start gap-3 rounded-md border border-amber-300/40 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Information for {country.name} is a working framework. Regulatory body names and processes are marked "to be confirmed" until verified by our team.</p>
            </div>
          )}
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(country.regulatoryBodies).map(([key, value]) => (
              <div key={key} className="bg-card p-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{labelFor(key)}</span>
                  {value.includes("to be confirmed") ? (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">draft</span>
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{value.replace(" (to be confirmed)", "")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading eyebrow="Available services" title="Service categories" description="The same five categories, with country-specific detail on each service page." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function labelFor(key) {
  const map = {
    tax: "Tax & Revenue",
    companies: "Companies Registry",
    procurement: "Procurement",
    local: "Local Authority",
    liquor: "Licensing",
  };
  return map[key] || key;
}