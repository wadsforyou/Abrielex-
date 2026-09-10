import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export function useSiteContent(section) {
  const [content, setContent] = useState({});
  useEffect(() => {
    base44.entities.SiteContent.filter({ section }, "key", 200)
      .then((rows) => setContent(Object.fromEntries(rows.map((row) => [row.key, row.value]))))
      .catch(() => {});
  }, [section]);
  return (key, fallback) => content[`${section}.${key}`] || fallback;
}
