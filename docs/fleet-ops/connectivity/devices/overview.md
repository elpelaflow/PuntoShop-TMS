---
title: "Devices"
url: https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview
module: fleet-ops
---

Devices

# Devices

Manage GPS trackers, OBD-II scanners, dash cameras, and other IoT devices connected to Vehicles and Trailers.

# Devices

**Devices**
are physical hardware units connected to fleet assets — GPS trackers, OBD-II scanners, dash cameras, and IoT sensors. While telematics modems are managed in the Telematics section (they bridge to a provider's cloud), Devices tracks the individual hardware installed in or on Vehicles and Trailers.

Navigate to
**Fleet-Ops → Connectivity → Devices**
.

![Devices list — device name, type, category, linked vehicle, status, and last event time](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-devices-list.e799253c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Device Categories

| Category | Examples |
| --- | --- |
| **GPS Tracker** | Standalone GPS tracker (non-OBD), asset tracker |
| **OBD-II Scanner** | Engine diagnostic reader via OBD-II port |
| **Dash Camera** | Front/rear facing cameras, event-triggered video |
| **Temperature Sensor** | Cold chain monitoring sensor |
| **Humidity Sensor** | Cargo humidity monitoring |
| **Door Sensor** | Cargo door open/close detection |
| **Motion Sensor** | Impact or vibration detection |
| **Pressure Sensor** | Tire pressure monitoring (TPMS) |
| **Fuel Level Sensor** | Tank-mounted fuel gauge |

## Device Attributes

| Field | Description |
| --- | --- |
| **Name** | Device identifier |
| **Type** | Specific hardware type |
| **Category** | Device category (GPS, OBD-II, camera, etc.) |
| **Vendor** | Manufacturer or supplier |
| **Description** | Notes about the device |
| **Status** | active, inactive, offline, faulty |
| **Meta** | Additional key-value data (IMEI, firmware, etc.) |

![Device detail panel — connection status, telematics provider, attached vehicle, sensor and event counts, last known location, and hardware details](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-device-details.ec7d2b2e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Adding a Device

Navigate to
**Fleet-Ops → Connectivity → Devices**
.

Click
**+ New Device**
.

Enter the
**Name**
,
**Type**
, and
**Category**
.

Set the
**Vendor**
and any identifying information in
**Meta**
(e.g., IMEI, serial number, firmware version).

Click
**Save**
.

## Linking Devices to Assets

Attach a device to the asset it physically measures. A Trailer tracker remains attached to that Trailer when its towing Vehicle changes.

1. Open the target
   **Vehicle**
   or
   **Trailer**
   detail view
2. Click the
   **Devices**
   tab
3. Click
   **+ Add Device**
   and select from the devices list
4. Set the
   **Mounting Location**
   (e.g., dashboard, cargo area, wheel well)
5. Save

An asset can have multiple devices. For example, a Vehicle might have GPS and OBD-II devices while its connected reefer Trailer has an independent tracker and temperature sensor.

## Device Events

Every time a device sends data, a
**DeviceEvent**
is recorded. These events are visible in the device detail panel:

* GPS coordinates and timestamp
* OBD-II readings (RPM, fuel level, coolant temperature, fault codes)
* Sensor readings (temperature values, door status, motion events)
* Alert events (speeding, harsh braking, engine fault)

View device events at
**Fleet-Ops → Connectivity → Devices → [Device] → Events**
.

## Device Status Monitoring

Device status is updated based on data received:

* `active`
  — data received within the expected interval
* `offline`
  — no data received beyond the expected interval
* `faulty`
  — reporting error codes or data quality issues

Offline devices can be flagged to create an Issue automatically, alerting the fleet manager to investigate.

[Telematics

Connect telematics providers to Fleet-Ops, map devices to Vehicles or Trailers, and receive live telemetry data.](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)
[Sensors

Manage environmental and condition sensors — temperature, humidity, door, pressure, and motion monitoring for cargo and vehicle condition tracking.](https://fleetbase.io/docs/fleet-ops/connectivity/sensors/overview)
