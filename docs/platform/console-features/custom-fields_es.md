---
Título: Campos personalizados
URL: https://fleetbase.io/docs/platform/console-features/custom-fields
Módulo: Plataforma
---

# Campos personalizados

Agrega campos de datos personalizados estructurados a cualquier recurso de la plataforma, sin necesidad de escribir código.

# Campos personalizados

Los campos personalizados te permiten agregar datos adicionales estructurados a los recursos de la plataforma (órdenes, conductores, vehículos, contactos, etc.) sin necesidad de escribir código. Los campos están organizados en grupos con nombres, se muestran en las vistas detalladas de los recursos y se devuelven en las respuestas de la API.

El Administrador de Campos Personalizados está integrado dentro del panel de configuración de cada extensión que lo soporta (por ejemplo,
**Fleet-Ops → Configuración → Campos personalizados**
).

![Administrador de Campos Personalizados — pestañas de tipo de recurso, grupos de campos como paneles, campos con etiquetas y botones de edición/eliminación](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-fields-settings.3d8100f1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Pestañas de recurso

El administrador muestra una pestaña para cada tipo de recurso que soporta campos personalizados. Haz clic en una pestaña para ver y administrar los campos de ese recurso (por ejemplo, Orden, Conductor, Vehículo, Contacto).

## Grupos de campos

Los campos están organizados en
**grupos**. Un grupo es un contenedor con nombre que se muestra como una sección en la vista detallada del recurso. Necesitas al menos un grupo antes de poder agregar campos.

### Crear un grupo

Haz clic en
**Nuevo grupo de campos**
y escribe un nombre. El grupo aparece inmediatamente en el administrador.

### Tamaño de la cuadrícula

Cada grupo tiene una configuración
**Tamaño de la cuadrícula**
que controla el número de columnas en las que se muestran sus campos:

| Tamaño de la cuadrícula | Diseño |
|---|---|
| `1` | Una columna — los campos abarcan todo el ancho |
| `2` | Dos columnas iguales |
| `3` | Tres columnas iguales |

Cambia esto a través del
**Tamaño de la cuadrícula**
en el menú desplegable del grupo. Los campos compactos, como entradas de texto cortas o interruptores, funcionan bien con un tamaño de cuadrícula más grande.

### Eliminar un grupo

Haz clic en el icono
**basura**
de un grupo para eliminarlo junto con todos sus campos.

## Tipos de campos

| Tipo | Descripción |
|---|---|
| **Entrada** | Campo de texto de una sola línea |
| **Entrada de teléfono** | Número de teléfono con selector de código de país |
| **Entrada de dinero** | Cantidad monetaria numérica |
| **Entrada de fecha y hora** | Selector combinado de fecha y hora |
| **Selector de fecha** | Selector de fecha |
| **Botón de radio** | Selección única de opciones predefinidas mostradas como botones de radio |
| **Selección** | Selección única de opciones predefinidas mostradas como un menú desplegable |
| **Carga de archivo** | Adjunto de archivo — imágenes, PDFs, documentos, etc. |

## Crear un campo

Haz clic en
**Crear nuevo campo personalizado**
dentro de un grupo para abrir el formulario del campo.

![Formulario de campo personalizado — Etiqueta, Descripción, Texto de ayuda, interruptores de "Requerido/Editable", Tipo de campo, Opciones y Rango de columnas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-custom-field-create.cf152118.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Descripción |
|---|---|
| **Etiqueta del campo** | El nombre que se muestra en formularios y vistas detalladas |
| **Descripción del campo** | Descripción opcional que explica qué captura el campo |
| **Texto de ayuda del campo** | Texto de sugerencia que se muestra debajo de la entrada en el formulario |
| **Campo requerido** | Evita guardar el recurso sin un valor |
| **Campo editable** | Cuando se desactiva, el campo se vuelve de solo lectura después de la entrada inicial |
| **Tipo de campo** | El componente de entrada a utilizar — consulta los tipos anteriores |
| **Opciones** | Para los tipos de Botón de radio y Selección — define la lista de valores seleccionables |
| **Rango de columnas** | Cuántas columnas de la cuadrícula ocupa este campo dentro del diseño del grupo |

## Editar y eliminar campos

Haz clic en el icono
**lápiz**
de cualquier campo para editarlo. Los cambios se aplican inmediatamente en todos los registros de recursos.

Haz clic en el icono
**basura**
para eliminar un campo. El campo y todos sus valores almacenados se eliminan permanentemente.

## Acceso a la API

Los valores de los campos personalizados se incluyen en las respuestas de la API para su recurso. Las claves de los campos se derivan de la etiqueta del campo en minúsculas con guiones bajos (snake\_case). Puedes leer y escribir los valores de los campos personalizados a través de los puntos finales estándar
`GET`
,
`POST`
y
`PUT`
para el recurso.