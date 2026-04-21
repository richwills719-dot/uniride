"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Booking } from "@/lib/types";
import { getBookingsByEmail, cancelBooking } from "@/lib/bookingService";
import { ClipboardList, Search } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "demo-1",
    bookingRef: "#UNI-7842",
    studentName: "Demo Student",
    studentEmail: "demo@uniport.edu.ng",
    routeId: "route-001",
    routeName: "Engineering → Main Gate",
    driverId: "drv-001",
    driverName: "Emeka Okafor",
    vehicle: "Toyota Hiace · KJA-234AY",
    plate: "KJA-234AY",
    fare: 200,
    status: "completed",
    pickupPoint: "Faculty of Engineering",
    dropoffPoint: "Main Gate",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    eta: 2,
  },
  {
    id: "demo-2",
    bookingRef: "#UNI-3312",
    studentName: "Demo Student",
    studentEmail: "demo@uniport.edu.ng",
    routeId: "route-002",
    routeName: "Engineering → Hostels",
    driverId: "drv-003",
    driverName: "Tunde Adeyemi",
    vehicle: "Ford Transit · OG-412CE",
    plate: "OG-412CE",
    fare: 150,
    status: "confirmed",
    pickupPoint: "Faculty of Engineering",
    dropoffPoint: "Student Hostels",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    eta: 3,
  },
];

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const results = await getBookingsByEmail(email.trim());
      // If Firebase not configured, show demo data for demo email
      if (results.length === 0 && email.includes("demo")) {
        setBookings(DEMO_BOOKINGS);
      } else {
        setBookings(results);
      }
    } catch {
      // Firebase not configured — show demo data
      if (email.includes("demo") || email.includes("test")) {
        setBookings(DEMO_BOOKINGS);
        toast.success("Showing demo bookings");
      } else {
        setBookings([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(bookingId: string) {
    try {
      await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled.");
    } catch {
      // Demo mode
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled. (demo mode)");
    }
  }

  const statusColors: Record<string, string> = {
    confirmed: "var(--green)",
    pending: "#185FA5",
    completed: "#5F5E5A",
    cancelled: "#A32D2D",
  };

  function formatDate(d: Date | string) {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ marginBottom: 36 }}>
          <h1 className="font-display" style={{ fontSize: 32, color: "var(--navy)", marginBottom: 6 }}>
            My Bookings
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            Enter your university email to view and manage your bookings.
          </p>
        </div>

        {/* Search */}
        <div className="card" style={{ padding: 20, marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              className="input-field"
              placeholder="Enter your university email (try: demo@uniport.edu.ng)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ flex: 1 }}
            />
            <button
              className="btn-primary"
              style={{ width: "auto", padding: "11px 20px", flexShrink: 0 }}
              onClick={handleSearch}
              disabled={loading || !email.trim()}
            >
              <Search size={15} />
              {loading ? "..." : "Search"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
            Tip: use <strong>demo@uniport.edu.ng</strong> to see example bookings
          </p>
        </div>

        {/* Results */}
        {!searched && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
            <ClipboardList size={36} style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }} />
            <p style={{ fontSize: 15 }}>Search by email to see your bookings</p>
          </div>
        )}

        {searched && bookings.length === 0 && !loading && (
          <div className="card" style={{ padding: 48, textAlign: "center" }}>
            <ClipboardList size={32} color="var(--text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 16 }}>No bookings found for this email.</p>
            <Link href="/book">
              <button className="btn-primary" style={{ width: "auto", padding: "11px 24px" }}>
                Book Your First Ride →
              </button>
            </Link>
          </div>
        )}

        {bookings.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              Found <strong>{bookings.length}</strong> booking{bookings.length !== 1 ? "s" : ""}
            </p>
            {bookings.map((b) => (
              <div key={b.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 2 }}>{b.bookingRef}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{formatDate(b.createdAt)}</div>
                  </div>
                  <span className={`badge badge-${b.status}`} style={{ textTransform: "capitalize" }}>
                    {b.status}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 14 }}>
                  {[
                    ["Route", b.routeName],
                    ["Driver", b.driverName],
                    ["Vehicle", b.vehicle],
                    ["Pickup", b.pickupPoint],
                    ["Drop-off", b.dropoffPoint],
                    ["Fare", `₦${b.fare}`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{value}</div>
                    </div>
                  ))}
                </div>

                {b.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(b.id!)}
                    style={{
                      background: "var(--red-bg, #FFF0F0)",
                      color: "var(--red, #C53030)",
                      border: "1px solid rgba(197,48,48,0.2)",
                      borderRadius: 8,
                      padding: "7px 16px",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
