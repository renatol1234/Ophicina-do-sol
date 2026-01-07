document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('final-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Obter todos os dados do formulário
            const formData = new FormData(document.getElementById('formulario'));
            
            // Converter os dados do formulário para um objeto
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            });

            // Salvar o objeto no localStorage
            localStorage.setItem('formData', JSON.stringify(data));
            
            // Redirecionar para o banho2.html
            window.location.href = 'banho2.html';
        });
    }

    // Funções para mostrar campos adicionais
    const toggleFields = [
        { checkboxId: 'pontos-consumo-outros', inputId: 'pontos-consumo-outros-input' },
        { checkboxId: 'caracteristicas-consumo-outros', inputId: 'caracteristicas-consumo-outros-input' },
        { checkboxId: 'orientacao-outros', inputId: 'orientacao-outros-input' },
        { checkboxId: 'equipamento-apoio-outros', inputId: 'equipamento-apoio-outros-input' },
        { checkboxId: 'combustivel-outros', inputId: 'combustivel-outros-input' }
    ];

    toggleFields.forEach(field => {
        const checkbox = document.getElementById(field.checkboxId);
        const inputField = document.getElementById(field.inputId);
        if (checkbox && inputField) {
            checkbox.addEventListener('change', function() {
                inputField.style.display = checkbox.checked ? 'block' : 'none';
            });
        }
    });

    // Inicializar o campo de upload de imagens
    const uploadInput = document.getElementById('upload');
    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            const files = this.files;
            const imagePreview = document.getElementById('image-preview');
            if (imagePreview) {
                imagePreview.innerHTML = ''; // Limpar preview anterior
                Array.from(files).forEach(function(file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.width = 100;
                        img.height = 100;
                        img.style.margin = '5px';
                        imagePreview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    // Mostrar data atual
    const dateInput = document.getElementById('data');
    if (dateInput) {
        dateInput.value = new Date().toLocaleDateString();
    }
});
