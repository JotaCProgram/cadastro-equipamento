document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentos();

    document.getElementById('btnAdicionar').addEventListener('click', adicionarEquipamento);
    document.getElementById('btnBuscar').addEventListener('click', buscarPorCodigo);
    document.getElementById('downloadData').addEventListener('click', downloadDados);
    document.getElementById('btnLimpar').addEventListener('click', limparArmazenamento);
});

function adicionarEquipamento() {
    const tipo = document.getElementById('tipo').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const mac = document.getElementById('mac').value;
    const codigo = document.getElementById('codigo').value;
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    if (equipamentos.some(equip => equip.mac === mac)) {
        alert('Um equipamento com este MAC já existe!');
        return;
    }

    equipamentos.push({ tipo, marca, modelo, mac, codigo, retirado: false });
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    exibirEquipamentos(); // Atualiza a lista após adicionar um novo equipamento
}

function exibirEquipamentos() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    equipamentos.filter(equipamento => !equipamento.retirado).forEach(equipamento => {
        criarCardEquipamento(equipamento, cardsContainer);
    });
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

    adicionarBotoesAcao(card, equipamento);
    container.appendChild(card);
}

function adicionarBotoesAcao(card, equipamento) {
    const btnRetirar = document.createElement('button');
    btnRetirar.textContent = 'Retirar';
    btnRetirar.className = 'button retirar';
    btnRetirar.addEventListener('click', function() { retirarEquipamento(equipamento.mac); });
    card.appendChild(btnRetirar);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'button editar';
    btnEditar.addEventListener('click', function() { editarEquipamento(equipamento.mac); });
    card.appendChild(btnEditar);
}

function retirarEquipamento(mac) {
    marcarComoRetirado(mac);
    exibirEquipamentos(); // Atualiza a lista após retirar um equipamento
}

function marcarComoRetirado(mac) {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentos = equipamentos.map(equipamento => {
        if (equipamento.mac === mac) {
            return { ...equipamento, retirado: true };
        }
        return equipamento;
    });

    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
}

// Exemplo de como chamar marcarComoRetirado após submissão do formulário
document.getElementById('formRetirada').addEventListener('submit', function(event) {
    event.preventDefault();
    const mac = new URLSearchParams(window.location.search).get('mac');
    marcarComoRetirado(mac);

    // Redirecionar ou mostrar mensagem de sucesso aqui
});


// Adiciona Botões de Ação (Editar e Retirar) ao Card
function adicionarBotoesAcao(card, equipamento) {
    // Botão Retirar
    var btnRetirar = document.createElement('button');
    btnRetirar.textContent = 'Retirar';
    btnRetirar.className = 'button retirar';
    btnRetirar.addEventListener('click', function() { retirarEquipamento(equipamento.id); });
    card.appendChild(btnRetirar);

    // Botão Editar
    var btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'button editar';
    btnEditar.addEventListener('click', function() { editarEquipamento(equipamento.id); });
    card.appendChild(btnEditar);
}

// Retirar Equipamento
function retirarEquipamento(equipamentoId) {
    var equipamentoIndex = equipamentos.findIndex(equipamento => equipamento.id === equipamentoId);
    
    if (equipamentoIndex !== -1) {
        equipamentos[equipamentoIndex].retirado = true; // Marca como retirado
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos)); // Atualiza o localStorage
        exibirEquipamentos(); // Atualiza a exibição
    } else {
        alert('Equipamento não encontrado.');
    }
}

// Buscar Equipamento por Código
function buscarPorCodigo() {
    var codigoPesquisa = document.getElementById('codigoPesquisa').value.trim();
    var cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Limpa os resultados anteriores

    var equipamentosFiltrados = codigoPesquisa ? 
        equipamentos.filter(equipamento => equipamento.codigo.includes(codigoPesquisa)) : equipamentos;

    if (equipamentosFiltrados.length) {
        equipamentosFiltrados.forEach(equipamento => criarCardEquipamento(equipamento, cardsContainer));
    } else {
        cardsContainer.innerHTML = '<p>Nenhum equipamento encontrado.</p>';
    }
}

// Função para Download dos Dados do Equipamento
function downloadDados() {
    var dados = localStorage.getItem('equipamentos');
    if (!dados) {
        mostrarPopupErro(); // Mostra um popup de erro se não houver dados
        return;
    }

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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadData').addEventListener('click', downloadDados);
});


