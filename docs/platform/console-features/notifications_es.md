---
título: "Notificaciones"
url: https://fleetbase.io/docs/platform/console-features/notifications
módulo: plataforma
---

# Notificaciones

Notificaciones en tiempo real en la consola para eventos de la plataforma: visualización, marcar como leído y gestión desde el área de notificaciones o la página completa de notificaciones.

# Notificaciones

La consola de Fleetbase proporciona notificaciones en tiempo real para eventos de la plataforma: asignación de pedidos, cambios de estado, alertas del sistema y más. Las notificaciones llegan a través de SocketCluster y aparecen inmediatamente, sin necesidad de refrescar la página.

## El área de notificaciones

Haz clic en el
**icono de la bandeja de entrada**
en la barra de navegación superior para abrir el área de notificaciones.

![Área de notificaciones — icono de recuento de notificaciones sin leer, lista de notificaciones con asunto y vista previa, enlace "Ver todas"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-notification-tray.76395d96.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El área muestra:

* Un
  **icono de recuento**
  en el icono de la bandeja de entrada para el número de notificaciones sin leer
* Una lista de notificaciones sin leer, cada una mostrando su
  **asunto**,
  **vista previa del mensaje**
  y
  **hora de recepción**
* Un enlace
  **Ver todas las notificaciones**
  en la parte inferior

Haz clic en cualquier notificación en el área para marcarla como leída: el recuento del icono se decrementa inmediatamente.

## Página completa de notificaciones

Haz clic en
**Ver todas las notificaciones**
en el área para abrir la lista completa de notificaciones.

![Página completa de notificaciones — botones "Seleccionar todo", "Marcar como leído" y "Eliminar", y filas de notificaciones con casilla, icono de sobre, asunto y marca de tiempo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-notifications-list.3df57d9d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Lectura de la lista

Cada fila muestra:

| Detalle | Descripción |
|---|---|
| **Casilla** | Selecciona la notificación para acciones en lote |
| **Icono de sobre** | Cerrado = sin leer (fila de fondo más claro/blanco). Abierto = leído (fila de fondo gris/suave) |
| **Asunto** | El título de la notificación |
| **Mensaje** | Una breve descripción del evento |
| **Recibido** | Tiempo relativo (por ejemplo, "hace 5 minutos") y la marca de tiempo exacta |

### Acciones en la cabecera

| Botón | Acción |
|---|---|
| **Seleccionar todo** | Selecciona todas las notificaciones en la página actual |
| **Marcar como leído** | Marca todas las notificaciones seleccionadas como leídas |
| **Eliminar** | Elimina permanentemente todas las notificaciones seleccionadas |

Hacer clic en una fila de notificación individual marca la notificación como leída.

### Paginación

Las notificaciones están paginadas. Utiliza la barra de paginación en la parte inferior de la página para navegar entre páginas.

## Entrega en tiempo real

El área de notificaciones escucha en dos canales de socket:

* `user.{your-user-id}`
  — notificaciones dirigidas a ti personalmente
* `company.{your-company-id}`
  — notificaciones transmitidas a toda tu organización

Cuando llega una notificación, suena un sonido y el recuento del icono se actualiza automáticamente. Tanto el área como la página completa de notificaciones reflejan la nueva notificación en tiempo real.

## Configuración de notificaciones

Los administradores de la organización eligen quién recibe notificaciones sobre cada evento principal en la sección
**Configuración de la organización → Notificaciones**
. La misma página configura un identificador de remitente SMS alfanumérico, para que los SMS salientes puedan llegar con el nombre de tu organización en lugar de un número de teléfono.

![Configuración de notificaciones de la organización — selectores para cada evento principal, y configuración de SMS con el identificador de remitente alfanumérico](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-organization-notifications.fa9aa379.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Fuentes de notificaciones

Los eventos que desencadenan notificaciones dependen de las extensiones instaladas. Las fuentes comunes incluyen:

* Cambios en el ciclo de vida de los pedidos (creado, enviado, completado, cancelado)
* Actualizaciones del estado del conductor
* Fallos en la entrega de webhooks
* Mensajes del administrador del sistema