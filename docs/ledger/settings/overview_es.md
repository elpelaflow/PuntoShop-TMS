---
Título: "Configuración"
URL: https://fleetbase.io/docs/ledger/settings/overview
Módulo: ledger
---

# Configuración

Configure los valores predeterminados a nivel de organización: prefijo de la factura, condiciones de pago, gateway predeterminado, plantilla predeterminada, año fiscal y moneda base.

# Configuración

Ledger expone tres grupos de configuración en:
**Ledger → Configuración**
:

| Grupo | Propósito |
|---|---|
| **Factura** | Valores predeterminados aplicados al crear facturas |
| **Pago** | Valores predeterminados para el comportamiento de pago de la factura |
| **Contabilidad** | Moneda base, año fiscal y cuentas contables predeterminadas |

Cada grupo tiene su propia página en la consola donde puede ver y actualizar los valores.

## Configuración de facturas

**Ledger → Configuración → Factura**

![Configuración de facturas — prefijo numérico de facturas, moneda predeterminada y condiciones de pago, y notas y términos predeterminados](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-invoice-settings.4c949e58.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Clave | Descripción |
|---|---|---|
| **Prefijo de factura** | `invoice_prefix` | Prefijo para los números de factura generados automáticamente. Predeterminado `INV-` (por lo que los números tienen la forma `INV-004821`) |
| **Moneda predeterminada** | `default_currency` | Moneda asignada a las nuevas facturas |
| **Condiciones de pago (días)** | `payment_terms_days` | Almacenado como etiqueta/explicación (por ejemplo, "30 días") |
| **Desplazamiento de la fecha de vencimiento (días)** | `due_date_offset_days` | Cuando es diferente de cero, las nuevas facturas establecen automáticamente la `fecha de vencimiento` como `fecha de la factura + desplazamiento`. Establecer esto en 0 desactiva el valor predeterminado automático |
| **Notas predeterminadas** | `default_notes` | Pre-rellenado en el campo "Notas" de las nuevas facturas |
| **Términos predeterminados** | `default_terms` | Pre-rellenado en el campo "Términos" de las nuevas facturas |
| **Enviar automáticamente al crear** | `auto_send_on_creation` | Cuando es `verdadero`, las nuevas facturas se envían automáticamente al cliente al crearlas |
| **Plantilla predeterminada** | `default_template_uuid` | Plantilla utilizada cuando una factura no tiene una plantilla definida. Es necesaria para que `render-pdf` funcione correctamente |

## Configuración de pagos

**Ledger → Configuración → Pago**

![Configuración de pagos — gateway predeterminado, pagos parciales y crédito de la billetera, y correos electrónicos de recibos de pago](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fledger-payment-settings.7ed71415.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

| Campo | Clave | Descripción |
|---|---|---|
| **Gateway predeterminado** | `default_gateway_uuid` | Gateway preseleccionado en la página de pago pública |
| **Permitir pagos parciales** | `allow_partial_payments` | Si la página de pago pública acepta una cantidad menor que `balance` |
| **Aplicar automáticamente el crédito de la billetera** | `auto_apply_wallet_credit` | Si es `verdadero`, el crédito de la billetera del cliente se aplica automáticamente al pago de la factura |
| **Enviar recibo de pago** | `send_payment_receipt` | Cuando es `verdadero`, los clientes reciben un correo electrónico con el recibo después de un pago exitoso |

## Configuración contable

**Ledger → Configuración → Contabilidad**

| Campo | Clave | Descripción |
|---|---|---|
| **Moneda base** | `base_currency` | Moneda predeterminada para las nuevas cuentas |
| **Mes de inicio del año fiscal** | `fiscal_year_start_month` | Mes (1-12) — utilizado para definir los informes del año fiscal |
| **Publicar automáticamente las entradas contables** | `auto_post_journal_entries` | Si el sistema publica las entradas inmediatamente (predeterminado `verdadero`) |
| **Cuenta de acreedores predeterminada** | `default_ar_account_uuid` | Cuenta de acreedores utilizada en las entradas contables de `reconocimiento de ingresos` y `pago de facturas` |
| **Cuenta de ingresos predeterminada** | `default_revenue_account_uuid` | Se utiliza en las entradas de `reconocimiento de ingresos` cuando no se especifica una cuenta por línea |
| **Cuenta de gastos predeterminada** | `default_expense_account_uuid` | Se utiliza como cuenta de contra predeterminada en las entradas automatizadas |

La configuración está destinada a su empresa de Fleetbase: cada organización tiene sus propios valores.