export interface XrplIouRecord {
  readonly currency: string;
  readonly issuer: string;
  readonly issuerLabel?: string;
  readonly category: "stablecoin" | "commodity" | "bond" | "custom-token" | "attestation" | "platform-token" | "rwa-receipt";
  readonly note: string;
  readonly rwaDescription?: string;
  readonly onChainStatus?: "issued" | "pending" | "draft";
  readonly explorerUrl?: string;
}

// ── TROPTIONS Gateway Issuer Addresses ───────────────────────────────────────
export const TROPTIONS_XRPL_ISSUER    = "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ";
export const TROPTIONS_XRPL_DISTRIBUTOR = "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt";
export const TROPTIONS_STELLAR_ISSUER  = "GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4";

export const XRPL_IOU_REGISTRY: readonly XrplIouRecord[] = [
  // ── TROPTIONS Native Token — primary platform IOU (ISSUED on mainnet 2026-04-28) ──
  {
    currency: "TROPTIONS",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway Issuer (Cold)",
    category: "platform-token",
    note: "TROPTIONS native IOU. 100,000,000 supply issued on XRPL mainnet. Authorized trustlines required. Freeze and clawback enabled. Verified issuer.",
    rwaDescription: "Commercial trade instrument backed by documented barter agreements, real property positions, and the TROPTIONS platform asset reserve. Each unit represents a fractional claim on the TROPTIONS Gateway's verified real-world asset portfolio including real estate, equipment, solar energy, and mobile medical assets.",
    onChainStatus: "issued",
    explorerUrl: "https://xrpscan.com/account/rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ",
  },

  // ── Stablecoin IOUs ──────────────────────────────────────────────────────────
  {
    currency: "USDT",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Stablecoin IOU)",
    category: "stablecoin",
    note: "TROPTIONS Gateway USDT IOU. Currency code alone is insufficient. Verify issuer, liquidity, and redemption path.",
    rwaDescription: "Gateway-issued receipt representing a claim on USD Tether (USDT) held in custody by the TROPTIONS Gateway. Redeemable under documented gateway terms.",
    onChainStatus: "draft",
  },
  {
    currency: "EUR",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Stablecoin IOU)",
    category: "stablecoin",
    note: "Treat as IOU unless issuer and redemption are verified.",
    rwaDescription: "Euro-denominated IOU receipt. Value depends on issuer reserves and redemption agreement.",
    onChainStatus: "draft",
  },
  {
    currency: "GOLD",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Commodity IOU)",
    category: "commodity",
    note: "Issued-asset representation of vaulted gold. Not physical metal custody proof unless paired with assay certificate and vault agreement.",
    rwaDescription: "Gold reserve receipt. Each unit represents one troy ounce of vaulted gold with assay certificate required for redemption. Independent third-party vault statement required.",
    onChainStatus: "draft",
  },
  {
    currency: "GBP",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Stablecoin IOU)",
    category: "stablecoin",
    note: "Issuer acceptance and redemption terms determine real value.",
    rwaDescription: "Sterling-denominated IOU receipt. Gateway-issued, requires reserve verification and active redemption path.",
    onChainStatus: "draft",
  },
  {
    currency: "USD",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Stablecoin IOU)",
    category: "stablecoin",
    note: "USD code is not automatically bank USD on XRPL. Requires full 1:1 reserve and legal review before issuance.",
    rwaDescription: "US dollar IOU receipt. Requires verified bank custody, reserve audit, and money transmission compliance review before live issuance.",
    onChainStatus: "draft",
  },
  {
    currency: "DONK",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Gateway (Custom Token)",
    category: "custom-token",
    note: "Custom issued token. Validate issuer controls and market depth.",
    rwaDescription: "Community custom token. Represents platform engagement and utility within the TROPTIONS ecosystem.",
    onChainStatus: "draft",
  },

  // ── Legacy asset receipts ────────────────────────────────────────────────────
  {
    currency: "LEGACY",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Legacy Token Issuer",
    category: "custom-token",
    note: "Legacy project token representation; evaluate trustline and issuer risk.",
    rwaDescription: "Legacy TROPTIONS issuance receipt. Represents historical deal positions and prior platform asset claims. Subject to legacy governance terms.",
    onChainStatus: "draft",
  },
  {
    currency: "SOVBND",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Legacy Token Issuer",
    category: "bond",
    note: "Sovereign bond-style settlement instrument. Maps to issuer IOU model — no government guarantee.",
    rwaDescription: "Sovereign bond-style receipt. Represents a structured settlement instrument backed by documented asset positions. Not a government-issued bond — a private structured claim.",
    onChainStatus: "draft",
  },
  {
    currency: "PETRO",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Legacy Token Issuer",
    category: "commodity",
    note: "Commodity-themed IOU; verify issuer and redemption ability.",
    rwaDescription: "Petroleum commodity claim receipt. Represents a documented position in petroleum or energy commodity assets held or contracted by the TROPTIONS Gateway.",
    onChainStatus: "draft",
  },
  {
    currency: "ATTEST",
    issuer: TROPTIONS_XRPL_ISSUER,
    issuerLabel: "TROPTIONS Legacy Token Issuer",
    category: "attestation",
    note: "Attestation-style issued asset. Serves as cryptographic evidence marker, not a value claim.",
    rwaDescription: "Cryptographic attestation evidence marker. On-chain proof-of-fact token used to anchor document hashes, deal confirmations, or compliance certifications to the XRPL ledger.",
    onChainStatus: "draft",
  },
];

export const XRPL_IOU_EXPLAINER = {
  title: "Why the big USDT/EUR/GOLD numbers may not equal real funds",
  bullets: [
    "On XRPL, issued currencies are IOUs.",
    "Currency code alone is not enough.",
    "USDT on XRPL is not automatically official Tether.",
    "USD is not automatically bank USD.",
    "Real value depends on issuer, liquidity, redemption, and acceptance.",
    "Always check currency code plus issuer address.",
    "Native XRP is different from IOUs.",
  ] as const,
} as const;
