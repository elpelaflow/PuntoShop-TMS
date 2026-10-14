---
title: "Extensiones"
url: https://fleetbase.io/docs/contributing/extensions
module: contributing
---

# Extensiones

Cómo crear, publicar y contribuir extensiones para el Marketplace de Fleetbase.

# Contribuciones de extensiones

La forma más importante de contribuir a Fleetbase es crear una
**extensión**
— un módulo empaquetado que otros operadores pueden instalar desde el marketplace.

Las extensiones pueden:

* Añadir un nuevo módulo a la Consola (pantallas, configuraciones, paneles)
* Integrarse con un servicio de terceros (mapas, pagos, telemetría, ERPs)
* Añadir nuevos tipos de pedidos, flujos de trabajo o lógica empresarial
* Proporcionar funcionalidades específicas de la industria (entrega médica, transporte de contenedores, camiones de comida)

Las extensiones son completas — un paquete backend de Laravel y un motor frontend de Ember.js — registradas a través del sistema de extensiones de Fleetbase.

## ¿Por dónde empezar?

Esta página es una visión general del flujo de contribución. La guía completa para desarrolladores para crear extensiones se encuentra en su propia sección:

Lea esa sección primero si nunca ha creado una extensión. Las notas a continuación cubren
**la contribución**
— llevar su extensión al ecosistema más amplio de Fleetbase.

## Dos tipos de contribuciones de extensiones

### 1. Publique su propia extensión

Cree una extensión para resolver su propia necesidad operativa. Luego, publíquela en el marketplace. Otros operadores la instalarán.

Mantendrá la propiedad y el control:

* Puede establecer el precio (o hacerla gratuita)
* Puede encargarse del soporte
* Puede decidir cuándo actualizar
* Puede mantener todos los ingresos (menos las tarifas del marketplace)

El marketplace se encargará de la distribución, la licencia y la infraestructura de pago en su nombre.

Consulte
[Crear extensiones](https://fleetbase.io/docs/extension-development)
para el flujo del desarrollador, y el
[Panel de desarrolladores del marketplace](https://console.fleetbase.io)
para la publicación.

### 2. Contribuir a una extensión publicada por Fleetbase

Las extensiones de primera parte (Fleet-Ops, Ledger, IAM) son de código abierto y aceptan contribuciones de la comunidad. Puede:

* Corregir errores en la extensión
* Añadir funciones que se ajusten al alcance de la extensión
* Mejorar la documentación de la extensión
* Traducir la extensión a su idioma

Estas siguen el mismo flujo que las contribuciones de código. Consulte
[Código →](https://fleetbase.io/docs/contributing/code)
para las convenciones de PR, y el repositorio correspondiente de la extensión:

* `fleetops`
* `ledger`
* `iam-engine`

## ¿Qué hace que una extensión sea buena?

Ya sea que esté publicando la suya propia o contribuyendo a una publicada por Fleetbase:

* **Resuelve un problema real**
  — diseñada para el flujo de trabajo real de un operador, no para uno hipotético
* **Tiene un alcance limitado**
  — hace una cosa bien; no intenta reemplazar una extensión separada
* **Es estable**
  — no falla en casos extremos, maneja los estados offline/sin autenticación con elegancia
* **Está documentada**
  — tiene instrucciones de configuración claras, capturas de pantalla y un caso de uso de ejemplo
* **Está localizada**
  — admite múltiples idiomas (o al menos deja la puerta abierta a las traducciones)
* **Está probada**
  — tiene pruebas automatizadas para los caminos críticos

## ¿Dónde obtener ayuda?

* **¿Está creando su primera extensión?**
  Comience en
  `#extension-development`
  en
  [Discord](https://fleetbase.io/docs/community/discord)
* **¿Preguntas sobre herramientas de paquetes o CLI?**
  Consulte los problemas en
  [`fleetbase/fleetbase-cli`](https://github.com/elpelaflow/PuntoShop-TMS-cli)
* **¿Específicas para una extensión de primera parte?**
  Cree un problema en el repositorio de esa extensión

## ¿Qué necesitará?

Antes de comenzar a crear cualquier cosa que pueda ser publicada:

* Una
  **cuenta de desarrollador**
  en el Marketplace de Fleetbase (
  [regístrese](https://console.fleetbase.io/onboard)
  )
* La
  **CLI de Fleetbase**
  instalada:
  `npm install -g @fleetbase/cli`
* Una
  **instancia local de Fleetbase**
  para el desarrollo (consulte
  [Configuración del sistema](https://fleetbase.io/docs/platform/system-setup)
  )
* **Stripe Connect**
  si planea cobrar por la extensión

Continúe con
[Desarrollo de extensiones](https://fleetbase.io/docs/extension-development)
para la guía completa para desarrolladores.