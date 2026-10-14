---
title: "Formularios de inspección"
url: https://fleetbase.io/docs/fleet-ops/maintenance/inspections/inspection-forms
module: fleet-ops
---

Inspecciones

# Formularios de inspección

Cree listas de verificación a partir de grupos de campos y campos de texto, decida qué cuenta como un fallo, y publique formularios para utilizarlos en la consola y a través de enlaces de inspección.

# Formularios de inspección

Un
**Formulario de inspección**
es la lista de verificación que se completa durante la inspección. Lo crea a partir de
**grupos de campos**, como
*Exterior*,
*Cabina*, o
*Frenos*, y cada grupo contiene los campos para responder.
Los campos
**Aprobado / No Aprobado**
son las comprobaciones que determinan si la inspección es aprobada o no. Otros tipos de campos recopilan detalles de apoyo como lecturas, notas, fotos y firmas.

Administre los formularios en
**Fleet-Ops → Mantenimiento → Formularios de inspección**
.

## Crear un formulario

Vaya a
**Fleet-Ops → Mantenimiento → Formularios de inspección**
y haga clic en
**Nuevo**
.

En
**Detalles del formulario**, introduzca un
**Nombre**
(por ejemplo,
*Inspección diaria del vehículo*
), elija un
**Tipo**, y añada una
**Descripción**
de lo que cubre la inspección.

Deje
**Estado**
en
**Borrador**
mientras crea el formulario.

