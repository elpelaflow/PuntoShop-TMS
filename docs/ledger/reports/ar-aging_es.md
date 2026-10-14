---
título: "Informe de antigüedad de cuentas por cobrar"
url: https://fleetbase.io/docs/ledger/reports/ar-aging
módulo: ledger
---

# Informe de antigüedad de cuentas por cobrar

Supervise las cuentas por cobrar pendientes: agrupe las facturas según el número de días que han vencido para priorizar la cobranza.

# Informe de antigüedad de cuentas por cobrar

El
**Informe de antigüedad de cuentas por cobrar**
categoriza todas las facturas pendientes según el tiempo que llevan sin pagar. Esto le ayuda a identificar qué clientes están en mora y en qué medida, para que pueda priorizar la cobranza y gestionar el flujo de caja.

Navegue a
**Libro Mayor → Informes → Antigüedad de cuentas por cobrar**
.

![Antigüedad de cuentas por cobrar — lista de facturas con los siguientes rangos: actual / 1-30 días / 31-60 días / 61-90 días / 90+ días](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-report-ar-aging.8755c804.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Estructura del informe

Las facturas se agrupan según el tiempo transcurrido desde su fecha de vencimiento:

| Rango | Número de facturas en este rango |
|---|---|
| **Actual** | No vencidas (fecha de vencimiento es hoy o en el futuro) |
| **1–30 días** | De 1 a 30 días vencidas |
| **31–60 días** | De 31 a 60 días vencidas |
| **61–90 días** | De 61 a 90 días vencidas |
| **90+ días** | Más de 90 días vencidas |

Para cada fila, el informe muestra:

* Nombre del cliente
* Número de factura y fecha original de la factura
* Importe total de la factura y saldo pendiente
* En qué rango se encuentra el saldo pendiente

En la parte inferior:
**totales por rango**
y un
**total general de todas las cuentas por cobrar pendientes**
.

## Facturas excluidas

El informe solo cuenta las facturas con
`saldo > 0`
(es decir, que aún están pendientes de pago). Se excluyen por completo los siguientes estados:

* `pagada`
* `cancelada`
* `anulada`

Las facturas con
`reembolso`
,
`borrador`
,
`enviada`
,
`vistas`
,
`parcial`
y con saldos positivos, también aparecen en el informe.

## Utilización del Informe de Antigüedad de Cuentas por Cobrar

* **Revisión semanal de cobranza**
  — ejecute el informe cada semana para ver qué facturas han pasado al rango de 30+ días
* **Previsión del flujo de caja**
  — las facturas en el rango "actual" se esperan pronto; las facturas en el rango de 60+ días pueden requerir una escalada de cobranza
* **Provisiones para cuentas incobrables**
  — las facturas en el rango de 90+ días son candidatas para la escritura de cuentas incobrables

## Automatización de la cobranza por facturas pendientes

Ejecute el comando de la consola
`ledger:update-overdue-invoices`
en un horario (por ejemplo, diariamente mediante cron) para cambiar el estado de las facturas a
`vencidas`
una vez que haya pasado la fecha de vencimiento:

```
php artisan ledger:update-overdue-invoices
```

El comando solo cambia el estado de las facturas que actualmente están en estado
`enviada`
o
`vista`. Las facturas pendientes aparecen en el informe de antigüedad de cuentas por cobrar y en la sección KPI del panel de control de Ledger.

## Establecer la fecha del informe

Navegue a
**Libro Mayor → Informes → Antigüedad de cuentas por cobrar**
.

Establezca la
**Fecha de referencia**
— las facturas pendientes se agrupan en relación con esta fecha.

Haga clic en
**Generar**
.

El valor predeterminado es hoy.