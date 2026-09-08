import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";
import { DOC_STATUS } from "@/lib/portalConfig";

export default function AdminDocuments() {
  return (
    <EntityManager
      entity="PortalDocument"
      title="Documents"
      subtitle="All client documents across cases & companies"
      defaultSort="-created_date"
      searchKeys={["name", "customer_id", "case_id"]}
      canCreate={false}
      columns={[
        { key: "name", label: "Document", render: (r) => <div className="flex items-center gap-2"><span className="font-medium">{r.name}</span>{r.requested && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">requested</span>}</div> },
        { key: "category", label: "Category", render: (r) => <span className="capitalize">{r.category}</span> },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        { key: "created_date", label: "Date", render: (r) => new Date(r.created_date).toLocaleDateString() },
        { key: "file_url", label: "File", render: (r) => r.file_url ? <a href={r.file_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">open</a> : "—" },
      ]}
      fields={[
        { key: "name", label: "Name" },
        { key: "status", label: "Status", type: "select", options: DOC_STATUS.map((s) => ({ value: s, label: s })) },
        { key: "category", label: "Category", type: "select", options: ["certificate", "registration", "tax", "compliance", "identity", "financial", "correspondence", "other"].map((c) => ({ value: c, label: c })) },
        { key: "requested", label: "Requested", type: "boolean" },
        { key: "request_note", label: "Request note", type: "textarea", span: 2 },
        { key: "notes", label: "Notes", type: "textarea", span: 2 },
      ]}
    />
  );
}