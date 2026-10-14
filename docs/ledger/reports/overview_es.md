---
título: "Informes financieros"
url: https://fleetbase.io/docs/ledger/reports/overview
módulo: ledger
---

# Informes financieros

Genera informes financieros estándar: balance general, estado de resultados, flujo de caja, balance de comprobación, antigüedad de facturas pendientes y resumen de cuentas.

# Informes financieros

El
**módulo Informes**
genera estados financieros estándar a partir de tus datos de Ledger. Los informes se calculan en tiempo real a partir de las entradas de diario registradas, siempre actualizados y precisos. No se requiere pre-cálculo.

Navega a
**Ledger → Informes**
para acceder a todos los informes.

![Panel de control de Ledger — Tarjetas KPI, gráfico de tendencias de ingresos, entradas de diario recientes](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-dashboard.98b061ae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Informes disponibles

| Informe | Qué muestra |
|---|---|
| Panel de control | KPIs y gráfico de tendencias |
| [Balance general](https://fleetbase.io/docs/ledger/reports/balance-sheet) | Activos, pasivos y patrimonio neto en un momento determinado |
| [Estado de resultados](https://fleetbase.io/docs/ledger/reports/income-statement) | Ingresos, gastos y beneficio neto por un período |
| [Estado de flujo de caja](https://fleetbase.io/docs/ledger/reports/cash-flow) | Flujos de efectivo operativos, de financiación e inversión |
| [Balance de comprobación](https://fleetbase.io/docs/ledger/reports/trial-balance) | Todas las cuentas con totales de débitos/créditos — verifica el equilibrio de los libros |
| [Antigüedad de facturas pendientes](https://fleetbase.io/docs/ledger/reports/ar-aging) | Facturas pendientes agrupadas según su antigüedad |
| [Resumen de cuentas](https://fleetbase.io/docs/ledger/reports/wallet-summary) | Conteo de cuentas, estadísticas por período y cuentas principales |
| Libro mayor general | Lista de entradas de diario principales |

## KPIs del panel de control

El
**Panel de control de Ledger**
(pantalla de inicio) muestra las métricas clave de forma rápida:

* **Ingresos totales**
  — suma de los saldos de las cuentas de ingresos para el período, con
  **comparación con el período anterior**
  (período sobre período de igual duración,
  **no**
  año sobre año)
* **Gastos totales**
  — suma de los saldos de las cuentas de gastos
* **Beneficio neto**
  — Ingresos − Gastos
* **Facturas pendientes**
  — saldo total de facturas pendientes de pago
* **Facturas pendientes con vencimiento**
  — facturas pendientes de pago más allá de la fecha de vencimiento
* **Conteo de estado de las facturas**
  — desglose por estado
* **Tendencia de ingresos**
  — gráfico de ingresos diarios
* **Últimas entradas de diario**
  — las 10 últimas entradas

## Filtrado de fechas

Los informes están disponibles en dos formatos:
**en un momento específico**
(utiliza una fecha "a partir del") y
**período delimitado**
(utiliza un rango de inicio/fin):

| Informe | Entrada de fecha | Predeterminado |
|---|---|---|
| Balance general | Fecha de referencia | hoy |
| Balance de comprobación | Fecha de referencia | hoy |
| Antigüedad de facturas pendientes | Fecha de referencia | hoy |
| Estado de resultados | Fecha de inicio / fin | inicio del mes actual → hoy |
| Estado de flujo de caja | Fecha de inicio / fin | inicio del mes actual → hoy |
| Resumen de cuentas | Fecha de inicio / fin | inicio del mes actual → hoy (estadísticas por período — los conteos de cuentas son siempre) |

## Formato monetario

Todos los valores monetarios devueltos por los informes son enteros
**unidades monetarias menores**
(céntimos para USD, etc.). Formatea en el cliente de acuerdo con el campo
`currency`
de la respuesta.

## Cómo se generan los informes

Todos los informes se generan a partir de las entradas de diario registradas:

* **Balance general**
  — agrupa los saldos de las cuentas de activos, pasivos y patrimonio neto a una fecha
* **Estado de resultados**
  — suma las cuentas de ingresos y gastos por un período
* **Estado de flujo de caja**
  — se deriva del movimiento en la cuenta de efectivo (
  `CASH-DEFAULT`
  ) clasificada en operativa / financiación / inversión
* **Balance de comprobación**
  — enumera todas las cuentas con sus totales de débitos y créditos a una fecha
* **Antigüedad de facturas pendientes**
  — agrupa las facturas pendientes por días de vencimiento, excluyendo
  `pagadas`
  ,
  `canceladas`
  y
  `anuladas`
  facturas
* **Resumen de cuentas**
  — agrupa los conteos de cuentas por tipo y moneda, con totales de crédito/débito por período