# Configuración del Auto-respondedor y Catálogo de Servicios (Netlify Forms)

Este manual contiene las instrucciones detalladas para que puedas automatizar el envío del Catálogo de Servicios en formato PDF o configurar el auto-respondedor automático tras los registros de los clientes.

---

## 1. Funcionamiento del Flujo de Conversión Actual

El sitio web está pre-configurado para trabajar de forma nativa con **Netlify Forms** (sin necesidad de escribir código en el servidor):
1.  Cuando un cliente completa el formulario de contacto en `index.html` y hace clic en **Enviar Mensaje**, los datos son capturados automáticamente por Netlify.
2.  Tras el envío exitoso, el formulario redirige al usuario a la página personalizada de éxito: [confirmacion.html](file:///c:/Users/lperezh2301/Documents/GENERAL/Tal-Fernando/ro-sistemas-web/confirmacion.html).
3.  En esta página, el usuario puede descargar directamente el archivo [catalogo.pdf](file:///c:/Users/lperezh2301/Documents/GENERAL/Tal-Fernando/ro-sistemas-web/catalogo.pdf) mediante un botón premium e interactivo.

> [!IMPORTANT]
> **Paso Obligatorio:** Reemplaza el archivo temporal `catalogo.pdf` que se encuentra en la carpeta raíz del proyecto por tu archivo PDF real. Asegúrate de conservar exactamente el mismo nombre (`catalogo.pdf`) para que el botón de descarga funcione sin problemas.

---

## 2. Configuración del Auto-respondedor de Correo Electrónico

Si deseas que el cliente reciba un correo de confirmación de manera automática en su buzón de entrada tras enviar el formulario, tienes las siguientes opciones gratuitas y premium:

### Opción A: Notificación Directa por Email (Gratuito en Netlify)
Netlify te permite enviar notificaciones de manera automática cada vez que se envía un formulario, aunque en su plan gratuito esta notificación va dirigida al administrador del sitio.
1.  Inicia sesión en tu panel de control de **Netlify**.
2.  Ve a tu sitio web y accede a **Site Configuration** > **Forms**.
3.  Busca la sección **Form notifications**.
4.  Haz clic en **Add notification** y selecciona **Email notification**.
5.  Configura tu correo electrónico para recibir alertas instantáneas cada vez que un cliente te escriba.

### Opción B: Correo de Confirmación Automático al Cliente (Recomendado vía Zapier / Make)
Para enviar un correo personalizado al cliente ("*¡Gracias por escribirnos! Aquí tienes nuestro catálogo...*"), el método estándar, robusto y gratuito es conectar Netlify Forms con un automatizador como **Zapier** o **Make (anteriormente Integromat)**:

1.  **Crear cuenta en Zapier o Make:** Regístrate de forma gratuita.
2.  **Crear un nuevo flujo (Zap/Escenario):**
    *   **Disparador (Trigger):** Elige la aplicación **Netlify** y selecciona el evento **New Form Submission** (Nueva entrega de formulario). Vincula tu sitio de Netlify.
    *   **Acción (Action):** Selecciona **Gmail** o tu proveedor de correo empresarial (como Outlook/SMTP).
3.  **Configurar el Correo de Salida:**
    *   **Para (To):** Elige dinámicamente el campo de correo electrónico del cliente enviado desde el formulario.
    *   **Asunto:** *"¡Gracias por contactar a CAOMI - Grupo RO+! Descarga nuestro Catálogo"*
    *   **Cuerpo del mensaje:** Escribe un mensaje de bienvenida y añade un enlace directo al archivo PDF alojado en tu sitio (ejemplo: `https://tu-sitio.netlify.app/catalogo.pdf`).
4.  **Activar el Flujo:** A partir de ese momento, cada envío activará un correo instantáneo al buzón de tu cliente con el catálogo adjunto.

---

## 3. Verificaciones de Despliegue en Netlify

*   Asegúrate de que la etiqueta del formulario contenga el atributo `data-netlify="true"` y `name="contacto"`. Estos ya han sido integrados en tu archivo `index.html`.
*   Al subir tu sitio a Netlify, el motor detectará el formulario de manera automática y habilitará la pestaña **Forms** en tu panel sin necesidad de configuraciones adicionales.
