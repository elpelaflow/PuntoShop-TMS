---
título: "Cola"
url: https://fleetbase.io/docs/platform/system-setup/queue
módulo: plataforma
---

# Cola

Configure la cola de tareas en segundo plano que impulsa la entrega de webhooks, notificaciones, importaciones y procesamiento asíncrono en Fleetbase.

# Cola

Fleetbase utiliza el sistema de colas de Laravel para procesar tareas en segundo plano: entrega de webhooks, notificaciones push, importaciones masivas, generación de informes y tareas programadas. La configuración de la cola le permite cambiar el controlador de la cola y configurar sus detalles de conexión. Navegue a
**Administrador → Configuración del sistema → Cola**
para acceder a estas opciones.

![Configuración de la cola — Menú desplegable del controlador y campos de configuración de conexión](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-queue-settings.bf18192c.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

Para obtener orientación sobre el tamaño de los trabajadores, la escalabilidad de la cola y el monitoreo, consulte
[Dimensionamiento de la infraestructura](https://fleetbase.io/docs/platform/quickstart/infrastructure-sizing)
.

## Controlador

Seleccione el controlador de la cola en el
**Controlador**
menú desplegable. El formulario se actualiza para mostrar los campos requeridos para el controlador seleccionado.

| Controlador | Descripción |
|---|---|
| **sync** | Procesa las tareas inmediatamente en la misma solicitud: no se necesita ningún trabajador. Solo es adecuado para el desarrollo o para un tráfico muy bajo. |
| **database** | Almacena las tareas en la base de datos MySQL. Fácil de configurar, no se requiere infraestructura adicional. |
| **redis** | Almacena las tareas en Redis. Recomendado para producción: rápido, fiable y admite tiempos de espera de visibilidad de tareas. |
| **beanstalkd** | Utiliza un servidor [Beanstalkd](https://beanstalkd.github.io/). |
| **sqs** | Utiliza AWS Simple Queue Service. Adecuado para implementaciones de alto rendimiento o sin servidor en AWS. |

Redis es el controlador recomendado para la mayoría de las implementaciones de producción autohospedadas. El
`redis`
servicio en la pila Docker Compose predeterminada ya está configurado como la conexión de la cola.

### Beanstalkd

| Campo | Descripción |
|---|---|
| **Beanstalk Host** | Nombre de host o dirección IP de su servidor Beanstalkd |
| **Beanstalk Queue** | El nombre del "tubo" (cola) al que se enviarán las tareas (predeterminado: `default`) |

### SQS

| Campo | Descripción |
|---|---|
| **SQS Prefix** | URL de prefijo de su cola SQS, incluyendo el ID de la cuenta de AWS (por ejemplo, `https://sqs.us-east-1.amazonaws.com/123456789`) |
| **SQS Queue** | El nombre de la cola SQS |
| **SQS Suffix** | Sufijo opcional que se añade al nombre de la cola (útil para colas separadas por entorno) |

Las credenciales de AWS para SQS se comparten con la configuración de AWS en
[Servicios](https://fleetbase.io/docs/platform/system-setup/services)
. El usuario o rol de IAM debe tener los permisos
`sqs:SendMessage`,
`sqs:ReceiveMessage`
y
`sqs:DeleteMessage`
en la cola.

## Trabajadores de la cola

La configuración del controlador de la cola controla dónde se envían las tareas, pero debe estar en funcionamiento un proceso de trabajador para consumir y procesar esas tareas. En la pila Docker Compose, el contenedor
`queue`
ejecuta el trabajador automáticamente.

```
# Verificar el estado del trabajador
docker compose ps queue

# Ver los registros del trabajador
docker compose logs -f queue

# Reiniciar el trabajador después de cambiar el controlador
docker compose restart queue
```

Reinicie el contenedor del trabajador de la cola después de guardar un nuevo controlador para que pueda recoger la conexión actualizada.

## Pruebas

Haga clic en
**Configuración de prueba**
para enviar un mensaje de prueba a la cola utilizando el controlador actualmente configurado. Una respuesta exitosa confirma que el trabajador puede recibir mensajes de la cola seleccionada.

## Guardar

Haga clic en
**Guardar cambios**
para aplicar la configuración. La caché de la configuración se actualiza automáticamente. Reinicie el trabajador de la cola después de guardar para aplicar el nuevo controlador.