---
title: "Fleet-Ops"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops
module: extension-development
---

Vistas de recursos

Catálogo de registros

# Fleet-Ops

Cada registro de vista de recursos Fleet-Ops declara — los nombres de los registros para cada tabla y vista de detalles, donde se define la conexión con la fuente Fleet-Ops, y los identificadores incorporados para asociar sus elementos.

# Registros de Fleet-Ops

Fleet-Ops (
`@fleetbase/fleetops-engine`
, desde la versión 0.6.71) declara registros para
**25 recursos**
. Cada nombre comienza con
`fleet-ops:`
y sigue el formato
`fleet-ops:<recurso>:<superficie>:<ranura>`
.

La tabla enumera cada recurso y el archivo de origen al que está asociado. Abra un recurso a continuación para conocer sus nombres de registro e identificadores incorporados.

| Recurso | Vista | Tabla | Detalles | Panel lateral |
|---|---|---|---|---|
| [`order`](#order) | Órdenes | `index.hbs` | `details.hbs` | `order-actions.js` |
| [`service-rate`](#service-rate) | Tasas de servicio | `index.hbs` | `details.hbs` | `service-rate-actions.js` |
| [`driver`](#driver) | Conductores | `index.hbs` | `details.hbs` | `driver-actions.js` |
| [`vehicle`](#vehicle) | Vehículos | `index.hbs` | `details.hbs` | `vehicle-actions.js` |
| [`trailer`](#trailer) | Remolques | `index.hbs` | `details.hbs` | `trailer-actions.js` |
| [`fleet`](#fleet) | Flotas | `index.hbs` | `details.hbs` | `fleet-actions.js` |
| [`place`](#place) | Lugares | `index.hbs` | `details.hbs` | `place-actions.js` |
| [`contact`](#contact) | Contactos | `index.hbs` | `details.hbs` | `contact-actions.js` |
| [`customer`](#customer) | Clientes | `customers.hbs` · `contacts.hbs` | `details.hbs` | `customer-actions.js` |
| [`vendor`](#vendor) | Proveedores | `index.hbs` | `details.hbs` | `vendor-actions.js` |
| [`integrated-vendor`](#integrated-vendor) | Proveedores integrados | `integrated.hbs` | — | — |
| [`issue`](#issue) | Problemas | `index.hbs` | `details.hbs` | `issue-actions.js` |
| [`fuel-report`](#fuel-report) | Informes de combustible | `index.hbs` | `details.hbs` | `fuel-report-actions.js` |
| [`fuel-transaction`](#fuel-transaction) | Transacciones de combustible | `index.hbs` | — | — |
| [`device`](#device) | Dispositivos | `index.hbs` | `details.hbs` | `device-actions.js` |
| [`sensor`](#sensor) | Sensores | `index.hbs` | `details.hbs` | `sensor-actions.js` |
| [`device-event`](#device-event) | Eventos de dispositivos | `index.hbs` | — | — |
| [`equipment`](#equipment) | Equipamiento | `index.hbs` | `details.hbs` | `equipment-actions.js` |
| [`part`](#part) | Piezas | `index.hbs` | `details.hbs` | `part-actions.js` |
| [`maintenance`](#maintenance) | Mantenimiento | `index.hbs` | `details.hbs` | `maintenance-actions.js` |
| [`schedule`](#schedule) | Horarios de mantenimiento | `index.hbs` | `details.hbs` | `maintenance-schedule-actions.js` |
| [`work-order`](#work-order) | Órdenes de trabajo | `index.hbs` | `details.hbs` | `work-order-actions.js` |
| [`inspection-form`](#inspection-form) | Formularios de inspección | `index.hbs` | `details.hbs` | `inspection-form-actions.js` |
| [`inspection-submission`](#inspection-submission) | Inspecciones | `index.hbs` | — | `inspection-submission-actions.js` |
| [`report`](#report) | Informes | `index.hbs` | `details.hbs` | — |

## Recursos

### order — Órdenes
### service-rate — Tasas de servicio
### driver — Conductores
### vehicle — Vehículos
### trailer — Remolques
### fleet — Flotas
### place — Lugares
### contact — Contactos

### Cliente — Clientes

### Proveedor — Proveedores

### Proveedor integrado — Proveedores integrados

### Problema — Problemas

### Informe de combustible — Informes de combustible

### Transacción de combustible — Transacciones de combustible

### Dispositivo — Dispositivos

### Sensor — Sensores

### Evento del dispositivo — Eventos del dispositivo

### Equipo — Equipos

### Pieza — Piezas

### Mantenimiento — Mantenimiento

### Programa de mantenimiento — Programas de mantenimiento

### Órden de trabajo — Órdenes de trabajo

### Formulario de inspección — Formularios de inspección

### Inspecciones — Inspecciones

### Informe — Informes

[Visión general

Cada registro de vista de recurso declara los motores integrados — una página por motor, con los nombres de registro, los identificadores integrados y un enlace a la fuente que lo conecta.](https://fleetbase.io/docs/extension-development/resource-views/catalogue)
[Libro mayor

Cada registro de vista de recurso declara el libro mayor — los nombres de registro para cada tabla y vista de detalles, donde cada uno está conectado a la fuente del libro mayor, y los identificadores integrados para colocar sus artículos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger)