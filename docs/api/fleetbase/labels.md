---
title: "Labels"
url: https://fleetbase.io/docs/api/fleetbase/labels
module: api
---

# Labels

Labels generate printable shipment labels for Fleetbase resources. Use label endpoints to render carrier, order, payload, or entity data into label output for fulfillment workflows.

* [Render Label

  GET
  `/v1/labels/:id`](#render-label)

GET
`/v1/labels/:id`

## [Render Label](#render-label)

Renders a PDF, text, or base64 label for an order, waypoint, or entity id.

Query parameters

`format`

string

optional

Output format for the rendered label.

GET
`/v1/labels/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/labels/:id?format=stream&type=order \
  -H "Authorization: Bearer flb_live_…"
```
