---
título: "Introducción"
url: https://fleetbase.io/docs/extension-development/resource-views
módulo: extension-development
---

Vistas de recursos

# Introducción

Las vistas de recursos son las pantallas de tabla y detalles de Fleet-Ops, Ledger, IAM y Developers. Su extensión puede añadir columnas, acciones, botones y pestañas a estas, sin modificar el motor que las gestiona.

# Vistas de recursos

Un
**vista de recurso**
es una de las pantallas que Fleetbase utiliza para listar y mostrar registros: la
**tabla**
de conductores, pedidos o facturas, y la
**vista de detalles**
que se abre cuando haces clic en una. Cada motor que viene con Fleetbase (Fleet-Ops, Ledger, IAM y Developers) crea sus pantallas de esta manera.

Cada una de estas vistas tiene un conjunto de
**registros**: lugares nombrados donde una extensión puede añadir sus propios elementos. Su extensión registra un elemento una vez, desde su
`extension.js`,
y la vista lo renderiza junto con el suyo, sin modificar el motor que gestiona la vista.

## Lo que puede añadir

### A una vista de tabla

![Una tabla de conductores de Fleet-Ops con una columna añadida, una acción de fila, una acción en lote y un botón de barra de herramientas, cada uno con su nombre de registro](https://fleetbase.io/_next/static/media/table-view-slots.fd236c45.svg)

|  | Elemento | ¿Qué es? | Página |
| --- | --- | --- | --- |
| 1 | **Columnas** | Una columna en la tabla, con su propia celda y, opcionalmente, un filtro | [Columnas](https://fleetbase.io/docs/extension-development/resource-views/tables/columns) |
| 2 | **Acciones de fila** | Un elemento en el menú "…" de cada fila | [Acciones de fila](https://fleetbase.io/docs/extension-development/resource-views/tables/row-actions) |
| 3 | **Acciones en lote** | Un elemento en el menú **Acciones en lote**, que se ejecuta en las filas seleccionadas | [Acciones en lote](https://fleetbase.io/docs/extension-development/resource-views/tables/bulk-actions) |
| 4 | **Botones de barra de herramientas** | Un botón en la cabecera de la tabla | [Botones de barra de herramientas](https://fleetbase.io/docs/extension-development/resource-views/tables/toolbar-buttons) |

### A una vista de detalles

![Un panel de detalles de un conductor de Fleet-Ops con un botón de cabecera, un elemento de menú y una pestaña añadidos, cada uno con su nombre de registro](https://fleetbase.io/_next/static/media/details-view-slots.97527a20.svg)

|  | Elemento | ¿Qué es? | Página |
| --- | --- | --- | --- |
| 1 | **Botones de cabecera** | Un botón en la cabecera de los detalles | [Botones de cabecera](https://fleetbase.io/docs/extension-development/resource-views/details/header-buttons) |
| 2 | **Elementos de menú** | Un elemento en el menú "…" de la cabecera | [Elementos de menú](https://fleetbase.io/docs/extension-development/resource-views/details/menu-items) |
| 3 | **Pestañas** | Una pestaña que renderiza su propio componente | [Pestañas](https://fleetbase.io/docs/extension-development/resource-views/details/tabs) |

## ¿Cómo funciona?

Tres elementos se combinan:

1.  **Un nombre de registro**
    indica
    *dónde*
    se debe colocar el elemento. Se lee como una ruta: el motor, el recurso, el tipo de vista y la ranura.

    ```
    fleet-ops : driver : table : columns
    ───┬─────   ──┬───   ──┬──   ───┬───
    extension  resource  surface   slot
    ```

    Consulte
    [Nombres de registro](https://fleetbase.io/docs/extension-development/resource-views/registry-names)
    .
2.  **Un contrato**
    indica
    *qué*
    es el elemento. Cada tipo de elemento tiene su propia clase de
    `@fleetbase/ember-core/contracts`
    :

    | Contrato | Para |
    | --- | --- |
    | `TableColumn` | Columnas |
    | `ResourceAction` | Acciones de fila, acciones en lote y elementos del menú de detalles |
    | `ActionButton` | Botones de la barra de herramientas y botones de la cabecera |
    | `MenuItem` | Pestañas |
3.  **El servicio
    `resource-view`
    almacena su elemento bajo ese nombre. La vista lee el nombre del registro cuando se renderiza y lo combina con el suyo.

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
        );
    },
};
```

Esto es una inscripción completa: la tabla de conductores ahora tiene una columna
**Safety Score**.
[Getting Started](https://fleetbase.io/docs/extension-development/resource-views/getting-started)
lo construye paso a paso, con una celda y un lugar.

## ¿Dónde continuar?

Getting Started

Añade tu primera columna, luego un componente de celda y una acción, paso a paso.

[Getting Started →](https://fleetbase.io/docs/extension-development/resource-views/getting-started)

Registry Names

Cómo se construyen los nombres y cómo encontrar el que necesitas.

[Registry Names →](https://fleetbase.io/docs/extension-development/resource-views/registry-names)

Registry Catalogue

Cada registro que declaran los motores incorporados, con sus ids incorporados.

[Registry Catalogue →](https://fleetbase.io/docs/extension-development/resource-views/catalogue)

Haciendo que tus vistas sean extensibles

Permite que otras extensiones añadan a tus propias vistas de tabla y detalles.

[Making Your Views Extensible →](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)

## Requisitos

Las vistas de recursos necesitan
**`@fleetbase/ember-core`
0.3.25**
y
**`@fleetbase/ember-ui`
0.4.5**
o versiones posteriores en la consola, y estas versiones o superiores de los motores:

| Motor | Paquete | Versión |
| --- | --- | --- |
| Fleet-Ops | `@fleetbase/fleetops-engine` | 0.6.71 |
| Ledger | `@fleetbase/ledger-engine` | 0.0.12 |
| IAM | `@fleetbase/iam-engine` | 0.1.13 |
| Developers | `@fleetbase/dev-engine` | 0.2.17 |

En una consola más antigua, registrar no hace nada y las vistas siguen funcionando como siempre, por lo que tu extensión sigue funcionando.

[Extension Manager

Carga motores bajo demanda, reacciona a eventos de carga de motores, comparte servicios y componentes de host en motores, e inspecciona el estado de las extensiones instaladas.](https://fleetbase.io/docs/extension-development/universe/extension-manager)
[Getting Started

Añade una columna a la tabla de conductores de Fleet-Ops, dale tu propia celda, colócala donde quieras, y añade una acción a cada fila — paso a paso.](https://fleetbase.io/docs/extension-development/resource-views/getting-started)