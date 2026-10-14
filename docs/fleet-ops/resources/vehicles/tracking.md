---
title: "Vehicle Tracking"
url: https://fleetbase.io/docs/fleet-ops/resources/vehicles/tracking
module: fleet-ops
---

Vehicles

# Vehicle Tracking

Monitor real-time vehicle position, view trip history, and replay historical routes from the vehicle detail panel.

# Vehicle Tracking

Fleet-Ops tracks vehicle position in real time and stores a complete position history for every vehicle. Position data comes from two sources: the
**Navigator app**
(driver's phone GPS) and
**telematics devices**
(GPS modems installed in the vehicle).

## Real-Time Position

A vehicle's current position is visible in several places:

* **Live Map**
  — vehicle markers update in real time across the fleet-wide map
* **Vehicle Detail Panel → Map**
  tab — focused map view for a single vehicle
* **Driver Detail Panel**
  — shows the driver's current position (tied to their assigned vehicle)
* **Order Detail Panel**
  — shows the assigned vehicle's current position and ETA

Position data includes:

* Latitude and longitude
* Heading (degrees from north)
* Speed (km/h)
* Altitude (meters)
* Last updated timestamp

## Position Sources

| Source | How it works |
| --- | --- |
| **Navigator app** | Driver's phone sends GPS updates via the app — updates every few seconds |
| **Telematics device** | Modem installed in the vehicle sends data to Fleet-Ops via a telematics provider (Flespi, Geotab, Samsara) |
| **Manual update** | Position can be set manually via the API |

Telematics devices are the more reliable source for continuous tracking since they work independently of the driver's phone. See
[Connectivity → Telematics](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview)
for device setup.

## Position History

Every position update is stored as a historical record. To view a vehicle's position history:

1. Open
   **Fleet-Ops → Resources → Vehicles**
2. Click a vehicle to open its detail panel
3. Click the
   **Positions**
   tab

The Positions tab shows a table of all recorded positions with timestamp, coordinates, speed, and heading.

How long that history is kept is set per organization under
**Fleet-Ops → Settings → Telematics**
, within the limit your system administrator allows.

![Telematics settings — how long device events and position history are kept, within the limits set by the system administrator](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-telematics-settings.a31adb8d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Position Replay

The
**Replay**
feature lets you re-watch a vehicle's route from any past period on the map:

1. In the vehicle's
   **Positions**
   tab, click
   **Replay**
2. Select a date range
3. Click
   **Play**
   — the map animates the vehicle's route for the selected period

Replay is useful for:

* Verifying a driver followed the expected route
* Investigating incidents by reviewing the vehicle's exact path
* Checking delivery confirmation times and locations

![Vehicle position replay — animated route on map with time scrubber](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-vehicle-positions.3f9d43cb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Trip History

The
**Positions**
tab also shows trip summaries — groups of positions organized by journey (from start to stop). Each trip shows:

* Start and end time
* Total distance
* Maximum speed
* Duration

## Connected Devices

Vehicles with telematics devices or connected sensors receive richer data beyond basic GPS:

* **OBD-II scanner**
  — engine RPM, fuel level, coolant temperature, fault codes
* **Dash camera**
  — video clips linked to events
* **Temperature sensor**
  — cargo temperature readings for cold chain
* **Door sensor**
  — open/close events

See
[Connectivity → Devices](https://fleetbase.io/docs/fleet-ops/connectivity/devices/overview)
for managing connected devices.

## Geofence Events

If the vehicle enters or exits a configured Service Area or Zone, Fleet-Ops fires geofence events. These can trigger:

* Webhook notifications to your external system
* Driver/operator push notifications
* Dwell time alerts (vehicle stopped for too long)

Configure geofence triggers in the Service Area or Zone settings.
