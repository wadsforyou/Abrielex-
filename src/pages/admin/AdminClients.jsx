import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Users, X, Building2, FolderKanban } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, StatusBadge } from "@/components/portal/ui";
import { adminFilter, adminList } from "@/lib/adminData";

export default function AdminClients() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState({ companies: [], cases: [] });

  useEffect(() => { (async () => {
    try { setUsers(await adminList("User")); }
    catch {} finally { setLoading(false); }
  })(); }, []);

  async function openClient(u) {
    setSelected(u);
    try {
      const [companies, cases] = await Promise.all([
        adminFilter("Company", { created_by_id: u.id }, "-created_date", 100),
        adminFilter("ServiceCase", { customer_id: u.id }, "-created_date", 100),
      ]);
      setDetail({ companies, cases });
    } catch { setDetail({ companies: [], cases: [] }); }
  }

  const filtered = users.filter((u) => {
    if (u.role !== "user" && u.role !== undefined) return u.role === "user";
    if (u.role && u.role !== "user") return false;
    const matchesQuery = !query || (u.email || "").toLowerCase().includes(query.toLowerCase()) || (u.full_name || "").toLowerCase().includes(query.toLowerCase());
    const matchesCountry = !country || (u.data?.country || "") === country;
    return matchesQuery && matchesCountry;
  });

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Clients" subtitle="Manage customer accounts" />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email…" className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-9 rounded-md border border-input bg-card px-2 text-sm">
          <option value="">All countries</option><option value="ZW">Zimbabwe</option><option value="ZA">South Africa</option><option value="ZM">Zambia</option><option value="MZ">Mozambique</option><option value="AU">Australia</option>
        </select>
        <span className="text-xs text-muted-foreground">{filtered.length} clients</span>
      </div>

      {filtered.length === 0 ? <EmptyState icon={Users} title="No clients" message="No clients match your filters." />
        : <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Country</th><th className="px-4 py-3">Client type</th><th className="px-4 py-3"></th></tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{u.full_name || "—"}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.data?.country || "—"}</td>
                  <td className="px-4 py-3">{u.data?.client_type || "—"}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => openClient(u)} className="text-primary hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-lg bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="font-serif-display text-lg font-semibold">{selected.full_name || selected.email}</h2><button onClick={() => setSelected(null)}><X className="h-5 w-5 text-muted-foreground" /></button></div>
            <div className="space-y-5 p-5">
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div><span className="text-xs text-muted-foreground">Email</span><div>{selected.email}</div></div>
                <div><span className="text-xs text-muted-foreground">Phone</span><div>{selected.data?.phone || "—"}</div></div>
                <div><span className="text-xs text-muted-foreground">WhatsApp</span><div>{selected.data?.whatsapp || "—"}</div></div>
                <div><span className="text-xs text-muted-foreground">Location</span><div>{[selected.data?.city, selected.data?.state, selected.data?.country].filter(Boolean).join(", ") || "—"}</div></div>
                <div><span className="text-xs text-muted-foreground">Client type</span><div>{selected.data?.client_type || "—"}</div></div>
                <div><span className="text-xs text-muted-foreground">Entity type</span><div>{selected.data?.entity_type || "—"}</div></div>
              </div>
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><Building2 className="h-4 w-4" /> Companies ({detail.companies.length})</h3>
                {detail.companies.length === 0 ? <p className="text-xs text-muted-foreground">No companies.</p>
                  : <ul className="divide-y divide-border rounded-md border border-border">{detail.companies.map((c) => <li key={c.id} className="flex items-center justify-between p-3 text-sm"><span>{c.name}</span><StatusBadge status={c.status} /></li>)}</ul>}
              </div>
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold"><FolderKanban className="h-4 w-4" /> Cases ({detail.cases.length})</h3>
                {detail.cases.length === 0 ? <p className="text-xs text-muted-foreground">No cases.</p>
                  : <ul className="divide-y divide-border rounded-md border border-border">{detail.cases.map((c) => <li key={c.id} className="flex items-center justify-between p-3 text-sm"><span>{c.title}</span><StatusBadge status={c.status} /></li>)}</ul>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}