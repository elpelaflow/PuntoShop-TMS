---
title: "Cómo empezar"
url: https://fleetbase.io/docs/extension-development/order-presentation/getting-started
module: extension-development
---

Presentación de pedidos

# Cómo empezar

Crea un perfil de presentación de pedido paso a paso: una configuración que lo nombra, un perfil que mantiene el diseño estándar, luego campos ocultos, tu propio formulario y secciones de detalles, y acciones ocultas.

# Cómo empezar

Esta guía te mostrará cómo crear un tipo de pedido específico para "Préstamo de vehículo". Comienza con un perfil que no cambia nada, luego cambia una cosa a la vez, para que puedas ver el efecto de cada cambio.

Asume que tienes un esquema de extensión creado con
`flb scaffold`
(consulta
[Guía rápida](https://fleetbase.io/docs/extension-development/getting-started/quickstart)
), con el motor de consola
`@acme/loans-engine`
y el espacio de nombres de PHP
`Acme\Loans`
.

### Crea la configuración del pedido

Un perfil se aplica a un solo
**configuración de pedido**
. Crea una configuración para préstamos, y nombra el perfil en su
`meta.presentation_profile`
:

```
<?php
// server/src/Support/LoanOrderConfig.php

namespace Acme\Loans\Support;

use Fleetbase\FleetOps\Models\OrderConfig;

class LoanOrderConfig
{
    public static function installFor(string $companyUuid): OrderConfig
    {
        // Comienza desde el flujo de transporte de la organización: creado, enviado, iniciado, completado.
        $transport = OrderConfig::where('company_uuid', $companyUuid)->where('namespace', 'system:order-config:transport')->first();

        return OrderConfig::firstOrCreate(
            ['company_uuid' => $companyUuid, 'namespace' => 'acme:order-config:loan'],
            [
                'name'    => 'Préstamo de vehículo',
                'key'     => 'acme-loan',
                'status'  => 'activo',
                'version' => '1.0.0',
                'flow'    => $transport?->flow ?? [],
                'meta'    => ['presentation_profile' => 'acme-loan'],
            ]
        );
    }
}
```

La configuración reutiliza las actividades de transporte por ahora;
[Ciclos de vida de los pedidos](https://fleetbase.io/docs/extension-development/order-lifecycles)
muestra cómo darle su propio ciclo de vida. Llama a
`installFor()`
para la organización actual, por ejemplo, desde un punto final de configuración que tu motor de consola llama una vez. La
[receta](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type#2-install-the-order-config)
muestra una forma.

### Registra un perfil que mantiene el diseño estándar

En tu motor,
`extension.js`
, registra un perfil con el mismo
`id`
. Para empezar, enumera las secciones estándar, para que nada cambie aún:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-loan', {
            id: 'acme-loan',

            form: {
                sections: ['details', 'route', 'payload', 'service-rate', 'notes', 'documents', 'orchestrator-constraints', 'metadata'],
            },

            details: {
                sections: ['activity', 'detail', 'custom-fields', 'purchase-rate', 'tracking', 'proof', 'notes', 'integrated-vendor-details', 'route', 'payload', 'documents', 'comments', 'metadata'],
            },
        });
    },
};
```

Los argumentos son el registro (
`fleet-ops:order-presentation`
), la lista (
`profiles`
), una clave (usa el
`id`
del perfil), y el perfil.

Abre
**Fleet-Ops → Operaciones → Pedidos → Nuevo**
y elige
**Préstamo de vehículo**
como tipo de pedido. El formulario tiene la misma apariencia que para cualquier otro tipo: el perfil se aplica y enumera las secciones estándar.

**Ambas listas de secciones son obligatorias.**
Cuando se aplica un perfil, sus secciones son todo el diseño. Deja
`form.sections`
vacío y el formulario está vacío.

### Elimina lo que no usa un préstamo

Un préstamo no se envía y no tiene conductor, carga o tarifa de servicio. Elimina esas secciones y oculta los campos de envío:

```
form: {
    sections: ['details', 'route', 'notes', 'documents'],
},

hidden: {
    fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
},
```

Elige
**Préstamo de vehículo**
de nuevo: el formulario ahora tiene cuatro secciones, y la sección de detalles ya no pide un conductor ni ofrece envío. Consulta
[Campos del formulario](https://fleetbase.io/docs/extension-development/order-presentation/customizing/form-fields#hiding-fields)
para ver todos los campos que puedes ocultar.

### Agrega una sección propia

Agrega una sección de
**Período del préstamo**
desde tu propio motor. Las entradas de sección pueden ser un nombre nativo o un
`ExtensionComponent`
:

```
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/loans-engine', path);

