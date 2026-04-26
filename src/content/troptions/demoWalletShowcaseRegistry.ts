export interface DemoWalletAsset {
  readonly symbol: string;
  readonly assetType: "stablecoin" | "iou" | "regulated-asset" | "lp" | "nft" | "token";
  readonly purpose: string;
}

export interface DemoWalletLink {
  readonly label: string;
  readonly url: string;
}

export interface DemoWalletPoolReference {
  readonly pair: string;
  readonly network: "XRPL" | "Stellar";
  readonly status: "Live";
  readonly verificationUrl: string;
}

export interface DemoWalletShowcaseItem {
  readonly id: string;
  readonly label: string;
  readonly network: "XRPL" | "Stellar" | "XRPL + Stellar";
  readonly address?: string;
  readonly source: string;
  readonly walletType: "treasury" | "issuer" | "anchor" | "distribution" | "liquidity" | "evidence" | "trading";
  readonly summary: string;
  readonly assets: readonly DemoWalletAsset[];
  readonly explorerLinks: readonly DemoWalletLink[];
  readonly poolReferences?: readonly DemoWalletPoolReference[];
}

export const DEMO_WALLET_SHOWCASE: readonly DemoWalletShowcaseItem[] = [
  {
    id: "optkas-genesis-wallet",
    label: "OPTKAS Genesis Wallet",
    network: "XRPL",
    address: "rncYwc1ss8AdV2vKjaYwMAEj7RNRfKRV4r",
    source: "Local OPTKAS checkpoint wallet route",
    walletType: "treasury",
    summary: "Local checkpoint wallet configured as the default OPTKAS operational account with FTHUSD, USDF, UNY, and gold-token balances in the upstream bridge.",
    assets: [
      { symbol: "FTHUSD", assetType: "stablecoin", purpose: "Internal USD settlement and portal balances" },
      { symbol: "USDF", assetType: "stablecoin", purpose: "XRPL and Stellar settlement rail demonstration" },
      { symbol: "UNY", assetType: "token", purpose: "Treasury-linked utility token exposure" },
      { symbol: "XAUT", assetType: "token", purpose: "Gold-linked reference asset preview" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rncYwc1ss8AdV2vKjaYwMAEj7RNRfKRV4r" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rncYwc1ss8AdV2vKjaYwMAEj7RNRfKRV4r" },
    ],
    poolReferences: [
      { pair: "OPTKAS / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
      { pair: "SOVBND / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
      { pair: "IMPERIA / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
    ],
  },
  {
    id: "fth-usdf-route",
    label: "FTH / USDF Settlement Route",
    network: "XRPL + Stellar",
    source: "Local UnyKorn knowledge docs",
    walletType: "distribution",
    summary: "Multi-chain USDF route documented locally with settlement connectors across XRPL and Stellar and positioned for regulated stablecoin operations.",
    assets: [
      { symbol: "USDF", assetType: "stablecoin", purpose: "Multi-chain stablecoin settlement" },
      { symbol: "XLM", assetType: "lp", purpose: "Stellar AMM and anchor liquidity side" },
      { symbol: "XRP", assetType: "lp", purpose: "XRPL routing and AMM liquidity side" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/" },
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public" },
    ],
    poolReferences: [
      { pair: "TERRAVL / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
      { pair: "PETRO / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
      { pair: "OPTKAS-USD / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public" },
      { pair: "SOVBND-USD / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public" },
      { pair: "IMPERIA-USD / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public" },
    ],
  },
  {
    id: "inventory-xrpl-alpha",
    label: "Recovered XRPL Inventory A",
    network: "XRPL",
    address: "rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1",
    source: "Local wallet inventory snapshot",
    walletType: "trading",
    summary: "Public XRPL address recovered from the local wallet inventory snapshot and suitable for demonstrating a controlled-wallet view.",
    assets: [
      { symbol: "XRP", assetType: "token", purpose: "Base settlement token" },
      { symbol: "OPTKAS", assetType: "iou", purpose: "Primary bond claim receipt" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1" },
    ],
  },
  {
    id: "inventory-xrpl-beta",
    label: "Recovered XRPL Inventory B",
    network: "XRPL",
    address: "rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr",
    source: "Local wallet inventory snapshot",
    walletType: "liquidity",
    summary: "Public XRPL address repeatedly referenced in the local recovery inventory and appropriate for showing a liquidity or route-monitoring wallet card.",
    assets: [
      { symbol: "SOVBND", assetType: "iou", purpose: "Sovereign bond claim tracker" },
      { symbol: "XRP", assetType: "lp", purpose: "XRPL AMM liquidity pair side" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr" },
    ],
    poolReferences: [
      { pair: "SOVBND / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
    ],
  },
  {
    id: "inventory-xrpl-gamma",
    label: "Recovered XRPL Inventory C",
    network: "XRPL",
    address: "rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX",
    source: "Local wallet inventory snapshot",
    walletType: "evidence",
    summary: "Public XRPL address seen across local forensic and proof registries and useful for previewing evidence-ledger or attestation views.",
    assets: [
      { symbol: "ATTEST", assetType: "nft", purpose: "Reserve and document evidence markers" },
      { symbol: "PETRO", assetType: "iou", purpose: "Energy asset claim preview" },
    ],
    explorerLinks: [
      { label: "XRPL Ledger", url: "https://livenet.xrpl.org/accounts/rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX" },
      { label: "XRPScan", url: "https://xrpscan.com/account/rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX" },
    ],
    poolReferences: [
      { pair: "PETRO / XRP", network: "XRPL", status: "Live", verificationUrl: "https://livenet.xrpl.org/" },
    ],
  },
  {
    id: "optkas-stellar-issuer",
    label: "OPTKAS Stellar Issuer",
    network: "Stellar",
    source: "Local OPTKAS client portal docs",
    walletType: "issuer",
    summary: "Documented locally as the regulated asset authority with AUTH_REQUIRED, AUTH_REVOCABLE, and CLAWBACK controls for the Stellar side of OPTKAS.",
    assets: [
      { symbol: "OPTKAS-USD", assetType: "regulated-asset", purpose: "Regulated stable asset issuance" },
      { symbol: "SOVBND-USD", assetType: "regulated-asset", purpose: "Mirror-chain regulated claim representation" },
    ],
    explorerLinks: [
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public" },
    ],
  },
  {
    id: "optkas-stellar-distribution",
    label: "OPTKAS Stellar Distribution",
    network: "Stellar",
    source: "Local OPTKAS client portal docs",
    walletType: "distribution",
    summary: "Documented locally as the settlement and liquidity account operating the Stellar AMM side and managing data-hash anchoring.",
    assets: [
      { symbol: "OPTKAS-USD/XLM", assetType: "lp", purpose: "Primary Stellar AMM pool" },
      { symbol: "IMPERIA-USD/XLM", assetType: "lp", purpose: "Secondary regulated-asset liquidity pool" },
    ],
    explorerLinks: [
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public" },
    ],
    poolReferences: [
      { pair: "OPTKAS-USD / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public" },
      { pair: "IMPERIA-USD / XLM", network: "Stellar", status: "Live", verificationUrl: "https://stellar.expert/explorer/public" },
    ],
  },
  {
    id: "optkas-stellar-anchor",
    label: "OPTKAS Stellar Anchor",
    network: "Stellar",
    source: "Local OPTKAS client portal docs",
    walletType: "anchor",
    summary: "Documented locally as the SEP-24 fiat bridge for KYC/AML compliant USD on-ramp and off-ramp operations.",
    assets: [
      { symbol: "USD", assetType: "stablecoin", purpose: "Fiat bridge and redemption flow" },
      { symbol: "manage_data", assetType: "nft", purpose: "Dual-chain evidence anchoring" },
    ],
    explorerLinks: [
      { label: "Stellar Expert", url: "https://stellar.expert/explorer/public" },
    ],
  },
];
