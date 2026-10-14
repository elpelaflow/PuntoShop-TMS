---
título: "Claves de API"
url: https://fleetbase.io/docs/platform/developer-console/api-keys
módulo: plataforma
---

# Claves de API

Genera y gestiona las credenciales de API para autenticar las solicitudes a la API REST de Fleetbase.

# Claves de API

Las claves de API son las credenciales utilizadas para autenticar las solicitudes a la API REST de Fleetbase. Cada clave pertenece a un entorno, ya sea
**Prueba**
o
**Producción**, y se pueden configurar para una duración específica. Para gestionarlas, navega a
**Desarrolladores → Claves de API**

![Lista de claves de API — Nombre, clave pública, clave secreta, icono de entorno, fecha de caducidad, columna "Última utilización"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-keys-list.ae033a14.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Interruptor de modo de prueba

El encabezado contiene un interruptor para el
**Modo de prueba**. Cuando está activo, la tabla muestra solo las claves de prueba y la consola entra en modo de prueba, lo que significa que ningún cambio afecta a los datos de producción. Cuando el modo de prueba está activo, también puedes seleccionar una clave de prueba específica del menú desplegable junto al interruptor; esto controla qué clave de prueba se envía como credencial activa al realizar solicitudes desde la consola.

## Crear una clave de API

Haz clic en
**Nuevo**
para crear una clave. El entorno se establece automáticamente, dependiendo de si el modo de prueba está activo o no.

![Formulario de clave de API — Campo "Nombre", menú desplegable "Caducidad" y icono de entorno (prueba/producción)](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdevelopers-api-key-create.7b5e8391.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Nombre** | Una etiqueta descriptiva para la clave (por ejemplo, "Aplicación móvil", "Integración con ERP") |
| **Caducidad** | Cuando caduca la clave: elige entre "nunca", "inmediatamente", "en 1 hora", "en 24 horas", "en 3 días" o "en 7 días" |
| **Entorno** | Se establece automáticamente: "prueba" cuando el modo de prueba está activo, "producción" cuando está desactivado |

Haz clic en
**Guardar**
para generar la clave. Las claves pública y secreta se muestran en la tabla inmediatamente después de la creación.

## Campos de la clave

| Columna | Descripción |
|---|---|
| **Nombre** | La etiqueta que has asignado a la clave: haz clic para editarla |
| **Clave pública** | El token `flb_test_…` o `flb_live_…`: haz clic para copiar |
| **Clave secreta** | La clave correspondiente: haz clic para mostrarla, luego para copiar |
| **Entorno** | "prueba" o "producción" |
| **Caducidad** | Cuando la clave deja de ser válida, o en blanco si nunca caduca |
| **Última utilización** | Marca de tiempo de la última solicitud de autenticación |

## Utilizar una clave

Incluye la clave pública como un token Bearer en cada solicitud de API:

```
Authorization: Bearer flb_live_your_public_key_here
```

Ejemplo con cURL:

```
curl -X GET "https://api.fleetbase.io/v1/orders" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json"
```

## Acciones de la clave

Haz clic derecho o utiliza el menú
**⋯**
en cualquier fila para acceder a las acciones de la clave:

| Acción | Descripción |
|---|---|
| **Editar** | Actualiza el nombre o la fecha de caducidad de la clave |
| **Renombrar** | Renombra la clave rápidamente sin abrir el formulario completo |
| **Rotar** | Genera una nueva pareja de clave pública y secreta: requiere la contraseña de tu cuenta. Utilízala para rotar las credenciales después de una posible filtración, sin tener que eliminar el registro de la clave |
| **Ver registros de solicitud** | Ve directamente a los registros de solicitud filtrados para esta clave |
| **Eliminar** | Elimina permanentemente la clave: cualquier integración que la utilice dejará de autenticarse inmediatamente |

## Acciones por lotes

Selecciona varias claves y utiliza el menú desplegable "Acción por lotes" para eliminarlas en una sola operación.

## Exportar claves

Haz clic en
**Exportar**
para descargar la lista de claves de API en el formato que elijas (CSV, XLSX, XLS, HTML, PDF). La exportación incluye los nombres de las claves, los entornos y las fechas de caducidad, pero no los valores de las claves secretas.

## Seguridad

* Nunca commits las claves en el control de versiones ni las incluyas en el código del lado del cliente.
* Rota las claves periódicamente utilizando la acción "Rotar".
* Utiliza nombres descriptivos para saber a qué sistema pertenece cada clave y para revocarla rápidamente.
* Supervisa el uso en
  [Registros de solicitud](https://fleetbase.io/docs/platform/developer-console/request-logs)
  para detectar actividad inesperada.