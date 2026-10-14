---
título: "¿Por qué elegir Fleetbase?"
url: https://fleetbase.io/docs/platform/getting-started/why-fleetbase
módulo: plataforma
---

# ¿Por qué Fleetbase?

¿Por qué las operaciones de logística y cadena de suministro eligen Fleetbase? Debido a la propiedad, la transparencia y la libertad de las restricciones de los software empresariales cerrados.

# ¿Por qué Fleetbase?

Las operaciones de logística se basan en software que nunca fue realmente diseñado para ellas. Las plataformas empresariales diseñadas para grandes transportistas no se adaptan a la forma en que operan realmente las empresas de transporte regional o de entrega bajo demanda. Las herramientas SaaS ligeras se encuentran con limitaciones cuando las operaciones se vuelven complejas. Y los modelos de precios de las plataformas cerradas (por conductor, por pedido, por asiento) tratan el crecimiento como una carga.

Fleetbase es un tipo diferente de plataforma logística. Es de código abierto, se puede alojar de forma autónoma y está diseñada para adaptarse a la forma en que funciona realmente su operación, y no al revés.

## Usted es el dueño de su plataforma

El software de logística cerrado se basa en un único principio: usted paga por el acceso a un sistema de otra empresa. Esto significa que sus flujos de trabajo, sus datos, sus integraciones y su continuidad operativa están todos ligados a las decisiones de un proveedor, como su precio, su hoja de ruta, su disponibilidad, etc.

Fleetbase es de código abierto bajo
**AGPL-3.0**. El código fuente completo está disponible públicamente. Puede inspeccionarlo, ejecutarlo en su propia infraestructura, modificarlo y mantenerlo funcionando indefinidamente, independientemente de lo que decida hacer cualquier empresa. No existen niveles de licencia que desbloqueen funciones, ni tarifas por conductor que se escalen en su contra, ni ningún proveedor con el poder de aumentar los precios o interrumpir el acceso.

