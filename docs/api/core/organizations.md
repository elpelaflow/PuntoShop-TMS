---
title: "Organizations"
url: https://fleetbase.io/docs/api/core/organizations
module: api
---

# Organizations

Organizations expose the company context tied to the current API credential. Use this resource to confirm which organization a request is scoped to.

* [The Organization object](#the-organization-object)
* [Get Current Organization

  GET
  `/v1/organizations/current`](#get-current-organization)

## The Organization object

An organization is the company context associated with the current API credential.

Attributes

`id`

string

optional

Public identifier of the organization.

`name`

string

optional

Organization name.

`description`

string

optional

Organization description.

`phone`

string

optional

Organization phone number.

`timezone`

string

optional

Default timezone for the organization.

`country`

string

optional

Organization country code.

`currency`

currency

optional

Default currency code for the organization.

`logo_url`

string

optional

URL of the organization logo.

`backdrop_url`

string

optional

URL of the organization backdrop image.

`branding`

object

optional

Branding settings returned with the organization.

`options`

object

optional

Organization option values.

`owner`

object

optional

Owner user for the organization, when included.

`slug`

string

optional

URL-friendly organization slug.

`status`

string

optional

Organization status.

`updated_at`

timestamp

optional

Time the organization was last updated.

`created_at`

timestamp

optional

Time the organization was created.

The
Organization
object

```
{
  "id": "org_9W2KxA1",
  "name": "Acme Logistics",
  "description": "Regional logistics operations",
  "phone": "+15555550100",
  "timezone": "America/New_York",
  "country": "US",
  "currency": "USD",
  "logo_url": "https://files.example.com/logos/acme.png",
  "backdrop_url": null,
  "branding": {},
  "options": {},
  "owner": null,
  "slug": "acme-logistics",
  "status": "active",
  "updated_at": "2026-05-07T09:30:00Z",
  "created_at": "2026-05-07T09:30:00Z"
}
```

GET
`/v1/organizations/current`

## [Get Current Organization](#get-current-organization)

Returns the organization associated with the API credential.

GET
`/v1/organizations/current`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/organizations/current \
  -H "Authorization: Bearer flb_live_…"
```
