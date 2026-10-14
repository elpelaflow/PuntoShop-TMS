---
title: "Attach::Tooltip"
url: https://fleetbase.io/docs/ui/layout/attach-tooltip
module: ui
---

# Attach::Tooltip

El componente `<Attach::Tooltip>` renderiza un cuadro de herramientas adjunto al elemento padre. Envuelve `<Attach::Popover>` con opciones predeterminadas para cuadros de herramientas, como activadores por hover/enfocado, posicionamiento superior y animación de desvanecimiento.

# <Attach::Tooltip>

`<Attach::Tooltip>`
renderiza una capa flotante de cuadro de herramientas adjunta al elemento padre. Es un envoltorio delgado alrededor de
[`<Attach::Popover>`](https://fleetbase.io/docs/ui/layout/attach-popover)
con opciones predeterminadas para cuadros de herramientas, como mostrarse al
`mouseenter focus`
, ocultarse al
`mouseleave blur escapekey`
, con
`top`
posicionamiento.

Este es el componente base para cuadros de herramientas, utilizado en todo
`@fleetbase/ember-ui`
. La mayoría de los otros componentes (
`<Button>`
,
`<ContentPanel>`
,
`<Toggle>`
, etc.) tienen un comportamiento de cuadro de herramientas integrado, impulsado por el argumento
`@helpText`
— internamente, renderizan
`<Attach::Tooltip>`
.

## Uso básico

Coloque
`<Attach::Tooltip>`
**dentro**
del elemento al que desea adjuntarlo:

```
<button class="btn">
  <FaIcon @icon="info" />
  <Attach::Tooltip>
    Haga clic aquí para obtener más información
  </Attach::Tooltip>
</button>
```

El cuadro de herramientas se oculta automáticamente hasta que el usuario hace hover o enfoca el botón padre.

## Con contenido enriquecido

```
<span class="cursor-help underline decoration-dotted">
  Precio incluyendo impuestos
  <Attach::Tooltip @placement="bottom">
    <div class="text-xs">
      Los precios incluyen los impuestos según la tarifa configurada para su tienda.
    </div>
  </Attach::Tooltip>
</span>
```

## Patrón común con <InputInfo>

La mayoría de los componentes de ember-ui combinan
`<Attach::Tooltip>`
con el componente de contenido
`<InputInfo>`
:

```
<button class="btn btn-default">
  <FaIcon @icon="info-circle" />
  <Attach::Tooltip @class="clean" @animation="scale" @placement="top">
    <InputInfo @text="Configura la ventana de aceptación automática de pedidos" @exampleText="Recomendado: 5 minutos" />
  </Attach::Tooltip>
</button>
```

Utilice esto cuando desee que el estilo coincida con el que produce
`@helpText`
en
`<Button>`
,
`<ContentPanel>`
, etc.

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@placement` | string | `top` | Posición — `top` , `bottom` , `left` , `right` , además de las variantes `-start` / `-end` |
| `@class` | string | — | Clase para el cuadro de herramientas — use `clean` para la variante sin estilo utilizada con `<InputInfo>` |
| `@arrow` | boolean | `false` | Renderiza una flecha que apunta al elemento padre |
| `@offset` | number | — | Distancia del elemento padre en píxeles |
| `@shiftOptions` | object | — | Opciones de middleware para desplazar la interfaz flotante |
| `@animation` | string | `fill` | Animación — `fill` , `scale` , `slide` , `none` |
| `@hideOn` | string | `mouseleave blur escapekey` | Nombres de eventos separados por espacios para ocultar |
| `@showOn` | string | `mouseenter focus` | Nombres de eventos separados por espacios para mostrar |
| `@interactive` | boolean | `false` | Permite que el usuario haga clic dentro del cuadro de herramientas sin que se cierre |
| `@isShown` | boolean | `false` | Mostrar/ocultar de forma explícita |
| `@lazyRender` | boolean | `false` | No renderizar hasta la primera vez que se muestra |
| `@showDelay` | number | `0` | Retraso de visualización en ms |
| `@showDuration` | number | `300` | Duración de la animación de visualización |
| `@transitionDuration` | number | `0` | Duración de la transición |
| `@renderInPlace` | boolean | `false` | Renderizar en el orden del DOM en lugar de a través de un portal |

## Ejemplos del mundo real

```
{{!-- Cuadro de herramientas de ayuda estándar --}}
<button>
  <FaIcon @icon="info-circle" />
  <Attach::Tooltip>Esto explica qué hace el campo</Attach::Tooltip>
</button>

{{!-- Cuadro de herramientas en un icono de estado --}}
<span class="text-yellow-500">
  <FaIcon @icon="exclamation-triangle" />
  <Attach::Tooltip @placement="right">
    El conductor no ha sido visto en más de 30 minutos
  </Attach::Tooltip>
</span>

{{!-- Utilizado internamente por ember-ui para el soporte de @helpText --}}
<Button @text="Guardar" @helpText="Guarda sus cambios" />
{{!-- se expande a: <button> ... <Attach::Tooltip>...<InputInfo @text=...></InputInfo></Attach::Tooltip></button> --}}
```

## Ver también

* [`<Attach::Popover>`](https://fleetbase.io/docs/ui/layout/attach-popover)
  — para cuadros de herramientas activados por clic o persistentes
* [`<Floating>`](https://fleetbase.io/docs/ui/layout/floating)
  — el primitivo de posicionamiento de nivel inferior que utilizan todos los componentes Attach
* El argumento
  `@helpText`
  en
  `<Button>`
  ,
  `<ContentPanel>`
  ,
  `<Toggle>`
  ,
  `<Checkbox>`
  — soporte de cuadro de herramientas integrado que utiliza esto internamente

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/attach/tooltip.hbs` | Plantilla del cuadro de herramientas — envuelve `<Attach::Popover>` |
| `addon/components/attach/tooltip.js` | Clase del cuadro de herramientas |