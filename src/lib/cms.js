import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  serviceCategories as fallbackCategories,
  serviceDetails as fallbackDetails,
  generalFaqs as fallbackFaqs,
  countryFaqs as fallbackCountryFaqs,
  resources as fallbackResources,
  coveragePoints as fallbackCoverage,
  companyInfo as fallbackCompany,
} from "./siteData";

// ---------------------------------------------------------------------------
// CMS DATA LAYER
// Public website reads run DB-first, falling back to the existing live-site
// content in src/lib/siteData.js. That fallback is what the site already shows,
// so the website never renders empty while the database is being populated.
// Whenever the database has been seeded (or edited from the dashboard), the
// database value wins — the database is the single source of truth.
// ---------------------------------------------------------------------------

// One value per line (benefits, requirements, process, documents).
function asList(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// Comma- OR newline-separated identifiers (related slugs).
function asTokens(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  return String(value || "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// Sub-services are stored as one per line: "Name :: Description".
function asSubServices(value) {
  return asList(value)
    .map((line) => {
      const [name, ...rest] = line.split("::");
      return { name: (name || "").trim(), description: rest.join("::").trim() };
    })
    .filter((item) => item.name);
}

// FAQs are stored as blocks separated by a blank line: "Question\nAnswer".
function asFaqs(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];
  return raw
    .split(/\n\s*\n/)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      return { q: (question || "").trim(), a: rest.join("\n").trim() };
    })
    .filter((item) => item.q);
}

// Long-form content: one paragraph per blank-line-separated block, or one per line.
function asParagraphs(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];
  const byBlank = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (byBlank.length > 1) return byBlank;
  return asList(raw);
}

// --- Server-side (SDK) readers ---------------------------------------------

export async function fetchServiceCategories() {
  const rows = await base44.entities.ServiceCategory.filter({ active: true }, "sort_order", 200);
  return rows.length ? rows : null;
}

export async function fetchFaqs() {
  const rows = await base44.entities.FAQItem.filter({ published: true }, "sort_order", 500);
  return rows.length ? rows : null;
}

export async function fetchResources() {
  const rows = await base44.entities.Resource.filter({ published: true }, "sort_order", 500);
  return rows.length ? rows : null;
}

export async function fetchLocations() {
  const rows = await base44.entities.Location.filter({ active: true }, "sort_order", 500);
  return rows.length ? rows : null;
}

export async function fetchSiteContent(section) {
  const rows = await base44.entities.SiteContent.filter({ section }, "sort_order", 500);
  return rows.length ? rows : null;
}

// --- Normalisers (DB shape -> public-site shape) ---------------------------

export function normaliseCategory(row) {
  return {
    slug: row.slug,
    title: row.title,
    short: row.short || row.description || "",
    icon: row.icon || "Briefcase",
    intro: row.intro || "",
    whatItIs: row.what_it_is || "",
    usedFor: row.used_for || "",
    whoFor: row.who_for || "",
    howItHelps: row.how_it_helps || "",
    benefits: asList(row.benefits),
    requirements: asList(row.requirements),
    process: asList(row.process),
    documents: asList(row.documents),
    processingTime: row.processing_time || "",
    faqs: asFaqs(row.faqs),
    subServices: asSubServices(row.sub_services),
    related: asTokens(row.related),
  };
}

export function normaliseFaq(row) {
  return { q: row.question, a: row.answer, scope: row.scope, country_code: row.country_code };
}

export function normaliseResource(row) {
  return {
    title: row.title,
    slug: row.slug,
    summary: row.summary || "",
    category: row.category,
    country: row.country || "All",
    type: row.type ? row.type.charAt(0).toUpperCase() + row.type.slice(1) : "Guide",
    date: row.date || "",
    content: asParagraphs(row.content),
    file_url: row.file_url || "",
  };
}

// Location records may or may not carry map coordinates (the seeded records do
// not). `city` falls back to the province/state label when the city is blank.
function normaliseLocation(row) {
  const lat = Number(row.lat);
  const lng = Number(row.lng);
  return {
    city: row.city || row.state || "",
    lat: Number.isFinite(lat) ? lat : undefined,
    lng: Number.isFinite(lng) ? lng : undefined,
    primary: !!row.primary,
  };
}

// --- React hooks (DB-first with live-site fallback) ------------------------

