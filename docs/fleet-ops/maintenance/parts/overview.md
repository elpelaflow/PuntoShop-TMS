---
title: "Parts"
url: https://fleetbase.io/docs/fleet-ops/maintenance/parts/overview
module: fleet-ops
---

Parts

# Parts

Track parts inventory used in fleet maintenance — log parts used in work orders, manage supplier info, and track costs.

# Parts

**Parts**
is the inventory management section for maintenance components. It tracks the parts available for vehicle and equipment maintenance — oil filters, brake pads, belts, fluids, and any other consumables used in work orders.

![Parts inventory list — part name, SKU, supplier, cost per unit, quantity](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-parts-list.22e41d1d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Part Attributes

| Field | Description |
| --- | --- |
| `name` | Part name (e.g., *Oil Filter – Toyota Hiace* ) |
| `manufacturer` / `model` | Manufacturer name and OEM model |
| `sku` | Internal stock keeping unit |
| `serial_number` | Serial number, when applicable |
| `barcode` | Barcode for scanning |
| `description` | Detailed description of the part |
| `vendor_uuid` | Vendor or supplier who provides this part |
| `warranty_uuid` | Linked warranty record |
| `unit_cost` / `msrp` / `currency` | Cost per unit, manufacturer's suggested retail price, and currency |
| `quantity_on_hand` | Current stock level |
| `reorder_point` | Alert threshold — when `quantity_on_hand` drops below this, the part is flagged `is_low_stock` and a low-stock alert can fire. Stored under the `specs` JSON; defaults to 5. |
| `asset_type` / `asset_uuid` | Polymorphic link to the asset this part belongs to (e.g. a vehicle or piece of equipment) |
| `photo_uuid` | Reference to an uploaded photo of the part |
| `status` / `type` | Free-form classification fields |

![Part detail panel — SKU and type, manufacturer and model, quantity on hand with stock status, the asset it is fitted to, and pricing](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-part-details.8d664f51.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Creating a Part Record

Navigate to
**Fleet-Ops → Maintenance → Parts**
.

Click
**+ New Part**
.

Enter the
**Name**
,
**Part Number**
, and
**SKU**
.

Set the
**Supplier**
and
**Unit Cost**
.

Optionally set the
**Quantity on Hand**
if you want to track stock levels.

Click
**Save**
.

## Using Parts in Work Orders

When completing a work order, the assignee can log which parts were used:

1. In the work order detail, click
   **+ Add Part**
2. Select the part from the inventory
3. Enter the quantity used
4. The part cost is automatically added to the work order's
   **Actual Cost**

Parts used in completed work orders are recorded in the maintenance history, giving a full record of what components were replaced in each vehicle over its lifetime.

## Cost Tracking

Parts costs flow into the work order cost breakdown:

```
Work Order Actual Cost = Labor Cost + Parts Cost + Other Costs
```

Parts selected from the inventory carry their unit cost, which multiplied by quantity gives the line item cost in the work order's cost breakdown.

## Supplier Management

Each part can be linked to a
**Vendor**
(supplier) record from
**Fleet-Ops → Resources → Vendors**
. This lets you:

* Track which supplier provides each part
* Identify the preferred supplier for reorders
* Reference supplier contact information when placing orders

## Importing Parts

Click
**Import**
in the parts list to bulk-upload your parts inventory from a CSV file. This is useful when onboarding an existing parts catalog.

[Equipment

Track auxiliary equipment attached to Vehicles or Trailers, with maintenance schedules, work orders, and warranty coverage.](https://fleetbase.io/docs/fleet-ops/maintenance/equipment/overview)
[Connectivity Overview

Connect Fleet-Ops to external hardware — telematics modems, GPS devices, IoT sensors, and third-party data providers.](https://fleetbase.io/docs/fleet-ops/connectivity/overview)
