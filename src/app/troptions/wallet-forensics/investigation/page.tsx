import { WalletForensicsLayout } from "@/components/wallet-forensics/WalletForensicsLayout";
import { CompromiseEvidencePanel } from "@/components/wallet-forensics/CompromiseEvidencePanel";

export const metadata = {
  title: "Full Forensic Investigation — All Wallets | Troptions",
  description:
    "Comprehensive investigation covering all XRPL and Stellar wallets, the compromise timeline, attacker signing-key chain, and recovery checklist.",
};

export default function WalletForensicsInvestigationPage() {
  return (
    <WalletForensicsLayout
      title="Full Forensic Investigation"
      intro="All wallets — XRPL primary compromise, related accounts, attacker signing-key chain, OPTKAS backup set, and Stellar accounts. Treat rpP12ND... as externally controlled unless proven otherwise."
    >
      <CompromiseEvidencePanel />
    </WalletForensicsLayout>
  );
}
