/**
 * Revenue Database Layer
 * SQLite-backed storage for client inquiries and booking requests.
 * Uses the same better-sqlite3 pattern as src/lib/auth/db.ts
 */

import Database from "better-sqlite3";
import path from "path";
import crypto from "crypto";
import type {
  ClientInquiry,
  BookingRequest,
  BudgetRange,
  ServiceCategory,
  CallType,
  LeadSource,
  LeadStatus,
} from "@/lib/troptions/revenue";
import { qualifyLead } from "@/lib/troptions/revenue";

const DB_PATH = path.join(process.cwd(), "data", "revenue.db");

let db: Database.Database | null = null;

export function getRevenueDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initRevenueSchema(db);
  }
  return db;
}

function initRevenueSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      phone       TEXT,
      company     TEXT,
      website     TEXT,
      budget_range TEXT NOT NULL DEFAULT 'not_specified',
      service_interest TEXT NOT NULL DEFAULT 'not_sure',
      timeline    TEXT,
      message     TEXT NOT NULL,
      consent_given INTEGER NOT NULL DEFAULT 0,
      source      TEXT NOT NULL DEFAULT 'website_contact',
      status      TEXT NOT NULL DEFAULT 'new',
      lead_score  INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT NOT NULL,
      updated_at  TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS booking_requests (
      id              TEXT PRIMARY KEY,
      name            TEXT NOT NULL,
      email           TEXT NOT NULL,
      company         TEXT,
      preferred_date  TEXT,
      preferred_time  TEXT,
      timezone        TEXT,
      call_type       TEXT NOT NULL DEFAULT 'discovery',
      notes           TEXT,
      status          TEXT NOT NULL DEFAULT 'pending',
      created_at      TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_status   ON inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_inquiries_email    ON inquiries(email);
    CREATE INDEX IF NOT EXISTS idx_inquiries_created  ON inquiries(created_at);
    CREATE INDEX IF NOT EXISTS idx_bookings_email     ON booking_requests(email);
    CREATE INDEX IF NOT EXISTS idx_bookings_created   ON booking_requests(created_at);

    CREATE TABLE IF NOT EXISTS cis_requests (
      id                TEXT PRIMARY KEY,
      name              TEXT NOT NULL,
      email             TEXT NOT NULL,
      phone             TEXT,
      company           TEXT,
      entity_type       TEXT NOT NULL DEFAULT 'individual',
      jurisdiction      TEXT,
      purpose           TEXT NOT NULL,
      transaction_type  TEXT,
      estimated_amount  TEXT,
      consent_given     INTEGER NOT NULL DEFAULT 0,
      status            TEXT NOT NULL DEFAULT 'received',
      created_at        TEXT NOT NULL,
      updated_at        TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cis_email   ON cis_requests(email);
    CREATE INDEX IF NOT EXISTS idx_cis_status  ON cis_requests(status);
    CREATE INDEX IF NOT EXISTS idx_cis_created ON cis_requests(created_at);
  `);
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  budgetRange?: BudgetRange;
  serviceInterest?: ServiceCategory;
  timeline?: string;
  message: string;
  consentGiven: boolean;
}

function rowToInquiry(row: Record<string, unknown>): ClientInquiry {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) || undefined,
    company: (row.company as string) || undefined,
    website: (row.website as string) || undefined,
    budgetRange: (row.budget_range as BudgetRange) ?? "not_specified",
    serviceInterest: (row.service_interest as ServiceCategory) ?? "not_sure",
    timeline: (row.timeline as string) || undefined,
    message: row.message as string,
    consentGiven: row.consent_given === 1,
    source: (row.source as LeadSource) ?? "website_contact",
    status: (row.status as LeadStatus) ?? "new",
    leadScore: row.lead_score as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function createInquiry(input: CreateInquiryInput): ClientInquiry {
  const database = getRevenueDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const partial: Partial<ClientInquiry> = {
    id,
    name: input.name,
    email: input.email.toLowerCase().trim(),
    phone: input.phone,
    company: input.company,
    website: input.website,
    budgetRange: input.budgetRange ?? "not_specified",
    serviceInterest: input.serviceInterest ?? "not_sure",
    timeline: input.timeline,
    message: input.message,
    consentGiven: input.consentGiven,
    source: "website_contact" as LeadSource,
    status: "new" as LeadStatus,
    createdAt: now,
    updatedAt: now,
  };

  const leadScore = qualifyLead(partial as ClientInquiry);

  database
    .prepare(
      `INSERT INTO inquiries (id, name, email, phone, company, website,
        budget_range, service_interest, timeline, message,
        consent_given, source, status, lead_score, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      input.name.trim(),
      input.email.toLowerCase().trim(),
      input.phone?.trim() ?? null,
      input.company?.trim() ?? null,
      input.website?.trim() ?? null,
      input.budgetRange ?? "not_specified",
      input.serviceInterest ?? "not_sure",
      input.timeline?.trim() ?? null,
      input.message.trim(),
      input.consentGiven ? 1 : 0,
      "website_contact",
      "new",
      leadScore,
      now,
      now
    );

  return rowToInquiry(
    database.prepare("SELECT * FROM inquiries WHERE id = ?").get(id) as Record<string, unknown>
  );
}

export function listInquiries(limit = 100, offset = 0): ClientInquiry[] {
  const database = getRevenueDb();
  const rows = database
    .prepare("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT ? OFFSET ?")
    .all(limit, offset) as Record<string, unknown>[];
  return rows.map(rowToInquiry);
}

export function getInquiry(id: string): ClientInquiry | null {
  const database = getRevenueDb();
  const row = database
    .prepare("SELECT * FROM inquiries WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? rowToInquiry(row) : null;
}

export function updateInquiryStatus(id: string, status: LeadStatus): boolean {
  const database = getRevenueDb();
  const result = database
    .prepare("UPDATE inquiries SET status = ?, updated_at = ? WHERE id = ?")
    .run(status, new Date().toISOString(), id);
  return result.changes > 0;
}

export function getInquirySummary() {
  const database = getRevenueDb();
  const total = (database.prepare("SELECT COUNT(*) as n FROM inquiries").get() as { n: number }).n;
  const newLeads = (
    database
      .prepare("SELECT COUNT(*) as n FROM inquiries WHERE status = 'new'")
      .get() as { n: number }
  ).n;
  const qualified = (
    database
      .prepare("SELECT COUNT(*) as n FROM inquiries WHERE status = 'qualified'")
      .get() as { n: number }
  ).n;

  return { total, newLeads, qualified };
}

// ─── Booking Requests ─────────────────────────────────────────────────────────

export interface CreateBookingInput {
  name: string;
  email: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  callType?: CallType;
  notes?: string;
}

function rowToBooking(row: Record<string, unknown>): BookingRequest {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    company: (row.company as string) || undefined,
    preferredDate: (row.preferred_date as string) || undefined,
    preferredTime: (row.preferred_time as string) || undefined,
    timezone: (row.timezone as string) || undefined,
    callType: (row.call_type as CallType) ?? "discovery",
    notes: (row.notes as string) || undefined,
    status: (row.status as "pending" | "confirmed" | "cancelled") ?? "pending",
    createdAt: row.created_at as string,
  };
}

export function createBookingRequest(input: CreateBookingInput): BookingRequest {
  const database = getRevenueDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  database
    .prepare(
      `INSERT INTO booking_requests
        (id, name, email, company, preferred_date, preferred_time, timezone, call_type, notes, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      input.name.trim(),
      input.email.toLowerCase().trim(),
      input.company?.trim() ?? null,
      input.preferredDate?.trim() ?? null,
      input.preferredTime?.trim() ?? null,
      input.timezone?.trim() ?? null,
      input.callType ?? "discovery",
      input.notes?.trim() ?? null,
      "pending",
      now
    );

  return rowToBooking(
    database
      .prepare("SELECT * FROM booking_requests WHERE id = ?")
      .get(id) as Record<string, unknown>
  );
}

export function listBookingRequests(limit = 100, offset = 0): BookingRequest[] {
  const database = getRevenueDb();
  const rows = database
    .prepare("SELECT * FROM booking_requests ORDER BY created_at DESC LIMIT ? OFFSET ?")
    .all(limit, offset) as Record<string, unknown>[];
  return rows.map(rowToBooking);
}

export function getBookingSummary() {
  const database = getRevenueDb();
  const total = (
    database.prepare("SELECT COUNT(*) as n FROM booking_requests").get() as { n: number }
  ).n;
  const pending = (
    database
      .prepare("SELECT COUNT(*) as n FROM booking_requests WHERE status = 'pending'")
      .get() as { n: number }
  ).n;
  return { total, pending };
}

// ─── CIS Requests ─────────────────────────────────────────────────────────────

export interface CisRequestRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  entityType: string;
  jurisdiction?: string;
  purpose: string;
  transactionType?: string;
  estimatedAmount?: string;
  consentGiven: boolean;
  status: "received" | "under_review" | "complete" | "declined";
  createdAt: string;
  updatedAt: string;
}

export interface CreateCisRequestInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  entityType?: string;
  jurisdiction?: string;
  purpose: string;
  transactionType?: string;
  estimatedAmount?: string;
  consentGiven: boolean;
}

function rowToCis(row: Record<string, unknown>): CisRequestRow {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) || undefined,
    company: (row.company as string) || undefined,
    entityType: (row.entity_type as string) ?? "individual",
    jurisdiction: (row.jurisdiction as string) || undefined,
    purpose: row.purpose as string,
    transactionType: (row.transaction_type as string) || undefined,
    estimatedAmount: (row.estimated_amount as string) || undefined,
    consentGiven: row.consent_given === 1,
    status: (row.status as CisRequestRow["status"]) ?? "received",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function createCisRequest(input: CreateCisRequestInput): CisRequestRow {
  const database = getRevenueDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  database
    .prepare(
      `INSERT INTO cis_requests
        (id, name, email, phone, company, entity_type, jurisdiction, purpose,
         transaction_type, estimated_amount, consent_given, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'received', ?, ?)`
    )
    .run(
      id,
      input.name.trim(),
      input.email.toLowerCase().trim(),
      input.phone?.trim() ?? null,
      input.company?.trim() ?? null,
      input.entityType?.trim() ?? "individual",
      input.jurisdiction?.trim() ?? null,
      input.purpose.trim(),
      input.transactionType?.trim() ?? null,
      input.estimatedAmount?.trim() ?? null,
      input.consentGiven ? 1 : 0,
      now,
      now
    );

  return rowToCis(
    database.prepare("SELECT * FROM cis_requests WHERE id = ?").get(id) as Record<string, unknown>
  );
}

export function listCisRequests(limit = 100, offset = 0): CisRequestRow[] {
  const database = getRevenueDb();
  const rows = database
    .prepare("SELECT * FROM cis_requests ORDER BY created_at DESC LIMIT ? OFFSET ?")
    .all(limit, offset) as Record<string, unknown>[];
  return rows.map(rowToCis);
}

export function getCisSummary() {
  const database = getRevenueDb();
  const total = (database.prepare("SELECT COUNT(*) as n FROM cis_requests").get() as { n: number }).n;
  const pending = (
    database.prepare("SELECT COUNT(*) as n FROM cis_requests WHERE status = 'received'").get() as { n: number }
  ).n;
  return { total, pending };
}
