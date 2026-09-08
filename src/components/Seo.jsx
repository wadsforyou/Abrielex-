import { useEffect } from "react";

// Lightweight per-page SEO: sets document title + meta description + OG tags.
export default function Seo({ title, description, image }) {
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
  }, [title, description, image]);
  return null;
}