"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_ROUTES } from "@/lib/mockData";
import { Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function SchedulePage() {
  const [expanded, setExpanded] = useState<string | null>(MOCK_ROUTES[0].id);

  const typeLabel: Record<string, string> = {
    express: "Express",
    regular: "Regular",
    evening: "Evening",
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ marginBottom: 36 }}>
          <h1 className="font-display" style={{ fontSize: 32, color: "var(--navy)", marginBottom: 6 }}>
            Route Schedules
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            Daily timetables for all campus transport routes.
          </p>
        </div>

        {/* Info banner */}
        <div style={{ background: "var(--navy)", borderRadius: "var(--radius)", padding: "16px 20px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>All routes depart from Faculty of Engineering</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Pickup at the Engineering Complex forecourt</div>
          </div>
          <Link href="/book">
            <button className="btn-primary btn-gold" style={{ width: "auto", padding: "9px 20px", fontSize: 13 }}>
              Book Now →
            </button>
          </Link>
        </div>

        {/* Route accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MOCK_ROUTES.map((route) => {
            const isOpen = expanded === route.id;
            return (
              <div key={route.id} className="card" style={{ overflow: "hidden" }}>
                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : route.id)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin size={16} color="var(--gold)" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 3 }}>
                        {route.name}
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span className={`badge badge-${route.type}`}>{typeLabel[route.type]}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 3 }}>
                          <Clock size={11} /> ~{route.duration} min
                        </span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>₦{route.fare}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{route.schedule.length} departures/day</span>
                      </div>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
                    {/* Stops */}
                    <div style={{ marginTop: 16, marginBottom: 20 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                        Route stops
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {route.stops.map((stop, i) => (
                          <div key={stop} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
                              <div style={{
                                width: 14, height: 14, borderRadius: "50%",
                                background: i === 0 ? "var(--navy)" : i === route.stops.length - 1 ? "#E24B4A" : "var(--cream-dark)",
                                border: i === 0 || i === route.stops.length - 1 ? "none" : "2px solid var(--border)",
                                marginTop: 4,
                                flexShrink: 0,
                              }} />
                              {i < route.stops.length - 1 && (
                                <div style={{ width: 2, height: 24, background: "var(--border)", margin: "2px 0" }} />
                              )}
                            </div>
                            <div style={{ paddingBottom: i < route.stops.length - 1 ? 0 : 0 }}>
                              <span style={{
                                fontSize: 14,
                                fontWeight: i === 0 || i === route.stops.length - 1 ? 600 : 400,
                                color: i === 0 || i === route.stops.length - 1 ? "var(--text-primary)" : "var(--text-secondary)",
                              }}>
                                {stop}
                              </span>
                              {i === 0 && <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>Origin</span>}
                              {i === route.stops.length - 1 && <span style={{ fontSize: 11, color: "#E24B4A", marginLeft: 6 }}>Destination</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule grid */}
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                        Departure times
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {route.schedule.map((time) => {
                          const now = new Date();
                          const [h, rest] = time.split(":");
                          const [min, period] = rest.split(" ");
                          let hour = parseInt(h);
                          if (period === "PM" && hour !== 12) hour += 12;
                          if (period === "AM" && hour === 12) hour = 0;
                          const isPast = now.getHours() > hour || (now.getHours() === hour && now.getMinutes() > parseInt(min));
                          return (
                            <div key={time} style={{
                              padding: "6px 14px",
                              borderRadius: 8,
                              background: isPast ? "var(--cream-dark)" : "var(--navy)",
                              color: isPast ? "var(--text-muted)" : "white",
                              fontSize: 13,
                              fontWeight: 500,
                              textDecoration: isPast ? "line-through" : "none",
                              opacity: isPast ? 0.6 : 1,
                            }}>
                              {time}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Link href="/book" style={{ display: "block", marginTop: 20 }}>
                      <button className="btn-primary" style={{ fontSize: 14 }}>
                        Book this route →
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
