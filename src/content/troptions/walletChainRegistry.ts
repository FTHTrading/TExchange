export interface ChainReadiness {
  readonly chainId: string;
  readonly chainName: string;
  readonly status: "simulation" | "testnet-ready" | "provider-required" | "disabled";
  readonly readinessLevel: number;
  readonly supportedAssets: readonly string[];
  readonly requiresProvider: boolean;
  readonly providerName?: string;
  readonly documentationUrl?: string;
  readonly riskLevel: "low" | "medium" | "high";
}

export const WALLET_CHAIN_REGISTRY: readonly ChainReadiness[] = [
  {
    chainId: "internal-ledger",
    chainName: "Troptions Internal Ledger",
    status: "simulation",
    readinessLevel: 100,
    supportedAssets: ["TROP USD", "USDF", "UNY", "Internal Credits"],
    requiresProvider: false,
    documentationUrl: "https://troptions.org/docs/internal-ledger",
    riskLevel: "low",
  },
  {
    chainId: "xrpl",
    chainName: "XRP Ledger",
    status: "testnet-ready",
    readinessLevel: 75,
    supportedAssets: ["XRP", "USDF", "USDP", "IOUs"],
    requiresProvider: true,
    providerName: "Ripple / 3rd party XRPL provider",
    documentationUrl: "https://xrpl.org",
    riskLevel: "low",
  },
  {
    chainId: "stellar",
    chainName: "Stellar",
    status: "testnet-ready",
    readinessLevel: 75,
    supportedAssets: ["XLM", "USDF", "USDC", "Custom Assets"],
    requiresProvider: true,
    providerName: "Stellar Development Foundation / 3rd party provider",
    documentationUrl: "https://stellar.org",
    riskLevel: "low",
  },
  {
    chainId: "solana",
    chainName: "Solana",
    status: "provider-required",
    readinessLevel: 50,
    supportedAssets: ["SOL", "USDC", "USDT", "SPL Tokens"],
    requiresProvider: true,
    providerName: "Solana Foundation / validator provider",
    documentationUrl: "https://solana.com",
    riskLevel: "medium",
  },
  {
    chainId: "polygon",
    chainName: "Polygon (Ethereum L2)",
    status: "provider-required",
    readinessLevel: 50,
    supportedAssets: ["MATIC", "USDC", "USDT", "ERC-20 tokens"],
    requiresProvider: true,
    providerName: "Polygon Labs / RPC provider",
    documentationUrl: "https://polygon.technology",
    riskLevel: "medium",
  },
  {
    chainId: "tron",
    chainName: "TRON",
    status: "provider-required",
    readinessLevel: 50,
    supportedAssets: ["TRX", "USDT TRC20", "TRC-20 tokens"],
    requiresProvider: true,
    providerName: "TRON Foundation / node provider",
    documentationUrl: "https://tron.network",
    riskLevel: "medium",
  },
  {
    chainId: "ethereum",
    chainName: "Ethereum Mainnet",
    status: "disabled",
    readinessLevel: 0,
    supportedAssets: ["ETH", "USDC", "USDT", "ERC-20 tokens"],
    requiresProvider: true,
    providerName: "Ethereum Foundation / RPC provider",
    documentationUrl: "https://ethereum.org",
    riskLevel: "high",
  },
  {
    chainId: "x402",
    chainName: "x402 Payment Network",
    status: "simulation",
    readinessLevel: 80,
    supportedAssets: ["ATP", "x402 Credits"],
    requiresProvider: true,
    providerName: "Apostle Chain x402 operator",
    documentationUrl: "https://x402.unykorn.org",
    riskLevel: "medium",
  },
];

export function getChainByChainId(chainId: string): ChainReadiness | undefined {
  return WALLET_CHAIN_REGISTRY.find((chain) => chain.chainId === chainId);
}

export function getActiveChains(): readonly ChainReadiness[] {
  return WALLET_CHAIN_REGISTRY.filter((chain) => chain.status !== "disabled");
}

export function getTestnetReadyChains(): readonly ChainReadiness[] {
  return WALLET_CHAIN_REGISTRY.filter(
    (chain) => chain.status === "testnet-ready" || chain.status === "simulation"
  );
}

export function getChainsByAsset(asset: string): readonly ChainReadiness[] {
  return WALLET_CHAIN_REGISTRY.filter((chain) => chain.supportedAssets.includes(asset));
}
