---
title: "Customers"
url: https://fleetbase.io/docs/api/fleetbase/customers
module: api
---

# Customers

Customer endpoints provide email/password + verification-code authentication and customer-scoped order management for FleetOps. All flows authenticate to a single Fleetbase company resolved from your `flb\_live\_…` API credential; per-customer requests additionally require the `Customer-Token` returned by signup/login.

* [The Customer object](#the-customer-object)
* [Request Customer Creation Code

  POST
  `/v1/customers/request-creation-code`](#request-customer-creation-code)
* [Create a Customer

  POST
  `/v1/customers`](#create-a-customer)
* [Login Customer

  POST
  `/v1/customers/login`](#login-customer)
* [Request Customer Login SMS

  POST
  `/v1/customers/login-with-sms`](#request-customer-login-sms)
* [Verify Customer Login Code

  POST
  `/v1/customers/verify-code`](#verify-customer-login-code)
* [Forgot Customer Password

  POST
  `/v1/customers/forgot-password`](#forgot-customer-password)
* [Reset Customer Password

  POST
  `/v1/customers/reset-password`](#reset-customer-password)
* [Retrieve Authenticated Customer

  GET
  `/v1/customers/me`](#retrieve-authenticated-customer)
* [Update Authenticated Customer

  PUT
  `/v1/customers/me`](#update-authenticated-customer)
* [Logout Customer

  POST
  `/v1/customers/logout`](#logout-customer)
* [Logout All Customer Sessions

  POST
  `/v1/customers/logout-all`](#logout-all-customer-sessions)
* [Register Customer Device

  POST
  `/v1/customers/register-device`](#register-customer-device)
* [List Customer Places

  GET
  `/v1/customers/places`](#list-customer-places)
* [List Customer Orders

  GET
  `/v1/customers/orders`](#list-customer-orders)
* [Create a Customer Order

  POST
  `/v1/customers/orders`](#create-a-customer-order)
* [Retrieve a Customer Order

  GET
  `/v1/customers/orders`](#retrieve-a-customer-order)

## The Customer object

A customer is a Fleet-Ops contact of `type=customer` that is linked to a user for authentication. Returned by all `/v1/customers/...` endpoints. The `token` field is only present on responses to signup, login, and verify-code; persist it client-side and send it on subsequent requests via the `Customer-Token` header.

Attributes

`id`

string

optional

Public customer identifier. Prefixed
`customer_`
on the public API.

`internal_id`

string

optional

Optional internal identifier.

`name`

string

optional

Customer display name.

`title`

string

optional

Optional title.

`email`

string

optional

Customer email address.

`phone`

string

optional

Customer phone number (E.164 format).

`photo_url`

string

optional

Customer photo URL.

`address`

string

optional

Default address derived from the linked place, when one is set.

`addresses`

array of objects

optional

Saved Place addresses, when the
`places`
relation is loaded.

`token`

string

optional

Sanctum personal-access-token returned by signup/login/verify-code. Send back on authenticated requests as the
`Customer-Token`
header.

`orders_count`

integer

optional

Number of non-deleted orders linked to this customer.

`company`

object

optional

Public-safe projection of the customer's company. Contains the company's public id, name, resolved transaction currency (with fallback through
`companies.currency`
→ ledger
`base_currency`
→
`"USD"`
), country, and phone. Useful for portals that need to render currency labels and contact info without making a separate request.

`meta`

object

optional

Free-form metadata stored on the contact's
`meta`
column. The API does not write to this field — it is client-owned.

`slug`

string

optional

URL-friendly slug.

`created_at`

timestamp

optional

When the customer was created.

`updated_at`

timestamp

optional

When the customer was last updated.

The
Customer
object

```
{
  "id": "customer_A1b2C3d4E5",
  "internal_id": null,
  "name": "Jane Customer",
  "title": null,
  "email": "jane@example.com",
  "phone": "+15555550111",
  "photo_url": null,
  "address": null,
  "addresses": [],
  "token": "1|f4Wd3jY9aB...",
  "orders_count": 0,
  "company": {
    "id": "company_6zV1KqN9pR",
    "name": "ACME Logistics",
    "currency": "USD",
    "country": "US",
    "phone": "+1-555-0100"
  },
  "meta": {},
  "slug": "jane-customer",
  "created_at": "2026-05-21T10:00:00.000000Z",
  "updated_at": "2026-05-21T10:00:00.000000Z"
}
```

POST
`/v1/customers/request-creation-code`

## [Request Customer Creation Code](#request-customer-creation-code)

Sends an email or SMS verification code to start a customer signup. Required before calling
`Create a Customer`
. Optionally include
`name`
and
`phone`
so the verification email greets the customer by name and the pending user row is pre-seeded with real values.

Body parameters

`identity`

string

required

Customer email address or phone number to send the verification code to.

`mode`

string

required

Channel to send the code through. One of
`email`
or
`sms`
.

`name`

string

optional

Customer display name. When supplied, the verification email greets the customer by name and the pending user record is seeded with this value (avoids a "Pending Customer" placeholder).

`phone`

string

optional

Phone number (E.164 recommended). Pre-seeded on the pending user record alongside the email identity.

POST
`/v1/customers/request-creation-code`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/request-creation-code \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "mode": "email",
  "name": "{{customer_name}}",
  "phone": "{{customer_phone}}"
}'
```

POST
`/v1/customers`

## [Create a Customer](#create-a-customer)

Creates a customer account (Contact + linked User) after verifying the code from
`Request Customer Creation Code`
. Returns the customer with a Sanctum
`token`
— persist this client-side and send it back as the
`Customer-Token`
header on authenticated requests.

Body parameters

`identity`

string

required

Email or phone the verification code was requested for.

`code`

string

required

Verification code received via email or SMS.

`name`

string

required

Customer display name.

`password`

string

required

Account password (minimum 8 characters).

`email`

string

optional

Email address, if different from the identity. Must be unique within the company.

`phone`

string

optional

Phone number (E.164 recommended). Must be unique within the company.

`title`

string

optional

Optional title.

`photo`

string

optional

Either a
`file_…`
public id or a base64-encoded data URI.

`place`

string|object

optional

Optional default Place for the customer. Either the public\_id of an existing Place in this company (
`place_…`
), or an inline Place object using the standard Place fields:
`name`
,
`street1`
,
`street2`
,
`city`
,
`province`
,
`postal_code`
,
`neighborhood`
,
`district`
,
`building`
,
`country`
,
`phone`
,
`meta`
. When supplied, the controller creates the Place with the new customer as
`owner_uuid`
and sets it as
`place_uuid`
on the contact.

`meta`

object

optional

Free-form metadata stored on the contact's
`meta`
column.

POST
`/v1/customers`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "code": "{{verification_code}}",
  "name": "Jane Customer",
  "password": "{{customer_password}}",
  "phone": "{{$randomPhoneNumber}}",
  "place": {
    "name": "Home",
    "street1": "123 Main Street",
    "city": "Kingston",
    "province": "Kingston",
    "postal_code": "00000",
    "country": "JM"
  }
}'
```

POST
`/v1/customers/login`

## [Login Customer](#login-customer)

Authenticates a customer with email/phone + password. Returns the customer with a Sanctum
`token`
to use as
`Customer-Token`
.

Body parameters

`identity`

string

required

Customer email or phone number.

`password`

string

required

Customer account password.

POST
`/v1/customers/login`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/login \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "password": "{{customer_password}}"
}'
```

POST
`/v1/customers/login-with-sms`

## [Request Customer Login SMS](#request-customer-login-sms)

Starts SMS-based passwordless login by sending a verification code to the customer's phone. Falls back to email if SMS delivery fails and an email is on file.

Body parameters

`phone`

string

required

Customer phone number (E.164 recommended).
`identity`
is also accepted.

POST
`/v1/customers/login-with-sms`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/login-with-sms \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "phone": "{{customer_phone}}"
}'
```

POST
`/v1/customers/verify-code`

## [Verify Customer Login Code](#verify-customer-login-code)

Verifies the SMS/email code from
`Request Customer Login SMS`
and returns the customer with a Sanctum
`token`
. When
`for`
is
`fleetops_create_customer`
this proxies to
`Create a Customer`
.

Body parameters

`identity`

string

required

Email or phone the code was sent to.

`code`

string

required

Verification code received via SMS or email.

`for`

string

optional

Verification slug. Defaults to
`fleetops_customer_login`
. Set to
`fleetops_create_customer`
to complete a signup flow that started with
`Request Customer Creation Code`
.

POST
`/v1/customers/verify-code`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/verify-code \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "code": "{{verification_code}}",
  "for": "fleetops_customer_login"
}'
```

POST
`/v1/customers/forgot-password`

## [Forgot Customer Password](#forgot-customer-password)

Sends a password-reset verification code to the customer's email or phone. Always returns
`{ status: ok }`
regardless of whether the identity matches an account (prevents enumeration).

Body parameters

`identity`

string

required

Customer email or phone number to send the reset code to.

POST
`/v1/customers/forgot-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/forgot-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}"
}'
```

POST
`/v1/customers/reset-password`

## [Reset Customer Password](#reset-customer-password)

Verifies the reset code from
`Forgot Customer Password`
and sets a new password. All existing tokens for the customer's user are revoked on success.

Body parameters

`identity`

string

required

Email or phone the reset code was sent to.

`code`

string

required

Reset verification code.

`password`

string

required

New password (minimum 8 characters).

POST
`/v1/customers/reset-password`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/reset-password \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "identity": "{{customer_identity}}",
  "code": "{{verification_code}}",
  "password": "{{customer_password}}"
}'
```

GET
`/v1/customers/me`

## [Retrieve Authenticated Customer](#retrieve-authenticated-customer)

Returns the profile of the customer identified by the
`Customer-Token`
header.

GET
`/v1/customers/me`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/me \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

PUT
`/v1/customers/me`

## [Update Authenticated Customer](#update-authenticated-customer)

Updates the authenticated customer's profile. Changes to
`name`
,
`email`
, and
`phone`
are mirrored onto the linked user so subsequent logins work.

Body parameters

`name`

string

optional

New display name.

`title`

string

optional

New title.

`email`

string

optional

New email. Mirrored to the linked user.

`phone`

string

optional

New phone (E.164 recommended). Mirrored to the linked user.

`photo`

string

optional

Either a
`file_…`
public id, a base64-encoded data URI, or the literal string
`REMOVE`
to clear the photo.

`meta`

object

optional

Free-form metadata patch.

PUT
`/v1/customers/me`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/customers/me \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "name": "{{customer_name}}",
  "phone": "{{customer_phone}}",
  "email": "{{customer_email}}"
}'
```

POST
`/v1/customers/logout`

## [Logout Customer](#logout-customer)

Revokes the Sanctum token used to make this request. The customer's other active sessions are unaffected — use
`Logout All Customer Sessions`
to revoke every token for the linked user.

POST
`/v1/customers/logout`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/logout \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

POST
`/v1/customers/logout-all`

## [Logout All Customer Sessions](#logout-all-customer-sessions)

Revokes every Sanctum token issued to the customer's linked user (sign out everywhere).

POST
`/v1/customers/logout-all`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/logout-all \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

POST
`/v1/customers/register-device`

## [Register Customer Device](#register-customer-device)

Registers a push-notification device token against the authenticated customer's linked user.

Body parameters

`token`

string

required

APNs / FCM device token to register.

`platform`

string

required

Device platform. One of
`ios`
,
`android`
, or
`web`
.
`os`
is accepted as an alias.

POST
`/v1/customers/register-device`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/register-device \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "token": "{{push_token}}",
  "platform": "ios"
}'
```

GET
`/v1/customers/places`

## [List Customer Places](#list-customer-places)

Lists the authenticated customer's saved Places (delivery addresses, etc.).

Query parameters

`limit`

integer

optional

Page size.

`offset`

integer

optional

Page offset.

`query`

string

optional

Free-text search against Place fields.

GET
`/v1/customers/places`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/places \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

GET
`/v1/customers/orders`

## [List Customer Orders](#list-customer-orders)

Lists orders owned by the authenticated customer (scoped to
`orders.customer_uuid`
).

Query parameters

`limit`

integer

optional

Page size.

`offset`

integer

optional

Page offset.

`status`

string

optional

Filter by order status (e.g.
`created`
,
`dispatched`
,
`completed`
).

`query`

string

optional

Free-text search across order fields.

GET
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```

POST
`/v1/customers/orders`

## [Create a Customer Order](#create-a-customer-order)

Creates an Order on behalf of the authenticated customer. Accepts the canonical Fleet-Ops Order create shape — the same fields as
`POST /v1/orders`
would accept from an operator. The customer's
`uuid`
is automatically attached as
`orders.customer_uuid`
; any client-supplied
`customer`
field is ignored.
`status`
is forced to
`created`
(customers cannot self-dispatch). The Order lands in the company resolved from the API credential.

Body parameters

`type`

string

optional

Order config key (e.g.
`transport`
,
`freight`
). When omitted, the company's default OrderConfig is used.

`order_config`

string

optional

Explicit OrderConfig public id, overrides
`type`
.

`scheduled_at`

timestamp

optional

Requested fulfillment timestamp (ISO 8601).

`notes`

string

optional

Free-form notes / special handling instructions.

`internal_id`

string

optional

Optional caller-supplied identifier.

`meta`

object

optional

Free-form metadata stored on the order's
`meta`
column.

`service_quote`

string

optional

Optional ServiceQuote reference (uuid or
`sqte_…`
public\_id) returned by
`GET /v1/service-quotes`
. When supplied, the controller resolves the quote via
`ServiceQuote::resolveFromRequest`
and consumes it via
`$order->purchaseServiceQuote()`
to lock the pricing onto the order's PurchaseRate (same behavior as
`OrderController::create`
).

`payload`

string|object

optional

Either an existing Payload public\_id, or an inline object with
`\{ pickup, dropoff, return, waypoints, entities \}`
. The controller mirrors
`OrderController::create`
's payload-building branch — Place sub-objects accept either a public\_id or the standard Place fillable shape; entities accept the standard Entity fillable shape.

`pickup`

string|object

optional

Accepted only when
`payload`
is not provided. Either an existing Place public\_id or a Place-shaped object (
`name`
,
`street1`
,
`street2`
,
`city`
,
`province`
,
`postal_code`
,
`country`
,
`phone`
,
`meta`
).

`dropoff`

string|object

optional

Same shape as
`pickup`
. Accepted only when
`payload`
is not provided.

`return`

string|object

optional

Same shape as
`pickup`
. Accepted only when
`payload`
is not provided.

`waypoints`

array of strings|objects

optional

Accepted only when
`payload`
is not provided. Each item is either a Place public\_id or a Place-shaped object.

`entities`

array of objects

optional

Accepted only when
`payload`
is not provided. Each entity uses the standard Entity field shape:
`name`
,
`description`
,
`weight`
,
`weight_unit`
,
`declared_value`
,
`currency`
,
`meta`
. The controller delegates to
`Payload::setEntities`
so customer-created orders are indistinguishable from operator-created ones at the data layer.

POST
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}" \
  -d '{
  "type": "transport",
  "scheduled_at": "2026-05-25T10:00:00Z",
  "notes": "Handle with care.",
  "pickup": {
    "name": "Pickup",
    "street1": "4169 N State RD 7",
    "city": "Lauderdale Lakes",
    "province": "FL",
    "postal_code": "33319",
    "country": "US"
  },
  "dropoff": {
    "name": "Dropoff",
    "city": "Kingston",
    "country": "JM"
  },
  "entities": [
    {
      "name": "Wireless Headphones",
      "description": "Electronics",
      "weight": 2.5,
      "weight_unit": "lb",
      "declared_value": 150,
      "currency": "USD"
    }
  ]
}'
```

GET
`/v1/customers/orders`

## [Retrieve a Customer Order](#retrieve-a-customer-order)

Fetches a single order by id, public id, or tracking number. Returns 404 if the order doesn't belong to the authenticated customer.

GET
`/v1/customers/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/customers/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json" \
  -H "Customer-Token: {{customer_token}}"
```
