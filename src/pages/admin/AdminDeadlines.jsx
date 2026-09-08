import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";

export default function AdminDeadlines() {
  return (
    <EntityManager
      entity="Deadline"
      title="Deadlines"
      subtitle="Compliance deadlines & renewals"
      defaultSort="date"
      searchKeys={["title", "company_name", "type"]}
      columns={[
        { key: "title", label: "Title" },
        { key: "company_name", label: "Company" },
        { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type?.replace("_", " ")}</span> },
        { key: "date", label: "Date", render: (r) => new Date(r.date).toLocaleDateString() },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { key: "title", label: "Title", required: true, span: 2 },
        { key: "customer_id", label: "Customer ID" },
        { key: "company_id", label: "Company ID" },
        { key: "company_name", label: "Company name" },
        { key: "case_id", label: "Case ID" },
        { key: "type", label: "Type", type: "select", options: ["annual_return", "tax_filing", "praz_renewal", "vendor_renewal", "license_renewal", "bookkeeping", "statutory", "other"].map((t) => ({ value: t, label: t })) },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "status", label: "Status", type: "select", options: ["upcoming", "due_soon", "overdue", "done", "cancelled"].map((s) => ({ value: s, label: s })) },
        { key: "notes", label: "Notes", type: "textarea", span: 2 },
      ]}
    />
  );
}