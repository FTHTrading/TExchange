"use client";

import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Overview",    href: "/troptions" },
  { label: "Technology",  href: "/troptions/layer1" },
  { label: "Proof",       href: "/troptions/verification" },
  { label: "Stablecoins", href: "/troptions/stablecoins" },
  { label: "History",     href: "/troptions/history" },
  { label: "Contact",     href: "/troptions/contact" },
] as const;

export default function TroptionsSubNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#071426",
        borderBottom: "1px solid rgba(201,162,74,0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo + wordmark */}
        <Link
          href="/troptions"
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}
        >
          <Image
            src="/assets/troptions/logos/troptions-primary-official.jpg"
            alt="TROPTIONS"
            width={30}
            height={30}
            style={{ objectFit: "contain", borderRadius: 4 }}
          />
          <span
            style={{
              fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              color: "#e8c066",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            TROPTIONS
          </span>
        </Link>

        {/* Center nav links — hidden on small screens */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="troptions-subnav-links"
        >
          {NAV_LINKS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{
                color: "#a0b4cc",
                fontSize: "0.82rem",
                textDecoration: "none",
                fontWeight: 500,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                transition: "color 150ms",
              }}
              onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#e8c066")}
              onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#a0b4cc")}
            >
              {n.label}
            </Link>
          ))}
        </div>

        {/* Right: Exchange OS CTA */}
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexShrink: 0 }}>
          <Link
            href="/exchange-os"
            style={{
              background: "rgba(201,162,74,0.15)",
              border: "1px solid rgba(201,162,74,0.5)",
              color: "#e8c066",
              borderRadius: "0.45rem",
              padding: "0.38rem 0.9rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            ⟷ Exchange OS
          </Link>
          <Link
            href="/portal/troptions/dashboard"
            style={{
              background: "#1B3259",
              color: "#ffffff",
              borderRadius: "0.4rem",
              padding: "0.38rem 0.85rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              border: "1px solid #243d60",
            }}
          >
            Portal
          </Link>
        </div>
      </div>

      {/* Responsive: hide center links on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .troptions-subnav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
