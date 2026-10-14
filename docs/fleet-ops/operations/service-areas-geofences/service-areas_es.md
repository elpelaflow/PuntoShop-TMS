---
title: "Áreas de servicio"
url: https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/service-areas
module: fleet-ops
---

Áreas de servicio y perímetros geográficos

# Áreas de servicio

Definen límites geográficos de alto nivel (típicamente a nivel de país o región) que contienen zonas y controlan el comportamiento de los perímetros geográficos en Fleet-Ops.

# Áreas de servicio

A
**Área de servicio**
es un límite geográfico de alto nivel que define dónde opera su operación. Las áreas de servicio se almacenan como MultiPolígonos: pueden ser un contorno de país, una región metropolitana, un área de entrega o cualquier otra área nombrada, y actúan como contenedores para uno o más perímetros anidados
[Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones)
.

Las áreas de servicio son la base para:

* **Perímetros geográficos**
  — que se activan al entrar o salir del conductor/vehículo, al permanecer en un lugar, o al exceder la velocidad (ver
  [Perímetros geográficos](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/geofences)
  )
* **Precios basados en zonas**
  — las tarifas de servicio pueden aplicarse a una área de servicio o a una zona específica dentro de ella (ver
  [Tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview)
  )
* **Filtrado operativo**
  — limitar los pedidos, los conductores y la lógica de asignación a una región

## Conceptos

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | Etiqueta legible por el usuario (por ejemplo, `Singapur`, `Greater Toronto Area`). |
| `type` | string | Por defecto, `country`. Libre elección: use para agrupar áreas (por ejemplo, `country`, `region`, `city`, `district`). |
| `border` | MultiPolygon | La geometría real del límite, almacenada como una columna MySQL espacial con un índice espacial. |
| `parent_uuid` | UUID | Referencia opcional a un área de servicio padre. Permite anidar una ciudad bajo un país, un distrito bajo una ciudad, etc. |
| `country` | string | Código de país ISO, utilizado para filtrar y buscar tarifas. |
| `color`, `stroke_color` | hex | Color de relleno y color del contorno en el mapa en vivo. |
| `status` | string | Por defecto, `active`. Establecer en `inactive` para ocultar sin eliminar. |
| `trigger_on_entry`, `trigger_on_exit` | bool | Indicar si se deben emitir eventos de perímetro geográfico cuando un conductor/vehículo cruza el límite. |
| `dwell_threshold_minutes` | integer | Si se establece, activa un evento de permanencia cuando un sujeto permanece dentro durante ≥ N minutos. |
| `speed_limit_kmh` | integer | Registrado para el área. Combinado con datos de telemetría para detectar infracciones de velocidad. |

Las áreas de servicio tienen identificadores públicos estables que comienzan con
`sa_`
.

## Gestión de áreas de servicio en el mapa

