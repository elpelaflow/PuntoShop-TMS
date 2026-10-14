---
título: "Inicio de sesión con OAuth"
url: https://fleetbase.io/docs/platform/system-setup/oauth-sign-in
módulo: plataforma
---

# Inicio de sesión con OAuth

Permita que las personas inicien sesión en el panel de Fleetbase con Google, Microsoft, GitHub o Apple, y configure cada proveedor desde la configuración de administrador.

# Inicio de sesión con OAuth

El inicio de sesión con OAuth permite que las personas inicien sesión en el panel con una cuenta que ya tienen en Google, Microsoft, GitHub o Apple, en lugar de una contraseña de Fleetbase. Los administradores eligen qué proveedores ofrecer, y cada uno se verifica con el proveedor antes de poder activarse. Navegue a
**Administrador → Configuración de autenticación → Inicio de sesión con OAuth**
para configurarlo.

Requisitos:
* Fleetbase
`0.7.64`
o posterior. Esta página cubre el inicio de sesión en
**el panel**
para su equipo.

## ¿Cómo funciona?

El inicio de sesión utiliza el flujo de código de autorización OAuth 2.0 con PKCE, que se ejecuta completamente en el servidor:

1. La persona hace clic en
   **Continuar con Google**
   (o en otro proveedor) en la página de inicio de sesión.
2. La API la envía al proveedor, que devuelve la información de vuelta a la URL de devolución de llamada de Fleetbase.
3. La API intercambia el código por el perfil de la persona, y luego le proporciona al panel de control un código único que se utiliza inmediatamente.

Hay algunas propiedades que vale la pena conocer antes de configurar nada:

* **Una cuenta solo se encuentra a través de una identidad de proveedor vinculada, nunca solo con una dirección de correo electrónico.**
  Cuando alguien usa un proveedor por primera vez, o bien lo vincula a una cuenta existente, o bien crea una nueva.
* **Los tokens de acceso y de actualización del proveedor nunca se almacenan.**
  Fleetbase lee el perfil una vez y descarta los tokens.
* **Las claves secretas y las claves de firma de Apple se almacenan encriptadas**
  y nunca se envían de vuelta al navegador.
* **La autenticación de dos factores sigue siendo válida.**
  Si un usuario tiene habilitada la autenticación de dos factores, se le solicita un código después de que el proveedor le haya devuelto la información.

## Configuración general

![Configuración de inicio de sesión con OAuth — los tres interruptores de inicio de sesión con OAuth, luego los paneles de proveedores de Google, Microsoft, GitHub y Apple que se pueden colapsar](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadmin-oauth-settings.dae64287.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)

El panel de
**Inicio de sesión con OAuth**
tiene tres interruptores a nivel de instancia.

| Configuración | Valor predeterminado | Descripción |
|---|---|---|
| **Habilitar inicio de sesión con OAuth** | Activo | Interruptor principal. Cuando está desactivado, no se muestran los botones de inicio de sesión en la página de inicio de sesión. |
| **Permitir nuevos registros a través de un proveedor** | Activo | Cuando está desactivado, solo las personas que ya tienen una cuenta y han vinculado el proveedor pueden iniciar sesión con él. |
| **Enlazar cuentas existentes automáticamente** | Activo | Cuando alguien inicia sesión con un proveedor por primera vez y el proveedor ha verificado su correo electrónico, se vincula a la cuenta del panel con ese correo electrónico confirmado, en lugar de pedirle que lo haga él mismo. |

El enlace automático solo se aplica cuando
**todos**
los siguientes son verdaderos:

* el proveedor ha verificado la dirección de correo electrónico, y no es una dirección de correo electrónico privada de Apple;
* hay exactamente una cuenta con esa dirección de correo electrónico;
* esa cuenta es una cuenta de miembro del equipo — nunca un cliente, contacto o conductor;
* la dirección de correo electrónico de la cuenta está confirmada;
* ninguna cuenta de ese proveedor está vinculada a ella.

El titular de la cuenta recibe un correo electrónico cada vez que se vincula o se elimina un proveedor de su cuenta.

## URL de devolución

Cada panel de proveedor muestra una URL de devolución de llamada de solo lectura
**Callback URL**
. Regístrela con el proveedor exactamente como se muestra — los proveedores la coinciden carácter por carácter.

```
https://api.yourdomain.com/int/v1/auth/oauth/google/callback
```

