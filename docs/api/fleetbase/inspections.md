---
title: "Inspections"
url: https://fleetbase.io/docs/api/fleetbase/inspections
module: api
---

# Inspections

Inspections are the driver's vehicle inspection reports — a DVIR filed before or after a trip against a form the organisation has published from the console.
These endpoints are for the driver filing the inspection: read the published forms, submit against one, and read back what was filed and what it produced. A failed item can raise an issue and open a work order, depending on how the form is configured; both come back on the submission.
Authoring and publishing forms, and reviewing or resolving submissions, is fleet management and is not part of the consumable API. The requests here need at least one published form in the organisation, which a contract run has to seed.

* [The Inspection object](#the-inspection-object)
* [List Inspection Forms

  GET
  `/v1/inspection-forms`](#list-inspection-forms)
* [Retrieve an Inspection Form

  GET
  `/v1/inspection-forms/:id`](#retrieve-an-inspection-form)
* [Submit an Inspection

  POST
  `/v1/inspections`](#submit-an-inspection)
* [List Inspections

  GET
  `/v1/inspections`](#list-inspections)
* [Retrieve an Inspection

  GET
  `/v1/inspections/:id`](#retrieve-an-inspection)
* [List Vehicle Inspections

  GET
  `/v1/vehicles/:id/inspections`](#list-vehicle-inspections)

## The Inspection object

An inspection is one filed report against a published inspection form: the vehicle and driver it was filed for, the driver's answer to every field of the form, the pass/fail results derived from the `pass-fail` answers, the photos and signature filed with it, and the issue or work order the form's settings raised from any failed items.

Attributes

`id`

string

optional

Public inspection identifier.

`form`

object

optional

The inspection form the report was filed against, when loaded.

`vehicle`

object

optional

The vehicle inspected, when loaded.

`driver`

object

optional

The driver who filed the inspection, when loaded.

`issue`

object

optional

The issue raised from the failed items, when the form asks for one and any item failed.

`work_order`

object

optional

The work order opened for the failed items, when the form asks for one and any item failed.

`answers`

array of objects

optional

The driver's answer to each field of the form — the
`field`
it answers, named by the same id the form gave it, beside the field's
`name`
,
`label`
and
`type`
and the
`value`
. A
`pass-fail`
value is an object of
`passed`
,
`not_applicable`
,
`severity`
,
`comments`
,
`photos`
and
`unsafe`
; a photo or signature value is resolved to
`\{ id, url, filename, content_type \}`
rather than the base64 that was sent.

`files`

array of objects

optional

The photos and signatures filed with the inspection, however they arrived — inside the submit body, or dropped on the console's Photos panel.

`item_results`

array of objects

optional

One result per
`pass-fail`
answer, derived from the
`answers`
—
`item_key`
,
`label`
,
`category`
,
`status`
(
`passed`
,
`failed`
or
`not_applicable`
),
`severity`
,
`passed`
,
`comments`
and
`photos`
. This is what issues, work orders and the vehicle's history are built from.

`type`

string

optional

Inspection type, taken from the form —
`dvir`
,
`pre_trip`
,
`post_trip`
, or a custom type.

`status`

string

optional

Lifecycle status —
`submitted`
,
`needs_review`
or
`resolved`
.

`result`

string

optional

`passed`
when every item passed, otherwise
`failed`
.

`source`

string

optional

How it was filed —
`navigator`
for the driver app,
`public_link`
for a tokenised link.

`odometer`

number

optional

Odometer reading at the time of the inspection.

`engine_hours`

number

optional

Engine hours at the time of the inspection.

`total_items`

integer

optional

Number of item results.

`failed_items`

integer

optional

Number of item results that did not pass.

`location`

object

optional

Where the inspection was filed from.

`signature`

object

optional

The driver's signature, as the app captured it.

`attachments`

array

optional

Additional files attached to the inspection.

`has_failures`

boolean

optional

Whether any item failed.

`started_at`

timestamp

optional

When the driver began the inspection.

`submitted_at`

timestamp

optional

When the inspection was filed.

`resolved_at`

timestamp

optional

When the failed items were resolved from the console, if they have been.

`updated_at`

timestamp

optional

Timestamp when the inspection was last updated.

`created_at`

timestamp

optional

Timestamp when the inspection was created.

The
Inspection
object

```
{
  "id": "inspection_submission_4Mnp8Qx2Vz",
  "form": {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "type": "dvir"
  },
  "vehicle": {
    "id": "vehicle_7Hx3Pq9Rt2",
    "plate_number": "TRK-7"
  },
  "driver": {
    "id": "driver_2Fb8Nc4Wm6",
    "name": "Dana Driver"
  },
  "issue": null,
  "work_order": null,
  "answers": [
    {
      "field": "custom_field_9f61c8b7a6",
      "name": "brakes",
      "label": "Brakes",
      "type": "pass-fail",
      "value": {
        "passed": true,
        "not_applicable": false,
        "severity": null,
        "comments": null,
        "photos": [],
        "unsafe": false
      }
    },
    {
      "field": "custom_field_8a521d9f3b",
      "name": "odometer",
      "label": "Odometer",
      "type": "number",
      "value": 120400
    },
    {
      "field": "custom_field_bc085e1a7d",
      "name": "signature",
      "label": "Sign here",
      "type": "signature",
      "value": {
        "id": "file_5Qw8Zt2Nb7",
        "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
        "filename": "lq8w1c0v9xk3.png",
        "content_type": "image/png"
      }
    }
  ],
  "files": [
    {
      "id": "file_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "original_filename": "lq8w1c0v9xk3.png",
      "content_type": "image/png",
      "type": "inspection_signature",
      "caption": null,
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "item_results": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "item_key": "brakes",
      "label": "Brakes",
      "category": "Safety",
      "status": "passed",
      "severity": null,
      "passed": true,
      "comments": null,
      "photos": [],
      "meta": {},
      "submission_id": "inspection_submission_4Mnp8Qx2Vz",
      "updated_at": "2026-09-09T07:30:00.000000Z",
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "type": "dvir",
  "status": "submitted",
  "result": "passed",
  "source": "navigator",
  "odometer": 120400,
  "engine_hours": null,
  "total_items": 1,
  "failed_items": 0,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "signature": {},
  "attachments": [],
  "meta": {},
  "form_name": "Pre-trip DVIR",
  "vehicle_name": "Truck 7",
  "driver_name": "Dana Driver",
  "has_failures": false,
  "started_at": "2026-09-09T07:10:00.000000Z",
  "submitted_at": "2026-09-09T07:30:00.000000Z",
  "resolved_at": null,
  "updated_at": "2026-09-09T07:30:00.000000Z",
  "created_at": "2026-09-09T07:30:00.000000Z"
}
```

GET
`/v1/inspection-forms`

## [List Inspection Forms](#list-inspection-forms)

Lists the inspection forms the organisation has published, newest first. Draft and archived forms are never listed: a driver can only file against a published one.

Each form carries its structure as
`grouped_fields`
— the groups of typed fields a driver fills in — so a list is enough to render a form picker without reading each one.

Send
`vehicle`
to narrow the list to what applies to one vehicle — forms bound to that vehicle, and forms bound to nothing, which are the organisation-wide ones. Send
`type`
to narrow by form type, as one value or a comma separated list.

Query parameters

`vehicle`

string

optional

Only forms that apply to this vehicle — bound to it, or bound to no vehicle at all.

`type`

string

optional

Only forms of these types, such as
`dvir`
or
`pre_trip,post_trip`
.

`limit`

integer

optional

Maximum forms to return. Defaults to 30.

GET
`/v1/inspection-forms`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspection-forms?vehicle={{vehicle_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "description": "Daily vehicle inspection report, filed before the first run.",
    "type": "dvir",
    "status": "published",
    "items": [],
    "grouped_fields": [
      {
        "id": "category_4Tn6Ry8Wz3",
        "name": "Safety",
        "description": null,
        "order": 1,
        "meta": {
          "grid_size": 2
        },
        "fields": [
          {
            "id": "custom_field_9f61c8b7a6",
            "name": "brakes",
            "label": "Brakes",
            "description": null,
            "help_text": "Check the pedal travel.",
            "type": "pass-fail",
            "component": "pass-fail",
            "required": true,
            "editable": true,
            "options": [],
            "order": 1,
            "meta": {
              "severity": "critical",
              "require_comment_on_fail": true,
              "require_photo_on_fail": true,
              "unsafe_on_fail": true
            }
          },
          {
            "id": "custom_field_8a521d9f3b",
            "name": "odometer",
            "label": "Odometer",
            "description": null,
            "help_text": null,
            "type": "number",
            "component": "number",
            "required": false,
            "editable": true,
            "options": [],
            "order": 2,
            "meta": {
              "unit": "km",
              "role": "odometer"
            }
          }
        ]
      }
    ],
    "settings": {
      "create_issue_on_failure": true,
      "create_work_order_on_failure": false
    },
    "meta": {},
    "subject_name": null,
    "item_count": 2,
    "is_published": true,
    "published_at": "2026-09-01T00:00:00.000000Z",
    "updated_at": "2026-09-01T00:00:00.000000Z",
    "created_at": "2026-08-28T00:00:00.000000Z"
  }
]
```

GET
`/v1/inspection-forms/:id`

## [Retrieve an Inspection Form](#retrieve-an-inspection-form)

Retrieves one published inspection form with its structure and
`settings`
.

A form is groups of typed fields.
`grouped_fields`
is what a driver renders: one entry per group, in the order the builder laid them out, each with a
`name`
, a
`meta.grid_size`
and its
`fields`
. A field carries an
`id`
, a
`name`
, a
`label`
, a
`type`
—
`pass-fail`
,
`input`
,
`textarea`
,
`number`
,
`select`
,
`radio-button`
,
`boolean`
,
`date-picker`
,
`date-time-input`
,
`file-upload`
or
`signature`
— plus
`required`
,
`options`
and
`meta`
.

A
`pass-fail`
field's
`meta`
says what happens when it fails: the default
`severity`
, whether a photo or a comment is required, whether the defect takes the vehicle out of service (
`unsafe_on_fail`
), and any
`instructions`
. A
`number`
field's
`meta`
may name its
`unit`
and the
`role`
it plays, such as
`odometer`
.

The first cut's flat
`items`
checklist is still answered, read-only, for forms that have not been rebuilt; a form built from fields answers both, and
`grouped_fields`
is the one to render.

A form that is not published — a draft, or one that has been archived — answers 404, the same as one that does not exist: to a driver, a form that cannot be filled in is not there.

GET
`/v1/inspection-forms/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspection-forms/:id \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "inspection_form_9Kd2Lm7Aq1",
  "name": "Pre-trip DVIR",
  "description": "Daily vehicle inspection report, filed before the first run.",
  "type": "dvir",
  "status": "published",
  "items": [],
  "grouped_fields": [
    {
      "id": "category_4Tn6Ry8Wz3",
      "name": "Safety",
      "description": null,
      "order": 1,
      "meta": {
        "grid_size": 2
      },
      "fields": [
        {
          "id": "custom_field_9f61c8b7a6",
          "name": "brakes",
          "label": "Brakes",
          "description": null,
          "help_text": "Check the pedal travel.",
          "type": "pass-fail",
          "component": "pass-fail",
          "required": true,
          "editable": true,
          "options": [],
          "order": 1,
          "meta": {
            "severity": "critical",
            "require_comment_on_fail": true,
            "require_photo_on_fail": true,
            "unsafe_on_fail": true
          }
        },
        {
          "id": "custom_field_8a521d9f3b",
          "name": "odometer",
          "label": "Odometer",
          "description": null,
          "help_text": null,
          "type": "number",
          "component": "number",
          "required": false,
          "editable": true,
          "options": [],
          "order": 2,
          "meta": {
            "unit": "km",
            "role": "odometer"
          }
        }
      ]
    }
  ],
  "settings": {
    "create_issue_on_failure": true,
    "create_work_order_on_failure": false
  },
  "meta": {},
  "subject_name": null,
  "item_count": 2,
  "is_published": true,
  "published_at": "2026-09-01T00:00:00.000000Z",
  "updated_at": "2026-09-01T00:00:00.000000Z",
  "created_at": "2026-08-28T00:00:00.000000Z"
}
```

POST
`/v1/inspections`

## [Submit an Inspection](#submit-an-inspection)

Files an inspection against a published form, as the driver app does at the end of a DVIR.

A form built from typed fields is answered with
`answers`
: one entry per field the driver answered, naming the
`field`
by the
`id`
the form read gave it, with a
`value`
and, optionally, a
`value_type`
.
`custom_field_values`
is the previous name for this and is still accepted. A
`pass-fail`
answer is an object —
`passed`
,
`not_applicable`
,
`severity`
,
`comments`
,
`photos`
and
`unsafe`
; a meter is a number, a signature or a photo is base64. The server stores every photo and signature as a file and answers with
`file:`
references resolved, and mirrors each
`pass-fail`
answer into an
`item_results`
row, which is what issues, work orders and the vehicle's history are built from.

The first cut's flat
`item_results`
body is still accepted, for the tokenised public link and for older app builds. It is the older shape: an entry per checklist item rather than per field, naming the item by an
`item_key`
of its own instead of naming a field of the form. Send
`answers`
unless you are targeting an older server.

This request deliberately sends both, which is what the app does: when both arrive the answers win and the duplicated results are ignored, so one body works against either cut.

A failed
`pass-fail`
answer must carry whatever its field insists on: a form that sets
`require_comment_on_fail`
or
`require_photo_on_fail`
refuses the whole submission with a 422 rather than filing half an inspection.

Without
`vehicle`
the inspection is recorded against the vehicle the driver is currently assigned to. Without
`started_at`
the inspection is taken to have started when it was filed.

The app queues a submit while offline and replays it later. Send an
`Idempotency-Key`
header with each attempt: a replay with a key already used by the same driver answers with the inspection the first attempt filed rather than filing a second one.

The response is the inspection with its
`answers`
,
`item_results`
and
`files`
, and the
`issue`
and
`work_order`
the form's settings raised from any failed items.

Body parameters

`inspection_form`

string

required

ID of the published inspection form being filed against.

`driver`

string

required

ID of the driver filing the inspection.

`vehicle`

string

optional

ID of the vehicle inspected. Defaults to the vehicle the driver is assigned to.

`started_at`

timestamp

optional

When the driver began the inspection. Defaults to the time it is filed.

`odometer`

integer

optional

Odometer reading at the time of the inspection.

`engine_hours`

integer

optional

Engine hours at the time of the inspection.

`answers`

array of objects

optional

The body to send: one entry per field the driver answered, naming the field the form gave it. Required — unless you are targeting an older server with the flat
`item_results`
body instead, in which case the answers win if both arrive.
`custom_field_values`
is accepted as the previous name for this field.

`field`

string

required

The field being answered, named by the
`id`
the form read gave it. Its
`name`
is accepted too.

`value`

any

required

The answer. A
`pass-fail`
field takes an object of
`passed`
,
`not_applicable`
,
`severity`
,
`comments`
,
`photos`
and
`unsafe`
; a meter takes a number; a signature or photo takes a base64 encoded image or a URL; everything else takes its plain value.

`value_type`

string

optional

How to store the value —
`object`
,
`number`
,
`boolean`
,
`text`
or
`file`
. Derived from the field's own type when omitted.

`item_results`

array of objects

optional

The older shape, kept for older app builds and the tokenised public link: an entry per checklist item, named by an
`item_key`
of its own rather than naming a field of the form. Prefer
`answers`
; this is required only when none are sent.

`item_key`

string

optional

The form item's key.

`label`

string

required

The item as shown to the driver.

`category`

string

optional

The item's category on the form.

`passed`

boolean

required

Whether the item passed.

`status`

string

optional

`passed`
or
`failed`
. Derived from
`passed`
when omitted.

`severity`

string

optional

Severity of a failure —
`low`
,
`medium`
,
`high`
or
`critical`
. Sets the priority of the issue and work order raised.

`comments`

string

optional

The driver's note on the item.

`photos`

array

optional

Photos of the item, each a base64 encoded image or a URL.

`location`

object

optional

Where the inspection was filed from, as
`latitude`
and
`longitude`
.

`signature`

object

optional

The driver's signature, as the app captured it.

`attachments`

array

optional

Additional files attached to the inspection.

POST
`/v1/inspections`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/inspections \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: {{$guid}}" \
  -H "Accept: application/json" \
  -d '{
  "inspection_form": "{{inspection_form_id}}",
  "driver": "{{driver_id}}",
  "vehicle": "{{vehicle_id}}",
  "started_at": "2026-09-09T07:10:00Z",
  "odometer": 120400,
  "engine_hours": 3100,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "answers": [
    {
      "field": "{{inspection_pass_fail_field_id}}",
      "value_type": "object",
      "value": {
        "passed": false,
        "not_applicable": false,
        "severity": "critical",
        "comments": "Pedal is soft.",
        "photos": ["{{proof_photo_base64}}"],
        "unsafe": true
      }
    },
    {
      "field": "{{inspection_number_field_id}}",
      "value_type": "number",
      "value": 120400
    }
  ],
  "item_results": [
    {
      "item_key": "brakes",
      "label": "Brakes",
      "category": "Safety",
      "passed": false,
      "severity": "critical",
      "comments": "Pedal is soft.",
      "photos": ["{{proof_photo_base64}}"]
    },
    {
      "item_key": "lights",
      "label": "Lights",
      "category": "Safety",
      "passed": true
    }
  ]
}'
```

Other ways to call this

* Created
* Unprocessable Content

201

OK

```
{
  "id": "inspection_submission_4Mnp8Qx2Vz",
  "form": {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "type": "dvir"
  },
  "vehicle": {
    "id": "vehicle_7Hx3Pq9Rt2",
    "plate_number": "TRK-7"
  },
  "driver": {
    "id": "driver_2Fb8Nc4Wm6",
    "name": "Dana Driver"
  },
  "issue": {
    "id": "issue_3Vb7Kd1Pq8",
    "status": "pending",
    "priority": "critical"
  },
  "work_order": null,
  "answers": [
    {
      "field": "custom_field_9f61c8b7a6",
      "name": "brakes",
      "label": "Brakes",
      "type": "pass-fail",
      "value": {
        "passed": false,
        "not_applicable": false,
        "severity": "critical",
        "comments": "Pedal is soft.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "unsafe": true
      }
    },
    {
      "field": "custom_field_8a521d9f3b",
      "name": "odometer",
      "label": "Odometer",
      "type": "number",
      "value": 120400
    }
  ],
  "files": [
    {
      "id": "file_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "original_filename": "lq8w1c0v9xk3.png",
      "content_type": "image/png",
      "type": "inspection_photo",
      "caption": null,
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "item_results": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "item_key": "brakes",
      "label": "Brakes",
      "category": "Safety",
      "status": "failed",
      "severity": "critical",
      "passed": false,
      "comments": "Pedal is soft.",
      "photos": [
        {
          "id": "file_5Qw8Zt2Nb7",
          "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
          "filename": "lq8w1c0v9xk3.png",
          "content_type": "image/png"
        }
      ],
      "meta": {
        "not_applicable": false,
        "unsafe": true
      },
      "submission_id": "inspection_submission_4Mnp8Qx2Vz",
      "updated_at": "2026-09-09T07:30:00.000000Z",
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "type": "dvir",
  "status": "submitted",
  "result": "failed",
  "source": "navigator",
  "odometer": 120400,
  "engine_hours": 3100,
  "total_items": 1,
  "failed_items": 1,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "signature": {},
  "attachments": [],
  "meta": {
    "unsafe": true
  },
  "form_name": "Pre-trip DVIR",
  "vehicle_name": "Truck 7",
  "driver_name": "Dana Driver",
  "has_failures": true,
  "started_at": "2026-09-09T07:10:00.000000Z",
  "submitted_at": "2026-09-09T07:30:00.000000Z",
  "resolved_at": null,
  "updated_at": "2026-09-09T07:30:00.000000Z",
  "created_at": "2026-09-09T07:30:00.000000Z"
}
```

GET
`/v1/inspections`

## [List Inspections](#list-inspections)

Lists filed inspections, newest first.

Narrow by
`driver`
or
`vehicle`
, and by
`type`
,
`result`
and
`status`
, each as one value or a comma separated list. Defaults to a recent window rather than the organisation's whole history; use
`limit`
to widen it.

Each row carries the same shape Retrieve an Inspection answers with: the
`answers`
, the
`item_results`
derived from them, and the
`files`
filed with the inspection.

Query parameters

`driver`

string

optional

Only inspections filed by this driver.

`vehicle`

string

optional

Only inspections of this vehicle.

`type`

string

optional

Only inspections of these types, such as
`dvir`
or
`pre_trip,post_trip`
.

`result`

string

optional

`passed`
or
`failed`
.

`status`

string

optional

`submitted`
,
`needs_review`
or
`resolved`
.

`limit`

integer

optional

Maximum inspections to return. Defaults to 30.

GET
`/v1/inspections`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspections?driver={{driver_id}} \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "inspection_submission_4Mnp8Qx2Vz",
    "form": {
      "id": "inspection_form_9Kd2Lm7Aq1",
      "name": "Pre-trip DVIR",
      "type": "dvir"
    },
    "vehicle": {
      "id": "vehicle_7Hx3Pq9Rt2",
      "plate_number": "TRK-7"
    },
    "driver": {
      "id": "driver_2Fb8Nc4Wm6",
      "name": "Dana Driver"
    },
    "issue": {
      "id": "issue_3Vb7Kd1Pq8",
      "status": "pending",
      "priority": "critical"
    },
    "work_order": null,
    "answers": [
      {
        "field": "custom_field_9f61c8b7a6",
        "name": "brakes",
        "label": "Brakes",
        "type": "pass-fail",
        "value": {
          "passed": false,
          "not_applicable": false,
          "severity": "critical",
          "comments": "Pedal is soft.",
          "photos": [
            {
              "id": "file_5Qw8Zt2Nb7",
              "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
              "filename": "lq8w1c0v9xk3.png",
              "content_type": "image/png"
            }
          ],
          "unsafe": true
        }
      },
      {
        "field": "custom_field_8a521d9f3b",
        "name": "odometer",
        "label": "Odometer",
        "type": "number",
        "value": 120400
      }
    ],
    "files": [
      {
        "id": "file_5Qw8Zt2Nb7",
        "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
        "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
        "original_filename": "lq8w1c0v9xk3.png",
        "content_type": "image/png",
        "type": "inspection_photo",
        "caption": null,
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "item_results": [
      {
        "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
        "item_key": "brakes",
        "label": "Brakes",
        "category": "Safety",
        "status": "failed",
        "severity": "critical",
        "passed": false,
        "comments": "Pedal is soft.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "meta": {
          "not_applicable": false,
          "unsafe": true
        },
        "submission_id": "inspection_submission_4Mnp8Qx2Vz",
        "updated_at": "2026-09-09T07:30:00.000000Z",
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "type": "dvir",
    "status": "submitted",
    "result": "failed",
    "source": "navigator",
    "odometer": 120400,
    "engine_hours": 3100,
    "total_items": 1,
    "failed_items": 1,
    "location": {
      "latitude": 1.3521,
      "longitude": 103.8198
    },
    "signature": {},
    "attachments": [],
    "meta": {
      "unsafe": true
    },
    "form_name": "Pre-trip DVIR",
    "vehicle_name": "Truck 7",
    "driver_name": "Dana Driver",
    "has_failures": true,
    "started_at": "2026-09-09T07:10:00.000000Z",
    "submitted_at": "2026-09-09T07:30:00.000000Z",
    "resolved_at": null,
    "updated_at": "2026-09-09T07:30:00.000000Z",
    "created_at": "2026-09-09T07:30:00.000000Z"
  }
]
```

GET
`/v1/inspections/:id`

## [Retrieve an Inspection](#retrieve-an-inspection)

Retrieves one inspection with everything it produced: the
`answers`
— one per field the driver answered, each naming the
`field`
it answers beside that field's
`name`
,
`label`
and
`type`
, with every photo and signature resolved to
`{ id, url, filename, content_type }`
— the
`item_results`
derived from the
`pass-fail`
answers, the
`files`
filed with it, and the
`issue`
and
`work_order`
raised from any failed items.

GET
`/v1/inspections/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/inspections/:id \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
{
  "id": "inspection_submission_4Mnp8Qx2Vz",
  "form": {
    "id": "inspection_form_9Kd2Lm7Aq1",
    "name": "Pre-trip DVIR",
    "type": "dvir"
  },
  "vehicle": {
    "id": "vehicle_7Hx3Pq9Rt2",
    "plate_number": "TRK-7"
  },
  "driver": {
    "id": "driver_2Fb8Nc4Wm6",
    "name": "Dana Driver"
  },
  "issue": {
    "id": "issue_3Vb7Kd1Pq8",
    "status": "pending",
    "priority": "critical"
  },
  "work_order": null,
  "answers": [
    {
      "field": "custom_field_9f61c8b7a6",
      "name": "brakes",
      "label": "Brakes",
      "type": "pass-fail",
      "value": {
        "passed": false,
        "not_applicable": false,
        "severity": "critical",
        "comments": "Pedal is soft.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "unsafe": true
      }
    },
    {
      "field": "custom_field_8a521d9f3b",
      "name": "odometer",
      "label": "Odometer",
      "type": "number",
      "value": 120400
    }
  ],
  "files": [
    {
      "id": "file_5Qw8Zt2Nb7",
      "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
      "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
      "original_filename": "lq8w1c0v9xk3.png",
      "content_type": "image/png",
      "type": "inspection_photo",
      "caption": null,
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "item_results": [
    {
      "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
      "item_key": "brakes",
      "label": "Brakes",
      "category": "Safety",
      "status": "failed",
      "severity": "critical",
      "passed": false,
      "comments": "Pedal is soft.",
      "photos": [
        {
          "id": "file_5Qw8Zt2Nb7",
          "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
          "filename": "lq8w1c0v9xk3.png",
          "content_type": "image/png"
        }
      ],
      "meta": {
        "not_applicable": false,
        "unsafe": true
      },
      "submission_id": "inspection_submission_4Mnp8Qx2Vz",
      "updated_at": "2026-09-09T07:30:00.000000Z",
      "created_at": "2026-09-09T07:30:00.000000Z"
    }
  ],
  "type": "dvir",
  "status": "submitted",
  "result": "failed",
  "source": "navigator",
  "odometer": 120400,
  "engine_hours": 3100,
  "total_items": 1,
  "failed_items": 1,
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "signature": {},
  "attachments": [],
  "meta": {
    "unsafe": true
  },
  "form_name": "Pre-trip DVIR",
  "vehicle_name": "Truck 7",
  "driver_name": "Dana Driver",
  "has_failures": true,
  "started_at": "2026-09-09T07:10:00.000000Z",
  "submitted_at": "2026-09-09T07:30:00.000000Z",
  "resolved_at": null,
  "updated_at": "2026-09-09T07:30:00.000000Z",
  "created_at": "2026-09-09T07:30:00.000000Z"
}
```

GET
`/v1/vehicles/:id/inspections`

## [List Vehicle Inspections](#list-vehicle-inspections)

Lists a vehicle's inspection history, newest first — the same inspections List Inspections answers with
`vehicle`
, addressed the way the driver app holds them, from the vehicle's screen.

Narrow by
`type`
,
`result`
and
`status`
, each as one value or a comma separated list.

Each row carries the
`answers`
, the
`item_results`
derived from them, and the
`files`
filed with the inspection.

Query parameters

`type`

string

optional

Only inspections of these types, such as
`dvir`
or
`pre_trip,post_trip`
.

`result`

string

optional

`passed`
or
`failed`
.

`status`

string

optional

`submitted`
,
`needs_review`
or
`resolved`
.

`limit`

integer

optional

Maximum inspections to return. Defaults to 30.

GET
`/v1/vehicles/:id/inspections`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/vehicles/:id/inspections \
  -H "Authorization: Bearer flb_live_…"
```

200

OK

```
[
  {
    "id": "inspection_submission_4Mnp8Qx2Vz",
    "form": {
      "id": "inspection_form_9Kd2Lm7Aq1",
      "name": "Pre-trip DVIR",
      "type": "dvir"
    },
    "vehicle": {
      "id": "vehicle_7Hx3Pq9Rt2",
      "plate_number": "TRK-7"
    },
    "driver": {
      "id": "driver_2Fb8Nc4Wm6",
      "name": "Dana Driver"
    },
    "issue": {
      "id": "issue_3Vb7Kd1Pq8",
      "status": "pending",
      "priority": "critical"
    },
    "work_order": null,
    "answers": [
      {
        "field": "custom_field_9f61c8b7a6",
        "name": "brakes",
        "label": "Brakes",
        "type": "pass-fail",
        "value": {
          "passed": false,
          "not_applicable": false,
          "severity": "critical",
          "comments": "Pedal is soft.",
          "photos": [
            {
              "id": "file_5Qw8Zt2Nb7",
              "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
              "filename": "lq8w1c0v9xk3.png",
              "content_type": "image/png"
            }
          ],
          "unsafe": true
        }
      },
      {
        "field": "custom_field_8a521d9f3b",
        "name": "odometer",
        "label": "Odometer",
        "type": "number",
        "value": 120400
      }
    ],
    "files": [
      {
        "id": "file_5Qw8Zt2Nb7",
        "uuid": "3a6c9e21-7b4d-4f18-9c05-2d8e1f7a6b34",
        "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
        "original_filename": "lq8w1c0v9xk3.png",
        "content_type": "image/png",
        "type": "inspection_photo",
        "caption": null,
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "item_results": [
      {
        "id": "b3f0c4a2-1d6e-4c1a-9c2b-8e7f6a5d4c3b",
        "item_key": "brakes",
        "label": "Brakes",
        "category": "Safety",
        "status": "failed",
        "severity": "critical",
        "passed": false,
        "comments": "Pedal is soft.",
        "photos": [
          {
            "id": "file_5Qw8Zt2Nb7",
            "url": "https://files.fleetbase.io/inspections/4Mnp8Qx2Vz/lq8w1c0v9xk3.png",
            "filename": "lq8w1c0v9xk3.png",
            "content_type": "image/png"
          }
        ],
        "meta": {
          "not_applicable": false,
          "unsafe": true
        },
        "submission_id": "inspection_submission_4Mnp8Qx2Vz",
        "updated_at": "2026-09-09T07:30:00.000000Z",
        "created_at": "2026-09-09T07:30:00.000000Z"
      }
    ],
    "type": "dvir",
    "status": "submitted",
    "result": "failed",
    "source": "navigator",
    "odometer": 120400,
    "engine_hours": 3100,
    "total_items": 1,
    "failed_items": 1,
    "location": {
      "latitude": 1.3521,
      "longitude": 103.8198
    },
    "signature": {},
    "attachments": [],
    "meta": {
      "unsafe": true
    },
    "form_name": "Pre-trip DVIR",
    "vehicle_name": "Truck 7",
    "driver_name": "Dana Driver",
    "has_failures": true,
    "started_at": "2026-09-09T07:10:00.000000Z",
    "submitted_at": "2026-09-09T07:30:00.000000Z",
    "resolved_at": null,
    "updated_at": "2026-09-09T07:30:00.000000Z",
    "created_at": "2026-09-09T07:30:00.000000Z"
  }
]
```