Para las organizaciones que necesitan mantener las modificaciones propietarias privadas, está disponible una
[licencia comercial](https://fleetbase.io/licensing).

## Sus datos permanecen donde los ubique

En la mayoría de las plataformas SaaS de logística, sus datos operativos (historial de pedidos, rutas de los conductores, direcciones de clientes, patrones de rutas, rendimiento de la entrega) residen en un servidor de un tercero en un centro de datos que nunca ha visto, y están gobernados por una política de privacidad que usted no ha negociado.

Con Fleetbase, usted elige dónde residen sus datos. Puede desplegarlos en AWS, Azure, GCP, DigitalOcean, su propio centro de datos o en un entorno en la nube privada sin acceso a internet. Sus datos de logística son suyos, no una carga en el balance de otra empresa.

Esto es especialmente importante para:

* Empresas que operan bajo
  **requisitos de residencia de datos**
  (GDPR, leyes locales de soberanía de datos)
* Operaciones de logística gubernamentales y de defensa que no pueden utilizar una infraestructura en la nube compartida
* Operaciones que manejan mercancías sensibles, datos comerciales o información de clientes que deben permanecer internas

## Una plataforma que se adapta a su operación

Cada negocio de logística es diferente. Diferentes tipos de pedidos, diferentes lógica de asignación de conductores, diferentes requisitos de prueba de entrega, diferentes integraciones con sistemas ERP, WMS o de contabilidad. Las plataformas cerradas le ofrecen opciones de configuración, pero Fleetbase le ofrece una plataforma que realmente puede cambiar.

Las extensiones agregan nuevas capacidades tanto a la API como a la interfaz de usuario del panel sin modificar el núcleo. Puede crear un tipo de pedido específico para su transporte, integrarse directamente con su ERP en el nivel de datos, agregar una pizarra de despachos que coincida exactamente con la forma en que funciona su equipo, o publicar herramientas internas para su equipo de operaciones, todo dentro de la misma plataforma que ya utilizan sus despachadores.

Esto no es una función para desarrolladores. Es lo que hace que Fleetbase sea una plataforma viable a largo plazo para una operación de logística seria, en lugar de algo que crezca y reemplace.

## Capacidades de primera clase, listas para usar

Fleetbase no es un marco que se ensambla a partir de piezas. Viene con las capacidades operativas que necesitan las empresas de logística:

* **Seguimiento en tiempo real de la flota**
  — Ubicación del conductor en vivo en mapas, impulsado por un motor de eventos WebSocket
* **Gestión de pedidos**
  — Desde la creación hasta el envío, el seguimiento en tránsito y la prueba de entrega, todo en un solo lugar
* **Rutas y optimización multi-paradas**
  — Integrado con OSRM y motores de enrutamiento configurables
* **Herramientas de despachos**
  — Tableros de pedidos tipo Kanban, asignación de conductores y feeds de actividad
* **Comunicación con los conductores**
  — Chat en tiempo real, notificaciones push a través de la aplicación móvil Navigator
* **Prueba de entrega**
  — Captura de fotos, firma digital, códigos QR y escáneres de códigos de barras
* **Control de identidad y acceso**
  — Roles, permisos y soporte para organizaciones complejas
* **API y plataforma de webhooks**
  — Todas las operaciones disponibles a través de la API REST; todos los eventos pueden suscribirse a través de webhooks

Estas no son funciones que desbloquee en un nivel de precios superior. Son parte de la plataforma.

## ¿Cómo se compara Fleetbase?

|  | Software SaaS cerrado | Fleetbase |
|---|---|---|
| **Acceso al código fuente** | No | Acceso completo (AGPL-3.0) |
| **Ubicación de los datos** | Servidores de un tercero | Su propia infraestructura |
| **Precio** | Por conductor / por pedido / por asiento | Solo el coste de la infraestructura |
| **Personalización** | Opciones de configuración y límites de la API | Modifique cualquier cosa, extienda todo |
| **Dependencia del proveedor** | Alta — precio, hoja de ruta, disponibilidad | Ninguna |
| **Seguimiento en tiempo real** | Incluido (caja negra) | Incluido (código abierto) |
| **Opciones de implementación** | Solo SaaS | Nube, en el sitio, offline, híbrido |
| **Mercado de extensiones** | Propietario o ninguno | Impulsado por la comunidad, abierto |
| **Auditoría y cumplimiento** | Opaco | Transparencia completa del código fuente |

## ¿Quién utiliza Fleetbase?

**Operaciones de mensajería y entrega al último milla**
que despachan conductores, gestionan colas de pedidos y necesitan un seguimiento en tiempo real, y quieren una plataforma que controlen en lugar de alquilar indefinidamente.

**Plataformas de entrega bajo demanda y hyperlocal**
que ejecutan aplicaciones de pedidos para consumidores, mercados multiventas o redes de entrega del mismo día, donde el núcleo operativo necesita ser fiable, escalable y adaptable.

**Operaciones de cadena de suministro y servicios de campo**
que gestionan flujos de trabajo complejos de múltiples paradas, zonas de servicio, flotas de vehículos e inventario, donde las plantillas de software cerradas no se adaptan a la realidad diaria.

**Organizaciones con requisitos de cumplimiento y soberanía de datos**
— en industrias reguladas, logística gubernamental o mercados donde la residencia de datos no es opcional.

**Operaciones de logística que están creciendo y necesitan herramientas más allá de las limitaciones de precios, límites de API o restricciones de personalización de las plataformas cerradas.**

## Próximos pasos

* [Visión general de la plataforma](https://fleetbase.io/docs/platform/getting-started/overview)
  — vea qué incluye la plataforma
* [Arquitectura](https://fleetbase.io/docs/platform/getting-started/architecture)
  — comprenda cómo está estructurada Fleetbase
* [Guía rápida de la nube](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)
  — empiece a utilizar Fleetbase Cloud en minutos