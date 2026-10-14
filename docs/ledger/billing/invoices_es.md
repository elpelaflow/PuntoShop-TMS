---
title: "Facturas"
url: https://fleetbase.io/docs/ledger/billing/invoices
module: ledger
---

# Facturas

Cree y gestione las facturas: elementos de la línea, pagos, URL de pago pública, renderizado PDF e integración con Fleet-Ops.

# Facturas

Una
**Factura**
es una solicitud formal de pago. Detalla los productos o servicios proporcionados, cantidades, precios y el importe total adeudado. Las facturas tienen un ciclo de vida completo desde
`bocado`
hasta
`pagado`, con el reconocimiento de ingresos en cada paso.

Navegue a
**Libro de cuentas → Facturación → Facturas**
.

![Lista de facturas — número, cliente, estado, total, saldo, fecha de vencimiento y fecha de la factura, con facturas en borrador, enviadas, parciales, pagadas y vencidas](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoices-list.7c024937.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

![Detalle de factura — encabezado con cliente y fechas, tabla de elementos de la línea, totales y botones de acción](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-details.79c46be1.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Atributos de la factura

| Campo | Descripción |
|---|---|
| **Número** | Generado automáticamente, formato `INV-` más un entero aleatorio de 6 dígitos (por ejemplo, `INV-004821`). **No** secuencial. El prefijo es configurable en **Configuración → Factura** |
| **Cliente** | Polimórfico (`uuid_del_cliente` + `tipo_de_cliente`) — contacto de Fleetbase, proveedor, conductor o usuario |
| **Estado** | `bocado` / `enviado` / `visto` / `parcial` / `pagado` / `vencido` / `cancelado` / `reembolsado` / `anulado` |
| **Fecha de la factura** | Fecha en que se emitió la factura |
| **Fecha de vencimiento** | Se establece automáticamente a partir de la configuración de `días_offset_fecha_de_vencimiento` cuando no es cero |
| **Moneda** | Moneda de la factura |
| **Notas** | Notas de texto libre que se muestran en la factura |
| **Términos** | Texto de los términos de pago que se muestra en la factura |
| **Plantilla** | Plantilla de factura (`uuid_de_la_plantilla`) utilizada para el renderizado PDF |
| **Subtotal** | Suma de los importes de los elementos de la línea antes de los impuestos (calculado) |
| **Impuestos** | Impuestos totales en todos los elementos de la línea (calculado) |
| **Importe total** | Subtotal + Impuestos (calculado) |
| **Importe pagado** | Importes totales recibidos hasta el momento |
| **Saldo** | `importe_total − importe_pagado` |
| **Enlace de la orden** | Enlace opcional `uuid_de_la_orden` que hace referencia a una orden de Fleet-Ops |
| **Enlace de la transacción** | Enlace opcional `uuid_de_la_transacción` que hace referencia a la transacción de la billetera que lo pagó |
| **Visto en** | Se marca automáticamente la primera vez que el cliente abre la URL pública |

## Crear una factura

Navegue a
**Libro de cuentas → Facturación → Facturas**
.

Haga clic en
**Nueva factura**
.

Seleccione el
**Cliente**
(busque entre contactos, proveedores, conductores y usuarios).

Establezca la
**Fecha de la factura**
. La
**Fecha de vencimiento**
se completa automáticamente a partir de la configuración de
`días_offset_fecha_de_vencimiento`
si no es cero.

Agregue
**Elementos de la línea**
— para cada fila:

* **Descripción**
  — lo que se está cobrando
* **Cantidad**
  — número de unidades
* **Precio unitario**
  — precio por unidad (unidades menores)
* **Tasa de impuestos**
  — porcentaje decimal 0–100 (por ejemplo,
  `10`
  para 10%);
  `importe_de_impuestos = importe * tasa_de_impuestos / 100`

Agregue notas y términos
**opcionales**.

Haga clic en
**Guardar**
. La factura se crea en
`bocado`
y se calculan los totales.

## Enviar una factura

Hay dos formas de enviar una factura:
**Enviar**
(enviándola por correo electrónico) o
**Marcar como enviada**
(solo cambiando el estado).

### Enviar (enviar el correo electrónico al cliente)

Abra la factura.

Haga clic en
**Enviar**
. Ledger envía la factura a la dirección de correo electrónico del cliente con un enlace a la URL de pago pública, y cambia el estado a
`enviado`
.

El cliente debe tener una dirección de correo electrónico válida en su registro, de lo contrario, la acción devolverá un error 422.

### Marcar como enviada (solo el estado)

Abra la factura.

Haga clic en
**Marcar como enviada**
para cambiar el estado a
`enviado`
sin enviar el correo electrónico. Utilícelo cuando quiera entregar la factura a través de su propio canal (SMS, CRM, en persona).

Comparta la URL de la factura pública
`/~/invoice?id={public_id}`
con el cliente.

La primera vez que el cliente abre la URL pública, el estado se cambia a
`visto`
.

## Registrar el pago

Cuando se recibe el pago fuera del portal en línea (transferencia bancaria, efectivo, etc.):

Abra la factura.

Haga clic en
**Registrar pago**
.

Introduzca el
**Importe**
recibido (números enteros, unidades menores, mínimo 1), el
**Método de pago**
(por defecto
`manual`), y una referencia
**opcional**.

Haga clic en
**Guardar**
.

![Página de pago de la factura — URL pública para el cliente con selección de gateway](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-payment.1e8c23fa.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Ledger actualiza
`importe_pagado`, recalcula
`saldo`
y cambia el estado de la factura:

* Si
  `saldo = 0`
  : estado →
  `pagado`
* Si
  `saldo > 0`
  : estado →
  `parcial`

Se crea automáticamente una entrada de diario (`invoice_payment`) y un registro de
[Transacción](https://fleetbase.io/docs/ledger/payments/transactions)

## Crear una factura a partir de una orden de Fleet-Ops

Haga clic en
**Crear a partir de la orden**
en la lista de facturas.

Seleccione la orden. Ledger extrae los elementos de la línea de los elementos de la cotización de servicio si están presentes, o vuelve a un elemento de línea de resumen.

Revise la factura de borrador generada y guarde.

Para habilitar la creación **automática** de facturas de borrador cuando se establece una cotización de servicio como la tasa de compra en una orden, consulte
[Integración de Fleet-Ops](https://fleetbase.io/docs/ledger/integrations/fleet-ops)
.

## Previsualizar y descargar PDF

Abra cualquier factura y utilice las acciones del panel de detalles:

* **Previsualizar**
  — renderiza la factura con su plantilla asignada
* **Descargar PDF**
  — descarga el PDF renderizado

Ambos requieren que la factura tenga asignada una plantilla, ya sea directamente o a través de la configuración
**Plantilla predeterminada**
de factura.

## Pago en línea por parte del cliente

Los clientes pueden pagar las facturas en la URL pública sin iniciar sesión:

1. El cliente abre
   `/~/invoice?id={public_id}`
   — el
   `visto_en`
   se marca automáticamente la primera vez que se abre y el estado se cambia a
   `visto`
2. La página para el cliente muestra los gateways de pago disponibles
3. El cliente selecciona un gateway y envía el pago
4. Ledger crea una
   `Transacción`
   , publica la entrada de diario
   `invoice_payment`
   y cambia el estado de la factura a
   `pagado`
   (o
   `parcial`
   )

Los borradores no son pagables a través de la URL pública — la URL devuelve una respuesta no permitida hasta que la factura esté al menos en estado
`enviado`