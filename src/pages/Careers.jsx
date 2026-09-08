import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { careers } from "@/lib/siteData";

export default function Careers() {
  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Careers</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Careers at Abrielex</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            We're building a team of professionals committed to delivering value-for-money business
            solutions. Open vacancies will be listed here.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {careers.length > 0 ? (
            <div className="space-y-4">
              {careers.map((job, i) => (
                <div key={i} className="border border-border bg-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif-display text-xl font-semibold">{job.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{job.location} · {job.type}</p>
                    </div>
                    <Link to="/contact" className="shrink-0 border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white">
                      Apply
                    </Link>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
              <Briefcase className="h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 font-serif-display text-xl font-semibold">No open vacancies</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                There are no open positions at the moment. Vacancies will be posted here as they become
                available. You're welcome to send your CV to our email for future consideration.
              </p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}