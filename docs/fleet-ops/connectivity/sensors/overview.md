---
title: "Sensors"
url: https://fleetbase.io/docs/fleet-ops/connectivity/sensors/overview
module: fleet-ops
---

Sensors

# Sensors

Manage environmental and condition sensors — temperature, humidity, door, pressure, and motion monitoring for cargo and vehicle condition tracking.

# Sensors

**Sensors**
are environmental and condition monitoring devices installed in vehicle cargo areas or attached to equipment. They provide real-time data about the state of the cargo environment (temperature, humidity) or physical events (door opened, impact detected). Sensor data is ingested from telematics devices or directly from connected hardware.

Navigate to
**Fleet-Ops → Connectivity → Sensors**
.

![Sensors list — sensor name, type, linked device, current reading, status](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-sensors-list.29b87b7e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Sensor Types

| Type | Measures | Use case |
| --- | --- | --- |
| **Temperature** | Cargo or ambient temperature (°C/°F) | Cold chain — refrigerated/frozen goods |
| **Humidity** | Relative humidity (%) | Sensitive cargo — pharmaceuticals, electronics |
| **Door** | Open / Closed state | Unauthorized access, cargo security |
| **Pressure** | Tire pressure (PSI/bar) or atmospheric | TPMS, altitude monitoring |
| **Motion** | Vibration, impact, acceleration G-force | Fragile goods, accident detection |
| **Light** | Ambient light level | Cargo area access detection |
| **Fuel Level** | Tank fuel percentage | Fuel tracking, drain detection |

## Sensor Attributes

| Field | Description |
| --- | --- |
| **Name** | Sensor identifier (e.g., "Cargo Temp Sensor 1") |
| **Type** | The sensor type from the list above |
| **Device** | The telematics device or IoT hub this sensor is connected to |
| **Vehicle** | The vehicle this sensor is installed in |
| **Status** | active, inactive, offline, faulty |
| **Current Reading** | Most recent sensor value with timestamp |
| **Alert Thresholds** | Configurable min/max values that trigger alerts |

## Adding a Sensor

Navigate to
**Fleet-Ops → Connectivity → Sensors**
.

Click
**+ New Sensor**
.

Set the
**Name**
and
**Type**
.

Link to the
**Device**
the sensor connects through (e.g., the telematics modem that aggregates sensor data).

Link to the
**Vehicle**
the sensor is installed in.

Set
**Alert Thresholds**
if you want notifications when readings go out of range (e.g., temperature above 8°C for a cold chain vehicle).

Click
**Save**
.

## Sensor Data Flow

```
Physical sensor → Telematics device → Provider cloud → Fleet-Ops ingest → SensorEvent record
                                                              │
                                                         Alert check → Issue / Notification
```

Sensor readings are stored as
**DeviceEvent**
records linked to the sensor and vehicle. These events are viewable in:

* The sensor's detail panel → Events tab
* The device's detail panel → Events tab
* The vehicle's detail panel (aggregated view)

## Alert Thresholds

For each sensor, you can set thresholds that trigger alerts:

| Sensor Type | Example Threshold | Alert |
| --- | --- | --- |
| Temperature | > 8°C | Cold chain breach — notify operator |
| Door | Status = Open for > 5 min | Unauthorized access alert |
| Motion | G-force > 3G | Potential accident — flag for review |
| Pressure | < 28 PSI | Tire pressure warning |

When a threshold is crossed:

* A notification is sent to the configured recipients
* An
  **Issue**
  is optionally created for tracking and resolution
* The event is logged in the vehicle's event history

## Cold Chain Monitoring

For refrigerated and frozen goods transport, sensor monitoring is critical. Fleet-Ops supports:

* Continuous temperature logging throughout the journey
* Min/max temperature recording per trip
* Breach events with exact timestamp and location
* Exportable temperature logs for compliance documentation
