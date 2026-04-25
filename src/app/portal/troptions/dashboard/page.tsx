import { ClientPortalLayout } from "@/components/client-portal/ClientPortalLayout";
import { ClientStatusCard } from "@/components/client-portal/ClientStatusCard";
import { getClientPortalSummary } from "@/lib/troptions/clientPortalEngine";

export default function TroptionsClientDashboardPage() {
  const summary = getClientPortalSummary("CL-001");

  return (
    <ClientPortalLayout
      title="Client Dashboard"
      intro="Institutional dashboard for gated workflows and readiness checkpoints."
    >
      <ClientStatusCard label="Identity status" status={summary.identityStatus} />
      <ClientStatusCard label="Entity status" status={summary.entityStatus} />
      <ClientStatusCard label="KYC/KYB status" status={summary.identityStatus} />
      <ClientStatusCard label="Sanctions status" status={summary.sanctionsStatus} />
      <ClientStatusCard label="Proof of Funds status" status={summary.proofOfFundsStatus} />
      <ClientStatusCard label="SBLC package status" status={summary.sblcStatus} />
      <ClientStatusCard label="RWA intake status" status={summary.rwaStatus} />
      <ClientStatusCard label="Custody status" status={summary.custodyStatus} />
      <ClientStatusCard label="Banking rail status" status={summary.bankingRailStatus} />
      <ClientStatusCard label="Stablecoin rail status" status={summary.stablecoinRailStatus} />
      <ClientStatusCard label="XRPL access status" status={summary.xrplAccessStatus} />
      <ClientStatusCard label="Exchange route status" status={summary.exchangeRouteStatus} />
      <ClientStatusCard label="Trading simulation status" status={summary.tradingSimulationStatus} />
      <ClientStatusCard label="Settlement readiness" status={summary.settlementReadiness} />
      <ClientStatusCard label="Open exceptions" status={String(summary.openExceptions.length)} detail={summary.openExceptions.join(" | ")} />
      <ClientStatusCard label="Required approvals" status={String(summary.requiredApprovals.length)} detail={summary.requiredApprovals.join(" | ")} />
    </ClientPortalLayout>
  );
}
