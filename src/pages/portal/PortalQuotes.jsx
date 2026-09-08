import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { companyInfo, whatsappLink } from "@/lib/siteData";
import { FileSpreadsheet, MessageCircle, Mail } from "lucide-react";
import { PageHeader, Card, Loader, StatusBadge, EmptyState } from "@/components/portal/ui";

export default function PortalQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => {
    try { setQuotes(await base44.entities.Quote.filter({}, "-created_date", 100)); }
    catch {} finally { setLoading(false); }
  })(); }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <PageHeader title="Quotes" subtitle="Review and respond to quotes from Abrielex" />
      {quotes.length === 0 ? <EmptyState icon={FileSpreadsheet} title="No quotes yet" message="When Abrielex prepares a quote for you, it will appear here." />
        : <div className="grid gap-4 sm:grid-cols-2">
          {quotes.map((q) => (
            <Card key={q.id} className="p-5">
              <div className="flex items-start justify-between">
                <div><h3 className="font-serif-display text-base font-semibold">{q.service_category}</h3>{q.specific_service && <p className="text-xs text-muted-foreground">{q.specific_service}</p>}{q.company_name && <p className="text-xs text-muted-foreground">{q.company_name}</p>}</div>
                <StatusBadge status={q.status} />
              </div>
              {q.description && <p className="mt-3 text-sm text-muted-foreground">{q.description}</p>}
              {q.amount != null && <p className="mt-3 text-2xl font-bold text-foreground">{q.currency} {Number(q.amount).toLocaleString()}</p>}
              {q.valid_until && <p className="text-xs text-muted-foreground">Valid until {new Date(q.valid_until).toLocaleDateString()}</p>}
              {q.notes && <p className="mt-2 text-xs text-muted-foreground">{q.notes}</p>}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#1a9c4f]"><MessageCircle className="h-3.5 w-3.5" /> Contact to pay</a>
                <a href={`mailto:${companyInfo.email}?subject=Payment instructions for quote`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"><Mail className="h-3.5 w-3.5" /> Request payment instructions</a>
              </div>
            </Card>
          ))}
        </div>}
    </div>
  );
}