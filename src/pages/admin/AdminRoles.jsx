import React, { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { adminList } from "@/lib/adminData";
import { PageHeader, Card, Loader, inputClass } from "@/components/portal/ui";
import { adminNav } from "@/lib/adminNav";

const permissions = adminNav.map((item) => ({ value: item.perm, label: item.label }));

export default function AdminRoles() {
  const [roles, setRoles] = useState([]); const [loading, setLoading] = useState(true); const [newRole, setNewRole] = useState("");
  async function load() { try { setRoles(await adminList("RolePermission", "-created_date", 200)); } catch {} finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  function toggle(index, permission) { setRoles(roles.map((role, i) => { if (i !== index) return role; const active = String(role.permissions || role.sections || "").split(",").filter(Boolean); const next = active.includes(permission) ? active.filter((item) => item !== permission) : [...active, permission]; return { ...role, permissions: next.join(",") }; })); }
  async function save(role) { const data = { role: role.role, permissions: role.permissions || role.sections || "", sections: role.permissions || role.sections || "" }; await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "RolePermission", mutation: role.id ? "update" : "create", id: role.id, data, auditDetails: `Role ${role.role} saved` }); load(); }
  async function add() { if (!newRole.trim()) return; await save({ role: newRole.trim(), permissions: "" }); setNewRole(""); }
  async function remove(role) { if (!role.is_system && window.confirm(`Delete role ${role.role}?`)) { await base44.functions.invoke("adminControl", { action: "entity_mutation", entity: "RolePermission", mutation: "delete", id: role.id, auditDetails: `Role ${role.role} deleted` }); load(); } }
  if (loading) return <Loader />;
  return <div><PageHeader title="Roles & Permissions" subtitle="Create custom roles and assign granular dashboard access" actions={[<div key="new" className="flex gap-2"><input className={inputClass} placeholder="New role name" value={newRole} onChange={(e) => setNewRole(e.target.value)} /><button onClick={add} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add</button></div>]} /><div className="space-y-4">{roles.map((role, index) => { const active = String(role.permissions || role.sections || "").split(",").filter(Boolean); return <Card key={role.id || role.role} className="p-5"><div className="flex items-center justify-between"><h2 className="font-serif-display text-lg font-semibold">{role.role}</h2><div className="flex gap-2"><button onClick={() => save(role)} className="inline-flex items-center gap-1 text-sm text-primary"><Save className="h-4 w-4" /> Save</button><button onClick={() => remove(role)} className="text-rose-600" aria-label={`Delete ${role.role}`}><Trash2 className="h-4 w-4" /></button></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{permissions.map((permission) => <label key={permission.value} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active.includes(permission.value)} onChange={() => toggle(index, permission.value)} />{permission.label}</label>)}</div></Card>; })}</div></div>;
}
