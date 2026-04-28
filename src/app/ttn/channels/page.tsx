import type { Metadata } from "next";
import { TTN_CHANNELS } from "@/content/ttn/channelRegistry";
import { ChannelCard } from "@/components/ttn/ChannelCard";

export const metadata: Metadata = {
  title: "Channels",
  description: "Browse all Troptions Television Network channels — live, scheduled, and coming soon.",
};

export default function ChannelsPage() {
  const live = TTN_CHANNELS.filter((c) => c.status === "live");
  const scheduled = TTN_CHANNELS.filter((c) => c.status === "scheduled");
  const draft = TTN_CHANNELS.filter((c) => c.status === "draft");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">TTN Broadcasting</p>
        <h1 className="text-3xl font-bold text-white">All Channels</h1>
        <p className="mt-3 max-w-xl text-sm text-gray-400">
          {TTN_CHANNELS.length} channels across news, education, documentary, real estate, solar, blockchain, and more.
        </p>
      </div>

      {/* Live */}
      {live.length > 0 && (
        <div className="mb-12">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-400">Live</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      )}

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <div className="mb-12">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-yellow-400">Coming Soon</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scheduled.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      )}

      {/* Draft */}
      {draft.length > 0 && (
        <div className="mb-12">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">In Development</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {draft.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
