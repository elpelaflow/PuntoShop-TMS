---
title: "Webhooks"
url: https://fleetbase.io/docs/api/ledger/webhooks
module: api
---

# Webhooks

Webhooks receive payment gateway events and normalize them for Ledger processing. Use this resource to understand the callback shape Fleetbase expects from configured gateway drivers.

* [The Gateway Webhook object](#the-gateway-webhook-object)
* [Handle Gateway Webhook

  POST
  `/webhooks`](#handle-gateway-webhook)

## The Gateway Webhook object

A gateway webhook is an inbound provider event handled by a Ledger payment gateway driver.

Attributes

`message`

string

optional

Processing result returned to the gateway provider.

The
Gateway Webhook
object

```
{
  "message": "Webhook received."
}
```

POST
`/webhooks`

## [Handle Gateway Webhook](#handle-gateway-webhook)

Receives an inbound webhook from a payment gateway driver. Fleetbase verifies the gateway event, records it idempotently, and dispatches normalized payment events.

Body parameters

`company_uuid`

string

optional

Organization UUID used to resolve the active gateway when the gateway driver supports multi-company callbacks.

`id`

string

optional

Gateway event or transaction identifier from the provider payload.

`type`

string

optional

Gateway event type, such as a payment succeeded or payment failed event.

`data`

object

optional

Provider-specific webhook data passed to the gateway driver for parsing.

POST
`/webhooks`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/webhooks \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "company_uuid": "{{company_id}}",
  "id": "{{gateway_event_id}}",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {}
  }
}'
```
