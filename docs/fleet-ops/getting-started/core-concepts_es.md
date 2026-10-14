---
título: "Conceptos clave"
url: https://fleetbase.io/docs/fleet-ops/getting-started/core-concepts
módulo: fleet-ops
---

# Conceptos clave

Comprenda los componentes fundamentales de Fleet-Ops: pedidos, cargas, conductores, vehículos, flotas y cómo se relacionan.

# Conceptos clave

Fleet-Ops se basa en un conjunto de entidades que representan los objetos reales en su operación logística. Comprender cómo se relacionan estas entidades es clave para utilizar Fleet-Ops de manera efectiva.

## Pedidos

Un
**pedido**
es la entidad central: representa una tarea de entrega o un servicio. Cada pedido tiene:

* Un
  **estado**
  que progresa a través de un ciclo de vida (creado → asignado → iniciado → completado)
* Una
  **carga**
  que contiene la ubicación de recogida, la ubicación de entrega y los artículos a entregar
* Un
  **conductor**
  y
  **vehículo**
  asignados para llevarlo a cabo
* Una
  **Configuración del pedido**
  que define el flujo de trabajo, los campos y el método de comprobación de entrega

Los pedidos se crean en el panel, se asignan a los conductores a través de la aplicación Navigator y se completan cuando se captura la prueba de entrega.

### Estados del pedido

Fleet-Ops tiene cinco
**estados del pedido del sistema**. Estos definen el ciclo de vida de alto nivel que Fleet-Ops utiliza para la asignación, la facturación y la generación de informes.

| Estado | Siempre presente? | Significado |
|---|---|---|
| `creado` | Sí | El pedido ha sido creado y está esperando a ser asignado |
| `asignado` | Sí | El pedido ha sido asignado a un conductor |
| `iniciado` | Sí | El conductor ha aceptado y está trabajando en el pedido |
| `cancelado` | Sí | El pedido ha sido cancelado antes de completarse |
| `completado` | Configurable | El pedido ha sido entregado |

Los cuatro primeros:
`creado`
,
`asignado`
,
`iniciado`
,
`cancelado`
, son
**estáticos**. Existen en cada pedido y no se pueden eliminar. Sin embargo, el estado
`completado`
puede reemplazarse o complementarse con
**cualquier actividad personalizada que tenga su
`completado`
establecido en
`true`**
en el flujo de actividad del pedido. Cuando esa actividad se activa (por ejemplo,
*Entrega de artículos*
o
*Firma capturada*
), Fleet-Ops marca el pedido como completado. Esto significa que una Configuración del pedido puede definir su propio paso de finalización bajo cualquier nombre que se ajuste a la operación, al mismo tiempo que finaliza el ciclo de vida del pedido.

Lo que ocurre
**entre
`iniciado`
y la actividad de finalización del pedido**
es totalmente configurable. Los pasos intermedios que atraviesa el conductor:
*llegada a la recogida*
,
*cargado de artículos*
,
*en ruta a la entrega*
, y así sucesivamente, están definidos por el
**flujo de actividad**
en la Configuración del pedido. Diferentes tipos de pedidos pueden tener flujos de actividad completamente diferentes, al mismo tiempo que comparten el mismo núcleo de estado del sistema.

