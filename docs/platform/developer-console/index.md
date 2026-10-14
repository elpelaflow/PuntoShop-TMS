---
title: "Developer Console"
url: https://fleetbase.io/docs/platform/developer-console
module: platform
---

Platform

# Developer Console

The Developer Console gives you the tools to authenticate API calls, receive event notifications, and monitor real-time traffic across your Fleetbase instance.

# Developer Console

The
**Developer Console**
is the integration hub built into the Fleetbase Console. It is accessible from the main sidebar under
**Developers**
and provides everything you need to connect external systems, build custom applications, and monitor API activity.

![Developer Console sidebar — Developers section with API Keys, Webhooks, Socket Events, System Events, and Request Logs](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-keys-list.ae033a14.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Sections

| Section | Purpose |
| --- | --- |
| [API Keys](https://fleetbase.io/docs/platform/developer-console/api-keys) | Generate and manage authentication credentials for the Fleetbase REST API |
| [Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks) | Subscribe to platform events and receive HTTP callbacks when they fire |
| [Socket Events](https://fleetbase.io/docs/platform/developer-console/socket-events) | Monitor real-time WebSocket channels broadcasting live platform activity |
| [System Events](https://fleetbase.io/docs/platform/developer-console/system-events) | Browse a searchable log of all API events emitted by the platform |
| [Request Logs](https://fleetbase.io/docs/platform/developer-console/request-logs) | Inspect a full history of every API request made to your instance |

## Test vs. Live Mode

Every organization has two isolated environments:
**Test**
and
**Live**
.

* **Test mode**
  — data is completely separate from production. API keys, webhooks, and request logs created or received in test mode are invisible in live mode and vice versa.
* **Live mode**
  — used for real operations and production traffic.

Toggle between environments using the
**Test mode**
switch in the top navigation bar of the console. The Developer Console reflects only the data for the currently active environment — switching environments changes which API keys, webhooks, and logs are shown.
