# Phase 3 — Charter-Centric Data Model (GoHighLevel)

> **Status:** Architecture spec. IDs in `{{DOUBLE_BRACES}}` are placeholders you fill
> from your GHL sub-account. All LeadConnector/GHL URLs referenced here must live in
> [`src/config/ghl.ts`](src/config/ghl.ts) — do not inline them in components.

---

## GHL sub-account setup checklist

One-time config in the GHL sub-account. Do it top-to-bottom — each step produces an id
the later steps (and the code) depend on. The right-hand column is the exact placeholder
in [`src/config/ghl.ts`](src/config/ghl.ts) to paste the result into.

- [ ] **1. Create pipeline** `Charters` with 5 stages (Inquiry → Quoted → Deposit Paid / Confirmed → Ready for Charter → Complete) → `pipeline.chartersId` + `pipeline.stages.*` (5 ids)
- [ ] **2. Create Custom Object** `charter` with the §1b fields (booleans as Yes/No single-selects) → confirms `objects.charter`
- [ ] **3. Create Custom Object** `captain` + seed 7 records (`captain_slug` = slug from [`captains.ts`](src/data/captains.ts)) → confirms `objects.captain`
- [ ] **4. Create associations** `contact_charters` (1→many) and `charter_captain` (many→1)
- [ ] **5. Create Custom Values** — marina, main line, support email, review URL (from [`site.ts`](src/config/site.ts))
- [ ] **6. Create WF-1 workflow** with an Inbound Webhook trigger → copy URL to `webhooks.charterDepositPaid`
- [ ] **7. Create WF-7 workflow** with an Inbound Webhook trigger → copy URL to `webhooks.charterFinalPaid`
- [ ] **8. Paste all ids/URLs** into the placeholders in [`src/config/ghl.ts`](src/config/ghl.ts) and remove the `{{…}}` markers

> Steps 1 and 6–7 unblock the code: `pipeline.*` feeds the webhook `routing` block, and
> `webhooks.charterDepositPaid` is the endpoint the Square handler (below) POSTs to.

---

## 0. The core architectural decision (read this first)

GHL does **not** put pipeline stages on Custom Objects — **pipelines belong to
Opportunities**. That is actually a gift here, because your brief already asks to split
"lean 5-stage pipeline" from "rich independent status fields." We map that split onto
GHL natively:

| Concern | GHL primitive | Why |
|---|---|---|
| **The 5 lean stages** (Inquiry → Complete) | **Opportunity** in a "Charters" pipeline | Drag-and-drop Kanban, forecasting, stays lean forever |
| **The authoritative Charter record** (captain, vessel, assets, all booleans) | **`custom_objects.charter`** | Relational, holds files, never bloats the pipeline |
| **Captain directory** (single source of truth) | **`custom_objects.captain`** + denormalized fields on the Charter | Prevents SMS/calendar mismatch |
| **Contact** | native **Contact** | Owns many Charters |

```
Contact (1) ──< Charter (many)
                  │  1───1  Captain      (relation + denormalized SSOT fields)
                  │  1───1  Vessel        (field now; object-ready for a fleet)
                  │  1───1  Opportunity   (the 5-stage pipeline card)
                  └── Assets: Waiver · Bareboat Agreement · Square Invoice · Guest Form
```

**Why the pipeline stays lean:** every "is the waiver signed / captain assigned / paid"
question is answered by a boolean *field on the Charter object*, never by adding a
pipeline stage. The pipeline only ever moves on the 5 milestones.

---

## 1. Custom Object Schema (JSON)

### 1a. Charter object definition

```json
{
  "locationId": "{{GHL_LOCATION_ID}}",
  "object": {
    "key": "custom_objects.charter",
    "labels": { "singular": "Charter", "plural": "Charters" },
    "description": "Authoritative charter booking record. Owns captain, vessel, assets, payments and all status flags.",
    "primaryDisplayPropertyDetails": {
      "key": "custom_objects.charter.charter_name",
      "name": "Charter Name",
      "dataType": "TEXT"
    }
  }
}
```

### 1b. Charter custom fields

