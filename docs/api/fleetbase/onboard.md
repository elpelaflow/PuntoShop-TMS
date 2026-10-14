---
title: "Onboard"
url: https://fleetbase.io/docs/api/fleetbase/onboard
module: api
---

# Onboard

Onboarding endpoints support initial API setup flows. Use them when a workflow needs to bootstrap or verify account context before consuming operational resources.

* [Get Driver Onboard Settings

  GET
  `/v1/onboard/driver-onboard-settings/:companyId`](#get-driver-onboard-settings)

GET
`/v1/onboard/driver-onboard-settings/:companyId`

## [Get Driver Onboard Settings](#get-driver-onboard-settings)

Returns driver onboarding settings for an organization.

GET
`/v1/onboard/driver-onboard-settings/:companyId`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/onboard/driver-onboard-settings/:companyId \
  -H "Authorization: Bearer flb_live_…"
```
