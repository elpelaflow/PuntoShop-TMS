---
title: "Ledger"
url: https://fleetbase.io/docs/ledger
module: ledger
---

# Ledger

**Ledger**
is the accounting and invoicing extension for Fleetbase. It provides a complete financial management layer — double-entry bookkeeping, automated invoicing, digital wallets, payment gateway processing, and standard financial reporting — integrated directly with Fleet-Ops.

![Ledger dashboard — KPI cards, revenue trend chart, recent journal entries](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-dashboard.98b061ae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## What Ledger Does

| Capability | What it covers |
| --- | --- |
| **Chart of Accounts** | Define asset, liability, equity, revenue, and expense accounts |
| **Double-Entry Bookkeeping** | Every transaction creates journal entries across two accounts |
| **Invoicing** | Create, send, and collect payment on invoices |
| **Invoice Templates** | Customize the look of your invoices with company branding |
| **Digital Wallets** | Track balances for drivers, customers, your company, and individual users |
| **Payment Gateways** | GNU Taler, Stripe, Cash, and QPay - purchases, refunds, wallet payment flows, and webhook idempotency |
| **Transactions** | Immutable audit trail for every wallet movement |
| **Financial Reports** | Balance sheet, income statement, cash flow, trial balance, AR aging, wallet summary |
| **Fleet-Ops Integration** | Auto-create draft invoices when a `PurchaseRate` is added to an order |
| **Settings** | Configure invoice prefix, payment terms, default gateway, default template, fiscal year, and base currency |

## Key Concepts

* **Account**
  — a named ledger account with a type (asset, liability, equity, revenue, or expense), an alphanumeric
  `code`
  (e.g.
  `CASH-DEFAULT`
  ), and a computed balance
* **Journal Entry**
  — a double-entry record that debits one account and credits another. Numbered
  `JE-00001`
  (5-digit zero-padded). Most are auto-created
* **Invoice**
  — a formal request for payment with line items, tax, and due date. Numbered
  `INV-`
  plus a 6-digit random integer (e.g.
  `INV-004821`
  ). Lifecycle: draft → sent → viewed → partial / paid / overdue / cancelled / refunded / void
* **Wallet**
  — a digital balance tied to a driver, customer, company, or user. Supports
  `credit`
  ,
  `topup`
  ,
  `transfer`
  ,
  `payout`
  ,
  `freeze`
  ,
  `unfreeze`
  , and
  `recalculate`
  operations
* **Transaction**
  — an immutable record of money moving relative to a wallet
* **Gateway**
  — a payment processor (GNU Taler, Stripe, Cash, or QPay) with encrypted credentials, sandbox/live environment, and webhook idempotency via
  `GatewayTransaction`

## Getting Started

Get up and running

Set up your chart of accounts, configure a gateway, and create your first invoice.

[Quickstart →](https://fleetbase.io/docs/ledger/getting-started/quickstart)

Understand the basics

Learn double-entry bookkeeping, accounts, wallets, and the invoice lifecycle.

[Core Concepts →](https://fleetbase.io/docs/ledger/getting-started/core-concepts)

Bill your customers

Create and send invoices, record payments, and export PDFs.

[Invoices →](https://fleetbase.io/docs/ledger/billing/invoices)

Ledger comes pre-installed with every Fleetbase instance. Navigate to
**Ledger**
in the console sidebar to begin. Default chart of accounts is provisioned automatically when your company is created.
