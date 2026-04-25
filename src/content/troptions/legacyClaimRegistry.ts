import type { LegacySourceRecord } from "@/content/troptions/legacySourceRegistry";

export type LegacyClaimCategory =
  | "founding history"
  | "barter utility"
  | "proof of use"
  | "merchant acceptance"
  | "GivBux payment rail"
  | "Troptions Pay"
  | "Troptions Unity"
  | "Solana utility"
  | "humanitarian impact"
  | "Troptions Gold"
  | "RWA tokenization"
  | "SALP"
  | "gold / commodity backing"
  | "real estate"
  | "energy assets"
  | "global expansion"
  | "payments"
  | "exchange / liquidity"
  | "partnerships"
  | "public-market access"
  | "institutional future";

export type ClaimStatus =
  | "approved-for-institutional-use"
  | "needs-evidence"
  | "legally-sensitive"
  | "blocked"
  | "outdated-legacy";

export interface LegacyClaimRecord {
  claimId: string;
  originalClaim: string;
  sourceId: LegacySourceRecord["sourceId"] | string;
  category: LegacyClaimCategory;
  legacyMeaning: string;
  institutionalMeaning: string;
  status: ClaimStatus;
  evidenceRequired: readonly string[];
  verificationStatus: "verified" | "pending-verification" | "conflicting-sources" | "blocked";
  approvedRewrite: string;
  riskNote: string;
}

export const LEGACY_CLAIM_REGISTRY: readonly LegacyClaimRecord[] = [
  {
    claimId: "LCLM-FOUNDING-2003",
    originalClaim: "Troptions was founded in 2003.",
    sourceId: "SRC-OFFICIAL-HOME-2003",
    category: "founding history",
    legacyMeaning: "Long-duration identity and early digital utility origin.",
    institutionalMeaning: "Historical timeline claim requiring corporate and archival corroboration.",
    status: "needs-evidence",
    evidenceRequired: ["Corporate records", "Archived publications"],
    verificationStatus: "pending-verification",
    approvedRewrite:
      "Public Troptions materials describe a 2003 founding date. This timeline is maintained as a historical claim pending documentary corroboration.",
    riskNote: "Historical date claims can create legal risk if published as certified fact without primary records.",
  },
  {
    claimId: "LCLM-BARTER-UTILITY",
    originalClaim: "Troptions is a proof-of-use barter and trade utility ecosystem.",
    sourceId: "SRC-OFFICIAL-HOME-2003",
    category: "barter utility",
    legacyMeaning: "Utility-first framing versus speculative positioning.",
    institutionalMeaning: "Operational design philosophy mapped into product and control definitions.",
    status: "approved-for-institutional-use",
    evidenceRequired: ["Product flow documentation", "Current module mapping"],
    verificationStatus: "verified",
    approvedRewrite:
      "Troptions originated with a utility-oriented barter/trade narrative and is now translating that model into controlled institutional workflows.",
    riskNote: "Do not convert utility language into performance or value guarantees.",
  },
  {
    claimId: "LCLM-MERCHANT-COUNT",
    originalClaim: "Troptions Pay is accepted at hundreds of thousands of merchants.",
    sourceId: "SRC-OFFICIAL-MERCHANTS",
    category: "merchant acceptance",
    legacyMeaning: "Large-network utility messaging.",
    institutionalMeaning: "Third-party merchant-rail assertion requiring dated source and provider validation.",
    status: "blocked",
    evidenceRequired: ["Dated count source", "Rail-provider confirmation", "Acceptance conditions"],
    verificationStatus: "conflicting-sources",
    approvedRewrite:
      "Troptions Pay has been publicly represented as connected to merchant-payment rails. Any merchant-count claim requires dated source evidence, provider confirmation, and acceptance-condition disclosure before institutional publication.",
    riskNote: "Conflicting public counts and undocumented methodology create high disclosure risk.",
  },
  {
    claimId: "LCLM-UNITY-HUMANITARIAN",
    originalClaim: "Troptions Unity is humanitarian and asset-backed.",
    sourceId: "SRC-UNITY-WHITEPAPER",
    category: "humanitarian impact",
    legacyMeaning: "Community and social-impact positioning.",
    institutionalMeaning: "Social-impact statement that requires governance, methodology, and evidence controls.",
    status: "legally-sensitive",
    evidenceRequired: ["Impact methodology", "Governance disclosure", "Reserve and custody evidence if backing is claimed"],
    verificationStatus: "pending-verification",
    approvedRewrite:
      "Troptions Unity has been publicly positioned as a Solana-based utility and social-impact track. Any asset-backed, stability, or humanitarian-impact statement requires reserve evidence, governance controls, legal classification, and reporting procedures.",
    riskNote: "Asset-backed and humanitarian claims require measurable support and legal review.",
  },
  {
    claimId: "LCLM-GOLD-BALANCE-SHEET",
    originalClaim: "Troptions Gold enhances balance sheets.",
    sourceId: "SRC-LEGACY-GOLD-RWA",
    category: "Troptions Gold",
    legacyMeaning: "Commodity-linked financial strength narrative.",
    institutionalMeaning: "Accounting-sensitive statement requiring independent accounting and valuation policy.",
    status: "blocked",
    evidenceRequired: ["Accounting memo", "Valuation methodology", "Custody records"],
    verificationStatus: "blocked",
    approvedRewrite:
      "Any accounting or balance-sheet treatment requires independent accounting review, valuation methodology, custody evidence, impairment policy, and jurisdiction-specific reporting.",
    riskNote: "Balance-sheet impact language is legally sensitive and blocked without professional review.",
  },
  {
    claimId: "LCLM-RWA-WORLD",
    originalClaim: "Troptions is ready to tokenize the world.",
    sourceId: "SRC-SOCIAL-ANNOUNCEMENTS",
    category: "RWA tokenization",
    legacyMeaning: "Global-scale RWA ambition statement.",
    institutionalMeaning: "RWA pipeline objective requiring asset-by-asset readiness controls.",
    status: "outdated-legacy",
    evidenceRequired: ["RWA intake workflow", "Custody and legal gates", "Asset diligence checklists"],
    verificationStatus: "pending-verification",
    approvedRewrite:
      "Troptions is being rebuilt as an institutional RWA intake and evidence system where each asset requires title evidence, valuation, custody/control proof, legal classification, risk review, and approval gates before any issuance-readiness status.",
    riskNote: "Global readiness language is promotional and not acceptable for institutional publication.",
  },
  {
    claimId: "LCLM-INSTITUTIONAL-FUTURE",
    originalClaim: "Troptions can now operate as institutional infrastructure.",
    sourceId: "SRC-OFFICIAL-ABOUT-ECOSYSTEM",
    category: "institutional future",
    legacyMeaning: "Transition narrative toward regulated-grade systems.",
    institutionalMeaning: "Operating objective bounded by legal, provider, custody, and compliance gates.",
    status: "approved-for-institutional-use",
    evidenceRequired: ["Release gates", "Audit logs", "Control-plane documentation"],
    verificationStatus: "verified",
    approvedRewrite:
      "Troptions is transitioning from legacy utility narratives into a source-tracked, proof-gated, custody-aware, and compliance-controlled operating system.",
    riskNote: "Capability publication must remain tied to module readiness and gated status.",
  },
];

export function getClaimsByStatus(status: ClaimStatus): LegacyClaimRecord[] {
  return LEGACY_CLAIM_REGISTRY.filter((claim) => claim.status === status);
}