// Função Editar Equipamento
function editarEquipamento(mac) {
    if(mac) {
        window.location.href = `/CadastroONT/EDITAR EQUIPAMENTO/EditarEquipamento.html?mac=${mac}`;
    } else {
        console.error('MAC é undefined');
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    exibirEquipamentos(); // Exibe os equipamentos ao carregar a página

    // Vincula o botão de download
    var btnDownload = document.getElementById('downloadData');
    if (btnDownload) {
        btnDownload.addEventListener('click', downloadDados);
    }

    // Vincula o botão para limpar armazenamento, se existir no seu HTML
    var btnLimpar = document.getElementById('limparStorage');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparArmazenamento);
    }
});


// Inicialização e Eventos
document.addEventListener('DOMContentLoaded', function() {
exibirEquipamentos(); // Carrega e exibe os equipamentos na inicialização
// Adiciona evento de clique ao botão de adicionar equipamento
document.getElementById('btnAdicionar').addEventListener('click', adicionarEquipamento);

// Adiciona evento de clique ao botão de busca
document.getElementById('btnBuscar').addEventListener('click', buscarPorCodigo);

// Adiciona evento de clique ao botão de download de dados
document.getElementById('downloadData').addEventListener('click', downloadDados);

// Adiciona evento de clique ao botão de limpar armazenamento
document.getElementById('btnLimpar').addEventListener('click', limparArmazenamento);
})

// Adiciona Botões de Ação (Editar e Retirar) ao Card
function adicionarBotoesAcao(card, equipamento) {
    // ... Código para o botão Retirar ...

    // Botão Editar
    var btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'button editar';
    btnEditar.addEventListener('click', function() { editarEquipamento(equipamento.mac); });
    card.appendChild(btnEditar);
}

// Popup Download
function mostrarPopupErro() {
    const popup = document.getElementById('popupErro-Download');
    popup.classList.add('mostrar');

    setTimeout(function() {
        popup.classList.add('esconder');

        // Limpar classes para permitir que a animação seja reexecutada no futuro
        setTimeout(() => {
            popup.classList.remove('mostrar', 'esconder');
            popup.style.display = 'none'; // Esconder o popup depois da animação
        }, 500); // Deve corresponder à duração da transição CSS

    }, 3000); // Tempo em milissegundos que o popup ficará visível
}
// Popup Download

// Popup ErroArmazenamento
function mostrarPopupErroArmazenamento() {
    const popup = document.getElementById('popupErro-Armazenamento');
    popup.classList.add('mostrar');

    setTimeout(function() {
        popup.classList.add('esconder');

        // Limpar classes para permitir que a animação seja reexecutada no futuro
        setTimeout(() => {
            popup.classList.remove('mostrar', 'esconder');
            popup.style.display = 'none'; // Esconder o popup depois da animação
        }, 500); // Deve corresponder à duração da transição CSS

    }, 3000); // Tempo em milissegundos que o popup ficará visível
}
// Popup ErroArmazenamento


// Popup SemDadosDeletar
function mostrarPopupArmazenamento() {
    const popup = document.getElementById('popupSucesso-Armazenamento');
    popup.classList.add('mostrar');

    setTimeout(function() {
        popup.classList.add('esconder');

        // Limpar classes para permitir que a animação seja reexecutada no futuro
        setTimeout(() => {
            popup.classList.remove('mostrar', 'esconder');
            popup.style.display = 'none'; // Esconder o popup depois da animação
        }, 500); // Deve corresponder à duração da transição CSS

    }, 3000); // Tempo em milissegundos que o popup ficará visível
}
// Popup ErroArmazenamento



// Função para exibir o popup
function mostrarPopupConfirmacao() {
    document.getElementById('popupConfirmacao').classList.replace('popup-confirmacao-escondido', 'popup-confirmacao-ativo');
}

// Função para esconder o popup
function esconderPopupConfirmacao() {
    document.getElementById('popupConfirmacao').classList.replace('popup-confirmacao-ativo', 'popup-confirmacao-escondido');
}

document.getElementById('btnConfirmar').addEventListener('click', function() {
    localStorage.clear(); // Limpa todo o armazenamento local
    mostrarPopupArmazenamento(); // Supondo que essa função exiba algum feedback ao usuário
    esconderPopupConfirmacao(); // Esconde o popup

    // Aguarda 2 segundos antes de recarregar a página
    setTimeout(function() {
        window.location.reload(); // Recarrega a página para refletir as mudanças
    }, 2000); // Atraso de 2000 milissegundos (2 segundos)
});

// Adicionando evento ao botão Cancelar no popup
document.getElementById('btnCancelar').addEventListener('click', function() {
    mostrarPopupErroArmazenamento(); // Exibe o popup de erro de armazenamento
    esconderPopupConfirmacao(); // Esconde o popup
});

// Modificando o evento onclick do botão "Limpar Armazenamento" para mostrar o popup de confirmação
document.getElementById('clearStorage').addEventListener('click', mostrarPopupConfirmacao);


