import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Briefcase, Loader } from "lucide-react";
import { PageHeader, Card, Loader as LoaderComp, StatusBadge, EmptyState } from "@/components/portal/ui";
import { COMPLIANCE_TYPES, titleCase } from "@/lib/portalConfig";

export default function PortalBusiness() {
  const [params] = useSearchParams();
  const companyId = params.get("company");
  const [companies, setCompanies] = useState([]);
  const [items, setItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const comps = await base44.entities.Company.filter({}, "-created_date", 200);
        setCompanies(comps);
        const target = companyId || comps[0]?.id;
        if (target) {
          const [ci, dl] = await Promise.all([
            base44.entities.ComplianceItem.filter({ company_id: target }, "-created_date", 200),
            base44.entities.Deadline.filter({ company_id: target }, "date", 50),
          ]);
          setItems(ci); setDeadlines(dl);
        }
      } catch {} finally { setLoading(false); }
    })();
  }, [companyId]);

  if (loading) return <LoaderComp />;
  const activeCompany = companies.find((c) => c.id === (companyId || companies[0]?.id));

  if (companies.length === 0) return <EmptyState icon={Briefcase} title="No companies" message="Add a company in My Companies to see its compliance status." />;

  return (
    <div>
      <PageHeader title="My Business" subtitle={activeCompany ? `Compliance overview for ${activeCompany.name}` : "Select a company"} />
      {companies.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {companies.map((c) => (
            <a key={c.id} href={`?company=${c.id}`} className={`rounded-md border px-3 py-1.5 text-sm ${c.id === activeCompany?.id ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted"}`}>{c.name}</a>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPLIANCE_TYPES.map((t) => {
          const item = items.find((i) => i.type === t.value);
          return (
            <Card key={t.value} className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{t.label}</h3>
                <StatusBadge status={item?.status || "not_started"} />
              </div>
              {item?.reference && <p className="mt-2 text-xs text-muted-foreground">Ref: {item.reference}</p>}
              {item?.expiry_date && <p className="text-xs text-muted-foreground">Expiry: {new Date(item.expiry_date).toLocaleDateString()}</p>}
              <p className="mt-2 text-xs text-muted-foreground">{item?.notes || "Not yet started — request this service to begin."}</p>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-5">
        <h2 className="mb-3 font-serif-display text-lg font-semibold">Upcoming renewals & deadlines</h2>
        {deadlines.length === 0 ? <p className="text-sm text-muted-foreground">No deadlines recorded for this company.</p>
          : <ul className="divide-y divide-border">{deadlines.map((d) => (
            <li key={d.id} className="flex items-center justify-between py-3">
              <div><div className="text-sm font-medium">{d.title}</div><div className="text-xs text-muted-foreground">{titleCase(d.type)} · {new Date(d.date).toLocaleDateString()}</div></div>
              <StatusBadge status={d.status} />
            </li>
          ))}</ul>}
      </Card>
    </div>
  );
}