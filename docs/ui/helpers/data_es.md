---
título: "Ayudantes de Datos y Utilidades"
url: https://fleetbase.io/docs/ui/helpers/data
módulo: ui
---

# Ayudantes de Datos y Utilidades

Ayudantes para la manipulación de datos, el acceso al modelo, la navegación y utilidades generales: `get-dot-prop`, `set-model-attr`, `json-stringify`, `transition-to`, y muchos más.

# Ayudantes de Datos y Utilidades

Esta página cubre el resto de la biblioteca de ayudantes: manipulación de datos, acceso al modelo, navegación y utilidades diversas.

## Acceso a Datos

### `{{get-dot-prop object path}}`

Lee un valor a través de una cadena de ruta:

```
{{get-dot-prop @order "customer.address.city"}}
```

### `{{safe-has object key}}`

Devuelve `true` si el objeto tiene la clave especificada (maneja los valores `null`/`undefined` de forma segura):

```
{{#if (safe-has @row "metadata.tags")}}
  {{!-- tags existen --}}
{{/if}}
```

### `{{safe-dasherize value}}`

Convierte una cadena a snake_case, devolviendo una cadena vacía si el valor es `null`/`undefined`:

```
class="status-{{safe-dasherize @order.status}}"
```

### `{{first-char value}}`

Devuelve el primer carácter: útil para los avatares/abreviaturas:

```
<div class="avatar">{{first-char @user.name}}</div>
```

### `{{n-a value fallback?}}`

Devuelve el valor si es verdadero, de lo contrario,
`N/A`
(o tu valor de respaldo):

```
{{n-a @order.driver.name}}
{{n-a @order.driver.name "Unassigned"}}
```

### `{{string-starts-with str prefix}}`

```
{{#if (string-starts-with @id "store_")}}
  {{!-- es una clave de tienda --}}
{{/if}}
```

### `{{to-int value}}`

Convierte a entero:

```
{{to-int @order.quantity}}
```

## JSON

### `{{json-stringify value indent?}}`

Convierte un valor a JSON:

```
<pre>{{json-stringify @order indent=2}}</pre>
```

### `{{json-hash key1=value1 key2=value2}}`

Crea un objeto simple a partir de pares clave/valor:

```
{{component "table/cell/component"
  cellComponentArgs=(json-hash actions=this.actions)
}}
```

## Modelo y Recurso

### `{{set-model-attr model attr value}}`

Establecedor de atributo imperativo: útil en contextos de acción inline:

```
<button {{on "click" (fn (set-model-attr @driver "online")) true}}>
  Marcar como online
</button>
```

### `{{get-model-name model}}`

Devuelve el nombre del tipo de modelo:

```
{{get-model-name @row}}    {{!-- "driver" --}}
```

### `{{avatar-url subject}}`

Devuelve una URL de avatar segura para un usuario/conductor/cliente:

```
<img src={{avatar-url @user}} />
```

### `{{get-file-url file}}`

Devuelve la URL pública para un registro de archivo:

```
<a href={{get-file-url @doc}}>{{@doc.original_filename}}</a>
```

### `{{point-coordinates point}} , {{point-to-coordinates point}} , {{unwrap-coordinates point}}`

Ayudantes para trabajar con objetos de punto de estilo PostGIS.

### `{{get-default-value value default}}`

Utiliza el valor predeterminado cuando el valor es `null`/`undefined`:

```
{{get-default-value @options.timezone "UTC"}}
```

## Universo / Registro

### `{{get-universe-components registry}}`

Devuelve los componentes contribuidos a un registro: normalmente, en lugar de esto, se usaría
[`<RegistryYield>`](https://fleetbase.io/docs/ui/registry/registry-yield)
.

### `{{get-universe-menu-items registry}}`

Devuelve los elementos de menú contribuidos a un registro.

### `{{has-registration registry key}}`

Devuelve `true` si existe una inscripción en un registro.

## Navegación

### `{{transition-to route ...models}}`

Devuelve una función de devolución de llamada que realiza la transición a la ruta: conveniente para
`@onClick`
:

```
<Button @text="Back" @onClick={{transition-to "drivers.index"}} />
```

## Resolución de Componentes

### `{{component-resolvable name}}`

Devuelve `true` si el nombre del componente se resuelve en el resolutor actual:

```
{{#if (component-resolvable @customCellComponent)}}
  {{component @customCellComponent row=@row}}
{{/if}}
```

### `{{resolve-component name}}`

Resuelve un componente por nombre: útil para el renderizado dinámico de componentes.

### `{{lazy-engine-component name}}`

Resuelve un componente desde otro motor, cargando el motor de forma perezosa si es necesario.

## Otros Ayudantes Útiles

| Ayudante | Propósito |
|---|---|
| `{{noop}}` | Un "no-op" — útil como respaldo para `@onClick` |
| `{{now}}` | Devuelve la fecha y hora actual |
| `{{config "defaultValues.placeholderImage"}}` | Lee un valor de configuración |
| `{{join-column-list columns}}` | Une las etiquetas de columna con comas |
| `{{set-has-item set value}}` | Devuelve `true` si el conjunto contiene el valor |
| `{{set-object-kv obj key value}}` | Devuelve un nuevo objeto con la clave establecida |
| `{{cfg-edit-buttons}}` | Devuelve la configuración de los botones de edición/cancelar/guardar estándar |
| `{{spread-widget-options widget}}` | Expande las opciones del widget a los argumentos del componente |
| `{{get-notification-key event}}` | Traduce un evento a una clave de notificación |
| `{{dropdown-fn dd action ...args}}` | Cierra el desplegable después de ejecutar la acción |
| `{{resource-context-panel-save-disabled panel}}` | Lógica para el botón de guardar del panel de contexto del recurso |

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/helpers/` | Todos los ayudantes: más de 50 archivos, leer cada uno según sea necesario |