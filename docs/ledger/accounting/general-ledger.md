---
title: "General Ledger"
url: https://fleetbase.io/docs/ledger/accounting/general-ledger
module: ledger
---

# General Ledger

View the master record of all journal entries — a complete chronological history of every financial transaction.

# General Ledger

The
**General Ledger**
is the master record of all journal entries across your organization. It provides a complete, chronological view of every financial event — debits, credits, amounts, and running balances.

Navigate to
**Ledger → Accounting → General Ledger**
.

![General Ledger — every account with its code, type badge, entry count and balance, expandable to its entries](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-general-ledger.55e764fe.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Columns

The general ledger view shows:

| Column | Description |
| --- | --- |
| **Date** | Date of the journal entry |
| **Ref #** | Human-readable reference (invoice number, order ID, etc.) |
| **Description** | What the entry records |
| **Debit** | Amount on the debit side |
| **Credit** | Amount on the credit side |
| **Balance** | Running balance |

## Filters

Use the filters at the top of the page to narrow the view:

* **Date range**
  — start and end date
* **Type**
  — filter by
  **account type**
  (asset, liability, equity, revenue, expense)

## Account-Level Ledger

To view the ledger for a single account with a running balance:

Navigate to
**Ledger → Accounting → Accounts**
.

Click an account row.

The account detail panel shows the account's journal history with debit, credit, and running balance.

This view is useful for reconciling specific accounts (e.g., Accounts Receivable) or producing account statements for audits.

## System vs. Manual Entries

* **System entries**
  (
  `is_system_entry: true`
  ) are written automatically by Ledger in response to invoice payments, gateway transactions, wallet operations, and freight order settlements.
* **Manual entries**
  are created by operators via
  **Ledger → Accounting → Journal → New Manual Entry**
  .

Both appear in the general ledger. There is no built-in reversal/voiding workflow — to undo a system entry, post a manual reversing entry against the same accounts.
