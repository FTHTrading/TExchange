export interface XrplTrustlineRecord {
  readonly id: string;
  readonly holder: string;
  readonly issuer: string;
  readonly currency: string;
  readonly limit: string;
  readonly freezeRisk: "low" | "medium" | "high";
  readonly issuerRisk: "low" | "medium" | "high";
  readonly status: "authorized" | "pending" | "review-required";
}

export const XRPL_TRUSTLINE_REGISTRY: readonly XrplTrustlineRecord[] = [
  { id: "tl-1", holder: "rncYwc1ss8AdV2vKjaYwMAEj7RNRfKRV4r", issuer: "OPTKAS Issuer", currency: "OPTKAS", limit: "500000", freezeRisk: "medium", issuerRisk: "medium", status: "authorized" },
  { id: "tl-2", holder: "rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr", issuer: "OPTKAS Issuer", currency: "SOVBND", limit: "250000", freezeRisk: "medium", issuerRisk: "medium", status: "authorized" },
  { id: "tl-3", holder: "rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX", issuer: "OPTKAS Issuer", currency: "PETRO", limit: "100000", freezeRisk: "high", issuerRisk: "high", status: "review-required" },
];