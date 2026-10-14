---
title: "Conceptos fundamentales"
url: https://fleetbase.io/docs/ledger/getting-started/core-concepts
module: ledger
---

# Conceptos fundamentales

Los conceptos fundamentales de Ledger: contabilidad de doble partida, cuentas, entradas en el diario, carteras, facturas, transacciones y cómo todo esto se relaciona.

# Conceptos fundamentales

Ledger implementa una contabilidad de doble partida adecuada. Comprender el modelo contable fundamental le ayuda a utilizar el sistema correctamente e interpretar sus informes financieros.

## La ecuación contable

Todo en Ledger sigue esta regla fundamental:

```
Activos = Pasivos + Patrimonio
```

Cada evento financiero se registra como una
**entrada en el diario**
que debita una cuenta y acredita otra, la ecuación siempre permanece equilibrada.

## Tipos de cuentas

Ledger utiliza cinco tipos de cuentas estándar. El valor del código de la
`cuenta`
en Ledger son
**etiquetas alfanuméricas**
(por ejemplo,
`CASH-DEFAULT`
,
`WALLET-POOL`
,
`REVENUE-DELIVERY`
), no rangos numéricos.

| Tipo | Saldo normal | Ejemplos de inicio |
| --- | --- | --- |
| **Activo** | Débito | Efectivo, Cuenta bancaria, Cuentas por cobrar, Stripe Clearing |
| **Pasivo** | Crédito | Cuentas por pagar, Fondo de responsabilidad del Wallet, Ingresos por honorarios de conductor, Impuestos pendientes |
| **Patrimonio** | Crédito | Patrimonio del propietario, Beneficios retenidos |
| **Ingresos** | Crédito | Ingresos por entrega, Ingresos por servicio, Ingresos por suscripción, Otros ingresos |
| **Gastos** | Débito | Gastos de pago al conductor, Tarifas de pasarela de pago, Reembolsos y devoluciones, Otros gastos operativos |

Las cuentas con
**saldo normal**
(Activos, Gastos): los débitos aumentan el saldo; los créditos lo disminuyen.
Las cuentas con
**saldo normal**
(Pasivos, Patrimonio, Ingresos): los créditos aumentan el saldo; los débitos lo disminuyen.

