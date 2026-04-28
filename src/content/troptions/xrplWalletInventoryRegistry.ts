import type { WalletForensicsWalletRecord } from "@/content/troptions/walletForensicsRegistry";

// ── TROPTIONS XRPL Wallets ────────────────────────────────────────────────────
// These are the live TROPTIONS wallets deployed on XRPL mainnet 2026-04-28.
// All wallets are TROPTIONS-specific only. No OPTKAS or UnyKorn entries.
//
// Token: TROPTIONS IOU
// Issuer: rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ
// Supply: 100,000,000 TROPTIONS
// Price: $0.0114 | Market Cap: $1.1M | AMM TVL: $7.91

export const XRPL_WALLET_INVENTORY_REGISTRY: readonly WalletForensicsWalletRecord[] = [

  // ── TROPTIONS Issuer (Cold — master key, issues all TROPTIONS tokens) ──────
  {
    walletId: "xrpl-troptions-issuer",
    address: "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ",
    chain: "xrpl",
    label: "TROPTIONS Issuer (Cold)",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    role: "iou-issuer",
    firstSeen: "2026-04-28T08:34:51Z",
    lastSeen: "2026-04-28T08:35:00Z",
    currentBalance: "3 XRP funded",
    reserve: "2 XRP base reserve",
    availableBalance: "~1 XRP spendable",
    masterKeyStatus: "enabled",
    signingKeySeen: true,
    riskStatus: "low",
    notes: [
      "TROPTIONS IOU issuer — all 100,000,000 TROPTIONS tokens originated from this address.",
      "Funded with 3 XRP on 2026-04-28. Issued 100M TROPTIONS to distribution wallet.",
      "Issuer accounts must NOT hold trustlines to their own token.",
      "Keep master key cold. Never fund to AMM or DEX directly.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
      { label: "XRPL Token Info", url: "https://xrpl.org/token/TROPTIONS+rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ" },
    ],
  },

  // ── TROPTIONS Distribution + AMM (Warm — DEX maker, AMM LP) ──────────────
  {
    walletId: "xrpl-troptions-distribution-amm",
    address: "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt",
    chain: "xrpl",
    label: "TROPTIONS Distribution + AMM (Warm)",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    role: "treasury",
    firstSeen: "2026-04-28T08:34:51Z",
    lastSeen: "2026-04-28T08:35:40Z",
    currentBalance: "5 XRP funded + 100M TROPTIONS received",
    reserve: "2 XRP base + trustline reserves",
    availableBalance: "~3 XRP spendable",
    masterKeyStatus: "enabled",
    signingKeySeen: true,
    riskStatus: "low",
    notes: [
      "Received 100,000,000 TROPTIONS from issuer on 2026-04-28T08:35:00Z.",
      "Created TROPTIONS/XRP AMM pool — TVL $7.91 at launch.",
      "Initial DEX offers placed at 10,000 XRP/TROPTIONS price.",
      "Also handles distribution trustlines and holder onboarding.",
      "Funded with 5 XRP on 2026-04-28.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt" },
    ],
  },

  // ── TROPTIONS Trader A (DEX liquidity provider) ───────────────────────────
  {
    walletId: "xrpl-troptions-trader-a",
    address: "rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr",
    chain: "xrpl",
    label: "TROPTIONS Trader A",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    role: "trading",
    firstSeen: "2026-04-28T08:35:42Z",
    lastSeen: "2026-04-28T08:36:41Z",
    currentBalance: "unknown",
    masterKeyStatus: "enabled",
    signingKeySeen: true,
    riskStatus: "low",
    notes: [
      "Set trustline limit: 10,000,000,000,000,000 TROPTIONS on 2026-04-28T08:35:42Z.",
      "Placed DEX offer: Buy 2.5 XRP / Sell 166.5 TROPTIONS at 66.5985 XRP/TROPTIONS.",
      "Placed DEX offer: Buy 12 XRP / Sell 249.75 TROPTIONS at 20.812 XRP/TROPTIONS.",
      "Converted 2 XRP → 665.99 TROPTIONS via DEX path payment.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rsRy4Yic74sRn4GxYSm8Ve32zHC5mAEaGr" },
    ],
  },

  // ── TROPTIONS Trader B (DEX + AMM interaction) ────────────────────────────
  {
    walletId: "xrpl-troptions-trader-b",
    address: "rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu",
    chain: "xrpl",
    label: "TROPTIONS Trader B",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    role: "trading",
    firstSeen: "2026-04-28T08:35:50Z",
    lastSeen: "2026-04-28T08:37:22Z",
    currentBalance: "unknown",
    masterKeyStatus: "enabled",
    signingKeySeen: true,
    riskStatus: "low",
    notes: [
      "Set trustline limit: 10,000,000,000,000,000 TROPTIONS on 2026-04-28T08:35:50Z.",
      "Converted 1 XRP → 83.31 TROPTIONS via DEX on 2026-04-28T08:35:52Z.",
      "Placed DEX offer: Buy 1.5 XRP / Sell 20.83 TROPTIONS at 13.8845 XRP/TROPTIONS.",
      "Converted 83.31 TROPTIONS → 0.899 XRP (sell back) on 2026-04-28T08:37:20Z.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rMbHoVjLF2z3bS6Pg4NJcqoMsjyExn5LVu" },
    ],
  },

  // ── TROPTIONS Holder (trustline only) ─────────────────────────────────────
  {
    walletId: "xrpl-troptions-holder-a",
    address: "r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5",
    chain: "xrpl",
    label: "TROPTIONS Holder A",
    source: "TROPTIONS mainnet deployment — 2026-04-28",
    role: "related-wallet",
    firstSeen: "2026-04-28T08:35:42Z",
    lastSeen: "2026-04-28T08:50:41Z",
    currentBalance: "unknown",
    masterKeyStatus: "enabled",
    signingKeySeen: false,
    riskStatus: "low",
    notes: [
      "Set trustline limit: 1,000,000,000 TROPTIONS on 2026-04-28T08:35:42Z.",
      "Updated trustline to 0.00 limit on 2026-04-28T08:50:41Z (closed trustline).",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/r49zYHBsv1WJU6yXV4s2jm5YJDLGT1JFT5" },
    ],
  },
];

// -- Convenience lookups ─────────────────────────────────────────────────────
export const XRPL_ALL_ADDRESSES = XRPL_WALLET_INVENTORY_REGISTRY.map((w) => w.address);

// These are empty in the TROPTIONS-only registry — no compromised wallets.
export const XRPL_HIGH_RISK_ADDRESSES: readonly string[] = [];
export const XRPL_SIGNING_KEY_ADDRESSES: readonly string[] = [];
