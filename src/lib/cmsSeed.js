// ---------------------------------------------------------------------------
// CMS SEED DATA
// Derived directly from the existing live-site content in src/lib/siteData.js.
// This is the initial source data for the admin CMS. It is NOT placeholder or
// invented content — it is the truthful Abrielex Business Consultancy content
// that already appears on the public website.
//
// The seed is sent to the `adminControl` backend function (action: "seed_cms"),
// which creates each record only if an equivalent one does not already exist,
// so administrator edits are never overwritten.
// ---------------------------------------------------------------------------
import {
  companyInfo,
  serviceCategories,
  serviceDetails,
  generalFaqs,
  countryFaqs,
  resources,
  coveragePoints,
  consultationTypes,
  consultationTimeSlots,
} from "./siteData";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asLines(list) {
  return Array.isArray(list) ? list.join("\n") : list || "";
}

// --- Service categories (the 5 core dossiers) ------------------------------
function buildServiceCategories() {
  return serviceCategories.map((cat, index) => {
    const d = serviceDetails[cat.slug] || {};
    return {
      slug: cat.slug,
      title: cat.title,
      short: cat.short,
      description: d.intro || cat.short,
      icon: cat.icon,
      intro: d.intro || "",
      what_it_is: d.whatItIs || "",
      used_for: d.usedFor || "",
      who_for: d.whoFor || "",
      how_it_helps: d.howItHelps || "",
      benefits: asLines(d.benefits),
      requirements: asLines(d.requirements),
      process: asLines(d.process),
      documents: asLines(d.documents),
      processing_time: d.processingTime || "",
      faqs: (d.faqs || []).map((f) => `${f.q}\n${f.a}`).join("\n\n"),
      sub_services: (d.subServices || []).map((s) => `${s.name}\n${s.description}`).join("\n\n"),
      related: asLines(d.related),
      country_code: "ZW",
      sort_order: index,
      active: true,
    };
  });
}

// --- Individual services (sub-services inside each category) ----------------
function buildServices() {
  const rows = [];
  serviceCategories.forEach((cat) => {
    const d = serviceDetails[cat.slug] || {};
    (d.subServices || []).forEach((sub, index) => {
      rows.push({
        category_slug: cat.slug,
        name: sub.name,
        slug: `${cat.slug}-${slugify(sub.name)}`,
        description: sub.description || "",
        benefits: asLines(d.benefits),
        requirements: asLines(d.requirements),
        process: asLines(d.process),
        processing_time: d.processingTime || "",
        faqs: (d.faqs || []).map((f) => `${f.q}\n${f.a}`).join("\n\n"),
        related_services: asLines(d.related),
        country_code: "ZW",
        country_note: "",
        sort_order: index,
        active: true,
      });
    });
  });
  return rows;
}

// --- FAQs ------------------------------------------------------------------
function buildFaqs() {
  const rows = generalFaqs.map((f, index) => ({
    question: f.q,
    answer: f.a,
    scope: "general",
    country_code: "ZW",
    sort_order: index,
    published: true,
  }));
  Object.entries(countryFaqs).forEach(([code, list]) => {
    (list || []).forEach((f, index) => {
      rows.push({
        question: f.q,
        answer: f.a,
        scope: "country",
        country_code: code,
        sort_order: 100 + index,
        published: true,
      });
    });
  });
  return rows;
}

// --- Resources -------------------------------------------------------------
function buildResources() {
  return resources.map((r, index) => ({
    title: r.title,
    slug: slugify(r.title),
    summary: r.summary,
    category: r.category,
    country: r.country || "All",
    country_code: r.country === "Zimbabwe" ? "ZW" : "",
    type: String(r.type || "guide").toLowerCase(),
    date: r.date || "",
    content: asLines(r.content),
    published: true,
    sort_order: index,
  }));
}

// --- Locations (cities shown on the public site) ---------------------------
function buildLocations() {
  return coveragePoints.map((p, index) => ({
    country_code: "ZW",
    country_name: "Zimbabwe",
    state: "",
    city: p.city,
    lat: p.lat,
    lng: p.lng,
    primary: !!p.primary,
    sort_order: index,
    active: true,
  }));
}