Consulte
[El esquema de cuentas](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
para obtener la lista completa de ejemplos de inicio.

## Entradas en el diario

Cada evento financiero crea una entrada en el diario con:

* Una
  **cuenta de débito**
  y una
  **cuenta de crédito**
* Una
  **cantidad**
  en la moneda de la cuenta (almacenada como unidades menores)
* Un
  **tipo**
  — los tipos del sistema incluyen
  `general`
  (por defecto),
  `manual_entry`
  ,
  `revenue_recognition`
  ,
  `invoice_payment`
  ,
  `gateway_payment`
  , y
  `liquidacion_orden`
  . El selector de formulario para entradas manuales también ofrece
  `standard`
  ,
  `adjusting`
  ,
  `closing`
  ,
  `reversing`
  , y
  `opening`
* Un
  **estado**
  — actualmente solo
  `posted`
  es producido por el sistema; no hay ninguna acción de reversión o cancelación integrada
* Una
  **`is_system_entry`**
  —
  `true`
  para entradas automatizadas,
  `false`
  para las manuales

Los números de entrada en el diario siguen el formato
`JE-00001`
(con ceros y de 5 dígitos).

Ejemplo: un cliente paga una factura:

```
DEBIT  Efectivo (Activo)               +$100
CREDIT Cuentas por cobrar (Activo) +$100  ← disminuye el saldo de las cuentas por cobrar
```

(Las cuentas por cobrar son de saldo normal, por lo que el crédito reduce el saldo pendiente del cliente.)

## Carteras

Una
**Cartera**
es un saldo digital que se rastrea en Ledger. Las carteras son polimórficas:
`subject_uuid`
+
`subject_type`
apuntan a la entidad que posee el saldo:

| Tipo de cartera | Sujeto | Caso de uso |
| --- | --- | --- |
| **Conductor** | Conductor de Fleet-Ops | Rastrear los ingresos por entregas completadas |
| **Cliente** | Cliente / Dador de carga de Fleet-Ops | Crédito de flete anticipado o depósito de cuenta |
| **Empresa** | Su organización | Cuenta operativa, ingresos de la plataforma |
| **Usuario** | Usuario individual | Cuenta personal |

Operaciones de carteras:

* **Crédito**
  — crédito manual, sin cargos de pasarela
* **Aportación**
  — Aportación con cargos de pasarela a través de GNU Taler, Stripe o QPay
* **Transferencia**
  — mover fondos entre dos carteras — crea dos transacciones (
  `transfer_out`
  y
  `transfer_in`
  ) y una entrada en el diario entre las cuentas de pasivos de las dos carteras
* **Pago**
  — debitar la cartera (por ejemplo, pago de honorarios al conductor)
* **Congelar / Descongelar**
  — activar/desactivar el estado. El atributo
  `is_frozen`
  es un
  **accesorio calculado**
  derivado de
  `status === 'frozen'`
* **Recalcular**
  — recalcular el saldo a partir de las transacciones completadas

Cada operación de cartera crea automáticamente una entrada en el diario:

```
Aportación:    DEBIT Efectivo → CREDIT Pasivo de la cartera
Pago:    DEBIT Pasivo de la cartera → CREDIT Efectivo
Transferencia:  DEBIT Pasivo A → CREDIT Pasivo B   (directa, sin intermediario)
```

Cada cartera tiene su propia cuenta de Ledger creada automáticamente con el código
`WALLET-{uuid_de_la_cartera}`
. Consulte
[Carteras](https://fleetbase.io/docs/ledger/payments/wallets)
.

## Facturas

Una
**Factura**
es una solicitud de pago formal con un ciclo de vida:

```
borrador → enviada → vista → parcial / pagada / vencida / cancelada / reembolsada / anulada
```

| Estado | Significado |
| --- | --- |
| `borrador` | Creado, aún no enviado |
| `enviada` | Marcado como enviado |
| `vista` | El cliente abrió la URL pública |
| `parcial` | Pago parcial recibido |
| `pagada` | Pagado por completo ( `balance = 0` ) |
| `vencida` | Pasado la fecha de vencimiento, aún no pagado (establecido mediante el comando de la consola `ledger:update-overdue-invoices`) |
| `cancelada` | Cancelado por el usuario |
| `reembolsada` | Establecido cuando se procesa un reembolso a través de la pasarela |
| `anulada` | Establecido programáticamente cuando se reemplaza una factura de borrador por una nueva (por ejemplo, de la facturación automática de Fleet-Ops) |

Campos clave de la factura:

* **Número**
  — generado automáticamente, formato
  `INV-`
  más un número aleatorio de 6 dígitos (por ejemplo,
  `INV-004821`
  ); no secuencial
* **Cliente**
  — referencia polimórfica (
  `customer_uuid`
  +
  `customer_type`
  ); soporta contactos de Fleetbase, proveedores, conductores y usuarios
* **Ítems**
  — descripción, cantidad, precio unitario, tasa de impuestos (decimal 0–100); subtotal, impuestos, total se calculan
* **Totales**
  —
  `subtotal`
  ,
  `tax`
  ,
  `total_amount`
  ,
  `amount_paid`
  ,
  `balance`
  (todos calculados)
* **Fecha de vencimiento**
  — establecida automáticamente a partir de la configuración de
  `due_date_offset_days`
  de la factura (solo cuando no es cero)
* **Enlace de pedido**
  — enlace opcional
  `order_uuid`
  que hace referencia a un pedido de Fleet-Ops
* **Enlace de transacción**
  — enlace opcional
  `transaction_uuid`
  que hace referencia a una transacción de cartera

Cuando se crea una factura a partir de una Tasa de Compra de Fleet-Ops, se publica una entrada de diario de
`revenue_recognition`
(DEBIT Cuentas por cobrar → CREDIT Ingresos).

Cuando se registra el pago, se publica una entrada de diario de
`invoice_payment`
(DEBIT Efectivo → CREDIT Cuentas por cobrar).

## Transacciones

Una
**Transacción**
es el registro inmutable del movimiento de dinero en relación con una cartera. Las transacciones nunca se editan ni se eliminan; son el registro de auditoría.

Campos clave:

* `direction`
  —
  `credit`
  (entrada de dinero) o
  `debit`
  (salida de dinero)
* `status`
  — actualmente el sistema solo produce
  `completed`
  (el modelo también admite
  `pending`
  ,
  `failed`
  ,
  `voided`
  ,
  `reversed`
  ,
  `expired`
  si usted las escribe)
* `type`
  — tipos escritos por el sistema son
  `deposit`
  ,
  `withdrawal`
  ,
  `transfer_in`
  ,
  `transfer_out`
  ,
  `earning`
  ,
  `payout`
  , y
  `invoice_payment`
* `amount`
  ,
  `fee_amount`
  ,
  `tax_amount`
  ,
  `net_amount`
  — desglose completo del costo
* `gateway`
  — el procesador de pagos que manejó esto, si corresponde
* `subject`
  /
  `payer`
  /
  `payee`
  /
  `initiator`
  /
  `context`
  — relaciones polimórficas que capturan quién/qué está involucrado

Consulte
[Transacciones](https://fleetbase.io/docs/ledger/payments/transactions)
.

## Pasarelas de pago

Las
**Pasarelas**
son procesadores de pagos con credenciales encriptadas. Ledger viene con cuatro motores:

| Motor | Capacidades |
| --- | --- |
| `taler` | compra, reembolso, URI de pago de cartera, URI de reembolso, webhooks, comprobaciones de diagnóstico, liquidación |
| `stripe` | compra, reembolso, tokenización, setup\_intent, checkout\_session, webhooks, sandbox, suscripción |
| `qpay` | compra, reembolso, webhooks, sandbox |
| `cash` | compra, reembolso |

Cada interacción con la pasarela crea un registro de auditoría
`GatewayTransaction`
— utilizado para la idempotencia (protección contra duplicados de webhooks mediante la comprobación
`isProcessed()`
) y depuración.

Se pueden registrar terceros a través de la API
`PaymentGatewayManager::extend()`
.

## Cómo todo se conecta

Fleet-Ops:

```
Pedido de Fleet-Ops → Se crea una Tasa de Compra
  → El observador de Tasa de Compra de Ledger crea una factura de borrador
    → El cliente paga a través de la pasarela (o usted registra el pago manualmente)
      → Se publica una entrada de diario de pago de factura
        → Se marca la factura como pagada; se limpia la antigüedad de las cuentas por cobrar
```

Liquidación directa de transporte:

```
Finalización de orden de transporte directa (order.type === 'transport')
  → El observador de órdenes de Ledger crea una entrada de liquidacion_orden
    DEBIT Efectivo → CREDIT Ingresos
  (Para órdenes de flete con liquidación directa sin factura previa)
```

Flujos de carteras:

```
El cliente realiza un pago a través de GNU Taler, Stripe o QPay → Se registra la transacción de la pasarela → Entrada en el diario (DEBIT Efectivo → CREDIT Pasivo de la cartera)
El conductor recibe un pago → Entrada en el diario (DEBIT Pasivo de la cartera → CREDIT Efectivo)
```