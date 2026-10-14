---
title: "Attach::Popover"
url: https://fleetbase.io/docs/ui/layout/attach-popover
module: ui
---

# Attach::Popover

El componente `<Attach::Popover>` crea una capa flotante que se adjunta a su elemento padre, utilizada para menús desplegables, menús de contexto y interfaces de usuario flotantes activadas con un clic.

# <Attach::Popover>

`<Attach::Popover>`
crea una capa flotante que se adjunta a su elemento padre. A diferencia de
`<Attach::Tooltip>`
(que está configurado para indicaciones de "pasar por encima" temporales), el Popover está configurado para interacciones más ricas: activación con clic, visibilidad persistente y contenido interactivo que el usuario puede seleccionar con el ratón.

Utiliza
`<Floating>`
bajo el capó para la posición.

## Uso básico

Coloque el Popover
**dentro**
del elemento al que debe adjuntarse:

```
<button class="btn btn-default">
  <FaIcon @icon="ellipsis" />
  <Attach::Popover @showOn="click" @hideOn="clickout escapekey">
    <div class="bg-white p-4 rounded shadow-lg">
      <h4 class="font-semibold mb-2">Acciones rápidas</h4>
      <Button @text="Editar"   @onClick={{this.edit}} />
      <Button @text="Eliminar" @type="danger" @onClick={{this.delete}} />
    </div>
  </Attach::Popover>
</button>
```

## Diferencias con <Attach::Tooltip>

|  | Tooltip | Popover |
| --- | --- | --- |
| `@showOn` por defecto | `mouseenter focus` | `mouseenter focus` |
| `@hideOn` por defecto | `mouseleave blur escapekey` | `mouseleave blur escapekey` |
| `@placement` por defecto | `top` | `top` |
| `@interactive` por defecto | `false` | `false` |
| `@animation` por defecto | `fill` | `fill` |

Los componentes tienen valores predeterminados similares, pero
`Popover`
es el bloque de construcción de nivel inferior.
`Tooltip`
es un envoltorio delgado que también añade
`@class="ember-attacher-tooltip"`
y
`@ariaRole="tooltip"`.

Para menús desplegables reales (activados con un clic, persistentes e interactivos), sobrescriba los valores predeterminados:

```
<Attach::Popover
  @showOn="click"
  @hideOn="clickout escapekey"
  @interactive={{true}}
  @placement="bottom-end"
  @arrow={{true}}
>
  {{!-- contenido del menú desplegable --}}
</Attach::Popover>
```

## Mostrar/Ocultar de forma imperativa

Utilice
`@isShown`
para un control completo mediante programación:

```
<Attach::Popover @isShown={{this.popoverOpen}}>
  {{!-- ... --}}
</Attach::Popover>

<Button @text="Activar/Desactivar menú desplegable" @onClick={{toggle this 'popoverOpen'}} />
```

Combine esto con
`@showOn`
/
`@hideOn`
establecidos en cadenas vacías si desea suprimir los desencadenantes de eventos predeterminados.

## Renderizado "lazy"

Para contenido costoso (gráficos complejos, tablas grandes), habilite
`@lazyRender`
:

```
<Attach::Popover @lazyRender={{true}}>
  <ExpensiveChart />
</Attach::Popover>
```

El gráfico solo se renderiza la primera vez que se muestra el popover.

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@placement` | string | `top` | `top` , `bottom` , `left` , `right` , además de las variantes `-start` / `-end` |
| `@arrow` | boolean | `false` | Renderiza una flecha que apunta al elemento padre |
| `@offset` | number | — | Distancia del elemento padre en píxeles |
| `@shiftOptions` | object | — | Opciones de middleware de desplazamiento para la interfaz de usuario flotante |
| `@animation` | string | `fill` | Animación — `fill` , `scale` , `slide` , `none` |
| `@hideOn` | string | `mouseleave blur escapekey` | Eventos separados por espacios para ocultar. Comunes: `clickout` |
| `@showOn` | string | `mouseenter focus` | Eventos separados por espacios para mostrar. Comunes: `click` |
| `@interactive` | boolean | `false` | Permite que el usuario seleccione el contenido del popover sin que este se cierre |
| `@isShown` | boolean | — | Control de mostrar/ocultar mediante programación |
| `@lazyRender` | boolean | `false` | No renderizar hasta la primera vez que se muestra |
| `@showDelay` | number | `0` | Retraso de visualización en ms |
| `@hideDelay` | number | `0` | Retraso de ocultación en ms |
| `@showDuration` | number | `300` | Duración de la animación de visualización |
| `@hideDuration` | number | `300` | Duración de la animación de ocultación |
| `@transitionDuration` | number | `0` | Duración de la transición |
| `@renderInPlace` | boolean | `false` | Renderizar en el orden del DOM en lugar de a través de un portal |
| `@flip` | object | — | Opciones de middleware de volteo para la interfaz de usuario flotante |
| `@modifiers` | array | — | Middleware adicional para la interfaz de usuario flotante |
| `@useCapture` | boolean | `false` | Utilizar la fase de captura para los escuchadores de eventos |
| `@onChange` | `(isShown)` | — | Se llama cuando el popover se activa/desactiva |
| `@classNames` | string | — | Clases adicionales en el envoltorio del popover |

## Patrones de activación comunes

| Patrón | `@showOn` | `@hideOn` | `@interactive` |
| --- | --- | --- | --- |
| Menú desplegable (pasar por encima) | `mouseenter focus` | `mouseleave blur escapekey` | `false` |
| Menú de clic | `click` | `clickout escapekey` | `true` |
| Menú flotante (el ratón puede entrar) | `mouseenter focus` | `mouseleave blur escapekey` | `true` |
| Control manual | `""` (vacío) | `""` (vacío) | según sea necesario |

## Ver también

* [`<Attach::Tooltip>`](https://fleetbase.io/docs/ui/layout/attach-tooltip)
  — envoltorio para menús desplegables
* [`<Floating>`](https://fleetbase.io/docs/ui/layout/floating)
  — primitiva subyacente de posicionamiento
* [`<DropdownButton>`](https://fleetbase.io/docs/ui/navigation/dropdown-button)
  — para combinaciones de botones y menús (utiliza BasicDropdown en lugar de Attach::Popover)

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/attach/popover.hbs` | Plantilla del popover |
| `addon/components/attach/popover.js` | Clase del popover |