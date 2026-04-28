import type { ReactNode } from "react";
import { TroptionsSiteNav } from "@/components/troptions-evolution/TroptionsSiteNav";
import { TroptionsSiteFooter } from "@/components/troptions-evolution/TroptionsSiteFooter";
import "@/styles/troptions-evolution.css";

export default function TroptionsSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#071426]">
      <TroptionsSiteNav />
      <main className="flex-1">{children}</main>
      <TroptionsSiteFooter />
    </div>
  );
}
