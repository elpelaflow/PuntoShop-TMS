---
title: "Interruptor"
url: https://fleetbase.io/docs/ui/inputs/toggle
module: ui
---

# Interruptor

El `<Toggle>` es un interruptor para valores booleanos. Soporta etiquetas, colores personalizados, control de permisos y un bloque renderizado para contenido en línea.

# `<Toggle>`

Un control de interruptor para valores booleanos. Se utiliza en cualquier lugar donde sea necesario establecer un único valor booleano: paneles de configuración, banderas de función, interruptores "Online" / "Activo".

## Uso básico

```
<Toggle @isToggled={{this.isOnline}} @onToggle={{fn (mut this.isOnline)}} />
```

## Con una etiqueta

```
<Toggle
  @isToggled={{this.driver.online}}
  @label="Online"
  @onToggle={{fn (mut this.driver.online)}}
/>
```

El
`@label`
se renderiza a la derecha del interruptor.

## Renderizando una etiqueta personalizada

Si necesita que la etiqueta sea rica (ícono + texto, formato personalizado), renderice un bloque:

```
<Toggle @isToggled={{this.notify}} @onToggle={{fn (mut this.notify)}}>
  <FaIcon @icon="bell" class="mx-2" />
  <span class="text-sm">Enviar un correo electrónico cada vez que se realiza un pedido</span>
</Toggle>
```

## Argumentos

| Argumento | Tipo | Valor predeterminado | Descripción |
| --- | --- | --- | --- |
| `@isToggled` | boolean | `false` | El estado actual del interruptor |
| `@onToggle` | `(isToggled) => void` | — | Se llama con el nuevo estado cuando el usuario cambia el interruptor |
| `@label` | string | — | Etiqueta opcional que se renderiza a la derecha del interruptor |
| `@labelClass` | string | — | Clases adicionales para la etiqueta |
| `@activeColor` | string | `green` | Nombre de color de Tailwind utilizado para el color de fondo del estado "encendido" — por ejemplo, `green` , `blue` , `red` , `yellow` |
| `@disabled` | boolean | `false` | Si es `true`, los clics no tienen efecto y el interruptor se desactiva |
| `@visible` | boolean | `true` | Si es `false`, nada se renderiza |
| `@permission` | string | — | Si el usuario actual no tiene esta capacidad, el interruptor se desactiva automáticamente y muestra un tooltip "No autorizado" |
| `@helpText` | string | — | Texto del tooltip que se muestra junto a la etiqueta |
| `@exampleText` | string | — | Ejemplo opcional debajo del texto de ayuda |
| `@icon` | string | `info-circle` | Ícono que se muestra junto al texto de ayuda |
| `@iconClass` | string | — | Clases adicionales para el icono de ayuda |
| `@tooltipPlacement` | string | `right` | Posición del tooltip — `top` , `bottom` , `left` , `right` |
| `@wrapperClass` | string | — | Clases adicionales para el envoltorio exterior |

## Color diferente

Utilice
`@activeColor`
para cambiar el color del estado "encendido" — útil para indicar la gravedad:

```
<Toggle @isToggled={{this.danger}} @label="Modo de demolición" @activeColor="red" @onToggle={{fn (mut this.danger)}} />
<Toggle @isToggled={{this.warn}}   @label="Modo de advertencia"    @activeColor="yellow" @onToggle={{fn (mut this.warn)}} />
<Toggle @isToggled={{this.info}}   @label="Modo de información"       @activeColor="blue" @onToggle={{fn (mut this.info)}} />
```

## Control de permisos

```
<Toggle
  @isToggled={{this.feature.enabled}}
  @label="Habilitar la función"
  @permission="gestionar funciones de plataforma"
  @onToggle={{fn (mut this.feature.enabled)}}
/>
```

Si el usuario actual no puede gestionar las funciones, el interruptor se muestra desactivado con un tooltip "No autorizado".

## Con texto de ayuda

```
<Toggle
  @isToggled={{this.options.auto_dispatch}}
  @label="Enviar pedidos automáticamente"
  @helpText="Los pedidos se envían tan pronto como se aceptan, sin intervención manual."
  @onToggle={{fn (mut this.options.auto_dispatch)}}
/>
```

## Ejemplos del mundo real

```
{{!-- Conductor online/offline --}}
<Toggle
  @isToggled={{this.driver.online}}
  @label="Online"
  @onToggle={{fn (mut this.driver.online)}}
/>

{{!-- Configuración booleana con texto de ayuda --}}
<Toggle
  @isToggled={{this.options.tax_enabled}}
  @label="Activar el impuesto"
  @helpText="Aplicar un elemento de impuesto a las facturas. Se le pedirá que proporcione el porcentaje de impuesto."
  @onToggle={{fn (mut this.options.tax_enabled)}}
/>

{{!-- Dentro de un formulario, junto a InputGroup --}}
<InputGroup>
  <Toggle
    @isToggled={{this.driver.email_notifications}}
    @label="Notificaciones por correo electrónico"
    @onToggle={{fn (mut this.driver.email_notifications)}}
  />
</InputGroup>

{{!-- Interruptor desactivado --}}
<Toggle @isToggled={{this.locked}} @label="Bloqueado (solo para administradores)" @disabled={{true}} />
```

## Fuente

| Archivo | Descripción |
| --- | --- |
| `addon/components/toggle.hbs` | Plantilla |
| `addon/components/toggle.js` | Clase |