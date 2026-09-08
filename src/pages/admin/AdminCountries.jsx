import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminCountries() {
  return (
    <EntityManager
      entity="Country"
      title="Countries"
      subtitle="Countries served by Abrielex — used by the public country selector"
      defaultSort="sort_order"
      searchKeys={["name", "code"]}
      columns={[
        { key: "name", label: "Country" },
        { key: "code", label: "Code" },
        { key: "currency", label: "Currency" },
        { key: "confirmed", label: "Confirmed", render: (r) => (r.confirmed ? "✓" : "draft") },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "code", label: "Code (e.g. ZW)", required: true },
        { key: "name", label: "Name", required: true },
        { key: "currency", label: "Currency" },
        { key: "confirmed", label: "Confirmed (verified framework)", type: "boolean" },
        { key: "active", label: "Active", type: "boolean" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "regulatory_bodies", label: "Regulatory bodies (JSON or text)", type: "textarea", span: 2 },
        { key: "coverage", label: "Coverage notes", type: "textarea", span: 2 },
      ]}
    />
  );
}