import Image from "next/image";
import Link from "next/link";
import { STABLECOIN_ISSUER_REGISTRY, type StablecoinIssuerRecord } from "@/content/troptions/stablecoinIssuerRegistry";
import { XRPL_IOU_REGISTRY, type XrplIouRecord } from "@/content/troptions/xrplIouRegistry";

export const metadata = {
  title: "Stablecoin Rail Intelligence | TROPTIONS",
  description:
    "TROPTIONS institutional-grade stablecoin and IOU reference: USDC, USDT, PAXG, PYUSD, USDP and all XRPL gateway IOUs with asset classes, transfer fees, chain support, and risk controls.",
};

// ── Asset class badge styling ────────────────────────────────────────────────
const ASSET_CLASS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  "Stablecoin":        { bg: "#052e16", color: "#4ade80", border: "#166534" },
  "Commodity":         { bg: "#1c1003", color: "#fbbf24", border: "#92400e" },
  "Platform Token":    { bg: "#1e0a4e", color: "#a78bfa", border: "#4c1d95" },
  "Custom Token":      { bg: "#1c0a00", color: "#fb923c", border: "#7c2d12" },
  "RWA Receipt":       { bg: "#001c22", color: "#22d3ee", border: "#155e75" },
  "Sovereign Bond":    { bg: "#03143a", color: "#60a5fa", border: "#1e40af" },
  "Attestation Marker":{ bg: "#150d38", color: "#c4b5fd", border: "#5b21b6" },
};

// ── On-chain status badge ────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; label: string }> = {
  issued:  { bg: "#052e16", color: "#4ade80", border: "#166534", label: "LIVE" },
  pending: { bg: "#1c1003", color: "#fbbf24", border: "#92400e", label: "PENDING" },
  draft:   { bg: "#1e293b", color: "#94a3b8", border: "#475569", label: "DRAFT" },
};

// ── Chain pill colors ────────────────────────────────────────────────────────
const CHAIN_COLOR: Record<string, string> = {
  "Ethereum":       "#3b5fc0",
  "Solana":         "#7a34cc",
  "TRON":           "#a11414",
  "Base":           "#0040b3",
  "Arbitrum":       "#1a7cbf",
  "Polygon":        "#5c2aa3",
  "Avalanche":      "#8b1212",
  "Optimism":       "#b30014",
  "XRPL":           "#7a5c00",
  "Stellar":        "#0a6f82",
  "Internal ledger":"#374151",
};

// ── Stablecoin logo + sub-page map ───────────────────────────────────────────
const STABLECOIN_META: Record<string, { logo: string; subPage?: string; assetClass: string; chains?: readonly string[] }> = {
  "USDC":         { logo: "/assets/troptions/logos/usdc-iou-logo.svg",       subPage: "/troptions/stablecoins/usdc",  assetClass: "Stablecoin" },
  "USDT":         { logo: "/assets/troptions/logos/usdt-iou-logo.svg",       subPage: "/troptions/stablecoins/usdt",  assetClass: "Stablecoin" },
  "DAI":          { logo: "/assets/troptions/logos/dai-iou-logo.svg",        assetClass: "Stablecoin" },
  "EURC":         { logo: "/assets/troptions/logos/eurc-iou-logo.svg",       assetClass: "Stablecoin" },
  "PYUSD":        { logo: "/assets/troptions/logos/pyusd-iou-logo.svg",      subPage: "/troptions/stablecoins/pyusd", assetClass: "Stablecoin" },
  "USDP":         { logo: "/assets/troptions/logos/usdp-iou-logo.svg",       subPage: "/troptions/stablecoins/usdp",  assetClass: "Stablecoin" },
  "PAXG":         { logo: "/assets/troptions/logos/paxg-iou-logo.svg",       subPage: "/troptions/stablecoins/paxg",  assetClass: "Commodity" },
  "TRU-UNIT":     { logo: "/assets/troptions/logos/troptions-iou-logo.svg",  assetClass: "Platform Token" },
  "TRU-GOLD":     { logo: "/assets/troptions/logos/xaua-iou-logo.svg",       assetClass: "Commodity" },
  "TRU-TREASURY": { logo: "/assets/troptions/logos/troptions-iou-logo.svg",  assetClass: "Platform Token" },
};

