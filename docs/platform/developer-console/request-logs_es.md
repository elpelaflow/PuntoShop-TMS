---
título: "Registros de solicitudes"
url: https://fleetbase.io/docs/platform/developer-console/request-logs
módulo: plataforma
---

# Registros de solicitudes

Revise un historial completo y filtrable de cada solicitud de API realizada a su instancia de Fleetbase.

# Registros de solicitudes

"Request Logs" registra cada solicitud de API entrante a su instancia de Fleetbase. Úselo para depurar problemas de integración, auditar el uso de la API o rastrear un comportamiento inesperado hasta una llamada específica. Navegue a
**Desarrolladores → Registros de solicitudes**
.

![Lista de Registros de solicitudes — Descripción, Estado, ID, Credencial de API, Método, Versión, Fecha](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-request-logs-list.9b0ab4c9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Tabla de solicitudes

| Columna | Descripción |
|---|---|
| **Descripción** | Un resumen de la solicitud (ruta y acción) |
| **Estado** | El código de estado HTTP devuelto — con colores (verde para 2xx, rojo para 4xx/5xx) |
| **ID** | El ID de solicitud público — haga clic para copiar |
| **Credencial de API** | La clave de API utilizada para autenticar la solicitud — haga clic para copiar el nombre de la clave |
| **Método HTTP** | `GET` , `POST` , `PUT` , `PATCH` , o `DELETE` |
| **Versión** | La versión de la API a la que apunta la solicitud |
| **Fecha** | Cuando se recibió la solicitud |

## Filtrado

Haga clic en
**Filtros**
para abrir el panel de filtros. Puede filtrar por cualquier combinación de:

* **Credencial de API**
  — mostrar solo solicitudes de una clave específica
* **Método HTTP**
  — filtrar por uno o más métodos (GET, POST, PUT, PATCH, DELETE)
* **Versión**
  — filtrar por una versión específica de la API
* **Fecha**
  — filtrar por un rango de fechas

Utilice el
**Columnas visibles**
para mostrar o ocultar columnas que no sean relevantes para su investigación actual.

## Vista de detalles de la solicitud

Haga clic en cualquier fila para abrir el registro completo de la solicitud.

![Registro de solicitud detallado — Paneles de Detalles, Parámetros de consulta, Encabezados de la solicitud, Cuerpo de la solicitud y Cuerpo de la respuesta](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-request-log-details.940dc87a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La vista de detalles se divide en paneles enfocados:

### Detalles

El resumen de alto nivel — descripción de la solicitud, código de estado HTTP (mostrado como un icono en la barra), clave de API utilizada, método, versión y marca de tiempo.

### Parámetros de consulta

Parámetros de consulta URL incluidos en la solicitud, si los hay.

### Encabezados de la solicitud

Todos los encabezados HTTP enviados con la solicitud, incluidos
`Authorization`
,
`Content-Type`
y
`User-Agent`
.

### Cuerpo de la solicitud

El cuerpo JSON enviado con la solicitud (para solicitudes
`POST`
,
`PUT`
y
`PATCH`
). Vacío para
`GET`
y
`DELETE`
.

### Cuerpo de la respuesta

El cuerpo JSON exacto devuelto por Fleetbase. Para solicitudes fallidas, los mensajes de error y los detalles de validación aparecen aquí — esta suele ser la forma más rápida de comprender por qué falló una solicitud.

Utilice el
**Atrás**
en la barra de navegación para volver a la lista.

## Registros de prueba vs. en vivo

Los "Registros de solicitudes" están diseñados para el entorno actual. Cambie al
**Modo de prueba**
utilizando el interruptor en la barra de navegación superior para ver solo las solicitudes realizadas con claves de prueba. Vuelva a cambiar para ver el tráfico en vivo.

## Retención de datos

Los registros se conservan durante un período determinado y se eliminan automáticamente para mantener el tamaño de la base de datos bajo control. Para auditorías a largo plazo, envíe solicitudes críticas a un servicio de registro externo a través de
[Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)
o expórtelos en un horario regular.