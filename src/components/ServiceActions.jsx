import React from "react";
import { Link } from "react-router-dom";
import { FileText, Calculator, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServiceActions({ serviceSlug, className, vertical = false }) {
  const query = serviceSlug ? `?service=${serviceSlug}` : "";
  return (
    <div className={cn("flex gap-3", vertical ? "flex-col" : "flex-wrap", className)}>
      <Link
        to={`/get-a-quote${query}`}
        className="flex flex-1 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <FileText className="h-4 w-4" /> Request This Service
      </Link>
      <Link
        to={`/get-a-quote${query}`}
        className="flex flex-1 items-center justify-center gap-2 border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Calculator className="h-4 w-4" /> Get a Quote
      </Link>
      <Link
        to={`/contact${query}`}
        className="flex flex-1 items-center justify-center gap-2 border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <MessageCircle className="h-4 w-4" /> Contact the Agency
      </Link>
    </div>
  );
}