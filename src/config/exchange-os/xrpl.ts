// TROPTIONS Exchange OS — XRPL Configuration
// Read-only mainnet ops (pathfinding, book_offers, account_info) are always on.
// XRPL_MAINNET_ENABLED only gates TX submission (write operations).

export const xrplConfig = {
  network: "mainnet" as "testnet" | "mainnet",
  /** Used for read-only mainnet queries (pathfinding, order book, account info) */
  mainnetWsUrl:
    process.env.XRPL_MAINNET_WS_URL || "wss://xrplcluster.com",
  /** Testnet WS — only used when explicitly requested */
  websocketUrl:
    process.env.XRPL_WEBSOCKET_URL || "wss://s.altnet.rippletest.net:51233",
  /** Gate for WRITE operations (tx submission) only — reads are always mainnet */
  mainnetEnabled: process.env.XRPL_MAINNET_ENABLED === "true",
  /** demoMode now only applies to tx signing/submission — NOT to read queries */
  demoMode: false,
  explorerBase: "https://livenet.xrpl.org",
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
