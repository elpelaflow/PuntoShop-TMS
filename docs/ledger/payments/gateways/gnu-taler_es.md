---
title: "GNU Taler"
url: https://fleetbase.io/docs/ledger/payments/gateways/gnu-taler
module: ledger
---

Pasarelas de Pago

# GNU Taler

Configure la pasarela de pago GNU Taler para pagos con billetera, webhooks seguros para el inquilino, reembolsos, diagnósticos y comprobaciones de liquidación.

# GNU Taler

GNU Taler es una pasarela digital de efectivo basada en billetera para Ledger. Los clientes pagan una factura desde una billetera de Taler, el backend de Taler Merchant envía un webhook con ámbito de inquilino a Ledger, y Ledger actualiza el registro de la transacción de la pasarela, el estado del reembolso y los metadatos de liquidación.

Utilice GNU Taler cuando necesite pagos con billetera que preserven la privacidad, un backend de Taler Merchant implementado y registros de pagos/reembolsos auditable dentro de Ledger.

## Requisitos

| Requisito | Descripción |
|---|---|
| **URL de la API del Merchant Backend** | URL base para el backend de Taler Merchant, sin credenciales privadas en la URL |
| **ID de la instancia** | Instancia de Taler merchant utilizada por esta pasarela de Ledger |
| **Token de API** | Token del backend de Merchant con permiso para crear órdenes, leer el estado de la orden, emitir reembolsos y crear/actualizar webhooks |
| **Moneda** | Moneda aceptada por el intercambio de Taler y configurada para las facturas de Ledger |
| **URL de webhook HTTPS** | URL de webhook pública de Ledger accesible desde el backend de Taler Merchant |

Mantenga las credenciales de sandbox y producción fuera del repositorio. Utilice variables de entorno, almacenamiento de secretos o la configuración de pasarela de Ledger encriptada.

## Sandbox alojado por Fleetbase

Fleetbase proporciona servicios de sandbox de GNU Taler alojados para pruebas en Ledger:

| Servicio | URL | Utilizado para |
|---|---|---|
| **Backend de Merchant** | `https://merchant.taler.fleetbase.io` | Llamadas de API de la pasarela de Ledger, creación de órdenes, reembolsos, webhooks y comprobaciones de liquidación |
| **Intercambio** | `https://exchange.taler.fleetbase.io` | Visibilidad del intercambio de billetera y diagnósticos de sandbox del intercambio |
| **Banco** | `https://bank.taler.fleetbase.io` | Financiamiento de la billetera en sandbox y operaciones de prueba en el lado del banco |

Ledger se comunica directamente con el Backend de Merchant. Los endpoints de intercambio y banco admiten el financiamiento de la billetera, la visibilidad de la confianza/intercambio de la billetera, pruebas en sandbox y diagnósticos del operador.

Cuando un gateway de GNU Taler está en modo
`sandbox`
y la URL del Backend de Merchant no está vacía, Ledger utiliza
`https://merchant.taler.fleetbase.io`
por defecto. Los gateways en vivo no utilizan esta opción de respaldo y siempre deben configurarse con su URL de Backend de Merchant de producción.

## Configurar la Pasarela

Navegue a
**Ledger -> Pagos -> Pasarelas**
.

Haga clic en
**Nueva Pasarela**
y seleccione el controlador
`taler`
.

Ingrese la URL del Backend de Merchant, el ID de la instancia, el token de API y las monedas que debe aceptar esta pasarela. Para pruebas con sandbox alojado por Fleetbase, puede dejar la URL del Backend de Merchant vacía o utilizar
`https://merchant.taler.fleetbase.io`
.

Establezca el entorno en
`sandbox`
para billeteras de prueba o
`live`
para billeteras de producción.

Guarde la pasarela y luego abra la pantalla de detalles de la pasarela.

Ejecute
**Credenciales de Prueba**
,
**Crear Orden de Prueba**
y
**Registrar Webhook**
antes de habilitar la pasarela para facturas.

## Diagnóstico de Administración

La pantalla de detalles de la pasarela de Taler incluye comprobaciones operativas para:

| Diagnóstico | Significado |
|---|---|
| **Estado de la credencial** | Ledger puede acceder al Backend de Merchant con el token configurado |
| **Registro del webhook** | Ledger ha registrado o actualizado la llamada de retorno del webhook del Backend de Merchant |
| **Último webhook recibido** | Último webhook de Taler aceptado por Ledger |
| **Último evento de pago** | Último evento de pago de Taler registrado en `GatewayTransaction` |
| **Último evento de reembolso** | Último evento de reembolso de Taler, incluyendo datos de URI de reembolso de la billetera |
| **Última comprobación de liquidación** | Última comprobación de conciliación contra el estado de la orden de Taler o metadatos de wire |

Las pasarelas de Taler pueden no exponer todas las acciones de diagnóstico. Las acciones no admitidas devuelven una respuesta no admitida en lugar de cambiar el estado de la pasarela.

## Payload del Webhook

Los webhooks de GNU Taler provisionados deben publicar suficientes datos para una enrutamiento seguro para el inquilino:

