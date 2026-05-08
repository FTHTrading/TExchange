import type { Metadata } from "next";
import AppShell from "@/components/exchange-os/AppShell";

export const metadata: Metadata = {
  title: "TROPTIONS Exchange OS",
  description:
    "Launch. Trade. Earn. Prove. XRPL trading, token launches, creator rewards, and x402 AI commerce in one operating system.",
};

export default function ExchangeOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
