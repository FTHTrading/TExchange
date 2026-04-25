import { TROPTIONS_SYSTEM_IDENTITY, TROPTIONS_ECOSYSTEM_PILLARS, FULL_DISCLAIMER } from "@/content/troptions/troptionsRegistry";
import { MODULE_REGISTRY } from "@/content/troptions/moduleRegistry";
import { ASSET_REGISTRY } from "@/content/troptions/assetRegistry";
import { getCriticalClaims, getBlockedClaims } from "@/content/troptions/claimRegistry";
import { DisclaimerBanner } from "@/components/troptions/DisclaimerBanner";
import { StatusBadge } from "@/components/troptions/StatusBadge";
import { VideoFeature } from "@/components/troptions-media/VideoFeature";
import { MediaStrip } from "@/components/troptions-media/MediaStrip";
import { getMediaByCategory, getApprovedMedia, MEDIA_STATS } from "@/content/troptions/mediaRegistry";
import Link from "next/link";

export const metadata = {
  title: "Troptions Institutional Operating System",
  description: "Institutional-grade digital asset ecosystem. Proof-gated. Custody-gated. Compliance-by-jurisdiction.",
};

export default function TroptionsOverviewPage() {
  const criticalClaims = getCriticalClaims();
  const blockedClaims = getBlockedClaims();
  const activeModules = MODULE_REGISTRY.filter((m) => m.status === "live").length;
  const brandVideo = getMediaByCategory("video")[0];
  const rwaImages = getMediaByCategory("rwa");
  const allApproved = getApprovedMedia();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-[#C9A84C]/20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-[#C9A84C] font-mono text-xs uppercase tracking-[0.3em]">
            v{TROPTIONS_SYSTEM_IDENTITY.version}
          </p>
          <h1 className="text-4xl font-bold text-white mt-3">{TROPTIONS_SYSTEM_IDENTITY.name}</h1>
          <p className="text-[#C9A84C] font-light mt-1 text-lg">{TROPTIONS_SYSTEM_IDENTITY.tagline}</p>

        </div>
      </div>

      {/* System Status Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Active Modules</p>
            <p className="text-2xl font-bold text-white">{activeModules}<span className="text-slate-500 text-sm font-normal">/{MODULE_REGISTRY.length}</span></p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Assets Registered</p>
            <p className="text-2xl font-bold text-white">{ASSET_REGISTRY.length}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Blocked Claims</p>
            <p className="text-2xl font-bold text-red-400">{blockedClaims.length}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Critical Claims</p>
            <p className="text-2xl font-bold text-red-500">{criticalClaims.length}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Compliance Model</p>
            <p className="text-sm font-bold text-[#C9A84C] uppercase">{TROPTIONS_SYSTEM_IDENTITY.complianceModel}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Disclaimer */}
        <DisclaimerBanner variant="full-public" />

        <section className="rounded-lg border border-[#C9A84C]/35 bg-[#0D1B2A] p-6">
          <p className="text-[10px] text-[#C9A84C] uppercase tracking-[0.2em] font-mono">Institutional Program</p>
          <h2 className="text-xl font-bold text-white mt-2">Old Money Institutional</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            A conservative institutional site experience focused on governance, settlement discipline, evidence, and disclosure controls.
          </p>
          <Link
            href="/troptions-old-money"
            className="inline-flex mt-4 rounded border border-[#C9A84C]/40 px-4 py-2 text-sm font-semibold text-[#C9A84C] hover:bg-[#C9A84C]/10"
          >
            Enter Old Money Institutional →
          </Link>
        </section>

        {/* Ecosystem Pillars */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Ecosystem Pillars</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TROPTIONS_ECOSYSTEM_PILLARS.map((pillar) => (
              <div key={pillar} className="bg-[#0D1B2A] border border-[#C9A84C]/20 rounded-lg p-4">
                <p className="text-white text-sm font-medium">{pillar}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Asset Registry Status */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Asset Registry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASSET_REGISTRY.map((asset) => (
              <div key={asset.assetId} className="bg-[#0D1B2A] border border-slate-700/40 rounded-lg p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest">{asset.assetId}</p>
                    <h3 className="text-white font-medium mt-0.5 text-sm">{asset.assetName}</h3>
                  </div>
                  <StatusBadge status={asset.issuanceStatus} size="sm" />
                </div>
                <p className="text-slate-500 text-xs mt-2">{asset.assetType} · {asset.assetClass}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Module Registry */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Operational Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULE_REGISTRY.map((mod) => (
              <div key={mod.id} className="bg-[#0D1B2A] border border-slate-700/40 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[#C9A84C] font-mono text-xs">{mod.id}</p>
                  <StatusBadge status={mod.status} size="sm" />
                </div>
                <h3 className="text-white text-sm font-medium mt-1">{mod.name}</h3>
                <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Brand Video */}
        {brandVideo && (
          <section>
            <p className="text-[10px] text-[#C9A84C] uppercase tracking-[0.2em] font-mono mb-3">Institutional Narrative</p>
            <VideoFeature
              src={brandVideo.src}
              title={brandVideo.title}
              caption={brandVideo.description}
            />
          </section>
        )}

        {/* Media Library Strip */}
        {rwaImages.length > 0 && (
          <section>
            <MediaStrip assets={rwaImages} label="Real World Asset Evidence" />
          </section>
        )}

        {/* Media Registry Summary */}
        <section className="rounded-lg border border-[#C9A84C]/20 bg-[#0D1B2A] p-6">
          <p className="text-[10px] text-[#C9A84C] uppercase tracking-[0.2em] font-mono mb-3">Approved Media Registry</p>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-white">{MEDIA_STATS.total}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Total Assets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{MEDIA_STATS.images}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Image Assets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{MEDIA_STATS.videos}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Video Assets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#C9A84C]">{MEDIA_STATS.approved}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">Approved</p>
            </div>
          </div>
          <Link
            href="/troptions-old-money/media"
            className="inline-flex mt-5 rounded border border-[#C9A84C]/40 px-4 py-2 text-sm font-semibold text-[#C9A84C] hover:bg-[#C9A84C]/10"
          >
            View Full Media Library →
          </Link>
        </section>

        {/* Full Disclaimer */}
        <section>
          <h2 className="text-sm font-mono text-[#C9A84C] uppercase tracking-widest mb-3">Full Disclosure</h2>
          <div className="border border-slate-700/40 bg-slate-900/30 rounded-lg p-6">
            <p className="text-slate-400 text-xs leading-relaxed">{FULL_DISCLAIMER}</p>
          </div>
        </section>

      </div>
    </main>
  );
}
