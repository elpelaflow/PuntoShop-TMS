---
title: "Webhooks"
url: https://fleetbase.io/docs/platform/developer-console/webhooks
module: platform
---

# Webhooks

Configure los puntos finales de webhook para recibir notificaciones HTTP en tiempo real cuando se produzcan eventos en tu instancia de Fleetbase.

# Webhooks

Los webhooks envían notificaciones de eventos a tus propios servidores en el momento en que ocurre algo en Fleetbase: cuando se envía un pedido, cuando cambia la ubicación del conductor, cuando se crea un contacto. Navega a
**Desarrolladores → Webhooks**
para gestionar tus puntos finales.

![Lista de webhooks — URL, estado, modo, versión, columnas creadas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-webhooks-list.e745d5c7.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Crear un Webhook

Haz clic en
**Nuevo**
para configurar un nuevo punto final.

![Formulario de webhook — URL, descripción, credenciales de API, versión y selector de eventos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-webhook-create.de3c1d4c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **URL del punto final** | La URL HTTPS en tu servidor que recibirá las solicitudes POST |
| **Descripción** | Nota opcional para recordarte para qué sirve este webhook |
| **Credenciales de API** | Vincula opcionalmente este webhook a una clave de API específica, lo que limita la entrega a eventos generados por esa clave |
| **Versión de la API** | La versión de la API que se utilizará para los datos del evento |
| **Eventos** | Los eventos a los que se suscribe este punto final |

### Seleccionar eventos

El selector de eventos agrupa los eventos disponibles por recurso (por ejemplo, Pedido, Conductor, Vehículo). Utiliza el campo de búsqueda para filtrar, y luego haz clic en los eventos individuales para añadirlos. Los eventos seleccionados aparecen en el panel inferior con un botón de eliminar junto a cada uno. También puedes hacer clic en
**Todos los eventos**
para suscribirte a todos los eventos en un solo paso, o
**Borrar**
para eliminar todas las selecciones.

Los eventos disponibles dependen de las extensiones que estén instaladas en tu instancia.

## Tabla de Webhooks

| Columna | Descripción |
|---|---|
| **URL** | El punto final de destino: haz clic para abrir la vista de detalles |
| **Estado** | `habilitado` o `deshabilitado` |
| **Modo** | `prueba` o `en producción` — coincide con el entorno en el que se creó el webhook |
| **Versión** | La versión de la API utilizada para el formato de los datos |
| **Creado** | Cuando se registró el punto final |

## Vista de detalles del Webhook

Haz clic en cualquier URL de webhook para abrir la página de detalles.

![Vista de detalles del webhook — Panel de métricas, panel de detalles y registro de intentos](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-webhook-details.07d41bf5.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La vista de detalles tiene tres paneles:

### Métricas

Un resumen de la salud de la entrega: número total de intentos, entregas exitosas y fallos. Utilízalo para obtener una idea rápida de si tu punto final está recibiendo eventos de forma fiable.

### Detalles

La configuración completa del webhook: URL, descripción, credenciales de API, versión de la API y eventos suscritos. Haz clic en
**Actualizar**
para editar cualquier campo.

### Intentos

Un registro de entregas que muestra cada vez que Fleetbase envió una solicitud a este punto final. Cada entrada muestra el evento que se activó, el código de estado de la respuesta y una marca de tiempo.

![Registro de intentos del webhook — nombre del evento, código de estado HTTP y marca de tiempo para cada entrega](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-webhook-attempts.9c3a7ae8.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Utiliza el registro de intentos para depurar las entregas fallidas: una respuesta
`5xx`
o la ausencia de respuesta significa que tu punto final está inactivo o mal configurado.

## Activar y desactivar un Webhook

Desde la página de detalles, utiliza los botones
**Deshabilitar**
/
**Habilitar**
en la parte superior para pausar o reanudar la entrega sin eliminar el punto final. Los webhooks deshabilitados permanecen en la lista, pero no reciben tráfico.

## Eliminar un Webhook

Utiliza el botón
**Eliminar**
en la página de detalles o
**⋯ → Eliminar**
desde la lista. Eliminar elimina el punto final permanentemente junto con su historial de entregas.

## Formato del Payload

Fleetbase envía una solicitud HTTP
`POST`
a tu punto final con un cuerpo JSON para cada evento.

```
{
  "id": "evt_01HXYZ",
  "event": "order.dispatched",
  "api_version": "v1",
  "created_at": "2026-04-29T10:30:00Z",
  "data": {
    "id": "order_01HABC",
    "public_id": "ORD-1001",
    "status": "dispatched"
  }
}
```

## Mejores prácticas

* **Responder rápidamente**
  — devuelve un estado
  `2xx`
  dentro de unos segundos. Para un procesamiento lento, responde inmediatamente y gestiona el payload de forma asíncrona.
* **Gestionar los reintentos**
  — Fleetbase reintenta las entregas fallidas. Asegúrate de que tu punto final sea idempotente para que el mismo evento procesado dos veces no cause efectos secundarios duplicados.
* **Utilizar HTTPS**
  — siempre sirve tu punto final sobre HTTPS para proteger los datos del payload en tránsito.