El último segmento de la ruta es el ID del proveedor:
`google`
,
`microsoft`
,
`github`
, o
`apple`
. El origen proviene de
`OAUTH_REDIRECT_BASE`
cuando está configurado, y de lo contrario de
`APP_URL`
.

Si su API está detrás de un proxy o balanceador de carga con una URL pública diferente a
`APP_URL`
, configure
`OAUTH_REDIRECT_BASE`
a la URL pública. De lo contrario, Fleetbase creará una URL de devolución de llamada que el proveedor rechazará.

## Configuración de un proveedor

Cree una aplicación en el panel de desarrolladores del proveedor, y luego pegue las credenciales en el panel correspondiente en Fleetbase. Los campos de secreto solo se pueden escribir: una vez guardados, muestran
`Guardado (••••abcd) — dejar en blanco para mantener`
, y dejarlo en blanco mantiene el valor almacenado.

Google

Microsoft

GitHub

Apple

El panel de control de Google ha movido esta configuración a la sección
**Google Auth Platform**
. La ruta anterior
**APIs & Services → Credentials**
lleva al mismo cliente.

### Cree o seleccione un proyecto

En el
[Google Cloud console](https://console.cloud.google.com/auth/clients)
, abra
**Google Auth Platform → Clients**
y seleccione el proyecto al que pertenece, o cree uno.

### Establezca el público

En
**Audience**
, elija quién puede iniciar sesión:

| Tipo de usuario | Quién puede iniciar sesión |
|---|---|
| **Interno** | Solo cuentas en su organización de Google Workspace. El proyecto debe pertenecer a una organización de la nube |
| **Externo** | Cualquier cuenta de Google, sujeto al estado de publicación inferior |
| **Cualquier cuenta de Google** | Cuentas de Google, tanto personales como de trabajo o escuela |

Una aplicación externa comienza en
**Testing**
, donde solo los usuarios de prueba que enumere pueden autorizarla. Haga clic en
**Publicar aplicación**
para pasarla a
**In production**
.

### Complete la información

En
**Branding**
, establezca el nombre de la aplicación, la dirección de correo electrónico de soporte y los enlaces que los usuarios ven en la pantalla de consentimiento.

### Cree un cliente web

En
**Clients**
, haga clic en
**Create Client**
y elija el tipo de aplicación
**Web application**
.

### Agregue la URL de devolución

Péguela en
**Authorized redirect URIs**
.

Deje
**Authorized JavaScript origins**
vacío. Se utiliza para flujos del lado del navegador, y rechaza las URL con una ruta — pegar la URL de devolución en ella es un error común.

### Copie las credenciales

Copie el ID del cliente y el secreto del cliente, y — si está restringiendo el inicio de sesión a un solo directorio — el
**Directory (tenant) ID**
en Fleetbase.

**Coincidencia de URL de devolución.**
El esquema, el caso y la barra final deben coincidir exactamente. No se permiten comodines, fragmentos y cadenas de consulta. Se requiere HTTPS, excepto para
`localhost`
, que puede usar
`http`
.

Los cambios en un cliente de Google pueden tardar desde cinco minutos hasta varias horas en surtir efecto. Si una URL de devolución de llamada sigue fallando justo después de que lo haya corregido, espere antes de hacer cualquier otra cosa.

**Consentimiento y verificación.**
Fleetbase solicita solo el nombre, la dirección de correo electrónico y el perfil básico de una persona. Google trata estos como ámbitos no sensibles, por lo que la aplicación no necesita la verificación de la aplicación OAuth, no muestra la advertencia de la aplicación no verificada, y sus autorizaciones no caducan después de siete días mientras la aplicación está en fase de prueba. Solo necesita la verificación de marca de Google si desea un nombre de aplicación y logotipo personalizados en la pantalla de consentimiento.

**Restringir a un directorio.**
Fleetbase envía su dominio como una sugerencia a Google, y luego vuelve a verificar la afirmación de dominio en el token verificado en el servidor, lo cual es lo que requiere la propia guía de Google — la sugerencia de dominio por sí sola puede ser alterada por el navegador. Las cuentas de Google personales no tienen ninguna afirmación de dominio, por lo que se rechazan cuando se establece un dominio. Una persona fuera del dominio verá "Su cuenta no está en un dominio permitido".

Un cliente OAuth que no se utiliza durante seis meses se elimina automáticamente, con un correo electrónico de advertencia con 30 días de antelación. Esto atrapa las instancias de prueba que permanecen inactivas.

### Registre una aplicación

En el
[Microsoft Entra admin center](https://entra.microsoft.com/)
, vaya a
**Entra ID → App registrations → New registration**
. La documentación anterior también llama al mismo lugar
**Identity → Applications → App registrations**
.

Asigne un nombre a la aplicación, y luego elija
**Supported account types**
:

| Tipo de cuenta | Quién puede iniciar sesión | Valor del directorio |
|---|---|---|
| Solo un directorio | Solo cuentas en su propio directorio | Su ID de directorio (tenant) |
| Múltiples directorios de Entra ID | Cuentas de trabajo o escuela en cualquier directorio | `organizations` |
| Cualquier directorio de Entra ID y cuentas de Microsoft personales | Cuentas de trabajo, escuela y personales | `consumers` |

El registro y el valor del directorio en Fleetbase deben coincidir. El uso de
`common`
contra un registro de un solo directorio falla con
**AADSTS50194**
.

### Agregue la URL de devolución

En
**Manage → Authentication → Add a platform**
, elija el panel
**Web**
, y ingrese la URL de devolución de llamada de Fleetbase.

Deje
**ID tokens (used for implicit and hybrid flows)**
deshabilitado. Fleetbase lee el token de ID del respuesta del token, no del navegador.

### Cree un secreto

En
**Certificates & secrets → Client secrets → New client secret**
, agregue una descripción y un período de expiración, y luego copie el
**Value**
— no el
**Secret ID**
. El valor solo se muestra en esta página.

### Agregue las afirmaciones de correo electrónico

En
**Manage → Token configuration → Add optional claim**
, elija el tipo de token
**ID**
, y agregue
**email**
. Luego agregue
`xms_edov`
, que es lo que Microsoft indica que el dominio del correo electrónico está verificado.

`xms_edov`
a menudo falta en la lista de afirmaciones, porque Microsoft restringe las afirmaciones cuyo nombre comienza con
`xms_`
. Si está, abra
**Manage → Manifest**
y agréguelo a
`optionalClaims.idToken`
manualmente, junto con
`email`
. El editor de manifiestos puede mostrar una advertencia de validación después de guardar.

### Copie las credenciales

Copie el
**Application (client) ID**
del panel de control de la aplicación, el secreto del cliente, y — si está restringiendo el inicio de sesión a un solo directorio — el
**Directory (tenant) ID**
en Fleetbase.

| Campo | Requerido | Descripción |
|---|---|---|
| **ID de la aplicación (cliente)** | Sí | El GUID en la página de "Vista general" del registro de la aplicación |
| **Secreto del cliente** | Sí | El valor del **secreto**, no el ID del secreto. Almacenado encriptado |
| **ID del directorio (inquilino)** | No | Por defecto, se utiliza `común`. Utilice el GUID del **inquilino** para restringir el inicio de sesión a un único directorio |

Los secretos del cliente de Microsoft siempre caducan: 24 meses es el plazo más largo permitido, y el portal ofrece 180 días por defecto. El inicio de sesión deja de funcionar el día que caduca un secreto, con
**AADSTS7000215**
o
**AADSTS7000222**
en el registro de la API. Añada un recordatorio en el calendario, y tenga en cuenta que una inscripción puede contener dos secretos a la vez, para que pueda reemplazar uno antes de que el anterior caduque.

**¿Por qué
`xms_edov`
es importante?**
Cualquier administrador de directorio puede establecer la dirección de correo electrónico de un usuario en lo que desee, incluyendo una dirección en un dominio que no posee. Por lo tanto, Microsoft dice que la
`claim`
de correo electrónico no debe utilizarse para decidir quién es alguien.
`xms_edov`
es que Microsoft afirma que el directorio realmente posee el dominio de correo electrónico, y Fleetbase confía en una dirección de correo electrónico solo cuando está presente y es válida, o cuando el token proviene del único directorio que ha configurado. Si no lo tiene, las personas aún pueden iniciar sesión y registrarse, pero confirmarán su dirección de correo electrónico con un código, y el enlace automático no se aplica.

No establezca
`acceptMappedClaims`
en el manifiesto. Algunas guías de terceros sugieren hacerlo junto con
`xms_edov`,
pero pertenece a una función diferente, y Microsoft advierte que habilitarlo en una aplicación con varios inquilinos permite a otros definir asignaciones de reclamaciones para su aplicación.

**Cuentas de Microsoft personales**
vienen del directorio de consumidores
`9188040d-6c67-4c5b-b112-36a304b66dad`
y nunca contienen
`xms_edov`,
por lo que sus direcciones de correo electrónico siempre se tratan como no verificadas.

**Permisos.**
No se necesita ningún permiso de Microsoft Graph para el inicio de sesión: Fleetbase lee el token de identificación y no llama a Graph. La autorización predeterminada
**User.Read**
en una nueva inscripción es inofensiva. Los usuarios dan su consentimiento en el primer inicio de sesión, por lo que solo se necesita la autorización de los administradores en los directorios donde se ha desactivado la autorización del usuario.

**Reglas de URI de redirección.**
Los URI son sensibles a mayúsculas y minúsculas y deben coincidir exactamente.
`http://localhost`
se acepta para el desarrollo local, donde el puerto se ignora. Evite las cadenas de consulta: se rechazan por completo para las inscripciones que incluyen cuentas personales.

### Elija un propietario

Una aplicación OAuth pertenece ya sea a su cuenta de GitHub personal o a una organización. Prefiera una organización: entonces la aplicación seguirá existiendo después de que una persona abandone la cuenta y será gestionada por los propietarios de la organización.

### Registre la aplicación

Para una aplicación personal, vaya a
**Configuración → Configuración del desarrollador → Aplicaciones OAuth → Nueva aplicación OAuth**
. Para una organización, abra la configuración de la organización
**Configuración → Configuración del desarrollador → Aplicaciones OAuth**
.

### Complete los detalles

**Nombre de la aplicación**
y
**URL de inicio**
se muestran a las personas cuando autorizan, así que utilice valores que esté dispuesto a hacer públicos. Introduzca la URL de devolución de llamada del panel de proveedores de Fleetbase como
**URL de devolución de llamada de autorización**
.

Puede añadir hasta diez URLs de devolución de llamada con
**Añadir URL de devolución de llamada**,
lo que permite que una aplicación sirva para producción, pruebas y desarrollo local.

### Deje los ajustes adicionales sin cambios

**Habilitar el flujo de dispositivo**
no se utiliza en Fleetbase: déjelo desactivado.
**Caducidad de los tokens de acceso de usuario**
puede mantener su valor predeterminado, ya que Fleetbase lee el perfil una vez y descarta el token de GitHub.

### Generar un secreto del cliente

Genere un secreto del cliente y cópielo en Fleetbase junto con el ID del cliente. El secreto solo se muestra una vez. GitHub permite varios secretos a la vez, así que rote añadiendo uno nuevo, implementándolo y luego eliminando el anterior.

| Campo | Requerido | Descripción |
|---|---|---|
| **ID del cliente** | Sí | Comienza con `Ov23li` |
| **Secreto del cliente** | Sí | Un secreto de 40 caracteres. Almacenado encriptado. No caduca |
| **URL de devolución de llamada** | Sí | Debe coincidir exactamente, incluyendo el puerto |

**Coincidencia de la URL de devolución de llamada.**
GitHub coincide exactamente con la URL de devolución de llamada. Ofrece un modo de comodín opcional que permite subdominios y subdirectorios, pero GitHub advierte que amplía su exposición, y Fleetbase no lo necesita: registre las URLs exactas en lugar de ello. Un puerto que no coincide nunca, ni con un comodín, ni sin él.

**Direcciones de correo electrónico.**
Fleetbase utiliza la dirección de correo electrónico principal de un usuario de GitHub, y solo cuando GitHub lo informa como verificado. Alguien cuyo correo electrónico principal no esté verificado no puede iniciar sesión: GitHub se niega por sí mismo con "El usuario debe tener una dirección de correo electrónico verificada". Deben verificar la dirección en la configuración de su correo electrónico de GitHub y intentarlo de nuevo.

Si su organización restringe el acceso de aplicaciones de terceros, esto gobierna el acceso a los recursos de la organización, no al inicio de sesión. Fleetbase solo lee el propio perfil y la dirección de correo electrónico de la persona, por lo que los miembros aún pueden iniciar sesión sin una solicitud aprobada.

Para iniciar sesión con Apple, se necesitan tres cosas que se hacen referencia entre sí: una
**ID de la aplicación**
marcada como principal, un
**ID de servicio**
configurado para ese ID de la aplicación, y una
**clave**
creada para él. El ID de servicio y la clave le piden que elija un ID de la aplicación principal, así que cree el ID de la aplicación primero, aunque Fleetbase es una aplicación web y es posible que nunca envíe una aplicación iOS.

Todo esto requiere una membresía de pago en el
**Programa de desarrolladores de Apple**
y el rol de
**Propietario de la cuenta**
o
**Administrador**. Una cuenta de desarrollador de Apple gratuita no tiene acceso a los certificados, identificadores y perfiles.

### Cree el ID de la aplicación

En
[Certificados, identificadores y perfiles](https://developer.apple.com/account/resources/identifiers/list),
seleccione
**Identificadores**,
haga clic en el botón añadir, elija
**Aplicaciones**
y luego
**Aplicación**.

Introduzca una
**Descripción**
y un
**ID de aplicación**
(un identificador de paquete como
`com.example.app`
), marque
**Iniciar sesión con Apple**
bajo
**Capacidades**
, luego haga clic en
**Continuar**
y
**Registrar**
.

### Marque como ID de aplicación principal

Reabra el identificador, seleccione
**Iniciar sesión con Apple**
bajo
**Capacidades**
y haga clic en
**Configurar**
. Elija
**Habilitar como ID de aplicación principal**
, luego haga clic en
**Guardar**
en el cuadro de diálogo y
**Guardar**
en la parte superior derecha.

Agrupe con un ID de aplicación principal existente solo cuando ya tenga uno para una aplicación relacionada que deba compartir la misma identidad de usuario.

### Cree el ID de servicio

De vuelta en
**Identificadores**,
haga clic en el botón añadir y elija
**IDs de servicio**. Introduzca una descripción y un identificador de dominio inverso: por ejemplo
`com.example.console`
, luego haga clic en
**Continuar**
y
**Registrar**
.

Este identificador, no el ID de paquete del ID de la aplicación, es el que se introduce en el campo
**ID de servicio**
de Fleetbase.

### Configure las URLs del sitio web

Seleccione el ID de servicio que acaba de crear, marque
**Iniciar sesión con Apple**
y haga clic en
**Configurar**
. Elija el
**ID de aplicación principal**
del paso 2, luego introduzca:

* en
  **Dominios y subdominios**
  , el nombre de su API, por ejemplo
  `api.example.com`
  ;
* en
  **URLs de devolución de llamada**
  , la URL de devolución de llamada completa del panel de proveedores de Fleetbase.

Haga clic en
**Hecho**
,
**Continuar**
y
**Guardar**
.

### Cree la clave de firma

Seleccione
**Claves**
, haga clic en el botón añadir, nombre la clave, marque
**Iniciar sesión con Apple**
y haga clic en
**Configurar**
. Elija el mismo
**ID de aplicación principal**
, luego haga clic en
**Continuar**
y
**Registrar**
.

Descargue el archivo
`.p8`. Apple permite que lo descargue una vez y no guarda una copia: si lo pierde, cree una nueva clave. Tenga en cuenta el
**ID de clave**
en la página de la clave, y su
**ID de equipo**
de
**Detalles de la membresía**
.

### Copie las credenciales

Copie el ID de servicio, el ID de equipo, el ID de clave y todo el contenido del archivo
`.p8`, incluyendo la línea
`-----BEGIN PRIVATE KEY-----`
en Fleetbase.

| Campo | Requerido | Descripción |
|---|---|---|
| **ID de cliente** | Sí | Comienza con `Ov23li` |
| **Secreto del cliente** | Sí | Un secreto de 40 caracteres. Almacenado encriptado. No caduca |
| **URL de devolución de llamada** | Sí | Debe coincidir exactamente, incluyendo el puerto |

**Coincidencia de la URL de devolución de llamada.**
GitHub coincide exactamente con la URL de devolución de llamada. Ofrece un modo de comodín opcional que permite subdominios y subdirectorios, pero GitHub advierte que amplía su exposición, y Fleetbase no lo necesita: registre las URLs exactas en lugar de ello. Un puerto que no coincide nunca, ni con un comodín, ni sin él.

**Direcciones de correo electrónico.**
Fleetbase utiliza la dirección de correo electrónico principal de un usuario de GitHub, y solo cuando GitHub lo informa como verificado. Alguien cuyo correo electrónico principal no esté verificado no puede iniciar sesión: GitHub se niega por sí mismo con "El usuario debe tener una dirección de correo electrónico verificada". Deben verificar la dirección en la configuración de su correo electrónico de GitHub y intentarlo de nuevo.

Si su organización restringe el acceso de aplicaciones de terceros, esto gobierna el acceso a los recursos de la organización, no al inicio de sesión. Fleetbase solo lee el propio perfil y la dirección de correo electrónico de la persona, por lo que los miembros aún pueden iniciar sesión sin una solicitud aprobada.

Para iniciar sesión con Apple, se necesitan tres cosas que se hacen referencia entre sí: una
**ID de la aplicación**
marcada como principal, un
**ID de servicio**
configurado para ese ID de la aplicación, y una
**clave**
creada para él. El ID de servicio y la clave le piden que elija un ID de aplicación principal, así que cree el ID de la aplicación primero, aunque Fleetbase es una aplicación web y es posible que nunca envíe una aplicación iOS.

Todo esto requiere una membresía de pago en el
**Programa de desarrolladores de Apple**
y el rol de
**Propietario de la cuenta**
o
**Administrador**. Una cuenta de desarrollador de Apple gratuita no tiene acceso a los certificados, identificadores y perfiles.

### Cree el ID de la aplicación

En
[Certificados, identificadores y perfiles](https://developer.apple.com/account/resources/identifiers/list),
seleccione
**Identificadores**,
haga clic en el botón añadir, elija
**Aplicaciones**
y luego
**Aplicación**.

Introduzca una
**Descripción**
y un
**ID de aplicación**
(un identificador de paquete como
`com.example.app`
), marque
**Iniciar sesión con Apple**
bajo
**Capacidades**
, luego haga clic en
**Continuar**
y
**Registrar**
.

### Marque como ID de aplicación principal

Reabra el identificador, seleccione
**Iniciar sesión con Apple**
bajo
**Capacidades**
y haga clic en
**Configurar**
. Elija
**Habilitar como ID de aplicación principal**
, luego haga clic en
**Guardar**
en el cuadro de diálogo y
**Guardar**
en la parte superior derecha.

Agrupe con un ID de aplicación principal existente solo cuando ya tenga uno para una aplicación relacionada que deba compartir la misma identidad de usuario.

### Cree el ID de servicio

De vuelta en
**Identificadores**,
haga clic en el botón añadir y elija
**IDs de servicio**. Introduzca una descripción y un identificador de dominio inverso: por ejemplo
`com.example.console`
, luego haga clic en
**Continuar**
y
**Registrar**
.

Este identificador, no el ID de paquete del ID de la aplicación, es el que se introduce en el campo
**ID de servicio**
de Fleetbase.

### Configure las URLs del sitio web

Seleccione el ID de servicio que acaba de crear, marque
**Iniciar sesión con Apple**
y haga clic en
**Configurar**
. Elija el
**ID de aplicación principal**
del paso 2, luego introduzca:

* en
  **Dominios y subdominios**
  , el nombre de su API, por ejemplo
  `api.example.com`
  ;
* en
  **URLs de devolución de llamada**
  , la URL de devolución de llamada completa del panel de proveedores de Fleetbase.

Haga clic en
**Hecho**
,
**Continuar**
y
**Guardar**
.

### Cree la clave de firma

Seleccione
**Claves**
, haga clic en el botón añadir, nombre la clave, marque
**Iniciar sesión con Apple**
y haga clic en
**Configurar**
. Elija el mismo
**ID de aplicación principal**
, luego haga clic en
**Continuar**
y
**Registrar**
.

Descargue el archivo
`.p8`. Apple permite que lo descargue una vez y no guarda una copia: si lo pierde, cree una nueva clave. Tenga en cuenta el
**ID de clave**
en la página de la clave, y su
**ID de equipo**
de
**Detalles de la membresía**
.

### Copie las credenciales

Copie el ID de servicio, el ID de equipo, el ID de clave y todo el contenido del archivo
`.p8`, incluyendo la línea
`-----BEGIN PRIVATE KEY-----`
en Fleetbase.

Cada panel de proveedor tiene un
**Botón de verificación**
. Comprueba los valores actualmente en el formulario, ya sea guardados o no, frente al proveedor, y no escribe nada. Fleetbase solicita al proveedor un token utilizando un código de autorización deliberadamente inválido y lee el error que se devuelve: un proveedor que se queja del código ha aceptado sus credenciales.

Un proveedor no puede activarse hasta que se haya completado la verificación, y cambiar las credenciales de un proveedor activo vuelve a ejecutar la verificación cuando se guarda. Si falla al guardar, nada se guarda.

| Resultado | Qué significa |
| --- | --- |
| "… ha aceptado estas credenciales." | Las credenciales y la URL de devolución son válidas. Ahora puede ofrecer el proveedor |
| "Faltante: …" | Un campo obligatorio está vacío. El mensaje indica los campos |
| "La clave de firma no se pudo utilizar para generar un secreto del cliente." | Solo para Apple. El contenido de `.p8` no coincide con el ID de la clave, o el archivo está incompleto |
| "… ha rechazado estas credenciales." | Verifique el ID del cliente y el secreto del cliente. Para Microsoft, verifique que ha copiado el valor del secreto y no el ID del secreto |
| "… no reconoce la URL de devolución." | Registre la URL de devolución con el proveedor exactamente como se muestra |
| "… no se pudo acceder para verificar estas credenciales." | La API no pudo acceder al proveedor. Verifique el acceso de red saliente, y luego inténtelo de nuevo |
| "… ha proporcionado una respuesta inesperada." | Las credenciales no pudieron ser confirmadas de ninguna manera. Verifique los registros de la API |

Cada mensaje nombra al proveedor, por ejemplo, "Google ha aceptado estas credenciales".

## Guardar y secretos

Haga clic en
**Guardar cambios**
para aplicar. La configuración tiene efecto de inmediato: no es necesario reiniciar.

Los secretos que ingrese en la consola están encriptados con la clave de la aplicación. Dejar un campo de secreto vacío mantiene el valor ya almacenado.

Al rotar
`APP_KEY`
hace que los secretos de proveedores guardados sean ilegibles. Cualquier proveedor configurado a través de la consola se considera que no está configurado y deja de ofrecerse hasta que se reingrese su secreto.

## Variables de entorno

Las instancias autoalojadas pueden configurar todo a través del entorno en lugar de la consola. Los valores guardados en la consola tienen prioridad sobre las variables de entorno. Los secretos de la variable de entorno se leen tal cual, sin encriptación.

| Variable | Valor predeterminado | Descripción |
| --- | --- | --- |
| `OAUTH_ENABLED` | `true` | Interruptor principal para iniciar sesión con OAuth |
| `OAUTH_ALLOW_REGISTRATION` | `true` | Permitir nuevos registros a través de un proveedor |
| `OAUTH_AUTO_LINK` | `true` | Vincular cuentas existentes automáticamente |
| `OAUTH_REDIRECT_BASE` | `APP_URL` | Origen público de la API, utilizado para construir URLs de devolución |
| `OAUTH_GOOGLE_ENABLED` | `false` | Ofrecer Google. También `OAUTH_GOOGLE_CLIENT_ID`, `OAUTH_GOOGLE_CLIENT_SECRET`, `OAUTH_GOOGLE_HOSTED_DOMAIN` |
| `OAUTH_MICROSOFT_ENABLED` | `false` | Ofrecer Microsoft. También `OAUTH_MICROSOFT_CLIENT_ID`, `OAUTH_MICROSOFT_CLIENT_SECRET`, `OAUTH_MICROSOFT_TENANT` |
| `OAUTH_GITHUB_ENABLED` | `false` | Ofrecer GitHub. También `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET` |
| `OAUTH_APPLE_ENABLED` | `false` | Ofrecer Apple. También `OAUTH_APPLE_CLIENT_ID`, `OAUTH_APPLE_TEAM_ID`, `OAUTH_APPLE_KEY_ID`, `OAUTH_APPLE_PRIVATE_KEY` |
| `OAUTH_CONSOLE_CALLBACK_PATH` | `/auth/oauth/callback` | Ruta del navegador que Fleetbase visita después de que el proveedor |
| `OAUTH_STRICT_IP_BINDING` | `false` | Rechazar un inicio de sesión que se completa desde una dirección IP diferente a la que se inició |
| `OAUTH_TTL_AUTHORIZATION` | `600` | Segundos que puede tardar un viaje de ida y vuelta del proveedor |
| `OAUTH_TTL_HANDOFF` | `120` | Segundos que tiene la consola para canjear una sesión de inicio de sesión completada |
| `OAUTH_TTL_REGISTRATION_INTENT` | `900` | Segundos que tiene un nuevo usuario para completar el formulario de registro |

Un proveedor se ofrece en la página de inicio de sesión solo cuando está activado
**y**
todos los campos obligatorios están completos. Un proveedor incompleto se oculta en lugar de mostrarse como defectuoso.

## Requisitos

* **Migraciones.**
  OAuth añade tablas para identidades vinculadas e inicios de sesión en tiempo real. Ejecute
  `deploy.sh`
  como parte de la actualización.
* **Programador.**
  Los estados de inicio de sesión caducados se eliminan cada hora por el programador.
* **Cola y correo electrónico.**
  Los correos electrónicos enviados cuando se vincula o se elimina un proveedor se encolan, por lo que se necesita un trabajador de cola y un
  [controlador de correo](https://fleetbase.io/docs/platform/system-setup/mail)
  funcional.
* **HTTPS saliente**
  desde la API a los puntos finales de token y clave de firma de cada proveedor.
* **Una cuenta de desarrollador con cada proveedor.**
  Para iniciar sesión con Apple, se necesita además una membresía de pago del Programa de Desarrolladores de Apple, y el rol de Propietario de la Cuenta o Administrador.
* **`CONSOLE_HOST`**
  debe ser correcto. Es donde se envía el navegador una vez que el proveedor devuelve a la persona.

## Solución de problemas

| Síntoma | Causa y solución |
| --- | --- |
| No hay botones de proveedor en la página de inicio de sesión | **OAuth sign-in** está desactivado, el proveedor no está activado, o un campo obligatorio está vacío |
| El proveedor informa de una discrepancia en la URL de devolución | La URL de devolución registrada es diferente a la URL de devolución. Si hay un proxy, establezca `OAUTH_REDIRECT_BASE` en el origen de la API pública |
| Google sigue rechazando una URL de devolución que acababa de corregir | Los cambios en un cliente de Google tardan entre cinco minutos y unas horas en surtir efecto. Espere antes de realizar cualquier otro cambio |
| Microsoft deja de funcionar, aunque funcionaba durante meses | El secreto del cliente ha caducado. Los registros de la API muestran **AADSTS7000215** o **AADSTS7000222**. Cree un nuevo secreto y copie su **valor** |
| Microsoft rechaza las credenciales inmediatamente | Se ha copiado el **ID del secreto** en lugar del valor del secreto, o el secreto pertenece a otra inscripción |
| Apple rechaza las credenciales | Verifique el ID de los servicios, el ID del equipo, el `.p8` frente a su ID de clave, y que la URL de devolución esté registrada exactamente. Apple informa de todo esto de la misma manera |
| No se puede probar el inicio de sesión con Apple localmente | Apple rechaza las direcciones IP y `localhost`. Utilice un túnel HTTPS o un dominio de preproducción |
| Un usuario de GitHub no puede completar el inicio de sesión | La dirección de correo electrónico principal de GitHub no está verificada. GitHub se niega con "El usuario debe tener una dirección de correo electrónico principal verificada" |
| Los usuarios de Microsoft se les pide que verifiquen una dirección de correo electrónico que ya poseen | La afirmación opcional `xms_edov` falta, o el inquilino es `common`. Agregue la afirmación en la configuración del token |
| "Su cuenta no está en un dominio permitido." | La cuenta de Google está fuera del dominio de Workspace establecido en **Restrict to Workspace domain** |
| "Ya existe una cuenta con este correo electrónico." | Esa dirección ya tiene una cuenta. Inicie sesión con una contraseña e vincule el proveedor desde **Your profile → Auth** , o active el enlace automático |
| "El enlace de inicio de sesión ya no es válido." o "La sesión de inicio de sesión ha caducado." | El inicio de sesión tardó demasiado, o la página se recargó a medio camino. Comience de nuevo |
| "No se pudo acceder al proveedor de inicio de sesión." | La API no pudo acceder al proveedor, o no pudo verificar la firma del token del proveedor. Verifique el acceso de red saliente, y luego inténtelo de nuevo |
| "Demasiados intentos. Inténtelo de nuevo más tarde." | Se alcanzó el límite de velocidad: 30 inicios de sesión, 20 completados por minuto, y 10 intentos de enlace por minuto por usuario |

Para lo que ven los usuarios en su lado — registro, vinculación y desvinculación — consulte
[Identity & Access → Signing In with a Provider](https://fleetbase.io/docs/platform/identity-and-access/oauth-sign-in)
.