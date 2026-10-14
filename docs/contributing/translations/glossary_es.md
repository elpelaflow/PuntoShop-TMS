---
title: "Glosario"
url: https://fleetbase.io/docs/contributing/translations/glossary
module: contributing
---

Traducciones

# Glosario

Nombres de marcas, términos técnicos y vocabulario de dominio que deben — y no deben — traducirse.

# Glosario de traducciones

Una referencia para los términos que aparecen repetidamente en las traducciones de Fleetbase. La regla predeterminada: traducir todo lo que tenga un equivalente local claro. Las excepciones mencionadas a continuación se documentan porque tienden a generar confusión.

## Nombres de marcas — nunca traducir

Estos son nombres propios. Permanecen en su forma original en cada idioma.

| Término | Notas |
|---|---|
| **Fleetbase** | Siempre una palabra, con la F mayúscula |
| **Fleet-Ops** | La extensión de gestión de flotas. Siempre con guión en el texto de visualización. La forma sin guión `FleetOps` aparece en versiones anteriores y en el código — nombres de paquetes, espacios de nombres como `Fleetbase\FleetOps\…` y el repositorio `fleetbase/fleetops` — y debe mantenerse así |
| **Ledger** | La extensión de finanzas |
| **Navigator** | La aplicación móvil para conductores |
| **IAM** | Módulo de Identidad y Gestión de Acceso |

Cuando la frase que lo rodea necesita un sustantivo traducible, trate la marca como un nombre propio:

> ✅ "Fleetbase es una plataforma logística de código abierto." (Alemán)
> ✅ "プラットフォームのFleetbaseは…" (Japonés)
> ❌ "Base de flotte es una plataforma…" (traduce la marca)

## Términos técnicos — normalmente mantener en inglés

La mayoría de las industrias de logística y software utilizan estos términos en inglés a nivel global. Traducirlos dificulta el uso para los usuarios que ya están familiarizados con el vocabulario técnico.
**Utilice el inglés por defecto**
a menos que su idioma tenga un equivalente bien establecido.

| Término en inglés | Predeterminado | Traducir cuando... |
|---|---|---|
| **API** | Mantener | Nunca — universalmente en inglés |
| **Webhook** | Mantener | Nunca — no hay un equivalente local adecuado en la mayoría de los idiomas |
| **Token** | Mantener | Si su idioma tiene un término de criptografía establecido |
| **OAuth, JWT, HMAC** | Mantener | Nunca — estándares de seguridad |
| **WebSocket** | Mantener | Nunca |
| **Endpoint** | Mantener | Si existe un término de API/red claro |
| **Geofence** | Mantener | Si su idioma tiene un término GIS de uso común |
| **Waypoint** | Traducir | La mayoría de los idiomas tienen un término de navegación |
| **Dispatch** | Traducir | Tiene equivalentes claros en todos los idiomas |
| **Dropoff / Pickup** | Traducir | Tiene equivalentes claros en todos los idiomas |
| **POD** (Prueba de Entrega) | Escribir como "Prueba de Entrega" y luego traducir | El acrónimo es opaco en la mayoría de los idiomas |
| **SDK** | Mantener | Universalmente en inglés |
| **CLI** | Mantener | Universalmente en inglés |

## Vocabulario de logística — traducir, pero de forma consistente

Estos son términos de dominio con equivalentes locales claros — pero deben ser
**consistentes en todo el idioma**
. Elija una traducción y utilícela en todas partes.

| Inglés | Notas para los traductores |
|---|---|
| **Order** | La unidad de trabajo. Elija el término local que usaría en una factura de transporte. |
| **Driver** | La persona que opera el vehículo. Diferente de "operador" (que significa el usuario de la plataforma). |
| **Dispatcher** | La persona que asigna las órdenes. A menudo diferente de "conductor" — asegúrese de que la traducción preserve la distinción. |
| **Fleet** | Un grupo de vehículos. |
| **Vehicle** | El activo físico. No debe traducirse como "coche" — puede ser un camión, furgoneta, motocicleta, etc. |
| **Route** | El camino entre puntos de referencia. |
| **Stop** | Un punto de referencia único en una ruta. |
| **Manifest** | La lista de órdenes/elementos en un vehículo para un viaje determinado. |
| **Número de seguimiento** | Identificador único para una orden. No traduzca el nombre del campo; "número de seguimiento" es universal. |

