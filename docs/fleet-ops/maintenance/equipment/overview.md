---
title: "Equipment"
url: https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview
module: fleet-ops
---

Equipment

# Equipment

Track auxiliary equipment attached to Vehicles or Trailers, with maintenance schedules, work orders, and warranty coverage.

# Equipment

**Equipment**
tracks auxiliary tools, mounted components, and issued hardware that require their own maintenance schedules and work orders. Equipment can be linked to a Vehicle, Trailer, or Driver and participates in the same maintenance workflow as those resources. Towable units such as dry vans, reefers, flatbeds, tankers, and chassis are first-class
[Trailers](https://fleetbase.io/docs/fleet-ops/resources/trailers/overview)
, not Equipment.

![Equipment list — name, category, assigned vehicle, status, next maintenance date](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-equipment-list.87d5fbc1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## What Equipment Covers

Equipment in Fleet-Ops includes:

* **Attachments**
  — tail lifts, liftgates, cranes, pumps, and ramps
* **Tools**
  — delivery trolleys, pallet jacks, scanners
* **Powered equipment**
  — generators, refrigeration units

Anything that:

1. Has its own service intervals (independent of the vehicle)
2. Needs work orders for repairs and inspections
3. Has a warranty that should be tracked

## Equipment Attributes

| Field | Description |
| --- | --- |
| **Name** | Equipment identifier (e.g., "Pallet Jack 12") |
| **Category** | Type of equipment |
| **Description** | Detailed description |
| **Serial Number** | Manufacturer serial number |
| **Status** | active, inactive, maintenance, retired |
| **Attached Resource** | Vehicle, Trailer, or Driver this equipment is currently attached or issued to |

![Equipment detail panel — code, type and serial number, manufacturer and model, the vehicle it is equipped to, and purchase price and depreciation](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-equipment-details.031b79dd.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Creating Equipment

Navigate to
**Fleet-Ops → Maintenance → Equipment**
.

Click
**+ New Equipment**
.

Enter the
**Name**
,
**Category**
, and
**Description**
.

Set the
**Serial Number**
for identification.

Assign to a
**Vehicle**
,
**Trailer**
, or
**Driver**
if this equipment is currently attached or issued.

Click
**Save**
.

## Maintenance for Equipment

Equipment participates in the same maintenance workflow as vehicles:

* Create
  **Maintenance Schedules**
  for equipment (e.g., refrigeration unit service every 500 hours)
* **Work Orders**
  are generated when thresholds are reached
* **Maintenance History**
  records all services performed

Access these from the Equipment detail panel tabs:
**Schedules**
,
**Work Orders**
,
**Maintenance**
.

## Warranty Tracking

Equipment can have a
**Warranty**
record that tracks:

* Warranty provider and policy number
* Coverage start and end dates
* Covered components
* Warranty claim history

When a warranty is expiring, Fleet-Ops can be configured to send a reminder notification.
