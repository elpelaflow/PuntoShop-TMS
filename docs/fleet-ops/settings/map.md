---
title: "Map Settings"
url: https://fleetbase.io/docs/fleet-ops/settings/map
module: fleet-ops
---

# Map Settings

Choose the map tile provider Fleet-Ops uses for the live map and route overlays.

# Map Settings

**Map Settings**
are intentionally minimal in Fleet-Ops — the only thing you configure here is which
**map provider**
renders the tiles for the live map. Everything else (default viewport, marker behaviour, clustering, theme) is driven by the active provider's defaults and the page-level Leaflet options used by Fleet-Ops components.

Navigate to
**Fleet-Ops → Settings → Map**
.

![Map settings panel — Map Provider dropdown with Leaflet / Google Maps](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-map-settings.5ec1cfae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Map Provider

The single setting on this page. The
`mapProvider`
value selects which tile source Fleet-Ops uses across the console — the live map, route overlays, position replays, and order detail maps all read from the active provider.

| Provider | Value | Notes |
| --- | --- | --- |
| **Leaflet** | `leaflet` | Default. Uses the configured Leaflet tile source (typically OpenStreetMap or a Leaflet-compatible tile server). No API key required for OSM tiles. |
| **Google Maps** | `google` | Switches to Google's tile server. Requires a Google Maps API key configured at the platform level. |

Click
**Save Changes**
to persist the selection. The change applies on the next time a map view is rendered — no page refresh required for new dispatches.

Extensions can register additional map providers at runtime via the
`fleet-ops:template:settings:map`
registry. If your instance has extra options in the dropdown, they were added by an installed extension.

## Extending Map Settings

The Map settings page exposes an extension point at the registry key
`fleet-ops:template:settings:map`
. Extensions that need to expose their own map-related settings (heat-map overlays, custom layers, alternate tile providers) register a panel against that key and it renders below the provider selector. See
[Extensions](https://fleetbase.io/docs/platform/extensions/managing-extensions)
for the registry pattern.
