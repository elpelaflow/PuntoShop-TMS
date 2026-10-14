---
title: "Fuel Reports"
url: https://fleetbase.io/docs/api/fleetbase/fuel-reports
module: api
---

# Fuel Reports

Fuel reports record vehicle refueling events and fuel costs. Use them to track fuel purchases, odometer context, and operational expenses for fleet vehicles.

* [The Fuel Report object](#the-fuel-report-object)
* [Create a Fuel Report

  POST
  `/v1/fuel-reports`](#create-a-fuel-report)
* [Query Fuel Reports

  GET
  `/v1/fuel-reports`](#query-fuel-reports)
* [Retrieve a Fuel Report

  GET
  `/v1/fuel-reports/:id`](#retrieve-a-fuel-report)
* [Update a Fuel Report

  PUT
  `/v1/fuel-reports/:id`](#update-a-fuel-report)
* [Delete a Fuel Report

  DELETE
  `/v1/fuel-reports/:id`](#delete-a-fuel-report)

## The Fuel Report object

A fuel report records a driver's fuel purchase or fuel usage report with odometer, amount, volume, unit, location, vehicle, and status data.

Attributes

`id`

string

optional

Public fuel report identifier.

`reporter`

object

optional

User who reported the fuel purchase, when loaded.

`vehicle`

object

optional

Vehicle associated with the fuel report, when loaded.

`driver`

object

optional

Driver associated with the fuel report, when loaded.

`odometer`

number

optional

Odometer reading at the time of the report.

`amount`

currency

optional

Monetary amount for the fuel purchase.

`currency`

currency

optional

Three-letter currency code.

`volume`

number

optional

Fuel volume.

`metric_unit`

string

optional

Unit for the fuel volume.

`type`

string

optional

Fuel report type.

`status`

string

optional

Fuel report status.

`location`

object

optional

Location where fuel was reported.

`updated_at`

timestamp

optional

Timestamp when the fuel report was last updated.

`created_at`

timestamp

optional

Timestamp when the fuel report was created.

The
Fuel Report
object

```
{
  "id": "fuel_report_4Mnp8Qx2Vz",
  "vehicle": null,
  "driver": null,
  "odometer": 10042,
  "amount": 6500,
  "currency": "USD",
  "volume": 42.5,
  "metric_unit": "liters",
  "type": null,
  "status": "created",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/fuel-reports`

## [Create a Fuel Report](#create-a-fuel-report)

Create a Fuel Report

Body parameters

`driver`

string

required

Driver ID reporting the fuel purchase.

`odometer`

number

required

Vehicle odometer reading at the time of the report.

`volume`

number

required

Fuel volume purchased or reported.

`metric_unit`

string

optional

Unit used for the fuel volume.

`location`

object

optional

Location where the fuel was purchased or reported.

`amount`

currency

optional

Monetary amount for the fuel purchase.

POST
`/v1/fuel-reports`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/fuel-reports \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "driver": "{{driver_id}}",
  "odometer": 12042,
  "volume": 42.5,
  "metric_unit": "liter",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "amount": 120.5,
  "currency": "USD",
  "status": "submitted"
}'
```

GET
`/v1/fuel-reports`

## [Query Fuel Reports](#query-fuel-reports)

Query Fuel Reports

Query parameters

`limit`

integer

optional

Maximum number of fuel reports to return.

`offset`

integer

optional

Number of fuel reports to skip before returning results.

`sort`

string

optional

Sort expression for the fuel report query.

`driver`

string

optional

Filters fuel reports by driver ID.

`vehicle`

string

optional

Filters fuel reports by vehicle ID.

GET
`/v1/fuel-reports`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-reports?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/fuel-reports/:id`

## [Retrieve a Fuel Report](#retrieve-a-fuel-report)

Retrieve a Fuel Report

GET
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/fuel-reports/:id`

## [Update a Fuel Report](#update-a-fuel-report)

Update a Fuel Report

Body parameters

`driver`

string

optional

Driver ID reporting the fuel purchase.

`odometer`

number

optional

Vehicle odometer reading at the time of the report.

`volume`

number

optional

Fuel volume purchased or reported.

`metric_unit`

string

optional

Unit used for the fuel volume.

`location`

object

optional

Location where the fuel was purchased or reported.

`amount`

currency

optional

Monetary amount for the fuel purchase.

PUT
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "odometer": 12050,
  "volume": 43.1,
  "metric_unit": "liter",
  "amount": 122.75,
  "currency": "USD",
  "status": "approved"
}'
```

DELETE
`/v1/fuel-reports/:id`

## [Delete a Fuel Report](#delete-a-fuel-report)

Delete a Fuel Report

DELETE
`/v1/fuel-reports/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/fuel-reports/:id \
  -H "Authorization: Bearer flb_live_…"
```
