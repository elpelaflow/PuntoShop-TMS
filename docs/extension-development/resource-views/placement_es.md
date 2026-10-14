---
Título: "Posicionamiento"
URL: https://fleetbase.io/docs/extension-development/resource-views/placement
Módulo: extension-development
---

Vistas de recursos

# Posicionamiento

Define dónde aparecen tus columnas, acciones y botones dentro de una vista, ya sea antes o después de otro elemento, en una posición específica o según su prioridad, y dónde se colocan cuando no se especifica.

# Posicionamiento

Cuando una vista se renderiza, utiliza sus propios elementos (integrados) y los combina con los tuyos. El "Posicionamiento" determina dónde se colocan cada uno de los tuyos. Cada contrato ofrece las mismas cuatro opciones de posicionamiento.

| Opción | Método | Coloca el elemento |
|---|---|---|
| `before` | `.before(id)` | Directamente antes del elemento con ese ID |
| `after` | `.after(id)` | Directamente después del elemento con ese ID |
| `index` | `.withIndex(n)` | En la posición `n` de la lista, contando desde 0 |
| `priority` | `.withPriority(n)` | Define el orden en el que se colocan los elementos registrados. El de menor prioridad primero; el valor predeterminado es `10` |

```
new TableColumn({ id: 'acme-score', label: 'Score' }).after('status');
new TableColumn({ id: 'acme-region', label: 'Region' }).before('name');
new TableColumn({ id: 'acme-flag', label: 'Flag' }).withIndex(0);
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
```

Las mismas opciones también se pueden pasar como claves:

```
new TableColumn({ id: 'acme-score', label: 'Score', after: 'status' });
```

`before`
y
`after`
se reemplazan mutuamente: llamar a
`.after()`
elimina un
`.before()`
anterior, y viceversa.

## Cómo se colocan los elementos

Para cada posición, la vista:

1. **Comienza con sus elementos integrados**, en su propio orden.
2. **Elimina los elementos registrados cuyo
   `id`
   ya esté en uso.** Los elementos integrados siempre tienen prioridad. Un mensaje de depuración indica el ID que se ha omitido.
3. **Ordena los elementos registrados restantes según la
   `prioridad`**, comenzando por el de menor prioridad. Los elementos con la misma prioridad mantienen el orden en que se registraron.
4. **Coloca cada uno en su lugar:**
   * antes o después de su elemento de anclaje, si existe un elemento con ese ID en la lista;
   * de lo contrario, en la posición
     `index`, que se ajusta al principio o al final de la lista;
   * de lo contrario, en la posición predeterminada de la posición.

Dado que los elementos se colocan uno a la vez, un elemento puede anclarse a un elemento de otra extensión, siempre y cuando ese elemento se coloque primero. Asegúrate de asignar una prioridad más baja al anclaje.

## Posiciones predeterminadas

Si no se especifica un posicionamiento, o si el elemento de anclaje no está presente:

| Posición | Posición predeterminada | Razón |
|---|---|---|
| `columns` | Justo antes de la columna de acciones de la fila ("...") | Tu columna es la última columna de datos, y la columna "..." permanece en el borde derecho |
| `row-actions` | Justo antes del elemento "delete" y el separador que lo precede | "Delete" permanece en la parte inferior del menú |
| `menu` (detalles) | Igual que `row-actions` | Igual |
| `bulk-actions` | Al final |  |
| `actions` (botones de la barra de herramientas y encabezado) | Al final, después de los botones integrados |  |
| `tabs` | Después de los separadores integrados |  |

## Cómo encontrar los IDs para anclar

Los IDs integrados se enumeran para cada vista en el
[Catálogo de recursos](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
. Siguen dos reglas, por lo que normalmente puedes adivinar cuáles son:

* El ID de una columna es su
  `valuePath`
  , con guiones:
  `created_at`
  →
  `created-at`
  ,
  `vendor.name`
  →
  `vendor-name`
  .
* El ID de una acción es el nombre del controlador, con guiones:
  `assignVehicle`
  →
  `assign-vehicle`
  . El elemento "delete" siempre es
  `delete`
  .

Un anclaje que no está en la lista se ignora, no genera un error: el elemento vuelve a la posición
`index`, y luego a la posición predeterminada. Esto asegura que tu elemento siga visible si una futura versión del motor cambia o elimina el anclaje.

## Ejemplos

```
// Justo después de la columna de estado
new TableColumn({ id: 'acme-score', label: 'Score' }).after('status');

// La primera columna de datos (antes del nombre, que suele ser la primera)
new TableColumn({ id: 'acme-flag', label: '' }).before('name');

// El primer elemento del menú de la fila
new ResourceAction({ id: 'acme-open', label: 'Open in Acme' }).withIndex(0);

// Dos de tus propios elementos, en un orden fijo, ambos por encima de "Delete"
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
new ResourceAction({ id: 'acme-unsync', label: 'Unsync' }).withPriority(2);

// Anclado a otro de tus propios elementos, colocado primero por prioridad
new ResourceAction({ id: 'acme-sync', label: 'Sync' }).withPriority(1);
new ResourceAction({ id: 'acme-sync-log', label: 'Sync log' }).after('acme-sync');
```

## Separadores

Los elementos de acciones de la fila, las acciones por lotes y los elementos del menú pueden incluir un separador. Un separador es una
`ResourceAction`
con
`separator: true`
, y también necesita un
`id`
:

```
new ResourceAction({ id: 'acme-divider', separator: true }).before('acme-sync');
```