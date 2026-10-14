---
title: "Envío"
url: https://fleetbase.io/docs/contributing/translations/submitting
module: contributing
---

Traducciones

# Envío

Convenciones para las solicitudes de extracción, expectativas para los revisores y lo que ocurre después de enviar una traducción.

# Enviar tu traducción

Has traducido algunas claves. Es hora de publicarlas.

## Antes de abrir la solicitud de extracción

Realiza las siguientes comprobaciones:

* Las claves coinciden con `en-us.yaml`
* Se conservan los marcadores de posición
* No hay valores de cadena vacíos
* No hay nombres de marca traducidos (Fleetbase, Fleet-Ops, etc.)
* El archivo está en formato UTF-8

Si has instalado Fleetbase localmente, navega por las pantallas que has traducido y verifica que no haya desbordamientos, que no se altere el diseño o que no parezca incorrecto en el contexto.

## Convenciones para las solicitudes de extracción

Utiliza mensajes de solicitud de extracción claros para que los mantenedores y otros traductores puedan entender los cambios de un vistazo.

```
i18n(es-mx): traducir el módulo de pedidos
i18n(fr-fr): trasladar las nuevas claves de en-us
i18n(zh-cn): corregir la traducción de "despachado" → 已派遣
i18n: añadir traducciones en vietnamita (vi) para FleetOps
```

Patrón convencional:
`i18n(<idioma>): <qué>`
* Utiliza `i18n` (sin idioma) solo cuando el cambio afecte a múltiples idiomas.

## Abrir la solicitud de extracción

Envía tu rama y crea una solicitud de extracción contra la rama `main` del repositorio principal.

### Título de la solicitud de extracción

Asegúrate de que el título coincida con tu estilo de solicitud de extracción:

```
i18n(es-mx): traducir el módulo de pedidos
```

### Plantilla de descripción de la solicitud de extracción

Copia esto en el cuerpo de tu solicitud de extracción y rellena los campos:

```
## Idioma
es-mx (Español mexicano)

## Alcance
Traducir todas las claves del espacio de nombres `orders.*` en FleetOps.

## Diferencia de cobertura
Antes: ~40% de las claves traducidas
Después: ~78% de las claves traducidas

## Notas para los revisores
- "Despachar" → "Despachar" (coincide con el uso de la industria logística mexicana)
- Dejé algunas terminología técnica como "geofence" sin traducir — ver discusión sobre traducciones/glosario
- No he tocado la sección de gestión de conductores (solicitud de extracción separada)

## Probado localmente
- [x] Ejecutar la consola de Fleetbase con FLEETBASE_LOCALE=es-mx
- [x] Verificar que no haya desbordamiento de la interfaz de usuario en las listas y pantallas de detalles de pedidos
- [ ] No probado en dispositivos móviles
```

No es necesario que completes todos los campos, pero
**el idioma, el alcance y cualquier decisión**
deben estar siempre presentes.

## Lo que buscan los revisores

Las revisiones de traducción verifican:

1. **Corrección**
   — ¿Tiene el significado que tiene la versión en inglés?
2. **Consistencia del tono**
   — ¿Coincide con el resto del archivo de idioma? (Formal vs. informal, formas corteses, etc.)
3. **Conservación de los marcadores de posición**
   — Todos
   `{vars}`
   deben estar intactos y presentes
4. **Sin errores**
   — Las claves no deben renombrarse, la estructura no debe alterarse, los nombres de marca no deben traducirse
5. **Precisión técnica**
   — Se deben utilizar los términos de logística correctamente (
   `waybill`
   ,
   `dispatch`
   ,
   `dropoff`
   , etc.)

Si hay un hablante nativo del equipo o de la comunidad que pueda revisar, lo hará. Si no hay un hablante nativo disponible, los mantenedores fusionarán basándose en la corrección de los marcadores de posición y la estructura, y confiarán en tu juicio lingüístico.

## Expectativas de los revisores

* **Respuesta inicial**
  : normalmente dentro de unos días hábiles
* **Detalles menores**
  : se discutirán en la solicitud de extracción; tú decides cómo resolver
* **Problemas estructurales**
  : se solicitan como cambios (renombrar claves, falta de marcadores de posición, YAML roto) — deben corregirse antes de la fusión
* **Desacuerdo sobre la redacción**
  : se discutirá abiertamente. La traducción es un trabajo de juicio — rara vez hay una única respuesta correcta

## Después de la fusión

* Tu contribución se mencionará en el gráfico de contribuyentes del repositorio
* El
  `translations/<idioma>.yaml`
  estará disponible la próxima vez que se publique o reconstruya el paquete correspondiente
* Para instancias autoalojadas en la próxima versión
* Para Fleetbase Cloud, la próxima implementación después de la versión fusionada

## Errores comunes que impiden la fusión

| Problema | Solución |
|---|---|
| Renombrar una clave (traducir `new:` a `nouveau:`) | Restablecer la clave original, solo traducir el valor |
| Falta o renombrar `{placeholder}` | Restablecer el marcador de posición exactamente como en `en-us.yaml` |
| Traducir nombres de marca (Fleetbase → "Base de Flotte") | Mantener los nombres de marca en inglés |
| Mezclar idiomas en una única solicitud de extracción (por ejemplo, es + fr parcial) | Dividir en solicitudes de extracción separadas para cada idioma |
| Cambios no relacionados (formato, reordenamiento de claves) agrupados | Las solicitudes de extracción de traducción solo deben cambiar los valores |
| El archivo no está en formato UTF-8 | Guardar como UTF-8 (la mayoría de los editores tienen una opción "Guardar como codificación") |

## Actualizar una traducción existente

Para las solicitudes de extracción que actualizan una traducción ya fusionada, sigue el mismo flujo, pero en la descripción de la solicitud de extracción:

```
## Idioma
fr-fr (Francés)

## Tipo
Actualización — trasladar las nuevas claves de `en-us.yaml`

## Diferencia de cobertura
Antes: 65% (rev 4a8c1e2)
Después: 91% (actual)

## Notas
- Añadido todo el espacio de nombres `extensions.*` (nuevo desde la última actualización)
- Re-traducido 3 claves bajo `orders.status.*` para la consistencia de la terminología
- Una clave se ha dejado sin traducir — ver comentario en línea
```

## Si necesitas abandonar la solicitud de extracción a mitad de camino

No tienes que traducir todo el archivo de una vez. Si has traducido la mitad y quieres publicarlo, hazlo. Abre la solicitud de extracción con lo que tienes, marca las secciones incompletas en la descripción y alguien más (o tú, más tarde) puede continuar.

Los valores vacíos no son aceptables, pero
**dejar las claves sin traducir está bien**
— la aplicación volverá al inglés.

## Reconocimiento

Cada solicitud de extracción de traducción fusionada se menciona en:

* El gráfico de contribuyentes del repositorio en GitHub
* Las notas de lanzamiento de la versión en la que se incluye
* El changelog de la comunidad cuando se introducen nuevos idiomas

Gracias por tu contribución.