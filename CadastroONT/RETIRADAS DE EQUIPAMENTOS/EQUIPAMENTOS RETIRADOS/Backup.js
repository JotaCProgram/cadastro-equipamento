document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentosRetirados();

    document.getElementById('downloadData').addEventListener('click', baixarDadosRetirados);

    document.getElementById('executeCommand').addEventListener('click', function() {
        const comando = document.getElementById('commandInput').value;
        if (comando === '#Deletar') {
            removerEquipamentosRetirados();
            exibirEquipamentosRetirados(); // Atualiza a exibição após remover os itens
        }
    });
});

function removerEquipamentosRetirados() {
    // Recupera a lista de todos os equipamentos
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    // Filtra a lista para manter apenas os que não estão marcados como retirados
    equipamentos = equipamentos.filter(equipamento => !equipamento.retirado);
    // Atualiza o localStorage com a nova lista filtrada
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    // Opcionalmente, se você mantém uma lista separada de equipamentos retirados e quer limpar totalmente
    localStorage.removeItem('equipamentosRetirados');
}

function exibirEquipamentosRetirados() {
    let equipamentosRetirados = JSON.parse(localStorage.getItem('equipamentosRetirados')) || [];
    let container = document.getElementById('equipamentosRetiradosContainer');
    container.innerHTML = '';

    equipamentosRetirados.forEach(equipamento => {
        let card = document.createElement('div');
        card.className = 'equipamento-card';
        card.innerHTML = `<h3>${equipamento.nomeCliente}</h3>
                          <p>TIPO: ${equipamento.tipo}</p>
                          <p>MAC: ${equipamento.mac}</p>
                          <p>Marca: ${equipamento.marca}</p>
                          <p>Modelo: ${equipamento.modelo}</p>
                          <p>Código: ${equipamento.codigo}</p>
                          <p>Data: ${equipamento.dataRetirada}</p>`;
        container.appendChild(card);
    });
}


function baixarDadosRetirados() {
    let dados = localStorage.getItem('equipamentosRetirados');
    if (!dados) {
        alert('Não há dados para download.');
        return;
    }
    let blob = new Blob([dados], {type: 'application/json'});
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'equipamentosRetirados.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); // Libera a URL do blob
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function() {
    // O resto do seu código para exibir equipamentos retirados...

    // Adiciona evento de clique ao botão para redirecionar para jsonforexcel.html
    document.getElementById('goToJsonForExcel').addEventListener('click', function() {
        window.location.href = '/CadastroONT/RETIRADAS DE EQUIPAMENTOS/Json para Excel/jsonforexcel.html'; // Atualize o caminho conforme necessário
    });
});
