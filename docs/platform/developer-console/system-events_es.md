---
title: "Eventos del Sistema"
url: https://fleetbase.io/docs/platform/developer-console/system-events
module: plataforma
---

# Eventos del Sistema

Consulte un registro de búsqueda de todos los eventos de la API emitidos por su instancia de Fleetbase, lo que resulta útil para auditorías y depuración de integraciones.

# Eventos del Sistema

"Eventos del Sistema" es un registro de todos los eventos de la API emitidos por su instancia de Fleetbase. Cada vez que una acción desencadena un evento (por ejemplo, un pedido cambia de estado, se crea un conductor, se activa un webhook), este evento se registra aquí. Navegue a
**Desarrolladores → Eventos del Sistema**
.

![Lista de Eventos del Sistema — Columnas de Descripción del evento, Código, ID y Fecha](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-events-list.23d092e3.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tabla de Eventos

| Columna | Descripción |
|---|---|
| **Evento** | Descripción legible por humanos de lo que ocurrió |
| **Código** | Identificador de evento legible por máquina (por ejemplo, `order.dispatched`, `driver.created`) — filtrable |
| **ID** | ID público único del evento — haga clic para copiar |
| **Fecha** | Fecha en que se emitió el evento |

## Búsqueda y Filtrado

Utilice el campo de
**búsqueda**
en la barra superior para buscar eventos por descripción o código. El botón
**Filtros**
expone filtros por columna:

* **Código**
  — seleccione un tipo de evento específico de la lista de todos los eventos conocidos
* **Fecha**
  — filtre por un rango de fechas

Combine los filtros para reducir los eventos que está buscando.

## Vista Detallada del Evento

Haga clic en cualquier fila para abrir el registro completo del evento.

![Detalle del Evento del Sistema — Panel de Detalles con metadatos del evento y Panel de Datos con el payload JSON completo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-event-details.b3715cbb.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La vista detallada tiene dos paneles:

### Detalles

Metadatos del evento: su código, ID público y la marca de tiempo en que se emitió. Utilice el botón
**Atrás**
en la barra superior para volver a la lista.

### Datos

El payload JSON completo del evento. Este es el mismo dato que se entregaría a un webhook suscrito a este código de evento.

## Relación con Webhooks

Los Eventos del Sistema y los Webhooks están estrechamente relacionados. La columna
**Código**
en los Eventos del Sistema coincide con las cadenas de evento que selecciona al configurar un
[Webhook](https://fleetbase.io/docs/platform/developer-console/webhooks). Si una entrega de webhook falla, puede encontrar el evento correspondiente aquí para inspeccionar el payload que se envió (o debería haber enviado).

## Retención de Datos

Los eventos se conservan durante un período determinado y se eliminan automáticamente. Si necesita archivar eventos a largo plazo, suscríbase a los eventos relevantes a través de un webhook y envíe los datos a su propio servicio de almacenamiento o registro.