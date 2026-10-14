---
título: "Carteras"
url: https://fleetbase.io/docs/ledger/payments/wallets
módulo: ledger
---

# Carteras

Administre carteras digitales para conductores, clientes, su empresa y usuarios individuales: depósitos, recargas, transferencias, pagos, bloqueo y recalculo.

# Carteras

A
**Cartera**
es una cuenta de saldo digital dentro de Ledger. Las carteras rastrean el dinero adeudado o retenido para una entidad específica: los ingresos de un conductor, el crédito anticipado de un cliente, la cuenta operativa de su organización o el saldo personal de un usuario individual.

Navegue a
**Ledger → Pagos → Carteras**
.

## Tipos de Carteras

Las carteras son polimórficas:
`subject_uuid`
+
`subject_type`
apuntan a la entidad que posee el saldo:

| Tipo | Sujeto | Uso común |
|---|---|---|
| **Conductor** | Conductor de Fleet-Ops | Rastrear los ingresos por entregas completadas |
| **Cliente** | Cliente / Dador de carga de Fleet-Ops | Crédito anticipado, saldo de transporte, reembolsos |
| **Empresa** | Su organización | Ingresos de la plataforma, cuenta operativa, reservas de pago / reembolsos |
| **Usuario** | Usuario individual de Fleetbase | Cuenta personal |

Un solo sujeto puede tener múltiples carteras en diferentes monedas.

## Carteras Provisionadas Automáticamente

Ledger crea carteras automáticamente en dos casos:

* **Nuevas empresas**
  reciben cuatro carteras del sistema:
  **Cartera de Operaciones**
  ,
  **Cartera de Ingresos**
  ,
  **Reserva de Pago**
  y
  **Reserva de Reembolso**
* **Nuevos usuarios**
  (y usuarios que se unen a una empresa) reciben una
  **cartera personal**

Además, cada cartera tiene una cuenta interna de Ledger creada automáticamente con el código
`WALLET-{wallet_uuid}`
para poder registrar entradas de diario.

## Estado de la Cartera

El
`status`
es la única fuente de información sobre si una cartera puede realizar transacciones. Acepta uno de tres valores:

| Estado | Comportamiento |
|---|---|
| **Activa** | Normal: se permiten créditos y débitos |
| **Congelada** | Las operaciones están bloqueadas mientras se revisan |
| **Cerrada** | Deshabilitada permanentemente |

Las respuestas de la API también exponen un atributo derivado
**`is_frozen`**
: es un accesorio calculado que devuelve
`true`
cuando
`status === 'frozen'`
. No escriba en
`is_frozen`
; en su lugar, establezca el
`status`
de la cartera. El interruptor heredado
`is_frozen`
en el formulario de la cartera es un vestigio de la interfaz de usuario y no controla el comportamiento del backend.

## Crear una Cartera

Normalmente, las carteras se provisionan automáticamente. Para crearlas manualmente:

Navegue a
**Ledger → Pagos → Carteras**
.

Haga clic en
**Nueva Cartera**
.

Seleccione el
**Sujeto**
: el conductor, el cliente, la empresa o el usuario al que pertenece la cartera.

Seleccione la
**Moneda**
.

Introduzca un nombre y una descripción opcionales.

Haga clic en
**Guardar**
.

## Operaciones de la Cartera

Cada una de las siguientes opciones es un botón en el panel de detalles de la cartera.

| Acción | Efecto |
|---|---|
| **Depósito** | Depósito manual (sin gateway) |
| **Recarga** | Recarga a través de gateway (GNU Taler, Stripe o QPay) |
| **Transferencia** | Mover fondos a otra cartera |
| **Pago** (a veces etiquetado como "Retirar") | Debit la cartera (por ejemplo, pago al conductor) |
| **Congelar** | Establecer el estado de la cartera en `frozen` |
| **Descongelar** | Establecer el estado de la cartera en `active` |
| **Recalcular el saldo** | Recalcular el saldo a partir de las transacciones completadas |
| **Transacciones** | Lista de transacciones filtrada para esta cartera |

### Depósito (depósito manual, sin gateway)

![Añadir fondos a la cartera: formulario de depósito](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-wallet-add-funds.d7f92fae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Añade fondos a una cartera sin cobrar a través de un gateway. Se utiliza para ajustes manuales o asignaciones de ingresos.

Entrada de diario:
`DEBIT Cash → CREDIT Wallet Liability`
. Tipo de transacción:
`deposit`
.

### Recarga (depósito a través de gateway)

Cobra un método de pago a través del gateway elegido (GNU Taler, Stripe o QPay) y acredita la cartera con éxito.

Entrada de diario:
`DEBIT Cash → CREDIT Wallet Liability`
. Tipo de transacción:
`deposit`
.

### Transferencia

![Transferir fondos entre carteras: origen, destino, importe](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-wallet-transfer-funds.fb3d6e8e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Mueve fondos entre dos carteras. Elige una cartera de destino y una cantidad: la transferencia produce:

* Dos transacciones en la cartera de origen (
  `transfer_out`
  , débito) y en la cartera de destino (
  `transfer_in`
  , crédito)
* Una entrada de diario directamente entre las dos cuentas de cartera de responsabilidad (sin cuenta intermedia)

### Pago

Debita la cartera (por ejemplo, ingresos del conductor enviados a una cuenta bancaria). La interfaz a veces etiqueta esto como
**Retirar**
.

Entrada de diario:
`DEBIT Wallet Liability → CREDIT Cash`
. Tipo de transacción:
`payout`
.

### Congelar / Descongelar

Activa o desactiva el
`status`
de la cartera. Mientras está congelada, todas las operaciones están bloqueadas.

### Recalcular el saldo

Si el saldo de una cartera parece incorrecto, haga clic en
**Recalcular el saldo**
para recalcular a partir de todas las transacciones completadas.

## Ver las transacciones de la cartera

Abra cualquier cartera y haga clic en la pestaña
**Transacciones**
para ver una lista cronológica. Filtre por tipo, dirección, estado y rango de fechas.