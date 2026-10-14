---
title: "Problemas"
url: https://fleetbase.io/docs/fleet-ops/recursos/problemas/vista_general
module: fleet-ops
---

Problemas

# Problemas

Registre, rastree y resuelva los problemas operativos: fallas del vehículo, incidentes del conductor, accidentes y excepciones de entrega, con seguimiento de la prioridad y el estado.

# Problemas

**Problemas**
son incidentes, fallas y excepciones que deben ser registrados y resueltos. Los conductores pueden informar de los problemas desde la aplicación Navigator, y los operadores pueden registrarlos desde el panel. Los problemas están vinculados al conductor, el vehículo o la ubicación involucrados y se rastrean a través de un flujo de trabajo de resolución.

![Lista de problemas — título del problema, categoría, etiqueta de prioridad, estado, asignado a y fecha de informe](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-lista-de-problemas.1f633f00.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Categorías de problemas

| Categoría | Ejemplos |
|---|---|
| **Mecánica** | Fallo, neumático pinchado, fallo del motor, luz de advertencia |
| **Accidente** | Colisión, incidente, daños al vehículo |
| **Comportamiento** | Exceso de velocidad, conducción insegura, queja del cliente |
| **Tráfico** | Infracción de tráfico, multa de aparcamiento |
| **Combustible** | Discrepancia en el combustible, sospecha de robo |
| **Mantenimiento** | Servicio pendiente, fallo de piezas |
| **Dispositivo** | Rastreador GPS sin conexión, OBD-II desconectado |
| **Cliente** | Entrega fallida, problema de acceso, dirección incorrecta |

## Niveles de prioridad de los problemas

| Prioridad | Expectativa de respuesta |
|---|---|
| **Baja** | No se requiere acción inmediata |
| **Media** | Se debe resolver durante el día laboral |
| **Alta** | Se debe resolver en la hora |
| **Crítica** | Se requiere una respuesta inmediata: vehículo fuera de servicio |

## Atributos de los problemas

| Campo | Descripción |
|---|---|
| **Título** | Breve descripción del problema |
| **Informe** | Descripción detallada |
| **Categoría** | Tipo de problema (mecánico, de comportamiento, etc.) |
| **Prioridad** | baja, media, alta, crítica |
| **Conductor** | Conductor involucrado en el incidente |
| **Vehículo** | Vehículo involucrado (si corresponde) |
| **Ubicación** | Coordenadas GPS donde ocurrió el problema |
| **Etiquetas** | Etiquetas para filtrar y categorizar |
| **Reportado por** | Quién registró el problema (conductor o operador) |
| **Asignado a** | Quién es responsable de resolverlo |
| **Estado** | Etapa actual de resolución |
| **Resuelto a** | Marca de tiempo cuando se cerró el problema |

## Estados de los problemas

`estado`
es una cadena libre de formato: los operadores pueden utilizar cualquier valor. Los nuevos problemas tienen como valor predeterminado
**`pendiente`**
si no se proporciona ningún estado. Los valores comunes utilizados en la práctica:

| Estado | Significado |
|---|---|
| `pendiente` | Estado predeterminado cuando se registra un problema pero aún no se ha clasificado |
| `asignado` | Asignado a un responsable |
| `en_curso` | Se está trabajando activamente |
| `resuelto` | Se ha aplicado la solución, pendiente de confirmación |
| `cerrado` | Completamente resuelto y cerrado |

El campo "setter de estado" hace que la entrada se tachará, por lo que
`En progreso`
y
`en_curso`
se almacenan de forma consistente.

## Crear un problema

Navegue a
**Operaciones de flota → Recursos → Problemas**
.

Haga clic en
**Nuevo problema**
.

Establezca el
**Título**,
**Categoría**
y
**Prioridad**.

Escriba el
**Informe**
— una descripción detallada de lo que ocurrió.

Vincule al
**Conductor**
y/o
**Vehículo**
involucrados.

Asigne a un
**Asignado**
responsable de la resolución.

Agregue
**Etiquetas**
para agrupar (por ejemplo, "flota-norte", "urgente").

Haga clic en
**Guardar**
.

## Informar de problemas desde la aplicación Navigator

Los conductores pueden informar de los problemas directamente desde la aplicación Navigator: no necesitan acceso al panel. El flujo se encuentra en la pantalla
**Problemas**
y se accede a ella desde el menú principal de Navigator:

![Aplicación Navigator — pantalla de creación de problemas con categoría, prioridad y descripción](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnavigator-app-crear-pantalla-problemas.15553896.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El conductor abre
**Problemas**
en Navigator y hace clic en
**Nuevo problema**
.

Navigator rellena automáticamente el conductor y la ubicación actual del conductor (leída directamente desde el GPS del dispositivo). El conductor elige la
**Categoría**
y
**Prioridad**
y escribe el
**Informe**.

El conductor puede adjuntar pruebas fotográficas capturadas directamente desde la cámara, vincular el problema al
**Vehículo**
que está conduciendo y etiquetarlo.

Al enviar, Fleet-Ops crea el problema con el estado
`pendiente`
. Los operadores reciben una notificación según la prioridad del problema.

Los conductores también pueden editar los problemas que han enviado previamente (por ejemplo, agregar fotos de seguimiento o actualizar la descripción) desde la pantalla
**Problemas**. El mismo registro es visible para los operadores en el panel.

## Resolver problemas

1. Abra un problema y haga clic en
   **Asignar**
   para asignar un responsable.
2. A medida que avance el trabajo, actualice el estado a través del flujo de trabajo.
3. Cuando se resuelva, haga clic en
   **Resolver**
   y agregue notas de resolución.
4. Haga clic en
   **Cerrar**
   para finalizar.

Los problemas resueltos y cerrados permanecen en la lista para fines de informe y auditoría.

## Inspecciones vinculadas

Un problema puede ser generado a partir de una inspección fallida, ya sea creando un
**Problema**
en la inspección o automáticamente cuando se configura el formulario de inspección para hacerlo. Los detalles del problema se muestran en una sección
**Inspección vinculada**. Haga clic en la inspección para abrirla y ver las comprobaciones fallidas, las fotos y quién la registró. Consulte
[Revisar y hacer seguimiento](https://fleetbase.io/docs/fleet-ops/mantenimiento/inspecciones/revisar-y-hacer-seguimiento)
.

## Informes de problemas

Exporte los problemas de la lista a formato CSV para informes. Filtre por rango de fechas, categoría, prioridad, conductor o vehículo para generar informes dirigidos sobre incidentes de la flota.