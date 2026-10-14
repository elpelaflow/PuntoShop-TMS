---
Título: Prueba de Entrega
URL: https://fleetbase.io/docs/fleet-ops/operations/orders/proof-of-delivery
Módulo: fleet-ops
---

Órdenes

# Prueba de Entrega

Configure y revise la prueba de entrega: firmas, fotos, escaneos de códigos QR y datos personalizados capturados a través de la aplicación Navigator.

# Prueba de Entrega

**Prueba de Entrega (POD)**
es la evidencia recopilada por el conductor en el momento de la entrega, confirmando que un pedido (o un artículo o punto de referencia específico dentro de un pedido) se ha entregado correctamente. Fleet-Ops admite cuatro métodos de POD, y la POD se configura
**por actividad**
en la configuración de la actividad, en la sección
[flujo de actividades](https://fleetbase.io/docs/fleet-ops/operations/order-configurations/activity-flows)
.

## Métodos de POD

El campo `pod_method` en cada actividad acepta uno de los siguientes valores:

| Método | Valor | Cómo funciona |
|---|---|---|
| **Escaneo (código de barras / QR)** | `scan` | El conductor escanea un código de barras o QR en el paquete; el valor escaneado se registra junto con el pedido, la entidad o el punto de referencia |
| **Firma** | `signature` | El destinatario firma en la pantalla del teléfono del conductor en la aplicación Navigator |
| **Foto** | `photo` | El conductor toma una foto de la entrega |
| **Verificación por SMS** | `sms` | Fleet-Ops envía un código de confirmación único al cliente por SMS; el conductor ingresa el código del cliente en Navigator para confirmar la entrega |

La POD se guarda en actividades individuales, no en la configuración general del pedido. Esto significa que una sola configuración puede requerir un escaneo de código de barras en la recogida, una firma en la entrega, un código SMS al entregar al cliente y ninguna POD en los pasos de tránsito intermedios.

## Configuración de la POD por Actividad

La POD se configura dentro del flujo de actividades, en cada actividad que deba registrar la prueba.

Navegue a
**Fleet-Ops → Operaciones → Configuraciones de Pedidos**
.

Abra o cree una Configuración de Pedidos y vaya a la pestaña
**Flujo de Actividades**.

En la actividad que deba registrar la POD, configure:

* `pod_method`
  — uno de
  `scan`
  ,
  `signature`
  ,
  `photo`
  , o
  `sms`
* `require_pod: true`
  — el conductor no puede iniciar la actividad en Navigator sin capturar la POD primero

Para pedidos con múltiples paradas, puede configurar diferentes requisitos de POD por punto de referencia, adjuntando actividades que contengan la POD a cada sub-flujo de parada.

Guarde la configuración. Los nuevos pedidos creados contra esta configuración obtendrán los requisitos de POD actualizados.

## Cómo los Conductores Capturan la POD

En la aplicación Navigator, cuando un conductor inicia una actividad que tiene
`require_pod: true`
:

1. La aplicación le solicita que capture la POD según el método configurado
   `pod_method`
2. Para
   **`signature`**
   : el destinatario firma directamente en la pantalla
3. Para
   **`photo`**
   : la aplicación abre la cámara; el conductor toma una foto de la entrega
4. Para
   **`scan`**
   : la aplicación abre el escáner; el conductor escanea un código de barras o QR en el paquete
5. Para
   **`sms`**
   : Fleet-Ops envía un código único al teléfono del cliente; el conductor solicita el código al cliente y lo ingresa en Navigator
6. El conductor confirma: la POD se carga como un registro de
   **Prueba**
   y la actividad continúa

## POD para Entidades y Puntos de Referencia

Para pedidos con múltiples artículos (entidades) o múltiples paradas (puntos de referencia), la POD se puede capturar individualmente:

* **Por entidad**
  — cada artículo requiere su propia prueba (por ejemplo, una foto de cada paquete entregado)
* **Por punto de referencia**
  — cada parada requiere POD antes de que el conductor pueda continuar con la siguiente parada

Esto crea un registro de auditoría detallado para entregas complejas con múltiples paradas.

## Ver la POD en la Consola

La POD capturada aparece en el
**Panel de Detalles del Pedido**
en la sección
**Pruebas**
:

* Las imágenes de la firma se muestran en línea
* Las fotos se muestran como miniaturas con vista completa
* Los registros de escaneo muestran el valor de código de barras/QR escaneado y la marca de tiempo

Cada registro de Prueba almacena:

| Campo | Significado |
|---|---|
| `subject_uuid` / `subject_type` | El sujeto polimórfico: Pedido, Entidad o Punto de Referencia al que se adjunta la prueba |
| `file_uuid` | La imagen cargada (firma o foto) |
| `raw_data` | El valor escaneado sin procesar (para el método de escaneo) |
| `data` | Metadatos estructurados de la prueba |
| `remarks` | Notas opcionales ingresadas por el conductor |
| `created_at` | Marca de tiempo de captura |

![Panel de detalles del pedido — Sección Pruebas mostrando una firma y una foto de entrega](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-order-proof-of-delivery.5929ff8f.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Descargar la POD

En el panel de detalles del pedido, haga clic en
**Descargar**
en cualquier prueba para guardar la imagen de la firma o la foto. Para exportaciones masivas, use la función de exportación de pedidos: las exportaciones CSV incluyen URL de POD que enlazan a los archivos almacenados.

## POD a través de la API

La POD también se puede capturar a través de la API. Tres puntos finales aceptan la entrega de pruebas:

```
POST /v1/orders/{id}/capture-signature/{subjectId}
POST /v1/orders/{id}/capture-photo/{subjectId}
POST /v1/orders/{id}/capture-qr/{subjectId}
```

El
`subjectId`
es el UUID del pedido, la entidad o el punto de referencia al que se adjunta la prueba.

Consulte la
[referencia de la API](https://fleetbase.io/docs/api)
para los esquemas de cuerpo de solicitud.

[Importar

Importe muchos pedidos a la vez desde una hoja de cálculo, incluidas las órdenes con múltiples puntos de parada y múltiples entidades, utilizando el asistente de importación de pedidos.](https://fleetbase.io/docs/fleet-ops/operations/orders/importing-orders)
[Seguimiento

Realice un seguimiento del progreso, la posición del conductor y el ETA de los pedidos en vivo desde la vista de detalles del pedido y el mapa en vivo.](https://fleetbase.io/docs/fleet-ops/operations/orders/tracking)