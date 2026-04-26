import type { ReactNode } from "react";
import { TroptionsSiteNav } from "@/components/troptions-evolution/TroptionsSiteNav";
import "@/styles/troptions-evolution.css";

export default function TroptionsSiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TroptionsSiteNav />
      {children}
    </>
  );
}
