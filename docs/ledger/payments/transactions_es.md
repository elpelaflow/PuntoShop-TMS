---
título: "Transacciones"
url: https://fleetbase.io/docs/ledger/payments/transactions
módulo: ledger
---

# Transacciones

Visualice el registro inmutable de cada movimiento de la billetera: filtre por tipo, estado, dirección y rango de fechas.

# Transacciones

A
**Transacción**
es el registro inmutable de un movimiento de dinero relativo a una billetera. Las transacciones nunca se modifican ni se eliminan: son el registro de auditoría para cada evento financiero en su sistema.

Navegue a
**Libro Mayor → Pagos → Transacciones**
.

## Atributos de la Transacción

| Campo | Descripción |
|---|---|
| **Tipo** | El tipo de evento financiero (ver tipos a continuación) |
| **Dirección** | `crédito` (dinero entrante) o `débito` (dinero saliente) relativo a la billetera |
| **Estado** | Estado actual de la transacción |
| **Monto** | Monto de la transacción en unidades monetarias menores |
| **Monto de la tarifa** | Tarifa de la puerta de enlace o de procesamiento |
| **Monto del impuesto** | Impuesto aplicado a la transacción |
| **Monto neto** | `Monto − Tarifas − Impuestos` |
| **Saldo después de** | Saldo de la billetera inmediatamente después de esta transacción |
| **Moneda** | Moneda de la transacción |
| **Asunto** | La billetera (u otra entidad) contra la que se registra la transacción (polimórfico) |
| **Pagador** | Quién pagó (polimórfico) |
| **Beneficiario** | Quién recibió (polimórfico) |
| **Iniciador** | Quién desencadenó la transacción (polimórfico) |
| **Contexto** | Enlace polimórfico opcional a la fuente (factura, pedido, etc.) |
| **Puerta de enlace** | La puerta de enlace que procesó esto, si corresponde |
| **Referencia** | Referencia legible por humanos (número de factura, ID de pedido) |
| **Descripción** | Para qué sirve la transacción |
| **Motivo del fallo / Código de fallo** | Se completa en caso de fallos |
| **Liquidado / Anulado / Revertido / Vencimiento** | Marcas de tiempo para las transiciones de estado cuando corresponda |

## Tipos de Transacciones

Estos tipos se escriben por el sistema en código:

| Tipo | Fuente |
|---|---|
| `depósito` | Crédito manual o recarga de la puerta de enlace |
| `retiro` | Débito directo (manual) |
| `transferencia_entrada` | Lado de entrada de una transferencia entre billeteras |
| `transferencia_salida` | Lado de salida de una transferencia entre billeteras |
| `ganancia` | Crédito por trabajo completado (por ejemplo, ingreso del conductor) |
| `pago` | Débito para enviar fondos (por ejemplo, pago del conductor a la cuenta bancaria) |
| `pago_por_factura` | Pago registrado contra una factura |

Una transferencia entre billeteras produce
**dos**
transacciones:
`transferencia_salida`
en la fuente y
`transferencia_entrada`
en el destino.

## Estados de la Transacción

El modelo admite una amplia gama de estados con las marcas de tiempo correspondientes (`liquidado_en`, `anulado_en`, `revertido_en`, `vencimiento_en`), pero el propio sistema actualmente solo escribe `completado`. Las integraciones personalizadas pueden producir otros estados.

| Estado | Significado |
|---|---|
| `pendiente` | Iniciado pero aún no confirmado (integraciones personalizadas) |
| `completado` | Exitoso; se actualiza el saldo de la billetera |
| `fallido` | No se pudo completar |
| `anulado` | Inválido antes de la finalización |
| `revertido` | Cancelado después de la finalización; se restaura el saldo |
| `vencido` | Vencido antes de ser confirmado |

## Filtrar Transacciones

Utilice el panel de filtros para reducir la lista:

* **Dirección**
  — crédito o débito
* **Tipo**
  — filtre por tipo de transacción
* **Estado**
  — filtre por estado
* **Rango de fechas**
  — fecha de inicio y fecha de finalización

La pestaña
**Transacciones**
específica de la billetera en un panel de detalles de la billetera, delimita la lista a esa billetera específica.

## Detalle de la Transacción

Haga clic en cualquier transacción para ver su panel de detalles completo, que incluye:

* Desglose del monto (tarifa, impuesto, neto)
* Sección de liquidación (liquidado a, monto liquidado, moneda liquidada, tipo de cambio)
* Todas las partes polimórficas (asunto, pagador, beneficiario, iniciador, contexto)
* Dirección IP (para transacciones originadas por la puerta de enlace)
* Entrada de registro vinculada
* ID de referencia de la puerta de enlace
* Motivo del fallo y código de fallo (para transacciones fallidas)

## Transacciones Automatizadas

La mayoría de las transacciones se crean automáticamente:

* **Recarga de la billetera**
  a través de la puerta de enlace →
  `depósito`
* **Ingreso del conductor**
  creditado →
  `ganancia`
* **Transferencia entre billeteras**
  → emparejado
  `transferencia_entrada`
  y
  `transferencia_salida`
* **Pago de factura**
  (manual o a través del portal público) →
  `pago_por_factura`
* **Pago del conductor**
  →
  `pago`

Las transacciones manuales se producen a través de las operaciones de la billetera en el panel de detalles de la billetera (Crédito, Recarga, Transferencia, Pago).