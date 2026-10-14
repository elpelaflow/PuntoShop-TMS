---
title: "Balance General"
url: https://fleetbase.io/docs/ledger/reports/balance-sheet
module: ledger
---

# Balance General

Visualice la posición financiera de su organización: activos, pasivos y patrimonio, en un momento específico.

# Balance General

El
**Balance General**
es una fotografía de la posición financiera de su organización en una fecha determinada. Responde a la pregunta: ¿qué posee su organización (activos) y qué debe (pasivos y patrimonio)?

Vaya a
**Balance General → Informes → Balance General**
.

![Balance general — activos, pasivos, patrimonio, totales, indicador de equilibrio](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-report-balance-sheet.03bcde34.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## La Ecuación Contable

Un balance general siempre cumple con:

```
Activos = Pasivos + Patrimonio
```

Si sus libros están equilibrados, el total de activos será igual al total de pasivos más el patrimonio. El informe muestra un
**Equilibrado**
— verde cuando la ecuación es válida, rojo cuando no lo es.

## Estructura del Informe

### Activos

Todas las cuentas de
**activos**
de su libro mayor:

* Efectivo (
  `CASH-DEFAULT`
  )
* Cuenta bancaria (
  `BANK-DEFAULT`
  )
* Cuentas por cobrar (
  `AR-DEFAULT`
  )
* Cuenta de compensación de Stripe (
  `STRIPE-CLEARING`
  )
* Cuenta de compensación de Gateway (
  `GATEWAY-CLEARING`
  )
* Gastos anticipados (
  `PREPAID-DEFAULT`
  )

**Total Activos**

### Pasivos

Todas las cuentas de
**pasivos**:

* Cuentas por pagar (
  `AP-DEFAULT`
  )
* Fondo de pasivos de billetera (
  `WALLET-POOL`
  ) más las cuentas por cada billetera (`WALLET-{uuid}`)
* Salarios pendientes a conductores (
  `DRIVER-PAYABLE`
  )
* Pasivo por crédito al cliente (
  `CUSTOMER-CREDIT`
  )
* Impuestos pendientes (
  `TAX-PAYABLE`
  )
* Tarifas de Stripe pendientes (
  `STRIPE-FEES-PAYABLE`
  )
* Ingresos diferidos (
  `DEFERRED-REVENUE`
  )

**Total Pasivos**

### Patrimonio

Todas las cuentas de
**patrimonio**. Patrimonio predefinido:

* Patrimonio del propietario (
  `EQUITY-DEFAULT`
  )
* Ganancias retenidas (
  `RETAINED-EARNINGS`
  )

El beneficio neto del período actual se refleja en el estado de resultados, no como una cuenta de patrimonio discreta.

**Total Patrimonio**

### Verificación

El informe también muestra el total combinado de pasivos y patrimonio para una comparación directa:

```
Total Activos = Total Pasivos + Total Patrimonio
```

Si no coinciden, hay un error contable: entradas de diario faltantes o una entrada desequilibrada.

## Estableciendo la Fecha del Informe

Vaya a
**Balance General → Informes → Balance General**
.

Establezca la
**Fecha de referencia**
— el balance general refleja los saldos de las cuentas al final de esa fecha.

Haga clic en
**Generar**
.

El valor predeterminado es hoy.

## ¿Qué significan los pasivos de la billetera?

El
**Fondo de pasivos de la billetera**
más las cuentas de pasivos creadas automáticamente por cada billetera (`WALLET-{wallet_uuid}`) representan el saldo total que se debe a todos los titulares de billetera. Aumentan cuando se acreditan las billeteras y disminuyen cuando se realizan los pagos. En el balance general, esto aparece como un pasivo: su organización debe esta cantidad a sus titulares de billetera.