export interface DemoWalletAsset {
  readonly symbol: string;
  readonly assetType: "stablecoin" | "iou" | "regulated-asset" | "lp" | "nft" | "token";
  readonly purpose: string;
}

export interface DemoWalletLink {
  readonly label: string;
  readonly url: string;
}

export interface DemoWalletPoolReference {
  readonly pair: string;
  readonly network: "XRPL" | "Stellar";
  readonly status: "Live";
  readonly verificationUrl: string;
}

export interface DemoWalletShowcaseItem {
  readonly id: string;
  readonly label: string;
  readonly network: "XRPL" | "Stellar" | "XRPL + Stellar";
  readonly address?: string;
  readonly source: string;
  readonly walletType: "treasury" | "issuer" | "anchor" | "distribution" | "liquidity" | "evidence" | "trading";
  readonly summary: string;
  readonly assets: readonly DemoWalletAsset[];
  readonly explorerLinks: readonly DemoWalletLink[];
  readonly poolReferences?: readonly DemoWalletPoolReference[];
}

export const DEMO_WALLET_SHOWCASE: readonly DemoWalletShowcaseItem[] = [
  // ── TROPTIONS XRPL Wallets ──────────────────────────────────────────────────
  {
    id: "troptions-xrpl-issuer",
    label: "TROPTIONS XRPL Issuer",
    network: "XRPL",
    address: "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    walletType: "issuer",
    summary: "The master TROPTIONS token issuer on XRPL mainnet. Issued all 100,000,000 TROPTIONS IOU tokens. Price $0.0114 · Market Cap $1.1M · 3 holders · AMM TVL $7.91.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "Issuing authority for all 100M TROPTIONS on XRPL" },
      { symbol: "XRP", assetType: "token", purpose: "Base reserve and transaction fees" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "Token Info", url: "https://xrpl.org/token/TROPTIONS+rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
    ],
  },
  {
    id: "troptions-xrpl-distribution-amm",
    label: "TROPTIONS XRPL Distribution + AMM",
    network: "XRPL",
    address: "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    walletType: "distribution",
    summary: "TROPTIONS distribution wallet and AMM pool operator on XRPL. Received 100M TROPTIONS from issuer, created TROPTIONS/XRP AMM pool, and placed initial DEX orders.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "Primary distribution and AMM liquidity" },
      { symbol: "XRP", assetType: "lp", purpose: "TROPTIONS/XRP AMM pair — pool seed liquidity" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
    ],
    poolReferences: [
      { pair: "TROPTIONS / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/accounts/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
    ],
  },
  {
    id: "troptions-xrpl-trader-a",
    label: "TROPTIONS XRPL Trader A",
    network: "XRPL",
    address: "rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    walletType: "trading",
    summary: "Active TROPTIONS DEX trader on XRPL. Placed multiple offers and converted XRP ↔ TROPTIONS. Holds a maximum trustline of 10 quadrillion TROPTIONS.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "DEX trading — buying and selling TROPTIONS for XRP" },
      { symbol: "XRP", assetType: "token", purpose: "Trading pair base asset" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
    ],
  },
  {
    id: "troptions-xrpl-trader-b",
    label: "TROPTIONS XRPL Trader B",
    network: "XRPL",
    address: "rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    walletType: "trading",
    summary: "Active TROPTIONS DEX and AMM participant on XRPL. Converted 1 XRP → 83.31 TROPTIONS, placed offers, then sold back for 0.899 XRP.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "AMM and DEX interaction — buy/sell round trip" },
      { symbol: "XRP", assetType: "token", purpose: "Trading pair base asset" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
    ],
  },
  {
    id: "troptions-xrpl-holder-a",
    label: "TROPTIONS XRPL Holder A",
    network: "XRPL",
    address: "r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    walletType: "treasury",
    summary: "TROPTIONS trustline holder on XRPL mainnet. Established a trustline to the TROPTIONS issuer and holds a TROPTIONS balance acquired from the distribution wallet.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "Trustline holder — acquired TROPTIONS via DEX or direct transfer" },
      { symbol: "XRP", assetType: "token", purpose: "Reserve and transaction fees" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
      { label: "XRPScan", url: "https://xrpscan.com/account/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
    ],
  },

  // ── TROPTIONS Stellar Wallets ─────────────────────────────────────────────
  {
    id: "troptions-stellar-issuer",
    label: "TROPTIONS Stellar Issuer",
    network: "Stellar",
    address: "GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4",
    source: "TROPTIONS mainnet deployment — 2026-04-28. Funded 5 XLM (ledger 62321764)",
    walletType: "issuer",
    summary: "TROPTIONS token issuer on Stellar mainnet. Funded with 5 XLM on 2026-04-28 (ledger 62321764). Master authority for issuing TROPTIONS on the Stellar network.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "Stellar-side TROPTIONS issuance authority" },
      { symbol: "XLM", assetType: "token", purpose: "Base reserve and transaction fees" },
    ],
    explorerLinks: [
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public/account/GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4" },
      { label: "Stellarchain", url: "https://stellarchain.io/accounts/GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4" },
    ],
  },
  {
    id: "troptions-stellar-distribution",
    label: "TROPTIONS Stellar Distribution",
    network: "Stellar",
    address: "GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC",
    source: "TROPTIONS mainnet deployment — 2026-04-28. Funded 15 XLM (ledger 62321765)",
    walletType: "distribution",
    summary: "TROPTIONS distribution and AMM liquidity wallet on Stellar mainnet. Funded with 15 XLM on 2026-04-28 (ledger 62321765). Holds issued TROPTIONS for controlled release.",
    assets: [
      { symbol: "TROPTIONS", assetType: "iou", purpose: "Stellar TROPTIONS distribution and AMM liquidity" },
      { symbol: "XLM", assetType: "lp", purpose: "TROPTIONS/XLM AMM pool and trustline reserves" },
    ],
    explorerLinks: [
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public/account/GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC" },
      { label: "Stellarchain", url: "https://stellarchain.io/accounts/GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC" },
    ],
    poolReferences: [
      { pair: "TROPTIONS / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public/account/GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC" },
    ],
  },
];
