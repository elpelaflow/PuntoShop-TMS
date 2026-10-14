---
título: "Ledger"
url: https://fleetbase.io/docs/ledger
módulo: ledger
---

# Ledger

**Ledger**
es la extensión de contabilidad e facturación para Fleetbase. Proporciona una capa completa de gestión financiera: contabilidad de doble entrada, facturación automatizada, carteras digitales, procesamiento de pasarelas de pago y generación de informes financieros estándar, todo integrado directamente con Fleet-Ops.

![Panel de control de Ledger — Tarjetas de KPI, gráfico de tendencias de ingresos, entradas recientes del diario](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-dashboard.98b061ae.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## ¿Qué hace Ledger?

| Capacidad | ¿Qué cubre? |
|---|---|
| **Plan de cuentas** | Define cuentas de activo, pasivo, patrimonio, ingresos y gastos |
| **Contabilidad de doble entrada** | Cada transacción crea entradas en el diario en dos cuentas |
| **Facturación** | Crea, envía y cobra pagos en facturas |
| **Plantillas de facturas** | Personaliza la apariencia de tus facturas con la marca de tu empresa |
| **Carteras digitales** | Realiza un seguimiento de los saldos para conductores, clientes, tu empresa y usuarios individuales |
| **Pasarelas de pago** | GNU Taler, Stripe, Cash y QPay: compras, reembolsos, flujos de pago de carteras y idempotencia de webhook |
| **Transacciones** | Rastro de auditoría inmutable para cada movimiento de cartera |
| **Informes financieros** | Balance general, estado de resultados, flujo de caja, balance de comprobación, antigüedad de cuentas por cobrar, resumen de cartera |
| **Integración con Fleet-Ops** | Crea automáticamente facturas preliminares cuando se agrega una "Tasa de compra" a un pedido |
| **Configuración** | Configura el prefijo de la factura, los plazos de pago, la pasarela predeterminada, la plantilla predeterminada, el año fiscal y la moneda base |

## Conceptos clave

* **Cuenta**
  — Una cuenta de Ledger con nombre, de tipo (activo, pasivo, patrimonio, ingresos o gastos), un código alfanumérico (`CASH-DEFAULT`, por ejemplo) y un saldo calculado.
* **Entrada en el diario**
  — Un registro de doble entrada que debita una cuenta y acredita otra. Número `JE-00001` (con ceros en la izquierda). La mayoría se crean automáticamente.
* **Factura**
  — Una solicitud de pago formal con artículos, impuestos y fecha de vencimiento. Número `INV-` seguido de un número entero aleatorio de 6 dígitos (por ejemplo, `INV-004821`). Ciclo de vida: borrador → enviado → visto → parcial / pagado / vencido / cancelado / reembolsado / anulado
* **Cartera**
  — Un saldo digital vinculado a un conductor, cliente, empresa o usuario. Soporta operaciones de `crédito`, `topup`, `transfer`, `payout`, `congelar`, `descongelar` y `recalcular`.
* **Transacción**
  — Un registro inmutable del movimiento de dinero en relación con una cartera.
* **Pasarela**
  — Un procesador de pagos (GNU Taler, Stripe, Cash o QPay) con credenciales encriptadas, entorno de prueba/producción y idempotencia de webhook a través de `GatewayTransaction`.

## Comienza

Ponlo en marcha

Configura tu plan de cuentas, configura una pasarela y crea tu primera factura.

[Guía rápida →](https://fleetbase.io/docs/ledger/getting-started/quickstart)

Comprende los conceptos básicos

Aprende sobre la contabilidad de doble entrada, las cuentas, las carteras y el ciclo de vida de las facturas.

[Conceptos clave →](https://fleetbase.io/docs/ledger/getting-started/core-concepts)

Factura a tus clientes

Crea y envía facturas, registra pagos y exporta PDFs.

[Facturas →](https://fleetbase.io/docs/ledger/billing/invoices)

Ledger viene preinstalado con cada instancia de Fleetbase. Navega a **Ledger** en la barra lateral del panel para empezar. El plan de cuentas predeterminado se provisiona automáticamente cuando se crea tu empresa.