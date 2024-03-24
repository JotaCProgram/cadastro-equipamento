document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentos();
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
            `;

            const btnRetirar = document.createElement('button');
            btnRetirar.textContent = 'Retirar Equipamento';
            btnRetirar.className = 'btn-retirar';
            btnRetirar.addEventListener('click', function() {
                window.location.href = `/CadastroONT/RETIRADAS DE EQUIPAMENTOS/FORMULARIO RETIRADA/RetiradaFormulario.html?mac=${equipamento.mac}&codigo=${equipamento.codigo}&marca=${equipamento.marca}&modelo=${equipamento.modelo}`;

            });

            card.appendChild(btnRetirar);
            container.appendChild(card);
        }
    });
}
