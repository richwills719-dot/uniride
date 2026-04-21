"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import RouteCard from "@/components/RouteCard";
import DriverCard from "@/components/DriverCard";
import { MOCK_ROUTES, MOCK_DRIVERS } from "@/lib/mockData";
import { Route, Driver, Booking } from "@/lib/types";
import { createBooking } from "@/lib/bookingService";
import toast from "react-hot-toast";
import { CheckCircle, ChevronRight, ArrowLeft } from "lucide-react";

type Step = "route" | "driver" | "details" | "confirm" | "success";

export default function BookPage() {
  const [step, setStep] = useState<Step>("route");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ ref: string; id: string } | null>(null);

  const availableDrivers = selectedRoute
    ? MOCK_DRIVERS.filter((d) => d.routeIds.includes(selectedRoute.id))
    : [];

  const steps = [
    { key: "route", label: "Route" },
    { key: "driver", label: "Driver" },
    { key: "details", label: "Your Info" },
    { key: "confirm", label: "Confirm" },
  ];
  const stepIndex = steps.findIndex((s) => s.key === step);

  async function handleConfirm() {
    if (!selectedRoute || !selectedDriver) return;
    setLoading(true);
    try {
      const booking: Omit<Booking, "id" | "bookingRef" | "createdAt"> = {
        studentName,
        studentEmail,
        routeId: selectedRoute.id,
        routeName: selectedRoute.name,
        driverId: selectedDriver.id,
        driverName: selectedDriver.name,
        vehicle: `${selectedDriver.vehicle} · ${selectedDriver.plate}`,
        plate: selectedDriver.plate,
        fare: selectedRoute.fare,
        status: "confirmed",
        pickupPoint: pickupPoint || selectedRoute.from,
        dropoffPoint: selectedRoute.to,
        eta: selectedDriver.eta,
      };
      const id = await createBooking(booking);
      const ref = "#UNI-" + Math.floor(1000 + Math.random() * 9000);
      setBookingResult({ ref, id });
      setStep("success");
      toast.success("Booking confirmed!");
    } catch {
      // Fallback for demo without Firebase configured
      const ref = "#UNI-" + Math.floor(1000 + Math.random() * 9000);
      setBookingResult({ ref, id: "demo-" + Date.now() });
      setStep("success");
      toast.success("Booking confirmed! (demo mode)");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("route");
    setSelectedRoute(null);
    setSelectedDriver(null);
    setStudentName("");
    setStudentEmail("");
    setPickupPoint("");
    setBookingResult(null);
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="font-display" style={{ fontSize: 32, color: "var(--navy)", marginBottom: 6 }}>
            Book a Ride
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            Select your route, choose an available driver, and confirm your booking.
          </p>
        </div>

        {/* Stepper */}
        {step !== "success" && (
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36, background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: "12px 20px" }}>
            {steps.map((s, i) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: i < stepIndex ? "var(--green)" : i === stepIndex ? "var(--navy)" : "var(--cream-dark)",
                    color: i <= stepIndex ? "white" : "var(--text-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {i < stepIndex ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: i === stepIndex ? 600 : 400, color: i === stepIndex ? "var(--text-primary)" : "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: i < stepIndex ? "var(--green)" : "var(--border)", margin: "0 12px" }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step: Route */}
        {step === "route" && (
          <div className="animate-fadeUp">
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
              Select your route
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {MOCK_ROUTES.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  selected={selectedRoute?.id === route.id}
                  onClick={() => setSelectedRoute(route)}
                />
              ))}
            </div>
            <button
              className="btn-primary"
              disabled={!selectedRoute}
              onClick={() => setStep("driver")}
            >
              Continue to Driver Selection <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step: Driver */}
        {step === "driver" && (
          <div className="animate-fadeUp">
            <button
              onClick={() => setStep("route")}
              style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 16, padding: 0 }}
            >
              <ArrowLeft size={14} /> Back to routes
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
              Available drivers
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
              Showing drivers on <strong>{selectedRoute?.name}</strong>
            </p>

            {availableDrivers.length === 0 ? (
              <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>
                No drivers available on this route right now.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {availableDrivers.map((driver) => (
                  <DriverCard
                    key={driver.id}
                    driver={driver}
                    selected={selectedDriver?.id === driver.id}
                    onClick={() => setSelectedDriver(driver)}
                  />
                ))}
              </div>
            )}

            <button
              className="btn-primary"
              disabled={!selectedDriver}
              onClick={() => setStep("details")}
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step: Details */}
        {step === "details" && (
          <div className="animate-fadeUp">
            <button
              onClick={() => setStep("driver")}
              style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 16, padding: 0 }}
            >
              <ArrowLeft size={14} /> Back to drivers
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>
              Your information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>
                  Full name *
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. Chukwuemeka Obi"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>
                  University email *
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="e.g. c.obi@uniport.edu.ng"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>
                  Specific pickup point (optional)
                </label>
                <input
                  className="input-field"
                  placeholder={`Default: ${selectedRoute?.from}`}
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn-primary"
              disabled={!studentName.trim() || !studentEmail.trim()}
              onClick={() => setStep("confirm")}
            >
              Review Booking <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && selectedRoute && selectedDriver && (
          <div className="animate-fadeUp">
            <button
              onClick={() => setStep("details")}
              style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 16, padding: 0 }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Review your booking</h2>

            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Booking Summary</div>
              {[
                ["Student", studentName],
                ["Email", studentEmail],
                ["Route", selectedRoute.name],
                ["Pickup", pickupPoint || selectedRoute.from],
                ["Drop-off", selectedRoute.to],
                ["Driver", selectedDriver.name],
                ["Vehicle", `${selectedDriver.vehicle} · ${selectedDriver.plate}`],
                ["Driver ETA", `${selectedDriver.eta} min away`],
                ["Fare", `₦${selectedRoute.fare}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", textAlign: "right", maxWidth: "60%" }}>{value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>₦{selectedRoute.fare}</span>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", marginBottom: 16 }}>
              By confirming, your driver will be notified immediately.
            </p>

            <button className="btn-primary btn-gold" onClick={handleConfirm} disabled={loading}>
              {loading ? "Confirming..." : "Confirm Booking →"}
            </button>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && bookingResult && selectedRoute && selectedDriver && (
          <div className="animate-fadeUp" style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--green-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckCircle size={36} color="var(--green)" />
            </div>
            <h2 className="font-display" style={{ fontSize: 30, color: "var(--navy)", marginBottom: 8 }}>
              Ride booked!
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
              {selectedDriver.name} is on the way. Estimated arrival: <strong>{selectedDriver.eta} min</strong>.
            </p>

            <div className="card" style={{ padding: 24, textAlign: "left", marginBottom: 24 }}>
              {[
                ["Booking Ref", bookingResult.ref],
                ["Route", selectedRoute.name],
                ["Driver", selectedDriver.name],
                ["Vehicle", `${selectedDriver.vehicle} · ${selectedDriver.plate}`],
                ["Arriving in", `${selectedDriver.eta} minutes`],
                ["Fare", `₦${selectedRoute.fare}`],
                ["Status", "Confirmed"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: label === "Status" ? "var(--green)" : "var(--text-primary)" }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={reset}>
                Book Another Ride
              </button>
              <a href="/my-bookings" style={{ flex: 1 }}>
                <button className="btn-primary" style={{ flex: 1 }}>View My Bookings</button>
              </a>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
