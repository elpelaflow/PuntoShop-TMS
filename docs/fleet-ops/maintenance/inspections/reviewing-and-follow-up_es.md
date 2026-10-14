---
título: "Revisión y seguimiento"
url: https://fleetbase.io/docs/fleet-ops/maintenance/inspections/reviewing-and-follow-up
módulo: fleet-ops
---

Inspecciones

# Revisión y seguimiento

Lea los resultados de las inspecciones, convierta las inspecciones fallidas en incidencias y órdenes de trabajo, resuelva las inspecciones y encuentre las inspecciones de vehículos, incidencias y órdenes de trabajo.

# Revisión y seguimiento

Cada inspección registrada registra su resultado, sus respuestas y quién la ha presentado. Desde una inspección fallida, puede crear una incidencia o abrir una orden de trabajo en un solo paso, y la inspección permanecerá vinculada a ambos, para que pueda seguir el proceso de reparación.

## Lista de inspecciones

Vaya a
**Fleet-Ops → Mantenimiento → Inspecciones**
. La lista muestra todas las inspecciones, de la más reciente a la más antigua:

| Columna | Descripción |
|---|---|
| **Inspección** | El ID de la inspección. Haga clic en él para abrir la inspección. |
| **Formulario** | El formulario en el que se completó |
| **Vehículo** | El vehículo que se inspeccionó |
| **Conductor** | El conductor registrado en la inspección |
| **Resultado** | **Aprobado** o **Fallido** |
| **Fallido** | ¿Cuántas comprobaciones fallaron? |
| **Presentado** | Cuando se registró la inspección |

Utilice la barra de búsqueda, o filtre por
**Inspección**
ID,
**Resultado**
, o
**Presentado**
fecha. Cada fila ofrece
**Ver inspección**
,
**Editar inspección**
,
**Eliminar inspección**
, y — cuando aplican —
**Enviar**
,
**Crear incidencia**
,
**Crear orden de trabajo**
, y
**Resolver**
. Para eliminar varias inspecciones a la vez, selecciónelas y elija
**Eliminar seleccionadas...**
.

## Leer una inspección

Haga clic en una inspección para abrirla. La página tiene el título del formulario, por ejemplo
*Revisión diaria*
, y tiene tres pestañas:
**Resumen**
,
**Fotos**
, y
**Auditoría**
.

### Resumen

La parte superior de la pestaña
**Resumen**
resume la inspección:

| Campo | Descripción |
|---|---|
| **Inspección** | El ID de la inspección. Haga clic en él para copiarlo. |
| **Resultado** | **Aprobado** o **Fallido** |
| **Formulario** | El formulario en el que se completó. Haga clic en él para abrir el formulario. |
| **Estado** | En qué etapa del ciclo de vida se encuentra la inspección (ver más abajo) |
| **Vehículo / Conductor** | ¿Qué y quién se inspeccionó. Haga clic en cualquiera para abrirlo. |
| **Presentado por** | La persona a la que se atribuye la inspección. Para una inspección enviada a través de un enlace, también indica que proviene de un enlace público, con verificación de PIN. |
| **Odómetro / Horas del motor** | Las lecturas registradas con la inspección |
| **Presentado** | Cuando se registró la inspección |
| **Resuelto** | Cuando se resolvió la inspección |

Debajo del resumen, las respuestas se organizan por grupo, de la misma manera que aparece el formulario, con cada
**Aprobado / Fallido**
verificado
**Aprobado**
,
**Fallido**
, o
**N/A**
. Las comprobaciones fallidas muestran su gravedad, si se marcaron
**No apto para operar**
, y su comentario y fotos. El recuento en la parte inferior cuenta los aprobados, los fallidos y las respuestas N/A, y la lista
**Defectos**
reúne las comprobaciones fallidas.

La sección
**Seguimiento**
en la parte inferior muestra la
**Incidencia vinculada**
y
**Orden de trabajo vinculada**
, si las hay. Cada una es una tarjeta con el ID del registro, el título, el estado y la prioridad, así como la fecha de vencimiento para una orden de trabajo. Haga clic en una tarjeta para abrir la incidencia o la orden de trabajo.

### Resultados

| Resultado | Significado |
|---|---|
| **Aprobado** | No se respondió ninguna comprobación **Fallido** . Las comprobaciones respondidas **N/A** no cuentan como fallos. |
| **Fallido** | Se respondió al menos una comprobación **Fallido** . |

### Estados

| Estado | Significado |
|---|---|
| **Borrador** | Iniciado pero no registrado |
| **Presentado** | Registrado desde la consola o a través de un enlace de inspección |
| **Para revisar** | Marcado para que un supervisor lo revise. Puede establecerlo usted mismo editando la inspección y cambiando su **Estado** . |
| **Resuelto** | El seguimiento está completo. Se establece mediante la acción de **Resolver** . |

### La pestaña Fotos

La pestaña
**Fotos**
reúne las fotos que se han adjuntado a la inspección, incluidas las adjuntas a las comprobaciones fallidas. Puede subir más allí, como fotos tomadas después de la inspección. Se aceptan imágenes JPEG, PNG, GIF y WebP.

Las firmas no se muestran en la pestaña
**Fotos**
. Se muestran en el campo
**Firma**
en la pestaña
**Resumen**
.

