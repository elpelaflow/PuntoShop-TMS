---
title: "Checkbox"
url: https://fleetbase.io/docs/ui/inputs/checkbox
module: ui
---

# Checkbox

`<Checkbox>` es la casilla de verificación estándar. Soporta etiquetas, control de permisos, texto de ayuda y un bloque renderizado para contenido de etiquetas enriquecido.

# `<Checkbox>`

La casilla de verificación estándar para entradas booleanas. Úsela cuando necesite una casilla de verificación específicamente, por ejemplo, para un interruptor de encendido/apagado, prefiera [`<Toggle>`](https://fleetbase.io/docs/ui/inputs/toggle).

## Uso básico

```
<Checkbox @value={{this.accepted}} @label="Acepto los términos" @onToggle={{fn (mut this.accepted)}} />
```

## Renderizando una etiqueta enriquecida

```
<Checkbox @value={{this.consent}} @onToggle={{fn (mut this.consent)}}>
  Acepto los <a href="/terms">términos y condiciones</a>
</Checkbox>
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@value` | boolean | `false` | El estado actual de marcado. Alias como `@checked` |
| `@checked` | boolean | — | Igual que `@value`. Si ambos están presentes, `@checked` tiene prioridad |
| `@label` | string | — | Texto de la etiqueta renderizado a la derecha de la casilla |
| `@onToggle` | `(checked, target) => void` | — | Se llama cuando se cambia la casilla de verificación |
| `@onChange` | `(checked, event) => void` | — | Se llama con el evento de cambio original, además de `@onToggle` |
| `@id` | string | auto-generado | Sobreescribe el `id` de la entrada |
| `@disabled` | boolean | `false` | Deshabilita la casilla de verificación |
| `@visible` | boolean | `true` | Si es `false`, nada se renderiza |
| `@permission` | string | — | Si el usuario actual no tiene esta capacidad, la casilla de verificación se deshabilita automáticamente y muestra un tooltip "No autorizado" |
| `@alignItems` | string | `start` | `items-start` (predeterminado), `items-center`, `items-end` — cómo alinear verticalmente los elementos |
| `@helpText` | string | — | Texto del tooltip |
| `@exampleText` | string | — | Ejemplo opcional debajo del texto de ayuda |
| `@tooltipPlacement` | string | `top` | Posición del tooltip |
| `@inputClass` | string | — | Clases adicionales en la etiqueta `<input>` |
| `@labelClass` | string | — | Clases adicionales en la etiqueta `<label>` |
| `@wrapperClass` | string | — | Clases adicionales en el envoltorio externo |

## Control de permisos

```
<Checkbox
  @value={{this.feature.enabled}}
  @label="Función beta"
  @permission="platform manage feature-flags"
  @onToggle={{fn (mut this.feature.enabled)}}
/>
```

Si el usuario actual no puede gestionar las funciones, la casilla de verificación se desactiva con un tooltip "No autorizado".

## Distinción entre `@onToggle` y `@onChange`

Ambos se activan en cada cambio. La diferencia es el segundo argumento:

* `@onToggle(checked, target)`
  —
  `target`
  es el elemento del DOM de la entrada
* `@onChange(checked, event)`
  —
  `event`
  es el evento del DOM completo

Utilice el que mejor se adapte a su firma de controlador.

## Ejemplos del mundo real

```
{{!-- Casilla de verificación simple para incluir o no el flete --}}
<Checkbox @value={{this.includeFreight}} @label="Incluir cargos de flete" @onToggle={{fn (mut this.includeFreight)}} />

{{!-- Dentro de una fila de opciones --}}
{{#each this.permissionsList as |permission|}}
  <Checkbox
    @value={{includes permission this.selectedPermissions}}
    @label={{humanize permission}}
    @onToggle={{fn this.togglePermission permission}}
  />
{{/each}}

{{!-- Con texto de ayuda --}}
<Checkbox
  @value={{this.options.cod_enabled}}
  @label="Activar pago en el lugar"
  @helpText="Mostrar 'Pago en el lugar' como opción de pago en el momento de la compra."
  @onToggle={{fn (mut this.options.cod_enabled)}}
/>
```

## Cuándo usar cada uno

| Necesidad | Uso |
|---|---|
| Un campo booleano en un formulario | `<Checkbox>` o `<Toggle>` |
| Un interruptor de encendido/apagado (configuración, funciones) | `<Toggle>` |
| Seleccionar una o más filas en una lista | `<Checkbox>` |
| Aceptar términos o consentimiento | `<Checkbox>` |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/checkbox.hbs` | Plantilla |
| `addon/components/checkbox.js` | Clase |