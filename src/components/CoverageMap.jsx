import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { coveragePoints } from "@/lib/siteData";
import { cn } from "@/lib/utils";
import { MousePointerClick, Map as MapIcon } from "lucide-react";

// Project lat/lng to the static preview SVG (viewBox 0 0 100 100).
function project(lng, lat) {
  const x = ((lng - 21.5) / 12) * 90 + 5;
  const y = ((-15.5 - lat) / 7) * 90 + 5;
  return { x, y };
}

export default function CoverageMap({ className }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className={cn("relative w-full overflow-hidden rounded-lg border border-border bg-card", className)}>
        <MapContainer
          center={[-19.0, 29.0]}
          zoom={6}
          scrollWheelZoom
          className="h-full w-full"
          style={{ minHeight: "320px", height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coveragePoints.map((p) => (
            <CircleMarker
              key={p.city}
              center={[p.lat, p.lng]}
              radius={p.primary ? 9 : 6}
              pathOptions={{
                color: "#2a82c5",
                fillColor: p.primary ? "#2a82c5" : "#7fb3dd",
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <strong>{p.city}</strong>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {p.primary ? "Primary service hub" : "Service area (remote & in-person where applicable)"}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <button
          onClick={() => setActive(false)}
          className="absolute right-3 top-3 z-[1000] flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:border-primary hover:text-primary"
        >
          <MapIcon className="h-3.5 w-3.5" /> Reset to preview
        </button>
      </div>
    );
  }

  // Static, non-interactive preview.
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg border border-border bg-muted/30", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Abrielex multi-city coverage across Zimbabwe (preview)">
        <defs>
          <pattern id="cmap-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-border" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#cmap-grid)" />

        {/* simplified Zimbabwe silhouette */}
        <path
          d="M 30,14 L 78,14 L 86,28 L 88,52 L 82,72 L 66,82 L 48,82 L 34,74 L 24,60 L 21,40 L 27,22 Z"
          className="fill-secondary"
          fillOpacity={0.45}
          stroke="currentColor"
          strokeWidth="0.3"
          strokeOpacity="0.4"
        />
        <text x="50" y="9" className="fill-foreground/50" style={{ fontSize: "3px", fontFamily: "Inter, sans-serif", textAnchor: "middle", letterSpacing: "0.5px" }}>
          ZIMBABWE
        </text>

        {/* connection lines from Bulawayo hub */}
        <g className="stroke-primary" strokeOpacity="0.2" strokeWidth="0.3" fill="none">
          {coveragePoints.filter((p) => !p.primary).map((p) => {
            const b = project(28.58, -20.15);
            const pt = project(p.lng, p.lat);
            return <line key={p.city} x1={b.x} y1={b.y} x2={pt.x} y2={pt.y} strokeDasharray="0.6 0.6" />;
          })}
        </g>

        {/* city markers */}
        {coveragePoints.map((p) => {
          const { x, y } = project(p.lng, p.lat);
          return (
            <g key={p.city}>
              {p.primary && (
                <circle cx={x} cy={y} r="2.6" className="fill-primary/20">
                  <animate attributeName="r" values="2.6;3.8;2.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={x} cy={y} r={p.primary ? 1.7 : 1} className={p.primary ? "fill-primary" : "fill-primary/60"} />
              <text
                x={x + 2.2}
                y={y + 0.8}
                className="fill-foreground/70"
                style={{ fontSize: "2.1px", fontFamily: "Inter, sans-serif" }}
              >
                {p.city}
              </text>
            </g>
          );
        })}
      </svg>

      {/* activate overlay */}
      <button
        onClick={() => setActive(true)}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/0 transition-colors hover:bg-card/10"
        aria-label="Activate interactive coverage map"
      >
        <span className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md">
          <MousePointerClick className="h-4 w-4" /> Activate Map
        </span>
        <span className="text-[11px] text-muted-foreground">Click to enable zoom, pan & city details</span>
      </button>
    </div>
  );
}