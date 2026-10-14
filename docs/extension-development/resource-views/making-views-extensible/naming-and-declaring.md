---
title: "Naming and Declaring"
url: https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/naming-and-declaring
module: extension-development
---

Resource Views

Making Your Views Extensible

# Naming and Declaring

Choose your engine's registry names through ResourceActionService, and declare every registry for your resources in setupExtension.

# Naming and Declaring

## Naming

Your registry names follow the same rule as every other engine's:
`<extension>:<resource>:<surface>:<slot>`
. The
`extension`
part is your engine's segment in the console URL: an engine mounted at
`console.acme`
uses
`acme`
.

If your action services extend
`ResourceActionService`
, they work the names out from what you already pass to
`initialize()`
:

```
// addon/services/shipment-actions.js
import ResourceActionService from '@fleetbase/ember-core/services/resource-action';

export default class ShipmentActionsService extends ResourceActionService {
    constructor() {
        super(...arguments);
        this.initialize('acme-shipment', { permissionPrefix: 'acme', mountPrefix: 'console.acme' });
    }
}
```

| Property | Value | Comes from |
| --- | --- | --- |
| `registryExtension` | `acme` | `mountPrefix` , without `console.` |
| `registryResource` | `shipment` | The model name, without the extension's own prefix |
| `tableRegistry` | `acme:shipment:table` | Both |
| `detailsRegistry` | `acme:shipment:details` | Both |

### When the Model Name Isn't the Resource Name

Pass
`registryResource`
, and
`registryExtension`
if needed:

```
// The model is api-credential, but users know them as API keys
this.initialize('api-credential', { permissionPrefix: 'developers', mountPrefix: 'console.developers', registryResource: 'api-key' });

// Two views of the contact model
this.initialize('contact', { defaultAttributes: { type: 'customer' }, registryResource: 'customer' });
```

Choose names users would recognise from the screen: the resource name is what other extension authors type.

## Declaring

Declare your resources from
`setupExtension`
, so their registries exist before any extension registers into them:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        // …your menus, widgets and hooks

        universe.getService('universe/resource-view-service')?.declare('acme', ['shipment', 'carrier', 'manifest']);
    },
};
```

`declare(extension, resources)`
creates all seven registries for each resource, including the
`details:tabs`
alias, and returns their names.

The
`?.`
keeps your engine working in a console on an older ember-core, which doesn't have the service.

## Next

[Layouts →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)
: render registered items in your tables and details panels.

[Overview

Let other extensions add columns, actions, buttons and tabs to your own engine's tables and details views — what it takes, in five steps, and a checklist.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
[Layouts

Pass @registry to Layout::Resource::Tabular, Layout::Resource::Panel, TabularActions and resource context side panels, so they merge registered columns, actions, buttons and menu items.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/layouts)
