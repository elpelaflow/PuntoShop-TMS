---
título: "Entradas del diario"
url: https://fleetbase.io/docs/ledger/accounting/journal-entries
módulo: ledger
---

# Entradas del diario

Visualice las entradas automáticas del diario y cree entradas manuales para ajustes y correcciones contables.

# Entradas del diario

A
**Entrada del diario**
es el registro atómico de un evento financiero. La mayoría de las entradas se generan automáticamente por Ledger, ya que el sistema procesa los pagos de facturas, los cargos de la pasarela, las operaciones de la billetera y las liquidaciones de órdenes de transporte. También puede crear entradas manuales para ajustes y correcciones.

Navegue a
**Ledger → Contabilidad → Diario**
.

## Atributos de la entrada del diario

| Campo | Descripción |
|---|---|
| **Número** | ID secuencial generado automáticamente, formato `JE-00001` (5 dígitos con ceros) |
| **Tipo** | Tipo de entrada (ver tipos a continuación) |
| **Estado** | Actualmente siempre `publicado` para las entradas generadas por el sistema |
| **Cuenta de débito** | Cuenta que se está debitando |
| **Cuenta de crédito** | Cuenta que se está acreditando |
| **Monto** | Monto de la entrada en la moneda de la cuenta (unidades menores enteras) |
| **Moneda** | Código ISO de 3 caracteres |
| **Fecha de la entrada** | Fecha en que ocurrió el evento |
| **Referencia** | Referencia legible por humanos (número de factura, ID de pedido, etc.) |
| **Descripción** | Descripción de texto libre |
| **¿Entrada del sistema?** | `verdadero` si se creó automáticamente; `falso` si es manual |
| **Transacción** | Transacción de Ledger relacionada, si corresponde |

## Tipos de entrada

El selector de formulario de entrada manual ofrece los siguientes tipos:

| Tipo | Cuándo usar |
|---|---|
| `estándar` | Entradas manuales diarias |
| `ajuste` | Ajustes al final del período (por ejemplo, provisiones, aplazamientos) |
| `cierre` | Cierre del período — cerrar cuentas del estado de resultados |
| `inversión` | Inversión de entradas de períodos anteriores (construido manualmente; no hay una acción de inversión automática) |
| `abrir` | Saldos iniciales para un nuevo período fiscal |

Las entradas generadas por el sistema utilizan estos tipos según el evento de origen:

| Tipo | Origen |
|---|---|
| `general` | Predeterminado (la mayoría de las operaciones de la billetera) |
| `entrada_manual` | Creado a través de la acción "**Nueva entrada manual**" en el diario |
| `reconocimiento_de_ingresos` | Borrador de factura creado por Fleet-Ops `PurchaseRateObserver` |
| `pago_de_factura` | Pago registrado contra una factura |
| `pago_de_pasarela` | Pago exitoso a través de webhook |
| `liquidacion_orden` | Finalización o liquidación de orden de flete |

## Crear una entrada manual del diario

Navegue a
**Ledger → Contabilidad → Diario**
.

Haga clic en
**Nueva entrada manual**
.

Seleccione la
**Cuenta de débito**
y una
**diferente**
**Cuenta de crédito**
.

Ingrese el
**Monto**
(unidades menores enteras, mínimo 1) y
**Moneda**
(3 letras ISO).

Ingrese una
**Descripción**
(obligatoria) y, opcionalmente, la
**Fecha de la entrada**
.

Haga clic en
**Guardar**
. La entrada se publica inmediatamente y se actualizan los saldos de ambas cuentas.

## Invertir una entrada

No hay una acción de
**"Invertir"**
incorporada en esta versión de Ledger. Para invertir una entrada publicada, cree una nueva entrada manual de tipo
`inversión`
con las cuentas de débito y crédito intercambiadas, y haga referencia al número de la entrada original en la descripción.

Las entradas invertidas manualmente modifican los saldos de las cuentas, pero no cambian el estado de la entrada original. La original permanece
`publicada`
.

## Ver entradas para una cuenta

Para ver una vista filtrada de todas las entradas para una cuenta específica, utilice la vista
**"Libro de cuentas"**
:
**Ledger → Contabilidad → Cuentas → [Cuenta]**
. Esto muestra las columnas de débito, crédito y saldo actual para esa cuenta.