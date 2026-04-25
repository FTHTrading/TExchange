import {
  NextResponse,
  auditPortalAction,
  buildBlockedResponse,
  guardPortalWrite,
  saveIdempotentResponse,
} from "@/lib/troptions/portalApiGuards";

export async function POST(request: Request) {
  let idempotency: Parameters<typeof saveIdempotentResponse>[0];
  try {
    const guarded = await guardPortalWrite(request);
    if (guarded instanceof NextResponse) return guarded;
    idempotency = guarded.idempotency;
    const payload = await request.json();
    const routeKey = new URL(request.url).pathname;

    const responseBody = buildBlockedResponse(
      ["RWA intake is pending legal, custody, and proof approvals"],
      { intakeRecorded: true, assetId: payload.assetId ?? "RWA-NEW" },
    );

    auditPortalAction("rwa_intake", guarded.auth.actorId, guarded.auth.actorRole, routeKey, {
      assetId: payload.assetId ?? "RWA-NEW",
    });

    saveIdempotentResponse(idempotency, 200, responseBody);
    return NextResponse.json(responseBody);
  } catch (error) {
    const responseBody = { ok: false, error: (error as Error).message };
    saveIdempotentResponse(idempotency, 400, responseBody);
    return NextResponse.json(responseBody, { status: 400 });
  }
}
