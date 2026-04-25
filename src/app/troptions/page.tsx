"use client";

import Link from "next/link";
import { InstitutionalFuturePanel } from "@/components/troptions-evolution/InstitutionalFuturePanel";
import { VoiceNarrationPlayer } from "@/components/troptions-evolution/VoiceNarrationPlayer";
import "@/styles/troptions-evolution.css";

export default function TroptionsOverviewPage() {
  const buildStatus = process.env.NODE_ENV === "production" ? "Production" : "Development Preview";
  const platformCards = [
    "Market Intelligence",
    "Portfolio & Wallet Review",
    "Automation Workflows",
    "Reporting Systems",
    "Secure Member Portal",
    "Admin Control Plane",
  ];

  return (
    <main className="bg-[var(--navy)] text-white">
      <div className="border-b border-[var(--line)] bg-[var(--navy)]/95 backdrop-blur supports-[backdrop-filter]:sticky supports-[backdrop-filter]:top-0 supports-[backdrop-filter]:z-30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/troptions" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--gold)]/15 text-sm font-bold text-[var(--gold-light)]">T</span>
            <span className="text-sm font-semibold tracking-[0.25em] text-[var(--gold-light)]">TROPTIONS</span>
          </Link>

          <nav aria-label="Troptions navigation" className="hidden items-center gap-7 text-sm text-slate-200 md:flex">
            <Link href="#solutions" className="hover:text-white">Solutions</Link>
            <Link href="#platform" className="hover:text-white">Platform</Link>
            <Link href="#resources" className="hover:text-white">Resources</Link>
            <Link href="#company" className="hover:text-white">Company</Link>
            <Link href="/troptions/legacy" className="hover:text-white">Legacy</Link>
            <Link href="/troptions/then-now" className="hover:text-white">Then vs Now</Link>
            <Link href="/troptions/ecosystem" className="hover:text-white">Ecosystem</Link>
            <Link href="/troptions/future" className="hover:text-white">Future</Link>
            <Link href="/troptions/diligence/source-map" className="hover:text-white">Source Map</Link>
          </nav>

          <Link
            href="/portal/troptions/onboarding"
            className="hidden rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--gold-light)] md:inline-flex"
          >
            Request Access
          </Link>

          <details className="relative md:hidden">
            <summary className="cursor-pointer rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--gold-light)] list-none">Menu</summary>
            <div className="absolute right-0 mt-2 grid min-w-44 gap-2 rounded-xl border border-[var(--line)] bg-[var(--navy-2)] p-3 text-sm text-slate-100 shadow-2xl">
              <Link href="#solutions">Solutions</Link>
              <Link href="#platform">Platform</Link>
              <Link href="#resources">Resources</Link>
              <Link href="#company">Company</Link>
              <Link href="/troptions/legacy">Legacy</Link>
              <Link href="/troptions/then-now">Then vs Now</Link>
              <Link href="/troptions/ecosystem">Ecosystem</Link>
              <Link href="/troptions/future">Future</Link>
              <Link href="/troptions/diligence/source-map">Source Map</Link>
              <Link href="/portal/troptions/onboarding" className="mt-1 rounded-md bg-[var(--gold)] px-3 py-2 text-center font-semibold text-[var(--ink)]">Request Access</Link>
            </div>
          </details>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-16 px-5 py-10 md:px-8 md:py-16">
        <VoiceNarrationPlayer pageId="homepage" autoPlay={false} showTranscript={true} />
        <section className="grid items-start gap-8 rounded-3xl border border-[var(--line)] bg-[radial-gradient(circle_at_12%_10%,rgba(201,154,60,0.24),transparent_38%),linear-gradient(180deg,var(--navy)_0%,var(--navy-2)_100%)] p-8 shadow-[0_24px_100px_rgba(3,10,22,0.65)] md:grid-cols-[1.05fr_0.95fr] md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)]">Institutional Platform</p>
            <h1 className="mt-5 text-4xl leading-tight text-white md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              Intelligent Solutions. Global Impact.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
              TROPTIONS unifies market intelligence, automation, portfolio visibility, and secure reporting into one premium operating platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/portal/troptions/dashboard" className="rounded-lg bg-[var(--gold)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--gold-light)]">Explore Platform</Link>
              <Link href="/portal/troptions/onboarding" className="rounded-lg border border-[var(--line)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Request Access</Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--line)] pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold-light)]">Platform Preview</p>
              <span className="rounded-full border border-emerald-400/50 bg-emerald-400/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200">Secure Session</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Market Intelligence",
                "Wallet Review",
                "Reports",
                "Secure Portal",
                "System Health",
              ].map((label) => (
                <article key={label} className="rounded-xl border border-[var(--line)] bg-[rgba(11,31,54,0.85)] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Module</p>
                  <p className="mt-2 text-sm font-semibold text-white">{label}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/20">
                    <div className="h-1.5 rounded-full bg-[var(--gold)]" style={{ width: "72%" }} />
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section id="platform" className="space-y-7">
          <header className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              One unified operating layer for modern digital infrastructure.
            </h2>
          </header>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platformCards.map((card) => (
              <article key={card} className="rounded-2xl border border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_18px_50px_rgba(7,20,38,0.35)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b7a2e]">Platform</p>
                <h3 className="mt-2 text-lg font-semibold">{card}</h3>
                <p className="mt-2 text-sm text-slate-600">Structured workflows and controls designed for reliable operations at scale.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="rounded-2xl border border-[var(--line)] bg-[var(--navy-2)]/95 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Unified Identity",
              "Trusted & Secure",
              "Global & Scalable",
              "Premium Experience",
            ].map((item) => (
              <article key={item} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4 text-center">
                <p className="text-sm font-semibold text-[var(--gold-light)]">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-[var(--ink)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b7a2e]">Member Portal Preview</p>
            <h3 className="mt-2 text-2xl font-semibold">Welcome back</h3>
            <p className="mt-2 text-sm text-slate-600">Demo labels only for interface preview. No live account data is displayed here.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
              <aside className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Secure Navigation</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li>Dashboard</li>
                  <li>Resources</li>
                  <li>Activity</li>
                  <li>Reports</li>
                  <li>Membership</li>
                </ul>
              </aside>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Membership Status</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Demo: Active - Institutional Tier</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Recent Activity</p>
                  <p className="mt-1 text-sm text-slate-700">Sample workflow reviews and report exports.</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Exclusive Resources</p>
                  <p className="mt-1 text-sm text-slate-700">Curated strategy notes and platform guidance.</p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-[var(--ink)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b7a2e]">Admin Control Plane Preview</p>
            <h3 className="mt-2 text-2xl font-semibold">Operational command center</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Overview",
                "Users",
                "Organizations",
                "Products",
                "Subscriptions",
                "Reports",
                "Security",
                "Integrations",
                "Settings",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Demo: Active Organizations 128",
                "Demo: Platform Health 99.95%",
                "Demo: Reports Generated 362",
                "Demo: Review Queue 21",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 p-3 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </article>
        </section>

        <section id="resources" className="rounded-2xl border border-[var(--line)] bg-[var(--navy-2)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-light)]">Intelligence and Reporting</p>
          <h3 className="mt-2 text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Market Intelligence Report</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Executive Summary",
              "Risk Review",
              "Source Verification",
              "Export-ready PDF",
              "Export-ready CSV",
            ].map((item) => (
              <article key={item} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-slate-100">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-[var(--line)] bg-[var(--navy-2)]/95 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-light)]">Security</p>
          <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Security-first operating posture</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Local-first review options",
              "Public-address inventory support",
              "Review before external lookups",
              "Audit-ready exports",
              "Role-based access planning",
              "Troptions workflows are designed not to collect or store wallet secrets.",
            ].map((item) => (
              <article key={item} className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.04)] p-4 text-sm text-slate-100">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section id="company" className="space-y-6">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold-light)]">Roadmap</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Phase 1: Dashboard & reporting",
              "Phase 2: Review workflows",
              "Phase 3: Integrations",
              "Phase 4: Production hardening",
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-[var(--line)] bg-white p-5 text-[var(--ink)]">
                <p className="text-sm font-semibold">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[linear-gradient(120deg,rgba(11,31,54,0.95),rgba(7,20,38,1))] p-8">
          <h2 className="max-w-3xl text-3xl leading-tight text-white md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Build the command center before scaling the operation.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/portal/troptions/onboarding" className="rounded-lg bg-[var(--gold)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--gold-light)]">Request Access</Link>
            <Link href="/portal/troptions/dashboard" className="rounded-lg border border-[var(--line)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View Platform Preview</Link>
          </div>
        </section>

        <InstitutionalFuturePanel />

        <footer className="rounded-2xl border border-[var(--line)] bg-[var(--navy-2)] p-6">
          <p className="text-sm font-semibold text-white">TROPTIONS / FTH Trading</p>
          <p className="mt-2 text-xs leading-6 text-slate-300">{buildStatus === "Production" ? "Production mode" : "Development preview mode"}</p>
          <p className="mt-2 text-xs leading-6 text-slate-300">Information shown is for platform demonstration and planning purposes only. It is not financial, legal, tax, or investment advice.</p>
        </footer>
      </div>
    </main>
  );
}
