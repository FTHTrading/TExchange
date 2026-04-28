"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/troptions",                      label: "Home" },
  { href: "/troptions/transactions",         label: "Transactions" },
  { href: "/troptions/xrpl-platform",        label: "Platform" },
  { href: "/troptions/wallets",              label: "Wallets" },
  { href: "/troptions/kyc",                  label: "KYC" },
  { href: "/troptions/compliance/handbooks", label: "Handbooks" },
  { href: "/troptions/ecosystem",            label: "Ecosystem" },
  { href: "/troptions/layer1",               label: "Layer 1" },
  { href: "/troptions/migration",            label: "Migration" },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/troptions") return pathname === "/troptions";
  const base = href.replace(/#.*$/, "");
  return pathname === base || pathname.startsWith(base + "/");
}

export function TroptionsSiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate nav on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <header
        className={[
          "sticky top-0 z-40 w-full transition-shadow duration-200",
          "border-b border-[#C9A84C]/20 bg-[#071426]/96 backdrop-blur",
          scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.6)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">

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

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-6 text-[13px] font-medium"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "transition-colors duration-150",
                  isActive(link.href, pathname)
                    ? "text-white font-semibold"
                    : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/portal/troptions/onboarding"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#c99a3c] px-4 py-2 text-[13px] font-bold text-[#111827] transition-colors hover:bg-[#f0cf82]"
            >
              Request Access
            </Link>

            {/* Hamburger — mobile + tablet */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 transition-colors"
            >
              <span className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", open ? "translate-y-2 rotate-45" : ""].join(" ")} />
              <span className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", open ? "opacity-0" : ""].join(" ")} />
              <span className={["block w-5 h-0.5 bg-[#f0cf82] transition-all duration-200", open ? "-translate-y-2 -rotate-45" : ""].join(" ")} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        aria-label="Mobile navigation"
        className={[
          "fixed top-0 right-0 z-50 h-full w-72 bg-[#071e38] border-l border-[#C9A84C]/20 shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#C9A84C]/20 px-5 py-4">
          <span className="text-[13px] font-bold tracking-[0.2em] text-[#f0cf82]">TROPTIONS</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-slate-400 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col gap-1 px-3 py-4 grow overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive(link.href, pathname)
                  ? "bg-[#C9A84C]/12 text-white font-semibold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="border-t border-[#C9A84C]/20 px-4 py-5">
          <Link
            href="/portal/troptions/onboarding"
            className="flex items-center justify-center rounded-xl bg-[#c99a3c] px-4 py-3 text-sm font-bold text-[#111827] hover:bg-[#f0cf82] transition-colors"
          >
            Request Access
          </Link>
        </div>
      </aside>
    </>
  );
}
