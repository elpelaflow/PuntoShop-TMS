---
title: "How It Works"
url: https://fleetbase.io/docs/extension-development/order-presentation/how-it-works
module: extension-development
---

Order Presentation

# How It Works

How Fleet-Ops matches a presentation profile to an order — the order config, the registry and isEnabled — where a profile applies in the console, and what it leaves alone.

# How It Works

## Matching a Profile to an Order

![How a profile applies: the order's order config names a profile in meta.presentation_profile; Fleet-Ops finds the registered profile with that id; if isEnabled returns true, the profile applies, otherwise the standard view is used](https://fleetbase.io/_next/static/media/how-a-profile-applies.acd01b37.svg)

Every time Fleet-Ops renders an order's form, details view or actions, it asks the
`order-presentation`
service for the order's profile:

1. **It reads the order's order config.**
   Every order has one: it is the order's type, such as Transport or Equipment rental.
2. **It reads
   `meta.presentation_profile`
   from that config.**
   No value means no profile.
3. **It looks for a registered profile with that
   `id`**
   , in the
   `fleet-ops:order-presentation`
   registry, under
   `profiles`
   . Your extension registered it from
   `setupExtension`
   .
4. **It calls the profile's
   `isEnabled(orderConfig)`
   , if it has one.**
   The profile applies only if this returns exactly
   `true`
   .

If any step fails, the order gets the standard Fleet-Ops presentation.

Two parts work together, and both are yours:

| Part | Where it lives | Sets |
| --- | --- | --- |
| **The profile** | Your extension's `addon/extension.js` | What the form, details and actions look like |
| **The order config** | The database, usually created by your extension's server code | `meta.presentation_profile` : which profile its orders use |

## Where a Profile Applies

| Where | What the profile controls |
| --- | --- |
| **Operations → Orders → New** | Form sections, form fields, hidden fields, route title, `prepare` and `release` |
| **The create and edit side panel** | The same as the new order page |
| **Edit details** , in an order's "…" menu | Opens the profiled form in a side panel, instead of the standard edit dialog |
| **The order details view** | Details sections |
| **The orders table** | Hidden actions in each row's "…" menu |
| **The order details "…" menu** | Hidden actions |

## What a Profile Leaves Alone

* **Orders whose config doesn't name the profile.**
  They render exactly as before.
* **Views that lay the form out themselves.**
  A host that renders
  `Order::Form`
  or
  `Order::Details`
  with a block, such as the customer portal's order form, chooses its own layout; profiles don't apply there.
* **What an order does.**
  Statuses, dispatch and allowed transitions come from the order config's flow and
  [lifecycle](https://fleetbase.io/docs/extension-development/order-lifecycles)
  , not the profile.
* **Details tabs**
  registered for orders, such as Ledger's Invoice tab, still appear.

**A profile replaces the whole form and details layout.**
For a profiled order, Fleet-Ops doesn't render the registry slots extensions use to inject components into the standard order form and details view (
`fleet-ops:component:order:form:*`
and
`fleet-ops:component:order:details:*`
). Components other extensions register there don't appear on your order type.

## When the Profile Is Looked Up

There is no caching: the profile is looked up each time a form, details view or action menu renders, and
`isEnabled`
is called each time. That means:

* a profile your extension registers later, or an
  `isEnabled`
  result that changes, takes effect the next time the view renders;
* `isEnabled`
  should be fast, and read state your extension has already loaded rather than fetching.

## A Profile Is a Plain Object

A profile has no class to extend. It is an object with an
`id`
and the parts you want to change. See
[Profile Object](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)
.

**Always give a profile both
`form.sections`
and
`details.sections`
.**
When a profile applies, its section lists are the whole layout: there is no fallback to the standard layout. A profile without
`form.sections`
shows an empty order form, and one without
`details.sections`
an empty details view. To keep a view as standard, list the standard sections; see
[The Order Form](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form#the-standard-layout)
.

Everything else is optional: no
`hidden`
key hides nothing, and no
`prepare`
does nothing.

[Introduction

Order presentation profiles let your extension give its own order type a custom order form, details view and actions in Fleet-Ops — composed from Fleet-Ops' own sections and yours — while every other order keeps the standard screens.](https://fleetbase.io/docs/extension-development/order-presentation)
[Getting Started

Build a first order presentation profile step by step — an order config that names it, a profile that keeps the standard layout, then hidden fields, your own form and details sections, and hidden actions.](https://fleetbase.io/docs/extension-development/order-presentation/getting-started)
