import { HeroSection } from "@/components/exchange-os/HeroSection";
import { FeatureCard } from "@/components/exchange-os/FeatureCard";
import { TokenCard } from "@/components/exchange-os/TokenCard";
import { DEMO_TOKENS, DEMO_ADMIN_METRICS } from "@/config/exchange-os/demoData";
import Link from "next/link";

export default function ExchangeOSHomePage() {
  return (
    <div style={{ padding: "0 0 4rem" }}>
      {/* Hero */}
      <HeroSection />

      {/* Stats bar */}
      <div
        style={{
          borderTop: "1px solid var(--xos-border)",
          borderBottom: "1px solid var(--xos-border)",
          background: "var(--xos-surface)",
          padding: "1rem 1.5rem",
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Platform Volume", value: `$${(DEMO_ADMIN_METRICS.totalVolumeUsd / 1000).toFixed(0)}K` },
          { label: "Active Tokens", value: DEMO_ADMIN_METRICS.activeTokens.toString() },
          { label: "Creators Onboarded", value: DEMO_ADMIN_METRICS.totalCreators.toString() },
          { label: "Proof Packets", value: DEMO_ADMIN_METRICS.proofPacketsGenerated.toString() },
          { label: "x402 API Calls", value: `${(DEMO_ADMIN_METRICS.x402ApiCalls / 1000).toFixed(1)}K` },
        ].map(({ label, value }) => (
          <div key={label} className="xos-stat" style={{ minWidth: 100 }}>
            <span className="xos-stat-value" style={{ fontSize: "1.2rem" }}>{value}</span>
            <span className="xos-stat-label">{label}</span>
          </div>
        ))}
        <span
          style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--xos-text-subtle)", alignSelf: "center" }}
        >
          Demo data
        </span>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
        {/* Feature grid */}
        <div style={{ marginBottom: "3rem" }}>
          <div className="xos-section-header">
            <div className="xos-gold-line" />
            <h2 className="xos-section-title">Everything in One OS</h2>
            <p className="xos-section-subtitle">
              TROPTIONS Exchange OS unifies XRPL trading, token launches, creator rewards, and AI commerce.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            <FeatureCard
              icon="⟷"
              title="Trade on XRPL"
              description="Swap TROPTIONS, LEGACY, SOVBND, XRP and other XRPL assets with live AMM quotes and unsigned transaction blobs."
              accent="cyan"
              href="/exchange-os/trade"
              badge="Live"
              beginnerTip="Your wallet signs every trade — we never hold your keys."
            />
            <FeatureCard
              icon="◆"
              title="Launch a Token"
              description="6-step guided wizard: name, issuer verify, AMM liquidity, x402 reports, reward routing, proof packet."
              accent="gold"
              href="/exchange-os/launch"
              badge="New"
              beginnerTip="Think of this like listing your asset on a real exchange — with proof."
            />
            <FeatureCard
              icon="◎"
              title="Earn Rewards"
              description="Creator, referral, sponsor, and liquidity reward routing built into every eligible trade."
              accent="gold"
              href="/exchange-os/earn"
              beginnerTip="Estimated rewards — not guaranteed income. Subject to real usage."
            />
            <FeatureCard
              icon="⚡"
              title="x402 Reports"
              description="Pay-per-use AI token analysis, risk reports, launch readiness checks, and premium market data."
              accent="cyan"
              href="/exchange-os/x402"
              beginnerTip="x402: pay-per-use access. No subscription needed — pay only for what you use."
            />
            <FeatureCard
              icon="✓"
              title="Proof Packets"
              description="On-chain verifiable documents that prove your token was launched correctly, transparently."
              accent="green"
              href="/exchange-os/tokens"
              beginnerTip="A proof packet is like a birth certificate for your token — on XRPL."
            />
            <FeatureCard
              icon="📣"
              title="Sponsor Campaigns"
              description="Local businesses and event operators can fund reward pools and drive engagement with TROPTIONS."
              accent="gold"
              href="/exchange-os/sponsor"
            />
          </div>
        </div>

        {/* Market preview */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <div className="xos-gold-line" />
              <h2 className="xos-section-title">Live Market Preview</h2>
            </div>
            <Link href="/exchange-os/tokens" className="xos-btn xos-btn--outline xos-btn--sm">
              View All Tokens →
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {DEMO_TOKENS.map((token) => (
              <TokenCard key={token.ticker} token={token} />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--xos-surface) 60%, var(--xos-gold-glow))",
            border: "1px solid var(--xos-gold-muted)",
            borderRadius: "var(--xos-radius-xl)",
            padding: "2.5rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--xos-text)", marginBottom: "0.375rem" }}>
              Ready to launch your asset?
            </h3>
            <p style={{ color: "var(--xos-text-muted)", fontSize: "0.9rem" }}>
              Get your token listed, verified, and earning — in one session.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link href="/exchange-os/launch" className="xos-btn xos-btn--primary xos-btn--lg">
              ◆ Start Launch Wizard
            </Link>
            <Link href="/exchange-os/signup" className="xos-btn xos-btn--outline xos-btn--lg">
              Get Partner Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
