import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// ---------------------------------------------------------------------------
// SUBMISSION NOTIFICATION SYSTEM
//
// Public form submissions (Get a Quote, Book a Consultation, Contact) call this
// function. It does three real things, in this order:
//
//   1. Creates an in-dashboard notification for every active administrator.
//   2. Emails every address configured to receive that specific form's
//      notifications (each form has its own independent recipient list).
//   3. Records the outcome in NotificationDelivery, including per-recipient
//      delivery and any failure, so a failed email is never reported as sent.
//
// Recipients live in the database (NotificationSetting), never in frontend code.
// The submission itself is always saved by the calling page first, so an email
// failure can never lose a client submission.
// ---------------------------------------------------------------------------

// Which settings field holds the recipient list for each event.
const RECIPIENT_FIELD = {
  quote_request: 'quote_recipients',
  consultation_booking: 'consultation_recipients',
  contact_message: 'contact_recipients',
};

// Human labels used in notification titles and email subjects.
const EVENT_LABEL = {
  quote_request: 'Get a Quote',
  consultation_booking: 'Book a Consultation',
  contact_message: 'Contact',
};

// Where the admin lands when they open the notification.
const EVENT_LINK = {
  quote_request: '/admin/quotes',
  consultation_booking: '/admin/consultations',
  contact_message: '/admin/messages',
};

const EMAIL_SUBJECT = {
  quote_request: 'NEW GET A QUOTE REQUEST',
  consultation_booking: 'NEW BOOK A CONSULTATION REQUEST',
  contact_message: 'NEW CONTACT MESSAGE',
};

