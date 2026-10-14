---
título: "Configuración de Rutas"
url: https://fleetbase.io/docs/fleet-ops/settings/routing
módulo: fleet-ops
---

# Configuración de Rutas

Selecciona el servicio de rutas que renderiza las rutas de Fleet-Ops, el motor que optimiza el orden de las paradas, y la unidad de distancia utilizada en la interfaz.

# Configuración de Rutas

**Configuración de Rutas**
es una página pequeña con tres selecciones que determinan cómo Fleet-Ops calcula y renderiza las rutas. Dos de las tres se encuentran en lados opuestos de una distinción importante:

| Concepto | ¿Qué hace? |
|---|---|
| **Ruta** | Dibuja la ruta entre las paradas en los mapas y devuelve los tiempos estimados y la distancia. Esto es puramente una cuestión de *visualización* — responde a la pregunta de "¿cómo se debe renderizar esta secuencia de paradas como una línea poligonal en el mapa?". |
| **Optimización de Rutas** | Reordena las paradas *antes* de que se renderice la ruta. Esto es puramente una cuestión de *ordenamiento* — responde a la pregunta de "¿dadas estas paradas, ¿cuál es el orden óptimo de visita?". |

Los dos están deliberadamente desconectados: por ejemplo, puedes optimizar el orden de las paradas con VROOM (que es puramente un solucionador y no renderiza mapas), y luego renderizar la ruta resultante con OSRM o Google.

Navega a
**Fleet-Opciones → Configuración → Rutas**
.

![Configuración de rutas — tres menús desplegables: Servicio de Rutas, Motor de Optimización de Rutas, y Unidad de Distancia de Rutas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-routing-settings.bf5e4bef.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Servicio de Rutas

El servicio que Fleet-Ops utiliza para renderizar rutas en mapas y obtener los tiempos estimados. Se almacena como
`display_engine`
. Predeterminado:
`osrm`
.

| Opción | Predeterminado | Notas |
|---|---|---|
| **OSRM** | ✓ | De código abierto, auto-alojado. El predeterminado tanto para Cloud como para Fleetbase auto-alojado. |
| **Google Maps** |  | Rutas basadas en el tráfico utilizando la API de direcciones de Google. |
| **Valhalla** |  | Motor de rutas de código abierto — alternativa a OSRM con soporte multimodal. |

La lista se basa en el registro del
`routeEngine`
servicio, por lo que pueden aparecer proveedores adicionales si se instalan mediante una extensión.

## Motor de Optimización de Rutas

El motor que Fleet-Ops utiliza para reordenar las paradas antes de renderizar la ruta. Se almacena como
`optimization_engine`
. Predeterminado:
`osrm`
.

| Opción | Predeterminado | Notas |
|---|---|---|
| **OSRM** | ✓ | Utiliza el punto final de viaje de OSRM para calcular una secuencia óptima de paradas. |
| **Google Maps** |  | Utiliza la API de direcciones de Google con `optimize:true` para reordenar los puntos de parada. |
| **Valhalla** |  | Utiliza el punto final optimizado de Valhalla. |
| **VROOM** |  | Solucionador de rutas de vehículos de alta calidad — diseñado específicamente para el orden de paradas con restricciones (ventanas de tiempo, capacidades, habilidades). VROOM es *únicamente* un optimizador; no renderiza mapas, por lo que aparece aquí pero no en la lista del Servicio de Rutas. |

La lista se basa en el registro del
`routeOptimization`
servicio.

## Unidad de Distancia de Rutas

La unidad que Fleet-Ops utiliza para mostrar las distancias de las rutas en todo el panel (detalles del pedido, resúmenes de rutas, resúmenes de Orchestrator).

| Valor | Etiqueta |
|---|---|
| `km` | Kilómetros (predeterminado) |
| `mi` | Millas |

Esto es puramente una preferencia de visualización — no cambia la forma en que se calculan las distancias, solo la forma en que se muestran.

## Dónde se Almacenan las Credenciales del Proveedor

La página de Configuración de Rutas de Fleet-Ops selecciona el motor a utilizar, pero las credenciales y los puntos finales para cada proveedor se configuran en otro lugar — diferentes proveedores utilizan diferentes rutas:

| Proveedor | Dónde se configuran las credenciales |
|---|---|
| **Google** | La clave de API de **Google Maps** se establece en **Administrador → Servicios**. El **ID de Mapa** de Google para el mapa en vivo se establece por separado en **Administrador → Fleet-Ops → Mapa**. |
| **OSRM** | OSRM no tiene configuración de interfaz de usuario — el host de OSRM se proporciona a través de una variable de entorno (`OSRM_HOST`) a nivel de la plataforma. |
| **Valhalla** | El punto final de Valhalla a nivel de sistema se configura en **Administrador → Fleet-Opciones Config → Rutas**. Las organizaciones individuales pueden anular el punto final del sistema con su propio servidor de Valhalla y clave de API — seleccionar Valhalla en esta página de Configuración de Rutas revela una casilla de verificación para el punto final del nivel de organización y la clave. El flujo de anulación se registra en esta página mediante la extensión **Valhalla**. |
| **VROOM** | El mismo patrón que Valhalla: un punto final de VROOM a nivel de sistema en **Administrador → Fleet-Opciones Config → Rutas**, con una casilla de verificación que aparece en esta página cuando se selecciona VROOM, registrada por la extensión **VROOM**. Las anulaciones a nivel de organización le permiten apuntar a su propio servidor de VROOM y proporcionar una clave de API. |

Las anulaciones de Valhalla y VROOM en la página son impulsadas por la extensión — solo aparecen cuando la extensión correspondiente está instalada. Sin la extensión, verá la opción del motor (registrada por el registro del servicio de rutas) pero no la casilla de verificación.

## Otras Cosas que Esta Página No Configura

Algunas cosas que la gente a veces busca aquí:

* **Modo de ruta**
  (conducción / caminar / ciclismo) no se expone como una configuración global. Donde se aplican los modos (por ejemplo, la navegación paso a paso) se determinan por el contexto de llamada, no como una configuración predeterminada aquí.
* **Preferencias de peaje / autopista / ferry**
  también no se exponen como configuraciones globales; se deciden por el servicio de rutas que se utiliza y cualquier opción que este soporte de forma nativa.

## Cómo Afectan las Configuración de Rutas a Otras Superficies

| Superficie | Efecto |
|---|---|
| **Mapa de los detalles del pedido** | Renderiza la ruta utilizando el Servicio de Rutas seleccionado |
| **ETA en los pedidos asignados** | Se calcula utilizando el Servicio de Rutas seleccionado a partir de la posición del conductor |
| **Orchestrator** | Las fases de optimización llaman al Motor de Optimización de Rutas seleccionado para reordenar las paradas |
| **Cálculo de la tasa de servicio** | Las tarifas basadas en la distancia utilizan la distancia calculada, expresada en la unidad seleccionada en las facturas |

## Guardar

Haga clic en
**Guardar cambios**
en la barra superior de la página para guardar las tres selecciones. El cambio se aplica a los nuevos cálculos de rutas de inmediato; los pedidos en curso mantienen el tiempo estimado y la distancia que tenían en el momento de la asignación hasta el siguiente cálculo.

## Extender la Configuración de Rutas

La página de rutas expone un punto de extensión en la clave de registro
`fleet-ops:template:settings:routing`
. Las extensiones que añaden sus propios ajustes relacionados con las rutas (por ejemplo, un panel de credenciales por motor, o la gestión de perfiles de rutas) registran un panel bajo esta clave y se renderiza debajo de los selectores integrados.