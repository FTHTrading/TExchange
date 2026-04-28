import Image from "next/image";
import Link from "next/link";
import CopyAddressButton from "@/components/troptions-evolution/CopyAddressButton";
import { Card, Badge, SectionHeader, StatCard, StatusBadge } from "@/components/ui";

export const metadata = {
  title: "TROPTIONS - Live Digital Asset on XRPL & Stellar",
  description:
    "TROPTIONS is a live digital asset issued on XRPL Mainnet with 100M tokens, an active AMM pool, and a full Rust Layer 1 blockchain. Verify everything on-chain independently.",
};

const ISSUER = "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ";
const DISTRIBUTION = "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt";
const AMM_ACCOUNT = "rBU6exSQHkrTog6n1F5RX8gzcUrXoniGcp";
const STELLAR_ISSUER = "GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4";
const STELLAR_DISTRIBUTION = "GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC";

const PROOF_CHECKS = [
  { label: "100M Tokens Issued",    sub: "99,999,999.97 TROPTIONS - obligations on issuer" },
  { label: "AMM Pool Active",       sub: "TROPTIONS / XRP - bootstrap liquidity" },
  { label: "3 On-Chain Trustlines", sub: "2 TROPTIONS-controlled + 1 external (not endorsed)" },
  { label: "Genesis Locked",        sub: "8 brand entities, IPFS-pinned manifest" },
] as const;

const STATS = [
  { value: "100M",  label: "Tokens Issued" },
  { value: "3",     label: "On-Chain Trustlines" },
  { value: "27",    label: "Rust L1 Crates" },
  { value: "8",     label: "Brand Entities" },
] as const;

const WALLETS = [
  {
    label: "XRPL Issuer (Master)",
    role: "Sole issuer of all 100M TROPTIONS - obligations: 99,999,999.97",
    chain: "XRPL",
    address: ISSUER,
    explorers: [
      { label: "XRPL Ledger", url: `https://livenet.xrpl.org/accounts/${ISSUER}` },
      { label: "Bithomp",     url: `https://bithomp.com/explorer/${ISSUER}` },
      { label: "XRPScan",     url: `https://xrpscan.com/account/${ISSUER}` },
    ],
  },
  {
    label: "XRPL Distribution",
    role: "Treasury - holds 99,999,000 TROPTIONS for AMM seeding & distribution",
    chain: "XRPL",
    address: DISTRIBUTION,
    explorers: [
      { label: "XRPL Ledger", url: `https://livenet.xrpl.org/accounts/${DISTRIBUTION}` },
      { label: "Bithomp",     url: `https://bithomp.com/explorer/${DISTRIBUTION}` },
    ],
  },
  {
    label: "XRPL AMM Pool Account",
    role: "Protocol-owned AMM - 2.876 XRP / 348.93 TROPTIONS, fee 0.3%",
    chain: "XRPL",
    address: AMM_ACCOUNT,
    explorers: [
      { label: "XRPL Ledger", url: `https://livenet.xrpl.org/accounts/${AMM_ACCOUNT}` },
      { label: "Bithomp",     url: `https://bithomp.com/explorer/${AMM_ACCOUNT}` },
    ],
  },
  {
    label: "Stellar Issuer",
    role: "Stellar mainnet issuer - declared (1 LP, awaiting trustlines)",
    chain: "Stellar",
    address: STELLAR_ISSUER,
    explorers: [
      { label: "Stellar Expert", url: `https://stellar.expert/explorer/public/account/${STELLAR_ISSUER}` },
    ],
  },
  {
    label: "Stellar Distribution",
    role: "Stellar distribution wallet - paired with Stellar issuer",
    chain: "Stellar",
    address: STELLAR_DISTRIBUTION,
    explorers: [
      { label: "Stellar Expert", url: `https://stellar.expert/explorer/public/account/${STELLAR_DISTRIBUTION}` },
    ],
  },
] as const;

const AMM_SNAPSHOT = {
  xrp: "2.876",
  troptions: "348.93",
  feePct: "0.3%",
  lpShares: "31,622.78",
  status: "Bootstrap pool - liquidity to be expanded by Distribution wallet",
};

