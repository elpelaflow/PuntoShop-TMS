---
title: "ContentPanel"
url: https://fleetbase.io/docs/ui/layout/content-panel
module: ui
---

# ContentPanel

`<ContentPanel>` es la sección collapsible canónica utilizada para organizar formularios, configuraciones y vistas detalladas. Soporta títulos, insignias de estado, botones de acción y control de permisos.

# `<ContentPanel>`

`<ContentPanel>`
es el panel collapsible estándar utilizado para organizar una página en secciones discretas. Los grupos de configuración, las vistas detalladas, las bandejas... todos utilizan ContentPanel.

Por defecto, es collapsible. Para mostrarlo expandido, utiliza
`@open={{true}}`.

## Uso Básico

```
<ContentPanel @title="Detalles del conductor" @open={{true}}>
  <InputGroup @name="Nombre" @value={{this.driver.name}} />
  <InputGroup @name="Teléfono">
    <PhoneInput @value={{this.driver.phone}} />
  </InputGroup>
</ContentPanel>
```

## Collapsible por Defecto

Sin
`@open={{true}}`,
el panel se muestra colapsado:

```
<ContentPanel @title="Configuración avanzada">
  {{!-- Este cuerpo está oculto hasta que el usuario hace clic en el encabezado --}}
  <InputGroup @name="URL de webhook" @value={{this.webhookUrl}} />
</ContentPanel>
```

## Con una Insignia de Estado

