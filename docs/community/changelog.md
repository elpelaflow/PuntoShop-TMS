---
title: "Changelog"
url: https://fleetbase.io/docs/community/changelog
module: community
---

# Changelog

Release notes and version history across the Fleetbase platform — core API, Console, extensions, and mobile apps.

# Changelog

Fleetbase is a modular platform composed of several independent repositories, each with its own release cycle. Release notes are maintained on GitHub Releases for each repository.

## Platform Releases

| Repository | What it covers | Releases |
| --- | --- | --- |
| **fleetbase/fleetbase** | Core platform — API, Console, IAM, Developer Console | [View releases →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |
| **PuntoShop-TMS (Fleet-Ops)** | Fleet-Ops extension — fleet management, dispatch, tracking | [View releases →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |
| **PuntoShop-TMS (Ledger)** | Ledger extension — accounting and invoicing | [View releases →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |

## Mobile App Releases

| Repository | What it covers | Releases |
| --- | --- | --- |
| **Navigator App** | Navigator driver app (React Native) | [View releases →](https://github.com/elpelaflow/PuntoShop-TMS/releases) |

## CLI Releases

| Repository | What it covers | Releases |
| --- | --- | --- |
| **fleetbase/fleetbase-cli** | Fleetbase CLI — install, publish, and manage extensions | [View releases →](https://github.com/elpelaflow/PuntoShop-TMS-cli/releases) |

## Subscribing to Release Notifications

To receive an email when a new version is published:

Go to the GitHub repository you want to follow (e.g.
[fleetbase/fleetbase](https://github.com/elpelaflow/PuntoShop-TMS)
).

Click the
**Watch**
button in the top-right corner of the repository page.

Select
**Custom**
, then check
**Releases**
.

Click
**Apply**
. GitHub will now email you whenever a new release is published.

## Major Announcements

For high-level product announcements, new extension launches, and company news:

* **Discord
  `#announcements`**
  — join the
  [Discord server](https://fleetbase.io/docs/community/discord)
  and watch the
  `#announcements`
  channel
* **Twitter/X**
  — follow
  [@fleetbase\_io](https://twitter.com/fleetbase_io)

## Upgrading

When a new core platform release is available, pull the latest images and run the deploy script:

```
git pull origin main
docker compose pull
docker compose exec application bash -c "./deploy.sh"
docker compose up -d
```

The
`deploy.sh`
script handles database migrations, cache clearing, and any other steps required by the release. See
[Deploy in Cloud](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)
for full upgrade instructions.

Always review the release notes for breaking changes before upgrading a production instance. Extension packages may require separate updates when the core platform version changes.
