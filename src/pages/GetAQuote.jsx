import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Upload, Loader2, FileText, Calendar, FileSpreadsheet, ArrowLeft } from "lucide-react";
import { getCountryServices, consultationTypes, consultationTimeSlots, serviceDetails } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { useSiteContent } from "@/hooks/use-site-content";

export default function GetAQuote() {
  const text = useSiteContent("quote");
  const [params] = useSearchParams();
  const preselectedSlug = params.get("service") || "";
  const preselectedSpecific = params.get("specific") || "";
  const countryServices = useMemo(() => getCountryServices(), []);

  const preselectedCategory = useMemo(
    () => countryServices.find((s) => s.slug === preselectedSlug)?.title || "",
    [countryServices, preselectedSlug]
  );

  const [mode, setMode] = useState(preselectedSlug ? "quote" : "choose");

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Get a Quote / Book a Consultation</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl text-balance">{text("title", "Get a Quote / Book a Consultation")}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            {text("intro", "Choose how you'd like to engage us. Request a tailored quote for a specific service, or book a professional consultation — in person, by phone, WhatsApp or online.")}
          </p>
        </div>
      </section>

      {mode === "choose" && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="grid gap-6 md:grid-cols-2">
              <ChoiceCard
                icon={<FileSpreadsheet className="h-8 w-8" />}
                title="Get a Quote"
                desc="Tell us about your requirement and we'll prepare a tailored quote. No online payment — fees are discussed and arranged with the agency."
                cta="Get a Quote"
                onClick={() => setMode("quote")}
              />
              <ChoiceCard
                icon={<Calendar className="h-8 w-8" />}
                title="Book a Consultation"
                desc="Schedule a professional consultation — in person, by phone, WhatsApp or online. Pick a date and time that suits you."
                cta="Book a Consultation"
                onClick={() => setMode("consultation")}
              />
            </div>
          </div>
        </section>
      )}

      {mode !== "choose" && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <button onClick={() => setMode("choose")} className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to choices
            </button>
            {mode === "quote" ? (
              <QuoteForm
                countryServices={countryServices}
                preselectedCategory={preselectedCategory}
                preselectedSpecific={preselectedSpecific}
              />
            ) : (
              <ConsultationForm />
            )}
          </div>
        </section>
      )}
    </>
  );
}

