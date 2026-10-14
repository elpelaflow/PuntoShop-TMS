---
título: "Mover Órdenes"
url: https://fleetbase.io/docs/extension-development/order-lifecycles/moving-orders
módulo: extension-development
---

Ciclos de Vida de las Órdenes

# Mover Órdenes

Programe una orden con un ciclo de vida configurado: desde la consola, desde su motor utilizando los endpoints `next-activity` y `update-activity`, y desde su servidor con los helpers `OrderConfig`.

# Mover Órdenes

## Desde la Consola

**Actualizar actividad**
, en el menú de la orden o en su sección de actividades, ofrece las actividades que siguen a la actual. En la vista, se puede arrastrar una tarjeta a una de las siguientes actividades de la orden.

## Desde su Motor

Solicite a Fleet-Ops las siguientes actividades de la orden, y luego muévase a una de ellas mediante código. Estos son los endpoints internos de la consola:

```
// En un componente o servicio de su motor
const next = await this.fetch.get(`orders/next-activity/${order.id}`);
// [{ code: 'reserved', status: 'Reserved', … }, { code: 'cancelled', status: 'Cancelled', … }]

await this.fetch.patch(`orders/update-activity/${order.id}`, { activity: { code: 'reserved' } });
await order.reload();
```

Con
`strict_transitions`
, la API busca el código en el flujo y aplica esa actividad, por lo que el código es suficiente. Un movimiento que el flujo no permite se rechaza:

```
{ "error": "Esta actividad no es el siguiente paso permitido para la orden." }
```

La
[página de detalles](https://fleetbase.io/docs/extension-development/order-presentation/customizing/details-view#next-step-buttons)
muestra un componente que renderiza las siguientes actividades como botones.

## Desde su Servidor

Verifique el movimiento con los helpers de la configuración de la orden antes de realizarlo:

```
$config = $order->config();

if ($config->canTransition($order->status, 'reserved')) {
    // …mueva la orden, por ejemplo, a través de su propio servicio
}

$config->isTerminalActivityCode($order->status); // ¿ha terminado?
$config->getInitialActivity();                    // ¿dónde comienzan las nuevas órdenes?
```

Consulte
[Referencia del Servidor](https://fleetbase.io/docs/extension-development/order-lifecycles/server-reference)
.

## Cancelar

Cancele a través de Fleet-Ops como de costumbre:
**Cancelar orden**
en la consola, o en el endpoint de cancelación. La orden pasa a la actividad
`canceled`
del ciclo de vida.

## Después de una Actividad Terminal

Una vez que una orden llega a una actividad terminal (una en
`terminal`
, o con los códigos
`completed`
o
`canceled`), no puede moverse de nuevo, y la consola desactiva
**Editar detalles**
,
**Actualizar actividad**
y
**Cancelar orden**
para ella.