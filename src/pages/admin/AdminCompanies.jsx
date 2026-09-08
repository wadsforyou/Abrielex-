import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";
import { ENTITY_TYPES } from "@/lib/portalConfig";

export default function AdminCompanies() {
  return (
    <EntityManager
      entity="Company"
      title="Companies"
      subtitle="Manage client companies"
      defaultSort="-created_date"
      searchKeys={["name", "registration_number", "country", "city"]}
      columns={[
        { key: "name", label: "Company", render: (r) => <div><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.entity_type}</div></div> },
        { key: "country", label: "Location", render: (r) => <div className="text-xs">{r.country} · {r.city || r.state || ""}</div> },
        { key: "registration_number", label: "Reg. No." },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { key: "name", label: "Company name", required: true },
        { key: "entity_type", label: "Entity type", type: "select", options: ENTITY_TYPES.map((t) => ({ value: t, label: t })) },
        { key: "industry", label: "Industry" },
        { key: "country", label: "Country" },
        { key: "state", label: "State / Province" },
        { key: "city", label: "City" },
        { key: "registration_number", label: "Registration number" },
        { key: "tax_id", label: "Tax ID" },
        { key: "status", label: "Status", type: "select", options: ["active", "inactive", "dormant", "in_formation"].map((s) => ({ value: s, label: s })) },
        { key: "notes", label: "Notes", type: "textarea", span: 2 },
      ]}
    />
  );
}