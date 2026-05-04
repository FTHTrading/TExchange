import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "TROPTIONS — The Trade Currency of the Real Economy",
  description:
    "TROPTIONS: Founded 2003. Sovereign Rust Layer 1 with 27 crates. Live XRPL & Stellar issuances. $175M USDC documented. Mobile Medical Clinics. Real Estate. University. The institutional operating system for the real economy.",
  metadataBase: new URL("https://troptions.unykorn.org"),
};

// ── Brand tokens ─────────────────────────────────────────────────────────────
const G = {
  gold:      "#C8952A",
  goldL:     "#E5B84A",
  goldShine: "#F5D070",
  black:     "#090806",
  navy:      "#07111F",
  ink:       "#F2EEE4",
  muted:     "#9A8E78",
  line:      "rgba(200,149,42,0.28)",
} as const;

const STATS = [
  { n: "2003",  label: "Year Founded" },
  { n: "27",    label: "Rust L1 Crates" },
  { n: "7",     label: "Live XRPL Wallets" },
  { n: "$175M", label: "USDC Documented" },
  { n: "4",     label: "Stablecoins Issued" },
  { n: "33+",   label: "Ecosystem Verticals" },
];

const DEPLOYMENTS = [
  {
    id: "medical",
    img: "/assets/troptions/logos/troptions-mobile-medical-real.jpg",
    label: "Healthcare",
    name: "Mobile Medical Clinic",
    desc: "Full-scale mobile medical clinic operating on-location. Services accepted with TROPTIONS. Proof of concept for real-economy trade currency at the point of care.",
    href: "/troptions/mobile-medical",
  },
  {
    id: "golf",
    img: "/assets/troptions/logos/troptions-golf-powered-by.jpg",
    label: "Sports & Lifestyle",
    name: "TROPTIONS Golf",
    desc: "Golf events, tournaments, and sponsorships powered by TROPTIONS. The Powered By mark extends brand presence into premium sports and lifestyle verticals.",
    href: "/troptions/ecosystem",
  },
  {
    id: "university",
    img: "/assets/troptions/logos/troptions-university-new.jpg",
    label: "Education",
    name: "TROPTIONS University",
    desc: "Education platform within the TROPTIONS ecosystem. Curriculum, certifications, and financial literacy infrastructure powered by the trade currency.",
    href: "/troptions/university",
  },
  {
    id: "xchange",
    img: "/assets/troptions/logos/troptions-xchange-dark.jpg",
    label: "Exchange",
    name: "TROPTIONS Xchange",
    desc: "The primary exchange layer for TROPTIONS. DEX integration, OTC desk, and multi-chain settlement rails. Deep liquidity routing on XRPL and Stellar mainnet.",
    href: "/troptions/xrpl-platform",
  },
];

const PIPELINE = [
  { code: "POPEYE",    role: "Network / P2P",      desc: "libp2p gossipsub fabric. Propagates transactions and blocks across the validator mesh. Never mutates state." },
  { code: "TEV",       role: "Cryptographic Gate",  desc: "Ed25519 verification, nonce validation, anti-replay. Every payload is held here before the runtime sees it. Post-quantum lane included." },
  { code: "CONSENSUS", role: "BFT Finality",        desc: "Round-robin leader election with 2/3+ quorum. Finality is a signed certificate — not probabilistic." },
  { code: "MARS",      role: "Runtime Brain",       desc: "Pure state machine. Balances, nonces, RWA registry, NIL registry, AMM math, trustlines, namespaces. Same input → same output on every node." },
  { code: "TAR",       role: "Persistence",         desc: "Atomic crash-safe storage. Append-only log + snapshots. Kill mid-block — TAR comes back identical." },
];

const STABLECOINS = [
  { sym: "USDC", logo: "/assets/troptions/logos/usdc-iou-logo.svg", supply: "100,000,000", peg: "USD", issuer: "Circle",   tx: "CD7271274743C20635ED58515F84B399A4113FE40E62CFC8248446A494D1E642" },
  { sym: "USDT", logo: "/assets/troptions/logos/usdt-iou-logo.svg", supply: "100,000,000", peg: "USD", issuer: "Tether",   tx: "42092147E2D2BB2E944C7156378A6CEE8B8D0E78FB350266FC1990439D7F1F6F" },
  { sym: "DAI",  logo: "/assets/troptions/logos/dai-iou-logo.svg",  supply: "50,000,000",  peg: "USD", issuer: "MakerDAO", tx: "C0D75DCCF46DCA6F1776D739A4EC0F521330E170B8BC2E09C7F4D42A2361F641" },
  { sym: "EURC", logo: "/assets/troptions/logos/eurc-iou-logo.svg", supply: "50,000,000",  peg: "EUR", issuer: "Circle",   tx: "FF11D7773C0EDF38833A9CEE5AE03DEB6167D87FF07180A275A1DDCABCC560D1" },
];

