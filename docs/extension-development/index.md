---
title: "Extension Development"
url: https://fleetbase.io/docs/extension-development
module: extension-development
---

# Extension Development

Fleetbase is designed from the ground up to be modular. The core console and API ship a small surface; everything else — Fleet-Ops, Ledger, Valhalla, Vroom — is an extension built against the same APIs you'll use to build your own.

This section is your reference for building those extensions.

**Two halves, one extension.**
A Fleetbase extension is a single repository that ships
**both**
an Ember.js addon (the console UI) and a Laravel package (the API). The same
`flb scaffold`
command generates both halves wired together. See
[Architecture](https://fleetbase.io/docs/extension-development/architecture/overview)
.

## What Powers Your Extension

Two foundational packages give your extension everything it needs — services, contracts, base classes, and helpers. You import from them; you don't modify them.

| Package | What it provides |
| --- | --- |
| **`@fleetbase/ember-core`** | Ember.js addon — the `UniverseService` and its sub-services, contracts ( `MenuItem` , `Widget` , `Hook` , `ExtensionComponent` ), shared host services ( `fetch` , `store` , `notifications` , `currentUser` , …), decorators, and a base adapter for talking to the API |
| **`fleetbase/core-api`** | Composer package — the `CoreServiceProvider` your extension extends, route macros ( `fleetbaseRoutes` , `fleetbaseRestRoutes` ), expansions, observer auto-registration, traits ( `HasUuid` , `HasPublicId` ), the `NotificationRegistry` , `SmsService` , and the SocketCluster broadcaster |

The console wires both halves together at boot — you write your extension against these packages, scaffold links it into a running Fleetbase instance, and your features show up.

## What You'll Build

Get Started

Scaffold a new extension, link it into your local Fleetbase, and run it for the first time.

[Quickstart →](https://fleetbase.io/docs/extension-development/getting-started/quickstart)

Architecture

How an extension is structured — addon + server, manifest, and engine loading.

[Architecture →](https://fleetbase.io/docs/extension-development/architecture/overview)

Universe Service

The frontend extensibility API — register menu items, components, widgets, and hooks via
`addon/extension.js`
.

[Universe Service →](https://fleetbase.io/docs/extension-development/universe/overview)

Frontend Development

Routes, templates, and components inside your Ember engine.

[Frontend →](https://fleetbase.io/docs/extension-development/frontend/routing)

Backend Development

Service providers, routes, controllers, models, migrations, expansions, observers, and resource transformers.

[Backend →](https://fleetbase.io/docs/extension-development/backend/service-provider)

Publishing

Bundle, version, and publish your extension to the Fleetbase Extension Registry.

[Publishing →](https://fleetbase.io/docs/extension-development/publishing/overview)

## How Extensions Plug Into the Console

Every modern extension declares a single
**`addon/extension.js`**
file at the root of its addon. The file exports a default object with a
`setupExtension(app, universe)`
hook — the console calls it once at boot.

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        menuService.registerHeaderMenuItem('My Extension', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'My custom logistics feature.',
        });
    },
};
```

The
`universe`
parameter is the
[`UniverseService`](https://fleetbase.io/docs/extension-development/universe/overview)
— the central registry for the whole platform. Through it you reach the menu, registry, widget, and hook sub-services.

See
[Universe Service](https://fleetbase.io/docs/extension-development/universe/overview)
for the full API.

## Where to Start

If this is your first extension, follow the
[Quickstart](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
— it walks through scaffolding, linking to a running Fleetbase, and the first round-trip to the API.

If you've scaffolded one already and want depth on a specific topic, jump to:

* [Universe Service →](https://fleetbase.io/docs/extension-development/universe/overview)
* [Frontend Routing →](https://fleetbase.io/docs/extension-development/frontend/routing)
* [Backend Service Provider →](https://fleetbase.io/docs/extension-development/backend/service-provider)
* [Publishing →](https://fleetbase.io/docs/extension-development/publishing/overview)
