# Instrucciones: Animación de Valores y Reemplazo de Imágenes

Este documento explica cómo funciona técnicamente la animación de la sección de **Valores** (inspirada en la página de Curio/Ryan Ritzenthaler) y cómo puedes reemplazar en el futuro las tarjetas con cuadros blancos por tus propias imágenes.

---

## 🛠️ Funcionamiento Técnico (Scroll-Driven Animation)

Para evitar que el sitio web sea pesado (lo que ocurriría al cargar decenas de fotogramas de video en formato PNG que sumarían varios megabytes), implementamos esta animación mediante **cálculos matemáticos en tiempo real y transformaciones CSS en el navegador**.

### Componentes de la animación:
1.  **Contenedor Principal (`#valores-scroll`):**
    *   Tiene una altura de `250vh` (2.5 veces el alto de la pantalla). Esto permite que la pantalla se congele mientras el usuario se desliza por esta área.
2.  **Viewport Sticky (`.sticky-viewport`):**
    *   Mantiene fijados el texto y las tarjetas en pantalla mientras dure el recorrido del scroll.
3.  **Texto de Fondo ("VALORES"):**
    *   Es texto nativo de HTML5 con un tamaño inicial de `16vw` y una rotación fija de `-4deg` (ladeado sutil).
    *   Se estiliza como un foco de neón verde mediante un borde de texto `-webkit-text-stroke: 2px var(--accent)` con color de fondo transparente, y resplandores superpuestos mediante `filter: drop-shadow()`.
    *   A medida que el usuario hace scroll hacia abajo, JavaScript calcula el progreso (de `0.0` a `1.0`) y escala el texto linealmente hasta `18` veces su tamaño original manteniendo la inclinación, al mismo tiempo que desvanece su opacidad. Esto simula el efecto tridimensional de "atravesar" el foco de neón.
4.  **Cuadros de Valores (`.valores-cards-container`):**
    *   Comienzan invisibles y desplazados `100px` hacia abajo.
    *   A partir del `15%` del progreso del scroll en la sección, se desvanecen hacia adentro (`opacity` de 0 a 1) y se elevan a su posición original (`translateY(0)`).

---

## 🖼️ Cómo Reemplazar los Cuadros Blancos por Imágenes

Actualmente, las tarjetas son cuadros blancos estilizados con CSS (`.valor-card-white`) y muestran un número identificador y el nombre de cada valor. 

Cuando tengas las imágenes definitivas para cada valor, sigue estos pasos para integrarlas:

### Paso 1: Guardar las imágenes
*   Guarda tus nuevas imágenes en la carpeta de imágenes del proyecto (por ejemplo, en una carpeta llamada `img/` en la raíz).
*   Se recomienda que las imágenes tengan un fondo transparente (formato **PNG** o **SVG**) o formato optimizado **WebP** y dimensiones cuadradas uniformes (por ejemplo, `500x500` píxeles).

### Paso 2: Modificar el HTML (`index.html`)
Busca la sección `#valores-scroll` en `index.html`. Modifica cada tarjeta para añadir la etiqueta de imagen `<img>` o configurar el fondo.

*Ejemplo de reemplazo (Usando etiquetas `<img>` dentro de la tarjeta):*
```html
<!-- Antes -->
<div class="valor-card-white">
    <span class="valor-number">01</span>
    <h3>Innovación</h3>
</div>

<!-- Después -->
<div class="valor-card-white image-theme">
    <img src="img/innovacion.webp" alt="Icono de Innovación" class="valor-icon-img">
    <h3>Innovación</h3>
</div>
```

### Paso 3: Ajustar los Estilos CSS (`style.css`)
Si deseas que la imagen cubra todo el fondo de la tarjeta o esté centrada, añade estas reglas al final de `style.css` o dentro de la sección de valores:

```css
/* Si agregas la etiqueta img dentro de la tarjeta */
.valor-icon-img {
    width: 80px;      /* Ajusta el tamaño de la imagen */
    height: auto;
    margin-bottom: 20px;
    align-self: flex-start;
}

/* Si prefieres usar la imagen como fondo completo de la tarjeta */
.valor-card-white.image-theme {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* Puedes remover el fondo blanco para que sea transparente */
    background-color: transparent; 
    border: none;
}
```