const VERTICALS = [
  { name: "Real Estate",      href: "/troptions/real-estate",             tag: "RWA" },
  { name: "Solar Energy",     href: "/troptions/solar",                   tag: "Energy" },
  { name: "Mobile Medical",   href: "/troptions/mobile-medical",          tag: "Healthcare" },
  { name: "University",       href: "/troptions/university",              tag: "Education" },
  { name: "Xchange",          href: "/troptions/xchange",                 tag: "Exchange" },
  { name: "Golf",             href: "/troptions/ecosystem",               tag: "Lifestyle" },
  { name: "NIL Platform",     href: "/troptions/nil",                     tag: "Creator" },
  { name: "Neobank",          href: "/troptions/neobank",                 tag: "Finance" },
  { name: "Carbon Credits",   href: "/troptions/carbon",                  tag: "ESG" },
  { name: "Sovereign AI",     href: "/troptions/sovereign-ai",            tag: "AI" },
  { name: "Treasury",         href: "/troptions/treasury",                tag: "Finance" },
  { name: "XRPL Bridge",      href: "/troptions/xrpl-platform",           tag: "Chain" },
  { name: "Stellar Bridge",   href: "/troptions/stellar",                 tag: "Chain" },
  { name: "Wallet Hub",       href: "/troptions/wallet-hub",              tag: "Custody" },
  { name: "Wallet Forensics", href: "/troptions/wallet-forensics",        tag: "Compliance" },
  { name: "Compliance",       href: "/troptions/compliance",              tag: "Compliance" },
  { name: "KYC",              href: "/troptions/kyc",                     tag: "Compliance" },
  { name: "Settlement",       href: "/troptions/settlement",              tag: "Ops" },
  { name: "Payment Rails",    href: "/troptions/payment-rails",           tag: "Payments" },
  { name: "Stablecoins",      href: "/troptions/stablecoins",             tag: "Issuance" },
  { name: "Proof of Funds",   href: "/troptions/verification",            tag: "Proof" },
  { name: "Proof Room",       href: "/troptions/proof",                   tag: "Proof" },
  { name: "CIS Package",      href: "/troptions/cis",                     tag: "Diligence" },
  { name: "Layer 1",          href: "/troptions/layer1",                  tag: "Technology" },
  { name: "Anti-IFT",         href: "/troptions/anti-illicit-finance",    tag: "Compliance" },
  { name: "Cross-Rail",       href: "/troptions/cross-rail",              tag: "Payments" },
  { name: "Genius Yield",     href: "/troptions/genius-yield-opportunity",tag: "Finance" },
  { name: "Public Benefit",   href: "/troptions/public-benefit",          tag: "Impact" },
  { name: "RWA Platform",     href: "/troptions/rwa",                     tag: "RWA" },
  { name: "PayOps",           href: "/troptions/payments",                tag: "Ops" },
  { name: "Media",            href: "/troptions/media",                   tag: "Media" },
  { name: "Momentum / Sports",href: "/troptions/momentum",                tag: "Lifestyle" },
  { name: "Institutional",    href: "/troptions/institutional",           tag: "Diligence" },
];

const TAG_BG: Record<string, string> = {
  RWA: "#1a3a2a", Chain: "#1a2a3a", Compliance: "#2a1a1a", Finance: "#1a1a2a",
  Technology: "#0d1a2a", Proof: "#2a1a0d", Payments: "#1a2a1a", Issuance: "#1a2a1a",
  Ops: "#1a1a1a", Healthcare: "#1a2a2a", Education: "#1a1a2a", Exchange: "#1a1a2a",
  Lifestyle: "#2a1a2a", Energy: "#1a2a1a", AI: "#1a1a2a", ESG: "#1a2a1a",
  Custody: "#2a2a1a", Media: "#2a1a1a", Impact: "#1a2a1a", Diligence: "#2a1a1a",
  Creator: "#2a1a2a",
};

