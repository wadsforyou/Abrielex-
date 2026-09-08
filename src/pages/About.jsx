import React from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Compass, MapPin, Laptop, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { Image } from "@/components/ui/image";
import { companyInfo } from "@/lib/siteData";

const OFFICE_IMG = "https://media.base44.com/images/public/6a9fbe96952aa2db4053eb18/94bdf4fb9_generated_147ebd7a.jpg";

const values = [
  { title: "Integrity", desc: "We act honestly and transparently in every engagement." },
  { title: "Professionalism", desc: "We deliver every service to a high professional standard." },
  { title: "Reliability", desc: "We do what we say, on time, every time." },
  { title: "Accessibility", desc: "We make professional services available remotely and affordably." },
  { title: "Client focus", desc: "We tailor solutions to each client's real needs." },
  { title: "Value for money", desc: "We deliver meaningful value at fair, transparent pricing." },
];

export default function About() {
  return (
    <>
      {/* hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">About Us</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">
            Professional business solutions, built on trust
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {companyInfo.name} is a business consultancy providing registration, compliance, tax,
            financial and general business services — in person from Bulawayo and online across our
            coverage areas.
          </p>
        </div>
      </section>

      {/* company introduction */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-lg border border-border">
            <Image src={OFFICE_IMG} alt="Abrielex office building" fittingType="fill" className="aspect-[3/2] w-full" />
          </div>
          <div>
            <SectionHeading eyebrow="Who we are" title="Company introduction" description="We help individuals and businesses navigate the regulatory and administrative demands of running a compliant operation — from first registration through to ongoing tax, financial and general business needs." />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our approach combines professional expertise with accessible, remote-friendly service
              delivery, so you can get expert help without the inconvenience of travel or delays.
            </p>
          </div>
        </div>
      </section>

      {/* our story */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionHeading eyebrow="Our story" title="Built to make compliance simple" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Abrielex was founded to provide value-for-money business solutions to entrepreneurs and
            organisations who need professional help with registration, tax, procurement and
            financial matters. We recognised that many businesses struggle with the complexity of
            regulatory compliance, and we set out to make the process straightforward, affordable and
            accessible — both in person and online. (This section is editable through the CMS and can
            be expanded with the full company history.)
          </p>
        </div>
      </section>

      {/* mission / vision */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-10">
            <Target className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To provide accessible, professional and value-for-money business solutions that help
              individuals and organisations register, comply and grow with confidence.
            </p>
          </div>
          <div className="bg-card p-10">
            <Eye className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif-display text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To be a trusted multi-country business consultancy, recognised for making compliance
              simple and professional services accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading align="center" eyebrow="What we stand for" title="Core values" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-7">
                <Compass className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <h4 className="mt-4 font-serif-display text-lg font-semibold">{v.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why choose / approach */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Why choose us" title="A professional, accessible approach" description="We combine regulatory expertise with a client-focused, remote-friendly delivery model." />
              <ul className="mt-8 space-y-4">
                {[
                  "Direct professional handling of your matter",
                  "Remote and online service across coverage areas",
                  "Clear process, documents and timelines",
                  "Ongoing support to keep you compliant",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start gap-4 border border-border bg-card p-6">
                <MapPin className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif-display text-lg font-semibold">Areas covered</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{companyInfo.coverage.join(", ")} and surrounding regions, with remote services across Zimbabwe, South Africa, Zambia, Mozambique and Australia.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border border-border bg-card p-6">
                <Laptop className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif-display text-lg font-semibold">Remote / online services</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Most of our services can be completed remotely — share your documents digitally and we handle the rest, wherever you are.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Let's work together" description="Find out how Abrielex can support your business — get a quote or book a consultation today." />
    </>
  );
}