> GHL has **no native boolean** — the community-standard workaround is a
> `SINGLE_OPTIONS` dropdown of `Yes`/`No`, which workflow if/else filters read cleanly.
> `MONETORY` is GHL's (misspelled) money type. Field keys are always
> `custom_objects.charter.<key>`.

```json
{
  "objectKey": "custom_objects.charter",
  "locationId": "{{GHL_LOCATION_ID}}",
  "fields": [
    { "fieldKey": "charter_name",            "name": "Charter Name",             "dataType": "TEXT",           "group": "Identity" },
    { "fieldKey": "charter_ref",             "name": "Charter Reference",        "dataType": "TEXT",           "group": "Identity", "description": "Unique id minted by the Next.js app, e.g. TFC-2026-0815-01" },
    { "fieldKey": "booking_contact_id",      "name": "Booking Contact ID",       "dataType": "TEXT",           "group": "Identity", "description": "GHL contact id of the booker (relational key for webhooks)" },
    { "fieldKey": "linked_opportunity_id",   "name": "Linked Opportunity ID",    "dataType": "TEXT",           "group": "Identity", "description": "Id of the 5-stage pipeline card" },

    { "fieldKey": "assigned_captain_id",     "name": "Assigned Captain ID",      "dataType": "TEXT",           "group": "Captain", "description": "⭐ SINGLE SOURCE OF TRUTH. Matches captain slug from src/data/captains.ts" },
    { "fieldKey": "assigned_captain_name",   "name": "Assigned Captain Name",    "dataType": "TEXT",           "group": "Captain", "description": "Denormalized from Captain object at assignment — used by SMS/calendar merge fields" },
    { "fieldKey": "assigned_captain_phone",  "name": "Assigned Captain Phone",   "dataType": "PHONE",          "group": "Captain", "description": "Denormalized — internal notify only, never shown to guest" },
    { "fieldKey": "captain_assigned",        "name": "Captain Assigned",         "dataType": "SINGLE_OPTIONS", "group": "Captain", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },

    { "fieldKey": "vessel_id",               "name": "Vessel",                   "dataType": "SINGLE_OPTIONS", "group": "Vessel", "options": [ { "key": "topfun-50", "label": "Top Fun (50ft Performance Yacht)" } ], "description": "Default topfun-50; object-ready for future fleet" },
    { "fieldKey": "vessel_name",             "name": "Vessel Name",              "dataType": "TEXT",           "group": "Vessel", "description": "Default: Top Fun (50ft Performance Yacht)" },

    { "fieldKey": "charter_date",            "name": "Charter Date",             "dataType": "DATE",           "group": "Booking" },
    { "fieldKey": "charter_start_time",      "name": "Start Time (HH:MM)",       "dataType": "TEXT",           "group": "Booking", "description": "GHL DATE has no time component — store 24h HH:MM" },
    { "fieldKey": "duration_hours",          "name": "Duration (hours)",         "dataType": "NUMERICAL",      "group": "Booking", "description": "4, 6 or 8 per pricing.ts" },
    { "fieldKey": "guest_count",             "name": "Guest Count",              "dataType": "NUMERICAL",      "group": "Booking" },
    { "fieldKey": "charter_type",            "name": "Charter Type",             "dataType": "SINGLE_OPTIONS", "group": "Booking", "options": [ { "key": "captained_1_6", "label": "Captained (1–6)" }, { "key": "bareboat_7_13", "label": "Bareboat (7–13)" } ] },
    { "fieldKey": "pickup_location",         "name": "Pickup Location",          "dataType": "TEXT",           "group": "Booking", "description": "Default: Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton FL 34209" },
    { "fieldKey": "pipeline_stage_mirror",   "name": "Pipeline Stage (mirror)",  "dataType": "SINGLE_OPTIONS", "group": "Booking", "options": [ { "key": "inquiry", "label": "Inquiry" }, { "key": "quoted", "label": "Quoted" }, { "key": "deposit_paid_confirmed", "label": "Deposit Paid / Confirmed" }, { "key": "ready_for_charter", "label": "Ready for Charter" }, { "key": "complete", "label": "Complete" } ], "description": "Read-only mirror of the Opportunity stage for object-level reporting" },

    { "fieldKey": "forms_sent",              "name": "Forms Sent",               "dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },
    { "fieldKey": "forms_completed",         "name": "Forms Completed",          "dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },
    { "fieldKey": "waiver_signed",           "name": "Waiver Signed",            "dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },
    { "fieldKey": "bareboat_signed",         "name": "Bareboat Agreement Signed","dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ], "description": "Applies ONLY to charter_type = bareboat_7_13" },
    { "fieldKey": "final_payment_received",  "name": "Final Payment Received",   "dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },
    { "fieldKey": "review_requested",        "name": "Review Requested",         "dataType": "SINGLE_OPTIONS", "group": "Status", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] },

    { "fieldKey": "deposit_amount",          "name": "Deposit Amount",           "dataType": "MONETORY",       "group": "Payments" },
    { "fieldKey": "deposit_paid_at",         "name": "Deposit Paid At",          "dataType": "DATE",           "group": "Payments" },
    { "fieldKey": "total_amount",            "name": "Total Amount",             "dataType": "MONETORY",       "group": "Payments" },
    { "fieldKey": "balance_due",             "name": "Balance Due",              "dataType": "MONETORY",       "group": "Payments" },
    { "fieldKey": "square_payment_id",       "name": "Square Payment ID",        "dataType": "TEXT",           "group": "Payments" },
    { "fieldKey": "square_order_id",         "name": "Square Order ID",          "dataType": "TEXT",           "group": "Payments" },
    { "fieldKey": "square_invoice_url",      "name": "Square Invoice URL",       "dataType": "TEXT",           "group": "Assets" },
    { "fieldKey": "square_receipt_url",      "name": "Square Receipt URL",       "dataType": "TEXT",           "group": "Assets" },
    { "fieldKey": "waiver_document_url",     "name": "Waiver Document URL",      "dataType": "TEXT",           "group": "Assets" },
    { "fieldKey": "bareboat_agreement_url",  "name": "Bareboat Agreement URL",   "dataType": "TEXT",           "group": "Assets" },
    { "fieldKey": "guest_form_url",          "name": "Guest Form URL",           "dataType": "TEXT",           "group": "Assets" }
  ]
}
```

