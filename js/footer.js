(function() {
    "use strict";

    const renderFooter = () => {
        const year = new Date().getFullYear();
        const footerHTML = `
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="footer-info">
                        <p>&copy; ${year} - Todos los derechos reservados.</p>
                        <p>Desarrollado con precisión técnica.</p>
                    </div>
                    <div class="footer-socials">
                        <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-github"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </footer>`;

        const body = document.body;
        if (body) {
            // Busca si ya existe un footer para no duplicar, si no, lo crea al final
            const existingFooter = document.getElementById('main-footer');
            if (existingFooter) {
                existing_footer.outerHTML = footerHTML;
            } else {
                body.insertAdjacentHTML('beforeend', footerHTML);
            }
        }
    };

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        renderFooter();
    } else {
        document.addEventListener('DOMContentLoaded', renderFooter);
    }
})();