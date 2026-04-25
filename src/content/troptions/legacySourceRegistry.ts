export type LegacySourceType =
  | "official"
  | "third-party"
  | "social"
  | "media"
  | "whitepaper"
  | "partner"
  | "historical"
  | "needs-verification";

export type InstitutionalUseStatus =
  | "approved-for-institutional-use"
  | "needs-verification"
  | "legally-sensitive"
  | "outdated-legacy"
  | "blocked-until-evidence";

export type VerificationStatus =
  | "verified"
  | "pending-verification"
  | "conflicting-sources"
  | "blocked";

export type RiskLevel = "low" | "medium" | "high";

export interface LegacySourceRecord {
  sourceId: string;
  title: string;
  sourceType: LegacySourceType;
  url: string;
  dateObserved: string;
  summary: string;
  claimsExtracted: readonly string[];
  institutionalUseStatus: InstitutionalUseStatus;
  verificationStatus: VerificationStatus;
  riskLevel: RiskLevel;
  requiredEvidence: readonly string[];
  approvedInstitutionalLanguage: string;
  blockedLanguage: readonly string[];
  notes: string;
}

export const LEGACY_SOURCE_REGISTRY: readonly LegacySourceRecord[] = [
  {
    sourceId: "SRC-OFFICIAL-HOME-2003",
    title: "Troptions Official Home",
    sourceType: "official",
    url: "https://www.troptions.org/home?utm_source=chatgpt.com",
    dateObserved: "2026-04-25",
    summary:
      "Public positioning describes Troptions as founded in 2003 with barter and trade utility orientation.",
    claimsExtracted: [
      "Founded in 2003",
      "Digital value ecosystem",
      "Barter and trade utility framing",
    ],
    institutionalUseStatus: "needs-verification",
    verificationStatus: "pending-verification",
    riskLevel: "medium",
    requiredEvidence: [
      "Corporate formation records",
      "Archived product release timeline",
      "Independent date and entity validation",
    ],
    approvedInstitutionalLanguage:
      "Public Troptions materials describe a 2003 start date and barter-first digital utility orientation. Institutional publication requires documentary corroboration.",
    blockedLanguage: [
      "proven beyond dispute",
      "globally accepted since launch",
    ],
    notes: "Founding-year references are historical claims and should stay source-dated.",
  },
  {
    sourceId: "SRC-OFFICIAL-ABOUT-ECOSYSTEM",
    title: "Troptions Official About",
    sourceType: "official",
    url: "https://www.troptions.org/about?utm_source=chatgpt.com",
    dateObserved: "2026-04-25",
    summary:
      "Describes ecosystem branches including Troptions Pay, Troptions Unity, and RWA-related positioning.",
    claimsExtracted: [
      "Troptions Pay branch",
      "Troptions Unity on Solana positioning",
      "RWA and smart-contract language",
    ],
    institutionalUseStatus: "needs-verification",
    verificationStatus: "pending-verification",
    riskLevel: "medium",
    requiredEvidence: [
      "Product architecture diagrams",
      "Current service availability by branch",
      "Legal classification memo for each branch",
    ],
    approvedInstitutionalLanguage:
      "Official ecosystem materials reference multiple Troptions branches. Institutional usage must map each branch to current controls, legal status, and provider dependencies.",
    blockedLanguage: [
      "fully institutional today",
      "automatically compliant in all jurisdictions",
    ],
    notes: "Branch names are usable; capability claims need evidence attachments.",
  },
  {
    sourceId: "SRC-OFFICIAL-MERCHANTS",
    title: "Troptions Merchants Positioning",
    sourceType: "official",
    url: "https://www.troptions.org/merchants",
    dateObserved: "2026-04-25",
    summary:
      "Merchant/payment statements appear in public Troptions materials and connect to Troptions Pay language.",
    claimsExtracted: [
      "Merchant payment positioning",
      "Network acceptance narrative",
    ],
    institutionalUseStatus: "blocked-until-evidence",
    verificationStatus: "conflicting-sources",
    riskLevel: "high",
    requiredEvidence: [
      "Dated merchant-count source",
      "Rail-provider confirmation",
      "Acceptance conditions and exclusions",
    ],
    approvedInstitutionalLanguage:
      "Troptions Pay has been publicly represented as connected to merchant-payment rails. Merchant counts require dated source evidence and rail-provider confirmation before institutional publication.",
    blockedLanguage: [
      "accepted everywhere",
      "merchant count guaranteed",
    ],
    notes: "Count discrepancies across public materials must remain flagged as unverified.",
  },
  {
    sourceId: "SRC-GIVBUX-MERCHANTS",
    title: "GivBux Merchant Materials",
    sourceType: "third-party",
    url: "https://givbux.com/merchants/?utm_source=chatgpt.com",
    dateObserved: "2026-04-25",
    summary:
      "Third-party merchant-network references used in Troptions-adjacent payment narratives.",
    claimsExtracted: [
      "Merchant location claims",
      "Payment network availability claims",
    ],
    institutionalUseStatus: "needs-verification",
    verificationStatus: "pending-verification",
    riskLevel: "high",
    requiredEvidence: [
      "Contractual relationship evidence",
      "Provider status letter",
      "Regional and category eligibility terms",
    ],
    approvedInstitutionalLanguage:
      "GivBux references are treated as third-party source inputs and require direct provider validation before institutional use.",
    blockedLanguage: [
      "proves universal acceptance",
      "institutional settlement ready by default",
    ],
    notes: "Third-party source; do not elevate to fact without corroboration.",
  },
  {
    sourceId: "SRC-UNITY-WHITEPAPER",
    title: "Troptions Unity Whitepaper",
    sourceType: "whitepaper",
    url: "https://www.theunitytoken.com/whitepaper?utm_source=chatgpt.com",
    dateObserved: "2026-04-25",
    summary:
      "Unity whitepaper positioning around Solana utility and community/humanitarian narratives.",
    claimsExtracted: [
      "Solana utility framing",
      "Community impact claims",
      "Humanitarian positioning",
    ],
    institutionalUseStatus: "legally-sensitive",
    verificationStatus: "pending-verification",
    riskLevel: "high",
    requiredEvidence: [
      "Token legal classification memo",
      "Governance and treasury disclosures",
      "Impact reporting methodology",
    ],
    approvedInstitutionalLanguage:
      "Troptions Unity has been publicly positioned as a Solana-oriented utility track. Social-impact statements require program evidence and governance disclosure before institutional use.",
    blockedLanguage: [
      "asset-backed without reserves",
      "charitable outcomes guaranteed",
    ],
    notes: "Social-impact claims require measurable and auditable reporting design.",
  },
  {
    sourceId: "SRC-SOCIAL-ANNOUNCEMENTS",
    title: "Social and Medium Announcements",
    sourceType: "social",
    url: "https://medium.com",
    dateObserved: "2026-04-25",
    summary:
      "Public social/media announcements discussing merchant growth, RWA expansion, and global reach.",
    claimsExtracted: [
      "Merchant growth claims",
      "Global expansion claims",
      "RWA development claims",
    ],
    institutionalUseStatus: "outdated-legacy",
    verificationStatus: "pending-verification",
    riskLevel: "high",
    requiredEvidence: [
      "Primary source attachments",
      "Date-constrained claim snapshots",
      "Counterparty validation",
    ],
    approvedInstitutionalLanguage:
      "Social/media announcements are treated as historical narrative signals and require primary evidence before institutional adoption.",
    blockedLanguage: [
      "confirmed by social momentum",
      "self-proving public narrative",
    ],
    notes: "Use as claim leads, not proof artifacts.",
  },
  {
    sourceId: "SRC-LEGACY-GOLD-RWA",
    title: "Troptions Gold and RWA Legacy Materials",
    sourceType: "historical",
    url: "https://www.troptions.org",
    dateObserved: "2026-04-25",
    summary:
      "Legacy references to Troptions Gold, SALP, and commodity/real-asset positioning.",
    claimsExtracted: [
      "Gold and commodity narrative",
      "RWA tokenization concepts",
      "Balance-sheet impact language",
    ],
    institutionalUseStatus: "legally-sensitive",
    verificationStatus: "pending-verification",
    riskLevel: "high",
    requiredEvidence: [
      "Custody evidence",
      "Valuation methodology",
      "Legal and accounting treatment memos",
    ],
    approvedInstitutionalLanguage:
      "Legacy Troptions Gold and RWA statements are interpreted as concept-phase materials that require custody, valuation, legal, and accounting evidence prior to institutional publication.",
    blockedLanguage: [
      "balance sheet enhancement guaranteed",
      "reserve status assumed",
    ],
    notes: "Treat as diligence candidates; do not present as finalized capabilities.",
  },
];

export function getSourcesByVerificationStatus(status: VerificationStatus): LegacySourceRecord[] {
  return LEGACY_SOURCE_REGISTRY.filter((source) => source.verificationStatus === status);
}

export function getInstitutionalReadySources(): LegacySourceRecord[] {
  return LEGACY_SOURCE_REGISTRY.filter(
    (source) => source.institutionalUseStatus === "approved-for-institutional-use",
  );
}
