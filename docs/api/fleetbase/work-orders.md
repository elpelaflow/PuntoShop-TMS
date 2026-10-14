---
title: "Work Orders"
url: https://fleetbase.io/docs/api/fleetbase/work-orders
module: api
---

# Work Orders

Work orders coordinate maintenance or operational jobs, including target asset, assignee, priority, checklist, budget, due date, and completion state.

* [The Work Order object](#the-work-order-object)
* [Create a Work Order

  POST
  `/v1/work-orders`](#create-a-work-order)
* [Query Work Orders

  GET
  `/v1/work-orders`](#query-work-orders)
* [Retrieve a Work Order

  GET
  `/v1/work-orders`](#retrieve-a-work-order)
* [Update a Work Order

  PUT
  `/v1/work-orders`](#update-a-work-order)
* [Delete a Work Order

  DELETE
  `/v1/work-orders`](#delete-a-work-order)
* [Send Work Order

  POST
  `/v1/work-orders/send`](#send-work-order)

## The Work Order object

A work order is an operational task wrapper used to assign and track maintenance or other fleet work.

Attributes

`id`

string

optional

Public work order identifier.

`code`

string

optional

Work order code.

`subject`

string

optional

Work order subject.

`category`

string

optional

Work order category.

`status`

string

optional

Work order status.

`priority`

string

optional

Work order priority.

`target`

object

optional

Target resource, when loaded.

`assignee`

object

optional

Assigned vendor or contact, when loaded.

`checklist`

array

optional

Checklist items.

`meta`

object

optional

Additional work order metadata.

The
Work Order
object

```
{
  "id": "work_order_6JpL9Qx2Vz",
  "code": "WO-AB12CD34",
  "subject": "Replace rear tire",
  "category": "corrective_maintenance",
  "status": "open",
  "priority": "high",
  "target_name": "ABC123",
  "assignee_name": "Acme Parts",
  "completion_percentage": 0,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/work-orders`

## [Create a Work Order](#create-a-work-order)

Create a work order.

Body parameters

`subject`

string

optional

Work order subject.

`category`

string

optional

Work order category.

`status`

string

optional

Work order status.

`priority`

string

optional

Priority value.

`target_type`

string

optional

Target resource type such as
`fleet-ops:vehicle`
or
`fleet-ops:equipment`
.

`target`

string

optional

Target resource public ID.

`assignee_type`

string

optional

Assignee resource type such as
`fleet-ops:vendor`
or
`fleet-ops:contact`
.

`assignee`

string

optional

Assignee public ID.

`checklist`

array

optional

Checklist items.

`meta`

object

optional

Additional metadata.

POST
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "subject": "Replace rear tire",
  "category": "corrective_maintenance",
  "status": "open",
  "priority": "high",
  "target_type": "fleet-ops:vehicle",
  "target": "{{vehicle_id}}",
  "assignee_type": "fleet-ops:vendor",
  "assignee": "{{vendor_id}}"
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

GET
`/v1/work-orders`

## [Query Work Orders](#query-work-orders)

Query work orders.

Query parameters

`query`

string

optional

Search query for work orders.

`limit`

integer

optional

Maximum number of records to return.

`page`

integer

optional

Page number for paginated results.

`sort`

string

optional

Sort expression, such as
`-created_at`
.

`category`

string

optional

Filter by work order category.

`status`

string

optional

Filter by work order status.

`priority`

string

optional

Filter by priority.

GET
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

GET
`/v1/work-orders`

## [Retrieve a Work Order](#retrieve-a-work-order)

Retrieve a work order.

GET
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

PUT
`/v1/work-orders`

## [Update a Work Order](#update-a-work-order)

Update a work order.

Body parameters

`subject`

string

optional

Work order subject.

`category`

string

optional

Work order category.

`status`

string

optional

Work order status.

`priority`

string

optional

Priority value.

`target_type`

string

optional

Target resource type such as
`fleet-ops:vehicle`
or
`fleet-ops:equipment`
.

`target`

string

optional

Target resource public ID.

`assignee_type`

string

optional

Assignee resource type such as
`fleet-ops:vendor`
or
`fleet-ops:contact`
.

`assignee`

string

optional

Assignee public ID.

`checklist`

array

optional

Checklist items.

`meta`

object

optional

Additional metadata.

PUT
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "in_progress"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```

DELETE
`/v1/work-orders`

## [Delete a Work Order](#delete-a-work-order)

Delete a work order.

DELETE
`/v1/work-orders`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/work-orders \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "deleted": true
}
```

POST
`/v1/work-orders/send`

## [Send Work Order](#send-work-order)

Send this work order to its assigned vendor or contact.

POST
`/v1/work-orders/send`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/work-orders/send \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "work_orders"
}
```
