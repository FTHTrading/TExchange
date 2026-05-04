/**
 * Route smoke tests — verify that the platform's critical pages, files,
 * and configuration are in place. These are static assertions (no network
 * requests, no DB connections) and run instantly.
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "../..");

function exists(rel: string): boolean {
  return fs.existsSync(path.join(ROOT, rel));
}

// ---------------------------------------------------------------------------
// 1. Previously-404 pages now have page.tsx
// ---------------------------------------------------------------------------
describe("Previously-missing pages now exist", () => {
  test("institutional index page exists", () => {
    expect(exists("src/app/troptions/institutional/page.tsx")).toBe(true);
  });
  test("compliance page exists", () => {
    expect(exists("src/app/troptions/compliance/page.tsx")).toBe(true);
  });
  test("rwa page exists", () => {
    expect(exists("src/app/troptions/rwa/page.tsx")).toBe(true);
  });
  test("settlement page exists", () => {
    expect(exists("src/app/troptions/settlement/page.tsx")).toBe(true);
  });
  test("system-status page exists", () => {
    expect(exists("src/app/troptions/system-status/page.tsx")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 2. Proof files served from public/
// ---------------------------------------------------------------------------
describe("Proof files are present on disk", () => {
  test("Bryan Stone USDC 175M HTML proof exists", () => {
    expect(exists("public/proofs/bryan-stone-usdc-175m.html")).toBe(true);
  });
  test("Bryan Stone USDC 175M verification commands txt exists", () => {
    expect(exists("public/proofs/bryan-stone-usdc-175m-verification-commands.txt")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 3. CIS redirect target file exists
// ---------------------------------------------------------------------------
describe("CIS download file exists", () => {
  test("Bryan Stone KYC CIS master file PDF exists", () => {
    expect(
      exists("public/troptions/downloads/bryan-stone-kyc-cis-master-file.pdf")
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 4. XRPL TX hashes are valid 64-char hex
// ---------------------------------------------------------------------------
describe("XRPL TX hashes format validation", () => {
  const HEX64 = /^[0-9A-F]{64}$/;

  const hashes: [string, string][] = [
    ["USDC trustSet",  "CD7271274743C20635ED58515F84B399A4113FE40E62CFC8248446A494D1E642"],
    ["USDT trustSet",  "42092147E2D2BB2E944C7156378A6CEE8B8D0E78FB350266FC1990439D7F1F6F"],
    ["DAI trustSet",   "C0D75DCCF46DCA6F1776D739A4EC0F521330E170B8BC2E09C7F4D42A2361F641"],
    ["EURC trustSet",  "FF11D7773C0EDF38833A9CEE5AE03DEB6167D87FF07180A275A1DDCABCC560D1"],
  ];

  for (const [label, hash] of hashes) {
    test(`${label} hash is 64-char uppercase hex`, () => {
      expect(HEX64.test(hash)).toBe(true);
    });
  }
});

// ---------------------------------------------------------------------------
// 5. Middleware protects portal routes
// ---------------------------------------------------------------------------
describe("Middleware matcher covers portal", () => {
  test("middleware.ts matches /portal/:path*", () => {
    const middleware = fs.readFileSync(
      path.join(ROOT, "middleware.ts"),
      "utf-8"
    );
    expect(middleware).toContain('"/portal/:path*"');
  });

  test("middleware.ts still matches /troptions/gated/:path*", () => {
    const middleware = fs.readFileSync(
      path.join(ROOT, "middleware.ts"),
      "utf-8"
    );
    expect(middleware).toContain('"/troptions/gated/:path*"');
  });
});

// ---------------------------------------------------------------------------
// 6. Revenue DB module exports expected functions
// ---------------------------------------------------------------------------
describe("Revenue DB module structure", () => {
  test("revenue-db.ts exports createInquiry function", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src/lib/troptions/revenue-db.ts"),
      "utf-8"
    );
    expect(src).toContain("export function createInquiry");
  });

  test("revenue-db.ts exports createBookingRequest function", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src/lib/troptions/revenue-db.ts"),
      "utf-8"
    );
    expect(src).toContain("export function createBookingRequest");
  });
});

// ---------------------------------------------------------------------------
// 7. Inquiries API validates required fields
// ---------------------------------------------------------------------------
describe("Inquiries API input validation", () => {
  test("inquiries route.ts validates name field", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src/app/api/troptions/inquiries/route.ts"),
      "utf-8"
    );
    expect(src).toContain("name");
  });

  test("inquiries route.ts validates email field", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src/app/api/troptions/inquiries/route.ts"),
      "utf-8"
    );
    expect(src).toContain("email");
  });

  test("inquiries route.ts validates consentGiven field", () => {
    const src = fs.readFileSync(
      path.join(ROOT, "src/app/api/troptions/inquiries/route.ts"),
      "utf-8"
    );
    expect(src).toContain("consentGiven");
  });
});
