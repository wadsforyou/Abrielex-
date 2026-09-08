import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";

export default function AdminNotifications() {
  return (
    <EntityManager
      entity="PortalNotification"
      title="Notifications"
      subtitle="In-app notifications sent to users"
      defaultSort="-created_date"
      searchKeys={["title", "type", "user_id"]}
      canEdit={false}
      columns={[
        { key: "title", label: "Title" },
        { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type?.replace(/_/g, " ")}</span> },
        { key: "user_id", label: "User ID", render: (r) => <span className="text-xs text-muted-foreground">{r.user_id?.slice(-8)}</span> },
        { key: "read", label: "Read", render: (r) => (r.read ? "✓" : "—") },
        { key: "created_date", label: "Sent", render: (r) => new Date(r.created_date).toLocaleString() },
      ]}
      fields={[
        { key: "user_id", label: "User ID (recipient)", required: true },
        { key: "type", label: "Type", type: "select", options: ["service_request", "case_status", "document_request", "document_approval", "consultation_confirmed", "quote_update", "deadline", "renewal", "message", "service_completed", "general"].map((t) => ({ value: t, label: t })) },
        { key: "title", label: "Title", required: true },
        { key: "body", label: "Body", type: "textarea", span: 2 },
        { key: "link", label: "Link (portal path)" },
      ]}
    />
  );
}