`@titleStatus`
muestra una
[`<Badge>`](https://fleetbase.io/docs/ui/display/badge)
al lado del título:

```
<ContentPanel
  @title="Pedido #FB-1234"
  @titleStatus={{this.order.status}}
  @open={{true}}
>
  {{!-- ... --}}
</ContentPanel>
```

## Con un Subtítulo

```
<ContentPanel
  @title="Configuración de pago"
  @subtitle="Configura cómo los clientes te pagan"
  @open={{true}}
>
  {{!-- ... --}}
</ContentPanel>
```

## Con Botones de Acción

El bloque
`actions`
coloca los botones de acción en el encabezado del panel (lado derecho):

```
<ContentPanel @title="Ubicaciones" @open={{true}}>
  <:actions>
    <Button @type="primary" @icon="plus" @text="Añadir ubicación" @onClick={{this.addLocation}} />
  </:actions>

  <:default>
    {{!-- Lista de ubicaciones --}}
  </:default>
</ContentPanel>
```

## Argumentos

### Título y Subtítulo

| Argumento | Tipo | Descripción |
|---|---|---|
| `@title` | string | Título del panel |
| `@subtitle` | string | Texto más pequeño que se muestra debajo del título |
| `@prefixTitle` | string | Texto pequeño que se muestra encima del título |
| `@titleIcon` | string | Icono de FontAwesome al lado del título |
| `@titleIconPrefix` | string | Prefijo del icono ( `fas` , `far` , `fab` ) |
| `@titleIconSize` | string | Valor predeterminado `xs` |
| `@titleIconClass` | string | Clases adicionales en el icono |
| `@titleStatus` | string | Cadena de estado — muestra un `<Badge>` al lado del título |
| `@disableTitleStatusHumanize` | boolean | Se pasa al `<Badge>` |
| `@hideStatusDot` | boolean | Se pasa al `<Badge>` |
| `@titleComponent` | string | Renderiza un componente personalizado en lugar del bloque de título predeterminado |
| `@titleComponentContext` | any | Contexto que se pasa a `@titleComponent` |
| `@titleStatusContainerClass` | string | Clases adicionales alrededor de la insignia de estado |
| `@titleStatusClass` | string | Clases adicionales en la insignia de estado |

### Comportamiento de Abrir / Cambiar

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@open` | boolean | `false` | Indica si el panel se abre por defecto |
| `@toggleOnCaretOnly` | boolean | `false` | Solo cambia cuando se hace clic en el icono de la flecha — hacer clic en el texto del título no hace nada |
| `@hideCaret` | boolean | `false` | Oculta el control de flecha |
| `@caretIcon` | string | `chevron` | El nombre del icono (con el sufijo `-down` / `-up` según el estado) |
| `@caretLeft` | boolean | `false` | Renderiza la flecha a la izquierda del título en lugar de a la derecha |

### Carga y Deshabilitado

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@isLoading` | boolean | `false` | Muestra un indicador dentro de la fila del título y atenúa el panel |
| `@disabled` | boolean | `false` | Deshabilita visualmente el control (todavía es clickable, pero está atenuado) |
| `@permission` | string | — | Si el usuario actual no tiene esta capacidad, el panel se desactiva automáticamente y muestra una herramienta de ayuda "No autorizado" |

### Herramienta de Ayuda

| Argumento | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `@helpText` | string | — | Herramienta de ayuda en el título |
| `@exampleText` | string | — | Ejemplo opcional debajo de la herramienta de ayuda |
| `@tooltipPlacement` | string | `right` | Posición de la herramienta de ayuda |

### Botones de Acción

`@actionButtons`
acepta un array de descriptores de acción — cada uno se renderiza como un
`<Button>`
(o un componente personalizado) en el encabezado del panel:

```
<ContentPanel @title="Configuración" @open={{true}} @actionButtons={{this.headerActions}}>
  {{!-- ... --}}
</ContentPanel>
```

```
// en tu clase de componente
get headerActions() {
  return [
    { type: 'primary', icon: 'plus', text: 'Añadir', onClick: this.add },
    {
      icon: 'ellipsis',
      items: [   // Menú desplegable
        { text: 'Exportar', onClick: this.export },
        { text: 'Importar', onClick: this.import },
      ],
    },
  ];
}
```

Para un mayor control, utiliza el bloque
`actions`
en su lugar.

### Hooks de Clase de Diseño

Una larga lista de argumentos
`*Class`
te permite apuntar a cada elemento interno:

`@wrapperClass`
,
`@containerClass`
,
`@panelClass`
,
`@panelHeaderClass`
,
`@panelHeaderLeftClass`
,
`@panelHeaderRightClass`
,
`@panelTitleClass`
,
`@panelTitleInlineClass`
,
`@panelTitleWrapperClass`
,
`@panelSubtitleInlineClass`
,
`@titleContainerClass`
,
`@prefixTitleClass`
,
`@prefixTitleContainerClass`
,
`@titleIconWrapperClass`
,
`@pad`
.

### Callbacks

| Argumento | Firma | Descripción |
|---|---|---|
| `@onInsert` | `(api)` | Se llama cuando se inserta el panel. Recibe `{ toggle, open, close }` |
| `@onToggle` | `(isOpen)` | Se llama cada vez que se cambia el estado del panel |
| `@onClick` | `(api)` | Se llama al hacer clic en cualquier lugar del encabezado |
| `@onClickCaret` | `(api)` | Se llama cuando se hace clic específicamente en la flecha |
| `@onClickPanelTitle` | `(api)` | Se llama cuando se hace clic en el título (no en la flecha) |

El objeto
`api`
contiene
`{ toggle, open, close }`
para que puedas controlar el panel de forma imperativa desde fuera.

## Control Imperativo

Captura la API a través de
`@onInsert`
para controlar el panel desde fuera:

```
<ContentPanel @title="Filtros" @onInsert={{this.captureApi}}>
  {{!-- ... --}}
</ContentPanel>

<Button @text="Abrir filtros" @onClick={{fn this.api.open}} />
<Button @text="Cerrar filtros" @onClick={{fn this.api.close}} />
```

```
@tracked api = null;

@action captureApi(api) {
  this.api = api;  // { toggle, open, close }
}
```

## Bloques Renderizados

| Bloque | Propósito |
|---|---|
| (por defecto) | El cuerpo del panel |
| `:title` | Contenido personalizado al lado del título (reemplaza el renderizado predeterminado del título) |
| `:actions` | Botones de acción / menú desplegable en el encabezado a la derecha |

## Ejemplos del Mundo Real

```
{{!-- Grupo de configuración con insignia de estado --}}
<ContentPanel
  @title="Stripe Gateway"
  @titleStatus={{if this.gateway.is_sandbox "sandbox" "live"}}
  @open={{true}}
>
  <InputGroup @name="Clave pública" @value={{this.gateway.publishable_key}} />
  <InputGroup @name="Clave secreta" @value={{this.gateway.secret_key}} @type="password" />
</ContentPanel>

{{!-- Panel con permiso --}}
<ContentPanel
  @title="Zona de peligro"
  @permission="platform manage organization"
  @helpText="Solo los administradores de la organización pueden cambiar estas configuraciones"
>
  <Button @type="danger" @text="Eliminar organización" @onClick={{this.delete}} />
</ContentPanel>

{{!-- Con bloque actions --}}
<ContentPanel @title="Conductores" @open={{true}}>
  <:actions>
    <Button @type="primary" @icon="plus" @text="Nuevo conductor" @onClick={{this.addDriver}} />
    <Button @icon="filter" @onClick={{this.openFilters}} />
  </:actions>

  <:default>
    {{!-- Lista de conductores --}}
  </:default>
</ContentPanel>

{{!-- Estado de carga --}}
<ContentPanel @title="Detalles del pedido" @isLoading={{this.isLoading}} @open={{true}}>
  {{#unless this.isLoading}}
    {{!-- Cuerpo del pedido --}}
  {{/unless}}
</ContentPanel>
```

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/content-panel.hbs` | Plantilla |
| `addon/components/content-panel.js` | Clase |