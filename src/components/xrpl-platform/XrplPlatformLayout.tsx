import Link from "next/link";
import type { ReactNode } from "react";

type XrplPlatformLayoutProps = {
  readonly title: string;
  readonly intro: string;
  readonly children: ReactNode;
};

const PLATFORM_LINKS = [
  { href: "/troptions/xrpl-platform", label: "Platform" },
  { href: "/troptions/xrpl-platform/live-data", label: "Live Data" },
  { href: "/troptions/xrpl-platform/dex", label: "DEX" },
  { href: "/troptions/xrpl-platform/amm", label: "AMM" },
  { href: "/troptions/xrpl-platform/pathfinding", label: "Pathfinding" },
  { href: "/troptions/xrpl-platform/testnet-lab", label: "Testnet Lab" },
  { href: "/troptions/xrpl-platform/mainnet-readiness", label: "Mainnet Gates" },
  { href: "/troptions/xrpl-platform/security", label: "Security" },
  { href: "/troptions/xrpl-platform/links", label: "Links" },
] as const;

export function XrplPlatformLayout({ title, intro, children }: XrplPlatformLayoutProps) {
  return (
    <main className="xp-theme min-h-screen">
      <div className="xp-wrap">
        <header className="xp-header">
          <p className="xp-kicker">XRPL Platform</p>
          <h1 className="xp-title">{title}</h1>
          <p className="xp-intro">{intro}</p>
          <nav className="xp-nav" aria-label="XRPL platform sections">
            {PLATFORM_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="xp-grid">{children}</div>
      </div>
    </main>
  );
}