import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { StatusBadge } from "@/components/portal/ui";
import { CONSULTATION_STATUS } from "@/lib/portalConfig";

export default function AdminConsultations() {
  return (
    <EntityManager
      entity="ConsultationBooking"
      title="Consultations"
      subtitle="Approve, reschedule and assign consultations"
      defaultSort="-preferred_date"
      searchKeys={["name", "email", "consultation_type", "country"]}
      columns={[
        { key: "name", label: "Client" },
        { key: "consultation_type", label: "Type" },
        { key: "preferred_date", label: "Date", render: (r) => `${new Date(r.preferred_date).toLocaleDateString()} · ${r.preferred_time}` },
        { key: "country", label: "Country" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { key: "name", label: "Client name" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone" },
        { key: "consultation_type", label: "Type" },
        { key: "preferred_date", label: "Date", type: "date" },
        { key: "preferred_time", label: "Time" },
        { key: "country", label: "Country" },
        { key: "location", label: "Location" },
        { key: "reason", label: "Reason", type: "textarea", span: 2 },
        { key: "status", label: "Status", type: "select", options: CONSULTATION_STATUS.map((s) => ({ value: s, label: s })) },
      ]}
    />
  );
}