import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Send, Upload, Loader2, FileText, MessageSquare } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState, inputClass } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { notify } from "@/lib/notify";

export default function PortalCaseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [kase, setKase] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [c, u, m, d] = await Promise.all([
        base44.entities.ServiceCase.get(id),
        base44.entities.CaseUpdate.filter({ case_id: id }, "created_date", 200),
        base44.entities.PortalMessage.filter({ case_id: id }, "created_date", 200),
        base44.entities.PortalDocument.filter({ case_id: id }, "-created_date", 200),
      ]);
      setKase(c); setUpdates(u); setMessages(m); setDocs(d);
    } catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [id]);

  async function sendMessage() {
    if (!msg.trim()) return;
    setSending(true);
    try {
      await base44.entities.PortalMessage.create({
        customer_id: user.id, case_id: id, company_id: kase?.company_id,
        sender: "customer", sender_name: user?.full_name || user?.email, body: msg, read: false,
      });
      await notify({ event: "new_message", variables: { client_name: user?.full_name || user?.email, case_number: kase?.title }, recipientEmail: "abrielexconsultancy@gmail.com", adminNotify: true });
      setMsg(""); await load();
    } catch {} finally { setSending(false); }
  }

  async function uploadDoc(e) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
      await base44.entities.PortalDocument.create({
        name: f.name, file_url, case_id: id, company_id: kase?.company_id,
        customer_id: user.id, status: "uploaded", requested: false,
      });
      await notify({ event: "document_received", variables: { client_name: user?.full_name || user?.email }, recipientEmail: "abrielexconsultancy@gmail.com", adminNotify: true });
      await load();
    } catch {} finally { setUploading(false); }
  }

  if (loading) return <Loader />;
  if (!kase) return <EmptyState icon={FileText} title="Case not found" message="This case may have been removed." action={<Link to="/portal/cases" className="text-primary hover:underline">Back to cases</Link>} />;

  return (
    <div>
      <Link to="/portal/cases" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to cases</Link>
      <PageHeader title={kase.title} subtitle={`${kase.company_name || "General"} · ${kase.service_category}`}
        actions={[<StatusBadge key="s" status={kase.status} />]} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-3 font-serif-display text-lg font-semibold">Details</h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="text-xs text-muted-foreground">Specific service</dt><dd>{kase.specific_service || "—"}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Priority</dt><dd className="capitalize">{kase.priority}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Consultant</dt><dd>{kase.assigned_staff_name || "To be assigned"}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Due date</dt><dd>{kase.due_date ? new Date(kase.due_date).toLocaleDateString() : "—"}</dd></div>
            </dl>
            {kase.description && <div className="mt-4"><div className="text-xs text-muted-foreground">Description</div><p className="mt-1 text-sm">{kase.description}</p></div>}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-serif-display text-lg font-semibold">Progress updates</h2>
            {updates.length === 0 ? <p className="text-sm text-muted-foreground">No updates yet. Our team will post progress here.</p>
              : <ol className="space-y-4">{updates.map((u) => (
                <li key={u.id} className="border-l-2 border-primary/30 pl-4">
                  <div className="text-xs text-muted-foreground">{u.author_name || "Abrielex"} · {new Date(u.created_date).toLocaleString()}</div>
                  {u.title && <div className="text-sm font-medium">{u.title}</div>}
                  <p className="text-sm text-muted-foreground">{u.body}</p>
                </li>
              ))}</ol>}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 flex items-center gap-2 font-serif-display text-lg font-semibold"><MessageSquare className="h-4 w-4" /> Messages</h2>
            <div className="mb-4 max-h-72 space-y-3 overflow-y-auto">
              {messages.length === 0 ? <p className="text-sm text-muted-foreground">Start the conversation about this case.</p>
                : messages.map((m) => (
                  <div key={m.id} className={m.sender === "customer" ? "text-right" : ""}>
                    <div className={`inline-block max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.sender === "customer" ? "bg-primary text-white" : "bg-muted"}`}>
                      {m.body}
                      {m.attachment_url && <a href={m.attachment_url} target="_blank" rel="noreferrer" className="mt-1 block text-xs underline">📎 {m.attachment_name || "attachment"}</a>}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.sender_name} · {new Date(m.created_date).toLocaleString()}</div>
                  </div>
                ))}
            </div>
            <div className="flex gap-2">
              <input className={inputClass} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message…" onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <button onClick={sendMessage} disabled={sending} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">{sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-3 font-serif-display text-lg font-semibold">Documents</h2>
            <label className="mb-3 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload document
              <input type="file" className="hidden" onChange={uploadDoc} disabled={uploading} />
            </label>
            {docs.length === 0 ? <p className="text-sm text-muted-foreground">No documents for this case.</p>
              : <ul className="space-y-2">{docs.map((d) => (
                <li key={d.id} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <a href={d.file_url} target="_blank" rel="noreferrer" className="truncate text-primary hover:underline">{d.name}</a>
                  <StatusBadge status={d.status} className="ml-auto" />
                </li>
              ))}</ul>}
          </Card>
        </div>
      </div>
    </div>
  );
}