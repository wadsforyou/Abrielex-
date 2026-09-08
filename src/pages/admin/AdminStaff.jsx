import React from "react";
import EntityManager from "@/components/admin/EntityManager";
import { STAFF_ROLES } from "@/lib/roles";

export default function AdminStaff() {
  return (
    <EntityManager
      entity="StaffProfile"
      title="Staff"
      subtitle="Abrielex team members & their roles"
      defaultSort="-created_date"
      searchKeys={["full_name", "email", "staff_role"]}
      columns={[
        { key: "full_name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "staff_role", label: "Role", render: (r) => <span className="capitalize">{r.staff_role?.replace("_", " ")}</span> },
        { key: "title", label: "Title" },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "user_id", label: "User ID", required: true },
        { key: "full_name", label: "Full name" },
        { key: "email", label: "Email", type: "email" },
        { key: "staff_role", label: "Staff role", type: "select", options: STAFF_ROLES.map((r) => ({ value: r, label: r.replace("_", " ") })) },
        { key: "title", label: "Job title" },
        { key: "phone", label: "Phone" },
        { key: "active", label: "Active", type: "boolean" },
        { key: "permissions", label: "Permissions (notes)", type: "textarea", span: 2 },
      ]}
    />
  );
}