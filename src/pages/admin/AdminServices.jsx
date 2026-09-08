import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminServices() {
  return (
    <EntityManager
      entity="Service"
      title="Services"
      subtitle="Individual services across categories & countries"
      defaultSort="sort_order"
      searchKeys={["name", "category_slug", "country_code"]}
      columns={[
        { key: "name", label: "Service" },
        { key: "category_slug", label: "Category" },
        { key: "country_code", label: "Country" },
        { key: "processing_time", label: "Processing time" },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "category_slug", label: "Category slug", required: true },
        { key: "name", label: "Service name", required: true },
        { key: "slug", label: "Slug" },
        { key: "country_code", label: "Country code (blank = all)" },
        { key: "description", label: "Description", type: "textarea", span: 2 },
        { key: "benefits", label: "Benefits", type: "textarea", span: 2 },
        { key: "requirements", label: "Requirements", type: "textarea", span: 2 },
        { key: "process", label: "Process", type: "textarea", span: 2 },
        { key: "processing_time", label: "Processing time" },
        { key: "faqs", label: "FAQs", type: "textarea", span: 2 },
        { key: "related_services", label: "Related services" },
        { key: "country_note", label: "Country note", type: "textarea", span: 2 },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  );
}