### 1c. Captain object (single source of truth directory)

```json
{
  "object": {
    "key": "custom_objects.captain",
    "labels": { "singular": "Captain", "plural": "Captains" },
    "primaryDisplayPropertyDetails": { "key": "custom_objects.captain.captain_name", "name": "Captain Name", "dataType": "TEXT" }
  },
  "fields": [
    { "fieldKey": "captain_slug",        "name": "Captain Slug",   "dataType": "TEXT",  "description": "Matches src/data/captains.ts — this IS assigned_captain_id" },
    { "fieldKey": "captain_name",        "name": "Captain Name",   "dataType": "TEXT" },
    { "fieldKey": "captain_phone",       "name": "Captain Phone",  "dataType": "PHONE", "description": "Internal only — never published" },
    { "fieldKey": "captain_role",        "name": "Role",           "dataType": "TEXT" },
    { "fieldKey": "captain_credentials", "name": "Credentials",    "dataType": "LARGE_TEXT" },
    { "fieldKey": "captain_active",      "name": "Active",         "dataType": "SINGLE_OPTIONS", "options": [ { "key": "yes", "label": "Yes" }, { "key": "no", "label": "No" } ] }
  ],
  "seedRecords": [
    { "captain_slug": "bob-arnett",           "captain_name": "Bob Arnett",              "captain_active": "yes" },
    { "captain_slug": "wyatt-tomlinson",      "captain_name": "Wyatt Tomlinson",         "captain_active": "yes" },
    { "captain_slug": "rick-schendel",        "captain_name": "Rick Schendel",           "captain_active": "yes" },
    { "captain_slug": "tom-korinek",          "captain_name": "Tom Korinek",             "captain_active": "yes" },
    { "captain_slug": "isaac-hughes",         "captain_name": "Isaac Hughes",            "captain_active": "yes" },
    { "captain_slug": "rickey-bianculli",     "captain_name": "Rickey Bianculli",        "captain_active": "yes" },
    { "captain_slug": "christopher-driggers",  "captain_name": "Christopher Ian Driggers","captain_active": "yes" }
  ]
}
```

