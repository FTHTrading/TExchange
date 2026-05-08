"use client";

import { brand } from "@/config/exchange-os/brand";
import { features } from "@/config/exchange-os/features";
import Link from "next/link";
import { TroptionsLogo } from "./TroptionsLogo";

export function HeroSection() {
  return (
    <section
      className="xos-hero-bg"
      style={{
        padding: "3.5rem 1.5rem 3rem",
        maxWidth: 960,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* TROPTIONS logo mark */}
      <div style={{ marginBottom: "1.75rem" }}>
        <TroptionsLogo size={80} variant="full" style={{ display: "inline-flex" }} />
      </div>

      {/* Power badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem", marginBottom: "1.625rem", flexWrap: "wrap" }}>
        <span className="xos-badge xos-badge--gold" style={{ fontSize: "0.72rem" }}>
          ◆ TROPTIONS Exchange OS
        </span>
        <span className="xos-badge xos-badge--cyan" style={{ fontSize: "0.72rem" }}>
          ⚡ Powered by XRPL
        </span>
        <span className="xos-badge xos-badge--slate" style={{ fontSize: "0.72rem" }}>
          x402 Protocol
        </span>
      </div>

      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          color: "var(--xos-text)",
          marginBottom: "1.125rem",
          letterSpacing: "-0.02em",
        }}
      >
        {brand.tagline}
      </h1>

      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--xos-text-muted)",
          maxWidth: 600,
          margin: "0 auto 2.75rem",
          lineHeight: 1.7,
        }}
      >
        {brand.description}
      </p>

      {/* CTA row */}
      <div
        style={{
          display: "flex",
          gap: "0.875rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}
      >
        <Link href="/exchange-os/launch" className="xos-btn xos-btn--primary xos-btn--lg">
          ◆ Launch a Token
        </Link>
        <Link href="/exchange-os/trade" className="xos-btn xos-btn--cyan xos-btn--lg">
          ⟷ Trade Now
        </Link>
        <Link href="/exchange-os/earn" className="xos-btn xos-btn--outline xos-btn--lg">
          ◎ Earn Rewards
        </Link>
      </div>

      {/* Proof pillars */}
      <div className="xos-stat-strip" style={{ maxWidth: 700, margin: "0 auto" }}>
        {[
          { icon: "⟐", label: "XRPL Settlement", desc: "Real blockchain, not a database", color: "var(--xos-cyan)" },
          { icon: "⚡", label: "x402 Payments",   desc: "Pay-per-use AI reports",         color: "var(--xos-gold)" },
          { icon: "◆",  label: "Proof Packets",   desc: "Verify every launch on-chain",   color: "var(--xos-green)" },
          { icon: "◎",  label: "Creator Rewards", desc: "Earn from your token volume",    color: "var(--xos-gold-light)" },
        ].map(({ icon, label, desc, color }) => (
          <div key={label} className="xos-stat-strip-cell" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.1rem", color, marginBottom: "0.25rem" }}>{icon}</div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {label}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--xos-text-muted)", marginTop: "0.2rem", lineHeight: 1.4 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      {features.demoMode && (
        <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--xos-text-subtle)" }}>
          Demo mode active — all prices and volumes are simulated
        </p>
      )}
    </section>
  );
}