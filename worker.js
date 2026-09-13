// Abrielex site worker.
//
// Responsibilities, in order:
//   1. Serve /sitemap.xml (generated here so the URLs use the authoritative
//      production domain rather than whichever host served the request).
//   2. Proxy /api/* to the Base44 backend. The SDK makes same-origin calls
//      (function invocations, app settings, auth), and the static asset
//      handler cannot answer them — without this proxy they fail with 405
//      and every admin action breaks.
//   3. Serve the built SPA from the assets binding, falling back to
//      index.html for client-side routes so deep links (/admin, /services/x)
//      load instead of 404ing.

const SITE_ORIGIN = "https://abrielexconsultancy.co.zw";
const API_ORIGIN = "https://base44.app";

const publicPaths = ["/", "/about", "/services", "/locations", "/resources", "/faq", "/contact", "/get-a-quote", "/privacy", "/terms"];
const serviceSlugs = ["company-secretarial", "zimra-tax-customs", "praz-vendor-numbers", "bookkeeping-financial", "general-services"];
const locationSlugs = ["bulawayo", "harare", "victoria-falls", "masvingo", "chiredzi"];

function sitemap() {
  const urls = [
    ...publicPaths,
    ...serviceSlugs.map((slug) => "/services/" + slug),
    ...locationSlugs.map((slug) => "/locations/" + slug),
  ];
  const body = urls.map((path) => "<url><loc>" + SITE_ORIGIN + path + "</loc></url>").join("");
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + body + "</urlset>";
}

const ASSET_EXT = /\.[a-z0-9]+$/i;

async function proxyApi(request) {
  const url = new URL(request.url);
  const target = new URL(url.pathname + url.search, API_ORIGIN);

  const headers = new Headers(request.headers);
  headers.set("host", new URL(API_ORIGIN).host);

  const init = { method: request.method, headers, redirect: "manual" };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target.toString(), init);

  const out = new Headers(upstream.headers);
  out.delete("content-encoding");
  out.delete("content-length");
  out.delete("transfer-encoding");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: out,
  });
}

async function serve(request, env) {
  const url = new URL(request.url);

  if (url.pathname === "/sitemap.xml") {
    return new Response(sitemap(), { headers: { "content-type": "application/xml; charset=UTF-8" } });
  }

  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    return proxyApi(request);
  }

  const response = await env.ASSETS.fetch(request);
  if (response.status !== 404) return response;
  if (ASSET_EXT.test(url.pathname)) return response;

  const shell = await env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
  return shell.status === 404 ? response : shell;
}

export default { fetch: serve };
