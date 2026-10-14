---
title: "MultiSelect"
url: https://fleetbase.io/docs/ui/inputs/multi-select
module: ui
---

# MultiSelect

<MultiSelect> is a multi-value typeahead select. Thin wrapper around ember-power-select's PowerSelectMultiple.

# <MultiSelect>

A multi-value typeahead select. Thin wrapper around
`ember-power-select`
's
`<PowerSelectMultiple>`
with Fleetbase's form styling.

For Ember Data records, prefer
[`<ModelSelectMultiple>`](https://fleetbase.io/docs/ui/inputs/model-select)
.

## Basic Usage

```
<MultiSelect
  @options={{this.tagOptions}}
  @selected={{this.selectedTags}}
  @placeholder="Add tags…"
  @onChange={{fn (mut this.selectedTags)}}
  as |tag|
>
  {{tag}}
</MultiSelect>
```

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `@options` | array | The options to choose from |
| `@selected` | array | The currently-selected options |
| `@onChange` | `(selected)` | Called with the new array on every change |
| `@placeholder` | string | Placeholder for the empty state |
| `@allowClear` | boolean | Show a clear-all button |
| `@searchEnabled` | boolean | Enable typeahead search |
| `@search` | function | Custom async search function |
| `@selectClass` | string | Extra classes on the trigger |
| `@registerAPI` | function | Capture the power-select API |
| `@placeholderComponent` | string | Custom placeholder component |
| `@preventScroll` | boolean | Disable body scroll when open |
| `@renderInPlace` | boolean | Render in DOM order vs. portal |
| `@scrollTo` | function | Custom scroll-to-option behavior |

The yielded value is the option being rendered.

## See Also

* [`<Select>`](https://fleetbase.io/docs/ui/inputs/select)
  — single-value
* [`<ComboBox>`](https://fleetbase.io/docs/ui/inputs/combo-box)
  — single-value with typeahead
* [`<ModelSelect>`](https://fleetbase.io/docs/ui/inputs/model-select)
  — for Ember Data records

## Source

| File | Description |
| --- | --- |
| `addon/components/multi-select.hbs` | Template (template-only) |