const BRANDS = [
  { name: "TROPTIONS.ORG",           role: "Institutional Platform",            status: "Active" },
  { name: "Troptions Xchange",       role: "Exchange / Trade Platform",         status: "Draft"  },
  { name: "Troptions Unity Token",   role: "Token / Digital Asset",             status: "Live"   },
  { name: "Troptions University",    role: "Education / Academy (Fitzherbert)", status: "Active" },
  { name: "Troptions TV Network",    role: "Media / Broadcasting",              status: "Draft"  },
  { name: "Real Estate Connections", role: "Real Estate / RWA",                 status: "Draft"  },
  { name: "Green-N-Go Solar",        role: "Energy / ESG Asset",                status: "Draft"  },
  { name: "HOTRCW",                  role: "Utility / Service",                 status: "Review" },
] as const;

const WEB3_STACK = [
  { icon: "RWA",  title: "Real-World Assets",   desc: "Gold, energy, carbon, oil, treasury - proof-gated intake",        href: "/troptions-old-money/rwa" },
  { icon: "PoF",  title: "Proof of Funds",       desc: "Bank-issued source documents, AML-clean evidence ledger",          href: "/troptions-old-money/settlement" },
  { icon: "IOU",  title: "XRPL IOUs",            desc: "TROPTIONS as a native XRPL trust-line currency",                   href: "/troptions/xrpl-platform" },
  { icon: "MPT",  title: "MPTokens",             desc: "Multi-Purpose Tokens for permissioned issuance",                   href: "/troptions/xrpl-platform" },
  { icon: "NFT",  title: "NFTs",                 desc: "Brand and asset NFT issuance via XRPL native NFTokens",            href: "/troptions/ecosystem" },
  { icon: "NS",   title: "Namespaces",           desc: "Reserved brand namespaces in the L1 genesis manifest",             href: "/troptions/ecosystem" },
  { icon: "NIL",  title: "NIL Rights",           desc: "Name / Image / Likeness tokenization for creators",               href: "/troptions/ecosystem" },
  { icon: "AMM",  title: "AMM Liquidity",        desc: "Native XRPL AMM pool with TROPTIONS / XRP pair",                  href: `https://livenet.xrpl.org/accounts/${AMM_ACCOUNT}` },
  { icon: "EDU",  title: "Troptions University", desc: "Fitzherbert academy - sovereign curriculum, on-chain credentials", href: "https://fitzherbert.xxxiii.io/" },
] as const;

const L1_COMPONENTS = [
  { code: "POPEYE",    role: "Network / P2P",      desc: "libp2p gossipsub eyes & ears - propagates txs and blocks." },
  { code: "TEV",       role: "Cryptographic Gate", desc: "Ed25519 customs border - every payload signature-verified before runtime." },
  { code: "CONSENSUS", role: "BFT Finality",       desc: "Deterministic round-robin leader election with weighted 2/3+ quorum." },
  { code: "MARS",      role: "Runtime Brain",      desc: "Pure-function state machine - canonical balances, nonces, block production." },
  { code: "TAR",       role: "Persistence",        desc: "Atomic, crash-safe block + state storage with periodic snapshots." },
] as const;

const NAV_CARDS = [
  { href: "/troptions/layer1",                  icon: "L1",   title: "Layer 1 (Rust)",   desc: "POPEYE / TEV / CONSENSUS / MARS / TAR - 27 crates" },
  { href: "/troptions/xrpl-platform",           icon: "XRPL", title: "XRPL Platform",    desc: "XRPL Market Data, AMM, and DEX Readiness" },
  { href: "/troptions/wallets",                 icon: "WLT",  title: "Live Wallets",      desc: "All public addresses with explorer links" },
  { href: "/troptions/ecosystem",               icon: "ECO",  title: "Ecosystem",         desc: "Brand entities, NIL, namespaces, NFTs" },
  { href: "/troptions/rwa/axl-001",             icon: "RWA",  title: "RWA Series 001",    desc: "AXL-001 Alexandrite collateral package (gated)" },
  { href: "/troptions/xrpl-stellar-compliance", icon: "CMP",  title: "Compliance",        desc: "ISO 20022, AML controls, jurisdiction" },
  { href: "/troptions/transactions",            icon: "TXN",  title: "Transactions",      desc: "8 transaction categories - workflow, DD checklists" },
  { href: "/troptions/compliance/handbooks",    icon: "HBK",  title: "Handbooks",         desc: "Downloadable transaction guides, checklists, disclosures" },
  { href: "/troptions/kyc",                     icon: "KYC",  title: "KYC / Onboarding",  desc: "Document hash submission, oracle attestation, DID anchoring" },
] as const;