### 1d. Associations (relationships)

```json
{
  "associations": [
    {
      "key": "contact_charters",
      "firstObjectKey": "contact",                 "firstObjectLabel": "Booked by",
      "secondObjectKey": "custom_objects.charter", "secondObjectLabel": "Charters",
      "cardinality": "ONE_TO_MANY"
    },
    {
      "key": "charter_captain",
      "firstObjectKey": "custom_objects.charter", "firstObjectLabel": "Charter",
      "secondObjectKey": "custom_objects.captain","secondObjectLabel": "Assigned Captain",
      "cardinality": "MANY_TO_ONE"
    }
  ]
}
```

> **Why denormalize the captain too?** GHL workflow **merge fields cannot reliably
> traverse an object→object relation** into an SMS/calendar template. So the relation is
> the source of record, but `assigned_captain_name` / `assigned_captain_phone` are
> **copied onto the Charter at assignment time** (WF-3 below) so every template can read
> `{{custom_object.charter.assigned_captain_name}}` with zero traversal. That is the
> mechanism that enforces the single-source-of-truth rule in practice.

---

## 2. Webhook & Automation Data Payload (JSON)

### 2a. Next.js → n8n / GHL inbound webhook (on Square deposit success)

Fired server-side from your Next.js Square payment handler. Endpoint URL belongs in
[`src/config/ghl.ts`](src/config/ghl.ts) as e.g. `GHL.webhooks.charterDepositPaid`.

```json
{
  "event": "charter.deposit_paid",
  "version": "1.0",
  "source": "topfuncharters-nextjs",
  "idempotencyKey": "sq_evt_9f2c...e41",
  "sentAt": "2026-07-30T15:04:05Z",
  "locationId": "{{GHL_LOCATION_ID}}",

  "contact": {
    "externalId": "web_lead_5521",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+19415550142",
    "tags": ["charter-lead", "deposit-paid"]
  },

  "charter": {
    "charterRef": "TFC-2026-0815-01",
    "charterName": "Smith — 2026-08-15 — 6hr (7–13)",
    "charterDate": "2026-08-15",
    "startTime": "10:00",
    "durationHours": 6,
    "guestCount": 10,
    "charterType": "bareboat_7_13",
    "vesselId": "topfun-50",
    "vesselName": "Top Fun (50ft Performance Yacht)",
    "pickupLocation": "Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton FL 34209",
    "assignedCaptainId": null,
    "pricing": {
      "currency": "USD",
      "totalAmount": 1890.00,
      "depositAmount": 500.00,
      "balanceDue": 1390.00
    }
  },

  "payment": {
    "processor": "square",
    "type": "deposit",
    "status": "COMPLETED",
    "paymentId": "sq_pay_A1b2C3",
    "orderId": "sq_ord_Z9y8X7",
    "invoiceUrl": "https://squareup.com/pay/inv_123",
    "receiptUrl": "https://squareup.com/receipt/preview/xyz",
    "amount": 500.00,
    "currency": "USD",
    "paidAt": "2026-07-30T15:04:03Z"
  },

  "routing": {
    "pipelineId": "{{CHARTERS_PIPELINE_ID}}",
    "targetStage": "deposit_paid_confirmed",
    "assetObjectKey": "custom_objects.charter"
  }
}
```

### 2b. Resulting GHL API call — upsert the Charter record (what n8n/GHL does with 2a)

