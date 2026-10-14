---
título: "Autenticación de dos factores"
url: https://fleetbase.io/docs/platform/system-setup/two-factor-authentication
módulo: plataforma
---

# Autenticación de dos factores

Habilite y aplique la autenticación de dos factores de forma global para todos los usuarios en su instancia de Fleetbase.

# Autenticación de dos factores

La autenticación de dos factores (2FA) añade un segundo paso de verificación al proceso de inicio de sesión. Después de ingresar su contraseña, los usuarios deben confirmar un código único antes de obtener acceso. Navegue a
**Administrador → Configuración de autenticación → Autenticación de dos factores**
para configurar la 2FA de forma global.

La 2FA se aplica a todas las formas de iniciar sesión, incluyendo
[Inicio de sesión OAuth](https://fleetbase.io/docs/platform/system-setup/oauth-sign-in)
— iniciar sesión con un proveedor nunca omite el código único.

![Configuración de Autenticación de dos factores — Interruptor de activación, selector de método de entrega y interruptor de aplicación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-two-factor-settings.c665a65e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Habilitando la 2FA

Habilite el interruptor
**Habilitar Autenticación de dos factores**
para hacer que la 2FA esté disponible en toda la instancia. Cuando esté habilitada, los usuarios pueden activar la 2FA en sus propias cuentas desde la configuración de seguridad personal. Habilitar esto no obliga inmediatamente a todos los usuarios a utilizarla; consulte
[Aplicar la 2FA](#aplicar-la-2fa)
a continuación.

## Método

Elija cómo se entregan los códigos únicos a los usuarios cuando inician sesión:

| Método | Descripción |
|---|---|
| **Correo electrónico** | Se envía un código de verificación a la dirección de correo electrónico registrada del usuario. No se requiere configuración adicional. |
| **SMS** | Se envía un código de verificación al número de teléfono registrado del usuario. Requiere la configuración de [Twilio](https://fleetbase.io/docs/platform/system-setup/services#twilio). |

Solo un método está activo de forma global en un momento dado. Utilice
**Correo electrónico**
si Twilio aún no está configurado.

## Aplicar la 2FA

Habilite el interruptor
**Aplicar Autenticación de dos factores**
para exigir que cada usuario complete la configuración de 2FA en su próximo inicio de sesión. Cuando se aplica:

* Los usuarios que aún no han configurado la 2FA se les solicita que lo hagan inmediatamente después de ingresar su contraseña.
* No pueden acceder al panel de control hasta que la 2FA esté completamente configurada en su cuenta.
* Los usuarios que ya tienen la 2FA habilitada continúan sin interrupción.

La aplicación se aplica a todos los usuarios de la instancia, incluidos los administradores.

## Guardar

Haga clic en
**Guardar cambios**
para aplicar. Los cambios surten en el próximo intento de inicio de sesión: las sesiones activas no se interrumpen.