form: {
    sections: ['details', section('loan/form/period'), 'route', 'notes', 'documents'],
},
```

```
{{! addon/components/loan/form/period.hbs }}
<ContentPanel @title="Período del préstamo" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputGroup @name="Starts" @type="date" @value={{this.loan.starts_on}} {{on "input" (fn this.update "starts_on")}} />
        <InputGroup @name="Days" @type="number" @value={{this.loan.days}} {{on "input" (fn this.update "days")}} />
    </div>
</ContentPanel>
```

Tu sección recibe el pedido como
`@order`
(y
`@resource`
). Lo que establece en el pedido se guarda con él. Consulta
[El formulario del pedido](https://fleetbase.io/docs/extension-development/order-presentation/customizing/order-form)
.

### Dirige la vista de detalles con un resumen

Haz lo mismo para la vista de detalles: un resumen primero, luego las secciones nativas que usa un préstamo:

```
details: {
    sections: [section('loan/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
},
```

```
{{! addon/components/loan/details/summary.hbs }}
<ContentPanel @title="Préstamo" @open={{true}} @wrapperClass="bordered-top">
    <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="text-gray-500">Starts</div><div>{{or @resource.meta.loan.starts_on "—"}}</div>
        <div class="text-gray-500">Days</div><div>{{or @resource.meta.loan.days "—"}}</div>
    </div>
</ContentPanel>
```

Consulta
[La vista de detalles](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view)
.

### Oculta las acciones que no tiene un préstamo

Elimina las acciones de envío y asignación de conductor de la tabla de pedidos y del menú "..." en la vista de detalles:

```
hidden: {
    fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
    actions: ['dispatch', 'assign-driver', 'unassign-driver'],
},
```

Consulta
[Acciones](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions)
para ver todos los IDs de acción.

### Limpia los borradores

Un usuario puede iniciar un nuevo pedido como un transporte, establecer un conductor, y luego cambiarlo a préstamo de vehículo. El campo del conductor ahora está oculto, pero el valor aún está en el pedido. Límpialo en
`prepare`
, que se ejecuta cuando un borrador cambia a tu tipo de pedido:

```
prepare(order) {
    order.set('dispatched', false);
    order.set('adhoc', false);
    order.set('driver_assigned', null);
    order.set('vehicle_assigned', null);
},
```

Consulta
[Borradores y validación](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#validating-your-fields)
.

## El perfil terminado

```
// addon/extension.js
import { ExtensionComponent } from '@fleetbase/ember-core/contracts';

const section = (path) => new ExtensionComponent('@acme/loans-engine', path);

export default {
    setupExtension(app, universe) {
        universe.getService('registry').register('fleet-ops:order-presentation', 'profiles', 'acme-loan', {
            id: 'acme-loan',

            form: {
                sections: ['details', section('loan/form/period'), 'route', 'notes', 'documents'],
            },

            details: {
                sections: [section('loan/details/summary'), 'activity', 'route', 'notes', 'documents', 'comments'],
            },

            hidden: {
                fields: ['driver', 'vehicle', 'facilitator', 'service-type', 'dispatch', 'adhoc', 'pod'],
                actions: ['dispatch', 'assign-driver', 'unassign-driver'],
            },

            prepare(order) {
                order.set('dispatched', false);
                order.set('adhoc', false);
                order.set('driver_assigned', null);
                order.set('vehicle_assigned', null);
            },
        });
    },
};
```

## Próximos pasos

* **Detén que los préstamos se envíen en absoluto**
  , y proporciona sus propios estados:
  [Ciclos de vida de los pedidos](https://fleetbase.io/docs/extension-development/order-lifecycles)
  .
* **Requiere tus propias secciones**
  antes de que se guarde un pedido:
  [Drafts and Validation](https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation#validating-your-fields)
  .
* **Aplica el perfil solo a la configuración de tu organización**
  , usando UUID:
  [Objeto de perfil](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile#isenabled)
  .
* **Consulta una extensión completa**
  :
  [Receta: Construir un tipo de pedido](https://fleetbase.io/docs/extension-development/recipes/building-an-order-type)
  .