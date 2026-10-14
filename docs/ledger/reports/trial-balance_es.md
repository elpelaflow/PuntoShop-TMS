---
título: "Balance General"
url: https://fleetbase.io/docs/ledger/reports/trial-balance
módulo: ledger
---

# Balance General

Verifique sus libros: una lista de todos los saldos con sus totales de débitos y créditos, confirmando que están equilibrados.

# Balance General

El
**Balance General**
lista todas las cuentas de su libro mayor, junto con sus totales de débitos y créditos, a una fecha específica. Su propósito principal es verificar que los totales de débitos sean iguales a los totales de créditos, confirmando que cada entrada de diario se registró correctamente.

Vaya a
**Libro Mayor → Informes → Balance General**
.

![Balance General — cada cuenta con sus totales de débitos y créditos a la fecha del informe, marcado como "Equilibrado"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-report-trial-balance.33aa4c6b.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Estructura del Informe

| Columna | Descripción |
|---|---|
| **Código de Cuenta** | Identificador de la cuenta de su libro mayor |
| **Nombre de la Cuenta** | Nombre de la cuenta |
| **Tipo** | Activo, Pasivo, Patrimonio, Ingresos o Gastos |
| **Total de Débitos** | Suma de todas las entradas de débito para esta cuenta |
| **Total de Créditos** | Suma de todas las entradas de crédito para esta cuenta |

En la parte inferior:

* **Total de Débitos**
  — suma de todas las cuentas
* **Total de Créditos**
  — suma de todas las cuentas
* **Equilibrado**
  — indicador que confirma que los totales de débitos son iguales a los totales de créditos

## Utilizando el Balance General

Normalmente, se ejecuta el balance general:

* **Al final del período**
  — antes de generar los estados de resultados y los balances
* **Cuando se sospecha de discrepancias**
  — para localizar la causa de una discrepancia en la información
* **Para la preparación de auditorías externas**
  — los auditores a menudo solicitan un balance general como punto de partida

## Cuando Débitos ≠ Créditos

Si el indicador
**Equilibrado**
muestra que el informe no está equilibrado, hay un error en el registro. Causas comunes:

* Se introdujo manualmente una entrada de diario con importes de débito y crédito desiguales
* Se registró una transacción sin una entrada de diario correspondiente
* Se revirtió parcialmente una entrada de diario mediante código personalizado

Utilice el
[Libro Mayor General](https://fleetbase.io/docs/ledger/accounting/general-ledger)
para filtrar por cuentas y fechas específicas e identificar la discrepancia.

## Estableciendo la Fecha del Informe

Vaya a
**Libro Mayor → Informes → Balance General**
.

Establezca la
**Fecha de referencia**
— los saldos reflejan todas las entradas registradas hasta el final de esa fecha.

Haga clic en
**Generar**
.

El balance general es
**solo para un momento específico**
— muestra los saldos a la fecha elegida, sin rango de período. Para actividades con rango de período, utilice el
[Libro Mayor General](https://fleetbase.io/docs/ledger/accounting/general-ledger)
con un rango de fechas.