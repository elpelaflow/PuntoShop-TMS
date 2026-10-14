---
título: "Paneles y Widgets"
url: https://fleetbase.io/docs/platform/console-features/dashboards-and-widgets
módulo: plataforma
---

# Paneles y Widgets

Cree y personalice paneles con widgets arrastrándolos y soltándolos. Cada usuario puede mantener múltiples paneles por contexto de extensión.

# Paneles y Widgets

La pantalla de inicio de la consola de Fleetbase es un panel completamente personalizable. Arrastre, redimensione y organice los widgets para mostrar las métricas y las vistas más relevantes para su trabajo. Las extensiones registran sus propios tipos de widgets, y cada usuario puede crear y administrar múltiples paneles.

![Panel de inicio — cuadrícula de widgets GridStack con tarjetas de estado, gráficos y widgets de extensión](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard.a817083d.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## La cuadrícula del panel

El panel utiliza
**GridStack**
para el diseño. Los widgets se sitúan en una cuadrícula fluida y se pueden mover y redimensionar libremente arrastrándolos.

En
**modo de edición**, aparece un icono de papelera en cada widget, lo que le permite eliminarlo. Arrastre cualquier widget para moverlo. Arrastre el borde o la esquina del widget para redimensionarlo. Los cambios de posición y tamaño se guardan automáticamente.

## Cambiar de panel

Si ha creado varios paneles, aparece un
**selector de paneles**
en la parte superior del área del panel. Haga clic en cualquier nombre para cambiar al panel correspondiente.

Para volver al diseño compartido a nivel de instancia, seleccione
**Panel predeterminado**
— esto restablece el puntero de su panel activo a la configuración predeterminada del sistema.

![Selector de paneles — lista de paneles nombrados con la opción "Panel predeterminado"](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard-switch.828b5078.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

## Crear un panel

Haga clic en
**Nuevo panel**, introduzca un nombre y confirme. El nuevo panel se activa inmediatamente. Los paneles son por usuario — otros miembros de su organización gestionan los suyos de forma independiente.

## Eliminar un panel

Abra el panel que desea eliminar y haga clic en
**Eliminar**. Esto elimina el registro del panel y todas sus ubicaciones de widgets. El panel predeterminado no se puede eliminar.

## Agregar widgets

Haga clic en
**Agregar widget**
para abrir el panel de widgets. En un panel recién creado, el panel se abre automáticamente.

![Panel de widgets — superposición en el lado derecho con campo de búsqueda y lista de tarjetas de widgets deslizables](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconsole-dashboard-add-widgets.578add1a.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El panel de widgets es una superposición en el lado derecho que enumera todos los tipos de widgets registrados por las extensiones instaladas. Utilice el
**campo de búsqueda**
para filtrar por palabra clave. Haga clic en cualquier tarjeta de widget para agregarla al panel actual en una posición predeterminada.

Los widgets son proporcionados por las extensiones. La instalación de una nueva extensión hace que sus tipos de widgets estén disponibles en el panel inmediatamente.

## Paneles de extensión

Cada extensión tiene su propio contexto de panel de forma independiente del panel de inicio. Por ejemplo, la extensión Fleet-Ops tiene su propio registro de widgets y área de panel separada del panel de inicio principal. Navegue a una extensión para encontrar su propio panel o panel de resumen.

El panel de inicio se ejecuta bajo el contexto de extensión
`core`.

## Registrar widgets (desarrolladores)

Las extensiones registran los tipos de widgets al inicio a través del servicio Universe. Cada definición de widget proporciona una ruta de componente, nombre, descripción e icono. Los widgets registrados aparecen en el panel de widgets para todos los usuarios de la instancia.

Consulte
[Extender Fleetbase](https://fleetbase.io/docs/extending-fleetbase)
para obtener más detalles sobre cómo crear y registrar widgets personalizados.