---
título: "Dimensionamiento de la infraestructura"
url: https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing
módulo: plataforma
---

Plataforma

Inicio rápido

# Dimensionamiento de la infraestructura

Arquitectura de referencia, supuestos de dimensionamiento y lista de materiales de producción para implementaciones de Fleetbase auto-gestionadas y en las instalaciones.

# Dimensionamiento de la infraestructura

Esta guía proporciona a los equipos de infraestructura una base práctica para planificar implementaciones de Fleetbase auto-gestionadas, en la nube privada o en las instalaciones. Utilice estos números como guía de planificación, no como un punto de referencia fijo. El dimensionamiento final depende de los vehículos y dispositivos activos, los conductores activos, el volumen de pedidos, la frecuencia de la telemetría, los usuarios concurrentes, las extensiones personalizadas, los medios cargados, el tráfico de integración y la política de retención.

Fleetbase no requiere recursos de GPU para la plataforma principal. La capacidad de GPU solo es relevante si ejecuta cargas de trabajo separadas de IA, visión artificial, optimización de rutas o análisis fuera del stack de aplicaciones Fleetbase estándar.

## Arquitectura de referencia

Las implementaciones de producción de Fleetbase se construyen a partir de estos servicios principales:

| Componente | Propósito | Notas de producción |
|---|---|---|
| API de Fleetbase | Backend de Laravel/Octane, API REST, APIs internas, webhooks, informes y paquetes de servidor de extensiones | Ejecutar como contenedores escalables horizontalmente detrás de un enrutador o balanceador de carga |
| Consola de Fleetbase | Consola web Ember.js y motores de extensiones | Servir como activos estáticos a través del contenedor de la consola, CDN o proxy inverso |
| MySQL 8 | Base de datos transaccional principal | Utilizar MySQL gestionado o un clúster MySQL HA con copias de seguridad automáticas y recuperación en tiempo real |
| Redis | Caché, sesiones y backend de cola | Utilizar Redis gestionado o un despliegue de Redis HA con persistencia cuando sea compatible |
| Trabajadores de cola | Procesamiento asíncrono para webhooks, importaciones, informes, notificaciones y trabajos programados | Escalar de forma independiente de las réplicas de la API en función de la profundidad de la cola y la latencia de las tareas |
| Programador | Tareas programadas de Laravel y trabajos de mantenimiento | Ejecutar un programador activo por entorno |
| SocketCluster | Servidor WebSocket para mapas en vivo, actualizaciones de estado, chat y eventos de consola en tiempo real | Exponer a través de un enrutador WebSocket consciente con orígenes restringidos |
| Almacenamiento de objetos | Documentos, medios, prueba de entrega, importaciones, exportaciones y copias de seguridad | Utilizar almacenamiento compatible con S3, GCS, Azure Blob a través de un gateway S3, MinIO o equivalente |
| Servicios externos | Mapas, geocodificación, enrutamiento, SMS, correo electrónico, notificaciones push, supervisión de errores | Permitir solo los puntos finales de salida requeridos por las funciones habilitadas |

La pila Docker predeterminada es adecuada para el desarrollo, las pruebas, la evaluación y las pequeñas implementaciones auto-gestionadas. Para la producción empresarial, utilice Kubernetes o un orquestador equivalente para que la API, los trabajadores de cola, la capa WebSocket y los servicios de respaldo puedan escalarse y actualizarse de forma independiente.

## Niveles de entorno