Consulte
[Configuraciones de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
y
[Flujos de actividad](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
para saber cómo diseñar flujos de trabajo personalizados.

## Carga

Una
**carga**
es el contenedor adjunto al pedido. Define:

* **Recogida**
  — dónde recoge el conductor los artículos
* **Entrega**
  — el destino principal de entrega
* **Devolución**
  — una dirección opcional de devolución al remitente si la entrega falla
* **Entidades**
  — los artículos individuales que se transportan (cada uno con su propio número de seguimiento)
* **Puntos de parada**
  — paradas intermedias para rutas con múltiples paradas

Cada entidad en la carga puede tener sus propias dimensiones, peso, código de barras/SKU y destino. Para rutas con múltiples paradas, cada punto de parada puede requerir su propia prueba de entrega.

## Configuración del pedido

Una
**Configuración del pedido**
(o Configuración del pedido) es una plantilla que define cómo funciona un tipo de pedido específico. Incluye:

* El
  **flujo de actividad**
  — la secuencia de pasos de estado que atraviesan los conductores
* **Definiciones de entidad**
  — qué campos son obligatorios para cada artículo (descripción, peso, campos personalizados)
* **Método de comprobación de entrega**
  — firma, foto, código QR o datos personalizados
* **Campos personalizados**
  — campos de nivel de pedido específicos para su negocio

Puede tener múltiples configuraciones de pedidos para diferentes tipos de servicios: entrega estándar, recogida y entrega, devolución al remitente, entrega con mensajero, etc. Cada pedido selecciona una configuración al crearlo.

Consulte
[Configuraciones de pedidos](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/overview)
para obtener más información.

## Conductores

Un
**conductor**
es una persona que ejecuta los pedidos utilizando la aplicación móvil Navigator. Cada registro de conductor se vincula a una cuenta de usuario de Fleetbase y almacena:

* Ubicación en tiempo real (latitud, longitud, dirección, velocidad)
* Estado en línea/fuera de línea
* Asignación actual de trabajo
* Habilidades y restricciones utilizadas por el Orchestrator (distancia máxima, ventana de tiempo, habilidades requeridas)
* Horario de trabajo

Los conductores utilizan la aplicación Navigator para recibir pedidos asignados, navegar rutas, actualizar el estado en cada parada y capturar la prueba de entrega.

## Vehículos

Un
**vehículo**
es un activo de flota asignado para realizar pedidos. Los registros de vehículos almacenan:

* Marca, modelo, año, tipo de carrocería, color
* Número de matrícula y VIN
* Capacidad (peso en kg, volumen en m³)
* Ubicación en tiempo real (a través de telemetría o la aplicación Navigator)
* Estado: activo, inactivo, mantenimiento, fuera de línea

Los vehículos pueden estar conectados a dispositivos (rastreadores GPS, escáneres OBD-II, cámaras, sensores) a través del módulo de conectividad, y los horarios de mantenimiento se pueden realizar a través del módulo de mantenimiento.

## Remolques

Un
**remolque**
es un activo de transporte independiente. Los remolques de tipo "dry van", "reefer", "flatbed", "tanker" y "chassis" tienen su propia identidad, especificaciones, equipos, mantenimiento, telemetría y historial de conexión. Los vehículos tractor y los vehículos principales permanecen como Vehículos. Conectar o desconectar un remolque cambia la relación de remolque con fecha efectiva; no transfiere la propiedad de los registros del remolque al vehículo.

## Flotas

Una
**flota**
es un grupo lógico de conductores y vehículos. Las flotas ayudan a organizar los recursos por:

* Zona geográfica o área de servicio
* Tipo de servicio (expreso, estándar, nocturno)
* Turno (flota de la mañana, flota de la noche)
* Proveedor o subcontratista

Las flotas son jerárquicas: una flota de nivel superior (por ejemplo, "Metro") puede contener subflotas (por ejemplo, "Metro North", "Metro South"). El Orchestrator utiliza la pertenencia a la flota para asignar pedidos.

## Lugares

Un
**lugar**
es una ubicación guardada: una dirección reutilizable utilizada como puntos de recogida o entrega. Los lugares tienen detalles de dirección completos, coordenadas precisas y un número de teléfono de contacto. Se pueden vincular a contactos (clientes, proveedores) y aparecen en el mapa en vivo.

## Contactos

**Contactos**
son las empresas y personas con las que opera su negocio: clientes que realizan pedidos, proveedores que realizan recogidas y facilitadores que coordinan las entregas. Los contactos tienen tipos (cliente, proveedor, facilitador) y se pueden vincular a lugares específicos.

## Proveedores

**Proveedores**
son transportistas o proveedores de servicios de terceros. A diferencia de los conductores internos, los proveedores pueden tener sus propios grupos de conductores y flotas. Fleetbase admite
**Proveedores integrados**
para plataformas como Lalamove, donde los pedidos se pueden transmitir a la API del socio y se pueden obtener las cotizaciones automáticamente.

## Áreas de servicio y zonas

Un
**área de servicio**
es un polígono que define la zona donde opera su negocio. Dentro de un área de servicio, puede definir
**zonas**
— subregiones más pequeñas. Las áreas de servicio y las zonas se utilizan para:

* Definir las tarifas de servicio (precios diferentes por zona)
* Filtrar la asignación de flotas en el Orchestrator
* Activar eventos de geocercado (entrada/salida/tiempo de permanencia)

## Tarifas de servicio

**Tarifas de servicio**
definen las reglas de precios para los pedidos. Una tarifa puede ser:

* Una tarifa base
* Basada en la distancia (por km/milla)
* Basada en el peso o el volumen
* Precio fijo entre zonas
* Niveles de precios por rangos de distancia

Las tarifas admiten cargos adicionales por recogida en el lugar (COD), horas punta y tamaño del paquete. Se pueden coexistir múltiples tarifas, que se definen para diferentes áreas de servicio, configuraciones de pedidos o tipos de clientes.

## Orchestrator

El
**Orchestrator**
es un planificador de múltiples fases que convierte un grupo de pedidos sin asignar en un plan ejecutable. En lugar de ejecutar una única línea de flujo fija, puede componer
**fases**
en el Orchestrator Workbench y apilarlas en secuencia: por ejemplo
*Asignar vehículos → Optimizar rutas → Asignar conductores*
. Cada fase ejecuta un modo (asignación de vehículos, asignación de conductores, optimización de rutas o asignación completa) utilizando un motor configurable. Puede previsualizar el plan propuesto y aprobarlo cuando esté satisfecho: o puede ejecutar una fase individual cuando eso sea todo lo que necesita.

Consulte
[Orchestrator Overview](https://fleetbase.io/docs/fleet-ops/operations/orchestrator/overview)
para obtener más información.

## Manifestos

Después de que el Orchestrator haya aprobado un plan de asignación, crea un
**Manifesto**
para cada conductor: una lista ordenada de paradas (pedidos) que debe completar. El manifiesto es el plan de entrega físico del conductor para un turno.

## Cómo todo se conecta

```
Configuración del pedido ──────────────────────── define el flujo de actividad + campos de entidad
     │
     ▼
  Pedido ──── Carga ── Recogida / Entrega / Entidades / Puntos de parada
     │           │
     │           └── Número de seguimiento (por entidad)
     │
     ├── Conductor (asignado)
     ├── Vehículo (asignado)
     ├── Cotización de servicio (precio)
     ├── Ruta (direcciones calculadas)
     ├── Pruebas (firma / foto / código QR)
     └── Manifesto (después de la aprobación del Orchestrator)
            └── Parada del manifiesto (cada pedido en el manifiesto)
```