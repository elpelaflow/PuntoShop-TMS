---
título: "ComboBox"
url: https://fleetbase.io/docs/ui/inputs/combo-box
módulo: ui
---

# ComboBox

`<ComboBox>` es un selector de lista doble: la columna izquierda muestra las opciones disponibles, la columna derecha muestra las opciones seleccionadas, con botones de flecha para mover elementos entre ellas.

# `<ComboBox>`

`<ComboBox>`
es un selector de lista doble — a veces llamado "lista de transferencia" o "lista de traslado". La columna izquierda muestra las opciones disponibles, la columna derecha muestra las opciones seleccionadas, y los botones de flecha mueven los elementos entre ambas.

Esto **no** es el mismo patrón que un tipo de autocompletado. Para ello, use
[`<Select>`](https://fleetbase.io/docs/ui/inputs/select),
[`<ModelSelect>`](https://fleetbase.io/docs/ui/inputs/model-select),
o
[`<MultiSelect>`](https://fleetbase.io/docs/ui/inputs/multi-select).

## Uso básico

```
<ComboBox
  @options={{this.allPermissions}}
  @selected={{this.assignedPermissions}}
  @optionLabel="name"
  @optionBoxLabel="Disponible"
  @selectionBoxLabel="Asignado"
  @onChange={{fn (mut this.assignedPermissions)}}
/>
```

## Cómo funciona

1. El usuario hace clic en las opciones de la columna izquierda para seleccionarlas (resaltadas como "pendientes")
2. Hace clic en el botón de flecha derecha para moverlas a la lista seleccionada
3. O hace clic en las opciones de la columna derecha ("no pendientes") y el botón de flecha izquierda para eliminarlas

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@options` | array | Todas las opciones disponibles |
| `@selected` | array | Opciones actualmente seleccionadas (subconjunto de `@options`) |
| `@optionLabel` | string | Ruta de propiedad en cada opción para la etiqueta de visualización |
| `@optionBoxLabel` | string | Encabezado para la columna izquierda (disponible) |
| `@selectionBoxLabel` | string | Encabezado para la columna derecha (seleccionada) |
| `@onChange` | `(selected)` | Se llama con el nuevo array seleccionado después de una transferencia |

## Cuándo usarlo

* Interfaces de usuario para la asignación de permisos/roles (asignar permisos a un rol)
* Configuración de selección múltiple donde ver simultáneamente las opciones "disponibles" y "asignadas" es útil
* Flujos de trabajo de asignación masiva (asignar conductores a una zona, productos a un catálogo, etc.)

Para la mayoría de los casos de uso de selección múltiple, prefiera
[`<MultiSelect>`](https://fleetbase.io/docs/ui/inputs/multi-select) — es más compacto.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/combo-box.hbs` | Plantilla |
| `addon/components/combo-box.js` | Clase |