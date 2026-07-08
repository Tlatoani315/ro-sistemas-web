/* ==========================================================================
   JAVASCRIPT - CAOMI / GRUPO RO+ (Raycast & AirPods Inspired)
   Manejo de interacciones, menú hamburguesa móvil, scroll y formulario.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const header = document.querySelector('.main-header');

    // 1. Menu Toggle Móvil
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
        
        // Animación de las barras del botón hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
                menuToggle.querySelectorAll('span').forEach(span => span.style.transform = 'none');
                menuToggle.querySelectorAll('span')[1].style.opacity = '1';
            }
        });
    });

    // 2. Efecto de Scroll en Header y Highlight de enlaces
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Añadir clase scrolled al header
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Destacar el enlace activo en base a la sección visible
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - parseInt(getComputedStyle(header).height) - 40;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Animación Scroll-Driven de Valores (Inspiración Curio)
    const valoresScrollSection = document.getElementById('valores-scroll');
    const valoresBgText = document.getElementById('valoresBgText');
    const valoresCardsContainer = document.getElementById('valoresCardsContainer');

    if (valoresScrollSection && valoresBgText && valoresCardsContainer) {
        const handleScrollAnimation = () => {
            // Desactivar en pantallas móviles para mejor accesibilidad y rendimiento
            if (window.innerWidth <= 768) {
                valoresBgText.style.transform = '';
                valoresBgText.style.opacity = '';
                valoresCardsContainer.style.transform = '';
                valoresCardsContainer.style.opacity = '';
                return;
            }

            const rect = valoresScrollSection.getBoundingClientRect();
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            
            // Distancia del scroll dentro de la sección
            const scrollTop = rect.top;
            const scrollRange = sectionHeight - viewportHeight;
            
            // Calcular progreso de 0 a 1
            let progress = -scrollTop / scrollRange;
            progress = Math.min(Math.max(0, progress), 1);

            // 1. Zoom y Opacidad del Texto "VALORES"
            const scale = 1 + (progress * 18); // Zoom masivo para "atravesar" las letras
            const textOpacity = Math.max(0, 1 - (progress * 2)); // Desvanecido rápido

            valoresBgText.style.transform = `scale(${scale}) rotate(-4deg)`;
            valoresBgText.style.opacity = textOpacity;

            // 2. Transición de aparición de los cuadros de valores
            // Comienzan al 15% del recorrido y se estabilizan al 70%
            let cardsProgress = (progress - 0.15) / 0.55;
            cardsProgress = Math.min(Math.max(0, cardsProgress), 1);

            valoresCardsContainer.style.opacity = cardsProgress;
            valoresCardsContainer.style.transform = `translateY(${(1 - cardsProgress) * 100}px)`;
        };

        // Listener optimizado con requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScrollAnimation();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('resize', handleScrollAnimation);
        
        // Estado inicial
        handleScrollAnimation();
    }

    // 5. Interacción Táctil para Tarjetas de Valores en Móviles
    const valorCards = document.querySelectorAll('.valor-card-white');
    valorCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            
            // Cerrar las otras tarjetas
            valorCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });

    // 6. Carrusel Auto-ejecutable Infinito Constante de Servicios Especializados (Estilo Premium)
    const servicesWrapper = document.querySelector('.services-carousel-wrapper');
    const servicesGrid = document.getElementById('servicesGrid');
    const initialCards = document.querySelectorAll('.service-card');

    if (servicesWrapper && servicesGrid && initialCards.length > 0) {
        const originalCount = initialCards.length;

        // Clonar las tarjetas originales y añadirlas al final de la pista para bucle infinito
        initialCards.forEach(card => {
            const clone = card.cloneNode(true);
            servicesGrid.appendChild(clone);
        });

        // Obtener el listado actualizado de tarjetas (originales + clones)
        const serviceCards = document.querySelectorAll('.service-card');

        let interactionTimeout = null;

        // Calcular el desplazamiento total necesario para el ciclo infinito (ancho de N tarjetas + gaps)
        const calculateScrollWidth = () => {
            const firstCard = serviceCards[0];
            if (!firstCard) return;
            
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // Igual al gap en CSS
            
            const scrollWidth = originalCount * (cardWidth + gap);
            // Fijar la propiedad CSS custom para la animación linear constante
            servicesGrid.style.setProperty('--scroll-width', `-${scrollWidth}px`);
        };

        // Escuchar clics y foco para detener la marcha y ampliar tarjeta
        const handleInteraction = (activeCard) => {
            clearTimeout(interactionTimeout);
            
            // Remover estado selected y pausado previo
            serviceCards.forEach(card => card.classList.remove('selected'));
            servicesGrid.classList.remove('paused');
            
            // Pausar el carrusel y ampliar la tarjeta seleccionada
            servicesGrid.classList.add('paused');
            activeCard.classList.add('selected');
            
            // Sincronizar el clon o el original correspondiente para coherencia visual
            const cardArray = Array.from(serviceCards);
            const index = cardArray.indexOf(activeCard);
            const baseIndex = index % originalCount;
            cardArray[baseIndex].classList.add('selected');
            cardArray[baseIndex + originalCount].classList.add('selected');

            // Reanudar la animación constante tras 2 segundos sin interactuar (2000ms)
            interactionTimeout = setTimeout(() => {
                servicesGrid.classList.remove('paused');
                serviceCards.forEach(card => card.classList.remove('selected'));
            }, 2000);
        };

        // Agregar listeners de clic y foco a todas las tarjetas
        serviceCards.forEach((card) => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                handleInteraction(card);
            });

            card.addEventListener('focus', () => {
                handleInteraction(card);
            });
        });

        // Permitir reanudación si hacen clic fuera de cualquier tarjeta
        document.addEventListener('click', () => {
            if (servicesGrid.classList.contains('paused')) {
                servicesGrid.classList.remove('paused');
                serviceCards.forEach(card => card.classList.remove('selected'));
            }
        });

        // Calcular ancho responsivo inicialmente y al redimensionar
        calculateScrollWidth();
        window.addEventListener('resize', calculateScrollWidth);
        
        // Ejecución diferida para asegurar la carga completa de estilos y anchos
        setTimeout(calculateScrollWidth, 150);
    }

    // 3. Validación y Envío del Formulario
    const contactForm = document.querySelector('form[name="contacto"]');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('telefono');
            
            // Validación de email
            if (emailInput && !emailInput.value.includes('@')) {
                e.preventDefault();
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Validación de teléfono si se ingresa
            if (phoneInput && phoneInput.value.trim() !== '') {
                const phoneClean = phoneInput.value.replace(/\D/g, '');
                if (phoneClean.length < 10) {
                    e.preventDefault();
                    alert('Por favor, ingresa un número telefónico de 10 dígitos.');
                    return;
                }
            }

            // Netlify Forms interceptará el POST automáticamente en producción.
            console.log('Formulario enviado de manera exitosa para Netlify Forms.');
        });
    }

    // 7. Acordeón del Catálogo de Productos (Interactivo)
    const accordionItems = document.querySelectorAll('.catalog-accordion .accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Si no tiene desplegable (categorías directas a contacto), salir
        if (!header || !content) return;

        header.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = item.classList.contains('active');

            // Cerrar todos los demás paneles para simular acordeón clásico
            accordionItems.forEach(otherItem => {
                const otherHeader = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');
                if (otherItem !== item && otherContent) {
                    otherItem.classList.remove('active', 'active-red');
                    otherContent.style.height = '0';
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Alternar el panel actual
            if (isActive) {
                item.classList.remove('active', 'active-red');
                content.style.height = '0';
                header.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                
                // Si la categoría tiene fondo rojo (Audio / Video), aplicar clase active-red para cambiar texto a blanco
                const panelColor = content.getAttribute('style') || '';
                if (panelColor.includes('#ff1744')) {
                    item.classList.add('active-red');
                }

                // Ajustar la altura al scrollHeight del elemento interno
                content.style.height = content.scrollHeight + 'px';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Ajustar alturas dinámicas de los acordeones abiertos al cambiar el tamaño de ventana
    window.addEventListener('resize', () => {
        accordionItems.forEach(item => {
            if (item.classList.contains('active')) {
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.height = 'auto';
                    const newHeight = content.scrollHeight;
                    content.style.height = newHeight + 'px';
                }
            }
        });
    });
});
