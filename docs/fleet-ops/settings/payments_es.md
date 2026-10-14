---
título: "Configuración de pagos"
url: https://fleetbase.io/docs/fleet-ops/settings/payments
módulo: fleet-ops
---

# Configuración de pagos

Conecte una cuenta de Stripe Connect para que Fleet-Ops pueda cobrar a los clientes por las cotizaciones de servicios y registrar las transacciones completadas en el panel.

# Configuración de pagos

**Configuración de pagos**
en Fleet-Ops, se gestiona una sola cosa: conectar su organización con Stripe a través de
**Stripe Connect**. Una vez conectado, Fleet-Ops puede cobrar a los clientes por las cotizaciones de servicios, mostrar todas las transacciones completadas en la tabla de pagos y agrupar los totales por moneda. No hay campos de clave de API de Stripe, selectores de moneda ni interruptores de modo de captura separados: la propia cuenta de Stripe es la que gestiona esas configuraciones.

Vaya a
**Fleet-Ops → Configuración → Pagos**
.

![Panel de configuración de pagos — Información del proceso de incorporación de Stripe Connect cuando no hay cuenta conectada, tabla de transacciones cuando está conectada](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-payment-settings.9c4e9585.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Dos estados

La página muestra una de dos vistas, dependiendo de si su organización ya se ha conectado a Stripe.

### No conectado — Incorporación de Stripe Connect

Si no hay ninguna cuenta de Stripe vinculada, verá un bloque de información que le pide que inicie el proceso de incorporación. Esto solo se muestra cuando la plataforma tiene Stripe habilitado (se ha configurado una clave pública en el nivel de la plataforma). Haga clic en
**Iniciar pagos**
para iniciar el flujo integrado de Stripe Connect.

Haga clic en
**Iniciar pagos**
— Fleet-Ops navegará a la pantalla de incorporación integrada.

Haga clic en
**Iniciar**
para comenzar. El componente de incorporación de Stripe, alojado, se integra directamente en la página.

Complete la incorporación dentro del formulario integrado: detalles de la empresa, información bancaria, verificación de identidad. Stripe se encarga de todo.

Cuando Stripe informe de que la incorporación ha finalizado, aparecerá el estado de éxito con un
**Continuar**
botón. Al hacer clic, volverá a la página de configuración de pagos, que ahora mostrará la vista de transacciones.

Si la plataforma no tiene Stripe habilitado (no hay clave pública en la configuración de la plataforma), un bloque de información de advertencia le indicará que los credenciales de Stripe no están configurados. En ese caso, el administrador de la plataforma debe configurar Stripe a nivel de la plataforma antes de que esté disponible la incorporación de pagos.

### Conectado — Vista de transacciones

Una vez que se haya vinculado una cuenta de Stripe Connect, la página se convierte en una tabla de transacciones. Cada fila representa una
`Cotización de servicio`
— el registro de Fleet-Ops de un servicio pagado.

El encabezado muestra
**totales por moneda**
para el conjunto de resultados visible, por ejemplo:
*Total USD: $4.532,10 · Total SGD: $1.205,00*
.

La tabla tiene estas columnas:

| Columna | Fuente |
|---|---|
| **ID de la cotización de servicio** | El `public_id` de la transacción (haga clic para copiar) |
| **Cotización de servicio** | El `public_id` de la cotización de servicio vinculada (haga clic para copiar) |
| **Pedido** | El `public_id` del pedido vinculado (haga clic para copiar) |
| **Cliente** | El nombre de contacto del cliente |
| **Monto** | Monto cobrado con moneda |
| **Fecha** | Marca de tiempo de creación |

La paginación, la ordenación y los filtros funcionan de la misma manera que en otras vistas de listas de Fleet-Ops.

## Dónde se decide entre "En vivo" y "Prueba"

No hay un interruptor "En vivo" o "Prueba" en esta página de configuración. Si las transacciones se procesan a través de Stripe en "En vivo" o en el modo de "Prueba" de Stripe, se determina por completo
**qué credenciales de Stripe está configurado la plataforma**
:

* Claves públicas y secretas "En vivo" → cargos en "En vivo"
* Claves de "Prueba" → cargos de "Prueba"

Si desea desarrollar utilizando Stripe en modo de "Prueba", configure la plataforma con las claves de "Prueba" y ejecute la incorporación contra el entorno de prueba de Stripe.

## Flujo de pago

Una vez conectado, la
[Cotización de servicio](https://fleetbase.io/docs/fleet-ops/operations/service-quotes/overview)
se entrega al cliente a través de uno de los tres caminos: su operación elige el que mejor se adapte a su modelo:

### Camino A — Factura de Ledger (por correo electrónico)

La extensión de Ledger convierte la cotización de servicio en una factura y la envía al cliente por correo electrónico con un enlace de pago alojado
**para la factura**. El cliente hace clic en el enlace, llega a la página de pago de la factura y paga a través de Stripe Checkout.

1. Se crea el pedido → se genera una cotización de servicio.
2. Ledger crea una factura a partir de la cotización y la envía por correo electrónico a la dirección de correo electrónico del cliente.
3. El cliente hace clic en el enlace, abre la página de pago de la factura y paga.
4. Stripe notifica a Fleet-Ops a través de un webhook; el pago se registra como
   `Cotización de servicio`
   vinculada al pedido.
5. El pedido está listo para su envío.

### Camino B — Integraciones API y Portales Externos

Si cuenta con un portal personalizado o una aplicación externa conectada a la API de Fleet-Ops, el flujo de cobro se gestiona mediante dicha integración. Fleet-Ops recibe las notificaciones de webhook y registra el pago (`PurchaseRate`) vinculado al pedido exactamente de la misma manera.

## Permisos

La página de "Pagos" requiere el permiso
`fleet-ops onboard payments`
en el rol del usuario para que la acción de incorporación esté disponible. De lo contrario, el botón de incorporación está desactivado.