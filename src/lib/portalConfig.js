// Shared status / option lists used across the customer portal & admin dashboard.
export const CASE_STATUS = [
  "not_started", "submitted", "under_review", "additional_info_required",
  "in_progress", "awaiting_client", "awaiting_payment", "completed", "closed",
];
export const COMPLIANCE_TYPES = [
  { value: "company_registration", label: "Company Registration" },
  { value: "company_compliance", label: "Company Compliance" },
  { value: "tax_compliance", label: "Tax Compliance" },
  { value: "annual_returns", label: "Annual Returns" },
  { value: "praz", label: "PRAZ" },
  { value: "vendor_number", label: "Vendor Number" },
  { value: "bookkeeping", label: "Bookkeeping" },
  { value: "license_renewal", label: "License Renewal" },
  { value: "other", label: "Other" },
];
export const DOC_STATUS = ["requested", "uploaded", "in_review", "approved", "rejected", "completed"];
export const QUOTE_STATUS = ["requested", "under_review", "prepared", "sent", "accepted", "declined", "expired"];
export const CONSULTATION_STATUS = ["pending", "confirmed", "completed", "cancelled"];
export const TASK_STATUS = ["open", "in_progress", "done", "cancelled"];
export const PRIORITY = ["low", "medium", "high", "urgent"];
export const ENTITY_TYPES = [
  "Sole Proprietor", "Partnership", "Private Limited Company", "Public Limited Company",
  "Section 27/NGO", "Cooperative", "Trust", "Other",
];
export const CLIENT_TYPES = ["Individual", "Business"];
export const REMINDER_LEVELS = [30, 14, 7, 1];

export function statusTone(status) {
  const s = (status || "").toLowerCase();
  if (["completed", "approved", "done", "confirmed", "accepted"].includes(s)) return "emerald";
  if (["closed", "cancelled", "rejected", "declined", "expired", "overdue"].includes(s)) return "rose";
  if (["awaiting_client", "additional_info_required", "replacement_required"].includes(s)) return "amber";
  if (["awaiting_payment", "due_soon"].includes(s)) return "violet";
  if (["in_progress", "under_review", "in_review", "submitted", "uploaded", "sent", "prepared"].includes(s)) return "sky";
  return "slate";
}

export function titleCase(s) {
  return (s || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}