| Entorno | Propósito base | Dimensionamiento mínimo | Dimensionamiento recomendado |
|---|---|---|---|
| Desarrollo | Pruebas locales del desarrollador y trabajo de extensiones | 4 núcleos de CPU, 8 GB de RAM, 40 GB SSD en una estación de trabajo o VM | 6-8 núcleos de CPU, 16 GB de RAM, 80 GB SSD |
| Pruebas | QA, pruebas automatizadas, datos de demostración, validación de integración | 2 vCPU, 4 GB de RAM, 60 GB SSD | 4 vCPU, 8 GB de RAM, 100 GB SSD |
| Staging | Validación de lanzamiento y UAT del cliente | 4 vCPU, 8 GB de RAM, 150 GB SSD más MySQL/Redis/almacenamiento de objetos externo | 2 réplicas de API, MySQL/Redis externo, 250 GB de almacenamiento, DNS/TLS de producción |
| Producción mínima | Pequeña implementación de producción o piloto | 1 host de Docker con 4 vCPU, 16 GB de RAM, 200 GB de SSD, copias de seguridad externas | 2 hosts de aplicación o pequeño clúster de Kubernetes, MySQL/Redis gestionado, almacenamiento de objetos |
| Producción empresarial | Despliegue HA para grandes flotas y operaciones reguladas | Despliegue HA de Kubernetes con MySQL/Redis externo, almacenamiento de objetos, registro, supervisión, copias de seguridad | Kubernetes HA dimensionado para la carga de trabajo, servicios de respaldo multi-AZ, pruebas de manuales de DR |

Para la producción, evite ejecutar las bases de datos, Redis, los contenedores de la aplicación, el almacenamiento de archivos y las copias de seguridad en el mismo VM a menos que la implementación sea un pequeño piloto con un riesgo de tiempo de inactividad aceptable.

## Dimensionamiento de conductores

Las implementaciones de Fleetbase deben dimensionarse en función de la forma de la carga de trabajo, no de una única métrica principal. El número de vehículos es importante, pero es solo una de las entradas. Una flota con una telemetría y un volumen de pedidos moderados puede necesitar menos infraestructura que una operación más pequeña con una telemetría densa, importaciones pesadas, muchos conductores o requisitos de retención largos.

| Conductor | Por qué es importante | Entrada de planificación para recopilar |
|---|---|---|
| Vehículos y dispositivos activos | Impulsa la ingestión de telemetría/eventos, la actividad del mapa en vivo y el almacenamiento de historial de dispositivos | Vehículos registrados, vehículos activos por turno, dispositivos por vehículo, tamaño del payload del proveedor |
| Conductores activos | Impulsa las sesiones de móvil/API, las actualizaciones de ubicación, las notificaciones y la actividad de despacho | Conductores concurrentes, patrones de turnos, uso de la aplicación Navigator, volumen de notificaciones |
| Pedidos por día | Impulsa las escrituras de API, la actividad del flujo de trabajo, los datos de ruta, los registros de prueba y las actualizaciones para los clientes | Volumen de pedidos medio y máximo, frecuencia de cambios de estado, requisitos de prueba de entrega |
| Intervalo y tamaño del payload de la telemetría | Impulsa la carga de trabajo de series temporales más voluminosa en muchas implementaciones | Intervalo de actualización, tamaño del payload medio, comportamiento de pico, retención de historial crudo |
| Usuarios concurrentes de la consola/API | Impulsa la concurrencia de la API, la carga de consulta, las suscripciones en tiempo real y las sesiones de navegador | Despachadores, administradores, usuarios de soporte, operadores, clientes de API |
| Tráfico de webhooks e integración | Impulsa el rendimiento de la cola, los reintentos, la carga HTTP de salida y los registros | Puntos finales de webhooks, política de reintento, SLAs de terceros, tamaños de lote de integración |
| Medios y documentos cargados | Impulsa el almacenamiento de objetos, las necesidades de CDN, el escaneo de malware, el tamaño de la copia de seguridad y las reglas de ciclo de vida | Fotos de prueba, documentos de conductor, importaciones, exportaciones, archivos adjuntos, tamaño medio de archivo |
| Política de retención y copia de seguridad | Impulsa el tamaño de la base de datos, el almacenamiento de objetos, el almacenamiento de registros, el almacenamiento de copias de seguridad y el tiempo de recuperación | Retención de calor, retención de archivo, RTO, RPO, requisitos de cumplimiento |

Utilice estos perfiles de carga como punto de partida, luego ajuste cada nivel utilizando las fórmulas anteriores.

