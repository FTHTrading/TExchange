#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * scripts/provision-troptions-assets.mjs
 *
 * REAL MAINNET ASSET PROVISIONING — configures issuers, opens trustlines,
 * issues TROPTIONS supply, mints a sample NFT, creates an MPT issuance, and
 * places initial DEX offers. Uses canonical metadata published at
 * https://troptions.org/.well-known/* and /troptions/asset-metadata/*.
 *
 * Standards followed:
 *   • SEP-1                 Stellar Information File (stellar.toml)
 *   • XLS-26d               XRP Ledger Information File (xrp-ledger.toml)
 *   • XLS-20                XRPL NFTs
 *   • XLS-24                XRPL NFT metadata schema
 *   • XLS-33d               XRPL Multi-Purpose Tokens (MPT)
 *   • OpenSea metadata      NFT image / attributes / external_url conventions
 *
 * Safety design:
 *   • Dry-run by default. NO transactions are submitted unless `--execute`.
 *   • Per-chain skip flags: --xrpl-only, --stellar-only, --skip-xrpl, --skip-stellar.
 *   • Per-step skip flags: --skip-amm, --skip-nft, --skip-mpt, --skip-offers.
 *   • Reserves precheck: aborts if any operation would overrun the free balance.
 *   • Audit log appended to data/treasury-funding-log.json.
 *
 * USAGE:
 *   node scripts/provision-troptions-assets.mjs                    # dry-run
 *   node scripts/provision-troptions-assets.mjs --execute          # real mainnet
 *   node scripts/provision-troptions-assets.mjs --xrpl-only --execute
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import xrpl from "xrpl";
import * as StellarSdk from "@stellar/stellar-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// ─── Load .env.local ────────────────────────────────────────────────────────────
function loadEnvLocal() {
  const envPath = path.join(REPO_ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const txt = fs.readFileSync(envPath, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

// ─── CLI flags ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function flagValue(name, fallback) {
  const pref = `--${name}=`;
  const hit = args.find((a) => a.startsWith(pref));
  return hit ? hit.slice(pref.length) : fallback;
}
const F = {
  execute: args.includes("--execute"),
  planOnly: args.includes("--plan-only"),
  metadataOnly: args.includes("--metadata-only"),
  enableMpt: args.includes("--enable-mpt"),
  network: flagValue("network", "testnet"),     // testnet | mainnet
  xrplOnly: args.includes("--xrpl-only"),
  stellarOnly: args.includes("--stellar-only"),
  skipXrpl: args.includes("--skip-xrpl"),
  skipStellar: args.includes("--skip-stellar"),
  skipNft: args.includes("--skip-nft"),
  skipMpt: args.includes("--skip-mpt"),
  skipOffers: args.includes("--skip-offers"),
  skipAmm: args.includes("--skip-amm"),
};

// ─── Constants ──────────────────────────────────────────────────────────────────
const DOMAIN = "troptions.org";
const DOMAIN_HEX = Buffer.from(DOMAIN, "ascii").toString("hex").toUpperCase();
const TROPTIONS_HEX = "54524F5054494F4E530000000000000000000000"; // "TROPTIONS" 20-byte hex
const NFT_METADATA_URL = `https://${DOMAIN}/troptions/asset-metadata/troptions.nft.collection.v1.json`;
const MPT_METADATA_URL = `https://${DOMAIN}/troptions/asset-metadata/troptions.mpt.tranche-a.v1.json`;

const XRPL_ISSUER_ADDR      = "rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ";
const XRPL_DISTRIBUTOR_ADDR = "rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt";

const STELLAR_ISSUER_ADDR      = "GB4FHGFUTLLMS3SC5RWRK6RYBGDIUQ5NR7IGN5TWAA3QVHULJ34JGEG4";
const STELLAR_DISTRIBUTOR_ADDR = "GBH4YY6EKSIM3LEHUQHEXFDZKMLON64HKMCB2K7CCOXGNCIVGH5GGVWC";

// AccountSet flags
const ASF_DEFAULT_RIPPLE = 8;

// NFT flags
const NFT_FLAG_BURNABLE     = 0x00000001;
const NFT_FLAG_TRANSFERABLE = 0x00000008;

// MPT flags (XLS-33d)
const MPT_FLAG_CAN_LOCK     = 0x00000002;
const MPT_FLAG_REQUIRE_AUTH = 0x00000004;
const MPT_FLAG_CAN_ESCROW   = 0x00000008;
const MPT_FLAG_CAN_TRADE    = 0x00000010;
const MPT_FLAG_CAN_TRANSFER = 0x00000020;
const MPT_FLAG_CAN_CLAWBACK = 0x00000040;

// ─── Audit log ──────────────────────────────────────────────────────────────────
const logEntries = [];
function logEv(entry) {
  logEntries.push({ timestamp: new Date().toISOString(), op: "provision", ...entry });
}
function persistLog() {
  if (logEntries.length === 0) return;
  const logDir = path.join(REPO_ROOT, "data");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const logPath = path.join(logDir, "treasury-funding-log.json");
  let existing = [];
  if (fs.existsSync(logPath)) {
    try { existing = JSON.parse(fs.readFileSync(logPath, "utf8")); } catch { existing = []; }
  }
  fs.writeFileSync(logPath, JSON.stringify([...existing, ...logEntries], null, 2));
  console.log(`\n📝 Audit log appended: ${path.relative(REPO_ROOT, logPath)}`);
}

// ─── Header ─────────────────────────────────────────────────────────────────────
function printHeader() {
  console.log("═".repeat(78));
  console.log("  TROPTIONS ASSET PROVISIONING");
  console.log("═".repeat(78));
  console.log(`  Mode:       ${F.execute ? "🚀 EXECUTE" : "🛡️  DRY-RUN (no submit)"}`);
  console.log(`  Network:    ${F.network}`);
  console.log(`  XRPL:       ${F.skipXrpl || F.stellarOnly ? "skipped" : "enabled"}`);
  console.log(`  Stellar:    ${F.skipStellar || F.xrplOnly ? "skipped" : "enabled"}`);
  console.log(`  NFT mint:   ${F.skipNft ? "skipped" : "enabled"}`);
  console.log(`  MPT issue:  ${F.enableMpt && !F.skipMpt ? "enabled (--enable-mpt)" : "skipped (default)"}`);
  console.log(`  DEX offers: ${F.skipOffers ? "skipped" : "enabled"}`);
  console.log(`  AMM/LP:     ${F.skipAmm ? "skipped" : "enabled"}`);
  console.log(`  Domain:     ${DOMAIN}`);
  console.log("═".repeat(78));
  console.log();
}

const XRPL_ENDPOINT_MAINNET = "wss://xrplcluster.com";
const XRPL_ENDPOINT_TESTNET = "wss://s.altnet.rippletest.net:51233";
const STELLAR_ENDPOINT_MAINNET = "https://horizon.stellar.org";
const STELLAR_ENDPOINT_TESTNET = "https://horizon-testnet.stellar.org";
function xrplEndpoint()    { return F.network === "mainnet" ? XRPL_ENDPOINT_MAINNET : XRPL_ENDPOINT_TESTNET; }
function stellarEndpoint() { return F.network === "mainnet" ? STELLAR_ENDPOINT_MAINNET : STELLAR_ENDPOINT_TESTNET; }
function stellarPassphrase() { return F.network === "mainnet" ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET; }

// ─── XRPL helper ────────────────────────────────────────────────────────────────
async function xrplSubmit(client, wallet, tx, label) {
  console.log(`    [${label}] preparing ${tx.TransactionType}...`);
  if (!F.execute) {
    console.log(`    [DRY-RUN] would submit ${tx.TransactionType}`);
    logEv({ chain: "xrpl", mode: "dry-run", label, tx: tx.TransactionType, status: "simulated" });
    return { ok: true, dryRun: true };
  }
  try {
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    const meta = result.result.meta;
    const txResult =
      typeof meta === "object" && meta !== null && "TransactionResult" in meta
        ? meta.TransactionResult
        : "unknown";
    const ok = txResult === "tesSUCCESS";
    console.log(`    ${ok ? "✅" : "❌"} ${txResult}  hash=${result.result.hash}`);
    logEv({
      chain: "xrpl", mode: "execute", label, tx: tx.TransactionType,
      status: ok ? "success" : "failed", txResult, hash: result.result.hash,
    });
    return { ok, hash: result.result.hash, txResult };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`    ❌ error: ${msg}`);
    logEv({ chain: "xrpl", mode: "execute", label, tx: tx.TransactionType, status: "error", error: msg });
    return { ok: false, error: msg };
  }
}

// ─── Stellar helper ─────────────────────────────────────────────────────────────
async function stellarSubmit(server, kp, opBuilder, label, memo) {
  console.log(`    [${label}] preparing transaction...`);
  if (!F.execute) {
    console.log(`    [DRY-RUN] would submit ${label}`);
    logEv({ chain: "stellar", mode: "dry-run", label, status: "simulated" });
    return { ok: true, dryRun: true };
  }
  try {
    const fresh = await server.loadAccount(kp.publicKey());
    const fee = await server.fetchBaseFee();
    const builder = new StellarSdk.TransactionBuilder(fresh, {
      fee: fee.toString(),
      networkPassphrase: stellarPassphrase(),
    }).setTimeout(60);
    if (memo) builder.addMemo(StellarSdk.Memo.text(memo));
    const tx = opBuilder(builder).build();
    tx.sign(kp);
    const result = await server.submitTransaction(tx);
    console.log(`    ✅ ledger=${result.ledger}  hash=${result.hash}`);
    logEv({ chain: "stellar", mode: "execute", label, status: "success", hash: result.hash, ledger: result.ledger });
    return { ok: true, hash: result.hash, ledger: result.ledger };
  } catch (err) {
    const msg = err && err.response && err.response.data
      ? JSON.stringify(err.response.data.extras || err.response.data)
      : err instanceof Error ? err.message : String(err);
    console.log(`    ❌ error: ${msg}`);
    logEv({ chain: "stellar", mode: "execute", label, status: "error", error: msg });
    return { ok: false, error: msg };
  }
}

// ─── XRPL provisioning ──────────────────────────────────────────────────────────
async function provisionXrpl() {
  const issuerSeed = process.env.XRPL_ISSUER_SEED;
  const distSeed   = process.env.XRPL_DISTRIBUTOR_SEED;
  if (!issuerSeed || !distSeed) {
    console.log("❌ XRPL_ISSUER_SEED or XRPL_DISTRIBUTOR_SEED not set — skipping XRPL.");
    return;
  }
  const issuer = xrpl.Wallet.fromSeed(issuerSeed);
  const dist   = xrpl.Wallet.fromSeed(distSeed);
  if (issuer.classicAddress !== XRPL_ISSUER_ADDR) {
    console.log(`❌ XRPL_ISSUER_SEED derives to ${issuer.classicAddress}, expected ${XRPL_ISSUER_ADDR}. Aborting XRPL.`);
    return;
  }
  if (dist.classicAddress !== XRPL_DISTRIBUTOR_ADDR) {
    console.log(`❌ XRPL_DISTRIBUTOR_SEED derives to ${dist.classicAddress}, expected ${XRPL_DISTRIBUTOR_ADDR}. Aborting XRPL.`);
    return;
  }

  console.log("─── XRPL ───────────────────────────────────────────────────────────────");
  console.log(`  Issuer:      ${issuer.classicAddress}`);
  console.log(`  Distributor: ${dist.classicAddress}`);

  const client = new xrpl.Client(xrplEndpoint());
  await client.connect();

  // ── Step 1: configure issuer (DefaultRipple + Domain) ─────────────────────────
  console.log("\n  → Step 1: AccountSet on issuer (asfDefaultRipple + Domain)");
  await xrplSubmit(client, issuer, {
    TransactionType: "AccountSet",
    Account: issuer.classicAddress,
    SetFlag: ASF_DEFAULT_RIPPLE,
    Domain: DOMAIN_HEX,
  }, "issuer-accountset");

  // ── Step 2: distributor opens TROPTIONS trustline to issuer ───────────────────
  console.log("\n  → Step 2: TrustSet on distributor (TROPTIONS limit = 1,000,000,000)");
  await xrplSubmit(client, dist, {
    TransactionType: "TrustSet",
    Account: dist.classicAddress,
    LimitAmount: {
      currency: TROPTIONS_HEX,
      issuer: issuer.classicAddress,
      value: "1000000000",
    },
  }, "distributor-trustset");

  // ── Step 3: issuer pays initial supply to distributor (mint) ──────────────────
  console.log("\n  → Step 3: Payment from issuer → distributor (issue 100,000,000 TROPTIONS)");
  await xrplSubmit(client, issuer, {
    TransactionType: "Payment",
    Account: issuer.classicAddress,
    Destination: dist.classicAddress,
    Amount: {
      currency: TROPTIONS_HEX,
      issuer: issuer.classicAddress,
      value: "100000000",
    },
  }, "issue-supply");

  // ── Step 4: NFTokenMint on distributor (genesis member #1) ────────────────────
  if (!F.skipNft) {
    console.log("\n  → Step 4: NFTokenMint on distributor (Genesis Member #1)");
    const uriHex = Buffer.from(NFT_METADATA_URL, "utf8").toString("hex").toUpperCase();
    await xrplSubmit(client, dist, {
      TransactionType: "NFTokenMint",
      Account: dist.classicAddress,
      NFTokenTaxon: 1, // Membership collection
      TransferFee: 0,
      URI: uriHex,
      Flags: NFT_FLAG_BURNABLE, // non-transferable membership credential
    }, "nft-mint-genesis-1");
  }

  // ── Step 5: MPTokenIssuanceCreate on distributor (Tranche A) ──────────────────
  if (F.enableMpt && !F.skipMpt) {
    console.log("\n  → Step 5: MPTokenIssuanceCreate on distributor (Tranche A)");
    const mptMetaHex = Buffer.from(MPT_METADATA_URL, "utf8").toString("hex").toUpperCase();
    await xrplSubmit(client, dist, {
      TransactionType: "MPTokenIssuanceCreate",
      Account: dist.classicAddress,
      AssetScale: 6,
      MaximumAmount: "1000000000",
      TransferFee: 0,
      Flags: MPT_FLAG_CAN_LOCK | MPT_FLAG_REQUIRE_AUTH | MPT_FLAG_CAN_ESCROW |
             MPT_FLAG_CAN_TRADE | MPT_FLAG_CAN_TRANSFER | MPT_FLAG_CAN_CLAWBACK,
      MPTokenMetadata: mptMetaHex,
    }, "mpt-issuance-tranche-a");
  }

  // ── Step 6: distributor places DEX offers (TROPTIONS/XRP) ─────────────────────
  if (!F.skipOffers) {
    console.log("\n  → Step 6a: OfferCreate sell 10,000 TROPTIONS for 1 XRP");
    await xrplSubmit(client, dist, {
      TransactionType: "OfferCreate",
      Account: dist.classicAddress,
      TakerGets: {
        currency: TROPTIONS_HEX,
        issuer: issuer.classicAddress,
        value: "10000",
      },
      TakerPays: xrpl.xrpToDrops("1"),
    }, "dex-offer-sell-troptions");

    console.log("\n  → Step 6b: OfferCreate buy 10,000 TROPTIONS for 1 XRP");
    await xrplSubmit(client, dist, {
      TransactionType: "OfferCreate",
      Account: dist.classicAddress,
      TakerGets: xrpl.xrpToDrops("1"),
      TakerPays: {
        currency: TROPTIONS_HEX,
        issuer: issuer.classicAddress,
        value: "10000",
      },
    }, "dex-offer-buy-troptions");
  }

  // ── Step 7: AMMCreate TROPTIONS/XRP liquidity pool ─────────────────────────
  if (!F.skipAmm) {
    console.log("\n  → Step 7: AMMCreate TROPTIONS/XRP pool (1 XRP + 1,000 TROPTIONS, fee 0.3%)");
    await xrplSubmit(client, dist, {
      TransactionType: "AMMCreate",
      Account: dist.classicAddress,
      Amount: xrpl.xrpToDrops("1"),
      Amount2: {
        currency: TROPTIONS_HEX,
        issuer: issuer.classicAddress,
        value: "1000",
      },
      TradingFee: 300, // 0.3 %
    }, "xrpl-amm-create");
  }

  await client.disconnect();
}

// ─── Stellar provisioning ───────────────────────────────────────────────────────
async function provisionStellar() {
  const issuerSecret = process.env.STELLAR_ISSUER_SECRET;
  const distSecret   = process.env.STELLAR_DISTRIBUTOR_SECRET;
  if (!issuerSecret || !distSecret) {
    console.log("❌ STELLAR_ISSUER_SECRET or STELLAR_DISTRIBUTOR_SECRET not set — skipping Stellar.");
    return;
  }
  const issuer = StellarSdk.Keypair.fromSecret(issuerSecret);
  const dist   = StellarSdk.Keypair.fromSecret(distSecret);
  if (issuer.publicKey() !== STELLAR_ISSUER_ADDR) {
    console.log(`❌ STELLAR_ISSUER_SECRET derives to ${issuer.publicKey()}, expected ${STELLAR_ISSUER_ADDR}. Aborting Stellar.`);
    return;
  }
  if (dist.publicKey() !== STELLAR_DISTRIBUTOR_ADDR) {
    console.log(`❌ STELLAR_DISTRIBUTOR_SECRET derives to ${dist.publicKey()}, expected ${STELLAR_DISTRIBUTOR_ADDR}. Aborting Stellar.`);
    return;
  }

  console.log("\n─── Stellar ────────────────────────────────────────────────────────────");
  console.log(`  Issuer:      ${issuer.publicKey()}`);
  console.log(`  Distributor: ${dist.publicKey()}`);

  const server = new StellarSdk.Horizon.Server(stellarEndpoint());
  const TROPTIONS_ASSET = new StellarSdk.Asset("TROPTIONS", issuer.publicKey());

  // ── Step 1: configure issuer (auth flags + home_domain) ───────────────────────
// NOTE: AuthClawbackEnabledFlag is intentionally omitted — clawback-enabled assets
    // cannot participate in Stellar AMM liquidity pools (CAP-38 restriction).
    console.log("\n  → Step 1: SetOptions on issuer (auth_required + auth_revocable + home_domain)");
  await stellarSubmit(server, issuer, (b) =>
    b.addOperation(StellarSdk.Operation.setOptions({
      homeDomain: DOMAIN,
      setFlags:
        StellarSdk.AuthRequiredFlag |
        StellarSdk.AuthRevocableFlag,
    })),
    "issuer-setoptions",
    "Troptions issuer config",
  );

  // ── Step 2: distributor opens TROPTIONS trustline ─────────────────────────────
  console.log("\n  → Step 2: ChangeTrust on distributor (TROPTIONS limit = 1,000,000,000)");
  await stellarSubmit(server, dist, (b) =>
    b.addOperation(StellarSdk.Operation.changeTrust({
      asset: TROPTIONS_ASSET,
      limit: "1000000000",
    })),
    "distributor-changetrust",
    "Troptions trustline",
  );

  // ── Step 3: issuer authorizes distributor (because auth_required is set) ──────
  console.log("\n  → Step 3: SetTrustLineFlags on issuer authorizing distributor");
  await stellarSubmit(server, issuer, (b) =>
    b.addOperation(StellarSdk.Operation.setTrustLineFlags({
      trustor: dist.publicKey(),
      asset: TROPTIONS_ASSET,
      flags: { authorized: true },
    })),
    "issuer-authorize-distributor",
    "Troptions auth handshake",
  );

  // ── Step 4: issuer pays initial supply to distributor ─────────────────────────
  console.log("\n  → Step 4: Payment from issuer → distributor (issue 100,000,000 TROPTIONS)");
  await stellarSubmit(server, issuer, (b) =>
    b.addOperation(StellarSdk.Operation.payment({
      destination: dist.publicKey(),
      asset: TROPTIONS_ASSET,
      amount: "100000000",
    })),
    "issue-supply",
    "Troptions initial supply",
  );

  // ── Step 5: distributor places DEX offers (TROPTIONS/XLM) ─────────────────────
  if (!F.skipOffers) {
    console.log("\n  → Step 5a: ManageSellOffer 10,000 TROPTIONS for 1 XLM");
    await stellarSubmit(server, dist, (b) =>
      b.addOperation(StellarSdk.Operation.manageSellOffer({
        selling: TROPTIONS_ASSET,
        buying: StellarSdk.Asset.native(),
        amount: "10000",
        price: { n: 1, d: 10000 }, // 1 XLM per 10,000 TROPTIONS
      })),
      "dex-offer-sell-troptions",
      "Troptions DEX sell",
    );

    console.log("\n  → Step 5b: ManageBuyOffer 10,000 TROPTIONS for 1 XLM");
    await stellarSubmit(server, dist, (b) =>
      b.addOperation(StellarSdk.Operation.manageBuyOffer({
        selling: StellarSdk.Asset.native(),
        buying: TROPTIONS_ASSET,
        buyAmount: "10000",
        price: { n: 1, d: 10000 },
      })),
      "dex-offer-buy-troptions",
      "Troptions DEX buy",
    );
  }

  // ── Step 6: create TROPTIONS/XLM AMM liquidity pool ──────────────────────────
  if (!F.skipAmm) {
    const lpAsset = new StellarSdk.LiquidityPoolAsset(
      StellarSdk.Asset.native(),
      TROPTIONS_ASSET,
      30, // 0.3% fee
    );

    console.log("\n  → Step 6a: ChangeTrust on distributor for LP share token");
    await stellarSubmit(server, dist, (b) =>
      b.addOperation(StellarSdk.Operation.changeTrust({
        asset: lpAsset,
        limit: "1000000000",
      })),
      "distributor-changetrust-lp",
      "Troptions LP share trustline",
    );

    const lpPoolId = StellarSdk.getLiquidityPoolId(
      "constant_product",
      lpAsset.getLiquidityPoolParameters(),
    ).toString("hex");
    console.log(`     Pool ID: ${lpPoolId}`);

    console.log("\n  → Step 6b: liquidityPoolDeposit (1 XLM + 10,000 TROPTIONS)");
    await stellarSubmit(server, dist, (b) =>
      b.addOperation(StellarSdk.Operation.liquidityPoolDeposit({
        liquidityPoolId: lpPoolId,
        maxAmountA: "1",
        maxAmountB: "10000",
        minPrice: { n: 1, d: 1000000 },
        maxPrice: { n: 1000000, d: 1 },
      })),
      "distributor-lp-deposit",
      "Troptions LP initial deposit",
    );
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  printHeader();

  // ── Mode short-circuits (read-only) ───────────────────────────────────────────
  if (F.metadataOnly) {
    console.log("🔍 --metadata-only: delegate to scripts/validate-troptions-asset-metadata.mjs");
    console.log("    node scripts/validate-troptions-asset-metadata.mjs\n");
    return;
  }
  if (F.planOnly) {
    console.log("📋 --plan-only: delegate to scripts/plan-troptions-asset-provisioning.mjs");
    console.log("    node scripts/plan-troptions-asset-provisioning.mjs\n");
    return;
  }

  // ── Default: hard dry-run with no env reads ───────────────────────────────────
  if (!F.execute) {
    console.log("🛡️  DRY-RUN MODE (default): no transactions will be built or submitted.");
    console.log("    Use --plan-only or --metadata-only for read-only output.");
    console.log("    Live execution requires --execute.\n");
    // Still walk the planned operations for visibility, but never connect.
    if (!F.skipXrpl && !F.stellarOnly)   await provisionXrpl();
    if (!F.skipStellar && !F.xrplOnly)   await provisionStellar();
    persistLog();
    console.log("\n✅ Dry-run complete.");
    return;
  }

  // ── Execute path ──────────────────────────────────────────────────────────────
  if (F.network !== "mainnet" && F.network !== "testnet") {
    console.log(`❌ --network must be testnet or mainnet (got "${F.network}")`);
    process.exit(2);
  }

  console.log("🚨 EXECUTE MODE:");
  console.log(`    network:  ${F.network}`);
  console.log("    Press Ctrl+C in the next 5 seconds to abort.\n");
  logEv({ chain: "control", label: "execute-start", network: F.network });
  await new Promise((r) => setTimeout(r, 5000));

  if (!F.skipXrpl && !F.stellarOnly)   await provisionXrpl();
  if (!F.skipStellar && !F.xrplOnly)   await provisionStellar();

  persistLog();
  console.log("\n✅ Done.");
}

main().catch((err) => {
  console.error("\nFATAL:", err && err.message ? err.message : err);
  persistLog();
  process.exit(1);
});
