---
title: "Crear una integración personalizada"
url: https://fleetbase.io/docs/platform/recipes/build-a-custom-integration
module: platform
---

# Crear una integración personalizada

Utilice la API REST de Fleetbase y los webhooks para integrar un sistema externo: enviar pedidos, recibir eventos de estado, gestionar los reintentos de forma segura.

# Crear una integración personalizada

Esta receta muestra un patrón de integración completo y listo para producción: un sistema externo (ERP, WMS o plataforma de comercio electrónico) que crea pedidos en Fleetbase a través de la API REST, y luego recibe actualizaciones de estado en tiempo real a través de webhooks.

## Arquitectura de la integración

```
Sistema externo
      │
      │  POST /v1/orders (crear pedido)
      ▼
API REST de Fleetbase ──── FleetOps (despacho, enrutamiento)
      │
      │  POST webhook (cambios de estado del pedido)
      ▼
Sistema externo
```

Los dos canales funcionan de forma independiente: enviar datos a través de la API, recibir eventos a través de webhooks, pero juntos crean una integración bidireccional completamente sincronizada.

## Requisitos previos

* Una cuenta de Fleetbase con Fleet-Ops instalado
* Una
  **clave API pública**
  (en vivo o de prueba) de
  **Desarrolladores → Claves API**
* Un punto final HTTPS accesible públicamente para recibir webhooks

## Paso 1 — Autenticación de las solicitudes de la API

Todas las solicitudes de la API requieren un token Bearer utilizando su clave API pública:

```
Authorization: Bearer flb_live_your_public_key_here
Content-Type: application/json
```

Utilice
**claves de prueba**
(
`flb_test_...`
) durante el desarrollo y utilice las claves en vivo (
`flb_live_...`
) para la producción. Los datos en el modo de prueba están completamente aislados de los datos en vivo.

Genere las claves en
**Desarrolladores → Claves API**
. Consulte
[Claves API](https://fleetbase.io/docs/platform/developer-console/api-keys)
para obtener más información.

## Paso 2 — Crear pedidos desde su sistema externo

Cuando su ERP o WMS genere una tarea de entrega, envíela a Fleetbase como un pedido:

```
const FLEETBASE_API = 'https://api.fleetbase.io';
const API_KEY = 'flb_live_your_public_key_here';

async function createFleetbaseOrder(externalOrder) {
    const response = await fetch(`${FLEETBASE_API}/v1/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // Referencia interna — utilice su ID externo para la deduplicación
            internal_id: externalOrder.id,

            // Ubicación de recogida
            payload: {
                pickup: {
                    name: externalOrder.warehouse.name,
                    street1: externalOrder.warehouse.address,
                    city: externalOrder.warehouse.city,
                    country: externalOrder.warehouse.country,
                },
                dropoff: {
                    name: externalOrder.customer.name,
                    street1: externalOrder.customer.address,
                    city: externalOrder.customer.city,
                    country: externalOrder.customer.country,
                    phone: externalOrder.customer.phone,
                },
            },

            // Campos personalizados para sus datos empresariales
            meta: {
                external_order_id: externalOrder.id,
                priority: externalOrder.priority,
                notes: externalOrder.deliveryNotes,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`No se pudo crear el pedido: ${JSON.stringify(error)}`);
    }

    const { data: order } = await response.json();
    console.log(`Se creó el pedido de Fleetbase: ${order.public_id} para el ID externo: ${externalOrder.id}`);

    return order;
}
```

## Paso 3 — Almacenar la correspondencia

Almacene la relación entre su ID de pedido externo y el ID de pedido de Fleetbase para poder correlacionar los eventos de webhook más tarde:

```
// Ejemplo utilizando un mapa simple en memoria (utilice una base de datos en producción)
const orderMapping = new Map();

async function syncOrder(externalOrder) {
    const fleetbaseOrder = await createFleetbaseOrder(externalOrder);

    // Almacene en ambas direcciones
    orderMapping.set(externalOrder.id, fleetbaseOrder.id);
    orderMapping.set(fleetbaseOrder.public_id, externalOrder.id);

    return fleetbaseOrder;
}
```

## Paso 4 — Configurar el receptor de webhooks

Registre un punto final HTTPS para recibir eventos de estado de Fleetbase:

```
const express = require('express');
const app = express();

app.use(express.json());

// Mapa de ID de eventos procesados para la deduplicación
const processedEvents = new Set();

app.post('/webhooks/fleetbase', async (req, res) => {
    const event = req.body;

    // Acknowledge inmediatamente — no espere a que Fleetbase procese
    res.sendStatus(200);

    // Deduplicar los reintentos
    if (processedEvents.has(event.id)) {
        console.log(`Omitiendo evento duplicado: ${event.id}`);
        return;
    }
    processedEvents.add(event.id);

    await handleStatusUpdate(event);
});