| Perfil | Forma típica | Postura de infraestructura |
|---|---|---|
| Piloto / pequeña producción | Usuarios y pedidos limitados, volumen de pedidos moderado, baja a moderada telemetría, retención corta | Despliegue de Docker o pequeño clúster de Kubernetes con MySQL/Redis gestionado preferido |
| Producción en crecimiento | Múltiples equipos, uso diario, integraciones, importaciones/exportaciones regulares, telemetría en expansión | Kubernetes o orquestador equivalente, trabajadores separados, MySQL/Redis externo, almacenamiento de objetos |
| Producción grande / empresarial | Alto uso concurrente, telemetría densa, alto volumen de pedidos, SLAs estrictos, larga retención, muchas integraciones | HA de Kubernetes, API/trabajadores/capa WebSocket escalables horizontalmente, base de datos/caché HA, supervisión, DR runbooks |

## Arquitectura de Kubernetes recomendada

Utilice Kubernetes para entornos de producción que requieran alta disponibilidad, actualizaciones en vivo, aislamiento operativo e itinerarios de escalado claros.

```
diagram
    users[Usuarios: Consola y clientes de API] --> dns[DNS y TLS]
    dns --> ingress[Ingres/Balanceador de carga]
    ingress --> console[Fleetbase Console]
    ingress --> api[Réplicas de Fleetbase API]
    ingress --> socket[Réplicas de SocketCluster]
    api --> mysql[MySQL 8 HA]
    api --> redis[Redis HA]
    api --> object[Almacenamiento de objetos]
    api --> queue[Trabajadores de cola]
    scheduler[Programador] --> redis
    scheduler --> mysql
    queue --> mysql
    queue --> redis
    queue --> object
    api --> external[Mapas, enrutamiento, correo electrónico, SMS, Sentry]
```

Características de producción recomendadas:

* Utilice al menos tres nodos de trabajador de Kubernetes o un controlador de Kubernetes gestionado con tres o más trabajadores.
* Ejecute dos o más réplicas de la API y escale horizontalmente en función de CPU, memoria, latencia de la solicitud y presión de la cola.
* Ejecute los trabajadores de cola de forma independiente de las réplicas de la API para que las importaciones, los webhooks, los informes, las notificaciones y los trabajos programados no consuman la capacidad de la API.
* Ejecute un solo programador con un líder de elección o controles operativos que eviten tareas programadas duplicadas.
* Ejecute SocketCluster detrás de un enrutador WebSocket consciente. Si se utilizan varias réplicas, valide el enrutamiento pegajoso y el comportamiento de difusión de eventos para su balanceador de carga.
* Mantenga MySQL, Redis y los contenedores de la aplicación fuera de los pods de aplicación efímeros.
* Utilice subredes privadas para la base de datos, Redis y los servicios internos; exponga solo HTTPS y puntos finales de WebSocket aprobados públicamente.

## Lista de materiales

### Producción mínima

Utilícelo para pilotos, flotas pequeñas e implementaciones auto-gestionadas donde las ventanas de mantenimiento cortas son aceptables.

| Ítem | Cantidad | Especificación recomendada |
|---|---|---|
| Host o nodo de aplicación | 1-2 | 4-8 núcleos de CPU, 16-32 GB de RAM, 100+ GB SSD |
| API de Fleetbase | 1-2 réplicas | 1-2 núcleos de CPU y 2-4 GB de RAM por réplica |
| Trabajador de cola | 1 réplica | 1 núcleo de CPU y 1-2 GB de RAM |
| Programador | 1 réplica | 0.5-1 núcleo de CPU y 512 MB-1 GB de RAM |
| SocketCluster | 1 rélica | 1 núcleo de CPU y 1-2 GB de RAM |
| MySQL 8 | 1 principal | 4 núcleos de CPU, 16 GB de RAM, 200+ GB SSD con copias de seguridad automáticas |
| Redis | 1 instancia | 1-2 núcleos de CPU, 2-4 GB de RAM |
| Almacenamiento de objetos | 1 buzón o volumen | 100 GB de asignación inicial, política de ciclo de vida habilitada |
| Balanceador de carga / proxy inverso | 1 | Terminación HTTPS, soporte WebSocket |
| Almacenamiento de copia de seguridad | 1 objetivo | 30+ días de retención de la base de datos más política de copia de seguridad de archivos |

### Lista de materiales de referencia para la producción

