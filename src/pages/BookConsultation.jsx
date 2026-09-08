import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Upload, Loader2, FileText, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useCountry } from "@/lib/CountryContext";
import { consultationTypes, consultationTimeSlots, countries } from "@/lib/siteData";
import { base44 } from "@/api/base44Client";

export default function BookConsultation() {
  const { country, location } = useCountry();
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
        country: country.name,
        location: [location.state, location.city].filter(Boolean).join(", "),
        document_url: fileUrl || "",
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong booking your consultation. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif-display text-3xl font-bold sm:text-4xl">Consultation requested</h1>
          <p className="mt-4 text-base text-muted-foreground">
            Thank you, {form.name}. We've received your request for a {form.consultation_type} on{" "}
            {form.preferred_date} at {form.preferred_time}. Our team will confirm your appointment shortly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="bg-primary px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
            <Link to="/contact" className="border border-border px-6 py-3 text-sm font-semibold">Contact us</Link>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Book a Consultation</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl text-balance">Book a consultation</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            Schedule a professional consultation — in person, by phone, WhatsApp or online. Available
            consultation types and slots are managed by our team.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset>
              <legend className="mb-4 font-serif-display text-lg font-semibold">Location & type</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</label>
                  <div className="flex h-11 items-center rounded-md border border-border bg-muted/40 px-3 text-sm font-medium">{country.flag} {country.name}</div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</label>
                  <div className="flex h-11 items-center rounded-md border border-border bg-muted/40 px-3 text-sm font-medium">
                    {[location.state, location.city].filter(Boolean).join(", ") || "Select in header"}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Consultation type *</label>
                  <select value={form.consultation_type} onChange={(e) => update("consultation_type", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    {consultationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 font-serif-display text-lg font-semibold">Preferred schedule</legend>
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
            </fieldset>

            <fieldset>
              <legend className="mb-4 font-serif-display text-lg font-semibold">Your details</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Full name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone *</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">WhatsApp</label>
                  <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reason for consultation</label>
                  <textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} rows={4} className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
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
            </fieldset>

            {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

            <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
              {submitting ? "Submitting…" : "Request Consultation"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}