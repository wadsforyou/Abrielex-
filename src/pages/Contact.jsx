import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Loader2, CheckCircle2, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CoverageMap from "@/components/CoverageMap";
import Seo from "@/components/Seo";
import { base44 } from "@/api/base44Client";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { useSiteContent } from "@/hooks/use-site-content";
import { useCompanyInfo, useServiceCategories } from "@/lib/cms";

export default function Contact() {
  const text = useSiteContent("contact");
  const companyInfo = useCompanyInfo();
  const serviceCategories = useServiceCategories();
  const [params] = useSearchParams();
  const serviceSlug = params.get("service") || "";
  const serviceTitle = useMemo(
    () => (serviceSlug ? serviceCategories.find((s) => s.slug === serviceSlug)?.title || "" : ""),
    [serviceSlug, serviceCategories]
  );
  const whatsappLink = `https://wa.me/${companyInfo.whatsappIntl}`;
  const telLink = `tel:${companyInfo.phoneIntl}`;
  const mailLink = `mailto:${companyInfo.email}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: serviceTitle ? `Enquiry about ${serviceTitle}` : "",
    message: serviceTitle ? `I'm interested in ${serviceTitle}. Please contact me.` : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.ContactMessage.create({
        ...form,
        country: "Zimbabwe",
        state: "",
        city: "",
        service_category: serviceTitle || "",
      });
      await notifyAdmin("contact_message", {
        client_name: form.name,
        country: "Zimbabwe",
        location: "—",
        service_category: serviceTitle || "—",
        subject: form.subject || "—",
        email: form.email,
        phone: form.phone || "—",
        message: form.message,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or reach us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const contactCards = [
    { icon: Phone, label: "Telephone", value: companyInfo.phone, href: telLink },
    { icon: MessageCircle, label: "WhatsApp", value: companyInfo.whatsapp, href: whatsappLink },
    { icon: Mail, label: "Email", value: companyInfo.email, href: mailLink },
  ];

  return (
    <>
      <Seo title="Contact Us — Abrielex Business Consultancy" description="Contact Abrielex Business Consultancy by phone, WhatsApp or email. Visit our office in Bulawayo or use our remote services across Zimbabwe." image={companyInfo.logoUrl} />
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Contact Us</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Contact us</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">{text("intro", "Reach us by phone, WhatsApp, email, or visit our office in Bulawayo. We respond to all enquiries promptly.")}</p>
        </div>
      </section>

      {/* contact cards */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            {contactCards.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 border border-border bg-card p-6 transition-colors hover:border-primary">
                <span className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-accent text-primary">
                  <c.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  <div className="font-serif-display text-lg font-semibold group-hover:text-primary">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
          {/* office + map */}
          <div>
            <SectionHeading eyebrow={text("office_eyebrow", "Our office")} title={text("office_title", "Visit us in Bulawayo")} />
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-sm leading-relaxed">
                  <p className="font-medium">{companyInfo.office.line1}</p>
                  <p className="text-muted-foreground">{companyInfo.office.line2}</p>
                  <p className="text-muted-foreground">{companyInfo.office.city}, {companyInfo.office.country}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-sm text-muted-foreground">Office hours: {companyInfo.officeHours}</div>
              </div>
            </div>

            {/* interactive map */}
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <iframe
                title="Abrielex office location"
                src={companyInfo.mapEmbed || "https://www.openstreetmap.org/export/embed.html?bbox=28.5740%2C-20.1600%2C28.5900%2C-20.1500&layer=mapnik&marker=-20.1550%2C28.5820"}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-serif-display text-lg font-semibold">Our coverage</h3>
              <CoverageMap className="aspect-[4/3]" />
            </div>

            <div className="mt-6 flex gap-3">
              <a href={companyInfo.social.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:border-primary hover:text-primary">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
              <a href={companyInfo.social.tiktokUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:border-primary hover:text-primary">
                <span className="font-bold">TT</span> TikTok
              </a>
            </div>
          </div>

          {/* contact form */}
          <div>
            <SectionHeading eyebrow="Send a message" title="Contact form" />
            {serviceTitle && (
              <div className="mt-6 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
                <span className="font-semibold text-primary">Service context: </span>
                <span className="text-muted-foreground">{serviceTitle}</span>
              </div>
            )}
            {submitted ? (
              <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-primary/30 bg-primary/5 px-6 py-16 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="mt-4 font-serif-display text-xl font-semibold">Message sent</h3>
                <p className="mt-2 text-sm text-muted-foreground">Thank you for contacting us. We'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-primary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *">
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Field>
                  <Field label="Email *">
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Field>
                  <Field label="Phone">
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Field>
                  <Field label="Subject">
                    <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Field>
                </div>
                <Field label="Message *">
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </Field>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}