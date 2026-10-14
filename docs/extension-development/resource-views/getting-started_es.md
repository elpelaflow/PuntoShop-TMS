---
title: "Cómo empezar"
url: https://fleetbase.io/docs/extension-development/resource-views/getting-started
module: extension-development
---

Vistas de Recursos

# Cómo empezar

Agrega una columna a la tabla "Conductores de Fleet-Ops", dale tu propio nombre, colócala donde quieras y agrega una acción a cada fila — paso a paso.

# Cómo empezar

Esta guía te muestra cómo agregar una
**Puntuación de Seguridad**
a la tabla "Conductores de Fleet-Ops": primero como una columna simple, luego con un componente de celda, luego en la posición correcta y finalmente con una
**acción para recalcular la puntuación**
en el menú de cada conductor.

Asume que tienes una extensión estructurada con
`flb scaffold`
(consulta
[Guía rápida](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), con el motor de consola
`@acme/safety-engine`
. Todo lo que sigue debe ir en ese motor.

### Encuentra el registro

Cada lugar donde puedas agregar algo tiene un
**nombre de registro**.
Para una columna en la tabla de conductores, es:

```
fleet-ops:driver:table:columns
```

Esto significa: el
**motor Fleet-Ops**, el
**recurso conductor**, su
**vista de tabla**, las
**columnas**. La
[Catálogo de Registros](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)
lista el nombre de cada elemento en cada vista, y los IDs de las columnas que ya existen.

### Registra una columna

Registra desde el hook
`setupExtension`
de tu extensión, en
`addon/extension.js`
. Obtén el servicio
`resource-view`
de
`universe`
, y registra una
`TableColumn`
bajo el nombre de registro:

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({
                id: 'acme-safety-score',
                label: 'Puntuación de Seguridad',
                valuePath: 'meta.safety_score',
            })
        );
    },
};
```

* **`id`**
  es obligatorio y debe ser único en la ubicación. Prefíjala con el nombre de tu extensión.
* **`label`**
  es el encabezado de la columna.
* **`valuePath`**
  es donde se lee el valor de cada fila. Aquí, lee
  `driver.meta.safety_score`
  .

Recarga la consola y abre
**Fleet-Ops → Conductores**
. La columna
**Puntuación de Seguridad**
está al final de la tabla, justo antes de la columna "…", mostrando la
`meta.safety_score`
de cada conductor como texto. También aparece en el selector de columnas, para que los usuarios puedan ocultarla.

**Regístralo en
`setupExtension`
.**
Se ejecuta una vez, cuando se inicia la consola, antes de que se creen las vistas de cualquier motor. Registrarlo más tarde funciona para la mayoría de los elementos, pero una columna filtrable debe registrarse aquí. Consulta
[Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

### Renderiza tu propia celda

A menudo, un valor simple no es suficiente. Para mostrar la puntuación como un badge de color, dale a la columna un
**componente de celda**
de tu propio motor, con un
`ExtensionComponent`
:

```
import { TableColumn, ExtensionComponent } from '@fleetbase/ember-core/contracts';

views.register(
    'fleet-ops:driver:table:columns',
    new TableColumn({ id: 'acme-safety-score', label: 'Puntuación de Seguridad', valuePath: 'meta.safety_score' })
        .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
);
```

`withCellComponent()`
es uno de los métodos de la
**cadena**
del contrato: cada uno establece una opción y devuelve la columna, por lo que puedes llamarlos uno tras otro. Lo mismo se podría escribir como una
`cellComponent`
en el constructor.
[Columnas](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
lista todas las opciones y métodos.

Luego, crea el componente en tu motor:

```
{{! addon/components/cell/safety-score.hbs }}
{{#if (eq @value undefined)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte @value 80) "success" (if (gte @value 50) "warning" "danger")}}>{{@value}}</Badge>
{{/if}}
```

La celda recibe el valor de la fila como
`@value`
, el registro completo como
`@row`
y la columna como
`@column`
. Consulta
[Celdas personalizadas](https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells)
.

### Coloca la columna

Por defecto, una columna registrada va al final. Para colocarla después de la
**columna Estado**
en su lugar, colócala con
`after()`
y el ID de esa columna:

```
new TableColumn({ id: 'acme-safety-score', label: 'Puntuación de Seguridad', valuePath: 'meta.safety_score' })
    .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
    .after('status');
```

Los IDs de los elementos incorporados se encuentran en el
[catálogo](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops#driver)
.
`before()`
,
`index`
y
`priority`
son otras formas de colocar un elemento; consulta
[Colocación](https://fleetbase.io/docs/extension-development/resource-views/placement)
.

### Agrega una acción a la fila

Ahora, agrega una acción
**Recalcular la puntuación**
a cada menú "…". Los elementos del menú de la fila son
`ResourceAction`
s, registrados en el
`row-actions`
slot:

```
import { TableColumn, ResourceAction, ExtensionComponent } from '@fleetbase/ember-core/contracts';

views.register(
    'fleet-ops:driver:table:row-actions',
    new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular la puntuación', icon: 'calculator' })
        .withPermission('acme-safety update score')
        .visibleWhen((driver) => driver.status === 'active')
        .withHandler((driver, ctx) => recalculate(driver, ctx));
```

El manejador recibe el
**registro de la fila**
y un objeto
`ctx`
.
`ctx.owner.lookup()`
accede a cualquier servicio del motor. Consulta
[Manejadores y contexto](https://fleetbase.io/docs/extension-development/resource-views/handlers-and-context)
.

Si no se especifica un lugar, el elemento se coloca justo encima del elemento incorporado
**Eliminar**
.

### Limita quién puede verlo

Dale a la acción una autorización, para que los usuarios que no la tengan vean el elemento deshabilitado, y ocúltalo para los conductores para los que no se aplica:

```
new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular la puntuación', icon: 'calculator' })
    .withPermission('acme-safety update score')
    .visibleWhen((driver) => driver.status === 'active')
    .withHandler((driver, ctx) => recalculate(driver, ctx));
```

Consulta
[Visibilidad y permisos](https://fleetbase.io/docs/extension-development/resource-views/visibility-and-permissions)
para ver cómo se aplican estos para cada tipo de elemento.

## La Registración Final

```
// addon/extension.js
import { TableColumn, ResourceAction, ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ENGINE = '@acme/safety-engine';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Puntuación de Seguridad', valuePath: 'meta.safety_score' })
                .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
                .after('status')
        );

        views.register(
            'fleet-ops:driver:table:row-actions',
            new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular la puntuación', icon: 'calculator' })
                .withPermission('acme-safety update score')
                .visibleWhen((driver) => driver.status === 'active')
                .withHandler((driver, ctx) => {
                    const fetch = ctx.owner.lookup('service:fetch');
                    return fetch.post(`safety-scores/${driver.id}/recalculate`, {}, { namespace: 'acme-safety/int/v1' });
                })
        );
    },
};
```

## Próximos pasos

* Haz que la columna sea filtrable:
  [Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
  .
* Agrega a la vista de detalles del conductor:
  [Botones de encabezado](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons)
  ,
  [Elementos de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items)
  y
  [Pestañas](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  .
* Ve todo junto en una sola extensión:
  [Receta: Extender una vista de recursos](https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view)
  .