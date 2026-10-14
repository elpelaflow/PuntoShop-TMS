---
title: "Templates & Components"
url: https://fleetbase.io/docs/extension-development/frontend/templates-and-components
module: extension-development
---

# Templates & Components

Build engine templates and Glimmer components using @fleetbase/ember-ui — layout primitives, common widgets, and how to render extension components inside other engines.

# Templates & Components

Engine templates use standard Handlebars + Ember. The console ships a large component library —
**`@fleetbase/ember-ui`**
— that gives you matching chrome (layouts, headers, tables, modals, form inputs) without re-implementing styles.

## Templates

Engine templates live under
`addon/templates/`
, mirroring the route map:

```
addon/
├── routes.js                                 # this.route('orders', { ... })
├── routes/
│   └── orders.js
├── controllers/
│   └── orders.js
└── templates/
    ├── application.hbs                       # outermost layout for the engine
    └── orders.hbs                            # rendered for the orders route
```

The engine's
`application.hbs`
is your top-level layout — wrap content in the standard
`<Layout::Section>`
chrome so it sits correctly inside the console:

```
{{!-- addon/templates/application.hbs --}}
<Layout::Container>
    <Layout::Sidebar />
    <Layout::Section>
        {{outlet}}
    </Layout::Section>
</Layout::Container>
```

## Glimmer Components

Components live under
`addon/components/`
. Use Octane (
`@glimmer/component`
):

```
// addon/components/order-summary.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrderSummaryComponent extends Component {
    @service fetch;
    @service notifications;

    @tracked isLoading = false;

    @action
    async refresh() {
        this.isLoading = true;
        try {
            await this.fetch.get(`my-extension/v1/orders/${this.args.order.id}/refresh`);
            this.notifications.success('Refreshed');
        } finally {
            this.isLoading = false;
        }
    }
}
```

```
{{!-- addon/components/order-summary.hbs --}}
<div class="rounded-md border p-4">
    <h3 class="font-semibold">{{@order.public_id}}</h3>
    <Button @text="Refresh" @icon="rotate" @isLoading={{this.isLoading}} @onClick={{this.refresh}} />
</div>
```

## Using @fleetbase/ember-ui

`@fleetbase/ember-ui`
is already on your engine's resolver path — components are available globally without imports. The library covers the platform's design system; reach for it before building chrome from scratch.