// ─────────────────────────────────────────────────────────────────────────────
export default function TroptionsInstitutionalPage() {
  return (
    <div style={{ background: G.black, color: G.ink, minHeight: "100vh", fontFamily: "'Geist','Segoe UI',sans-serif" }}>

      {/* NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{ borderBottom: `1px solid ${G.line}`, background: "rgba(9,8,6,0.97)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/troptions" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <Image src="/assets/troptions/logos/troptions-tt-on-black.jpg" alt="TROPTIONS" width={40} height={40} style={{ borderRadius: 6, objectFit: "cover" }} priority />
            <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "1rem", letterSpacing: "0.22em", color: G.goldL, fontWeight: 600, textTransform: "uppercase" }}>TROPTIONS</span>
          </Link>
          <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
            {[
              { label: "Layer 1",    href: "/troptions/layer1" },
              { label: "Proof",      href: "/troptions/verification" },
              { label: "Stablecoins",href: "/troptions/stablecoins" },
              { label: "Ecosystem",  href: "/troptions/ecosystem" },
              { label: "History",    href: "/troptions/history" },
            ].map(n => (
              <Link key={n.label} href={n.href} style={{ color: G.muted, fontSize: "0.78rem", letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase" }}>
                {n.label}
              </Link>
            ))}
            <Link href="/portal/troptions/dashboard" style={{ background: G.gold, color: "#0A0805", padding: "0.4rem 1.1rem", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: `radial-gradient(circle, rgba(200,149,42,0.09) 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Primary mark */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Image
            src="/assets/troptions/logos/troptions-primary-official.jpg"
            alt="TROPTIONS — The Official Mark"
            width={220}
            height={220}
            style={{ borderRadius: 16, boxShadow: `0 0 100px rgba(200,149,42,0.22), 0 40px 100px rgba(0,0,0,0.8)`, objectFit: "contain", background: "#fff" }}
            priority
          />
        </div>

        <p style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "0.78rem", letterSpacing: "0.55em", color: G.gold, textTransform: "uppercase", marginBottom: "1rem" }}>
          Est. 2003 &nbsp;·&nbsp; Globally Recognized Trade Currency
        </p>
        <h1 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(2.6rem,6vw,4.8rem)", fontWeight: 400, lineHeight: 1.1, color: G.ink, letterSpacing: "0.02em", margin: "0 0 1.5rem" }}>
          The Trade Currency
          <br />
          <span style={{ background: `linear-gradient(135deg, ${G.gold} 10%, ${G.goldShine} 55%, ${G.gold} 90%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            of the Real Economy
          </span>
        </h1>
        <p style={{ maxWidth: 620, fontSize: "1.02rem", lineHeight: 1.8, color: G.muted, marginBottom: "2.5rem" }}>
          TROPTIONS is not a concept — it is a deployed institutional operating system.
          Sovereign Rust Layer 1. Live XRPL and Stellar issuances. $175M USDC documented.
          Mobile Medical Clinics, real estate, education, and golf — all powered by the same mark.
        </p>
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}>
          <Link href="/portal/troptions/dashboard" style={{ background: G.gold, color: "#090806", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Open Platform
          </Link>
          <Link href="/troptions/verification" style={{ border: `1px solid ${G.line}`, color: G.goldL, padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            View Proof Room
          </Link>
          <Link href="/troptions/layer1" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.85rem 2rem", borderRadius: 8, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>
            Rust Layer 1
          </Link>
        </div>

        {/* Stat row */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}`, padding: "1.5rem 0", width: "min(900px,100%)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ flex: "1 1 120px", textAlign: "center", padding: "0.5rem 1.25rem", borderRight: i < STATS.length - 1 ? `1px solid ${G.line}` : undefined }}>
              <div style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(1.3rem,3vw,1.9rem)", color: G.goldL, fontWeight: 600 }}>{s.n}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.16em", color: G.muted, textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT ───────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${G.line}`, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: "5rem", gridTemplateColumns: "1.15fr 0.85fr", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "1rem" }}>About TROPTIONS</p>
            <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.7rem,3vw,2.5rem)", fontWeight: 400, lineHeight: 1.25, marginBottom: "2rem", color: G.ink }}>
              A globally recognized trade currency with twenty-two years of real-economy deployment.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.85, color: G.muted }}>
              <p>
                TROPTIONS was founded in 2003 with a singular premise: that trade itself — commerce, services, property, healthcare — could be denominated in a non-fiat currency that the participants themselves control. That premise has been proven in production across real estate transactions, mobile medical clinics, golf events, and education programs.
              </p>
              <p>
                Today, TROPTIONS operates an institutional-grade technology stack. The Sovereign Rust Layer 1 — 27 production crates across five execution tiers — provides the consensus, runtime, and persistence backbone. Bridge contracts connect to the XRP Ledger and Stellar Network, where TROPTIONS-branded IOUs and four major stablecoins (USDC, USDT, DAI, EURC) have been issued and verified on mainnet.
              </p>
              <p>
                The proof infrastructure is built to institutional standards. Chainlink-validated custodial receipts, on-chain XRPL transaction hashes, wallet control proofs, and a $175M USDC trade desk position are all documented and cross-referenced. No simulated claims. No marketing assertions without a source.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/troptions/history" style={{ border: `1px solid ${G.line}`, color: G.goldL, padding: "0.6rem 1.25rem", borderRadius: 6, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Full History</Link>
              <Link href="/troptions/capabilities" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.6rem 1.25rem", borderRadius: 6, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Capabilities</Link>
              <Link href="/troptions/institutional" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.6rem 1.25rem", borderRadius: 6, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Institutional Access</Link>
            </div>
          </div>

          <div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "2rem", textAlign: "center", marginBottom: "1.5rem", boxShadow: `0 32px 100px rgba(0,0,0,0.6), 0 0 0 1px ${G.line}` }}>
              <Image src="/assets/troptions/logos/troptions-primary-official.jpg" alt="TROPTIONS Official" width={260} height={260} style={{ objectFit: "contain", maxWidth: "100%" }} />
            </div>
            {[
              { k: "Ticker",      v: "TROPTIONS / XRPL + Stellar" },
              { k: "Founded",     v: "2003 — Atlanta, GA" },
              { k: "Issuer",      v: "rPF2M1QjdVh1hkNgmMMTkT9qMU7tA7Wds3" },
              { k: "Supply",      v: "100,000,000 TROPTIONS" },
              { k: "Stablecoins", v: "USDC · USDT · DAI · EURC" },
              { k: "Layer 1",     v: "Sovereign Rust — 27 Crates" },
            ].map(r => (
              <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "0.65rem 0", borderBottom: `1px solid ${G.line}`, fontSize: "0.84rem" }}>
                <span style={{ color: G.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.68rem" }}>{r.k}</span>
                <span style={{ color: G.ink, fontFamily: "'Palatino Linotype',Georgia,serif" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL-WORLD DEPLOYMENTS ──────────────────────────────────────────── */}
      <section style={{ padding: "4rem 1.5rem 5rem", borderTop: `1px solid ${G.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.7rem" }}>Real-World Deployments</p>
          <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 400, color: G.ink, marginBottom: "0.65rem" }}>
            The mark in the field. Not simulated. Deployed.
          </h2>
          <p style={{ color: G.muted, fontSize: "0.9rem", marginBottom: "2.5rem", maxWidth: 580 }}>
            Every vertical below has been operated, branded, and powered by TROPTIONS in the real economy.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
            {DEPLOYMENTS.map(d => (
              <Link key={d.id} href={d.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#0D1118", border: `1px solid ${G.line}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", background: "#111" }}>
                  <Image src={d.img} alt={d.name} fill sizes="(max-width:768px) 100vw, 300px" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(9,8,6,0.65) 0%,transparent 60%)" }} />
                  <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.45)", color: "#6ee7b7", fontSize: "0.62rem", letterSpacing: "0.15em", padding: "0.2rem 0.55rem", borderRadius: 20, textTransform: "uppercase" }}>
                    Deployed
                  </span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", color: G.gold, textTransform: "uppercase", marginBottom: "0.35rem" }}>{d.label}</p>
                  <h3 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "1.05rem", color: G.ink, marginBottom: "0.55rem" }}>{d.name}</h3>
                  <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: G.muted }}>{d.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOVEREIGN RUST LAYER 1 ──────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: `1px solid ${G.line}`, background: "linear-gradient(160deg,#06100A 0%,#07111F 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.7rem" }}>Technology</p>
            <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 400, color: G.ink, lineHeight: 1.22, marginBottom: "1.25rem" }}>
              Sovereign Rust Layer 1
            </h2>
            <p style={{ color: G.muted, lineHeight: 1.82, marginBottom: "1.75rem", fontSize: "0.95rem" }}>
              A 27-crate Rust blockchain built from first principles. Private and public execution lanes. Creator economy, NIL registry, RWA custody, AMM protocol, and post-quantum cryptography all settle on the same closed-loop organism. POPEYE sees the world. MARS is the constitution.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.75rem" }}>
              {["27 Crates","Ed25519 + Post-Quantum","BFT Finality","AMM Built-in","NIL Registry","RWA Module","Agora Governance","Stellar Bridge","XRPL Bridge"].map(t => (
                <span key={t} style={{ background: "rgba(200,149,42,0.08)", border: `1px solid ${G.line}`, color: G.goldL, padding: "0.28rem 0.65rem", borderRadius: 20, fontSize: "0.7rem", letterSpacing: "0.08em" }}>{t}</span>
              ))}
            </div>
            <Link href="/troptions/layer1" style={{ background: G.gold, color: "#090806", padding: "0.75rem 1.5rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
              Explore Architecture
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {PIPELINE.map((p, i) => (
              <div key={p.code} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: `1px solid ${G.line}`, borderRadius: 10, padding: "0.95rem 1.1rem" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ background: `linear-gradient(135deg,${G.gold},${G.goldShine})`, color: "#090806", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 800 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", marginBottom: "0.28rem" }}>
                    <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "0.95rem", color: G.goldL, fontWeight: 600 }}>{p.code}</span>
                    <span style={{ fontSize: "0.65rem", color: G.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.role}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.62, color: G.muted }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XRPL LIVE ISSUANCES ─────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: `1px solid ${G.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.6rem" }}>On-Chain Proof</p>
              <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 400, color: G.ink }}>
                XRPL Mainnet Issuances
              </h2>
              <p style={{ color: G.muted, fontSize: "0.88rem", marginTop: "0.45rem" }}>Four stablecoins issued and verifiable on the XRP Ledger and Stellar Network. All transaction hashes are public.</p>
            </div>
            <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "0.72rem", letterSpacing: "0.3em", color: G.muted, textTransform: "uppercase", border: `1px solid ${G.line}`, padding: "0.3rem 0.75rem", borderRadius: 4 }}>XRP Ledger · Mainnet</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${G.line}` }}>
                  {["Asset","Supply Issued","Peg","Issuer","XRPL Issue TX","Status"].map(h => (
                    <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left", fontSize: "0.65rem", letterSpacing: "0.2em", color: G.muted, textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STABLECOINS.map((s, i) => (
                  <tr key={s.sym} style={{ borderBottom: `1px solid rgba(200,149,42,0.1)`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                        <Image src={s.logo} alt={s.sym} width={26} height={26} />
                        <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontWeight: 600, color: G.ink, fontSize: "0.95rem" }}>{s.sym}</span>
                      </div>
                    </td>
                    <td style={{ padding: "1rem", color: G.goldL, fontFamily: "monospace" }}>{s.supply}</td>
                    <td style={{ padding: "1rem", color: G.muted }}>1 {s.peg}</td>
                    <td style={{ padding: "1rem", color: G.muted }}>{s.issuer}</td>
                    <td style={{ padding: "1rem" }}>
                      <a href={`https://xrpscan.com/tx/${s.tx}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "monospace", fontSize: "0.7rem", color: G.gold, textDecoration: "none", letterSpacing: "0.03em" }}>
                        {s.tx.slice(0, 14)}…{s.tx.slice(-8)}
                      </a>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ background: "rgba(16,185,129,0.14)", border: "1px solid rgba(16,185,129,0.4)", color: "#6ee7b7", fontSize: "0.62rem", letterSpacing: "0.14em", padding: "0.2rem 0.55rem", borderRadius: 20, textTransform: "uppercase" }}>
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/troptions/verification" style={{ border: `1px solid ${G.line}`, color: G.goldL, padding: "0.58rem 1.1rem", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Full Proof of Issuance</Link>
            <Link href="/troptions/stablecoins" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.58rem 1.1rem", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Stablecoin Registry</Link>
            <Link href="/troptions/wallets" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.58rem 1.1rem", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Live Wallet Infrastructure</Link>
            <Link href="/troptions/xrpl-platform" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "0.58rem 1.1rem", borderRadius: 6, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>XRPL Market Data</Link>
          </div>
        </div>
      </section>

      {/* PROOF OF FUNDS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: `1px solid ${G.line}`, background: `linear-gradient(155deg,rgba(200,149,42,0.04) 0%,transparent 60%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.7rem" }}>Proof of Funds</p>
            <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 400, color: G.ink, lineHeight: 1.25, marginBottom: "1.25rem" }}>
              $175 Million USDC<br />Trade Desk Position
            </h2>
            <p style={{ color: G.muted, lineHeight: 1.82, marginBottom: "2rem", fontSize: "0.95rem" }}>
              The Bryan Stone USDC 175M trade desk position is documented through Chainlink price validation, XRPL real-issuer proof, wallet control signatures, and a CIS compliance package. Every layer of the proof is cross-referenced and machine-verifiable.
            </p>
            {[
              { label: "Chainlink Validation",     status: "Verified" },
              { label: "XRPL Real-Issuer Proof",   status: "Verified" },
              { label: "Wallet Control Signature", status: "Verified" },
              { label: "CIS Package",              status: "Compiled" },
              { label: "Custodial Receipt",         status: "Generated" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.62rem 0", borderBottom: `1px solid ${G.line}`, fontSize: "0.84rem" }}>
                <span style={{ color: G.muted }}>{r.label}</span>
                <span style={{ color: "#6ee7b7", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>&#10003; {r.status}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
              <Link href="/proofs/bryan-stone-usdc-175m.html" style={{ background: G.gold, color: "#090806", padding: "0.75rem 1.5rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                Open Proof Package
              </Link>
              <Link href="/troptions/pof" style={{ border: `1px solid ${G.line}`, color: G.goldL, padding: "0.75rem 1.5rem", borderRadius: 8, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                POF Downloads
              </Link>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${G.line}`, borderRadius: 16, padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${G.line}` }}>
              <Image src="/assets/troptions/logos/usdc-iou-logo.svg" alt="USDC" width={44} height={44} />
              <div>
                <div style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "1.7rem", color: G.ink }}>$175,000,000</div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: G.muted, textTransform: "uppercase" }}>USDC · Trade Desk Position</div>
              </div>
            </div>
            {[
              { k: "Account",   v: "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
              { k: "Asset",     v: "USDC (Circle — Official Issuer)" },
              { k: "Validated", v: "Chainlink + XRPL + CIS" },
              { k: "CIS Ref",   v: "Bryan Stone — USDC 175M" },
              { k: "Hash",      v: "CD7271…1E642" },
            ].map(r => (
              <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0", borderBottom: `1px solid rgba(200,149,42,0.1)`, fontSize: "0.8rem", gap: "1rem" }}>
                <span style={{ color: G.muted, flexShrink: 0, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.k}</span>
                <span style={{ color: G.ink, fontFamily: "monospace", textAlign: "right", wordBreak: "break-all" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE MARK — Brand showcase ────────────────────────────────────────── */}
      <section style={{ padding: "4rem 1.5rem 5rem", borderTop: `1px solid ${G.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.7rem" }}>The Mark</p>
          <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 400, color: G.ink, marginBottom: "2rem" }}>
            The TROPTIONS TT — recognized across 22 years of commerce.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
            {[
              { src: "/assets/troptions/logos/troptions-primary-official.jpg",  bg: "#fff",    label: "Primary Mark" },
              { src: "/assets/troptions/logos/troptions-tt-on-black.jpg",        bg: "#090806", label: "Xchange Dark" },
              { src: "/assets/troptions/logos/troptions-tt-mark-gold.jpg",       bg: "#090806", label: "TT Gold Mark" },
              { src: "/assets/troptions/logos/troptions-xchange-fire-new.jpg",   bg: "#090806", label: "Xchange Fire" },
              { src: "/assets/troptions/logos/troptions-golf-powered-by.jpg",    bg: "#fff",    label: "Powered By" },
              { src: "/assets/troptions/logos/troptions-university-new.jpg",     bg: "#fff",    label: "University" },
            ].map(logo => (
              <div key={logo.label} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${G.line}` }}>
                <div style={{ background: logo.bg, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem" }}>
                  <Image src={logo.src} alt={logo.label} width={155} height={155} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                </div>
                <div style={{ padding: "0.55rem 0.75rem", background: "rgba(255,255,255,0.03)" }}>
                  <p style={{ fontSize: "0.67rem", color: G.muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>{logo.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM GRID ──────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", borderTop: `1px solid ${G.line}`, background: "rgba(7,17,31,0.85)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "0.7rem" }}>Full Ecosystem</p>
          <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 400, color: G.ink, marginBottom: "0.65rem" }}>
            33+ Verticals. One Operating System.
          </h2>
          <p style={{ color: G.muted, fontSize: "0.88rem", marginBottom: "2.5rem" }}>
            Every platform below is a live, deployable route in the TROPTIONS Institutional OS.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))", gap: "0.55rem" }}>
            {VERTICALS.map(v => (
              <Link key={v.name} href={v.href} style={{ display: "flex", flexDirection: "column", gap: "0.3rem", padding: "0.82rem 0.95rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${G.line}`, borderRadius: 8, textDecoration: "none" }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.14rem 0.38rem", borderRadius: 4, background: TAG_BG[v.tag] ?? "#1a1a1a", color: G.goldL, display: "inline-block", width: "fit-content" }}>{v.tag}</span>
                <span style={{ fontSize: "0.85rem", color: G.ink, fontFamily: "'Palatino Linotype',Georgia,serif" }}>{v.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem 6.5rem", borderTop: `1px solid ${G.line}`, textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            <Image src="/assets/troptions/logos/troptions-tt-mark-gold.jpg" alt="TROPTIONS" width={88} height={88} style={{ borderRadius: 10, boxShadow: `0 0 70px rgba(200,149,42,0.28)` }} />
          </div>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: G.gold, textTransform: "uppercase", marginBottom: "1rem" }}>Institutional Access</p>
          <h2 style={{ fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 400, color: G.ink, marginBottom: "1.25rem" }}>
            Built for institutional participants.<br />Proof-backed. Always.
          </h2>
          <p style={{ color: G.muted, fontSize: "1rem", lineHeight: 1.82, marginBottom: "3rem" }}>
            Whether you are conducting diligence, seeking trade desk access, or deploying the TROPTIONS mark in your sector — the platform, proof room, and institutional stack are operational now.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/portal/troptions/dashboard" style={{ background: G.gold, color: "#090806", padding: "1rem 2.5rem", borderRadius: 8, fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Open Portal</Link>
            <Link href="/troptions/institutional" style={{ border: `1px solid ${G.line}`, color: G.goldL, padding: "1rem 2.5rem", borderRadius: 8, fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>Institutional Inquiry</Link>
            <Link href="/troptions/cis" style={{ border: `1px solid ${G.line}`, color: G.muted, padding: "1rem 2.5rem", borderRadius: 8, fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>CIS Package</Link>
          </div>
        </div>
      </section>

      {/* FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${G.line}`, padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <Image src="/assets/troptions/logos/troptions-tt-on-black.jpg" alt="TROPTIONS" width={30} height={30} style={{ borderRadius: 4 }} />
            <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "0.82rem", letterSpacing: "0.22em", color: G.muted, textTransform: "uppercase" }}>TROPTIONS</span>
            <span style={{ color: "#4a4540", fontSize: "0.72rem" }}>· Est. 2003</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Layer 1",   href: "/troptions/layer1" },
              { label: "Proof",     href: "/troptions/verification" },
              { label: "Wallets",   href: "/troptions/wallets" },
              { label: "History",   href: "/troptions/history" },
              { label: "Legal",     href: "/troptions/legal" },
              { label: "Contact",   href: "/troptions/contact" },
              { label: "LIVE",      href: "https://troptionslive.unykorn.org" },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: "#4a4540", textDecoration: "none", textTransform: "uppercase" }}>{l.label}</Link>
            ))}
          </div>
          <p style={{ fontSize: "0.7rem", color: "#3a3530", letterSpacing: "0.05em" }}>
            &copy; 2003&ndash;2026 TROPTIONS. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
