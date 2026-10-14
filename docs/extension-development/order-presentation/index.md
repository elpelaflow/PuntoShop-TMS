---
title: "Introduction"
url: https://fleetbase.io/docs/extension-development/order-presentation
module: extension-development
---

Order Presentation

# Introduction

Order presentation profiles let your extension give its own order type a custom order form, details view and actions in Fleet-Ops — composed from Fleet-Ops' own sections and yours — while every other order keeps the standard screens.

# Order Presentation

Fleet-Ops has
**one order form**
and
**one order details view**
, designed for deliveries: a driver, a vehicle, a route, dispatch, proof of delivery. Every order type uses them.

Some order types aren't deliveries. A vehicle loan, an equipment rental, a service appointment or a document collection still benefits from being a Fleet-Ops order, with tracking numbers, an activity history, comments, documents, the map and the board. But its form needs different fields, and its details view should lead with different information.

An
**order presentation profile**
lets your extension give its order type its own form, details view and actions, without forking Fleet-Ops' screens.

## What a Profile Changes

### The Order Form

![The standard order form next to the same form with a rental profile: an Equipment section added, a rental reference and depot added to the details, driver, vehicle and dispatch fields hidden, and the route renamed "Delivery & collection"](https://fleetbase.io/_next/static/media/form-standard-vs-profile.d3066928.svg)

On the left is the form every order type gets. On the right is the same form for an
**Equipment rental**
order, with a profile that:

* **adds a section from the extension's own engine**
  (Equipment), and leaves out the sections a rental doesn't use;
* **adds fields**
  to the details section (Rental reference, Depot);
* **hides fields**
  that don't apply (driver, vehicle, dispatch, …);
* **renames**
  the route section to "Delivery & collection", and hides multi-drop routing.

### The Details View

![The standard order details next to the same view with a rental profile: a Rental summary section first, only the relevant native sections, and dispatch-related actions removed from the menu](https://fleetbase.io/_next/static/media/details-standard-vs-profile.d1e1c5b4.svg)

The profile can lead the details view with its own summary, keep only the native sections that matter, and remove actions such as
**Assign driver**
from the "…" menu and the orders table.

## What You Can Customize

|  | What | Page |
| --- | --- | --- |
| **Form sections** | Which sections the order form has, and in what order: Fleet-Ops' own and yours | [The Order Form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form) |
| **Form fields** | Extra fields in the details section, hidden fields, the route section's title | [Form Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields) |
| **Details sections** | Which sections the details view has, and in what order | [The Details View](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view) |
| **Actions** | Which built-in actions the orders table and details menu offer | [Actions](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions) |
| **Drafts** | What happens when a user switches a new order to, or away from, your order type | [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation) |

## Only Your Order Type Changes

A profile applies to an order only when the order's
**order config**
, its order type, names the profile. Every other order, and every other order type, keeps the standard Fleet-Ops form and details view exactly as before. See
[How It Works](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)
.

## Presentation, Not Behaviour

A profile changes what the console
**shows**
. It doesn't change what an order
**does**
: its statuses, whether it can be dispatched, or which steps it can move to. For that, give the order config a
[configured lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
. Most order types with a profile have one too:

|  | Order presentation profile | Configured order lifecycle |
| --- | --- | --- |
| **Changes** | The form, details view and actions in the console | The order's activities, dispatch, and allowed transitions |
| **Defined in** | Your extension's `extension.js` | The order config's `meta.lifecycle` |
| **Enforced by** | The console | The API |

## Requirements

Order presentation profiles and configured lifecycles need
**Fleet-Ops 0.6.71**
or later.

## Where to Go Next

How It Works

How a profile is matched to an order, and where it applies.

[How It Works →](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)

Getting Started

Build a first profile step by step: an order type, hidden fields, your own sections.

[Getting Started →](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)

Profile Object

Every key a profile can have.

[Profile Object →](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)

Recipe: Building an Order Type

A complete equipment rental extension: lifecycle, profile, sections and validation.

[Building an Order Type →](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)

[Custom Views

Merge registered columns, actions, buttons and menu items into views you render yourself — a hand-built table, a page header, a dialog — and the context to pass to handlers.](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible/custom-views)
[How It Works

How Fleet-Ops matches a presentation profile to an order — the order config, the registry and isEnabled — where a profile applies in the console, and what it leaves alone.](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works)
