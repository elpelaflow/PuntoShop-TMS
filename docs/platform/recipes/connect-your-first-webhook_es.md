---
title: "Conecta tu primer webhook"
url: https://fleetbase.io/docs/platform/recipes/connect-your-first-webhook
module: platform
---

# Conecta tu primer webhook

Configura un punto final de webhook para recibir llamadas de eventos en tiempo real de Fleetbase: creación de pedido, asignación de conductor, actualización de estado, y más.

# Conecta tu primer webhook

Los webhooks permiten que Fleetbase envíe eventos a tu backend en el momento en que ocurre algo: se envía un pedido, el estado de un conductor cambia, se crea un contacto. Esta guía te mostrará cómo configurar un receptor, registrarlo en la Consola de Desarrollador, y verificar que los eventos se transmiten correctamente.

## Lo que construirás

Un punto final HTTPS simple que recibe las solicitudes POST de webhook de Fleetbase, registra los datos, y responde con
`200 OK`
. Luego, lo registrarás en la Consola de Desarrollador y observarás cómo fluyen los eventos.

## Requisitos previos

* Una cuenta de Fleetbase (autohospedada o
  [Fleetbase Cloud](https://console.fleetbase.io/onboard)
  )
* Un punto final HTTPS accesible públicamente — o
  [ngrok](https://ngrok.com/)
  para el desarrollo local

## Paso 1 — Crea el punto final del receptor

Tu punto final debe:

* Aceptar
  `POST`
  solicitudes
* Devolver un código de estado
  `2xx`
  dentro de unos segundos
* Manejar el cuerpo de la solicitud como JSON

Node.js (Express)

Python (Flask)

PHP

```
npm install express
```

```
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhooks/fleetbase', (req, res) => {
    const event = req.body;

    console.log(`Recibido evento: ${event.event}`);
    console.log('Payload:', JSON.stringify(event.data, null, 2));

    // Siempre responde rápidamente con 2xx
    res.sendStatus(200);

    // Realiza cualquier procesamiento lento después de responder
    handleEvent(event).catch(console.error);
});

async function handleEvent(event) {
    switch (event.event) {
        case 'order.dispatched':
            // Por ejemplo, actualiza tu propia base de datos
            console.log(`Pedido ${event.data.public_id} enviado`);
            break;
        case 'order.completed':
            console.log(`Pedido ${event.data.public_id} completado`);
            break;
        default:
            console.log(`Tipo de evento no manejado: ${event.event}`);
    }
}

app.listen(3000, () => console.log('Receptor de webhook en ejecución en el puerto 3000'));
```

```
pip install flask
```

```
from flask import Flask, request, jsonify
import threading

app = Flask(__name__)

@app.route('/webhooks/fleetbase', methods=['POST'])
def handle_webhook():
    event = request.get_json()

    print(f"Recibido evento: {event['event']}")

    # Responde inmediatamente, procesa de forma asíncrona
    thread = threading.Thread(target=process_event, args=(event,))
    thread.start()

    return '', 200

def process_event(event):
    event_type = event.get('event')
    data = event.get('data', {})

    if event_type == 'order.dispatched':
        print(f"Pedido {data.get('public_id')} enviado")
    elif event_type == 'order.completed':
        print(f"Pedido {data.get('public_id')} completado")

if __name__ == '__main__':
    app.run(port=3000)
```

```
<?php
// webhook.php

$payload = file_get_contents('php://input');
$event   = json_decode($payload, true);

// Registrar el evento
error_log('Recibido evento: ' . $event['event']);

// Responder inmediatamente con 200
http_response_code(200);
echo 'OK';
flush();

// Procesar después de responder
switch ($event['event']) {
    case 'order.dispatched':
        // Actualiza tu sistema...
        error_log('Pedido ' . $event['data']['public_id'] . ' enviado');
        break;
    case 'order.completed':
        error_log('Pedido ' . $event['data']['public_id'] . ' completado');
        break;
}
```

## Paso 2 — Expón tu punto final públicamente

Para el desarrollo local, usa
[ngrok](https://ngrok.com/)
para crear una URL HTTPS pública temporal:

```
ngrok http 3000
```

ngrok mostrará una URL como
`https://a1b2c3d4.ngrok.io`
. La URL de tu punto final de webhook será:

```
https://a1b2c3d4.ngrok.io/webhooks/fleetbase
```

En producción, despliega detrás de un dominio real con un certificado TLS válido. Fleetbase solo entrega a puntos finales HTTPS.

## Paso 3 — Registra el webhook en la Consola de Desarrollador

### Abre Webhooks

Navega a
**Desarrolladores → Webhooks**
en la barra lateral de la Consola de Fleetbase. Haz clic en
**Nuevo**
.

### Rellena el formulario

| Campo | Valor |
|---|---|
| **URL del punto final** | Tu URL HTTPS pública (por ejemplo, `https://a1b2c3d4.ngrok.io/webhooks/fleetbase`) |
| **Descripción** | Opcional — por ejemplo, `Receptor de estado del pedido` |
| **Credencial de API** | Deja en blanco para recibir eventos de todas las claves, o selecciona una clave específica |
| **Versión de la API** | Selecciona la versión con la que está construido tu integración |

### Selecciona eventos

Usa el
**Eventos**
para seleccionar qué eventos quieres suscribir. Los eventos iniciales comunes son:

| Evento | Se activa cuando |
|---|---|
| `order.created` | Se crea un nuevo pedido |
| `order.dispatched` | Se asigna un pedido a un conductor |
| `order.driver_assigned` | Se vincula un conductor a un pedido |
| `order.completed` | Se marca un pedido como completado |
| `order.cancelled` | Se cancela un pedido |
| `driver.created` | Se crea una nueva cuenta de conductor |

Haz clic en los eventos individuales o
**Todos los eventos**
para suscribirte a todo. Haz clic en
**Guardar**
.

## Paso 4 — Dispara un evento de prueba

Una vez que hayas registrado el webhook, dispara un evento al que te hayas suscrito:

* En
  **Fleet-Ops → Pedidos**
  , crea un nuevo pedido
* Ábrelo y envíalo a un conductor

Observa los registros de tu receptor. Deberías ver los datos del evento impresos en cuestión de segundos.

## Formato del payload del webhook

Cada POST de webhook de Fleetbase contiene un cuerpo JSON:

```
{
  "id": "evt_01HXYZ123ABC",
  "event": "order.dispatched",
  "api_version": "v1",
  "created_at": "2026-04-29T10:30:00Z",
  "data": {
    "id": "order_01HABC456DEF",
    "public_id": "ORD-1001",
    "status": "dispatched",
    "driver_assigned": {
      "id": "driver_01H...",
      "name": "Alex Tan",
      "phone": "+6591234567"
    }
  }
}
```

## Paso 5 — Inspecciona las entregas

En la Consola de Desarrollador, haz clic en tu URL de webhook para abrir su página de detalles. La sección
**Intentos**
muestra todos los intentos de entrega con el nombre del evento, el código de estado HTTP y la marca de tiempo.

![Vista de detalle de webhook — Registro de intentos que muestra el historial de entregas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-webhook-attempts.9c3a7ae8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Si un intento falla (código de respuesta
`4xx`
o
`5xx`
, o no hay respuesta), el registro de intentos te indica exactamente lo que Fleetbase recibió.

## Manejo de reintentos

Fleetbase reintenta las entregas fallidas. Asegúrate de que tu punto final sea
**idempotente**
— procesar el mismo evento varias veces no debe causar efectos secundarios duplicados.

Usa el
`id`
(
`evt_01HXYZ123ABC`
) como clave de desduplicación:

```
const processedEvents = new Set(); // Usa una base de datos en producción

app.post('/webhooks/fleetbase', (req, res) => {
    const event = req.body;

    // Desduplicar
    if (processedEvents.has(event.id)) {
        return res.sendStatus(200); // Acepta pero omite
    }
    processedEvents.add(event.id);

    res.sendStatus(200);
    handleEvent(event).catch(console.error);
});
```

## Próximos pasos

* Explora todos los eventos disponibles en
  **Desarrolladores → Eventos del sistema**
* Consulta
  [Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)
  para obtener la referencia completa sobre la gestión de puntos finales
* Consulta
  [Construye una integración personalizada](https://fleetbase.io/docs/platform/recipes/build-a-custom-integration)
  para combinar webhooks con llamadas a la API