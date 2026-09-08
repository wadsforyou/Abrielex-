// Role & permission helpers for the Abrielex platform.
// Platform roles: "admin" (all Abrielex staff) and "user" (customers).
// Staff sub-roles live on StaffProfile.staff_role and gate admin sections.

export const STAFF_ROLES = ["super_admin", "administrator", "consultant", "accountant", "support"];

export function isStaff(user) {
  return !!user && user.role === "admin";
}
export function isCustomer(user) {
  return !!user && (user.role === "user" || user.role === undefined);
}

// Built-in default permissions per staff sub-role. "*" = full access.
// Admins can override these per role from the Roles & Permissions page;
// overrides are loaded into `roleOverrides` at runtime by the admin shell.
export const PERMISSIONS = {
  super_admin: "*",
  administrator: "*",
  consultant: [
    "overview", "clients", "companies", "cases", "tasks", "documents",
    "messages", "notifications", "consultations", "deadlines", "renewals",
    "calendar", "reports", "resources", "faqs",
  ],
  accountant: [
    "overview", "clients", "companies", "quotes", "reports", "cases", "tasks", "deadlines", "renewals",
  ],
  support: [
    "overview", "clients", "messages", "notifications", "consultations", "faqs", "resources",
  ],
};

let roleOverrides = null;
export function setRoleOverrides(map) { roleOverrides = map || null; }

export function canAccess(staffRole, section) {
  if (!staffRole) return false;
  if (roleOverrides && roleOverrides[staffRole]) {
    return roleOverrides[staffRole].includes(section);
  }
  const perm = PERMISSIONS[staffRole];
  if (!perm) return false;
  if (perm === "*") return true;
  return perm.includes(section);
}