import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Facebook } from "lucide-react";
import Logo from "./Logo";
import {
  companyInfo,
  whatsappLink,
  telLink,
  mailLink,
  serviceCategories,
} from "@/lib/siteData";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-foreground text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="mb-5 inline-block rounded-md bg-white px-3 py-2">
              <Logo className="h-[60px]" />
            </div>
            <p className="font-serif-display text-lg italic text-white">{companyInfo.tagline}.</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Professional business registration, compliance, tax, financial and general business
              consultancy services — delivered in person and online.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 hover:bg-white/10">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href={companyInfo.social.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={companyInfo.social.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-xs font-bold hover:bg-white/10">
                TT
              </a>
            </div>
          </div>

          {/* nav */}
          <div>
            <h4 className="mb-4 font-serif-display text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/resources", label: "Resources" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/60 transition-colors hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="mb-4 font-serif-display text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {serviceCategories.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-white/60 transition-colors hover:text-white">{s.title}</Link>
                </li>
              ))}
              <li><Link to="/get-a-quote" className="text-white/60 transition-colors hover:text-white">Get a Quote / Book a Consultation</Link></li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-4 font-serif-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={telLink} className="hover:text-white">{companyInfo.phone}</a></li>
              <li className="flex gap-2.5"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white">{companyInfo.whatsapp}</a></li>
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={mailLink} className="break-all hover:text-white">{companyInfo.email}</a></li>
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{companyInfo.office.line1}, {companyInfo.office.line2}, {companyInfo.office.city}</span></li>
            </ul>
            <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-3 text-xs text-white/50">
              Multi-city coverage across Zimbabwe: Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {year} {companyInfo.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}