// Returns { data, loading, error }. `fallback` is the existing live-site value.
export function useCmsResource(loader, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await loader();
        if (!alive) return;
        setData(rows ? rows : fallback);
        setError(null);
      } catch (e) {
        if (alive) setError(e?.message || "Unable to load content");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}

export function useServiceCategories() {
  const { data } = useCmsResource(fetchServiceCategories, null);
  const rows = data || fallbackCategories;
  return rows.map((r) => (r.slug ? normaliseCategory(r) : r));
}

export function useFaqs() {
  const { data } = useCmsResource(fetchFaqs, null);
  if (data) return data.map(normaliseFaq);
  return [...fallbackFaqs.map((f) => ({ q: f.q, a: f.a, scope: "general" })), ...(fallbackCountryFaqs.ZW || []).map((f) => ({ q: f.q, a: f.a, scope: "country", country_code: "ZW" }))];
}

export function useResources() {
  const { data } = useCmsResource(fetchResources, null);
  return data ? data.map(normaliseResource) : fallbackResources;
}

export function useLocations() {
  const { data } = useCmsResource(fetchLocations, null);
  return data ? data.map(normaliseLocation) : fallbackCoverage;
}

// Company / contact information, DB-first with fallback to existing values.
// Records may have been authored with either the dotted `company.` prefix or a
// bare/`office.`/`social.` prefix, so we look each field up across the variants.
// Company details live across three SiteContent sections (`company`, `contact`,
// `social`) in the seeded data, so we load all three and index by key.
async function fetchCompanyContent() {
  const [company, contact, social] = await Promise.all([
    fetchSiteContent("company"),
    fetchSiteContent("contact"),
    fetchSiteContent("social"),
  ]);
  const rows = [...(company || []), ...(contact || []), ...(social || [])];
  return rows.length ? rows : null;
}

export function useCompanyInfo() {
  const { data } = useCmsResource(fetchCompanyContent, null);
  if (!data) return fallbackCompany;
  /** @type {Record<string, any>} */
  const map = {};
  data.forEach((r) => { map[String(r.key)] = r.value; });
  map.__all = data;
  const pick = (...keys) => {
    for (const k of keys) {
      if (map[k]) return map[k];
    }
    return "";
  };
  return {
    ...fallbackCompany,
    name: pick("company.name", "name") || fallbackCompany.name,
    tagline: pick("company.tagline", "tagline") || fallbackCompany.tagline,
    phone: pick("company.phone", "phone") || fallbackCompany.phone,
    phoneIntl: pick("company.phoneIntl", "company.phone_intl", "phoneIntl", "phone_intl") || fallbackCompany.phoneIntl,
    whatsapp: pick("company.whatsapp", "whatsapp") || fallbackCompany.whatsapp,
    whatsappIntl: pick("company.whatsappIntl", "company.whatsapp_intl", "whatsappIntl", "whatsapp_intl") || fallbackCompany.whatsappIntl,
    email: pick("company.email", "email") || fallbackCompany.email,
    office: {
      ...fallbackCompany.office,
      line1: pick("company.office_line1", "office.line1", "office_line1") || fallbackCompany.office.line1,
      line2: pick("company.office_line2", "office.line2", "office_line2") || fallbackCompany.office.line2,
      city: pick("company.office_city", "office.city", "office_city") || fallbackCompany.office.city,
      country: pick("company.office_country", "office.country", "office_country") || fallbackCompany.office.country,
    },
    social: {
      ...fallbackCompany.social,
      tiktok: pick("company.social_tiktok", "social.tiktok", "social_tiktok") || fallbackCompany.social.tiktok,
      tiktokUrl: pick("company.social_tiktok_url", "social.tiktokUrl", "social_tiktok_url") || fallbackCompany.social.tiktokUrl,
      facebook: pick("company.social_facebook", "social.facebook", "social_facebook") || fallbackCompany.social.facebook,
      facebookUrl: pick("company.social_facebook_url", "social.facebookUrl", "social_facebook_url") || fallbackCompany.social.facebookUrl,
    },
    logoUrl: pick("company.logo_url", "logo_url") || fallbackCompany.logoUrl,
    officeHours: pick("company.office_hours", "office_hours") || "Monday – Friday, 08:00 – 16:30",
    mapEmbed: pick("company.map_embed", "map_embed"),
  };
}

export { fallbackDetails };
