/**
 * Nuevo Header - Estructura Limpia con Link de Inicio
 */

const initHeader = () => {
    const target = document.getElementById('main-header');
    if (!target) return;

    // Se añade el <a> envolviendo tanto la imagen como el texto del logo
   // ... existentes (inicio del archivo)
    const headerHTML = `
        <header class="main-site-header">
            <div class="container">
                <div class="header-top">
                    <a href="/" class="logo-link">
                        <div class="logo">
                            <img src="/img/index/logo-G.png" alt="Logo">
                            <div class="logo-text">
                                <span class="name">Eduardo Gordillo</span>
                                <span class="role">Developer | Data Scientist | Data Analyst</span>
                            </div>
                        </div>
                    </a>
                    <!-- Agregamos un botón de menú para móviles -->
                    <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
                        <span class="hamburger"></span>
                    </button>
                    <nav class="nav-menu">
                        <a href="/screens/proyectos.html" class="nav-link">Proyectos</a>
                        <a href="/screens/formacion.html" class="nav-link">Formación</a>
                        <a href="/screens/contacto.html" class="nav-link">Contacto</a>
                    </nav>
                </div>
            </div>
        </header>
    `;
// ... resto del archivo sigue igual

    target.innerHTML = headerHTML;

    setTimeout(() => {
        console.log("Header inyectado con éxito");
    }, 100);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}

// ... después de inyectar el header en el DOM ...

// Aseguramos que el evento se ejecute solo cuando el DOM esté listo y el botón exista
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'active' que el CSS usa para mostrar el menú
            navMenu.classList.toggle('active');
            
            // Opcional: Cambiar atributo para accesibilidad
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }
});