// --- Website content blocks (home / about / contact / services / faq) ------
function buildSiteContent() {
  const blocks = [];
  const add = (section, key, label, value) =>
    blocks.push({ section, key: `${section}.${key}`, label, value });

  // Home
  add("home", "hero_heading", "Home — hero heading", "Business registration, compliance, tax & financial consultancy.");
  add("home", "hero_description", "Home — hero description", "Abrielex Business Consultancy delivers professional company secretarial, tax, procurement, bookkeeping and general business services — in person and online across multiple cities in Zimbabwe. Secure Your Business With Us.");
  add("home", "intro_eyebrow", "Home — introduction eyebrow", "Introduction");
  add("home", "intro_title", "Home — introduction title", "Your partner for business registration & compliance");
  add("home", "intro_description", "Home — introduction description", "Abrielex Business Consultancy is a professional consultancy based in Bulawayo, Zimbabwe, offering a complete range of business registration, compliance, tax, financial and general business services. We help individuals and businesses get registered, stay compliant, and grow — with the convenience of remote and online service delivery.");
  add("home", "categories_eyebrow", "Home — categories eyebrow", "What we do");
  add("home", "categories_title", "Home — categories title", "Main service categories");
  add("home", "categories_description", "Home — categories description", "Five core service dossiers covering the full lifecycle of your business — from registration to ongoing compliance and growth.");
  add("home", "why_eyebrow", "Home — why eyebrow", "Why Abrielex");
  add("home", "why_title", "Home — why title", "Why choose Abrielex");
  add("home", "why_description", "Home — why description", "Professional, reliable and accessible — built around the real needs of businesses and individuals.");
  add("home", "why_compliance_title", "Home — why compliance title", "Compliance you can trust");
  add("home", "why_compliance_desc", "Home — why compliance description", "We keep your business legally compliant with the relevant registries and authorities in Zimbabwe.");
  add("home", "why_coverage_title", "Home — why coverage title", "Multi-city coverage");
  add("home", "why_coverage_desc", "Home — why coverage description", "Services delivered across Bulawayo, Harare and many more cities throughout Zimbabwe.");
  add("home", "why_remote_title", "Home — why remote title", "Remote & online");
  add("home", "why_remote_desc", "Home — why remote description", "Engage us from anywhere — no office visit required across our coverage areas.");
  add("home", "why_personal_title", "Home — why personal title", "Personal service");
  add("home", "why_personal_desc", "Home — why personal description", "Direct, professional support tailored to your business or individual needs.");
  add("home", "why_endtoend_title", "Home — why end-to-end title", "End-to-end handling");
  add("home", "why_endtoend_desc", "Home — why end-to-end description", "From registration to ongoing maintenance — we manage the full process.");
  add("home", "why_secure_title", "Home — why secure title", "Secure & reliable");
  add("home", "why_secure_desc", "Home — why secure description", "Professional solutions that protect and grow your business with confidence.");
  add("home", "how_eyebrow", "Home — process eyebrow", "Process");
  add("home", "how_title", "Home — process title", "How it works");
  add("home", "how_description", "Home — process description", "A clear, four-step process from first contact to completed service.");
  add("home", "how_step1_title", "Home — step 1 title", "Tell us your need");
  add("home", "how_step1_desc", "Home — step 1 description", "Request a service, get a quote, or book a consultation through the site or WhatsApp.");
  add("home", "how_step2_title", "Home — step 2 title", "We review & advise");
  add("home", "how_step2_desc", "Home — step 2 description", "We assess your requirements and confirm the process, documents and timeline.");
  add("home", "how_step3_title", "Home — step 3 title", "We handle the process");
  add("home", "how_step3_desc", "Home — step 3 description", "We prepare, submit and manage everything with the relevant authorities on your behalf.");
  add("home", "how_step4_title", "Home — step 4 title", "You stay compliant");
  add("home", "how_step4_desc", "Home — step 4 description", "You receive your documents and ongoing support to remain compliant.");
  add("home", "coverage_eyebrow", "Home — coverage eyebrow", "Multi-city coverage");
  add("home", "coverage_title", "Home — coverage title", "Serving businesses across Zimbabwe");
  add("home", "coverage_description", "Home — coverage description", "From our base in Bulawayo, we provide business consultancy and support services across multiple cities in Zimbabwe, including Bulawayo, Harare, Gwanda, Hwange, Lupane, Victoria Falls, Masvingo, Mutare, Kwekwe, Chitungwiza, Marondera and Kadoma. Most services can also be delivered remotely or online — you don't need to visit our office.");
  add("home", "resources_eyebrow", "Home — resources eyebrow", "Knowledge centre");
  add("home", "resources_title", "Home — resources title", "Resources");
  add("home", "resources_description", "Home — resources description", "Guides, checklists and articles to help you understand compliance.");

  // About
  add("about", "hero_title", "About — hero title", "Secure your business with us");
  add("about", "hero_description", "About — hero description", "Professional business support. Practical solutions. Sustainable growth. We provide reliable business advisory, financial, compliance, registration, procurement and administrative support services designed to help businesses operate efficiently and achieve their objectives.");
  add("about", "intro_eyebrow", "About — intro eyebrow", "Who we are");
  add("about", "intro_title", "About — intro title", "Registered in 2020 with a commitment to quality, integrity and efficiency");
  add("about", "intro_description", "About — intro description", "Abrielex Business Consultancy was registered in 2020 with a commitment to quality, integrity, efficiency and intelligent business support. The consultancy was established with the objective of assisting upcoming and established business owners to reach their desired goals and improve their business operations.");
  add("about", "intro_extra", "About — intro extra", "Over time, Abrielex has built a reputation for providing business support across locations including Bulawayo, Victoria Falls, Harare, Masvingo and Chiredzi, while also serving clients beyond Zimbabwe. The consultancy has served clients in Zimbabwe, Botswana and Australia, with an ongoing ambition to build relationships and connect businesses across additional countries and regions.");
  add("about", "story_eyebrow", "About — story eyebrow", "What we do");
  add("about", "story_title", "About — story title", "A broad range of business and administrative services");
  add("about", "story_body", "About — story body", "Our work covers company and business registration; financial and bookkeeping services; procurement services; ZIMRA services; permits services; customs account activation; liquor licence services; vendor number applications; tender and bidding documentation; NSSA services and claim procedures; PRAZ registrations; stocktakes and stock planning; internal audits; and business compliance support. We aim to become a trusted business-support partner for entrepreneurs, established enterprises and organizations seeking reliable assistance with their business requirements.");
  add("about", "mission_title", "About — mission title", "Our Mission");
  add("about", "mission_body", "About — mission body", "Our mission is to support business development across small, medium and larger enterprises. We seek to promote compliance among business owners, help businesses achieve their targeted objectives, improve business performance, support businesses in realizing greater profitability, provide practical guidance and solutions that help fuel business performance, and help entrepreneurs and organizations make better-informed business decisions.");
  add("about", "vision_title", "About — vision title", "Our Vision");
  add("about", "vision_body", "About — vision body", "Our vision is to become a leading and growing firm in business advisory services, to reach businesses and clients across Zimbabwe and internationally, to connect businesses with opportunities and relationships across different countries, to become well recognized internationally, to create strong and meaningful relationships between businesses across different regions, and to contribute to sustainable business development and growth.");
  // Shorter aliases matching the hosted database keys, so edits from either
  // key name surface on the public site.
  add("about", "mission", "About — mission (alias)", "Our mission is to support business development across small, medium and larger enterprises. We seek to promote compliance among business owners, help businesses achieve their targeted objectives, improve business performance, support businesses in realizing greater profitability, provide practical guidance and solutions that help fuel business performance, and help entrepreneurs and organizations make better-informed business decisions.");
  add("about", "vision", "About — vision (alias)", "Our vision is to become a leading and growing firm in business advisory services, to reach businesses and clients across Zimbabwe and internationally, to connect businesses with opportunities and relationships across different countries, to become well recognized internationally, to create strong and meaningful relationships between businesses across different regions, and to contribute to sustainable business development and growth.");
  add("about", "story", "About — story (alias)", "Our work covers company and business registration; financial and bookkeeping services; procurement services; ZIMRA services; permits services; customs account activation; liquor licence services; vendor number applications; tender and bidding documentation; NSSA services and claim procedures; PRAZ registrations; stocktakes and stock planning; internal audits; and business compliance support.");

  // Services page
  add("services", "hero_title", "Services — hero title", "Our services");
  add("services", "hero_description", "Services — hero description", "Five core categories of professional business solutions for Zimbabwean businesses and individuals. Open any dossier for full details — what it is, who it's for, requirements, process and how to request it.");

  // Resources page
  add("resources", "hero_description", "Resources — hero description", "Business guides, compliance information, document checklists and articles — filter by country and category. Click \"View\" on any resource to read the full content right here.");

  // FAQ page
  add("faq", "intro", "FAQ — introduction", "Answers to common questions about our services and how we work.");
  add("faq", "cta_title", "FAQ — CTA title", "Still have questions?");
  add("faq", "cta_description", "FAQ — CTA description", "Contact the agency and we'll be happy to help.");

  // Contact page
  add("contact", "intro", "Contact — introduction", "Reach us by phone, WhatsApp, email, or visit our office in Bulawayo. We respond to all enquiries promptly.");
  add("contact", "office_eyebrow", "Contact — office eyebrow", "Our office");
  add("contact", "office_title", "Contact — office title", "Visit us in Bulawayo");

  // Quote page
  add("quote", "title", "Quote — title", "Get a Quote / Book a Consultation");
  add("quote", "intro", "Quote — introduction", "Tell us about the service you require and provide a few details about your business or organization. We will review your enquiry and provide appropriate guidance regarding your requirements. You can also arrange a consultation to discuss your business requirements, challenges or planned activities with Abrielex Business Consultancy.");

  // Contact information (company details, editable)
  add("company", "name", "Company — name", companyInfo.name);
  add("company", "tagline", "Company — tagline", companyInfo.tagline);
  add("company", "phone", "Company — telephone", companyInfo.phone);
  add("company", "phone_intl", "Company — telephone (international)", companyInfo.phoneIntl);
  add("company", "whatsapp", "Company — WhatsApp", companyInfo.whatsapp);
  add("company", "whatsapp_intl", "Company — WhatsApp (international)", companyInfo.whatsappIntl);
  add("company", "email", "Company — email", companyInfo.email);
  add("company", "office_hours", "Company — office hours", "Monday – Friday, 08:00 – 16:30");
  add("company", "logo_url", "Company — logo URL", companyInfo.logoUrl);
  add("company", "map_embed", "Company — map embed URL", "https://www.openstreetmap.org/export/embed.html?bbox=28.5740%2C-20.1600%2C28.5900%2C-20.1500&layer=mapnik&marker=-20.1550%2C28.5820");

  // Office location (contact section)
  add("contact", "office_line1", "Office — line 1", companyInfo.office.line1);
  add("contact", "office_line2", "Office — line 2", companyInfo.office.line2);
  add("contact", "office_city", "Office — city", companyInfo.office.city);
  add("contact", "office_country", "Office — country", companyInfo.office.country);

  // Social links (social section)
  add("social", "tiktok", "Social — TikTok handle", companyInfo.social.tiktok);
  add("social", "tiktok_url", "Social — TikTok URL", companyInfo.social.tiktokUrl);
  add("social", "facebook", "Social — Facebook page", companyInfo.social.facebook);
  add("social", "facebook_url", "Social — Facebook URL", companyInfo.social.facebookUrl);

  // Consultations (editable options)
  add("consultation", "types", "Consultation — types", consultationTypes.join("\n"));
  add("consultation", "time_slots", "Consultation — time slots", consultationTimeSlots.join("\n"));

  return blocks;
}

