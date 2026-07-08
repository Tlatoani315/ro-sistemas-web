# CAOMI & Grupo RO+ - Portal Web Corporativo y Catálogo Digital 🚀

Este repositorio contiene el código fuente de la plataforma web corporativa de co-branding para **CAOMI Sistemas Informáticos** y **Grupo RO+**. El sitio ha sido diseñado con una estética oscura premium inspirada en interfaces como Raycast y Apple (AirPods landing), incorporando interacciones avanzadas, animaciones y un catálogo digital completo.

---

## 🎨 Características Destacadas

1. **Fondo Animado del Hero (Raycast Style):** Destellos difusos centralizados y haces de luz flotantes que pulsan y se desplazan mediante aceleración por hardware.
2. **Sección de Valores con Scroll-Driven (Curio Style):** El texto gigante de fondo realiza un zoom a medida que el usuario se desplaza, mientras las tarjetas de valores revelan su descripción con un efecto *slide-up* verde neón al pasar el cursor o hacer toque.
3. **Misión y Visión con Parpadeo Neón:** Tarjetas con animaciones independientes de parpadeo de luz, deteniéndose en un brillo sólido e intenso al posicionar el cursor sobre ellas.
4. **Carrusel Constante de Servicios:** Cuadrícula de servicios especializados con movimiento horizontal circular y uniforme que se detiene en hover. Al hacer clic, el carrusel se pausa por completo y la tarjeta elegida aumenta de tamaño un 10% durante 2 segundos.
5. **Catálogo en Acordeón de 12 Categorías:** Desplegables de productos codificados con imágenes de alta resolución, combinaciones de colores exclusivas y optimización de contraste WCAG (letras oscuras en paneles claros, letras blancas en paneles oscuros).
6. **Ubicación con Google Maps Interactivo:** Mapa responsivo embebido con bordes redondeados y resalte neón al pasar el cursor.
7. **Formulario de Contacto en Netlify:** Conectado nativamente con Netlify Forms y configurado con redirección automática hacia una página de éxito personalizada (`confirmacion.html`).
8. **Catálogo PDF Autocompilable:** Script en Python que compila dinámicamente un catálogo PDF de 6 páginas con la misma estética oscura del sitio e incrustando las imágenes del proyecto.

---

## 🛠️ Estructura del Proyecto

* `index.html`: Página de inicio principal con secciones de Hero, Nosotros, Valores, Servicios, Catálogo y Contacto.
* `confirmacion.html`: Página de éxito tras el envío del formulario de contacto.
* `catalogo.pdf`: Catálogo corporativo premium de 6 páginas generado a partir del script.
* `style.css`: Hojas de estilo generales, variables de diseño y animaciones keyframe.
* `main.js`: Lógica ligera para el control del menú móvil, carrusel de servicios, acordeón y scroll de valores.
* `generate_pdf.py`: Script en Python encargado de compilar el catálogo en formato PDF.
* `img/`: Carpeta con los activos gráficos y mockups del catálogo.
* `indicaciones/`: Documentación técnica de referencia para el equipo de desarrollo.

---

## 🚀 Despliegue en Producción

El sitio está optimizado para funcionar de forma nativa e inmediata en **Netlify**:
1. Conecta este repositorio directamente a tu cuenta de **Netlify** o arrastra la carpeta del proyecto a su panel web.
2. Netlify detectará de manera automática el formulario de contacto (`data-netlify="true"`) y configurará la redirección a `confirmacion.html` mediante el atributo `action`.

*Consulta la guía [autorespondedor_netlify.md](file:///c:/Users/lperezh2301/Documents/GENERAL/Tal-Fernando/ro-sistemas-web/indicaciones/autorespondedor_netlify.md) dentro de la carpeta `indicaciones/` para automatizar el correo de confirmación de registro y el envío del catálogo a tus clientes de manera gratuita.*

---

## 📄 ¿Cómo compilar el Catálogo PDF?

Si realizas cambios en el contenido o las imágenes del catálogo y deseas regenerar el archivo `catalogo.pdf`, sigue estos pasos:

1. Asegúrate de tener Python 3 instalado en tu equipo.
2. Instala la dependencia necesaria:
   ```bash
   pip install reportlab
   ```
3. Ejecuta el compilador desde tu terminal en la raíz del proyecto:
   ```bash
   python generate_pdf.py
   ```
El archivo `catalogo.pdf` se actualizará automáticamente con la nueva información e imágenes.
