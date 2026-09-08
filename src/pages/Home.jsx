import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Globe2, Clock, Users, FileCheck2, Sparkles } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CoverageMap from "@/components/CoverageMap";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Seo from "@/components/Seo";
import { Image } from "@/components/ui/image";
import { useCountry } from "@/lib/CountryContext";
import {
  getCountryServices,
  generalFaqs,
  resources,
  companyInfo,
} from "@/lib/siteData";

const CONSULT_IMG = "https://media.base44.com/images/public/6a9fbe96952aa2db4053eb18/582a64e5b_generated_10b126d7.jpg";

const whyChoose = [
  { icon: ShieldCheck, title: "Compliance you can trust", desc: "We keep your business legally compliant with the relevant registries and authorities." },
  { icon: Globe2, title: "Multi-country coverage", desc: "Services structured for Zimbabwe, South Africa, Zambia, Mozambique and Australia." },
  { icon: Clock, title: "Remote & online", desc: "Engage us from anywhere — no office visit required across our coverage areas." },
  { icon: Users, title: "Personal service", desc: "Direct, professional support tailored to your business or individual needs." },
  { icon: FileCheck2, title: "End-to-end handling", desc: "From registration to ongoing maintenance — we manage the full process." },
  { icon: Sparkles, title: "Secure & reliable", desc: "Professional solutions that protect and grow your business with confidence." },
];

const howItWorks = [
  { step: "01", title: "Tell us your need", desc: "Request a service, get a quote, or book a consultation through the site or WhatsApp." },
  { step: "02", title: "We review & advise", desc: "We assess your requirements and confirm the process, documents and timeline." },
  { step: "03", title: "We handle the process", desc: "We prepare, submit and manage everything with the relevant authorities on your behalf." },
  { step: "04", title: "You stay compliant", desc: "You receive your documents and ongoing support to remain compliant." },
];

export default function Home() {
  const { country } = useCountry();
  const countryServices = getCountryServices(country.code);

  return (
    <>
      <Seo title="Abrielex Business Consultancy — Secure Your Business With Us" description="Professional business registration, tax, procurement, bookkeeping and compliance services across Zimbabwe, South Africa, Zambia, Mozambique and Australia." image={companyInfo.logoUrl} />
      <HeroSection />

      {/* INTRODUCTION */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Introduction"
              title="Your partner for business registration & compliance"
              description="Abrielex Business Consultancy is a professional consultancy based in Bulawayo, Zimbabwe, offering a complete range of business registration, compliance, tax, financial and general business services. We help individuals and businesses get registered, stay compliant, and grow — with the convenience of remote and online service delivery."
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
            eyebrow={`What we do — ${country.name}`}
            title="Main service categories"
            description="Five core service dossiers covering the full lifecycle of your business — from registration to ongoing compliance and growth. Select your country in the header to see country-specific services."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countryServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow="Why Abrielex" title="Why choose Abrielex" description="Professional, reliable and accessible — built around the real needs of businesses and individuals." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w.title} className="bg-card p-7">
                <w.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 font-serif-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading align="center" eyebrow="Process" title="How it works" description="A clear, four-step process from first contact to completed service." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((h) => (
              <div key={h.step} className="relative">
                <div className="font-serif-display text-5xl font-bold text-primary/20">{h.step}</div>
                <h3 className="mt-3 font-serif-display text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL COVERAGE */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="International coverage"
              title="Serving businesses across borders"
              description="From our base in Bulawayo, we cover major Zimbabwean cities and regions, with remote services extending across Southern Africa and beyond. Select a country in the header to see country-specific services and regulatory information."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {companyInfo.coverage.map((c) => (
                <li key={c} className="rounded border border-border bg-card px-3 py-1.5 text-sm">{c}</li>
              ))}
            </ul>
            <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Explore our services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CoverageMap className="aspect-[4/3]" />
        </div>
      </section>

      {/* RESOURCES PREVIEW */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Knowledge centre" title="Resources" description="Guides, checklists and articles to help you understand compliance." />
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
            <FAQAccordion items={generalFaqs.slice(0, 5)} />
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