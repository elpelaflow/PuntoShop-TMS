---
title: "Overview"
url: https://fleetbase.io/docs/ui/registry/overview
module: ui
---

# Overview

How extensions contribute UI into each other — registries, slots, and the <RegistryYield> component. Driven by addon/extension.js.

# Registry & Slots

Fleetbase extensions are isolated by default — each one ships its own components, services, and routes. But many features are richer when extensions can plug UI into each other:

* A payment-gateway extension contributing a configuration form into Ledger's gateway settings
* An analytics extension contributing a chart into the Fleet-Ops dashboard
* A document-signing extension contributing actions into Fleet-Ops transport orders

The
**registry system**
is how this happens. Extensions register components or menu items into named registries; the host extension uses
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
to iterate and render them.

## How It Works

```
Extension A (e.g. flespi)                       Host extension (e.g. fleet-ops)

   addon/extension.js
   └── setupExtension(app, universe) {           <RegistryYield
         universe                                  @registry="fleet-ops:component:vehicle:details"
           .getService('menu')                     as |Component context|>
           .registerMenuItem(                        <Component @vehicle={{context}} />
             'fleet-ops:component:vehicle:details', </RegistryYield>
             new MenuItem({ ... }))
       }
```

Both halves are decoupled — the host doesn't need to know which extensions will contribute, and contributors don't need to know what's downstream.

## Registries

A
**registry**
is a named bag of items. The naming convention is
`<host-extension>:<slot-name>`
:

| Example registry | What it holds |
| --- | --- |
| `engine:fleet-ops` | Settings menu items inside Fleet-Ops |
| `fleet-ops:contextmenu:vehicle` | Right-click context-menu items on a vehicle |
| `fleet-ops:component:vehicle:details` | Tabs / panels on the vehicle detail view |
| `fleet-ops:component:map:drawer` | Items in the Fleet-Ops map drawer |
| `fleet-ops:template:settings:routing` | Components in the routing settings |
| `auth:login` | Buttons on the login screen |

Each item is either a
**component**
(renders into the slot via
`<RegistryYield>`
) or a
**menu item**
(a
`MenuItem`
-shaped object).

## Registering Items via addon/extension.js

Every modern Fleetbase extension declares a single
`addon/extension.js`
that exports an object with a
`setupExtension(app, universe)`
hook. The console calls this hook once when the extension boots — this is where you register your contributions.

A minimal example:

```
// addon/extension.js
import { MenuItem, ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('menu');

        // Add a settings entry inside Fleet-Ops
        menuService.registerMenuItem(
            'engine:fleet-ops',
            new MenuItem({
                title: 'My Plugin Config',
                component: new ExtensionComponent('@my-org/my-plugin-engine', 'my-plugin-settings'),
                icon: 'gear',
                slug: 'my-plugin',
                section: 'settings',
            })
        );
    },
};
```

The
`setupExtension`
hook receives:

* **`app`**
  — the host Ember application instance
* **`universe`**
  — the Universe service, your entry point to every registry

## Available Universe Services

Look these up via
`universe.getService('<name>')`
:

| Service | Purpose |
| --- | --- |
| `menu` | Register menu items, header menu items, settings menu items |
| `registry` | Create and read registries; register renderable components |
| `widget` | Register dashboards and dashboard widgets |
| `hook` | Register lifecycle hooks (e.g. `application:before-model` ) |

## Common Patterns

### Add a Header Menu Item

```
// Register the extension's main entry in the console header
menuService.registerHeaderMenuItem('Fleet-Ops', 'console.fleet-ops', {
    icon: 'truck',
    priority: 0,
    description: 'Transport and fleet operations management.',
    shortcuts: [
        { title: 'Operations', icon: 'route', route: 'console.fleet-ops.operations.orders' },
        { title: 'Vehicles',   icon: 'truck', route: 'console.fleet-ops.management.vehicles' },
    ],
});
```

### Add a Settings Menu Item

```
menuService.registerSettingsMenuItem(
    new MenuItem({
        title: 'Ledger Settings',
        icon: 'book',
        slug: 'ledger-settings',
        view: 'index',
        component: new ExtensionComponent('@fleetbase/ledger-engine', 'ledger-admin-settings'),
    })
);
```

### Register a Component into a Slot

```
universe.registerRenderableComponent(
    'fleet-ops:template:settings:routing',
    new ExtensionComponent('@fleetbase/vroom-engine', 'organization/vroom-settings')
);
```

### Create a New Registry

If your extension wants other extensions to plug into it, create the registry first:

```
const registryService = universe.getService('registry');
registryService.createRegistries(['my-extension:sidebar', 'my-extension:detail-tabs']);
```

### Register a Hook

```
import { Hook } from '@fleetbase/ember-core/contracts';

const hookService = universe.getService('hook');
hookService.registerHook(
    new Hook('application:before-model', (session, router, transition) => {
        // run before the application route's model hook
    })
);
```

### Wait for Another Engine to Load

Some setup needs to happen only after another engine has loaded — e.g. registering a service provider into Fleet-Ops's route-optimization engine:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', async (fleetopsEngine, universe) => {
    const myEngine = await universe.extensionManager.ensureEngineLoaded('@my-org/my-engine');
    const routeOptimization = fleetopsEngine.lookup('service:route-optimization');
    const myProvider = myEngine.lookup('service:my-provider');
    routeOptimization.register('my-provider', myProvider);
});
```

### Register a Dashboard or Widget

```
const widgetService = universe.getService('widget');
widgetService.registerDashboard('fleetops');
```

## The Contracts

`@fleetbase/ember-core/contracts`
exports the canonical shapes you pass to the registries:

| Contract | Purpose |
| --- | --- |
| `MenuItem` | Menu entries — `{ title, route, component, icon, slug, section, shortcuts, onClick, ... }` |
| `ExtensionComponent` | A reference to a component in another engine — `new ExtensionComponent(engineName, componentName)` |
| `Widget` | Dashboard widget descriptor |
| `Hook` | Lifecycle hook — `new Hook(eventName, callback)` |

## Rendering Items

Wherever a host extension wants to expose a slot, it uses
`<RegistryYield>`
:

```
<RegistryYield @registry="fleet-ops:component:vehicle:details" @context={{this.vehicle}} as |Component ctx|>
  <Component @vehicle={{ctx}} />
</RegistryYield>
```

See
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
for the full component reference.

## Real-World Examples

These extensions all use
`addon/extension.js`
to register their contributions — read them as reference:

| Extension | What it registers | `addon/extension.js` |
| --- | --- | --- |
| Fleet-Ops | Header menu item with shortcuts, vehicle-detail panels, live map drawers, dashboard widgets | `packages/fleetops/addon/extension.js` |
| VROOM | Renderable settings components, route-optimization provider via `whenEngineLoaded` | `packages/fleetops/addon/extension.js` |
| Ledger | Invoice template context, settings panels, financial widgets | `packages/ledger/addon/extension.js` |
| IAM Engine | Identity & access controls, auth hooks, settings panels | `packages/iam-engine/addon/extension.js` |

## See Also

* [`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
  — render registry contributions in templates
* [Universe](https://fleetbase.io/docs/extension-development/universe)
  — the full Universe API reference
* [Extension Development](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
  — full extension authoring guide