// --- Notification templates (default, editable) ----------------------------
function buildTemplates() {
  const templates = [];
  const add = (event, channel, subject, body) =>
    templates.push({ event, channel, subject, body, active: true });

  add("contact_message", "email", "New Contact Enquiry — Abrielex Business Consultancy",
    "A new contact enquiry has been submitted.\n\nName: {{client_name}}\nEmail: {{email}}\nPhone: {{phone}}\nService: {{service_category}}\nSubject: {{subject}}\n\nMessage:\n{{message}}");
  add("contact_message", "inapp", "New contact enquiry", "{{client_name}} sent a contact enquiry.");

  add("quote_request", "email", "New Quote Request — Abrielex Business Consultancy",
    "A new quote request has been submitted.\n\nName: {{client_name}}\nEmail: {{email}}\nPhone: {{phone}}\nService: {{service_category}}\nSpecific service: {{specific_service}}\n\nDescription:\n{{description}}");
  add("quote_request", "inapp", "New quote request", "{{client_name}} requested a quote for {{service_category}}.");

  add("consultation_booking", "email", "New Consultation Booking — Abrielex Business Consultancy",
    "A new consultation has been booked.\n\nName: {{client_name}}\nEmail: {{email}}\nPhone: {{phone}}\nType: {{consultation_type}}\nPreferred date: {{preferred_date}}\nPreferred time: {{preferred_time}}\n\nReason:\n{{reason}}");
  add("consultation_booking", "inapp", "New consultation booking", "{{client_name}} booked a consultation for {{preferred_date}}.");

  add("new_message", "inapp", "New message", "You have a new message from {{client_name}}.");

  return templates;
}

