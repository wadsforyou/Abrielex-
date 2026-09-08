import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2 } from "lucide-react";
import { PageHeader, Card, Loader } from "@/components/portal/ui";
import { adminNav } from "@/lib/adminNav";
import { STAFF_ROLES, PERMISSIONS } from "@/lib/roles";

const EDITABLE_ROLES = ["consultant", "accountant", "support"];
const SECTIONS = adminNav.map((n) => ({ value: n.perm, label: n.label }));

export default function AdminRoles() {
  const [perms, setPerms] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { (async () => {
    try {
      const list = await base44.entities.RolePermission.list("-created_date", 50);
      const map = {};
      EDITABLE_ROLES.forEach((role) => {
        const rec = list.find((r) => r.role === role);
        map[role] = rec ? (rec.sections || "").split(",").map((s) => s.trim()).filter(Boolean) : (PERMISSIONS[role] === "*" ? SECTIONS.map((s) => s.value) : (PERMISSIONS[role] || []));
        map[role + "._id"] = rec?.id;
      });
      setPerms(map);
    } catch {} finally { setLoading(false); }
  })(); }, []);

  function toggle(role, section) {
    const cur = perms[role] || [];
    setPerms({ ...perms, [role]: cur.includes(section) ? cur.filter((s) => s !== section) : [...cur, section] });
  }

  async function save() {
    setSaving(true);
    try {
      for (const role of EDITABLE_ROLES) {
        const sections = (perms[role] || []).join(",");
        if (perms[role + "._id"]) {
          await base44.entities.RolePermission.update(perms[role + "._id"], { role, sections });
        } else {
          const rec = await base44.entities.RolePermission.create({ role, sections });
          setPerms((p) => ({ ...p, [role + "._id"]: rec.id }));
        }
      }
      await base44.entities.AuditLog.create({ action: "permission_change", target_type: "RolePermission", details: "Updated role permissions", actor_name: "admin" });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e) { alert("Failed: " + (e.message || "")); } finally { setSaving(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Roles & Permissions" subtitle="Control which admin sections each staff role can access"
        actions={[<button key="s" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save permissions</button>]} />
      <div className="mb-4 flex items-center gap-3">
        {saved && <span className="text-sm text-emerald-600">Saved.</span>}
      </div>
      <Card className="overflow-x-auto p-5">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Section</th>
              {EDITABLE_ROLES.map((role) => <th key={role} className="px-3 py-2 capitalize">{role.replace("_", " ")}</th>)}
              <th className="px-3 py-2">super_admin / administrator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SECTIONS.map((s) => (
              <tr key={s.value}>
                <td className="px-3 py-2 font-medium">{s.label}</td>
                {EDITABLE_ROLES.map((role) => (
                  <td key={role} className="px-3 py-2">
                    <input type="checkbox" checked={(perms[role] || []).includes(s.value)} onChange={() => toggle(role, s.value)} className="h-4 w-4" />
                  </td>
                ))}
                <td className="px-3 py-2 text-xs text-muted-foreground">Full access (always)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-xs text-muted-foreground">super_admin and administrator always have full access. Changes take effect for staff on their next dashboard load.</p>
    </div>
  );
}