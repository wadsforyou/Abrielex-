import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Upload, Loader2, FileText } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LocationSelector from "@/components/LocationSelector";
import { useCountry } from "@/lib/CountryContext";
import { serviceCategories, serviceDetails } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";

export default function GetAQuote() {
  const { country } = useCountry();
  const [params] = useSearchParams();
  const preselectedService = params.get("service") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    client_type: "Individual",
    entity_type: "",
    service_category: preselectedService,
    specific_service: "",
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

  const subServices = form.service_category
    ? serviceDetails[form.service_category]?.subServices || []
    : [];

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
        country: country.name,
        document_url: fileUrl || "",
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError("Something went wrong submitting your request. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="border-b border-border">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif-display text-3xl font-bold sm:text-4xl">Quote request received</h1>
          <p className="mt-4 text-base text-muted-foreground">
            Thank you, {form.name}. Your request has been submitted successfully. Our team will review
            your requirements and contact you via {form.preferred_contact_method} with a quote shortly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="bg-primary px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
            <Link to="/services" className="border border-border px-6 py-3 text-sm font-semibold">Browse services</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Get a Quote</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl text-balance">Request a quote</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            Tell us about your requirement and we'll prepare a tailored quote. No online payment —
            fees are discussed and arranged with the agency.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* contact */}
            <Fieldset legend="Your details">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full name *" value={form.name} onChange={(v) => update("name", v)} required />
                <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} required />
                <Select label="Individual or Business *" value={form.client_type} onChange={(v) => update("client_type", v)} options={["Individual", "Business"]} />
                <Input label="Business / entity type" value={form.entity_type} onChange={(v) => update("entity_type", v)} placeholder="e.g. Private Limited Company" className="sm:col-span-2" />
              </div>
            </Fieldset>

            {/* location */}
            <Fieldset legend="Your location">
              <LocationSelector />
            </Fieldset>

            {/* service */}
            <Fieldset legend="Service required">
              <div className="grid gap-5">
                <Select
                  label="Service category *"
                  value={form.service_category}
                  onChange={(v) => { update("service_category", v); update("specific_service", ""); }}
                  options={serviceCategories.map((s) => s.title)}
                  placeholder="Select a category"
                  required
                />
                {subServices.length > 0 && (
                  <Select
                    label="Specific service"
                    value={form.specific_service}
                    onChange={(v) => update("specific_service", v)}
                    options={subServices.map((s) => s.name)}
                    placeholder="Select a specific service (optional)"
                  />
                )}
                <Textarea label="Description of requirement *" value={form.description} onChange={(v) => update("description", v)} rows={4} required />
              </div>
            </Fieldset>

            {/* preferences */}
            <Fieldset legend="Preferences & documents">
              <div className="grid gap-5">
                <Select label="Preferred contact method" value={form.preferred_contact_method} onChange={(v) => update("preferred_contact_method", v)} options={["Email", "Phone", "WhatsApp"]} />
                <Textarea label="Additional information" value={form.additional_info} onChange={(v) => update("additional_info", v)} rows={3} />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Optional document upload</label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-border bg-muted/30 px-4 py-4 text-sm hover:border-primary">
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Upload className="h-5 w-5 text-primary" />}
                    <span className="flex-1">
                      {file ? file.name : "Click to upload a document (PDF, image, etc.)"}
                    </span>
                    <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
                  </label>
                  {fileUrl && <p className="mt-1.5 flex items-center gap-1.5 text-xs text-primary"><FileText className="h-3.5 w-3.5" /> Uploaded</p>}
                </div>
              </div>
            </Fieldset>

            {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {submitting ? "Submitting…" : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </section>
    </>
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