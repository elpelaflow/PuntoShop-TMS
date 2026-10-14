---
title: "Configurar campos personalizados"
url: https://fleetbase.io/docs/platform/recipes/configure-custom-fields
module: platform
---

# Configurar campos personalizados

Añadir campos de datos personalizados estructurados a conductores, vehículos, contactos y otros recursos, y luego leerlos a través de la API.

# Configurar campos personalizados

Los campos personalizados le permiten añadir datos estructurados adicionales a los recursos de la plataforma: conductores, vehículos, contactos y más, sin necesidad de crear una extensión. Los campos se definen en el panel de configuración de la consola, se muestran directamente en las vistas de detalles de los recursos y se devuelven automáticamente en las respuestas de la API.

Campos personalizados para
**órdenes**
se configuran a través de la configuración de Órdenes en Fleet-Ops. Esta receta utiliza
**Conductor**
como recurso de ejemplo, y el mismo flujo de trabajo se aplica a Vehículos, Contactos y cualquier otro recurso disponible en el Administrador de Campos Personalizados.

## Lo que construirás

Un grupo de campos personalizado llamado
**Contacto de emergencia**
en el recurso Conductor, con tres campos: un campo de texto para el nombre del contacto, un campo de teléfono para su número y un campo de selección para el tipo de relación.

## Requisitos previos

* Fleet-Ops instalado en tu instancia
* Permisos de IAM para acceder a la configuración de Fleet-Ops

## Paso 1 — Abrir el Administrador de Campos Personalizados

### Navegar a la configuración de Fleet-Ops

Haz clic en
**Fleet-Ops**
en la barra de navegación superior, y luego abre
**Configuración**
en el panel lateral.

### Abrir Campos Personalizados

En el panel lateral de Configuración, haz clic en
**Campos personalizados**
. Se abre el Administrador de Campos Personalizados, mostrando una pestaña para cada tipo de recurso que admita campos personalizados.

