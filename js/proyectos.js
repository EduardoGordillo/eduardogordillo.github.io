
/**
 * Archivo: js/proyectos.js
 * Descripción: Carga proyectos, genera las tarjetas dinámicamente y configura el carrusel interactivo.
 */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    let currentIndex = 0;
    const cardWidth = 380; // Ajusta según tu CSS (ancho de tarjeta + gap)

    // --- FUNCIÓN PRINCIPAL DE CARGA Y RENDERIZADO ---
    async function loadAndInitialize() {
        try {
            const response = await fetch('/data/projects.json');
            if (!response.ok) throw new Error("Error en la petición al archivo JSON");
            
            let text = await response.text();

            // Armadura: Limpieza de texto si viene con rutas de servidor local (src/data...)
            let cleanText = text;
            if (text.includes('src/data')) {
                const firstBracket = text.indexOf('[');
                const firstBrace = text.indexOf('{');
                const start = Math.min(firstBracket, firstBrace);
                if (start !== -1) {
                    cleanText = text.substring(start);
                }
            }

            const data = JSON.parse(cleanText.trim());
            console.log("Datos cargados con éxito:", data);

            // --- RENDERIZADO DINÁMICO ---
            // Limpiamos el track y añadimos las tarjetas del JSON
                        // --- RENDERIZADO DINÁMICO ---
            // Intentamos obtener el arreglo, ya sea que venga directo o dentro de un objeto
            let itemsToRender = [];
            if (Array.isArray(data)) {
                itemsToRender = data;
            } else if (typeof data === 'object' && data !== null) {
                // Si es un objeto, buscamos una propiedad que sea un arreglo (como "projects" o "data")
                // Esto evita el error .forEach si el JSON tiene estructura de objeto.
                itemsToRender = data.projects || data.data || Object.values(data).find(Array.isArray) || [];
            }

            if (track) {
                track.innerHTML = ''; // Limpiar contenido previo
                
                if (itemsToRender.length === 0) {
                    console.warn("No se encontraron proyectos para mostrar en el array.");
                }

                itemsToRender.forEach(project => {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    // Usamos condicionales básicos para evitar errores de "undefined" si faltan campos
                    const title = project.title || project.nombre || 'Sin título';
                    const desc = project.description || project.descripcion || '';
                    
                    card.innerHTML = `
                        <div class="card-content">
                            <h3>${title}</h3>
                            <p>${desc}</p>
                        </div>
                    `;
                    track.appendChild(card);
                });
            }

            // Una vez que las tarjetas están en el DOM, inicializamos los controles del carrusel
            initCarouselControls();

        } catch (error) {
            console.error("Error en loadAndInitialize:", error);
        }
    }

    // --- LÓGICA DE INTERACCIÓN DEL CARRUSEL ---
    function initCarouselControls() {
        const cards = document.querySelectorAll('.project-card');
        const totalCards = cards.length;
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');

        // Función para mover el track
        function updateCarousel() {
            if (track) {
                track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        }

        // Botón Siguiente
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalCards - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop infinito
                }
                updateCarousel();
            });
        }

        // Botón Anterior
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalCards - 1; // Loop infinito
                }
            updateCarousel();
            });
        }

        // Soporte para Swipes en dispositivos móviles
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        track.addEventListener('touchend', (e) => {
            let touchEndX = e.changedTouches[0].screenX;
            let diff = touchStartX - touchEndX;

            if (diff > 50) { // Deslizar a la izquierda
                if (currentIndex < totalCards - 1) currentIndex++;
                else currentIndex = 0;
            } else if (diff < -50) { // Deslizar a la derecha
                if (currentIndex > 0) currentIndex--;
                else currentIndex = totalCards - 1;
            }
            updateCarousel();
        }, false);

        // Ejecutar actualización inicial por si acaso
        updateCarousel();
    }

    // Iniciar el proceso
    loadAndInitialize();
});