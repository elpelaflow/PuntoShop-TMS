---
title: "Facturación e Invoices"
url: https://fleetbase.io/docs/ledger/billing/overview
module: ledger
---

# Facturación e Invoices

Cree, envíe y reciba pagos en las invoices — de forma manual o automática a partir de los pedidos de Fleet-Ops.

# Facturación e Invoices

El
**módulo de Facturación**
maneja la creación, el envío y la recopilación de pagos en las invoices. Las invoices son solicitudes de pago con un ciclo de vida desde
`borrador`
hasta
`pagado`. Los clientes pagan las invoices en línea a través de una URL pública (no se requiere inicio de sesión).

Vaya a
**Libro Mayor → Facturación**
para acceder a las invoices y plantillas.

## Componentes principales

### Invoices

Solicitudes de pago formales con artículos, impuestos, totales y un ciclo de vida desde
`borrador`
hasta
`pagado`. Las invoices se pueden crear manualmente, a partir de un pedido de Fleet-Ops o automáticamente cuando se agrega una
`Tarifa de Compra`
a un pedido. Consulte
[Invoices](https://fleetbase.io/docs/ledger/billing/invoices)
.

### Plantillas de Invoices

Plantillas reutilizables que definen cómo se generan las invoices en PDF. Las plantillas utilizan el modelo principal de Fleetbase,
`Template`,
con el contexto
`invoice`
— se refieren a las variables de invoice como
`{invoice.number}`,
`{invoice.total_amount}`
y
`{transaction.reference}`. Consulte
[Invoice Templates](https://fleetbase.io/docs/ledger/billing/invoice-templates)
.

## El ciclo de vida de la facturación

```
borrador → enviado → visto → parcial → pagado
                      ↘ vencido
                      ↘ cancelado
                      ↘ reembolsado
                      ↘ anulado
```

| Estado | Significado |
|---|---|
| `borrador` | Creado, aún no enviado |
| `enviado` | Marcado como enviado (a través de "Marcar como enviado") |
| `visto` | El cliente abrió la invoice a través de la URL pública |
| `parcial` | Pago parcial recibido; el saldo permanece |
| `pagado` | Pagado por completo ( `balance = 0` ) |
| `vencido` | Pasó la fecha de vencimiento, aún no pagado. Se establece mediante el comando de la consola `ledger:update-overdue-invoices`, que solo transiciona las invoices enviadas y vistas |
| `cancelado` | Cancelado; no debe pagarse |
| `reembolsado` | Se establece mediante `HandleProcessedRefund` cuando se completa el reembolso a través de la pasarela |
| `anulado` | Se establece programáticamente cuando se anula una invoice en borrador — por ejemplo, una nueva `Tarifa de Compra` reemplaza una anterior en el mismo pedido |

Los estados
`cancelado`,
`pagado`
y
`anulado`
se excluyen de la antigüedad de la facturación.

## Facturación automatizada

### A partir de los pedidos de Fleet-Ops (trigger de Tarifa de Compra)

La lista
`PurchaseRateObserver`
de Ledger escucha el evento
**`PurchaseRate.created`**. Cuando un pedido de Fleet-Ops tiene una tarifa de compra agregada (lo que ocurre cuando se acepta una cotización de servicio como la tarifa de compra del pedido), Ledger crea automáticamente una
**invoice en borrador**. El trigger es la creación de la `Tarifa de Compra`,
**no**
el estado del pedido que llega a
`completado`.

Los artículos se extraen en este orden de prioridad:

1. De
   `serviceQuote.items`
   si está presente
2. Retrocede a una línea de resumen única utilizando
   `serviceQuote.amount`
3. Retrocede a la extracción de entidades/payload del pedido

Si ya existe una invoice en borrador para el mismo pedido, se anula y se reemplaza. Consulte
[Fleet-Ops Integration](https://fleetbase.io/docs/ledger/integrations/fleet-ops)
para los detalles completos.

## Reconocimiento de ingresos

Cuando se crea una invoice en borrador a través del observador de `PurchaseRate`, Ledger publica una entrada de diario de
`reconocimiento_de_ingresos`:

```
DEBIT  Cuentas por cobrar (aumento del activo — el cliente te debe dinero)
CREDIT Ingresos (aumento de los ingresos)
```

Cuando se registra un pago, Ledger publica una entrada de diario de
`pago_de_invoice`:

```
DEBIT  Efectivo (aumento del activo — tú recibiste efectivo)
CREDIT Cuentas por cobrar (disminución del activo — la deuda se ha saldado)
```