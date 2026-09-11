import React from "react";
import EntityManager from "@/components/admin/EntityManager";

export default function AdminLocations() {
  return (
    <EntityManager
      entity="Location"
      title="Cities & Locations"
      subtitle="Cities shown in coverage lists and the coverage map on the public website"
      defaultSort="sort_order"
      searchKeys={["city", "state", "country_name"]}
      columns={[
        { key: "city", label: "City" },
        { key: "state", label: "Province / State" },
        { key: "country_name", label: "Country" },
        { key: "primary", label: "Primary hub", render: (r) => (r.primary ? "✓" : "—") },
        { key: "active", label: "Active", render: (r) => (r.active ? "✓" : "—") },
      ]}
      fields={[
        { key: "city", label: "City", required: true },
        { key: "state", label: "Province / State" },
        { key: "country_name", label: "Country name" },
        { key: "country_code", label: "Country code (e.g. ZW)" },
        { key: "lat", label: "Latitude (map)", type: "number" },
        { key: "lng", label: "Longitude (map)", type: "number" },
        { key: "primary", label: "Primary hub (shown larger)", type: "boolean" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "active", label: "Active (show on public site)", type: "boolean" },
      ]}
    />
  );
}
