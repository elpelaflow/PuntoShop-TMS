---
título: "Estado de flujo de caja"
url: https://fleetbase.io/docs/ledger/reports/cash-flow
módulo: ledger
---

# Estado de flujo de caja

Realice un seguimiento de las entradas y salidas de efectivo, así como de las actividades de operación, financiación e inversión, derivadas del movimiento en la cuenta de efectivo.

# Estado de flujo de caja

El
**Estado de flujo de caja**
realiza un seguimiento del movimiento real de efectivo hacia y desde su organización durante un período. A diferencia del estado de resultados (que utiliza contabilidad de accrual), el estado de flujo de caja muestra movimientos reales de efectivo, y se calcula a partir de entradas de diario que afectan a la cuenta de efectivo (`CASH-DEFAULT`).

Vaya a
**Libro Mayor → Informes → Flujo de caja**
.

## ¿Por qué es importante el flujo de caja?

Una empresa rentable en papel aún puede quedarse sin efectivo. El estado de flujo de caja le indica si sus operaciones están generando o consumiendo efectivo, lo cual es crucial para la gestión de la liquidez y la planificación de nóminas, pagos a proveedores y pagos a conductores.

## Estructura del informe

El informe agrupa las entradas de diario en la cuenta de efectivo en tres categorías, cada una de las cuales se muestra como una lista de elementos más un flujo neto:

### Actividades de operación

Flujos de efectivo de las operaciones comerciales principales, por ejemplo, pagos de clientes en facturas y pagos de gastos operativos.

### Actividades de financiación

Flujos de efectivo de la obtención o devolución de capital y de los recargos / pagos que mueven efectivo dentro o fuera del sistema.

### Actividades de inversión

Flujos de efectivo de la adquisición o disposición de activos a largo plazo (típicamente cero para una plataforma logística, a menos que registre compras de activos a través de Ledger).

### Cambio neto en efectivo

```
Cambio neto = Cambio neto de operación + Cambio neto de financiación + Cambio neto de inversión
```

Añada esto al
**saldo inicial de efectivo**
para obtener el
**saldo final de efectivo**
— ambos se muestran junto con el cambio neto del período en la parte superior del informe.

## Estableciendo el período del informe

Vaya a
**Libro Mayor → Informes → Flujo de caja**
.

Establezca la
**Fecha de inicio**
y la
**Fecha de fin**.

Haga clic en
**Generar**
.

El período predeterminado es el mes actual (inicio del mes → hoy).

## ¿Cómo funciona la clasificación?

Las entradas de diario se clasifican en operación / financiación / inversión según la cuenta contra en la entrada. Las reglas exactas se implementan en
`LedgerService`
— si configura cuentas personalizadas, asegúrese de que su
`type`
esté configurado correctamente para que clasifiquen como se espera (por ejemplo, cuentas de gastos → operación, cuentas de capital → financiación).