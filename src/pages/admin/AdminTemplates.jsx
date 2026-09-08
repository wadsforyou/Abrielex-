import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { NOTIFICATION_EVENTS } from "@/lib/notify";

export default function AdminTemplates() {
  return (
    <EntityManager
      entity="NotificationTemplate"
      title="Notification Templates"
      subtitle="Editable email, WhatsApp & in-app templates with {{variables}}"
      defaultSort="event"
      searchKeys={["event", "channel"]}
      columns={[
        { key: "event", label: "Event" },
        { key: "channel", label: "Channel", render: (r) => <span className="capitalize">{r.channel}</span> },
        { key: "subject", label: "Subject" },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "event", label: "Event", type: "select", options: NOTIFICATION_EVENTS.map((e) => ({ value: e, label: e })) },
        { key: "channel", label: "Channel", type: "select", options: ["email", "whatsapp", "inapp"].map((c) => ({ value: c, label: c })) },
        { key: "subject", label: "Subject (email/in-app title)" },
        { key: "body", label: "Body — use {{client_name}} {{company_name}} {{service_name}} {{case_number}} {{status}} {{due_date}} {{consultation_date}}", type: "textarea", span: 2 },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  );
}