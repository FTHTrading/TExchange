export interface XrplIssuedAssetRecord {
  readonly id: string;
  readonly symbol: string;
  readonly assetType: "claim-receipt" | "settlement" | "evidence-marker" | "regulated-asset";
  readonly issuerModel: string;
  readonly freezeEnabled: boolean;
  readonly clawbackEnabled: boolean;
  readonly trustlineRequired: boolean;
}

export const XRPL_ISSUED_ASSET_REGISTRY: readonly XrplIssuedAssetRecord[] = [
  { id: "asset-optkas", symbol: "OPTKAS", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-sovbnd", symbol: "SOVBND", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-imperia", symbol: "IMPERIA", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-gemvlt", symbol: "GEMVLT", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-terravl", symbol: "TERRAVL", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-petro", symbol: "PETRO", assetType: "claim-receipt", issuerModel: "XRPL IOU", freezeEnabled: true, clawbackEnabled: false, trustlineRequired: true },
  { id: "asset-attest", symbol: "ATTEST", assetType: "evidence-marker", issuerModel: "XLS-20 proof marker", freezeEnabled: false, clawbackEnabled: false, trustlineRequired: false },
];