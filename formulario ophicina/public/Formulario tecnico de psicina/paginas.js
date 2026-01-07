document.addEventListener('DOMContentLoaded', function() {
    var currentStep = 1; // Passo inicial
    var totalSteps = document.querySelectorAll('.step').length;
    var progressBar = document.getElementById('progress-bar');
    var progressPercentageText = document.getElementById('progress-percentage');

    function showStep(step) {
        // Esconde todos os passos
        document.querySelectorAll('.step').forEach(function(stepDiv) {
            stepDiv.classList.remove('active');
        });
        // Exibe o passo atual
        document.getElementById('step-' + step).classList.add('active');

        // Calcula e atualiza a barra de progresso e a porcentagem
        var progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressPercentageText.textContent = Math.round(progressPercentage) + '%';
    }

    function validateStep(step) {
        var isValid = true;
        var currentStepElement = document.getElementById('step-' + step);
        currentStepElement.querySelectorAll('input[required], textarea[required]').forEach(function(input) {
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    showStep(currentStep);

    document.querySelectorAll('.next-step').forEach(function(button) {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                if (currentStep > totalSteps) {
                    currentStep = totalSteps;
                }
                showStep(currentStep);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(function(button) {
        button.addEventListener('click', function() {
            currentStep--;
            if (currentStep < 1) {
                currentStep = 1;
            }
            showStep(currentStep);
        });
    });
});
