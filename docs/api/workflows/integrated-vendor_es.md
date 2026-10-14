---
title: "Flujo de Proveedores Integrado"
url: https://fleetbase.io/docs/api/workflows/integrated-vendor
module: api
---

# Flujo de Proveedores Integrado

1. ## [Buscar Lugares](#buscar-lugares)

   Busca lugares cercanos a una pareja de coordenadas (latitud/longitud) para su uso como puntos de referencia en el flujo de trabajo.

   GET
   `/v1/places/search`

   Parámetros de consulta

   `ll`

   string

   opcional

   Latitud y longitud utilizadas como origen de búsqueda.

   `locale`

   string

   opcional

   Idioma utilizado para formatear los resultados de búsqueda de lugares.

   `query`

   string

   opcional

   Texto de búsqueda para la búsqueda de lugares.

   GET
   `/v1/places/search`

   curl

   JavaScript

   PHP

   Python

   ```
   curl https://api.fleetbase.io/v1/places/search?ll=25.0147912108003%2C121.46998215767363&locale=zh-TW&query=%E8%87%BA%E5%8C%97%E5%B8%82%E4%B8%AD%E5%B1%B1%E5%8D%80%E5%BF%A0%E5%AD%9D%E6%9D%B1%E6%AD%90%E7%89%A9 \
     -H "Authorization: Bearer flb_live_…"
   ```
2. ## [Consultar Órdenes](#consultar-ordenes)

   Lista las órdenes recientes para verificar la orden creada por el flujo de trabajo de proveedores integrado.

   GET
   `/v1/orders`

   Parámetros de consulta

   `limit`

   integer

   opcional

   Número máximo de órdenes a devolver.

   GET
   `/v1/orders`

   curl

   JavaScript

   PHP

   Python

   ```
   curl https://api.fleetbase.io/v1/orders?limit=5 \
     -H "Authorization: Bearer flb_live_…"
   ```
3. ## [Consultar Lugares](#consultar-lugares)

   Lista los lugares recientes que se pueden reutilizar como puntos de referencia o ubicaciones de orden durante el flujo de trabajo.

   GET
   `/v1/places`

   Parámetros de consulta

   `limit`

   integer

   opcional

   Número máximo de lugares a devolver.

   GET
   `/v1/places`

   curl

   JavaScript

   PHP

   Python

   ```
   curl https://api.fleetbase.io/v1/places?limit=5 \
     -H "Authorization: Bearer flb_live_…"
   ```
