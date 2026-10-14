---
título: "Libro Mayor"
url: https://fleetbase.io/docs/ledger/accounting/general-ledger
módulo: ledger
---

# Libro Mayor

Visualice el registro maestro de todas las entradas del diario — un historial cronológico completo de cada transacción financiera.

# Libro Mayor

El
**Libro Mayor**
es el registro maestro de todas las entradas del diario en su organización. Proporciona una vista completa y cronológica de cada evento financiero: débitos, créditos, importes y saldos acumulados.

Navegue a
**Libro Mayor → Contabilidad → Libro Mayor**
.

![Libro Mayor — cada cuenta con su código, tipo, número de entradas y saldo, que se pueden expandir para ver las entradas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-general-ledger.55e764fe.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Columnas

La vista del libro mayor muestra:

| Columna | Descripción |
|---|---|
| **Fecha** | Fecha de la entrada del diario |
| **Ref #** | Referencia legible por el usuario (número de factura, ID de pedido, etc.) |
| **Descripción** | Qué registra la entrada |
| **Débito** | Importe en el lado del débito |
| **Crédito** | Importe en el lado del crédito |
| **Saldo** | Saldo acumulado |

## Filtros

Utilice los filtros en la parte superior de la página para refinar la vista:

* **Rango de fechas**
  — fecha de inicio y fin
* **Tipo**
  — filtre por
  **tipo de cuenta**
  (activo, pasivo, patrimonio, ingresos, gastos)

## Libro Mayor a Nivel de Cuenta

Para ver el libro mayor de una sola cuenta con un saldo acumulado:

Navegue a
**Libro Mayor → Contabilidad → Cuentas**
.

Haga clic en una fila de cuenta.

El panel de detalles de la cuenta muestra el historial de entradas de la cuenta, con débitos, créditos y saldo acumulado.

Esta vista es útil para conciliar cuentas específicas (por ejemplo, Cuentas por Cobrar) o para generar estados de cuenta para auditorías.

## Entradas del Sistema vs. Manuales

* **Entradas del sistema**
  (
  `is_system_entry: true`
  ) se crean automáticamente por Ledger en respuesta a pagos de facturas, transacciones de pasarelas, operaciones de billetera y liquidaciones de fletes.
* **Entradas manuales**
  se crean por los operadores a través de
  **Libro Mayor → Contabilidad → Diario → Nueva entrada manual**
  .

Ambas aparecen en el libro mayor. No existe un flujo de trabajo integrado de reversión/anulación — para deshacer una entrada del sistema, se debe registrar una entrada manual de reversión contra las mismas cuentas.