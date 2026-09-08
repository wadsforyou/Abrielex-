import { base44 } from "@/api/base44Client";

// Notifies administrators of a new public submission via the sendNotification
// backend function (email + WhatsApp + in-app, based on admin settings).
// The record is always created in the dashboard regardless of notification status.
export async function notifyAdmin(event, variables = {}) {
  try {
    await base44.functions.invoke("sendNotification", {
      event,
      variables,
      adminNotify: true,
    });
    return true;
  } catch {
    return false;
  }
}