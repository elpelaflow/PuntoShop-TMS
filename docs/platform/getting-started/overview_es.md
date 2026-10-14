---
title: "Descripción general"
url: https://fleetbase.io/docs/platform/getting-started/overview
module: platform
---

# Descripción general

¿Qué es Fleetbase, cómo funciona y para quién está diseñado? Obtenga una visión completa de la plataforma antes de comenzar.

# Descripción general

Fleetbase es un sistema operativo para la gestión de la logística y la cadena de suministro (LSOS) de código abierto
— una plataforma modular, basada en API, que proporciona a los operadores de logística y desarrolladores la infraestructura necesaria para implementar, ampliar y gestionar de forma independiente.

En esencia, la plataforma proporciona la base que todas las empresas de logística y transporte necesitan: gestión de organizaciones multi-inquilino, control de identidad y acceso, un bus de eventos en tiempo real, una API REST y una consola de desarrolladores para gestionar las integraciones. Sobre esta base opera la suite de TMS puro: Fleet-Ops para la gestión y despacho del transporte de carga, Ledger para la contabilidad financiera y facturación, Valhalla y VROOM para el cálculo de rutas y optimización vehicular, y Dev Engine para integraciones de desarrollador.

## ¿Para quién está diseñada la plataforma?

Está diseñada para dos tipos de personas que trabajan en colaboración:

**Operadores**
son las empresas de logística y transporte: transportistas, operadores de carga, plataformas de entrega, flotas dedicadas y cadenas de suministro empresariales. Necesitan una plataforma que se adapte a sus operaciones específicas, en lugar de forzar sus operaciones para que se ajusten al software.

**Desarrolladores**
son los ingenieros que construyen y mantienen los sistemas de logística. Necesitan una API estable y bien estructurada, un marco de interfaz de usuario extensible y la capacidad de añadir lógica personalizada sin tener que luchar contra la plataforma.

Ambos grupos obtienen lo mismo: acceso completo al código fuente, la capacidad de alojar la plataforma en cualquier infraestructura y una plataforma diseñada para ampliarse, en lugar de ser modificada.

## La consola

La consola es una interfaz de administración basada en la web, construida con
**Ember.js**. Es donde los operadores gestionan su organización a diario: despachando viajes, gestionando usuarios, configurando integraciones y monitoreando flotas.

La consola está diseñada para ser modular. Cada extensión registra sus propias rutas, páginas y enlaces en la barra lateral en tiempo de ejecución utilizando el
**Servicio Universe**
— el registro central de extensibilidad. Cuando se inician motores como Fleet-Ops y Ledger, aparecen sus interfaces completas de transporte y finanzas directamente en la consola sin necesidad de reiniciar.

La consola funciona como una única aplicación Ember, con cada extensión montada como un
**Motor Ember**
— una subaplicación aislada que comparte servicios centrales (autenticación, datos y notificaciones), pero mantiene sus propias rutas y componentes completamente separados.

## Módulos principales y motores

La plataforma incluye un conjunto de motores dedicados que conforman un TMS puro:

### Fleet-Ops — Gestión de flotas y sistema de gestión de transporte (TMS)

### Ledger — Motor de contabilidad, finanzas y facturación

### Valhalla y VROOM — Motor de cálculo y optimización de rutas

### Consola de desarrollador — Herramientas de API e integración

## El mercado de extensiones

Además de los módulos de primera parte, Fleetbase tiene un mercado de extensiones de la comunidad donde los desarrolladores pueden publicar y descubrir extensiones. Estas extensiones pueden añadir nuevos tipos de pedidos, integrar servicios de terceros (mapas, pagos, SMS), añadir informes personalizados o construir nuevos verticales sobre la plataforma Fleetbase.

Puede navegar e instalar extensiones directamente desde la consola de Fleetbase en la sección
**Extensiones → Navegar**
.

## Opciones de implementación

Fleetbase se puede ejecutar en cualquier lugar donde se pueda ejecutar Docker.

Fleetbase Cloud

Auto-alojado

En el sitio

La forma más rápida de empezar. Fleetbase Cloud es un despliegue gestionado, multi-inquilino, mantenido por el equipo de Fleetbase. Obtendrá:

* Acceso instantáneo: no es necesario configurar la infraestructura
* Actualizaciones y parches de seguridad automáticos
* Copias de seguridad y supervisión del tiempo de actividad gestionadas
* Todas las extensiones de primera parte disponibles

[Comience con la guía rápida de la nube →](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)

Implemente Fleetbase en su propia cuenta de nube (AWS, GCP, Azure, DigitalOcean) utilizando Docker Compose o Kubernetes. Obtendrá control total sobre:

* Dónde se almacenan sus datos
* Qué versión está ejecutando
* Qué extensiones están instaladas
* Decisiones de escalado de la infraestructura

[Implemente en la nube →](https://fleetbase.io/docs/platform/quickstart/deploy-in-cloud)

Ejecute Fleetbase en su propio hardware: en su centro de datos o en una infraestructura aislada. Los servicios necesarios son MySQL, Redis y almacenamiento de objetos compatible con S3. No se requiere conexión a Internet después de la configuración inicial.

[Ejecute localmente →](https://fleetbase.io/docs/platform/quickstart/running-locally)

## Próximos pasos

Comprenda el "por qué"

Descubra cómo Fleetbase se compara con la construcción desde cero o el uso de SaaS cerrado.

[Por qué Fleetbase →](https://fleetbase.io/docs/platform/getting-started/why-fleetbase)

Comprenda la arquitectura

Explore la pila tecnológica: backend, frontend, tiempo real y extensiones.

[Arquitectura →](https://fleetbase.io/docs/platform/getting-started/architecture)

Empiece ahora

Pase los detalles y obtenga Fleetbase funcionando en menos de 10 minutos.

[Guía rápida de la nube →](https://fleetbase.io/docs/platform/quickstart/cloud-quickstart)