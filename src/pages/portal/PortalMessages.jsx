import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Send, Loader2, MessagesSquare } from "lucide-react";
import { PageHeader, Card, Loader, EmptyState, inputClass } from "@/components/portal/ui";
import { useAuth } from "@/lib/AuthContext";
import { notify } from "@/lib/notify";

export default function PortalMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState(null);
  const endRef = useRef(null);

  async function load() {
    setLoading(true);
    try {
      // General messages = those without a case_id
      const list = await base44.entities.PortalMessage.filter({}, "created_date", 500);
      setMessages(list.filter((m) => !m.case_id));
    } catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!msg.trim() && !file) return;
    setSending(true);
    try {
      let attachment_url = "", attachment_name = "";
      if (file) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        attachment_url = file_url; attachment_name = file.name;
      }
      await base44.entities.PortalMessage.create({
        customer_id: user.id, sender: "customer", sender_name: user?.full_name || user?.email,
        body: msg, attachment_url, attachment_name, read: false,
      });
      await notify({ event: "new_message", variables: { client_name: user?.full_name || user?.email }, recipientEmail: "abrielexconsultancy@gmail.com", adminNotify: true });
      setMsg(""); setFile(null); await load();
    } catch {} finally { setSending(false); }
  }

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Messages" subtitle="Communicate with the Abrielex team" />
      <Card className="flex h-[70vh] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.length === 0 ? <EmptyState icon={MessagesSquare} title="No messages yet" message="Send a message to start the conversation." />
            : messages.map((m) => (
              <div key={m.id} className={m.sender === "customer" ? "text-right" : ""}>
                <div className={`inline-block max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender === "customer" ? "bg-primary text-white" : "bg-muted"}`}>
                  {m.body}
                  {m.attachment_url && <a href={m.attachment_url} target="_blank" rel="noreferrer" className="mt-1 block text-xs underline">📎 {m.attachment_name || "attachment"}</a>}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{m.sender_name} · {new Date(m.created_date).toLocaleString()}</div>
              </div>
            ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="text-xs" />
            {file && <span className="text-xs text-muted-foreground">{file.name}</span>}
          </div>
          <div className="mt-2 flex gap-2">
            <input className={inputClass} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message…" onKeyDown={(e) => e.key === "Enter" && send()} />
            <button onClick={send} disabled={sending} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">{sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</button>
          </div>
        </div>
      </Card>
    </div>
  );
}