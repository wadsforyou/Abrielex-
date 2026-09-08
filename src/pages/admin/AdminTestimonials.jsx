import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminTestimonials() {
  return (
    <EntityManager
      entity="Testimonial"
      title="Testimonials"
      subtitle="Client success stories shown on the public site"
      defaultSort="-created_date"
      searchKeys={["author", "company", "country"]}
      columns={[
        { key: "quote", label: "Quote", render: (r) => <div className="max-w-md truncate italic">“{r.quote}”</div> },
        { key: "author", label: "Author" },
        { key: "company", label: "Company" },
        { key: "published", label: "Published", render: (r) => (r.published ? "✓" : "—") },
      ]}
      fields={[
        { key: "quote", label: "Quote", type: "textarea", required: true, span: 2 },
        { key: "author", label: "Author", required: true },
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "country", label: "Country" },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}