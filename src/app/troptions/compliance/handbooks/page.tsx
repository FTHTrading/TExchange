import Link from "next/link";

export const metadata = {
  title: "TROPTIONS Compliance Handbooks",
  description:
    "Download transaction handbooks covering tokenisation, carbon credits, Bitcoin settlement, KYC/onboarding, and platform overview.",
};

const DISCLOSURE =
  "These handbooks are for informational and due-diligence purposes only. They do not constitute legal, financial, or investment advice. Consult qualified professionals before taking any action.";

interface HandbookInfo {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  icon: string;
  color: string;
  description: string;
  sections: string[];
}

const HANDBOOKS: HandbookInfo[] = [
  {
    id: "platform-overview-handbook",
    title: "TROPTIONS Platform Overview",
    subtitle: "Architecture, Compliance, and Participant Guide",
    version: "v1.0.0",
    icon: "PLT",
    color: "#c99a3c",
    description: "High-level overview of the TROPTIONS ecosystem, Layer 1 architecture, token supply, brand entities, and participant roles.",
    sections: ["Platform Architecture", "Token Supply and Issuance", "Compliance Framework", "Participant Roles", "Governance", "Contact Information"],
  },
  {
    id: "onboarding-kyc-handbook",
    title: "KYC / Onboarding Handbook",
    subtitle: "Identity Verification, Document Submission, and DID",
    version: "v1.0.0",
    icon: "KYC",
    color: "#6366f1",
    description: "Step-by-step onboarding: required documents, document hash submission, KYC tier levels, oracle attestation, and DID anchoring.",
    sections: ["Onboarding Requirements", "Document Submission", "KYC Tiers", "Oracle Attestation", "DID Anchoring", "Privacy Controls"],
  },
  {
    id: "rwa-tokenisation-handbook",
    title: "RWA Tokenisation Handbook",
    subtitle: "Gemstones, Real Estate, Equipment, and More",
    version: "v1.0.0",
    icon: "RWA",
    color: "#8b5cf6",
    description: "Complete reference for real-world asset tokenisation: asset eligibility, custody requirements, SPV structure, due diligence, and approval gates.",
    sections: ["Asset Eligibility", "Custody and Custody Providers", "SPV / Legal Wrapper", "Due Diligence Checklist", "Approval Gates", "Securities Compliance"],
  },
  {
    id: "carbon-credit-handbook",
    title: "Carbon Credit Handbook",
    subtitle: "Sale, Retirement, and Registry Procedures",
    version: "v1.0.0",
    icon: "CO₂",
    color: "#16a34a",
    description: "Procedures for carbon credit sale and permanent retirement on Verra VCS, Gold Standard, ACR, or equivalent registries.",
    sections: ["Registry Requirements", "Credit Verification", "Sale Workflow", "Retirement Workflow", "Audit Trail", "Reporting"],
  },
  {
    id: "btc-settlement-handbook",
    title: "Bitcoin Settlement Handbook",
    subtitle: "VASP Procedures, Travel Rule, and Compliance",
    version: "v1.0.0",
    icon: "₿",
    color: "#f59e0b",
    description: "Reference for Bitcoin settlement preferences: VASP selection, wallet screening, Travel Rule compliance (≥$1,000), and source-of-funds requirements.",
    sections: ["VASP Requirements", "Wallet Risk Screening", "Travel Rule (FATF)", "Source of Funds", "Settlement Records", "Audit Trail"],
  },
];

export default function HandbooksPage() {
  return (
    <div style={{ background: "linear-gradient(160deg, #071426 0%, #0c1e35 60%, #071426 100%)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.25rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link href="/troptions" style={{ fontSize: "0.8rem", color: "#64748b", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: "1rem" }}>
            ← TROPTIONS Home
          </Link>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#f0cf82", margin: "0 0 0.35rem" }}>Compliance & Due Diligence</p>
          <h1 style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 0.75rem" }}>
            Transaction Handbooks
          </h1>
          <p style={{ color: "#94a3b8", lineHeight: 1.65, maxWidth: 700, margin: "0 0 1.25rem", fontSize: "0.925rem" }}>
            Download or review each handbook to understand what is required for different transaction types, how the approval workflow operates, and what compliance obligations apply.
          </p>
          <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.6rem", padding: "0.85rem 1.1rem" }}>
            <p style={{ fontSize: "0.78rem", color: "#fca5a5", margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: "#f87171" }}>NOTICE:</strong> {DISCLOSURE}
            </p>
          </div>
        </div>

        {/* Handbook cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {HANDBOOKS.map((hb) => (
            <div
              key={hb.id}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1.5rem", display: "flex", gap: "1.25rem", flexWrap: "wrap" }}
            >
              {/* Icon */}
              <div style={{ width: 54, height: 54, borderRadius: "0.7rem", background: `${hb.color}22`, border: `1px solid ${hb.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: hb.color, flexShrink: 0 }}>
                {hb.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div>
                    <p style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem", margin: 0 }}>{hb.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0.2rem 0 0" }}>{hb.subtitle} · {hb.version}</p>
                  </div>
                  <a
                    href={`/api/troptions/handbooks/${hb.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: hb.color, color: "#111827", padding: "0.45rem 1rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", flexShrink: 0 }}
                  >
                    View JSON
                  </a>
                </div>

                <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 0.85rem" }}>{hb.description}</p>

                {/* Sections */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {hb.sections.map((s) => (
                    <span key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1", fontSize: "0.68rem", padding: "0.2rem 0.6rem", borderRadius: "2rem", fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/troptions/transactions" style={{ color: "#f0cf82", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>Transaction Hub →</Link>
          <Link href="/troptions/kyc" style={{ color: "#f0cf82", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>KYC / Onboarding →</Link>
          <Link href="/troptions/xrpl-stellar-compliance" style={{ color: "#f0cf82", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>Compliance Overview →</Link>
        </div>
      </div>
    </div>
  );
}
