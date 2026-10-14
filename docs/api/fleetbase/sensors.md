---
title: "Sensors"
url: https://fleetbase.io/docs/api/fleetbase/sensors
module: api
---

# Sensors

Sensors represent measurable telemetry channels such as temperature, door state, vibration, fuel level, or tire pressure.

* [The Sensor object](#the-sensor-object)
* [Create a Sensor

  POST
  `/v1/sensors`](#create-a-sensor)
* [Query Sensors

  GET
  `/v1/sensors`](#query-sensors)
* [Retrieve a Sensor

  GET
  `/v1/sensors`](#retrieve-a-sensor)
* [Update a Sensor

  PUT
  `/v1/sensors`](#update-a-sensor)
* [Delete a Sensor

  DELETE
  `/v1/sensors`](#delete-a-sensor)

## The Sensor object

A sensor stores measurement type, thresholds, latest reading, associated device, and attachment metadata.

Attributes

`id`

string

optional

Public sensor identifier.

`name`

string

optional

Sensor name.

`type`

string

optional

Sensor type.

`device`

string

optional

Device public ID, when loaded.

`unit`

string

optional

Measurement unit.

`last_value`

string

optional

Latest recorded value.

`threshold_status`

string

optional

Derived threshold status.

`status`

string

optional

Sensor status.

`meta`

object

optional

Additional sensor metadata.

The
Sensor
object

```
{
  "id": "sensor_2Qx9KpL7Vz",
  "name": "Cargo Temperature",
  "type": "temperature",
  "unit": "celsius",
  "last_value": "4.2",
  "status": "active",
  "threshold_status": "normal",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/sensors`

## [Create a Sensor](#create-a-sensor)

Create a sensor.

Body parameters

`name`

string

optional

Sensor name.

`type`

string

optional

Sensor type.

`device`

string

optional

Device public ID.

`telematic`

string

optional

Telematic public ID.

`unit`

string

optional

Measurement unit.

`min_threshold`

number

optional

Minimum threshold.

`max_threshold`

number

optional

Maximum threshold.

`sensorable_type`

string

optional

Attachable resource type.

`sensorable`

string

optional

Attachable resource public ID.

POST
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Cargo Temperature",
  "type": "temperature",
  "device": "{{device_id}}",
  "unit": "celsius",
  "status": "active",
  "min_threshold": 0,
  "max_threshold": 8
}'
```

201

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

GET
`/v1/sensors`

## [Query Sensors](#query-sensors)

Query sensors.

Query parameters

`query`

string

optional

Search query for sensors.

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

`type`

string

optional

Filter by sensor type.

`status`

string

optional

Filter by sensor status.

`device`

string

optional

Filter by device public ID or internal ID.

GET
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

GET
`/v1/sensors`

## [Retrieve a Sensor](#retrieve-a-sensor)

Retrieve a sensor.

GET
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

PUT
`/v1/sensors`

## [Update a Sensor](#update-a-sensor)

Update a sensor.

Body parameters

`name`

string

optional

Sensor name.

`type`

string

optional

Sensor type.

`device`

string

optional

Device public ID.

`telematic`

string

optional

Telematic public ID.

`unit`

string

optional

Measurement unit.

`min_threshold`

number

optional

Minimum threshold.

`max_threshold`

number

optional

Maximum threshold.

`sensorable_type`

string

optional

Attachable resource type.

`sensorable`

string

optional

Attachable resource public ID.

PUT
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/sensors \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "last_value": "4.2",
  "last_reading_at": "2026-05-07T08:30:00Z"
}'
```

200

OK

```
{
  "id": "<string>",
  "object": "sensors"
}
```

DELETE
`/v1/sensors`

## [Delete a Sensor](#delete-a-sensor)

Delete a sensor.

DELETE
`/v1/sensors`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/sensors \
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
