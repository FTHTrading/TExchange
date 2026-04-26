import { NextRequest, NextResponse } from "next/server";
import { getWalletLedger } from "@/lib/troptions/walletLedgerEngine";

export async function GET(request: NextRequest) {
  const walletId = request.nextUrl.searchParams.get("walletId") ?? "wallet_kevan_main";

  return NextResponse.json({
    ok: true,
    simulationOnly: true,
    ledger: getWalletLedger(walletId),
  });
}