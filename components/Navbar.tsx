"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/book", label: "Book a Ride" },
    { href: "/drivers", label: "Drivers" },
    { href: "/schedule", label: "Schedule" },
    { href: "/my-bookings", label: "My Bookings" },
  ];

  return (
    <nav
      style={{
        background: "var(--navy)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "var(--gold)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Serif Display', serif",
              fontSize: 16,
              color: "var(--navy)",
              fontWeight: 700,
            }}
          >
            U
          </div>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20,
              color: "white",
              letterSpacing: "-0.01em",
            }}
          >
            UniRide
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-tab ${path === l.href ? "active" : ""}`}
              style={{ color: path === l.href ? "white" : "rgba(255,255,255,0.65)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
