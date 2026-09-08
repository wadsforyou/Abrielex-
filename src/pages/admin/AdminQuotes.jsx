import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";
import { QUOTE_STATUS } from "@/lib/portalConfig";

export default function AdminQuotes() {
  return (
    <EntityManager
      entity="Quote"
      title="Quotes"
      subtitle="Prepare and send quotes to clients"
      defaultSort="-created_date"
      searchKeys={["customer_name", "company_name", "service_category"]}
      columns={[
        { key: "service_category", label: "Service", render: (r) => <div><div className="font-medium">{r.service_category}</div>{r.specific_service && <div className="text-xs text-muted-foreground">{r.specific_service}</div>}</div> },
        { key: "customer_name", label: "Client" },
        { key: "company_name", label: "Company" },
        { key: "amount", label: "Amount", render: (r) => r.amount != null ? `${r.currency} ${Number(r.amount).toLocaleString()}` : "—" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { key: "customer_id", label: "Customer ID", required: true },
        { key: "customer_name", label: "Customer name" },
        { key: "company_id", label: "Company ID" },
        { key: "company_name", label: "Company name" },
        { key: "service_category", label: "Service category", required: true },
        { key: "specific_service", label: "Specific service" },
        { key: "description", label: "Description", type: "textarea", span: 2 },
        { key: "amount", label: "Amount", type: "number" },
        { key: "currency", label: "Currency" },
        { key: "items", label: "Line items / details", type: "textarea", span: 2 },
        { key: "valid_until", label: "Valid until", type: "date" },
        { key: "status", label: "Status", type: "select", options: QUOTE_STATUS.map((s) => ({ value: s, label: s })) },
        { key: "notes", label: "Notes", type: "textarea", span: 2 },
      ]}
    />
  );
}