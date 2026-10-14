---
title: "ClickToReveal"
url: https://fleetbase.io/docs/ui/actions/click-to-reveal
module: ui
---

# ClickToReveal

<ClickToReveal> blurs a sensitive value (API key, password, token) until the user clicks 'Click to reveal'. Optionally enables click-to-copy after reveal.

# <ClickToReveal>

Renders a value that's
**blurred by default**
with a "Click to reveal" button overlay. Used for sensitive values like API keys, secret tokens, webhook signing secrets — values you want visible only on demand.

Extends
[`<ClickToCopy>`](https://fleetbase.io/docs/ui/actions/click-to-copy)
— once revealed, the wrapper can also act as a click-to-copy target.

## Basic Usage

```
<ClickToReveal @value={{this.gateway.secret_key}} />
```

The value is blurred. Clicking the
**Click to reveal**
button shows a 600ms loading spinner and then unblurs the value.

## With Click-to-Copy After Reveal

```
<ClickToReveal @value={{this.store.api_key}} @clickToCopy={{true}} />
```

After revealing, clicking anywhere on the wrapper copies the value — and a "Copied!" tooltip flashes.

## Custom Display

Yield a block to control how the masked value is rendered:

```
<ClickToReveal @value={{this.gateway.secret_key}}>
  <span class="font-mono text-sm">{{this.gateway.secret_key}}</span>
</ClickToReveal>
```

## Custom Button Text

```
<ClickToReveal @value={{this.token}} @buttonText="Show token" />
```

## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `@value` | string | — | The sensitive value. Hidden until revealed; copied on click after reveal |
| `@buttonText` | string | `Click to reveal` | Override for the reveal button text |
| `@clickToCopy` | boolean | `false` | After reveal, the wrapper also acts as a click-to-copy target |
| `@wrapperClass` | string | — | Extra classes on the outer wrapper |
| `@column` | object | — | When used as a `<Table>` cell component, the column descriptor — pulls `clickToCopy` and `wrapperClass` from `column.cellComponentArgs` |

Any additional
`...attributes`
are forwarded to the outer
`<div>`
.

## Use as a Table Cell Component

`<ClickToReveal>`
is designed to plug straight into
[`<Table>`](https://fleetbase.io/docs/ui/display/table)
as a
`cellComponent`
:

```
columns = [
  {
    label: 'API Key',
    valuePath: 'key',
    cellComponent: 'click-to-reveal',
    cellComponentArgs: {
      clickToCopy: true,
      wrapperClass: 'font-mono',
    },
  },
];
```

The component reads
`column.cellComponentArgs.clickToCopy`
and
`column.cellComponentArgs.wrapperClass`
automatically.

## Real-World Examples

```
{{!-- Stripe secret key on the gateway settings page --}}
<InputGroup @name="Secret Key">
  <ClickToReveal @value={{this.gateway.secret_key}} @clickToCopy={{true}} />
</InputGroup>

{{!-- Webhook signing secret --}}
<ClickToReveal @value={{this.webhook.signing_secret}} @buttonText="Reveal signing secret" />

{{!-- API key in a list --}}
<ClickToReveal @value={{store.key}} @clickToCopy={{true}}>
  <span class="font-mono text-xs">{{store.key}}</span>
</ClickToReveal>
```

## See Also

* [`<ClickToCopy>`](https://fleetbase.io/docs/ui/actions/click-to-copy)
  — for non-sensitive values you want copyable on hover

## Source

| File | Description |
| --- | --- |
| `addon/components/click-to-reveal.hbs` | Template |
| `addon/components/click-to-reveal.js` | Class (extends `click-to-copy` ) |
