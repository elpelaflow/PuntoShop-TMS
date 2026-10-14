---
title: "Sistema de archivos"
url: https://fleetbase.io/docs/platform/system-setup/filesystem
module: platform
---

# Sistema de archivos

Configure dónde Fleetbase almacena las subidas de archivos: disco local, Amazon S3, Google Cloud Storage, o cualquier proveedor compatible con S3.

# Sistema de archivos

La configuración del sistema de archivos controla dónde Fleetbase almacena los archivos subidos: documentos del conductor, fotos de comprobantes de entrega, archivos CSV importados y otros contenidos subidos por el usuario. Navegue a
**Administrador → Configuración del sistema → Sistema de archivos**
para acceder a estas opciones.

![Configuración del sistema de archivos — Menú desplegable "Conductor" con campos de configuración de S3 visibles](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-filesystem-settings-s3.ba6176bf.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Para fórmulas de crecimiento de almacenamiento, objetivos de copia de seguridad y orientación para el almacenamiento de objetos en producción, consulte
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## Conductor

Seleccione el backend de almacenamiento en el
**Conductor**
menú desplegable. El formulario se actualiza para mostrar los campos necesarios para el conductor seleccionado.

![Configuración del sistema de archivos con el conductor "Público (local)" seleccionado](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-filesystem-settings-public.e316e95d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Local

S3 / Compatible con S3

Google Cloud Storage

Almacena los archivos en el disco local del servidor. No se requieren configuraciones adicionales. Solo es adecuado para configuraciones de un solo servidor con almacenamiento persistente y no temporal — no se recomienda para implementaciones en la nube donde los contenedores pueden reiniciarse.

Amazon S3 o cualquier proveedor compatible con S3 (Cloudflare R2, MinIO, DigitalOcean Spaces, Backblaze B2).

| Campo | Descripción |
|---|---|
| **S3 Bucket** | El nombre de su bucket de S3 |
| **URL de S3** | URL pública de CDN o dominio personalizado opcional para servir archivos (por ejemplo, una URL de distribución de CloudFront) |
| **Endpoint de S3** | Endpoint personalizado para proveedores compatibles con S3 — deje vacío para AWS S3 (por ejemplo, `https://nyc3.digitaloceanspaces.com` para DigitalOcean Spaces) |

Las credenciales de AWS (ID de clave de acceso, clave secreta de acceso y región) para S3 se configuran en
[Servicios](https://fleetbase.io/docs/platform/system-setup/services)
o se establecen mediante variables de entorno (
`AWS_ACCESS_KEY_ID`
,
`AWS_SECRET_ACCESS_KEY`
,
`AWS_DEFAULT_REGION`
).

| Campo | Descripción |
|---|---|
| **Bucket de GCS** | El nombre de su bucket de GCS |
| **Archivo de clave de cuenta de servicio de GCS** | Sube su archivo JSON de credenciales de la cuenta de servicio de GCS |

Si GCS ya está configurado mediante variables de entorno (
`GOOGLE_CLOUD_STORAGE_BUCKET`
,
`GOOGLE_CLOUD_PROJECT_ID`
o
`GOOGLE_APPLICATION_CREDENTIALS`
), la consola mostrará una advertencia. Guardar nuevos valores aquí sobrescribirá la configuración del entorno.

Para generar un archivo de clave de cuenta de servicio: abra la Consola de Google Cloud → IAM y Administración → Cuentas de servicio → seleccione su cuenta de servicio → Claves → Agregar clave → JSON. Otorgue al servicio la función
**Administrador de objetos de almacenamiento**
en su bucket.

## Pruebas

Haga clic en
**Probar configuración**
para verificar la configuración subiendo un pequeño archivo de prueba al backend de almacenamiento seleccionado. Se muestra un mensaje de éxito o error directamente. Pruebe antes de guardar para confirmar que las credenciales y el acceso al bucket son correctos.

## Guardar

Haga clic en
**Guardar cambios**
para aplicar la configuración. La caché de la configuración se actualiza automáticamente — no es necesario reiniciar.

[Correo electrónico

Configure el controlador de correo electrónico que Fleetbase utiliza para notificaciones, invitaciones, actualizaciones de pedidos y alertas del sistema.](https://fleetbase.io/docs/platform/system-setup/mail)
[Cola

Configure la cola de trabajos en segundo plano que impulora la entrega de webhooks, notificaciones, importaciones y procesamiento asíncrono en Fleetbase.](https://fleetbase.io/docs/platform/system-setup/queue)