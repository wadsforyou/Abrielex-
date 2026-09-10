import { useEffect } from "react";

// Lightweight per-page SEO: sets document title + meta description + OG tags.
export default function Seo({ title, description, image, canonical, robots = "index,follow" }) {
  useEffect(() => {
    if (title) document.title = title;
    const setMeta = (selector, attr, name, content) => {
      if (!content) return;
      let el = document.head.querySelector(`${selector}`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
    }
    if (title) setMeta('meta[property="og:title"]', "property", "og:title", title);
    if (image) setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[name="robots"]', "name", "robots", robots);
    const canonicalUrl = canonical || window.location.href.split("#")[0];
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, image, canonical, robots]);
  return null;
}