// Turn a free-text field ("a@x.com, b@y.com\nc@z.com") into a clean unique list.
function parseRecipients(value) {
  return String(value || '')
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
    .filter((s, i, arr) => arr.indexOf(s) === i);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

// Render a template string by replacing {{var}} tokens with values.
function render(template, vars) {
  if (!template) return "";
  return String(template).replace(/\{\{\s*([\w]+)\s*\}\}/g, (_, k) =>
    (vars && vars[k] != null) ? String(vars[k]) : "");
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

// Load the active template for an event + channel (or null).
async function getTemplate(base44, event, channel) {
  const list = await base44.asServiceRole.entities.NotificationTemplate.filter({ event, channel });
  return list.find((t) => t.active) || null;
}

// Build a clean, professional HTML email from the submitted fields.
function buildEmailHtml(event, vars, dashLink) {
  const rows = [
    ['Submission type', EVENT_LABEL[event] || event],
    ['Client name', vars.client_name],
    ['Email address', vars.email],
    ['Phone', vars.phone],
    ['WhatsApp', vars.whatsapp],
    ['Service category', vars.service_category],
    ['Specific service', vars.specific_service],
    ['Client type', vars.client_type],
    ['Business / entity type', vars.entity_type],
    ['Consultation type', vars.consultation_type],
    ['Preferred date', vars.preferred_date],
    ['Preferred time', vars.preferred_time],
    ['Preferred contact method', vars.preferred_contact_method],
    ['Subject', vars.subject],
    ['Location', vars.location],
    ['Received', vars.submitted_at],
  ].filter(([, v]) => v != null && String(v).trim() !== '');

  const details = [
    ['Details', vars.description],
    ['Message', vars.message],
    ['Reason for consultation', vars.reason],
    ['Additional information', vars.additional_info],
  ].filter(([, v]) => v != null && String(v).trim() !== '');

  const attachment = vars.document_url
    ? `<p style="margin:14px 0 0"><strong>Attachment:</strong> <a href="${escapeHtml(vars.document_url)}">${escapeHtml(vars.document_url)}</a></p>`
    : '<p style="margin:14px 0 0;color:#64748b">No attachment was uploaded.</p>';

  return `
 <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px">
    <div style="background:#0f172a;color:#fff;padding:18px 22px">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd">Abrielex Business Consultancy</div>
      <h1 style="margin:6px 0 0;font-size:20px">${escapeHtml(EMAIL_SUBJECT[event] || 'NEW SUBMISSION')}</h1>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:0;padding:22px">
      <p style="margin:0 0 16px">A new ${escapeHtml((EVENT_LABEL[event] || event).toLowerCase())} submission was received from <strong>${escapeHtml(vars.client_name || 'a website visitor')}</strong>.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
      </table>
      ${details.map(([k, v]) => `<div style="margin-top:16px"><div style="color:#64748b;font-size:13px">${escapeHtml(k)}</div><div style="margin-top:4px;white-space:pre-wrap">${escapeHtml(v)}</div></div>`).join('')}
      ${attachment}
      <p style="margin:22px 0 0;font-size:14px">View and respond to this submission in the admin dashboard:<br>
        <a href="${escapeHtml(dashLink)}" style="color:#2a82c5">${escapeHtml(dashLink)}</a>
      </p>
      <p style="margin:18px 0 0;font-size:12px;color:#94a3b8">
        Sent automatically by the Abrielex website. The submission is stored in the dashboard whether or not this email reached you.
      </p>
    </div>
 </div>`;
}

async function recordDelivery(base44, payload) {
  try {
    await base44.asServiceRole.entities.NotificationDelivery.create(payload);
  } catch {
    // Deliberately swallowed: a logging failure must not break the submission.
  }
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const {
      event,
      variables = {},
      recipientUserId,
      recipientEmail,
      recipientName,
      adminNotify = false,
      submissionEntity = "",
      submissionId = "",
      dedupeKey = "",
    } = body;
    if (!event) return Response.json({ error: "event is required" }, { status: 400 });

    const settings = await getSettings(base44);
    const vars = {
      ...variables,
      client_name: recipientName || variables.client_name || "",
      submitted_at: variables.submitted_at || new Date().toISOString(),
    };
    const label = EVENT_LABEL[event] || event;
    const dashLink = "https://abrielexconsultancy.co.zw" + (EVENT_LINK[event] || "/admin");

    const result: any = {
      event,
      admins: 0,
      inapp: false,
      email: false,
      recipients: [] as string[],
      delivered: [] as string[],
      failed: [] as { to: string; error: string }[],
      emailStatus: "skipped",
      whatsapp: "not_configured",
      inappError: "",
    };

    // 1. In-dashboard notification for every active administrator.
    //    Public submissions carry no recipientUserId, so the notification is
    //    created for all admins; a known user_id is still honoured when supplied.
    if (settings.inapp_enabled) {
      const inappT = await getTemplate(base44, event, "inapp");
      const title = (inappT && render(inappT.subject, vars)) || `New ${label} Request`;
      const text =
        (inappT && render(inappT.body, vars)) ||
        `${vars.client_name || "A visitor"} submitted a ${label.toLowerCase()} request.`;

      // AdminNotification is the single shared admin inbox: one record per
      // submission, visible to every administrator, so it must not be
      // duplicated per staff member.
      try {
        await base44.asServiceRole.entities.AdminNotification.create({
          title,
          body: text,
          type: event,
          submission_type: event,
          submission_id: submissionId || "",
          link: EVENT_LINK[event] || "/admin",
          read: false,
        });
        result.admins = 1;
        result.inapp = true;
      } catch (e) {
        result.inappError = (e && e.message) || "inapp_failed";
      }
    }

    // 2. Email to the recipients configured for THIS form only.
    //    Each form has its own list, so a quote notification never reaches
    //    consultation recipients unless that address is configured for both.
    if (settings.email_enabled) {
      const field = RECIPIENT_FIELD[event];
      const configured = field ? parseRecipients(settings[field]) : [];

      const targets = [...configured];
      if (isEmail(recipientEmail)) targets.push(String(recipientEmail).trim());
      if (adminNotify && isEmail(settings.admin_notify_email)) {
        targets.push(String(settings.admin_notify_email).trim());
      }
      const uniqueTargets = targets.filter((t, i, arr) => arr.indexOf(t) === i);
      result.recipients = uniqueTargets;

      if (!uniqueTargets.length) {
        result.emailStatus = "no_recipient";
      } else {
        const emailT = await getTemplate(base44, event, "email");
        const subject =
          render(emailT && emailT.subject, vars) ||
          `${EMAIL_SUBJECT[event] || "NEW SUBMISSION"} — ABRIELEX BUSINESS CONSULTANCY`;
        const html =
          emailT && emailT.body ? render(emailT.body, vars) : buildEmailHtml(event, vars, dashLink);

        // Sent individually so each delivery is real and traceable, and one bad
        // address cannot silently drop the rest.
        for (const to of uniqueTargets) {
          try {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to,
              subject,
              body: html,
              from_name: settings.sender_name || "Abrielex Business Consultancy",
            });
            result.delivered.push(to);
          } catch (e) {
            result.failed.push({ to, error: (e && e.message) || "send_failed" });
          }
        }
        result.email = result.delivered.length > 0;
        result.emailStatus = result.failed.length
          ? result.delivered.length
            ? "partial"
            : "error"
          : "sent";
      }
    } else {
      result.emailStatus = "disabled";
    }

    // 3. Delivery record — an honest status, never a fabricated "sent".
    const statusMap = {
      sent: "sent",
      partial: "partial",
      error: "failed",
      no_recipient: "no_recipient",
      disabled: "disabled",
      skipped: "skipped",
    };
    await recordDelivery(base44, {
      event,
      submission_entity: submissionEntity,
      submission_id: submissionId,
      dedupe_key: dedupeKey || (submissionEntity && submissionId ? `${submissionEntity}:${submissionId}` : ""),
      recipients: result.recipients.join(", "),
      delivered: result.delivered.join(", "),
      failed: result.failed.map((f) => `${f.to} (${f.error})`).join("; "),
      status: statusMap[result.emailStatus] || "skipped",
      attempts: 1,
      last_error: result.failed.map((f) => f.error).join("; ").slice(0, 500),
      client_name: vars.client_name || "",
      subject: `${label} submission`,
    });

    // 4. WhatsApp — only act if a provider is actually configured.
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