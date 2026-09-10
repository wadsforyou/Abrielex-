import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// Per-page SEO. Sets document title + meta description + OG tags, then lets
// a matching published SeoPage row (managed in Admin > SEO) override any of
// them by path. SeoPage is public-read, so this works for anonymous visitors.
export default function Seo({ title, description, image, canonical, robots = "index,follow" }) {
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
    const effectiveTitle = override?.seo_title || override?.page_title || title;
    const effectiveDescription = override?.meta_description || description;
    const effectiveImage = override?.social_image || image;
    const effectiveRobots = override?.robots || robots;
    if (effectiveTitle) document.title = effectiveTitle;
    const setMeta = (selector, attr, name, content) => {
      if (!content) return;
      let el = document.head.querySelector(`${selector}`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    if (effectiveDescription) {
      setMeta('meta[name="description"]', "name", "description", effectiveDescription);
      setMeta('meta[property="og:description"]', "property", "og:description", effectiveDescription);
    }
    if (effectiveTitle) setMeta('meta[property="og:title"]', "property", "og:title", effectiveTitle);
    if (override?.og_title) setMeta('meta[property="og:title"]', "property", "og:title", override.og_title);
    if (override?.og_description) setMeta('meta[property="og:description"]', "property", "og:description", override.og_description);
    if (effectiveImage) setMeta('meta[property="og:image"]', "property", "og:image", effectiveImage);
    setMeta('meta[name="robots"]', "name", "robots", effectiveRobots);
    const canonicalUrl = override?.canonical_url || canonical || window.location.href.split("#")[0];
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, image, canonical, robots, override]);
  return null;
}