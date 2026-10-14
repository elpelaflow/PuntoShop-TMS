---
title: "Realización de inspecciones"
url: https://fleetbase.io/docs/fleet-ops/maintenance/inspections/realizar-inspecciones
module: fleet-ops
---

Inspecciones

# Realización de inspecciones

Rellenar y enviar las inspecciones desde el panel, adjuntar fotos y firmas, y enviar enlaces de inspección de uso único con un PIN a las personas que no utilizan el panel.

# Realización de inspecciones

Existen dos formas de realizar una inspección contra un formulario publicado:

* **Desde el panel**
  — tú o un colega con acceso al panel, rellenan la inspección en
  **Mantenimiento → Inspecciones**
  .
* **A través de un enlace de inspección**
  — tú generas un enlace de uso único y un PIN, y los envías a la persona que realiza la inspección. Esta completa el formulario en un navegador, en un teléfono o en una computadora, sin iniciar sesión en el panel.

## Rellenar una inspección en el panel

Navega a
**Flota → Mantenimiento → Inspecciones**
y haz clic en
**Nuevo**
.

En
**Detalles de la inspección**, elige el
**Formulario**
. Solo los formularios publicados se muestran.

Elige el
**Vehículo**
que se va a inspeccionar y el
**Conductor**, e introduce las lecturas del
**Odómetro**
y las
**Horas del motor**
si las tienes.

Completa cada sección del formulario. Cada
**Aprobado / No aprobado**
debe iniciarse en
**Aprobado**, así que cambia los que no estén aprobados a
**No aprobado**, y los que no apliquen a
**N/A**
. Completa los demás campos según sea necesario.

