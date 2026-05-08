"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { XrplMarketToken } from "@/components/exchange-os/XrplMarketsTable";

function fmtUsd(n: number) {
  if (!n) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function fmtPrice(n: number) {
  if (!n) return "—";
  if (n >= 1) return `$${n.toFixed(4)}`;
  if (n < 0.000001) return `$${n.toExponential(2)}`;
  return `$${n.toFixed(6)}`;
}

export default function TokenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const issuerParam = searchParams.get("issuer") ?? "";

  const [token, setToken] = useState<XrplMarketToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/exchange-os/api/xrpl/markets?limit=200", { cache: "no-store" });
        const data = await res.json();
        const tokens: XrplMarketToken[] = data.tokens ?? [];
        const ticker = decodeURIComponent(id).toUpperCase();
        const found = tokens.find(
          (t) =>
            t.currency.toUpperCase() === ticker &&
            (!issuerParam || t.issuer === issuerParam)
        ) ?? tokens.find((t) => t.currency.toUpperCase() === ticker);
        if (found) setToken(found);
        else setError("Token not found in live market data.");
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, issuerParam]);

  if (loading) {
    return (
      <div style={{ padding: "2rem 1.5rem" }}>
        <Link href="/exchange-os/tokens" style={{ color: "var(--xos-text-muted)", fontSize: "0.85rem", textDecoration: "none" }}>← All Tokens</Link>
        <div style={{ marginTop: "3rem", textAlign: "center", color: "var(--xos-text-muted)" }}>Loading token data…</div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div style={{ padding: "2rem 1.5rem" }}>
        <Link href="/exchange-os/tokens" style={{ color: "var(--xos-text-muted)", fontSize: "0.85rem", textDecoration: "none" }}>← All Tokens</Link>
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>⚠</div>
          <div style={{ color: "var(--xos-red)" }}>{error ?? "Token not found"}</div>
          <Link href="/exchange-os/tokens" className="xos-btn xos-btn--outline" style={{ marginTop: "1.5rem", display: "inline-flex" }}>← Back to Markets</Link>
        </div>
      </div>
    );
  }

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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {token.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={token.icon}
            alt={token.currency}
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", background: "var(--xos-surface-2)" }}
          />
        )}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <h1 style={{ fontWeight: 900, fontSize: "1.75rem", color: "var(--xos-text)" }}>
              {token.name || token.currency}
            </h1>
            <span style={{ fontSize: "1rem", color: "var(--xos-text-muted)" }}>${token.currency}</span>
            {token.change24h !== 0 && (
              <span style={{ color: isUp ? "var(--xos-green)" : "var(--xos-red)", fontWeight: 700 }}>
                {isUp ? "▲" : "▼"} {Math.abs(token.change24h).toFixed(2)}%
              </span>
            )}
          </div>
          <div style={{ color: "var(--xos-text-muted)", fontSize: "0.85rem", fontFamily: "var(--xos-font-mono)", marginTop: "0.25rem", wordBreak: "break-all" }}>
            {token.issuer}
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--xos-font-mono)", color: "var(--xos-text)" }}>
            {fmtPrice(token.price)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--xos-text-subtle)" }}>Live price · XRPL DEX</div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "24h Volume", value: fmtUsd(token.volume24h) },
          { label: "7d Volume", value: fmtUsd(token.volume7d) },
          { label: "Liquidity", value: fmtUsd(token.liquidity) },
          { label: "Market Cap", value: fmtUsd(token.marketCap) },
          { label: "Holders", value: token.holders ? token.holders.toLocaleString() : "—" },
        ].map(({ label, value }) => (
          <div key={label} className="xos-card">
            <div className="xos-stat">
              <span className="xos-stat-value" style={{ fontSize: "1.1rem" }}>{value}</span>
              <span className="xos-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <Link
          href={`/exchange-os/trade?from=XRP&to=${encodeURIComponent(token.currency)}&issuer=${encodeURIComponent(token.issuer)}`}
          className="xos-btn xos-btn--primary"
        >
          ⟷ Trade {token.currency}
        </Link>
        <Link href="/exchange-os/x402" className="xos-btn xos-btn--cyan">
          ⚡ Get Risk Report
        </Link>
        <a
          href={`https://xrplmeta.org/token/${token.currencyHex}:${token.issuer}`}
          target="_blank"
          rel="noreferrer"
          className="xos-btn xos-btn--outline"
        >
          ↗ View on xrplmeta
        </a>
      </div>

      <div className="xos-risk-box">
        Live data sourced from xrplmeta.org via the XRPL DEX. Not investment advice.
        Always verify issuer addresses independently before trading.
      </div>
    </div>
  );
}
