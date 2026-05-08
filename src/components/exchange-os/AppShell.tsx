"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { features } from "@/config/exchange-os/features";
import { PRIMARY_NAV, SECONDARY_NAV, MOBILE_NAV } from "@/config/exchange-os/routes";
import { brand } from "@/config/exchange-os/brand";
import { TroptionsSidebarLogo } from "./TroptionsLogo";
import { TopBar } from "./TopBar";
import { LiveMarketsTicker } from "./LiveMarketsTicker";
import "@/styles/exchange-os.css";

const NAV_ICONS: Record<string, string> = {
  home: "⌂",
  "chart-candlestick": "📊",
  rocket: "🚀",
  coins: "◎",
  zap: "⚡",
  list: "≡",
  wallet: "◈",
  code: "< >",
  megaphone: "📣",
  settings: "⚙",
  presentation: "▣",
  "user-plus": "＋",
  mic: "🎙",
  diamond: "◆",  // Solana launch
  send: "↑",     // FTH Pay
};

function NavIcon({ icon }: { icon: string }) {
  const glyph = NAV_ICONS[icon] ?? "◆";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, fontSize: "0.85rem", flexShrink: 0, lineHeight: 1 }}>
      {glyph}
    </span>
  );
}

function DemoModeBanner() {
  if (!features.demoMode) return null;
  return (
    <div className="xos-demo-banner">
      ⚠ DEMO MODE — Simulated data only. Set{" "}
      <code style={{ fontFamily: "monospace", fontSize: "0.8em" }}>XRPL_MAINNET_ENABLED=true</code>{" "}
      to enable live trading.
    </div>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="xos-sidebar">
      <div className="xos-sidebar-logo">
        <Link href="/exchange-os" style={{ textDecoration: "none" }}>
          <TroptionsSidebarLogo />
        </Link>
      </div>
      <nav className="xos-sidebar-nav">
        <div className="xos-nav-section-label">Exchange</div>
        {PRIMARY_NAV.map((route) => {
          const active = pathname === route.href || pathname.startsWith(route.href + "/");
          return (
            <Link key={route.href} href={route.href} title={route.description}
              className={`xos-nav-item ${active ? "xos-nav-item--active" : ""}`}>
              <NavIcon icon={route.icon} />
              <span className="xos-nav-label">{route.label}</span>
              {route.badge && <span className="xos-badge xos-badge--cyan xos-nav-badge">{route.badge}</span>}
            </Link>
          );
        })}
        <div className="xos-nav-section-label" style={{ marginTop: "1rem" }}>Platform</div>
        {SECONDARY_NAV.map((route) => {
          const active = pathname === route.href;
          return (
            <Link key={route.href} href={route.href} title={route.description}
              className={`xos-nav-item xos-nav-item--secondary ${active ? "xos-nav-item--active-secondary" : ""}`}>
              <NavIcon icon={route.icon} />
              <span className="xos-nav-label">{route.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="xos-sidebar-footer">
        <div style={{ fontSize: "0.65rem", color: "var(--xos-text-subtle)", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: "var(--xos-gold-muted)", marginBottom: 2 }}>troptionsxchange.com</div>
          {brand.poweredBy}<br />{brand.platformLine}
        </div>
      </div>
    </aside>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="xos-mobile-nav">
      {MOBILE_NAV.map((route) => {
        const active = pathname === route.href || pathname.startsWith(route.href + "/");
        return (
          <Link key={route.href} href={route.href}
            className={`xos-mobile-nav-item ${active ? "xos-mobile-nav-item--active" : ""}`}>
            <NavIcon icon={route.icon} />
            <span>{route.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="xos">
      <DemoModeBanner />
      <div className="xos-layout">
        <div className="xos-sidebar-wrapper">
          <SidebarNav />
        </div>
        <div className="xos-main-column">
          <TopBar />
          <LiveMarketsTicker />
          <main className="xos-content">
            {children}
          </main>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}