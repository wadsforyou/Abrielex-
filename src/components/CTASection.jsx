import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/siteData";
import SectionHeading from "./SectionHeading";

export default function CTASection({ title, description }) {
  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url('https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: "auto 140%",
      }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        <SectionHeading
          align="center"
          eyebrow="Let's get started"
          title={title || "Ready to get your business compliant?"}
          description={description || "Request a quote, book a consultation, or contact the agency today. Value for money business solutions, delivered professionally."}
          className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-primary [&_.bg-primary]:bg-primary"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/get-a-quote" className="group flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
            Get a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/book-consultation" className="border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Book a Consultation
          </Link>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}