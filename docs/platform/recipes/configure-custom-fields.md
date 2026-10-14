---
title: "Configure Custom Fields"
url: https://fleetbase.io/docs/platform/recipes/configure-custom-fields
module: platform
---

# Configure Custom Fields

Add structured custom data fields to drivers, vehicles, contacts, and other resources — then read them back via the API.

# Configure Custom Fields

Custom Fields let you attach additional structured data to platform resources — drivers, vehicles, contacts, and more — without writing an extension. Fields are defined in the console settings panel, rendered inline on resource detail views, and returned automatically in API responses.

Custom fields for
**orders**
are configured through Order Configurations in Fleet-Ops. This recipe uses
**Driver**
as the example resource — the same workflow applies to Vehicles, Contacts, and any other resource tab available in the Custom Fields Manager.

## What You'll Build

A custom field group called
**Emergency Contact**
on the Driver resource, with three fields: a text input for the contact's name, a phone input for their number, and a select field for the relationship type.

## Prerequisites

* Fleet-Ops installed on your instance
* IAM permissions to access Fleet-Ops Settings

## Step 1 — Open the Custom Fields Manager

### Navigate to Fleet-Ops Settings

Click
**Fleet-Ops**
in the top navigation bar, then open
**Settings**
in the sidebar.

### Open Custom Fields

In the Settings sidebar, click
**Custom Fields**
. The Custom Fields Manager opens showing a tab for each resource type that supports custom fields.

