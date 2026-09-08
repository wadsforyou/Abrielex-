import React from "react";
import { companyInfo } from "@/lib/siteData";
import { cn } from "@/lib/utils";

export default function Logo({ className, variant = "default" }) {
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