import type { Metadata } from "next";
import Link from "next/link";
import { TTN_VIDEOS } from "@/content/ttn/videoRegistry";
import { TTN_BLOG_POSTS } from "@/content/ttn/blogRegistry";
import { TTN_FILMS } from "@/content/ttn/filmRegistry";
import { TTN_PROOF_RECORDS } from "@/content/ttn/proofRegistry";
import { TTN_CREATORS } from "@/content/ttn/creatorRegistry";

export const metadata: Metadata = {
  title: "Admin — Content Review",
  description: "TTN content review and approval hub.",
};

export default function AdminContentReviewPage() {
  const pendingVideos = TTN_VIDEOS.filter((v) => v.status === "draft" || v.status === "pending-review");
  const pendingBlogs = TTN_BLOG_POSTS.filter((p) => p.status === "draft");
  const pendingFilms = TTN_FILMS.filter((f) => f.status === "pending-review");
  const pendingProofs = TTN_PROOF_RECORDS.filter((r) => r.approvalStatus === "pending");
  const pendingCreators = TTN_CREATORS.filter((c) => c.status === "pending");

  const total = pendingVideos.length + pendingBlogs.length + pendingFilms.length + pendingProofs.length + pendingCreators.length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Admin banner */}
      <div className="mb-8 rounded-xl border border-red-800/40 bg-red-900/10 p-5">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-[0.2em] mb-1">Admin Access Required</p>
        <p className="text-sm text-red-300/70">
          Admin features are disabled in this environment. Simulation only. All approve/reject actions are non-functional.
        </p>
      </div>

      <div className="mb-10">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">Admin</p>
        <h1 className="text-3xl font-bold text-white">Content Review Hub</h1>
        <p className="mt-3 text-sm text-gray-400">
          Review and approve pending content submissions across all TTN content types.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          { label: "Videos", count: pendingVideos.length, color: "text-blue-400" },
          { label: "Blog Posts", count: pendingBlogs.length, color: "text-green-400" },
          { label: "Films", count: pendingFilms.length, color: "text-purple-400" },
          { label: "Proof Records", count: pendingProofs.length, color: "text-[#C9A84C]" },
          { label: "Creators", count: pendingCreators.length, color: "text-pink-400" },
        ].map(({ label, count, color }) => (
          <div key={label} className="rounded-xl border border-gray-800 bg-[#0F1923] p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {total === 0 && (
        <div className="mb-10 rounded-xl border border-dashed border-gray-700 p-12 text-center text-sm text-gray-500">
          No pending items. All queues are clear.
        </div>
      )}

      {/* Pending Creators */}
      {pendingCreators.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-400">
            Pending Creator Approvals
          </h2>
          <div className="space-y-3">
            {pendingCreators.map((creator) => (
              <div key={creator.id} className="flex items-center gap-4 rounded-xl border border-gray-800 bg-[#0F1923] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white">
                  {creator.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{creator.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{creator.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-green-800/50 bg-green-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-green-600"
                  >
                    Approve
                  </button>
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-red-800/50 bg-red-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pending Proof Records */}
      {pendingProofs.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            Pending Proof Records
          </h2>
          <div className="space-y-3">
            {pendingProofs.map((record) => {
              const creator = TTN_CREATORS.find((c) => c.id === record.creatorId);
              return (
                <div key={record.id} className="flex items-start gap-4 rounded-xl border border-gray-800 bg-[#0F1923] p-4">
                  <div className="flex-1 min-w-0">
                    <p className="mb-0.5 text-sm text-white">{record.title}</p>
                    <p className="text-[10px] text-gray-500 capitalize">
                      {record.contentType.replace(/-/g, " ")}
                      {creator ? ` · ${creator.name}` : ""}
                    </p>
                    <p className="mt-1 font-mono text-[9px] text-gray-600 truncate">{record.ipfsCid}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/ttn/proof/${record.ipfsCid}`}
                      className="rounded border border-gray-700 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 hover:text-white transition-colors"
                    >
                      View
                    </Link>
                    <button
                      disabled
                      className="cursor-not-allowed rounded border border-green-800/50 bg-green-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-green-600"
                    >
                      Approve
                    </button>
                    <button
                      disabled
                      className="cursor-not-allowed rounded border border-red-800/50 bg-red-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Pending Films */}
      {pendingFilms.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-400">
            Pending Film Submissions
          </h2>
          <div className="space-y-3">
            {pendingFilms.map((film) => (
              <div key={film.id} className="flex items-start gap-4 rounded-xl border border-gray-800 bg-[#0F1923] p-4">
                <div className="flex-1 min-w-0">
                  <p className="mb-0.5 text-sm text-white">{film.title}</p>
                  <p className="text-[10px] text-gray-500">
                    {film.runtime} · {film.genre.join(", ")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/ttn/films/${film.slug}`}
                    className="rounded border border-gray-700 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 hover:text-white transition-colors"
                  >
                    View
                  </Link>
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-green-800/50 bg-green-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-green-600"
                  >
                    Approve
                  </button>
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-red-800/50 bg-red-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pending Blogs */}
      {pendingBlogs.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-400">
            Pending Blog Posts
          </h2>
          <div className="space-y-3">
            {pendingBlogs.map((post) => (
              <div key={post.id} className="flex items-center gap-4 rounded-xl border border-gray-800 bg-[#0F1923] p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{post.title}</p>
                  <p className="text-[10px] text-gray-500 capitalize">
                    {post.category} · {post.readingTimeMinutes} min read
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-green-800/50 bg-green-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-green-600"
                  >
                    Publish
                  </button>
                  <button
                    disabled
                    className="cursor-not-allowed rounded border border-red-800/50 bg-red-900/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="mt-4 rounded-xl border border-gray-800 bg-[#090E18] p-5">
        <p className="text-[11px] text-gray-600">
          This admin panel is simulation only. No approval actions trigger any database writes,
          notifications, or live content publication. All TTN content registries are static TypeScript files.
          Live admin functionality requires authenticated API endpoints and a live database.
        </p>
      </div>
    </div>
  );
}
