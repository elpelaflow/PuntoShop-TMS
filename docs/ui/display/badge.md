---
title: "Badge"
url: https://fleetbase.io/docs/ui/display/badge
module: ui
---

# Badge

<Badge> is a small status pill — used everywhere to show order statuses, account states, and categorical labels.

# <Badge>

`<Badge>`
renders a colored pill with a status dot and a label. It's the canonical way to display:

* Order statuses (
  `created`
  ,
  `dispatched`
  ,
  `completed`
  ,
  `canceled`
  )
* Account states (
  `active`
  ,
  `inactive`
  ,
  `pending`
  )
* Generic flags (
  `paid`
  ,
  `overdue`
  ,
  `published`
  )

The status string drives the color via a Tailwind class — a class named
`<status>-status-badge`
is applied, so
`created-status-badge`
,
`completed-status-badge`
, etc. The styles are defined in the ember-ui stylesheet.

## Basic Usage

```
<Badge @status={{this.order.status}} />
```

The status string is humanized for display (
`pickup_ready`
→
`Pickup Ready`
) and dasherized for the CSS class (
`pickup_ready`
→
`pickup-ready-status-badge`
).

## Custom Color via @type

If your status doesn't have a styled color, pass
`@type`
for the visual color and
`@status`
(or
`@text`
) for the label:

```
<Badge @type="info"    @text="Beta" />
<Badge @type="success" @text="Active" />
<Badge @type="warning" @text="Pending review" />
<Badge @type="danger"  @text="Suspended" />
```

The default color is
`info`
if neither
`@type`
nor
`@status`
is set.

## Without the Status Dot

```
<Badge @status="published" @hideStatusDot={{true}} />
```

## Custom Icon

Replace the default circle dot with any FontAwesome icon:

```
<Badge @status="vip" @icon="star" @iconPrefix="fas" />
<Badge @text="Refunded" @icon="undo" @type="warning" />
```

## Disable Humanization

By default the badge text is humanized —
`pickup_ready`
becomes
`Pickup Ready`
. To show the raw status string:

```
<Badge @status="ABC-123" @disableHumanize={{true}} />
```

## Yielding Custom Content

Yield a block to take full control of the body. The yielded value is
`@status`
:

```
<Badge @status={{this.order.status}} as |status|>
  <span class="font-bold">{{status}}</span>
  <span class="ml-1">({{@order.public_id}})</span>
</Badge>
```

## Rounded Full

For a more pill-like shape:

```
<Badge @status="completed" @roundedFull={{true}} />
```

## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `@status` | string | — | The status — drives both color (via class `<status>-status-badge` ) and label |
| `@type` | string | falls back to `@status` , then `info` | Override for the color class |
| `@text` | string | — | Override for the label (otherwise `@status` is used) |
| `@disableHumanize` | boolean | `false` | Show the raw status string instead of humanizing it |
| `@hideText` | boolean | `false` | Render only the dot/icon |
| `@hideStatusDot` | boolean | `false` | Hide the status dot |
| `@hideIcon` | boolean | `false` | Same as `@hideStatusDot` |
| `@icon` | string | `circle` | FontAwesome icon for the dot |
| `@iconPrefix` | string | `fas` | FontAwesome prefix |
| `@iconClass` | string | — | Extra classes on the icon |
| `@size` | string | `xs` | Icon size — `xs` , `sm` , `lg` , etc. |
| `@roundedFull` | boolean | `false` | Render as a fully rounded pill instead of a small rounded rectangle |
| `@helpText` | string | — | Tooltip on hover |
| `@exampleText` | string | — | Optional example beneath the help text |
| `@tooltipPlacement` | string | `top` | Tooltip placement |
| `@wrapperClass` | string | — | Extra classes on the outer `<div>` |
| `@spanClass` | string | — | Extra classes on the inner `<span>` |

Any additional
`...attributes`
are forwarded to the outer
`<div>`
.

## Real-World Examples

```
{{!-- Order status in a list row --}}
<Badge @status={{order.status}} />

{{!-- Inside a table cell --}}
<Badge @status={{row.account.status}} @hideStatusDot={{true}} />

{{!-- Indicator of unread messages --}}
{{#if this.unreadCount}}
  <Badge @text={{this.unreadCount}} @type="danger" @hideStatusDot={{true}} @roundedFull={{true}} />
{{/if}}

{{!-- With tooltip explaining the state --}}
<Badge
  @status="pickup_ready"
  @helpText="Order has been prepared and is awaiting customer pickup"
/>
```

## See Also

* [`<Pill>`](https://fleetbase.io/docs/ui/display/pill)
  — similar to Badge, but used for non-status categorical labels

## Source

| File | Description |
| --- | --- |
| `addon/components/badge.hbs` | Template (template-only — no JS class) |
