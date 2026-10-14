---
title: "Comenzar rápidamente"
url: https://fleetbase.io/docs/ledger/getting-started/quickstart
module: ledger
---

# Comenzar rápidamente

Comience a utilizar Ledger: revise su esquema de cuentas predeterminado, configure los parámetros predeterminados de facturación, configure una pasarela de pago y cree su primera factura.

# Comenzar rápidamente

Esta guía le guiará en la revisión de su esquema de cuentas predeterminado, la configuración de los parámetros predeterminados de facturación, la configuración de una pasarela de pago y la creación y registro de un pago en su primera factura.

## Paso 1 — Revise su esquema de cuentas

Cuando se crea su empresa de Fleetbase, Ledger proporciona automáticamente un esquema de cuentas predeterminado que cubre las cuentas estándar de activo, pasivo, patrimonio, ingresos y gastos que necesita una empresa de logística.

Navegue a
**Ledger → Contabilidad → Cuentas**
.

Revise las cuentas predeterminadas agrupadas por tipo: Efectivo, Cuenta Bancaria, Cuentas por Cobrar, Clearing de Stripe, Fondo de Responsabilidad del Conductor, Ingresos por Conductor, Gastos de Pago al Conductor, etc. Consulte
[Esquema de Cuentas](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
para obtener la lista completa.

Opcionalmente, agregue cuentas personalizadas para su negocio (por ejemplo, una cuenta adicional de ingresos por cada línea de servicio).

## Paso 2 — Configure los parámetros predeterminados de factura y pago

Configure los parámetros predeterminados de facturación antes de crear facturas: esto permite la numeración automática, el cálculo de la fecha de vencimiento y la renderización de PDF.

Navegue a
**Ledger → Configuración → Factura**
.

Establezca el
**Prefijo de Factura**
(predeterminado
`INV-`
),
**Moneda Predeterminada**
y
**Términos de Pago (días)**
. Opcionalmente, establezca el
**Plantilla Predeterminada**
para que las facturas se rendericen en PDF sin tener que seleccionar una plantilla cada vez.

Guarde.

Abra
**Ledger → Configuración → Pago**
y (opcionalmente) configure una
**Pasarela Predeterminada**
para los pagos de facturas.

Consulte
[Configuración](https://fleetbase.io/docs/ledger/settings/overview)
para obtener la referencia completa.

## Paso 3 — Configure una pasarela de pago

Navegue a
**Ledger → Pagos → Pasarelas**
.

Haga clic en
**Nueva Pasarela**
y seleccione
**GNU Taler**
,
**Stripe**
,
**Efectivo**
o
**QPay**
. Utilice Efectivo para recibos en línea o manuales.

Complete los datos proporcionados por el formulario. GNU Taler requiere una URL de Backend del Comerciante, ID de instancia, token de API y moneda soportada; Stripe requiere una clave pública, clave secreta y secreto de firma de webhook.

Establezca
**Entorno**
a
`sandbox`
mientras se prueba.

Haga clic en
**Guardar**
.

![Detalles de la pasarela de pago — credenciales, entorno y URL de webhook](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-payment-gateway-details.dcfed23e.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Paso 4 — Cree una factura

Navegue a
**Ledger → Facturación → Facturas**
.

Haga clic en
**Nueva Factura**
.

Seleccione un
**Cliente**
. El campo de cliente es polimórfico: seleccione un contacto de Fleetbase, proveedor, conductor o usuario.

Establezca la
**Fecha de la Factura**
. La
**Fecha de Vencimiento**
se rellena automáticamente según sus configuraciones de factura si se ha establecido un
`offset_days`
no nulo.

Agregue uno o más
**Ítems**
— cada uno con una descripción, cantidad, precio unitario y (opcionalmente) una tasa de impuestos (decimal, 0–100).

Haga clic en
**Guardar**
. La factura se crea en estado
`borrador`
y se le asigna un número como
`INV-004821`
(un número entero aleatorio de 6 dígitos). El subtotal, el impuesto y el total se calculan automáticamente.

![Detalle de la factura — encabezado con cliente y fechas, tabla de ítems, totales y botones de acción](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-details.79c46be1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Paso 5 — Envíe la factura

Abra la factura en borrador.

Haga clic en
**Enviar**
— Ledger envía la factura a la dirección de correo electrónico del cliente y cambia el estado a
`enviado`
. El cliente recibe la URL pública de la factura en el correo electrónico y puede pagar en línea sin iniciar sesión.

Alternativamente, haga clic en
**Marcar como Enviado**
para cambiar el estado sin enviar un correo electrónico: esto es útil si desea entregar la factura a través de su propio canal (SMS, su CRM, en persona).

El formato de la URL pública de la factura es
`/~/invoice?id={public_id}`
. La primera vez que el cliente la abre, el estado cambia a
`visto`
.

## Paso 6 — Registre el pago

Cuando el cliente paga:

Abra la factura.

Haga clic en
**Registrar Pago**
.

Ingrese el
**Importe**
recibido, el
**Método de Pago**
(predeterminado
`manual`
) y una referencia opcional (por ejemplo, una línea de su extracto bancario).

Haga clic en
**Guardar**
. El
`importe_pagado`
de la factura se incrementa, el
`saldo`
se recalcula y el estado cambia a
`pagado`
(saldo = 0) o
`parcial`
(saldo > 0). Se crea automáticamente una entrada de diario (DEBIT Cash → CREDIT Accounts Receivable) y se registra una
`Transacción`
.

**Pasos siguientes**

* [Esquema de Cuentas](https://fleetbase.io/docs/ledger/accounting/chart-of-accounts)
  — revise las cuentas predeterminadas y agregue las personalizadas
* [Pasarelas de Pago](https://fleetbase.io/docs/ledger/payments/gateways/overview)
  — configure GNU Taler, Stripe, Efectivo o QPay
* [Carteras](https://fleetbase.io/docs/ledger/payments/wallets)
  — gestione las carteras de conductor, cliente, empresa y usuario
* [Informes](https://fleetbase.io/docs/ledger/reports/overview)
  — genere balances, estados de resultados, antigüedad de cuentas por cobrar y resumen de carteras
* [Configuración](https://fleetbase.io/docs/ledger/settings/overview)
  — configure los prefijos de factura, los términos de pago, las pasarelas predeterminadas y el año fiscal