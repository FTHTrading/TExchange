// TROPTIONS Exchange OS — XRPL Configuration
// Mainnet is locked by default. Testnet read-only is safe default.

export const xrplConfig = {
  network: (process.env.XRPL_NETWORK || "testnet") as "testnet" | "mainnet",
  websocketUrl:
    process.env.XRPL_WEBSOCKET_URL || "wss://s.altnet.rippletest.net:51233",
  mainnetWsUrl:
    process.env.XRPL_MAINNET_WS_URL || "wss://xrplcluster.com",
  mainnetEnabled: process.env.XRPL_MAINNET_ENABLED === "true",
  demoMode: process.env.XRPL_MAINNET_ENABLED !== "true",
  explorerBase:
    process.env.XRPL_MAINNET_ENABLED === "true"
      ? "https://livenet.xrpl.org"
      : "https://testnet.xrpl.org",
  /** TROPTIONS token — non-standard 9-char ticker encoded as 20-byte hex */
  troptionsHex: "54524F5054494F4E530000000000000000000000",
  troptionsIssuer:
    process.env.TROPTIONS_XRPL_ISSUER || "rPF2M1QjdVh1hkNgmMMTkT9qMU7tA7Wds3",
  reserveBase: 2,    // XRP base reserve
  reserveOwner: 0.2, // XRP per owned object
  /** Unsigned transaction timeout in seconds — user must sign within this window */
  unsignedTxTtlSecs: 300,
} as const;

export type XrplNetwork = typeof xrplConfig.network;
