import { TROPTIONS_CAPABILITY_EXPANSION } from "@/content/troptions/troptionsCapabilityExpansion";
import { CapabilityExpansionGrid } from "@/components/troptions-evolution/CapabilityExpansionGrid";
import "@/styles/troptions-evolution.css";

export const metadata = {
  title: "Troptions Expanded Capabilities",
  description: "Expanded institutional capability map for Troptions legacy-to-future build.",
};

export default function TroptionsCapabilitiesExpandedPage() {
  return (
    <main className="te-page">
      <div className="te-wrap">
        <header className="te-panel">
          <p className="te-kicker">Capability Expansion</p>
          <h1 className="te-heading">Expanded Troptions Capabilities</h1>
          <p className="te-subheading">
            Capability stack spanning website, diligence systems, simulation layers, and controlled future integrations.
          </p>
        </header>

        <CapabilityExpansionGrid items={TROPTIONS_CAPABILITY_EXPANSION} />
      </div>
    </main>
  );
}
