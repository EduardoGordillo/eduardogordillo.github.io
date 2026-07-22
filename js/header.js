/**
 * Nuevo Header - Estructura Limpia con Link de Inicio
 */

const initHeader = () => {
    const target = document.getElementById('main-header');
    if (!target) return;

    // Se añade el <a> envolviendo tanto la imagen como el texto del logo
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
                    <nav class="nav-menu">
                        <a href="/screens/proyectos.html" class="nav-link">Proyectos</a>
                        <a href="/screens/formacion.html" class="nav-link">Formación</a>
                        <a href="/screens/contacto.html" class="nav-link">Contacto</a>
                    </nav>
                </div>
            </div>
        </header>
    `;

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


