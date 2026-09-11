import { base44 } from "@/api/base44Client";

// ---------------------------------------------------------------------------
// AUDIT LOGGING
// Records important administrative actions. The `adminControl` backend function
// already writes an AuditLog row for every entity_mutation and the dedicated
// actions (invite_user, transfer_ownership, cms_seeded). This helper is for
// admin actions that do not pass through a mutation — e.g. a submission being
// viewed or its status being reviewed from the dashboard.
//
// It is best-effort: an audit failure must never block the underlying action.
// ---------------------------------------------------------------------------
export async function logActivity({ action, targetType = "", targetId = "", details = "" }) {
  try {
    const res = await base44.functions.invoke("adminControl", {
      action: "log_activity",
      action_name: action,
      target_type: targetType,
      target_id: targetId,
      details,
    });
    return res?.result || null;
  } catch {
    return null;
  }
}
