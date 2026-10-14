---
title: "Drawer"
url: https://fleetbase.io/docs/ui/layout/drawer
module: ui
---

# Drawer

<Drawer> is a bottom-anchored, height-resizable panel — used for inline detail views, secondary editors, and tray-style UIs.

# <Drawer>

`<Drawer>`
is a bottom-anchored panel with a draggable handle. The user can resize it vertically by dragging the gutter, and optionally double-click a notch to minimize. Used for inline detail views and tray-style UIs.

For a full-screen-edge slide-out panel, use
[`<Overlay>`](https://fleetbase.io/docs/ui/layout/overlay)
.

## Basic Usage

```
<Drawer
  @isOpen={{this.editorOpen}}
  @isResizable={{true}}
  @notchEnabled={{true}}
  @onClose={{fn (mut this.editorOpen) false}}
  as |drawer|
>
  <h2>Edit Notes</h2>
  <textarea>{{this.notes}}</textarea>
  <Button @text="Close" @onClick={{drawer.close}} />
</Drawer>
```

## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `@isOpen` | boolean | `true` | Initial open state |
| `@isResizable` | boolean | `false` | Allow vertical drag-resize via the gutter |
| `@notchEnabled` | boolean | `false` | Show the draggable notch on the gutter — double-click toggles minimize |
| `@noBackdrop` | boolean | `false` | Don't render the backdrop |
| `@fullHeight` | boolean | `false` | Open at full viewport height |
| `@height` | string | — | Initial height (e.g. `"400px"` ) |
| `@minResizeHeight` | number | — | Minimum resize height |
| `@maxResizeHeight` | number | — | Maximum resize height |
| `@overlayClass` | string | — | Extra classes on the outer wrapper |
| `@containerClass` | string | — | Extra classes on the panel container |

### Callbacks

| Argument | Signature | Description |
| --- | --- | --- |
| `@onOpen` / `@onClose` / `@onToggle` | `(api)` | State change callbacks |
| `@onResize` / `@onResizeStart` / `@onResizeEnd` | `({ event, drawerPanel })` | Resize lifecycle |
| `@onMinimize` | `()` | Called when the user double-clicks the notch |

## Yielded API

The drawer yields a context object:
`{ toggle, open, close, minimize, isOpen, isMinimized }`
.

## Source

| File | Description |
| --- | --- |
| `addon/components/drawer.hbs` | Template |
| `addon/components/drawer.js` | Class |

[Overlay

<Overlay> is a sliding panel that docks to the left/right/top/bottom of the screen. Used for slide-out detail views, side panels, and drawer-like UIs.](https://fleetbase.io/docs/ui/layout/overlay)
[Resource Layouts

<Layout::Resource::Tabular>, <Layout::Resource::Card>, <Layout::Resource::CardsGrid>, and <Layout::Resource::Panel> — pre-built page layouts for resource list views.](https://fleetbase.io/docs/ui/layout/resource-tabular)
