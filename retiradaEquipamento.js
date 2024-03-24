document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentos();
    document.getElementById('filtroONT').addEventListener('change', filtrarEquipamentos);
    document.getElementById('filtroONU').addEventListener('change', filtrarEquipamentos);
});

function exibirEquipamentos() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const container = document.getElementById('equipamentosContainer');
    container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos cards

    equipamentos.forEach(function(equipamento) {
        // Somente exibe equipamentos que não foram marcados como retirados
        if (!equipamento.retirado) {
            const card = document.createElement('div');
            card.className = 'equipamento-card';
            card.innerHTML = `
                <h3>${equipamento.tipo} - ${equipamento.marca}</h3>
                <p>Modelo: ${equipamento.modelo}</p>
                <p>MAC: ${equipamento.mac}</p>
                <p>Código: ${equipamento.codigo}</p>
                <p>Tipo: ${equipamento.tipo}</p>
            `;

            const btnRetirar = document.createElement('button');
            btnRetirar.textContent = 'Retirar Equipamento';
            btnRetirar.className = 'btn-retirar';
            btnRetirar.addEventListener('click', function() {
                window.location.href = `RetiradaFormulario.html?mac=${equipamento.mac}&tipo=${equipamento.tipo}&codigo=${equipamento.codigo}&marca=${equipamento.marca}&modelo=${equipamento.modelo}`;

            });

            card.appendChild(btnRetirar);
            container.appendChild(card);
        }
    });
}

function filtrarEquipamentos() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const container = document.getElementById('equipamentosContainer');
    container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos cards

    const filtroONT = document.getElementById('filtroONT').checked;
    const filtroONU = document.getElementById('filtroONU').checked;

    equipamentos.forEach(function(equipamento) {
        // Somente exibe equipamentos que não foram marcados como retirados
        if (!equipamento.retirado && ((filtroONT && equipamento.tipo === 'ONT') || (filtroONU && equipamento.tipo === 'ONU'))) {
            const card = document.createElement('div');
            card.className = 'equipamento-card';
            card.innerHTML = `
                <h3>${equipamento.tipo} - ${equipamento.marca}</h3>
                <p>Modelo: ${equipamento.modelo}</p>
                <p>MAC: ${equipamento.mac}</p>
                <p>Código: ${equipamento.codigo}</p>
                <p>Tipo: ${equipamento.tipo}</p>
            `;

            const btnRetirar = document.createElement('button');
            btnRetirar.textContent = 'Retirar Equipamento';
            btnRetirar.className = 'btn-retirar';
            btnRetirar.addEventListener('click', function() {
                window.location.href = `RetiradaFormulario.html?mac=${equipamento.mac}&tipo=${equipamento.tipo}&codigo=${equipamento.codigo}&marca=${equipamento.marca}&modelo=${equipamento.modelo}&tipo=${equipamento.tipo}`;

            });

            card.appendChild(btnRetirar);
            container.appendChild(card);
        }
    });
}
