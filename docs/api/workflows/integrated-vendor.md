---
title: "Integrated Vendor Flow"
url: https://fleetbase.io/docs/api/workflows/integrated-vendor
module: api
---

# Integrated Vendor Flow

1. ## [Search Places](#search-places)

   Searches places near a latitude/longitude pair for use as workflow waypoint data.

   GET
   `/v1/places/search`

   Query parameters

   `ll`

   string

   optional

   Latitude and longitude used as the search origin.

   `locale`

   string

   optional

   Locale used to format place search results.

   `query`

   string

   optional

   Search text for the place lookup.

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
2. ## [Query Orders](#query-orders)

   Lists recent orders so you can verify the order created by the integrated vendor workflow.

   GET
   `/v1/orders`

   Query parameters

   `limit`

   integer

   optional

   Maximum number of orders to return.

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
3. ## [Query Places](#query-places)

   Lists recent places that can be reused as waypoint or order locations during the workflow.

   GET
   `/v1/places`

   Query parameters

   `limit`

   integer

   optional

   Maximum number of places to return.

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
4. ## [Get Internal Service Quote](#get-internal-service-quote)

   Requests a service quote using an internal integrated vendor facilitator and waypoint payload.

   GET
   `/v1/service-quotes`

   Query parameters

   `service_type`

   string

   optional

   Integrated vendor service type code used for rating.

   `facilitator`

   string

   optional

   Public ID of the integrated vendor facilitator.

   `is_route_optimized`

   boolean

   optional

   Whether the integrated vendor should optimize waypoint order.

   `waypoints[0][name]`

   string

   optional

   Display name for the first waypoint.

   `waypoints[0][phone]`

   string

   optional

   Contact phone number for the first waypoint.

   `waypoints[0][location][type]`

   string

   optional

   GeoJSON location type for the first waypoint.

   `waypoints[0][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the first waypoint.

   `waypoints[1][name]`

   string

   optional

   Display name for the second waypoint.

   `waypoints[1][phone]`

   string

   optional

   Contact phone number for the second waypoint.

   `waypoints[1][location][type]`

   string

   optional

   GeoJSON location type for the second waypoint.

   `waypoints[1][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the second waypoint.

   `waypoints[2][name]`

   string

   optional

   Display name for the third waypoint.

   `waypoints[2][phone]`

   string

   optional

   Contact phone number for the third waypoint.

   `waypoints[2][location][type]`

   string

   optional

   GeoJSON location type for the third waypoint.

   `waypoints[2][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the third waypoint.

   `specialRequests[0]`

   string

   optional

   First integrated vendor special request code.

   `specialRequests[1]`

   string

   optional

   Second integrated vendor special request code.

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
5. ## [Get Service Quote from Integrated Vendor](#get-service-quote-from-integrated-vendor)

   Requests a route-optimized service quote from an integrated vendor using waypoint coordinates and optional stop remarks.

   GET
   `/v1/service-quotes`

   Query parameters

   `service_type`

   string

   optional

   Integrated vendor service type code used for rating.

   `facilitator`

   string

   optional

   Public ID of the integrated vendor facilitator.

   `is_route_optimized`

   boolean

   optional

   Whether the integrated vendor should optimize waypoint order.

   `waypoints[0][name]`

   string

   optional

   Display name for the first waypoint.

   `waypoints[0][phone]`

   string

   optional

   Contact phone number for the first waypoint.

   `waypoints[0][location][type]`

   string

   optional

   GeoJSON location type for the first waypoint.

   `waypoints[0][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the first waypoint.

   `waypoints[1][name]`

   string

   optional

   Display name for the second waypoint.

   `waypoints[1][phone]`

   string

   optional

   Contact phone number for the second waypoint.

   `waypoints[1][remarks]`

   string

   optional

   Driver or vendor remarks for the second waypoint.

   `waypoints[1][location][type]`

   string

   optional

   GeoJSON location type for the second waypoint.

   `waypoints[1][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the second waypoint.

   `waypoints[2][name]`

   string

   optional

   Display name for the third waypoint.

   `waypoints[2][phone]`

   string

   optional

   Contact phone number for the third waypoint.

   `waypoints[2][remarks]`

   string

   optional

   Driver or vendor remarks for the third waypoint.

   `waypoints[2][location][type]`

   string

   optional

   GeoJSON location type for the third waypoint.

   `waypoints[2][location][coordinates]`

   string

   optional

   Longitude and latitude coordinates for the third waypoint.

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
6. ## [Create Order from Service Quote](#create-order-from-service-quote)

   Creates an order from a purchased service quote. Use this after selecting the integrated vendor quote returned by the service quote step.

   POST
   `/v1/orders`

   Body parameters

   `service_quote`

   string

   required

   Public ID of the service quote to convert into an order.

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
7. ## [Cancel Order](#cancel-order)

   Cancels the order created from the integrated vendor service quote workflow.

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
