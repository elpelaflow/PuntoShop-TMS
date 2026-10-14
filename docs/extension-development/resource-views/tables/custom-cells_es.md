---
title: "Celdas personalizadas"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/custom-cells
module: extension-development
---

Vistas de recursos

Vistas de tablas

# Celdas personalizadas

Cree su propio componente en cada celda de una columna registrada, desde su propio motor: los argumentos que recibe, la carga de datos por fila y ejemplos, desde un badge de color hasta una acción en línea.

# Celdas personalizadas

El `cellComponent` de una columna puede ser un componente de
**su propio motor**.
Úntelo en un
`ExtensionComponent`, con el nombre del paquete de su motor y la ruta del componente:

```
import { TableColumn, ExtensionComponent } from '@fleetbase/ember-core/contracts';

new TableColumn({ id: 'acme-safety-score', label: 'Puntuación de seguridad', valuePath: 'meta.safety_score' })
    .withCellComponent(new ExtensionComponent('@acme/safety-engine', 'cell/safety-score'));
```

El componente vive en
`addon/components/cell/safety-score.{js,hbs}`
en
`@acme/safety-engine`
. Su motor se carga la primera vez que se necesita, y las celdas se renderizan una vez que lo tiene.

## Argumentos

| Argumento | Valor |
|---|---|
| `@value` | El valor leído del `valuePath` de la columna. `undefined` si no hay `valuePath` |
| `@row` | El registro de la fila, como el conductor |
| `@column` | La definición de la columna, incluyendo cualquier clave adicional que haya pasado |

Las claves adicionales en la columna son una forma de configurar un componente de celda para varias columnas:

```
new TableColumn({ id: 'acme-score', label: 'Puntuación', valuePath: 'meta.score', thresholds: [50, 80] })
    .withCellComponent(new ExtensionComponent(ENGINE, 'cell/score-badge'));
```

```
// addon/components/cell/score-badge.js
import Component from '@glimmer/component';

export default class CellScoreBadgeComponent extends Component {
    get status() {
        const [warning, good] = this.args.column.thresholds ?? [50, 80];
        const value = Number(this.args.value);
        return value >= good ? 'success' : value >= warning ? 'warning' : 'danger';
    }
}
```

```
{{! addon/components/cell/score-badge.hbs }}
<Badge @status={{this.status}}>{{or @value "—"}}</Badge>
```

## Ejemplos

### Un badge del valor

```
{{! addon/components/cell/safety-score.hbs }}
{{#if (eq @value undefined)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte @value 80) "success" (if (gte @value 50) "warning" "danger")}}>{{@value}}</Badge>
{{/if}}
```

### Datos cargados por fila

Cuando el valor vive en la API de su extensión, cárgalo en la celda. Use el ID de la fila, y muestre algo mientras se carga:

```
// addon/components/cell/contract-status.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellContractStatusComponent extends Component {
    @service fetch;
    @tracked contract = null;

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        try {
            this.contract = yield this.fetch.get(`contracts/for-vehicle/${this.args.row.id}`, {}, { namespace: 'acme/int/v1' });
        } catch {
            this.contract = null;
        }
    }
}
```

```
{{! addon/components/cell/contract-status.hbs }}
{{#if this.load.isRunning}}
    <Spinner />
{{else if this.contract}}
    <Badge @status={{this.contract.status}} />
{{else}}
    <span class="text-gray-400">No hay contrato</span>
{{/if}}
```

**Una solicitud por fila suma.**
Una tabla de 50 filas hace 50 solicitudes. Recolecte los IDs de las filas en un servicio y cárguelos en una sola solicitud, o haga que su servidor escriba un valor de resumen en el valor de la
`meta`
del registro y use
`valuePath`
en su lugar.

### Una acción en línea

Una celda puede contener un botón. Detenga el clic también para abrir la fila:

```
// addon/components/cell/ping-tracker.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellPingTrackerComponent extends Component {
    @service fetch;
    @service notifications;

    @task *ping(event) {
        event?.stopPropagation();
        yield this.fetch.post(`trackers/${this.args.row.id}/ping`, {}, { namespace: 'acme/int/v1' });
        this.notifications.success(`Pinged ${this.args.row.name}.`);
    }
}
```

```
{{! addon/components/cell/ping-tracker.hbs }}
<Button @size="xs" @icon="satellite-dish" @text="Ping" @isLoading={{this.ping.isRunning}} @onClick={{perform this.ping}} />
```

## Celdas integradas

No siempre necesita su propio componente. Consulte
[Usar una celda integrada](https://fleetbase.io/docs/extension-development/resource-views/tables/columns#using-a-built-in-cell)
para las celdas que proporciona la consola.

## Su propio filtro de entrada

El `filterComponent` de una columna puede ser un
`ExtensionComponent`
también. Consulte
[Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns#your-own-filter-input)
.

[Columnas
Añada una columna a otra motor de tablas con TableColumn — todas las opciones y métodos de cadena, las celdas integradas que puede usar, la ubicación, los permisos y de dónde proviene los datos de la columna.](https://fleetbase.io/docs/extension-development/resource-views/tables/columns)
[Columnas filtrables
Cree una columna registrada filtrable de principio a fin — las claves de filtro de la columna, cómo llega el parámetro de filtro a la URL y la API, y la expansión de filtro que la aplica en el servidor.](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)