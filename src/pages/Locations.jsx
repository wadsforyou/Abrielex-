import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Seo from "@/components/Seo";
import { useLocations, useCompanyInfo } from "@/lib/cms";

function slugifyCity(city) {
  return String(city || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function Locations() {
  const { city: citySlug } = useParams();
  const locations = useLocations();
  const companyInfo = useCompanyInfo();
  const cities = locations.map((l) => l.city).filter(Boolean);

  // City detail view
  if (citySlug) {
    const city = cities.find((c) => slugifyCity(c) === citySlug);
    if (!city) {
      return (
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-serif-display text-3xl font-bold">Location not found</h1>
          <p className="mt-4 text-muted-foreground">We couldn't find that city in our coverage area.</p>
          <Link to="/locations" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
            Back to all locations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      );
    }
    const slug = slugifyCity(city);
    return (
      <>
        <Seo title={`${city} Business Consultancy & Registration Services — Abrielex`} description={`Professional business registration, compliance, tax, procurement and bookkeeping services in ${city}, Zimbabwe, delivered by Abrielex Business Consultancy — remotely or in person.`} image={companyInfo.logoUrl} />
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Coverage</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">
              Business services in {city}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Abrielex Business Consultancy provides business registration, compliance, tax, procurement,
              bookkeeping and administrative services to clients in {city}, Zimbabwe — in person or remotely.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to={`/services`} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">
                Our services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <SectionHeading eyebrow="Why locations matter" title={`Services available in ${city}`} description="All of our core services are available to clients in this city. You can engage us remotely for most services, or visit our head office in Bulawayo." />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "Company registration & secretarial",
                "ZIMRA tax & customs services",
                "PRAZ & vendor number registration",
                "Bookkeeping & financial services",
                "Liquor & shop licences",
                "Tenders & bidding documentation",
                "NSSA services",
                "Internal audits & stocktakes",
              ].map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionHeading eyebrow="Coverage" title="Other cities we serve" />
            <div className="mt-8 flex flex-wrap gap-3">
              {cities.filter((c) => slugifyCity(c) !== slug).map((c) => (
                <Link key={c} to={`/locations/${slugifyCity(c)}`} className="rounded border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </>
    );
  }

  // Overview of all cities
  return (
    <>
      <Seo title="Our Coverage — Business Services Across Zimbabwe" description="Abrielex Business Consultancy serves businesses across Zimbabwe — from our base in Bulawayo to Harare, Victoria Falls, Masvingo, Chiredzi and more, with remote and online service delivery." image={companyInfo.logoUrl} />
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Coverage</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Where we work</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From our base in Bulawayo, we deliver business consultancy services across Zimbabwe — remotely or in person.
            Select a city to see the services available there.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <Link key={c} to={`/locations/${slugifyCity(c)}`} className="group flex items-center justify-between border border-border bg-card p-6 transition-colors hover:border-primary">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-serif-display font-semibold group-hover:text-primary">{c}</div>
                    <div className="text-xs text-muted-foreground">Business services</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't see your city? Most services can be delivered remotely — <Link to="/contact" className="text-primary underline">contact us</Link> to find out how.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}