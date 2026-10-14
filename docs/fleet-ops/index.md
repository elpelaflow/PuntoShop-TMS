---
title: "Fleet-Ops"
url: https://fleetbase.io/docs/fleet-ops
module: fleet-ops
---

# Fleet-Ops

Fleet-Ops is the core logistics and fleet management extension for the Fleetbase platform. It gives operations teams a full dispatch console for managing orders, drivers, Vehicles, first-class Trailers, and routes — plus a mobile driver app (Navigator) that handles real-time GPS tracking, turn-by-turn navigation, and proof of delivery capture.

![Fleet-Ops multi-waypoint order showing optimized route across multiple stops with driver assignment and live status timeline](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-details-multi-stop.270a4b7a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## What Fleet-Ops Does

Fleet-Ops covers the full delivery and fleet operations lifecycle in one place:

| Capability | What it covers |
| --- | --- |
| **Order Management** | Create, assign, dispatch, and track deliveries end to end |
| **Live Map** | Real-time driver and vehicle positions with route overlays |
| **Driver App (Navigator)** | Mobile app for drivers — navigation, status updates, POD capture |
| **Fleet & Driver Management** | Organize drivers and vehicles into fleets, track availability and status |
| **Trailer Management** | Manage towed assets, Vehicle connections, equipment, maintenance, devices, and telemetry |
| **Orchestrator** | Multi-phase planner — stack vehicle allocation, driver allocation, and route optimization phases in sequence |
| **Scheduler** | Driver shift scheduling and order timeline management |
| **Order Configurations** | Custom order types with configurable workflows and entity fields |
| **Service Rates & Quotes** | Pricing rules and on-demand quotation for orders |
| **Maintenance** | Preventive schedules, work orders, and parts inventory |
| **Telematics & Connectivity** | Device, sensor, and telematics modem integration |
| **Analytics** | Fleet performance dashboards and custom reports |

## Key Concepts

Fleet-Ops is organized around a few core entities:

* **Order**
  — a delivery or service task with a pickup location, a destination, and items (entities). Orders move through a configurable status lifecycle and are captured with proof of delivery.
* **Driver**
  — a person who executes orders using the Navigator app. Drivers have real-time location, shift schedules, and skill constraints that the Orchestrator uses for assignment.
* **Vehicle**
  — a fleet asset with capacity, location tracking, and maintenance history.
* **Trailer**
  — an independently managed towed asset with effective-dated Vehicle connections, equipment, maintenance, and telematics.
* **Fleet**
  — a logical group of drivers and vehicles, typically scoped to a route, region, or service type.
* **Order Configuration**
  — a template that defines a custom order type: its activity flow, the entity fields required, and the proof of delivery method.

See
[Core Concepts](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)
for a full introduction.

## Getting Started

Get up and running

Create your first order, assign a driver, and dispatch in under 10 minutes.

[Quickstart →](https://fleetbase.io/docs/fleet-ops/getting-started/quickstart)

Understand the basics

Learn the key entities — orders, drivers, vehicles, fleets, and order configurations.

[Core Concepts →](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)

Set up the driver app

Install Navigator and connect drivers before your first dispatch.

[Navigator Setup →](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)

Fleet-Ops comes pre-installed with every Fleetbase instance — both Cloud and self-hosted. No separate installation is required. If you need to set up the Fleetbase platform itself, see
[Running Locally](https://fleetbase.io/docs/platform/quickstart/running-locally)
or
[Deploy in Cloud](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)
.
