---
title: "Contracts"
url: https://fleetbase.io/docs/extension-development/reference/contracts
module: extension-development
---

# Contracts

Reference for every contract in @fleetbase/ember-core/contracts — MenuItem, MenuPanel, Widget, Hook, ExtensionComponent, TableColumn, ResourceAction, ActionButton, Registry, TemplateHelper, BaseContract.

# Contracts

The
**contracts**
in
`@fleetbase/ember-core/contracts`
are the canonical shapes you pass to the Universe sub-services. Use them — they validate inputs, normalize defaults, and serialize correctly when stored in registries.

## Importing

```
import {
    MenuItem,
    MenuPanel,
    Widget,
    Hook,
    ExtensionComponent,
    Registry,
    TableColumn,
    ResourceAction,
    ActionButton,
    BaseContract,
} from '@fleetbase/ember-core/contracts';

// TemplateHelper is not in the index — import directly:
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';
```

## MenuItem

Represents an entry in a menu — header, settings, admin, organization, user dropdown, or custom registry. Every menu registration accepts either a
`MenuItem`
instance or a plain object.

### Construction

```
// Form 1: title + route (plus optional chainables)
new MenuItem('Fleet-Ops', 'console.fleet-ops')
    .withIcon('route')
    .withPriority(0)
    .withDescription('Manage fleets, drivers, and live orders');

// Form 2: full definition object
new MenuItem({
    title: 'Settings',
    slug: 'my-extension',
    icon: 'gear',
    component: new ExtensionComponent('@my-org/my-engine', 'settings'),
});
```

### Properties

| Property | Default | Description |
| --- | --- | --- |
| `title` | — | Display text |
| `text` , `label` | falls back to `title` | Aliases |
| `id` | dasherized title | Stable identifier |
| `slug` | dasherized title | URL-safe key — used as the registry key |
| `route` | — | Ember route name |
| `section` | — | Sub-section grouping (e.g. `'support'` ) |
| `queryParams` | `{}` | Forwarded to the Ember route |
| `routeParams` | `[]` | Positional params |
| `view` | dasherized title | View identifier (used for virtual routes) |
| `icon` | `'circle-dot'` | FontAwesome icon |
| `iconPrefix` , `iconSize` , `iconClass` , `iconComponent` , `iconComponentOptions` | — | Icon overrides |
| `component` | — | An `ExtensionComponent` for the rendered content |
| `componentParams` | `{}` | Args forwarded to the component |
| `renderComponentInPlace` | `false` | Render the component in-place rather than via a portal |
| `class` , `inlineClass` , `wrapperClass` , `overwriteWrapperClass` | — | Styling hooks |
| `priority` | `9` | Lower = appears first |
| `index` | `0` | Secondary sort within priority |
| `type` | `'default'` | `'default'` or `'link'` |
| `buttonType` | — | Button-style type |
| `onClick` | — | `(menuItem, universe) => void` — auto-wrapped |
| `disabled` , `isLoading` | `false` | UI state |
| `permission` , `intl` | — | Permission key, i18n key |
| `items` | — | Sub-items |
| `description` | — | Shown in overflow / shortcuts |
| `shortcuts` | `[]` | Array of `{ title, description, icon, route }` for header items |
| `tags` | `[]` | Searchable tags |

### Chainables

`withIcon`
,
`withPriority`
,
`withComponent`
,
`withOnClick`
,
`withSlug`
,
`withQueryParams`
,
`withRouteParams`
,
`inSection`
,
`atIndex`
,
`withType`
,
`withWrapperClass`
,
`withComponentParams`
,
`renderInPlace`
,
`withDescription`
,
`withShortcuts`
,
`withTags`
,
`addShortcut`
.

## MenuPanel

A grouping of
`MenuItem`
s — used for admin-settings panels.

