---
título: "Floatante"
url: https://fleetbase.io/docs/ui/layout/floating
módulo: ui
---

# Floatante

`<Floating>` renderiza el contenido en una capa flotante utilizando `@floating-ui`, que es el primitivo de posicionamiento de nivel inferior detrás de `<Attach::Tooltip>`, `<Attach::Popover>` y menús desplegables.

# `<Floating>`

`<Floating>`
es una utilidad de nivel inferior para renderizar un elemento en una capa flotante (típicamente un portal) y posicionarlo en relación con un disparador. Se utiliza internamente en tooltips, popovers y menús desplegables. La mayoría de los autores de extensiones no lo utilizarán directamente, pero está disponible si necesita una solución de posicionamiento personalizada.

## Uso básico

```
<button {{on "click" this.toggle}}>Mostrar detalles</button>

{{#if this.isOpen}}
  <Floating @placement="bottom-start">
    <div class="bg-white p-4 shadow rounded">
      Contenido flotante
    </div>
  </Floating>
{{/if}}
```

## Argumentos

| Argumento | Tipo | Descripción |
|---|---|---|
| `@placement` | string | Posición inicial: `top`, `bottom`, `left`, `right`, además de las variantes `-start` / `-end` |
| `@arrow` | boolean | Renderizar una flecha que apunte al elemento de referencia |
| `@renderInPlace` | boolean | Renderizar en el orden del DOM en lugar de a través de un portal |
| `@ariaRole` | string | Rol ARIA para el elemento flotante |

Cualquier atributo adicional
`...attributes`
se pasa al elemento flotante.

## Cuándo usarlo

Para la mayoría de las necesidades de posicionamiento, prefiera los componentes de nivel superior:

* [`<Attach::Tooltip>`](https://fleetbase.io/docs/ui/layout/attach-tooltip)
  — tooltips al pasar el cursor (se muestran en
  `mouseenter focus`)
* [`<Attach::Popover>`](https://fleetbase.io/docs/ui/layout/attach-popover)
  — popovers al hacer clic o pasar el cursor, soporta contenido interactivo
* [`<DropdownButton>`](https://fleetbase.io/docs/ui/navigation/dropdown-button)
  — botón + menú combinado

Utilice `<Floating>` directamente solo cuando los componentes de nivel superior no sean adecuados.

## Fuente

| Archivo | Descripción |
|---|---|
| `addon/components/floating.hbs` | Plantilla — renderiza a través de un portal utilizando `{{in-element}}` |
| `addon/components/floating.js` | Clase — gestiona la búsqueda y el posicionamiento del elemento padre |
| `addon/components/portal/` | El helper del portal utilizado para renderizar fuera del lugar |
| `addon/components/attach/` | Componentes de nivel superior de tooltips / popovers |