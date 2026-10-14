---
title: "Traducciones"
url: https://fleetbase.io/docs/contributing/translations
module: contributing
---

Traducciones

# Traducciones

Ayude a traducir Fleetbase Console y extensiones a más idiomas: descripción general, qué traducir y cómo empezar.

# Traduciendo Fleetbase

Fleetbase viene con una infraestructura de traducción en la Console y en todas las extensiones. Los nuevos idiomas son aportados por traductores de la comunidad: operadores, conductores y desarrolladores que utilizan Fleetbase en su región y desean que esté disponible en su idioma.

Esta guía explica todo el proceso: cómo está estructurado el sistema, dónde se encuentran los archivos, cómo traducirlos correctamente y cómo enviar su trabajo.

## ¿Por qué son importantes las traducciones?

Fleetbase se utiliza en más de 40 países. La interfaz que ven los conductores, los despachadores o los trabajadores de almacén en un idioma que no entienden completamente se convierte en un obstáculo para su trabajo: entrenamiento más lento, más errores, menor adopción. Una traducción completa en un solo idioma puede determinar si Fleetbase es utilizable en un mercado.

Consideramos que las traducciones son contribuciones de primera categoría. Se reconocen a los traductores, se rastrea la cobertura lingüística públicamente y las solicitudes de traducción siguen el mismo proceso de revisión que el código.

## ¿Cómo están estructuradas las traducciones?

Fleetbase es modular. La Console (la aplicación principal) y cada extensión (Fleet-Ops, Ledger, IAM, etc.) tienen sus propios archivos de traducción. Para ofrecer una experiencia completa en un idioma, normalmente es necesario contribuir a varios repositorios, pero puede empezar con uno solo.

| Capa | ¿Qué cubre? | Repositorio |
|---|---|---|
| **Shell de la Console** | Navegación, configuración, cuenta, autenticación, interfaz de usuario compartida | `fleetbase/fleetbase` (ruta: `console/translations/`) |
| **Interfaces de las extensiones** | Las propias pantallas, formularios y paneles de control de cada extensión | Repositorios individuales de la extensión (ruta: `translations/`) |

La lista completa de repositorios con rutas se encuentra en
[Repositorios →](https://fleetbase.io/docs/contributing/translations/repositories)
.

## El idioma base

Cada archivo de traducción se basa en el inglés americano (`en-us.yaml`). Cuando añada un nuevo idioma, deberá:

1. Copiar
   `en-us.yaml`
2. Renombrar el archivo a su código de idioma (por ejemplo,
   `fr-fr.yaml`
   ,
   `es-mx.yaml`
   ,
   `zh-cn.yaml`
   )
3. Traducir los valores, dejando las claves sin modificar

Cuando se modifica `en-us.yaml` (se añaden nuevas claves), los archivos de idioma existentes quedan desactualizados. Actualizarlos (transferir las nuevas claves del inglés a su idioma) es tan valioso como añadir un nuevo idioma desde cero.

## ¿Qué hará, paso a paso?

### Configure su entorno

Cree una copia del repositorio relevante, clónelo localmente y encuentre los archivos de traducción. Consulte
[Configuración →](https://fleetbase.io/docs/contributing/translations/setup)
.

### Entienda el formato de archivo

Los archivos de traducción son YAML. Existen convenciones para los marcadores, la pluralización y lo que se debe traducir. Consulte
[Formato de archivo →](https://fleetbase.io/docs/contributing/translations/file-format)
.

### Traduce

Copie `en-us.yaml` a un nuevo archivo de idioma, o actualice un archivo de idioma existente para que coincida con las últimas claves en inglés.

### Consulte el glosario

Algunos términos no deben traducirse (nombres de marca, términos técnicos). Consulte
[Glosario →](https://fleetbase.io/docs/contributing/translations/glossary)
.

### Envíe una solicitud de extracción

Cree una solicitud de extracción siguiendo las convenciones en
[Envío →](https://fleetbase.io/docs/contributing/translations/submitting)
.

## Añadir un nuevo idioma frente a actualizar uno existente

| Objetivo | Pasos |
|---|---|
| **Añadir un nuevo idioma** | Copiar `en-us.yaml` → `<locale>.yaml`, traducir todos los valores, enviar |
| **Actualizar un idioma existente** | Comparar el archivo de idioma con `en-us.yaml`, transferir las claves nuevas/modificadas, enviar |
| **Corregir una traducción incorrecta** | Editar el valor en su lugar con la corrección, anotar la razón en la solicitud de extracción |

No tiene que traducir todo de una vez. Una actualización parcial con 200 nuevos valores traducidos es más útil que una solicitud de extracción vacía que nunca finaliza.

## Obtenga ayuda

* **¿Atascado con el significado de una clave?**
  Pregunte en
  `#translations`
  en
  [Discord](https://fleetbase.io/docs/community/discord)
  — el autor original o otro traductor puede aclararlo.
* **¿Hay desacuerdo sobre la redacción?**
  Cree una solicitud de extracción y discuta en ella. Las revisiones de traducción son conversaciones, no control.
* **¿Quiere coordinarse con otros traductores?**
  Discord tiene hilos de idioma donde los traductores se organizan por sí mismos.

¿Listo? Empiece con
[Configuración →](https://fleetbase.io/docs/contributing/translations/setup)
.