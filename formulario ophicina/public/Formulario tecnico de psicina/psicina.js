// Função para formatar a data no padrão DD-MM-YYYY
function formatDateForFilename(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Função para formatar a data no padrão DD/MM/YYYY
function formatDateToBR(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para definir a data atual no campo de texto
function setCurrentDate() {
    const dateField = document.getElementById('data');
    const today = new Date();
    const formattedDate = formatDateToBR(today);
    dateField.value = formattedDate;
}

// Função para salvar a página preenchida como PDF
async function submitForm() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Captura o conteúdo da página
    html2canvas(document.body).then(canvas => {
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

        const input = document.getElementById('upload');
        const files = Array.from(input.files);

        if (files.length > 0) {
            let loadedImagesCount = 0;

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgData = e.target.result;
                    doc.addPage();
                    doc.addImage(imgData, 'JPEG', 10, 10, 190, 0);

                    loadedImagesCount++;

                    if (loadedImagesCount === files.length) {
                        const today = new Date();
                        const formattedDate = formatDateForFilename(today);
                        const filename = `Formulario-Psicina-${formattedDate}.pdf`;

                        doc.save(filename);
                        resetForm(); // Limpa o formulário após o salvamento
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            const today = new Date();
            const formattedDate = formatDateForFilename(today);
            const filename = `formulario-Psicina-${formattedDate}.pdf`;

            doc.save(filename);
            resetForm(); // Limpa o formulário após o salvamento
        }
    }).catch(error => {
        console.error('Erro ao capturar a página:', error);
    });
}

// Função para pré-visualizar e excluir imagens
document.getElementById('upload').addEventListener('change', function() {
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    let files = Array.from(this.files);

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
                imgContainer.remove();
                updateFileList(files);
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

// Função para limpar o formulário, o "local storage" e a seleção de imagem
function resetForm() {
    // Limpa os campos de entrada do formulário
    document.getElementById('formulario').reset();

    // Limpa a visualização de imagens
    document.getElementById('image-preview').innerHTML = '';

    // Limpa o local storage
    localStorage.clear();

    // Remove a seleção de imagem
    document.getElementById('upload').value = '';

    // Redefine a data atual no campo de texto
    setCurrentDate();
}

// Configurar a data ao carregar a página
window.onload = setCurrentDate;

// Adiciona um listener para o botão
document.getElementById('submit-form').addEventListener('click', submitForm);

// Adiciona um listener para o botão de reset
document.getElementById('reset-form').addEventListener('click', resetForm);
