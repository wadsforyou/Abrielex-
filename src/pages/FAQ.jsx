import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { useCountry } from "@/lib/CountryContext";
import { generalFaqs, countryFaqs } from "@/lib/siteData";

export default function FAQ() {
  const { country } = useCountry();
  const [tab, setTab] = useState("general");

  const countryItems = countryFaqs[country.code] || [];
  const items = tab === "general" ? generalFaqs : countryItems;

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">FAQ</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Frequently asked questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            Answers to common questions about our services and how we work.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-8 flex gap-2 border-b border-border">
            <button onClick={() => setTab("general")} className={`px-4 py-3 text-sm font-semibold transition-colors ${tab === "general" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              General
            </button>
            <button onClick={() => setTab("country")} className={`px-4 py-3 text-sm font-semibold transition-colors ${tab === "country" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {country.name}
            </button>
          </div>

          {items.length > 0 ? (
            <FAQAccordion items={items} />
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center text-sm text-muted-foreground">
              No country-specific FAQs for {country.name} yet. This area is ready for content to be added through the admin dashboard.
            </div>
          )}

          <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 className="font-serif-display text-xl font-semibold">Still have questions?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Contact the agency and we'll be happy to help.</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}