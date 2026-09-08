import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Send, Loader2, MessagesSquare } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, inputClass } from "@/components/portal/ui";
import { notify } from "@/lib/notify";

export default function AdminMessages() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => { (async () => {
    try { setAll(await base44.entities.PortalMessage.filter({}, "created_date", 1000)); }
    catch {} finally { setLoading(false); }
  })(); }, []);

  const byCustomer = {};
  all.forEach((m) => { (byCustomer[m.customer_id] = byCustomer[m.customer_id] || { id: m.customer_id, name: m.sender === "customer" ? m.sender_name : "", messages: [] }); byCustomer[m.customer_id].messages.push(m); if (!byCustomer[m.customer_id].name && m.sender_name) byCustomer[m.customer_id].name = m.sender_name; });
  const convos = Object.values(byCustomer).sort((a, b) => new Date(b.messages[b.messages.length - 1].created_date) - new Date(a.messages[a.messages.length - 1].created_date));
  const active = convos.find((c) => c.id === activeCustomer);
  const thread = active?.messages || [];

  async function send() {
    if (!msg.trim() || !active) return;
    setSending(true);
    try {
      const last = active.messages[active.messages.length - 1];
      await base44.entities.PortalMessage.create({ customer_id: active.id, case_id: last?.case_id, company_id: last?.company_id, sender: "staff", sender_name: "Abrielex", body: msg, read: false });
      await notify({ event: "new_message", variables: { client_name: active.name }, recipientUserId: active.id });
      setMsg(""); setAll(await base44.entities.PortalMessage.filter({}, "created_date", 1000));
    } catch {} finally { setSending(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Messages" subtitle="Client conversations" />
      {convos.length === 0 ? <EmptyState icon={MessagesSquare} title="No messages" message="Client messages will appear here." />
        : <div className="grid gap-4 lg:grid-cols-3">
          <Card className="divide-y divide-border lg:col-span-1">
            {convos.map((c) => (
              <button key={c.id} onClick={() => setActiveCustomer(c.id)} className={`block w-full p-4 text-left hover:bg-muted/30 ${activeCustomer === c.id ? "bg-accent/40" : ""}`}>
                <div className="text-sm font-medium">{c.name || c.id}</div>
                <div className="truncate text-xs text-muted-foreground">{c.messages[c.messages.length - 1].body}</div>
              </button>
            ))}
          </Card>
          <Card className="flex h-[70vh] flex-col lg:col-span-2">
            {!active ? <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Select a conversation</div>
              : <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {thread.map((m) => (
                    <div key={m.id} className={m.sender === "staff" ? "text-right" : ""}>
                      <div className={`inline-block max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender === "staff" ? "bg-primary text-white" : "bg-muted"}`}>{m.body}{m.attachment_url && <a href={m.attachment_url} target="_blank" rel="noreferrer" className="mt-1 block text-xs underline">📎 {m.attachment_name || "attachment"}</a>}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{m.sender_name} · {new Date(m.created_date).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-t border-border p-3">
                  <input className={inputClass} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Reply…" onKeyDown={(e) => e.key === "Enter" && send()} />
                  <button onClick={send} disabled={sending} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">{sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</button>
                </div>
              </>}
          </Card>
        </div>}
    </div>
  );
}