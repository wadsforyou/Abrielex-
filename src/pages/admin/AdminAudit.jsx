import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminAudit() {
  return (
    <EntityManager
      entity="AuditLog"
      title="Audit Trail"
      subtitle="Record of important administrative actions"
      defaultSort="-created_date"
      canCreate={false}
      canEdit={false}
      canDelete={false}
      searchKeys={["action", "actor_name", "target_type"]}
      columns={[
        { key: "created_date", label: "When", render: (r) => new Date(r.created_date).toLocaleString() },
        { key: "actor_name", label: "Actor" },
        { key: "action", label: "Action" },
        { key: "target_type", label: "Target" },
        { key: "details", label: "Details", render: (r) => <span className="text-xs text-muted-foreground">{r.details}</span> },
      ]}
      fields={[]}
    />
  );
}