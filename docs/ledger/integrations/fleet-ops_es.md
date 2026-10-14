---
título: "Integración con Fleet-Ops"
url: https://fleetbase.io/docs/ledger/integrations/fleet-ops
módulo: ledger
---

# Integración con Fleet-Ops

Ledger crea automáticamente facturas preliminares para los pedidos de Fleet-Ops, para que no tenga que facturar cada pedido manualmente.

# Integración con Fleet-Ops

Ledger y Fleet-Ops están integradas de forma predeterminada. En el momento en que un pedido de Fleet-Ops tiene su precio fijado, Ledger crea automáticamente una
**factura preliminar**
para ese pedido y reconoce los ingresos en sus registros.

No necesita copiar elementos de línea manualmente, ingresar detalles del cliente o recordar qué pedidos aún no han sido facturados, todo se hace automáticamente.

## Cuándo se crean las facturas

El disparador es el momento en que se
**fija el precio**
a un pedido. En términos de Fleet-Ops, esto ocurre cuando una cotización se convierte en la tarifa de compra del pedido (típicamente cuando el conductor acepta una cotización, o cuando se asigna automáticamente por una configuración de pedido).

No está vinculado a la finalización del pedido. Reconocer los ingresos en el momento en que se fija el precio es la práctica estándar de contabilidad por accrual, es decir, lo que debe su cliente se establece cuando se compromete con un precio, no cuando el conductor termina el viaje.

## Qué aparece en su lista de facturación

Cada factura creada automáticamente aparece en
**Ledger → Facturación → Facturas**
con:

* Estado:
  **Borrador**
* Cliente extraído del pedido de Fleet-Ops
* Elementos de línea extraídos de la cotización de servicios (o, si la cotización es un precio único, una sola línea de resumen)
* Moneda, fecha de vencimiento (utilizando sus configuraciones de facturación) y un nuevo número de factura

Puede editar cualquier cosa antes de enviarla: cambiar las descripciones de los elementos de línea, agregar notas, ajustar la tasa de impuestos, cambiar la plantilla, etc. En este punto, se trata de una factura preliminar normal.

## Cuando cambian los precios

A veces, una cotización se vuelve a fijar: un ajuste de ruta, una nueva tarifa de servicio, una modificación realizada por un conductor. Cuando esto ocurre, la factura preliminar antigua se marca automáticamente como
**anulada**
y se crea una nueva factura preliminar. No tendrá facturas duplicadas obsoletas compitiendo por el mismo pedido.

Si la factura antigua ya estaba en fase de borrador (enviada, vista, parcial o pagada), permanecerá donde está: Ledger solo reemplaza los borradores.

## Enviar la factura

Abra el borrador, revíselo y haga clic en
**Enviar**
para enviarlo por correo electrónico al cliente. Consulte
[Facturas](https://fleetbase.io/docs/ledger/billing/invoices#sending-an-invoice)
para el flujo completo.

## Qué ve en sus libros

Cuando se crea la factura preliminar, Ledger registra una sola entrada de diario que reconoce los ingresos:

* **Cuentas por cobrar**
  aumenta: su cliente ahora le debe esta cantidad
* **Ingresos**
  aumenta: se reconocen los ingresos

Cuando el cliente paga, se registra una segunda entrada:

* **Efectivo**
  aumenta: ha recibido el dinero
* **Cuentas por cobrar**
  disminuye: se cancela la deuda

Estas entradas se registran automáticamente. Las verá en el
[Libro mayor](https://fleetbase.io/docs/ledger/accounting/general-ledger)
y se resumen en su
[Estado financiero](https://fleetbase.io/docs/ledger/reports/income-statement)
,
[Balance general](https://fleetbase.io/docs/ledger/reports/balance-sheet)
y
[Análisis de cuentas por cobrar](https://fleetbase.io/docs/ledger/reports/ar-aging)
.