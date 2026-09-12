import React from "react";
import { useCompanyInfo } from "@/lib/cms";
import { cn } from "@/lib/utils";

export default function Logo({ className }) {
  const companyInfo = useCompanyInfo();
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={companyInfo.logoUrl}
        alt="Abrielex Business Consultancy"
        className="h-full w-auto object-contain"
        style={{ maxHeight: "100%" }}
      />
    </div>
  );
}