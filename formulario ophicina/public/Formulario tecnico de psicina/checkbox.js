
document.addEventListener('DOMContentLoaded', function() {
    // Função para mostrar/esconder campos de texto baseados em checkboxes
    function toggleCheckboxInput(checkboxId, inputId) {
        const checkbox = document.getElementById(checkboxId);
        const input = document.getElementById(inputId);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                input.classList.remove('hidden');
            } else {
                input.classList.add('hidden');
            }
        });
    }

    // Função para mostrar/esconder campos de texto baseados em radio buttons
    function toggleRadioFields(radioName, valueToShow, fieldsId) {
        const radios = document.getElementsByName(radioName);
        const fields = document.getElementById(fieldsId);

        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === valueToShow && this.checked) {
                    fields.classList.remove('hidden');
                } else {
                    fields.classList.add('hidden');
                }
            });
        });
    }

    // Aplicação - Outros
    toggleCheckboxInput('aplicacao-outros', 'aplicacao-outros-input');

    // Possui Sistema
    toggleRadioFields('possui-sistema', 'sim', 'possui-sistema-fields');


    // Orientação de Instalação - Outros
    toggleCheckboxInput('orientacao-outros', 'orientacao-outros-input');

    // Filtro
    toggleRadioFields('filtro', 'sim', 'filtro-sim-fields');

    // Bomba Filtragem
    toggleRadioFields('bomba-filtragem', 'sim', 'bomba-filtragem-sim-fields');

    // Tipo de Cobertura - Outros
    toggleCheckboxInput('tipo-cobertura-outros', 'tipo-cobertura-outros-input');

    // Equipamento de Apoio - Outros
    toggleCheckboxInput('equipamento-apoio-outros', 'equipamento-apoio-outros-input');

    // Combustível - Outros
    toggleCheckboxInput('combustivel-outros', 'combustivel-outros-input');
});



document.addEventListener('DOMContentLoaded', function () {
    const capaTermicaSim = document.getElementById('capa-termica-sim');
    const capaTermicaNao = document.getElementById('capa-termica-nao');
    const capaTermicaFields = document.getElementById('capa-termica-fields');
    const capaTermicaOutrosCheckbox = document.getElementById('capa-termica-outros');
    const capaTermicaOutrosInput = document.getElementById('capa-termica-outros-input');

    // Função para mostrar ou esconder os campos adicionais
    function toggleCapaTermicaFields() {
        if (capaTermicaSim.checked) {
            capaTermicaFields.classList.remove('hidden');
        } else {
            capaTermicaFields.classList.add('hidden');
            resetCheckboxesAndInputs();
        }
    }

    // Função para mostrar ou esconder o campo de texto 'Outros'
    function toggleOutrosInput() {
        if (capaTermicaOutrosCheckbox.checked) {
            capaTermicaOutrosInput.classList.remove('hidden');
        } else {
            capaTermicaOutrosInput.classList.add('hidden');
        }
    }

    // Reseta checkboxes e campos de entrada quando "Não" é selecionado
    function resetCheckboxesAndInputs() {
        const checkboxes = capaTermicaFields.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        capaTermicaOutrosInput.value = '';
        capaTermicaOutrosInput.classList.add('hidden');
    }

    // Adiciona os event listeners
    capaTermicaSim.addEventListener('change', toggleCapaTermicaFields);
    capaTermicaNao.addEventListener('change', toggleCapaTermicaFields);
    capaTermicaOutrosCheckbox.addEventListener('change', toggleOutrosInput);

    // Inicializa os campos baseados no estado atual dos radio buttons
    toggleCapaTermicaFields();
});
