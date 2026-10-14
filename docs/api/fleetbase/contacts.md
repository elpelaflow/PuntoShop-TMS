---
title: "Contacts"
url: https://fleetbase.io/docs/api/fleetbase/contacts
module: api
---

# Contacts

Contacts represent customers, recipients, senders, and other people or organizations connected to logistics activity. Use contacts to attach identity, communication details, and default places to orders and payloads.

* [The Contact object](#the-contact-object)
* [Create a Contact

  POST
  `/v1/contacts`](#create-a-contact)
* [Query Contacts

  GET
  `/v1/contacts`](#query-contacts)
* [Retrieve a Contact

  GET
  `/v1/contacts/:id`](#retrieve-a-contact)
* [Update a Contact

  PUT
  `/v1/contacts/:id`](#update-a-contact)
* [Delete a Contact

  DELETE
  `/v1/contacts/:id`](#delete-a-contact)

## The Contact object

A contact represents a person or customer profile used by FleetOps resources. Contacts can own places, appear as customers, and carry contact details, photos, type, slug, and metadata.

Attributes

`id`

string

optional

Public contact identifier.

`customer_id`

string

optional

Customer-form identifier returned for public customer contacts.

`internal_id`

string

optional

Optional internal identifier.

`name`

string

optional

Contact display name.

`title`

string

optional

Contact title.

`email`

string

optional

Contact email address.

`phone`

string

optional

Contact phone number.

`photo_url`

string

optional

Contact photo URL.

`place`

object

optional

Primary place for the contact, when loaded.

`places`

array of objects

optional

Places associated with the contact, when loaded.

`user`

string

optional

Public user ID linked to the contact, when present.

`type`

string

optional

Contact type.

`meta`

object

optional

Additional contact metadata.

`slug`

string

optional

URL-friendly contact slug.

`updated_at`

timestamp

optional

Timestamp when the contact was last updated.

`created_at`

timestamp

optional

Timestamp when the contact was created.

The
Contact
object

```
{
  "id": "contact_6zV1KqN9pR",
  "customer_id": "customer_6zV1KqN9pR",
  "internal_id": "CUST-1001",
  "name": "John Doe",
  "title": "Mr",
  "email": "john@example.com",
  "phone": "+15639204264",
  "photo_url": null,
  "place": null,
  "places": [],
  "user": null,
  "type": "customer",
  "meta": {},
  "slug": "john-doe",
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/contacts`

## [Create a Contact](#create-a-contact)

Creates a contact for the current company. Contacts are used as customers, facilitators, personnel, or other addressable people in FleetOps workflows.

Body parameters

`name`

string

required

Contact display name.

`type`

string

required

Contact type, such as
`customer`
,
`technician`
, or another application-defined type.

`title`

string

optional

Optional contact title.

`email`

string

optional

Contact email address.

`phone`

string

optional

Contact phone number.

`photo`

string

optional

File ID, upload reference, or resolvable file input for the contact photo.

`place`

string

optional

Place ID to use as the contact's primary place.

`meta`

object

optional

Additional contact metadata.

POST
`/v1/contacts`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/contacts \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "name": "John Doe",
  "type": "customer",
  "title": "Mr",
  "email": "john@exampleco.com",
  "phone": "+1 563-920-4264"
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/contacts`

## [Query Contacts](#query-contacts)

Returns a paginated list of contacts for the current organization. Use filters such as
`query`
,
`limit`
,
`offset`
, and
`sort`
to narrow and order the results.

Query parameters

`query`

string

optional

Search term matched against contact fields.

`limit`

integer

optional

Maximum number of contacts to return.

`offset`

integer

optional

Number of contacts to skip before returning results.

`sort`

string

optional

Sort expression for the contact query.

`type`

string

optional

Filters contacts by contact type.

GET
`/v1/contacts`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/contacts?query={{contact_name}}&limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

GET
`/v1/contacts/:id`

## [Retrieve a Contact](#retrieve-a-contact)

Retrieve a Contact.

GET
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "updated_at": "<string>",
  "created_at": "<string>"
}
```

PUT
`/v1/contacts/:id`

## [Update a Contact](#update-a-contact)

Updates a contact's profile, type, primary place, photo, or metadata.

Body parameters

`name`

string

optional

Contact display name.

`type`

string

optional

Contact type.

`title`

string

optional

Optional contact title.

`email`

string

optional

Contact email address.

`phone`

string

optional

Contact phone number.

`photo`

string

optional

File ID, upload reference, or resolvable file input for the contact photo.

`place`

string

optional

Place ID to use as the contact's primary place.

`meta`

object

optional

Additional contact metadata.

PUT
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "title": "Mr",
    "email": "john@exampleco.com",
    "phone": "563-920-4264",
    "meta": {
        "external_ref": "john-doe"
    }
}'
```

200

OK

```
{
  "id": "<string>",
  "name": "<string>",
  "title": "<string>",
  "email": "<string>",
  "phone_number": "<string>",
  "phone_country_code": "<string>",
  "type": "<string>",
  "slug": "<string>",
  "created_at": "<string>",
  "updated_at": "<string>"
}
```

DELETE
`/v1/contacts/:id`

## [Delete a Contact](#delete-a-contact)

Delete a Contact.

DELETE
`/v1/contacts/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/contacts/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Accept: application/json"
```

200

OK

```
{
  "deleted": "<boolean>",
  "id": "<string>"
}
```
