import { SwapPanel } from "@/components/exchange-os/SwapPanel";
import Link from "next/link";

export const metadata = { title: "Trade — TROPTIONS Exchange OS" };

export default function TradePage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div className="xos-section-header">
        <div className="xos-gold-line" />
        <h1 className="xos-section-title">Trade on XRPL</h1>
        <p className="xos-section-subtitle">
          Swap TROPTIONS and XRPL assets. Quotes are read-only — your wallet signs every transaction.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0, 420px)", gap: "1.5rem", alignItems: "start" }}>
        {/* Swap panel */}
        <SwapPanel defaultFrom="XRP" defaultTo="TROPTIONS" />

        {/* Info sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="xos-card">
            <h3 style={{ fontWeight: 700, color: "var(--xos-text)", marginBottom: "0.625rem", fontSize: "0.95rem" }}>
              How XRPL Swaps Work
            </h3>
            <ul
              style={{
                color: "var(--xos-text-muted)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              <li>Get a live quote from the XRPL pathfinder</li>
              <li>Enter your wallet address to prepare the transaction</li>
              <li>We return an unsigned transaction blob</li>
              <li>Sign it with Xumm, XRPL Toolkit, or your wallet</li>
              <li>Submit to the XRPL network directly</li>
            </ul>
          </div>

          <div className="xos-card">
            <h3 style={{ fontWeight: 700, color: "var(--xos-text)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
              Trustlines
            </h3>
            <p style={{ color: "var(--xos-text-muted)", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: "var(--xos-gold)" }}>What is a trustline?</strong>{" "}
              Permission for your wallet to hold this token. You must create a trustline before receiving TROPTIONS or other XRPL IOUs.
            </p>
            <Link
              href="/exchange-os/wallet"
              className="xos-btn xos-btn--outline xos-btn--sm"
              style={{ marginTop: "0.75rem" }}
            >
              Check Trustlines →
            </Link>
          </div>

          <div className="xos-risk-box">
            Trading XRPL assets carries significant financial risk. Asset prices can move rapidly.
            Past performance does not guarantee future results. Nothing here is financial advice.
          </div>
        </div>
      </div>
    </div>
  );
}
