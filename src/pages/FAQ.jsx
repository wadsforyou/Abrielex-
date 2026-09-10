import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { generalFaqs, countryFaqs } from "@/lib/siteData";
import { useSiteContent } from "@/hooks/use-site-content";

export default function FAQ() {
  const text = useSiteContent("faq");
  const items = [...generalFaqs, ...(countryFaqs.ZW || [])];

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
            {text("intro", "Answers to common questions about our services and how we work.")}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          {items.length > 0 ? (
            <FAQAccordion items={items} />
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center text-sm text-muted-foreground">
              No FAQs available yet.
            </div>
          )}

          <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 className="font-serif-display text-xl font-semibold">{text("cta_title", "Still have questions?")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text("cta_description", "Contact the agency and we'll be happy to help.")}</p>
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