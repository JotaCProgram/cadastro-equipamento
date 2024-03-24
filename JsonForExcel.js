document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const jsonFileInput = document.getElementById('jsonFileInput');
    const fileInfo = document.getElementById('fileInfo'); // Elemento para mostrar o nome do arquivo ou mensagem
    document.getElementById('convertToJson').addEventListener('click', convertJsonToExcel);

    
    dropArea.addEventListener('click', () => jsonFileInput.click());

    dropArea.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
        dropArea.classList.add('drag-over');
    });

    dropArea.addEventListener('dragleave', (e) => {
        e.stopPropagation();
        e.preventDefault();
        dropArea.classList.remove('drag-over');
    });

    dropArea.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
        dropArea.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    });

    jsonFileInput.addEventListener('change', () => {
        const file = jsonFileInput.files[0];
        handleFileSelect(file);
    });

    function handleFileSelect(file) {
        if (!file) return;

        // Atualizando o elemento com o nome do arquivo ou uma mensagem
        fileInfo.textContent = `Arquivo Adicionado: ${file.name}`;

        const reader = new FileReader();

        reader.onload = (e) => {
            window.jsonData = JSON.parse(e.target.result);
            // Aqui você pode adicionar lógica adicional para lidar com os dados JSON
        };

        reader.readAsText(file);
    }
    function convertJsonToExcel() {
        // Verifica se há dados para converter
        if (!window.jsonData || window.jsonData.length === 0) {
            alert("Nenhum dado JSON para converter!");
            return;
        }
    
        // Utiliza SheetJS para converter JSON para uma planilha Excel
        const worksheet = XLSX.utils.json_to_sheet(window.jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
    
        // Gera o arquivo Excel e faz o download
        XLSX.writeFile(workbook, "DadosConvertidos.xlsx");
    }

});