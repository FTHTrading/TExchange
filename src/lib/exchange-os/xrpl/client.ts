// TROPTIONS Exchange OS — XRPL Read-Only Client
// Uses HTTP JSON-RPC for CF Workers compatibility (no WebSocket / no xrpl npm package).
// NO private keys. NO signing. NO auto-submit.
// All write operations return unsigned transaction blobs.

import { xrplConfig } from "@/config/exchange-os/xrpl";
import type { XrplErrorResponse } from "./types";

/** HTTP JSON-RPC endpoint (same XRPL cluster, HTTP transport) */
const XRPL_HTTP_URL = "https://s1.xrplcluster.com/";

/** HTTP JSON-RPC helper — read-only commands only */
async function xrplRequest(
  method: string,
  params: Record<string, unknown>
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(XRPL_HTTP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, params: [params] }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`XRPL HTTP error: ${res.status}`);
    }

    const data = (await res.json()) as {
      result?: { status?: string; error?: string; error_code?: number; error_message?: string } & Record<string, unknown>;
      error?: string;
    };

    const result = data.result;
    if (!result || result.status === "error" || result.error) {
      const err: XrplErrorResponse = {
        error: result?.error ?? data.error ?? "unknown_error",
        errorCode: result?.error_code,
        errorMessage: result?.error_message,
        status: "error",
      };
      throw err;
    }

    return result;
  } finally {
    clearTimeout(timeout);
  }
}

/** Allowed read-only XRPL commands — hardcoded whitelist for security */
const ALLOWED_READ_METHODS = new Set([
  "account_info",
  "account_lines",
  "account_offers",
  "book_offers",
  "amm_info",
  "ripple_path_find",
  "ledger",
  "ledger_current",
  "tx",
  "account_tx",
  "server_info",
]);

/** Read-only XRPL query — throws if method is not in allowlist */
export async function xrplReadQuery(
  method: string,
  params: Record<string, unknown>
): Promise<unknown> {
  if (!ALLOWED_READ_METHODS.has(method)) {
    throw new Error(
      `XRPL method '${method}' is not in the read-only allowlist. ` +
      `Write operations must go through the prepare* functions.`
    );
  }
  return xrplRequest(method, params);
}

/** Check if the XRPL WebSocket is reachable */
export async function checkXrplConnectivity(): Promise<{
  ok: boolean;
  network: string;
  mainnetEnabled: boolean;
  demoMode: boolean;
  latencyMs?: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    await xrplReadQuery("server_info", {});
    return {
      ok: true,
      network: xrplConfig.network,
      mainnetEnabled: xrplConfig.mainnetEnabled,
      demoMode: xrplConfig.demoMode,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    return {
      ok: false,
      network: xrplConfig.network,
      mainnetEnabled: xrplConfig.mainnetEnabled,
      demoMode: xrplConfig.demoMode,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
