import { XRPL_REGISTRY } from "@/content/troptions/xrplRegistry";

export function listXrplAccounts() {
  return XRPL_REGISTRY;
}

export function canSignXrplTransaction() {
  return {
    allowed: false,
    blockedReasons: ["XRPL transaction signing is disabled in this environment"],
  };
}
