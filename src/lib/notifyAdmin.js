import { base44 } from "@/api/base44Client";

// Notifies administrators of a new public submission.
//
// The submission record is always created by the calling page FIRST, so a
// notification problem can never lose a client submission. This helper then
// asks the sendNotification backend function to:
//   1. create an in-dashboard notification for every active administrator, and
//   2. email each address configured for that specific form.
//
// It returns the backend's real result so callers can report delivery status
// honestly rather than assuming an email was sent.
export async function notifyAdmin(event, variables = {}, options = {}) {
  try {
    const response = await base44.functions.invoke("sendNotification", {
      event,
      variables,
      submissionEntity: options.submissionEntity || "",
      submissionId: options.submissionId || "",
      dedupeKey: options.dedupeKey || "",
      adminNotify: true,
    });
    const body = response?.data ?? response;
    return { ok: true, result: body?.result || null };
  } catch (error) {
    return { ok: false, error: error?.message || "notification_failed", result: null };
  }
}