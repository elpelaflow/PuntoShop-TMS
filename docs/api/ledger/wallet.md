---
title: "Wallet"
url: https://fleetbase.io/docs/api/ledger/wallet
module: api
---

# Wallet

Wallet endpoints expose the authenticated subject's balance and transaction history. Use wallets to retrieve current funds, inspect ledger activity, and initiate top-ups through a configured gateway.

* [The Wallet object](#the-wallet-object)
* [Get Wallet

  GET
  `/v1/wallet`](#get-wallet)
* [Get Wallet Balance

  GET
  `/v1/wallet/balance`](#get-wallet-balance)
* [List Wallet Transactions

  GET
  `/v1/wallet/transactions`](#list-wallet-transactions)
* [Top Up Wallet

  POST
  `/v1/wallet/topup`](#top-up-wallet)

## The Wallet object

A wallet tracks the balance for the authenticated subject. Ledger stores monetary values in the smallest currency unit.

Attributes

`id`

string

optional

Public identifier of the wallet.

`subject_uuid`

string

optional

UUID of the model that owns the wallet.

`subject_type`

string

optional

Model class that owns the wallet.

`subject`

object

optional

Loaded wallet owner, when included.

`name`

string

optional

Wallet name.

`description`

string

optional

Wallet description.

`type`

string

optional

Wallet type.

`balance`

integer

optional

Wallet balance in the smallest currency unit.

`formatted_balance`

string

optional

Human-readable wallet balance.

`currency`

currency

optional

Wallet currency code.

`status`

string

optional

Wallet status.

`is_frozen`

boolean

optional

Whether wallet activity is frozen.

`meta`

object

optional

Arbitrary metadata stored with the wallet.

`created_at`

timestamp

optional

Time the wallet was created.

`updated_at`

timestamp

optional

Time the wallet was last updated.

The
Wallet
object

```
{
  "id": "wallet_2Tn8Qk1",
  "subject_uuid": "9c6292e4-9d7b-4ab4-94a1-3f4a11c1cf25",
  "subject_type": "Fleetbase\\Models\\User",
  "subject": null,
  "name": "Default wallet",
  "description": null,
  "type": "default",
  "balance": 5000,
  "formatted_balance": "50.00",
  "currency": "USD",
  "status": "active",
  "is_frozen": false,
  "meta": {},
  "created_at": "2026-05-07T09:30:00Z",
  "updated_at": "2026-05-07T09:30:00Z"
}
```

GET
`/v1/wallet`

## [Get Wallet](#get-wallet)

Retrieves the authenticated subject's wallet. Pass a currency to choose the wallet currency when Fleetbase needs to provision one.

Query parameters

`currency`

currency

optional

Three-letter currency code for monetary values.

GET
`/v1/wallet`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet?currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/wallet/balance`

## [Get Wallet Balance](#get-wallet-balance)

Returns the authenticated subject's wallet balance. Fleetbase provisions a wallet automatically when one does not already exist.

Query parameters

`currency`

currency

optional

Three-letter currency code for monetary values.

GET
`/v1/wallet/balance`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet/balance?currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/wallet/transactions`

## [List Wallet Transactions](#list-wallet-transactions)

Lists transactions for the authenticated subject's wallet. Results can be filtered by transaction type, direction, status, and creation date range.

Query parameters

`type`

enum

optional

Classification used to group or process the resource. One of
`customer`
,
`vendor`
,
`driver`
.

`direction`

enum

optional

Direction value for this wallet request. One of
`credit`
,
`debit`
.

`status`

enum

optional

Lifecycle status to apply to the resource. One of
`active`
,
`inactive`
.

`date_from`

timestamp

optional

Date from value for this wallet request.

`date_to`

timestamp

optional

Date to value for this wallet request.

`limit`

string

optional

Limit value for this wallet request.

GET
`/v1/wallet/transactions`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/wallet/transactions?type=&direction=&status=&date_from=&date_to=&limit=25 \
  -H "Authorization: Bearer flb_live_…"
```

POST
`/v1/wallet/topup`

## [Top Up Wallet](#top-up-wallet)

Tops up the authenticated subject's wallet through a configured payment gateway. Amounts are submitted in the smallest currency unit.

Body parameters

`gateway`

string

required

Public ID or UUID of the payment gateway to charge.

`amount`

integer

required

Top-up amount in the smallest currency unit. Must be at least 100.

`payment_method_token`

string

optional

Gateway payment method token, such as a Stripe
`pm_`
token.

`customer_id`

string

optional

Customer ID from the payment gateway.

`description`

string

optional

Description stored with the top-up payment. Maximum length is 500 characters.

POST
`/v1/wallet/topup`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/wallet/topup \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "gateway": "{{gateway_id}}",
  "amount": 1000,
  "payment_method_token": "{{payment_method_token}}",
  "customer_id": "{{gateway_customer_id}}",
  "description": "Wallet top-up"
}'
```
