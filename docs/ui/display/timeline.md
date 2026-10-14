---
title: "Timeline"
url: https://fleetbase.io/docs/ui/display/timeline
module: ui
---

# Timeline

<Timeline> renders a horizontal timeline of activities with navigation arrows. Yields a curried <Timeline::Item> component to compose each entry.

# <Timeline>

`<Timeline>`
renders a horizontal scrolling timeline of activities. The user navigates with left/right arrow buttons. Each visible activity is yielded as a curried
`<Timeline::Item>`
component for you to compose.

## Basic Usage

```
<Timeline @activity={{this.events}} as |Item|>
  <Item />
</Timeline>
```

```
events = [
  { code: 'created', label: 'Order placed', timestamp: ... },
  { code: 'accepted', label: 'Driver accepted', timestamp: ... },
  { code: 'started', label: 'En route', timestamp: ... },
  { code: 'completed', label: 'Delivered', timestamp: ... },
];
```

## Custom Item Body

```
<Timeline @activity={{this.events}} as |Item|>
  <Item>
    <div class="text-sm font-semibold">{{Item.activity.label}}</div>
    <div class="text-xs">{{format-date-fns Item.activity.timestamp "PPpp"}}</div>
  </Item>
</Timeline>
```

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@activity` | array | Activity entries to render |
| `@wrapperClass` , `@itemsContainerClass` , `@controlsClass` , `@arrowClass` , `@arrowLeftClass` , `@arrowRightClass` | string | Class hooks |

The number of visible items at a time is controlled internally; arrows page through the rest.

## Yielded Block

The yielded value is a curried
`<Timeline::Item>`
component pre-bound to the current activity. The item subcomponent has its own template at
`addon/components/timeline/item.hbs`
for default rendering.

## Source

| File | Description |
| --- | --- |
| `addon/components/timeline.hbs` | Template |
| `addon/components/timeline.js` | Class |
| `addon/components/timeline/item.hbs` | Item subcomponent template |
| `addon/components/timeline/item.js` | Item subcomponent class |
