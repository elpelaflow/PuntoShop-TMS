---
title: "Spinner"
url: https://fleetbase.io/docs/ui/display/spinner
module: ui
---

# Spinner

`<Spinner>` muestra un indicador de carga pequeño. Se utiliza dentro de botones, paneles y listas mientras se está realizando una tarea asíncrona.

# `<Spinner>`

Un simple indicador de carga. Úselo dentro de botones, encabezados de paneles, filas de listas o en cualquier lugar donde necesite indicar que una tarea está en curso.

`<Button>`
ya muestra un spinner internamente cuando se pasa
`@isLoading={{true}}`
— normalmente no necesita
`<Spinner>`
directamente dentro de los botones.

## Uso básico

```
<Spinner />
```

## Con un mensaje de carga

Puede pasar el mensaje como
`@text`,
`@loadingMessage`
o
`@message`,
o renderizarlo como un bloque:

```
<Spinner @text="Cargando…" />

<Spinner>
  Cargando — espere
</Spinner>
```

## Tamaño

El spinner acepta un tamaño predefinido o dimensiones en píxeles explícitas.

```
{{!-- Tamaños predefinidos --}}
<Spinner @size="xs" />   {{!-- 12x12 --}}
<Spinner @size="sm" />   {{!-- 14x14 --}}
<Spinner @size="md" />   {{!-- 16x16 (predeterminado) --}}
<Spinner @size="lg" />   {{!-- 18x18 --}}
<Spinner @size="xl" />   {{!-- 20x20 --}}
<Spinner @size="2xl" />  {{!-- 22x22 --}}
<Spinner @size="3xl" />  {{!-- 24x24 --}}

{{!-- Tamaño numérico — ancho y alto ambos iguales al número, en píxeles --}}
<Spinner @size={{32}} />

{{!-- Ancho/alto explícito --}}
<Spinner @width={{20}} @height={{20}} />
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@size` | string | number | — | Tamaño predefinido ( `xs` / `sm` / `md` / `lg` / `xl` / `2xl` / `3xl` ) o tamaño en píxeles numérico — establece tanto el ancho como la altura |
| `@width` | number | `16` | Ancho en píxeles (se utiliza si `@size` no está establecido) |
| `@height` | number | `16` | Altura en píxeles (se utiliza si `@size` no está establecido) |
| `@text` | string | — | Texto del mensaje de carga |
| `@loadingMessage` | string | — | Alias para `@text` |
| `@message` | string | — | Alias para `@text` |
| `@wrapperClass` | string | — | Clases adicionales en el envoltorio externo |
| `@iconClass` | string | — | Clases adicionales en el icono del spinner |
| `@loadingMessageClass` | string | — | Clases adicionales en el mensaje de carga |

El contenido renderizado tiene prioridad sobre
`@text`,
`@loadingMessage`
o
`@message`.

## Ejemplos del mundo real

```
{{!-- Spinner en línea junto a una etiqueta --}}
<div class="flex items-center">
  <Spinner @size="xs" />
  <span class="ml-2 text-sm">Actualizando…</span>
</div>

{{!-- Estado de carga para una sección --}}
{{#if this.isLoading}}
  <div class="flex items-center justify-center py-12">
    <Spinner @size="lg" @text="Cargando órdenes…" />
  </div>
{{else}}
  {{!-- ... --}}
{{/if}}

{{!-- Dentro de una celda de tabla --}}
{{#if row.processing}}
  <Spinner @size="xs" />
{{else}}
  {{row.status}}
{{/if}}
```

## Ver también

* [`<Button>`](https://fleetbase.io/docs/ui/actions/button)
  — tiene el `@isLoading` incorporado
  que muestra un spinner

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/spinner.hbs` | Plantilla |
| `addon/components/spinner.js` | Clase |