**Full component reference:
[Fleetbase UI docs](https://fleetbase.io/docs/ui)
.**
Each component below links to its dedicated page with props, slots, examples, and edge cases.

### Layout primitives

| Component | Purpose | Docs |
| --- | --- | --- |
| `<Layout::Container>` | Outer wrapper with sidebar + section grid | [Layout overview](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Sidebar>` | Collapsible engine sidebar | [Layout overview](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section>` | Main content column with header/body slots | [Layout overview](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section::Header @title="…" />` | Page header bar | [Layout overview](https://fleetbase.io/docs/ui/layout/overview) |
| `<Layout::Section::Body>` | Scrollable body container | [Layout overview](https://fleetbase.io/docs/ui/layout/overview) |
| `<ContentPanel @title @open>` | Collapsible labeled section | [Content Panel](https://fleetbase.io/docs/ui/layout/content-panel) |
| `<Drawer>` | Slide-out side panel | [Drawer](https://fleetbase.io/docs/ui/layout/drawer) |
| `<Overlay>` | Backdrop + portal target | [Overlay](https://fleetbase.io/docs/ui/layout/overlay) |
| `<Spacer @height>` | Vertical spacing | [Spacer](https://fleetbase.io/docs/ui/layout/spacer) |

### Actions

| Component | Purpose | Docs |
| --- | --- | --- |
| `<Button @text @icon @type @onClick @isLoading />` | Variants: `primary` , `magic` , `danger` , etc. | [Button](https://fleetbase.io/docs/ui/actions/button) |
| `<ClickToCopy @value />` | Copy-on-click affordance | [Click to Copy](https://fleetbase.io/docs/ui/actions/click-to-copy) |
| `<ClickToReveal />` | Reveal hidden content (secrets, tokens) | [Click to Reveal](https://fleetbase.io/docs/ui/actions/click-to-reveal) |

### Display

| Component | Purpose | Docs |
| --- | --- | --- |
| `<Spinner />` | Loading indicator | [Spinner](https://fleetbase.io/docs/ui/display/spinner) |
| `<Badge @text @type />` | Status badges | [Badge](https://fleetbase.io/docs/ui/display/badge) |
| `<Pill @text />` | Compact label chip | [Pill](https://fleetbase.io/docs/ui/display/pill) |
| `<Table @data @columns />` | Sortable, paginatable data table | [Table](https://fleetbase.io/docs/ui/display/table) |
| `<Timeline />` | Vertical event timeline | [Timeline](https://fleetbase.io/docs/ui/display/timeline) |
| `<ActivityLog />` | Activity feed | [Activity Log](https://fleetbase.io/docs/ui/display/activity-log) |
| `<ProgressBar />` | Progress indicator | [Progress Bar](https://fleetbase.io/docs/ui/display/progress-bar) |

### Form Inputs

| Component | Purpose | Docs |
| --- | --- | --- |
| `<Select @options @onChange />` | Styled select | [Select](https://fleetbase.io/docs/ui/inputs/select) |
| `<MultiSelect />` | Multiple selection with chips | [Multi Select](https://fleetbase.io/docs/ui/inputs/multi-select) |
| `<ComboBox />` | Searchable dropdown | [Combo Box](https://fleetbase.io/docs/ui/inputs/combo-box) |
| `<Checkbox />` / `<Toggle />` | Boolean inputs | [Checkbox](https://fleetbase.io/docs/ui/inputs/checkbox) , [Toggle](https://fleetbase.io/docs/ui/inputs/toggle) |
| `<DatePicker />` / `<DateTimeInput />` | Date / date-time pickers | [Date Picker](https://fleetbase.io/docs/ui/inputs/date-picker) |
| `<MoneyInput />` | Currency-aware amount input | [Money Input](https://fleetbase.io/docs/ui/inputs/money-input) |
| `<UnitInput />` | Number with unit selector | [Unit Input](https://fleetbase.io/docs/ui/inputs/unit-input) |
| `<PhoneInput />` | International phone input | [Phone Input](https://fleetbase.io/docs/ui/inputs/phone-input) |
| `<FileUpload />` | Drag-and-drop file upload | [File Upload](https://fleetbase.io/docs/ui/inputs/file-upload) |
| `<CoordinatesInput />` | Lat/lng + map | [Coordinates Input](https://fleetbase.io/docs/ui/inputs/coordinates-input) |
| `<ModelSelect />` | Searchable Ember Data record picker | [Model Select](https://fleetbase.io/docs/ui/inputs/model-select) |
| `<InputGroup />` | Label + input + help text wrapper | [Input Group](https://fleetbase.io/docs/ui/inputs/input-group) |

For complete documentation — including extending components, slot content, and accessibility notes — see the
[Fleetbase UI documentation](https://fleetbase.io/docs/ui)
.

## Cross-engine Components

When another extension wants to render a component from your engine — say, on the Fleet-Ops order details page — the boundary crosses engines. You don't pass component names directly; you pass an
[`ExtensionComponent`](https://fleetbase.io/docs/extension-development/reference/contracts#extensioncomponent)
, which the host resolves lazily.

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ref = new ExtensionComponent(
    '@fleetbase/fleetops-engine',
    'order-tracking-card' // resolves to addon/components/order-tracking-card.{js,hbs}
);
```

The receiving registry (e.g.
`'fleet-ops:component:order:details'`
) renders
`ref`
via
`<LazyEngineComponent>`
, which loads the source engine on demand if it isn't already booted.

```
{{!-- inside the host engine --}}
<LazyEngineComponent
    @component={{this.extensionComponent}}
    @params={{this.componentArgs}}
/>
```

You don't usually invoke
`<LazyEngineComponent>`
yourself — the
[Registry Service](https://fleetbase.io/docs/extension-development/universe/registry-service)
and
[Virtual Routes](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
wire it for you.

## Tailwind & Styling

The console uses Tailwind utility classes and a small set of design tokens. Most
`ember-ui`
components accept utility class strings via
`@class`
or pass-through HTML attributes (
`class="…"`
). For one-off styles, scope them to your engine via component-tree CSS or Tailwind utilities.

If you need engine-scoped global CSS, drop a stylesheet under
`addon/styles/`
—
`ember-cli-build.js`
will pick it up.

## Services Available in Components

These host services are wired into your engine via
`@fleetbase/ember-core/exports`
and can be injected into any component.
**Detailed reference:
[Ember Services](https://fleetbase.io/docs/extension-development/reference/ember-services)
.**

| Service | Use for |
| --- | --- |
| [`fetch`](https://fleetbase.io/docs/extension-development/reference/ember-services#fetch) | Authenticated HTTP requests — pass `{ namespace }` to hit your extension's API |
| `store` | [Ember Data Store](https://api.emberjs.com/ember-data/release/modules/@ember-data%2Fstore) — `findRecord` , `query` , etc. |
| [`notifications`](https://fleetbase.io/docs/extension-development/reference/ember-services#notifications) | Toast notifications ( `success` , `error` , `info` , `warning` ) |
| [`currentUser`](https://fleetbase.io/docs/extension-development/reference/ember-services#current-user) | Logged-in user |
| [`session`](https://fleetbase.io/docs/extension-development/reference/ember-services#session) | Auth session, including `session.data.authenticated` |
| `modalsManager` | Imperative modal API |
| [`theme`](https://fleetbase.io/docs/extension-development/reference/ember-services#theme) | Set body classes, toggle dark mode |
| `intl` | i18n / translations |
| `abilities` | Role-based permission checks ( [ember-can](https://github.com/minutebase/ember-can#readme) ) |
| [`crud`](https://fleetbase.io/docs/extension-development/reference/ember-services#crud) | Generic CRUD action helpers |
| `events` | App-wide event bus |
| [`socket`](https://fleetbase.io/docs/extension-development/reference/ember-services#socket) | Real-time pub/sub |
| [`appCache`](https://fleetbase.io/docs/extension-development/reference/ember-services#app-cache) | Browser-storage-backed cache |
| `universe` | The universe service itself + sub-services |

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class extends Component {
    @service fetch;
    @service notifications;
    @service abilities;
}
```

## See Also

* **[Fleetbase UI](https://fleetbase.io/docs/ui)**
  — full component reference with props, slots, examples
* [Ember Services](https://fleetbase.io/docs/extension-development/reference/ember-services)
  — full reference for host services injectable into components
* [Ember Guides → Components](https://guides.emberjs.com/release/components)
  — upstream Ember documentation on Glimmer components
* [Ember Component API](https://api.emberjs.com/ember/release/classes/Component)

## Source

| File | Description |
| --- | --- |
| `packages/ember-ui/addon/components` | All shared UI components (source) |
| `packages/ember-core/addon/exports/services.js` | Services available to engines |

[Routing

How an extension's frontend Ember engine is structured — engine.js, routes.js, host service dependencies, and how routes are mounted into the Fleetbase console.](https://fleetbase.io/docs/extension-development/frontend/routing)
[Virtual Routes

How Fleetbase resolves dynamically-registered URLs against menu-item registries to render extension components without hardcoded routes.](https://fleetbase.io/docs/extension-development/frontend/virtual-routes)
