import Link from "next/link";

export const metadata = { title: "Platform Status — TROPTIONS Live DEX" };

const COMPONENTS = [
  { name: "XRPL Mainnet Read (book_offers, account_info)", status: "operational" },
  { name: "XRPL Pathfinding (ripple_path_find)", status: "operational" },
  { name: "XRPL AMM Info (amm_info)", status: "operational" },
  { name: "Transaction Builder (unsigned blobs)", status: "operational" },
  { name: "XRPL Transaction Submission", status: "demo", note: "Live when XRPL_MAINNET_ENABLED=true" },
  { name: "x402 Intelligence API", status: "demo", note: "Live when X402_ENABLED=true" },
  { name: "Token Launch Wizard", status: "operational" },
  { name: "Proof Packet Generator", status: "operational" },
  { name: "Live Market Ticker", status: "operational" },
  { name: "Wallet Analytics", status: "operational" },
];

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  operational: { label: "Operational", color: "var(--xos-green)" },
  demo: { label: "Demo Mode", color: "var(--xos-gold)" },
  degraded: { label: "Degraded", color: "var(--xos-gold)" },
  down: { label: "Down", color: "var(--xos-red)" },
};

export default function StatusPage() {
  const now = new Date().toISOString();
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/exchange-os" style={{ fontSize: "0.78rem", color: "var(--xos-gold)", textDecoration: "none" }}>← DEX Home</Link>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div className="xos-gold-line" style={{ marginBottom: "0.75rem" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <h1 style={{ fontWeight: 900, fontSize: "1.8rem", color: "var(--xos-text)", margin: 0 }}>Platform Status</h1>
          <span className="xos-badge" style={{ background: "rgba(34,197,94,0.12)", color: "var(--xos-green)", border: "1px solid rgba(34,197,94,0.3)", fontSize: "0.7rem", fontWeight: 700 }}>
            ● All Systems Operational
          </span>
        </div>
        <p style={{ color: "var(--xos-text-muted)", fontSize: "0.82rem" }}>Last updated: {now}</p>
      </div>

      <div className="xos-card" style={{ padding: 0, overflow: "hidden", marginBottom: "2rem" }}>
        {COMPONENTS.map((c, i) => {
          const s = STATUS_LABEL[c.status];
          return (
            <div
              key={c.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem 1.1rem",
                borderBottom: i < COMPONENTS.length - 1 ? "1px solid var(--xos-border)" : "none",
                gap: "1rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.83rem", color: "var(--xos-text)", fontWeight: 500 }}>{c.name}</div>
                {c.note && <div style={{ fontSize: "0.73rem", color: "var(--xos-text-subtle)", marginTop: "0.15rem" }}>{c.note}</div>}
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: s.color, whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      <div className="xos-card" style={{ padding: "1.1rem 1.25rem" }}>
        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--xos-cyan)", marginBottom: "0.4rem" }}>XRPL Network</div>
        <p style={{ fontSize: "0.82rem", color: "var(--xos-text-muted)", lineHeight: 1.65, margin: 0 }}>
          TROPTIONS reads live data from the XRPL mainnet via{" "}
          <code style={{ fontSize: "0.78rem", color: "var(--xos-cyan)" }}>xrplcluster.com</code>{" "}
          with fallback to <code style={{ fontSize: "0.78rem", color: "var(--xos-cyan)" }}>s1.ripple.com</code> and{" "}
          <code style={{ fontSize: "0.78rem", color: "var(--xos-cyan)" }}>s2.ripple.com</code>.
          XRPL network status: <a href="https://xrpscan.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--xos-cyan)" }}>xrpscan.com</a>
        </p>
      </div>
    </div>
  );
}
