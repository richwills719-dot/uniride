"use client";
import { Driver } from "@/lib/types";
import { Star, Clock, Phone } from "lucide-react";

interface Props {
  driver: Driver;
  selected?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

export default function DriverCard({ driver, selected, onClick, showDetails }: Props) {
  const isAvailable = driver.status === "available";
  const isBusy = driver.status === "busy";

  return (
    <div
      className={`card card-hover ${selected ? "card-selected" : ""} ${!isAvailable && onClick ? "opacity-60" : ""}`}
      style={{
        padding: "16px",
        cursor: onClick && isAvailable ? "pointer" : onClick ? "not-allowed" : "default",
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "relative",
      }}
      onClick={isAvailable && onClick ? onClick : undefined}
    >
      {/* Avatar */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: driver.avatarColor + "22",
          border: `2px solid ${driver.avatarColor}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 16,
          color: driver.avatarColor,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {driver.initials}
        {isAvailable && (
          <span
            style={{
              position: "absolute",
              bottom: 1,
              right: 1,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#1D9E75",
              border: "2px solid white",
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
            {driver.name}
          </span>
          <span className={`badge badge-${driver.status}`}>
            {driver.status === "available" ? "Available" : driver.status === "busy" ? "On a trip" : "Offline"}
          </span>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          {driver.vehicle} · {driver.plate}
        </div>
        {showDetails && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <Phone size={11} /> {driver.phone}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{driver.trips} trips</span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginBottom: 4 }}>
          <Star size={13} fill="#E8A020" color="#E8A020" />
          <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
            {driver.rating.toFixed(1)}
          </span>
        </div>
        {isAvailable ? (
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--green)" }}>
            <Clock size={11} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>{driver.eta} min away</span>
          </div>
        ) : isBusy ? (
          <span style={{ fontSize: 11, color: "#854F0B" }}>~{driver.eta} min</span>
        ) : null}
      </div>

      {selected && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "var(--navy)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          ✓
        </div>
      )}
    </div>
  );
}