```
import { MenuPanel, MenuItem } from '@fleetbase/ember-core/contracts';

const panel = new MenuPanel({
    title: 'Fleet-Ops Config',
    slug: 'fleet-ops',
    items: [
        new MenuItem({ title: 'Routing', icon: 'route', component: ... }),
        new MenuItem({ title: 'Map', icon: 'map', component: ... }),
    ],
});
```

### Properties

| Property | Default | Description |
| --- | --- | --- |
| `title` | — | Panel heading |
| `slug` | dasherized title | Key used as the registry slot |
| `icon` | — | FontAwesome icon |
| `open` | `true` | Initial expand state |
| `priority` | `9` | Sort order |
| `items` | `[]` | `MenuItem` array |

### Chainables

`withSlug`
,
`withIcon`
,
`withPriority`
,
`addItem`
,
`addItems`
.

In practice you don't construct
`MenuPanel`
directly —
`menuService.registerAdminMenuPanel(label, items, options)`
does it for you.

## Widget

A dashboard widget descriptor.

### Construction

```
new Widget({
    id: 'fleet-ops-metrics',
    name: 'Fleet-Ops Metrics',
    description: 'Key metrics from Fleet-Ops',
    icon: 'truck',
    component: new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'),
    grid_options: { w: 12, h: 12, minW: 8, minH: 12 },
    options: { title: 'Fleet-Ops Metrics' },
    default: true,
});

// Or using chaining
new Widget('fleet-ops-metrics')
    .withName('Fleet-Ops Metrics')
    .withIcon('truck')
    .withComponent(new ExtensionComponent('@fleetbase/fleetops-engine', 'widget/fleet-ops-key-metrics'))
    .withGridOptions({ w: 12, h: 12, minW: 8, minH: 12 })
    .asDefault();
```

### Properties

| Property | Default | Description |
| --- | --- | --- |
| `id` | — | **Required** unique widget identifier (alias `widgetId` accepted) |
| `name` | — | Display name in the picker |
| `description` | — | Short description shown in the picker |
| `icon` | — | FontAwesome icon |
| `component` | — | `ExtensionComponent` instance, plain object, or string component path |
| `grid_options` | `{}` | `{ w, h, minW, minH }` for `grid-stack` |
| `options` | `{}` | Default options forwarded to the widget component |
| `category` | `'default'` | Picker category |
| `default` (constructor only) | `false` | If `true` , auto-added to the default widget list |

### Chainables

`withName`
,
`withDescription`
,
`withIcon`
,
`withComponent`
,
`withGridOptions`
,
`withOptions`
,
`withCategory`
,
`asDefault`
,
`isDefault`
,
`withTitle`
,
`withRefreshInterval`
.

## Hook

A lifecycle hook attached to a named event.

### Construction

```
new Hook('console:after-model', (session, router) => {
    // …
});

// With options
new Hook({
    name: 'application:before-model',
    handler: (session, router, transition) => { /* … */ },
    priority: 10,
    once: false,
    enabled: true,
});

// Chaining
new Hook('console:before-model')
    .execute((session, router) => { /* … */ })
    .withPriority(20)
    .once();
```

### Properties

| Property | Default | Description |
| --- | --- | --- |
| `name` | — | Event name ( `'console:after-model'` , `'application:before-model'` , etc.) |
| `handler` | — | The callback function |
| `priority` | `0` | Lower numbers run first |
| `runOnce` | `false` | If `true` , the hook removes itself after firing |
| `id` | auto-guid | Unique identifier — pass to `removeHook(name, id)` |
| `enabled` | `true` | When `false` , the hook is skipped |

### Chainables

`execute`
,
`withPriority`
,
`once`
,
`withId`
,
`setEnabled`
,
`enable`
,
`disable`
,
`withMetadata`
.

## ExtensionComponent

A reference to a component that lives in another engine. Used wherever a component is rendered cross-engine — menu items, widgets, registries.

### Construction

Three forms:

