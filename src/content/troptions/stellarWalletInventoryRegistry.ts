import type { WalletForensicsWalletRecord } from "@/content/troptions/walletForensicsRegistry";

// ── Stellar wallets from OPTKAS_WALLET_BACKUP_2026-02-07_093153 ───────────────
// Source: mainnet-secrets.json, generatedAt 2026-02-07T12:58:29.830Z
// Addresses only — NO seeds in this registry.

export const STELLAR_WALLET_INVENTORY_REGISTRY: readonly WalletForensicsWalletRecord[] = [
  {
    walletId: "stellar-optkas-issuer",
    address: "GBJIMHMBGTPN5RS42OGBUY5NC2ATZLPT3B3EWV32SM2GQLS46TRJWG4I",
    chain: "stellar",
    label: "OPTKAS Issuer (Stellar)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "issuer",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Stellar issuer account generated 2026-02-07 for OPTKAS deployment.",
      "Issues Troptions-backed tokens on the Stellar network.",
      "Seed stored offline in OPTKAS wallet backup — never commit or share.",
      "Audit for any unauthorised SetOptions (signer add/remove) or ChangeTrust activity.",
    ],
    explorerLinks: [
      {
        label: "Stellar Expert",
        url: "https://stellar.expert/explorer/public/account/GBJIMHMBGTPN5RS42OGBUY5NC2ATZLPT3B3EWV32SM2GQLS46TRJWG4I",
      },
      {
        label: "Stellarchain",
        url: "https://stellarchain.io/accounts/GBJIMHMBGTPN5RS42OGBUY5NC2ATZLPT3B3EWV32SM2GQLS46TRJWG4I",
      },
    ],
  },

  {
    walletId: "stellar-optkas-distribution",
    address: "GAKCD7OKDM4HLZDBEE7KXTRFAYIE755UHL3JFQEOOHDPIMM5GEFY3RPF",
    chain: "stellar",
    label: "OPTKAS Distribution (Stellar)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "treasury",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Stellar distribution wallet — holds tokens for controlled release.",
      "Monitor for large unexpected outflows or unauthorised signers.",
    ],
    explorerLinks: [
      {
        label: "Stellar Expert",
        url: "https://stellar.expert/explorer/public/account/GAKCD7OKDM4HLZDBEE7KXTRFAYIE755UHL3JFQEOOHDPIMM5GEFY3RPF",
      },
      {
        label: "Stellarchain",
        url: "https://stellarchain.io/accounts/GAKCD7OKDM4HLZDBEE7KXTRFAYIE755UHL3JFQEOOHDPIMM5GEFY3RPF",
      },
    ],
  },

  {
    walletId: "stellar-optkas-anchor",
    address: "GC6O6Q7FG5FZGHE5D5BHGA6ZTLRAU7UWFJKKWNOJ36G3PKVVKVYLQGA6",
    chain: "stellar",
    label: "OPTKAS Anchor (Stellar)",
    source: "OPTKAS_WALLET_BACKUP_2026-02-07_093153 — mainnet-secrets.json",
    role: "escrow",
    firstSeen: "2026-02-07T12:58:29Z",
    lastSeen: "2026-02-07T12:58:29Z",
    currentBalance: "unknown",
    masterKeyStatus: "unknown",
    signingKeySeen: false,
    riskStatus: "unknown",
    notes: [
      "Stellar anchor wallet — bridges real-world value to on-chain tokens.",
      "Critical account: compromise here could allow fraudulent token issuance.",
      "Verify signer thresholds and anchor configuration regularly.",
    ],
    explorerLinks: [
      {
        label: "Stellar Expert",
        url: "https://stellar.expert/explorer/public/account/GC6O6Q7FG5FZGHE5D5BHGA6ZTLRAU7UWFJKKWNOJ36G3PKVVKVYLQGA6",
      },
      {
        label: "Stellarchain",
        url: "https://stellarchain.io/accounts/GC6O6Q7FG5FZGHE5D5BHGA6ZTLRAU7UWFJKKWNOJ36G3PKVVKVYLQGA6",
      },
    ],
  },
];

export const STELLAR_ALL_ADDRESSES = STELLAR_WALLET_INVENTORY_REGISTRY.map((w) => w.address);
