import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Dynamic sitemap generator.
// Routes are merged from two sources:
//   1. The fixed public routes of the SPA (below).
//   2. Published rows in the SeoPage entity (managed from Admin > SEO),
//      which override/add entries by their "path" field.
// Served as application/xml, so it can be submitted to Google Search Console.

const SITE_URL = "https://abrielex.wads-foryou.workers.dev";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/services/company-secretarial", priority: "0.8", changefreq: "monthly" },
  { path: "/services/zimra-tax-customs", priority: "0.8", changefreq: "monthly" },
  { path: "/services/praz-vendor-numbers", priority: "0.8", changefreq: "monthly" },
  { path: "/services/bookkeeping-financial", priority: "0.8", changefreq: "monthly" },
  { path: "/services/general-services", priority: "0.8", changefreq: "monthly" },
  { path: "/resources", priority: "0.7", changefreq: "weekly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/get-a-quote", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/locations", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    // SeoPage is public-read; the service role is used so the sitemap works
    // even when crawled without a session.
    const [seoRows, serviceRows, locationRows] = await Promise.all([
      base44.asServiceRole.entities.SeoPage.list("path", 500),
      base44.asServiceRole.entities.ServiceCategory.filter({ active: true }, "sort_order", 200).catch(() => []),
      base44.asServiceRole.entities.Location.filter({ active: true }, "sort_order", 500).catch(() => []),
    ]);

    const byPath = new Map(STATIC_ROUTES.map((r) => [r.path, { ...r }]));

    // Services -> /services/:slug (real pages)
    for (const row of serviceRows) {
      if (!row.slug || row.active === false) continue;
      const path = `/services/${row.slug}`;
      if (!byPath.has(path)) byPath.set(path, { path, priority: "0.8", changefreq: "monthly" });
    }

    // Locations -> /locations/:city-slug (real pages)
    for (const row of locationRows) {
      const citySlug = String(row.city || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (!citySlug) continue;
      const path = `/locations/${citySlug}`;
      if (!byPath.has(path)) byPath.set(path, { path, priority: "0.7", changefreq: "monthly" });
    }

    // SeoPage records (added/edited from Admin > SEO) override originals
    for (const row of seoRows) {
      if (!row.path || row.published === false) continue;
      if ((row.robots || "").includes("noindex")) continue;
      const existing = byPath.get(row.path) || { path: row.path, priority: "0.5", changefreq: "monthly" };
      byPath.set(row.path, { ...existing, path: row.path });
    }

    const today = new Date().toISOString().slice(0, 10);
    const urls = [...byPath.values()]
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((r) =>
        `  <url><loc>${esc(SITE_URL + r.path)}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
  } catch (error) {
    return Response.json({ error: error.message || "Sitemap generation failed" }, { status: 500 });
  }
}
