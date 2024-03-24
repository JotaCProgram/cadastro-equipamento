function atualizarModelos() {
    var marca = document.getElementById("marca").value;
    var modelos = document.getElementById("modelo");
    modelos.innerHTML = "<option value=''>Selecione</option>"; // Assegura que a opção padrão está sempre presente

    // Mapeamento de marca para modelos
    var opcoesModelos = {
        "TENDA": ["HG7c", "HG9", "HG15"],
        "INTELBRAS": ["AC1200R"],
        "TP-LINK": ["XC220-G3V", "XC220-G3"]
    };

    if(marca in opcoesModelos) {
        opcoesModelos[marca].forEach(function(modelo){
            var option = document.createElement("option");
            option.value = modelo;
            option.text = modelo;
            modelos.appendChild(option);
        });
    }

    // Garante que a imagem padrão seja exibida ao mudar a marca
    atualizarImagem();
}

function atualizarImagem() {
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var imagemProduto = document.getElementById("imagemProduto");
    var caminhoImagem = "/" + marca + "-" + modelo + ".png";

    if (marca && modelo) {
        imagemProduto.src = caminhoImagem;
    } else {
        // Caminho da imagem padrão
        imagemProduto.src = "imagem_padrao.png";
    }

    imagemProduto.alt = marca && modelo ? "Imagem de " + marca + " " + modelo : "Imagem padrão do produto";
    imagemProduto.style.display = "block";

    // Reinicia a animação removendo e adicionando a classe
    imagemProduto.classList.remove("animate-image");
    // Forçar reflow/repaint para a nova animação iniciar
    void imagemProduto.offsetWidth;
    imagemProduto.classList.add("animate-image");
}

document.getElementById('formCadastroONT').onsubmit = function(e) {
    e.preventDefault();

    var equipamento = {
        tipo: document.getElementById('tipo').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        mac: document.getElementById('mac').value,
        codigo: document.getElementById('codigo').value
    };

    // Recupere a lista atual de equipamentos ou inicie uma nova
    var equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentos.push(equipamento);
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    // Redirecione para a página de equipamentos retirados
    window.location.href = 'EquipamentoCadastrados.html';
};