Utilícelo como punto de partida para operaciones de alto volumen con muchos vehículos/dispositivos activos, conductores, pedidos, integraciones, usuarios en tiempo real y requisitos de retención largos. Aumente o disminuya cada componente en función de los impulsores de dimensionamiento anteriores.

| Artículo | Cantidad | Especificación recomendada |
|---|---|---|
| Nodos de trabajo de Kubernetes | 3-5 | 8-16 vCPU, 32-64 GB de RAM por nodo, escalado automático habilitado cuando esté disponible |
| API de Fleetbase | 3-6 réplicas | 2 vCPU y 4-8 GB de RAM por réplica |
| Consola de Fleetbase | 2 réplicas o alojamiento estático | 0,5-1 vCPU y 512 MB-1 GB de RAM por réplica |
| Trabajadores de cola | 3-8 réplicas | 1-2 vCPU y 2-4 GB de RAM por réplica |
| Programador | 1 réplica activa | 1 vCPU y 1 GB de RAM |
| SocketCluster | 2-4 réplicas | 2 vCPU y 4 GB de RAM por réplica, enrutamiento "sticky"/WebSocket validado |
| MySQL 8 HA | 1 primaria más 1-2 réplicas | 16-32 vCPU, 64-128 GB de RAM, 2-6 TB de SSD provisionados para comenzar |
| Redis HA | 3 nodos o nivel de HA gestionado | 4-8 vCPU totales, 16-32 GB de RAM totales |
| Almacenamiento de objetos | 1 contenedor replicado | 1-3 TB de asignación inicial para archivos, exportaciones, medios de prueba y copias de seguridad |
| Conjunto de observabilidad | 1 implementación de producción | Métricas, registros, trazas/errores, paneles, alertas y retención a largo plazo |
| Almacenamiento de copias de seguridad | 1 objetivo aislado | PITR de base de datos, instantáneas diarias, versionado de almacenamiento de objetos, probado para restauración |
| Balanceador de carga / entrada | 2+ zonas o servicio gestionado | Soporte para HTTPS, actualización de WebSocket, comprobaciones de estado, WAF opcional |
| Registro privado | 1 | Imágenes de Fleetbase y cualquier imagen de extensión específica del cliente |

## Fórmulas de dimensionamiento

Utilice estas fórmulas para refinar la lista de materiales una vez que el cliente proporcione datos de uso.

### Telemetría y eventos de dispositivos

```
eventos_por_día = vehículos_activos * (86400 / intervalo_de_telemetría_segundos)
almacenamiento_bruto_por_día = eventos_por_día * tamaño_promedio_de_evento_bytes
almacenamiento_de_base_de_datos = almacenamiento_bruto_por_día * días_de_retención * factor_de_índice_y_sobrecarga
```

Para la planificación, utilice un factor de índice y sobrecarga de
`2.5`
a
`4.0`
para cargas JSON, índices espaciales, índices secundarios, metadatos de fila y sobrecarga de eliminación suave.

Ejemplos ilustrativos de telemetría:

| Vehículos/dispositivos activos | Intervalo de telemetría | Eventos por día | Eventos por año |
|---|---|---|---|
| 250 | 60 segundos | 360.000 | 131,4 millones |
| 1.000 | 30 segundos | 2,88 millones | 1.05 mil millones |
| 5.000 | 30 segundos | 14,4 millones | 5,26 mil millones |
| 10.000 | 15 segundos | 57,6 millones | 21,02 mil millones |

Sensibilidad al almacenamiento: cada byte adicional almacenado por evento añade aproximadamente 183 GB/año por 1 millón de eventos/día antes de la sobrecarga del índice. Aplique el factor de índice y sobrecarga anterior para estimar la asignación de la base de datos.

Si se requiere mantener la telemetría de alta fidelidad durante 12 meses, considere la partición, las tablas de archivo o mover el historial de telemetría original a un almacenamiento analítico dedicado, manteniendo el estado operativo reciente en MySQL.

### Órdenes y datos de flujo de trabajo

```
almacenamiento_de_órdenes = órdenes_por_día * tamaño_promedio_de_registro_de_órdenes * días_de_retención * factor_de_sobrecarga
```

