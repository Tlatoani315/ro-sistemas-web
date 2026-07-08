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

    // 6. Carrusel Auto-ejecutable Infinito Constante de Servicios Especializados (Drag, Touch & Scroll-Optimized)
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

        const serviceCards = document.querySelectorAll('.service-card');
        
        let scrollSpeed = 0.6; // Desplazamiento ultra suave por frame
        let isDown = false;
        let startX;
        let scrollLeftVal;
        let isInteracting = false;
        let resumeTimeout = null;
        let selectedTimeout = null;

        // Bucle de animación para auto-scroll
        const autoScroll = () => {
            if (!isInteracting && !isDown) {
                servicesWrapper.scrollLeft += scrollSpeed;
            }
            requestAnimationFrame(autoScroll);
        };

        // Iniciar auto-scroll
        requestAnimationFrame(autoScroll);

        // Control de límites infinito en scroll
        const handleScrollBounds = () => {
            const firstCard = serviceCards[0];
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // Gap en CSS
            const totalOriginalWidth = originalCount * (cardWidth + gap);

            if (servicesWrapper.scrollLeft >= totalOriginalWidth) {
                servicesWrapper.scrollLeft -= totalOriginalWidth;
            } else if (servicesWrapper.scrollLeft <= 0) {
                servicesWrapper.scrollLeft += totalOriginalWidth;
            }
        };

        servicesWrapper.addEventListener('scroll', handleScrollBounds);

        // Reanudar el auto-scroll
        const resumeAutoScroll = () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                isInteracting = false;
                // Quitar estados de selección
                serviceCards.forEach(card => card.classList.remove('selected'));
            }, 2500);
        };

        // 1. Eventos de Mouse (Arrastrar con clic)
        servicesWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            isInteracting = true;
            clearTimeout(resumeTimeout);
            startX = e.pageX - servicesWrapper.offsetLeft;
            scrollLeftVal = servicesWrapper.scrollLeft;
        });

        servicesWrapper.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                resumeAutoScroll();
            }
        });

        servicesWrapper.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                resumeAutoScroll();
            }
        });

        servicesWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - servicesWrapper.offsetLeft;
            const walk = (x - startX) * 1.5; // Multiplicador de arrastre
            servicesWrapper.scrollLeft = scrollLeftVal - walk;
        });

        // 2. Eventos Táctiles (Swipe en móviles)
        servicesWrapper.addEventListener('touchstart', () => {
            isInteracting = true;
            clearTimeout(resumeTimeout);
        });

        servicesWrapper.addEventListener('touchend', () => {
            resumeAutoScroll();
        });

        // 3. Pausar en Hover (Escritorio)
        servicesWrapper.addEventListener('mouseenter', () => {
            isInteracting = true;
            clearTimeout(resumeTimeout);
        });

        servicesWrapper.addEventListener('mouseleave', () => {
            if (!isDown) {
                isInteracting = false;
            }
        });

        // 4. Interacción al hacer clic/foco en las tarjetas
        const handleCardInteraction = (activeCard) => {
            isInteracting = true;
            clearTimeout(resumeTimeout);
            clearTimeout(selectedTimeout);

            // Quitar clase selected previa
            serviceCards.forEach(card => card.classList.remove('selected'));

            // Agregar clase selected a la tarjeta actual y a su clon
            activeCard.classList.add('selected');
            const cardArray = Array.from(serviceCards);
            const index = cardArray.indexOf(activeCard);
            const baseIndex = index % originalCount;
            
            cardArray[baseIndex].classList.add('selected');
            cardArray[baseIndex + originalCount].classList.add('selected');

            // Temporizador para quitar la selección y reanudar
            selectedTimeout = setTimeout(() => {
                serviceCards.forEach(card => card.classList.remove('selected'));
                isInteracting = false;
            }, 3000);
        };

        serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                handleCardInteraction(card);
            });

            card.addEventListener('focus', () => {
                handleCardInteraction(card);
            });
        });

        // Clic fuera para cancelar selección
        document.addEventListener('click', () => {
            serviceCards.forEach(card => card.classList.remove('selected'));
            if (isInteracting && !isDown) {
                isInteracting = false;
            }
        });
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