```
// Form 1: string component path inside an engine
new ExtensionComponent('@fleetbase/fleetops-engine', 'order-tracking-card');

// Form 2: a component class directly
import MyComponent from '../components/my-component';
new ExtensionComponent('@my-org/my-engine', MyComponent);

// Form 3: full options object
new ExtensionComponent('@my-org/my-engine', {
    path: 'components/my-component',
    loadingComponent: 'spinner',
    errorComponent: 'error-fallback',
});
```

### Properties

| Property | Description |
| --- | --- |
| `engine` | Engine name ( `'@fleetbase/fleetops-engine'` ) |
| `path` | Component path within the engine (string form) |
| `class` | Component class (when constructed from a class) |
| `name` | Resolved component name |
| `isClass` | `true` when constructed from a class |
| `loadingComponent` | Component shown while the engine is loading |
| `errorComponent` | Component shown if loading fails |

### Chainables

`withLoadingComponent`
,
`withErrorComponent`
,
`withData`
,
`withTimeout`
.

## TableColumn

A column added to another engine's table, registered into
`<extension>:<resource>:table:columns`
. See
[Registering](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
.

### Construction

```
new TableColumn({ id: 'acme-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
    .after('status')
    .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'))
    .withFilter('acme_score', 'filter/string');
```

### Properties

Every key a built-in column accepts is kept:
`label`
,
`valuePath`
,
`cellComponent`
,
`width`
,
`sticky`
,
`hidden`
,
`cellClassNames`
,
`wrapperClass`
, and the filter keys
`filterable`
,
`filterParam`
,
`filterComponent`
,
`filterLabel`
,
`filterOptions`
,
`filterFetchOptions`
,
`model`
and
`modelNamePath`
. In addition:

| Property | Default | Description |
| --- | --- | --- |
| `id` | — | **Required.** Identifies the column, and anchors other items' placement |
| `sortable` | `false` | Off unless the API can sort on `sortParam` / `valuePath` |
| `resizable` | `true` |  |
| `cellComponent` , `filterComponent` | — | A component name, or an `ExtensionComponent` from your engine |
| `permission` | — | The column is hidden from users without it |
| `before` , `after` | — | Place directly before or after the item with this id |
| `index` | — | Place at this position |
| `priority` | `10` | Lower is placed first |

### Chainables

`withLabel`
,
`withValuePath`
,
`withCellComponent`
,
`withFilter(filterParam, filterComponent = 'filter/string', options = {})`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

## ResourceAction

A dropdown item: a table row's actions (
`row-actions`
), the
**Bulk Actions**
menu (
`bulk-actions`
), or a details header's "…" menu (
`menu`
). See
[Registering](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions)
.

### Construction

```
new ResourceAction({ id: 'acme-sync', label: 'Sync to Acme', icon: 'rotate', permission: 'acme sync driver' })
    .withHandler((driver, ctx) => ctx.owner.lookup('service:acme').sync(driver))
    .visibleWhen((driver) => driver.status === 'active')
    .before('delete');
```

### Properties

| Property | Description |
| --- | --- |
| `id` | **Required** |
| `label` | Item text |
| `icon` , `iconPrefix` , `class` | Display |
| `fn` | `(target, ctx)` . `target` is the row ( `row-actions` ), the selected rows ( `bulk-actions` ) or the record ( `menu` ) |
| `isVisible` | `(target, ctx) => Boolean` for row actions and menu items |
| `permission` | Shown disabled without it (row and bulk actions) |
| `disabled` , `separator` |  |
| `before` , `after` , `index` , `priority` | Placement |

### Chainables

`withLabel`
,
`withIcon(icon, iconPrefix?)`
,
`withHandler(fn)`
,
`visibleWhen(isVisible)`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

## ActionButton

A header button: a table's toolbar (
`<extension>:<resource>:table:actions`
) or a details header (
`<extension>:<resource>:details:actions`
). See
[Registering](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons)
.

### Construction

