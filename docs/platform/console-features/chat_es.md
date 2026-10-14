---
title: "Chat"
url: https://fleetbase.io/docs/platform/console-features/chat
module: platform
---

# Chat

Mensajes en tiempo real integrados en la consola de Fleetbase: crea canales, envía mensajes a los miembros del equipo y comparte archivos sin salir de la plataforma.

# Chat

Fleetbase incluye un sistema de chat en tiempo real integrado en la consola. Los coordinadores y los miembros del equipo pueden enviarse mensajes directamente, crear canales de grupo y compartir archivos, todo desde una barra de chat persistente en la barra de navegación superior.

El chat funciona con la capa WebSocket SocketCluster y envía mensajes en tiempo real sin necesidad de consultar.

## La Barra de Chat

Haz clic en el
**icono de mensaje**
en la barra de navegación superior para abrir la Barra de Chat.

![Barra de Chat — Botón "Iniciar Chat", lista de canales con nombre, indicador de mensajes sin leer, avatar y vista previa del último mensaje](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-chat-tray.fd6bffd1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

La barra muestra:

* Un
  **indicador de "mensajes sin leer"**
  en el icono de mensaje cuando tienes mensajes sin leer
* Una lista de tus canales abiertos, cada uno mostrando el nombre del canal, la vista previa del último mensaje, el avatar del remitente y el número de mensajes sin leer
* Un
  **Botón "Iniciar Chat"**
  para crear una nueva conversación

Haz clic en cualquier canal para abrir su ventana de chat. Si creaste el canal, también aparece un
**botón "Eliminar"**
en la entrada de la barra.

## Ventanas de Chat

Cada canal abierto se muestra como una
**ventana de chat flotante**
anclada a la parte inferior de la pantalla. Se pueden abrir varias ventanas simultáneamente, una al lado de la otra.

![Ventana de chat — Nombre del canal con lápiz, barra de avatar del participante con indicadores de estado en línea, historial de mensajes y botón "Enviar"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-chat-window.48126238.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Controles de la ventana

| Control | Descripción |
|---|---|
| **Nombre del canal + lápiz** | Haz clic en el lápiz para cambiar el nombre del canal |
| **Menú desplegable "Añadir participante"** | Lista a todos los usuarios de tu organización con indicadores de estado en línea/fuera de línea. Haz clic en un usuario para añadirlo. |
| **✕** | Cierra la ventana. No elimina el canal. |

### Participantes

Los avatares de los participantes aparecen en una barra debajo del encabezado de la ventana. Cada avatar tiene un punto de color: verde para en línea, gris para fuera de línea. Desplázate para ver el nombre del participante.

Si tienes permiso, aparece un
**✕**
pequeño en los avatares de los participantes. Haz clic en él para eliminar a ese usuario del canal.

### Enviar mensajes

Escribe en el cuadro de texto en la parte inferior y pulsa
**Enter**
o haz clic en
**Enviar**. El botón "Enviar" está desactivado mientras el cuadro de texto está vacío.

### Adjuntos

Haz clic en
**Añadir archivo adjunto**
(icono de clip de papel) para adjuntar archivos a tu mensaje. Se pueden seleccionar varios archivos a la vez. Un indicador de progreso de carga con un porcentaje se muestra mientras se cargan los archivos. Los archivos pendientes aparecen como "chips" encima del área de entrada: haz clic en el ✕ de un chip para eliminarlo antes de enviarlo.

Tipos de archivo compatibles:

| Categoría | Formatos |
|---|---|
| Imágenes | JPEG, PNG, GIF, WebP |
| Documentos | PDF, Word (.docx / .doc), Excel (.xlsx), PowerPoint (.pptx) |
| Video | MP4, QuickTime, AVI, FLV, WMV |
| Audio | MP3 |
| Archivos | ZIP, TAR |

## Iniciar una nueva conversación

Haz clic en
**Iniciar Chat**
en la Barra de Chat. Busca usuarios en tu organización para añadirlos como participantes y dale un nombre al canal. El canal se abre como una ventana flotante inmediatamente.

## Comportamiento en tiempo real

El servicio de chat escucha en dos canales de socket simultáneamente:

* `user.{your-user-id}`
  — eventos como ser añadido o eliminado de un canal
* El propio feed de cada canal que se ha unido — para nuevos mensajes

Cuando llega un mensaje mientras la barra está cerrada, se reproduce un sonido de notificación y el indicador de "mensajes sin leer" en el icono de mensaje se actualiza automáticamente.