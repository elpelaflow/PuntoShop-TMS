---
title: "Overview"
url: https://fleetbase.io/docs/extension-development/universe/overview
module: extension-development
---

# Overview

The UniverseService is the central extensibility facade in @fleetbase/ember-core. It exposes sub-services for menus, registries, resource views, widgets, hooks, and engines — and is the single entry point your extension uses to plug into the console.

# Universe Service

The
**`UniverseService`**
is the central extensibility facade in
`@fleetbase/ember-core`
. It is the entry point your extension uses to register everything: menu items, components, widgets, hooks, registries, and engine integrations.

You access it through the
`setupExtension(app, universe)`
hook in your
`addon/extension.js`
:

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService     = universe.getService('menu');
        const registryService = universe.getService('registry');
        const widgetService   = universe.getService('widget');
        const hookService     = universe.getService('hook');

        // … register your contributions
    },
};
```

For the full extension-registration lifecycle, see
[Extension Registration](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
.

## Sub-Services

`UniverseService`
is a façade — most functionality lives in specialized sub-services that you reach via
`universe.getService(...)`
:

| Service | What it does | Page |
| --- | --- | --- |
| `menu` | Header items, settings, admin panels, organization & user dropdowns, custom registries | [Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service) |
| `registry` | Create & query registries; register renderable components, components, services, helpers | [Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service) |
| `resource-view` | Columns, row and bulk actions, and buttons in any engine's table and details views | [Resource View Service](https://fleetbase.io/docs/extension-development/universe/resource-view-service) |
| `widget` | Dashboard widgets and dashboards | [Widget Service](https://fleetbase.io/docs/extension-development/universe/widget-service) |
| `hook` | Lifecycle hooks ( `application:before-model` , `console:after-model` , etc.) | [Hook Service](https://fleetbase.io/docs/extension-development/universe/hook-service) |
| `extension-manager` | Engine loading & cross-engine integration | [Extension Manager](https://fleetbase.io/docs/extension-development/universe/extension-manager) |

## getService() Name Resolution

`getService()`
accepts several forms — they all resolve to the same sub-service:

| You can write | Resolves to |
| --- | --- |
| `'menu'` , `'menus'` | `universe/menu-service` |
| `'menu-service'` , `'menuService'` | `universe/menu-service` |
| `'universe/menu-service'` | `universe/menu-service` |
| `'registry'` , `'registry-service'` | `universe/registry-service` |
| `'resource-view'` , `'resourceView'` , `'resource-views'` , `'resource-view-service'` | `universe/resource-view-service` |
| `'widget'` , `'widgets'` , `'widget-service'` | `universe/widget-service` |
| `'hook'` , `'hooks'` , `'hook-service'` | `universe/hook-service` |

The kebab-case short form (
`'menu'`
,
`'widget'`
, etc.) is the canonical idiom in real
`addon/extension.js`
files — that's what every modern extension uses.

## Engine Lifecycle Methods

Beyond the sub-services,
`UniverseService`
exposes a handful of engine-loading helpers directly:

| Method | Purpose |
| --- | --- |
| `universe.whenEngineLoaded(name, cb)` | Run `cb(engineInstance, universe, app)` when the engine has booted. If it's already loaded, runs immediately. The recommended way to do cross-engine work |
| `universe.ensureEngineLoaded(name)` | Force-load an engine (returns a `Promise<EngineInstance>` ) |
| `universe.onEngineLoaded(name, cb)` | Event-only listener — does **not** fire if the engine is already loaded. Prefer `whenEngineLoaded` |
| `universe.getEngineInstance(name)` | Returns the loaded engine instance, or `null` |
| `universe.getServiceFromEngine(engineName, serviceName, options?)` | Look up a service inside another engine |
| `universe.extensionManager.isInstalled(name)` | Whether an extension is installed in this Fleetbase deployment |

These all delegate to the
[Extension Manager](https://fleetbase.io/docs/extension-development/universe/extension-manager)
.

## Façade Convenience Methods

For backward compatibility,
`UniverseService`
itself exposes thin pass-through methods that delegate to the sub-services. For example:

* `universe.registerHeaderMenuItem(...)`
  →
  `menuService.registerHeaderMenuItem(...)`
* `universe.registerHook(...)`
  →
  `hookService.registerHook(...)`
* `universe.createRegistry(...)`
  →
  `registryService.createRegistry(...)`
* `universe.registerRenderableComponent(...)`
  →
  `registryService.registerRenderableComponent(...)`

**Prefer the sub-service form**
(
`universe.getService('menu').registerHeaderMenuItem(...)`
) — it's the canonical idiom, makes the intent explicit, and avoids deprecated façade aliases like
`registerDashboardWidgets`
.

## A Complete addon/extension.js

A representative example combining several sub-services:

```
// addon/extension.js
import { MenuItem, Widget, ExtensionComponent, Hook } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService     = universe.getService('menu');
        const registryService = universe.getService('registry');
        const widgetService   = universe.getService('widget');
        const hookService     = universe.getService('hook');

        // 1. Top-level header item
        menuService.registerHeaderMenuItem('My Extension', 'console.my-extension', {
            icon: 'puzzle-piece',
            description: 'My custom logistics feature.',
        });

        // 2. Settings item
        menuService.registerSettingsMenuItem(
            new MenuItem({
                title: 'My Extension',
                slug: 'my-extension',
                icon: 'gear',
                component: new ExtensionComponent('@my-org/my-extension-engine', 'settings'),
            })
        );

        // 3. Inject a component into another extension's slot
        registryService.registerRenderableComponent(
            'fleet-ops:component:order:details',
            new ExtensionComponent('@my-org/my-extension-engine', 'my-order-tab')
        );

        // 4. Register a dashboard widget
        widgetService.registerWidgets('dashboard', [
            new Widget({
                id: 'my-extension-stats',
                name: 'My Stats',
                icon: 'chart-line',
                component: new ExtensionComponent('@my-org/my-extension-engine', 'widget/my-stats'),
                grid_options: { w: 6, h: 6, minW: 4, minH: 4 },
            }),
        ]);

        // 5. Hook into the console boot
        hookService.registerHook(
            new Hook('console:after-model', (session, router) => {
                // do something after the user is authenticated
            })
        );
    },
};
```

## Real-World References

| Extension | Pattern shown | Source |
| --- | --- | --- |
| Fleet-Ops | Header item with shortcuts, admin panel, custom registries (40+), widget | `packages/fleetops/addon/extension.js` |
| VROOM | `whenEngineLoaded` to register a route-optimization provider into Fleet-Ops | `packages/fleetops/addon/extension.js` |
| Valhalla | `whenEngineLoaded` to register a routing engine into Fleet-Ops | `packages/fleetops/addon/extension.js` |
| Ledger | Custom dashboard, multiple widgets, Fleet-Ops order-details tab | `packages/ledger/addon/extension.js` |
| IAM Engine | Identity & Access Management, auth hooks, console permissions | `packages/iam-engine/addon/extension.js` |

## Source

| File | Description |
| --- | --- |
| `addon/services/universe.js` | The `UniverseService` façade |
| `addon/services/universe/` | All five sub-services |
| `addon/contracts/` | `MenuItem` , `Widget` , `Hook` , `ExtensionComponent` , etc. |

[Extension Registration

How addon/extension.js wires your extension into the Fleetbase console boot lifecycle. The setupExtension hook, onEngineLoaded, and the contract every extension implements.](https://fleetbase.io/docs/extension-development/architecture/extension-registration)
[Menu Service

Register navigation entries in the console — header items, settings panels, admin panels, organization & user menus, and custom registries — via universe.getService('menu').](https://fleetbase.io/docs/extension-development/universe/menu-service)
