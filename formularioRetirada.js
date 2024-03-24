document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mac = urlParams.get('mac');
    const codigo = urlParams.get('codigo'); // Captura o código da URL
    const marca = urlParams.get('marca'); // Captura a marca da URL
    const modelo = urlParams.get('modelo'); // Captura o modelo da URL
    const tipo = urlParams.get('tipo'); // Captura o Tipo da URL
    preencherDadosFormulario(mac, codigo,marca, modelo, tipo);

    document.getElementById('btnEnviar').addEventListener('click', function() {
        console.log("Clicado!");
        const nomeCliente = document.getElementById('nomeCliente').value;
        const dataRetirada = document.getElementById('dataRetirada').value;

        const equipamentoRetirado = {
            mac,
            nomeCliente,
            tipo, // Inclui o Tipo
            dataRetirada,
            codigo,
            marca, // Inclui a marca
            modelo, // Inclui o modelo

        };

        let equipamentosRetirados = JSON.parse(localStorage.getItem('equipamentosRetirados')) || [];
        equipamentosRetirados.push(equipamentoRetirado);

        localStorage.setItem('equipamentosRetirados', JSON.stringify(equipamentosRetirados));

        marcarComoRetirado(mac); // Marca o equipamento como retirado

        window.location.href = 'EquipamentosRetirados.html';
    });
});

function preencherDadosFormulario(mac, codigo, marca, modelo, tipo) {
    // Você pode usar esta função para preencher automaticamente alguns campos no seu formulário,
    // se necessário, baseado nos dados do equipamento.
    console.log("Preenchendo o formulário para o equipamento com MAC:", mac, "Código:", codigo, "modelo:", modelo, "marca:", marca, "tipo:", tipo);
    document.getElementById('codigo').value = codigo;
    document.getElementById('tipo').value = tipo;
    document.getElementById('marca').value = marca;
    document.getElementById('modelo').value = modelo;
    // Implementação depende da sua aplicação...
}

function marcarComoRetirado(mac) {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentos = equipamentos.map(equipamento => {
        if (equipamento.mac === mac) {
            equipamento.retirado = true;
        }
        return equipamento;
    });

    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
}
