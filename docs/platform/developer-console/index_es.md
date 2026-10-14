---
title: "Consola para desarrolladores"
url: https://fleetbase.io/docs/platform/developer-console
module: plataforma
---

Plataforma

# Consola para desarrolladores

La Consola para desarrolladores le proporciona las herramientas para autenticar las llamadas a la API, recibir notificaciones de eventos y supervisar el tráfico en tiempo real en su instancia de Fleetbase.

# Consola para desarrolladores

La
**Consola para desarrolladores**
es el centro de integración integrado en la Consola de Fleetbase. Se accede desde la barra lateral principal en la sección
**Desarrolladores**
y proporciona todo lo que necesita para conectar sistemas externos, crear aplicaciones personalizadas y supervisar la actividad de la API.

![Barra lateral de la Consola para desarrolladores — Sección "Desarrolladores" con claves de API, webhooks, eventos de socket, eventos del sistema y registros de solicitudes](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-keys-list.ae033a14.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Secciones

| Sección | Propósito |
|---|---|
| [Claves de API](https://fleetbase.io/docs/platform/developer-console/api-keys) | Generar y gestionar las credenciales de autenticación para la API REST de Fleetbase |
| [Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks) | Suscribirse a los eventos de la plataforma y recibir llamadas HTTP cuando se activen |
| [Eventos de socket](https://fleetbase.io/docs/platform/developer-console/socket-events) | Supervisar los canales WebSocket en tiempo real que transmiten la actividad de la plataforma |
| [Eventos del sistema](https://fleetbase.io/docs/platform/developer-console/system-events) | Consultar un registro de búsqueda de todos los eventos de la API emitidos por la plataforma |
| [Registros de solicitudes](https://fleetbase.io/docs/platform/developer-console/request-logs) | Inspeccionar la historia completa de cada solicitud de API realizada a su instancia |

## Modo de prueba vs. Modo en vivo

Cada organización tiene dos entornos aislados:
**Prueba**
y
**En vivo**.

* **Modo de prueba**
  — los datos están completamente separados del entorno de producción. Las claves de API, los webhooks y los registros de solicitudes creados o recibidos en modo de prueba no son visibles en modo en vivo y viceversa.
* **Modo en vivo**
  — se utiliza para operaciones reales y tráfico de producción.

Cambie entre entornos utilizando el
**Modo de prueba**
en la barra de navegación superior de la consola. La Consola para desarrolladores refleja solo los datos del entorno actualmente activo: cambiar de entorno cambia los que se muestran de claves de API, webhooks y registros.