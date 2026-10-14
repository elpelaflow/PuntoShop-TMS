---
title: "Service Quotes"
url: https://fleetbase.io/docs/api/fleetbase/service-quotes
module: api
---

# Service Quotes

Service quotes price a requested movement before an order is created. Use quotes to estimate delivery cost, select a service type or facilitator, and convert accepted pricing into an order.

* [Query Service Quotes

  GET
  `/v1/service-quotes`](#query-service-quotes)
* [Retrieve a Service Quote

  GET
  `/v1/service-quotes/:id`](#retrieve-a-service-quote)

GET
`/v1/service-quotes`

## [Query Service Quotes](#query-service-quotes)

This endpoint is used to get the ServiceRate quotes based on pickup point location and drop off point location, or payload.

For some quotes such as parcel based, the payload must be included for calculation of the payload cost.

Query parameters

`payload`

string

optional

Payload ID or embedded payload object associated with the resource.

GET
`/v1/service-quotes`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-quotes?payload={{payload_id}} \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "<string>",
    "service_rate": "<string>",
    "request_id": "<string>",
    "amount": "<number>",
    "currency": "<string>",
    "created_at": "<string>",
    "updated_at": "<string>"
  }
]
```

GET
`/v1/service-quotes/:id`

## [Retrieve a Service Quote](#retrieve-a-service-quote)

Retrieves a service quote by id.

GET
`/v1/service-quotes/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-quotes/:id \
  -H "Authorization: Bearer flb_live_…"
```
