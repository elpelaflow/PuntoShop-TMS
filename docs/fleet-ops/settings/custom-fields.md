---
title: "Custom Field Settings"
url: https://fleetbase.io/docs/fleet-ops/settings/custom-fields
module: fleet-ops
---

# Custom Field Settings

Define additional structured fields for any Fleet-Ops resource — drivers, vehicles, contacts, vendors, places, entities, fleets, issues, and fuel reports.

# Custom Field Settings

**Custom Fields**
let you attach additional structured data to Fleet-Ops resources without building an extension. Fields are defined in the Custom Fields Manager and rendered inline on the corresponding resource detail view.

Navigate to
**Fleet-Ops → Settings → Custom Fields**
.

![Custom Fields Manager — resource subject tabs across the top, field groups and fields below](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-fields-settings.3d8100f1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Supported Resources (Subjects)

Custom fields are organised by
**subject**
— the resource type the fields attach to. The Custom Fields Manager surfaces the following subjects out of the box:

| Subject | Resource type | Where the fields appear |
| --- | --- | --- |
| **Driver** | `fleet-ops:driver` | Driver detail panel |
| **Vehicle** | `fleet-ops:vehicle` | Vehicle detail panel |
| **Contact** | `fleet-ops:contact` | Contact detail panel |
| **Vendor** | `fleet-ops:vendor` | Vendor detail panel |
| **Place** | `fleet-ops:place` | Place detail panel |
| **Entity** | `fleet-ops:entity` | Inline on each entity in an order's payload |
| **Fleet** | `fleet-ops:fleet` | Fleet detail panel |
| **Issue** | `fleet-ops:issue` | Issue detail panel and the Navigator issue form |
| **Fuel Report** | `fleet-ops:fuel-report` | Fuel report detail panel and the Navigator fuel report form |

Order-level custom fields (fields specific to an Order Configuration's order type) live in the
[Order Configuration](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
editor, not here. The
**Entity**
subject above is for fields on the items
*inside*
a payload, which apply across all order types.

## Creating Custom Fields

In the Custom Fields Manager, pick the
**subject tab**
(e.g. Driver) for the resource you're extending.

Click
**+ New Group**
. Field groups are named sections that render on the resource detail view (e.g.
*Emergency Contact*
,
*Compliance*
).

Set the group's
**Grid Size**
—
`1`
,
`2`
, or
`3`
columns — controls how many fields can appear side-by-side inside the group.

Inside the group, click
**+ New Field**
to add a custom field.

Configure the field properties:

* **Field Label**
  — display name shown in the UI
* **Field Type**
  — see the table below
* **Options**
  — for
  `Select`
  and
  `Radio Button`
  types, the list of choices
* **Required**
  — whether the field must have a value
* **Editable**
  — whether the field can be modified after the record is created
* **Column Span**
  — how many of the group's grid columns this field takes (1 / 2 / 3)

Save. The field is immediately available on every record of that subject.

## Field Types

| Type | Best for |
| --- | --- |
| **Input** | Short single-line text — names, codes, identifiers |
| **Phone Input** | Phone numbers with international dial-code selector |
| **Money Input** | Currency amounts |
| **Date Time Input** | Combined date + time picker |
| **Date Picker** | Date only (no time) |
| **Radio Button** | Single selection rendered as inline radios |
| **Select** | Single selection rendered as a dropdown |
| **File Upload** | Attach a document or image |

## API Access

Custom field values are returned in API responses alongside the resource's own fields. Each response includes a
`custom_field_values`
array carrying the structured
`key`
/
`value`
pairs:

```
{
  "id": "driver_dnid32",
  "name": "Alex Tan",
  "custom_field_values": [
    { "key": "emergency_contact_name", "value": "Sarah Tan" },
    { "key": "emergency_contact_phone", "value": "+6598765432" }
  ]
}
```

When creating or updating a record, send the same
`custom_field_values`
array; Fleet-Ops persists each entry against the appropriate field definition.

For more detail and a worked recipe, see
[Configure Custom Fields](https://fleetbase.io/docs/platform/recipes/configure-custom-fields)
.
