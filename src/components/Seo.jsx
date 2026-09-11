import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const SITE_URL = "https://abrielex.wads-foryou.workers.dev";
const ORG_NAME = "Abrielex Business Consultancy";
const LOGO_URL = "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg";

// ---------------------------------------------------------------------------
// STRUCTURED DATA HELPERS
// ---------------------------------------------------------------------------
function jsonLdScript(data, key) {
  if (!data) return null;
  return (
    <script
      key={key}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: ORG_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: "+263292263415",
    email: "abrielexconsultancy@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No. 116, Lutheran House, L/Takawira & Herbert Chitepo",
      addressLocality: "Bulawayo",
      addressCountry: "ZW",
    },
    sameAs: [
      "https://www.tiktok.com/@abrielexconsultancy",
      "https://www.facebook.com/profile.php?id=AbrielexBusinessConsultants",
    ],
  };
}

function serviceSchema(row, path, title) {
  const name = row?.seo_title || row?.page_title || title;
  const desc = row?.meta_description || "";
  const url = row?.canonical_url || `${SITE_URL}${path}`;
  const image = row?.og_image || LOGO_URL;
  return {
    "@context": "https://schema.org",
    "@type": row?.schema_type || "Service",
    name,
    description: desc,
    url,
    image,
    provider: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    areaServed: { "@type": "Country", name: "Zimbabwe" },
  };
}

function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question || f.q || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer || f.a || "",
      },
    })),
  };
}

function breadcrumbSchema(row, path) {
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }];
  const parts = path.split("/").filter(Boolean);
  parts.forEach((part, i) => {
    const label = i === parts.length - 1 && row?.breadcrumb_label
      ? row.breadcrumb_label
      : part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    crumbs.push({
      "@type": "ListItem",
      position: i + 2,
      name: label,
      item: `${SITE_URL}/${parts.slice(0, i + 1).join("/")}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs,
  };
}

// ---------------------------------------------------------------------------
// SEO COMPONENT — DB-backed with structured data
// ---------------------------------------------------------------------------
export default function Seo({
  title,
  description,
  image,
  canonical,
  robots = "index,follow",
  faqs = [],
  schemaTypeOverride = null,
}) {
  const [override, setOverride] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const path = window.location.pathname;
    base44.entities.SeoPage.filter({ path })
      .then((rows) => {
        if (cancelled) return;
        const row = rows.find((r) => r.published !== false);
        setOverride(row || null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const r = override || {};
    const effectiveTitle = r.seo_title || r.page_title || title;
    const effectiveDescription = r.meta_description || description;
    const effectiveImage = r.og_image || r.social_image || image;
    const effectiveRobots = r.robots || robots;

    if (effectiveTitle) document.title = effectiveTitle;

    const setMeta = (selector, attr, name, content) => {
      if (!content) return;
      let el = document.head.querySelector(`${selector}`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    // Core
    if (effectiveDescription) {
      setMeta('meta[name="description"]', "name", "description", effectiveDescription);
      setMeta('meta[property="og:description"]', "property", "og:description", effectiveDescription);
    }
    if (effectiveTitle) setMeta('meta[property="og:title"]', "property", "og:title", effectiveTitle);
    if (r.og_title) setMeta('meta[property="og:title"]', "property", "og:title", r.og_title);
    if (r.og_description) setMeta('meta[property="og:description"]', "property", "og:description", r.og_description);
    if (effectiveImage) setMeta('meta[property="og:image"]', "property", "og:image", effectiveImage);
    setMeta('meta[name="robots"]', "name", "robots", effectiveRobots);

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    if (effectiveTitle) setMeta('meta[name="twitter:title"]', "name", "twitter:title", effectiveTitle);
    if (effectiveDescription) setMeta('meta[name="twitter:description"]', "name", "twitter:description", effectiveDescription);
    if (effectiveImage) setMeta('meta[name="twitter:image"]', "name", "twitter:image", effectiveImage);

    // Canonical
    const canonicalUrl = r.canonical_url || canonical || window.location.href.split("#")[0];
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Open Graph URL
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", ORG_NAME);
  }, [title, description, image, canonical, robots, override]);

  // Structured data injection (runs after override loads)
  const path = window.location.pathname;
  const schemas = [
    organizationSchema(),
    breadcrumbSchema(override, path),
  ];
  if (override?.schema_type) {
    schemas.push(serviceSchema(override, path, title));
  } else if (schemaTypeOverride === "FAQPage" && faqs?.length) {
    schemas.push(faqSchema(faqs));
  }

  return (
    <>
      {schemas.map((s, idx) => jsonLdScript(s, idx))}
    </>
  );
}