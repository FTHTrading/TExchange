import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XRPL/Stellar Institutional Compliance Readiness | TROPTIONS",
  description:
    "TROPTIONS XRPL and Stellar institutional compliance readiness framework. " +
    "ISO 20022 message compatibility readiness, GENIUS Act readiness, " +
    "FATF/Travel Rule readiness, jurisdiction-aware compliance controls. " +
    "Simulation-only. Legal review required.",
};

export default function XrplStellarCompliancePublicPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900">
          XRPL/Stellar Institutional Compliance Readiness
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          TROPTIONS is building jurisdiction-aware, institutional-grade compliance
          infrastructure for XRPL and Stellar network operations. All controls are
          in simulation-only or read-only mode. No live mainnet transactions are
          executed through this framework. Legal review is required before production
          activation.
        </p>
      </section>

      {/* Safety Disclaimer */}
      <section className="bg-yellow-50 border border-yellow-300 rounded p-6">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">
          Compliance Readiness — Not Certified Compliance
        </h2>
        <ul className="space-y-1 text-sm text-yellow-700 list-disc list-inside">
          <li>
            <strong>ISO 20022:</strong> Message compatibility readiness only —
            TROPTIONS is not an ISO 20022 certified product or certified coin.
          </li>
          <li>
            <strong>GENIUS Act:</strong> Readiness evaluation only —
            TROPTIONS has not received GENIUS Act approval.
          </li>
          <li>
            <strong>Jurisdictions:</strong> All operations require jurisdiction-specific
            legal counsel. No operation is globally compliant without review.
          </li>
          <li>
            <strong>Live execution:</strong> All controls are simulation-only.
            No mainnet transactions are submitted by this framework.
          </li>
        </ul>
      </section>

      {/* Framework Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compliance Framework</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">ISO 20022 Message Readiness</h3>
            <p className="text-sm text-gray-600">
              Mapping XRPL and Stellar operations to ISO 20022 message-concept
              equivalents for institutional messaging gateway integration readiness.
              ISO 20022 is a financial messaging standard — it does not certify a
              token or blockchain network.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">GENIUS Act Readiness Engine</h3>
            <p className="text-sm text-gray-600">
              Evaluating TROPTIONS stablecoin-adjacent operations against GENIUS Act
              framework criteria — reserve transparency, issuer controls, and
              redemption right architecture. Legal counsel review required.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">FATF / Travel Rule Readiness</h3>
            <p className="text-sm text-gray-600">
              Preparing originator/beneficiary information capture capabilities for
              FATF Travel Rule compliance in applicable jurisdictions. VASPs require
              jurisdiction-specific legal implementation.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">AML / Sanctions Screening Readiness</h3>
            <p className="text-sm text-gray-600">
              Simulation-mode AML/KYC/KYB screening gate — evaluates operational
              readiness for sanctions screening integration. OFAC, EU, UK, and UN
              sanctions lists applicable. No live screening is performed without
              a licensed screening provider.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">XRPL Account Flag Policy</h3>
            <p className="text-sm text-gray-600">
              Institutional-grade XRPL account configuration guidance — asfRequireAuth,
              asfRequireDestTag, asfNoFreeze, asfDisableMaster, and related issuer flags.
              All account changes are unsigned templates only. Irreversible flags require
              explicit acknowledgment.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Stellar Issuer Policy</h3>
            <p className="text-sm text-gray-600">
              Stellar AUTH_REQUIRED, AUTH_REVOCABLE, AUTH_IMMUTABLE, and CLAWBACK_ENABLED
              flag guidance. Trustline authorization controls and home domain configuration
              for institutional Stellar asset issuers. All operations are simulation-only.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Jurisdiction Matrix</h3>
            <p className="text-sm text-gray-600">
              Per-jurisdiction compliance profiles for US, EU, UK, SG, HK, UAE, CA,
              LATAM, and GLOBAL_FATF. All jurisdictions require legal review before
              production activation. No jurisdiction is enabled by default.
            </p>
          </div>
          <div className="border rounded p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Public Claim Policy</h3>
            <p className="text-sm text-gray-600">
              Automated review of public marketing claims against prohibited language —
              prevents &ldquo;ISO 20022 certified&rdquo;, &ldquo;GENIUS Act approved&rdquo;,
              &ldquo;guaranteed yield&rdquo;, and similar prohibited claims from
              appearing in public communications.
            </p>
          </div>
        </div>
      </section>

      {/* Jurisdiction List */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Jurisdiction Coverage</h2>
        <p className="text-sm text-gray-600 mb-4">
          Each jurisdiction has a compliance profile defining applicable regulations,
          required evidence, required legal approvals, and production activation status.
          All jurisdictions have{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">productionActivationStatus: &ldquo;disabled&rdquo;</code>{" "}
          until legal review is complete.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {["United States (US)", "European Union (EU)", "United Kingdom (UK)",
            "Singapore (SG)", "Hong Kong (HK)", "United Arab Emirates (UAE)",
            "Canada (CA)", "Latin America (LATAM)", "FATF Global Standard"].map((j) => (
            <div key={j} className="border rounded px-4 py-3 text-sm text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
              {j}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Red indicators = production activation disabled. Legal review required.
        </p>
      </section>

      {/* Footer */}
      <section className="border-t pt-6">
        <p className="text-xs text-gray-500 leading-relaxed">
          TROPTIONS XRPL/Stellar Institutional Compliance Readiness Framework.
          This framework is for readiness evaluation and simulation only.
          It does not constitute legal advice, financial advice, or regulatory approval.
          TROPTIONS does not guarantee liquidity, yield, profit, or returns.
          All XRPL and Stellar operations require independent legal counsel and
          jurisdiction-specific licensing before production activation.
          TROPTIONS is not ISO 20022 certified. TROPTIONS has not received GENIUS Act approval.
        </p>
      </section>
    </main>
  );
}
