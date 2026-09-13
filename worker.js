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

// The Base44 API regularly takes 1.5-2.5s per call. Cloudflare fails a Worker
// that stalls, which surfaced as intermittent 504s on the dashboard, so each
// upstream attempt is bounded and retried once before giving up.
const ATTEMPT_TIMEOUT_MS = 12000;
const MAX_ATTEMPTS = 2;

function isRetryable(status) {
  return status === 502 || status === 503 || status === 504 || status === 522 || status === 524;
}

async function attempt(target, init) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
  try {
    return await fetch(target, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function proxyApi(request) {
  const url = new URL(request.url);
  const target = new URL(url.pathname + url.search, API_ORIGIN);

  const headers = new Headers(request.headers);
  headers.set("host", new URL(API_ORIGIN).host);

  const baseInit = { method: request.method, headers, redirect: "manual" };
  // A request body can only be read once, so buffer it for a possible retry.
  let bodyBuffer = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    bodyBuffer = await request.arrayBuffer();
  }

  let upstream = null;
  let lastError = null;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      const init = bodyBuffer ? { ...baseInit, body: bodyBuffer } : baseInit;
      const res = await attempt(target.toString(), init);
      // Retry a transient gateway error, otherwise use this response.
      if (i < MAX_ATTEMPTS - 1 && isRetryable(res.status)) {
        lastError = "upstream " + res.status;
        continue;
      }
      upstream = res;
      break;
    } catch (e) {
      lastError = (e && e.message) || "upstream_fetch_failed";
      if (i >= MAX_ATTEMPTS - 1) break;
    }
  }

  if (!upstream) {
    // Honest failure: the caller gets a real error, never a silent success.
    return Response.json(
      { error: "upstream_unavailable", detail: lastError || "no response from backend" },
      { status: 504 }
    );
  }

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
