import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serviceCategories, companyInfo } from "@/lib/siteData";
import { useCountry } from "@/lib/CountryContext";
import { getCountryServices } from "@/lib/siteData";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const HERO_IMG = "https://media.base44.com/images/public/6a9fbe96952aa2db4053eb18/c22394e5b_generated_0ce47f73.jpg";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const { country } = useCountry();
  const countryServices = getCountryServices(country.code);

  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Professional business consultancy"
          fittingType="fill"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-card/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* logo watermark */}
      <div
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 opacity-[0.04] lg:block"
        style={{ width: "60%", height: "120%" }}
      >
        <img src={companyInfo.logoUrl} alt="" className="h-full w-full object-contain" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        {/* left: headline + CTAs */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {companyInfo.tagline}.
            </span>
          </div>
          <h1 className="font-serif-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Business registration, compliance, tax &amp; financial consultancy.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Abrielex Business Consultancy delivers professional company secretarial, tax,
            procurement, bookkeeping and general business services — in person and online across
            multiple countries. {companyInfo.tagline}.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/get-a-quote" className="group flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
              Get a Quote / Book a Consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary">
              Contact Us
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Remote / online services</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Multi-country coverage</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {country.flag} {country.name}</span>
          </div>
        </div>

        {/* right: service ledger */}
        <div className="relative lg:pl-8">
          <div className="border border-border bg-card/80 backdrop-blur">
            <div className="border-b border-border bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/80">
              Service Ledger — {country.name}
            </div>
            <ul>
              {countryServices.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "group flex items-center justify-between gap-3 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-accent",
                      active === i && "bg-accent"
                    )}
                  >
                    <div>
                      <div className="font-serif-display text-base font-semibold text-foreground">{s.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{s.short}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}