Los datos de las órdenes suelen crecer más lentamente que la telemetría, pero los campos personalizados, los registros de actividad, los datos de ruta, los registros de prueba, los payloads de integración pueden aumentar significativamente el almacenamiento por orden.

### Archivos, documentos y medios

```
almacenamiento_de_archivos = cargas_por_día * tamaño_promedio_archivo * días_de_retención
almacenamiento_de_copias_de_seguridad = almacenamiento_de_archivos * multiplicador_de_versión_o_copia_de_seguridad
```

Las fotos de prueba de entrega, los documentos del conductor, los archivos de importación, las exportaciones, los PDF de facturas y los archivos adjuntos deben almacenarse en el almacenamiento de objetos, no en el almacenamiento de contenedor local. Utilice reglas de ciclo de vida para el archivo y la eliminación.

### Registros y copias de seguridad

```
almacenamiento_de_registros = volumen_diario_de_registros * días_de_retención_de_registros
almacenamiento_de_copias_de_seguridad = tamaño_de_la_base_de_datos * factor_de_retención_de_copias_de_seguridad + delta_de_almacenamiento_de_objetos
```

Las implementaciones de producción deben mantener los registros de la aplicación de forma centralizada, almacenar las copias de seguridad de la base de datos por separado del clúster de la base de datos y probar periódicamente los procedimientos de restauración.

## Requisitos de red

| Flujo | Protocolo / puerto | Notas |
|---|---|---|
| Usuarios a consola/API | HTTPS 443 | Entrada pública o privada, TLS requerido |
| Navegador a SocketCluster | WSS 443 | Se requiere soporte para la actualización de WebSocket |
| Administración SSH / bastion | SSH 22 o estándar corporativo | Restringir mediante VPN, bastion o flujo de acceso privilegiado |
| API a MySQL | TCP 3306 | Solo red privada |
| API / trabajadores a Redis | TCP 6379 | Solo red privada |
| API / trabajadores a almacenamiento de objetos | HTTPS 443 | S3 compatible o punto final del proveedor de la nube |
| API / trabajadores a correo/SMS/mapas/rutas | HTTPS 443 | Requerido solo para integraciones habilitadas |
| Agentes de monitoreo a backend de observabilidad | HTTPS o específico del proveedor | Siga los requisitos de su plataforma de monitoreo |

El DNS de producción debe proporcionar nombres de host separados para la consola y la API, o un nombre de host con rutas explícitas. Los certificados pueden provenir de una CA pública, una CA corporativa o una PKI privada, dependiendo del nivel de exposición de la red y de la política del cliente.

## Almacenamiento, retención y copias de seguridad

| Clase de datos | Ubicación predeterminada | Recomendación |
|---|---|---|
| Datos operativos | MySQL | MySQL de alta disponibilidad, copias de seguridad automatizadas, recuperación de punto en el tiempo, pruebas periódicas de restauración |
| Caché y colas | Redis | Redis de alta disponibilidad para producción, alarmas de memoria, política de expulsión revisada |
| Cargas y documentos | Almacenamiento de objetos | Contenedor S3 compatible, encriptación, reglas de ciclo de vida, versionado cuando sea necesario |
| Historial de telemetría | MySQL por defecto | Defina la retención antes del lanzamiento; archive el historial de alta volumetria si se requieren más de 12 meses |
| Registros de la aplicación | Registros del contenedor y backend de registro centralizado | Centralice los registros con retención de calor de 30-90 días, retención más larga si es necesario |
| Copias de seguridad | Contenedor de copia de seguridad o servicio de copia de seguridad gestionado | Instantáneas diarias más PITR para producción; aísle las credenciales |

Objetivos de producción sugeridos:

| Objetivo | Baseline recomendado |
|---|---|
| RPO | 15 minutos a 1 hora para producción empresarial, dependiendo de la capacidad de PITR de MySQL |
| RTO | 4 horas para producción de HA estándar; objetivos más cortos requieren un standby caliente y fallover ensayado |
| Retención de copia de seguridad | Mínimo 30 días, más largo para entornos regulados |
| Pruebas de restauración | Al menos trimestralmente y antes de las actualizaciones importantes |

## Seguridad y Operaciones

