---
title: "Botón"
url: https://fleetbase.io/docs/ui/actions/button
module: ui
---

# Botón

`<Button>` es el componente de botón estándar. Soporta tipos, tamaños, iconos, estado de carga, control de permisos, tooltips y eventos de análisis.

# `<Button>`

El botón estándar utilizado en todo el Fleetbase Console. Soporta tipos, tamaños, iconos, estado de carga, comprobaciones de permisos integradas, tooltips y eventos de análisis.

## Uso básico

```
<Button @text="Guardar" @onClick={{this.guardar}} />

<Button @type="primario" @icon="guardar" @text="Guardar Cambios" @onClick={{this.guardar}} />

<Button @type="peligroso" @icon="basura" @text="Eliminar" @onClick={{this.eliminar}} />
```

## Argumentos

### Visual

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@type` | string | `default` | Variante visual — `default`, `primario`, `secundario`, `exitoso`, `advertencia`, `peligroso`, `magico` |
| `@size` | string | `sm` | `xs`, `sm`, `md`, `lg`, `xl` |
| `@text` | string | — | Etiqueta del botón |
| `@outline` | booleano | `false` | Renderiza la variante de contorno |
| `@responsive` | booleano | `false` | Oculta el texto en pantallas pequeñas (solo icono en `sm:` ) |
| `@wrapperClass` | string | — | Clases adicionales en el envoltorio exterior |
| `@textClass` | string | — | Clases adicionales en el espacio de texto |
| `@buttonType` | string | `button` | El atributo nativo `type` — `button`, `submit`, `reset` |

### Icono

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@icon` | string | — | Nombre del icono de FontAwesome (por ejemplo, `guardar`, `basura`, `más`) |
| `@iconPrefix` | string | — | Prefijo de FontAwesome — `fas`, `far`, `fab`, etc. |
| `@iconSize` | string | — | Pasado a `<FaIcon>` ( `xs`, `sm`, `lg`, `2x`, etc.) |
| `@iconRotation` | número | — | 90 / 180 / 270 |
| `@iconFlip` | string | — | `horizontal`, `vertical`, `both` |
| `@iconSpin` | booleano | — | Rota el icono |
| `@iconClass` | string | — | Clases adicionales en el icono |

### Estado de carga

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@isLoading` | booleano | `false` | Muestra un spinner en lugar del icono y desactiva el botón |
| `@loaderWidth` | número | `14` | Ancho del spinner en píxeles |
| `@loaderHeight` | número | `14` | Altura del spinner en píxeles |

### Deshabilitado / Visibilidad

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@disabled` | booleano | `false` | Desactiva el botón |
| `@visible` | booleano | `true` | Cuando es `false`, nada se renderiza |

### Permisos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@permission` | string | Si el usuario actual no tiene esta capacidad, el botón se desactiva automáticamente y se muestra un tooltip "No autorizado". Utiliza `ember-can` |

### Tooltip

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@helpText` | string | — | Texto del tooltip que se muestra al pasar el cursor |
| `@exampleText` | string | — | Ejemplo opcional que se muestra debajo del texto de ayuda |
| `@tooltipPlacement` | string | `top` | `top`, `bottom`, `left`, `right` |

### Llamadas de retorno

| Argumento | Firma | Descripción |
|---|---|---|
| `@onClick` | `(event)` | Se llama al hacer clic. Se omite cuando el botón está deshabilitado o en estado de carga |
| `@onInsert` | `()` | Se llama una vez después de insertar el botón en el DOM |

### Análisis

| Argumento | Tipo | Descripción |
|---|---|---|
| `@eventName` | string | Si está establecido, llama a `events.trackEvent(eventName, ...eventArgs)` al hacer clic antes de invocar `@onClick` |
| `@eventArgs` | array | Argumentos para pasar a `trackEvent` |

## Control de permisos

Pasa
`@permission`
para controlar el botón utilizando la capacidad
`ember-can`:

```
<Button
  @type="peligroso"
  @icon="basura"
  @text="Eliminar"
  @permission="fleet-ops delete-driver"
  @onClick={{this.eliminar}}
/>
```

Si el usuario actual no puede eliminar conductores, el botón se muestra deshabilitado con el tooltip "No autorizado", y tu
`@onClick`
no se ejecutará, incluso si se desactiva de alguna manera.

## Estado de carga

```
<Button
  @type="primario"
  @icon="guardar"
  @text="Guardar"
  @isLoading={{this.isSaving}}
  @onClick={{this.guardar}}
/>
```

Mientras está en carga, el icono se reemplaza por un spinner, el botón se desactiva y los clics se ignoran.

## Renderizar contenido personalizado

Si
`@text`
no es suficiente — por ejemplo, si necesitas un icono entre dos piezas de texto — renderiza un bloque:

```
<Button @type="primario" @onClick={{this.enviar}}>
  Enviar
  <FaIcon @icon="papel-avion" class="ml-2" />
</Button>
```

## Ejemplos del mundo real

```
{{!-- Botón primario estándar para guardar --}}
<Button @type="primario" @icon="guardar" @text="Guardar" @isLoading={{this.isSaving}} @onClick={{this.guardar}} />

{{!-- Acción destructiva con comprobación de permisos --}}
<Button
  @type="peligroso"
  @icon="basura"
  @text="Eliminar"
  @permission="fleet-ops delete-driver"
  @helpText="Eliminar permanentemente este conductor"
  @onClick={{this.confirmDelete}}
/>

{{!-- Botón de envío dentro de un formulario --}}
<Button @buttonType="submit" @type="primario" @text="Enviar" />

{{!-- Botón de icono solo "Añadir" --}}
<Button @type="primario" @icon="más" @size="xs" @onClick={{this.addRow}} />

{{!-- Botón responsivo — texto completo en escritorio, icono solo en móvil --}}
<Button @type="primario" @icon="filtro" @text="Filtros" @responsive={{true}} @onClick={{this.openFilters}} />

{{!-- Variante de contorno --}}
<Button @type="primario" @outline={{true}} @text="Cancelar" @onClick={{this.cancelar}} />
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/button.hbs` | Plantilla |
| `addon/components/button.js` | Clase |