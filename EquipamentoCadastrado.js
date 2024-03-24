document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentos();
    document.getElementById('btnAdicionar').addEventListener('click', adicionarEquipamento);
    document.getElementById('btnBuscar').addEventListener('click', buscarPorCodigo);
    document.getElementById('downloadData').addEventListener('click', downloadDados);
    document.getElementById('btnLimpar').addEventListener('click', limparArmazenamento);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado.');
    // Verifica se o elemento existe antes de tentar adicionar o event listener
    const downloadBtn = document.getElementById('downloadData');
    if (downloadBtn) {
        console.log('Botão de download encontrado.');
        downloadBtn.addEventListener('click', downloadDados);
    } else {
        console.log('Botão de download NÃO encontrado.');
    }
});

function downloadDados() {
    var equipamentos = JSON.parse(localStorage.getItem('equipamentos'));

    // Verifica se há equipamentos não retirados
    var equipamentosNaoRetirados = equipamentos.filter(function(equipamento) {
        return !equipamento.retirado;
    });

    if (equipamentosNaoRetirados.length === 0) {
        alert("Não há equipamentos não cadastrados para baixar.");
        return;
    }

    // Cria um JSON com os equipamentos não retirados
    var dados = JSON.stringify(equipamentosNaoRetirados, null, 2);

    // Cria um blob com os dados
    var blob = new Blob([dados], { type: 'application/json' });

    // Cria uma URL para o blob
    var url = URL.createObjectURL(blob);

    // Cria um elemento <a> temporário para realizar o download
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'dadosEquipamentos.json'; // Define o nome do arquivo para download

    // Adiciona o elemento <a> ao body, dispara o clique (iniciando o download) e depois remove o elemento
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); // Libera a URL do blob
    document.body.removeChild(a);
}



function adicionarEquipamento() {
    const tipo = document.getElementById('tipo').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const mac = document.getElementById('mac').value;
    const codigo = document.getElementById('codigo').value;
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    if (equipamentos.some(equip => equip.mac === mac)) {
        alert('Um equipamento com este MAC já existe!');
        return;
    }

    equipamentos.push({ tipo, marca, modelo, mac, codigo, retirado: false });
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    exibirEquipamentos(); // Atualiza a lista após adicionar um novo equipamento
}
function exibirEquipamentos() {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    equipamentos
        .filter(equipamento => !equipamento.retirado && (
            (!document.getElementById('filtroONT').checked && !document.getElementById('filtroONU').checked) || // Se nenhum filtro estiver selecionado
            (document.getElementById('filtroONT').checked && equipamento.tipo === 'ONT') || // Se ONT está selecionado e o equipamento é do tipo ONT
            (document.getElementById('filtroONU').checked && equipamento.tipo === 'ONU') // Se ONU está selecionado e o equipamento é do tipo ONU
        ))
        .forEach(equipamento => {
            criarCardEquipamento(equipamento, cardsContainer);
        });
}

function filtrarEquipamentos() {
    exibirEquipamentos();
}



function criarCardEquipamento(equipamento, container) {
    const card = document.createElement('div');
    card.className = 'equipamento-card';
    card.innerHTML = `
        <h3>${equipamento.tipo} - ${equipamento.marca}</h3>
        <p>Modelo: ${equipamento.modelo}</p>
        <p>MAC: ${equipamento.mac}</p>
        <p>Código: ${equipamento.codigo}</p>
    `;

    /*const btnRetirar = document.createElement('button');
    btnRetirar.textContent = 'Retirar';
    btnRetirar.className = 'button retirar';
    btnRetirar.addEventListener('click', () => retirarEquipamento(equipamento.mac)); // Usar arrow function para simplificar
    card.appendChild(btnRetirar);*/

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'button editar';
    btnEditar.addEventListener('click', () => editarEquipamento(equipamento.mac)); // Usar arrow function para simplificar
    card.appendChild(btnEditar);

    container.appendChild(card);
}

function retirarEquipamento(mac) {
    marcarComoRetirado(mac);
}

function marcarComoRetirado(mac) {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentos = equipamentos.map(equipamento => equipamento.mac === mac ? { ...equipamento, retirado: true } : equipamento);
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    exibirEquipamentos(); // Recarrega a lista após atualização
}

function buscarPorCodigo() {
    const codigoPesquisa = document.getElementById('codigoPesquisa').value.trim();
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    let equipamentosFiltrados = equipamentos.filter(equipamento => equipamento.codigo.includes(codigoPesquisa) && !equipamento.retirado);
    if (equipamentosFiltrados.length) {
        equipamentosFiltrados.forEach(equipamento => criarCardEquipamento(equipamento, cardsContainer));
    } else {
        cardsContainer.innerHTML = '<p>Nenhum equipamento encontrado.</p>';
    }
}



function mostrarPopupErro() {
    const popup = document.getElementById('popupErro-Download');
    popup.classList.add('mostrar');
    setTimeout(() => {
        popup.classList.remove('mostrar');
        popup.style.display = 'none';
    }, 3000); // Exibe o popup de erro por 3 segundos
}

function limparArmazenamento() {
    if (confirm('Tem certeza que deseja limpar todo o armazenamento?')) {
        localStorage.clear();
        exibirEquipamentos(); // Recarrega a lista após limpar o armazenamento
    }
}

function editarEquipamento(mac) {
    window.location.href = `EditarEquipamento.html?mac=${mac}`;
}

// Removi a duplicação da função adicionarBotoesAcao que estava repetida no seu código.
// Isso garante que cada função esteja definida apenas uma vez, evitando confusão e possíveis erros de execução.

// Certifique-se de que todos os elementos mencionados, como 'btnLimpar', 'btnAdicionar', 'cardsContainer', etc.,
// existam no seu HTML para que o JavaScript possa interagir com eles corretamente.

// Além disso, ajustei a função mostrarPopupErro para garantir que o popup seja exibido corretamente e então escondido após 3 segundos.

// Nota: Esta revisão supõe que você tenha um elemento com id 'popupErro-Download' para mostrar erros de download.
// Se não for o caso, você precisará ajustar a função mostrarPopupErro para corresponder à sua estrutura HTML.

// Finalmente, a função de limpar o armazenamento agora pede confirmação antes de prosseguir, o que ajuda a prevenir a perda acidental de dados.
