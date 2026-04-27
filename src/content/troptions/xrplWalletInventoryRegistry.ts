import type { WalletForensicsWalletRecord } from "@/content/troptions/walletForensicsRegistry";

// ── XRPL wallets ──────────────────────────────────────────────────────────────
// Sources:
//   A) OPTKAS_WALLET_BACKUP_2026-02-07  (6 wallets from mainnet-secrets.json)
//   B) Forensic investigation          (compromised primary + related wallets)
//   C) Signing-key investigation only  (regular-key addresses found in account history)

export const XRPL_WALLET_INVENTORY_REGISTRY: readonly WalletForensicsWalletRecord[] = [

  // ── Source B: COMPROMISED / SUBJECT WALLETS ───────────────────────────────

  {
    walletId: "xrpl-primary-rpp12nd",
    address: "rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1",
    chain: "xrpl",
    label: "Primary XRPL Account (SUBJECT — possible compromise)",
    source: "Forensics investigation seed set",
    role: "subject-wallet",
    firstSeen: "2026-02-18T00:00:00Z",
    lastSeen: "2026-03-05T00:46:21Z",
    currentBalance: "unknown",
    reserve: "unknown",
    availableBalance: "unknown",
    masterKeyStatus: "disabled",
    regularKey: "rJpKvdn64acBnVGNQ873JpQKujA4TAVbfN",
    signingKeySeen: true,
    riskStatus: "high",
    notes: [
      "COMPROMISE INDICATOR: Master key disabled Feb 25. Owner no longer has master control.",
      "Regular key set twice: rpKmcC1... (Feb 25) → rJpKvdn... (Mar 5 00:24).",
      "81.417325 XRP sent to ChangeNOW (rKKbNYZR...) dest tag 614122458 at Mar 5 00:46.",
      "Large IOUs moved out Mar 5 00:29–00:38: ~184M USDT, ~20M GOLD, ~50M EUR.",
      "NFTs burned Feb 21. AMM withdrawals Mar 5 00:25.",
      "If user did not set those regular keys: TREAT AS TAKEN OVER.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rpP12ND2K7ZRzXZBEUnQM2i18tMGytXnW1" },
    ],
  },

  {
    walletId: "xrpl-related-rdew3",
    address: "rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX",
    chain: "xrpl",
    label: "Related XRPL Account (rDEW3)",
    source: "Forensics investigation — seen in transaction history",
    role: "related-wallet",
    firstSeen: "2026-02-18T00:00:00Z",
    lastSeen: "2026-03-04T21:47:41Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    regularKey: "rK3SFG4BVWJyNjbMDeEJcEMoRG51ax2CGR",
    signingKeySeen: true,
    riskStatus: "high",
    notes: [
      "Set USDT trustline (50,000,000 limit) on Feb 18 — same day primary wallet received funds.",
      "Sent 8.101678 XRP to rpP12ND... on Mar 4 21:47.",
      "Attempted AccountDelete Mar 4 — failed (tecHAS_OBLIGATIONS) because USDT trustline still open.",
      "Signing key rK3SFG4... observed on failed AccountDelete attempt.",
      "Pattern suggests active coordination with primary wallet compromise.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX" },
    ],
  },

  {
    walletId: "xrpl-related-rnaf6ki",
    address: "rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr",
    chain: "xrpl",
    label: "Related XRPL Account (rnAF6Ki)",
    source: "Forensics investigation seed set",
    role: "related-wallet",
    firstSeen: "2026-03-05T00:40:00Z",
    lastSeen: "2026-03-05T00:45:00Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: true,
    riskStatus: "medium",
    notes: ["Sent 6.872680 XRP to rpP12ND... — likely funnelling funds prior to ChangeNOW sweep."],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rnAF6Ki5sbmPZ4dTNCVzH5iyb9ScdSqyNr" },
    ],
  },

  {
    walletId: "xrpl-exchange-changenow-3",
    address: "rKKbNYZRqwPgZYkFWvqNUFBuscEyiFyCE",
    chain: "xrpl",
    label: "ChangeNOW (3) — Exchange Deposit",
    source: "XRPSCAN exchange label",
    role: "exchange-deposit",
    firstSeen: "2026-03-05T00:46:21Z",
    lastSeen: "2026-03-05T00:46:21Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "low",
    notes: [
      "Received 81.417325 XRP from rpP12ND... with destination tag 614122458.",
      "Tag 614122458 identifies the specific ChangeNOW swap order.",
      "Contact ChangeNOW support with tx hash 84F7978E... and tag 614122458 to trace payout address.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rKKbNYZRqwPgZYkFWvqNUFBuscEyiFyCE" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rKKbNYZRqwPgZYkFWvqNUFBuscEyiFyCE" },
    ],
  },

  {
    walletId: "xrpl-issuer-rgsddig-unykorn",
    address: "rGSDDiGaL47GcACEDfkxT7X8KGy1XFuWCc",
    chain: "xrpl",
    label: "UnyKorn USDT Issuer (unykorn.org) — DRAINED",
    source: "USDT token explorer + XRPL.org explorer (domain: unykorn.org)",
    role: "iou-issuer",
    firstSeen: "2026-02-18T16:00:00Z",
    lastSeen: "2026-03-24T00:00:00Z",
    currentBalance: "7.02",
    masterKeyStatus: "unknown",
    domain: "unykorn.org",
    signingKeySeen: false,
    riskStatus: "high",
    notes: [
      "THIS IS YOUR OWN ISSUER ACCOUNT — domain unykorn.org confirmed on XRPL.org explorer.",
      "Issued USDT and other IOUs (GOLD, EUR, USD, GBP, DONK) across the ecosystem.",
      "Feb 18 16:00 UTC: Distributed USDT to 4 holder wallets (rKNvud9: 39.7M, rnAF6Ki: 38.8M, rPqUumc: 38.8M, rGhaJrY: 10M).",
      "Mar 4–5: ALL IOU balances sent back to this issuer by attacker-controlled wallets = TOTAL SUPPLY WIPED.",
      "When IOUs are returned to the issuer, they are destroyed — supply drops to zero.",
      "After the drain: 0 IOUs issued, 0 IOUs held. Entire USDT ecosystem destroyed.",
      "Rippling enabled on this account (normal for XRPL issuers).",
      "Currently shows 7.02 XRP balance and no active IOUs. Rippling still enabled.",
      "OPTKAS/PETRO/GEMVLT/IMPERIA/SOVBND/TERRAVL issued by rpraqLjK... (separate issuer, still active).",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rGSDDiGaL47GcACEDfkxT7X8KGy1XFuWCc" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rGSDDiGaL47GcACEDfkxT7X8KGy1XFuWCc" },
    ],
  },

  {
    walletId: "xrpl-usdt-holder-rknvud9",
    address: "rKNvud9D8WYmTDpCT6ZaoNALNzb2LnZi9V",
    chain: "xrpl",
    label: "UnyKorn USDT Holder — rKNvud9 (39.7M burned)",
    source: "USDT token transaction history (XRPL.org explorer)",
    role: "related-wallet",
    firstSeen: "2026-02-18T16:00:30Z",
    lastSeen: "2026-03-04T23:47:50Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "high",
    notes: [
      "Feb 18 16:00:30 UTC: Received 39,700,000 USDT from issuer rGSDDiG (tx: 0CB86A...AB1848).",
      "Mar 4 23:45 UTC: Sent 39.7M USDT back to rGSDDiG (tx: 6839ED...0114DA) — IOU burned.",
      "Mar 4 23:47 UTC: Set trust limits to 0 for USDT, DRUNKS, DONK, GOLD — all trustlines closed.",
      "Pattern: receive → hold → return on attacker's command. Wallet was under attacker control.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rKNvud9D8WYmTDpCT6ZaoNALNzb2LnZi9V" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rKNvud9D8WYmTDpCT6ZaoNALNzb2LnZi9V" },
    ],
  },

  // ── Source C: SIGNING-KEY INVESTIGATION ONLY ─────────────────────────────
  // These addresses appeared as regular-key entries on compromised accounts.
  // We do not own them. They are tracked to identify the attacker's signing infrastructure.

  {
    walletId: "xrpl-signingkey-rpkmcc1",
    address: "rpKmcC1PevAxTBRQgkYtakdGVup2K2Luqh",
    chain: "xrpl",
    label: "Unrecognized Regular Key #1 (set Feb 25)",
    source: "Account history of rpP12ND...",
    role: "signing-key-investigation",
    firstSeen: "2026-02-25T00:00:00Z",
    lastSeen: "2026-03-05T00:24:00Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: true,
    riskStatus: "high",
    notes: [
      "SET as regular key on rpP12ND... on Feb 25 — same day master key was disabled.",
      "This address controlled rpP12ND... from Feb 25 until Mar 5 00:24.",
      "If not owned by user: this is the attacker's signing wallet.",
      "Check XRPSCAN for any outgoing transactions from this address to trace attacker identity.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rpKmcC1PevAxTBRQgkYtakdGVup2K2Luqh" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rpKmcC1PevAxTBRQgkYtakdGVup2K2Luqh" },
    ],
  },

  {
    walletId: "xrpl-signingkey-rjpkvdn",
    address: "rJpKvdn64acBnVGNQ873JpQKujA4TAVbfN",
    chain: "xrpl",
    label: "Unrecognized Regular Key #2 (set Mar 5 00:24 — FINAL CONTROLLER)",
    source: "Account history of rpP12ND...",
    role: "signing-key-investigation",
    firstSeen: "2026-03-05T00:24:00Z",
    lastSeen: "2026-03-05T00:46:21Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: true,
    riskStatus: "high",
    notes: [
      "SET as regular key on rpP12ND... at Mar 5 00:24 — 22 minutes before 81 XRP was sent.",
      "This address signed the final 81.417325 XRP ChangeNOW payment.",
      "CRITICAL: This is the key that executed the theft. Must be reported to ChangeNOW and law enforcement.",
      "Check all transactions from this address — may link to attacker's other operations.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rJpKvdn64acBnVGNQ873JpQKujA4TAVbfN" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rJpKvdn64acBnVGNQ873JpQKujA4TAVbfN" },
    ],
  },

  {
    walletId: "xrpl-signingkey-rk3sfg4",
    address: "rK3SFG4BVWJyNjbMDeEJcEMoRG51ax2CGR",
    chain: "xrpl",
    label: "Signing Key on rDEW3 (failed AccountDelete)",
    source: "Account history of rDEW3swAxG4iJcBSRBdKLim33TfTciKzxX",
    role: "signing-key-investigation",
    firstSeen: "2026-03-04T21:00:00Z",
    lastSeen: "2026-03-04T21:47:41Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: true,
    riskStatus: "high",
    notes: [
      "Signed the failed AccountDelete on rDEW3 (tecHAS_OBLIGATIONS).",
      "The attempted delete suggests the attacker tried to erase evidence of the rDEW3 account.",
      "May be same actor as rJpKvdn... or a related wallet in a multi-wallet attack operation.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rK3SFG4BVWJyNjbMDeEJcEMoRG51ax2CGR" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rK3SFG4BVWJyNjbMDeEJcEMoRG51ax2CGR" },
    ],
  },

  // ── Source A: OPTKAS WALLET BACKUP (2026-02-07) ───────────────────────────
  // Six XRPL accounts generated for the OPTKAS/Troptions system.
  // Seeds are in OPTKAS_WALLET_BACKUP_2026-02-07_093153/mainnet-secrets.json
  // Addresses only are stored here — NO seeds, NO private keys in this registry.

  {
    walletId: "xrpl-optkas-issuer",
    address: "rpraqLjKmDB9a43F9fURWA2bVaywkyJua3",
    chain: "xrpl",
    label: "OPTKAS Issuer (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "issuer",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 as part of the OPTKAS mainnet deployment set.",
      "Role: IOU issuer — issues Troptions-backed tokens.",
      "Seed stored offline in OPTKAS wallet backup. DO NOT reuse or share seed.",
      "Check XRPSCAN for any unauthorised SetRegularKey or AccountSet transactions.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rpraqLjKmDB9a43F9fURWA2bVaywkyJua3" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rpraqLjKmDB9a43F9fURWA2bVaywkyJua3" },
    ],
  },

  {
    walletId: "xrpl-optkas-treasury",
    address: "r3JfTyqU9jwnXh2aWCwr738fb9HygNmBys",
    chain: "xrpl",
    label: "OPTKAS Treasury (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "treasury",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 as the OPTKAS treasury wallet.",
      "Holds system reserves — high-value target. Audit regularly.",
      "Seed stored offline in OPTKAS wallet backup.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/r3JfTyqU9jwnXh2aWCwr738fb9HygNmBys" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/r3JfTyqU9jwnXh2aWCwr738fb9HygNmBys" },
    ],
  },

  {
    walletId: "xrpl-optkas-escrow",
    address: "rBC9g8YVU6HZouStFcdE5a8kmsob8napKD",
    chain: "xrpl",
    label: "OPTKAS Escrow (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "escrow",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 as the OPTKAS escrow wallet.",
      "Used for time-locked or conditional XRP/IOU delivery.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rBC9g8YVU6HZouStFcdE5a8kmsob8napKD" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rBC9g8YVU6HZouStFcdE5a8kmsob8napKD" },
    ],
  },

  {
    walletId: "xrpl-optkas-attestation",
    address: "rEUxqL1Rmzciu31Sq7ocx6KZyt6htqjjBv",
    chain: "xrpl",
    label: "OPTKAS Attestation (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "attestation",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 for OPTKAS on-chain attestation operations.",
      "Signs compliance/attestation transactions only.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rEUxqL1Rmzciu31Sq7ocx6KZyt6htqjjBv" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rEUxqL1Rmzciu31Sq7ocx6KZyt6htqjjBv" },
    ],
  },

  {
    walletId: "xrpl-optkas-amm-liquidity",
    address: "raCevnYFkqAvkDAoeQ7uttf9okSaWxXFuP",
    chain: "xrpl",
    label: "OPTKAS AMM Liquidity (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "amm_liquidity",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 for AMM liquidity provisioning.",
      "May hold LP tokens — check for any AMM withdrawal or AMMDelete activity.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/raCevnYFkqAvkDAoeQ7uttf9okSaWxXFuP" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/raCevnYFkqAvkDAoeQ7uttf9okSaWxXFuP" },
    ],
  },

  {
    walletId: "xrpl-optkas-trading",
    address: "rBAAd5z7e4Yvy4QzZ37WjmbZj1dnzJaTfY",
    chain: "xrpl",
    label: "OPTKAS Trading (XRPL)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "trading",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Generated 2026-02-07 for OPTKAS market-making and trading operations.",
      "Audit for any offer creates/cancels and DEX interactions since Feb 7.",
    ],
    explorerLinks: [
      { label: "XRPSCAN", url: "https://xrpscan.com/account/rBAAd5z7e4Yvy4QzZ37WjmbZj1dnzJaTfY" },
      { label: "XRPL Explorer", url: "https://livenet.xrpl.org/accounts/rBAAd5z7e4Yvy4QzZ37WjmbZj1dnzJaTfY" },
    ],
  },
];

// ── Convenience lookup: all XRPL addresses in the investigation scope ─────────
export const XRPL_ALL_ADDRESSES = XRPL_WALLET_INVENTORY_REGISTRY.map((w) => w.address);

// ── Addresses flagged as high-risk or signing-key ────────────────────────────
export const XRPL_HIGH_RISK_ADDRESSES = XRPL_WALLET_INVENTORY_REGISTRY
  .filter((w) => w.riskStatus === "high")
  .map((w) => w.address);

export const XRPL_SIGNING_KEY_ADDRESSES = XRPL_WALLET_INVENTORY_REGISTRY
  .filter((w) => w.role === "signing-key-investigation")
  .map((w) => w.address);