```
{
  "order_id": "order_123",
  "company_uuid": "company_uuid",
  "gateway_id": "gateway_public_id",
  "event_type": "pay"
}
```

`gateway_uuid`
puede utilizarse en lugar de
`gateway_id`
cuando el UUID es el identificador disponible en el flujo de provisionamiento. Para webhooks provisionados,
`order_id`
,
`company_uuid`
y un identificador de gateway son necesarios.

Ledger rechaza las llamadas de retorno de Taler ambiguas de múltiples empresas en lugar de seleccionar la primera pasarela activa. La resolución fallida se registra como una transacción de pasarela fallida para que los operadores puedan diagnosticar la pasarela desconocida, la empresa incorrecta o la falta de metadatos de enrutamiento.

Las notificaciones duplicadas de Taler son idempotentes. Ledger mantiene la clave de transacción de la pasarela e incluye el ámbito de la pasarela/empresa en el manejo de duplicados y registra.

## Flujo de Pago

1. Ledger crea un orden de pago de Taler para el monto de la factura y almacena la referencia de la orden.
2. La página pública de la factura muestra la URI o el código QR de pago de Taler.
3. El cliente paga con una billetera de Taler.
4. El backend de Taler Merchant envía el webhook con ámbito de inquilino a Ledger.
5. Ledger verifica el estado de la orden, registra la transacción de la pasarela y marca la factura como pagada o parcialmente pagada según el monto normalizado.
6. Se crea una transacción y un registro de diario de Ledger para el pago de la factura.

Si el webhook informa de una orden no pagada o desconocida, Ledger registra el evento y deja la factura sin pagar.

## Reembolsos

Los reembolsos de Taler tienen dos etapas separadas:

| Etapa | Comportamiento de Ledger |
|---|---|
| Solicitud o aprobación de reembolso en el backend | Ledger registra la transacción de reembolso de la pasarela y el monto de reembolso normalizado |
| Retorno de URI de reembolso de la billetera | La respuesta interna de reembolso incluye `taler_refund_uri` y `refund_url` para el procesamiento de la billetera |
| Aceptado por la billetera | Ledger actualiza el estado de reembolso cuando el estado de aceptación es observable |
| Fallido o expirado | Ledger registra el resultado fallido o expirado y mantiene el historial de la factura/pago auditable |

Los reembolsos parciales reducen el saldo pagado sin forzar la factura a ser completamente reembolsada. Los reembolsos completos mueven la factura a un estado de reembolso una vez que la cantidad acumulada de reembolso alcanza la cantidad pagada. Los reversos de reembolso están vinculados a las transacciones y registros de diario de Ledger.

## Liquidación y Conciliación

Las comprobaciones de liquidación verifican los pedidos de pago de Taler contra el estado del backend de Merchant. Ledger registra el último estado de liquidación, la marca de tiempo de la comprobación, los totales de transferencia, los identificadores de transferencia y los campos de liquidación de Taler cuando el backend los expone.

Algunas respuestas de sandbox o backend pueden no incluir un identificador de transferencia de wire estable. En este caso, Ledger marca el registro como comprobado en liquidación en lugar de reconciliado y almacena los mejores campos de Taler disponibles para la auditoría.

## Validación E2E de Sandbox

La validación de sandbox en vivo es opcional y no debe ejecutarse en CI normal. Configure el sandbox desde variables de entorno o una configuración de pasarela encriptada:

```
TALER_E2E_ENABLED=true
TALER_E2E_BACKEND_URL=https://merchant.taler.fleetbase.io
TALER_E2E_INSTANCE_ID=default
TALER_E2E_API_TOKEN=...
TALER_E2E_COMPANY_UUID=...
```

El flujo de aceptación es:

1. Crear o seleccionar una pasarela de Taler.
2. Crear una factura.
3. Iniciar el pago y pagar con una billetera de sandbox.
4. Recibir el webhook y confirmar que la factura pasa a pagada.
5. Emitir un reembolso parcial o completo.
6. Confirmar que se devuelve la URI de reembolso y que se crea el registro de reversión de Ledger.
7. Verificar los metadatos de liquidación después de que se ejecute la comprobación de liquidación.

Nunca cometa URLs de sandbox, tokens de API, secretos de billetera o credenciales privadas de Backend de Merchant.

## Manual de Ejecución de Producción

* Utilice HTTPS para la URL del webhook de Ledger.
* Aloje el token de API de Merchant para que solo tenga los permisos necesarios para Ledger.
* Registre los webhooks desde la pantalla de detalles de la pasarela para incluir
  `company_uuid`
  y identificadores de gateway.
* Confirme los diagnósticos antes de habilitar la pasarela para facturas públicas.
* Mantenga los registros de pasarela con ámbito de empresa y evite compartir una instancia de Backend de Merchant para múltiples empresas sin metadatos de enrutamiento seguros para el inquilino.
* Monitoree las filas
  `GatewayTransaction`
  para webhooks fallidos, entrega duplicada, estado de reembolso y estado de liquidación.