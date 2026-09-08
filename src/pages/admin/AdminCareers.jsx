import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminCareers() {
  return (
    <EntityManager
      entity="CareerOpening"
      title="Careers"
      subtitle="Job openings published on the public site"
      defaultSort="-created_date"
      searchKeys={["title", "department", "location"]}
      columns={[
        { key: "title", label: "Position" },
        { key: "department", label: "Department" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type?.replace("_", " ")}</span> },
        { key: "published", label: "Published", render: (r) => (r.published ? "✓" : "—") },
      ]}
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "department", label: "Department" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type", type: "select", options: ["full_time", "part_time", "contract", "internship"].map((t) => ({ value: t, label: t })) },
        { key: "summary", label: "Summary", type: "textarea", required: true, span: 2 },
        { key: "requirements", label: "Requirements", type: "textarea", span: 2 },
        { key: "apply_email", label: "Apply email", type: "email" },
        { key: "closing_date", label: "Closing date", type: "date" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}