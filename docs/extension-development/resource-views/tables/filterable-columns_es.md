---
title: "Columnas filtrables"
url: https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns
module: extension-development
---

Vistas de recursos

Vistas de tablas

# Columnas filtrables

Hacer que una columna registrada sea filtrable de principio a fin: las claves de filtro de la columna, cómo el parámetro de filtro llega a la URL y a la API, y la expansión de filtro que la aplica en el servidor.

# Columnas filtrables

Una columna registrada puede ser filtrable, exactamente como una columna incorporada. El menú
**Filtros**
de la tabla se crea a partir de sus columnas, por lo que una columna filtrable trae consigo su propio campo de entrada de filtro.

Para que un filtro realmente filtre, se necesitan tres elementos:

1. **La columna**
   declara un filtro:
   `filterable`
   , un
   `filterParam`
   y un
   `filterComponent`
   .
2. **El controlador de índice de la tabla**
   incluye ese parámetro en sus parámetros de consulta. Los motores incorporados ya lo hacen; consulte
   [a continuación](#2-el-parámetro-de-consulta)
   .
3. **La API**
   conoce el significado del parámetro: una expansión de filtro en el código del servidor de su extensión.

## 1. La columna

```
// addon/extension.js
import { TableColumn } from '@fleetbase/ember-core/contracts';

export default {
    setupExtension(app, universe) {
        universe.getService('resource-view').register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', valuePath: 'meta.safety_score' })
                .after('status')
                .withFilter('acme_safety_score', 'filter/select', {
                    filterLabel: 'Safety score',
                    filterOptions: [
                        { label: 'Good (80+)', value: 'good' },
                        { label: 'Needs attention', value: 'poor' },
                    ],
                    filterOptionLabel: 'label',
                    filterOptionValue: 'value',
                })
        );
    },
};
```

`withFilter(filterParam, filterComponent = 'filter/string', options = {})`
establece
`filterable: true`
, el parámetro y el componente, así como cualquier otra clave de filtro que pase. Escribirlos como claves simples funciona igual:

```
new TableColumn({
    id: 'acme-safety-score',
    label: 'Safety Score',
    valuePath: 'meta.safety_score',
    filterable: true,
    filterParam: 'acme_safety_score',
    filterComponent: 'filter/string',
});
```

| Clave | Descripción |
| --- | --- |
| `filterable` | `true` para mostrar la columna en el menú **Filtros** |
| `filterParam` | El parámetro de consulta que escribe el filtro. Va en la URL y se envía a la API |
| `filterComponent` | La entrada. Un componente incorporado `filter/*`, o un `ExtensionComponent` de su motor |
| `filterLabel` | Etiqueta en el menú **Filtros**: por defecto, `label` |
| `filterComponentPlaceholder` | Texto de marcador de posición |
| `filterOptions`, `filterOptionLabel`, `filterOptionValue` | Opciones para `filter/select`, `filter/multi-option` y `filter/radio` |
| `filterFetchOptions`, `model`, `modelNamePath` | Para `filter/model` y `filter/model-multiple`, que buscan registros |

Componentes de filtro incorporados:
`filter/string`
,
`filter/select`
,
`filter/multi-option`
,
`filter/multi-input`
,
`filter/radio`
,
`filter/checkbox`
,
`filter/date`
,
`filter/range`
,
`filter/country`
,
`filter/model`
y
`filter/model-multiple`
.

**Prefije su parámetro con el nombre de su extensión**
(
`acme_safety_score`
, no
`score`
). Todos los filtros en una tabla comparten un conjunto de parámetros de consulta, y un nombre sin prefijo puede entrar en conflicto con un filtro incorporado o con un filtro de otra extensión.

## 2. El parámetro de consulta

Un filtro solo tiene efecto si el controlador de la tabla declara el parámetro como un parámetro de consulta. Los motores que exponen los registros de vistas de recursos construyen sus controladores de índice con
`queryParamsFor()`
, que añade el
`filterParam`
de cada columna filtrable registrada para esa tabla:

```
// Dentro de un motor, para referencia: los controladores de los conductores
queryParams = this.driverActions.queryParamsFor(['page', 'limit', 'sort', 'query', 'status' /* … */]);
```

Su extensión no hace nada en este paso, con una condición.
**Registre la columna en
`setupExtension`
.**
Los parámetros de consulta de un controlador se leen una vez, cuando se crea el controlador, que es cuando se visita su ruta por primera vez. Una columna filtrable registrada más tarde, por ejemplo, en
`onEngineLoaded`
o en respuesta a una acción del usuario, todavía se muestra, pero su parámetro no es un parámetro de consulta, y se muestra el siguiente mensaje en la consola:

```
[resource-view] El filtro "acme_safety_score" en "acme-safety-score" se ha registrado después de que se haya configurado la tabla, por lo que no es un parámetro de consulta. Registre las columnas filtrables en setupExtension.
```

Cada tabla listada en el
[Catálogo de registros](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
lo hace, excepto las transacciones de combustible de Fleet-Ops.

## 3. La API: una expansión de filtro

Con el parámetro en la URL, la consola lo envía a la API con la solicitud de la tabla, por ejemplo
`GET /int/v1/drivers?acme_safety_score=good`
. Cada clase de filtro de API de un recurso convierte los parámetros conocidos en restricciones de consulta, llamando al método con el nombre del parámetro. Su extensión añade un método para su parámetro con una
[expansión](https://fleetbase.io/docs/extension-development/backend/expansions-and-observers#expansions)
que apunta a esa clase de filtro:

```
<?php

namespace Acme\Safety\Expansions;

use Fleetbase\Build\Expansion;

class DriverFilterExpansion implements Expansion
{
    /**
     * La clase de filtro para la tabla de conductores de Fleet-Ops.
     */
    public static function target()
    {
        return \Fleetbase\FleetOps\Http\Filter\DriverFilter::class;
    }

    /**
     * Maneja `?acme_safety_score=…`. El filtro busca un parámetro por su nombre y por su
     * nombre camelCase, por lo que `acme_safety_score` encuentra `acmeSafetyScore`.
     */
    public static function acmeSafetyScore()
    {
        return function ($value) {
            /** @var \Fleetbase\Http\Filter\Filter $this */
            $value === 'good'
                ? $this->builder->where('meta->safety_score', '>=', 80)
                : $this->builder->where('meta->safety_score', '<', 80);
        };
    }
}
```

Cargue la extensión desde su proveedor de servicios, como con cualquier extensión:

```
// server/src/Providers/AcmeSafetyServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
}
```

Dentro del cierre,
`$this`
es el filtro:
`$this->builder`
es la consulta Eloquent y
`$this->request`
es la solicitud. El filtro llama a su método solo cuando el parámetro tiene un valor no vacío.

### Encontrar la clase de filtro

La clase de filtro de cada recurso sigue su nombre de modelo:

| Motor | Namespace | Ejemplo |
|---|---|---|
| Fleet-Ops | `Fleetbase\FleetOps\Http\Filter` | `DriverFilter`, `VehicleFilter`, `OrderFilter`, `WorkOrderFilter` |
| Ledger | `Fleetbase\Ledger\Http\Filter` | `InvoiceFilter`, `WalletFilter`, `TransactionFilter` |
| Core (IAM, Developers) | `Fleetbase\Http\Filter` | `UserFilter`, `GroupFilter`, `RoleFilter`, `PolicyFilter`, `ApiCredentialFilter`, `WebhookEndpointFilter` |

**Evite los sufijos de rango.**
Un parámetro que termina en
`_after`
,
`_before`
,
`_from`
,
`_to`
,
`_min`
,
`_max`
,
`_start`
,
`_end`
,
`_gte`
,
`_lte`
,
`_greater`
o
`_less`
se trata como un extremo de un rango y se dirige a
`<column>Between`
. Las expansiones no pueden proporcionar ese método. Dale a tus parámetros un nombre sin estos sufijos.

## Ordenamiento

Las columnas registradas no son **ordenables** a menos que establezca
`sortable: true`
. El orden envía
`sort=<param>`
o
`sort=-<param>`
para el orden descendente, y la API ordena por esa columna de la base de datos. Solo habilítelo cuando
`sortParam`
(o
`valuePath`
) es una columna real en la tabla de recursos:

```
new TableColumn({ id: 'acme-region', label: 'Region', valuePath: 'region', sortable: true, sortParam: 'region' });
```

Los valores en
`meta`
o cualquier cosa que su extensión calcule, no se pueden ordenar de esta manera.

## Su propio campo de entrada

El
`filterComponent`
puede ser un
`ExtensionComponent`
. Recibe los mismos argumentos que los filtros incorporados (
`@value`
,
`@filter`
,
`@param`
,
`@options`
,
`@placeholder`
,
`@onChange`
,
`@onClear`
), y informa sobre los cambios con
`@onChange(@filter, value)`
:

```
new TableColumn({ id: 'acme-score', label: 'Score', filterable: true, filterParam: 'acme_score' })
    .withFilter('acme_score', new ExtensionComponent('@acme/safety-engine', 'filter/score-range'));
```

```
// addon/components/filter/score-range.js, en @acme/safety-engine
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterScoreRangeComponent extends Component {
    // @value es el valor actual y @filter el filtro de la columna. Pasa @filter
    // con cada cambio, exactamente como los componentes de filtro incorporados.
    @action update(event) {
        this.args.onChange(this.args.filter, event.target.value);
    }

    @action clear() {
        this.args.onClear(this.args.filter);
    }
}
```

### Lista de verificación

* La columna tiene
  `filterable`
  , un parámetro
  `filterParam`
  y un
  `filterComponent`
* Está registrada en
  `setupExtension`
* Su código del servidor tiene una expansión que apunta a la clase de filtro del recurso, con un método llamado al nombre del parámetro
* El proveedor de servicios llama a
  `registerExpansionsFrom()`
* El parámetro no termina en un sufijo de rango