Las áreas de servicio (y las zonas dentro de ellas) se gestionan desde
**Fleet-Ops → Dashboard → Map**
. El proveedor de mapas utilizado para renderizar los tiles está controlado por
[Map Settings](https://fleetbase.io/docs/fleet-ops/settings/map)
.

Hay dos formas de gestionar las áreas de servicio desde el mapa:

* **La barra de herramientas del mapa**
  — la barra de iconos en el lado izquierdo del mapa. El icono de "Áreas de servicio" abre un panel con creación, control visual y acciones específicas para cada área.
* **El menú contextual de clic derecho**
  — haga clic derecho en cualquier parte del mapa para obtener la opción "Crear nueva Área de servicio", o haga clic con el botón derecho en un polígono de área de servicio existente para obtener el menú de acciones contextual (editar, editar límites, ocultar, eliminar, crear zona dentro, etc.).

![Panel de la barra de herramientas de área de servicio y el menú contextual de clic derecho mostrando acciones específicas para cada área](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-area-controls.409a840f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

### Panel de la barra de herramientas

Haga clic en el icono de "Áreas de servicio" en la barra de herramientas del mapa para abrir el panel. Desde la parte superior:

| Acción | Qué hace |
|---|---|
| **Crear nueva Área de servicio** | Abre el modal de creación anclado en el centro del mapa actual. |
| **Mostrar todas las Áreas de servicio** | Revela todas las áreas de servicio en el mapa (deshace cualquier ocultación). |
| **Ocultar todas las Áreas de servicio** | Oculta todos los polígonos de área de servicio sin eliminarlos: útil para desordenar el mapa. |
| *(lista de áreas de servicio existentes)* | Haga clic en una entrada para enfocar el mapa en esa área. Cada entrada tiene un interruptor de visibilidad propio. |

### Menú contextual de clic derecho

Haga clic derecho en un polígono de área de servicio (o haga clic en su entrada en la lista de la barra de herramientas) para obtener el menú de acciones:

| Acción | Qué hace |
|---|---|
| **Ocultar** | Desvanece el polígono del mapa. Los datos permanecen intactos: vuelva a hacer visible desde la barra de herramientas. |
| **Crear Zona** | Abre el modal de creación de zona pre-configurado para esta área de servicio. Ver [Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones) . |
| **Editar** | Abre el modal de edición de área de servicio: nombre, tipo, país, colores, desencadenantes de perímetro geográfico. |
| **Editar límites** | Cambia el polígono al modo de edición con controles de arrastrar y soltar en los vértices y puntos medios. Arrastre un control para dar forma al límite en su lugar: no hay un diálogo separado, el cambio se aplica al guardar. |
| **Eliminar** | Elimina la área de servicio de forma no destructiva (y desconecta las zonas de este padre). |

### Editar límites

Seleccione
**Editar límites**
para que el polígono aparezca como un contorno discontinuo con controles de arrastrar y soltar en cada vértice y punto medio. Arrastre un control para dar forma al límite en su lugar: no hay un diálogo separado, el cambio se aplica al guardar.

![Área de servicio en modo de edición de límites — contorno discontinuo con controles de arrastrar y soltar y una herramienta de cancelar/guardar en el mapa](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-service-area-edit.09f1088f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Haga clic fuera del polígono o presione la herramienta
**cancelar**
en el mapa para descartar el cambio.

## Crear una área de servicio

Desde la entrada
**Crear nueva Área de servicio**
en la barra de herramientas (o en el menú contextual de clic derecho), Fleet-Ops cambia el mapa al modo de dibujo. Use la herramienta de polígono en los controles de dibujo para delinear el área: haga clic en cada vértice, luego haga doble clic (o haga clic en el primer vértice nuevamente) para cerrar el polígono. Después de cerrar el polígono, se abre el modal de creación con el contorno que acaba de dibujar.

El modal de creación solicita:

* **Nombre**
* **Tipo**
  (por defecto,
  `country`
  )
* **País**
  (seleccionado del menú desplegable)
* **Color del borde**
  y
  **Color de relleno**

Después de guardar, la nueva área de servicio aparece en el mapa y en la lista de áreas de servicio en la barra de herramientas. Desde allí puede enfocar, ocultar, editar, editar límites, agregar zonas o eliminarla.

Si necesita crear áreas de servicio de forma programática — a partir de un radio alrededor de un punto, o a partir de un límite GeoJSON predefinido — use la
[API](#api)
en su lugar. Estas opciones no están disponibles en la interfaz de usuario.

## Jerarquías

Las áreas de servicio admiten una relación padre/hijo a través de
`parent_uuid`
. Una jerarquía típica:

```
País: Estados Unidos (sa_abc…)
 ├── Región: Costa Oeste (sa_def…)
 │    ├── Estado: California (sa_ghi…)
 │    │    └── Ciudad: San Francisco (sa_jkl…)
 │    └── Estado: Oregón (sa_mno…)
 └── Región: Costa Este (sa_pqr…)
```

Use jerarquías cuando:

* Se aplican responsabilidades de gestión diferentes en cada nivel (por ejemplo, un gerente regional es responsable de la asignación dentro de una región, pero las tarifas se establecen a nivel de país).
* Quiere heredar valores predeterminados: las áreas de hijo suelen reutilizar el
  `country`
  y el estilo visual del padre.

No use la jerarquía cuando su operación sea de una sola región: una lista plana de áreas de servicio es más fácil de entender.

## Zonas vs Áreas de servicio

|  | **Área de servicio** | **Zona** |
|---|---|---|
| Geometría | MultiPolígono | Polígono |
| Escala típica | País / región / metrópolis | Zona de entrega, área de recogida, área restringida |
| Anidamiento | Puede ser padre de otras áreas de servicio | Anidada dentro de una sola área de servicio |
| Propósito | Definir el área operativa, definir el alcance de precios | Subdividir un área de servicio para una aplicación de precios y perímetros geográficos más finos |

Cree primero una área de servicio, luego cree zonas dentro de ella. Ver [Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones) .

## API

Todos los puntos finales se encuentran en la API Fleet-Ops v1 en
`/service-areas`
. Autenticación mediante su clave API estándar.

| Método | Path | Propósito |
|---|---|---|
| `GET` | `/service-areas` | Listar todas las áreas de servicio para la empresa autentificada. |
| `GET` | `/service-areas/{id}` | Recuperar una sola área de servicio (las zonas se cargan de forma perezosa). |
| `POST` | `/service-areas` | Crear una nueva área de servicio. |
| `PATCH` | `/service-areas/{id}` | Actualizar una área de servicio existente. |
| `DELETE` | `/service-areas/{id}` | Eliminar de forma no destructiva una área de servicio (y desconectar las zonas de este padre). |

### Crear — Punto + Radio

```
curl -X POST https://api.fleetbase.io/v1/service-areas \
  -H "Authorization: Bearer $FLEETBASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Downtown Singapore",
    "type": "city",
    "country": "SG",
    "latitude": 1.2839,
    "longitude": 103.8607,
    "radius": 5000,
    "color": "#3b82f6",
    "stroke_color": "#1d4ed8",
    "trigger_on_entry": true,
    "trigger_on_exit": true
  }'
```

El servidor genera un MultiPolígono circular con un radio de 5 km alrededor del punto.

### Crear — Borde explícito

```
curl -X POST https://api.fleetbase.io/v1/service-areas \
  -H "Authorization: Bearer $FLEETBASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Custom Footprint",
    "type": "region",
    "country": "SG",
    "border": {
      "type": "MultiPolygon",
      "coordinates": [[[[103.85, 1.28], [103.87, 1.28], [103.87, 1.30], [103.85, 1.30], [103.85, 1.28]]]]
    }
  }'
```

El orden de las coordenadas GeoJSON es
`[lng, lat]`
.

### Anidamiento

Pase
`parent`
(el ID público del área de servicio padre) al crear:

```
{
  "name": "San Francisco",
  "parent": "sa_def_west_coast",
  "country": "US",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "radius": 25000
}
```

## Qué sigue

* Cree zonas dentro de una área de servicio usando [Zonas](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/zones).
* Configure los desencadenantes de entrada/salida/permanencia en [Perímetros geográficos](https://fleetbase.io/docs/fleet-ops/operations/service-areas-geofences/geofences).
* Aplique tarifas diferentes por región con [Tarifas de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-rates/overview).