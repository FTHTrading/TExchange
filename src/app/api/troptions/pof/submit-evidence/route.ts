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
      ["POF remains pending until evidence verification and jurisdiction review are complete"],
      {
        submitted: true,
        pofId: payload.pofId ?? "POF-NEW",
      },
    );

    auditPortalAction("pof_submit_evidence", guarded.auth.actorId, guarded.auth.actorRole, routeKey, {
      pofId: payload.pofId ?? "POF-NEW",
    });

    saveIdempotentResponse(idempotency, 200, responseBody);
    return NextResponse.json(responseBody);
  } catch (error) {
    const responseBody = { ok: false, error: (error as Error).message };
    saveIdempotentResponse(idempotency, 400, responseBody);
    return NextResponse.json(responseBody, { status: 400 });
  }
}
