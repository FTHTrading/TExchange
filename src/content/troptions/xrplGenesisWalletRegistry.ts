/**
 * XRPL Genesis Wallet Registry — TROPTIONS Only
 *
 * Defines all TROPTIONS wallet roles on XRPL mainnet.
 * Includes live deployed wallets (issuer + distribution) and
 * pending-generation specs for future TROPTIONS brand wallets.
 *
 * SAFETY RULES:
 * - No private keys, seeds, or secrets in this file
 * - All entries are read-only references or pending-generation specs
 * - Live execution requires board authorization + legal sign-off
 *
 * Live deployment confirmed 2026-04-28.
 * OPTKAS and compromised wallet entries have been removed.
 */

export type XrplWalletStatus =
  | "active_read_only"
  | "active_trustlines_established"
  | "compromised_do_not_use"
  | "pending_fresh_generation"
  | "pending_model_review"
  | "suspended";

export interface XrplGenesisWalletRecord {
  readonly id: string;
  readonly role: string;
  readonly brandId: string | null;
  readonly address: string;
  readonly status: XrplWalletStatus;
  readonly notes: string;
  readonly requiresLegalClearance: boolean;
  readonly xrplStandard?: "XLS-20" | "XLS-33";
}

export const XRPL_GENESIS_WALLET_REGISTRY: readonly XrplGenesisWalletRecord[] = [
  // ── Active wallets — live on XRPL mainnet ───────────────────────────────────
  {
    id: "xrpl-troptions-org-issuer",
    role: "troptions-org-issuer",
    brandId: "troptions-org",
    address: "rPF2M1QjdVh1hkNgmMMTkT9qMU7tA7Wds3",
    status: "active_read_only",
    notes:
      "TROPTIONS IOU issuer (cold reserve). Active for read/trust-line operations. Currency hex: 54524F5054494F4E530000000000000000000000.",
    requiresLegalClearance: false,
  },
  {
    id: "xrpl-troptions-issuer-live",
    role: "troptions-issuer-live",
    brandId: "troptions-org",
    address: "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ",
    status: "active_trustlines_established",
    notes:
      "TROPTIONS live issuer — deployed 2026-04-28. Issued 100,000,000 TROPTIONS IOU. XRPL AMM active, DEX trading live, 3 holders, 4 trustlines. Price $0.0114 · Market Cap $1.1M.",
    requiresLegalClearance: false,
  },
  {
    id: "xrpl-troptions-distribution-live",
    role: "troptions-distribution-live",
    brandId: "troptions-org",
    address: "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt",
    status: "active_trustlines_established",
    notes:
      "TROPTIONS distribution + AMM wallet — deployed 2026-04-28. Received 100M TROPTIONS from issuer. Created TROPTIONS/XRP AMM pool. DEX orders placed. AMM TVL $7.91.",
    requiresLegalClearance: false,
  },

  // ── Pending fresh generation ─────────────────────────────────────────────────
  {
    id: "xrpl-troptions-xchange-wallet",
    role: "troptions-xchange-wallet",
    brandId: "troptions-xchange",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "Exchange coordination wallet for TROPTIONSXCHANGE.IO. Must be generated fresh via Xumm or hardware wallet. ATS/exchange licensing review required before live activation.",
    requiresLegalClearance: true,
  },
  {
    id: "xrpl-unity-token-mpt-issuer",
    role: "unity-token-mpt-issuer",
    brandId: "troptions-unity-token",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "XLS-33 MPT issuer for Troptions Unity Token (TUT). Isolated fresh wallet required. Securities counsel review + board authorization required before any MPTIssuanceCreate transaction.",
    requiresLegalClearance: true,
    xrplStandard: "XLS-33",
  },
  {
    id: "xrpl-university-nft-issuer",
    role: "university-nft-issuer",
    brandId: "troptions-university",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "XLS-20 NFT issuer for Troptions University credential certificates. Can be activated after wallet generation — no securities issue.",
    requiresLegalClearance: false,
    xrplStandard: "XLS-20",
  },
  {
    id: "xrpl-tv-network-nft-issuer",
    role: "tv-network-nft-issuer",
    brandId: "troptions-tv-network",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "XLS-20 NFT issuer for Troptions Television Network media access tokens. Requires FCC compliance review for broadcast content.",
    requiresLegalClearance: true,
    xrplStandard: "XLS-20",
  },
  {
    id: "xrpl-real-estate-rwa-issuer",
    role: "real-estate-rwa-issuer",
    brandId: "real-estate-connections",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "XRPL IOU / NFT issuer for TheRealEstateConnections.com RWA receipts. Real estate brokerage + securities review required before activation.",
    requiresLegalClearance: true,
  },
  {
    id: "xrpl-solar-rwa-issuer",
    role: "solar-rwa-issuer",
    brandId: "green-n-go-solar",
    address: "PENDING_FRESH_GENERATION",
    status: "pending_fresh_generation",
    notes:
      "XRPL issuer for Green-N-Go Solar energy RWA receipts and REC NFTs. Energy asset tokenization subject to CFTC/SEC/state utility review.",
    requiresLegalClearance: true,
    xrplStandard: "XLS-20",
  },
  {
    id: "xrpl-hotrcw-service-wallet",
    role: "hotrcw-service-wallet",
    brandId: "hotrcw",
    address: "PENDING_MODEL_REVIEW",
    status: "pending_model_review",
    notes:
      "HOTRCW service model requires confirmation with Bryan before wallet role is defined. MSB licensing review if payments are intermediated.",
    requiresLegalClearance: true,
  },
];

/** Get all active (non-compromised) wallets */
export function getActiveXrplWallets(): XrplGenesisWalletRecord[] {
  return XRPL_GENESIS_WALLET_REGISTRY.filter(
    (w) => w.status === "active_read_only" || w.status === "active_trustlines_established",
  );
}

/** Get all pending-generation wallets — these need to be created before going live */
export function getPendingXrplWallets(): XrplGenesisWalletRecord[] {
  return XRPL_GENESIS_WALLET_REGISTRY.filter(
    (w) => w.status === "pending_fresh_generation" || w.status === "pending_model_review",
  );
}

/** Get all Troptions live issuer + distribution wallets */
export function getLiveTroptionsWallets(): XrplGenesisWalletRecord[] {
  return XRPL_GENESIS_WALLET_REGISTRY.filter(
    (w) => w.brandId === "troptions-org" && w.status === "active_trustlines_established",
  );
}
