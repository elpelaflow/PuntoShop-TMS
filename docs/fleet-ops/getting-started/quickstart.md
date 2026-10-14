---
title: "Quickstart"
url: https://fleetbase.io/docs/fleet-ops/getting-started/quickstart
module: fleet-ops
---

# Quickstart

Get up and running with Fleet-Ops in minutes — create your first order, assign a driver, and dispatch.

# Quickstart

This guide walks you through creating your first order in Fleet-Ops, assigning it to a driver, and dispatching it to the Navigator app. It assumes Fleet-Ops is installed and you have at least one driver account set up.

## Prerequisites

* At least one driver created in
  **Fleet-Ops → Resources → Drivers**
* The Navigator app installed on the driver's phone (see
  [Navigator App Setup](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  )

## Step 1 — Open Fleet-Ops

Click
**Fleet-Ops**
in the top navigation bar of the Fleetbase Console. The Fleet-Ops dashboard opens showing the live map and the operations sidebar.

![Fleet-Ops main dashboard with live map and sidebar navigation](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-map.80724e10.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Step 2 — Create a New Order

### Open the Orders list

In the left sidebar, click
**Operations → Orders**
. This shows all existing orders with their current status.

### Click New Order

Click the
**+ New Order**
button in the top right. The new order form opens.

![New order form — order config selector, customer, pickup, dropoff, scheduling, and entity fields](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-create.8a3ff08a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Select an Order Configuration

Choose an
**Order Config**
from the dropdown. The order config determines the workflow steps, entity fields, and proof of delivery method for this order. For a basic delivery, select the default
**Delivery**
config.

### Set the Pickup and Dropoff

Enter the
**Pickup**
address (where the driver collects the item) and the
**Dropoff**
address (where it is delivered). You can type an address for geocoding, or select a saved Place.

### Add Entities (optional)

Entities are the individual items being delivered. Click
**Add Entity**
to attach an item with a description, barcode, dimensions, and weight. Entities each get their own tracking number.

### Save the Order

Click
**Save**
. The order is created with system status
**`created`**
and appears in the orders list.

## Step 3 — Assign a Driver

### Open the order detail

Click the order row in the list to open the order detail panel.

### Assign driver and vehicle

In the detail panel, click
**Assign Driver**
. Select a driver from the list of available drivers. Optionally assign a vehicle.

The driver and vehicle are now linked to the order. The order's system status remains
**`created`**
until you dispatch it — assignment alone does not change the system status.

## Step 4 — Dispatch

### Dispatch the order

With the order detail open, click
**Dispatch**
. This sends the order to the driver's Navigator app.

The order status moves to
**dispatched**
.

### Driver accepts in Navigator app

The driver receives a push notification in the Navigator app. When they accept and start the order, the status moves to
**started**
and their live location appears on the map.

## Step 5 — Track Progress

Open
**Operations → Orders**
and click the order, or click the driver's marker on the live map. The order detail shows:

* Current driver location and ETA
* Activity history (each status transition with timestamp)
* Proof of delivery when captured

![Order detail panel — activity timeline showing each lifecycle event with timestamps and the driver's live position](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-track-order.aa9cff9f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

The order moves to
**`completed`**
when the driver triggers the activity that has the
`complete`
flag set in the Order Configuration's
[activity flow](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
— typically the activity that captures proof of delivery (signature, photo, or QR scan) and marks the order as delivered in the Navigator app.

## Next Steps

* [Core Concepts](https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts)
  — understand how orders, drivers, vehicles, and fleets relate
* [Order Configurations](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
  — customize order types and workflows
* [Orchestrator](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
  — automate batch assignment and route optimization
* [Navigator App Setup](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  — full driver app configuration guide
