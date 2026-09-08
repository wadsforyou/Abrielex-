import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminLocations() {
  return (
    <EntityManager
      entity="Location"
      title="Locations"
      subtitle="States/provinces & cities per country"
      defaultSort="country_code"
      searchKeys={["country_name", "state", "city"]}
      columns={[
        { key: "country_name", label: "Country" },
        { key: "state", label: "State / Province" },
        { key: "city", label: "City" },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "country_code", label: "Country code", required: true },
        { key: "country_name", label: "Country name" },
        { key: "state", label: "State / Province", required: true },
        { key: "city", label: "City" },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  );
}