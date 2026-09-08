import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";
import { TASK_STATUS, PRIORITY } from "@/lib/portalConfig";

export default function AdminTasks() {
  return (
    <EntityManager
      entity="PortalTask"
      title="Tasks"
      subtitle="Internal, client, case & follow-up tasks"
      defaultSort="-due_date"
      searchKeys={["title", "assignee_name", "company_name"]}
      columns={[
        { key: "title", label: "Task", render: (r) => <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground capitalize">{r.kind?.replace("_", " ")}</div></div> },
        { key: "assignee_name", label: "Assignee" },
        { key: "due_date", label: "Due", render: (r) => r.due_date ? new Date(r.due_date).toLocaleDateString() : "—" },
        { key: "priority", label: "Priority", render: (r) => <span className="capitalize">{r.priority}</span> },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { key: "title", label: "Title", required: true, span: 2 },
        { key: "description", label: "Description", type: "textarea", span: 2 },
        { key: "customer_id", label: "Customer ID" },
        { key: "company_id", label: "Company ID" },
        { key: "case_id", label: "Case ID" },
        { key: "assignee_id", label: "Assignee ID" },
        { key: "assignee_name", label: "Assignee name" },
        { key: "kind", label: "Kind", type: "select", options: ["internal", "client", "case", "follow_up", "renewal"].map((k) => ({ value: k, label: k })) },
        { key: "priority", label: "Priority", type: "select", options: PRIORITY.map((p) => ({ value: p, label: p })) },
        { key: "due_date", label: "Due date", type: "date" },
        { key: "status", label: "Status", type: "select", options: TASK_STATUS.map((s) => ({ value: s, label: s })) },
        { key: "internal", label: "Internal (hidden from client)", type: "boolean" },
      ]}
    />
  );
}