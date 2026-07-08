# Walkthrough: Diseño Premium Dark-Green (Inspiración Raycast & AirPods)

Se ha completado satisfactoriamente el rediseño del sitio web corporativo de co-branding para **CAOMI Sistemas Informáticos** y **Grupo RO+**. La interfaz ha evolucionado de un esqueleto estructurado a un entorno moderno, inmersivo y de alta gama en modo oscuro y verde brillante.

---

## 🚀 Cambios Realizados

1.  **Estructura Semántica y Centrado (`index.html`):**
    *   Reorganización del Hero para alinear el contenido al centro de la pantalla (estilo Raycast) y dar espacio a las capas de fondo interactivo.
    *   Inyección de 4 capas de haces de luz (`.glow-beam`) dinámicos para simular la iluminación ambiental de fondo.
    *   Incorporación de la clase `.featured` a la tarjeta de **Sistemas de Gestión** en la sección de Servicios para añadir contraste e interés visual en el flujo de lectura del usuario (estilo AirPods).
    *   Cambios en los identificadores de logotipos y enlaces de pie de página para proyectar una identidad corporativa profesional.

2.  **Hoja de Estilos de Alta Gama (`style.css`):**
    *   **Tipografía:** Importación y uso de **Plus Jakarta Sans** para una estética de texto moderna y legible.
    *   **Paleta de Colores (Green/Charcoal):**
        *   Fondo de pantalla: `#000000` / `#060709` / `#0c0d12`.
        *   Tarjetas y paneles de control: `#13141a` con bordes sutiles semi-transparentes de `rgba(255, 255, 255, 0.08)`.
        *   Acentos brillantes: Verde neón `#00e676`.
    *   **Efecto de Haces de Luz en Movimiento:**
        *   Se implementó una animación CSS acelerada por hardware (`@keyframes glow-flow`) que desplaza, escala y cambia la opacidad de los haces de luz en el fondo del hero con desfases de tiempo (duraciones entre 18s y 30s) para crear un flujo de luz natural e infinito.
        *   Un resplandor radial central ayuda a resaltar los títulos sobre el fondo oscuro.
    *   **Header Estilo Píldora Flotante (Raycast Navigation):**
        *   Menú de navegación en contenedor compacto con fondo translúcido (`backdrop-filter: blur(12px)`) y bordes suaves.
        *   Reducción de tamaño del menú y mayor opacidad automáticamente al hacer scroll mediante la clase `.scrolled`.
    *   **Tarjetas de Servicios y Productos (AirPods Cards):**
        *   Esquinas súper redondeadas (`border-radius: 24px`).
        *   Efecto de elevación al pasar el cursor (hover translateY y box-shadow).
        *   La tarjeta destacada (`.featured`) asume un color de fondo verde neón sólido y textos oscuros `#050608` para generar un quiebre de color llamativo (como el diseño de AirPods Pro).

3.  **Interactividad Dinámica (`main.js`):**
    *   Efecto de encogimiento dinámico en el header flotante al deslizar la página hacia abajo.
    *   Navegación responsiva inteligente con menú hamburguesa para dispositivos móviles.
    *   Resaltado dinámico del enlace del menú según la sección visible en pantalla.
    *   Validaciones de datos (formato de correo electrónico y número telefónico a 10 dígitos) en el formulario de contacto integrado con Netlify Forms.

---

## 📸 Verificación Visual (Capturas de Pantalla)

A continuación se adjuntan las capturas de pantalla de la interfaz tomadas durante la sesión de verificación:

### 1. Hero & Navegación Animada (Inicio)
![Sección Hero de Inicio](/absolute/C:/Users/lperezh2301/.gemini/antigravity-ide/brain/95f95c7e-d8e9-4675-b0d2-9c1d64d8c653/hero_section_animated_1783472781712.png)
> [!TIP]
> Observa el co-branding en la esquina superior izquierda, los botones tipo píldora redondeada y los haces de luz diagonales verdes brillando sutilmente de fondo.

### 2. Quiénes Somos (Nosotros)
![Sección Nosotros](/absolute/C:/Users/lperezh2301/.gemini/antigravity-ide/brain/95f95c7e-d8e9-4675-b0d2-9c1d64d8c653/nosotros_section_1783472788577.png)
> [!NOTE]
> Misión, visión e historia presentados en un grid limpio con tarjetas de bordes redondeados y los valores corporativos resaltados con iconos.

### 3. Servicios Especializados
![Sección Servicios Especializados](/absolute/C:/Users/lperezh2301/.gemini/antigravity-ide/brain/95f95c7e-d8e9-4675-b0d2-9c1d64d8c653/servicios_section_top_1783472792853.png)
> [!IMPORTANT]
> El bloque de "Sistemas de Gestión" destaca con fondo verde neón completo y texto en alto contraste, imitando el estilo de especificaciones de AirPods.

### 4. Catálogo de Productos y Contacto
![Sección Productos y Contacto](/absolute/C:/Users/lperezh2301/.gemini/antigravity-ide/brain/95f95c7e-d8e9-4675-b0d2-9c1d64d8c653/contacto_section_1783472804962.png)
> [!TIP]
> Panel de información de contacto de Ecatepec estructurado a la izquierda y el formulario optimizado para envío a la derecha en tonos oscuros elegantes.
