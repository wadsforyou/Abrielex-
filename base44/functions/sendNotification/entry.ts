import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Render a template string by replacing {{var}} tokens with values.
function render(template, vars) {
  if (!template) return "";
  return String(template).replace(/\{\{\s*([\w]+)\s*\}\}/g, (_, k) =>
    (vars && vars[k] != null) ? String(vars[k]) : "");
}

// Load the single global notification settings record (or defaults).
async function getSettings(base44) {
  const list = await base44.asServiceRole.entities.NotificationSetting.list();
  const s = list.find((r) => r.key === "global") || list[0];
  return s || {
    email_enabled: true, whatsapp_enabled: false, inapp_enabled: true,
    sender_name: "Abrielex Business Consultancy", sender_email: "",
    whatsapp_configured: false, admin_notify_email: "",
  };
}

// Load active templates for an event, keyed by channel.
async function getTemplates(base44, event) {
  const list = await base44.asServiceRole.entities.NotificationTemplate.filter({ event });
  return list.filter((t) => t.active);
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { event, variables = {}, recipientUserId, recipientEmail, recipientName, adminNotify = false } = body;
    if (!event) return Response.json({ error: "event is required" }, { status: 400 });

    const settings = await getSettings(base44);
    const templates = await getTemplates(base44, event);
    const vars = { ...variables, client_name: recipientName || variables.client_name || "" };
    const result = { event, inapp: false, email: false, whatsapp: "not_configured", emailStatus: "skipped" };

    // 1. In-app notification (always to a known user)
    if (settings.inapp_enabled && recipientUserId) {
      const inappT = templates.find((t) => t.channel === "inapp");
      const title = inappT ? render(inappT.subject, vars) : render(event, vars);
      const text = inappT ? render(inappT.body, vars) : render(event, vars);
      await base44.asServiceRole.entities.PortalNotification.create({
        user_id: recipientUserId,
        type: event,
        title: title || event,
        body: text,
        link: variables.link || "",
        read: false,
      });
      result.inapp = true;
    }

    // 2. Email
    if (settings.email_enabled) {
      const emailT = templates.find((t) => t.channel === "email");
      const subject = emailT ? render(emailT.subject, vars) : `[Abrielex] ${event}`;
      const html = emailT ? render(emailT.body, vars) : render(event, vars);
      const targets = [];
      if (recipientEmail) targets.push(recipientEmail);
      if (adminNotify && settings.admin_notify_email) targets.push(settings.admin_notify_email);
      if (targets.length) {
        try {
          await base44.asServiceRole.integrations.Core.SendEmail({
            to: targets.join(","),
            subject,
            body: html,
            from_name: settings.sender_name || "Abrielex Business Consultancy",
          });
          result.email = true;
          result.emailStatus = "sent";
        } catch (e) {
          result.emailStatus = "error:" + (e.message || "send_failed");
        }
      } else {
        result.emailStatus = "no_recipient";
      }
    } else {
      result.emailStatus = "disabled";
    }

    // 3. WhatsApp — only act if a provider is actually configured.
    if (settings.whatsapp_enabled && settings.whatsapp_configured) {
      // Provider call would go here once a WhatsApp Business API connector is connected.
      result.whatsapp = "provider_not_connected";
    } else {
      result.whatsapp = settings.whatsapp_enabled ? "not_configured" : "disabled";
    }

    return Response.json({ ok: true, result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}