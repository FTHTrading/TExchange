#!/usr/bin/env node
/**
 * generate-troptions-pdfs.mjs
 * Generates all 20 professional TROPTIONS PDFs into public/troptions/downloads/
 * Run: npm run pdf:generate
 */

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/troptions/downloads");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Brand colours ────────────────────────────────────────────────────────────
const GOLD   = "#C9A84C";
const DARK   = "#071426";
const WHITE  = "#F8FAFC";
const SLATE  = "#94A3B8";
const RED    = "#EF4444";
const GREEN  = "#22C55E";

// ─── Safety disclaimer ────────────────────────────────────────────────────────
const SAFETY_DISCLAIMER =
  "TROPTIONS materials are provided for informational and due-diligence purposes only. " +
  "TROPTIONS is not a bank, broker-dealer, exchange, custodian, licensed financial institution, " +
  "investment adviser, or legal adviser. No live custody, exchange, stablecoin issuance, IOU " +
  "issuance, Aave execution, token buyback, liquidity pool execution, mining operation, or public " +
  "investment functionality is enabled. All execution requires legal, compliance, provider, " +
  "custody, signer, and governance approvals.";

// ─── Helper: create a new doc ─────────────────────────────────────────────────
function createDoc(outPath) {
  const doc = new PDFDocument({ size: "LETTER", margins: { top: 60, bottom: 60, left: 60, right: 60 }, info: { Producer: "TROPTIONS Document System v1.0" } });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);
  return { doc, stream };
}

// ─── Cover page ───────────────────────────────────────────────────────────────
function addCover(doc, title, subtitle, audience, version) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#071426");
  doc.rect(0, 0, doc.page.width, 6).fill(GOLD);

  doc.y = 140;
  doc.fillColor(GOLD).fontSize(11).font("Helvetica-Bold")
    .text("TROPTIONS · INSTITUTIONAL DOCUMENT SYSTEM", { align: "center", characterSpacing: 2 });

  doc.moveDown(2);
  doc.fillColor(WHITE).fontSize(28).font("Helvetica-Bold")
    .text(title, { align: "center" });

  doc.moveDown(0.6);
  doc.fillColor(SLATE).fontSize(14).font("Helvetica")
    .text(subtitle, { align: "center" });

  doc.moveDown(2);
  doc.fillColor(GOLD).fontSize(10).font("Helvetica-Bold")
    .text(`For: ${audience}`, { align: "center" });

  doc.moveDown(0.6);
  doc.fillColor(SLATE).fontSize(9).font("Helvetica")
    .text(version, { align: "center" });

  // Bottom disclaimer band
  const bY = doc.page.height - 110;
  doc.rect(40, bY, doc.page.width - 80, 70).fill("rgba(239,68,68,0.12)").stroke("#EF4444");
  doc.fillColor("#FCA5A5").fontSize(7).font("Helvetica")
    .text(SAFETY_DISCLAIMER, 52, bY + 10, { width: doc.page.width - 104, align: "justify", lineGap: 2 });

  doc.addPage();
}

// ─── Section heading ──────────────────────────────────────────────────────────
function sectionHeading(doc, text) {
  doc.moveDown(1.2);
  doc.fillColor(GOLD).fontSize(13).font("Helvetica-Bold").text(text);
  doc.moveDown(0.3);
  doc.moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke(GOLD);
  doc.moveDown(0.5);
  doc.fillColor("#1E293B").fontSize(9).font("Helvetica");
}

// ─── Body text ────────────────────────────────────────────────────────────────
function bodyText(doc, text) {
  doc.fillColor("#334155").fontSize(9.5).font("Helvetica").text(text, { align: "justify", lineGap: 2 });
  doc.moveDown(0.5);
}

// ─── Bullet list ──────────────────────────────────────────────────────────────
function bulletList(doc, items) {
  items.forEach((item) => {
    doc.fillColor("#475569").fontSize(9.5).font("Helvetica")
      .text(`  •  ${item}`, { align: "left", lineGap: 1 });
  });
  doc.moveDown(0.5);
}

// ─── Checklist (with box symbols) ─────────────────────────────────────────────
function checklist(doc, items) {
  items.forEach((item) => {
    doc.fillColor("#475569").fontSize(9.5).font("Helvetica")
      .text(`  ☐  ${item}`, { align: "left", lineGap: 2 });
  });
  doc.moveDown(0.5);
}

// ─── Two-column table ─────────────────────────────────────────────────────────
function table2(doc, rows) {
  const left = doc.page.margins.left;
  const w = doc.page.width - left - doc.page.margins.right;
  const col1 = w * 0.38;
  const col2 = w * 0.62;
  const rowH = 18;

  rows.forEach(([label, value], i) => {
    const bg = i % 2 === 0 ? "#F1F5F9" : "#E2E8F0";
    doc.rect(left, doc.y, w, rowH).fill(bg);
    doc.fillColor("#1E293B").fontSize(8.5).font("Helvetica-Bold")
      .text(label, left + 6, doc.y + 4, { width: col1 - 8, ellipsis: true });
    doc.fillColor("#334155").fontSize(8.5).font("Helvetica")
      .text(String(value), left + col1 + 6, doc.y - rowH + 4, { width: col2 - 8 });
    doc.y += 2;
  });
  doc.moveDown(0.8);
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function addFooterToRange(doc, startPage, totalPages, title) {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    const pageNum = range.start + i + 1;
    const y = doc.page.height - 46;
    doc.rect(0, y - 6, doc.page.width, 1).fill(GOLD);
    doc.fillColor(SLATE).fontSize(7.5).font("Helvetica")
      .text(title + "  ·  TROPTIONS Institutional Document System", doc.page.margins.left, y, { align: "left", width: doc.page.width / 2 });
    doc.fillColor(SLATE).fontSize(7.5).font("Helvetica")
      .text(`Page ${pageNum}  ·  Confidential — Not for Public Distribution`, doc.page.width / 2, y, { align: "right", width: doc.page.width / 2 - doc.page.margins.right });
  }
}

// ─── Standard sections ────────────────────────────────────────────────────────
function addStandardBody(doc, { summary, whoFor, requiredInfo, requiredDocs, process, approvalGates, readiness, whatBlocked, blockers, systemHandling, finalChecklist }) {
  sectionHeading(doc, "Executive Summary");
  bodyText(doc, summary);

  sectionHeading(doc, "Who This Document Is For");
  bodyText(doc, whoFor);

  sectionHeading(doc, "Required Information");
  bulletList(doc, requiredInfo);

  sectionHeading(doc, "Required Documents");
  checklist(doc, requiredDocs);

  sectionHeading(doc, "Step-by-Step Process");
  process.forEach((step, i) => {
    doc.fillColor("#1E293B").fontSize(9.5).font("Helvetica-Bold")
      .text(`Step ${i + 1}: ${step.title}`);
    doc.fillColor("#475569").fontSize(9).font("Helvetica")
      .text(step.detail, { lineGap: 1 });
    doc.moveDown(0.4);
  });

  sectionHeading(doc, "Approval Gates");
  checklist(doc, approvalGates);

  sectionHeading(doc, "Readiness Checklist");
  checklist(doc, readiness);

  sectionHeading(doc, "What Stays Blocked");
  bulletList(doc, whatBlocked);

  sectionHeading(doc, "Common Blockers");
  bulletList(doc, blockers);

  sectionHeading(doc, "TROPTIONS System Handling");
  bodyText(doc, systemHandling);

  sectionHeading(doc, "Final Checklist Before Submission");
  checklist(doc, finalChecklist);

  // Safety disclaimer page
  doc.addPage();
  doc.rect(0, 0, doc.page.width, 6).fill(RED);
  doc.y = 80;
  doc.fillColor(RED).fontSize(12).font("Helvetica-Bold").text("SAFETY & COMPLIANCE DISCLAIMER", { align: "center" });
  doc.moveDown(1.5);
  doc.fillColor("#334155").fontSize(9.5).font("Helvetica")
    .text(SAFETY_DISCLAIMER, { align: "justify", lineGap: 3 });
}

// ─── PDF DEFINITIONS ──────────────────────────────────────────────────────────

