import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Upload, FileText, Loader2, Filter } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState, inputClass } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { notify } from "@/lib/notify";

export default function PortalDocuments() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const companyFilter = params.get("company");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  async function load() {
    setLoading(true);
    try {
      let list = await base44.entities.PortalDocument.filter({}, "-created_date", 200);
      if (companyFilter) list = list.filter((d) => d.company_id === companyFilter);
      if (statusFilter) list = list.filter((d) => d.status === statusFilter);
      setDocs(list);
    } catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [companyFilter, statusFilter]);

  async function upload(e) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
      await base44.entities.PortalDocument.create({ name: f.name, file_url, customer_id: user.id, status: "uploaded", requested: false });
      await notify({ event: "document_received", variables: { client_name: user?.full_name || user?.email }, recipientEmail: "abrielexconsultancy@gmail.com", adminNotify: true });
      await load();
    } catch {} finally { setUploading(false); }
  }

  if (loading) return <Loader />;

  const requested = docs.filter((d) => d.requested && d.status !== "approved" && d.status !== "completed");

  return (
    <div>
      <PageHeader title="Documents" subtitle="Upload, view and track your documents"
        actions={[<label key="up" className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload document
          <input type="file" className="hidden" onChange={upload} disabled={uploading} />
        </label>]} />

      {requested.length > 0 && (
        <Card className="mb-6 border-amber-200 bg-amber-50/50 p-4">
          <h2 className="mb-2 text-sm font-semibold text-amber-800">Documents requested by Abrielex</h2>
          <ul className="space-y-2">{requested.map((d) => (
            <li key={d.id} className="flex items-center justify-between text-sm">
              <div><div className="font-medium text-foreground">{d.name}</div>{d.request_note && <div className="text-xs text-muted-foreground">{d.request_note}</div>}</div>
              <StatusBadge status={d.status} />
            </li>
          ))}</ul>
        </Card>
      )}

      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-input bg-card px-2 text-sm">
          <option value="">All statuses</option>
          <option>requested</option><option>uploaded</option><option>in_review</option><option>approved</option><option>rejected</option><option>completed</option>
        </select>
      </div>

      {docs.length === 0 ? <EmptyState icon={FileText} title="No documents" message="Upload a document or wait for Abrielex to request one." />
        : <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Uploaded</th><th className="px-4 py-3"></th></tr></thead>
            <tbody className="divide-y divide-border">
              {docs.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{d.name}</div>{d.requested && <span className="ml-6 text-xs text-amber-700">Requested</span>}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(d.created_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">{d.file_url && <a href={d.file_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">Download</a>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>}
    </div>
  );
}