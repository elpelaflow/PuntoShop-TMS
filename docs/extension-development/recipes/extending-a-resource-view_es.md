---
title: "Extender un Vistorio de Recursos"
url: https://fleetbase.io/docs/extension-development/recipes/extending-a-resource-view
module: extension-development
---

# Extender un Vistorio de Recursos

Un ejemplo completo: agregar una columna filtrable con su propia celda, una acción en la fila, una acción masiva, un botón de detalles y un elemento de menú de detalles al panel de control de Fleet-Ops, desde una extensión separada.

# Receta: Extender un Vistorio de Recursos

Esta receta crea una pequeña
**Acme Safety**
extensión. Esto asigna una puntuación a cada conductor y agrega al panel de control de Fleet-Ops:

* una columna
  **Safety Score**
  en la tabla de conductores, con su propia celda y un filtro;
* un elemento
  **Recalcular puntuación**
  en cada fila del conductor;
* una acción masiva:
  **Recalcular puntuaciones**
* un botón
  **Reporte de seguridad**
  en el panel de detalles del conductor;
* un elemento
  **Marcar para capacitación**
  en el menú "…" de ese panel.

Asume que la extensión está estructurada con
`flb scaffold`
(ver
[Guía rápida](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), cuyo motor de consola es
`@acme/safety-engine`
y cuya API tiene una
`safety_scores`
tabla claveada por conductor.

## 1. Registrar todo en extension.js

```
// addon/extension.js
import { TableColumn, ResourceAction, ActionButton, ExtensionComponent } from '@fleetbase/ember-core/contracts';

const ENGINE = '@acme/safety-engine';

export default {
    setupExtension(app, universe) {
        const views = universe.getService('resource-view');

        // La columna: renderizada por nuestra propia celda, filtrable por rango de puntuación.
        views.register(
            'fleet-ops:driver:table:columns',
            new TableColumn({ id: 'acme-safety-score', label: 'Safety Score', width: 130 })
                .after('status')
                .withCellComponent(new ExtensionComponent(ENGINE, 'cell/safety-score'))
                .withFilter('acme_safety_band', 'filter/select', {
                    filterLabel: 'Safety score',
                    filterOptions: [
                        { label: 'Good (80+)', value: 'good' },
                        { label: 'Fair (50–79)', value: 'fair' },
                        { label: 'Poor (under 50)', value: 'poor' },
                    ],
                    filterOptionLabel: 'label',
                    filterOptionValue: 'value',
                })
        );

        // Una acción en la fila, que se mantiene por encima de la propia eliminación de Fleet-Ops.
        views.register(
            'fleet-ops:driver:table:row-actions',
            new ResourceAction({ id: 'acme-recalculate', label: 'Recalcular puntuación', icon: 'calculator', permission: 'acme-safety update score' })
                .withHandler((driver, ctx) => ctx.owner.lookup('service:acme-safety').recalculate([driver]))
        );

        // Una acción masiva: la selección se pasa.
        views.register(
            'fleet-ops:driver:table:bulk-actions',
            new ResourceAction({ id: 'acme-recalculate-selected', label: 'Recalcular puntuaciones', icon: 'calculator' })
                .withHandler((drivers, ctx) => ctx.owner.lookup('service:acme-safety').recalculate(drivers))
        );

        // Un botón en el panel de detalles del conductor.
        views.register(
            'fleet-ops:driver:details:actions',
            new ActionButton({ id: 'acme-safety-report', text: 'Safety report', icon: 'file-shield' })
                .withHandler((ctx) => ctx.owner.lookup('service:acme-safety').openReport(ctx.resource))
        );

        // Un elemento en el menú "…" del panel, solo para los conductores que lo necesitan.
        views.register(
            'fleet-ops:driver:details:menu',
            new ResourceAction({ id: 'acme-flag-coaching', label: 'Flag for coaching', icon: 'flag' })
                .visibleWhen((driver, ctx) => ctx.owner.lookup('service:abilities').can('acme-safety update score'))
                .withHandler((driver, ctx) => ctx.owner.lookup('service:acme-safety').flag(driver))
        );
    },
};
```

## 2. Hacer que el servicio esté disponible para los manejadores

Los manejadores acceden a los servicios a través de
`ctx.owner`, que es el propietario del console. Registre su servicio con el host, para que pueda ser buscado desde allí:

```
// addon/extension.js
import AcmeSafetyService from './services/acme-safety';

export default {
    setupExtension(app, universe) {
        universe.getService('registry').registerService('acme-safety', AcmeSafetyService);
        // …las registraciones de paso 1
    },
};
```

```
// addon/services/acme-safety.js
import Service, { inject as service } from '@ember/service';

export default class AcmeSafetyService extends Service {
    @service fetch;
    @service notifications;
    @service modalsManager;

    async recalculate(drivers) {
        await this.fetch.post('safety_scores/recalculate', { drivers: drivers.map((d) => d.id) }, { namespace: 'acme-safety/int/v1' });
        this.notifications.success(`Recalculando ${drivers.length} puntuaciones de conductor(es).`);
    }

    async scoreFor(driver) {
        return this.fetch.get(`safety_scores/${driver.id}`, {}, { namespace: 'acme-safety/int/v1' });
    }

    openReport(driver) {
        this.modalsManager.show('modals/acme-safety-report', { title: `Reporte de seguridad: ${driver.name}`, driver });
    }

    flag(driver) {
        return this.fetch.post(`safety_scores/${driver.id}/flag`, {}, { namespace: 'acme-safety/int/v1' });
    }
}
```

## 3. El componente de celda

La columna no tiene
`valuePath`, porque la puntuación vive en nuestra API, no en el registro del conductor. La celda la carga:

```
// addon/components/cell/safety-score.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CellSafetyScoreComponent extends Component {
    @service('acme-safety') safety;
    @tracked score = null;

    constructor() {
        super(...arguments);
        this.load.perform();
    }

    @task *load() {
        const { score } = yield this.safety.scoreFor(this.args.row);
        this.score = score;
    }
}
```

```
{{#if this.load.isRunning}}
    <Spinner />
{{else if (eq this.score null)}}
    <span class="text-gray-400">—</span>
{{else}}
    <Badge @status={{if (gte this.score 80) "success" (if (gte this.score 50) "warning" "danger")}}>{{this.score}}</Badge>
{{/if}}
```

La celda recibe
`@row`
(el conductor),
`@column`
y
`@value`
.

Una celda que carga sus propios datos hace una solicitud por fila. Para tablas grandes, agrupe las solicitudes, por ejemplo, recopilando los ids de fila durante un corto tiempo y cargándolos juntos, o tenga su API que agregue la puntuación al registro del conductor en el
`meta`
para que un simple
`valuePath: 'meta.safety_score'`
sea suficiente.

## 4. El lado de la API del filtro

Elegir
**Good**
en el menú de Filtros solicita
`GET /int/v1/drivers?acme_safety_band=good`
. Enseñar a los conductores cómo filtrar con una expansión:

```php
<?php
// server/src/Expansions/DriverFilterExpansion.php

namespace Acme\Safety\Expansions;

use Fleetbase\Build\Expansion;

class DriverFilterExpansion implements Expansion
{
    public static function target()
    {
        return \Fleetbase\FleetOps\Http\Filter\DriverFilter::class;
    }

    /** Handles ?acme_safety_band=good|fair|poor */
    public static function acmeSafetyBand()
    {
        return function ($band) {
            [$min, $max] = match ($band) {
                'good'  => [80, 101],
                'fair'  => [50, 80],
                default => [0, 50],
            };

            $this->builder->whereIn('uuid', function ($query) use ($min, $max) {
                $query->select('driver_uuid')
                    ->from('acme_safety_scores')
                    ->where('score', '>=', $min)
                    ->where('score', '<', $max);
            });
        };
    }
}
```

```
// server/src/Providers/AcmeSafetyServiceProvider.php
public function boot()
{
    parent::boot();
    $this->registerExpansionsFrom(__DIR__ . '/../Expansions');
}
```

La tabla de conductores incluye
`acme_safety_band`
en los parámetros de la consulta automáticamente, porque la columna se registró en
`setupExtension`
. Ver
[Columnas filtrables](https://fleetbase.io/docs/extension-development/resource-views/tables/filterable-columns)
.

## 5. Permisos

La acción de la fila declara
`permission: 'acme-safety update score'`
, para que los usuarios sin esto no la vean. Registre el permiso en el lado de la API, como para cualquier habilidad de su extensión: ver
[Proveedor de servicios](https://fleetbase.io/docs/extension-development/resource-views/backend/service-provider)
. Los elementos del menú no verifican
`permission`, para que el elemento de capacitación verifique la habilidad en
`visibleWhen`
.

## Resultado

* **Tabla de conductores:**
  una columna de Puntuación de Seguridad después de Status; un filtro de Puntuación de Seguridad en el menú de Filtros;
  **Recalcular puntuación**
  en cada fila del menú;
  **Recalcular puntuaciones**
  en la acción masiva.
* **Panel de detalles del conductor**, dirigido o como un panel lateral: una
  **Reporte de seguridad**
  botón, y
  **Marcar para capacitación**
  en el menú "…"
* Nada en Fleet-Ops ha cambiado. Cuando se desinstala Acme Safety, las adiciones van con él.

## Para ir más allá

* Agregue a otros motores con el mismo código: cambie el nombre del registro. Busque los nombres en el
  [Catálogo de registro](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
  .
* Agregue un
  **Safety**
  pestaña al panel de detalles del conductor registrando un
  `MenuItem`
  en
  `fleet-ops:driver:details:tabs`
  . Ver
  [Registrando](https://fleetbase.io/docs/extension-development/resource-views/details/tabs)
  .
* Permita que otras extensiones agreguen a las vistas de
  *su*
  motor:
  [Hacer que las vistas sean extensibles](https://fleetbase.io/docs/extension-development/resource-views/making-views-extensible)
  .

Un ejemplo completo: un tipo de pedido para Fleet-Ops, con su propio ciclo de vida, sus propias secciones de formulario y detalles, acciones de envío ocultas y validación, construido a partir de una configuración de pedido, un ciclo de vida configurado y un perfil de presentación de pedidos.](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)