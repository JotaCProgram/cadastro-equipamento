
function obterMacDaUrl() {
    const parametrosUrl = new URLSearchParams(window.location.search);
    return parametrosUrl.get('mac');
}

function buscarEquipamentoPorMac(mac) {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    return equipamentos.find(equipamento => equipamento.mac === mac);
}

function preencherFormularioComDados(equipamento) {
    document.getElementById('marca').value = equipamento.marca || '';
    document.getElementById('modelo').value = equipamento.modelo || '';
    document.getElementById('mac').value = equipamento.mac || '';
    document.getElementById('codigo').value = equipamento.codigo || '';
}

function salvarAlteracoes() {
    const mac = obterMacDaUrl();
    if (!mac) {
        mostrarPopup('popupErro', 'Erro ao identificar o equipamento para salvar.');
        return;
    }

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const codigo = document.getElementById('codigo').value;

    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const index = equipamentos.findIndex(equip => equip.mac === mac);

    if (index !== -1) {
        equipamentos[index] = { ...equipamentos[index], marca, modelo, mac, codigo };
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
        mostrarPopup('popupSucesso', 'Alterações salvas com sucesso!');
    } else {
        mostrarPopup('popupErro', 'Equipamento não encontrado.');
    }
}


// Adicione esta função para lidar com a confirmação de deleção
function confirmarDeletar() {
    const mac = obterMacDaUrl();
    deletarEquipamento(mac);
    fecharPopup('popupConfirmarDeletar');
}
function deletarEquipamento(mac) {
    var equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    var index = equipamentos.findIndex(equip => equip.mac === mac);

    // A verificação é feita antes de tentar deletar o equipamento
    if (index !== -1) {
        equipamentos.splice(index, 1); // Remove o equipamento do array
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos)); // Atualiza o armazenamento

        // Já que o equipamento foi deletado com sucesso, mostramos o popup de sucesso
        mostrarPopup('popupSucesso', 'Equipamento deletado com sucesso!');
    } else {
        // Caso o equipamento com o MAC especificado não seja encontrado,
        // podemos mostrar um popup de erro ou simplesmente não fazer nada,
        // dependendo da lógica desejada.
        mostrarPopup('popupErro', 'Equipamento não encontrado.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const mac = obterMacDaUrl();

    if (mac) {
        const equipamento = buscarEquipamentoPorMac(mac);
        if (equipamento) {
            preencherFormularioComDados(equipamento);
        } else {
            mostrarPopup('popupErro', 'Equipamento não encontrado.');
        }
    }

    // Modifica aqui para prevenir o comportamento padrão
    document.getElementById('deleteEquipamento').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão, como a submissão do formulário
        mostrarPopup('popupConfirmarDeletar', ''); // Exibe o popup de confirmação
    });

    // Outros listeners...
});

// Continuação das funções...


function mostrarPopup(popupId, mensagem) {
    const popup = document.getElementById(popupId);
    if (popup) {
        // Se uma mensagem foi fornecida, atualiza o texto dentro do popup
        if (mensagem) {
            const msgContainer = popup.querySelector('.popup-conteudo p');
            if (msgContainer) msgContainer.textContent = mensagem;
        }
        popup.style.display = 'block';
    }

    // Fecha o popup automaticamente após 5 segundos se não for o de confirmação
    if (popupId !== 'popupConfirmarDeletar') {
        setTimeout(function() {
            popup.style.display = 'none';
        }, 5000);
    }
}

function fecharPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}
