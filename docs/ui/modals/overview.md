---
title: "Overview"
url: https://fleetbase.io/docs/ui/modals/overview
module: ui
---

# Overview

How modals work in @fleetbase/ember-ui — the modals-manager service, the built-in layouts, and how to build custom modal components.

# Modals

Modals in
`@fleetbase/ember-ui`
are driven by a single service —
`modals-manager`
— that mounts a component into a portal, manages a stack of nested modals, and exposes a Promise-based API.

## How They Work

```
modals-manager.show('modals/edit-driver', { title, driver, confirm })
       ↓
The component at addon/components/modals/edit-driver renders
       ↓
The user clicks Confirm or Decline
       ↓
The Promise returned by show() resolves (confirm) or rejects (decline)
```

You can also use one of the
**built-in layouts**
(
`confirm`
,
`alert`
,
`prompt`
,
`bulk`
,
`progress`
,
`process`
,
`loader`
,
`userSelectOption`
) which render their own component and only need options.

## Three Ways to Open a Modal

### 1. Built-in confirmation

```
this.modalsManager.confirm({
  title: 'Delete driver?',
  body: 'This cannot be undone.',
  acceptButtonScheme: 'danger',
  confirm: async () => await driver.destroyRecord(),
});
```

### 2. Built-in alert / prompt / bulk / progress / process / loader

```
this.modalsManager.alert({ title: 'Saved', body: 'Your changes are saved.' });
this.modalsManager.prompt({ title: 'Rename', confirm: async (m) => { /* … */ } });
this.modalsManager.loader({ title: 'Loading…' });
```

### 3. Custom modal component

```
this.modalsManager.show('modals/edit-driver', {
  title: 'Edit driver',
  driver,
  confirm: async (modal) => await modal.options.driver.save(),
});
```

The component at
`addon/components/modals/edit-driver`
renders inside the modal frame.

## Pages in This Section

modals-manager Service

The full service API — show, confirm, alert, prompt, bulk, progress, process, loader, and stack control.

[modals-manager →](https://fleetbase.io/docs/ui/modals/modals-manager)

Modal Layouts

The built-in layouts — what each looks like and which option fields they consume.

[Layouts →](https://fleetbase.io/docs/ui/modals/modal-layouts)

## Building a Custom Modal Component

Place your component under
`addon/components/modals/<name>.{hbs,js}`
. The component receives:

| Argument | Provided by | Purpose |
| --- | --- | --- |
| `@modalIsOpened` | manager | Boolean visibility flag |
| `@options` | `show()` caller | Everything you passed in `options` |
| `@onConfirm` | manager | Click handler for the confirm button |
| `@onDecline` | manager | Click handler for the decline button |

Use
`<Modal::Default>`
(or
`<Modal::Wide>`
,
`<Modal::Sidebar>`
, etc.) as the root template:

```
{{!-- addon/components/modals/edit-driver.hbs --}}
<Modal::Default
  @modalIsOpened={{@modalIsOpened}}
  @options={{@options}}
  @confirm={{@onConfirm}}
  @decline={{@onDecline}}
>
  <div class="modal-body-container">
    <InputGroup @name="Name" @value={{@options.driver.name}} />
    <InputGroup @name="Phone">
      <PhoneInput @value={{@options.driver.phone}} />
    </InputGroup>
  </div>
</Modal::Default>
```

The
`<Modal::Default>`
wrapper handles the backdrop, close button, header, footer, accept/decline buttons, and the Promise plumbing — your component just provides the body.

## See Also

* [`modals-manager`
  service](https://fleetbase.io/docs/ui/modals/modals-manager)
  — full API
* [Modal Layouts](https://fleetbase.io/docs/ui/modals/modal-layouts)
  — pre-built layouts
