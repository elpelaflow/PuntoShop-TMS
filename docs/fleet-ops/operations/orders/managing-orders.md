---
title: "Managing Orders"
url: https://fleetbase.io/docs/fleet-ops/operations/orders/managing-orders
module: fleet-ops
---

Orders

# Managing Orders

Create, edit, assign, dispatch, and manage orders from the Fleet-Ops orders list and detail views.

# Managing Orders

This page covers the day-to-day operations for managing orders in the Fleet-Ops console — creating new orders, assigning drivers, dispatching, and handling exceptions.

## Creating an Order

### Navigate to Operations → Orders

Click
**Fleet-Ops**
in the top nav, then
**Operations → Orders**
in the sidebar.

### Click New Order

Click
**+ New Order**
. The new order form opens.

![New order form — order config selector, customer, pickup, dropoff, scheduling, and entity fields](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-create.8a3ff08a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Select an Order Configuration

Choose the
**Order Config**
that matches the type of delivery. The config determines the workflow steps, required entity fields, and proof of delivery method.

### Set the customer (optional)

Select or create a
**Customer**
contact. The customer is the recipient of the order — used for notifications and tracking page access.

### Enter Pickup and Dropoff

Enter the
**Pickup**
address (where items originate) and the
**Dropoff**
address (primary delivery destination). You can:

* Type an address and select from the geocoder suggestions
* Select a saved Place from your Places library
* Drop a pin on the map

For multi-stop orders, add
**Waypoints**
using the
**+ Add Waypoint**
button.

### Add Entities (optional)

Click
**Add Entity**
to attach items to the order. Each entity can have:

* Description and SKU/barcode
* Quantity
* Dimensions (length, width, height) and weight
* A destination waypoint (for multi-drop)
* Custom fields defined by the Order Config

Entities each receive their own tracking number automatically.

### Set scheduling (optional)

Enable
**Scheduled**
and set a pickup date and time if the order should not be dispatched immediately.

### Add notes and metadata

Add any
**Notes**
visible to the driver and operators, and an
**Internal ID**
for cross-referencing with your external system.

### Save

Click
**Save**
. The order is created with status
**`created`**
. If a scheduled date and time were set, the order remains in
`created`
until you choose to dispatch it.

## Assigning a Driver

To assign a driver manually:

Open the order detail by clicking the order row.

Click
**Assign Driver**
in the detail panel.

Select a driver from the available drivers list. Optionally select a vehicle.

Click
**Assign**
. The driver and vehicle are now linked to the order. The order's system status remains
**`created`**
until it is dispatched — assignment alone does not change the system status.

For bulk assignment across many orders, use the
[Orchestrator](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
.

## Dispatching an Order

Once a driver is assigned, dispatch the order to the driver's Navigator app:

Open the order detail.

Click
**Dispatch**
. A confirmation dialog shows the driver name and vehicle.

Confirm the dispatch. The order status moves from
**`created`**
to
**`dispatched`**
and the driver receives a push notification.

You can dispatch immediately after assigning a driver, or hold the order in
`created`
status until you're ready to send it to the driver.

## Editing an Order

Order editing is split between two distinct buttons in the detail panel —
**Edit**
and
**Edit Route**
. They open different surfaces because they affect different parts of the order.

### Edit Details

Click
**Edit**
in the order detail panel to open the
**Edit Order**
form. This surface covers everything that isn't the geometry of the route:

* Customer and facilitator
* Driver and vehicle assignment
* Scheduled date/time and time window
* Order Configuration custom fields and entity fields
* Notes and internal ID
* Service rate / payment overrides

### Edit Route

Click
**Edit Route**
to open the
**Order Route Editor**
. This is a map-driven surface for changing the order's pickup, dropoff, and waypoints — including reordering stops and re-running optimization.

![Order Route Editor — pickup, dropoff, and waypoint list with map for reordering and editing stops](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-route-editor.827c67fa.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

From the route editor you can:

* Add, remove, or reorder waypoints
* Replace pickup or dropoff with a different address or saved Place
* Re-run
  **Route Optimization**
  to compute the optimal stop sequence

![Order route optimization — re-sequenced waypoints with optimized polyline on the map](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-route-optimization.9473d02a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Editing the route on a dispatched or started order recalculates the route and may require re-dispatching. The driver is notified of route changes.

## Bulk Actions

From the orders list, select multiple orders using the checkboxes, then use the bulk action menu to:

* **Assign**
  — assign all selected orders to a driver at once
* **Dispatch**
  — dispatch all assigned orders simultaneously
* **Cancel**
  — cancel multiple orders with a single reason
* **Export**
  — export the selected orders to CSV

## Cancelling an Order

Open the order detail and click
**Cancel Order**
. Enter an optional cancellation reason. The status moves to
**`canceled`**
and:

* The driver is notified (if already dispatched)
* A cancellation webhook event fires (
  `order.canceled`
  )
* The order remains in the list for audit purposes

## Order Filters and Search

Click the
**Filters**
icon in the orders list toolbar to open the full filter panel. Apply any combination, then click
**Apply**
to narrow the list (or
**Clear**
to reset).

![Orders filter panel — ID, Internal ID, Payload ID, driver, pickup/dropoff, customer, vehicle, facilitator, scheduling, status, and date filters](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-orders-filters.f72adef1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Filter | What it matches |
| --- | --- |
| **ID** | Match on the order's public ID (e.g. `order_qT4zTdE…` ) |
| **Internal ID** | Match on your external `internal_id` reference |
| **Payload ID** | Match on a specific payload UUID |
| **Driver Assigned** | Orders assigned to a specific driver |
| **Pickup** | Orders whose pickup is a specific saved Place |
| **Dropoff** | Orders whose dropoff is a specific saved Place |
| **Customer** | Orders for a specific customer contact |
| **Vehicle Assigned** | Orders assigned to a specific vehicle |
| **Facilitator** | Orders associated with a specific facilitator |
| **Scheduled At** | Filter by `scheduled_at` date |
| **Tracking** | Match on tracking number |
| **Type** | Filter by Order Configuration |
| **Status** | Filter by system status — Created, Dispatched, Started, Completed, Canceled |
| **Created** / **Updated** | Filter by `created_at` / `updated_at` date |
| **Created By** / **Updated By** | Filter by the user who created or last updated the order |
| **Without Driver Assigned** | Toggle to show only orders that have no driver linked |

Use the search bar above the filter panel to do a free-text search across order ID, customer name, driver name, and address.

## Exporting Orders

Click
**Export**
in the orders list to download a CSV of all orders matching the current filter. Exports include all order fields, customer details, and status history.
