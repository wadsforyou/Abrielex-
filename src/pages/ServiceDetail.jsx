import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, Clock, FileText, ListChecks, Workflow, HelpCircle, ArrowRight } from "lucide-react";
import ServiceActions from "@/components/ServiceActions";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { serviceDetails, serviceCategories } from "@/lib/siteData";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "requirements", label: "Requirements" },
  { id: "process", label: "Process" },
  { id: "documents", label: "Documents" },
  { id: "faqs", label: "FAQs" },
  { id: "related", label: "Related" },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const [active, setActive] = useState("overview");
  const detail = serviceDetails[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [slug]);

  if (!detail) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif-display text-3xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          Back to services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const category = serviceCategories.find((c) => c.slug === slug);
  const displayTitle = category?.title || detail.title;

  return (
    <>
      {/* hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <nav className="mb-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> /{" "}
            <Link to="/services" className="hover:text-primary">Services</Link> /{" "}
            <span className="text-foreground">{displayTitle}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Service Dossier</span>
            <h1 className="mt-3 font-serif-display text-4xl font-bold sm:text-5xl text-balance">{displayTitle}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{detail.intro}</p>
            <div className="mt-8">
              <ServiceActions serviceSlug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* split layout */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr]">
          {/* sticky nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contents</div>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                      active === s.id
                        ? "border-primary font-semibold text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* content */}
          <div className="max-w-3xl space-y-16">
            <Block id="overview" icon={<FileText className="h-5 w-5" />} title="Overview">
              <Grid2>
                <Card title="What it is">{detail.whatItIs}</Card>
                <Card title="What it's used for">{detail.usedFor}</Card>
                <Card title="Who it's for">{detail.whoFor}</Card>
                <Card title="How it helps">{detail.howItHelps}</Card>
              </Grid2>
              <div className="mt-6">
                <h4 className="mb-3 font-serif-display text-lg font-semibold">Sub-services</h4>
                <ul className="divide-y divide-border border-y border-border">
                  {detail.subServices.map((s) => (
                    <li key={s.name} className="py-3">
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="text-sm text-muted-foreground">{s.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </Block>

            <Block id="benefits" icon={<Check className="h-5 w-5" />} title="Benefits">
              <ul className="grid gap-3 sm:grid-cols-2">
                {detail.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="requirements" icon={<ListChecks className="h-5 w-5" />} title="Requirements">
              <ul className="space-y-2.5">
                {detail.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="process" icon={<Workflow className="h-5 w-5" />} title="Process">
              <ol className="space-y-4">
                {detail.process.map((p, i) => (
                  <li key={p} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/30 bg-accent font-serif-display text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm">{p}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-start gap-3 rounded-md border border-border bg-muted/40 p-4 text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><strong>Processing time:</strong> {detail.processingTime}</span>
              </div>
            </Block>

            <Block id="documents" icon={<FileText className="h-5 w-5" />} title="Expected documents">
              <ul className="flex flex-wrap gap-2">
                {detail.documents.map((d) => (
                  <li key={d} className="rounded border border-border bg-card px-3 py-1.5 text-sm">{d}</li>
                ))}
              </ul>
            </Block>

            <Block id="faqs" icon={<HelpCircle className="h-5 w-5" />} title="FAQs">
              <FAQAccordion items={detail.faqs} />
            </Block>

            <Block id="related" icon={<ArrowRight className="h-5 w-5" />} title="Related services">
              <div className="grid gap-5 sm:grid-cols-2">
                {detail.related.map((relSlug) => {
                  const rel = serviceCategories.find((c) => c.slug === relSlug);
                  if (!rel) return null;
                  return <ServiceCard key={rel.slug} service={rel} index={serviceCategories.indexOf(rel)} />;
                })}
              </div>
            </Block>
          </div>
        </div>
      </section>

      <CTASection title={`Request ${displayTitle}`} description="Get a quote, book a consultation, or contact the agency to get started." />
    </>
  );
}

function Block({ id, icon, title, children }) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-3">
        <span className="text-primary">{icon}</span>
        <h2 className="font-serif-display text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Grid2({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Card({ title, children }) {
  return (
    <div className="border border-border bg-card p-5">
      <h4 className="mb-2 font-serif-display text-sm font-semibold uppercase tracking-wide text-primary">{title}</h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}