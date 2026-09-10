import { useEffect } from "react";
import { base44 } from "@/api/base44Client";

// Loads the Google integration configuration (public read) and applies the
// parts that genuinely work client-side with no OAuth:
//   1. Search Console verification: injects <meta name="google-site-verification">
//      using the verification_token stored in Admin -> Google Integrations.
//      This is Google's official HTML-tag verification method.
//   2. GA4: injects the real gtag.js script with the configured Measurement ID
//      once status is "connected" — actual measurement, no simulation.
// The hook is mounted once from the public Layout.

let gaLoadedId = null;
let verificationApplied = null;

export function useGoogleIntegrations() {
  useEffect(() => {
    let cancelled = false;
    base44.entities.IntegrationSetting.list("-created_date", 20)
      .then((rows) => {
        if (cancelled) return;

        // --- Search Console verification tag ---
        const sc = rows.find((r) => r.kind === "search_console");
        if (sc?.verification_token && verificationApplied !== sc.verification_token) {
          let meta = document.head.querySelector('meta[name="google-site-verification"]');
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "google-site-verification");
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", sc.verification_token);
          verificationApplied = sc.verification_token;
        }

        // --- GA4 measurement ---
        const ga = rows.find((r) => r.kind === "analytics");
        const measurementId = ga?.measurement_id;
        if (
          ga?.status === "connected" &&
          measurementId &&
          measurementId.startsWith("G-") &&
          gaLoadedId !== measurementId
        ) {
          // Standard gtag.js bootstrap
          const s = document.createElement("script");
          s.async = true;
          s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
          document.head.appendChild(s);

          window.dataLayer = window.dataLayer || [];
          function gtag() { window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", measurementId, { anonymize_ip: true });
          gaLoadedId = measurementId;
        }
      })
      .catch(() => { });
    return () => { cancelled = true; };
  }, []);
}
