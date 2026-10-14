---
title: "Remolques"
url: https://fleetbase.io/docs/fleet-ops/recursos/remolques/vista_general
modulo: fleet-ops
---

Remolques

# Remolques

Registre y opere los remolques como activos de flota de remolque de primera categoría, con conexiones de remolque, equipos, mantenimiento y telemetría.

# Remolques

Fleet-Ops modela un
**Remolque**
como un activo de flota de primera categoría. Un remolque tiene su propia identidad, ciclo de vida, dimensiones, historial de mantenimiento, equipos, dispositivos y ubicación, aunque no puede moverse por sí mismo. Esto separa los remolques, las plataformas, los tanques, los chasis, los refrigeradores, los carros y otros activos remolcable de los vehículos
**con motor**
y los equipos
**auxiliares**.

![Lista de remolques — columnas de nombre, tipo, número de matrícula, código, vehículo remolcador, estado de conexión, estado y conectividad](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-lista-remolques.8888c491.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Seleccione
**Recursos → Remolques**
, directamente debajo de Vehículos, para crear y administrar remolques.

## Cuándo utilizar cada recurso

| Recurso | Úsalo para | Ejemplos |
|---|---|---|
| **Vehículo** | Unidad rodante con motor que puede realizar trabajos de transporte | remolque, camión, furgoneta |
| **Remolque** | Activo remolcable con identidad e independencia y ciclo de vida operativo | remolque cerrado, refrigerado, plataforma, tanque, chasis |
| **Equipo** | Equipo auxiliar que se puede montar, transportar o reasignar | elevador, carretilla elevadora, unidad de refrigeración, kit de herramientas |

No cree un remolque como un remolque. Un remolque o remolcador es un Vehículo, y su relación de remolque actual se refiere a uno o más registros de Remolque.

## Datos del remolque

Los registros de remolque admiten:

* identidad y registro: nombre, código, VIN, número de matrícula y serie, marca, modelo y año;
* clasificación:
  `remolque cerrado`
  ,
  `refrigerado`
  ,
  `plataforma`
  ,
  `puente`
  ,
  `baja`
  ,
  `tanque`
  ,
  `a granel`
  ,
  `descarga`
  ,
  `chasis`
  ,
  `lado de cortina`
  ,
  `camión para transportar coches`
  ,
  `ganado`
  ,
  `madera`
  ,
  `carrito`
  ,
  `especial`
  , o
  `otro`
  ;
* estado del ciclo de vida:
  `disponible`
  ,
  `en uso`
  ,
  `mantenimiento`
  ,
  `fuera de servicio`
  , o
  `desactivado`
  — estado de conexión y conectividad se derivan por separado y nunca sobrescriben el estado del ciclo de vida;
* especificaciones físicas del remolque en su sistema de medición (métrico o imperial): longitud, ancho, altura, peso en vacío, capacidad máxima de peso del vehículo, capacidad de carga, volumen de carga, ejes, neumáticos, puertas, tipo de acoplamiento, tipo de frenos, ABS y EBS;
* detalles del refrigerador: indicador refrigerado, rango de temperatura y horas del motor del refrigerador;
* propiedad y financiación: tipo de propiedad, estado de financiación, fechas de compra y arrendamiento, moneda, coste de adquisición, valor actual, valor asegurado, tasa de depreciación, proveedor, garantía, foto, notas y campos personalizados;
* el vehículo de remolque actual y todo el historial de remolque;
* dispositivos y equipos adjuntos;
* ubicación, conectividad, horarios de mantenimiento, órdenes de trabajo e historial de mantenimiento.

![Panel de detalles del remolque — identificación, registro y conexión de remolque actual](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-detalles-remolque.fc9900c1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El formulario de la consola solo muestra la sección de refrigerador para los remolques refrigerados y la fecha de vencimiento del arrendamiento para los remolques arrendados, alquilados o financiados, y etiqueta cada campo dimensional con la unidad implícita en el sistema de medición.

## Ciclo de vida

1. Cree o importe el remolque.
2. Adjunte equipos y un dispositivo de telemetría cuando sea necesario.
3. Conecte el remolque a un vehículo cuando comience un movimiento de remolque.
4. Rastreelo directamente a través de su dispositivo o la API de seguimiento de remolques.
5. Desconecte cuando termine el movimiento. Fleet-Ops conserva la conexión completada en el historial de remolque.
6. Programe inspecciones y mantenimiento para el remolque en sí.

Un remolque no se puede eliminar mientras está conectado a un vehículo. Desconéctelo primero para que el historial operativo sea preciso; la API responde con
`409 Conflict`
hasta que lo haga, y la eliminación masiva en la consola omite los remolques conectados.

## API

Los remolques están expuestos en
`/v1/remolques`
y utilizan el identificador público
`trailer_`
. Las respuestas nunca incluyen identificadores únicos privados.

### Crear un remolque

```
curl -X POST https://api.fleetbase.io/v1/remolques \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Remolque 12",
    "code": "REM-0012",
    "type": "refrigerado",
    "status": "disponible",
    "número_de_matrícula": "REM-1200",
    "sistema_de_medición": "métrico",
    "capacidad_de_carga": 20000,
    "ejes": 2,
    "refrigerado": true,
    "temperatura_mínima": -20,
    "temperatura_máxima": 4
  }'
```

```
{
  "id": "remolque_7YqM3KpL2n",
  "clase_de_activo": "remolque",
  "nombre": "Remolque 12",
  "nombre_de_visualización": "Remolque 12",
  "código": "REM-0012",
  "tipo": "refrigerado",
  "estado": "disponible",
  "estado_de_conexión": "desconectado",
  "estado_en_línea": null,
  "número_de_matrícula": "REM-1200",
  "id_de_categoría": null,
  "id_de_proveedor": null,
  "id_de_garantía": null,
  "id_de_foto": null,
  "id_de_vehículo": null,
  "vehículo_actual": null,
  "conexión_actual": null,
  "conexiones": [],
  "dispositivos": [],
  "equipos": [],
  "conteo_de_dispositivos": 0,
  "conteo_de_equipos": 0,
  "sistema_de_medición": "métrico",
  "capacidad_de_carga": "20000.000",
  "ejes": 2,
  "refrigerado": true,
  "temperatura_mínima": "-20.000",
  "temperatura_máxima": "4.000",
  "ubicación": { "tipo": "Punto", "coordenadas": [0, 0] },
  "telemetría": null,
  "creado_en": "2026-09-07T11:35:32.000000Z",
  "actualizado_en": "2026-09-07T11:35:32.000000Z"
}
```

Los identificadores de relación (
`id_de_categoría`
,
`id_de_proveedor`
,
`id_de_garantía`
,
`id_de_foto`
y
`id_de_vehículo`
) siempre están presentes para que se pueda leer la escritura. Pasa el identificador público relacionado bajo
`categoría`
,
`proveedor`
,
`garantía`
o
`foto`
cuando se crea o actualice; envía
`null`
para borrar uno.

### Expandir objetos relacionados

Utilice
`con`
(o
`expand`
) para incluir el objeto relacionado junto con su identificador. Las expansiones admitidas son
`categoría`
,
`proveedor`
,
`garantía`
,
`foto`
y
`posiciones`
; los nombres desconocidos se ignoran.

```
curl "https://api.fleetbase.io/v1/remolques/remolque_7YqM3KpL2n?con=proveedor,categoría" \
  -H "Authorization: Bearer $FLEETBASE_API_KEY"
```

El estado de remolque (
`conexión_actual`
,
`conexión_actual`
,
`conexiones`
), los
`dispositivos`
adjuntos y los
`equipos`
adjuntos son parte de la representación base y siempre se incluyen.

### Listar y filtrar

```
curl "https://api.fleetbase.io/v1/remolques?tipo=refrigerado&estado_de_conexión=desconectado&estado_en_línea&limite=25&ordenar=-creado_en" \
  -H "Authorization: Bearer $FLEETBASE_API_KEY"
```

Los filtros admitidos incluyen
`query`
,
`tipo`
,
`estado`
,
`estado_de_conexión`
(
`conectado`
o
`desconectado`
),
`estado_en_línea`
(
`en_línea`
,
`recientemente_fuera_de_línea`
,
`fuera_de_línea`
,
`nunca_conectado`
),
`vehículo`
(el identificador público del vehículo remolcador),
`proveedor`
,
`categoría`
,
`número_de_matrícula`
,
`VIN`
,
`refrigerado`
,
`tipo_de_propiedad`
,
`creado_en`
,
`actualizado_en`
y
`último_en_línea_en`
.

### Actualizar y eliminar

`PUT /v1/remolques/{id}`
acepta los mismos campos que la creación.
`DELETE /v1/remolques/{id}`
elimina suavemente un remolque desconectado y devuelve
`409 Conflict`
para uno conectado.

## Páginas relacionadas

* [Conexiones y equipos](https://fleetbase.io/docs/fleet-ops/recursos/remolques/conexiones-y-equipos)
* [Telemetría del remolque](https://fleetbase.io/docs/fleet-ops/recursos/remolques/telemetría)
* [Vehículos](https://fleetbase.io/docs/fleet-ops/recursos/vehículos/vista_general)
* [Mantenimiento](https://fleetbase.io/docs/fleet-ops/mantenimiento/vista_general)