import { SwapPanel } from "@/components/exchange-os/SwapPanel";
import { LiveOrderBook } from "@/components/exchange-os/LiveOrderBook";
import Link from "next/link";

export const metadata = { title: "Trade — TROPTIONS Exchange OS" };

export default function TradePage() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="xos-gold-line" />
        <h1 className="xos-section-title">Trade on XRPL</h1>
        <p className="xos-section-subtitle">
          Live order book and real pathfinder quotes direct from XRPL mainnet.
          Quotes are read-only — your wallet signs every transaction.
        </p>
      </div>

      {/* Main grid: swap + order book + sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 440px) 1fr minmax(0, 260px)",
          gap: "1.25rem",
          alignItems: "start",
        }}
      >
        {/* Swap panel */}
        <div>
          <SwapPanel defaultFrom="XRP" defaultTo="TROPTIONS" />
        </div>

        {/* Live order book */}
        <LiveOrderBook
          base="XRP"
          quote="TROPTIONS"
          depth={14}
        />

        {/* Info sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="xos-card">
            <h3 style={{ fontWeight: 700, color: "var(--xos-text)", marginBottom: "0.625rem", fontSize: "0.9rem" }}>
              How XRPL Swaps Work
            </h3>
            <ul
              style={{
                color: "var(--xos-text-muted)",
                fontSize: "0.78rem",
                lineHeight: 1.7,
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              <li>Live quote from XRPL mainnet pathfinder</li>
              <li>Enter your wallet address to prepare tx</li>
              <li>We return an unsigned transaction blob</li>
              <li>Sign with Xumm, XRPL Toolkit, or any wallet</li>
              <li>Submit to XRPL network directly</li>
            </ul>
          </div>

          <div className="xos-card">
            <h3 style={{ fontWeight: 700, color: "var(--xos-text)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Other Pairs
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                ["XRP", "TROPTIONS"],
                ["XRP", "USD"],
                ["XRP", "EUR"],
                ["XRP", "BTC"],
              ].map(([b, q]) => (
                <Link
                  key={`${b}/${q}`}
                  href={`/exchange-os/trade?from=${b}&to=${q}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.3rem 0.5rem",
                    borderRadius: "var(--xos-radius)",
                    background: "var(--xos-surface-1)",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    color: "var(--xos-text)",
                  }}
                >
                  <span>{b}/{q}</span>
                  <span style={{ color: "var(--xos-cyan)" }}>Trade →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="xos-card">
            <h3 style={{ fontWeight: 700, color: "var(--xos-text)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Trustlines
            </h3>
            <p style={{ color: "var(--xos-text-muted)", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
              You must create a trustline before receiving TROPTIONS or other XRPL IOUs.
            </p>
            <Link href="/exchange-os/wallet" className="xos-btn xos-btn--outline xos-btn--sm" style={{ marginTop: "0.75rem" }}>
              Check Trustlines →
            </Link>
          </div>

          <div className="xos-risk-box" style={{ fontSize: "0.72rem" }}>
            Trading XRPL assets carries significant financial risk. Nothing here is financial advice.
          </div>
        </div>
      </div>
    </div>
  );
}
