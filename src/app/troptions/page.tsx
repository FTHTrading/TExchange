import Image from "next/image";
import Link from "next/link";
import CopyAddressButton from "@/components/troptions-evolution/CopyAddressButton";
import "@/styles/troptions-evolution.css";

export const metadata = {
  title: "TROPTIONS | Blockchain Infrastructure Hub",
  description:
    "TROPTIONS live token verification, Rust Layer 1 blockchain, Web3 infrastructure across XRPL, Stellar, and Polygon. 7 live wallets. 8 brand entities. 27 Rust crates.",
};

// â”€â”€ Static data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ISSUER = "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ";

const LIVE_WALLETS = [
  {
    label: "XRPL Issuer",
    role: "Master token issuer â€” 100M TROPTIONS",
    chain: "XRPL",
    address: "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ",
    status: "Live",
    explorers: [
      { label: "XRPL Ledger â†—",  url: "https://livenet.xrpl.org/accounts/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "XRPLorer â†—",     url: "https://xrplorer.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "XRPScan â†—",      url: "https://xrpscan.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "Bithomp â†—",      url: "https://bithomp.com/explorer/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
    ],
  },
  {
    label: "XRPL Distribution + AMM",
    role: "Distribution wallet Â· TROPTIONS/XRP AMM pool operator",
    chain: "XRPL",
    address: "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt",
    status: "Live",
    explorers: [
      { label: "XRPL Ledger â†—",  url: "https://livenet.xrpl.org/accounts/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
      { label: "XRPLorer â†—",     url: "https://xrplorer.com/account/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
    ],
  },
  {
    label: "XRPL DEX Trader A",
    role: "Active DEX trader Â· XRP â†” TROPTIONS",
    chain: "XRPL",
    address: "rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr",
    status: "Live",
    explorers: [
      { label: "XRPL Ledger â†—",  url: "https://livenet.xrpl.org/accounts/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
      { label: "XRPLorer â†—",     url: "https://xrplorer.com/account/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
    ],
  },
  {
    label: "XRPL DEX Trader B",
    role: "AMM + DEX round-trip trader",
    chain: "XRPL",
    address: "rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu",
    status: "Live",
    explorers: [
      { label: "XRPL Ledger â†—",  url: "https://livenet.xrpl.org/accounts/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
      { label: "XRPLorer â†—",     url: "https://xrplorer.com/account/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
    ],
  },
  {
    label: "XRPL Holder",
    role: "Trustline holder Â· acquired via DEX",
    chain: "XRPL",
    address: "r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5",
    status: "Live",
    explorers: [
      { label: "XRPL Ledger â†—",  url: "https://livenet.xrpl.org/accounts/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
      { label: "XRPLorer â†—",     url: "https://xrplorer.com/account/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
    ],
  },
  {
    label: "Stellar Issuer",
    role: "Stellar mainnet issuer Â· funded 5 XLM",
    chain: "Stellar",
    address: "GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4",
    status: "Funded",
    explorers: [
      { label: "Stellar Expert â†—", url: "https://stellar.expert/explorer/public/account/GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4" },
    ],
  },
  {
    label: "Stellar Distribution",
    role: "Stellar distribution + AMM liquidity Â· funded 15 XLM",
    chain: "Stellar",
    address: "GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC",
    status: "Funded",
    explorers: [
      { label: "Stellar Expert â†—", url: "https://stellar.expert/explorer/public/account/GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC" },
    ],
  },
] as const;

const L1_GROUPS = [
  {
    group: "Consensus & Settlement",
    badge: "bg-emerald-100 text-emerald-800",
    crates: ["consensus", "state", "runtime", "node"],
    note: "Block production, ledger state machine, and node operation",
  },
  {
    group: "Chain Bridges",
    badge: "bg-blue-100 text-blue-800",
    crates: ["bridge-xrpl", "bridge-stellar", "mbridge"],
    note: "XRPL and Stellar cross-chain settlement bridges",
  },
  {
    group: "Assets & Finance",
    badge: "bg-amber-100 text-amber-800",
    crates: ["assets", "amm", "rwa", "stablecoin", "nft", "trustlines"],
    note: "Token issuance, AMM pools, RWA receipts, NFTs, trustlines",
  },
  {
    group: "Compliance & Governance",
    badge: "bg-purple-100 text-purple-800",
    crates: ["compliance", "governance", "control-hub"],
    note: "Policy gates, governance votes, operator control plane",
  },
  {
    group: "Crypto & Security",
    badge: "bg-rose-100 text-rose-800",
    crates: ["crypto", "pq-crypto"],
    note: "Ed25519 signing + post-quantum cryptography layer",
  },
  {
    group: "Infrastructure",
    badge: "bg-slate-100 text-slate-700",
    crates: ["sdk", "rpc", "cli", "telemetry", "agora", "nil", "rln"],
    note: "SDK, JSON-RPC server, CLI, metrics, and relay network",
  },
  {
    group: "Identity & Genesis",
    badge: "bg-yellow-100 text-yellow-800",
    crates: ["brands", "genesis"],
    note: "8 brand entities embedded in L1 Â· deterministic genesis manifest",
  },
] as const;

const BRANDS = [
  { name: "TROPTIONS.ORG",           role: "Institutional Platform",    status: "Active",  chains: "XRPL Â· Stellar Â· Polygon Â· TSN" },
  { name: "Troptions Xchange",       role: "Exchange / Trade Platform", status: "Draft",   chains: "XRPL Â· Stellar Â· TSN" },
  { name: "Troptions Unity Token",   role: "Token / Digital Asset",     status: "Draft",   chains: "XRPL Â· Stellar Â· TSN" },
  { name: "Troptions University",    role: "Education / Academy",       status: "Active",  chains: "XRPL Â· TSN" },
  { name: "Troptions TV Network",    role: "Media / Broadcasting",      status: "Draft",   chains: "XRPL Â· TSN" },
  { name: "Real Estate Connections", role: "Real Estate / RWA",         status: "Draft",   chains: "XRPL Â· Polygon Â· TSN" },
  { name: "Green-N-Go Solar",        role: "Energy / ESG Asset",        status: "Draft",   chains: "XRPL Â· TSN" },
  { name: "HOTRCW",                  role: "Utility / Service",         status: "Review",  chains: "TSN" },
] as const;

const CHAIN_STATUS = [
  { chain: "XRPL",     readiness: 75, note: "Issuer live Â· AMM live Â· DEX live Â· 100M tokens issued" },
  { chain: "Stellar",  readiness: 40, note: "Accounts funded Â· trustline + AMM activation next" },
  { chain: "Polygon",  readiness: 50, note: "QuantumVaultFactory deployed Â· provider config pending" },
  { chain: "TSN (L1)", readiness: 100, note: "All 8 brand entities registered Â· genesis manifest locked" },
] as const;

const TOKEN_STATS = [
  { label: "Token",      value: "TROPTIONS" },
  { label: "Supply",     value: "100,000,000" },
  { label: "Price",      value: "$0.0114 USD" },
  { label: "Market Cap", value: "$1.14 M" },
  { label: "AMM TVL",    value: "$7.91" },
  { label: "Holders",    value: "3 accounts" },
  { label: "Trustlines", value: "4 established" },
  { label: "Network",    value: "XRPL Mainnet" },
] as const;

export default function TroptionsOverviewPage() {
  return (
    <main className="te-page">
      <div className="te-wrap" style={{ gap: "1.75rem" }}>

        {/* â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <header className="te-panel overflow-hidden">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/troptions/logos/troptions-logo-new-official.jpg"
                  alt="TROPTIONS official logo"
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-xl object-contain"
                  priority
                />
                <div>
                  <p className="te-kicker">Live on XRPL Â· Stellar Mainnet Â· Rust Layer 1</p>
                  <h1 className="te-heading">TROPTIONS Blockchain Hub</h1>
                </div>
              </div>
              <p className="te-subheading max-w-2xl">
                Verify the live token on-chain. Explore the Rust Layer 1 settlement network. Review all 7 wallets and 8 registered brand entities â€” everything verifiable in one place.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://xrplorer.com/account/${ISSUER}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
                >
                  XRPLorer â†—
                </a>
                <a
                  href={`https://livenet.xrpl.org/accounts/${ISSUER}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  XRPL Ledger â†—
                </a>
                <a
                  href={`https://xrpl.org/token/TROPTIONS+${ISSUER}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  XRPL.org Token â†—
                </a>
                <Link href="/troptions/wallets" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  All Wallets â†’
                </Link>
              </div>
            </div>
            {/* Quick stats column */}
            <div className="grid min-w-55 grid-cols-2 gap-2">
              {TOKEN_STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">{s.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* â•â• LIVE TOKEN VERIFICATION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="te-future-panel">
          <p className="te-kicker" style={{ color: "#f0cf82" }}>Live Token Verification â€” XRPL Mainnet</p>
          <h2 className="te-heading light mt-2">Verify TROPTIONS On-Chain</h2>
          <p className="mt-3 text-slate-300 leading-7">
            The TROPTIONS IOU token is live on XRPL mainnet. The issuer address below is the single source of truth. Click any explorer link to independently verify the supply, trustlines, AMM pool, and trade history.
          </p>

          {/* Issuer address block */}
          <div className="mt-5 rounded-xl border border-amber-400/40 bg-black/30 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Issuer Address (XRPL Mainnet)</p>
            <p className="mt-2 break-all font-mono text-sm text-white">{ISSUER}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyAddressButton address={ISSUER} />
              <a href={`https://xrplorer.com/account/${ISSUER}`} target="_blank" rel="noreferrer noopener"
                className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-600">XRPLorer â†—</a>
              <a href={`https://livenet.xrpl.org/accounts/${ISSUER}`} target="_blank" rel="noreferrer noopener"
                className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-600">XRPL Ledger â†—</a>
              <a href={`https://xrpscan.com/account/${ISSUER}`} target="_blank" rel="noreferrer noopener"
                className="rounded-md bg-teal-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-teal-700">XRPScan â†—</a>
              <a href={`https://bithomp.com/explorer/${ISSUER}`} target="_blank" rel="noreferrer noopener"
                className="rounded-md bg-purple-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-purple-700">Bithomp â†—</a>
              <a href={`https://xrpl.org/token/TROPTIONS+${ISSUER}`} target="_blank" rel="noreferrer noopener"
                className="rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-600">Token Page â†—</a>
            </div>
          </div>

          {/* Verification checklist */}
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { check: "âœ“", label: "100M TROPTIONS issued", detail: "Full supply on XRPL mainnet" },
              { check: "âœ“", label: "AMM Pool live",         detail: "TROPTIONS / XRP pair active" },
              { check: "âœ“", label: "DEX trades executed",   detail: "5 trades confirmed on-chain" },
              { check: "âœ“", label: "4 trustlines active",   detail: "Independent wallets verified" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-emerald-400/30 bg-emerald-900/30 p-3">
                <p className="text-lg font-bold text-emerald-400">{item.check}</p>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* â•â• RUST LAYER 1 BLOCKCHAIN â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="te-panel">
          <p className="te-kicker">Rust Layer 1 Â· Troptions Settlement Network (TSN)</p>
          <h2 className="te-heading mt-2">What&apos;s Been Built</h2>
          <p className="te-subheading mt-3 max-w-3xl">
            A full Rust blockchain built from scratch â€” 27 crates covering consensus, settlement, cross-chain bridges (XRPL + Stellar), RWA, NFTs, post-quantum crypto, compliance, and governance. All 8 brand entities are registered in the L1 genesis manifest.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {L1_GROUPS.map((g) => (
              <div key={g.group} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-800">{g.group}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${g.badge}`}>
                    {g.crates.length} crates
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{g.note}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.crates.map((c) => (
                    <span key={c} className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] text-slate-700">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chain readiness bars */}
          <div className="mt-6">
            <p className="te-kicker">Multi-Chain Deployment Readiness</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {CHAIN_STATUS.map((c) => (
                <div key={c.chain} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">{c.chain}</p>
                    <span className="text-sm font-bold text-amber-700">{c.readiness}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-amber-500"
                      style={{ width: `${c.readiness}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* â•â• 8 BRAND ENTITIES (registered in L1) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="te-panel">
          <p className="te-kicker">8 Brand Entities Â· Registered in Rust L1 Genesis</p>
          <h2 className="te-heading mt-2">The TROPTIONS Ecosystem</h2>
          <p className="te-subheading mt-3">
            Every entity below is embedded in the TSN genesis manifest â€” deterministically hashed, IPFS-pinned, and verifiable on-chain.
          </p>
          <div className="mt-5 te-grid-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {BRANDS.map((b) => (
              <div key={b.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-800 leading-snug">{b.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    b.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                    b.status === "Draft"  ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>{b.status}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{b.role}</p>
                <p className="mt-2 text-[11px] font-mono text-slate-400">{b.chains}</p>
              </div>
            ))}
          </div>
        </section>

        {/* â•â• 7 LIVE WALLETS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="te-future-panel">
          <p className="te-kicker" style={{ color: "#f0cf82" }}>7 Live Wallets Â· XRPL + Stellar Mainnet</p>
          <h2 className="te-heading light mt-2">Every Address is Verifiable</h2>
          <p className="mt-2 text-slate-300 leading-7">
            All wallets were funded and confirmed on 2026-04-28. Click any explorer link to verify on-chain â€” no trust required.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {LIVE_WALLETS.map((w) => (
              <div key={w.address} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{w.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{w.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      w.chain === "XRPL" ? "bg-blue-900/60 text-blue-300" : "bg-indigo-900/60 text-indigo-300"
                    }`}>{w.chain}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      w.status === "Live" ? "bg-emerald-900/60 text-emerald-300" : "bg-amber-900/60 text-amber-300"
                    }`}>{w.status}</span>
                  </div>
                </div>
                <p className="mt-2 break-all font-mono text-[11px] text-slate-400">{w.address}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CopyAddressButton address={w.address} />
                  {w.explorers.map((ex) => (
                    <a key={ex.url} href={ex.url} target="_blank" rel="noreferrer noopener"
                      className="rounded-md border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition hover:bg-white/10">
                      {ex.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/troptions/wallets" className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600">
              Full Wallet Showcase â†’
            </Link>
          </div>
        </section>

        {/* â•â• QUICK NAVIGATION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="te-panel">
          <p className="te-kicker">Quick Navigation</p>
          <h2 className="te-heading mt-2">Explore Deeper</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/troptions/wallets",          label: "Wallet Showcase",      desc: "All 7 wallets with live stats and explorer links" },
              { href: "/troptions/xrpl-platform",    label: "XRPL Platform",        desc: "Live market data, AMM, DEX, order books" },
              { href: "/troptions/ecosystem",        label: "Ecosystem",            desc: "Full brand entity and chain registration overview" },
              { href: "/troptions/rwa",              label: "Real World Assets",    desc: "RWA issuance, receipts, and proof-gated workflows" },
              { href: "/troptions/wallet-forensics", label: "Wallet Forensics",     desc: "Investigate wallet relationships and fund flows" },
              { href: "/troptions/history",          label: "TROPTIONS History",    desc: "Origins, milestones, and ecosystem evolution" },
              { href: "/troptions/xrpl",             label: "XRPL Overview",        desc: "XRPL trust setup, compliance, and issuance guide" },
              { href: "/troptions/stellar",          label: "Stellar Overview",     desc: "Stellar account setup and anchor readiness" },
              { href: "/troptions/chains",           label: "All Chains",           desc: "Multi-chain status: XRPL, Stellar, Polygon, TSN" },
            ].map((nav) => (
              <Link key={nav.href} href={nav.href}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-300 hover:bg-amber-50">
                <p className="font-semibold text-slate-800">{nav.label}</p>
                <p className="mt-1 text-xs text-slate-500">{nav.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* â•â• DISCLAIMER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <footer className="te-panel">
          <p className="text-xs leading-6 text-slate-500">
            <strong>Disclaimer:</strong> TROPTIONS is not a bank, broker-dealer, exchange, custodian, or licensed financial institution.
            All on-chain data shown links to public blockchain explorers and can be independently verified.
            Token stats (price, market cap) are informational snapshots and not financial advice.
            All Rust L1 simulation code is marked <code>simulation_only: true</code>.
          </p>
        </footer>

      </div>
    </main>
  );
}
