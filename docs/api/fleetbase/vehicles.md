---
title: "Vehicles"
url: https://fleetbase.io/docs/api/fleetbase/vehicles
module: api
---

# Vehicles

Vehicles represent fleet assets that can be tracked, assigned, and used to fulfill orders. Use vehicle endpoints to manage registration details, assignment state, live location, and operational status.

* [The Vehicle object](#the-vehicle-object)
* [Create a Vehicle

  POST
  `/v1/vehicles`](#create-a-vehicle)
* [Query Vehicles

  GET
  `/v1/vehicles`](#query-vehicles)
* [Retrieve a Vehicle

  GET
  `/v1/vehicles/:id`](#retrieve-a-vehicle)
* [Expand a Vehicle

  GET
  `/v1/vehicles/:id?with[]=vendor&with[]=not_a_relation`](#expand-a-vehicle)
* [Expand a Vehicle Scalar

  GET
  `/v1/vehicles/:id?with=vendor`](#expand-a-vehicle-scalar)
* [Update a Vehicle

  PUT
  `/v1/vehicles/:id`](#update-a-vehicle)
* [Delete a Vehicle

  DELETE
  `/v1/vehicles/:id`](#delete-a-vehicle)
* [Track Vehicle

  PATCH
  `/v1/vehicles/:id/track`](#track-vehicle)

## The Vehicle object

A vehicle represents a trackable asset used for Fleet-Ops assignment, routing, and capacity planning. It stores vehicle identity, status, assignment, current position, capacity, dimensions, engine and regulatory specifications, financing, orchestrator constraints, and metadata.
Each relationship appears twice, and the two are separate keys. `<name>\_id` is the related resource's public ID and is always present. `<name>` is the nested object and is returned only when the relationship was asked for through `?with=`; it is never a string. Internal uuid columns are never part of the public contract.

Attributes

`id`

string

optional

Public vehicle identifier.

`internal_id`

string

optional

Optional internal identifier.

`photo_url`

string

optional

Vehicle photo URL.

`avatar_url`

string

optional

Vehicle avatar URL.

`name`

string

optional

Vehicle display name.

`description`

string

optional

Vehicle description.

`driver`

object

optional

The assigned driver, returned only when requested through
`with=driver`
. Never a string — read
`driver_id`
for the identifier.

`devices`

array of objects

optional

Vehicle devices, when loaded.

`make`

string

optional

Vehicle manufacturer.

`model`

string

optional

Vehicle model.

`model_type`

string

optional

Vehicle model type.

`year`

integer

optional

Model year.

`trim`

string

optional

Vehicle trim.

`type`

string

optional

Vehicle type.

`class`

string

optional

Vehicle class.

`color`

string

optional

Vehicle color.

`serial_number`

string

optional

Vehicle serial number.

`plate_number`

string

optional

License plate number.

`call_sign`

string

optional

Vehicle call sign.

`fuel_card_number`

string

optional

Fuel card number assigned to the vehicle.

`vin`

string

optional

Vehicle identification number.

`vin_data`

object

optional

Decoded VIN data.

`specs`

object

optional

Vehicle specification data.

`details`

object

optional

Additional vehicle detail data.

`status`

enum

optional

Vehicle operational status.
`active`
is accepted on input and stored as
`available`
. One of
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`online`

boolean

optional

Whether the vehicle is online.

`slug`

string

optional

URL-friendly vehicle slug.

`financing_status`

string

optional

Vehicle financing status.

`measurement_system`

string

optional

Measurement system used for vehicle metrics.

`odometer`

number

optional

Current odometer reading.

`odometer_unit`

string

optional

Unit for odometer readings.

`fuel_type`

string

optional

Vehicle fuel type.

`payload_capacity`

number

optional

Payload capacity.

`towing_capacity`

number

optional

Towing capacity.

`seating_capacity`

integer

optional

Seating capacity.

`weight`

number

optional

Vehicle weight.

`length`

number

optional

Vehicle length.

`width`

number

optional

Vehicle width.

`height`

number

optional

Vehicle height.

`currency`

currency

optional

Currency for vehicle financial fields.

`acquisition_cost`

currency

optional

Acquisition cost.

`current_value`

currency

optional

Current vehicle value.

`purchased_at`

timestamp

optional

Purchase timestamp.

`lease_expires_at`

timestamp

optional

Lease expiration timestamp.

`deleted_at`

timestamp

optional

Deletion timestamp when soft deleted.

`updated_at`

timestamp

optional

Timestamp when the vehicle was last updated.

`created_at`

timestamp

optional

Timestamp when the vehicle was created.

`location`

object

optional

Current vehicle coordinates.

`heading`

integer

optional

Current heading in degrees.

`altitude`

integer

optional

Current altitude.

`speed`

integer

optional

Current speed.

`telematics`

object

optional

Telematics payload.

`notes`

string

optional

Vehicle notes.

`meta`

object

optional

Additional vehicle metadata.

`driver_id`

string

optional

Public ID of the assigned driver, or
`null`
. Always present.

`vendor_id`

string

optional

Public ID of the assigned vendor, or
`null`
. Always present.

`category_id`

string

optional

Public ID of the assigned category, or
`null`
. Always present.

`warranty_id`

string

optional

Public ID of the assigned warranty, or
`null`
. Always present.

`photo_id`

string

optional

Public ID of the vehicle photo file, or
`null`
. Always present.
`photo_url`
beside it is a convenience URL, and
`avatar_url`
is a separate display asset that is not a file reference.

`vendor`

object

optional

The assigned vendor, returned only when requested through
`with=vendor`
. Never a string — read
`vendor_id`
for the identifier.

`category`

object

optional

The assigned category, returned only when requested through
`with=category`
.

`warranty`

object

optional

The assigned warranty, returned only when requested through
`with=warranty`
.

`photo`

object

optional

The vehicle photo file, returned only when requested through
`with=photo`
.

`skills`

array of strings

optional

Capabilities the vehicle offers for orchestrator assignment.

`payload_capacity_volume`

number

optional

Payload volume capacity used by orchestrator assignment.

`payload_capacity_pallets`

integer

optional

Pallet capacity used by orchestrator assignment.

`payload_capacity_parcels`

integer

optional

Parcel capacity used by orchestrator assignment.

`max_tasks`

integer

optional

Maximum concurrent tasks for orchestrator assignment.

`time_window_start`

string

optional

Earliest time of day the vehicle is available.

`time_window_end`

string

optional

Latest time of day the vehicle is available.

`return_to_depot`

boolean

optional

Whether the vehicle should return to depot after assigned work.

`fuel_volume_unit`

string

optional

Unit for fuel volumes.

`odometer_at_purchase`

number

optional

Odometer reading at the time of purchase.

`transmission`

string

optional

Transmission type.

`body_type`

string

optional

Vehicle body type.

`body_sub_type`

string

optional

Vehicle body sub type.

`usage_type`

string

optional

How the vehicle is used.

`ownership_type`

string

optional

How the vehicle is held.

`cargo_volume`

number

optional

Cargo volume.

`passenger_volume`

number

optional

Passenger volume.

`interior_volume`

number

optional

Total interior volume.

`ground_clearance`

number

optional

Ground clearance.

`bed_length`

number

optional

Bed length.

`fuel_capacity`

number

optional

Fuel tank capacity.

`emission_standard`

string

optional

Emission standard the vehicle meets.

`dpf_equipped`

boolean

optional

Whether a diesel particulate filter is fitted.

`scr_equipped`

boolean

optional

Whether selective catalytic reduction is fitted.

`gvwr`

number

optional

Gross vehicle weight rating.

`gcwr`

number

optional

Gross combined weight rating.

`engine_number`

string

optional

Engine number.

`engine_make`

string

optional

Engine manufacturer.

`engine_model`

string

optional

Engine model.

`engine_family`

string

optional

Engine family.

`engine_configuration`

string

optional

Engine configuration.

`engine_size`

number

optional

Engine size.

`engine_displacement`

number

optional

Engine displacement.

`cylinder_arrangement`

string

optional

Cylinder arrangement.

`number_of_cylinders`

integer

optional

Number of cylinders.

`horsepower`

number

optional

Engine horsepower.

`horsepower_rpm`

integer

optional

RPM at which peak horsepower is produced.

`torque`

number

optional

Engine torque.

`torque_rpm`

integer

optional

RPM at which peak torque is produced.

`estimated_service_life_distance`

integer

optional

Estimated service life expressed as a distance.

`estimated_service_life_distance_unit`

string

optional

Unit for the estimated service life distance.

`estimated_service_life_months`

integer

optional

Estimated service life expressed in months.

`financing_status`

string

optional

Vehicle financing status.

`insurance_value`

currency

optional

Insured value.

`depreciation_rate`

number

optional

Depreciation rate.

`loan_amount`

number

optional

Loan principal.

`loan_number_of_payments`

integer

optional

Number of loan payments.

`loan_first_payment`

date

optional

Date of the first loan payment.

The
Vehicle
object

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "photo_url": null,
  "avatar_url": null,
  "name": "ABC123",
  "description": null,
  "driver": null,
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "vin": "1GCGSBEA0G1111111",
  "status": "operational",
  "online": false,
  "payload_capacity": 500,
  "fuel_card_number": "FC-1001",
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "skills": [
    "tail_lift"
  ],
  "max_tasks": 40,
  "time_window_start": "08:00:00",
  "time_window_end": "18:00:00",
  "return_to_depot": true,
  "location": {
    "latitude": 40.7484,
    "longitude": -73.9857
  },
  "heading": 0,
  "altitude": 0,
  "speed": 0,
  "notes": null,
  "meta": {},
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/vehicles`

## [Create a Vehicle](#create-a-vehicle)

Creates a vehicle for the current organization.

Every safe business field the vehicle record holds is accepted: identity and description, odometer and measurement, body, capacity and dimensions, lifecycle and financing, regulatory and engine specifications, structured
`specs`
/
`details`
/
`meta`
, orchestrator constraints, and the vendor, driver, category and warranty relationships.

Relationships take public IDs (
`vendor_...`
,
`driver_...`
,
`category_...`
,
`warranty_...`
) and are resolved inside the authenticated organization; another organization's public ID is rejected exactly as a non-existent one is. Server-managed values — decoded
`vin_data`
,
`telematics`
, the generated
`slug`
, and every internal uuid column — are not accepted as input.

Body parameters

`internal_id`

string

optional

The identifier the operator's own system uses for this vehicle. Queryable through
`?internal_id=`
.

`name`

string

optional

Vehicle display name.

`description`

string

optional

Free-text description of the vehicle.

`make`

string

optional

Vehicle manufacturer.

`model`

string

optional

Vehicle model.

`model_type`

string

optional

Vehicle model type or variant family.

`year`

integer

optional

Model year of the vehicle.

`trim`

string

optional

Vehicle trim or variant.

`color`

string

optional

Vehicle colour.

`type`

string

optional

Vehicle type.

`class`

string

optional

Vehicle class.

`plate_number`

string

optional

Vehicle licence plate number. Queryable through
`?plate_number=`
.

`vin`

string

optional

Vehicle identification number. Updating it re-runs VIN decoding. Queryable through
`?vin=`
.

`serial_number`

string

optional

Vehicle serial number.

`call_sign`

string

optional

Vehicle call sign.

`fuel_card_number`

string

optional

Fuel card number assigned to the vehicle.

`odometer`

number

optional

Current odometer reading. Must be zero or greater.

`odometer_unit`

string

optional

Unit for odometer readings, for example
`km`
or
`mi`
.

`odometer_at_purchase`

number

optional

Odometer reading at the time of purchase.

`measurement_system`

string

optional

Measurement system used for the vehicle's metrics, for example
`metric`
or
`imperial`
.

`fuel_type`

string

optional

Vehicle fuel type.

`fuel_volume_unit`

string

optional

Unit for fuel volumes, for example
`l`
or
`gal`
.

`online`

boolean

optional

Default:
`false`

Whether the vehicle is online. On create it defaults to
`false`
; on update it is left alone unless it is sent.

`status`

enum

optional

Vehicle operational status.
`active`
is accepted and stored as
`available`
. One of
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`transmission`

string

optional

Transmission type.

`body_type`

string

optional

Vehicle body type.

`body_sub_type`

string

optional

Vehicle body sub type.

`usage_type`

string

optional

How the vehicle is used, for example
`commercial`
.

`ownership_type`

string

optional

How the vehicle is held, for example
`owned`
or
`leased`
.

`cargo_volume`

number

optional

Cargo volume.

`passenger_volume`

number

optional

Passenger volume.

`interior_volume`

number

optional

Total interior volume.

`weight`

number

optional

Vehicle weight.

`width`

number

optional

Vehicle width.

`length`

number

optional

Vehicle length.

`height`

number

optional

Vehicle height.

`towing_capacity`

number

optional

Towing capacity.

`payload_capacity`

number

optional

Payload capacity.

`seating_capacity`

integer

optional

Seating capacity.

`ground_clearance`

number

optional

Ground clearance.

`bed_length`

number

optional

Bed length.

`fuel_capacity`

number

optional

Fuel tank capacity.

`financing_status`

string

optional

Vehicle financing status.

`loan_number_of_payments`

integer

optional

Number of loan payments.

`loan_first_payment`

date

optional

Date of the first loan payment.

`loan_amount`

number

optional

Loan principal.

`estimated_service_life_distance_unit`

string

optional

Unit for the estimated service life distance.

`estimated_service_life_distance`

integer

optional

Estimated service life expressed as a distance.

`estimated_service_life_months`

integer

optional

Estimated service life expressed in months.

`insurance_value`

number

optional

Insured value.

`depreciation_rate`

number

optional

Depreciation rate.

`current_value`

number

optional

Current vehicle value.

`acquisition_cost`

number

optional

Acquisition cost.

`currency`

string

optional

Three-letter currency code for the vehicle's monetary fields.

`purchased_at`

timestamp

optional

When the vehicle was purchased.

`lease_expires_at`

timestamp

optional

When the vehicle's lease expires.

`emission_standard`

string

optional

Emission standard the vehicle meets, for example
`euro6`
.

`dpf_equipped`

boolean

optional

Whether a diesel particulate filter is fitted.

`scr_equipped`

boolean

optional

Whether selective catalytic reduction is fitted.

`gvwr`

number

optional

Gross vehicle weight rating.

`gcwr`

number

optional

Gross combined weight rating.

`engine_number`

string

optional

Engine number.

`engine_model`

string

optional

Engine model.

`engine_make`

string

optional

Engine manufacturer.

`engine_family`

string

optional

Engine family.

`engine_configuration`

string

optional

Engine configuration.

`engine_displacement`

number

optional

Engine displacement.

`engine_size`

number

optional

Engine size.

`horsepower`

number

optional

Engine horsepower.

`horsepower_rpm`

integer

optional

RPM at which peak horsepower is produced.

`torque`

number

optional

Engine torque.

`torque_rpm`

integer

optional

RPM at which peak torque is produced.

`number_of_cylinders`

integer

optional

Number of cylinders.

`cylinder_arrangement`

string

optional

Cylinder arrangement, for example
`I4`
or
`V6`
.

`specs`

object

optional

Structured vehicle specification data.

`details`

object

optional

Structured additional vehicle detail data.

`notes`

string

optional

Free-text notes about the vehicle.

`meta`

object

optional

Additional vehicle metadata.

`skills`

array of strings

optional

Capabilities the vehicle offers for orchestrator assignment, for example
`tail_lift`
.

`payload_capacity_volume`

number

optional

Payload volume capacity used by orchestrator assignment.

`payload_capacity_pallets`

integer

optional

Pallet capacity used by orchestrator assignment.

`payload_capacity_parcels`

integer

optional

Parcel capacity used by orchestrator assignment.

`max_tasks`

integer

optional

Maximum concurrent tasks for orchestrator assignment.

`time_window_start`

string

optional

Earliest time of day the vehicle is available, as
`HH:MM`
.

`time_window_end`

string

optional

Latest time of day the vehicle is available, as
`HH:MM`
.

`return_to_depot`

boolean

optional

Whether the vehicle should return to depot after assigned work.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
). Send
`null`
to clear. Must belong to the authenticated organization.

`driver`

string

optional

Driver public ID (
`driver_...`
) to assign this vehicle to. Send an empty value to unassign the current driver. Must belong to the authenticated organization.

`category`

string

optional

Category public ID (
`category_...`
). Send
`null`
to clear.

`warranty`

string

optional

Warranty public ID (
`warranty_...`
). Send
`null`
to clear.

`photo`

string

optional

File public ID (
`file_...`
) to use as the vehicle photo.

`location`

object

optional

Resolvable point used as the vehicle's current location.

`latitude`

number

optional

Decimal latitude. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude. Required with
`latitude`
.

`altitude`

number

optional

Current altitude.

`heading`

number

optional

Current heading in degrees.

`speed`

number

optional

Current speed.

POST
`/v1/vehicles`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/vehicles \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "description": "City route van",
  "vin": "1GCGSBEA0G1111111",
  "year": 2023,
  "make": "Toyota",
  "model": "Camry",
  "trim": "SE",
  "color": "White",
  "type": "sedan",
  "class": "N1",
  "plate_number": "ABC123",
  "serial_number": "SER-1001",
  "call_sign": "DEPOT-1",
  "fuel_card_number": "FC-1001",
  "status": "maintenance",
  "online": false,
  "odometer": 41000,
  "odometer_unit": "km",
  "odometer_at_purchase": 12,
  "measurement_system": "metric",
  "fuel_type": "diesel",
  "fuel_volume_unit": "l",
  "transmission": "automatic",
  "body_type": "sedan",
  "seating_capacity": 5,
  "weight": 1620.5,
  "payload_capacity": 1400,
  "fuel_capacity": 60,
  "currency": "SGD",
  "purchased_at": "2026-01-02",
  "loan_first_payment": "2026-02-15",
  "loan_amount": 32000,
  "insurance_value": 41000,
  "depreciation_rate": 12.5,
  "current_value": 38000,
  "acquisition_cost": 52000,
  "engine_number": "ENG-1001",
  "number_of_cylinders": 4,
  "latitude": 40.7484,
  "longitude": -73.9857,
  "specs": { "doors": 4 },
  "details": { "liftgate": true },
  "notes": "City route pool",
  "meta": { "depot": "north" },
  "skills": ["tail_lift"],
  "max_tasks": 40,
  "time_window_start": "08:00",
  "time_window_end": "18:00",
  "return_to_depot": true,
  "vendor": "{{vendor_id}}"
}'
```

Other ways to call this

* Created
* Unprocessable Entity
* Not Found

201

OK

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "vin": "1GCGSBEA0G1111111",
  "photo_url": "https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/vehicle-placeholder.png",
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "status": "maintenance",
  "online": false,
  "odometer": 41000,
  "odometer_unit": "km",
  "skills": [
    "tail_lift"
  ],
  "max_tasks": null,
  "time_window_start": null,
  "time_window_end": null,
  "return_to_depot": true,
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "meta": {
    "depot": "north"
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/vehicles`

## [Query Vehicles](#query-vehicles)

This endpoint allows you to query vehicles you have created, it also provides paginated results on all the vehicles in your Fleetbase.

Query parameters

`query`

string

optional

Free-text search across the vehicle's searchable fields.

`internal_id`

string

optional

Filter by the identifier the operator's own system uses.
**Exact match**
on the public API:
`VEH-10`
returns only
`VEH-10`
, never
`VEH-100`
. That is what lets an importer use it to decide between update and create. (The Fleet-Ops console does a partial search on the same field; that behaviour is internal to the console and not part of this contract.)

`plate_number`

string

optional

Filter by licence plate number.

`vin`

string

optional

Filter by vehicle identification number.

`public_id`

string

optional

Filter by vehicle public ID (
`vehicle_...`
). Exact match.

`display_name`

string

optional

Filter across year, make, model and plate number together.

`vehicle_make`

string

optional

Filter by manufacturer.

`vehicle_model`

string

optional

Filter by model.

`vehicle_year`

string

optional

Filter by model year.

`vendor`

string

optional

Filter by vendor, given as its public ID (
`vendor_...`
) or internal ID.

`driver`

string

optional

Filter by assigned driver, given as its public ID (
`driver_...`
) or internal ID. Pass
`unassigned`
to return vehicles with no driver.

`fleet`

string

optional

Filter to the vehicles in a fleet, given as its public ID (
`fleet_...`
).

`assigned_fleet`

string

optional

Pass
`false`
to return vehicles that belong to no fleet.

`limit`

integer

optional

Maximum number of vehicles to return.

`offset`

integer

optional

Number of vehicles to skip before returning results.

`sort`

string

optional

Sort expression for the vehicle query.

`with`

array of strings

optional

Relationships to expand. Accepted as
`?with=vendor`
,
`?with[]=vendor`
,
`?with[]=vendor&with[]=driver`
and
`?with=vendor,driver`
;
`expand`
is an alias for all four. A relationship named here is additionally returned as a nested object — it never replaces or retypes the
`<name>_id`
identifier, which is always present. A name outside the supported set is ignored rather than rejected.

GET
`/v1/vehicles`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles?query={{vehicle_name}}&limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
[
  {
    "id": "vehicle_7YqM3KpL2n",
    "internal_id": "VEH-1001",
    "name": "Depot Van",
    "vin": "1GCGSBEA0G1111111",
    "photo_url": "https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/vehicle-placeholder.png",
    "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/vehicle-icons/mini_bus.svg",
    "make": "Toyota",
    "model": "Camry",
    "year": "2023",
    "trim": "SE",
    "type": "sedan",
    "plate_number": "ABC123",
    "fuel_card_number": "FC-1001",
    "status": "available",
    "online": false,
    "odometer": 41000,
    "odometer_unit": "km",
    "currency": "SGD",
    "purchased_at": "2026-01-02T00:00:00.000000Z",
    "location": {
      "type": "Point",
      "coordinates": [
        -73.9857,
        40.7484
      ]
    },
    "driver_id": null,
    "vendor_id": "vendor_5Nq8Tz1Wm4",
    "category_id": null,
    "warranty_id": null,
    "photo_id": null,
    "specs": {
      "doors": 4
    },
    "details": {
      "liftgate": true
    },
    "notes": "City route pool",
    "meta": {
      "depot": "north"
    },
    "updated_at": "2026-05-07T08:30:00.000000Z",
    "created_at": "2026-05-07T08:30:00.000000Z"
  }
]
```

GET
`/v1/vehicles/:id`

## [Retrieve a Vehicle](#retrieve-a-vehicle)

Retrieve details for a specific
`Vehicle`
.

GET
`/v1/vehicles/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "vin": "1GCGSBEA0G1111111",
  "photo_url": "https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/vehicle-placeholder.png",
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/vehicle-icons/mini_bus.svg",
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "fuel_card_number": "FC-1001",
  "status": "available",
  "online": false,
  "odometer": 41000,
  "odometer_unit": "km",
  "currency": "SGD",
  "purchased_at": "2026-01-02T00:00:00.000000Z",
  "location": {
    "type": "Point",
    "coordinates": [
      -73.9857,
      40.7484
    ]
  },
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "specs": {
    "doors": 4
  },
  "details": {
    "liftgate": true
  },
  "notes": "City route pool",
  "meta": {
    "depot": "north"
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/vehicles/:id?with[]=vendor&with[]=not_a_relation`

## [Expand a Vehicle](#expand-a-vehicle)

Retrieves a vehicle with its vendor expanded, using the array form of the expansion parameter.

Both
`?with=vendor`
and
`?with[]=vendor`
are accepted, as are
`?with=vendor,driver`
and the
`expand`
alias. Expansion is strictly additive: it adds the nested object and leaves
`vendor_id`
exactly as it was. A relationship name outside the supported set is ignored rather than rejected, so a client sending a relation this version does not have still gets its response.

GET
`/v1/vehicles/:id?with[]=vendor&with[]=not_a_relation`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles/:id?with[]=vendor&with[]=not_a_relation \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "vin": "1GCGSBEA0G1111111",
  "photo_url": "https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/vehicle-placeholder.png",
  "avatar_url": "https://flb-assets.s3-ap-southeast-1.amazonaws.com/static/vehicle-icons/mini_bus.svg",
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "trim": "SE",
  "type": "sedan",
  "plate_number": "ABC123",
  "fuel_card_number": "FC-1001",
  "status": "available",
  "online": false,
  "odometer": 41000,
  "odometer_unit": "km",
  "currency": "SGD",
  "purchased_at": "2026-01-02T00:00:00.000000Z",
  "location": {
    "type": "Point",
    "coordinates": [
      -73.9857,
      40.7484
    ]
  },
  "driver_id": null,
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "vendor": {
    "id": "vendor_5Nq8Tz1Wm4",
    "name": "Acme Logistics"
  },
  "category_id": null,
  "warranty_id": null,
  "photo_id": null,
  "specs": {
    "doors": 4
  },
  "details": {
    "liftgate": true
  },
  "notes": "City route pool",
  "meta": {
    "depot": "north"
  },
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

GET
`/v1/vehicles/:id?with=vendor`

## [Expand a Vehicle Scalar](#expand-a-vehicle-scalar)

The same expansion as
**Expand a Vehicle**
, sent in the scalar comma-separated form.

`?with=vendor,driver`
must behave exactly as
`?with[]=vendor&with[]=driver`
does. This request exists so the two spellings are proven equivalent rather than assumed to be.

GET
`/v1/vehicles/:id?with=vendor`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles/:id?with=vendor?with=vendor \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

PUT
`/v1/vehicles/:id`

## [Update a Vehicle](#update-a-vehicle)

Updates any safe vehicle field. Updating the VIN re-runs VIN decoding.

A partial update touches only the fields that are sent: omitting
`online`
leaves the vehicle's online state alone rather than taking it offline. Relationship inputs take public IDs and are resolved inside the authenticated organization; sending
`null`
clears the assignment, and sending an empty
`driver`
unassigns the current driver.

Body parameters

`internal_id`

string

optional

The identifier the operator's own system uses for this vehicle. Queryable through
`?internal_id=`
.

`name`

string

optional

Vehicle display name.

`description`

string

optional

Free-text description of the vehicle.

`make`

string

optional

Vehicle manufacturer.

`model`

string

optional

Vehicle model.

`model_type`

string

optional

Vehicle model type or variant family.

`year`

integer

optional

Model year of the vehicle.

`trim`

string

optional

Vehicle trim or variant.

`color`

string

optional

Vehicle colour.

`type`

string

optional

Vehicle type.

`class`

string

optional

Vehicle class.

`plate_number`

string

optional

Vehicle licence plate number. Queryable through
`?plate_number=`
.

`vin`

string

optional

Vehicle identification number. Updating it re-runs VIN decoding. Queryable through
`?vin=`
.

`serial_number`

string

optional

Vehicle serial number.

`call_sign`

string

optional

Vehicle call sign.

`fuel_card_number`

string

optional

Fuel card number assigned to the vehicle.

`odometer`

number

optional

Current odometer reading. Must be zero or greater.

`odometer_unit`

string

optional

Unit for odometer readings, for example
`km`
or
`mi`
.

`odometer_at_purchase`

number

optional

Odometer reading at the time of purchase.

`measurement_system`

string

optional

Measurement system used for the vehicle's metrics, for example
`metric`
or
`imperial`
.

`fuel_type`

string

optional

Vehicle fuel type.

`fuel_volume_unit`

string

optional

Unit for fuel volumes, for example
`l`
or
`gal`
.

`online`

boolean

optional

Default:
`false`

Whether the vehicle is online. On create it defaults to
`false`
; on update it is left alone unless it is sent.

`status`

enum

optional

Vehicle operational status.
`active`
is accepted and stored as
`available`
. One of
`active`
,
`available`
,
`in_use`
,
`maintenance`
,
`out_of_service`
,
`reserved`
,
`retired`
,
`staging`
,
`on_route`
,
`idle`
,
`cleaning`
,
`awaiting_parts`
,
`inspection_due`
,
`inspection_failed`
,
`accident`
,
`compliance_hold`
,
`stolen`
,
`operational`
,
`decommissioned`
.

`transmission`

string

optional

Transmission type.

`body_type`

string

optional

Vehicle body type.

`body_sub_type`

string

optional

Vehicle body sub type.

`usage_type`

string

optional

How the vehicle is used, for example
`commercial`
.

`ownership_type`

string

optional

How the vehicle is held, for example
`owned`
or
`leased`
.

`cargo_volume`

number

optional

Cargo volume.

`passenger_volume`

number

optional

Passenger volume.

`interior_volume`

number

optional

Total interior volume.

`weight`

number

optional

Vehicle weight.

`width`

number

optional

Vehicle width.

`length`

number

optional

Vehicle length.

`height`

number

optional

Vehicle height.

`towing_capacity`

number

optional

Towing capacity.

`payload_capacity`

number

optional

Payload capacity.

`seating_capacity`

integer

optional

Seating capacity.

`ground_clearance`

number

optional

Ground clearance.

`bed_length`

number

optional

Bed length.

`fuel_capacity`

number

optional

Fuel tank capacity.

`financing_status`

string

optional

Vehicle financing status.

`loan_number_of_payments`

integer

optional

Number of loan payments.

`loan_first_payment`

date

optional

Date of the first loan payment.

`loan_amount`

number

optional

Loan principal.

`estimated_service_life_distance_unit`

string

optional

Unit for the estimated service life distance.

`estimated_service_life_distance`

integer

optional

Estimated service life expressed as a distance.

`estimated_service_life_months`

integer

optional

Estimated service life expressed in months.

`insurance_value`

number

optional

Insured value.

`depreciation_rate`

number

optional

Depreciation rate.

`current_value`

number

optional

Current vehicle value.

`acquisition_cost`

number

optional

Acquisition cost.

`currency`

string

optional

Three-letter currency code for the vehicle's monetary fields.

`purchased_at`

timestamp

optional

When the vehicle was purchased.

`lease_expires_at`

timestamp

optional

When the vehicle's lease expires.

`emission_standard`

string

optional

Emission standard the vehicle meets, for example
`euro6`
.

`dpf_equipped`

boolean

optional

Whether a diesel particulate filter is fitted.

`scr_equipped`

boolean

optional

Whether selective catalytic reduction is fitted.

`gvwr`

number

optional

Gross vehicle weight rating.

`gcwr`

number

optional

Gross combined weight rating.

`engine_number`

string

optional

Engine number.

`engine_model`

string

optional

Engine model.

`engine_make`

string

optional

Engine manufacturer.

`engine_family`

string

optional

Engine family.

`engine_configuration`

string

optional

Engine configuration.

`engine_displacement`

number

optional

Engine displacement.

`engine_size`

number

optional

Engine size.

`horsepower`

number

optional

Engine horsepower.

`horsepower_rpm`

integer

optional

RPM at which peak horsepower is produced.

`torque`

number

optional

Engine torque.

`torque_rpm`

integer

optional

RPM at which peak torque is produced.

`number_of_cylinders`

integer

optional

Number of cylinders.

`cylinder_arrangement`

string

optional

Cylinder arrangement, for example
`I4`
or
`V6`
.

`specs`

object

optional

Structured vehicle specification data.

`details`

object

optional

Structured additional vehicle detail data.

`notes`

string

optional

Free-text notes about the vehicle.

`meta`

object

optional

Additional vehicle metadata.

`skills`

array of strings

optional

Capabilities the vehicle offers for orchestrator assignment, for example
`tail_lift`
.

`payload_capacity_volume`

number

optional

Payload volume capacity used by orchestrator assignment.

`payload_capacity_pallets`

integer

optional

Pallet capacity used by orchestrator assignment.

`payload_capacity_parcels`

integer

optional

Parcel capacity used by orchestrator assignment.

`max_tasks`

integer

optional

Maximum concurrent tasks for orchestrator assignment.

`time_window_start`

string

optional

Earliest time of day the vehicle is available, as
`HH:MM`
.

`time_window_end`

string

optional

Latest time of day the vehicle is available, as
`HH:MM`
.

`return_to_depot`

boolean

optional

Whether the vehicle should return to depot after assigned work.

`vendor`

string

optional

Vendor public ID (
`vendor_...`
). Send
`null`
to clear. Must belong to the authenticated organization.

`driver`

string

optional

Driver public ID (
`driver_...`
) to assign this vehicle to. Send an empty value to unassign the current driver. Must belong to the authenticated organization.

`category`

string

optional

Category public ID (
`category_...`
). Send
`null`
to clear.

`warranty`

string

optional

Warranty public ID (
`warranty_...`
). Send
`null`
to clear.

`photo`

string

optional

File public ID (
`file_...`
) to use as the vehicle photo.

`location`

object

optional

Resolvable point used as the vehicle's current location.

`latitude`

number

optional

Decimal latitude. Required with
`longitude`
.

`longitude`

number

optional

Decimal longitude. Required with
`latitude`
.

`altitude`

number

optional

Current altitude.

`heading`

number

optional

Current heading in degrees.

`speed`

number

optional

Current speed.

PUT
`/v1/vehicles/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/vehicles/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "plate_number": "ABC123",
    "status": "operational",
    "odometer": 41250,
    "color": "Silver",
    "body_type": "sedan",
    "transmission": "automatic",
    "seating_capacity": 5,
    "currency": "SGD",
    "purchased_at": "2026-01-02",
    "specs": { "doors": 4 },
    "details": { "liftgate": true },
    "meta": { "depot": "south" },
    "latitude": 40.7484,
    "longitude": -73.9857,
    "speed": 90
}'
```

Other ways to call this

* OK

200

OK

```
{
  "id": "vehicle_7YqM3KpL2n",
  "internal_id": "VEH-1001",
  "name": "Depot Van",
  "make": "Toyota",
  "model": "Camry",
  "year": "2023",
  "plate_number": "ABC123",
  "color": "Silver",
  "status": "operational",
  "online": false,
  "odometer": 41250,
  "odometer_unit": "km",
  "specs": {
    "doors": 4
  },
  "meta": {
    "depot": "south"
  },
  "vendor_id": "vendor_5Nq8Tz1Wm4",
  "updated_at": "2026-05-07T09:12:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

DELETE
`/v1/vehicles/:id`

## [Delete a Vehicle](#delete-a-vehicle)

Permanently deletes a
`Vehicle`
. It cannot be undone.

DELETE
`/v1/vehicles/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/vehicles/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```

PATCH
`/v1/vehicles/:id/track`

## [Track Vehicle](#track-vehicle)

Body parameters

`latitude`

number

optional

Vehicle latitude. When omitted with
`longitude`
, Fleetbase returns the current vehicle resource without updating location.

`longitude`

number

optional

Vehicle longitude. When omitted with
`latitude`
, Fleetbase returns the current vehicle resource without updating location.

`altitude`

number

optional

Current altitude.

`heading`

number

optional

Current heading in degrees.

`speed`

number

optional

Current speed.

PATCH
`/v1/vehicles/:id/track`

curl

JavaScript

PHP

Python

```
curl -X PATCH https://api.fleetbase.io/v1/vehicles/:id/track \
  -H "Authorization: Bearer flb_live_…"
```
