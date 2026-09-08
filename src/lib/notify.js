// Frontend helper that invokes the sendNotification backend function.
import { base44 } from "@/api/base44Client";

export async function notify({
  event,
  variables = {},
  recipientUserId,
  recipientEmail,
  recipientName,
  adminNotify = false,
}) {
  try {
    await base44.functions.invoke("sendNotification", {
      event, variables, recipientUserId, recipientEmail, recipientName, adminNotify,
    });
  } catch (e) {
    // Notifications are best-effort; never block the user flow on them.
    console.warn("notify failed", event, e?.message);
  }
}

export const NOTIFICATION_EVENTS = [
  "customer_registered",
  "service_request",
  "quote_request",
  "consultation_booking",
  "case_status_update",
  "document_requested",
  "document_received",
  "document_approved",
  "document_rejected",
  "new_message",
  "task_assigned",
  "deadline_approaching",
  "renewal_approaching",
  "service_completed",
  "quote_updated",
  "consultation_confirmed",
  "account_notification",
];