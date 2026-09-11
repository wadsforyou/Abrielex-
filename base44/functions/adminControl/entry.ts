import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const permissionFor = { StaffProfile: "users", User: "users", RolePermission: "roles", SiteContent: "content", SeoPage: "seo", IntegrationSetting: "integrations", AuditLog: "audit", Service: "services", ServiceCategory: "services", Resource: "resources", FAQItem: "faqs", Location: "content", Country: "content", NotificationTemplate: "templates", NotificationSetting: "settings", ContactMessage: "messages", Quote: "quotes", QuoteRequest: "quotes", Consultation: "consultations", ConsultationBooking: "consultations", Testimonial: "content", CareerOpening: "content", Company: "companies", ServiceCase: "cases", CaseUpdate: "cases", PortalDocument: "documents", PortalTask: "tasks", Deadline: "deadlines", ComplianceItem: "renewals", PortalNotification: "notifications", PortalMessage: "messages" };

async function getContext(base44, actor) {
  const profiles = await base44.asServiceRole.entities.StaffProfile.list("-created_date", 500);
  const profile = profiles.find((item) => item.user_id === actor.id);
  if (!profile || profile.active === false) return { profiles, profile: null, owner: false, permissions: [] };
  if (profile.is_owner || profile.staff_role === "super_admin") return { profiles, profile, owner: true, permissions: ["*"] };
  const roles = await base44.asServiceRole.entities.RolePermission.list("-created_date", 500);
  const role = roles.find((item) => item.role === profile.staff_role);
  return { profiles, profile, owner: false, permissions: String(role?.permissions || role?.sections || "").split(",").map((item) => item.trim()).filter(Boolean) };
}