function ChoiceCard({ icon, title, desc, cta, onClick }) {
  return (
    <div className="flex flex-col border border-border bg-card p-8">
      <span className="flex h-14 w-14 items-center justify-center border border-primary/20 bg-accent text-primary">
        {icon}
      </span>
      <h2 className="mt-5 font-serif-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <button onClick={onClick} className="mt-6 w-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
        {cta}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// QUOTE FORM
// ---------------------------------------------------------------------------
function QuoteForm({ countryServices, preselectedCategory, preselectedSpecific }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    client_type: "Individual",
    entity_type: "",
    service_category: preselectedCategory,
    specific_service: preselectedSpecific,
    description: "",
    preferred_contact_method: "Email",
    additional_info: "",
  });
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedService = countryServices.find((s) => s.title === form.service_category);
  const subServices = selectedService ? subServicesFor(selectedService.slug) : [];

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUploading(true);
    setError("");
    try {
      const res = await base44.integrations.Core.UploadFile({ file: f });
      setFileUrl(res.file_url);
    } catch {
      setError("Document upload failed. You can still submit without it.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone || !form.service_category || !form.description) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.QuoteRequest.create({
        ...form,
        country: "Zimbabwe",
        state: "",
        city: "",
        document_url: fileUrl || "",
      });
      await notifyAdmin("quote_request", {
        client_name: form.name,
        service_category: form.service_category,
        specific_service: form.specific_service || "—",
        country: "Zimbabwe",
        location: "—",
        email: form.email,
        phone: form.phone,
        description: form.description,
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong submitting your request. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-6 font-serif-display text-3xl font-bold">Quote request received</h2>
        <p className="mt-4 text-base text-muted-foreground">
          Thank you, {form.name}. Your request has been submitted successfully. Our team will review
          your requirements and contact you via {form.preferred_contact_method} with a quote shortly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-primary px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
          <Link to="/services" className="border border-border px-6 py-3 text-sm font-semibold">Browse services</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ContextBanner category={form.service_category} specific={form.specific_service} />

      <Fieldset legend="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full name *" value={form.name} onChange={(v) => update("name", v)} required />
          <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} required />
          <Select label="Individual or Business *" value={form.client_type} onChange={(v) => update("client_type", v)} options={["Individual", "Business"]} />
          <Input label="Business / entity type" value={form.entity_type} onChange={(v) => update("entity_type", v)} placeholder="e.g. Private Limited Company" className="sm:col-span-2" />
        </div>
      </Fieldset>

      <Fieldset legend="Service required">
        <div className="grid gap-5">
          <Select
            label="Service category *"
            value={form.service_category}
            onChange={(v) => { update("service_category", v); update("specific_service", ""); }}
            options={countryServices.map((s) => s.title)}
            placeholder="Select a category"
            required
          />
          {subServices.length > 0 && (
            <Select
              label="Specific service"
              value={form.specific_service}
              onChange={(v) => update("specific_service", v)}
              options={subServices}
              placeholder="Select a specific service (optional)"
            />
          )}
          <Textarea label="Description of requirement *" value={form.description} onChange={(v) => update("description", v)} rows={4} required />
        </div>
      </Fieldset>

      <Fieldset legend="Preferences & documents">
        <div className="grid gap-5">
          <Select label="Preferred contact method" value={form.preferred_contact_method} onChange={(v) => update("preferred_contact_method", v)} options={["Email", "Phone", "WhatsApp"]} />
          <Textarea label="Additional information" value={form.additional_info} onChange={(v) => update("additional_info", v)} rows={3} />
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Optional document upload</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-border bg-muted/30 px-4 py-4 text-sm hover:border-primary">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Upload className="h-5 w-5 text-primary" />}
              <span className="flex-1">{file ? file.name : "Click to upload a document (PDF, image, etc.)"}</span>
              <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
            </label>
            {fileUrl && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"><FileText className="h-3.5 w-3.5" /> Uploaded</p>}
          </div>
        </div>
      </Fieldset>

      {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

      <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        {submitting ? "Submitting…" : "Submit Quote Request"}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// CONSULTATION FORM
// ---------------------------------------------------------------------------
function ConsultationForm() {
  const [form, setForm] = useState({
    consultation_type: consultationTypes[0],
    preferred_date: "",
    preferred_time: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    reason: "",
  });
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUploading(true);
    try {
      const res = await base44.integrations.Core.UploadFile({ file: f });
      setFileUrl(res.file_url);
    } catch {
      setError("Document upload failed. You can still submit without it.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone || !form.preferred_date || !form.preferred_time) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.ConsultationBooking.create({
        ...form,
        country: "Zimbabwe",
        location: "",
        document_url: fileUrl || "",
      });
      await notifyAdmin("consultation_booking", {
        client_name: form.name,
        consultation_type: form.consultation_type,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        country: "Zimbabwe",
        location: "—",
        email: form.email,
        phone: form.phone,
        reason: form.reason || "—",
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong booking your consultation. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-6 font-serif-display text-3xl font-bold">Consultation requested</h2>
        <p className="mt-4 text-base text-muted-foreground">
          Thank you, {form.name}. We've received your request for a {form.consultation_type} on{" "}
          {form.preferred_date} at {form.preferred_time}. Our team will confirm your appointment shortly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-primary px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
          <Link to="/contact" className="border border-border px-6 py-3 text-sm font-semibold">Contact us</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ContextBanner />

      <Fieldset legend="Location & type">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Select label="Consultation type *" value={form.consultation_type} onChange={(v) => update("consultation_type", v)} options={consultationTypes} />
          </div>
        </div>
      </Fieldset>

      <Fieldset legend="Preferred schedule">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferred date *</label>
            <input type="date" min={today} value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferred time *</label>
            <select value={form.preferred_time} onChange={(e) => update("preferred_time", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select a time</option>
              {consultationTimeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </Fieldset>

      <Fieldset legend="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full name *" value={form.name} onChange={(v) => update("name", v)} required />
          <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} required />
          <Input label="WhatsApp" value={form.whatsapp} onChange={(v) => update("whatsapp", v)} />
          <div className="sm:col-span-2">
            <Textarea label="Reason for consultation" value={form.reason} onChange={(v) => update("reason", v)} rows={4} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Optional document upload</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-border bg-muted/30 px-4 py-4 text-sm hover:border-primary">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Upload className="h-5 w-5 text-primary" />}
              <span className="flex-1">{file ? file.name : "Click to upload a document (optional)"}</span>
              <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
            </label>
            {fileUrl && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"><FileText className="h-3.5 w-3.5" /> Uploaded</p>}
          </div>
        </div>
      </Fieldset>

      {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

      <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
        {submitting ? "Submitting…" : "Request Consultation"}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// SHARED UI
// ---------------------------------------------------------------------------
function ContextBanner({ category, specific }) {
  const parts = ["Zimbabwe"];
  if (category) parts.push(category);
  if (specific) parts.push(specific);
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
      <span className="font-semibold text-primary">Request context: </span>
      <span className="text-muted-foreground">{parts.join(" · ")}</span>
    </div>
  );
}

function Fieldset({ legend, children }) {
  return (
    <fieldset>
      <legend className="mb-4 font-serif-display text-lg font-semibold text-foreground">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Input({ label, value, onChange, className, ...props }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 4, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      >
        <option value="">{placeholder || "Select"}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

// Sub-service names per slug (mirrors serviceDetails subServices)
function subServicesFor(slug) {
  return (serviceDetails[slug]?.subServices || []).map((s) => s.name);
}