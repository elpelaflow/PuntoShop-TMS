---
title: "Toolbar Buttons"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons
module: extension-development
---

Resource Views

Table Views

# Toolbar Buttons

Add a button to another engine's table header with ActionButton — a plain button, a dropdown of actions, or your own component — with every option and method.

# Toolbar Buttons

A toolbar button sits in the table's header, after the table's own buttons such as
**New**
and
**Export**
. It can be a plain button, a dropdown of actions, or a component of your own.

```
import { ActionButton } from '@fleetbase/ember-core/contracts';

universe.getService('resource-view').register(
    'iam:user:table:actions',
    new ActionButton({ id: 'acme-import-users', text: 'Import from Acme', icon: 'download' })
        .withPermission('iam create user')
        .withHandler((ctx) => ctx.owner.lookup('service:modals-manager').show('modals/acme-user-import', { title: 'Import users from Acme' }))
);
```

|  |  |
| --- | --- |
| **Slot** | `<extension>:<resource>:table:actions` |
| **Contract** | `ActionButton` , from `@fleetbase/ember-core/contracts` |
| **Handler** | `onClick(ctx)` |
| **Visibility check** | `isVisible(ctx)` , when the table renders |
| **Default spot** | After the table's own buttons |
| **Without the permission** | Shown disabled |

## Options

Prop

Type

`id`

string

`text
?`

string

`icon
?`

string

`iconPrefix
?`

string

`type
?`

'default' | 'primary' | 'secondary' | 'magic' | 'danger' | 'warning' | 'success' | 'link'

`size
?`

'xs' | 'sm' | 'md' | 'lg'

`helpText
?`

string

`onClick
?`

(ctx) => void

`items
?`

ResourceAction[]

`component
?`

string | ExtensionComponent

`isVisible
?`

(ctx) => boolean

`permission
?`

string

`disabled
?`

boolean

`wrapperClass
?`

string

`before
?`

string

`after
?`

string

`index
?`

number

`priority
?`

number

## Methods

| Method | Sets | Example |
| --- | --- | --- |
| `withText(text)` | `text` | `.withText('Import')` |
| `withIcon(icon, prefix?)` | `icon` , and `iconPrefix` if given | `.withIcon('download')` |
| `withHandler(fn)` | `onClick` | `.withHandler((ctx) => openImport(ctx))` |
| `withItems(items)` | `items` | `.withItems([new ResourceAction(…), …])` |
| `withComponent(component)` | `component` | `.withComponent(new ExtensionComponent('@acme/engine', 'acme-sync-status'))` |
| `visibleWhen(fn)` | `isVisible` | `.visibleWhen((ctx) => isEnabled(ctx))` |
| `withPermission(permission)` | `permission` | `.withPermission('acme import users')` |
| `before(id)` , `after(id)` , `withIndex(index)` , `withPriority(priority)` | Placement | `.before('create')` |

## Three Kinds of Button

### A Plain Button

`onClick`
receives the
[view context](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
. On a table, that includes
`controller`
and
`getSelectedRows()`
:

```
new ActionButton({ id: 'acme-sync', text: 'Sync with Acme', icon: 'rotate' })
    .withHandler(async (ctx) => {
        await ctx.owner.lookup('service:fetch').post('sync/drivers', {}, { namespace: 'acme/int/v1' });
        ctx.owner.lookup('service:router').refresh();
    });
```

### A Dropdown

Give the button
`items`
, each a
`ResourceAction`
. An item's handler receives
`(ctx.resource, ctx)`
; on a table there is no single record, so use the context:

```
import { ActionButton, ResourceAction } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-menu', text: 'Acme', icon: 'cloud' }).withItems([
    new ResourceAction({ id: 'acme-sync-all', label: 'Sync everything' }).withHandler((resource, ctx) => syncAll(ctx)),
    new ResourceAction({ id: 'acme-sync-log', label: 'Sync log' }).withHandler((resource, ctx) => openLog(ctx)),
    new ResourceAction({ id: 'acme-divider', separator: true }),
    new ResourceAction({ id: 'acme-settings', label: 'Acme settings…' }).withHandler((resource, ctx) => openSettings(ctx)),
]);
```

### Your Own Component

For anything a button can't do, such as a live status indicator or a toggle, render a component from your engine:

```
import { ActionButton, ExtensionComponent } from '@fleetbase/ember-core/contracts';

new ActionButton({ id: 'acme-sync-status' }).withComponent(new ExtensionComponent('@acme/sync-engine', 'acme-sync-status'));
```

The component receives the button's options as arguments, including
`@text`
,
`@icon`
,
`@size`
,
`@items`
,
`@permission`
,
`@disabled`
and
`@onClick`
.

```
// addon/components/acme-sync-status.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AcmeSyncStatusComponent extends Component {
    @service('acme-sync') acmeSync; // a service in your own engine

    get connected() {
        return this.acmeSync.connected;
    }
}
```

```
{{! addon/components/acme-sync-status.hbs }}
<div class="flex items-center space-x-2 text-sm">
    <span class="h-2 w-2 rounded-full {{if this.connected 'bg-green-500' 'bg-gray-400'}}"></span>
    <span>{{if this.connected "Acme connected" "Acme offline"}}</span>
</div>
```

## Examples

### Icon Only

```
new ActionButton({ id: 'acme-help', icon: 'circle-question', helpText: 'How Acme sync works' })
    .withHandler((ctx) => window.open('https://acme.example.com/help', '_blank'));
```

### Only When Your Integration Is Set Up

```
new ActionButton({ id: 'acme-import', text: 'Import from Acme', icon: 'download' })
    .visibleWhen((ctx) => ctx.owner.lookup('service:current-user').getOption('acme.connected') === true);
```

### Before a Built-in Button

```
new ActionButton({ id: 'acme-import', text: 'Import from Acme', icon: 'download' }).before('export');
```

Built-in button ids, such as
`refresh`
,
`create`
and
`export`
, are listed per table in the
[Registry Catalogue](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
.

## Related

* [Header Buttons](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  : the same contract, in a details view.
* [Bulk Actions](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions)
  : actions on the selected rows.
