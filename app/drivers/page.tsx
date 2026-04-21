"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DriverCard from "@/components/DriverCard";
import { MOCK_DRIVERS } from "@/lib/mockData";
import { Users } from "lucide-react";

type Filter = "all" | "available" | "busy" | "offline";

export default function DriversPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = MOCK_DRIVERS.filter((d) =>
    filter === "all" ? true : d.status === filter
  );

  const counts = {
    all: MOCK_DRIVERS.length,
    available: MOCK_DRIVERS.filter((d) => d.status === "available").length,
    busy: MOCK_DRIVERS.filter((d) => d.status === "busy").length,
    offline: MOCK_DRIVERS.filter((d) => d.status === "offline").length,
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All Drivers" },
    { key: "available", label: "Available" },
    { key: "busy", label: "On a Trip" },
    { key: "offline", label: "Offline" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: 32, color: "var(--navy)", marginBottom: 6 }}>
              Campus Drivers
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
              All verified university transport drivers and their current availability.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--green-bg)", border: "1px solid rgba(15,110,86,0.2)", borderRadius: 10, padding: "10px 16px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>{counts.available} available now</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: filter === f.key ? "1.5px solid var(--navy)" : "1px solid var(--border)",
                background: filter === f.key ? "var(--navy)" : "var(--surface)",
                color: filter === f.key ? "white" : "var(--text-secondary)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {f.label}
              <span style={{
                background: filter === f.key ? "rgba(255,255,255,0.2)" : "var(--cream-dark)",
                color: filter === f.key ? "white" : "var(--text-muted)",
                borderRadius: 20,
                padding: "1px 7px",
                fontSize: 11,
                fontWeight: 700,
              }}>
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Driver grid */}
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 48, textAlign: "center" }}>
            <Users size={32} color="var(--text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>No drivers in this category right now.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 12 }}>
            {filtered.map((driver) => (
              <DriverCard key={driver.id} driver={driver} showDetails />
            ))}
          </div>
        )}

        {/* Footnote */}
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 32, textAlign: "center" }}>
          Driver availability updates in real-time. To book a driver, use the{" "}
          <a href="/book" style={{ color: "var(--navy)", fontWeight: 500 }}>Book a Ride</a> page.
        </p>
      </main>
    </>
  );
}
