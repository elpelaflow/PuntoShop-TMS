---
title: "Fleetbase UI"
url: https://fleetbase.io/docs/ui
module: ui
---

# Fleetbase UI

**`@fleetbase/ember-ui`**
is the official component library for the Fleetbase Console. It is a core Ember.js addon that ships with every extension and provides the components, helpers, modifiers, and services you need to build a UI that looks and behaves like a native Fleetbase feature.

When you scaffold a new extension with
[`flb scaffold`](https://fleetbase.io/docs/cli/extension-development/scaffold)
,
`@fleetbase/ember-ui`
is already declared as a dependency — you don't need to install it manually.

**Console-only.**
This library is for building
**interfaces inside the Fleetbase Console and extensions**
.

## What's Included

| Category | What it covers |
| --- | --- |
| **Components** | 200+ reusable UI components — buttons, inputs, modals, tables, layouts, calendars, builders |
| **Helpers** | Template helpers — `format-currency` , `format-bytes` , `is-uuid` , permission checks, dot-prop access |
| **Modifiers** | Element modifiers — `set-height` , `imask` , `background-url` , dimension constraints |
| **Services** | Injectable services — `modals-manager` , `sidebar` , `dashboard` , `template-builder` , `resource-context-panel` , `leaflet` |

## What You Build With It

Extensions use ember-ui to render the entire surface area of a Fleetbase feature:

* **Console pages**
  — list views, detail views, settings panels
* **Modals**
  — confirmation dialogs, edit forms, multi-step wizards
* **Forms**
  — input groups, validation, model selects, file uploads
* **Tables**
  — sortable, filterable, paginated resource grids
* **Builders**
  — drag-and-drop report and template editors
* **Dashboards**
  — KPI widgets, charts, activity feeds

## Quick Example

A typical Fleetbase form built with ember-ui components:

```
<ContentPanel @title="Driver Details" @open={{true}}>
  <InputGroup @name="Name" @value={{@driver.name}} @required={{true}} />

  <InputGroup @name="Phone">
    <PhoneInput @value={{@driver.phone}} />
  </InputGroup>

  <InputGroup @name="Vehicle">
    <ModelSelect
      @modelName="vehicle"
      @selectedModel={{@driver.vehicle}}
      @onChange={{fn (mut @driver.vehicle)}}
    />
  </InputGroup>

  <div class="flex justify-end">
    <Button
      @type="primary"
      @icon="save"
      @text="Save"
      @onClick={{this.saveDriver}}
    />
  </div>
</ContentPanel>
```

## Browse the Library

Get Started

Install ember-ui in an extension and import your first component.

[Installation →](https://fleetbase.io/docs/ui/getting-started/installation)

Forms & Inputs

Build forms with InputGroup, Select, ModelSelect, FileUpload, and more.

[Inputs →](https://fleetbase.io/docs/ui/inputs/input-group)

Layout

Structure your pages with ContentPanel, Overlay, Drawer, and ResourceTabular.

[Layout →](https://fleetbase.io/docs/ui/layout/overview)
