import React from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { testimonials } from "@/lib/siteData";

export default function Testimonials() {
  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Testimonials</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Success stories</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            Real experiences from clients we've helped. This section is managed through the admin
            dashboard and will populate as testimonials are added.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {testimonials.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="flex flex-col border border-border bg-card p-7">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="mt-4 flex-1 font-serif-display text-lg italic">"{t.quote}"</p>
                  <footer className="mt-5 border-t border-border pt-4 text-sm">
                    <div className="font-semibold text-foreground">{t.author}</div>
                    {t.role && <div className="text-muted-foreground">{t.role}</div>}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
              <Quote className="h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 font-serif-display text-xl font-semibold">No testimonials yet</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                This section is ready for client testimonials. Once added through the admin dashboard,
                success stories will be displayed here. We do not publish unverified testimonials.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}