---
title: "Reportar problemas"
url: https://fleetbase.io/docs/contributing/reporting-issues
module: contributing
---

# Reportar problemas

Cómo crear informes de errores y solicitudes de funciones efectivos para Fleetbase: qué incluir, dónde reportar y qué esperar después.

# Reportar problemas

Un buen informe de errores puede marcar la diferencia entre una solución en unos días y una solución en meses. Esta página explica cómo crear un buen informe, dónde reportarlo y qué esperar después.

## Informes de errores

### Antes de reportar

Primero, compruebe:

* **¿Es realmente un error?**
  Algunos comportamientos son intencionales. Revise la sección relevante de la documentación.
* **¿Ya se ha reportado?**
  Busque
  [en los problemas de GitHub](https://github.com/elpelaflow/PuntoShop-TMS/issues)
  problemas similares. Añada una reacción 👍 o un comentario con nueva información a los problemas existentes en lugar de crear duplicados.
* **¿Se reproduce en una versión reciente?**
  Los errores en versiones antiguas ya pueden estar solucionados.
* **¿Es específico de la implementación?**
  Los problemas de la implementación propia vs. Fleetbase Cloud tienen diferentes comportamientos.

### Dónde reportar

Los diferentes errores van a repos diferentes. Elija el que corresponda al componente afectado:

| Repositorio | Qué cubre | Reportar problema |
|---|---|---|
| [`elpelaflow/PuntoShop-TMS`](https://github.com/elpelaflow/PuntoShop-TMS) | Plataforma principal: API, Consola, IAM, Consola de desarrollador | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS/issues/new) |
| [`PuntoShop-TMS (Fleet-Ops)`](https://github.com/elpelaflow/PuntoShop-TMS) | Fleet-Ops: pedidos, conductores, flotas, asignación, mapa en vivo | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS/issues/new) |
| [`PuntoShop-TMS (Ledger)`](https://github.com/elpelaflow/PuntoShop-TMS) | Ledger: facturas, pagos, contabilidad | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS/issues/new) |
| [`Navigator App`](https://github.com/elpelaflow/PuntoShop-TMS) | Aplicación móvil para conductores de Navigator | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS/issues/new) |
| [`fleetbase/fleetbase-cli`](https://github.com/elpelaflow/PuntoShop-TMS-cli) | Herramienta CLI | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS-cli/issues/new) |
| [`fleetbase/fleetbase.io`](https://github.com/elpelaflow/PuntoShop-TMS.io) | Este sitio de documentación | [Abrir problema →](https://github.com/elpelaflow/PuntoShop-TMS.io/issues/new) |

Si no está seguro, reporte en
`elpelaflow/PuntoShop-TMS`
— los mantenedores lo moverán al repositorio correcto.

### Qué incluir

Copie este modelo en su problema:

```
## Resumen
Una frase que describe el problema.

## Comportamiento esperado
Qué se esperaba que sucediera.

## Comportamiento real
Qué sucedió realmente.

## Pasos para reproducir
1. Primer paso
2. Segundo paso
3. Tercer paso
4. El problema aparece

## Entorno
- Versión de Fleetbase: (ej. 1.4.2 — se encuentra a través de "Acerca de" en la Consola)
- Implementación: (Docker, Fleetbase Cloud, desarrollo local)
- Sistema operativo: (ej. macOS 14, Ubuntu 22.04)
- Navegador (si es relevante): (Chrome 121, Safari 17, etc.)
- Patrón de URL de la Consola: (ej. /fleet-ops/orders/order_xxx)

## Registros / errores
```
copie la salida relevante aquí```

## Capturas de pantalla / vídeo
(Adjunte si es útil)

## Contexto adicional
Cualquier otra cosa que pueda ayudar — cambios de configuración recientes, extensiones relacionadas, escala de datos, etc.
```

### Qué hace que un informe de errores sea bueno

* **Reproducible**
  — sus pasos funcionan en una instancia nueva
* **Mínimo**
  — el escenario más pequeño que desencadena el error
* **Específico**
  — mensajes de error exactos, URLs exactas, fechas y horas exactas
* **Tiene registros**
  —
  `docker compose logs`
  salida para el servicio correspondiente si está implementado de forma local
* **Sin ruido**
  — elimine secretos, información personal y registros irrelevantes

### Qué hace que un informe de errores sea malo

* "No funciona" sin más detalles
* "Los pedidos desaparecen a veces" sin una ruta de reproducción
* Una captura de pantalla de un mensaje de error sin contexto
* Una lista de 5 errores diferentes en un solo problema (reporte por separado)

## Solicitudes de funciones

Las solicitudes de funciones van a
[Discusiones de GitHub](https://github.com/elpelaflow/PuntoShop-TMS/discussions)
, no a Issues. Los Issues son para el trabajo confirmado; las Discusiones son para "¿Deberíamos?".

### Modelo

```
## Problema
¿Qué problema operativo está tratando de resolver? Sea específico: describa el flujo de trabajo, no la función deseada.

## Solución propuesta
Qué le gustaría que hiciera Fleetbase.

## Soluciones alternativas consideradas
Otras formas en que ha intentado resolver esto: soluciones alternativas, extensiones, herramientas externas.

## ¿Quién más necesita esto?
Si ha hablado con otros operadores o ha visto solicitudes similares, enlácelos.

## ¿Está dispuesto a contribuir?
[ ] Sí, me gustaría construir esto con la guía de los mantenedores
[ ] No, solo estoy enviando la solicitud
```

### Qué se prioriza

Los mantenedores priorizan las solicitudes en función de:

* **Dolor del operador**
  — cuántos operadores lo experimentan, con qué frecuencia, y qué tan grave es
* **Ajuste de la plataforma**
  — ¿pertenece al núcleo, a una extensión existente, o es una nueva extensión?
* **Costo de implementación**
  — las pequeñas victorias se implementan rápidamente; los grandes proyectos esperan un patrocinador
* **Alineación estratégica**
  — ¿qué está en el plan de lanzamiento

Las solicitudes que reciben
**soporte de mantenedores y comunidad**
típicamente se convierten en Issues con etiquetas
`aceptado`
y se toman. Las solicitudes que no encajan pueden ser redirigidas a "crear una extensión".

## Problemas de seguridad

**No reporte problemas de seguridad públicamente.**
En su lugar, envíe un correo electrónico a
**[security@fleetbase.io](mailto:security@fleetbase.io)**
con:

* Descripción de la vulnerabilidad
* Pasos para reproducir
* Versiones afectadas (si se conocen)
* Su nombre/handle para el crédito del anuncio de seguridad (opcional)

El equipo responde en 48 horas y sigue un proceso de divulgación coordinado. Consulte
[`SECURITY.md`](https://github.com/elpelaflow/PuntoShop-TMS/blob/main/SECURITY.md)
para obtener más detalles.

## Después de reportar

* **Triaje**
  : los mantenedores revisan los nuevos Issues regularmente. Normalmente, recibirá una respuesta en unos días hábiles.
* **Etiquetas**
  : los Issues se etiquetan por área (
  `fleet-ops`
  ,
  `console`
  ,
  `api`
  ), gravedad (
  `bug`
  ,
  `mejora`
  ) y estado (
  `aceptado`
  ,
  `necesita-información`
  ,
  `no-se-implementará`
  ).
* **Discusión**
  : los mantenedores pueden hacer preguntas de seguimiento. Respuestas más rápidas = solución más rápida.
* **Solución**
  : cuando se soluciona un Issue, se hace referencia al PR y se cierra en la fusión. La solución se incluye en la siguiente versión.
* **Versión**
  : consulte el
  [changelog](https://fleetbase.io/docs/community/changelog)
  para ver qué se ha lanzado.

## ¿Quiere solucionarlo usted mismo?

Si ha encontrado un error y quiere solucionarlo, comente en el Issue diciendo que lo está tomando — esto indica a los mantenedores y a otros colaboradores. Luego, siga
[Código →](https://fleetbase.io/docs/contributing/code)
.

Muchos de los mejores colaboradores comenzaron reportando un error y luego solucionándolo ellos mismos.