// Função para formatar a data no padrão DD-MM-YYYY
function formatDateForFilename(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Função para definir a data atual no campo de texto
function setCurrentDate() {
    const dateField = document.getElementById('data');
    if (dateField) { // Verificação se o elemento existe
        const today = new Date();
        const formattedDate = formatDateToBR(today);
        dateField.value = formattedDate;
    } else {
        console.error("Elemento com ID 'data' não encontrado.");
    }
}

// Função para formatar a data no padrão DD/MM/YYYY
function formatDateToBR(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para salvar a página preenchida como PDF
async function submitForm() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Captura o conteúdo da página
    try {
        const canvas = await html2canvas(document.body);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Adiciona imagens selecionadas
        const input = document.getElementById('upload');
        const files = input.files;

        if (files.length > 0) {
            let loadedImagesCount = 0;

            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgData = e.target.result;
                    doc.addPage();
                    doc.addImage(imgData, 'JPEG', 10, 10, 190, 0);

                    loadedImagesCount++;

                    if (loadedImagesCount === files.length) {
                        const today = new Date();
                        const formattedDate = formatDateForFilename(today);
                        const filename = `Formulario-Banho-${formattedDate}.pdf`;
                        doc.save(filename);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        } else {
            const today = new Date();
            const formattedDate = formatDateForFilename(today);
            const filename = `formulario_Banho-${formattedDate}.pdf`;
            doc.save(filename);
        }
    } catch (error) {
        console.error('Erro ao capturar a página:', error);
    }

    localStorage.clear();
}

// Função para pré-visualizar e excluir imagens
document.getElementById('upload').addEventListener('change', function() {
    const preview = document.getElementById('image-preview');
    preview.innerHTML = ''; // Limpa o preview ao selecionar novas imagens
    const files = Array.from(this.files);

    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.classList.add('remove-image');
            removeButton.onclick = function() {
                files.splice(index, 1);
                imgContainer.remove(); // Remove o contêiner da visualização
                updateFileList(files); // Atualiza a lista de arquivos
            };

            imgContainer.appendChild(img);
            imgContainer.appendChild(removeButton);
            preview.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
});

// Função para atualizar a lista de arquivos no input
function updateFileList(files) {
    const dataTransfer = new DataTransfer();
    files.forEach(file => {
        dataTransfer.items.add(file);
    });
    document.getElementById('upload').files = dataTransfer.files;
}

// Configurar a data ao carregar a página
window.onload = setCurrentDate;

// Adiciona um listener para o botão
document.getElementById('submit-form').addEventListener('click', submitForm);
