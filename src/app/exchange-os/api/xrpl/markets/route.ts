// TROPTIONS Exchange OS — Real XRPL Market Data (xrplmeta.org proxy)
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------- helpers --------------------------------------------------------

/** Decode a 40-char hex XRPL currency code to its ASCII ticker */
function decodeHexCurrency(hex: string): string {
  if (!hex || hex.length !== 40) return hex;
  try {
    const bytes = (hex.match(/.{2}/g) ?? []).map((b) => parseInt(b, 16));
    const ascii = bytes
      .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : ""))
      .join("")
      .replace(/\0+/g, "")
      .trim();
    return ascii || hex.slice(0, 8);
  } catch {
    return hex.slice(0, 8);
  }
}

// ---------- raw types ------------------------------------------------------

interface RawTokenMeta {
  token?: {
    name?: string;
    description?: string;
    icon?: string;
    dex?: string;
    weblinks?: { url?: string; type?: string }[];
  };
}

interface RawTokenMetrics {
  trustlines?: number;
  holders?: number;
  liquidity?: number;
  volume?: number;        // 24-hour volume (USD)
  volume_7d?: number;
  price?: number;         // USD
  market_cap?: number;
  changes?: {
    price_5m?: number;
    price_1h?: number;
    price_24h?: number;
    price_7d?: number;
  };
}

interface RawToken {
  currency?: string;
  issuer?: string;
  meta?: RawTokenMeta;
  metrics?: RawTokenMetrics;
}

// ---------- normalizer -----------------------------------------------------

function normalizeToken(raw: RawToken) {
  const rawCurrency = raw.currency ?? "";
  const currency =
    rawCurrency.length === 40 ? decodeHexCurrency(rawCurrency) : rawCurrency;
  const m = raw.metrics ?? {};
  const meta = raw.meta?.token ?? {};

  return {
    currency,
    currencyHex: rawCurrency,
    issuer: raw.issuer ?? "",
    name: meta.name ?? currency,
    icon: meta.icon ?? null,
    dex: meta.dex ?? "XRPL DEX",
    price: m.price ?? 0,
    change5m: m.changes?.price_5m ?? 0,
    change1h: m.changes?.price_1h ?? 0,
    change24h: m.changes?.price_24h ?? 0,
    change7d: m.changes?.price_7d ?? 0,
    volume24h: m.volume ?? 0,
    volume7d: m.volume_7d ?? 0,
    marketCap: m.market_cap ?? 0,
    liquidity: m.liquidity ?? 0,
    holders: m.trustlines ?? m.holders ?? 0,
  };
}

export type XrplMarketToken = ReturnType<typeof normalizeToken>;

// ---------- route handler ---------------------------------------------------

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 100), 200);
  const sortBy = searchParams.get("sort") ?? "volume_24h";

  try {
    const upstream = await fetch(
      `https://s1.xrplmeta.org/tokens?sort_by=${sortBy}&limit=${limit}&expand_meta=1`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "TROPTIONS-ExchangeOS/1.0",
        },
        next: { revalidate: 30 },
      }
    );

    if (!upstream.ok) {
      throw new Error(`xrplmeta returned HTTP ${upstream.status}`);
    }

    const raw = (await upstream.json()) as { tokens?: RawToken[] };
    const tokens = (raw.tokens ?? []).map(normalizeToken);

    return NextResponse.json({
      tokens,
      count: tokens.length,
      source: "xrplmeta.org",
      ts: Date.now(),
    });
  } catch (e) {
    return NextResponse.json(
      { tokens: [], error: String(e), source: "xrplmeta.org", ts: Date.now() },
      { status: 502 }
    );
  }
}
