import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminResources() {
  return (
    <EntityManager
      entity="Resource"
      title="Resources"
      subtitle="Guides, checklists & templates in the knowledge centre"
      defaultSort="-created_date"
      searchKeys={["title", "category", "country_code"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type}</span> },
        { key: "country_code", label: "Country" },
        { key: "published", label: "Published", render: (r) => (r.published ? "✓" : "—") },
      ]}
      fields={[
        { key: "title", label: "Title", required: true, span: 2 },
        { key: "slug", label: "Slug" },
        { key: "category", label: "Category", required: true },
        { key: "type", label: "Type", type: "select", options: ["guide", "checklist", "template", "article", "video"].map((t) => ({ value: t, label: t })) },
        { key: "country_code", label: "Country code (blank = all)" },
        { key: "summary", label: "Summary", type: "textarea", span: 2 },
        { key: "file_url", label: "File", type: "file", span: 2 },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}