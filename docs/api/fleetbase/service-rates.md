---
title: "Service Rates"
url: https://fleetbase.io/docs/api/fleetbase/service-rates
module: api
---

# Service Rates

Service rates define sell-side pricing rules for delivery and logistics services. Use service rates to configure how quotes are calculated from distance, time, zones, service areas, and service types.

* [The Service Rate object](#the-service-rate-object)
* [Create a Service Rate

  POST
  `/v1/service-rates`](#create-a-service-rate)
* [Create a Service Rate with an Empty Service Area

  POST
  `/v1/service-rates`](#create-a-service-rate-with-an-empty-service-area)
* [Query Service Rates

  GET
  `/v1/service-rates`](#query-service-rates)
* [Retrieve a Service Rate

  GET
  `/v1/service-rates/:id`](#retrieve-a-service-rate)
* [Update a Service Rate

  PUT
  `/v1/service-rates/:id`](#update-a-service-rate)
* [Delete a Service Rate

  DELETE
  `/v1/service-rates/:id`](#delete-a-service-rate)

## The Service Rate object

A service rate defines how Fleetbase prices a service within a service area or zone. It stores the calculation method, fee tiers, algorithm, COD and peak-hour surcharges, currency, and delivery estimates.

Attributes

`id`

string

optional

Public service rate identifier.

`order_config`

string

optional

Order configuration associated with the rate.

`service_area`

object

optional

Service area associated with the rate.

`zone`

object

optional

Zone associated with the rate.

`service_name`

string

optional

Service rate display name.

`service_type`

string

optional

Service type this rate applies to.

`base_fee`

currency

optional

Base fee applied to the rate.

`rate_calculation_method`

string

optional

Method used to calculate the rate.

`rate_fees`

array of objects

optional

Distance or tiered fees.

`parcel_fees`

array of objects

optional

Parcel-based fees.

`algorithm`

string

optional

Computable algorithm for algorithmic rates.

`currency`

currency

optional

Three-letter currency code.

`duration_terms`

string

optional

Human-readable delivery duration terms.

`estimated_days`

integer

optional

Estimated service duration in days.

`updated_at`

timestamp

optional

Timestamp when the service rate was last updated.

`created_at`

timestamp

optional

Timestamp when the service rate was created.

The
Service Rate
object

```
{
  "id": "service_rate_8Qw2YxM3Nf",
  "order_config": "order_config_transport",
  "service_area": null,
  "zone": null,
  "service_name": "Standard Delivery",
  "service_type": "delivery",
  "base_fee": 500,
  "rate_calculation_method": "fixed_rate",
  "rate_fees": [],
  "parcel_fees": [],
  "currency": "USD",
  "duration_terms": "1-2 days",
  "estimated_days": 2,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/service-rates`

## [Create a Service Rate](#create-a-service-rate)

Create a Service Rate.

Body parameters

`service_name`

string

required

Display name for the service rate.

`service_type`

string

required

Service type this rate applies to.

`service_area`

string

optional

Service area ID this rate applies to. Optional — an empty string or
`null`
is treated as absent rather than as an invalid service area.

`zone`

string

optional

Zone ID this rate applies to. Optional — an empty string or
`null`
is treated as absent rather than as an invalid zone.

`rate_calculation_method`

enum

required

Method used to calculate the rate. One of
`fixed_meter`
,
`fixed_rate`
,
`per_meter`
,
`per_drop`
,
`algo`
,
`parcel`
.

`currency`

currency

required

Three-letter currency code.

`base_fee`

currency

optional

Base fee applied to the rate.

`per_meter_unit`

enum

optional

Distance unit for
`per_meter`
rates. One of
`km`
,
`m`
,
`ft`
,
`yd`
,
`mi`
.

`per_meter_flat_rate_fee`

currency

optional

Flat fee per distance unit for
`per_meter`
rates.

`meter_fees`

array of objects

optional

Distance fee tiers for
`fixed_meter`
or
`fixed_rate`
methods.

`algorithm`

string

optional

Computable algorithm used when
`rate_calculation_method`
is
`algo`
.

`has_cod_fee`

boolean

optional

Whether the rate includes a cash-on-delivery fee.

`cod_calculation_method`

enum

optional

Cash-on-delivery fee calculation method. One of
`percentage`
,
`flat`
.

`cod_flat_fee`

currency

optional

Flat cash-on-delivery fee.

`cod_percent`

integer

optional

Percentage cash-on-delivery fee.

`has_peak_hours_fee`

boolean

optional

Whether the rate includes a peak-hours fee.

`peak_hours_calculation_method`

enum

optional

Peak-hours fee calculation method. One of
`percentage`
,
`flat`
.

`peak_hours_flat_fee`

currency

optional

Flat peak-hours fee.

`peak_hours_percent`

integer

optional

Percentage peak-hours fee.

`peak_hours_start`

string

optional

Peak-hours start time in
`HH:mm`
format.

`peak_hours_end`

string

optional

Peak-hours end time in
`HH:mm`
format.

`duration_terms`

string

optional

Human-readable duration terms.

`estimated_days`

integer

optional

Estimated service duration in days.

POST
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "Food Delivery",
    "service_type": "food_delivery",
    "rate_calculation_method": "per_meter",
    "currency": "USD",
    "base_fee": 10.00,
    "per_meter_unit": "km",
    "per_meter_flat_rate_fee": 25,
    "has_cod_fee": true,
    "cod_calculation_method": "percentage",
    "cod_flat_fee": 1.00,
    "cod_percent": 0,
    "has_peak_hours_fee": true,
    "peak_hours_calculation_method": "percentage",
    "peak_hours_flat_fee": 3.00,
    "peak_hours_percent": 0,
    "peak_hours_start": "17:00",
    "peak_hours_end": "18:45",
    "duration_terms": "Standard",
    "estimated_days": 3
}'
```

POST
`/v1/service-rates`

## [Create a Service Rate with an Empty Service Area](#create-a-service-rate-with-an-empty-service-area)

Creates a service rate while sending
`service_area`
and
`zone`
as empty strings.

Both relationships are optional, so an empty one reads as absent. Without that, the
`exists`
check runs against the null an empty string becomes and answers "The selected service area is invalid" for a field the caller simply left blank.

Does not overwrite
`service_rate_id`
; the canonical create owns that variable.

POST
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/service-rates \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "service_name": "Empty Relationship Rate",
  "service_type": "food_delivery",
  "rate_calculation_method": "per_meter",
  "currency": "USD",
  "base_fee": 10.00,
  "per_meter_unit": "km",
  "per_meter_flat_rate_fee": 25,
  "service_area": "",
  "zone": "",
  "duration_terms": "Standard",
  "estimated_days": 3
}'
```

GET
`/v1/service-rates`

## [Query Service Rates](#query-service-rates)

List all service rates.

Query parameters

`limit`

integer

optional

Maximum number of service rates to return.

`offset`

integer

optional

Number of service rates to skip before returning results.

`sort`

string

optional

Sort expression for the service rate query.

`service_area`

string

optional

Filters service rates by service area ID.

`zone`

string

optional

Filters service rates by zone ID.

`service_type`

string

optional

Filters service rates by service type.

GET
`/v1/service-rates`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-rates?limit=25&offset=0&currency=USD \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/service-rates/:id`

## [Retrieve a Service Rate](#retrieve-a-service-rate)

Retrieves a service rate by ID.

GET
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/service-rates/:id`

## [Update a Service Rate](#update-a-service-rate)

Update a Service Rate.

Body parameters

`service_name`

string

optional

Display name for the service rate.

`service_type`

string

optional

Service type this rate applies to.

`service_area`

string

optional

Service area ID this rate applies to.

`zone`

string

optional

Zone ID this rate applies to.

`rate_calculation_method`

enum

optional

Method used to calculate the rate. One of
`fixed_meter`
,
`fixed_rate`
,
`per_meter`
,
`per_drop`
,
`algo`
,
`parcel`
.

`currency`

currency

optional

Three-letter currency code.

`base_fee`

currency

optional

Base fee applied to the rate.

`per_meter_unit`

enum

optional

Distance unit for
`per_meter`
rates. One of
`km`
,
`m`
,
`ft`
,
`yd`
,
`mi`
.

`per_meter_flat_rate_fee`

currency

optional

Flat fee per distance unit for
`per_meter`
rates.

`meter_fees`

array of objects

optional

Distance fee tiers for
`fixed_meter`
or
`fixed_rate`
methods.

`algorithm`

string

optional

Computable algorithm used when
`rate_calculation_method`
is
`algo`
.

`has_cod_fee`

boolean

optional

Whether the rate includes a cash-on-delivery fee.

`cod_calculation_method`

enum

optional

Cash-on-delivery fee calculation method. One of
`percentage`
,
`flat`
.

`cod_flat_fee`

currency

optional

Flat cash-on-delivery fee.

`cod_percent`

integer

optional

Percentage cash-on-delivery fee.

`has_peak_hours_fee`

boolean

optional

Whether the rate includes a peak-hours fee.

`peak_hours_calculation_method`

enum

optional

Peak-hours fee calculation method. One of
`percentage`
,
`flat`
.

`peak_hours_flat_fee`

currency

optional

Flat peak-hours fee.

`peak_hours_percent`

integer

optional

Percentage peak-hours fee.

`peak_hours_start`

string

optional

Peak-hours start time in
`HH:mm`
format.

`peak_hours_end`

string

optional

Peak-hours end time in
`HH:mm`
format.

`duration_terms`

string

optional

Human-readable duration terms.

`estimated_days`

integer

optional

Estimated service duration in days.

PUT
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
    "currency": "SGD",
    "base_fee": 12.66,
    "estimated_days": 6
}'
```

DELETE
`/v1/service-rates/:id`

## [Delete a Service Rate](#delete-a-service-rate)

Delete a Service Rate.

DELETE
`/v1/service-rates/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/service-rates/:id \
  -H "Authorization: Bearer flb_live_…"
```