### La pestaña Auditoría

La pestaña
**Auditoría**
lista los cambios realizados en el registro de la inspección, y cuándo.

## Seguimiento de las comprobaciones fallidas

Cuando una inspección falla, abra el menú de acciones (el botón
**⋯**
en la barra superior) o el menú de fila en la lista. Las acciones de seguimiento son:

| Acción | Qué hace | Cuándo se ofrece |
|---|---|---|
| **Crear incidencia** | Crea una incidencia para las comprobaciones fallidas en el vehículo y el conductor | La inspección ha fallado y no tiene incidencia vinculada |
| **Crear orden de trabajo** | Abre una orden de trabajo para el vehículo con una lista de comprobos de las comprobaciones fallidas. Si la inspección aún no tiene incidencia, crea la incidencia primero. | La inspección ha fallado y no tiene orden de trabajo vinculada |
| **Resolver** | Marca la inspección como **Resuelto** y registra la hora | La inspección aún no está resuelta |

Cada inspección puede tener una incidencia y una orden de trabajo vinculadas. Una vez que existe una, su acción desaparece del menú, para que no pueda crear una duplicada. Abra la existente en lugar de en la sección
**Seguimiento**
.

### Crear una incidencia o orden de trabajo

Abra la inspección fallida y elija
**Crear incidencia**
o
**Crear orden de trabajo**
del menú de acciones.

Revise la confirmación. Explica qué se creará y enumera las comprobaciones fallidas de las que se crea, junto con su gravedad. También indica cuántas comprobaciones se marcaron como no aptas para operar y, para una orden de trabajo, cuándo vencerá.

Haga clic en
**Crear incidencia**
o
**Crear orden de trabajo**
para confirmar.

La nueva incidencia o orden de trabajo aparece inmediatamente en la sección
**Seguimiento**
de la inspección. Si nada en la inspección falló, la confirmación dice
**No ha fallado nada en esta inspección, por lo que no hay nada que registrar**
y el botón de confirmación no está disponible.

### Qué se crea

La
**prioridad**
de ambos registros es la gravedad más alta entre las comprobaciones fallidas. Si ninguna de las comprobaciones fallidas tiene una gravedad, la prioridad es
**Alta**
.

**La incidencia:**

* Se crea en el vehículo y el conductor de la inspección, informada por la persona a la que se atribuye la inspección.
* Tiene el título
  **Inspección fallida:**
  seguido del nombre del vehículo, o el ID de la inspección si no se registró ningún vehículo.
* Enumera las comprobaciones fallidas en su informe.
* Tiene el estado
  **Pendiente**
  .

**La orden de trabajo:**

* Se abre en el vehículo de la inspección, con el estado
  **Abierta**
  .
* Tiene el título
  **Reparación de inspección:**
  seguido del nombre del vehículo, o el ID de la inspección si no se registró ningún vehículo.
* Tiene un elemento de lista de comprobos para cada comprobación fallida, cada uno requerido.
* Tiene una fecha de vencimiento de
  **1 día**
  si alguna comprobación fallida está
  **Crítico**
  , y en
  **7 días**
  en caso contrario.
* Pide al taller que repare los elementos de la inspección y registre los detalles de finalización.

Trabaje en la incidencia y la orden de trabajo como normalmente lo haría. Consulte
[Incidencias](https://fleetbase.io/docs/fleet-ops/resources/issues/overview)
y
[Ordenes de trabajo](https://fleetbase.io/docs/fleet-ops/maintenance/work-orders/overview)
.

### Resolver una inspección

Elija
**Resolver**
del menú de acciones y confirme con
**Resolver inspección**
. El estado de la inspección se establece en
**Resuelto**
y se establece la hora de
**Resuelto**
.

Resolver la inspección no cierra su incidencia ni su orden de trabajo. Permanecen abiertas hasta que usted las cierre. Resuelva la inspección una vez que se haya completado el seguimiento, y realice el seguimiento de la reparación en la orden de trabajo.

## Encontrar inspecciones en Fleet-Ops

| Lugar | Lo que ve |
|---|---|
| **Vehículos → [Vehículo] → Inspecciones** | El historial de inspecciones del vehículo como tarjetas: el formulario, el resultado, el estado, la hora de presentación, el número de comprobaciones fallidas, la lectura del odómetro y el ID. Haga clic en una tarjeta para abrir la inspección. |
| **Formularios de inspección → [Formulario] → Presentaciones** | Todas las inspecciones presentadas en el formulario, con el vehículo, el conductor, el resultado, el estado, la hora de presentación y el número de comprobaciones fallidas |
| **Incidencias → [Incidencia]** | Una sección
**Inspección vinculada**
que enumera las inspecciones vinculadas. Solo aparece cuando hay una. |
| **Ordenes de trabajo → [Orden de trabajo]** | Una sección
**Inspección vinculada**
que enumera las inspecciones vinculadas. Solo aparece cuando hay una. |
| **Centro de mantenimiento** | Un recuento de
**Inspecciones fallidas**
. Haga clic en él para ir a la lista de inspecciones. |

En
**Inspección vinculada**
, cada inspección se muestra como una ficha. Haga clic en ella para ver un resumen.