4. ## [Obtener Cotización de Servicio Interna](#obtener-cotizacion-de-servicio-interna)

   Solicita una cotización de servicio utilizando un facilitador integrado de proveedores y datos de punto de referencia.

   GET
   `/v1/service-quotes`

   Parámetros de consulta

   `service_type`

   string

   opcional

   Código de tipo de servicio del proveedor integrado utilizado para la calificación.

   `facilitator`

   string

   opcional

   ID público del facilitador del proveedor integrado.

   `is_route_optimized`

   boolean

   opcional

   Si el proveedor integrado debe optimizar la ruta.

   `waypoints[0][name]`

   string

   opcional

   Nombre de visualización para el primer punto de referencia.

   `waypoints[0][phone]`

   string

   opcional

   Número de teléfono de contacto para el primer punto de referencia.

   `waypoints[0][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el primer punto de referencia.

   `waypoints[0][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el primer punto de referencia.

   `waypoints[1][name]`

   string

   opcional

   Nombre de visualización para el segundo punto de referencia.

   `waypoints[1][phone]`

   string

   opcional

   Número de teléfono de contacto para el segundo punto de referencia.

   `waypoints[1][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el segundo punto de referencia.

   `waypoints[1][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el segundo punto de referencia.

   `waypoints[2][name]`

   string

   opcional

   Nombre de visualización para el tercer punto de referencia.

   `waypoints[2][phone]`

   string

   opcional

   Número de teléfono de contacto para el tercer punto de referencia.

   `waypoints[2][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el tercer punto de referencia.

   `waypoints[2][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el tercer punto de referencia.

   `specialRequests[0]`

   string

   opcional

   Primer código de solicitud especial del proveedor integrado.

   `specialRequests[1]`

   string

   opcional

   Segundo código de solicitud especial del proveedor integrado.

   GET
   `/v1/service-quotes`

   curl

   JavaScript

   PHP

   Python

   ```
   curl https://api.fleetbase.io/v1/service-quotes?service_type=SUV&facilitator=integrated_vendor_wa5AwdA&is_route_optimized=true&waypoints%5B0%5D%5Bname%5D=Stop%201&waypoints%5B0%5D%5Bphone%5D=%2B886970699044&waypoints%5B0%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B0%5D%5Blocation%5D%5Bcoordinates%5D=121.526333%2C25.036688&waypoints%5B1%5D%5Bname%5D=Stop%202&waypoints%5B1%5D%5Bphone%5D=%2B886970699044&waypoints%5B1%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B1%5D%5Blocation%5D%5Bcoordinates%5D=121.526333%2C25.036688&waypoints%5B2%5D%5Bname%5D=Stop%203&waypoints%5B2%5D%5Bphone%5D=%2B886970699044&waypoints%5B2%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B2%5D%5Blocation%5D%5Bcoordinates%5D=121.526333%2C25.036688&specialRequests%5B0%5D=CASH_ON_DELIVERY&specialRequests%5B1%5D=FRAGILE_GOODS \
     -H "Authorization: Bearer flb_live_…"
   ```
5. ## [Obtener Cotización de Servicio del Proveedor Integrado](#obtener-cotizacion-de-servicio-del-proveedor-integrado)

   Solicita una cotización de ruta optimizada de un proveedor integrado utilizando coordenadas de puntos de referencia y anotaciones opcionales.

   GET
   `/v1/service-quotes`

   Parámetros de consulta

   `service_type`

   string

   opcional

   Código de tipo de servicio del proveedor integrado utilizado para la calificación.

   `facilitator`

   string

   opcional

   ID público del facilitador del proveedor integrado.

   `is_route_optimized`

   boolean

   opcional

   Si el proveedor integrado debe optimizar la ruta.

   `waypoints[0][name]`

   string

   opcional

   Nombre de visualización para el primer punto de referencia.

   `waypoints[0][phone]`

   string

   opcional

   Número de teléfono de contacto para el primer punto de referencia.

   `waypoints[0][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el primer punto de referencia.

   `waypoints[0][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el primer punto de referencia.

   `waypoints[1][name]`

   string

   opcional

   Nombre de visualización para el segundo punto de referencia.

   `waypoints[1][phone]`

   string

   opcional

   Número de teléfono de contacto para el segundo punto de referencia.

   `waypoints[1][remarks]`

   string

   opcional

   Comentarios del conductor o del proveedor para el segundo punto de referencia.

   `waypoints[1][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el segundo punto de referencia.

   `waypoints[1][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el segundo punto de referencia.

   `waypoints[2][name]`

   string

   opcional

   Nombre de visualización para el tercer punto de referencia.

   `waypoints[2][phone]`

   string

   opcional

   Número de teléfono de contacto para el tercer punto de referencia.

   `waypoints[2][remarks]`

   string

   opcional

   Comentarios del conductor o del proveedor para el tercer punto de referencia.

   `waypoints[2][location][type]`

   string

   opcional

   Tipo de ubicación GeoJSON para el tercer punto de referencia.

   `waypoints[2][location][coordinates]`

   string

   opcional

   Coordenadas de longitud y latitud para el tercer punto de referencia.

   GET
   `/v1/service-quotes`

   curl

   JavaScript

   PHP

   Python

   ```
   curl https://api.fleetbase.io/v1/service-quotes?service_type=MOTORCYCLE&facilitator=integrated_vendor_wD5EJ7g&is_route_optimized=true&waypoints%5B0%5D%5Bname%5D=Stop%201&waypoints%5B0%5D%5Bphone%5D=%2B6596379222&waypoints%5B0%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B0%5D%5Blocation%5D%5Bcoordinates%5D=103.8835179%2C1.3132044&waypoints%5B1%5D%5Bname%5D=Stop%202&waypoints%5B1%5D%5Bphone%5D=%2B6596379222&waypoints%5B1%5D%5Bremarks%5D=Testing%20remarks%201&waypoints%5B1%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B1%5D%5Blocation%5D%5Bcoordinates%5D=103.8384048%2C1.3081903&waypoints%5B2%5D%5Bname%5D=Stop%203&waypoints%5B2%5D%5Bphone%5D=%2B6596379222&waypoints%5B2%5D%5Bremarks%5D=Testing%20remarks%202&waypoints%5B2%5D%5Blocation%5D%5Btype%5D=Point&waypoints%5B2%5D%5Blocation%5D%5Bcoordinates%5D=103.8722585%2C1.3507723 \
     -H "Authorization: Bearer flb_live_…"
   ```
6. ## [Crear Orden a partir de la Cotización de Servicio](#crear-orden-a-partir-de-la-cotizacion-de-servicio)

   Crea una orden a partir de una cotización de servicio comprada. Utilice esto después de seleccionar la cotización del proveedor integrado devuelta por el paso de la cotización de servicio.

   POST
   `/v1/orders`

   Parámetros del cuerpo

   `service_quote`

   string

   requerido

   ID público de la cotización de servicio para convertirla en una orden.

   POST
   `/v1/orders`

   curl

   JavaScript

   PHP

   Python

   ```
   curl -X POST https://api.fleetbase.io/v1/orders \
     -H "Authorization: Bearer flb_live_…"
   ```
7. ## [Cancelar Orden](#cancelar-orden)

   Cancela la orden creada a partir del flujo de trabajo de cotización de servicio del proveedor integrado.

   DELETE
   `/v1/orders/cancel`

   DELETE
   `/v1/orders/cancel`

   curl

   JavaScript

   PHP

   Python

   ```
   curl -X DELETE https://api.fleetbase.io/v1/orders/cancel \
     -H "Authorization: Bearer flb_live_…"
   ```