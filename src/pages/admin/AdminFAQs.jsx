import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminFAQs() {
  return (
    <EntityManager
      entity="FAQItem"
      title="FAQs"
      subtitle="General & country-specific frequently asked questions"
      defaultSort="sort_order"
      searchKeys={["question", "country_code"]}
      columns={[
        { key: "question", label: "Question" },
        { key: "scope", label: "Scope", render: (r) => <span className="capitalize">{r.scope}</span> },
        { key: "country_code", label: "Country" },
        { key: "published", label: "Published", render: (r) => (r.published ? "✓" : "—") },
      ]}
      fields={[
        { key: "question", label: "Question", type: "textarea", required: true, span: 2 },
        { key: "answer", label: "Answer", type: "textarea", required: true, span: 2 },
        { key: "scope", label: "Scope", type: "select", options: [{ value: "general", label: "general" }, { value: "country", label: "country" }] },
        { key: "country_code", label: "Country code (if country scope)" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}