![Custom Fields Manager — resource type tabs across the top with field groups below](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-fields-settings.3d8100f1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Select the Driver tab

Click
**Driver**
in the resource tabs. This shows all custom field groups and fields currently configured for the Driver resource. On a fresh instance this will be empty.

## Step 2 — Create a Field Group

Fields must belong to a
**group**
— a named container that renders as a labelled section on the Driver detail view. You can create multiple groups per resource to organise related fields.

Click
**New field group**
.

Enter
`Emergency Contact`
as the group name.

Set the
**Grid Size**
to control how many columns fields are rendered in:

| Grid Size | Layout |
| --- | --- |
| `1` | Single column — each field spans full width |
| `2` | Two equal columns |
| `3` | Three equal columns |

Set
**Grid Size**
to
`2`
. You can add more groups later — each group has its own independent grid size.

## Step 3 — Add Custom Fields

Click
**Create new custom field**
inside the group. The field form opens.

![Custom field form — Label, Type selector, Required and Editable toggles, Column Span](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-field-create.cf152118.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Field 1 — Contact Name

| Setting | Value |
| --- | --- |
| **Field Label** | `Contact Name` |
| **Field Type** | Input |
| **Field is Required** | On |
| **Field is Editable** | On |
| **Column Span** | 1 |

Click
**Save**
.

### Field 2 — Contact Phone

| Setting | Value |
| --- | --- |
| **Field Label** | `Contact Phone` |
| **Field Type** | Phone Input |
| **Field is Required** | On |
| **Field is Editable** | On |
| **Column Span** | 1 |

Click
**Save**
.

### Field 3 — Relationship

| Setting | Value |
| --- | --- |
| **Field Label** | `Relationship` |
| **Field Type** | Select |
| **Options** | `Spouse` , `Parent` , `Sibling` , `Friend` , `Other` |
| **Field is Required** | Off |
| **Field is Editable** | On |
| **Column Span** | 2 |

Click
**Save**
.

All three fields now appear inside the
**Emergency Contact**
group. You can drag them to reorder, or click the pencil icon to edit any field at any time.

## Available Field Types

| Type | Best for |
| --- | --- |
| **Input** | Short single-line text — names, codes, identifiers |
| **Phone Input** | Phone numbers with international dial code selector |
| **Money Input** | Currency amounts |
| **Date Time Input** | Combined date and time picker |
| **Date Picker** | Date only (no time) |
| **Radio Button** | Single selection shown as inline radio buttons |
| **Select** | Single selection shown as a dropdown |
| **File Upload** | Document or image attachment |

## Step 4 — Test the Fields on a Driver

Open any driver record in
**Fleet-Ops → Resources → Drivers**
(or create a new driver). Scroll to the
**Emergency Contact**
section in the detail view. Your three fields render inline and are fully editable.

Enter values and save. The custom field data is stored alongside the standard driver record immediately.

## Adding More Groups

You can add as many field groups as needed on the same resource. For example, you might add a second group called
**Licensing & Compliance**
with fields for licence number, expiry date, and licence class:

Click
**New field group**
again on the Driver tab.

Name it
`Licensing & Compliance`
and set
**Grid Size**
to
`3`
.

Add fields inside the new group — for example:

* **Licence Number**
  — Input, Column Span 1
* **Licence Class**
  — Select (options: A, B, C, D), Column Span 1
* **Licence Expiry**
  — Date Picker, Column Span 1

Both groups appear as separate sections on the Driver detail view.

## Step 5 — Read Custom Fields via the API

Custom field values are included automatically in API responses. They are
**flattened directly onto the root resource object**
— not nested under a
`meta`
key. Each field key is the snake\_case version of the field label you defined.

```
curl -X GET "https://api.fleetbase.io/v1/drivers/DRV-001" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json"
```

Response:

```
{
  "id": "driver_01H...",
  "public_id": "DRV-001",
  "name": "Alex Tan",
  "phone": "+6591234567",
  "status": "active",
  "contact_name": "Sarah Tan",
  "contact_phone": "+6598765432",
  "relationship": "Spouse",
  "licence_number": "S1234567A",
  "licence_class": "B",
  "licence_expiry": "2028-06-30",
  "custom_fields": [
    "contact_name",
    "contact_phone",
    "relationship",
    "licence_number",
    "licence_class",
    "licence_expiry"
  ],
  "custom_field_values": [
    { "key": "contact_name", "value": "Sarah Tan" },
    { "key": "contact_phone", "value": "+6598765432" },
    { "key": "relationship", "value": "Spouse" }
  ]
}
```

Two reserved keys are always appended alongside the flattened values:

| Key | Type | Contents |
| --- | --- | --- |
| `custom_fields` | `string[]` | The snake\_case key name of every custom field defined on this resource — use this to know which top-level keys are custom rather than standard |
| `custom_field_values` | `object[]` | The custom field key-value pairs as a structured array — useful for iterating without knowing field names in advance |

The field group structure (the visual groupings you created in the console) has no representation in the API response — groupings are purely a display concern.

## Step 6 — Write Custom Fields via the API

Pass custom field values as top-level keys in the request body, using the same snake\_case names they appear under in the response:

```
curl -X POST "https://api.fleetbase.io/v1/drivers" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Tan",
    "phone": "+6591234567",
    "contact_name": "Sarah Tan",
    "contact_phone": "+6598765432",
    "relationship": "Spouse"
  }'
```

The same applies to
`PUT`
/
`PATCH`
requests when updating an existing driver. Only the keys you include are updated — omitting a custom field key leaves its existing value unchanged.

## Editing and Deleting Fields

* **Edit**
  — click the pencil icon on any field to update its label, type, options, or settings. Changes apply immediately and existing stored values are preserved.
* **Delete**
  — click the trash icon to permanently remove a field and all its stored values across every record.

Deleting a custom field also permanently deletes all values stored for it across all driver records. This cannot be undone.

## Next Steps

* The same workflow applies to
  **Vehicles**
  ,
  **Contacts**
  , and other resource tabs in the Custom Fields Manager
* See
  [Custom Fields](https://fleetbase.io/docs/platform/console-features/custom-fields)
  for the full reference on field types, group settings, and grid layout
* For order-specific custom data, see the Order Configurations section in
  [Fleet-Ops](https://fleetbase.io/docs/fleet-ops)

[Set Up Real-Time Tracking

Subscribe to Fleetbase socket events to display live driver locations and order status updates in your own application or dashboard.](https://fleetbase.io/docs/platform/recipes/set-up-real-time-tracking)
[Build a Custom Integration

Use the Fleetbase REST API and webhooks to integrate an external system — push orders in, receive status events out, handle retries safely.](https://fleetbase.io/docs/platform/recipes/build-a-custom-integration)
