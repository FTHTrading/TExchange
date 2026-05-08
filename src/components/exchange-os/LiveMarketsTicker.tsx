"use client";
// TROPTIONS Exchange OS — Live Markets Ticker Bar
// Scrolling horizontal strip of token prices (Horizon-style)

import { DEMO_TOKENS } from "@/config/exchange-os/demoData";

const XRP_PRICE = 0.58; // Demo base

interface TickerItem {
  pair: string;
  price: string;
  change: number;
  volume: string;
}

function buildTickerItems(): TickerItem[] {
  const base: TickerItem[] = [
    { pair: "XRP/USD",  price: XRP_PRICE.toFixed(4),  change: +1.24,  volume: "2.1B" },
    { pair: "BTC/USD",  price: "62,450.00",            change: -0.82,  volume: "18.4B" },
    { pair: "ETH/USD",  price: "2,891.50",             change: +2.15,  volume: "9.2B" },
  ];

  const tokenItems: TickerItem[] = DEMO_TOKENS.map((t) => ({
    pair: `${t.ticker}/XRP`,
    price: (t.price * XRP_PRICE).toFixed(4),
    change: t.change24h,
    volume: t.volume24h > 1_000_000
      ? `${(t.volume24h / 1_000_000).toFixed(1)}M`
      : `${(t.volume24h / 1000).toFixed(0)}K`,
  }));

  return [...base, ...tokenItems, ...base, ...tokenItems]; // duplicate for infinite feel
}

export function LiveMarketsTicker() {
  const items = buildTickerItems();

  return (
    <div className="xos-ticker-bar" aria-label="Live market prices">
      <div className="xos-ticker-label">LIVE</div>
      <div className="xos-ticker-track">
        <div className="xos-ticker-scroll">
          {items.map((item, i) => (
            <TickerPill key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerPill({ item }: { item: TickerItem }) {
  const up = item.change >= 0;
  return (
    <span className="xos-ticker-pill">
      <span className="xos-ticker-pair">{item.pair}</span>
      <span className="xos-ticker-price">{item.price}</span>
      <span className={`xos-ticker-change ${up ? "xos-ticker-up" : "xos-ticker-dn"}`}>
        {up ? "▲" : "▼"} {Math.abs(item.change).toFixed(2)}%
      </span>
      <span className="xos-ticker-sep">·</span>
    </span>
  );
}