```
new ActionButton({ id: 'acme-import', text: 'Import from Acme', icon: 'download' })
    .withHandler((ctx) => ctx.owner.lookup('service:acme').import());

// A dropdown
new ActionButton({ id: 'acme-more', text: 'Acme', icon: 'ellipsis-h' })
    .withItems([new ResourceAction({ id: 'acme-sync-all', label: 'Sync everything', fn: (resource, ctx) => {} })]);
```

### Properties

| Property | Description |
| --- | --- |
| `id` | **Required** |
| `text` , `icon` , `iconPrefix` , `type` , `size` , `helpText` , `class` | As for `<Button>` |
| `onClick` | `(ctx)` |
| `items` | `ResourceAction` s: makes the button a dropdown; each item's `fn` receives `(ctx.resource, ctx)` |
| `component` | Render a component instead: a name, or an `ExtensionComponent` |
| `isVisible` | `(ctx) => Boolean` |
| `permission` | Shown disabled without it |
| `before` , `after` , `index` , `priority` | Placement |

### Chainables

`withText`
,
`withIcon(icon, iconPrefix?)`
,
`withHandler(onClick)`
,
`withItems(items)`
,
`withComponent(component)`
,
`visibleWhen(isVisible)`
,
`before`
,
`after`
,
`withIndex`
,
`withPriority`
,
`withPermission`
.

## Registry

Represents a named registry. Most code refers to registries by string name (
`'header'`
,
`'fleet-ops:component:order:details'`
, etc.) —
`Registry`
is an explicit class for cases where you want to manipulate or namespace one in code.

```
new Registry('my-extension:sidebar');
```

### Chainables

`withNamespace`
,
`withSubNamespace`
.
`toString()`
returns the registry name.

In practice, prefer
`registryService.createRegistry('my-extension:sidebar')`
— it normalizes and registers the name in one step.

## TemplateHelper

A reference to a helper that lives in another engine. Used by
`registryService.registerHelper()`
for lazy-loaded helpers.

```
import TemplateHelper from '@fleetbase/ember-core/contracts/template-helper';

// Lazy from another engine
new TemplateHelper('@fleetbase/fleetops-engine', 'helpers/calculate-distance');

// Or a direct class
new TemplateHelper(null, MyHelperClass);
```

| Property | Description |
| --- | --- |
| `engineName` | Engine name (or `null` for direct class) |
| `path` | Helper path within the engine |
| `class` | Helper class (when constructed directly) |
| `isClass` | `true` for direct-class form |
| `name` | Resolved helper name |

## BaseContract

The shared base class. You won't construct it directly, but every contract above extends it.

| Method | Description |
| --- | --- |
| `setup()` | Subclasses call this after setting properties — triggers validation |
| `validate()` | Override to add validation logic |
| `toObject()` | Plain JS object for serialization |
| `setOption(k, v)` , `getOption(k, default?)` , `hasOption(k)` , `removeOption(k)` , `getOptions()` | Arbitrary options bag stored on `_options` |

## Internal-Only Contracts

These exist in source but aren't intended for direct extension use. They power Universe internals:

* `ExtensionBootState`
  — shared boot state
* `HookRegistry`
  — internal hook storage
* `UniverseRegistry`
  — internal registry storage

You'll only encounter them when reading source or extending Universe itself.

## Source

| File | Description |
| --- | --- |
| `addon/contracts/index.js` | Public exports |
| `addon/contracts/menu-item.js` | `MenuItem` |
| `addon/contracts/menu-panel.js` | `MenuPanel` |
| `addon/contracts/widget.js` | `Widget` |
| `addon/contracts/hook.js` | `Hook` |
| `addon/contracts/extension-component.js` | `ExtensionComponent` |
| `addon/contracts/registry.js` | `Registry` |
| `addon/contracts/template-helper.js` | `TemplateHelper` |
| `addon/contracts/base-contract.js` | `BaseContract` |
