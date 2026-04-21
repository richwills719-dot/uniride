import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MapPin, Users, Calendar, CheckCircle } from "lucide-react";

export default function HomePage() {
  const stats = [
    { label: "Active Drivers", value: "6", icon: Users },
    { label: "Campus Routes", value: "4", icon: MapPin },
    { label: "Rides Today", value: "48", icon: CheckCircle },
    { label: "Avg Wait Time", value: "4 min", icon: Calendar },
  ];

  const features = [
    {
      icon: MapPin,
      title: "4 Campus Routes",
      desc: "Express and regular routes covering all major campus points — Engineering, Main Gate, Hostels, Senate Building, and Sports Complex.",
    },
    {
      icon: Users,
      title: "Verified Drivers",
      desc: "All drivers are university-vetted with rated profiles, live availability status, and real-time ETA.",
    },
    {
      icon: CheckCircle,
      title: "Instant Booking",
      desc: "Select your route, pick a driver, confirm — your booking is created in seconds with a unique reference number.",
    },
    {
      icon: Calendar,
      title: "Fixed Schedules",
      desc: "View the full daily timetable for every route. Morning, afternoon, and evening shuttles available.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "var(--navy)",
            padding: "72px 24px 80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(232,160,32,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
              <span style={{ color: "var(--gold)", fontSize: 13, fontWeight: 500 }}>Campus transport, simplified</span>
            </div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 56px)", color: "white", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em" }}>
              Your ride across campus,<br />
              <em style={{ color: "var(--gold)" }}>on demand.</em>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Book a campus transport in seconds. View live driver availability, choose your route, and get moving.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book">
                <button className="btn-primary btn-gold" style={{ width: "auto", padding: "13px 32px" }}>
                  Book a Ride →
                </button>
              </Link>
              <Link href="/drivers">
                <button className="btn-outline" style={{ padding: "13px 32px", color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.2)" }}>
                  View Drivers
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ padding: "24px 16px", textAlign: "center", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <Icon size={18} color="var(--gold)" style={{ margin: "0 auto 8px", display: "block" }} />
                  <div style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)", marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
          <h2 className="font-display" style={{ fontSize: 32, textAlign: "center", marginBottom: 8, color: "var(--navy)" }}>
            Everything you need to get around
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 48, fontSize: 15 }}>
            Built for students, managed by the university transport office.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card" style={{ padding: "24px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={18} color="var(--gold)" />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--navy)", padding: "56px 24px", textAlign: "center" }}>
          <h2 className="font-display" style={{ color: "white", fontSize: 30, marginBottom: 12 }}>Ready to book your ride?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>Takes less than 60 seconds.</p>
          <Link href="/book">
            <button className="btn-primary btn-gold" style={{ width: "auto", padding: "13px 40px" }}>Get Started →</button>
          </Link>
        </section>

        <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "20px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2024 UniRide · Campus Transport Booking System</p>
        </footer>
      </main>
    </>
  );
}
