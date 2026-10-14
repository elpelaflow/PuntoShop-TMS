---
title: "Overlay"
url: https://fleetbase.io/docs/ui/layout/overlay
module: ui
---

# Overlay

<Overlay> is a sliding panel that docks to the left/right/top/bottom of the screen. Used for slide-out detail views, side panels, and drawer-like UIs.

# <Overlay>

`<Overlay>`
is a sliding panel that docks to one edge of the screen. It supports minimize / maximize / resize gestures and is the basis for most slide-out detail views in the Fleetbase Console.

For modal dialogs (centered, dimmed background) use the
[modals](https://fleetbase.io/docs/ui/modals/overview)
system instead.

## Basic Usage

```
<Overlay
  @position="right"
  @isOpen={{this.detailOpen}}
  @onClose={{fn (mut this.detailOpen) false}}
  @isResizable={{true}}
>
  {{!-- Body content --}}
  <h2>Driver Details</h2>
  <p>{{this.driver.name}}</p>
</Overlay>
```

## Arguments

### Position & Sizing

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `@position` | string | `right` | `left` , `right` , `top` , `bottom` |
| `@isOpen` | boolean | `true` | Initial open state |
| `@isResizable` | boolean | `false` | Allow the user to drag-resize |
| `@isMinimizable` | boolean | `false` | Show the minimize button |
| `@isMaximizable` | boolean | `false` | Show the maximize button |
| `@disableResize` | boolean | `false` | Disable resize even if `@isResizable` |
| `@minResizeWidth` | number | `560` | Minimum resize width in px |
| `@maxResizeWidth` | number | `900` | Maximum resize width in px |

### Callbacks

| Argument | Signature | Description |
| --- | --- | --- |
| `@onLoad` | `(api)` | Called once when the overlay mounts. `api` exposes `{ toggle, open, close, minimize, maximize }` |
| `@onOpen` / `@onClose` | `(api)` | Called when state changes |
| `@onToggle` | `(api)` | Called on toggle |
| `@onResize` / `@onResizeStart` / `@onResizeEnd` | `({ event, overlayPanelNode })` | Resize lifecycle |
| `@onMinimize` / `@onMaximize` | `()` | Buttons emit these in addition to mutating internal state |

## Imperative Control

Capture the API via
`@onLoad`
:

```
<Overlay @position="right" @onLoad={{this.captureApi}}>
  {{!-- ... --}}
</Overlay>
```

```
@tracked api = null;
@action captureApi(api) { this.api = api; }
@action openDetail() { this.api.open(); }
@action minimizeDetail() { this.api.minimize(); }
```

The API object:
`{ toggle, open, close, minimize, maximize, isOpen, isMinimized, isMaximized, overlayNode }`
.

## Yielded Sub-Components

`<Overlay>`
yields named contextual components for the header, body, and footer regions. See
`addon/components/overlay/`
for the subcomponent list.

## Real-World Examples

```
{{!-- Right-docked detail overlay --}}
<Overlay
  @position="right"
  @isOpen={{this.detailOpen}}
  @isResizable={{true}}
  @isMinimizable={{true}}
  @onClose={{fn (mut this.detailOpen) false}}
>
  <h2>{{this.selectedOrder.public_id}}</h2>
  {{!-- ... --}}
</Overlay>
```

## See Also

* [`<Drawer>`](https://fleetbase.io/docs/ui/layout/drawer)
  — simpler slide-out panel
* [Modals](https://fleetbase.io/docs/ui/modals/overview)
  — for centered, blocking dialogs
* [`<ContentPanel>`](https://fleetbase.io/docs/ui/layout/content-panel)
  — collapsible inline section

## Source

| File | Description |
| --- | --- |
| `addon/components/overlay.hbs` | Template |
| `addon/components/overlay.js` | Class |
| `addon/components/overlay/` | Subcomponents (header, body, footer regions) |
