---
title: "Ledger"
url: https://fleetbase.io/docs/extension-development/resource-views/catalogue/ledger
module: extension-development
---

Vistas de recursos

Catálogo de registros

# Ledger

Cada registro de vistas de recursos Ledger declara — los nombres de los registros para cada tabla y vista de detalles, donde se conecta a la fuente Ledger, y los identificadores incorporados para colocar sus elementos.

# Registros de Ledger

Ledger (
`@fleetbase/ledger-engine`
, desde la versión 0.0.12) declara registros para
**7 recursos**. Cada nombre comienza con
`ledger:`
y sigue el formato
`ledger:<recurso>:<superficie>:<ranura>`
.

La tabla enumera cada recurso y el archivo de origen al que se conecta. Abra un recurso a continuación para obtener sus nombres de registro e identificadores incorporados.

| Recurso | Vista | Tabla | Detalles | Panel lateral |
|---|---|---|---|---|
| [`invoice`](#invoice) | Facturas | `index.hbs` | `details.hbs` | — |
| [`invoice-template`](#invoice-template) | Plantillas de facturas | `index.hbs` | — | — |
| [`transaction`](#transaction) | Transacciones | `index.hbs` | `details.hbs` | — |
| [`wallet`](#wallet) | Billeteras | `index.hbs` | `details.hbs` | — |
| [`gateway`](#gateway) | Puertos de pago | `index.hbs` | — | — |
| [`account`](#account) | Cuentas | `index.hbs` | `details.hbs` | — |
| [`journal`](#journal) | Entradas del diario | `index.hbs` | `details.hbs` | — |

## Recursos

### invoice — Facturas

### invoice-template — Plantillas de facturas

### transaction — Transacciones

### wallet — Billeteras

### gateway — Puertos de pago

### account — Cuentas

### journal — Entradas del diario

[Fleet-Ops
Cada registro de vistas de recursos Fleet-Ops declara — los nombres de los registros para cada tabla y vista de detalles, donde se conecta a la fuente Fleet-Ops, y los identificadores incorporados para colocar sus elementos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/fleet-ops)
[IAM
Cada registro de vistas de recursos IAM declara — los nombres de los registros para cada tabla y vista de detalles, donde se conecta a la fuente IAM, y los identificadores incorporados para colocar sus elementos.](https://fleetbase.io/docs/extension-development/resource-views/catalogue/iam)