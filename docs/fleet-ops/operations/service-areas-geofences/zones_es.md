---
title: "Zonas"
url: https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones
module: fleet-ops
---

Zonas y límites geográficos

# Zonas

Defina límites operativos precisos dentro de una zona de servicio para una asignación, precios y delimitación geográfica más precisos.

# Zonas

A
**Zona**
es un polígono ubicado dentro de una única
[Zona de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/service-areas)
. Las zonas dividen una zona de servicio en límites operativos más detallados: anillos de entrega alrededor de un depósito, zonas exclusivas dentro de una ciudad, territorios de recogida asignados a conductores específicos, y participan en la delimitación geográfica y la fijación de precios de la misma manera que las zonas de servicio.

## Cuándo usar una zona frente a una zona de servicio

Utilice una
**zona de servicio**
cuando el límite represente un país, región o gran centro urbano que desee gestionar como una unidad.

Utilice una
**zona**
cuando el límite represente una subdivisión de esa área: normalmente con un diámetro de aproximadamente 50 km, y desee activar diferentes delimitaciones geográficas o fijar precios dentro o fuera de ella.

| Decisión | Utilizar una zona | Utilizar una zona de servicio |
|---|---|---|
| ¿Está el límite dentro de una zona de servicio existente? | ✅ |  |
| ¿Representa un país, estado o gran centro urbano? |  | ✅ |
| ¿Se necesitan múltiples límites para compartir la configuración (un padre compartido)? | ✅ |  |
| ¿Es para una delimitación geográfica a nivel nacional o de país? |  | ✅ |

## Conceptos

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | Etiqueta legible para humanos (por ejemplo, "Zona A — Centro") |
| `description` | text | Notas opcionales que se muestran en la interfaz de gestión. |
| `service_area_uuid` | UUID | La zona de servicio padre. Requerido. |
| `border` | Polygon | Geometría del límite, almacenada como una columna espacial MySQL. |
| `color`, `stroke_color` | hexadecimal | Color de relleno y color del contorno en el mapa en vivo. |
| `status` | string | Por defecto, es "activo" al crearse. Establezca en "inactivo" para ocultar sin eliminar. |
| `trigger_on_entry`, `trigger_on_exit` | bool | ¿Hacer que se generen eventos de delimitación geográfica cuando un conductor/vehículo cruza el límite? |
| `dwell_threshold_minutes` | integer | Activa un evento de permanencia si un sujeto permanece dentro de ≥ N minutos. |
| `speed_limit_kmh` | integer | Registrado para la zona; combinado con la telemetría para detectar infracciones de velocidad. |

Las zonas tienen identificadores públicos estables que comienzan con
`zone_`
. La API expone un atributo virtual
`type`
que siempre devuelve
`zone`
— esta es la forma en que los consumidores posteriores (gestores de delimitaciones geográficas, fijación de precios) pueden distinguir las zonas de las zonas de servicio sin tener que inspeccionar la clase del modelo.

## Gestión de zonas en el mapa

Las zonas se gestionan desde el mismo lugar que sus zonas de servicio:
**Operaciones de flota → Panel → Mapa**
. Las zonas siempre se crean en el contexto de una zona de servicio, por lo que los puntos de entrada son:

* **Panel de zona de servicio en la barra de herramientas**
  — abra el panel, haga clic en una zona de servicio en la lista, luego
  **Crear zona**
  desde su menú de acciones.
* **Haga clic derecho en un polígono de zona de servicio existente**
  en el mapa y seleccione
  **Crear zona**
  desde el menú contextual.
* **Haga clic derecho en una zona existente**
  para obtener su propio menú de acciones (editar, editar límites, ocultar, eliminar) — el mismo patrón que para las zonas de servicio.

![Mapa en vivo con el panel de zona de servicio de la barra de herramientas abierto — crear una zona de servicio, mostrar o ocultar todas, o seleccionar una para trabajar con sus zonas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-zones-map.080fb465.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Consulte
[Zonas de servicio → Gestión de zonas de servicio en el mapa](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/service-areas#managing-service-areas-on-the-map)
para capturas de pantalla del panel y del menú contextual — las zonas utilizan los mismos paneles y los mismos controles de edición de límites.

## Crear una zona

**Seleccione una zona de servicio.**
Una zona debe pertenecer a exactamente una zona de servicio — si se encuentra en la necesidad de crear una "zona independiente", modélala como una zona de servicio en su lugar. La entrada "Crear zona" en el panel de la barra de herramientas o en el menú contextual de clic derecho transmite la zona padre.

**Dibuje el límite en el mapa.**
Fleet-Ops entra en modo de dibujo con la herramienta de polígono activa. Haga clic en cada vértice, luego haga doble clic (o haga clic en el primer vértice de nuevo) para cerrar el polígono. Se abre el cuadro de diálogo de creación con el límite que acaba de dibujar.

**Nombrar y describir.**
Un nombre corto
`name`
más notas opcionales que indiquen a los despachadores para qué sirve la zona (por ejemplo,
*Zona B — Entrega express solamente*
).

**Elegir colores.**
Seleccione un color de relleno y contorno que distinga visualmente la zona de sus hermanos en el mapa en vivo.

**Configurar los desencadenantes de la delimitación geográfica**
(opcional). Active los eventos de entrada/salida, establezca un umbral de permanencia o registre un límite de velocidad. Consulte
[Delimitaciones geográficas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/geofences)
para ver qué controla cada opción.

**Guardar.**
La zona aparece anidada debajo del padre en la lista del panel de la barra de herramientas y en el mapa en vivo.

Para remodelar una zona después de haberla creado, haga clic derecho sobre ella en el mapa y seleccione **Editar límites** — el polígono cambia a un contorno discontinuo con controles deslizantes en cada vértice, exactamente como la edición de límites de la zona de servicio.

Si necesita crear zonas de forma programática — alrededor de un punto, o a partir de un polígono GeoJSON predefinido — utilice la
[API](#api)
en su lugar. Estas opciones no están disponibles en la interfaz de usuario.

## Fijación de precios basada en zonas

Las zonas permiten la fijación de precios por región a través de
**Tarifas de servicio**
. Una tarifa de servicio puede contener un array de tarifas, cada una con un
`zone_uuid`
(o
`service_area_uuid`) y una
`priority`
y una etiqueta opcional
`is_fallback`
:

| Campo | Propósito |
|---|---|
| `zone_uuid` | Restringe la tarifa a las entregas que se originan o terminan en esta zona. |
| `service_area_uuid` | Restringe la tarifa a toda una zona de servicio (sin apuntar a una zona específica). |
| `priority` | Cuando hay varias tarifas que coinciden, la tarifa con la prioridad más baja tiene prioridad. Utilícelo para manejar zonas superpuestas. |
| `is_fallback` | Si no hay ninguna tarifa basada en zona que coincida, la tarifa marcada como
`is_fallback`
se aplica en su lugar. |
| `label` | La etiqueta que se muestra en la cotización generada. |

### Ejemplo práctico

Imagine una operación de entrega urgente en Singapur con:

* Una zona central
  **Centro**
  con precios premium.
* Una zona circundante
  **Suburbios**
  con precios estándar.
* Una
  **Tarifa de respaldo**
  para cualquier lugar más dentro del país.

En
**Configuración → Operaciones → Tarifas de servicio**
, cree una tarifa de servicio para el área de servicio de Singapur, luego agregue tres tarifas:

| Etiqueta | Zona | Prioridad | Fallback | Cantidad |
|---|---|---|---|---|
| Cargo por entrega express | Centro | 10 | – | +8 $ |
| Entrega estándar en suburbio | Suburbios | 20 | – | +4 $ |
| Tarifa de respaldo para todo el país | – | 99 | ✓ | +2 $ |

Cuando se genera una cotización, Fleet-Ops determina el punto de origen y destino, selecciona la tarifa con la prioridad más baja que coincida, y aplica la tarifa de respaldo si no hay ninguna coincidencia de zona.

Consulte
[Tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
para obtener más información sobre el modelo de precios.

## API

Todos los puntos finales están en
`/zones`
. Autenticación mediante su clave de API estándar.

| Método | Ruta | Propósito |
|---|---|---|
| `GET` | `/zones` | Lista zonas, filtradas opcionalmente por `service_area` |
| `GET` | `/zones/{id}` | Recupera una zona individual. |
| `POST` | `/zones` | Crea una nueva zona. |
| `PATCH` | `/zones/{id}` | Actualiza una zona existente. |
| `DELETE` | `/zones/{id}` | Elimina una zona de forma suave. |

### Crear — Punto + Radio

```
curl -X POST https://api.fleetbase.io/v1/zones \
  -H "Authorization: Bearer $FLEETBASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Zona A — Centro",
    "service_area": "sa_singapore_xxx",
    "latitude": 1.2839,
    "longitude": 103.8607,
    "radius": 1500,
    "color": "#ef4444",
    "stroke_color": "#991b1b",
    "trigger_on_entry": true,
    "trigger_on_exit": true,
    "dwell_threshold_minutes": 15
  }'
```

### Crear — Borde explícito

```
curl -X POST https://api.fleetbase.io/v1/zones \
  -H "Authorization: Bearer $FLEETBASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Zona de carga restringida",
    "service_area": "sa_singapore_xxx",
    "description": "No entregas entre las 07:00 y las 09:00.",
    "border": {
      "type": "Polygon",
      "coordinates": [[[103.85, 1.28], [103.86, 1.28], [103.86, 1.29], [103.85, 1.29], [103.85, 1.28]]]
    }
  }'
```

## Mejores prácticas

* **Mantenga las zonas pequeñas.**
  Las comprobaciones de límites se ejecutan en cada actualización de ubicación del conductor/vehículo. Unas pocas zonas bien definidas por empresa son suficientes; decenas de miles de zonas superpuestas ralentizarán el sistema.
* **Utilice nombres descriptivos.**
  Los nombres de las zonas son visibles para los conductores y los despachadores en los registros de eventos y en las cotizaciones —
  `Zona A — Centro`
  es mucho más útil que
  `Z1`
  .
* **No duplique la zona de servicio.**
  Si una zona es aproximadamente de la misma forma que su zona de servicio, está utilizando el primitivo incorrecto — conviértala en una zona de servicio o combínelas. La entrada "Crear zona" en el panel de la barra de herramientas o en el menú contextual de clic derecho transmite la zona padre.
* **Reserve las tarifas de respaldo para el ámbito más amplio.**
  Utilice la etiqueta
  `is_fallback`
  en una tarifa de zona de servicio, no en una tarifa de zona, para que solo se aplique cuando no haya ninguna zona que coincida.

## ¿Qué sigue?

* Añada desencadenantes de entrada/salida/permanencia en
  [Delimitaciones geográficas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/geofences)
  .
* Fije diferentes precios por zona con
  [Tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  .