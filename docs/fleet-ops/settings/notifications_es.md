---
title: "Configuración de notificaciones"
url: https://fleetbase.io/docs/fleet-ops/settings/notifications
module: fleet-ops
---

# Configuración de notificaciones

Define quién recibe cada notificación de Fleet-Ops: conductores, clientes, operadores, proveedores o cualquier otra persona registrada.

# Configuración de notificaciones

**Configuración de notificaciones**
Responde a una pregunta por cada notificación registrada:
*¿A quién debe dirigirse?*
Para cada notificación que Fleet-Ops (o una extensión instalada) haya registrado en la plataforma, esta página muestra una selección múltiple donde puedes elegir:
**los destinatarios**
— las partes que recibirán la alerta cuando se active la notificación.

Los canales (SMS / correo electrónico / notificaciones push), los modelos de mensajes y las condiciones de activación se gestionan en otro lugar:

* El
  **canal**
  a través del cual se envía la notificación (SMS / correo electrónico / notificaciones push) se determina por el tipo de destinatario (los conductores reciben notificaciones push en Navigator, los clientes reciben SMS, los operadores reciben correo electrónico, etc.) y la configuración del remitente / SMS / notificaciones push a nivel de plataforma.
* La
  **condición de activación**
  (cuando se activa la notificación) se integra con el evento correspondiente en el código — no se puede reconfigurar desde esta página.

Navega a
**Fleet-Ops → Configuración → Notificaciones**
.

![Configuración de notificaciones de Fleet-Ops — lista de notificaciones registradas, cada una con una selección múltiple de destinatarios](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-notification-settings.91c73402.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Cómo funciona la página

La página lee un registro de notificaciones — cada notificación que se haya registrado (ya sea por Fleet-Ops o por una extensión) aparece automáticamente en la página como una fila:

| Elemento de la interfaz de usuario | ¿Qué hace? |
|---|---|
| **Nombre de la notificación** | El identificador del título de la notificación (por ejemplo, *Pedido enviado*, *Pedido completado*) |
| **Descripción** | Texto de ayuda breve que describe cuándo se activa la notificación. |
| **Destinatarios (selección múltiple)** | Las partes que deben recibir esta notificación. Las opciones se obtienen de los destinatarios registrados en tu instancia. |

No añades ni eliminas notificaciones de esta página — se definen en el código. Solo eliges
**quién recibe cada una**.

## Configuración de destinatarios

Navega a
**Fleet-Ops → Configuración → Notificaciones**
.

Para la notificación que deseas configurar, abre la
**selección múltiple de destinatarios**.

Selecciona uno o más destinatarios — los ejemplos típicos incluyen:

* **Conductor**
  — el conductor asignado al pedido
* **Cliente**
  — el contacto del cliente para el pedido
* **Operador**
  — el equipo interno de gestión
* **Proveedor / facilitador**
  — el proveedor asignado
* cualquier otro destinatario registrado por una extensión

Haz clic en
**Guardar cambios**
. Los nuevos eventos de notificación respetarán la lista de destinatarios actualizada.

## Dónde se definen los canales

Cuando se activa una notificación, Fleet-Ops la envía a través de los canales que son adecuados para cada destinatario:

* Un
  **destinatario**
  recibe una notificación push en la aplicación Navigator
* Un
  **cliente**
  recibe un SMS o un correo electrónico, dependiendo de lo que esté registrado
* Un
  **operador**
  recibe un correo electrónico y / o una notificación en la consola

Para que estos canales funcionen, los servicios a nivel de
**plataforma**
deben estar configurados:

* **Correo electrónico**
  —
  [Configuración del sistema → Correo electrónico](https://fleetbase.io/docs/platform/system-setup/mail)
* **SMS**
  — Twilio (o compatible) configurado a nivel de plataforma
* **Notificaciones push**
  —
  [Configuración del sistema → Notificaciones push](https://fleetbase.io/docs/platform/system-setup/push-notifications)
* **Webhooks**
  — registrados en
  [Consola de desarrollador → Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks)

## Añadir notificaciones personalizadas

Si necesitas una notificación que Fleet-Ops no ofrece, créala utilizando una
[extensión](https://fleetbase.io/docs/platform/extensions/managing-extensions)
y regístrala en el registro de notificaciones. Una vez registrada, aparecerá en esta página como cualquier otra notificación, lista para que se configuren los destinatarios.

[Pagos

Conecta una cuenta de Stripe Connect para que Fleet-Ops pueda cobrar a los clientes por las cotizaciones de servicio y mostrar las transacciones realizadas en la consola.](https://fleetbase.io/docs/fleet-ops/settings/payments)
[Ruteo

Selecciona qué servicio de ruteo renderiza las rutas de Fleet-Ops, qué motor optimiza las instrucciones de parada y la unidad de distancia utilizada en la interfaz de usuario.](https://fleetbase.io/docs/fleet-ops/settings/routing)