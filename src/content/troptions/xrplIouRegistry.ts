export interface XrplIouRecord {
  readonly currency: string;
  readonly issuer: string;
  readonly category: "stablecoin" | "commodity" | "bond" | "custom-token" | "attestation";
  readonly note: string;
}

export const XRPL_IOU_REGISTRY: readonly XrplIouRecord[] = [
  {
    currency: "USDT",
    issuer: "unknown",
    category: "stablecoin",
    note: "Currency code alone is insufficient. Verify issuer, liquidity, and redemption path.",
  },
  { currency: "EUR", issuer: "unknown", category: "stablecoin", note: "Treat as IOU unless issuer and redemption are verified." },
  { currency: "GOLD", issuer: "unknown", category: "commodity", note: "Issued-asset representation, not physical metal custody proof." },
  { currency: "GBP", issuer: "unknown", category: "stablecoin", note: "Issuer acceptance and redemption determine real value." },
  { currency: "USD", issuer: "unknown", category: "stablecoin", note: "USD code is not automatically bank USD on XRPL." },
  { currency: "DONK", issuer: "unknown", category: "custom-token", note: "Custom issued token. Validate issuer controls and market depth." },
  { currency: "LEGACY", issuer: "unknown", category: "custom-token", note: "Legacy project token representation; evaluate trustline and issuer risk." },
  { currency: "SOVBND", issuer: "unknown", category: "bond", note: "Bond-like code still maps to an issuer IOU model." },
  { currency: "PETRO", issuer: "unknown", category: "commodity", note: "Commodity-themed IOU; verify issuer and redemption ability." },
  { currency: "ATTEST", issuer: "unknown", category: "attestation", note: "Attestation-style issued asset, not native XRP value." },
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
