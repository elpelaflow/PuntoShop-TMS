---
title: "Contacts"
url: https://fleetbase.io/docs/fleet-ops/resources/contacts/overview
module: fleet-ops
---

Contacts

# Contacts

Manage the people and businesses your operation works with — customers, suppliers, and facilitators — with linked locations and custom fields.

# Contacts

**Contacts**
are the people and businesses your logistics operation interacts with. They serve as customers who receive deliveries, suppliers who provide pickups, and facilitators who coordinate operations. Contacts are linked to Places (their physical location) and can be assigned to orders in the customer or facilitator role.

![Contacts list — name, type badge, email, phone, and linked location](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-contacts-list.ade3aedd.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Contact Types

| Type | Role |
| --- | --- |
| **Customer** | Recipient of a delivery — linked to the dropoff location |
| **Supplier** | Origin of items — linked to the pickup location |
| **Facilitator** | Coordinates or manages the order on behalf of a customer |
| **Contact** | General contact not tied to a specific role |

## Contact Attributes

| Field | Description |
| --- | --- |
| `name` | Full name or business name |
| `title` | Job title or role label |
| `email` | Email address — used for order notifications |
| `phone` | Phone number — used for SMS notifications |
| `type` | customer, supplier, facilitator, contact |
| `notes` | Free-text notes about the contact |
| `place_uuid` | Linked Place record (physical address) |
| `photo_uuid` | Profile photo or logo |
| `internal_id` | Your external reference ID for the contact |
| `meta` | Custom fields specific to your operation |

## Creating a Contact

Navigate to
**Fleet-Ops → Resources → Contacts**
.

Click
**+ New Contact**
.

Enter the contact's name, phone, and email.

Select the
**Type**
(customer, supplier, facilitator, or contact).

Link a
**Place**
— the contact's physical address. Select from existing places or enter a new one.

Click
**Save**
.

## Using Contacts on Orders

When creating an order, you can assign a contact as:

* **Customer**
  — the recipient. The customer's phone and email are used for delivery notifications.
* **Facilitator**
  — the coordinator. If a facilitator is set, they receive operational notifications instead of the customer.

The contact's linked Place can be used directly as the pickup or dropoff address when creating the order payload.

## Customers Sub-Section

The sidebar has a dedicated
**Customers**
sub-section within Contacts that filters to show only contacts of type
**customer**
. This is a convenience view for operations focused on customer management.

## Custom Fields

Additional data specific to your operation can be attached to contacts using
**Custom Fields**
. Navigate to
**Fleet-Ops → Settings → Custom Fields → Contacts**
to define fields like account number, loyalty tier, or contract type.

## Importing Contacts

Click
**Import**
in the contacts list to bulk-import from a CSV file. Download the template, fill in your data, and upload. Fleet-Ops creates all contact records with their linked Places.

## Notifications

When a contact is linked to an order as the customer, they receive:

* **Dispatch notification**
  — when the order is dispatched to a driver
* **In-transit notification**
  — when the driver is on the way
* **Completed notification**
  — when delivery is confirmed with proof

Notification channels (SMS, email, push) and message templates are configured in
**Fleet-Ops → Settings → Notifications**
.

[Integrated Vendors

Connect external logistics platforms (Lalamove and others) using the Integrated Vendor framework, and learn how to register your own provider.](https://fleetbase.io/docs/fleet-ops/resources/vendors/integrated-vendors)
[Places

Create and manage a library of saved locations — pickup points, warehouses, hubs, and delivery addresses used across orders.](https://fleetbase.io/docs/fleet-ops/resources/places/overview)
