---
title: "Orders"
url: https://fleetbase.io/docs/api/fleetbase/orders
module: api
---

# Orders

Orders represent work to be planned, dispatched, tracked, and completed. Use order endpoints to create delivery or service jobs, assign resources, manage status, capture proof of delivery, and record activity.

* [The Order object](#the-order-object)
* [Create an Order

  POST
  `/v1/orders`](#create-an-order)
* [Create an Order using Complete Payload

  POST
  `/v1/orders`](#create-an-order-using-complete-payload)
* [Create an Order using Payload

  POST
  `/v1/orders`](#create-an-order-using-payload)
* [Create an Order using Waypoints and Entities with Photos

  POST
  `/v1/orders`](#create-an-order-using-waypoints-and-entities-with-photos)
* [Create an Order using Waypoints and Entity Destinations

  POST
  `/v1/orders`](#create-an-order-using-waypoints-and-entity-destinations)
* [Create an Order using only Pickup Dropoff

  POST
  `/v1/orders`](#create-an-order-using-only-pickup-dropoff)
* [Create an Order using only Waypoints

  POST
  `/v1/orders`](#create-an-order-using-only-waypoints)
* [Create an Order using Coordinates

  POST
  `/v1/orders`](#create-an-order-using-coordinates)
* [Create an Order using GeoJSON Points

  POST
  `/v1/orders`](#create-an-order-using-geojson-points)
* [Create an Order with Empty Relationships

  POST
  `/v1/orders`](#create-an-order-with-empty-relationships)
* [Query Orders

  GET
  `/v1/orders`](#query-orders)
* [Schedule an Order

  PATCH
  `/v1/orders/:id/schedule`](#schedule-an-order)
* [Dispatch an Order

  PATCH
  `/v1/orders/:id/dispatch`](#dispatch-an-order)
* [Start an Order

  POST
  `/v1/orders/:id/start`](#start-an-order)
* [Update Order Activity

  POST
  `/v1/orders/:id/update-activity`](#update-order-activity)
* [Get Order Next Activity

  GET
  `/v1/orders/:id/next-activity`](#get-order-next-activity)
* [Set Order Destination

  PATCH
  `/v1/orders/:id/set-destination/:placeId`](#set-order-destination)
* [Capture Signature for Order

  POST
  `/v1/orders/:id/capture-signature/:subject-id`](#capture-signature-for-order)
* [Capture QR Code for Order

  POST
  `/v1/orders/:id/capture-qr/:subject-id`](#capture-qr-code-for-order)
* [Retrieve an Order

  GET
  `/v1/orders`](#retrieve-an-order)
* [Update an Order

  PUT
  `/v1/orders/:id`](#update-an-order)
* [Cancel an Order

  DELETE
  `/v1/orders/:id/cancel`](#cancel-an-order)
* [Delete an Order

  DELETE
  `/v1/orders/:id`](#delete-an-order)
* [Get Order Distance and Time

  GET
  `/v1/orders/:id/distance-and-time`](#get-order-distance-and-time)
* [Complete an Order

  POST
  `/v1/orders/:id/complete`](#complete-an-order)
* [Get Order Tracker

  GET
  `/v1/orders/:id/tracker`](#get-order-tracker)
* [Get Order ETA

  GET
  `/v1/orders/:id/eta`](#get-order-eta)
* [List Order Comments

  GET
  `/v1/orders/:id/comments`](#list-order-comments)
* [Capture Photo for Order

  POST
  `/v1/orders/:id/capture-photo/:subjectId`](#capture-photo-for-order)
* [List Order Proofs

  GET
  `/v1/orders/:id/proofs/:subjectId`](#list-order-proofs)
* [Get Editable Entity Fields

  GET
  `/v1/orders/:id/editable-entity-fields`](#get-editable-entity-fields)

## The Order object

An order represents a FleetOps delivery or service workflow. It links a payload, optional customer and facilitator, assigned driver and vehicle resources, tracking data, proof-of-delivery settings, and lifecycle timestamps.

Attributes

`id`

string

optional

Public order identifier.

`internal_id`

string

optional

Optional internal identifier for the order.

`order_config`

string

optional

Public identifier of the order configuration used by the order flow.

`customer`

object

optional

Customer contact or vendor resource loaded with the order.

`payload`

object

optional

Payload resource containing the pickup, dropoff, return stop, waypoints, and entities for the order.

`facilitator`

object

optional

Contact, vendor, or integrated vendor facilitating the order.

`driver_assigned`

object

optional

Driver assigned to the order.

`vehicle_assigned`

object

optional

Vehicle assigned to the order.

`tracking_number`

object

optional

Tracking number resource generated for the order.

`tracking_statuses`

array of objects

optional

Tracking statuses loaded with the order.

`files`

array of objects

optional

Files attached to the order.

`purchase_rate`

object

optional

Purchase rate attached to the order, when present.

`notes`

string

optional

Free-form notes attached to the order.

`type`

string

optional

Order type resolved from the order configuration.

`status`

string

optional

Current order lifecycle status.

`pod_method`

string

optional

Proof-of-delivery method required for the order.

`pod_required`

boolean

optional

Whether proof of delivery is required.

`dispatched`

boolean

optional

Whether the order has been dispatched.

`started`

boolean

optional

Whether the order has started.

`adhoc`

boolean

optional

Whether the order is ad hoc.

`adhoc_distance`

integer

optional

Ad hoc dispatch distance in meters.

`distance`

integer

optional

Preliminary route distance in meters.

`time`

integer

optional

Preliminary route duration in seconds.

`tracker_data`

object

optional

Tracker data returned when requested with
`with_tracker_data`
.

`eta`

object

optional

Estimated arrival data returned when requested with
`with_eta`
.

`meta`

object

optional

Additional order metadata.

`dispatched_at`

timestamp

optional

Timestamp when the order was dispatched.

`started_at`

timestamp

optional

Timestamp when the order was started.

`scheduled_at`

timestamp

optional

Timestamp when the order is scheduled.

`updated_at`

timestamp

optional

Timestamp when the order was last updated.

`created_at`

timestamp

optional

Timestamp when the order was created.

The
Order
object

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "customer": {
    "id": "contact_6zV1KqN9pR",
    "name": "Acme Receiving"
  },
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Warehouse 7"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "Customer Dock"
    },
    "waypoints": [],
    "entities": []
  },
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001"
  },
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders`

## [Create an Order](#create-an-order)

Creates a new order for the current company. Provide an existing payload ID, an inline payload, a pickup/dropoff pair, or at least two waypoints; Fleetbase creates or attaches the payload before creating the order.

You can assign a driver, vehicle, facilitator, customer, service quote, or schedule at creation time. When
`dispatch`
is true, Fleetbase dispatches the order after it is created unless the order belongs to an integrated vendor flow.

Body parameters

`payload`

object

optional

Existing payload ID or an inline payload object. If omitted, provide
`pickup`
and
`dropoff`
, or provide at least two
`waypoints`
.

`pickup`

object

optional

Pickup place data or place identifier for the payload.

`dropoff`

object

optional

Dropoff place data or place identifier for the payload.

`return`

object

optional

Optional return place data or place identifier for the payload.

`waypoints`

array of objects

optional

Ordered route stops. Required when the payload does not include both
`pickup`
and
`dropoff`
.

`entities`

array of objects

optional

Entities, packages, or items attached to the payload.

`pickup`

object

optional

Pickup place data or address used to create the order payload when
`payload`
is not supplied.

`dropoff`

object

optional

Dropoff place data or address used to create the order payload when
`payload`
is not supplied.

`return`

object

optional

Optional return place data or address used when creating the order payload.

`waypoints`

array of objects

optional

Ordered route stops used when creating the order payload without a pickup/dropoff pair. At least two waypoints are required when no pickup/dropoff pair is provided.

`entities`

array of objects

optional

Entities, packages, or items attached to the generated payload.

`type`

string

optional

Order configuration key. Fleetbase resolves this with
`order_config`
and stores the resolved key as the order type.

`order_config`

string

optional

Order configuration identifier used to resolve the order flow.

`service_quote`

string

optional

Service quote ID to purchase and attach to the order.

`purchase_rate`

string

optional

Purchase rate ID to attach to the order.

`driver`

string

optional

Driver ID to assign to the order. Fleetbase also assigns the driver's vehicle when one is available. Optional — an empty string or
`null`
is treated as absent and leaves the order unassigned. A non-empty value is still subject to the existing driver ID validation.

`vehicle`

string

optional

Vehicle ID to assign to the order. Optional — an empty string or
`null`
is treated as absent, and an ID that matches no vehicle is ignored rather than rejected.

`facilitator`

string

optional

Contact, vendor, or integrated vendor ID responsible for facilitating the order.

`customer`

object

optional

Existing contact/vendor ID, or customer details used to find or create a customer contact.

`internal_id`

string

optional

Optional internal customer identifier.

`name`

string

optional

Customer display name.

`title`

string

optional

Customer title.

`email`

string

optional

Customer email address used when finding or creating the customer contact.

`phone`

string

optional

Customer phone number.

`meta`

object

optional

Additional customer metadata.

`dispatch`

boolean

optional

When
`true`
, Fleetbase dispatches the order after it is created. Dispatch is skipped for integrated vendor orders.

`adhoc`

boolean

optional

Marks the order as ad hoc.

`adhoc_distance`

number

optional

Ad hoc search distance for dispatching nearby drivers.

`pod_required`

boolean

optional

Whether proof of delivery is required to complete the order.

`pod_method`

string

optional

Proof of delivery method. Required when
`pod_required`
is true.

`scheduled_at`

timestamp

optional

Date and time when the order should be scheduled.

`status`

string

optional

Initial order status. Defaults to
`created`
when omitted.

`internal_id`

string

optional

Optional internal identifier for the order.

`meta`

object

optional

Additional order metadata.

`notes`

string

optional

Free-form notes attached to the order.

`time_window_start`

timestamp

optional

Earliest time the order should be serviced by the orchestrator.

`time_window_end`

timestamp

optional

Latest time the order should be serviced by the orchestrator.

`required_skills`

array of strings

optional

Skills required for orchestrator assignment.

`orchestrator_priority`

integer

optional

Default:
`50`

Orchestrator priority for assignment. Fleetbase defaults invalid or omitted values to
`50`
.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore",
  "waypoints": [
      "10 Bayfront Avenue, Singapore 018956",
      "18 Marina Gardens Drive, Singapore 018953",
      "80 Mandai Lake Rd, Singapore 729826",
      "1 Beach Road, Singapore 189673"
  ],
  "dispatch": false,
  "driver": "{{driver_id}}",
  "facilitator": "{{vendor_id}}",
  "customer": "{{contact_id}}",
  "meta": {
      "Warehouse": "WAREHOUSE-123"
  },
  "notes": "Order notes"
}'
```

Other ways to call this

* Create an Order using Complete Payload
* Create an Order using only Pickup Dropoff
* Create an Order using only Waypoints
* Create an Order using Payload
* Create an Order using Waypoints and Entity Destinations
* Create an Order using Waypoints and Entities with Photos

201

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "customer": {
    "id": "contact_6zV1KqN9pR",
    "name": "Acme Receiving",
    "email": "receiving@example.com",
    "phone": "+15555550100",
    "type": "customer-contact",
    "customer_type": "customer-contact",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_1A2b3C4d5E",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Marina Bay Sands",
      "location": {
        "latitude": 1.2834,
        "longitude": 103.8607
      },
      "address": "10 Bayfront Avenue, Singapore 018956",
      "type": "place",
      "meta": {},
      "updated_at": "2026-05-07T08:30:00.000000Z",
      "created_at": "2026-05-07T08:30:00.000000Z"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "321 Orchard Rd",
      "location": {
        "latitude": 1.3048,
        "longitude": 103.8318
      },
      "address": "321 Orchard Rd, Singapore",
      "type": "place",
      "meta": {},
      "updated_at": "2026-05-07T08:30:00.000000Z",
      "created_at": "2026-05-07T08:30:00.000000Z"
    },
    "return": null,
    "waypoints": [],
    "entities": [],
    "cod_amount": null,
    "cod_currency": null,
    "cod_payment_method": null,
    "payment_method": null,
    "meta": {},
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver",
    "email": "alex.driver@example.com",
    "phone": "+15555550111",
    "status": "active",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "qr_code": "https://api.fleetbase.io/qr/FB-1001",
    "barcode": "https://api.fleetbase.io/barcode/FB-1001",
    "url": "https://console.fleetbase.io/track-order/FB-1001",
    "type": "order",
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders`

## [Create an Order using Complete Payload](#create-an-order-using-complete-payload)

Creates an order using the Complete Payload payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore",
  "dispatch": false,
  "driver": "{{driver_id}}",
  "customer": "{{contact_id}}",
  "notes": "Deliver through receiving bay."
}'
```

POST
`/v1/orders`

## [Create an Order using Payload](#create-an-order-using-payload)

Creates an order using the Payload payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "payload": {
        "pickup": "Singapore 018971",
        "dropoff": "321 Orchard Rd, Singapore",
        "entities": [
            {
                "name": "UltraHD 4K Smart TV",
                "description": "65-inch high-definition smart TV with vibrant colors and a sleek design.",
                "currency": "USD",
                "price": 1200.00
            },
            {
                "name": "Bluetooth Wireless Headphones",
                "description": "Noise-cancelling, over-ear headphones with long-lasting battery life.",
                "currency": "USD",
                "price": 250.00
            },
            {
                "name": "Smart Fitness Watch",
                "description": "Water-resistant fitness watch with heart rate monitor and GPS tracking.",
                "currency": "USD",
                "price": 199.99
            }
        ]
    },
    "meta": {
        "Warehouse": "WAREHOUSE-123"
    },
    "notes": "Order notes"
}'
```

POST
`/v1/orders`

## [Create an Order using Waypoints and Entities with Photos](#create-an-order-using-waypoints-and-entities-with-photos)

Creates an order using the Waypoints and Entities with Photos payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "payload": {
        "waypoints": [
            "Singapore 018971",
            "321 Orchard Rd, Singapore"
        ],
        "entities": [
            {
                "destination": 0,
                "name": "UltraHD 4K Smart TV",
                "description": "65-inch high-definition smart TV with vibrant colors and a sleek design.",
                "currency": "USD",
                "price": 1200.00,
                "photo": "https://cdn.thewirecutter.com/wp-content/media/2025/07/BEST-BUDGET-4K-TV-2048px-3185-2x1-1.jpg?width=1024&quality=75&crop=2:1&auto=webp"
            },
            {
                "destination": 0,
                "name": "Bluetooth Wireless Headphones",
                "description": "Noise-cancelling, over-ear headphones with long-lasting battery life.",
                "currency": "USD",
                "price": 250.00,
                "photo": "https://cdn.thewirecutter.com/wp-content/media/2025/07/BEST-BUDGET-4K-TV-2048px-3185-2x1-1.jpg?width=1024&quality=75&crop=2:1&auto=webp"
            },
            {
                "destination": 1,
                "name": "Smart Fitness Watch",
                "description": "Water-resistant fitness watch with heart rate monitor and GPS tracking.",
                "currency": "USD",
                "price": 199.99,
                "photo": "https://cdn.thewirecutter.com/wp-content/media/2025/07/BEST-BUDGET-4K-TV-2048px-3185-2x1-1.jpg?width=1024&quality=75&crop=2:1&auto=webp"
            }
        ]
    },
    "meta": {
        "Warehouse": "WAREHOUSE-123"
    },
    "notes": "Order notes"
}'
```

POST
`/v1/orders`

## [Create an Order using Waypoints and Entity Destinations](#create-an-order-using-waypoints-and-entity-destinations)

Creates an order using the Waypoints and Entity Destinations payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "payload": {
        "waypoints": [
            "Singapore 018971",
            "321 Orchard Rd, Singapore"
        ],
        "entities": [
            {
                "destination": 0,
                "name": "UltraHD 4K Smart TV",
                "description": "65-inch high-definition smart TV with vibrant colors and a sleek design.",
                "currency": "USD",
                "price": 1200.00
            },
            {
                "destination": 0,
                "name": "Bluetooth Wireless Headphones",
                "description": "Noise-cancelling, over-ear headphones with long-lasting battery life.",
                "currency": "USD",
                "price": 250.00
            },
            {
                "destination": 1,
                "name": "Smart Fitness Watch",
                "description": "Water-resistant fitness watch with heart rate monitor and GPS tracking.",
                "currency": "USD",
                "price": 199.99
            }
        ]
    },
    "meta": {
        "Warehouse": "WAREHOUSE-123"
    },
    "notes": "Order notes"
}'
```

POST
`/v1/orders`

## [Create an Order using only Pickup Dropoff](#create-an-order-using-only-pickup-dropoff)

Creates an order using the only Pickup Dropoff payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore"
}'
```

POST
`/v1/orders`

## [Create an Order using only Waypoints](#create-an-order-using-only-waypoints)

Creates an order using the only Waypoints payload shape.
Promoted from a stored example so the shape is actually exercised: the Postman CLI
runs requests, never examples, so these shapes had no coverage at all.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "waypoints": [
      [1.3521, 103.8198],
      "10 Bayfront Avenue, Singapore 018956",
      "18 Marina Gardens Drive, Singapore 018953",
      "80 Mandai Lake Rd, Singapore 729826",
      "1 Beach Road, Singapore 189673",
      "Sentosa, Singapore"
  ]
}'
```

POST
`/v1/orders`

## [Create an Order using Coordinates](#create-an-order-using-coordinates)

Creates an order with
`pickup`
and
`dropoff`
given as coordinate objects.

`Place::createFromMixed`
accepts a place as more than a public id. When the value is
a coordinate pair it resolves through
`createFromCoordinates`
, so no address lookup
is involved. Latitude and longitude are read through a list of aliases —
`lat`
,
`latitude`
,
`x`
,
`0`
and
`lon`
,
`lng`
,
`longitude`
,
`y`
,
`1`
— so several spellings
are equivalent.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": {
    "latitude": 1.2830632,
    "longitude": 103.8579965
  },
  "dropoff": {
    "lat": 1.4043,
    "lng": 103.7930
  }
}'
```

POST
`/v1/orders`

## [Create an Order using GeoJSON Points](#create-an-order-using-geojson-points)

Creates an order with
`pickup`
and
`dropoff`
given as GeoJSON Point objects.

`Place::createFromMixed`
recognises GeoJSON directly, so a client already holding
GeoJSON geometry does not have to convert it. Note the GeoJSON axis order is
`[longitude, latitude]`
, the reverse of the coordinate-object form.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": {
    "type": "Point",
    "coordinates": [103.8579965, 1.2830632]
  },
  "dropoff": {
    "type": "Point",
    "coordinates": [103.7930, 1.4043]
  }
}'
```

POST
`/v1/orders`

## [Create an Order with Empty Relationships](#create-an-order-with-empty-relationships)

Creates an order while sending
`driver`
and
`vehicle`
as empty strings.

An empty relationship means "none", not "invalid": Fleetbase ignores the field and creates the order unassigned, exactly as if the key had been left out. This is the historical behaviour, and it matters because a client that serialises an unselected dropdown sends
`""`
rather than omitting the key.

Empty-string request values reach the API as null, and a null is a question with an answer — "there is no such record" — rather than a malformed request. This request exists so that answer stays a 2xx.

POST
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "pickup": "Singapore 018971",
  "dropoff": "321 Orchard Rd, Singapore",
  "driver": "",
  "vehicle": ""
}'
```

GET
`/v1/orders`

## [Query Orders](#query-orders)

Returns orders for the current company. Use filters such as
`status`
,
`payload`
,
`customer`
,
`facilitator`
, or
`nearby`
to narrow the result set.

Query parameters

`limit`

integer

optional

Maximum number of orders to return.

`offset`

integer

optional

Number of orders to skip before returning results.

`sort`

string

optional

Sort expression for the order query.

`status`

string

optional

Filters orders by lifecycle status.

`payload`

string

optional

Filters orders by payload ID.

`pickup`

string

optional

Filters orders by pickup place ID.

`dropoff`

string

optional

Filters orders by dropoff place ID.

`return`

string

optional

Filters orders by return place ID.

`facilitator`

string

optional

Filters orders by facilitator public or internal ID.

`customer`

string

optional

Filters orders by customer public or internal ID.

`entity`

string

optional

Filters orders containing the specified entity public or internal ID.

`entity_status`

string

optional

Filters orders by the tracking status code of their payload entities.

`on`

date

optional

Filters orders created or scheduled on the specified date.

`pod_required`

boolean

optional

When true, returns only orders requiring proof of delivery.

`dispatched`

boolean

optional

When true, returns only dispatched orders.

`nearby`

string

optional

Filters nearby orders using coordinates, a driver ID, or an address string.

GET
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders?limit=25&offset=0&sort=created_at&status=created \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "order_7YqM3KpL2n",
    "internal_id": "ORD-1001",
    "order_config": "order_config_transport",
    "payload": {
      "id": "payload_x9Z2Lm8QpA",
      "waypoints": [],
      "entities": [],
      "meta": {}
    },
    "customer": null,
    "facilitator": null,
    "driver_assigned": null,
    "vehicle_assigned": null,
    "tracking_number": {
      "id": "tracking_3Nf8Qw2YxM",
      "tracking_number": "FB-1001",
      "status": "created",
      "status_code": "created",
      "type": "order"
    },
    "tracking_statuses": [],
    "files": [],
    "purchase_rate": null,
    "notes": "Deliver through receiving bay.",
    "type": "transport",
    "status": "created",
    "pod_method": null,
    "pod_required": false,
    "dispatched": false,
    "started": false,
    "adhoc": false,
    "adhoc_distance": 0,
    "distance": 0,
    "time": 0,
    "meta": {},
    "dispatched_at": null,
    "started_at": null,
    "scheduled_at": null,
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

PATCH
`/v1/orders/:id/schedule`

## [Schedule an Order](#schedule-an-order)

Schedules an order for a specific date and optional time. Fleetbase parses the schedule using the supplied timezone or the company timezone.

Body parameters

`date`

date

required

Schedule date in
`YYYY-MM-DD`
format.

`time`

string

optional

Optional time to combine with
`date`
.

`timezone`

string

optional

Timezone used when parsing the schedule date and time. Defaults to the company timezone.

PATCH
`/v1/orders/:id/schedule`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/schedule \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-02-11",
    "time": "8am",
    "timezone": "Asia/Singapore"
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Marina Bay Sands"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "321 Orchard Rd"
    },
    "return": null,
    "waypoints": [],
    "entities": [],
    "cod_amount": null,
    "cod_currency": null,
    "cod_payment_method": null,
    "payment_method": null,
    "meta": {},
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": "2026-05-08T14:30:00.000000Z",
  "updated_at": "2026-05-07T08:35:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PATCH
`/v1/orders/:id/dispatch`

## [Dispatch an Order](#dispatch-an-order)

Dispatches an order to an assigned or eligible driver. The response returns the order after dispatch state has been applied.

PATCH
`/v1/orders/:id/dispatch`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/dispatch \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "dispatched",
    "status_code": "dispatched",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "type": "transport",
  "status": "dispatched",
  "pod_required": false,
  "dispatched": true,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:50:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/start`

## [Start an Order](#start-an-order)

Starts an order and transitions it into active execution. Use this when a driver or dispatcher begins fulfillment.

Body parameters

`skip_dispatch`

boolean

optional

Starts the order even if it has not been dispatched.

`skipDispatch`

boolean

optional

Camel-case alias for
`skip_dispatch`
.

`assign`

string

optional

Driver ID to assign before starting an ad hoc order.

POST
`/v1/orders/:id/start`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/start \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "skip_dispatch": false
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_1A2b3C4d5E",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "started",
    "status_code": "started",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "started",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:52:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/update-activity`

## [Update Order Activity](#update-order-activity)

Updates the current activity state for an order. The response returns the order with the latest workflow activity applied.

Body parameters

`activity`

object

optional

Activity payload to apply to the order. Fleetbase resolves it against the order configuration flow.

`proof`

object

optional

Optional proof data to attach when the activity updates an entity or waypoint.

`skip_dispatch`

boolean

optional

Uses the first started activity instead of dispatching when the submitted activity is
`dispatched`
.

`skipDispatch`

boolean

optional

Camel-case alias for
`skip_dispatch`
.

POST
`/v1/orders/:id/update-activity`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/update-activity \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "activity": {{next_activity}},
    "skip_dispatch": false
}'
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_9Z8y7X6w5V",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "in_progress",
    "status_code": "in_progress",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "in_progress",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:55:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/orders/:id/next-activity`

## [Get Order Next Activity](#get-order-next-activity)

Returns the next workflow activity for an order. Use it to determine the next operational step available to the assigned driver or dispatcher.

GET
`/v1/orders/:id/next-activity`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/next-activity?waypoint={{current_waypoint_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "code": "started",
    "status": "Order started",
    "details": "The assigned driver has started the order.",
    "sequence": 2,
    "_resolved_status": "Order started",
    "_resolved_details": "The assigned driver has started the order."
  },
  {
    "code": "completed",
    "status": "Order completed",
    "details": "The order has been completed.",
    "sequence": 3,
    "require_pod": true,
    "pod_method": "signature",
    "_resolved_status": "Order completed",
    "_resolved_details": "The order has been completed."
  }
]
```

PATCH
`/v1/orders/:id/set-destination/:placeId`

## [Set Order Destination](#set-order-destination)

Sets the destination waypoint or place for an order. The response returns the updated order after the destination is changed.

PATCH
`/v1/orders/:id/set-destination/:placeId`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/orders/:id/set-destination/:placeId \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "current_waypoint": "place_9Z8y7X6w5V",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "in_progress",
    "status_code": "in_progress",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "in_progress",
  "pod_method": null,
  "pod_required": false,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:58:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/orders/:id/capture-signature/:subject-id`

## [Capture Signature for Order](#capture-signature-for-order)

Captures a signature proof for an order or order subject. Use this when a workflow requires signed proof of delivery or pickup.

Body parameters

`signature`

string

required

Base64 PNG signature data. Fleetbase stores the image and links it to the proof record.

`remarks`

string

optional

Default:
`Verified by Signature`

Remarks stored on the proof record.

`data`

object

optional

Structured proof metadata stored with the signature proof.

`disk`

string

optional

Filesystem disk used to store the signature image. Defaults to the configured filesystem disk.

`bucket`

string

optional

Storage bucket used for the generated signature file.

POST
`/v1/orders/:id/capture-signature/:subject-id`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/capture-signature/:subject-id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "signature": "{{proof_signature_base64}}",
    "data": []
}'
```

200

OK

```
{
  "id": "proof_8pQ3mN7xYa",
  "subject_id": "order_7YqM3KpL2n",
  "order_id": "order_7YqM3KpL2n",
  "url": "https://files.example.com/uploads/company_123/signatures/proof_8pQ3mN7xYa.png",
  "remarks": "Verified by Signature",
  "raw": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "data": {
    "recipient_name": "Alex Receiver"
  },
  "updated_at": "2026-05-07T09:10:00.000000Z",
  "created_at": "2026-05-07T09:10:00.000000Z"
}
```

POST
`/v1/orders/:id/capture-qr/:subject-id`

## [Capture QR Code for Order](#capture-qr-code-for-order)

Captures a QR code proof for an order or order subject. The response includes the updated proof data associated with the order.

Body parameters

`code`

string

required

QR code value to verify. The code must match the resolved subject UUID.

`data`

object

optional

Structured proof metadata stored with the QR proof.

`raw_data`

object

optional

Raw QR payload stored on the proof record.

POST
`/v1/orders/:id/capture-qr/:subject-id`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/capture-qr/:subject-id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "{{qr_code}}",
    "data": [],
    "raw_data": []
}'
```

200

OK

```
{
  "id": "proof_x9L2mN4pQr",
  "subject_id": "entity_4Kp9Lm2QxZ",
  "order_id": "order_7YqM3KpL2n",
  "url": null,
  "remarks": "Verified by QR Code Scan",
  "raw": "entity-qr-scan-payload",
  "data": {
    "scanner": "driver-app"
  },
  "updated_at": "2026-05-07T09:05:00.000000Z",
  "created_at": "2026-05-07T09:05:00.000000Z"
}
```

GET
`/v1/orders`

## [Retrieve an Order](#retrieve-an-order)

Retrieves a single order by ID. The response includes the public order fields plus loaded payload, tracking, assignment, customer, and facilitator data when available.

GET
`/v1/orders`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "customer": {
    "id": "contact_6zV1KqN9pR",
    "name": "Acme Receiving",
    "type": "customer-contact"
  },
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "pickup": {
      "id": "place_1A2b3C4d5E",
      "name": "Marina Bay Sands",
      "address": "10 Bayfront Avenue, Singapore 018956"
    },
    "dropoff": {
      "id": "place_9Z8y7X6w5V",
      "name": "321 Orchard Rd",
      "address": "321 Orchard Rd, Singapore"
    },
    "return": null,
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "created",
    "status_code": "created",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "created",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

PUT
`/v1/orders/:id`

## [Update an Order](#update-an-order)

Updates an order and returns the updated order resource. You can update order metadata, notes, status, assignment fields, scheduling fields, proof-of-delivery settings, and payload details.

Body parameters

`payload`

object

optional

Existing payload ID or inline payload data used to replace or update the order payload.

`pickup`

object

optional

Replacement pickup place data or address for the order payload.

`dropoff`

object

optional

Replacement dropoff place data or address for the order payload.

`return`

object

optional

Replacement return place data or address for the order payload.

`waypoints`

array of objects

optional

Replacement waypoint list. When sent empty with route endpoint fields, existing waypoints are removed.

`entities`

array of objects

optional

Replacement entities for the order payload.

`service_quote`

string

optional

Service quote ID to purchase and attach to the order.

`driver`

string

optional

Driver ID to assign to the order.

`vehicle`

string

optional

Vehicle ID to assign to the order.

`facilitator`

string

optional

Contact or vendor ID responsible for facilitating the order.

`customer`

string

optional

Contact or vendor ID to assign as the order customer.

`dispatch`

boolean

optional

When
`true`
, dispatches the order after applying the update.

`adhoc`

boolean

optional

Marks the order as ad hoc.

`adhoc_distance`

number

optional

Ad hoc search distance for dispatching nearby drivers.

`pod_required`

boolean

optional

Whether proof of delivery is required to complete the order.

`pod_method`

string

optional

Proof of delivery method. Required when
`pod_required`
is true.

`scheduled_at`

timestamp

optional

Date and time when the order should be scheduled.

`type`

string

optional

Order type or order configuration key.

`status`

string

optional

Order lifecycle status to set.

`internal_id`

string

optional

Optional internal identifier for the order.

`meta`

object

optional

Additional order metadata.

`notes`

string

optional

Free-form notes attached to the order.

`time_window_start`

timestamp

optional

Earliest time the order should be serviced by the orchestrator.

`time_window_end`

timestamp

optional

Latest time the order should be serviced by the orchestrator.

`required_skills`

array of strings

optional

Skills required for orchestrator assignment.

`orchestrator_priority`

integer

optional

Default:
`50`

Orchestrator priority for assignment. Fleetbase defaults explicitly empty values to
`50`
.

PUT
`/v1/orders/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/orders/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "service_quote": "{{service_quote_id}}"
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Leave with the receiving desk.",
  "type": "transport",
  "status": "created",
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:45:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

DELETE
`/v1/orders/:id/cancel`

## [Cancel an Order](#cancel-an-order)

Cancels an order without deleting the order resource.

DELETE
`/v1/orders/:id/cancel`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/orders/:id/cancel \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": null,
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "canceled",
    "status_code": "canceled",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "canceled",
  "pod_method": null,
  "pod_required": false,
  "dispatched": false,
  "started": false,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 0,
  "time": 0,
  "meta": {},
  "dispatched_at": null,
  "started_at": null,
  "scheduled_at": null,
  "updated_at": "2026-05-07T08:40:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

DELETE
`/v1/orders/:id`

## [Delete an Order](#delete-an-order)

Deletes an order resource.

DELETE
`/v1/orders/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/orders/:id \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "object": "order",
  "time": "2026-05-07T09:25:00.000000Z",
  "deleted": true
}
```

GET
`/v1/orders/:id/distance-and-time`

## [Get Order Distance and Time](#get-order-distance-and-time)

Returns and updates the order distance/time matrix.

GET
`/v1/orders/:id/distance-and-time`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/distance-and-time \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "distance": 4830,
  "time": 875
}
```

POST
`/v1/orders/:id/complete`

## [Complete an Order](#complete-an-order)

Completes an order after all waypoints are complete.

POST
`/v1/orders/:id/complete`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/complete \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "order_7YqM3KpL2n",
  "internal_id": "ORD-1001",
  "order_config": "order_config_transport",
  "payload": {
    "id": "payload_x9Z2Lm8QpA",
    "waypoints": [],
    "entities": [],
    "meta": {}
  },
  "customer": null,
  "facilitator": null,
  "driver_assigned": {
    "id": "driver_A1b2C3d4E5",
    "name": "Alex Driver"
  },
  "vehicle_assigned": null,
  "tracking_number": {
    "id": "tracking_3Nf8Qw2YxM",
    "tracking_number": "FB-1001",
    "status": "completed",
    "status_code": "completed",
    "type": "order"
  },
  "tracking_statuses": [],
  "files": [],
  "purchase_rate": null,
  "notes": "Deliver through receiving bay.",
  "type": "transport",
  "status": "completed",
  "pod_method": "signature",
  "pod_required": true,
  "dispatched": true,
  "started": true,
  "adhoc": false,
  "adhoc_distance": 0,
  "distance": 4830,
  "time": 875,
  "meta": {},
  "dispatched_at": "2026-05-07T08:50:00.000000Z",
  "started_at": "2026-05-07T08:52:00.000000Z",
  "scheduled_at": null,
  "updated_at": "2026-05-07T09:20:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/orders/:id/tracker`

## [Get Order Tracker](#get-order-tracker)

Returns public tracking data for an order.

GET
`/v1/orders/:id/tracker`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/tracker \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "driver_current_location": {
    "latitude": 1.2921,
    "longitude": 103.8502
  },
  "progress_percentage": 42.5,
  "total_distance": 4830,
  "completed_distance": 2053,
  "current_destination_eta": 720,
  "completion_eta": 1540,
  "estimated_completion_time": "2026-05-07T09:35:00.000000Z",
  "estimated_completion_time_formatted": "May 7th, 2026 09:35",
  "start_time": "2026-05-07T08:52:00.000000Z",
  "completion_time": null,
  "current_destination": {
    "id": "place_9Z8y7X6w5V",
    "name": "321 Orchard Rd"
  },
  "next_destination": null,
  "first_waypoint_completed": true,
  "last_waypoint_completed": false
}
```

GET
`/v1/orders/:id/eta`

## [Get Order ETA](#get-order-eta)

Returns ETA data for an order.

GET
`/v1/orders/:id/eta`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/eta \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "9b14b5c4-4669-4f1b-8d52-ef5d9317ad6b": 720,
  "2c44c9f7-4e50-463a-bd0f-f50ab6d2f5e1": 1540
}
```

GET
`/v1/orders/:id/comments`

## [List Order Comments](#list-order-comments)

Lists comments attached to an order.

GET
`/v1/orders/:id/comments`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/comments \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "comment_6gK2mN8pQa",
    "content": "Driver should use the receiving bay entrance.",
    "tags": [],
    "meta": {},
    "author": {
      "id": "user_4xK2mQ8pAa",
      "name": "Alex Dispatcher"
    },
    "replies": [],
    "editable": false,
    "updated_at": "2026-05-07T08:45:00.000000Z",
    "created_at": "2026-05-07T08:45:00.000000Z",
    "deleted_at": null
  }
]
```

POST
`/v1/orders/:id/capture-photo/:subjectId`

## [Capture Photo for Order](#capture-photo-for-order)

Captures proof photos for an order or order subject.

Body parameters

`photos`

array of strings

required

One or more uploaded images or Base64 image strings. Each item must be an image no larger than 10 MB.

`remarks`

string

optional

Default:
`Verified by Photo`

Remarks stored on each proof record.

`data`

object

optional

Structured proof metadata stored with each photo proof.

`disk`

string

optional

Filesystem disk used to store proof photos. Defaults to the configured filesystem disk.

POST
`/v1/orders/:id/capture-photo/:subjectId`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/orders/:id/capture-photo/:subjectId \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "photos": [
    "{{proof_photo_base64}}"
  ],
  "remarks": "Verified by Photo",
  "data": {}
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "proof_3Vq8mN2xLa",
  "subject_id": "order_7YqM3KpL2n",
  "order_id": "order_7YqM3KpL2n",
  "url": "https://files.example.com/uploads/company_123/photos/proof_3Vq8mN2xLa.png",
  "remarks": "Verified by Photo",
  "raw": "iVBORw0KGgoAAAANSUhEUgAA...",
  "data": {
    "captured_by": "driver-app"
  },
  "updated_at": "2026-05-07T09:15:00.000000Z",
  "created_at": "2026-05-07T09:15:00.000000Z"
}
```

GET
`/v1/orders/:id/proofs/:subjectId`

## [List Order Proofs](#list-order-proofs)

Lists proof of delivery resources for an order or subject.

GET
`/v1/orders/:id/proofs/:subjectId`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/proofs/:subjectId \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "proof_8pQ3mN7xYa",
    "subject_id": "order_7YqM3KpL2n",
    "order_id": "order_7YqM3KpL2n",
    "url": "https://files.example.com/uploads/company_123/signatures/proof_8pQ3mN7xYa.png",
    "remarks": "Verified by Signature",
    "raw": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "data": {
      "recipient_name": "Alex Receiver"
    },
    "updated_at": "2026-05-07T09:10:00.000000Z",
    "created_at": "2026-05-07T09:10:00.000000Z"
  }
]
```

GET
`/v1/orders/:id/editable-entity-fields`

## [Get Editable Entity Fields](#get-editable-entity-fields)

Returns configured editable entity fields for an order.

GET
`/v1/orders/:id/editable-entity-fields`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/orders/:id/editable-entity-fields \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "key": "weight",
    "label": "Weight",
    "type": "number"
  },
  {
    "key": "length",
    "label": "Length",
    "type": "number"
  }
]
```
