/**
 * Charter deposit, validation + payload contracts (Phase 3 data model).
 *
 * `DepositInputSchema` validates what the API route ACCEPTS after Square has
 * collected a deposit (whatever the collection method). `CharterDepositPayload`
 * is what we SEND to GHL, the `charter.deposit_paid` shape documented in
 * PHASE_3_CHARTER_DATA_MODEL.md §2a. Keep the two in sync with that doc.
 */
import { z } from "zod";

/** Charter tier. `bareboat_7_13` is the legal structure for 7-13 guests. */
export const CHARTER_TYPES = ["captained_1_6", "bareboat_7_13"] as const;
export const CharterTypeSchema = z.enum(CHARTER_TYPES);
export type CharterType = z.infer<typeof CharterTypeSchema>;

const money = z.number().nonnegative();

/**
 * Input the deposit route accepts. This is the boundary the Square adapter
 * feeds, a webhook receiver, a Web Payments charge result, or an invoice
 * event all normalize to this shape before the core takes over.
 */
export const DepositInputSchema = z
  .object({
    contact: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.email(),
      phone: z.string().min(7), // permissive; normalize to E.164 upstream if you can
    }),
    charter: z.object({
      charterDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "charterDate must be YYYY-MM-DD"),
      startTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "startTime must be HH:MM (24h)"),
      durationHours: z.number().int().positive(),
      guestCount: z.number().int().min(1).max(13),
      charterType: CharterTypeSchema,
      pickupLocation: z.string().min(1).optional(),
      assignedCaptainId: z.string().nullable().optional(),
      pricing: z.object({
        currency: z.string().default("USD"),
        totalAmount: money,
        depositAmount: money,
        balanceDue: money,
      }),
    }),
    payment: z.object({
      processor: z.literal("square").default("square"),
      type: z.literal("deposit").default("deposit"),
      status: z.string().min(1),
      paymentId: z.string().min(1),
      orderId: z.string().optional(),
      invoiceUrl: z.url().optional(),
      receiptUrl: z.url().optional(),
      amount: money,
      currency: z.string().default("USD"),
      paidAt: z.string().min(1), // ISO 8601
    }),
  })
  // Business rule: guest count must sit inside the tier's legal band.
  .refine(
    (v) => {
      const g = v.charter.guestCount;
      return v.charter.charterType === "captained_1_6"
        ? g >= 1 && g <= 6
        : g >= 7 && g <= 13;
    },
    {
      message:
        "guestCount is outside the charterType band (captained_1_6: 1-6, bareboat_7_13: 7-13)",
      path: ["charter", "guestCount"],
    },
  );

export type DepositInput = z.infer<typeof DepositInputSchema>;

/**
 * The outbound `charter.deposit_paid` payload sent to the GHL/n8n inbound
 * webhook. Mirrors PHASE_3_CHARTER_DATA_MODEL.md §2a exactly.
 */
export type CharterDepositPayload = {
  event: "charter.deposit_paid";
  version: "1.0";
  source: "topfuncharters-nextjs";
  idempotencyKey: string;
  sentAt: string;
  locationId: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tags: string[];
  };
  charter: {
    charterRef: string;
    charterName: string;
    charterDate: string;
    startTime: string;
    durationHours: number;
    guestCount: number;
    charterType: CharterType;
    vesselId: string;
    vesselName: string;
    pickupLocation: string;
    assignedCaptainId: string | null;
    pricing: {
      currency: string;
      totalAmount: number;
      depositAmount: number;
      balanceDue: number;
    };
  };
  payment: {
    processor: "square";
    type: "deposit";
    status: string;
    paymentId: string;
    orderId?: string;
    invoiceUrl?: string;
    receiptUrl?: string;
    amount: number;
    currency: string;
    paidAt: string;
  };
  routing: {
    pipelineId: string;
    targetStage: "deposit_paid_confirmed";
    assetObjectKey: string;
  };
};
