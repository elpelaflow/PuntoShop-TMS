---
title: "Píld"
url: https://fleetbase.io/docs/ui/display/pill
module: ui
---

# Píld

El componente `<Pill>` renderiza un avatar + nombre + subtítulo opcional para un recurso de Fleetbase: conductor, cliente, vehículo, etc. También incluye un indicador opcional de estado en línea y una herramienta de ayuda.

# `<Pill>`

`<Pill>` es una representación compacta de un recurso de Fleetbase, típicamente utilizada en listas, celdas de tabla y widgets de asignación. Muestra la imagen del recurso (con respaldo), su nombre, un subtítulo opcional y un indicador de estado en línea si el recurso tiene la propiedad `online`.

Para etiquetas categóricas/de estado, utilice `<Badge>` en su lugar.

## Uso básico

```
<Pill @resource={{driver}} />
```

El componente deduce automáticamente:

* La imagen de
  `driver.photo_url`
  (o la que resuelva `<Image>`)
* El nombre de
  `driver.name`
  (o `display_name`, `displayName`, `tracking`, `public_id`)
* La imagen de respaldo de
  `defaultValues.<fallbackImageType>`
  o `defaultValues.placeholderImage`

## Con un subtítulo

```
<Pill @resource={{driver}} @subtitle={{driver.public_id}} />
```

## Con un indicador de estado en línea

```
<Pill @resource={{driver}} @showOnlineIndicator={{true}} />
```

Se superpone un pequeño punto al avatar: verde si `driver.online === true`, amarillo en caso contrario. Utilice `@onlinePath` para consultar otra propiedad.

## Imagen personalizada

Sobrescriba la imagen que se resuelve automáticamente:

```
<Pill @resource={{vehicle}} @imageSrc={{vehicle.photo_url}} @imageSize="40" />
```

## Maneador de clics

```
<Pill @resource={{driver}} @onClick={{this.openDriverDetail}} />
```

El manejador recibe el recurso como el primer argumento (seguido del evento de clic).

## Bloques renderizados

| Bloque | Recibe | Propósito |
|---|---|---|
| (predeterminado) | `@resource` | Para sobreescribir el área de título y subtítulo |
| `:image` | `@resource` | Para sobreescribir la imagen |
| `:tooltip` | `@resource` | Para renderizar el contenido dentro de la herramienta de ayuda |

```
<Pill @resource={{driver}}>
  <:image>
    <CustomAvatar @driver={{driver}} />
  </:image>
  <:default as |d|>
    <strong>{{d.name}}</strong>
    <span class="ml-2 text-xs">{{d.role}}</span>
  </:default>
  <:tooltip as |d|>
    Última vez visto: {{format-date-fns d.last_seen "PPpp"}}
  </:tooltip>
</Pill>
```

## Argumentos

### Recurso

| Argumento | Tipo | Descripción |
|---|---|---|
| `@resource` | model | El registro de recurso de Fleetbase |
| `@namePath` | string | Ruta en el recurso para el nombre (predeterminado: intenta `name`, `display_name`, `displayName`, `tracking`, `public_id`) |
| `@title` | string | Para sobreescribir el nombre resuelto |
| `@titleFallback` | string | Valor de respaldo cuando la resolución del nombre no devuelve nada (predeterminado: `-`) |
| `@subtitle` | string | Texto más pequeño debajo del nombre |

### Imagen

| Argumento | Tipo | Descripción |
|---|---|---|
| `@imageSrc` | string | Para sobreescribir la URL del avatar |
| `@imageFallback` | string | Para sobreescribir la URL de respaldo |
| `@fallbackImageType` | string | Clave de búsqueda: `defaultValues.<fallbackImageType>` |
| `@imageSize` | string | Ancho y alto en píxeles (predeterminado: `28`) |
| `@imageWidth` | string | Ancho solo |
| `@imageHeight` | string | Alto solo |
| `@imageAlt` | string | Atributo `alt` |
| `@imageClass` | string | Clases adicionales en la imagen |
| `@imageWrapperClass` | string | Clases adicionales alrededor de la imagen |

### Indicador de estado en línea

| Argumento | Tipo | Predeterminado | Descripción |
|---|---|---|---|
| `@showOnlineIndicator` | boolean | `false` | Para mostrar el indicador de estado en línea |
| `@onlinePath` | string | `online` | Ruta de propiedad en el recurso para el estado en línea |
| `@onlineIndicatorClass` | string | — | Clases adicionales en el indicador |

### Herramienta de ayuda

| Argumento | Tipo | Descripción |
|---|---|---|
| `@noTooltip` | boolean | Para desactivar las herramientas de ayuda por completo |
| `@tooltipPosition` | string | `top`, `bottom`, `left`, `right` (predeterminado: `top`) |
| `@tooltipComponent` | string | Para renderizar este componente dentro de la herramienta de ayuda |

### Hooks de clase de diseño

`@anchorClass`, `@contentWrapperClass`, `@titleClass`, `@subtitleClass`.

### Callback

| Argumento | Firma | Descripción |
|---|---|---|
| `@onClick` | `(resource, event)` | Se llama con el recurso al hacer clic |

## Ejemplos del mundo real

```
{{!-- Píld del conductor en un detalle de pedido --}}
<Pill @resource={{order.driver}} @showOnlineIndicator={{true}} @subtitle="Conductor asignado" />

{{!-- Dentro de una celda de tabla --}}
{{#if row.assignee}}
  <Pill @resource={{row.assignee}} @onClick={{fn this.openProfile row.assignee}} />
{{else}}
  <span class="text-gray-400">No asignado</span>
{{/if}}

{{!-- Con una herramienta de ayuda personalizada --}}
<Pill @resource={{driver}}>
  <:tooltip as |d|>
    <div>{{d.name}}</div>
    <div class="text-xs">{{d.email}}</div>
    <div class="text-xs">Vehículo: {{d.vehicle.name}}</div>
  </:tooltip>
</Pill>
```

## Ver también

* [`<Badge>`](https://fleetbase.io/docs/ui/display/badge)
  — Para etiquetas categóricas/de estado (sin avatar)

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/pill.hbs` | Plantilla |
| `addon/components/pill.js` | Clase |