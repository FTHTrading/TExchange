import type { XrplIssuedAssetRecord } from "@/content/troptions/xrplIssuedAssetRegistry";

export function XrplIssuedAssetCard({ asset }: { readonly asset: XrplIssuedAssetRecord }) {
  return (
    <article className="xp-card">
      <p className="xp-label">Issued Asset</p>
      <h2 className="xp-value">{asset.symbol}</h2>
      <p className="xp-muted">{asset.assetType} via {asset.issuerModel}</p>
      <div className="xp-badgeRow">
        <span className={`xp-badge ${asset.freezeEnabled ? "xp-badge-medium" : "xp-badge-low"}`}>{asset.freezeEnabled ? "freeze enabled" : "no freeze"}</span>
        <span className={`xp-badge ${asset.clawbackEnabled ? "xp-badge-high" : "xp-badge-low"}`}>{asset.clawbackEnabled ? "clawback enabled" : "no clawback"}</span>
        <span className={`xp-badge ${asset.trustlineRequired ? "xp-badge-medium" : "xp-badge-low"}`}>{asset.trustlineRequired ? "trustline required" : "no trustline"}</span>
      </div>
    </article>
  );
}