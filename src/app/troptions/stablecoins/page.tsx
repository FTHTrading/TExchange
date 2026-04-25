import Link from "next/link";
import { STABLECOIN_ISSUER_REGISTRY } from "@/content/troptions/stablecoinIssuerRegistry";

export default function TroptionsStablecoinsPage() {
  return (
    <main style={{ background: "#0a0f1a", minHeight: "100vh", color: "#e8e0d0", padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Stablecoin Rail Intelligence</h1>
      <p>Stablecoin support is managed as simulation, monitoring, and readiness controls with issuer- and jurisdiction-gated release conditions.</p>
      <ul>{STABLECOIN_ISSUER_REGISTRY.map((item) => <li key={item.symbol}>{item.symbol} — {item.issuer}</li>)}</ul>
      <p><Link href="/troptions/stablecoins/usdc">USDC</Link> · <Link href="/troptions/stablecoins/usdt">USDT</Link> · <Link href="/troptions/stablecoins/paxos">Paxos</Link> · <Link href="/troptions/stablecoins/pyusd">PYUSD</Link> · <Link href="/troptions/stablecoins/usdp">USDP</Link> · <Link href="/troptions/stablecoins/paxg">PAXG</Link></p>
    </main>
  );
}
