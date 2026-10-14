---
title: "Maintenance Overview"
url: https://fleetbase.io/docs/fleet-ops/maintenance/overview
module: fleet-ops
---

# Maintenance Overview

Manage vehicle and equipment maintenance — preventive schedules, work orders, parts inventory, and maintenance history.

# Maintenance Overview

The
**Maintenance**
section of Fleet-Ops provides tools to keep your fleet in operating condition. It covers preventive maintenance scheduling, work order assignment and tracking, parts inventory, and equipment management.

![Fleet-Ops maintenance sidebar — Schedules, Work Orders, Maintenances, Equipment, Parts](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-maintenances-list.64d17c52.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## What's in Maintenance

| Section | Purpose |
| --- | --- |
| [**Inspections**](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview) | Inspection forms, inspections filed from the console or through a secure link, and follow-up of failed checks |
| [**Schedules**](https://fleetbase.io/docs/fleet-ops/maintenance/schedules/overview) | Preventive maintenance rules — trigger work orders by mileage, engine hours, or date |
| [**Work Orders**](https://fleetbase.io/docs/fleet-ops/maintenance/work-orders/overview) | Task assignments for maintenance, repairs, and inspections |
| **Maintenances** | Completed maintenance history records |
| [**Equipment**](https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview) | Tools, trailers, containers, and other fleet assets |
| [**Parts**](https://fleetbase.io/docs/fleet-ops/maintenance/parts/overview) | Parts inventory used in work orders |

## How Maintenance Works

The maintenance workflow has three stages:

1. **Schedule**
   — define a preventive maintenance rule for a vehicle or piece of equipment. Set the trigger (every 10,000 km, every 6 months, every 500 engine hours). When the threshold is reached, a work order is automatically generated.
2. **Work Order**
   — the work order is assigned to a mechanic or driver. It contains a checklist of tasks, cost estimates, and a due date. Status progresses from open → in\_progress → completed.
3. **History**
   — completed work orders create maintenance history records linked to the vehicle. These records show all services performed, parts used, and costs incurred over the vehicle's lifetime.

## Integration with Vehicles

Maintenance is tightly integrated with vehicle records:

* Each vehicle has a
  **Schedules**
  tab showing all maintenance rules
* Each vehicle has a
  **Work Orders**
  tab showing open and completed tasks
* Each vehicle has a
  **Maintenance**
  tab showing the full service history
* Each vehicle has an
  **Inspections**
  tab showing every inspection filed against it

When a vehicle is set to
`maintenance`
status, it is automatically excluded from Orchestrator allocation runs.

## Accessing Maintenance

Navigate to
**Fleet-Ops → Maintenance**
in the left sidebar. The sub-sections (Inspection Forms, Inspections, Schedules, Work Orders, Equipment, Parts) are listed below.