Para cada inspección fallida, registra los detalles de la falla (consulta
[Registrar una inspección fallida](#registrar-una-inspección-fallida)
).

Haz clic en
**Guardar**
. Esto guarda la inspección (consulta
[Borradores y envío](#borradores-y-envio)
).

Dado que cada
**Aprobado / No aprobado**
debe iniciarse en
**Aprobado**, cualquier inspección que dejes sin completar se registrará como aprobada. Revisa cada inspección antes de guardarla.

Mientras trabajas, la parte inferior del formulario mantiene un registro de
**Aprobado**,
**No aprobado**
y
**N/A**
, así como de los elementos
**por completar**
— campos obligatorios que no se han completado, y las inspecciones fallidas que aún no tienen un comentario o una foto. Una lista de
**Fallos**
reúne todos los detalles de las inspecciones fallidas. Haz clic en
**Revisar**
en un fallo para volver a él. Mientras haya algo por completar, un banner indica el siguiente elemento, con
**Ir a →**
para llevarte allí.

### Registrar una inspección fallida

Cuando elijas
**No aprobado**, se abrirá un panel de fallos junto al cheque, titulado
**Fallo:**
seguido del nombre del cheque. En él puedes:

* Establecer la gravedad:
  **Bajo**,
  **Medio**,
  **Alto**
  o
  **Crítico**
  . Empieza con la gravedad predeterminada del cheque.
* Cambiar
  **No seguro para operar**
  de encendido o apagado. Los cheques configurados para marcar el vehículo como inseguro al fallar, se configuran para que estén encendidos.
* Añadir un comentario sobre lo que está mal y qué necesita.
* Añadir fotos con el
  **+**
  botón.

Haz clic en
**Listo**
para cerrar el panel. El cheque muestra entonces un resumen del fallo — su gravedad, si es inseguro, y cuántas fotos y comentarios tiene. Haz clic en él para editar el fallo de nuevo.

Si el cheque requiere un comentario o una foto al fallar, el panel lo indica (por ejemplo
**Comentario + foto obligatorio al fallar**
), y el fallo se marca como
**Necesita un comentario**
,
**Necesita una foto**
o
**Necesita un comentario y una foto**
hasta que se tengan.

En el panel, los campos obligatorios están marcados, pero no impiden que guardes. Un cheque fallido que falta el comentario o la foto que requiere, sí: Fleet-Ops no aceptará las respuestas hasta que se añadan.

### Fotos y firmas

* **Cheques fallidos**
  — añade fotos en el panel de fallos, como se describe arriba.
* **Campos de foto o archivo**
  — haz clic en
  **Subir foto**
  para adjuntar una imagen.
* **Campos de firma**
  — haz clic en
  **Subir firma**
  para adjuntar una imagen de la firma.

Una vez guardada la inspección, la pestaña
**Fotos**
muestra las fotos adjuntas, y puedes añadir más fotos allí. Consulta
[Revisar y seguimiento](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/reviewing-and-follow-up#the-photos-tab)
.

## Borradores y envío

Una inspección es o bien un
**Borrador**
— comenzada pero no enviada, o enviada. Enviar una inspección establece su estado en
**Enviado**, registra la hora en que se envió, cuenta los cheques aprobados y no aprobados, y calcula su
**Resultado**
.

El campo
**Estado**
de una nueva inspección muestra
**Borrador**
mientras la rellenas. Cuando haces clic en
**Guardar**
con un formulario elegido, las respuestas se guardan y la inspección se envía inmediatamente.

En el panel, guardar una inspección la guarda, aunque su
**Estado**
mostraba
**Borrador**
mientras la rellenabas. Todavía puedes editar las respuestas después, pero una inspección enviada no puede volver a ser un borrador.

Una inspección que sigue siendo un
**Borrador**
muestra
**Enviar**
en el menú de fila de la
**Inspecciones**
lista.
**Enviar**
te pide que confirmes primero:

> **Enviar esta inspección?**
> Esto envía la inspección, marca la hora en que se envió y vuelve a contar los totales de aprobados y no aprobados. No se puede deshacer.

Haz clic en
**Enviar inspección**
para enviarla.
**Enviar**
solo aparece para las inspecciones en
**Borrador**
.

Para cambiar una inspección después de enviarla, ábrela y haz clic en el botón de edición, o elige
**Editar inspección**
desde su menú de fila.

## Enlaces de inspección

Un
**enlace de inspección**
permite a alguien completar un formulario publicado sin iniciar sesión en el panel — un conductor que realiza una inspección antes de comenzar, un contratista o un taller que revisa un vehículo. Cada enlace:

* Funciona
  **una sola vez**
  . Una vez que la inspección se ha enviado, el enlace se cierra.
* Está protegido por un
  **PIN de 6 dígitos**
  . La persona necesita tanto el enlace como el PIN.
* **Tiene una fecha de caducidad**
  — después de 72 horas, a menos que elijas un tiempo diferente.
* Puede ser
  **revocado**
  en cualquier momento.

### Generar un enlace

Abre un formulario publicado en
**Mantenimiento → Formularios de inspección**
y haz clic en
**Generar enlace**
en el encabezado. También puedes elegir
**Generar enlace de inspección**
desde el menú de fila del formulario.

Opcionalmente, elige a quién va dirigido el enlace en
**Asignar a**
. Cualquiera en tu organización puede completar una inspección, y la inspección se atribuye a esa persona.

Opcionalmente, elige el
**Conductor**
y el
**Vehículo**
que se van a inspeccionar. La inspección se registra en ellos.

Comprueba
**Fecha de caducidad**
. Se rellena con una hora 72 horas después. Cambia si necesitas que el enlace esté disponible durante más o menos tiempo.

En
**Enviar el enlace y el PIN**
, elige cómo se lo enviarás a la persona (consulta abajo).

Haz clic en
**Generar enlace**
.

El diálogo muestra entonces
**Enlace generado**
, con el enlace y su PIN, cada uno con un
**Copiar**
botón. El enlace también se copia en tu portapapeles.

Si eliges
**Generar enlace de inspección**
para un formulario que no está publicado, Fleet-Ops te recuerda que
**Publica este formulario de inspección antes de generar un enlace público.**

### Enviar el enlace y el PIN

**Enviar el enlace y el PIN**
tiene tres opciones:

| Opción | Qué pasa |
| --- | --- |
| **No enviar, lo compartiré yo mismo** | Nada se envía. Copia el enlace y el PIN del diálogo y compártelos tú mismo. |
| **Por correo electrónico** | Se envía un correo electrónico con el enlace y el PIN a la persona para la que se ha creado el enlace. |
| **Por mensaje de texto** | Se envía un mensaje de texto con el enlace y el PIN a la persona para la que se ha creado el enlace. |

La persona para la que se ha creado el enlace es el usuario que elegiste en
**Asignar a**
o, si no elegiste a nadie, la cuenta del conductor elegido.
**Por correo electrónico**
y
**Por mensaje de texto**
solo están disponibles una vez que hayas elegido uno de ellos. Si esa persona no tiene una dirección de correo electrónico o número de teléfono para la opción que has elegido, el enlace no se genera y Fleet-Ops te lo informa. Cuando se envía el mensaje, aparece una confirmación como
**Enviado por correo electrónico**
a una dirección de correo electrónico parcialmente oculta. Si el envío falla por otra razón, el enlace sigue creado y puedes compartir el enlace y el PIN.

El correo electrónico tiene el título
**Completa la**
*[nombre del formulario]*
**inspección**
. Indica quién ha solicitado la inspección y, si lo has hecho, el vehículo, y contiene un
**Abrir inspección**
botón y el PIN. También advierte que el enlace se bloquea después de demasiados PINs incorrectos, y proporciona el tiempo de caducidad.

Cualquiera que tenga tanto el enlace como el PIN puede completar la inspección. Cuando los compartes tú mismo, es preferible enviar el PIN por una vía diferente al enlace, por ejemplo, el enlace por correo electrónico y el PIN por mensaje de texto.

### Gestionar enlaces

Todos los enlaces generados para un formulario se muestran en
**Enlaces generados**
en el diálogo, y en
**Enlaces públicos**
en la pestaña
**Resumen**
del formulario. Cada enlace muestra:

* Su estado (ver abajo), a quién va dirigido (o
  **Cualquiera con el enlace y su PIN**
  ), y cuándo se generó.
* El enlace, con
  **Copiar**
  botón.
* Para enlaces activos: el PIN, con
  **Copiar**
  botón, así como
  **Enviar por correo electrónico**
  y
  **Enviar por mensaje de texto**
  para reenviar el enlace y el PIN, cuando el destinatario tenga una dirección de correo electrónico o número de teléfono.
* Cuándo caduca, y cuándo se ha
  **Usado**
  o
  **Se ha abierto por última vez**
  (o
  **Nunca se ha abierto**
  ).
* Cuándo se ha
  **Enviado por correo electrónico**
  o
  **Enviado por mensaje de texto**
  , y cuántos PINs incorrectos se han introducido.
* **Revocar**
  , para enlaces activos. Revocar tiene efecto inmediatamente.

| Estado | Significado |
| --- | --- |
| **Activo** | El enlace puede abrirse y la inspección puede completarse. |
| **Usado** | La inspección se ha completado a través de este enlace, por lo que está cerrado. |
| **Caducado** | El tiempo de caducidad ha pasado sin que se haya utilizado el enlace. |
| **Revocado** | Has revocado el enlace. |
| **Bloqueado** | Se han introducido demasiados PINs incorrectos. Genera un nuevo enlace. |

### Lo que ve el destinatario

Abre el enlace y ve
**Introduce tu PIN**
. Introduce el PIN de 6 dígitos y haz clic en
**Continuar**
.

Se abre el formulario con su nombre y descripción, y muestra a quién va dirigida la inspección, el
**Vehículo**
, el
**Conductor**
y cuándo el enlace
**Caduca**
.

Completa los campos del formulario, cambiando cualquier
**Aprobado / No aprobado**
de
**Aprobado**
, y añade fotos según sea necesario.

En
**Firmar**
, puedes escribir
**Tu nombre**
, que se registrará en la inspección como quien la completó.

Haz clic en
**Enviar inspección**
.

**Enviar la inspección**
permanece inaccesible hasta que se hayan respondido todos los campos requeridos y que cada verificación fallida tenga el comentario o la foto que necesita. Un mensaje junto al botón indica qué falta, por ejemplo:
**Faltan 2 respuestas requeridas**
.

Después de enviarla, se muestra
**Inspección enviada**
y un mensaje que indica que el enlace ya no está disponible.

Un PIN incorrecto muestra
**Este PIN no es correcto**
, junto con el número de intentos restantes. Después de 5 PINs incorrectos, el enlace se bloquea y la persona debe pedirle uno nuevo. Un enlace que ha caducado, ha sido revocado o ya ha sido utilizado, o cuyo formulario ya no está publicado, muestra
**Esta inspección no está disponible**
.

### Qué se registra

Una inspección enviada a través de un enlace se registra inmediatamente con el estado
**Enviado**
. Se registra en relación con el conductor y el vehículo asociados al enlace, y se atribuye a la persona a la que va dirigido el enlace. El campo
**Enviado por**
muestra
**A través de un enlace público, PIN verificado**
. Si el nombre introducido en
**Confirmar**
diferencia del nombre de la persona, también se muestra, como
**Confirmado como**
seguido del nombre introducido. Si el enlace no va dirigido a nadie,
**Enviado por**
muestra el nombre introducido, marcado como
**Nombre introducido, no un cuenta con inicio de sesión**
.

Si el formulario tiene
**Crear un registro de defecto cuando un artículo falla**
o
**Crear una orden de trabajo cuando un artículo falla**
activado y la inspección tiene fallos, el problema o la orden de trabajo se crean al mismo tiempo. Consulte
[Revisar y seguimiento](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/reviewing-and-follow-up)
para ver qué contienen.