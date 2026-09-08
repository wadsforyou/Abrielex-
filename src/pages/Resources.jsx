import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import CTASection from "@/components/CTASection";
import { resources, resourceCategories, countries } from "@/lib/siteData";

export default function Resources() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.summary.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "All" || r.category === category;
      const matchCountry = country === "All" || r.country === country || r.country === "All";
      return matchQuery && matchCat && matchCountry;
    });
  }, [query, category, country]);

  function toggle(title) {
    setExpanded((e) => ({ ...e, [title]: !e[title] }));
  }

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Knowledge Centre</span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-serif-display text-4xl font-bold sm:text-5xl md:text-6xl text-balance">Resources</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            Business guides, compliance information, document checklists and articles — filter by
            country and category. Click "View" on any resource to read the full content right here.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* filters */}
          <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources…"
                className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="All">All categories</option>
              {resourceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-11 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="All">All countries</option>
              {countries.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => {
                const isOpen = !!expanded[r.title];
                return (
                  <article key={r.title} className="flex flex-col border border-border bg-card transition-colors hover:border-primary">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{r.type}</span>
                        <span className="text-xs text-muted-foreground">{r.country}</span>
                      </div>
                      <h3 className="font-serif-display text-lg font-semibold">{r.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-border px-6 py-4 text-xs text-muted-foreground">
                      <span>{r.category}</span>
                      <button
                        onClick={() => toggle(r.title)}
                        className="flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        {isOpen ? <><ChevronUp className="h-3.5 w-3.5" /> Hide</> : <><ChevronDown className="h-3.5 w-3.5" /> View</>}
                      </button>
                    </div>
                    {isOpen && r.content && (
                      <div className="border-t border-border bg-muted/30 px-6 py-5">
                        <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
                          {r.content.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
              <Filter className="h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No resources match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}