Los entornos de producción deben incluir:

* TLS en todas partes para el tráfico del navegador, la API y WebSocket.
* Red privada para puntos finales de MySQL, Redis, almacenamiento de objetos y tráfico interno.
* Secretos de Kubernetes, secretos sellados, gestor de secretos en la nube o equivalente para credenciales.
* Credenciales y rotación de claves por entorno para usuarios de la base de datos, almacenamiento de objetos, correo, SMS, mapas, registro y acceso al registro.
* RBAC para Kubernetes, cuentas de la nube, usuarios de Fleetbase y administración de extensiones.
* SSO o integración de identidad corporativa cuando sea necesario según el modelo de seguridad del cliente.
* Encriptación en reposo para volúmenes de la base de datos, almacenamiento de objetos, copias de seguridad y archivos de registro.
* Escaneo de vulnerabilidades para imágenes de contenedor, paquetes de host, dependencias y extensiones específicas del cliente.
* Escaneo antivirus o de malware para archivos cargados si es necesario según la política.
* WAF, limitación de velocidad, listas de acceso IP o VPN/acceso privado para implementaciones de administración.

Supervise y alerte sobre:

* Latencia, tasa de error, memoria, CPU y estado de réplica de la API.
* Profundidad de la cola, tasa de fallo de las tareas y la edad de la tarea pendiente más antigua.
* Salud del programador y tareas programadas perdidas.
* Número de conexiones de SocketCluster, fallos de publicación y orígenes rechazados.
* CPU, memoria, almacenamiento, retraso de replicación, bloqueos y uso de conexiones de MySQL.
* Memoria, expulsiones, uso de conexiones y latencia de comandos de Redis.
* Errores de almacenamiento de objetos, finalización de copia de seguridad, edad de copia de seguridad y estado de prueba de restauración.
* Expiración de certificados, estado del DNS, errores de entrada y fallos de integración externos.

## Referencias comerciales y de licencia

El dimensionamiento de la infraestructura es independiente de las licencias comerciales. Para los términos comerciales actuales, utilice las páginas del sitio web como fuente de verdad:

| Tema | Referencia |
|---|---|
| Precios para la implementación y el soporte autoalojados | [Precios](https://fleetbase.io/pricing) |
| Servicio de instalación | [Servicio de instalación](https://fleetbase.io/services/installation) |
| Visión general de las licencias AGPL y comerciales | [Licencias](https://fleetbase.io/docs/community/licensing) |
| Licencias OEM, SaaS, blancas y comerciales | [Licencia comercial](https://fleetbase.io/licensing/commercial) |
| Planes de soporte y lenguaje de SLA | [Planes de soporte](https://fleetbase.io/docs/community/support-plans) |
| Términos de servicio | [Términos de servicio](https://fleetbase.io/terms) |

Utilice la licencia AGPL-3.0 para la auto-instalación de código abierto, a menos que la implementación requiera modificaciones propietarias, distribución sin liberar modificaciones, derechos OEM/etiquetado, o términos de licencia comercial negociados con Fleetbase.

## Entradas de dimensionamiento necesarias

Antes de finalizar la infraestructura, recopile:

* Número de vehículos activos y número total de vehículos registrados.
* Número de conductores activos y patrones de turnos de conductores.
* Intervalo de telemetría, tamaño promedio de la carga útil y número esperado de dispositivos conectados.
* Requisitos de retención para telemetría, órdenes, registros, archivos y copias de seguridad.
* Volumen diario y pico de órdenes, transacciones de API, importaciones, exportaciones y payloads de webhook.
* Número de usuarios concurrentes de la consola, los despachadores, los conductores y operadores.
* Volumen promedio y pico de medios cargados.
* RTO, RPO, ventanas de mantenimiento y objetivos de recuperación ante desastres deseados.
* Preferencia de alojamiento: bare metal, VMware, nube privada, AWS, Azure, GCP u otra distribución de Kubernetes.
* Requisitos de proveedor de identidad, SSO, modelo de acceso privilegiado y requisitos de auditoría.
* Límites de conectividad externa para mapas, rutas, SMS, correo electrónico, notificaciones push, acceso a registros y registro.