import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminContent() {
  return (
    <EntityManager
      entity="SiteContent"
      title="Website Content"
      subtitle="Editable content blocks (mission, vision, values, CTAs, contact info)"
      defaultSort="sort_order"
      searchKeys={["key", "label", "section"]}
      columns={[
        { key: "label", label: "Label" },
        { key: "key", label: "Key" },
        { key: "section", label: "Section" },
        { key: "value", label: "Value", render: (r) => <span className="max-w-md truncate text-xs text-muted-foreground">{r.value}</span> },
      ]}
      fields={[
        { key: "key", label: "Key (e.g. home.intro_title)", required: true },
        { key: "label", label: "Label" },
        { key: "section", label: "Section (home / about / contact / company / quote / services / resources / faq / consultation)" },
        { key: "value", label: "Value", type: "textarea", span: 2 },
        { key: "sort_order", label: "Sort order", type: "number" },
      ]}
    />
  );
}