const CRATE_TAGS = [
  "consensus", "bridge-xrpl", "bridge-stellar", "rwa", "nft",
  "namespaces", "compliance", "pq-crypto", "governance", "genesis", "+17 more",
] as const;

export default function TroptionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071426] via-[#0c1e35] to-[#071426]">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-10 md:px-8">
        <div className="flex flex-wrap items-start gap-6">

          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#C9A84C]/60 bg-black">
            <Image
              src="/assets/troptions/logos/troptions-logo-new-official.jpg"
              alt="TROPTIONS"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </span>

          <div className="flex-1 min-w-[260px]">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#f0cf82]">
                Live on XRPL Mainnet
              </span>
            </span>

            <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-slate-50 mb-3">
              TROPTIONS
            </h1>
            <p className="text-[clamp(1rem,2vw,1.15rem)] leading-relaxed text-slate-400 max-w-2xl mb-7">
              A live digital asset on XRPL with a full Rust Layer 1 blockchain, 8 registered brand
              entities, and a Web3 stack covering RWA, NIL, namespaces, MPTs and NFTs - every claim is
              verifiable on-chain right now.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={`https://bithomp.com/explorer/${ISSUER}`}
                target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl bg-[#c99a3c] px-5 py-2.5 text-sm font-bold text-[#111827] transition-colors hover:bg-[#f0cf82]"
              >
                Verify on Bithomp
              </a>
              <a
                href={`https://livenet.xrpl.org/accounts/${ISSUER}`}
                target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.07] px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/[0.12]"
              >
                XRPL Ledger
              </a>
              <Link
                href="/portal/troptions/onboarding"
                className="inline-flex items-center rounded-xl border border-[#C9A84C]/45 px-5 py-2.5 text-sm font-semibold text-[#f0cf82] transition-colors hover:bg-[#C9A84C]/10"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#C9A84C]/20 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      {/* ON-CHAIN VERIFICATION */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Card variant="ivory" padding="md">
          <SectionHeader
            eyebrow="On-Chain Proof - XRPL Mainnet"
            heading="Verify TROPTIONS Yourself"
            body="The issuer address below is the single on-chain source of truth. Click any explorer to independently confirm the token supply, trustlines, AMM pool and trade history - no account required."
            theme="light"
          />

          <div className="rounded-xl bg-[#0f172a] p-5 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0cf82] mb-1.5">
              XRPL Issuer Address
            </p>
            <p className="font-mono text-sm text-slate-200 break-all mb-3">{ISSUER}</p>
            <div className="flex flex-wrap gap-2">
              <CopyAddressButton address={ISSUER} />
              {[
                { label: "Bithomp",     url: `https://bithomp.com/explorer/${ISSUER}` },
                { label: "XRPL Ledger", url: `https://livenet.xrpl.org/accounts/${ISSUER}` },
                { label: "XRPScan",     url: `https://xrpscan.com/account/${ISSUER}` },
              ].map((ex) => (
                <a
                  key={ex.url} href={ex.url}
                  target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/[0.14]"
                >
                  {ex.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {PROOF_CHECKS.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-3.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                  OK
                </span>
                <div>
                  <p className="text-sm font-bold text-green-900">{c.label}</p>
                  <p className="text-[12px] text-green-700 mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800 mb-1">
              AMM Liquidity Snapshot
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>{AMM_SNAPSHOT.xrp} XRP</strong> paired with{" "}
              <strong>{AMM_SNAPSHOT.troptions} TROPTIONS</strong> at fee {AMM_SNAPSHOT.feePct},{" "}
              {AMM_SNAPSHOT.lpShares} LP shares.{" "}
              <span className="text-amber-800">{AMM_SNAPSHOT.status}.</span>
            </p>
          </div>
        </Card>
      </section>

      {/* WALLETS */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <SectionHeader
          eyebrow="Verified On-Chain Wallets"
          heading="Every Address is Public TROPTIONS Infrastructure"
          body="These five wallets are the entire public surface of the TROPTIONS issuance. Every balance, trustline and trade is verifiable by anyone."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
          {WALLETS.map((w) => (
            <Card key={w.address} variant="glass" padding="sm">
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <p className="font-semibold text-slate-100 text-[15px]">{w.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">{w.role}</p>
                </div>
                <Badge variant={w.chain === "XRPL" ? "xrpl" : "stellar"}>{w.chain}</Badge>
              </div>
              <p className="font-mono text-[11px] text-slate-500 break-all bg-black/25 rounded-lg px-3 py-2 mb-3">
                {w.address}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <CopyAddressButton address={w.address} />
                {w.explorers.map((ex) => (
                  <a
                    key={ex.url} href={ex.url}
                    target="_blank" rel="noreferrer noopener"
                    className="inline-flex items-center rounded-lg border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-white/[0.12]"
                  >
                    {ex.label}
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Link
          href="/troptions/wallets"
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#C9A84C]/35 px-4 py-2.5 text-sm font-semibold text-[#f0cf82] transition-colors hover:bg-[#C9A84C]/10"
        >
          View Full Wallet Showcase
        </Link>
      </section>

      {/* WEB3 STACK */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Card variant="navy" padding="md">
          <SectionHeader
            eyebrow="Web3 Capability Stack"
            heading="What TROPTIONS Can Do Today"
            body="Native XRPL primitives combined with proof-gated RWA workflows, NIL rights tokenization, and a sovereign Layer 1 that anchors brand namespaces to on-chain identity."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {WEB3_STACK.map((c) => {
              const isExternal = c.href.startsWith("http");
              const inner = (
                <>
                  <Badge variant="mono" className="mb-3">{c.icon}</Badge>
                  <p className="font-semibold text-slate-100 text-[15px] mb-1">{c.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </>
              );
              return isExternal ? (
                <a
                  key={c.title} href={c.href}
                  target="_blank" rel="noreferrer noopener"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.07] hover:border-white/20"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={c.title} href={c.href}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.07] hover:border-white/20"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </Card>
      </section>

      {/* BRAND ENTITIES */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Card variant="ivory" padding="md">
          <SectionHeader
            eyebrow="8 Brand Entities - Registered in Rust L1 Genesis"
            heading="The TROPTIONS Ecosystem"
            body="Every entity is embedded in the TSN genesis manifest - deterministically hashed, IPFS-pinned, and verifiable on-chain as a reserved namespace."
            theme="light"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {BRANDS.map((b) => (
              <div
                key={b.name}
                className="flex items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5"
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-snug">{b.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{b.role}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* RUST L1 */}
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Card variant="navy" padding="md">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <SectionHeader
                eyebrow="Rust Layer 1 Blockchain"
                heading="Troptions Settlement Network (TSN)"
                body="A purpose-built Rust blockchain with 27 crates covering consensus, cross-chain bridges (XRPL + Stellar), RWA, NFTs, post-quantum crypto, compliance, and governance."
              />

              <div className="mb-5 flex flex-wrap items-center gap-2">
                {["POPEYE", "TEV", "CONSENSUS", "MARS", "TAR"].map((c, i, a) => (
                  <span key={c} className="flex items-center gap-2">
                    <Badge variant="mono">{c}</Badge>
                    {i < a.length - 1 && <span className="text-slate-600 text-sm">-&gt;</span>}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                {L1_COMPONENTS.map((c) => (
                  <div
                    key={c.code}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-sm font-extrabold text-[#f0cf82] tracking-wide">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {c.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {CRATE_TAGS.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[11px] rounded-lg border border-white/[0.12] bg-white/[0.06] text-slate-400 px-2.5 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/troptions/layer1"
                  className="inline-flex items-center rounded-xl bg-[#c99a3c] px-5 py-2.5 text-sm font-bold text-[#111827] transition-colors hover:bg-[#f0cf82]"
                >
                  Read Layer 1 Spec
                </Link>
                <a
                  href="https://github.com/FTHTrading/Troptions-L1"
                  target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.12]"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[130px]">
              {[
                { v: "27",   l: "Rust Crates" },
                { v: "4",    l: "Chains" },
                { v: "100%", l: "Genesis Locked" },
              ].map((s) => (
                <StatCard key={s.l} value={s.v} label={s.l} className="flex-1 lg:flex-none" />
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* EXPLORE */}
      <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
          Explore the Platform
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {NAV_CARDS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group block rounded-xl border border-white/[0.09] bg-white/[0.03] p-4 transition-all hover:bg-white/[0.07] hover:border-[#C9A84C]/30"
            >
              <Badge variant="mono" className="mb-3">{n.icon}</Badge>
              <p className="font-semibold text-slate-100 text-[15px] mb-1 group-hover:text-white transition-colors">
                {n.title}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                {n.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