// Idempotent CMS seeding. The `seed` payload carries the existing live-site content
// (already truthful). We only create records that are not already present, so an
// administrator's later edits are never overwritten by re-running the seed.
async function seedCms(base44, seed, force) {
  const summary = {};
  const collections = [
    "ServiceCategory", "Service", "FAQItem", "Resource", "SiteContent",
    "Location", "NotificationTemplate", "Country", "Testimonial", "SeoPage",
  ];
  for (const name of collections) {
    const rows = Array.isArray(seed[name]) ? seed[name] : [];
    if (!rows.length) continue;
    const entity = base44.asServiceRole.entities[name];
    const existing = force ? [] : await entity.list("-created_date", 1000);
    let created = 0, skipped = 0, patched = 0;
    for (const row of rows) {
      const key = row.key || row.slug || row.question || row.title || row.city || (row.event && row.channel ? `${row.event}:${row.channel}` : undefined);
      const duplicate = key ? existing.find((e) => (e.key || e.slug || e.question || e.title || e.city || (e.event && e.channel ? `${e.event}:${e.channel}` : undefined)) === key) : false;
      if (duplicate) {
        // Backfill fields the existing record is missing (e.g. map coordinates
        // added after the record was first created). Never overwrite values the
        // administrator has already set.
        const missing = {};
        for (const [k, v] of Object.entries(row)) {
          if (duplicate[k] === undefined || duplicate[k] === null || duplicate[k] === "") missing[k] = v;
        }
        if (Object.keys(missing).length) { await entity.update(duplicate.id, missing); patched++; }
        skipped++;
        continue;
      }
      await entity.create(row);
      created++;
    }
    summary[name] = { created, skipped, patched };
  }
  return summary;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const actor = await base44.auth.me();
    if (!actor || actor.role !== "admin") return Response.json({ error: "Admin access required" }, { status: 403 });
    const context = await getContext(base44, actor);
    const body = await req.json();
    const can = (permission) => context.owner || context.permissions.includes("*") || context.permissions.includes(permission) || context.permissions.includes("manage_settings");

    if (body.action === "entity_read") {
      const permission = permissionFor[body.entity];
      if (!permission) return Response.json({ error: "Entity read is not permitted" }, { status: 400 });
      if (!can(permission)) return Response.json({ error: `Permission required: ${permission}` }, { status: 403 });
      const entity = base44.asServiceRole.entities[body.entity];
      const result = body.operation === "filter"
        ? await entity.filter(body.filters || {}, body.sort || "-created_date", body.limit || 500)
        : await entity.list(body.sort || "-created_date", body.limit || 500);
      return Response.json({ ok: true, result });
    }

    if (body.action === "seed_cms") {
      if (!can("content")) return Response.json({ error: "Website content permission required" }, { status: 403 });
      const summary = await seedCms(base44, body.seed || {}, !!body.force);
      await base44.asServiceRole.entities.AuditLog.create({ actor_id: actor.id, actor_name: actor.email, action: "cms_seeded", target_type: "SiteContent", details: `Seeded CMS content: ${JSON.stringify(summary)}` });
      return Response.json({ ok: true, result: summary });
    }

    if (body.action === "log_activity") {
      if (!can("audit")) return Response.json({ error: "Audit permission required" }, { status: 403 });
      if (!body.action_name) return Response.json({ error: "action_name is required" }, { status: 400 });
      const logged = await base44.asServiceRole.entities.AuditLog.create({
        actor_id: actor.id,
        actor_name: actor.email,
        action: body.action_name,
        target_type: body.target_type || "",
        target_id: body.target_id || "",
        details: body.details || "",
      });
      return Response.json({ ok: true, result: logged });
    }

    if (body.action === "invite_user") {
      if (!can("users")) return Response.json({ error: "User management permission required" }, { status: 403 });
      if (!body.email) return Response.json({ error: "Email is required" }, { status: 400 });
      const invited = await base44.auth.inviteUser(body.email, body.role === "admin" ? "admin" : "user");
      await base44.asServiceRole.entities.AuditLog.create({ actor_id: actor.id, actor_name: actor.email, action: "user_invited", target_type: "User", details: `Invited ${body.email}` });
      return Response.json({ ok: true, invited });
    }

    if (body.action === "transfer_ownership") {
      if (!context.profile?.is_owner) return Response.json({ error: "Only the current owner can transfer ownership" }, { status: 403 });
      const target = context.profiles.find((profile) => profile.user_id === body.targetUserId);
      if (!target || target.user_id === actor.id) return Response.json({ error: "A different existing admin profile is required" }, { status: 400 });
      await base44.asServiceRole.entities.StaffProfile.update(context.profile.id, { is_owner: false, staff_role: "administrator", active: body.removeAccess ? false : true });
      await base44.asServiceRole.entities.StaffProfile.update(target.id, { is_owner: true, active: true, staff_role: "administrator" });
      await base44.asServiceRole.entities.AuditLog.create({ actor_id: actor.id, actor_name: actor.email, action: "ownership_transferred", target_type: "StaffProfile", target_id: target.user_id, details: `Ownership transferred from ${actor.id} to ${target.user_id}` });
      return Response.json({ ok: true, previousOwnerId: actor.id, newOwnerId: target.user_id });
    }

    if (body.action === "entity_mutation") {
      const permission = permissionFor[body.entity];
      if (!permission) return Response.json({ error: "Entity mutation is not permitted" }, { status: 400 });
      if (!can(permission)) return Response.json({ error: `Permission required: ${permission}` }, { status: 403 });
      if (body.entity === "StaffProfile" && body.data?.is_owner && !context.owner) return Response.json({ error: "Only the owner can grant ownership" }, { status: 403 });
      if (body.entity === "User") return Response.json({ error: "User records are managed through invitations, not direct mutation" }, { status: 400 });
      const entity = base44.asServiceRole.entities[body.entity];
      let result;
      if (body.mutation === "create") result = await entity.create(body.data || {});
      else if (body.mutation === "update") result = await entity.update(body.id, body.data || {});
      else if (body.mutation === "delete") result = await entity.delete(body.id);
      else return Response.json({ error: "Unsupported mutation" }, { status: 400 });
      if (body.entity !== "AuditLog") await base44.asServiceRole.entities.AuditLog.create({ actor_id: actor.id, actor_name: actor.email, action: `${body.entity.toLowerCase()}_${body.mutation}`, target_type: body.entity, target_id: body.id || result?.id || "", details: body.auditDetails || "Admin mutation" });
      return Response.json({ ok: true, result });
    }

    return Response.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message || "Admin control failed" }, { status: 500 });
  }
}
