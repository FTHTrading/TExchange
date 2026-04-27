import { NextResponse } from "next/server";
import { evaluateClawdIntent } from "@/lib/troptions/clawdGovernanceAdapter";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ ok: false, error: "Authorization required" }, { status: 401 });
  }

  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey) {
    return NextResponse.json({ ok: false, error: "idempotency-key header required" }, { status: 400 });
  }

  let body: { intent?: string; context?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.intent || typeof body.intent !== "string" || body.intent.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "intent field required" }, { status: 400 });
  }

  if (body.intent.trim().length > 500) {
    return NextResponse.json({ ok: false, error: "intent must be 500 characters or fewer" }, { status: 400 });
  }

  const governed = evaluateClawdIntent(body.intent.trim());

  return NextResponse.json({
    ok: governed.ok,
    simulationOnly: governed.simulationOnly,
    intent: governed.intent,
    allowed: governed.allowed,
    blocked: governed.blocked,
    constraints: governed.appliedConstraints,
    routedTo: governed.routedTo,
    requiresApproval: governed.requiresApproval,
    routingReason: governed.routingReason,
    plan: governed.plan,
    auditToken: governed.auditToken,
  });
}
