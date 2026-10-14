---
title: "Kanban"
url: https://fleetbase.io/docs/ui/scheduling/kanban
module: ui
---

# Kanban

<Kanban> is a draggable board component with configurable columns and item cards. Used for status pipelines, dispatch boards, and any column-based workflow.

# <Kanban>

`<Kanban>`
is a board component with configurable columns and draggable item cards. Items move between columns by drag-and-drop. Used for status pipelines (
`To Do`
→
`In Progress`
→
`Done`
), dispatch boards, order workflow boards, and any column-based UI.

## Basic Usage

```
<Kanban
  @columns={{this.columns}}
  @items={{this.items}}
  @groupBy="status"
  @onItemDrop={{this.handleDrop}}
  @onItemClick={{this.openItem}}
>
  <:card as |item|>
    <div class="font-semibold">{{item.title}}</div>
    <div class="text-xs text-gray-500">{{item.description}}</div>
  </:card>
</Kanban>
```

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@columns` | array | Column definitions — `{ id, label, color? }` |
| `@items` | array | Items to render |
| `@groupBy` | string | Property path on each item to determine its column |
| `@editable` | boolean | Enable drag-and-drop (default `true` ) |
| `@onItemDrop` | `(item, fromColumn, toColumn)` | Called when an item is moved between columns |
| `@onItemClick` | `(item)` | Called when an item is clicked |
| `@onColumnDrop` | `(column, fromIndex, toIndex)` | Called when a column is reordered |

## Named Blocks

| Block | Purpose |
| --- | --- |
| `:card` | Custom item card renderer (yields the item) |
| `:column-header` | Custom column header (yields the column) |

## Real-World Examples

```
{{!-- Order dispatch board --}}
<Kanban
  @columns={{array
    (hash id="created" label="New")
    (hash id="dispatched" label="Dispatched")
    (hash id="started" label="In Transit")
    (hash id="completed" label="Delivered")
  }}
  @items={{this.orders}}
  @groupBy="status"
  @onItemDrop={{this.advanceOrder}}
  @onItemClick={{this.openOrder}}
>
  <:card as |order|>
    <Pill @resource={{order.driver}} />
    <div class="text-xs">{{order.public_id}}</div>
  </:card>
</Kanban>
```

## Source

| File | Description |
| --- | --- |
| `addon/components/kanban.hbs` | Template |
| `addon/components/kanban.js` | Class |
| `addon/components/kanban/` | Subcomponents |

[EventCalendar / ScheduleCalendar

<EventCalendar> is a date-grid calendar; <ScheduleCalendar> is a resource-lane scheduler with drag-and-drop. Both yield blocks for custom item rendering.](https://fleetbase.io/docs/ui/scheduling/event-calendar)
[Overview

How modals work in @fleetbase/ember-ui — the modals-manager service, the built-in layouts, and how to build custom modal components.](https://fleetbase.io/docs/ui/modals/overview)