// ── Helper: format transfer fee ──────────────────────────────────────────────
function fmtFee(bps: number): string {
  if (bps === 0) return "No Fee";
  return `${bps} bps · ${(bps / 100).toFixed(2)}%`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function IouCard({ iou }: { readonly iou: XrplIouRecord }) {
  const cls = ASSET_CLASS_STYLE[iou.assetClass] ?? ASSET_CLASS_STYLE["Custom Token"];
  const sts = STATUS_STYLE[iou.onChainStatus ?? "draft"];
  return (
    <article style={{
      background: "rgba(12,20,36,0.92)",
      border: "1px solid rgba(201,168,76,0.2)",
      borderRadius: "0.75rem",
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
        {iou.logoPath && (
          <Image
            src={iou.logoPath}
            alt={`${iou.currency} logo`}
            width={48}
            height={48}
            style={{ borderRadius: "50%", border: "1px solid rgba(201,168,76,0.25)", flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
            <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: "1.15rem", color: "#f0cf82", letterSpacing: "0.04em" }}>
              {iou.currency}
            </span>
            {/* Asset class badge */}
            <span style={{ background: cls.bg, color: cls.color, border: `1px solid ${cls.border}`, borderRadius: "0.3rem", padding: "0.1rem 0.45rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              {iou.assetClass}
            </span>
            {/* Status badge */}
            <span style={{ background: sts.bg, color: sts.color, border: `1px solid ${sts.border}`, borderRadius: "0.3rem", padding: "0.1rem 0.45rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em" }}>
              {sts.label}
            </span>
          </div>
          {iou.issuerLabel && (
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748b", fontFamily: "monospace" }}>{iou.issuerLabel}</p>
          )}
        </div>
      </div>

      {/* RWA description */}
      {iou.rwaDescription && (
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55 }}>{iou.rwaDescription}</p>
      )}

      {/* Meta row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
        {/* Transfer fee */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "0.35rem", padding: "0.2rem 0.6rem", fontSize: "0.72rem", color: "#d4a840", fontWeight: 600 }}>
          <span style={{ opacity: 0.7 }}>Transfer Fee:</span> {fmtFee(iou.transferFeeRateBps)}
        </span>
        {/* XRPL chain pill */}
        <span style={{ background: "#1a1200", color: "#c9a84c", border: "1px solid #4a3800", borderRadius: "99px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em" }}>
          XRPL
        </span>
      </div>

      {/* Compliance note */}
      <p style={{ margin: 0, fontSize: "0.71rem", color: "#475569", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.6rem" }}>
        {iou.note}
      </p>

      {/* Footer actions */}
      {iou.explorerUrl && (
        <div style={{ marginTop: "-0.2rem" }}>
          <a
            href={iou.explorerUrl}
            target="_blank"
            rel="noreferrer noopener"
            style={{ fontSize: "0.75rem", color: "#c9a84c", fontWeight: 600, textDecoration: "none" }}
          >
            View on XRPScan ↗
          </a>
        </div>
      )}
    </article>
  );
}

function StablecoinCard({ coin }: { readonly coin: StablecoinIssuerRecord }) {
  const meta = STABLECOIN_META[coin.symbol];
  const cls = ASSET_CLASS_STYLE[meta?.assetClass ?? "Stablecoin"];
  return (
    <article style={{
      background: "rgba(245,240,228,0.97)",
      border: "1px solid rgba(201,154,60,0.4)",
      borderRadius: "0.75rem",
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
      color: "#0f172a",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
        {meta?.logo && (
          <Image
            src={meta.logo}
            alt={`${coin.symbol} logo`}
            width={48}
            height={48}
            style={{ borderRadius: "50%", border: "1px solid rgba(201,154,60,0.3)", flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
            <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#0f172a", letterSpacing: "0.04em" }}>
              {coin.symbol}
            </span>
            <span style={{ background: cls.bg, color: cls.color, border: `1px solid ${cls.border}`, borderRadius: "0.3rem", padding: "0.1rem 0.45rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              {meta?.assetClass ?? "Stablecoin"}
            </span>
            {coin.defaultInstitutionalRoute && (
              <span style={{ background: "#1e3a5f", color: "#93c5fd", border: "1px solid #1e40af", borderRadius: "0.3rem", padding: "0.1rem 0.45rem", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em" }}>
                DEFAULT ROUTE
              </span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#374151", fontWeight: 500 }}>Issuer: {coin.issuer}</p>
        </div>
      </div>

      {/* Chain support pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {coin.chainSupport.map((chain) => (
          <span key={chain} style={{ background: CHAIN_COLOR[chain] ?? "#374151", color: "#fff", borderRadius: "99px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 600, opacity: 0.9 }}>
            {chain}
          </span>
        ))}
      </div>

      {/* Use cases */}
      <div>
        <p style={{ margin: "0 0 0.3rem", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#374151" }}>Use Cases</p>
        <ul style={{ margin: 0, paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {coin.useCases.map((uc) => (
            <li key={uc} style={{ fontSize: "0.76rem", color: "#1e293b", lineHeight: 1.4 }}>{uc}</li>
          ))}
        </ul>
      </div>

      {/* Risk controls */}
      <div>
        <p style={{ margin: "0 0 0.3rem", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7f1d1d" }}>Risk Controls</p>
        <ul style={{ margin: 0, paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {coin.riskControls.map((rc) => (
            <li key={rc} style={{ fontSize: "0.76rem", color: "#374151", lineHeight: 1.4 }}>{rc}</li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(15,23,42,0.12)", paddingTop: "0.7rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{coin.chainSupportNote}</span>
        {meta?.subPage && (
          <Link
            href={meta.subPage}
            style={{ fontSize: "0.78rem", color: "#92400e", fontWeight: 700, textDecoration: "none", background: "rgba(201,154,60,0.12)", border: "1px solid rgba(201,154,60,0.3)", borderRadius: "0.35rem", padding: "0.25rem 0.65rem" }}
          >
            Full Profile →
          </Link>
        )}
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TroptionsStablecoinsPage() {
  const iouStablecoins = XRPL_IOU_REGISTRY.filter((r) => r.category === "stablecoin" || r.category === "platform-token" || r.category === "commodity" || r.category === "bond" || r.category === "attestation" || r.category === "rwa-receipt" || r.category === "custom-token");
  const publicCoins = STABLECOIN_ISSUER_REGISTRY.filter((c) => !c.symbol.startsWith("TRU-"));
  const internalUnits = STABLECOIN_ISSUER_REGISTRY.filter((c) => c.symbol.startsWith("TRU-"));

  return (
    <main className="te-page">
      <div className="te-wrap" style={{ gap: "1.75rem" }}>

        {/* ── Simulation disclaimer ──────────────────────────────────────────── */}
        <div style={{ background: "rgba(127,29,29,0.18)", border: "1px solid rgba(127,29,29,0.5)", borderRadius: "0.65rem", padding: "0.75rem 1rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠</span>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#fca5a5", lineHeight: 1.55 }}>
            <strong>Simulation &amp; Monitoring Only.</strong> All stablecoin and IOU capabilities shown here operate under simulation, readiness, and monitoring controls. No live custody, transfer, exchange, issuance, or public investment function is enabled without explicit issuer approval, provider onboarding, and jurisdiction clearance.
          </p>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="te-panel" style={{ padding: "1.75rem" }}>
          <p className="te-kicker">TROPTIONS · Institutional Finance Rail</p>
          <h1 className="te-heading">Stablecoin Rail Intelligence</h1>
          <p className="te-subheading" style={{ maxWidth: "700px", marginTop: "0.5rem" }}>
            Comprehensive reference for every stablecoin, IOU, and asset receipt across the TROPTIONS gateway — including asset classes, chain support, transfer fees, issuer controls, and risk frameworks. Built to institutional standards.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.1rem" }}>
            <a href="https://xrpscan.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" target="_blank" rel="noreferrer noopener"
               className="rounded-lg bg-(--gold) px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
               style={{ textDecoration: "none" }}>
              View XRPL Issuer on XRPScan ↗
            </a>
            <Link href="/troptions/wallets"
               className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
               style={{ textDecoration: "none" }}>
              Wallet Infrastructure →
            </Link>
          </div>
        </header>

        {/* ── Stats row ────────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
          {[
            { label: "XRPL IOUs", value: `${iouStablecoins.length}`, sub: "gateway instruments" },
            { label: "Stablecoins", value: `${publicCoins.length}`, sub: "monitored rails" },
            { label: "Chains Covered", value: "10+", sub: "multi-chain" },
            { label: "Status", value: "1 LIVE", sub: `${iouStablecoins.length - 1} DRAFT` },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(12,20,36,0.88)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.65rem", padding: "0.9rem 1rem" }}>
              <p style={{ margin: "0 0 0.15rem", fontSize: "0.67rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#f0cf82", fontFamily: "'Arial Black', Arial, sans-serif", lineHeight: 1.1 }}>{s.value}</p>
              <p style={{ margin: "0.15rem 0 0", fontSize: "0.7rem", color: "#64748b" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── XRPL Gateway IOUs ────────────────────────────────────────────── */}
        <section>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ margin: "0 0 0.2rem", fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>TROPTIONS · XRPL Mainnet</p>
            <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#f0cf82" }}>XRPL Gateway IOUs</h2>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5, maxWidth: "680px" }}>
              All issued assets reference the canonical TROPTIONS Gateway Issuer address. Each IOU requires an authorized trustline. Transfer fees, freeze, and clawback controls apply as documented below.
            </p>
          </div>
          <div style={{ display: "grid", gap: "0.85rem", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))" }}>
            {XRPL_IOU_REGISTRY.map((iou) => (
              <IouCard key={iou.currency} iou={iou} />
            ))}
          </div>
        </section>

        {/* ── Institutional Stablecoins ──────────────────────────────────────── */}
        <section>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ margin: "0 0 0.2rem", fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Monitored · Multi-Chain</p>
            <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#f2efe8" }}>Institutional Stablecoins</h2>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5, maxWidth: "680px" }}>
              Third-party stablecoin rails evaluated for readiness, compliance posture, and integration feasibility across TROPTIONS settlement scenarios.
            </p>
          </div>
          <div style={{ display: "grid", gap: "0.85rem", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))" }}>
            {publicCoins.map((coin) => (
              <StablecoinCard key={coin.symbol} coin={coin} />
            ))}
          </div>
        </section>

        {/* ── Internal Accounting Units ──────────────────────────────────────── */}
        <section>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ margin: "0 0 0.2rem", fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>Internal · Simulation Only</p>
            <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "#94a3b8" }}>Internal Accounting Units</h2>
          </div>
          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {internalUnits.map((coin) => (
              <div key={coin.symbol} style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(71,85,105,0.35)", borderRadius: "0.65rem", padding: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: "0.95rem", color: "#94a3b8" }}>{coin.symbol}</span>
                  <span style={{ background: "#1e293b", color: "#64748b", border: "1px solid #334155", borderRadius: "0.3rem", padding: "0.1rem 0.4rem", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase" }}>Internal</span>
                </div>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.74rem", color: "#64748b" }}>{coin.issuer}</p>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {coin.riskControls.map((rc) => (
                    <li key={rc} style={{ fontSize: "0.72rem", color: "#475569", lineHeight: 1.45 }}>{rc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Paxos ecosystem link ─────────────────────────────────────────── */}
        <div className="te-future-panel" style={{ padding: "1.25rem" }}>
          <h3 style={{ margin: "0 0 0.4rem", fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#f0cf82" }}>Paxos Regulated Stablecoin Ecosystem</h3>
          <p style={{ margin: "0 0 0.8rem", fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.55 }}>
            PYUSD, USDP, and PAXG are all issued under Paxos Trust Company oversight. Each carries distinct regulatory posture, redemption mechanics, and reserve transparency requirements.
          </p>
          <Link href="/troptions/stablecoins/paxos"
            style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", color: "#f0cf82", borderRadius: "0.45rem", padding: "0.45rem 0.9rem", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>
            View Paxos Suite Profile →
          </Link>
        </div>

      </div>
    </main>
  );
}
