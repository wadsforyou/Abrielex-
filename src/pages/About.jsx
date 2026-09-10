import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Compass, MapPin, Laptop, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { Image } from "@/components/ui/image";
import { companyInfo } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";

const OFFICE_IMG = "https://media.base44.com/images/public/6a9fbe96952aa2db4053eb18/94bdf4fb9_generated_147ebd7a.jpg";

const values = [
  { title: "Accountability", desc: "We take responsibility for our work and remain committed to delivering dependable services." },
  { title: "Honesty", desc: "We believe that strong business relationships are built on transparency, trust and integrity." },
  { title: "Privacy", desc: "We respect the confidentiality of our clients and the sensitive business information entrusted to us." },
  { title: "Empathy", desc: "We take time to understand the challenges and circumstances of our clients so that we can provide more relevant support." },
  { title: "Innovation & Guidance", desc: "We encourage practical thinking, continuous improvement and informed guidance to help businesses navigate changing business environments." },
  { title: "Respect", desc: "We treat our clients, partners and stakeholders with professionalism and respect." },
  { title: "Quality, Effectiveness & Efficiency", desc: "We aim to deliver practical, effective and efficient services that create value for our clients." },
];

export default function About() {
  const [content, setContent] = useState({});

  useEffect(() => {
    base44.entities.SiteContent.filter({ section: "about" }, "key", 100)
      .then((rows) => setContent(Object.fromEntries(rows.map((row) => [row.key, row.value]))))
      .catch(() => {});
  }, []);

  const text = (key, fallback) => content[`about.${key}`] || fallback;

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
            {text("hero_title", "Secure your business with us")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {text("hero_description", "Professional business support. Practical solutions. Sustainable growth. We provide reliable business advisory, financial, compliance, registration, procurement and administrative support services designed to help businesses operate efficiently and achieve their objectives.")}
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
            <SectionHeading eyebrow={text("intro_eyebrow", "Who we are")} title={text("intro_title", "Registered in 2020 with a commitment to quality, integrity and efficiency")} description={text("intro_description", "Abrielex Business Consultancy was registered in 2020 with a commitment to quality, integrity, efficiency and intelligent business support. The consultancy was established with the objective of assisting upcoming and established business owners to reach their desired goals and improve their business operations.")} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {text("intro_extra", "Over time, Abrielex has built a reputation for providing business support across locations including Bulawayo, Victoria Falls, Harare, Masvingo and Chiredzi, while also serving clients beyond Zimbabwe. The consultancy has served clients in Zimbabwe, Botswana and Australia, with an ongoing ambition to build relationships and connect businesses across additional countries and regions.")}
            </p>
          </div>
        </div>
      </section>

      {/* our story */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionHeading eyebrow={text("story_eyebrow", "What we do")} title={text("story_title", "A broad range of business and administrative services")} />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {text("story_body", "Our work covers company and business registration; financial and bookkeeping services; procurement services; ZIMRA services; permits services; customs account activation; liquor licence services; vendor number applications; tender and bidding documentation; NSSA services and claim procedures; PRAZ registrations; stocktakes and stock planning; internal audits; and business compliance support. We aim to become a trusted business-support partner for entrepreneurs, established enterprises and organizations seeking reliable assistance with their business requirements.")}
          </p>
        </div>
      </section>

      {/* mission / vision */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-10">
            <Target className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif-display text-2xl font-bold">{text("mission_title", "Our Mission")}</h3>
            <p className="mt-3 font-serif-display text-lg text-primary">Supporting Businesses. Encouraging Compliance. Improving Performance.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {text("mission_body", "Our mission is to support business development across small, medium and larger enterprises. We seek to promote compliance among business owners, help businesses achieve their targeted objectives, improve business performance, support businesses in realizing greater profitability, provide practical guidance and solutions that help fuel business performance, and help entrepreneurs and organizations make better-informed business decisions.")}
            </p>
          </div>
          <div className="bg-card p-10">
            <Eye className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif-display text-2xl font-bold">{text("vision_title", "Our Vision")}</h3>
            <p className="mt-3 font-serif-display text-lg text-primary">Building a Recognized Business Advisory Firm</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {text("vision_body", "Our vision is to become a leading and growing firm in business advisory services, to reach businesses and clients across Zimbabwe and internationally, to connect businesses with opportunities and relationships across different countries, to become well recognized internationally, to create strong and meaningful relationships between businesses across different regions, and to contribute to sustainable business development and growth.")}
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
              <SectionHeading eyebrow="Who we serve" title="Target clients" description="Abrielex Business Consultancy works with a diverse range of clients, including business owners, individuals, entrepreneurs, young entrepreneurs, farmers, grocery suppliers, investors, businesses, organizations, NGOs, government-related clients and other enterprises and professionals." />
              <ul className="mt-8 space-y-4">
                {[
                  "Whether you are launching a new business or managing an established enterprise, our services are designed to provide practical support throughout different stages of your business journey.",
                  "Entrepreneurs: registration, documentation, tax-related processes, licensing and other business requirements.",
                  "Established businesses: financial records, compliance, documentation, stock management and administrative processes.",
                  "Farmers, suppliers, organizations and NGOs: structured documentation, financial administration and compliance support.",
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
                  <h4 className="font-serif-display text-lg font-semibold">Multi-city coverage</h4>
                  <p className="mt-1 text-sm text-muted-foreground">We provide business consultancy and support services across multiple cities in Zimbabwe, including {companyInfo.coverage.join(", ")} — serving clients across multiple cities in Zimbabwe.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border border-border bg-card p-6">
                <Laptop className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif-display text-lg font-semibold">Connecting businesses beyond borders</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Although Abrielex Business Consultancy is rooted in Zimbabwe, the consultancy has experience serving clients in Zimbabwe, Botswana and Australia. Our vision extends beyond local markets, with the goal of building relationships between businesses across different countries and regions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Get a Quote / Book a Consultation" description="Tell us what you need assistance with. Our team can help you understand the appropriate process and guide you towards a practical solution." />
    </>
  );
}