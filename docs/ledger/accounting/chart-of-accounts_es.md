---
título: "Plan de cuentas"
url: https://fleetbase.io/docs/ledger/accounting/chart-of-accounts
módulo: ledger
---

# Plan de cuentas

Defina y gestione su plan de cuentas, que es la lista estructurada de cuentas utilizada para registrar todas las transacciones financieras.

# Plan de cuentas

El
**Plan de cuentas**
es la lista estructurada de todas las cuentas utilizadas por su organización para registrar transacciones financieras. Es la base de su sistema de contabilidad: cada evento financiero se clasifica en una de estas cuentas.

Vaya a
**Libro mayor → Contabilidad → Cuentas**
.

![Plan de cuentas — nombre, código, tipo, moneda, saldo y estado para cada cuenta](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-accounts-list.97699745.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Plan de cuentas predefinido

Cuando se crea su empresa de Fleetbase, Ledger crea las siguientes cuentas. Estas están marcadas
`is_system_account: true`
y están protegidas contra la eliminación.

### Activos

| Código | Nombre |
|---|---|
| `CASH-DEFAULT` | Efectivo |
| `BANK-DEFAULT` | Cuenta bancaria |
| `AR-DEFAULT` | Cuentas por cobrar |
| `STRIPE-CLEARING` | Cuenta de compensación de Stripe |
| `GATEWAY-CLEARING` | Cuenta de compensación de pago |
| `PREPAID-DEFAULT` | Gastos anticipados |

### Pasivos

| Código | Nombre |
|---|---|
| `AP-DEFAULT` | Cuentas por pagar |
| `WALLET-POOL` | Fondo de pasivos de Wallet |
| `DRIVER-PAYABLE` | Ingresos por conductor |
| `CUSTOMER-CREDIT` | Pasivo por crédito al cliente |
| `TAX-PAYABLE` | Impuestos por pagar |
| `STRIPE-FEES-PAYABLE` | Tarifas de Stripe por pagar |
| `DEFERRED-REVENUE` | Ingresos diferidos |

### Patrimonio

| Código | Nombre |
|---|---|
| `EQUITY-DEFAULT` | Patrimonio |
| `RETAINED-EARNINGS` | Ganancias retenidas |

### Ingresos

| Código | Nombre |
|---|---|
| `REVENUE-DELIVERY` | Ingresos por entrega |
| `REVENUE-SERVICE-FEE` | Ingresos por tarifa de servicio |
| `REVENUE-SUBSCRIPTION` | Ingresos por suscripción |
| `REVENUE-OTHER` | Otros ingresos |

### Gastos

| Código | Nombre |
|---|---|
| `EXPENSE-DRIVER-PAYOUT` | Gasto por pago al conductor |
| `EXPENSE-GATEWAY-FEES` | Tarifas de la cuenta de compensación de pago |
| `EXPENSE-REFUNDS` | Devoluciones y cargos |
| `EXPENSE-WALLET` | Gastos de Wallet |
| `EXPENSE-OTHER` | Otros gastos operativos |

Además, cada Wallet crea automáticamente su propia cuenta de pasivo por Wallet con el código
`WALLET-{wallet_uuid}`
— estas no aparecen en la lista predefinida anterior, pero sí aparecen junto a ella.

## Atributos de la cuenta

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre descriptivo de la cuenta |
| **Código** | Identificador alfanumérico corto (por ejemplo, `AR-DEFAULT`, `REVENUE-DELIVERY`...) Único por empresa |
| **Tipo** | `asset` , `liability` , `equity` , `revenue` , o `expense` |
| **Moneda** | Código ISO 4217 de la lista fija de 35 monedas del seleccionador |
| **Estado** | `active` , `inactive` , o `archived` |
| **Descripción** | Notas opcionales sobre el propósito de la cuenta |
| **Saldo** | Calculado a partir de las entradas de diario registradas; actualizado automáticamente |
| **¿Es una cuenta del sistema?** | `true` para las cuentas predefinidas; protegidas contra la eliminación |
| **Meta** | Clave/valor JSON arbitrario |

El `public_id` generado automáticamente sigue el formato
`account_<10 hex chars>`
.

## Crear una cuenta

Vaya a
**Libro mayor → Contabilidad → Cuentas**
.

Haga clic en
**Nueva cuenta**
.

Introduzca el
**Nombre**
,
**Código**
(alfanumérico libre) y seleccione el
**Tipo**
.

Establezca la
**Moneda**
(por defecto, su moneda base de la empresa).

Establezca el
**Estado**
—
`active`
(por defecto),
`inactive`
, o
`archived`
.

Haga clic en
**Guardar**
.

## Códigos de cuenta

Los códigos de cuenta son
**etiquetas alfanuméricas**, no rangos numéricos. Los códigos predefinidos siguen el patrón
`<TYPE>-<DETAIL>`
(por ejemplo,
`REVENUE-DELIVERY`
,
`EXPENSE-GATEWAY-FEES`
) pero puede utilizar cualquier esquema de nomenclatura que se adapte a su negocio: los códigos solo deben ser únicos por empresa.

## Cálculo del saldo

Los saldos de las cuentas se calculan a partir de la suma de todas las entradas de diario registradas:

* **Cuentas de activo y gastos**
  (débito-normal):
  `Saldo = Total de débitos - Total de créditos`
* **Cuentas de pasivos, patrimonio y ingresos**
  (crédito-normal):
  `Saldo = Total de créditos - Total de débitos`

Puede forzar el recalculo del saldo desde el panel de detalles de la cuenta haciendo clic en
**Recalcular el saldo**
.

## Ver el registro de la cuenta

Haga clic en cualquier cuenta en el plan para abrir su
**Registro de la cuenta**
— una lista cronológica de todas las entradas de diario para esa cuenta con una columna de saldo acumulado. Filtre por rango de fechas para delimitar la vista a un período específico.