const PDFS = [
  {
    filename: "troptions-platform-overview.pdf",
    title: "TROPTIONS Platform Overview",
    subtitle: "Architecture, Compliance & Participant Guide",
    audience: "All participants, lenders, partners",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "The TROPTIONS platform is a compliance-controlled digital asset ecosystem providing tokenisation infrastructure, RWA financing coordination, XRPL/Stellar settlement rails, and governance-gated execution. All capabilities require multi-party legal, compliance, and governance approval before activation.",
      whoFor: "This document is for prospective participants, lenders evaluating TROPTIONS-assisted financing, attorneys reviewing platform structure, partner organisations, and institutional contacts performing initial due diligence.",
      requiredInfo: ["Legal entity name and jurisdiction", "Participant role (owner, lender, operator)", "Intended use case", "Compliance jurisdiction requirements", "Contact information and authorised representative"],
      requiredDocs: ["Government-issued identification", "Entity formation documents (if applicable)", "Compliance questionnaire", "Intended use case description", "Source of funds declaration"],
      process: [
        { title: "Initial Contact", detail: "Submit participant intake form at /portal/troptions/onboarding. Provide entity details and intended use case." },
        { title: "KYC / Compliance Review", detail: "Complete KYC questionnaire. Submit required identity and entity documents for review by compliance team." },
        { title: "Platform Orientation", detail: "Review platform overview, applicable handbooks, and compliance notices. Confirm understanding of simulationOnly status." },
        { title: "Role Assignment", detail: "TROPTIONS governance assigns participant role based on use case and compliance clearance." },
        { title: "Activation", detail: "Upon full approval, relevant platform capabilities are activated for your participant profile." },
      ],
      approvalGates: ["KYC/AML clearance", "Legal entity verification", "Compliance jurisdiction review", "Governance role approval", "Capability-specific approval for each activated feature"],
      readiness: ["Identity documents submitted", "Entity documents submitted", "KYC questionnaire complete", "Intended use case documented", "Compliance review passed", "Platform terms acknowledged"],
      whatBlocked: ["Live stablecoin issuance", "Live IOU issuance", "Custody services", "Exchange functionality", "Mining operations", "Public investment offerings", "Aave execution", "Token buybacks", "Liquidity pool execution"],
      blockers: ["Incomplete KYC documentation", "Unresolved compliance flags", "Missing legal entity documents", "Jurisdictional restrictions", "Pending governance approval"],
      systemHandling: "TROPTIONS processes all participant intake through a compliance-first workflow. All capabilities are tagged simulationOnly in the system until full legal, compliance, and governance approvals are confirmed. No live execution is possible without explicit approval at each gate.",
      finalChecklist: ["All identity documents submitted", "Entity documents verified", "KYC questionnaire complete", "Compliance review passed", "Role assignment confirmed", "Relevant handbooks reviewed", "Safety disclaimer acknowledged"],
    },
  },
  {
    filename: "kyc-onboarding-handbook.pdf",
    title: "KYC / Onboarding Handbook",
    subtitle: "Identity Verification, Document Submission & DID",
    audience: "Participants, operators, asset owners",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers the complete TROPTIONS KYC and onboarding process: required identity and entity documents, document hash submission for XRPL anchoring, KYC tier levels, oracle attestation, and decentralised identity (DID) registration.",
      whoFor: "New participants, asset owners seeking platform access, operators onboarding to TROPTIONS infrastructure, and compliance teams reviewing onboarding procedures.",
      requiredInfo: ["Full legal name", "Date of birth", "Residential address", "Entity name and jurisdiction (if applicable)", "Tax identification number", "Contact information"],
      requiredDocs: ["Government-issued photo ID (passport or national ID)", "Proof of address (utility bill or bank statement, <90 days)", "Entity formation documents (if entity participant)", "Operating agreement or similar (if applicable)", "Beneficial ownership declaration", "Source of funds statement"],
      process: [
        { title: "Submit Intake Form", detail: "Complete the participant intake form at /portal/troptions/onboarding. Provide all required information fields." },
        { title: "Upload Documents", detail: "Upload all required documents through the secure document submission portal. Documents are hashed and the hash is anchored on XRPL for verification." },
        { title: "Document Hash Verification", detail: "TROPTIONS system generates SHA-256 hash of each submitted document and submits the hash as an XRPL memo transaction for immutable timestamping." },
        { title: "KYC Review", detail: "Compliance team reviews submitted documents against identity verification requirements. May request additional documents or clarification." },
        { title: "Oracle Attestation", detail: "Upon successful KYC review, an oracle attestation record is created confirming your verified participant status." },
        { title: "DID Anchoring (Optional)", detail: "If DID registration is selected, a decentralised identity record is anchored on XRPL linking to your oracle attestation." },
      ],
      approvalGates: ["Document completeness check", "Identity verification", "Address verification", "Entity verification (if applicable)", "Source of funds review", "Compliance approval", "Oracle attestation issuance"],
      readiness: ["Photo ID uploaded", "Proof of address uploaded", "Entity documents uploaded (if applicable)", "Source of funds statement submitted", "Intake form complete", "Document hashes verified", "Compliance review completed"],
      whatBlocked: ["Live custody", "Live asset issuance", "Exchange access", "Stablecoin minting", "Any live execution capability"],
      blockers: ["Expired identity documents", "Address proof older than 90 days", "Missing entity documents", "Unresolved source of funds questions", "Jurisdictional compliance flags"],
      systemHandling: "All submitted documents are processed through the TROPTIONS compliance intake system. Document hashes are anchored on XRPL for auditability. No documents are shared beyond the compliance review process without explicit consent.",
      finalChecklist: ["Photo ID current and valid", "Proof of address <90 days", "Entity documents complete (if applicable)", "Source of funds documented", "All hashes confirmed on XRPL", "Compliance review passed", "Oracle attestation issued"],
    },
  },
  {
    filename: "rwa-tokenisation-handbook.pdf",
    title: "RWA Tokenisation Handbook",
    subtitle: "Gemstones, Real Estate, Equipment & More",
    audience: "Asset owners, attorneys, lenders",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook is the complete reference for real-world asset (RWA) tokenisation through the TROPTIONS platform. It covers asset eligibility, custody arrangements, legal wrapper requirements, due diligence process, and multi-gate approval workflow. All tokenisation is simulation-only until all approvals are confirmed.",
      whoFor: "Asset owners considering tokenisation, attorneys structuring RWA transactions, lenders evaluating tokenised asset collateral, and compliance officers reviewing RWA procedures.",
      requiredInfo: ["Asset type and description", "Asset location and jurisdiction", "Estimated current value and basis of valuation", "Ownership structure and legal title holder", "Existing encumbrances, liens, or legal disputes", "Intended use of tokenisation proceeds"],
      requiredDocs: ["Title deed or ownership certificate", "Recent independent appraisal/valuation report", "Legal opinion confirming tokenisation eligibility", "SPV formation documents (if applicable)", "Custody agreement or custodian confirmation", "Environmental/regulatory clearance (as applicable)", "Insurance documentation", "Source of ownership documentation"],
      process: [
        { title: "Asset Submission", detail: "Submit asset intake form through TROPTIONS RWA portal. Provide asset description, value estimate, and ownership documentation." },
        { title: "Eligibility Assessment", detail: "TROPTIONS compliance team reviews asset type against eligibility criteria: clean title, insurable, custodian-compatible, legal jurisdiction review." },
        { title: "Due Diligence Package", detail: "Assemble full due diligence package: title confirmation, valuation, legal opinion, custody arrangement, and applicable regulatory clearances." },
        { title: "Legal Wrapper", detail: "Structure appropriate legal wrapper (SPV, trust, or equivalent). Legal counsel must confirm wrapper is valid in the asset's jurisdiction." },
        { title: "Custody Confirmation", detail: "Confirm custody arrangement with approved custodian. Custodian must provide written confirmation of holdings." },
        { title: "XRPL IOU Preparation", detail: "TROPTIONS prepares XRPL IOU record for the tokenised asset. This is simulation-only until all approvals are confirmed." },
        { title: "Governance Approval", detail: "Full governance review of assembled package. All gates must clear before any on-chain issuance." },
      ],
      approvalGates: ["Asset eligibility confirmation", "Title verification", "Independent valuation accepted", "Legal opinion received", "SPV/wrapper structured", "Custody arrangement confirmed", "Regulatory clearance (if required)", "TROPTIONS governance approval", "XRPL issuance approval"],
      readiness: ["Asset description complete", "Ownership documentation provided", "Title confirmed clean", "Valuation report submitted", "Legal opinion received", "Custody arrangement confirmed", "Legal wrapper structured", "Regulatory clearances obtained", "All due diligence documents assembled"],
      whatBlocked: ["Live IOU issuance without full approval", "On-chain minting before custody confirmed", "Asset trading before all gates cleared", "Public sale of tokenised asset without securities compliance"],
      blockers: ["Title disputes or encumbrances", "Missing valuation report", "Custody arrangement not confirmed", "Legal wrapper incomplete", "Regulatory clearance pending", "Securities classification unresolved"],
      systemHandling: "TROPTIONS processes RWA submissions through a multi-gate compliance workflow. Each gate must clear before advancing. System maintains a readiness score for each asset package. All on-chain actions are simulation-only until governance approves the full package.",
      finalChecklist: ["Title confirmed clean and unencumbered", "Independent valuation submitted", "Legal opinion confirming eligibility received", "SPV/legal wrapper confirmed", "Custody agreement signed", "Regulatory clearances obtained", "Governance approval received", "XRPL IOU record prepared (simulation)", "All documents securely stored and hashed"],
    },
  },
  {
    filename: "carbon-credit-handbook.pdf",
    title: "Carbon Credit Handbook",
    subtitle: "Sale, Retirement & Registry Procedures",
    audience: "Carbon market participants, compliance officers",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers TROPTIONS procedures for carbon credit sale and permanent retirement on recognised carbon registries including Verra VCS, Gold Standard, ACR, and equivalent. All carbon credit transactions require full registry verification and compliance review before execution.",
      whoFor: "Carbon credit holders, project developers, corporate buyers seeking retirement, compliance officers, and environmental consultants working with TROPTIONS-assisted carbon transactions.",
      requiredInfo: ["Registry name and project ID", "Number of credits (in metric tonnes CO2e)", "Vintage year", "Credit type (VCU, GS-VER, ACR, etc.)", "Current registry account holder", "Intended use (sale or permanent retirement)"],
      requiredDocs: ["Registry account confirmation", "Credit serialisation documentation", "Independent verification report", "Project description document (PDD)", "Buyer KYC (for sale transactions)", "Retirement instruction letter (for retirements)"],
      process: [
        { title: "Registry Verification", detail: "Confirm credits are registered and unencumbered on the relevant registry. Obtain credit serial numbers." },
        { title: "Credit Submission", detail: "Submit carbon credit details through TROPTIONS carbon intake form. Attach registry confirmation and serialisation documentation." },
        { title: "Compliance Review", detail: "TROPTIONS compliance team reviews credit legitimacy, registry standing, vintage, and applicable offset protocols." },
        { title: "Transaction Structuring", detail: "Structure transaction: credit purchase agreement (for sale) or retirement instruction (for retirement). Legal review required." },
        { title: "Registry Execution", detail: "Upon full approval, registry transfer or retirement is executed. TROPTIONS does not hold registry accounts; the account holder executes per instruction." },
        { title: "Audit Trail", detail: "Full transaction record is maintained including registry confirmation number, transaction date, and credit details." },
      ],
      approvalGates: ["Registry standing confirmed", "Credit serialisation verified", "Independent verification reviewed", "KYC complete (for counterparties)", "Legal review of transaction documents", "TROPTIONS compliance approval", "Registry execution confirmation"],
      readiness: ["Registry account confirmed", "Credits serialised and verified", "Project documentation available", "Counterparty KYC complete", "Transaction documents drafted", "Compliance review complete"],
      whatBlocked: ["Registry transfer without full compliance approval", "Credits with disputed or cancelled status", "Transactions without counterparty KYC"],
      blockers: ["Registry account holder not confirmed", "Credit serialisation incomplete", "Missing independent verification", "Project documentation gaps", "Counterparty KYC incomplete"],
      systemHandling: "TROPTIONS provides coordination, compliance review, and audit trail services for carbon credit transactions. TROPTIONS does not act as a carbon registry, broker-dealer, or credit custodian. All registry actions are performed by the account holder on instruction.",
      finalChecklist: ["Credits confirmed on registry", "Serialisation documented", "Independent verification received", "Counterparty KYC complete", "Transaction documents reviewed by legal", "Compliance approval received", "Registry execution confirmed", "Audit trail complete"],
    },
  },
  {
    filename: "bitcoin-settlement-handbook.pdf",
    title: "Bitcoin Settlement Handbook",
    subtitle: "VASP Procedures, Travel Rule & Compliance",
    audience: "Settlement desks, compliance officers, lenders",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers TROPTIONS procedures for Bitcoin settlement: VASP selection criteria, wallet screening requirements, Travel Rule compliance for transactions ≥$1,000, and source-of-funds documentation. Bitcoin settlement is a preference route subject to full compliance review.",
      whoFor: "Settlement desks processing Bitcoin transactions, compliance officers reviewing BTC procedures, lenders accepting Bitcoin in TROPTIONS-assisted transactions, and deal coordinators.",
      requiredInfo: ["Sending VASP name and jurisdiction", "Receiving VASP name and jurisdiction", "Transaction amount (BTC and USD equivalent)", "Transaction purpose", "Wallet addresses (sending and receiving)", "Originator and beneficiary information (Travel Rule)"],
      requiredDocs: ["VASP registration/licence confirmation", "Wallet risk screening report", "Travel Rule data package (if ≥$1,000)", "Source of funds declaration", "Transaction purpose statement", "KYC documents for originator and beneficiary"],
      process: [
        { title: "VASP Selection", detail: "Select sending and receiving VASPs from TROPTIONS approved VASP list. Confirm both are licensed and compliant in their respective jurisdictions." },
        { title: "Wallet Screening", detail: "Run both sending and receiving wallet addresses through approved blockchain analytics tool (Chainalysis, Elliptic, or equivalent). Document risk score." },
        { title: "Travel Rule Compliance", detail: "For transactions ≥$1,000: collect originator and beneficiary information per FATF Travel Rule. Share via approved VASP-to-VASP protocol." },
        { title: "Source of Funds", detail: "Document source of BTC being sent. Confirm BTC was not acquired through any prohibited activities." },
        { title: "Transaction Submission", detail: "Submit transaction details and compliance package through TROPTIONS Bitcoin settlement intake." },
        { title: "Compliance Review", detail: "TROPTIONS compliance team reviews complete package before any settlement proceeds." },
        { title: "Settlement Execution", detail: "Upon compliance approval, settlement instruction is issued. TROPTIONS does not custody or transmit BTC directly." },
      ],
      approvalGates: ["Both VASPs confirmed licensed", "Wallet screening completed (acceptable risk score)", "Travel Rule data package complete (≥$1,000)", "Source of funds confirmed", "Compliance review approved", "Settlement instruction issued"],
      readiness: ["Sending VASP confirmed", "Receiving VASP confirmed", "Wallet addresses screened", "Travel Rule data collected (≥$1,000)", "Source of funds documented", "KYC for parties complete"],
      whatBlocked: ["Settlement with non-licensed VASPs", "Settlement with high-risk wallets", "Transactions without Travel Rule compliance", "Transactions with unverified source of funds"],
      blockers: ["VASP not on approved list", "Wallet risk score exceeds threshold", "Missing Travel Rule data", "Source of funds unclear", "KYC incomplete for any party"],
      systemHandling: "TROPTIONS provides compliance coordination for Bitcoin settlement transactions. TROPTIONS does not custody, transmit, or hold Bitcoin. All BTC movements occur between VASPs and wallets controlled by the transacting parties.",
      finalChecklist: ["Both VASPs confirmed licensed", "Wallet screening reports obtained", "Travel Rule data collected (≥$1,000)", "Source of funds documented", "KYC complete for all parties", "Compliance review passed", "Settlement instruction issued and confirmed"],
    },
  },
  {
    filename: "xrpl-iou-issuance-handbook.pdf",
    title: "XRPL IOU Issuance Handbook",
    subtitle: "Trustlines, Gateways & Compliance",
    audience: "Web3 operators, XRPL participants, compliance teams",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers the TROPTIONS XRPL IOU issuance process via the TROPTIONS gateway issuer account. It details trustline setup, transfer fee configuration, KYC requirements for trustline holders, compliance controls, and the full approval process. All issuance is simulation-only until all legal and governance approvals are complete.",
      whoFor: "XRPL participants setting up trustlines, Web3 operators integrating TROPTIONS IOUs, compliance teams reviewing XRPL procedures, and technical operators configuring XRPL accounts.",
      requiredInfo: ["XRPL wallet address", "Intended IOU type (TROPTIONS, stablecoin reference, RWA receipt, etc.)", "Trustline holder KYC status", "Jurisdiction of XRPL operator", "Intended use case for IOU"],
      requiredDocs: ["XRPL wallet confirmation (signed verification)", "KYC documents for trustline holder", "Use case description", "Compliance jurisdiction declaration", "Legal opinion (if required for specific IOU type)"],
      process: [
        { title: "Issuer Review", detail: "TROPTIONS issuer account: rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ. Confirm issuer account is active on XRPL and gateway is operational." },
        { title: "Trustline Application", detail: "Submit trustline application through TROPTIONS XRPL portal. Provide wallet address, intended IOU type, and KYC documentation." },
        { title: "KYC Review", detail: "Complete KYC process per KYC/Onboarding Handbook. Trustline approval requires cleared KYC status." },
        { title: "Trustline Configuration", detail: "TROPTIONS configures trustline parameters: currency code, limit, and applicable transfer fee. Transfer fees range from 0 bps (platform tokens) to 50 bps (stablecoin references)." },
        { title: "Trustline Activation", detail: "Upon compliance approval, trustline is activated. Trustline holder can then receive IOUs through the TROPTIONS gateway." },
        { title: "Ongoing Compliance", detail: "Trustline holders are subject to ongoing KYC refresh and compliance monitoring. Trustlines may be suspended if compliance requirements are not maintained." },
      ],
      approvalGates: ["KYC cleared", "Jurisdiction compliance review", "Use case approval", "Trustline limit approval", "Transfer fee configuration confirmed", "TROPTIONS governance approval for issuance", "Legal approval for IOU type"],
      readiness: ["XRPL wallet active and funded (reserve met)", "KYC documents submitted", "Use case documented", "Jurisdiction compliance reviewed", "Trustline application submitted", "Governance review complete"],
      whatBlocked: ["Live IOU minting without governance approval", "Trustline activation without KYC clearance", "Secondary market trading without securities compliance review", "Any live custody of IOU-backed assets"],
      blockers: ["KYC incomplete", "Jurisdiction not supported", "Use case not approved", "XRPL wallet reserve not met", "Governance approval pending"],
      systemHandling: "TROPTIONS manages the XRPL gateway issuer and distributor accounts. All IOU issuance actions are processed through compliance-gated workflow. Transfer fees are configured per IOU type. On-chain records are maintained for all trustline and issuance events.",
      finalChecklist: ["XRPL wallet funded and active", "KYC cleared", "Jurisdiction reviewed", "Use case approved", "Trustline parameters confirmed", "Transfer fee agreed", "Governance approval received", "Legal opinion received (if required)", "Trustline activation confirmed on chain"],
    },
  },
  {
    filename: "funding-routes-handbook.pdf",
    title: "Funding Routes Handbook",
    subtitle: "Route Selection, Requirements & Approval Gates",
    audience: "Asset owners, lenders, deal sponsors",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook details all TROPTIONS funding routes: route eligibility matrix, document requirements, approval gates, lender scoring criteria, and route verification procedures. Each route has specific requirements and approval conditions that must be satisfied before any funding engagement.",
      whoFor: "Asset owners selecting appropriate funding routes, lenders evaluating TROPTIONS-assisted transactions, deal sponsors, and deal coordinators preparing funding packages.",
      requiredInfo: ["Asset type and value", "Jurisdiction", "Intended funding structure (loan, equity, streaming, JV, etc.)", "Required funding amount", "Proposed use of funds", "Timeline requirements"],
      requiredDocs: ["Asset documentation package (per asset type)", "Entity documents", "Financial statements (if available)", "Ownership structure diagram", "Proposed term sheet or funding requirements", "Compliance clearance documents"],
      process: [
        { title: "Route Assessment", detail: "Review Funding Route Matrix to identify eligible routes based on asset type, value, jurisdiction, and structure." },
        { title: "Document Assembly", detail: "Assemble required documents for selected route. Use Client Intake Document Checklist as baseline. Supplement with route-specific requirements." },
        { title: "Readiness Scoring", detail: "TROPTIONS scores the funding package against the route's minimum requirements. Score of 80+ required for lender submission." },
        { title: "Gap Resolution", detail: "Address any documentation gaps identified in readiness score. Re-score until threshold is met." },
        { title: "Lender Submission", detail: "Upon readiness confirmation, TROPTIONS prepares lender submission package. No submission occurs without explicit owner and compliance approval." },
        { title: "Lender Due Diligence", detail: "Lender conducts independent due diligence. TROPTIONS coordinates document requests and provides supplementary information." },
        { title: "Terms and Closing", detail: "Lender issues term sheet upon positive diligence. Legal review, negotiation, and closing as per agreed terms." },
      ],
      approvalGates: ["Route eligibility confirmed", "Document package complete", "Readiness score ≥80", "Owner approval for submission", "Compliance clearance", "Lender acceptance", "Legal review complete", "Closing conditions satisfied"],
      readiness: ["Route selected from Funding Route Matrix", "All required documents assembled", "Entity and KYC documents complete", "Financial statements provided", "Ownership structure documented", "Readiness score ≥80"],
      whatBlocked: ["Lender submission before readiness score ≥80", "Any direct execution of funding without legal and compliance approval", "Aave or DeFi protocol execution", "Token-backed lending without securities compliance"],
      blockers: ["Incomplete asset documentation", "Title disputes", "Unresolved liens or encumbrances", "Missing financial statements", "Low readiness score", "Jurisdictional compliance issues"],
      systemHandling: "TROPTIONS processes funding route intake through a scored compliance workflow. The fundingRouteEngine evaluates each submission against route requirements and generates a readiness score. All lender submissions require owner consent and compliance approval.",
      finalChecklist: ["Route selected and confirmed eligible", "All documents assembled and complete", "Readiness score ≥80", "Owner approval documented", "Compliance clearance obtained", "Lender submission package prepared", "Submission approved by TROPTIONS compliance"],
    },
  },
  {
    filename: "master-funding-playbook.pdf",
    title: "Master Funding Playbook",
    subtitle: "End-to-End Funding Process & Controls",
    audience: "Senior operators, deal principals, private credit desks",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "The Master Funding Playbook is the comprehensive guide for TROPTIONS-assisted funding transactions from initial deal intake through closing. It consolidates all route-specific handbooks into an end-to-end process framework with full controls documentation.",
      whoFor: "Senior deal principals, private credit desks evaluating TROPTIONS-assisted transactions, deal coordinators managing complex multi-party funding processes, and institutional partners.",
      requiredInfo: ["Deal overview and structure", "All party identifications (owner, lender, operator, sponsor)", "Full asset portfolio description", "Total funding target and structure", "Jurisdiction(s) involved", "Timeline and key milestones"],
      requiredDocs: ["Master document package (all handbooks' document requirements combined)", "Deal structure overview memorandum", "Full KYC for all principals", "Definitive deal timeline", "Execution authority documentation", "Legal counsel engagement letters"],
      process: [
        { title: "Deal Intake", detail: "Submit master deal intake through TROPTIONS portal. Provide deal overview memo, all party details, and initial document package." },
        { title: "Multi-Party KYC", detail: "Complete KYC for all deal principals. Each party completes individual KYC per the KYC/Onboarding Handbook." },
        { title: "Asset Package Assembly", detail: "Compile comprehensive asset documentation package using applicable RWA, carbon, or other asset-specific handbooks." },
        { title: "Route Selection", detail: "Select optimal funding route(s) using Funding Route Matrix. May involve multiple routes in complex transactions." },
        { title: "Readiness Assessment", detail: "Score each component of the deal package. All components must reach minimum readiness thresholds." },
        { title: "Compliance Review", detail: "Full compliance review of assembled package by TROPTIONS compliance team. Coordinate with applicable external compliance and legal counsel." },
        { title: "Lender Engagement", detail: "Engage qualified lenders with full submission package. TROPTIONS coordinates the diligence process." },
        { title: "Term Negotiation", detail: "Review and negotiate lender terms with deal principals. Legal counsel required for all definitive documents." },
        { title: "Closing", detail: "Coordinate closing checklist: all documents executed, funds confirmed, post-closing deliverables tracked." },
      ],
      approvalGates: ["All party KYC cleared", "Asset package complete", "All route readiness scores met", "Compliance review approved", "Owner/principal submission consent", "Lender acceptance", "All definitive documents executed", "Closing conditions confirmed"],
      readiness: ["Deal overview memo complete", "All principals identified and KYC'd", "Full asset package assembled", "All routes scored at threshold", "Compliance pre-cleared", "Legal counsel engaged", "Lender list confirmed"],
      whatBlocked: ["Any execution without all party KYC", "Lender engagement before readiness threshold", "Any live execution without legal and compliance sign-off", "Use of proceeds before closing conditions confirmed"],
      blockers: ["KYC gaps for any principal", "Asset documentation incomplete", "Route readiness below threshold", "Unresolved compliance flags", "Legal counsel not engaged", "Deal structure ambiguity"],
      systemHandling: "TROPTIONS orchestrates the full deal lifecycle through its compliance-controlled workflow. Each stage gate is logged in the control plane. The deal record tracks document status, readiness score, compliance status, and approval history. No stage advances without prior stage clearance.",
      finalChecklist: ["All principals KYC'd and approved", "Full asset package complete and scored", "All routes confirmed eligible", "Compliance review passed", "Legal counsel confirmed", "Lender submission package approved", "Term sheet reviewed and accepted", "All closing conditions satisfied", "Post-closing deliverables tracked"],
    },
  },
  {
    filename: "funding-route-matrix.pdf",
    title: "Funding Route Matrix",
    subtitle: "Side-by-Side Route Comparison & Eligibility",
    audience: "Asset owners, lenders, deal analysts",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "The Funding Route Matrix provides a quick-reference comparison of all TROPTIONS funding routes including diligence bridges, operator JV structures, royalty and streaming arrangements, and asset-backed credit facilities. Each route has defined eligibility criteria, minimum values, document requirements, and approval authorities.",
      whoFor: "Asset owners selecting the right funding route, deal analysts comparing route options, lenders reviewing eligible structures, and TROPTIONS deal coordinators preparing submissions.",
      requiredInfo: ["Asset type", "Asset value (estimated)", "Asset jurisdiction", "Funding need and purpose", "Preferred structure (debt, equity, streaming, JV)", "Timeline"],
      requiredDocs: ["Asset valuation", "Ownership documentation", "Entity structure", "Jurisdiction compliance declaration", "Intended use of proceeds"],
      process: [
        { title: "Identify Asset Class", detail: "Determine asset class: real estate, mineral rights, equipment, carbon credits, commodities, receivables, or other." },
        { title: "Check Value Minimums", detail: "Each route has minimum asset value requirements. Diligence bridge: $500K+. Operator JV: $1M+. Royalty/streaming: $2M+. Institutional credit: $5M+." },
        { title: "Review Document Requirements", detail: "Each route requires specific documents beyond the base KYC package. Review route column in matrix for full list." },
        { title: "Confirm Eligibility", detail: "Asset must meet route eligibility criteria: clean title, insurable, custodian-compatible, jurisdiction-appropriate, and compliance-cleared." },
        { title: "Score Package", detail: "Submit to TROPTIONS for readiness scoring against selected route. Score ≥80 required for submission." },
      ],
      approvalGates: ["Asset class confirmed eligible for route", "Minimum value threshold met", "Full document package complete", "Readiness score ≥80", "TROPTIONS compliance approval", "Lender acceptance"],
      readiness: ["Route selected", "Asset value confirmed", "Document package for route assembled", "Jurisdiction reviewed", "Readiness scoring submitted"],
      whatBlocked: ["DeFi route execution (Aave blocked)", "Token-backed lending without securities compliance", "Any route below minimum value threshold", "Routes with unresolved title issues"],
      blockers: ["Asset value below route minimum", "Title disputes", "Jurisdiction not supported", "Missing route-specific documents", "Readiness score below 80"],
      systemHandling: "TROPTIONS fundingRouteEngine evaluates each submission against the route matrix and generates a detailed readiness report. The system tracks document status, identifies gaps, and recommends the most eligible route based on current package status.",
      finalChecklist: ["Route selected from matrix", "Asset value meets minimum", "Asset class eligible for route", "Full document package assembled", "Readiness score ≥80", "Jurisdiction compliant", "Compliance approval received"],
    },
  },
  {
    filename: "client-intake-document-checklist.pdf",
    title: "Client Intake Document Checklist",
    subtitle: "Master Document Request for All Asset Types",
    audience: "Asset owners, attorneys, deal coordinators",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This master checklist covers all document categories required for TROPTIONS client intake across all asset types. Use this as the starting point for any engagement. Asset-specific handbooks supplement this baseline with additional requirements.",
      whoFor: "Asset owners beginning the TROPTIONS intake process, attorneys assembling document packages, deal coordinators preparing client submissions.",
      requiredInfo: ["Full legal name(s) of all principals", "Entity structure", "Asset descriptions", "Jurisdiction(s)", "Intended transaction type", "Estimated values"],
      requiredDocs: [
        "IDENTITY: Government-issued photo ID for all principals",
        "IDENTITY: Proof of address for all principals (<90 days)",
        "ENTITY: Certificate of formation/incorporation",
        "ENTITY: Operating agreement or by-laws",
        "ENTITY: Beneficial ownership register",
        "ENTITY: Good standing certificate",
        "ASSET: Title deed, certificate, or ownership instrument",
        "ASSET: Independent valuation/appraisal report",
        "ASSET: Legal opinion on transferability",
        "FINANCIAL: Source of funds declaration",
        "FINANCIAL: Bank statements (3 months)",
        "FINANCIAL: Financial statements (if available)",
        "LEGAL: Corporate resolution authorising transaction",
        "LEGAL: Signatory authority confirmation",
        "COMPLIANCE: AML questionnaire",
        "COMPLIANCE: PEP/sanctions declaration",
        "COMPLIANCE: Jurisdiction compliance declaration",
      ],
      process: [
        { title: "Gather Identity Documents", detail: "Collect government-issued photo ID and proof of address for every principal involved in the transaction." },
        { title: "Gather Entity Documents", detail: "Collect all entity formation documents, operating agreement, and good standing certificate." },
        { title: "Gather Asset Documents", detail: "Collect title documentation, valuation report, and legal opinion for all assets involved." },
        { title: "Gather Financial Documents", detail: "Collect source of funds declaration and supporting financial evidence." },
        { title: "Gather Legal Authority Documents", detail: "Collect corporate resolution and signatory authority documents confirming who can execute on behalf of the entity." },
        { title: "Gather Compliance Documents", detail: "Complete AML questionnaire, PEP/sanctions declaration, and jurisdiction declaration." },
        { title: "Submit Package", detail: "Upload complete package through TROPTIONS secure document portal. All documents are hashed and receipted." },
      ],
      approvalGates: ["Identity documents verified", "Entity documents verified", "Asset documents reviewed", "Financial documents reviewed", "Legal authority confirmed", "Compliance declarations reviewed", "KYC clearance issued"],
      readiness: ["All identity documents current", "Entity documents complete", "Asset documents assembled", "Financial evidence provided", "Legal authority documents signed", "Compliance declarations complete"],
      whatBlocked: ["Submission with incomplete identity documents", "Transaction without confirmed legal authority", "Any proceeding without AML clearance"],
      blockers: ["Expired identity documents", "Missing entity documents", "Valuation report absent", "Source of funds unclear", "Legal authority not confirmed", "Compliance flags unresolved"],
      systemHandling: "TROPTIONS processes all submitted documents through its compliance intake system. Each document is hashed and the hash is submitted to XRPL for audit trail. Document status is tracked in the TROPTIONS control plane.",
      finalChecklist: ["All identity documents current and verified", "All entity documents complete", "Asset documents assembled and verified", "Financial evidence reviewed", "Legal authority confirmed", "All compliance declarations complete", "Package submitted and receipted", "KYC clearance issued"],
    },
  },
  {
    filename: "pate-coal-001-funding-procedure.pdf",
    title: "PATE-COAL-001 Funding Procedure",
    subtitle: "Step-by-Step Funding Process for Pate Prospect",
    audience: "Asset owner, deal coordinator, lender",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This document is the step-by-step funding procedure for PATE-COAL-001, the Pate Prospect coal and mineral rights asset. Current readiness score is 40/100. Eight hard blockers must be resolved before any lender submission can proceed. This document identifies the path to 80+ readiness.",
      whoFor: "The PATE-COAL-001 asset owner, deal coordinator managing the intake, and any lender performing initial diligence review of this specific asset package.",
      requiredInfo: ["Asset: Pate Prospect coal/mineral rights", "Jurisdiction: US (state TBD)", "Current readiness score: 40/100", "Hard blockers: 8", "Recommended routes: Diligence bridge, Operator JV, Royalty/Streaming"],
      requiredDocs: [
        "Title deed or mineral deed (MISSING — Hard Blocker 1)",
        "Mineral rights confirmation (MISSING — Hard Blocker 2)",
        "Tax/lien/UCC clearance (MISSING — Hard Blocker 3)",
        "Engineering/geological report (MISSING — Hard Blocker 4)",
        "Environmental clearance / permitting status (MISSING — Hard Blocker 5)",
        "Commercial/offtake arrangement or evidence (MISSING — Hard Blocker 6)",
        "Legal authority documentation (MISSING — Hard Blocker 7)",
        "Entity formation documents (MISSING — Hard Blocker 8)",
      ],
      process: [
        { title: "Resolve Hard Blockers", detail: "All 8 hard blockers must be resolved before proceeding. Owner must provide the 8 missing document categories listed above." },
        { title: "Supplement Existing Evidence", detail: "Add to the evidence already uploaded: asset description, site photos, and general background. This evidence supports the narrative but cannot substitute for required documents." },
        { title: "Re-Score Package", detail: "Upon resolving all 8 hard blockers, resubmit to TROPTIONS for updated readiness score. Target: ≥80." },
        { title: "Route Confirmation", detail: "Confirm best route: Diligence Bridge ($500K min), Operator JV ($1M min), or Royalty/Streaming ($2M min) based on asset value confirmation." },
        { title: "Lender Submission", detail: "Upon readiness ≥80, submit lender package. No submission without owner consent and TROPTIONS compliance approval." },
      ],
      approvalGates: ["All 8 hard blockers resolved", "Readiness score ≥80", "Route confirmed", "Owner consent for submission", "TROPTIONS compliance approval", "Lender selection confirmed"],
      readiness: ["Hard Blocker 1 (title deed) — OPEN", "Hard Blocker 2 (mineral rights) — OPEN", "Hard Blocker 3 (tax/lien/UCC) — OPEN", "Hard Blocker 4 (engineering report) — OPEN", "Hard Blocker 5 (environmental) — OPEN", "Hard Blocker 6 (commercial/offtake) — OPEN", "Hard Blocker 7 (legal authority) — OPEN", "Hard Blocker 8 (entity documents) — OPEN"],
      whatBlocked: ["Any lender submission before readiness ≥80", "Aave or DeFi execution (permanently blocked)", "Token-backed lending without securities compliance", "Any live funding execution before all approvals"],
      blockers: ["All 8 hard blocker documents missing", "Current readiness 40/100 (well below 80 threshold)", "Route cannot be confirmed until asset value is documented"],
      systemHandling: "TROPTIONS tracks the PATE-COAL-001 package in its control plane. The readiness score is updated each time new documents are submitted. All gate status and document submissions are logged with timestamps. The route engine will recommend the optimal route once readiness reaches 80+.",
      finalChecklist: ["Title deed submitted", "Mineral rights confirmed", "Tax/lien/UCC clear", "Engineering report submitted", "Environmental clearance obtained", "Commercial arrangements documented", "Legal authority confirmed", "Entity documents complete", "Readiness score ≥80", "Owner consent documented", "Route selected"],
    },
  },
  {
    filename: "pate-coal-001-lender-review-packet.pdf",
    title: "PATE-COAL-001 Lender Review Packet",
    subtitle: "Executive Summary, Readiness Score & Financing Routes",
    audience: "Lenders, private credit desks, diligence teams",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "Executive summary for lenders reviewing the Pate Prospect (PATE-COAL-001) coal and mineral rights asset. Current readiness score: 40/100. This packet identifies the 8 hard blockers, the uploaded supporting evidence, recommended financing routes, and what is required before lender submission can be authorised.",
      whoFor: "Lenders, private credit desks, and diligence teams receiving an initial briefing on the PATE-COAL-001 asset. Note: this is a pre-submission briefing only. No lender submission is authorised at current 40/100 readiness.",
      requiredInfo: ["Asset: Pate Prospect coal/mineral rights", "Current readiness: 40/100 (pre-submission)", "Recommended routes: Diligence bridge, Operator JV, Royalty/Streaming", "Status: 8 hard blockers pending resolution"],
      requiredDocs: ["Asset description and background (UPLOADED)", "Site photos / general evidence (UPLOADED)", "Title deed (MISSING)", "Mineral rights documentation (MISSING)", "Tax/lien/UCC clearance (MISSING)", "Engineering/geological report (MISSING)", "Environmental/permitting status (MISSING)", "Commercial/offtake evidence (MISSING)", "Legal authority documentation (MISSING)", "Entity formation documents (MISSING)"],
      process: [
        { title: "Lender Briefing", detail: "Lender reviews this packet as initial briefing. No submission is authorised at current readiness." },
        { title: "Hard Blocker Resolution", detail: "Asset owner resolves all 8 hard blockers. Estimated resolution timeline: 30–90 days depending on title search and legal documentation speed." },
        { title: "Package Re-Scoring", detail: "Upon blocker resolution, TROPTIONS re-scores package. Upon reaching 80+, lender submission is authorised." },
        { title: "Formal Submission", detail: "TROPTIONS provides full lender submission package with all supporting documents, readiness score, and compliance clearance." },
        { title: "Lender Due Diligence", detail: "Lender conducts independent due diligence. TROPTIONS coordinates document requests." },
      ],
      approvalGates: ["Hard blockers resolved", "Readiness score ≥80", "Owner submission consent", "TROPTIONS compliance approval", "Lender interest confirmed"],
      readiness: ["Asset description: COMPLETE", "Site photos: COMPLETE", "Title deed: MISSING", "Mineral rights: MISSING", "Tax/lien/UCC: MISSING", "Engineering report: MISSING", "Environmental/permitting: MISSING", "Commercial evidence: MISSING", "Legal authority: MISSING", "Entity documents: MISSING"],
      whatBlocked: ["Formal lender submission before readiness ≥80", "Aave/DeFi execution — permanently blocked", "Any live financing execution before all approvals"],
      blockers: ["8 of 10 required document categories missing", "40/100 readiness is well below 80 threshold", "Asset value not yet confirmed by independent valuation"],
      systemHandling: "TROPTIONS maintains the PATE-COAL-001 record in its control plane. All document uploads are logged and hashed. The readiness score is recalculated on each submission. This packet is generated from the current system state and reflects the status as of the document date.",
      finalChecklist: ["Lender briefing received", "Hard blocker list reviewed", "Lender available for follow-up after resolution", "TROPTIONS notified of lender interest", "TROPTIONS to notify lender when readiness ≥80"],
    },
  },
  {
    filename: "pate-coal-001-owner-document-request.pdf",
    title: "PATE-COAL-001 Owner Document Request",
    subtitle: "Checklist: Title, Mineral Rights, Permits, Legal, Commercial",
    audience: "Asset owner, legal counsel",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This document is a formal request to the PATE-COAL-001 asset owner for all documents required to advance the Pate Prospect funding package from 40/100 to ≥80/100 readiness. Nine document categories are required. None of the eight hard-blocker categories have been received to date.",
      whoFor: "The PATE-COAL-001 asset owner and their legal counsel assembling the required documentation.",
      requiredInfo: ["Asset owner full legal name", "Entity name (if applicable)", "Attorney contact (if documents require legal certification)", "Preferred document delivery method"],
      requiredDocs: [
        "CATEGORY 1 — TITLE: Deed or mineral deed showing current ownership",
        "CATEGORY 1 — TITLE: Chain of title documentation if multiple transfers",
        "CATEGORY 2 — MINERAL RIGHTS: Mineral rights deed or leasehold agreement",
        "CATEGORY 2 — MINERAL RIGHTS: Confirmation of surface vs. subsurface rights split",
        "CATEGORY 3 — TAX / LIENS / UCC: Current property tax receipts",
        "CATEGORY 3 — TAX / LIENS / UCC: Lien search results (state and county)",
        "CATEGORY 3 — TAX / LIENS / UCC: UCC search results",
        "CATEGORY 4 — ENGINEERING: Geological survey or engineering assessment",
        "CATEGORY 4 — ENGINEERING: Resource estimate (if available)",
        "CATEGORY 5 — ENVIRONMENTAL: Mine permits or permit applications",
        "CATEGORY 5 — ENVIRONMENTAL: Environmental assessment or Phase I report",
        "CATEGORY 5 — ENVIRONMENTAL: Reclamation bond status",
        "CATEGORY 6 — COMMERCIAL: Offtake agreement or letter of intent",
        "CATEGORY 6 — COMMERCIAL: Buyer identification and credit confirmation",
        "CATEGORY 7 — LEGAL AUTHORITY: Corporate resolution authorising transaction",
        "CATEGORY 7 — LEGAL AUTHORITY: Signatory authority documentation",
        "CATEGORY 8 — ENTITY: Certificate of formation",
        "CATEGORY 8 — ENTITY: Operating agreement",
        "CATEGORY 9 — XRPL RECEIPT: XRPL wallet address for IOU receipt",
      ],
      process: [
        { title: "Prioritise Hard Blockers", detail: "Categories 1–8 are hard blockers. Gather these first. Category 9 (XRPL) is optional at this stage." },
        { title: "Engage Legal Counsel", detail: "Title search (Category 1–2) and lien search (Category 3) require licensed attorneys or title companies in the asset's jurisdiction." },
        { title: "Order Engineering Report", detail: "Category 4 requires engagement of a licensed engineer or geologist. Allow 2–4 weeks for report." },
        { title: "Obtain Environmental Status", detail: "Contact relevant state/federal agency for permit status and any outstanding environmental issues." },
        { title: "Compile and Submit", detail: "Once all categories are assembled, submit to TROPTIONS via secure document portal. TROPTIONS will re-score and notify." },
      ],
      approvalGates: ["All 9 categories submitted", "Documents verified by TROPTIONS compliance", "Hard blockers confirmed resolved", "Readiness re-scored ≥80"],
      readiness: ["Category 1 (Title) — OPEN", "Category 2 (Mineral Rights) — OPEN", "Category 3 (Tax/Liens/UCC) — OPEN", "Category 4 (Engineering) — OPEN", "Category 5 (Environmental) — OPEN", "Category 6 (Commercial) — OPEN", "Category 7 (Legal Authority) — OPEN", "Category 8 (Entity) — OPEN", "Category 9 (XRPL) — OPTIONAL"],
      whatBlocked: ["No lender submission until all 8 hard-blocker categories are received and verified"],
      blockers: ["All 8 hard-blocker categories currently missing", "Timeline depends on speed of title search and legal document assembly"],
      systemHandling: "TROPTIONS will update the readiness score upon receipt of each document category. The owner will receive a status update notification each time a new document is processed.",
      finalChecklist: ["Title documentation submitted", "Mineral rights documentation submitted", "Tax/lien/UCC search results submitted", "Engineering report submitted", "Environmental/permitting status submitted", "Commercial evidence submitted", "Legal authority documents submitted", "Entity documents submitted", "All documents verified by TROPTIONS"],
    },
  },
  {
    filename: "pate-coal-001-route-verification-guide.pdf",
    title: "PATE-COAL-001 Route Verification Guide",
    subtitle: "Deployment Checklist & Route Verification Procedures",
    audience: "Deal coordinators, technical operators",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This guide covers verification procedures for all 5 PATE-COAL-001 routes: asset overview, lender review packet, owner document request, funding procedure, and compliance status. It provides expected API responses, verification checks, and simulationOnly enforcement verification.",
      whoFor: "Technical operators verifying PATE-COAL-001 routes, deal coordinators confirming deployment status, and compliance teams checking simulationOnly enforcement.",
      requiredInfo: ["Route URLs for all 5 PATE-COAL-001 pages", "Expected simulationOnly status in all API responses", "Compliance status indicators"],
      requiredDocs: ["Route deployment confirmation", "API response samples", "SimulationOnly verification log"],
      process: [
        { title: "Verify Route 1: Asset Overview", detail: "/troptions/rwa/pate-coal — Confirm page loads, shows readiness score 40/100, shows simulationOnly status." },
        { title: "Verify Route 2: Lender Packet", detail: "Confirm PATE-COAL-001 lender review packet is accessible and shows correct readiness and blocking status." },
        { title: "Verify Route 3: Owner Document Request", detail: "Confirm owner document request page shows all 9 categories with correct status (all OPEN)." },
        { title: "Verify Route 4: Funding Procedure", detail: "Confirm funding procedure page shows step-by-step process with hard blockers identified." },
        { title: "Verify API: SimulationOnly", detail: "Call /api/troptions/rwa/pate-coal — confirm response includes simulationOnly:true and no live execution markers." },
      ],
      approvalGates: ["All 5 routes accessible", "SimulationOnly confirmed in all responses", "No live execution markers present", "Compliance status visible on all routes"],
      readiness: ["Route 1 (overview) confirmed", "Route 2 (lender packet) confirmed", "Route 3 (owner request) confirmed", "Route 4 (funding procedure) confirmed", "Route 5 (API) confirmed", "SimulationOnly verified"],
      whatBlocked: ["Any live execution endpoint", "Any non-simulationOnly response", "Any route showing active funding execution status"],
      blockers: ["Route not accessible", "SimulationOnly not confirmed", "API returning incorrect status"],
      systemHandling: "TROPTIONS system enforces simulationOnly status on all PATE-COAL-001 routes. No live execution is possible. Any response not containing simulationOnly:true should be treated as a system error and reported immediately.",
      finalChecklist: ["All 5 routes accessible and rendering correctly", "SimulationOnly confirmed on all routes and API", "Readiness score 40/100 displayed correctly", "Hard blockers visible", "No live execution functionality present", "Compliance status visible"],
    },
  },
  {
    filename: "axl-001-rwa-financing-checklist.pdf",
    title: "AXL-001 RWA Financing Checklist",
    subtitle: "Asset Financing Readiness & Due Diligence",
    audience: "Asset owners, lenders, compliance officers",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "Complete financing checklist for the AXL-001 RWA package. This checklist covers asset verification, legal wrapper requirements, custody confirmation, lender requirements, and all approval conditions for the AXL-001 asset financing process.",
      whoFor: "The AXL-001 asset owner, lenders reviewing the AXL-001 package, and compliance officers processing the AXL-001 intake.",
      requiredInfo: ["AXL-001 asset description and location", "Current ownership structure", "Estimated value and basis", "Intended financing structure", "Legal jurisdiction"],
      requiredDocs: ["AXL-001 title documentation", "Independent valuation report", "Legal opinion on asset structure", "Entity documents for all parties", "Custody arrangement (if applicable)", "Financing intent letter"],
      process: [
        { title: "Asset Verification", detail: "Verify AXL-001 asset details: confirm ownership, value, and legal status." },
        { title: "Legal Wrapper", detail: "Confirm appropriate legal wrapper is in place or in preparation for the AXL-001 asset." },
        { title: "Custody Confirmation", detail: "For physical assets: confirm custody arrangement with qualified custodian." },
        { title: "Checklist Completion", detail: "Complete all items in the AXL-001 financing checklist before proceeding to lender submission." },
        { title: "Submission", detail: "Upon 100% checklist completion and compliance approval, proceed to lender submission." },
      ],
      approvalGates: ["Asset verified", "Legal wrapper confirmed", "Custody arranged (if applicable)", "Checklist 100% complete", "Compliance approval", "Lender submission authorised"],
      readiness: ["Asset title confirmed", "Valuation received", "Legal opinion received", "Entity documents complete", "Custody confirmed", "Financing structure agreed", "Compliance reviewed"],
      whatBlocked: ["Lender submission before checklist 100%", "Live execution before all approvals"],
      blockers: ["Missing title documentation", "Valuation not received", "Legal wrapper incomplete", "Custody not arranged"],
      systemHandling: "TROPTIONS tracks AXL-001 checklist completion in the control plane. Each item must be confirmed before the system advances the status to lender-ready.",
      finalChecklist: ["All asset documents complete", "Legal wrapper confirmed", "Custody arranged", "Entity documents complete", "Checklist 100%", "Compliance approval received", "Lender submission authorised"],
    },
  },
  {
    filename: "legacy-token-migration-handbook.pdf",
    title: "Legacy Token Migration Handbook",
    subtitle: "Migration Procedures, Eligibility & Controls",
    audience: "Legacy token holders, compliance teams",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers TROPTIONS procedures for legacy token migration. Legacy tokens require eligibility verification, document submission, and multi-gate compliance approval before any migration can be processed. Migration is not automatic and is subject to current legal and compliance review.",
      whoFor: "Holders of legacy TROPTIONS tokens seeking migration status and procedure information, compliance teams processing migration requests.",
      requiredInfo: ["Legacy token type and amount", "Wallet address(es) holding legacy tokens", "Acquisition documentation", "Holder identity (KYC required)"],
      requiredDocs: ["Proof of legacy token holdings", "Acquisition documentation (transaction records)", "Identity documents (KYC)", "Source of token acquisition declaration", "Migration intent statement"],
      process: [
        { title: "Submit Migration Request", detail: "Submit migration intake form through TROPTIONS portal. Provide token details, holding wallet, and initial documentation." },
        { title: "KYC Completion", detail: "Complete full KYC process per KYC/Onboarding Handbook." },
        { title: "Holdings Verification", detail: "TROPTIONS verifies token holdings against blockchain records." },
        { title: "Eligibility Review", detail: "Compliance team reviews eligibility: token type, acquisition history, source documentation." },
        { title: "Migration Processing", detail: "Upon full approval, migration is processed. Timeline dependent on compliance review completion." },
      ],
      approvalGates: ["Holdings verified", "KYC cleared", "Acquisition documentation accepted", "Eligibility confirmed", "Compliance approval", "Migration processed"],
      readiness: ["Holdings documented", "KYC complete", "Acquisition records provided", "Eligibility reviewed", "Compliance approval obtained"],
      whatBlocked: ["Automatic migration without compliance review", "Migration of tokens with unclear acquisition history", "Migration without KYC clearance"],
      blockers: ["Unclear acquisition history", "Missing token transaction records", "KYC incomplete", "Compliance flags unresolved"],
      systemHandling: "TROPTIONS processes all migration requests through its compliance-controlled workflow. No migration is automatic. The control plane tracks migration status, document submissions, and approval history.",
      finalChecklist: ["Holdings verified on chain", "Acquisition documentation complete", "KYC cleared", "Eligibility confirmed", "Compliance approval received", "Migration instruction issued"],
    },
  },
  {
    filename: "buyback-review-handbook.pdf",
    title: "Buyback Review Handbook",
    subtitle: "Token Buyback Readiness & Approval Gates",
    audience: "Token holders, governance participants",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers TROPTIONS token buyback programs: readiness criteria, legal requirements, governance approval process, treasury controls, and current status. All token buyback execution is blocked pending legal, compliance, and governance approval. This handbook explains the path to approval.",
      whoFor: "Token holders interested in buyback programs, governance participants reviewing buyback proposals, and compliance teams processing buyback requests.",
      requiredInfo: ["Token type and amount", "Holder identity", "Intended buyback route (treasury, open market, OTC)", "Jurisdiction"],
      requiredDocs: ["Token holding documentation", "KYC documents", "Buyback intent statement", "Legal opinion (if required)", "Governance proposal (for program-level buybacks)"],
      process: [
        { title: "Legal Review", detail: "Obtain legal opinion confirming buyback structure is permissible in applicable jurisdictions." },
        { title: "Compliance Review", detail: "Compliance team reviews buyback proposal against current regulatory environment." },
        { title: "Governance Proposal", detail: "Submit formal governance proposal for buyback program approval." },
        { title: "Treasury Review", detail: "Treasury team confirms availability of funds for buyback." },
        { title: "Governance Vote", detail: "Governance participants vote on buyback proposal." },
        { title: "Execution (if approved)", detail: "Upon governance approval and legal clearance, buyback is executed per approved terms." },
      ],
      approvalGates: ["Legal opinion received", "Compliance review passed", "Governance proposal submitted", "Treasury capacity confirmed", "Governance vote approved", "Execution instruction issued"],
      readiness: ["Legal counsel engaged", "Compliance review initiated", "Governance proposal drafted", "Treasury review requested", "Token holder documentation complete"],
      whatBlocked: ["Any buyback execution without governance approval", "Open market buybacks without securities compliance", "Treasury disbursement without all approvals"],
      blockers: ["Legal opinion pending", "Governance proposal not yet submitted", "Treasury capacity unconfirmed", "Regulatory environment unclear"],
      systemHandling: "TROPTIONS tracks buyback proposals in its governance system. All proposals require multi-gate approval. No treasury disbursement is possible without all approval gates cleared.",
      finalChecklist: ["Legal opinion received", "Compliance approved", "Governance proposal voted and approved", "Treasury capacity confirmed", "Execution instructions issued", "Post-buyback reporting complete"],
    },
  },
  {
    filename: "liquidity-pool-readiness-handbook.pdf",
    title: "Liquidity Pool Readiness Handbook",
    subtitle: "LP Setup, Compliance & Approval Requirements",
    audience: "DeFi operators, liquidity providers, compliance teams",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This handbook covers readiness requirements for TROPTIONS liquidity pool participation: legal entity requirements, KYC/AML controls, smart contract audit requirements, governance approval gates, and current status. All LP execution remains blocked pending full legal, regulatory, and governance approvals.",
      whoFor: "Prospective liquidity providers, DeFi operators, and compliance teams reviewing LP participation requirements.",
      requiredInfo: ["Entity structure", "Jurisdiction", "Intended LP contribution amount", "Target pool(s)", "Risk tolerance declaration"],
      requiredDocs: ["Entity formation documents", "KYC documents", "Smart contract audit (if operating LP contract)", "Legal opinion on LP participation", "Regulatory clearance (jurisdiction-specific)"],
      process: [
        { title: "Legal Entity Requirement", detail: "LP participation requires a properly formed legal entity in a supported jurisdiction." },
        { title: "KYC/AML Clearance", detail: "Complete full KYC per KYC/Onboarding Handbook. All LP participants require AML clearance." },
        { title: "Smart Contract Audit", detail: "Any LP contract must be audited by a qualified smart contract auditor." },
        { title: "Regulatory Review", detail: "Obtain legal opinion on LP participation eligibility in your jurisdiction." },
        { title: "Governance Approval", detail: "Submit LP participation request for governance approval." },
        { title: "Execution (if approved)", detail: "Upon all approvals, LP execution instruction issued per approved terms." },
      ],
      approvalGates: ["Legal entity confirmed", "KYC/AML cleared", "Smart contract audit complete", "Legal opinion received", "Regulatory clearance obtained", "Governance approval received"],
      readiness: ["Legal entity formed", "KYC complete", "Audit commissioned", "Legal opinion requested", "Regulatory review initiated"],
      whatBlocked: ["Any LP execution without full approval chain", "Participation by unverified entities", "LP contracts without audit"],
      blockers: ["Legal entity not formed", "KYC incomplete", "Audit not commissioned", "Regulatory environment unclear"],
      systemHandling: "TROPTIONS does not provide LP execution services. This handbook covers the requirements that would need to be met if LP participation were approved. All LP execution is blocked pending multi-party approval.",
      finalChecklist: ["Legal entity confirmed", "KYC cleared", "Smart contract audit complete", "Legal opinion received", "Regulatory clearance obtained", "Governance approved", "LP execution instruction issued"],
    },
  },
  {
    filename: "wallet-mint-noncustodial-guide.pdf",
    title: "Wallet Mint / Non-Custodial Wallet Guide",
    subtitle: "Wallet Setup, XRPL Trustlines & Non-Custodial Controls",
    audience: "Participants, operators, asset owners",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This guide covers TROPTIONS non-custodial wallet setup: XRPL wallet creation, trustline establishment, reserve requirements, security controls, and non-custodial usage. TROPTIONS does not provide custodial wallet services. All wallets are self-custodied by the participant.",
      whoFor: "Participants setting up XRPL wallets, operators configuring trustlines, and asset owners preparing wallets for IOU receipt.",
      requiredInfo: ["Intended wallet use (personal, entity, operator)", "XRPL account address (once created)", "Trustline requirements (currency, limit)", "Reserve confirmation (20 XRP minimum + 2 XRP per trustline)"],
      requiredDocs: ["KYC clearance (for trustline activation)", "Wallet address verification (signed transaction)", "Use case declaration"],
      process: [
        { title: "Wallet Creation", detail: "Create XRPL wallet using a reputable non-custodial wallet provider (XUMM/Xaman, Ledger, etc.). TROPTIONS does not create or hold wallets." },
        { title: "Reserve Funding", detail: "Fund wallet with minimum 20 XRP reserve. Each trustline requires an additional 2 XRP reserve." },
        { title: "Wallet Verification", detail: "Verify wallet ownership by signing a TROPTIONS verification memo transaction." },
        { title: "KYC Linkage", detail: "Link verified wallet address to your TROPTIONS KYC profile." },
        { title: "Trustline Setup", detail: "Set up trustlines to the TROPTIONS issuer account (rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ) for applicable currencies." },
        { title: "Security Review", detail: "Review wallet security: backup seed phrase securely, enable account security features, confirm signing authority." },
      ],
      approvalGates: ["KYC cleared", "Wallet verified", "Reserve met", "Trustline application approved", "Trustline activated"],
      readiness: ["Wallet created", "Reserve funded (20+ XRP)", "Wallet verified", "KYC linked", "Trustlines configured"],
      whatBlocked: ["TROPTIONS does not provide custody", "No funds are held by TROPTIONS", "No trading execution", "Trustline activation without KYC"],
      blockers: ["Insufficient XRP reserve", "KYC not complete", "Wallet not verified", "Trustline application not approved"],
      systemHandling: "TROPTIONS manages trustline approvals through its compliance workflow. The issuer account (rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ) is operated by TROPTIONS. All trustline setups and IOU issuances are compliance-gated.",
      finalChecklist: ["XRPL wallet created and funded", "Minimum 20 XRP reserve confirmed", "Wallet verified by signed memo", "KYC profile linked", "Trustline application submitted", "Trustline approved and active", "Seed phrase secured offline"],
    },
  },
  {
    filename: "rust-runtime-control-layer-overview.pdf",
    title: "Rust Runtime / L1 Control Layer Overview",
    subtitle: "Layer 1 Architecture, Consensus & Governance",
    audience: "Technical operators, node operators, governance participants",
    version: "v1.0 · April 28, 2026",
    body: {
      summary: "This document provides a technical overview of the TROPTIONS Rust L1 control layer: crate architecture, consensus model, governance controls, bridge interfaces to XRPL and Stellar, and deployment requirements. The L1 layer provides the governance backbone for TROPTIONS platform controls.",
      whoFor: "Technical operators, node operators, and governance participants needing to understand the L1 architecture. This is a technical document intended for experienced blockchain developers and operators.",
      requiredInfo: ["Node operator jurisdiction", "Hardware requirements confirmation", "Governance participation intent", "Technical qualifications"],
      requiredDocs: ["Technical operator agreement", "KYC documents", "Node hardware specification", "Governance participation declaration"],
      process: [
        { title: "Architecture Review", detail: "Review L1 crate structure: apostle-api, apostle-types, apostle-ledger, apostle-consensus, apostle-settlement, apostle-bridge, apostle-mesh." },
        { title: "Consensus Model", detail: "Understand consensus: 50ms tick proposer loop, mempool-driven block production, fast-path settlement, bridge interfaces to XRPL and Stellar." },
        { title: "Governance Controls", detail: "Review governance: multi-gate approval requirements, capability-level controls, simulationOnly enforcement, and control plane audit trail." },
        { title: "Bridge Interfaces", detail: "Review XRPL and Stellar bridge interfaces: settlement connectors, asset enum (ATP/UNY/USDF/XRP/XLM), and bridge transaction signing." },
        { title: "Node Operator Setup", detail: "Node operator requirements: Rust toolchain, hardware specs, network access, key management, and governance participation." },
      ],
      approvalGates: ["Technical qualifications verified", "KYC cleared", "Operator agreement signed", "Hardware requirements met", "Network access confirmed", "Governance approval for node activation"],
      readiness: ["Architecture reviewed", "Consensus model understood", "Governance controls reviewed", "Bridge interfaces reviewed", "Hardware prepared", "Key management configured"],
      whatBlocked: ["Node activation without governance approval", "Bridge execution without full approval chain", "Any live settlement without all approvals"],
      blockers: ["Technical qualifications not verified", "Hardware requirements not met", "KYC incomplete", "Governance approval pending"],
      systemHandling: "The TROPTIONS L1 control layer is managed through governance-controlled processes. Node operator activation, bridge configuration, and settlement execution all require multi-gate approval. The control plane maintains full audit trail of all L1 actions.",
      finalChecklist: ["Architecture reviewed and understood", "Technical qualifications confirmed", "KYC cleared", "Operator agreement signed", "Hardware ready", "Key management configured", "Governance approval received", "Node activated per governance instruction"],
    },
  },
];

// ─── Main generation loop ─────────────────────────────────────────────────────
let generated = 0;
let skipped = 0;

for (const pdf of PDFS) {
  const outPath = path.join(OUT_DIR, pdf.filename);
  process.stdout.write(`  Generating ${pdf.filename} ... `);

  try {
    const { doc, stream } = createDoc(outPath);

    // Cover
    addCover(doc, pdf.title, pdf.subtitle, pdf.audience, pdf.version);

    // Body
    addStandardBody(doc, pdf.body);

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    const stat = fs.statSync(outPath);
    console.log(`✅  ${(stat.size / 1024).toFixed(1)} KB`);
    generated++;
  } catch (err) {
    console.log(`❌  ERROR: ${err.message}`);
    skipped++;
  }
}

console.log(`\n✅  Generated: ${generated}  ·  Failed: ${skipped}`);
console.log(`📁  Output: ${OUT_DIR}\n`);
