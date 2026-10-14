---
title: "Registry Service"
url: https://fleetbase.io/docs/extension-development/universe/registry-service
module: extension-development
---

# Registry Service

Create registries, register components into other extensions' slots, and register cross-engine components, services, and helpers — via universe.getService('registry').

# Registry Service

The
`registry`
service is the storage layer behind the menu, widget, and hook services — and the place to register your own component contributions and registries.

You'll touch it for two main reasons:

1. **Inject a component into another extension's slot**
   — e.g., a tab panel into Fleet-Ops's vehicle detail
2. **Create your own registry**
   — so other extensions can plug into yours

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const registryService = universe.getService('registry');
        // …
    },
};
```

## Two-Level Storage

Registries are organized as
**`section → list → items`**
. For example:

* `console:admin`
  (section) →
  `menu-item`
  (list) → admin items
* `console:admin`
  (section) →
  `menu-panel`
  (list) → admin panels
* `fleet-ops:component:order:details`
  (section) →
  `components`
  (list) → renderable components

The menu service writes into
`<registry>:menu-item`
lists; the registry service's
`registerRenderableComponent`
writes into the
`components`
list. You usually don't need to think about lists — the dedicated registrars handle them.

## registerRenderableComponent(registryName, component, options?)

Inject a component into a host extension's slot. The host renders it via
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

registryService.registerRenderableComponent(
    'fleet-ops:component:order:details',
    new ExtensionComponent('@fleetbase/ledger-engine', 'order-invoice-summary')
);
```

Forms supported for the
`component`
argument:

| Form | Example |
| --- | --- |
| `ExtensionComponent` instance | `new ExtensionComponent('@fleetbase/my-engine', 'components/my-tab')` |
| Component class with `engineName` option | `MyComponent` + `{ engineName: '@my-org/my-engine' }` |
| Array of any of the above | Iterates and registers each |

### Well-Known Renderable-Component Registries

Real engines expose these slots (extracted from the
`extension.js`
files of the open-source extensions):

| Registry | Where it renders |
| --- | --- |
| `fleet-ops:component:order:details` | Tabs/panels in the order detail view |
| `fleet-ops:component:driver:details` | Tabs/panels in the driver detail view |
| `fleet-ops:component:vehicle:details` | Tabs/panels in the vehicle detail view |
| `fleet-ops:component:map:drawer` | Items in the Fleet-Ops map drawer |
| `fleet-ops:contextmenu:vehicle` | Right-click context-menu on a vehicle |
| `fleet-ops:contextmenu:driver` | Right-click context-menu on a driver |
| `fleet-ops:template:settings:routing` | Components on the routing settings page |
| `fleet-ops:template:settings:orchestrator` | Components on the orchestrator settings page |
| `fleet-ops:component:admin:routing-settings` | Components on the admin routing settings page |
| `fleet-ops:template:operations:orders:new:entities-input` | Custom inputs in the new-order entities flow |
| `@fleetbase/console` | App-wide tour/launcher/guard components (rare — only system extensions use this) |

For Fleet-Ops's full list of slots, see
`fleetops/addon/extension.js#createRegistries`
.

## createRegistry(name) / createRegistries(names)

Create your own registries so other extensions can plug into them.

```
const registryService = universe.getService('registry');

registryService.createRegistries([
    'my-extension:sidebar',
    'my-extension:order:tabs',
    'my-extension:dashboard:widgets',
]);
```

Other extensions can then
`registerRenderableComponent('my-extension:sidebar', …)`
and your templates yield via
`<RegistryYield>`
.

## getRenderableComponents(registryName)

Read the components in a registry. Useful when iterating in your own template:

```
get sidebarComponents() {
    return this.universe.getService('registry').getRenderableComponents('my-extension:sidebar');
}
```

## Lower-Level Registry API

These methods underpin the higher-level registrars. You'll rarely call them directly.

| Method | Purpose |
| --- | --- |
| `register(sectionName, listName, key, value)` | Base method — write any value to any `(section, list, key)` slot |
| `lookup(sectionName, listName, key)` | Read a single item |
| `getRegistry(sectionName, listName)` | Read an entire list as an array |
| `getSection(sectionName)` | Read all lists in a section |
| `getAllFromPrefix(sectionName, listName, prefix)` | Partial-key lookup |
| `hasSection(name)` / `hasList(section, list)` | Existence checks |
| `clearList(section, list)` / `clearSection(section)` / `clearAll()` | Removal |
| `createSection(name)` / `createSections(names)` | Lower-level section creation |

## Registering Components, Services, and Helpers Globally

Beyond renderable components, the registry service can also register first-class components, services, and helpers into the host application's container — making them available to every engine:

### registerComponent(name, ComponentClass, options?)

Make a component available to all engines by name.

```
import MyComponent from './components/my-component';
registryService.registerComponent('my-component', MyComponent);
```

### registerService(name, ServiceClass, options?)

Make a service available to all engines by name.

```
import MyService from './services/my-service';
registryService.registerService('my-service', MyService);
```

### registerHelper(helperName, helperOrTemplateHelper, options?)

Register a Handlebars helper. Supports lazy-loading via the
`TemplateHelper`
contract:

```
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';

registryService.registerHelper(
    'calculate-freight-distance',
    new TemplateHelper('@fleetbase/fleetops-engine', 'helpers/calculate-freight-distance')
);
```

Most extensions don't need these global registrars — engine-local components, services, and helpers are auto-resolved by Ember within your engine. Use these only when something must be visible to
**other**
engines.

## Real-World References

| Extension | Pattern | Source |
| --- | --- | --- |
| Fleet-Ops | Creates 40+ registries for its own slots | `packages/fleetops/addon/extension.js` |
| Ledger | Registers an order-details tab into Fleet-Ops | `packages/ledger/addon/extension.js` |
| VROOM | Registers `fleet-ops:template:settings:routing` and `fleet-ops:component:admin:routing-settings` | `packages/fleetops/addon/extension.js` |
| Valhalla | Registers settings components into Fleet-Ops routing slots | `packages/fleetops/addon/extension.js` |
| IAM Engine | Registers auth and access components into console slots | `packages/iam-engine/addon/extension.js` |

## See Also

* [`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
  — render registry contents in templates
* [`ExtensionComponent`
  contract](https://fleetbase.io/docs/extension-development/reference/contracts#extensioncomponent)
* [Menu Service](https://fleetbase.io/docs/extension-development/universe/menu-service)
  — for menu-item registries
* [Resource View Service](https://fleetbase.io/docs/extension-development/universe/resource-view-service)
  — columns, actions and buttons in other engines' tables and details views

## Source

| File | Description |
| --- | --- |
| `addon/services/universe/registry-service.js` | RegistryService implementation |
| `addon/contracts/extension-component.js` | `ExtensionComponent` |
| `addon/contracts/registry.js` | `Registry` |
