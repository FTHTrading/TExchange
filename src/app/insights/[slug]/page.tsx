import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInsightBySlug, INSIGHTS, EDITORIAL_DISCLAIMER } from "@/content/troptions/insightsRegistry";

export async function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: "Not Found" };
  return {
    title: `${insight.title} — Troptions Insights`,
    description: insight.summary,
  };
}

const CAT_COLOR: Record<string, string> = {
  infrastructure: "#60a5fa",
  settlement: "#22c55e",
  "asset-classes": "#c4a84a",
  compliance: "#f59e0b",
  "ai-agentic": "#a78bfa",
};

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "4px", background: "#1e3058", color: CAT_COLOR[insight.category] ?? "#9ca3af" }}>
          {insight.category}
        </span>
      </div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#e8e0d0", lineHeight: 1.35, marginBottom: "1rem", maxWidth: "800px" }}>
        {insight.title}
      </h1>
      <div style={{ display: "flex", gap: "1.5rem", color: "#6b7280", fontSize: "0.8rem", marginBottom: "2rem" }}>
        <span>{insight.date}</span>
        <span>{insight.readingTime} read</span>
      </div>

      <p style={{ color: "#9ca3af", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "720px" }}>
        {insight.summary}
      </p>

      {/* Expanded content placeholder — gate-aware body */}
      <div style={{ background: "#0d1526", border: "1px solid #1e3058", borderRadius: "8px", padding: "2rem", marginBottom: "2rem", color: "#9ca3af", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: "720px" }}>
        <p style={{ marginBottom: "1rem" }}>
          Institutional infrastructure operates at the intersection of compliance, technology, and operational readiness.
          The {insight.title.toLowerCase()} framework within Troptions addresses each component systematically —
          starting with intake, moving through verification, and gating activation on compliance clearance.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          Every workflow component in this area requires satisfaction of the following gates before activation:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 2.2 }}>
          <li>Provider approval gate</li>
          <li>Legal review gate</li>
          <li>Compliance clearance gate</li>
          <li>Custody coordination gate</li>
          <li>Jurisdiction confirmation gate</li>
          <li>Board approval gate</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>
          Until all gates are satisfied, all operations in this category run in simulation mode.
          No live transactions, no live settlements, no live custody transfers.
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
        {insight.tags.map((tag) => (
          <span key={tag} style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", background: "#0a0f1a", border: "1px solid #1e3058", borderRadius: "4px", color: "#c4a84a" }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Editorial disclaimer */}
      <div style={{ background: "#0a0f1a", border: "1px solid #1e3058", borderRadius: "6px", padding: "1rem", fontSize: "0.8rem", color: "#6b7280" }}>
        <strong style={{ color: "#9ca3af" }}>Editorial Disclaimer:</strong> {EDITORIAL_DISCLAIMER}
      </div>
    </div>
  );
}
