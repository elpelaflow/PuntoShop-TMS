---
title: "Overview"
url: https://fleetbase.io/docs/ui/services/overview
module: ui
---

# Overview

The six injectable services exported by @fleetbase/ember-ui — Modals Manager, Sidebar, Dashboard, Template Builder, Resource Context Panel, Leaflet.

# Services

`@fleetbase/ember-ui`
exports six injectable Ember services. Inject them like any other Ember service:

```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {
  @service modalsManager;
  @service sidebar;
  @service resourceContextPanel;
  @service dashboard;
  @service templateBuilder;
  @service leaflet;
}
```

## Available Services

Modals Manager

Open, stack, and dismiss modals. Built-in confirm/alert/prompt/bulk/progress/process/loader layouts.

[Modals Manager →](https://fleetbase.io/docs/ui/modals/modals-manager)

Sidebar

Show, hide, minimize, enable, disable the console sidebar.

[Sidebar →](https://fleetbase.io/docs/ui/services/sidebar)

Resource Context Panel

Open contextual detail overlays for any resource — single-content or tabbed, with route-sync.

[Resource Context Panel →](https://fleetbase.io/docs/ui/services/resource-context-panel)

Dashboard

Manage dashboards and widgets — load, switch, create, delete, edit.

[Dashboard →](https://fleetbase.io/docs/ui/dashboard/service)

Template Builder

Register Fleetbase model classes as queryable resource types in the template builder's query form.

[Template Builder Service →](https://fleetbase.io/docs/ui/services/template-builder)

Leaflet

Shared Leaflet map state for any component using the Leaflet integration.

Leaflet (no dedicated page yet)

## Source

| File | Description |
| --- | --- |
| `addon/services/modals-manager.js` | Modals Manager service |
| `addon/services/sidebar.js` | Sidebar service |
| `addon/services/resource-context-panel.js` | Resource Context Panel service |
| `addon/services/dashboard.js` | Dashboard service |
| `addon/services/template-builder.js` | Template Builder service |
| `addon/services/leaflet.js` | Leaflet map state service |
