---
title: "Organizations"
url: https://fleetbase.io/docs/api/fleetbase/organizations
module: api
---

# Organizations

Organizations define the company context for API activity. Use organization endpoints to inspect the account associated with the current credential.

* [Get Current Organization

  GET
  `/v1/organizations/current`](#get-current-organization)
* [List Organizations

  GET
  `/v1/organizations`](#list-organizations)

GET
`/v1/organizations/current`

## [Get Current Organization](#get-current-organization)

Returns the organization associated with the API key on the request. Use it to confirm which account a credential belongs to, and to obtain the organization's id for endpoints that address an organization by path.

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

GET
`/v1/organizations`

## [List Organizations](#list-organizations)

Lists organizations available for driver onboarding and organization selection.

Query parameters

`limit`

integer

optional

Maximum number of organizations to return.

`with_driver_onboard`

boolean

optional

Includes organization driver-onboarding data when available.

GET
`/v1/organizations`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/organizations?limit=10&with_driver_onboard=false \
  -H "Authorization: Bearer flb_live_…"
```