## Estados — coincida con las convenciones de su idioma

Los estados de los pedidos aparecen constantemente. Deben ser cortos, claros y consistentes.

| Inglés | Convención |
|---|---|
| **Created** | Estado inicial, "recién creado" |
| **Preparing** | Estado pre-envío |
| **Dispatched** | Asignado a un conductor |
| **In Progress** | Conductor trabajando activamente |
| **Completed** | Entregado/terminado con éxito |
| **Canceled** | Cancelado antes de la finalización (ortografía en inglés: `Cancelled` con dos L's también es aceptable) |

Utilice la forma en pasado o la forma estática que su idioma use de forma natural en un indicador de estado — etiquetas cortas, no frases completas.

## Tono

Fleetbase busca un tono
**profesional pero sencillo** — no corporativo, ni informal.

* **"You" formal vs. informal**
  : la mayoría de los archivos de idioma tienen la forma educada predeterminada (alemán
  `Sie`
  , francés
  `vous`
  , español
  `usted`
  ). Utilice esto — los operadores suelen utilizar Fleetbase en un contexto laboral.
* **Sin jerga ni modismos regionales**
  : una copia que lee de forma natural en inglés de Singapur no debe perder significado cuando se lee por un operador mexicano. La traducción es similar — elija la versión que sea universalmente comprensible en la principal región de lectura de su idioma.
* **Imperativo para los botones**
  :
  `Save`
  ,
  `Cancel`
  ,
  `Delete`
  — verbos cortos y directos. Refleje esto en su idioma.

## Capitalización

Coincida con las reglas de capitalización naturales de su idioma:

* **Inglés**
  : Título para encabezados (
  `New Order`
  ), frase para descripciones
* **Alemán**
  : Capitalizar todos los sustantivos — incluyendo en medio de la oración
* **Francés / Español / Italiano**
  : Título (solo la primera palabra + sustantivos propios)
* **CJK**
  : Sin caso, pero ajuste las convenciones de espaciado/puntuación del script

No transliterate las reglas de capitalización de título en inglés — traduzca como lo escribiría naturalmente su idioma en una interfaz de usuario.

## Números, monedas y fechas

Estos se formatean de forma programática — no los traduzca, no los cambie, no los reformatee:

* **Números**
  :
  `{count}`
  ,
  `{total}`
  — pasados a través de
  `Intl.NumberFormat`
* **Monedas**
  :
  `{amount}`
  — formateado en tiempo de ejecución según la configuración del usuario
* **Fechas**
  :
  `{date}`
  — formateado a través de
  `Intl.DateTimeFormat`

Si ve una fecha o moneda literal en
`en-us.yaml`
(por ejemplo,
`January 2024`
,
`$100`
), tradúzcalos normalmente. El formateo programático utiliza marcadores de posición, no literales.

## Casos especiales

### "Order" vs. "command" / "purchase"

En algunos idiomas, la palabra para "orden de entrega" (logística) se superpone con "command" o "purchase". Si no está seguro, elija el término más asociado con el contexto de
**transporte o entrega**, no compras minoristas.

### "Driver" en lugares donde el término es de género

Utilice la forma neutral o masculina predeterminada de su idioma en la interfaz de usuario profesional. La mayoría de los archivos de idioma tienen una convención predeterminada de género neutral o masculino — coincida con lo que ya está en su idioma.

### "Customer" vs. "client" vs. "contact"

Fleetbase tiene los tres:

* **Customer**
  — cuenta de cliente o destinatario final
* **Client**
  — relación comercial/dador de carga en Fleet-Ops
* **Contact**
  — persona/organización de registro genérico

Preserve la distinción. No los combine en una sola palabra.

## ¿Tiene un término que no está en esta lista?

Abra una discusión en
`#translations`
en
[Discord](https://fleetbase.io/docs/community/discord)
o comente en su PR — los mantenedores le ayudarán a decidir y lo añadirán aquí.