async function handleStatusUpdate(event) {
    const { event: eventType, data: order } = event;

    // Busque su pedido externo a partir del public_id de Fleetbase
    const externalOrderId = orderMapping.get(order.public_id);
    if (!externalOrderId) {
        console.log(`No se encontró el pedido ${order.public_id}`);
        return;
    }

    console.log(`Pedido ${order.public_id} (externo: ${externalOrderId}) → ${eventType}`);

    switch (eventType) {
        case 'order.dispatched':
            await updateExternalSystem(externalOrderId, {
                status: 'en tránsito',
                driver: order.driver_assigned?.name,
            });
            break;

        case 'order.completed':
            await updateExternalSystem(externalOrderId, {
                status: 'entregado',
                completed_at: order.completed_at,
            });
            break;

        case 'order.cancelled':
            await updateExternalSystem(externalOrderId, {
                status: 'cancelado',
                reason: order.cancel_reason,
            });
            break;
    }
}

async function updateExternalSystem(externalOrderId, update) {
    // Su lógica de actualización para su ERP/WMS aquí
    console.log(`Actualizando el pedido externo ${externalOrderId}:`, update);
}

app.listen(3000);
```

## Paso 5 — Registrar el webhook en la consola de desarrollador

Vaya a
**Desarrolladores → Webhooks**
y haga clic en
**Nuevo**
.

Establezca la
**URL del punto final**
a su URL HTTPS pública.

Suscribirse a los eventos relevantes para su integración:

| Evento | Significado |
| --- | --- |
| `order.created` | Pedido aceptado en Fleetbase |
| `order.dispatched` | Conductor asignado y en ruta |
| `order.completed` | Entrega confirmada |
| `order.cancelled` | Pedido cancelado |

Haga clic en
**Guardar**
. Fleetbase comenzará a enviar eventos a su punto final inmediatamente.

## Paso 6 — Manejar la idempotencia para los reintentos

Si su receptor devuelve un estado que no es 2xx o se cuelga, Fleetbase intentará la entrega nuevamente. Su controlador debe ser seguro para llamar varias veces con el mismo evento.

El enfoque de deduplicación anterior (verificar
`event.id`) maneja esto para el estado en memoria. Para un sistema de producción, almacene los ID de eventos procesados en una base de datos:

```
// Ejemplo utilizando una base de datos PostgreSQL con node-postgres
const { Pool } = require('pg');
const pool = new Pool();

async function isEventProcessed(eventId) {
    const result = await pool.query(
        'SELECT 1 FROM processed_webhook_events WHERE event_id = $1',
        [eventId]
    );
    return result.rowCount > 0;
}

async function markEventProcessed(eventId) {
    await pool.query(
        'INSERT INTO processed_webhook_events (event_id, processed_at) VALUES ($1, NOW()) ON CONFLICT DO NOTHING',
        [eventId]
    );
}

app.post('/webhooks/fleetbase', async (req, res) => {
    const event = req.body;
    res.sendStatus(200);

    if (await isEventProcessed(event.id)) return;
    await markEventProcessed(event.id);
    await handleStatusUpdate(event);
});
```

## Consultar el estado del pedido bajo demanda

Además de los webhooks, puede consultar el estado actual de cualquier pedido:

```
async function getOrderStatus(fleetbasePublicId) {
    const response = await fetch(`${FLEETBASE_API}/v1/orders/${fleetbasePublicId}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    const { data: order } = await response.json();
    return {
        status: order.status,
        driver: order.driver_assigned,
        updated_at: order.updated_at,
    };
}
```

Prefiera los webhooks sobre la consulta para obtener actualizaciones en tiempo real. La consulta introduce latencia y carga API innecesaria. Utilice la consulta solo como un mecanismo de recuperación (por ejemplo, un trabajo nocturno para capturar cualquier evento perdido).

## Modo de prueba vs. Modo en vivo

Construya y pruebe con el
**entorno de prueba**
primero:

|  | Prueba | Vivo |
| --- | --- | --- |
| **Prefijo de la clave API** | `flb_test_...` | `flb_live_...` |
| **Aislamiento de datos** | Completamente separado | Datos de producción |
| **Webhooks** | Entregados a puntos finales de prueba registrados | Entregados a puntos finales en vivo |

Cambie entre entornos utilizando el
**Modo de prueba**
(conmutar). Las claves, los webhooks y los registros de solicitud están en el contexto del entorno activo.

## Supervisar la integración

Una vez que esté en producción, utilice la consola de desarrollador para supervisar su integración:

* **Registros de solicitud**
  — cada llamada de API entrante con códigos de estado y cargas útiles →
  [Desarrolladores → Registros de solicitud](https://fleetbase.io/docs/platform/developer-console/request-logs)
* **Eventos del sistema**
  — todos los eventos emitidos que puede correlacionar con los eventos de webhook →
  [Desarrolladores → Eventos del sistema](https://fleetbase.io/docs/platform/developer-console/system-events)
* **Intentos de webhook**
  — historial y códigos de respuesta para cada punto final →
  [Desarrolladores → Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)

## Próximos pasos

* Consulte
  [Conectar su primer webhook](https://fleetbase.io/docs/platform/recipes/connect-your-first-webhook)
  para obtener más información sobre webhooks.
* Consulte
  [Claves de API](https://fleetbase.io/docs/platform/developer-console/api-keys)
  para la gestión y rotación de claves.
* Consulte
  [Referencia de la API](https://fleetbase.io/docs/api)
  para obtener información sobre todos los puntos finales disponibles en las extensiones.