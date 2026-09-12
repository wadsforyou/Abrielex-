import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminServices() {
  return (
    <EntityManager
      entity="ServiceCategory"
      title="Services"
      subtitle="Service categories shown on the public Services & Home pages"
      defaultSort="sort_order"
      searchKeys={["title", "slug", "short"]}
      columns={[
        { key: "title", label: "Service" },
        { key: "slug", label: "Slug" },
        { key: "sort_order", label: "Order" },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "title", label: "Service title", required: true },
        { key: "slug", label: "Slug (URL, e.g. company-secretarial)", required: true },
        { key: "short", label: "Short summary", type: "textarea", span: 2 },
        { key: "icon", label: "Icon name (e.g. Building2, Receipt)" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "intro", label: "Intro", type: "textarea", span: 2 },
        { key: "what_it_is", label: "What it is", type: "textarea", span: 2 },
        { key: "used_for", label: "What it's used for", type: "textarea", span: 2 },
        { key: "who_for", label: "Who it's for", type: "textarea", span: 2 },
        { key: "how_it_helps", label: "How it helps", type: "textarea", span: 2 },
        { key: "benefits", label: "Benefits (one per line)", type: "textarea", span: 2 },
        { key: "requirements", label: "Requirements (one per line)", type: "textarea", span: 2 },
        { key: "process", label: "Process (one per line)", type: "textarea", span: 2 },
        { key: "documents", label: "Expected documents (one per line)", type: "textarea", span: 2 },
        { key: "processing_time", label: "Processing time", span: 2 },
        { key: "sub_services", label: "Sub-services — 'Name' then 'Description', blank line between", type: "textarea", span: 2 },
        { key: "faqs", label: "FAQs — 'Question' then 'Answer', blank line between", type: "textarea", span: 2 },
        { key: "related", label: "Related slugs (comma or line separated)", span: 2 },
        { key: "country_code", label: "Country code" },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  );
}