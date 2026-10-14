---
título: "Acceso al Navegador"
url: https://fleetbase.io/docs/fleet-ops/resources/drivers/navigator-access
módulo: fleet-ops
---

Conductores

# Acceso al Navegador

Gestionar el acceso de un conductor a la aplicación Navigator: inicio de sesión, registro del dispositivo, permisos y gestión del token de autenticación.

# Acceso al Navegador

**Acceso al Navegador**
abarca cómo los conductores se autentican en la aplicación Navigator, cómo se registra su dispositivo y cómo gestiona su acceso a la aplicación desde el panel de control.

## Cómo se inician sesión los conductores

Los conductores se inician sesión en Navigator utilizando su número de teléfono registrado. La aplicación envía un código de verificación por SMS al número registrado en el registro del conductor.

1. El conductor abre la aplicación Navigator e introduce su número de teléfono
2. La aplicación envía un código SMS de 6 dígitos
3. El conductor introduce el código para completar el inicio de sesión
4. Se solicitan los permisos de ubicación y deben ser concedidos

El número de teléfono utilizado para el inicio de sesión debe coincidir exactamente con el número de teléfono en el registro del conductor en
**Fleet-Ops → Recursos → Conductores**
. Se requiere el formato internacional (por ejemplo, +6591234567).

## Registro del dispositivo

Cuando un conductor se inicia sesión por primera vez, su dispositivo se registra en el sistema. Fleet-Ops almacena:

* Token del dispositivo (para notificaciones push)
* Plataforma del dispositivo (iOS o Android)
* Versión de la aplicación
* Token de autenticación (para la autenticación de API)

Si un conductor cambia de teléfono o reinstala la aplicación, su dispositivo se re-registra automáticamente en el próximo inicio de sesión. Los antiguos tokens del dispositivo se invalidan.

## Tokens de autenticación

Cada conductor tiene un
**token de autenticación**
— un token de portador de larga duración utilizado para autenticar las llamadas a la API desde la aplicación Navigator. El token de autenticación se genera automáticamente cuando se crea el registro del conductor y se actualiza en cada inicio de sesión.

Puede regenerar manualmente el token de autenticación de un conductor desde su panel de detalles:

1. Abra el registro del conductor →
   **Resumen**
   tab
2. Haga clic en
   **Regenerar token**
   (o una acción similar en el panel de detalles)
3. El nuevo token se envía a la aplicación del conductor en el próximo sincronización

La regeneración del token de autenticación de un conductor invalidará inmediatamente su sesión actual. Tendrá que iniciar sesión nuevamente a través de SMS.

## Revocar el acceso

Para evitar que un conductor inicie sesión en Navigator:

1. Abra el registro del conductor
2. Cambie el estado del conductor
   **Estado**
   a
   `suspendido`
   o
   `inactivo`
3. Los conductores inactivos/suspendidos no pueden recibir órdenes de despacho y sus sesiones de Navigator están bloqueadas

Para una revocación permanente, elimine el registro del conductor por completo. Esto elimina todo el acceso y desactiva el enlace de la cuenta de usuario.

## Notificaciones push

Navigator utiliza notificaciones push para informar a los conductores cuando:

* Se les asigna una nueva orden
* Se actualiza una orden (reprogramada, cancelada, ruta cambiada)
* Se envía un mensaje desde el panel de control

Las notificaciones push requieren que el token del dispositivo esté registrado y que el conductor tenga habilitadas las notificaciones en su dispositivo.

## Soporte para múltiples organizaciones

Los conductores pueden pertenecer a múltiples organizaciones de Fleetbase. En Navigator, pueden cambiar entre organizaciones utilizando la
**Opción de cambiar de organización**
en el menú de la aplicación. Deben estar registrados como conductores en cada organización a la que quieran acceder.

## Configuración de la aplicación Navigator

Los administradores pueden configurar el comportamiento de la aplicación Navigator para todos los conductores desde
**Fleet-Ops → Configuración → Aplicación Navigator**
:

![Configuración de la aplicación Navigator — si los conductores pueden editar los detalles de las entidades y si los conductores pueden registrarse por sí mismos desde la aplicación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-navigator-app-settings.c6a620e6.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Configuración | Descripción |
|---|---|
| **Verificación por SMS** | Activar/desactivar el inicio de sesión con código SMS |
| **Permitir registro del conductor** | Permitir que los conductores se registren por sí mismos sin configuración del panel |
| **Modo de aceptación de órdenes** | Aceptar automáticamente las órdenes o requerir la aceptación manual |
| **Frecuencia de transmisión** | Con qué frecuencia se envía la ubicación GPS (segundos) |
| **Idioma** | Idioma predeterminado para la interfaz de usuario de la aplicación del conductor |

Consulte
[Configuración → Aplicación Navigator](https://fleetbase.io/docs/fleet-ops/settings/navigator-app)
para obtener más información.