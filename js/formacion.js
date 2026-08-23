document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('evolution-track');

    async function loadEvolution() {
        const response = await fetch('/data/formacion.json');
        const data = await response.json();

        track.innerHTML = data.evolution_data.map(item => {
            const sideClass = item.side === 'left' ? 'left-side' : 'right-side';
            
            return `
                <div class="evolution-item">
                    <!-- Lado Izquierdo -->
                    <div class="content-box ${sideClass}">
                        <div class="period-badge">${item.period}</div>
                        <h3 class="main-title">${item.title}</h3>
                    </div>

                    <!-- Centro (Círculo con Icono) -->
                    <div class="node-circle">
                        <i class="icon-form"><img src="${item.icon}" alt="${item.icon}"></i>
                    </div>

                    <!-- Lado Derecho (Detalles) -->
                    <div class="content-box ${item.side === 'right' ? 'right-side' : 'left-side'}">
                        <ul class="detail-list">
                            ${item.details.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadEvolution();
});