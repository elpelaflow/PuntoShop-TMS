---
title: "Trial Balance"
url: https://fleetbase.io/docs/ledger/reports/trial-balance
module: ledger
---

# Trial Balance

Verify your books — a point-in-time list of all accounts with their total debits and credits confirming they balance.

# Trial Balance

The
**Trial Balance**
lists all accounts in your chart of accounts with their total debit and credit activity as of a specific date. Its primary purpose is to verify that total debits equal total credits — confirming that every journal entry was recorded correctly.

Navigate to
**Ledger → Reports → Trial Balance**
.

![Trial Balance — every account with its debit and credit totals as of the report date, marked Balanced](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-report-trial-balance.33aa4c6b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Report Structure

| Column | Description |
| --- | --- |
| **Account Code** | Account identifier from your chart of accounts |
| **Account Name** | Account name |
| **Type** | Asset, Liability, Equity, Revenue, or Expense |
| **Debit Total** | Sum of all debit entries for this account |
| **Credit Total** | Sum of all credit entries for this account |

At the bottom:

* **Total Debits**
  — sum across all accounts
* **Total Credits**
  — sum across all accounts
* **Balanced**
  indicator — confirms total debits equal total credits

## Using the Trial Balance

A trial balance is typically run:

* **At period end**
  — before generating income statements and balance sheets
* **When discrepancies are suspected**
  — to locate the source of a reporting mismatch
* **For external audit preparation**
  — auditors often request a trial balance as the starting point

## When Debits ≠ Credits

If the
**Balanced**
indicator shows the report is out of balance, there is a recording error. Common causes:

* A manual journal entry was entered with unequal debit and credit amounts
* A transaction was recorded without a corresponding journal entry
* A journal entry was partially reversed via custom code

Use the
[General Ledger](https://fleetbase.io/docs/ledger/accounting/general-ledger)
to filter by specific accounts and dates to identify the discrepancy.

## Setting the Report Date

Navigate to
**Ledger → Reports → Trial Balance**
.

Set the
**As of Date**
— balances reflect all posted entries up to end of that date.

Click
**Generate**
.

The trial balance is
**point-in-time only**
— it shows balances as of the chosen date with no period range. For period-scoped activity, use the
[General Ledger](https://fleetbase.io/docs/ledger/accounting/general-ledger)
with a date range.
