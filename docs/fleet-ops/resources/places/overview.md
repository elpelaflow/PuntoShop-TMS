---
title: "Places"
url: https://fleetbase.io/docs/fleet-ops/resources/places/overview
module: fleet-ops
---

Places

# Places

Create and manage a library of saved locations — pickup points, warehouses, hubs, and delivery addresses used across orders.

# Places

**Places**
are saved locations in Fleet-Ops — reusable addresses for pickup points, warehouses, distribution hubs, customer addresses, and any other location your operation regularly uses. When creating orders, you can select from your Places library instead of entering addresses each time.

![Places list — place name, type badge, address, and linked contact](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-places-list.0b02bba4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Place Attributes

| Field | Description |
| --- | --- |
| **Name** | Display name (e.g., "Main Warehouse", "Customer HQ") |
| **Type** | Category of location (see types below) |
| **Street 1 / Street 2** | Street address |
| **City** | City |
| **Province / State** | State or province |
| **Postal Code** | Postal or ZIP code |
| **Country** | Country (ISO code) |
| **Neighborhood / District** | Sub-area within the city |
| **Building** | Building name or number |
| **Security Access Code** | Gate or access code for the driver |
| **Phone** | Contact phone at this location |
| **Location** | Precise coordinates (latitude, longitude) |

## Place Types

| Type | Use case |
| --- | --- |
| **Customer** | Delivery address for a customer |
| **Supplier** | Pickup location for a supplier |
| **Warehouse** | Internal storage and dispatch hub |
| **Hub** | Sorting or transfer facility |
| **Service Point** | Drop-off locker or service location |
| **Return Center** | Destination for returned items |

## Creating a Place

Navigate to
**Fleet-Ops → Resources → Places**
.

Click
**+ New Place**
.

Enter a
**Name**
and select the
**Type**
.

Enter the address details. As you type, the geocoder suggests addresses — select one to auto-fill the fields and set the coordinates.

Adjust the pin on the map if the geocoded position needs correction.

Set the
**Security Access Code**
if the driver needs a code to enter.

Click
**Save**
. The place is now available for selection when creating orders.

## Using Places in Orders

When creating an order's payload, the
**Pickup**
and
**Dropoff**
fields support autocomplete from your Places library. Type the place name or address and select from the suggestions. Selecting a saved place also loads the contact phone and access code automatically.

## Place Detail Panel

Click any place to open its detail panel:

* **Overview**
  — address details and map
* **Orders**
  — orders that have used this place as pickup or dropoff
* **Activity**
  — recent delivery activity at this location
* **Performance**
  — delivery success rate and average time at location
* **Documents**
  — attachments and notes for the location
* **Rules**
  — automated rules for orders at this location (optional)

![Place detail panel — name and address, city and country, coordinates, a map of the location, and the place avatar](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-place-details.6adabab7.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## On the Live Map

Places appear as markers on the live map when their map display is enabled. This gives dispatchers a visual reference for all known pickup and delivery locations across the fleet's operational area.

## Service Areas & Zones

Places are not contained by Service Areas or Zones — there is no foreign key from a Place to a Service Area, and a Place's geographic location does not automatically associate it with the polygon-bounded areas defined elsewhere in Fleet-Ops. Service Areas and Zones operate as a separate scoping concept used by Service Rates and the Orchestrator to filter routes and pricing; they don't index Places.

See
[Service Rates](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
for how Service Areas and Zones scope pricing.

## Importing Places

Click
**Import**
in the places list to bulk-upload from CSV. Download the template, fill in your location data, and upload. Fleet-Ops geocodes any addresses that don't have coordinates.
