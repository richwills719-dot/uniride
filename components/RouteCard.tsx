"use client";
import { Route } from "@/lib/types";
import { MapPin, Clock, Banknote } from "lucide-react";

interface Props {
  route: Route;
  selected?: boolean;
  onClick?: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  express: "Express",
  regular: "Regular",
  evening: "Evening",
};

export default function RouteCard({ route, selected, onClick }: Props) {
  return (
    <div
      className={`card card-hover ${selected ? "card-selected" : ""}`}
      style={{ padding: "18px", cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 4 }}>
            {route.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {route.stops.length} stops
            </span>
          </div>
        </div>
        <span className={`badge badge-${route.type}`}>{TYPE_LABELS[route.type]}</span>
      </div>

      {/* Stops preview */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {route.stops.map((stop, i) => (
          <span key={stop} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: i === 0 || i === route.stops.length - 1 ? "var(--text-primary)" : "var(--text-muted)", fontWeight: i === 0 || i === route.stops.length - 1 ? 500 : 400 }}>
              {stop}
            </span>
            {i < route.stops.length - 1 && (
              <span style={{ color: "var(--text-muted)", fontSize: 10 }}>→</span>
            )}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Clock size={13} color="var(--text-muted)" />
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>~{route.duration} min</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Banknote size={13} color="var(--text-muted)" />
          <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>₦{route.fare}</span>
        </div>
      </div>
    </div>
  );
}
