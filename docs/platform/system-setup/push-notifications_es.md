---
título: "Notificaciones Push"
url: https://fleetbase.io/docs/platform/system-setup/push-notifications
módulo: plataforma
---

# Notificaciones Push

Configure el servicio de Notificaciones Push de Apple (APNs) y Firebase Cloud Messaging (FCM) para enviar notificaciones push a la aplicación móvil Navigator para conductores.

# Notificaciones Push

Fleetbase envía notificaciones push a la
**aplicación Navigator**
para conductores para asignar pedidos, actualizar el estado y enviar alertas. Se admiten dos canales: el servicio de Notificaciones Push de Apple (APNs) para iOS y Firebase Cloud Messaging (FCM) para Android. Navegue a
**Administrador → Configuración del sistema → Notificaciones Push**
para configurarlas.

![Configuración de Notificaciones Push — Paneles de configuración de APNs y Firebase](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-push-notification-settings.9bc87482.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Configuración del Proveedor

APNs (iOS)

FCM (Android)

APNs envía notificaciones push a los dispositivos iOS. Necesitará una cuenta de Desarrollador de Apple y acceso a las credenciales de notificación push de su aplicación.

| Campo | Descripción |
|---|---|
| **ID de clave APN** | El ID de clave de 10 caracteres para su clave de autenticación `.p8` |
| **ID de equipo APN** | Su ID de equipo de Desarrollador de Apple (encontrado en la sección "Miembro" del portal de Desarrolladores de Apple) |
| **ID de paquete APN** | El ID de paquete de la aplicación que recibe las notificaciones (por ejemplo, `io.fleetbase.navigator`) |
| **Archivo de clave P8** | Sube su archivo de clave de autenticación `.p8` descargado del portal de Desarrolladores de Apple |
| **APN Producción** | Habilitar para versiones de producción (App Store). Deshabilitar para versiones de desarrollo/TestFlight. |

Para generar una clave `.p8`: inicie sesión en [developer.apple.com](https://developer.apple.com/) → Certificados, identificadores y perfiles → Claves → cree una nueva clave con **Notificaciones Push de Apple (APNs)** habilitado. El archivo `.p8` solo se puede descargar una vez, así que guárdelo de forma segura.

Firebase Cloud Messaging (FCM) envía notificaciones push a los dispositivos Android.

| Campo | Descripción |
|---|---|
| **Archivo de cuenta de servicio JSON** | Sube el archivo de credenciales de la cuenta de servicio de Firebase para su proyecto |

Para generar el archivo de cuenta de servicio: abra el [Firebase Console](https://console.firebase.google.com/) → Configuración del proyecto → Cuentas de servicio → **Generar nueva clave privada**. Sube el archivo JSON descargado aquí.

## Pruebas

El panel **Notificación Push de Prueba** le permite verificar ambos canales de extremo a extremo antes de utilizarlos en producción.

| Campo | Descripción |
|---|---|
| **Título** | Título de la notificación |
| **Mensaje** | Texto del cuerpo de la notificación |
| **Token de dispositivo APN** | Un token de dispositivo de un dispositivo iOS para probar la entrega de APNs |
| **Token de dispositivo FCM** | Un token de registro de un dispositivo Android para probar la entrega de FCM |

Complete uno o ambos tokens de dispositivo y haga clic en **Probar configuración**. El dispositivo debería recibir la notificación en unos segundos. Los tokens de dispositivo se pueden obtener de la pantalla de configuración de depuración de la aplicación Navigator.

## Guardar

Haga clic en **Guardar cambios** para aplicar la configuración. La caché de configuración se actualiza automáticamente, por lo que no es necesario reiniciar.