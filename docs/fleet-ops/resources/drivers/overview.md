---
title: "Drivers"
url: https://fleetbase.io/docs/fleet-ops/resources/drivers/overview
module: fleet-ops
---

Drivers

# Drivers

Create and manage driver profiles — assign vehicles, track real-time location, configure Navigator access, and set Orchestrator constraints.

# Drivers

**Drivers**
are the people who execute orders using the Navigator mobile app. Each driver record links to a Fleetbase user account and stores all the information needed for dispatch, real-time tracking, and Orchestrator assignment.

![Drivers list — name, status badge, current vehicle, online indicator](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-drivers-list.423804e9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Driver Attributes

| Field | Description |
| --- | --- |
| **Name** | Driver's full name |
| **Phone** | Mobile number — used for SMS login and notifications |
| **Email** | Optional — for account notifications |
| **Avatar** | Profile photo shown on the live map and in Navigator |
| **Vehicle** | Default vehicle assigned to this driver |
| **Vendor** | Third-party carrier this driver belongs to (optional) |
| **Driver's License** | License number for compliance records |
| **Skills** | Certifications/skills used by the Orchestrator for assignment |
| **Status** | active, inactive, suspended, on\_leave |
| **Online** | Whether the driver is currently active in Navigator |
| **Location** | Real-time GPS position (latitude, longitude, heading, speed) |
| **Max Travel Time** | Maximum driving time per shift (Orchestrator constraint) |
| **Max Distance** | Maximum route distance (Orchestrator constraint) |
| **Time Window** | Shift start and end times (Orchestrator constraint) |

## Driver Statuses

| Status | Meaning |
| --- | --- |
| `active` | Available for order assignment |
| `inactive` | Not currently working — excluded from Orchestrator |
| `suspended` | Disciplinary hold — excluded from all operations |
| `on_leave` | Temporarily unavailable |

## Creating a Driver

Navigate to
**Fleet-Ops → Resources → Drivers**
.

Click
**+ New Driver**
.

Fill in the driver's name, phone number, and optionally email.

Assign a
**Vehicle**
if the driver has a default vehicle.

Set
**Skills**
if your operation uses skill-based assignment (e.g.,
`hazmat`
,
`refrigerated`
,
`motorcycle`
).

Set
**Orchestrator constraints**
— max travel time, max distance, and time window — if you want the Orchestrator to enforce limits for this driver.

Click
**Save**
. The driver can now log in to the Navigator app using their phone number.

## Driver Detail Panel

Click any driver row to open the detail panel:

* **Overview**
  — contact info, current vehicle, online status, current assignment
* **Map**
  — mini map with current real-time position
* **Orders**
  — order history for this driver with status and timestamps
* **Schedule**
  — shift schedule entries and upcoming assignments
* **Positions**
  — historical GPS track with position replay
* **Issues**
  — reported incidents involving this driver

![Driver detail panel — profile, status, assigned vehicle, licence details, and current location on the map](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-driver-details.54c0c51c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Orchestrator Constraints

Driver constraints control how the Orchestrator allocates orders to this driver:

| Constraint | Effect |
| --- | --- |
| **Skills** | Only assigned orders that require skills this driver has |
| **Max Travel Time** | Total driving time for the route is capped |
| **Max Distance** | Total route distance is capped |
| **Time Window Start** | No orders dispatched before shift start |
| **Time Window End** | No orders extending past shift end time |

Leave constraints blank to allow unrestricted assignment.

## Importing Drivers in Bulk

Click
**Import**
in the drivers list, download the CSV template, fill in your driver data, and upload. Fleet-Ops creates all driver records and they can immediately log in via Navigator using their registered phone number.

## Related Pages

* [Navigator Access](https://fleetbase.io/docs/fleet-ops/resources/drivers/navigator-access)
  — manage app login and permissions
* [Shift Schedules](https://fleetbase.io/docs/fleet-ops/resources/drivers/shift-schedules)
  — configure working hours
* [Navigator App Setup](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  — install and connect the mobile app