Revise las
**Opciones**
(ver
[Opciones del formulario](#form-settings)
a continuación).

En el
**Constructor de formularios**, haga clic en
**Nuevo grupo de campos**, y luego añada campos a él con
**Nuevo campo**
. Repita para cada grupo.

Haga clic en
**Guardar**
.

Cuando el formulario esté listo,
[publíquelo](#publishing-a-form)
para que pueda utilizarse.

## Detalles del formulario

| Campo | Descripción |
|---|---|
| **Nombre** | El nombre del formulario, que se muestra donde se enumeran las inspecciones |
| **Tipo** | El tipo de inspección (ver abajo) |
| **Estado** | **Borrador**, **Publicado** o **Archivado** |
| **Descripción** | Lo que cubre la inspección. Se muestra en la parte superior de la página que alguien abre desde un enlace de inspección. |

### Tipos de formulario

La etiqueta
**Tipo**
etiqueta el formulario para que pueda ordenar y filtrar sus formularios. No cambia cómo funciona el formulario.

| Tipo | Úsalo para |
|---|---|
| **DVIR** | Informe de inspección del vehículo del conductor — la inspección diaria que el conductor firma |
| **Pre-Viaje** | Comprobaciones realizadas antes de que el vehículo salga |
| **Post-Viaje** | Comprobaciones realizadas cuando el vehículo regresa |
| **Pre-Operacional** | Comprobaciones realizadas antes de que comience la operación |
| **Post-Operacional** | Comprobaciones realizadas después de que finalice la operación |
| **Inspección de seguridad** | Una inspección exhaustiva de seguridad y cumplimiento |
| **Inspección de mantenimiento** | Una comprobación y inspección de mantenimiento programada |
| **Evaluación de daños** | Evaluar daños o el estado del vehículo |
| **Inspección anual** | Una inspección completa del vehículo anual |
| **Seguridad** | Una lista de verificación de seguridad general |
| **Cumplimiento** | Una lista de verificación regulatoria o de auditoría |
| **Mantenimiento** | Una lista de verificación para un taller o técnico |

### Estados del formulario

| Estado | Significado |
|---|---|
| **Borrador** | Todavía está en curso. No se puede elegir para una nueva inspección o compartir a través de un enlace. |
| **Publicado** | Disponible para nuevas inspecciones en la consola y a través de enlaces de inspección. |
| **Archivado** | Retirado. Se conserva para las inspecciones ya registradas. |

## Opciones del formulario

La sección
**Opciones**
tiene tres casillas de verificación. En un nuevo formulario, están configuradas de la siguiente manera:

| Opción | Valor predeterminado | Qué hace |
|---|---|---|
| **Abrir un registro de fallo cuando un elemento falla** | En | Cuando una inspección enviada a través de un enlace de inspección tiene una comprobación fallida, se crea automáticamente un problema para el vehículo. |
| **Abrir una orden de trabajo cuando un elemento falla** | Desactivado | Cuando una inspección enviada a través de un enlace de inspección tiene una comprobación fallida, se abre automáticamente una orden de trabajo, con las comprobaciones fallidas como su lista de verificación. |
| **Requerir que el conductor firme** | En | No se aplica a las inspecciones registradas en la consola o a través de un enlace de inspección. Para recopilar una firma, añada un campo de **Firma** requerido (ver abajo). |

Los problemas y las órdenes de trabajo automáticas solo se crean para las inspecciones enviadas a través de un enlace de inspección. Para una inspección registrada en la consola, cree uno usted mismo con
**Crear problema**
o
**Crear orden de trabajo**
. Consulte
[Seguimiento y seguimiento](#following-up-failed-checks)
.

Para asegurarse de que cada inspección tenga una firma, añada un campo de
**Firma**
al formulario y márquelo como requerido.

## Crear el formulario

Vaya a
**Fleet-Ops → Mantenimiento → Formularios de inspección**
y haga clic en
**Nuevo**
.

En
**Detalles del formulario**, introduzca un
**Nombre**
(por ejemplo,
*Inspección diaria del vehículo*
), elija un
**Tipo**, y añada una
**Descripción**
de lo que cubre la inspección.

Deje
**Estado**
en
**Borrador**
mientras crea el formulario.

Revise las
**Opciones**
(ver
[Opciones del formulario](#form-settings)
a continuación).

En el
**Constructor de formularios**, haga clic en
**Nuevo grupo de campos**, y luego añada campos a él con
**Nuevo campo**
. Repita para cada grupo.

Haga clic en
**Guardar**
.

Cuando el formulario esté listo,
[publíquelo](#publishing-a-form)
para que pueda utilizarse.

## Detalles del formulario

| Campo | Descripción |
|---|---|
| **Nombre** | El nombre del formulario, que se muestra donde se enumeran las inspecciones |
| **Tipo** | El tipo de inspección (ver abajo) |
| **Estado** | **Borrador**, **Publicado** o **Archivado** |
| **Descripción** | Lo que cubre la inspección. Se muestra en la parte superior de la página que alguien abre desde un enlace de inspección. |

### Tipos de formulario

La etiqueta
**Tipo**
etiqueta el formulario para que pueda ordenar y filtrar sus formularios. No cambia cómo funciona el formulario.

| Tipo | Úsalo para |
|---|---|
| **DVIR** | Informe de inspección del vehículo del conductor — la inspección diaria que el conductor firma |
| **Pre-Viaje** | Comprobaciones realizadas antes de que el vehículo salga |
| **Post-Viaje** | Comprobaciones realizadas cuando el vehículo regresa |
| **Pre-Operacional** | Comprobaciones realizadas antes de que comience la operación |
| **Post-Operacional** | Comprobaciones realizadas después de que finalice la operación |
| **Inspección de seguridad** | Una inspección exhaustiva de seguridad y cumplimiento |
| **Inspección de mantenimiento** | Una comprobación y inspección de mantenimiento programada |
| **Evaluación de daños** | Evaluar daños o el estado del vehículo |
| **Inspección anual** | Una inspección completa del vehículo anual |
| **Seguridad** | Una lista de verificación de seguridad general |
| **Cumplimiento** | Una lista de verificación regulatoria o de auditoría |
| **Mantenimiento** | Una lista de verificación para un taller o técnico |

### Estados del formulario

| Estado | Significado |
|---|---|
| **Borrador** | Todavía está en curso. No se puede elegir para una nueva inspección o compartir a través de un enlace. |
| **Publicado** | Disponible para nuevas inspecciones en la consola y a través de enlaces de inspección. |
| **Archivado** | Retirado. Se conserva para las inspecciones ya registradas. |

## Opciones del formulario

La sección
**Opciones**
tiene tres casillas de verificación. En un nuevo formulario, están configuradas de la siguiente manera:

| Opción | Valor predeterminado | Qué hace |
|---|---|---|
| **Abrir un registro de fallo cuando un elemento falla** | En | Cuando una inspección enviada a través de un enlace de inspección tiene una comprobación fallida, se crea automáticamente un problema para el vehículo. |
| **Abrir una orden de trabajo cuando un elemento falla** | Desactivado | Cuando una inspección enviada a través de un enlace de inspección tiene una comprobación fallida, se abre automáticamente una orden de trabajo, con las comprobaciones fallidas como su lista de verificación. |
| **Requerir que el conductor firme** | En | No se aplica a las inspecciones registradas en la consola o a través de un enlace de inspección. Para recopilar una firma, añada un campo de **Firma** requerido (ver abajo). |

Los problemas y las órdenes de trabajo automáticas solo se crean para las inspecciones enviadas a través de un enlace de inspección. Para una inspección registrada en la consola, cree uno usted mismo con
**Crear problema**
o
**Crear orden de trabajo**
. Consulte
[Seguimiento y seguimiento](#following-up-failed-checks)
.

Para asegurarse de que cada inspección tenga una firma, añada un campo de
**Firma**
al formulario y márquelo como requerido.

## Construir el formulario

El
**Constructor de formularios**
organiza el formulario como una lista de grupos de campos. Cada grupo es una sección de la inspección, y sus campos se muestran en una cuadrícula.

### Grupos de campos

Haga clic en
**Nuevo grupo de campos**
para añadir un grupo, y luego configure:

* **Nombre del grupo**
  — el encabezado de la sección, por ejemplo
  *Exterior*
  .
* **Descripción del grupo**
  — lo que cubre el grupo.
* **Columnas**
  — organice los campos del grupo en
  **1**,
  **2**
  o
  **3**
  columnas.

Utilice los botones de flecha para
**Mover arriba**
o
**Mover abajo**
un grupo, y el botón de basura para eliminarlo. Eliminar un grupo también elimina todos los campos que contiene.

### Añadir un campo

Haga clic en
**Nuevo campo**
dentro de un grupo, rellene la configuración del campo, y haga clic en
**Guardar campo**
. Cada campo tiene:

| Opción | Descripción |
|---|---|
| **Etiqueta del campo** | La pregunta o comprobación, por ejemplo *Luces de freno* |
| **Nombre del campo** | Un nombre interno para el campo. Se rellena automáticamente a partir de la etiqueta, por lo que normalmente no necesita cambiarlo. |
| **Tipo de campo** | El tipo de respuesta que toma el campo (ver abajo) |
| **Descripción del campo** | Lo que se debe comprobar, y lo que significa un resultado correcto. Se muestra junto con el campo cuando se completa la inspección. |
| **Campo requerido** | El campo debe responderse antes de que se pueda enviar un enlace de inspección. Los campos requeridos muestran una estrella roja. Los campos
**Aprobado / No Aprobado**
y
**Sí / No**
siempre tienen una respuesta, por lo que esto es más importante para los otros tipos. |
| **Rango de columnas** | Cuántas de las columnas del grupo toma el campo: **1**, **2** o **3** |

En el constructor, utilice los botones de flecha para reordenar los campos dentro de un grupo, el lápiz para editar un campo, y el botón de basura para eliminarlo.

### Tipos de campo

| Tipo de campo | Respuesta | Cuándo utilizarlo |
|---|---|---|
| **Aprobado / No Aprobado** | **Aprobado**, **No Aprobado** o **N/A** | Cada elemento que el inspector comprueba. Estos son los únicos campos que determinan el resultado de la inspección. |
| **Texto** | Una línea de texto corta | Detalles cortos, como un número de remolque o un número de serie |
| **Texto largo** | Una nota multilínea | Comentarios o observaciones generales |
| **Número** | Un número, con una unidad opcional | Lecturas como la presión de los neumáticos, el nivel de combustible o el cuentagotas |
| **Seleccionar** | Una opción de una lista desplegable | Elegir de una lista más larga que defina, como las calificaciones de las condiciones de los neumáticos |
| **Botones de radio** | Una opción de botones colocados uno al lado del otro | Elegir de una lista corta que defina |
| **Sí / No** | Un interruptor | Preguntas simples de sí o no que no cuentan como aprobado o no aprobado, como *Extintor presente* |
| **Fecha** | Una fecha | Fechas como una fecha de permiso o certificado |
| **Fecha y hora** | Una fecha y hora | Cuando se comprueba o ocurre algo |
| **Foto o archivo** | Una imagen subida | Una foto del vehículo, de daños o de una lectura del panel de instrumentos |
| **Firma** | Una imagen de una firma subida | La firma del inspector o del conductor |

Los campos
**Seleccionar**
y
**Botones de radio**
necesitan
**Opciones de campo**: añada cada opción y haga clic en
**Añadir**
.

Los campos
**Número**
tienen dos configuraciones adicionales:

* **Unidad**
  — que se muestra junto al número, por ejemplo
  *km*
  o
  *horas*
  .
* **Este es el cuentagotas**
  — cuando rellena una inspección en la consola, la respuesta se copia en el
  **Cuentagotas**
  del propio
  **Inspección**
  .

## Cómo se determinan los fallos

Solo los campos
**Aprobado / No Aprobado**
determinan el resultado:

* Una inspección es
  **No aprobada**
  si cualquier
  **Aprobado / No Aprobado**
  campo se responde
  **No Aprobado**
  .
* De lo contrario, es
  **Aprobado**
  .
*
  **N/A**
  no cuenta como un fallo. Úselo para las comprobaciones que no se aplican al vehículo que se está inspeccionando, como una grúa en un vehículo que no tiene una.

Cada
**Aprobado / No Aprobado**
campo tiene una sección
**En caso de fallo**
que establece lo que significa un fallo y lo que el inspector debe proporcionar antes de que se acepte:

| Opción | Qué hace |
|---|---|---|
| **Severidad predeterminada** | La severidad con la que comienza un fallo: **Bajo**, **Medio**, **Alto** o **Crítico** . El inspector puede cambiarla. |
| **Requerir una foto en caso de fallo** | Una respuesta fallida no se acepta sin al menos una foto. |
| **Requerir un comentario en caso de fallo** | Una respuesta fallida no se acepta sin un comentario que diga qué está mal. |
| **Marcar el vehículo como inseguro en caso de fallo** | Una respuesta fallida se marca como
  **No apto para circular**
  por defecto, que es lo que es un defecto de fuera de servicio. El inspector puede cambiarlo. |
| **Instrucciones** | Cómo realizar la comprobación, que se muestra al inspector junto con el campo. |

La severidad importa más adelante: un problema o una orden de trabajo creados a partir de la inspección tienen la mayor severidad entre sus comprobaciones fallidas, y un
**Crítico**
fallo hace que la orden de trabajo esté pendiente antes. Consulte
[Seguimiento y seguimiento](#following-up-failed-checks)
.

Para asegurarse de que cada inspección tenga una firma, añada un campo de
**Firma**
al formulario y márquelo como requerido.

## Construir el formulario

El
**Constructor de formularios**
organiza el formulario como una lista de grupos de campos. Cada grupo es una sección de la inspección, y sus campos se muestran en una cuadrícula.

### Grupos de campos

Haga clic en
**Nuevo grupo de campos**
para añadir un grupo, y luego configure:

* **Nombre del grupo**
  — el encabezado de la sección, por ejemplo
  *Exterior*
  .
* **Descripción del grupo**
  — lo que cubre el grupo.
* **Columnas**
  — organice los campos del grupo en
  **1**,
  **2**
  o
  **3**
  columnas.

Utilice los botones de flecha para
**Mover arriba**
o
**Mover abajo**
un grupo, y el botón de basura para eliminarlo. Eliminar un grupo también elimina todos los campos que contiene.

### Añadir un campo

Haga clic en
**Nuevo campo**
dentro de un grupo, rellene la configuración del campo, y haga clic en
**Guardar campo**
. Cada campo tiene:

| Opción | Descripción |
|---|---|
| **Etiqueta del campo** | La pregunta o comprobación, por ejemplo *Luces de freno* |
| **Nombre del campo** | Un nombre interno para el campo. Se rellena automáticamente a partir de la etiqueta, por lo que normalmente no necesita cambiarlo. |
| **Tipo de campo** | El tipo de respuesta que toma el campo (ver abajo) |
| **Descripción del campo** | Lo que se debe comprobar, y lo que significa un resultado correcto. Se muestra junto con el campo cuando se completa la inspección. |
| **Campo requerido** | El campo debe responderse antes de que se pueda enviar un enlace de inspección. Los campos requeridos muestran una estrella roja. Los campos
**Aprobado / No Aprobado**
y
**Sí / No**
siempre tienen una respuesta, por lo que esto es más importante para los otros tipos. |
| **Rango de columnas** | Cuántas de las columnas del grupo toma el campo: **1**, **2** o **3** |

En el constructor, utilice los botones de flecha para reordenar los campos dentro de un grupo, el lápiz para editar un campo, y el botón de basura para eliminarlo.

### Tipos de campo

| Tipo de campo | Respuesta | Cuándo utilizarlo |
|---|---|---|
| **Aprobado / No Aprobado** | **Aprobado**, **No Aprobado** o **N/A** | Cada elemento que el inspector comprueba. Estos son los únicos campos que determinan el resultado de la inspección. |
| **Texto** | Una línea de texto corta | Detalles cortos, como un número de remolque o un número de serie |
| **Texto largo** | Una nota multilínea | Comentarios o observaciones generales |
| **Número** | Un número, con una unidad opcional | Lecturas como la presión de los neumáticos, el nivel de combustible o el cuentagotas |
| **Seleccionar** | Una opción de una lista desplegable | Elegir de una lista más larga que defina, como las calificaciones de las condiciones de los neumáticos |
| **Botones de radio** | Una opción de botones colocados uno al lado del otro | Elegir de una lista corta que defina |
| **Sí / No** | Un interruptor | Preguntas simples de sí o no que no cuentan como aprobado o no aprobado, como *Extintor presente* |
| **Fecha** | Una fecha | Fechas como una fecha de permiso o certificado |
| **Fecha y hora** | Una fecha y hora | Cuando se comprueba o ocurre algo |
| **Foto o archivo** | Una imagen subida | Una foto del vehículo, de daños o de una lectura del panel de instrumentos |
| **Firma** | Una imagen de una firma subida | La firma del inspector o del conductor |

Los campos
**Seleccionar**
y
**Botones de radio**
necesitan
**Opciones de campo**: añada cada opción y haga clic en
**Añadir**
.

Los campos
**Número**
tienen dos configuraciones adicionales:

* **Unidad**
  — que se muestra junto al número, por ejemplo
  *km*
  o
  *horas*
  .
* **Este es el cuentagotas**
  — cuando rellena una inspección en la consola, la respuesta se copia en el
  **Cuentagotas**
  del propio
  **Inspección**
  .

## Cómo se determinan los fallos

Solo los campos
**Aprobado / No Aprobado**
determinan el resultado:

* Una inspección es
  **No aprobada**
  si cualquier
  **Aprobado / No Aprobado**
  campo se responde
  **No Aprobado**
  .
* De lo contrario, es
  **Aprobado**
  .
*
  **N/A**
  no cuenta como un fallo. Úselo para las comprobaciones que no se aplican al vehículo que se está inspeccionando, como una grúa en un vehículo que no tiene una.

Cada
**Aprobado / No Aprobado**
campo tiene una sección
**En caso de fallo**
que establece lo que significa un fallo y lo que el inspector debe proporcionar antes de que se acepte:

| Opción | Qué hace |
|---|---|---|
| **Severidad predeterminada** | La severidad con la que comienza un fallo: **Bajo**, **Medio**, **Alto** o **Crítico** . El inspector puede cambiarla. |
| **Requerir una foto en caso de fallo** | Una respuesta fallida no se acepta sin al menos una foto. |
| **Requerir un comentario en caso de fallo** | Una respuesta fallida no se acepta sin un comentario que diga qué está mal. |
| **Marcar el vehículo como inseguro en caso de fallo** | Una respuesta fallida se marca como
  **No apto para circular**
  por defecto, que es lo que es un defecto de fuera de servicio. El inspector puede cambiarlo. |
| **Instrucciones** | Cómo realizar la comprobación, que se muestra al inspector junto con el campo. |

La severidad importa más adelante: un problema o una orden de trabajo creados a partir de la inspección tienen la mayor severidad entre sus comprobaciones fallidas como su prioridad, y un
**Crítico**
fallo hace que la orden de trabajo esté pendiente antes. Consulte
[Seguimiento y seguimiento](#following-up-failed-checks)
.

Para asegurarse de que cada inspección tenga una firma, añada un campo de
**Firma**
al formulario y márquelo como requerido.

## Publicar un formulario

Un formulario debe estar
**Publicado**
antes de que pueda elegirlo para una nueva inspección o generar un enlace de inspección para él.

Para publicar un borrador, abra el formulario y haga clic en
**Publicar**
en la parte superior, o elija
**Publicar**
del menú de fila del formulario en la lista. Una vez que el formulario está publicado, el botón
**Publicar**
se reemplaza por
**Generar enlace**
y la fecha de
**Publicado**
del formulario se establece.

Para retirar un formulario que ya no necesita, elija
**Archivar**
de su menú de fila. Los formularios archivados no se pueden utilizar para nuevas inspecciones ni enlaces, y las inspecciones ya registradas en ellos se conservan.

## Ver un formulario

Haga clic en un formulario en la lista para abrirlo. El formulario tiene dos pestañas:

* **Descripción general**
  — el nombre del formulario,
  **Estado**,
  **Tipo**, el número de
  **Campos**, la fecha de
  **Publicación**, y la
  **Descripción**; los
  **Enlaces públicos** del formulario; y la
  **Estructura del formulario**, que enumera cada grupo y sus campos, junto con su tipo y nivel de severidad predeterminado.
* **Presentaciones**
  — cada inspección realizada contra este formulario, de la más reciente a la más antigua, mostrando el vehículo, el resultado, el estado, el conductor, la hora de presentación y el número de fallos. Haga clic en uno para abrirlo.

La lista de formularios muestra el
**Nombre**
,
**Tipo**
,
**Estado**
, el número de
**Elementos**
, y la fecha de creación de cada formulario. El menú de la fila ofrece
**Ver formulario**,
**Editar formulario**,
**Publicar**,
**Archivar**,
**Generar enlace de inspección**, y
**Eliminar formulario**.

## Editar un formulario

Abra el formulario y haga clic en el botón de edición, o seleccione
**Editar formulario**
en su menú de fila. Puede editar un formulario en cualquier momento, incluso después de que se haya publicado y se hayan realizado inspecciones. Los cambios se aplican tan pronto como se guarden.

Las inspecciones que ya se han realizado se muestran utilizando el formulario tal como es. Cambiar el nombre de un campo o grupo, o añadir un campo, modifica la forma en que se leen las inspecciones existentes.

Eliminar un campo también elimina todas las respuestas que se hayan realizado contra él, y eliminar un grupo elimina todos sus campos. Esto no se puede deshacer una vez que se ha guardado el formulario. Para dejar de utilizar un formulario sin perder su historial, archívalo y cree uno nuevo.

[Inspecciones

Cree listas de verificación de inspección, rellénelas desde la consola o a través de un enlace seguro, y convierta las inspecciones fallidas en problemas y órdenes de trabajo.](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview)
[Realizar inspecciones

Rellene y envíe inspecciones desde la consola, adjunte fotos y firmas, y envíe enlaces de inspección de uso único con un PIN a las personas que no utilizan la consola.](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/conducting-inspections)