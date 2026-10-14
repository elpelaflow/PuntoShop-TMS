---
title: "ClickToReveal"
url: https://fleetbase.io/docs/ui/actions/click-to-reveal
module: ui
---

# ClickToReveal

El componente `<ClickToReveal>` oculta un valor sensible (clave de API, contraseña, token) hasta que el usuario hace clic en "Mostrar". Opcionalmente, permite copiar el valor después de mostrarlo.

# `<ClickToReveal>`

Renderiza un valor que está
**oculto por defecto**
con un botón "Mostrar" superpuesto. Se utiliza para valores sensibles como claves de API, tokens secretos, secretos de firma de webhook, valores que desea que sean visibles solo bajo demanda.

Extiende
[`<ClickToCopy>`](https://fleetbase.io/docs/ui/actions/click-to-copy)
— una vez revelado, el envoltorio también puede actuar como un objetivo para copiar al hacer clic.

## Uso básico

```
<ClickToReveal @value={{this.gateway.secret_key}} />
```

El valor se oculta. Al hacer clic en el
**Mostrar**
botón, aparece un indicador de carga durante 600 ms y luego se vuelve a mostrar el valor.

## Con opción de copiar después de mostrar

```
<ClickToReveal @value={{this.store.api_key}} @clickToCopy={{true}} />
```

Después de mostrar, al hacer clic en cualquier parte del envoltorio, se copia el valor, y aparece un icono "Copiado".

## Personalización de la visualización

Permite definir cómo se renderiza el valor oculto:

```
<ClickToReveal @value={{this.gateway.secret_key}}>
  <span class="font-mono text-sm">{{this.gateway.secret_key}}</span>
</ClickToReveal>
```

## Texto del botón personalizado

```
<ClickToReveal @value={{this.token}} @buttonText="Mostrar token" />
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@value` | string | — | El valor sensible. Se oculta hasta que se muestra; se copia al hacer clic después de mostrar |
| `@buttonText` | string | `Click to reveal` | Texto del botón de revelación |
| `@clickToCopy` | boolean | `false` | Después de mostrar, el envoltorio también actúa como un objetivo para copiar al hacer clic |
| `@wrapperClass` | string | — | Clases adicionales en el envoltorio exterior |
| `@column` | object | — | Cuando se utiliza como componente de celda de `<Table>`, el descriptor de columna — extrae `clickToCopy` y `wrapperClass` de `column.cellComponentArgs` |

Cualquier atributo adicional
`...attributes`
se pasa al envoltorio exterior
`<div>`
.

## Uso como componente de celda de tabla

`<ClickToReveal>`
está diseñado para integrarse directamente en
[`<Table>`](https://fleetbase.io/docs/ui/display/table)
como un
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

El componente lee
`column.cellComponentArgs.clickToCopy`
y
`column.cellComponentArgs.wrapperClass`
automáticamente.

## Ejemplos del mundo real

```
{{!-- Clave secreta de Stripe en la página de configuración del gateway --}}
<InputGroup @name="Secret Key">
  <ClickToReveal @value={{this.gateway.secret_key}} @clickToCopy={{true}} />
</InputGroup>

{{!-- Secreto de firma de webhook --}}
<ClickToReveal @value={{this.webhook.signing_secret}} @buttonText="Mostrar secreto de firma" />

{{!-- Clave de API en una lista --}}
<ClickToReveal @value={{store.key}} @clickToCopy={{true}}>
  <span class="font-mono text-xs">{{store.key}}</span>
</ClickToReveal>
```

## Ver también

* [`<ClickToCopy>`](https://fleetbase.io/docs/ui/actions/click-to-copy)
  — para valores no sensibles que desea que sean copiables al pasar el cursor

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/click-to-reveal.hbs` | Plantilla |
| `addon/components/click-to-reveal.js` | Clase (hereda de `<ClickToCopy>`) |