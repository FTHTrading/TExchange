// TROPTIONS Exchange OS — XRPL Read-Only Client
// Uses WebSocket for live XRPL data reads.
// NO private keys. NO signing. NO auto-submit.
// All write operations return unsigned transaction blobs.

import { xrplConfig } from "@/config/exchange-os/xrpl";
import type { XrplErrorResponse } from "./types";

/** WebSocket request/response helper — read-only commands only */
async function xrplRequest(
  method: string,
  params: Record<string, unknown>
): Promise<unknown> {
  // Always use mainnet for read-only queries — it's safe and gives real market data
  const wsUrl = xrplConfig.mainnetWsUrl;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("XRPL WebSocket timeout"));
    }, 15_000);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({ id: 1, command: method, ...params })
      );
    };

    ws.onmessage = (evt) => {
      clearTimeout(timeout);
      ws.close();
      try {
        const data = JSON.parse(evt.data as string) as {
          status?: string;
          result?: unknown;
          error?: string;
          error_code?: number;
          error_message?: string;
        };
        if (data.status === "error" || data.error) {
          const err: XrplErrorResponse = {
            error: data.error ?? "unknown_error",
            errorCode: data.error_code,
            errorMessage: data.error_message,
            status: "error",
          };
          reject(err);
        } else {
          resolve(data.result);
        }
      } catch {
        reject(new Error("Invalid JSON from XRPL WebSocket"));
      }
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      ws.close();
      reject(new Error("XRPL WebSocket connection error"));
    };
  });
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
