// The sitemap advertises the authoritative production domain (see
// src/lib/seoConfig.js and each page's canonical URL), not whichever host
// happened to serve the request — otherwise the sitemap and the canonicals
// point at different origins and Google sees conflicting signals.
const SITE_ORIGIN = "https://abrielexconsultancy.co.zw";
const publicPaths = ["/", "/about", "/services", "/locations", "/resources", "/faq", "/contact", "/get-a-quote", "/privacy", "/terms"];
const serviceSlugs = ["company-secretarial", "zimra-tax-customs", "praz-vendor-numbers", "bookkeeping-financial", "general-services"];
const locationSlugs = ["bulawayo", "harare", "victoria-falls", "masvingo", "chiredzi"];
function sitemap() { const urls = [...publicPaths, ...serviceSlugs.map((slug) => `/services/${slug}`), ...locationSlugs.map((slug) => `/locations/${slug}`)]; return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${SITE_ORIGIN}${path}</loc></url>`).join("")}</urlset>`; }
const ASSET_EXT = /\.[a-z0-9]+$/i;
const API_PREFIXES = ["/api", "/functions", "/agents", "/entities", "/integrations"];

async function serve(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/sitemap.xml") return new Response(sitemap(), { headers: { "content-type": "application/xml; charset=UTF-8" } }); const response = await env.ASSETS.fetch(request);
  if (response.status !== 404) return response;
  if (ASSET_EXT.test(url.pathname)) return response;
  // API paths must never fall back to the HTML shell: the client parses the
  // response as JSON, and index.html would make an SDK call look like a
  // successful 200 text/html response.
  if (API_PREFIXES.some((p) => url.pathname === p || url.pathname.startsWith(p + "/"))) return response;
  const shell = await env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
  return shell.status === 404 ? response : shell;
}

export default { fetch: serve };