```json
{
  "method": "POST",
  "path": "/objects/custom_objects.charter/records/upsert",
  "body": {
    "locationId": "{{GHL_LOCATION_ID}}",
    "matchKey": "charter_ref",
    "properties": {
      "charter_name": "Smith — 2026-08-15 — 6hr (7–13)",
      "charter_ref": "TFC-2026-0815-01",
      "booking_contact_id": "{{RESOLVED_CONTACT_ID}}",
      "charter_date": "2026-08-15",
      "charter_start_time": "10:00",
      "duration_hours": 6,
      "guest_count": 10,
      "charter_type": "bareboat_7_13",
      "vessel_id": "topfun-50",
      "vessel_name": "Top Fun (50ft Performance Yacht)",
      "pickup_location": "Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton FL 34209",
      "pipeline_stage_mirror": "deposit_paid_confirmed",
      "deposit_amount": 500.00,
      "deposit_paid_at": "2026-07-30",
      "total_amount": 1890.00,
      "balance_due": 1390.00,
      "square_payment_id": "sq_pay_A1b2C3",
      "square_order_id": "sq_ord_Z9y8X7",
      "square_receipt_url": "https://squareup.com/receipt/preview/xyz",
      "captain_assigned": "no",
      "forms_sent": "no",
      "forms_completed": "no",
      "waiver_signed": "no",
      "bareboat_signed": "no",
      "final_payment_received": "no",
      "review_requested": "no"
    }
  }
}
```

Then two follow-up calls: **associate** the record to the contact
(`POST /associations/relations` with the `contact_charters` association id) and
**move the Opportunity** to the `deposit_paid_confirmed` stage.

> **Idempotency:** upsert on `matchKey: charter_ref` means a retried Square webhook
> updates the same Charter instead of creating a duplicate. Have Next.js mint `charterRef`
> once, before the payment, so it survives retries.

---

## 3. Field Mapping & Relational Blueprint (GHL UI)

1. **Pipeline (Opportunities → Pipelines → New).** Name it `Charters`. Create exactly
   five stages in order: `Inquiry`, `Quoted`, `Deposit Paid / Confirmed`,
   `Ready for Charter`, `Complete`. Nothing else ever goes here.
2. **Charter object (Settings → Custom Objects → Add).** Key `charter` (GHL prefixes it
   to `custom_objects.charter`). Set primary field **Charter Name**. Add every field from
   §1b; use the `group` column as **field folders** (Identity / Captain / Vessel /
   Booking / Status / Payments / Assets) so the record view stays legible.
3. **Boolean fields.** For each Yes/No field, create a `SINGLE_OPTIONS` (dropdown) with
   options `Yes` and `No`, default `No`. (Do **not** use the multi-select Checkbox type —
   if/else filters are cleaner against single-select.)
4. **Captain object.** Create `custom_objects.captain` per §1c and add one record per
   captain, setting `captain_slug` to the exact slug from
   [`src/data/captains.ts`](src/data/captains.ts). Add each captain's real mobile to
   `captain_phone` (internal only — never surfaced on the site).
5. **Associations (Settings → Objects → Associations).** Create `contact_charters`
   (Contact → Charters, one-to-many) and `charter_captain` (Charter → Captain,
   many-to-one).
6. **Custom Values (Settings → Custom Values)** for static merge tokens so SMS/email
   templates stay DRY and match `src/config/site.ts`:
   - `marina_name` = `Safe Harbor Pier 77 Marina`
   - `marina_address` = `12312 Manatee Ave W, Bradenton, FL 34209`
   - `main_line` = `(941) 241-4077`
   - `support_email` = `support@topfuncharters.com`
   - `review_url` = the Google review link from `SITE.googleReviewUrl`
7. **Inbound webhook.** Create a Workflow with an **Inbound Webhook** trigger (or route
   through n8n). Copy its URL into [`src/config/ghl.ts`](src/config/ghl.ts) under a new
   `GHL.webhooks` block — never inline it. Point the Next.js Square handler at it.
8. **Captain merge tokens.** In any template on a Charter-triggered workflow, reference
   `{{custom_object.charter.assigned_captain_name}}` and
   `{{custom_object.charter.assigned_captain_phone}}` — the denormalized fields, never the
   related Captain record directly.

---

## 4. GHL Workflow Logic Blueprint

Each workflow is triggered **on the Charter object** (or a form/webhook) and only writes
**independent fields** — the pipeline moves on the 5 milestones only.

