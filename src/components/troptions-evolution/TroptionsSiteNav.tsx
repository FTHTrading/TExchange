"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home",         href: "/troptions" },
  { label: "Wallets",      href: "/troptions/wallets" },
  { label: "Transactions", href: "/troptions/transactions" },
  { label: "Handbooks",    href: "/troptions/compliance/handbooks" },
  { label: "KYC",          href: "/troptions/kyc" },
  { label: "Migration",    href: "/troptions/migration" },
  { label: "RWA",          href: "/troptions/rwa/axl-001" },
  { label: "Compliance",   href: "/troptions/xrpl-stellar-compliance" },
] as const;

const CTA = { label: "Request Access", href: "/portal/troptions/onboarding" } as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/troptions") return pathname === "/troptions";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TroptionsSiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071426]/95 backdrop-blur-xl">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        {/* Logo */}
        <Link href="/troptions" className="flex items-center gap-2.5 shrink-0">
          <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-[#C9A84C]/40 bg-black">
            <Image
              src="/assets/troptions/logos/troptions-tt-black.jpg"
              alt="TROPTIONS"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>
          <span className="text-[13px] font-bold tracking-[0.22em] text-[#f0cf82]">TROPTIONS</span>
        </Link>

        {/* Desktop nav — only rendered at lg+ */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                isActive(item.href, pathname)
                  ? "bg-white/10 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href={CTA.href}
            className="hidden sm:inline-flex items-center rounded-lg bg-[#c99a3c] px-4 py-2 text-[13px] font-bold text-[#111827] hover:bg-[#f0cf82] transition-colors"
          >
            {CTA.label}
          </Link>

          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 transition-colors"
          >
            <span
              className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", menuOpen ? "translate-y-2 rotate-45" : ""].join(" ")}
            />
            <span
              className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", menuOpen ? "opacity-0" : ""].join(" ")}
            />
            <span
              className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", menuOpen ? "-translate-y-2 -rotate-45" : ""].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — conditionally mounted; not in DOM when menuOpen is false */}
      {menuOpen ? (
        <div className="lg:hidden border-t border-white/10 bg-[#071426]">
          <nav aria-label="Mobile navigation" className="flex flex-col px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive(item.href, pathname)
                    ? "bg-[#C9A84C]/12 text-white font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CTA.href}
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-xl bg-[#c99a3c] px-4 py-3 text-sm font-bold text-[#111827] hover:bg-[#f0cf82] transition-colors"
            >
              {CTA.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
