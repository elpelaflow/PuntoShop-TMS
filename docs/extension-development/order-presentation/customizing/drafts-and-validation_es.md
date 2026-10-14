---
título: "Borradores y Validación"
url: https://fleetbase.io/docs/extension-development/order-presentation/customizing/drafts-and-validation
módulo: extension-development
---

Presentación de la orden

Personalización

# Borradores y Validación

Cree una nueva orden cuando un usuario la cambia a su tipo de orden y limpie cuando cambian de vuelta, con "preparar" y "liberar", y requiera sus propios campos antes de guardar una orden, con reglas de validación de creación de órdenes.

# Borradores y Validación

## Preparando los borradores

En el nuevo formulario de orden, los usuarios eligen el tipo de orden en la
`details`
sección, y pueden cambiarlo después de completar el formulario. Cuando un borrador cambia
**a**
su tipo de orden, Fleet-Ops llama a la función
`prepare(order)`
de su perfil. Cuando cambia
**de vuelta**
a él, Fleet-Ops llama a
`release(order)`.

```
prepare(order) {
    // Un alquiler nunca se envía, y no tiene conductor ni prueba de entrega.
    order.set('dispatched', false);
    order.set('adhoc', false);
    order.set('driver_assigned', null);
    order.set('vehicle_assigned', null);
    order.set('pod_required', false);

    // Inicia los detalles del alquiler con valores predeterminados.
    order.set('meta', { ...(order.meta ?? {}), rental: order.meta?.rental ?? { days: 1 } });
},

release(order) {
    // No deje nada específico para alquileres en una orden que ya no es de alquiler.
    const { rental, ...meta } = order.meta ?? {};
    order.set('meta', meta);
},
```

| Hook | Se llama cuando | Úsalo para |
|---|---|---|
| `prepare(order)` | Un borrador cambia a su tipo de orden | Limpia los valores que oculta su formulario; establece valores predeterminados |
| `release(order)` | Un borrador cambia de su tipo de orden a otro | Elimina lo que sus secciones agregaron |

Ambos son opcionales, y ambos solo están destinados a
**borradores**. No se llaman cuando se abre o edita una orden existente.

### Preparando un borrador usted mismo

Si su extensión crea órdenes de borrador en código, por ejemplo, desde un botón "Nuevo alquiler", prepárelas de la misma manera a través del servicio:

```
universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
    const orderPresentation = engine.lookup('service:order-presentation');
    orderPresentation.prepare(order); // llama a la función prepare() de su perfil, y devuelve el perfil
});
```

## El tipo de orden está bloqueado una vez guardado

Una vez que una orden con un perfil se guarda, su tipo de orden no se puede cambiar: el selector de tipo en la
`details`
sección está deshabilitado. No se admite mover una orden de una presentación a otra.

## Validando sus campos

Un perfil cambia lo que muestra el formulario, no lo que requiere. La validación propia de Fleet-Ops todavía requiere un tipo de orden y una recogida y entrega (o al menos dos puntos de referencia).

Para requerir sus propios campos, agregue una regla al servicio
`order-creation`
de Fleet-Ops. Una regla recibe la orden y devuelve
`false`
para bloquear el guardado. Las reglas se ejecutan para
**cada**
orden, así que devuelva
`true`
para las órdenes que no son suyas:

```
// addon/extension.js
export default {
    setupExtension(app, universe) {
        universe.whenEngineLoaded('@fleetbase/fleetops-engine', (engine) => {
            const orderCreation = engine.lookup('service:order-creation');
            const orderPresentation = engine.lookup('service:order-presentation');

            orderCreation.setOrderValidationRule('acme-rental', (order) => {
                if (orderPresentation.profileFor(order)?.id !== 'acme-rental' || !order.isNew) {
                    return true;
                }

                const rental = order.meta?.rental ?? {};
                return Boolean(rental.asset_tag) && Number(rental.days) > 0;
            });
        });
    },
};
```

Si bien una regla devuelve
`false`, la orden no se puede crear. Indique a los usuarios por qué desde su sección, junto al campo:

```
<InputGroup @name="Asset tag" @required={{true}} @value={{this.rental.asset_tag}} {{on "input" (fn this.update "asset_tag")}} />
{{#unless this.rental.asset_tag}}
    <p class="text-xs text-red-500">Se requiere una etiqueta de activo para un alquiler.</p>
{{/unless}}
```

| Método | Hace |
|---|---|---|
| `orderCreation.setOrderValidationRule(key, fn)` | Agrega o reemplaza la regla con la clave `key`. `fn(order)` devuelve `false` para bloquear el guardado |
| `orderCreation.clearOrderValidationRule(key)` | La elimina |

Las reglas de validación verifican el formulario de la consola. Valide también en el servidor, para las órdenes creadas a través de la API.

[Acciones

Oculte las acciones integradas de Fleet-Ops para la tabla de órdenes y el menú de detalles de la orden, como enviar, asignar conductor, cancelar y eliminar, para su tipo de orden, con ocultar.actions.](https://fleetbase.io/docs/extension-development/order-presentation/customizing/actions)
[Objeto de perfil

Cada clave que un perfil de presentación de órdenes puede tener: id, isEnabled, form, details, hidden, prepare y release, con tipos, valores predeterminados y un ejemplo completo.](https://fleetbase.io/docs/extension-development/order-presentation/reference/profile)