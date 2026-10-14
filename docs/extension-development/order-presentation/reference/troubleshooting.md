---
title: "Troubleshooting"
url: https://fleetbase.io/docs/extension-development/order-presentation/reference/troubleshooting
module: extension-development
---

Order Presentation

Reference

# Troubleshooting

Why an order presentation profile doesn't apply, a section is missing or empty, a field or action still shows, or a value survives a type switch — and how to fix each.

# Troubleshooting

## The Standard Form Still Shows

Check each step of
[matching](https://fleetbase.io/docs/extension-development/order-presentation/how-it-works#matching-a-profile-to-an-order)
:

| Check | How |
| --- | --- |
| The order config names the profile | Its `meta.presentation_profile` equals your profile's `id` exactly |
| The profile is registered | `universe.getService('registry').getRegistry('fleet-ops:order-presentation', 'profiles')` in the console lists it |
| It is registered before the view renders | Register from `setupExtension` . A profile registered later applies the next time the view renders |
| `isEnabled` returns `true` | Exactly `true` : a truthy value such as `1` or a non-empty string doesn't count |
| The view supports profiles | Hosts that render `Order::Form` or `Order::Details` with a block, such as the customer portal, don't use profiles |

## The Form or Details View Is Empty

The profile applies, but has no
`form.sections`
or
`details.sections`
. When a profile applies, its lists are the whole layout. Add both; list the
[standard sections](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form#the-standard-layout)
to keep a view as it was.

## A Section Is Missing

| Cause | Fix |
| --- | --- |
| It isn't in the list | Section lists replace the layout: list every native section you want |
| A native name for the wrong view | `details` is a form section; `detail` is a details section |
| Your component didn't render | Check the `ExtensionComponent` 's engine name and path, and that your engine is installed |
| Another extension's component is missing | Registry slots aren't rendered for profiled orders; see [The Details View](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view#registry-slots-arent-rendered) |

## A Field Still Shows

| Cause | Fix |
| --- | --- |
| The key is wrong | Use the keys in [Hiding Fields](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#hiding-fields) |
| It isn't hideable | The order type selector and custom fields can't be hidden |
| It's in your own section | Read `@hiddenFields` in your section |

## A Hidden Field Still Has a Value

Hiding doesn't clear values. Reset them in
[`prepare`](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#preparing-drafts)
.

## An Action Still Shows

| Cause | Fix |
| --- | --- |
| The id is wrong | Use the ids in [Actions](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions#action-ids) , spelled exactly |
| Only one of a pair is hidden | `assign-driver` and `unassign-driver` are separate: hide both |
| It isn't a built-in action | `hidden.actions` only hides Fleet-Ops' own; ask the extension that adds it, or check the profile in your own action's `visibleWhen` |

## The Order Can't Be Saved

| Cause | Fix |
| --- | --- |
| No pickup and dropoff | Fleet-Ops still requires them (or two waypoints). Keep the `route` section, or set them from your own section |
| A validation rule returns `false` | Check your `setOrderValidationRule` rules, and that they return `true` for orders that aren't yours |

## The Order Type Can't Be Changed

Once saved, an order with a profile keeps its type: the selector is disabled. This is by design.

[Service API

The Fleet-Ops order-presentation service — look up the profile for an order or order config, read its sections and hidden fields and actions, and prepare drafts — with how to reach it from your extension.](https://fleetbase.io/docs/extension-development/order-presentation/reference/service)
[Introduction

A configured order lifecycle gives an order type its own activities — its own start, completion and cancellation, no dispatch, and only the transitions its flow allows — enforced by Fleet-Ops' API.](https://fleetbase.io/docs/extension-development/order-lifecycles)
