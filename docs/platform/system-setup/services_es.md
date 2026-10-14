---
título: "Servicios"
url: https://fleetbase.io/docs/platform/system-setup/services
módulo: plataforma
---

# Servicios

Configure integraciones de servicios de terceros: AWS, Google Maps, Twilio SMS, seguimiento de errores de Sentry e IP geolocation.

# Servicios

El panel de configuración de "Servicios" es donde se conecta Fleetbase con las APIs externas que utiliza en toda la plataforma: mapas, SMS, monitorización de errores e IP geolocation. Navegue a
**Administrador → Configuración del sistema → Servicios**
para acceder a estas configuraciones.

![Configuración de "Servicios" — secciones de configuración de AWS, Google Maps, Twilio, Sentry e IP Info](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-services-settings.c977e332.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Para la planificación de la infraestructura, incluyendo la conectividad externa y las dependencias de los servicios, consulte
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## AWS

Fleetbase utiliza el SDK de AWS para integraciones que requieren acceso directo a la API de AWS (como SES para correo electrónico o SQS para el procesamiento de colas). Estas credenciales son diferentes de las credenciales de S3 configuradas en
[Sistema de archivos](https://fleetbase.io/docs/platform/system-setup/filesystem)
.

| Campo | Descripción |
|---|---|
| **Clave de acceso de AWS** | El ID de clave de acceso de su usuario de IAM |
| **Clave secreta de acceso de AWS** | La clave secreta de acceso de su usuario de IAM |
| **Región de AWS** | Región predeterminada (por ejemplo, `us-east-1`, `ap-southeast-1`) |

Cree un usuario de IAM dedicado en la Consola de AWS con los permisos mínimos necesarios para su caso de uso. Evite utilizar las credenciales de la cuenta raíz.

## Google Maps

Google Maps proporciona la autocompletar de direcciones, la geocodificación y el mapa en tiempo real en Fleet-Ops.

| Campo | Descripción |
|---|---|
| **Clave de API de Google Maps** | Su clave de API del [Consola de Google Cloud](https://console.cloud.google.com/) |
| **Idioma de Google Maps** | Idioma predeterminado para las etiquetas del mapa y los resultados de autocompletar (por ejemplo, `us`, `gb`, `au`) |

La clave de API debe tener las siguientes APIs habilitadas en su proyecto de Google Cloud:

* API de JavaScript para Maps
* API de Geocodificación
* API de Lugares

Restrinja la clave a su dominio en la Consola de Google Cloud para evitar un uso no autorizado.

## Twilio

Twilio gestiona los SMS de salida: utilizado para notificaciones a los conductores, códigos de verificación cuando se selecciona SMS como método de entrega, y cualquier alerta de SMS configurada en las extensiones.

| Campo | Descripción |
|---|---|
| **SID de Twilio** | Su SID de Twilio de la [consola de Twilio](https://www.twilio.com/) |
| **Token de Twilio** | Su token de autenticación de Twilio |
| **Número de Twilio** | El número de teléfono o SID del Servicio de Mensajería de Twilio desde el que enviar |

Ingrese un número de teléfono en el campo **Probar la configuración de Twilio** y haga clic en el botón de prueba para enviar un SMS en vivo y confirmar que las credenciales funcionan antes de guardar.

## Sentry

Sentry captura excepciones y errores no controlados de la API de Fleetbase, lo que le proporciona visibilidad de los problemas de producción.

| Campo | Descripción |
|---|---|
| **DSN de Sentry** | El DSN de la configuración de su proyecto de Sentry |

Cree un proyecto de Laravel en su cuenta de Sentry para obtener el DSN. Haga clic en **Probar la configuración de Sentry** para enviar una excepción de prueba y confirmar que los eventos aparecen en su panel de control de Sentry.

## IP Info

Fleetbase utiliza la geolocalización de IP para enriquecer los registros de auditoría y los registros de sesión con datos de ubicación aproximados.

| Campo | Descripción |
|---|---|
| **Clave de API de IP Info** | Su clave de API de [ipinfo.io](https://ipinfo.io/) |

Una cuenta gratuita de ipinfo.io proporciona 50.000 solicitudes por mes, lo cual es suficiente para la mayoría de las instancias autoalojadas.

## Guardar

Haga clic en **Guardar cambios** para aplicar todas las configuraciones de servicio. La caché de configuración se actualiza automáticamente: no es necesario reiniciar.