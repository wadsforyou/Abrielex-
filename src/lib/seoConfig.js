// Central SEO configuration for the Abrielex Business Consultancy website.
// Every file that emits canonical URLs, sitemaps, robots.txt, Open Graph or
// structured data should import from here so the site always references one
// consistent, absolute domain (no duplication, no drift).

// The official production domain. The site is also served (and historically
// indexed) on the workers.dev origin; the canonical domain is what Google
// should treat as the authoritative version.
export const SITE_URL = "https://abrielexconsultancy.co.zw";

export const ORG_NAME = "Abrielex Business Consultancy";
export const ORG_EMAIL = "abrielexconsultancy@gmail.com";
export const ORG_PHONE = "+263292263415";
export const ORG_ADDRESS = {
  streetAddress: "Office No. 116, Lutheran House, L/Takawira & Herbert Chitepo",
  addressLocality: "Bulawayo",
  addressCountry: "ZW",
};
export const LOGO_URL =
  "https://media.base44.com/images/public/user_6a87c5f2c8a0dd45c2e8e73b/8a0351310_Abrielex_logo.svg";

// Public helper: build the canonical URL for a path (always absolute, no
// query strings, no trailing slash except for the root).
export function canonicalUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withoutQuery = clean.split("?")[0].split("#")[0];
  if (withoutQuery === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${withoutQuery.replace(/\/+$/, "")}`;
}