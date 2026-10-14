---
título: "Correo electrónico"
url: https://fleetbase.io/docs/platform/system-setup/mail
módulo: plataforma
---

# Correo electrónico

Configure el motor de envío de correo electrónico que Fleetbase utiliza para notificaciones, invitaciones, actualizaciones de pedidos y alertas del sistema.

# Correo electrónico

Fleetbase envía correos electrónicos transaccionales para invitaciones de cuenta, restablecimiento de contraseñas, notificaciones de pedidos y alertas del sistema. El panel de configuración de correo electrónico le permite elegir y configurar el motor de correo electrónico que utiliza para enviar todos los correos electrónicos. Para acceder a estas opciones, vaya a
**Administrador → Configuración del sistema → Correo electrónico**

![Configuración de correo electrónico — Dirección "Desde", Nombre "Desde" y configuración del remitente](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-mail-settings-smtp.df946ebc.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Dirección y Nombre "Desde"

Estos dos campos se aplican independientemente del remitente seleccionado.

| Campo | Descripción |
|---|---|
| **Dirección "Desde"** | La dirección de correo electrónico que Fleetbase utiliza para enviar correos (por ejemplo, `noreply@yourdomain.com`) |
| **Nombre "Desde"** | El nombre que se muestra a los destinatarios (por ejemplo, el nombre de su empresa) |

## Remitente

Seleccione el método de envío de correo electrónico que desea utilizar. El formulario se actualiza para mostrar solo los campos relevantes para el remitente seleccionado.

![Configuración de correo electrónico con el remitente Amazon SES seleccionado y sus campos de credenciales](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-mail-settings-ses.b41d0da4.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

SMTP

Mailgun

Postmark

SendGrid

Resend

Microsoft Graph

Se conecta a cualquier servidor SMTP: su propio servidor de correo, un servidor de reenvío o un servicio alojado que proporciona credenciales SMTP.

| Campo | Descripción |
|---|---|
| **Host SMTP** | Nombre de dominio de su servidor SMTP (por ejemplo, `smtp.mailgun.org`) |
| **Puerto SMTP** | Número de puerto: normalmente `587` (STARTTLS) o `465` (SSL) |
| **Cifrado SMTP** | Interruptor para habilitar la cifrado TLS (recomendado) |
| **Nombre de usuario SMTP** | Su nombre de usuario de autenticación SMTP |
| **Contraseña SMTP** | Su contraseña de autenticación SMTP |
| **Tiempo de espera SMTP** | Tiempo de espera de la conexión en segundos (opcional) |
| **Modo de autenticación SMTP** | Modo de autenticación si es necesario para su servidor (opcional) |

Utiliza la API de
[Mailgun](https://mailgun.com/). Verifique su dominio de envío en Mailgun a través de DNS antes de usarlo.

| Campo | Descripción |
|---|---|
| **Dominio de Mailgun** | Su dominio de envío de Mailgun verificado (por ejemplo, `mg.yourdomain.com`) |
| **Punto final de Mailgun** | `api.mailgun.net` para regiones de EE. UU., `api.eu.mailgun.net` para la UE |
| **Clave secreta de Mailgun** | Su clave API privada de Mailgun |

Utiliza la API de
[Postmark](https://postmarkapp.com/). Cree una cuenta en Postmark para obtener su token.

| Campo | Descripción |
|---|---|
| **Token de Postmark** | Su token de API de Postmark |

Utiliza la API de
[SendGrid](https://sendgrid.com/)
Web API v3. Verifique una identidad o dominio de envío en SendGrid antes de usarlo.

| Campo | Descripción |
|---|---|
| **Clave API de SendGrid** | Su clave API de SendGrid con permisos de envío |

Utiliza la API de
[Resend](https://resend.com/)
. Verifique su dominio de envío en el panel de control de Resend antes de usarlo.

| Campo | Descripción |
|---|---|
| **Clave API de Resend** | Su clave API de Resend |

Envía correos electrónicos a través de la API de Microsoft Graph utilizando OAuth2, lo que es adecuado para cuentas de Microsoft 365 o Exchange Online.

| Campo | Descripción |
|---|---|
| **ID de cliente** | El ID de la aplicación (cliente) de su registro de aplicación de Azure |
| **Secreto de cliente** | El secreto de cliente generado para su aplicación de Azure |
| **ID de inquilino** | Su ID de inquilino de Azure Active Directory |
| **Guardar en "Elementos enviados"** | Interruptor para guardar los correos electrónicos enviados en la carpeta "Elementos enviados" de la cuenta de envío |

Registre una aplicación en el
[portal de Azure](https://portal.azure.com/)
con la
`Mail.Send`
permiso de la API de Microsoft Graph.

## Pruebas

Haga clic en
**Probar configuración**
para enviar un correo electrónico de prueba a la cuenta de administrador actualmente iniciada sesión utilizando la configuración que se ha introducido actualmente en el formulario. Consulte su bandeja de entrada para confirmar la entrega, y luego haga clic en
**Guardar cambios**
para conservar la configuración.

## Guardar

Haga clic en
**Guardar cambios**
para aplicar la configuración. La caché de la configuración se actualiza automáticamente, por lo que no es necesario reiniciar.