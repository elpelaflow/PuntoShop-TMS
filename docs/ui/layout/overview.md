---
title: "Overview"
url: https://fleetbase.io/docs/ui/layout/overview
module: ui
---

# Overview

Top-level layout primitives in @fleetbase/ember-ui — Layout::Container, Layout::Header, Layout::Sidebar, Layout::Section, plus the standalone <Overlay>, <Drawer>, <ContentPanel>, and <Spacer>.

# Layout Overview

`@fleetbase/ember-ui`
ships two complementary sets of layout primitives:

1. **Top-level scaffolding**
   —
   `<Layout::Container>`
   ,
   `<Layout::Header>`
   ,
   `<Layout::Sidebar>`
   ,
   `<Layout::Section>`
   ,
   `<Layout::Main>`
   . These compose the overall page chrome.
2. **Inline layout helpers**
   —
   `<ContentPanel>`
   ,
   `<Overlay>`
   ,
   `<Drawer>`
   ,
   `<Spacer>`
   ,
   `<Floating>`
   . These structure regions inside a page.

Most extension authors don't compose
`<Layout::*>`
directly — the host console already provides the chrome. But you'll use the inline helpers extensively.

## Top-Level Scaffolding

| Component | Purpose |
| --- | --- |
| `<Layout::Container>` | The outermost shell |
| `<Layout::Header>` | Top app bar with logo, search, notifications |
| `<Layout::Sidebar>` | Left navigation rail |
| `<Layout::Main>` | The primary content area |
| `<Layout::Section>` | A bordered scrollable panel inside Main |
| `<Layout::MobileNavbar>` | Mobile-tablet bottom nav |

These are typically composed once at the application level.

## Inline Layout Helpers

ContentPanel

Collapsible section with title, status, and action buttons. The most-used layout component.

[ContentPanel →](https://fleetbase.io/docs/ui/layout/content-panel)

Overlay

Edge-docked sliding panel — left, right, top, or bottom. Resizable, minimizable.

[Overlay →](https://fleetbase.io/docs/ui/layout/overlay)

Drawer

Bottom-anchored, vertically resizable panel for inline detail views.

[Drawer →](https://fleetbase.io/docs/ui/layout/drawer)

Floating

Floating element positioned relative to a trigger — popovers, tooltips, dropdown panels.

[Floating →](https://fleetbase.io/docs/ui/layout/floating)

ResourceTabular

Standard list/detail page layout for resource pages.

[ResourceTabular →](https://fleetbase.io/docs/ui/layout/resource-tabular)

Spacer

Empty box for adding fixed-size space between elements.

[Spacer →](https://fleetbase.io/docs/ui/layout/spacer)

## Choosing Between Overlay, Drawer, and Modal

| Use case | Component |
| --- | --- |
| Centered, blocking dialog | [Modals](https://fleetbase.io/docs/ui/modals/overview) |
| Slide-out side panel (e.g. detail view) | [`<Overlay>`](https://fleetbase.io/docs/ui/layout/overlay) |
| Bottom-anchored tray (e.g. inline editor) | [`<Drawer>`](https://fleetbase.io/docs/ui/layout/drawer) |
| Inline collapsible section in the page | [`<ContentPanel>`](https://fleetbase.io/docs/ui/layout/content-panel) |

## Source

| File | Description |
| --- | --- |
| `addon/components/layout/` | Top-level layout components |
| `addon/components/` | Inline layout helpers ( `<name>.hbs` / `.js` ) |