// --- SEO records (per-page meta, keywords, structured data) ----------------
// Derived from the truthful, existing live-site content. Each public page gets
// its own editable SeoPage record (page -> dashboard -> database -> live site).
// Nothing here is invented: keywords, descriptions and schema types are based
// on the actual services, cities and content already on the website.

const SITE_URL = "https://abrielex.wads-foryou.workers.dev";
const LOGO_URL = companyInfo.logoUrl;

function seoRecord({
  path, pageTitle, seoTitle, description, primaryKeyword, secondaryKeywords,
  searchPhrases, slug, canonical, ogTitle, ogDescription, ogImage,
  imageAlt, schemaType, breadcrumbLabel, robots = "index,follow",
}) {
  return {
    path,
    page_title: pageTitle,
    seo_title: seoTitle || seoTitleFallback(pageTitle, primaryKeyword),
    meta_description: description,
    primary_keyword: primaryKeyword || "",
    secondary_keywords: secondaryKeywords ? secondaryKeywords.join(", ") : "",
    search_phrases: searchPhrases ? searchPhrases.join("\n") : "",
    slug: slug || path,
    canonical_url: canonical || `${SITE_URL}${path}`,
    robots,
    og_title: ogTitle || seoTitle || seoTitleFallback(pageTitle, primaryKeyword),
    og_description: ogDescription || description || "",
    og_image: ogImage || LOGO_URL,
    social_image: ogImage || LOGO_URL,
    image_alt_text: imageAlt || "",
    focus_keyword: primaryKeyword || "",
    related_keywords: secondaryKeywords ? secondaryKeywords.join(", ") : "",
    schema_type: schemaType || "",
    breadcrumb_label: breadcrumbLabel || pageTitle,
    seo_status: "Optimized",
    last_updated: new Date().toISOString().slice(0, 10),
    published: true,
  };
}