| # | Workflow | Trigger | Actions |
|---|---|---|---|
| **WF-1** | **Deposit → Create Charter** | Inbound Webhook `charter.deposit_paid` | Upsert Contact → Upsert Charter (§2b) → Associate to Contact → Create Opportunity in `Charters` → move to **Deposit Paid / Confirmed** → set `forms_sent=No` → internal Slack/SMS notify |
| **WF-2** | **Send Forms** | Charter: `pipeline_stage_mirror` becomes `deposit_paid_confirmed` | Email/SMS the guest: **Waiver** (`forms.waiver`) always; **Bareboat** (`forms.thirteenPersonWithCaptain`) *only if* `charter_type = bareboat_7_13`; **Guest form** → set `forms_sent=Yes` |
| **WF-3** | **Captain Assignment Sync** ⭐ | Charter: `assigned_captain_id` changed | Look up Captain object by matching `captain_slug` → copy `captain_name`→`assigned_captain_name`, `captain_phone`→`assigned_captain_phone` → set `captain_assigned=Yes` → SMS the captain using the **denormalized** fields → create/update the calendar event with captain as attendee |
| **WF-4** | **Waiver Received** | Form submitted: `Ax5emYN27Ij6Q6buJBRq` | Match to Charter (by contact + open charter / `charter_ref`) → set `waiver_signed=Yes`, `waiver_document_url` → trigger WF-6 |
| **WF-5** | **Bareboat Received** | Bareboat form submitted | Set `bareboat_signed=Yes`, `bareboat_agreement_url` → trigger WF-6 |
| **WF-6** | **Forms-Complete Rollup** | Charter: `waiver_signed` / `bareboat_signed` / guest form changed | If `waiver_signed=Yes` **AND** (`charter_type=captained_1_6` **OR** `bareboat_signed=Yes`) **AND** guest form done → `forms_completed=Yes`. If also `final_payment_received=Yes` → move Opportunity to **Ready for Charter** + mirror stage |
| **WF-7** | **Final Payment** | Webhook `charter.final_payment_paid` (Square) | Set `final_payment_received=Yes`, `balance_due=0`, `square_invoice_url` → trigger WF-6 |
| **WF-8** | **Charter Complete → Review** | `charter_date` is in the past **OR** Opportunity moved to Complete | Move Opportunity to **Complete** + mirror → wait 1 day → send review request (`review_url`) → set `review_requested=Yes` |

**Guardrails**
- WF-3 is the *only* writer of `assigned_captain_name` / `assigned_captain_phone`. No
  template or other workflow may set them — that's what prevents mismatch.
- WF-6 is the single place `forms_completed` and the **Ready for Charter** promotion are
  decided, so the rule lives in exactly one workflow.
- `bareboat_signed` is ignored by WF-6 when `charter_type = captained_1_6` (1–6 guests
  need only the waiver).

---

## Appendix — recommended `src/config/ghl.ts` additions

To keep every GHL URL/id in one place (per the project rule), extend the config rather
than inlining anywhere:

```ts
export const GHL = {
  // ...existing bookingCalendar + forms...
  webhooks: {
    /** Next.js → GHL/n8n on Square deposit success (WF-1 trigger). */
    charterDepositPaid: "{{INBOUND_WEBHOOK_URL}}",
    /** Next.js → GHL/n8n on Square final-balance payment (WF-7 trigger). */
    charterFinalPaid: "{{INBOUND_WEBHOOK_URL_FINAL}}",
  },
  objects: {
    charter: "custom_objects.charter",
    captain: "custom_objects.captain",
  },
  pipeline: {
    chartersId: "{{CHARTERS_PIPELINE_ID}}",
    stages: {
      inquiry: "{{STAGE_INQUIRY}}",
      quoted: "{{STAGE_QUOTED}}",
      depositPaidConfirmed: "{{STAGE_CONFIRMED}}",
      readyForCharter: "{{STAGE_READY}}",
      complete: "{{STAGE_COMPLETE}}",
    },
  },
} as const;
```
