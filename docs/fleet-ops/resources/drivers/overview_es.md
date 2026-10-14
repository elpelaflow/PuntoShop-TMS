---
Título: Conductores
URL: https://fleetbase.io/docs/fleet-ops/resources/drivers/overview
Módulo: fleet-ops
---

Conductores

# Conductores

Cree y gestione los perfiles de los conductores: asigne vehículos, rastree la ubicación en tiempo real, configure el acceso a Navigator y defina las restricciones de Orchestrator.

# Conductores

**Conductores**
son las personas que ejecutan las órdenes utilizando la aplicación móvil Navigator. Cada registro de conductor está vinculado a una cuenta de usuario de Fleetbase y almacena toda la información necesaria para la asignación, el seguimiento en tiempo real y la asignación a Orchestrator.

![Lista de conductores — nombre, estado, vehículo actual, indicador de conexión](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-drivers-list.423804e9.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos del conductor

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre completo del conductor |
| **Teléfono** | Número de móvil — utilizado para el inicio de sesión mediante SMS y notificaciones |
| **Correo electrónico** | Opcional — para notificaciones de la cuenta |
| **Imagen de perfil** | Fotografía del perfil que se muestra en el mapa en vivo y en Navigator |
| **Vehículo** | Vehículo predeterminado asignado a este conductor |
| **Proveedor** | Transportista de terceros al que pertenece este conductor (opcional) |
| **Licencia de conducir** | Número de licencia para registros de cumplimiento |
| **Habilidades** | Certificaciones/habilidades utilizadas por Orchestrator para la asignación |
| **Estado** | activo, inactivo, suspendido, de licencia |
| **Conectado** | Indica si el conductor está actualmente activo en Navigator |
| **Ubicación** | Posición GPS en tiempo real (latitud, longitud, dirección, velocidad) |
| **Tiempo máximo de viaje** | Tiempo máximo de conducción por turno (restricción de Orchestrator) |
| **Distancia máxima** | Distancia máxima de la ruta (restricción de Orchestrator) |
| **Ventana de tiempo** | Horas de inicio y fin del turno (restricción de Orchestrator) |

## Estados del conductor

| Estado | Significado |
|---|---|
| `activo` | Disponible para la asignación de órdenes |
| `inactivo` | No está trabajando actualmente — excluido de Orchestrator |
| `suspendido` | Suspensión disciplinaria — excluido de todas las operaciones |
| `de licencia` | Temporalmente no disponible |

## Crear un conductor

Navegue a
**Fleet-Ops → Recursos → Conductores**
.

Haga clic en
**Nuevo conductor**
.

Complete el nombre, el número de teléfono y, opcionalmente, la dirección de correo electrónico del conductor.

Asigne un
**Vehículo**
si el conductor tiene un vehículo predeterminado.

Establezca
**Habilidades**
si su operación utiliza la asignación basada en habilidades (por ejemplo,
`hazmat`
,
`refrigerado`
,
`motocicleta`
).

Establezca
**Restricciones de Orchestrator**
— tiempo máximo de viaje, distancia máxima y ventana de tiempo — si desea que Orchestrator aplique límites para este conductor.

Haga clic en
**Guardar**
. Ahora el conductor puede iniciar sesión en la aplicación Navigator utilizando su número de teléfono.

## Panel de detalles del conductor

Haga clic en cualquier fila de conductor para abrir el panel de detalles:

* **Resumen**
  — información de contacto, vehículo actual, estado en línea, asignación actual
* **Mapa**
  — mini mapa con la posición actual en tiempo real
* **Órdenes**
  — historial de órdenes para este conductor con estado y marcas de tiempo
* **Horario**
  — entradas y asignaciones futuras del horario
* **Posiciones**
  — seguimiento GPS histórico con reproducción de posiciones
* **Problemas**
  — incidentes informados relacionados con este conductor

![Panel de detalles del conductor — perfil, estado, vehículo asignado, detalles de la licencia y ubicación actual en el mapa](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-driver-details.54c0c51c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Restricciones de Orchestrator

Las restricciones de conductor controlan cómo Orchestrator asigna órdenes a este conductor:

| Restricción | Efecto |
|---|---|
| **Habilidades** | Solo asigna órdenes que requieran las habilidades que tiene este conductor |
| **Tiempo máximo de viaje** | El tiempo total de conducción para la ruta está limitado |
| **Distancia máxima** | La distancia total de la ruta está limitada |
| **Hora de inicio de la ventana de tiempo** | No se asignan órdenes antes de las horas de inicio del turno |
| **Hora de finalización de la ventana de tiempo** | No se asignan órdenes después de las horas de finalización del turno |

Deje las restricciones en blanco para permitir la asignación sin restricciones.

## Importar conductores en masa

Haga clic en
**Importar**
en la lista de conductores, descargue la plantilla CSV, complete los datos de sus conductores y cargue. Fleet-Ops crea todos los registros de conductores y pueden iniciar sesión inmediatamente en Navigator utilizando su número de teléfono registrado.

## Páginas relacionadas

* [Acceso a Navigator](https://fleetbase.io/docs/fleet-ops/resources/drivers/navigator-access)
  — gestione el inicio de sesión y los permisos de la aplicación
* [Horarios de trabajo](https://fleetbase.io/docs/fleet-ops/resources/drivers/shift-schedules)
  — configure las horas de trabajo
* [Configuración de la aplicación Navigator](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup)
  — instale y conecte la aplicación móvil