function seoTitleFallback(pageTitle, keyword) {
  return keyword
    ? `${pageTitle} | ${keyword} — Abrielex Business Consultancy`
    : `${pageTitle} — Abrielex Business Consultancy`;
}

function buildSeoSeed() {
  const rows = [];
  const add = (record) => rows.push(record);

  // --- Static public pages ------------------------------------------------
  add(seoRecord({
    path: "/",
    pageTitle: "Home",
    seoTitle: "Abrielex Business Consultancy — Business Registration & Compliance in Zimbabwe",
    description: "Professional business registration, tax, procurement, bookkeeping and compliance services across Bulawayo, Harare and multiple cities in Zimbabwe. Remote and online service delivery.",
    primaryKeyword: "business consultancy Zimbabwe",
    secondaryKeywords: ["company registration Zimbabwe", "ZIMRA tax services", "PRAZ registration", "bookkeeping services Bulawayo", "business compliance"],
    searchPhrases: ["abrielex business consultancy", "business registration Zimbabwe", "tax services Bulawayo", "company registration Zimbabwe"],
    slug: "/",
    canonical: `${SITE_URL}/`,
    ogTitle: "Abrielex Business Consultancy — Secure Your Business With Us",
    ogDescription: "Business registration, tax, procurement, bookkeeping and compliance services across Zimbabwe, delivered remotely or from our Bulawayo office.",
    ogImage: LOGO_URL,
    imageAlt: "Abrielex Business Consultancy logo",
    schemaType: "ProfessionalService",
    breadcrumbLabel: "Home",
  }));

  add(seoRecord({
    path: "/about",
    pageTitle: "About",
    seoTitle: "About Us — Abrielex Business Consultancy",
    description: "Abrielex Business Consultancy was registered in 2020 to support businesses across Zimbabwe with registration, compliance, tax, bookkeeping, procurement and administrative services.",
    primaryKeyword: "about Abrielex Business Consultancy",
    secondaryKeywords: ["business consultancy Bulawayo", "business support Zimbabwe", "company registration 2020"],
    searchPhrases: ["abrielex business consultancy about", "business consultants Bulawayo", "business support services Zimbabwe"],
    slug: "/about",
    schemaType: "AboutPage",
    breadcrumbLabel: "About",
  }));

  add(seoRecord({
    path: "/services",
    pageTitle: "Services",
    seoTitle: "Our Services — Abrielex Business Consultancy",
    description: "Company secretarial, ZIMRA tax & customs, PRAZ & vendor numbers, bookkeeping & financial, and general business services for Zimbabwean businesses and individuals.",
    primaryKeyword: "business services Zimbabwe",
    secondaryKeywords: ["company secretarial services", "ZIMRA tax services", "PRAZ vendor registration", "bookkeeping Zimbabwe", "business compliance services"],
    searchPhrases: ["abrielex business services", "company secretarial Zimbabwe", "tax services Zimbabwe", "procurement registration Zimbabwe"],
    slug: "/services",
    schemaType: "CollectionPage",
    breadcrumbLabel: "Services",
  }));

  add(seoRecord({
    path: "/get-a-quote",
    pageTitle: "Get a Quote / Book a Consultation",
    seoTitle: "Get a Quote or Book a Consultation — Abrielex Business Consultancy",
    description: "Request a quote or book a consultation with Abrielex Business Consultancy for business registration, tax, procurement, bookkeeping and compliance services in Zimbabwe.",
    primaryKeyword: "get a quote business services Zimbabwe",
    secondaryKeywords: ["book a consultation", "business services quote", "Abrielex consultation"],
    searchPhrases: ["abrielex get a quote", "business consultancy consultation Zimbabwe"],
    slug: "/get-a-quote",
    schemaType: "ContactPage",
  }));

  add(seoRecord({
    path: "/resources",
    pageTitle: "Resources",
    seoTitle: "Resources & Business Guides — Abrielex Business Consultancy",
    description: "Business guides, compliance information, document checklists and articles to help Zimbabwean businesses understand registration, tax, procurement and compliance requirements.",
    primaryKeyword: "business resources Zimbabwe",
    secondaryKeywords: ["compliance guides", "business checklists", "Zimbabwe business articles"],
    searchPhrases: ["abrielex resources", "business compliance guides Zimbabwe"],
    slug: "/resources",
    schemaType: "CollectionPage",
  }));

  add(seoRecord({
    path: "/faq",
    pageTitle: "Frequently Asked Questions",
    seoTitle: "FAQs — Abrielex Business Consultancy",
    description: "Answers to common questions about Abrielex Business Consultancy services — business registration, tax, procurement, bookkeeping, compliance and how we work.",
    primaryKeyword: "business consultancy FAQs Zimbabwe",
    secondaryKeywords: ["company registration questions", "ZIMRA tax questions", "PRAZ questions"],
    searchPhrases: ["abrielex faq", "business registration questions Zimbabwe"],
    slug: "/faq",
    schemaType: "FAQPage",
  }));

  add(seoRecord({
    path: "/contact",
    pageTitle: "Contact",
    seoTitle: "Contact Us — Abrielex Business Consultancy",
    description: "Contact Abrielex Business Consultancy by phone, WhatsApp or email. Visit our office in Bulawayo or use our remote services across Zimbabwe.",
    primaryKeyword: "contact Abrielex Business Consultancy",
    secondaryKeywords: ["business consultancy Bulawayo contact", "Abrielex phone", "Abrielex email"],
    searchPhrases: ["abrielex contact", "business consultants Bulawayo contact"],
    slug: "/contact",
    schemaType: "ContactPage",
  }));

  add(seoRecord({
    path: "/privacy",
    pageTitle: "Privacy Policy",
    seoTitle: "Privacy Policy — Abrielex Business Consultancy",
    description: "Privacy policy for Abrielex Business Consultancy website and client services.",
    primaryKeyword: "privacy policy Abrielex",
    secondaryKeywords: [],
    searchPhrases: [],
    slug: "/privacy",
    robots: "index,follow",
  }));

  add(seoRecord({
    path: "/terms",
    pageTitle: "Terms of Service",
    seoTitle: "Terms of Service — Abrielex Business Consultancy",
    description: "Terms of service for using the Abrielex Business Consultancy website and engaging our services.",
    primaryKeyword: "terms of service Abrielex",
    secondaryKeywords: [],
    searchPhrases: [],
    slug: "/terms",
    robots: "index,follow",
  }));

  // --- Individual services (categories) ------------------------------------
  serviceCategories.forEach((cat) => {
    const d = serviceDetails[cat.slug] || {};
    const title = cat.title;
    const slug = `/services/${cat.slug}`;
    const intro = (d.intro || cat.short || "").replace(/\s+/g, " ").trim();
    const focusWords = title.toLowerCase().replace(/[^a-z0-9& ]+/g, "").trim();
    add(seoRecord({
      path: slug,
      pageTitle: title,
      seoTitle: `${title} in Zimbabwe — Abrielex Business Consultancy`,
      description: (intro || `${title} provided by Abrielex Business Consultancy in Zimbabwe.`).slice(0, 158),
      primaryKeyword: `${focusWords} Zimbabwe`,
      secondaryKeywords: [`${focusWords} Bulawayo`, `${focusWords} Harare`, "Abrielex Business Consultancy", "business compliance Zimbabwe"],
      searchPhrases: [`abrielex ${focusWords}`, `${focusWords} Zimbabwe`, `${focusWords} Bulawayo`],
      slug,
      schemaType: "Service",
      breadcrumbLabel: title,
    }));
  });

  // --- Cities / locations --------------------------------------------------
  companyInfo.coverage.forEach((city) => {
    const slug = `/locations/${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    add(seoRecord({
      path: slug,
      pageTitle: `${city} Business Services`,
      seoTitle: `${city} Business Consultancy & Registration Services — Abrielex`,
      description: `Professional business registration, compliance, tax, procurement and bookkeeping services in ${city}, Zimbabwe, delivered by Abrielex Business Consultancy — remotely or in person.`,
      primaryKeyword: `business consultancy ${city}`,
      secondaryKeywords: [`company registration ${city}`, `tax services ${city}`, `PRAZ registration ${city}`, "Abrielex Business Consultancy"],
      searchPhrases: [`business consultants ${city}`, `${city} company registration`, `abrielex ${city}`],
      slug,
      schemaType: "LocalBusiness",
      breadcrumbLabel: city,
    }));
  });

  // --- Legal / misc pages with content in the CMS -------------------------
  // (resources/faqs have their own page; individual resource/FAQ records are
  //  covered by the /resources and /faq page records above — no fabricated
  //  individual URLs are created for items that do not have their own public
  //  page.)

  return rows;
}

export function buildCmsSeed() {
  return {
    ServiceCategory: buildServiceCategories(),
    Service: buildServices(),
    FAQItem: buildFaqs(),
    Resource: buildResources(),
    SiteContent: buildSiteContent(),
    Location: buildLocations(),
    NotificationTemplate: buildTemplates(),
    SeoPage: buildSeoSeed(),
  };
}
