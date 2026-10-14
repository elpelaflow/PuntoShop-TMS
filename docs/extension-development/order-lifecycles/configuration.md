---
title: "Configuration"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/configuration
module: extension-development
---

Order Lifecycles

# Configuration

The meta.lifecycle keys — initial, completed, canceled, terminal, dispatch and strict\_transitions — with defaults, and the activity flow format a lifecycle works with.

# Configuration

A lifecycle has two parts, both on the order config:

| Part | Where | Defines |
| --- | --- | --- |
| **The flow** | `flow` | The activities, and which can follow which |
| **The lifecycle** | `meta.lifecycle` | Which activities are special, and the rules |

## The lifecycle Keys

Prop

Type

`initial
?`

string

`completed
?`

string

`canceled
?`

string

`terminal
?`

string[]

`dispatch
?`

boolean

`strict_transitions
?`

boolean

A config has a configured lifecycle as soon as
`meta.lifecycle`
is a non-empty object. Keys you leave out take their default.

### Minimal Lifecycles

```
// Its own starting point, otherwise the dispatch lifecycle's rules
{ "initial": "requested" }

// Never dispatched
{ "initial": "requested", "dispatch": false }

// Never dispatched, and only the flow's transitions
{ "initial": "requested", "dispatch": false, "strict_transitions": true }
```

## The Flow

`flow`
is an object keyed by activity key. Each activity lists the keys of the activities that can follow it:

```
{
    "requested": {
        "key": "requested",
        "code": "requested",
        "status": "Requested",
        "details": "Rental requested",
        "color": "#6B7280",
        "sequence": 0,
        "activities": ["reserved", "cancelled"],
        "logic": [],
        "events": [],
        "actions": [],
        "entities": [],
        "options": [],
        "complete": false,
        "require_pod": false,
        "pod_method": null
    },
    "reserved": { "…": "…" }
}
```

| Field | Description |
| --- | --- |
| `key` | The activity's key in the flow; other activities refer to it in `activities` |
| `code` | The status code orders get at this activity. Lifecycle keys refer to activities by **code** |
| `status` | The label users see, on the timeline, the board and the tracking page. Can use placeholders such as `{customer.name}` |
| `details` | The longer description recorded with the activity |
| `color` | The activity's colour in the console |
| `sequence` | Orders activities that share a parent |
| `activities` | Keys of the activities that can follow this one |
| `complete` | Whether reaching this activity completes the order |
| `require_pod` , `pod_method` | Require proof of delivery at this activity |
| `logic` , `events` , `actions` , `entities` , `options` | Conditions and side effects; see the order config editor |

Keep
`key`
and
`code`
the same unless you have a reason not to: the board and the lifecycle use codes, and the flow uses keys.

## Where It Is Set

Most extensions write both parts from their server code when they install the order config; see
[Defining a Flow](https://fleetbase.io/docs/extension-development/order-lifecycles/defining-a-flow)
. The order config editor in
**Fleet-Ops → Operations → Order Config**
edits the flow, but not
`meta.lifecycle`
.

Keep
`meta`
keys that other parts of Fleet-Ops use (
`lifecycle`
,
`presentation_profile`
) when you update a config, and put your own settings under a key named after your extension.

[Introduction

A configured order lifecycle gives an order type its own activities — its own start, completion and cancellation, no dispatch, and only the transitions its flow allows — enforced by Fleet-Ops' API.](https://fleetbase.io/docs/extension-development/order-lifecycles)
[What Changes

How Fleet-Ops' API and console behave for an order config with a configured lifecycle — creating, dispatching, updating activity, canceling, the details menu, the board and the flow editor — and what follows the dispatch lifecycle.](https://fleetbase.io/docs/extension-development/order-lifecycles/what-changes)
