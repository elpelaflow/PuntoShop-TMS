---
título: "Estado de Resultados"
url: https://fleetbase.io/docs/ledger/reports/income-statement
módulo: ledger
---

# Estado de Resultados

Analice los ingresos, los gastos y el beneficio neto — su estado de resultados para un período específico.

# Estado de Resultados

El
**Estado de Resultados**
(también conocido como un estado de resultados o P&L) resume sus ingresos, costos y gastos durante un período específico. Muestra si su organización obtuvo ganancias o pérdidas.

Vaya a
**Libro Mayor → Informes → Estado de Resultados**
.

## Estructura del Informe

### Ingresos

Todas las cuentas de
**ingresos**
de su libro mayor. Cuentas de ingresos predefinidas:

* Ingresos por entrega (
  `REVENUE-DELIVERY`
  )
* Ingresos por tarifas de servicio (
  `REVENUE-SERVICE-FEE`
  )
* Ingresos por suscripción (
  `REVENUE-SUBSCRIPTION`
  )
* Otros ingresos (
  `REVENUE-OTHER`
  )

**Ingresos Totales**

### Gastos

Todas las cuentas de
**gastos**. Gastos predefinidos:

* Gasto por pago a conductores (
  `EXPENSE-DRIVER-PAYOUT`
  )
* Tarifas de la pasarela de pago (
  `EXPENSE-GATEWAY-FEES`
  )
* Reembolsos y devoluciones (
  `EXPENSE-REFUNDS`
  )
* Gastos de la billetera (
  `EXPENSE-WALLET`
  )
* Otros gastos operativos (
  `EXPENSE-OTHER`
  )

**Gastos Totales**

### Beneficio Neto

```
Beneficio Neto = Ingresos Totales - Gastos Totales
```

Un beneficio neto positivo indica ganancias; un negativo indica una pérdida para el período.

## Estableciendo el Período del Informe

Vaya a
**Libro Mayor → Informes → Estado de Resultados**
.

Establezca la
**Fecha de Inicio**
y la
**Fecha de Fin**
para el período.

Haga clic en
**Generar**
.

El período predeterminado es el mes actual (inicio del mes → hoy).

## Reconocimiento de Ingresos

Ledger utiliza
**contabilidad basada en accrual**
— los ingresos se reconocen cuando se publica una entrada de
`revenue_recognition`
(típicamente cuando se crea una factura preliminar a partir de una tarifa de
`PurchaseRate`
de Fleet-Ops, o cuando una orden registra una entrada de
`liquidacion_orden`), y no cuando se recibe el efectivo.

Para informes basados en efectivo, filtre el libro mayor general para las entradas de diario de tipo
`invoice_payment`
y
`gateway_payment`
y agréguelos en su lugar.

## Comparando Períodos

El panel de control de Ledger muestra
**comparación con el período anterior**
para los ingresos totales, los gastos totales y el beneficio neto — es decir, el período anterior de igual duración, no año tras año. Para una comparación arbitraria entre períodos, genere dos estados de resultados para los rangos correspondientes y compárelos uno al lado del otro.