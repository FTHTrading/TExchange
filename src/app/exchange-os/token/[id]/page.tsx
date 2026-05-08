import { DEMO_TOKENS } from "@/config/exchange-os/demoData";
import { RiskBadgeGroup } from "@/components/exchange-os/RiskBadge";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return DEMO_TOKENS.map((t) => ({ id: t.ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = DEMO_TOKENS.find((t) => t.ticker === id);
  return {
    title: token ? `${token.ticker} — TROPTIONS Exchange OS` : "Token — TROPTIONS Exchange OS",
  };
}

export default async function TokenDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = DEMO_TOKENS.find((t) => t.ticker === id);
  if (!token) notFound();

  const isUp = token.change24h >= 0;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Back */}
      <Link
        href="/exchange-os/tokens"
        style={{ color: "var(--xos-text-muted)", fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem" }}
      >
        ← All Tokens
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        {token.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={token.logoUrl}
            alt={token.ticker}
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "contain", background: "var(--xos-surface-2)" }}
          />
        )}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h1 style={{ fontWeight: 900, fontSize: "1.75rem", color: "var(--xos-text)" }}>
              {token.ticker}
            </h1>
            <span className={isUp ? "xos-stat-change--up" : "xos-stat-change--down"}>
              {isUp ? "▲" : "▼"} {Math.abs(token.change24h).toFixed(2)}%
            </span>
          </div>
          <div style={{ color: "var(--xos-text-muted)", fontSize: "0.9rem" }}>{token.name}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              fontFamily: "var(--xos-font-mono)",
              color: "var(--xos-text)",
            }}
          >
            ${token.price.toFixed(4)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--xos-text-subtle)" }}>Demo price</div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "24h Volume", value: `$${(token.volume24h / 1000).toFixed(1)}K` },
          { label: "Market Cap", value: `$${(token.marketCap / 1000000).toFixed(2)}M` },
          { label: "Holders", value: token.holders.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="xos-card">
            <div className="xos-stat">
              <span className="xos-stat-value" style={{ fontSize: "1.25rem" }}>{value}</span>
              <span className="xos-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Issuer + risk */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div className="xos-card">
          <div className="xos-label" style={{ marginBottom: "0.5rem" }}>Issuer Address</div>
          <div
            style={{
              fontFamily: "var(--xos-font-mono)",
              fontSize: "0.8rem",
              color: "var(--xos-cyan)",
              wordBreak: "break-all",
            }}
          >
            {token.issuer}
          </div>
        </div>
        <div className="xos-card">
          <div className="xos-label" style={{ marginBottom: "0.5rem" }}>Risk Labels</div>
          <RiskBadgeGroup labelIds={token.riskLabels} showDescription />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
        <Link href={`/exchange-os/trade?from=XRP&to=${token.ticker}`} className="xos-btn xos-btn--primary">
          ⟷ Trade {token.ticker}
        </Link>
        <Link href="/exchange-os/x402" className="xos-btn xos-btn--cyan">
          ⚡ Get Risk Report
        </Link>
      </div>

      <div className="xos-risk-box" style={{ marginTop: "1.5rem" }}>
        Token data shown is demo data. Risk labels are informational — not investment advice.
        Verify all issuer addresses independently before trading.
      </div>
    </div>
  );
}
