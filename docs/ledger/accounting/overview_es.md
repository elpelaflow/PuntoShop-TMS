---
título: "Contabilidad"
url: https://fleetbase.io/docs/ledger/accounting/overview
módulo: ledger
---

# Contabilidad

Gestiona tu plan de cuentas, el libro mayor general y las entradas del diario — la base del sistema de contabilidad de doble entrada de Ledger.

# Contabilidad

El
**módulo de Contabilidad**
proporciona la base de contabilidad de doble entrada de Ledger. Gestiona el plan de cuentas, registra todas las actividades financieras como entradas del diario y las consolida en el libro mayor general.

Navega a
**Ledger → Contabilidad**
para acceder a las funciones de contabilidad.

## Componentes principales

### Plan de cuentas

Una lista estructurada de todas las cuentas utilizadas para categorizar las actividades financieras. Ledger crea un plan de cuentas predeterminado cuando se crea tu empresa: Efectivo, Cuenta bancaria, Cuentas por cobrar, Clearing de Stripe, Fondo de deudas, Pagos a conductores, Impuestos pendientes, Patrimonio neto, Ingresos por entregas, Gastos de pago a conductores, y más.

Cinco tipos de cuentas:

* **Activo**
  — lo que posee tu organización (efectivo, cuentas por cobrar, cuentas de clearing)
* **Pasivo**
  — lo que debe tu organización (deudas, saldos de billetera, impuestos pendientes)
* **Patrimonio neto**
  — participación del propietario (Patrimonio neto, Beneficios retenidos)
* **Ingresos**
  — ingresos por operaciones (entrega, tarifa de servicio, suscripción)
* **Gastos**
  — costos incurridos (pagos a conductores, tarifas de clearing, reembolsos, operaciones)

Consulta
[Plan de cuentas](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
para obtener más información.

### Entradas del diario

Los registros atómicos de cada evento financiero. Cada entrada del diario debitará una cuenta y acreditará otra. Ledger crea automáticamente entradas del diario para los pagos de facturas, transacciones de clearing, operaciones de billetera y liquidaciones de órdenes de transporte. También puedes crear entradas manuales para ajustes. Consulta
[Entradas del diario](https://fleetbase.io/docs/ledger/accounting/journal-entries)
.

### Libro mayor general

El registro maestro de todas las entradas del diario. La vista del libro mayor general muestra cada entrada en el plan, con fecha, referencia, débito, crédito y saldo actual. Consulta
[Libro mayor general](https://fleetbase.io/docs/ledger/accounting/general-ledger)
.

## Contabilidad automatizada

La mayoría de las entradas del diario en Ledger se crean automáticamente:

| Evento | Entrada del diario creada | Tipo |
|---|---|---|
| Creación de la tarifa de compra de Fleet-Ops | DEBIT Cuentas por cobrar, CREDIT Ingresos | `revenue_recognition` |
| Registro de pago de factura | DEBIT Efectivo, CREDIT Cuentas por cobrar | `invoice_payment` |
| Procesamiento de pago a través de clearing | DEBIT Efectivo, CREDIT cuenta de clearing o ingresos | `gateway_payment` |
| Finalización de orden de flete | DEBIT Efectivo, CREDIT Ingresos | `liquidacion_orden` |
| Top-up / crédito en la billetera | DEBIT Efectivo, CREDIT Deuda de la billetera | `general` |
| Pago de la billetera | DEBIT Deuda de la billetera, CREDIT Efectivo | `general` |
| Transferencia de billetera (A → B) | DEBIT Deuda de la billetera de A, CREDIT Deuda de la billetera de B (directa) | `general` |

Se pueden crear entradas del diario manuales para ajustes únicos, entradas de cierre o correcciones. El selector de formularios ofrece los tipos
`standard`
,
`adjusting`
,
`closing`
,
`reversing`
y
`opening`
.

## Ciclo de vida de la contabilidad

```
Ocurre un evento financiero
  → Ledger crea una entrada del diario (débito + crédito, estado = publicado)
    → Se actualizan los saldos de las cuentas
      → El libro mayor general refleja el historial actualizado
        → Se extraen informes financieros de las entradas del diario publicadas
```

## Configuración

Configura los valores predeterminados de contabilidad en
**Ledger → Configuración → Contabilidad**
:

* **Moneda base**
  (
  `base_currency`
  ) — moneda predeterminada de la organización
* **Mes de inicio del año fiscal**
  (
  `fiscal_year_start_month`
  )
* **Publicar automáticamente las entradas del diario**
  (
  `auto_post_journal_entries`
  )
* **Cuenta de Cuentas por cobrar predeterminada**
  (
  `default_ar_account_uuid`
  )
* **Cuenta de Ingresos predeterminada**
  (
  `default_revenue_account_uuid`
  )
* **Cuenta de Gastos predeterminada**
  (
  `default_expense_account_uuid`
  )

Consulta
[Configuración](https://fleetbase.io/docs/ledger/settings/overview)
.