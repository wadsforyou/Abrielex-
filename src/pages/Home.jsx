import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, MapPin, Clock, Users, FileCheck2, Sparkles } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CoverageMap from "@/components/CoverageMap";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Seo from "@/components/Seo";
import { Image } from "@/components/ui/image";
import { useSiteContent } from "@/hooks/use-site-content";
import {
  serviceCategories,
  generalFaqs,
  countryFaqs,
  resources,
  companyInfo,
} from "@/lib/siteData";

const CONSULT_IMG = "https://media.base44.com/images/public/6a9fbe96952aa2db4053eb18/582a64e5b_generated_10b126d7.jpg";

const whyChoose = [
  { icon: ShieldCheck, key: "compliance", title: "Compliance you can trust", desc: "We keep your business legally compliant with the relevant registries and authorities in Zimbabwe." },
  { icon: MapPin, key: "coverage", title: "Multi-city coverage", desc: "Services delivered across Bulawayo, Harare and many more cities throughout Zimbabwe." },
  { icon: Clock, key: "remote", title: "Remote & online", desc: "Engage us from anywhere — no office visit required across our coverage areas." },
  { icon: Users, key: "personal", title: "Personal service", desc: "Direct, professional support tailored to your business or individual needs." },
  { icon: FileCheck2, key: "endtoend", title: "End-to-end handling", desc: "From registration to ongoing maintenance — we manage the full process." },
  { icon: Sparkles, key: "secure", title: "Secure & reliable", desc: "Professional solutions that protect and grow your business with confidence." },
];

const howItWorks = [
  { step: "01", key: "step1", title: "Tell us your need", desc: "Request a service, get a quote, or book a consultation through the site or WhatsApp." },
  { step: "02", key: "step2", title: "We review & advise", desc: "We assess your requirements and confirm the process, documents and timeline." },
  { step: "03", key: "step3", title: "We handle the process", desc: "We prepare, submit and manage everything with the relevant authorities on your behalf." },
  { step: "04", key: "step4", title: "You stay compliant", desc: "You receive your documents and ongoing support to remain compliant." },
];

export default function Home() {
  const text = useSiteContent("home");
  return (
    <>
      <Seo title="Abrielex Business Consultancy — Secure Your Business With Us" description="Professional business registration, tax, procurement, bookkeeping and compliance services across multiple cities in Zimbabwe." image={companyInfo.logoUrl} />
      <HeroSection />

      {/* INTRODUCTION */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow={text("intro_eyebrow", "Introduction")}
              title={text("intro_title", "Your partner for business registration & compliance")}
              description={text("intro_description", "Abrielex Business Consultancy is a professional consultancy based in Bulawayo, Zimbabwe, offering a complete range of business registration, compliance, tax, financial and general business services. We help individuals and businesses get registered, stay compliant, and grow — with the convenience of remote and online service delivery.")}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image src={CONSULT_IMG} alt="Professional consultation" fittingType="fill" className="aspect-[4/3] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SERVICE CATEGORIES */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            align="center"
            eyebrow={text("categories_eyebrow", "What we do")}
            title={text("categories_title", "Main service categories")}
            description={text("categories_description", "Five core service dossiers covering the full lifecycle of your business — from registration to ongoing compliance and growth.")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow={text("why_eyebrow", "Why Abrielex")} title={text("why_title", "Why choose Abrielex")} description={text("why_description", "Professional, reliable and accessible — built around the real needs of businesses and individuals.")} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w.title} className="bg-card p-7">
                <w.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 font-serif-display text-lg font-semibold">{text(`why_${w.key}_title`, w.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text(`why_${w.key}_desc`, w.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading align="center" eyebrow={text("how_eyebrow", "Process")} title={text("how_title", "How it works")} description={text("how_description", "A clear, four-step process from first contact to completed service.")} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((h) => (
              <div key={h.step} className="relative">
                <div className="font-serif-display text-5xl font-bold text-primary/20">{h.step}</div>
                <h3 className="mt-3 font-serif-display text-lg font-semibold">{text(`how_${h.key}_title`, h.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text(`how_${h.key}_desc`, h.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-CITY COVERAGE */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow={text("coverage_eyebrow", "Multi-city coverage")}
              title={text("coverage_title", "Serving businesses across Zimbabwe")}
              description={text("coverage_description", "From our base in Bulawayo, we provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma. Most services can also be delivered remotely or online — you don't need to visit our office.")}
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {companyInfo.coverage.map((c) => (
                <li key={c} className="rounded border border-border bg-card px-3 py-1.5 text-sm">{c}</li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CoverageMap className="aspect-[4/3]" />
        </div>
      </section>

      {/* RESOURCES PREVIEW */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={text("resources_eyebrow", "Knowledge centre")} title={text("resources_title", "Resources")} description={text("resources_description", "Guides, checklists and articles to help you understand compliance.")} />
            <Link to="/resources" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              All resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {resources.slice(0, 3).map((r) => (
              <Link key={r.title} to="/resources" className="group border border-border bg-card p-6 transition-colors hover:border-primary">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{r.type}</span>
                <h3 className="mt-3 font-serif-display text-lg font-semibold group-hover:text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionHeading align="center" eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10">
            <FAQAccordion items={[...generalFaqs, ...(countryFaqs.ZW || [])].slice(0, 6)} />
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}