![Administrador de Campos Personalizados — pestañas de tipo de recurso en la parte superior con grupos de campos debajo](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-fields-settings.3d8100f1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Seleccionar la pestaña Conductor

Haz clic en
**Conductor**
en las pestañas de recursos. Esto muestra todos los grupos de campos y campos actualmente configurados para el recurso Conductor. En una instancia nueva, esto estará vacío.

## Paso 2 — Crear un grupo de campos

Los campos deben pertenecer a un
**grupo**
— un contenedor con nombre que se muestra como una sección etiquetada en la vista de detalles del Conductor. Puede crear varios grupos por recurso para organizar campos relacionados.

Haz clic en
**Nuevo grupo de campos**
.

Introduce
`Contacto de emergencia`
como nombre del grupo.

Establece el
**Tamaño de la cuadrícula**
para controlar cuántas columnas se muestran los campos:

| Tamaño de la cuadrícula | Diseño |
| --- | --- |
| `1` | Una columna — cada campo ocupa todo el ancho |
| `2` | Dos columnas iguales |
| `3` | Tres columnas iguales |

Establece el
**Tamaño de la cuadrícula**
a
`2`
. Puede añadir más grupos más tarde — cada grupo tiene su propio tamaño de cuadrícula independiente.

## Paso 3 — Añadir campos personalizados

Haz clic en
**Crear nuevo campo personalizado**
dentro del grupo. Se abre el formulario de campo.

![Formulario de campo personalizado — Etiqueta, selector de tipo, interruptores para Requerido y Editable, Rango de columna](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-field-create.cf152118.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Campo 1 — Nombre de contacto

| Configuración | Valor |
| --- | --- |
| **Etiqueta del campo** | `Nombre de contacto` |
| **Tipo de campo** | Entrada |
| **Campo es requerido** | Sí |
| **Campo es editable** | Sí |
| **Rango de columna** | 1 |

Haz clic en
**Guardar**
.

### Campo 2 — Número de teléfono de contacto

| Configuración | Valor |
| --- | --- |
| **Etiqueta del campo** | `Número de teléfono` |
| **Tipo de campo** | Entrada de teléfono |
| **Campo es requerido** | Sí |
| **Campo es editable** | Sí |
| **Rango de columna** | 1 |

Haz clic en
**Guardar**
.

### Campo 3 — Relación

| Configuración | Valor |
| --- | --- |
| **Etiqueta del campo** | `Relación` |
| **Tipo de campo** | Selección |
| **Opciones** | `Cónyuge` , `Padre` , `Hijo` , `Hermano` , `Amigo` , `Otro` |
| **Campo es requerido** | No |
| **Campo es editable** | Sí |
| **Rango de columna** | 2 |

Haz clic en
**Guardar**
.

Ahora, los tres campos aparecen dentro del grupo
**Contacto de emergencia**
. Puede arrastrarlos para reordenarlos, o haga clic en el icono de lápiz para editar cualquier campo en cualquier momento.

## Campos disponibles

| Tipo | Para |
| --- | --- |
| **Entrada** | Texto de una sola línea corto — nombres, códigos, identificadores |
| **Entrada de teléfono** | Números de teléfono con selector de código de país |
| **Entrada de dinero** | Cantidades de moneda |
| **Entrada de fecha y hora** | Selector combinado de fecha y hora |
| **Selector de fecha** | Solo fecha (sin hora) |
| **Botón de radio** | Una selección mostrada como botones de radio en línea |
| **Selección** | Una selección mostrada como un menú desplegable |
| **Subir archivo** | Documento o imagen adjunto |

## Paso 4 — Probar los campos en un conductor

Abre cualquier registro de conductor en
**Fleet-Ops → Recursos → Conductores**
(o crea un nuevo conductor). Desplázate hasta la sección
**Contacto de emergencia**
en la vista de detalles. Sus tres campos se muestran directamente y son totalmente editables.

Introduce valores y guarda. Los datos del campo personalizado se almacenan junto con el registro del conductor de forma inmediata.

## Añadir más grupos

Puede añadir tantos grupos como necesite en el mismo recurso. Por ejemplo, puede añadir un segundo grupo llamado
**Licencias y cumplimiento**
con campos para el número de licencia, la fecha de caducidad y la clase de licencia:

Haz clic en
**Nuevo grupo de campos**
nuevamente en la pestaña Conductor.

Nómbrelo
`Licencias y cumplimiento`
y establece el
**Tamaño de la cuadrícula**
a
`3`
.

Añade campos dentro del nuevo grupo — por ejemplo:

* **Número de licencia**
  — Entrada, Rango de columna 1
* **Clase de licencia**
  — Selección (opciones: A, B, C, D), Rango de columna 1
* **Fecha de caducidad de la licencia**
  — Selector de fecha, Rango de columna 1

Todos los tres campos ahora aparecen dentro del grupo
**Contacto de emergencia**
. Puede arrastrarlos para reordenarlos, o haga clic en el icono de lápiz para editar cualquier campo en cualquier momento.

## Paso 5 — Leer campos personalizados a través de la API

Los valores de los campos personalizados se incluyen automáticamente en las respuestas de la API. Se
**incorporan directamente al objeto de recurso raíz**
— no están anidados bajo una
`meta`
clave. La clave de cada campo es la versión en minúsculas de la etiqueta del campo que ha definido.

```
curl -X GET "https://api.fleetbase.io/v1/drivers/DRV-001" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json"
```

Respuesta:

```
{
  "id": "driver_01H...",
  "public_id": "DRV-001",
  "name": "Alex Tan",
  "phone": "+6591234567",
  "status": "active",
  "contact_name": "Sarah Tan",
  "contact_phone": "+6598765432",
  "relationship": "Spouse",
  "licence_number": "S1234567A",
  "licence_class": "B",
  "licence_expiry": "2028-06-30",
  "custom_fields": [
    "contact_name",
    "contact_phone",
    "relationship",
    "licence_number",
    "licence_class",
    "licence_expiry"
  ],
  "custom_field_values": [
    { "key": "contact_name", "value": "Sarah Tan" },
    { "key": "contact_phone", "value": "+6598765432" },
    { "key": "relationship", "value": "Spouse" }
  ]
}
```

Dos claves reservadas se añaden siempre junto con los valores incorporados:

| Clave | Tipo | Contenido |
| --- | --- | --- |
| `custom_fields` | `string[]` | El nombre de clave en minúsculas de cada campo personalizado — use esto para saber qué claves de nivel superior son campos y no recursos estándar |
| `custom_field_values` | `object[]` | Los pares clave-valor del campo personalizado como un array estructurado — útil para iterar sin conocer los nombres de los campos de antemano |

La estructura del grupo de campos (los grupos visuales que ha creado en la consola) no tiene representación en la respuesta de la API — las agrupaciones son solo una cuestión de visualización.

## Paso 6 — Escribir campos personalizados a través de la API

Pase los valores de los campos personalizados como claves de nivel superior en el cuerpo de la solicitud, utilizando los mismos nombres en minúsculas que aparecen dentro del campo de la respuesta:

```
curl -X POST "https://api.fleetbase.io/v1/drivers" \
  -H "Authorization: Bearer flb_live_your_public_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Tan",
    "phone": "+6591234567",
    "contact_name": "Sarah Tan",
    "contact_phone": "+6598765432",
    "relationship": "Spouse"
  }'
```

Lo mismo se aplica a las solicitudes
`PUT`
/
`PATCH`
cuando se actualiza un conductor existente. Solo las claves que incluye se actualizan — omitir una clave de campo personalizado deja que su valor existente sin cambios.

## Editar y eliminar campos

* **Editar**
  — haga clic en el icono de lápiz para cualquier campo para actualizar su etiqueta, tipo, opciones o configuración. Los cambios se aplican inmediatamente y los valores almacenados se conservan.
* **Eliminar**
  — haga clic en el icono de papelera para eliminar permanentemente un campo y todos sus valores en todos los registros.

La eliminación de un campo personalizado también elimina permanentemente todos los valores almacenados para él en todos los registros del conductor. Esto no se puede deshacer.

## Próximos pasos

* La misma lógica se aplica a
  **Vehículos**
  ,
  **Contactos**
  y otros recursos en el Administrador de Campos Personalizados
* Consulte
  [Campos personalizados](https://fleetbase.io/docs/platform/console-features/custom-fields)
  para obtener una referencia completa sobre tipos de campos, configuraciones de grupo y diseño de cuadrícula
* Para datos personalizados específicos de la orden, consulte la sección de **Configuración de órdenes** en
  [Fleet-Ops](https://fleetbase.io/docs/fleet-ops)

[Configurar el seguimiento en tiempo real

Suscríbase a los eventos de socket de Fleetbase para mostrar ubicaciones de conductores y estados de órdenes en vivo en su propia aplicación o panel.](https://fleetbase.io/docs/platform/recipes/set-up-real-time-tracking)
[Crear una integración personalizada

Utilice la API REST de Fleetbase y los webhooks para integrar un sistema externo — enviar órdenes, recibir eventos de estado, manejar los reintentos de forma segura.](https://fleetbase.io/docs/platform/recipes/build-a-custom-integration)