---
title: "Type Checking Helpers"
url: https://fleetbase.io/docs/ui/helpers/type-checking
module: ui
---

# Type Checking Helpers

Helpers for inspecting and asserting on values — is-array, is-model, is-url, is-uuid, in-array, is-object-empty, is-dark-mode, and more.

# Type Checking Helpers

These helpers return booleans describing a value's shape or contents. Useful for
`{{#if}}`
branches in templates.

## {{is-array value}}

True if the value is an array (Ember array or native array):

```
{{#if (is-array @items)}}
  {{!-- safe to iterate --}}
{{/if}}
```

## {{is-bool-value value}}

True if the value is a boolean:

```
{{#if (is-bool-value @config.enabled)}}
  <Toggle @isToggled={{@config.enabled}} />
{{/if}}
```

## {{is-model value}}

True if the value is an Ember Data model instance:

```
{{#if (is-model @row)}}
  <Pill @resource={{@row}} />
{{/if}}
```

## {{is-url value}}

True if the value parses as a valid URL:

```
{{#if (is-url @link)}}
  <a href={{@link}}>{{@link}}</a>
{{else}}
  <span>{{@link}}</span>
{{/if}}
```

## {{is-uuid value}}

True if the value matches the UUID v1–v5 format:

```
{{#if (is-uuid @id)}}
  <ClickToCopy @value={{@id}} />
{{/if}}
```

## {{in-array value array}}

True if the value is in the array:

```
{{#if (in-array "admin" @user.roles)}}
  <AdminPanel />
{{/if}}
```

## {{is-object value}}

True if the value is a plain object:

```
{{#if (is-object @data)}}
  {{!-- iterate keys with each-in --}}
{{/if}}
```

## {{is-object-empty value}}

True if a plain object has no keys:

```
{{#if (is-object-empty @options)}}
  <span class="text-gray-400">No options set</span>
{{/if}}
```

## {{is-not-empty value}}

True if the value is not null/undefined and (for strings/arrays) has length:

```
{{#if (is-not-empty @results)}}
  <ResultsList @results={{@results}} />
{{/if}}
```

## {{is-dark-mode}}

True when the host application is in dark mode — useful for branching styles:

```
<img src={{if (is-dark-mode) "/logo-dark.svg" "/logo-light.svg"}} />
```

## {{is-dd-item-visible}}

Internal helper used by dropdown menus to decide visibility — typically not needed in extension code.

## Source

| File | Description |
| --- | --- |
| `addon/helpers/is-array.js` | Helper |
| `addon/helpers/is-bool-value.js` | Helper |
| `addon/helpers/is-dark-mode.js` | Helper |
| `addon/helpers/is-dd-item-visible.js` | Helper |
| `addon/helpers/is-model.js` | Helper |
| `addon/helpers/is-not-empty.js` | Helper |
| `addon/helpers/is-object-empty.js` | Helper |
| `addon/helpers/is-object.js` | Helper |
| `addon/helpers/is-url.js` | Helper |
| `addon/helpers/is-uuid.js` | Helper |
| `addon/helpers/in-array.js` | Helper |
