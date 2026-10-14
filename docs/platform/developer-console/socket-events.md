---
title: "Socket Events"
url: https://fleetbase.io/docs/platform/developer-console/socket-events
module: platform
---

# Socket Events

Monitor live WebSocket channels and subscribe to real-time event streams from your Fleetbase instance.

# Socket Events

Fleetbase uses
**SocketCluster**
to broadcast real-time events over WebSocket connections. The Socket Events panel in the Developer Console lets you browse available channels and watch live event output directly in the console. Navigate to
**Developers → Socket Events**
.

![Socket Events list — Listen button and Channel name columns for each available channel](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets.f6494e94.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Available Channels

The panel lists all channels available for your organization:

| Channel | Description |
| --- | --- |
| `api.{key_id}` | One channel per API key — broadcasts events scoped to that credential |
| `company.{company_id}` | Your organization's main channel — broadcasts all events for your org regardless of which key triggered them |

## Listening on a Channel

Click
**Listen**
on any row to open the real-time event view for that channel.

![Channel live view — black terminal panel with green monospace event output and timestamps](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets-channel.b1fa8f58.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

The channel view displays a black terminal-style output panel. As events arrive they appear as timestamped lines in green monospace text. If no events have fired yet a spinner shows
**Awaiting events…**
.

Each line shows the time the event was received and its JSON payload, formatted for readability.

## Listening on a Custom Channel

Click
**Listen on custom channel**
in the header to enter any channel name manually — useful when you know the exact channel identifier you want to observe.

![Listen on custom channel modal — channel ID input and Listen button](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-websockets-custom-channel.f1de2d09.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Connecting Programmatically

To receive socket events in your own application, connect to the Fleetbase SocketCluster server using the
`socketcluster-client`
library.

```
import socketClusterClient from 'socketcluster-client';

const socket = socketClusterClient.create({
    hostname: 'socket.your-instance.com',
    secure: true,
    port: 443,
});

socket.on('connect', () => {
    console.log('Connected to Fleetbase socket server');
});
```

### Subscribing to a Channel

```
// Listen on the company-wide channel
const channel = socket.subscribe('company.your-company-uuid');

(async () => {
    for await (const data of channel) {
        console.log('Event received:', data);
    }
})();
```

### Subscribing to an API Key Channel

```
// Listen on a specific API key channel
const channel = socket.subscribe('api.your-api-key-id');

(async () => {
    for await (const data of channel) {
        console.log('Event received:', data);
    }
})();
```

## Origin Restrictions

In production, restrict which origins can connect to your socket server. Configure this via the
`SOCKETCLUSTER_OPTIONS`
environment variable in your
`docker-compose.override.yml`
:

```
environment:
    SOCKETCLUSTER_OPTIONS: '{"origins":"https://yourdomain.com:*"}'
```

Without this restriction, any client that knows your socket server address can connect and receive event data. See
[System Setup → Socket](https://fleetbase.io/docs/platform/system-setup/socket)
for full configuration details.
