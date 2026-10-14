---
título: "Inspecciones"
url: https://fleetbase.io/docs/fleet-ops/maintenance/inspections/overview
módulo: fleet-ops
---

Inspecciones

# Inspecciones

Cree listas de verificación de inspección, rellénelas desde el panel de control o a través de un enlace seguro, y convierta las inspecciones fallidas en incidencias y órdenes de trabajo.

# Inspecciones

**Inspecciones**
le permiten verificar los vehículos según una lista de verificación estándar y registrar todos los resultados. Úselas para inspecciones diarias, comprobaciones antes y después del viaje, auditorías de seguridad y cumplimiento, o evaluaciones de daños.

Un registro de inspecciones consistente le ayuda a:

* **Cumplir con las normativas**
  — cada inspección se almacena con quién la realizó, cuándo, las respuestas proporcionadas y cualquier foto o firma.
* **Mantener los vehículos seguros**
  — una inspección fallida puede marcarse como
  **No apto para su uso**
  , para que los problemas se identifiquen antes del próximo viaje.
* **Detectar defectos de forma temprana**
  — las inspecciones fallidas se convierten en incidencias y órdenes de trabajo con un solo clic, por lo que nada se pierde.

Encontrará las inspecciones en
**Fleet-Ops → Mantenimiento**
, en dos elementos de menú:
**Formularios de inspección**
y
**Inspecciones**
.

## Términos clave

| Término | ¿Qué significa? |
|---|---|
| **Formulario de inspección** | La lista de verificación que usted diseña: grupos de campos (como *Exterior* o *Frenos*) que contienen los campos para responder. Un formulario es **Borrador**, **Publicado** o **Archivado**. |
| **Inspección** | Una ejecución completa de un formulario, registrada para un vehículo y un conductor. La página de detalles de la inspección se titula según el formulario, por ejemplo *Inspección diaria* . |
| **Enlace de inspección** | Un enlace de uso único, protegido por un PIN de 6 dígitos, que permite a alguien completar un formulario publicado sin iniciar sesión en el panel de control. |
| **Seguimiento** | La incidencia o la orden de trabajo derivada de las inspecciones fallidas, y la resolución de la inspección una vez que se ha iniciado el seguimiento. |

## ¿Cómo funcionan las inspecciones?

**Cree un formulario**
→
**Realice la inspección**
(en el panel de control, o a través de un enlace de inspección) →
**Envíe**
→
**Revise el resultado**
→
**Realice un seguimiento de las inspecciones fallidas**
→
**Rastree la solución en la incidencia o la orden de trabajo**

1. **Cree un formulario.**
   Agrupe los elementos a verificar y agregue un campo para cada uno.
   Los campos **Sí/No** determinan si una inspección es válida. Publique el formulario cuando esté listo.
2. **Realice la inspección.**
   Rellénelo usted mismo desde
   **Mantenimiento → Inspecciones**
   , o genere un enlace de inspección y envíelo, junto con su PIN, a la persona que realiza la inspección.
3. **Envíe.**
   Al registrar la inspección, se registra el tiempo y se cuentan las inspecciones válidas y no válidas.
4. **Revise el resultado.**
   Cada inspección muestra un
   **Resultado**
   de
   **Válido**
   o
   **No válido**, el número de inspecciones no válidas, las respuestas, las fotos y quién la realizó.
5. **Realice un seguimiento.**
   Cree una incidencia o una orden de trabajo a partir de las inspecciones no válidas. Los formularios también pueden crear automáticamente una incidencia o una orden de trabajo cuando se envía un enlace de inspección.
6. **Rastree la solución.**
   La incidencia y la orden de trabajo hacen referencia a la inspección, y la inspección hace referencia a ellas. Resuelva la inspección una vez que se haya iniciado el seguimiento.

## Dónde se encuentran las inspecciones

* **Mantenimiento → Inspecciones**
  — cada inspección, con su resultado y el número de inspecciones no válidas.
* **Formularios de inspección → [Formulario] → Subidas**
  — cada inspección registrada contra ese formulario.
* **Vehículos → [Vehículo] → Inspecciones**
  — el historial de inspecciones del vehículo.
* **Incidencias**
  y
  **Órdenes de trabajo**
  — una sección
  **Inspección relacionada**
  en cualquier incidencia o orden de trabajo derivada de una inspección.
* **Centro de mantenimiento**
  — un
  **Número de inspecciones no válidas**
  que le lleva a la lista de inspecciones.
* **Radar**
  — inspecciones no válidas que aún no tienen incidencia o orden de trabajo, el seguimiento sigue abierto, los formularios que aún no se han enviado y los enlaces de inspección que están a punto de caducar.

## Permisos

Los formularios de inspección y las inspecciones tienen sus propios permisos, que puede conceder a través de roles y políticas en
[Identidad y acceso](https://fleetbase.io/docs/platform/identity-and-access/roles-and-permissions)
. Además de los permisos habituales de vista, creación, actualización y eliminación, los formularios tienen permisos separados para
**publicar**
y
**archivar**, y las inspecciones tienen permisos separados para
**enviar**,
**crear incidencia**,
**crear orden de trabajo**
y
**resolver**. Las acciones para las que no tiene permiso están ocultas en el panel de control.

Las políticas integradas
**MaintenanceManager**
y
**OperationsAdmin**
incluyen el acceso completo a los formularios de inspección e inspecciones.

## En esta sección

| Página | ¿Qué cubre? |
|---|---|
| [**Formularios de inspección](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/inspection-forms)** | Crear un formulario, grupos de campos, tipos de campos, reglas de fallo, publicar y editar |
| [**Realizar inspecciones](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/conducting-inspections)** | Rellenar una inspección en el panel de control, borradores y envío, fotos y firmas, y enlaces de inspección |
| [**Revisar y seguimiento](https://fleetbase.io/docs/fleet-ops/maintenance/inspections/reviewing-and-follow-up)** | Leer los resultados, crear incidencias y órdenes de trabajo a partir de las inspecciones fallidas, resolver y encontrar inspecciones en Fleet-Ops |

Los desarrolladores pueden registrar y leer inspecciones a través de la
[API de inspecciones](https://fleetbase.io/docs/api/fleetbase/inspections)
.