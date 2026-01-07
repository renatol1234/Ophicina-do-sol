import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBpnbHSDF5_XpGcKMBQ1XRCy4Yxatzh6vQ",
    authDomain: "indica-ophicina.firebaseapp.com",
    databaseURL: "https://indica-ophicina-default-rtdb.firebaseio.com",
    projectId: "indica-ophicina",
    storageBucket: "indica-ophicina.appspot.com",
    messagingSenderId: "419496512361",
    appId: "1:419496512361:web:14c9a4a3e8072093f64bf8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para obter parâmetros da URL
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const indicationId = urlParams.get('indicationId');
    return { userId, indicationId };
}

// Função para carregar dados do indicado e do indicador
async function loadIndicatedData() {
    const { userId, indicationId } = getQueryParams();

    if (!userId || !indicationId) {
        console.error('IDs do usuário ou indicação não fornecidos.');
        return;
    }

    try {
        // Referência para os dados da indicação
        const indicationRef = ref(db, `users/${userId}/indications/${indicationId}`);
        const snapshot = await get(indicationRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('indicated-first-name').value = data.clientName || '';
            document.getElementById('indicated-phone').value = data.clientPhone || '';
            document.getElementById('indicated-endereco').value = data.clientAddress || '';
            document.getElementById('indicated-email').value = data.clientEmail || '';
            document.getElementById('service-type').value = data.serviceType || '';
            document.getElementById('service2-type').value = data.service2Type || '';

            // Buscar o nome do indicador
            const userRef = ref(db, `users/${userId}`);
            const userSnapshot = await get(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                const referrerFirstName = userData.firstName || '';
                document.getElementById('referrer-name').value = referrerFirstName;
            } else {
                console.error('Dados do usuário não encontrados.');
            }
        } else {
            console.error('Dados da indicação não encontrados.');
        }
    } catch (error) {
        console.error('Erro ao carregar dados do indicado:', error);
    }
}

// Função para atualizar dados do indicado no Firebase
async function updateIndicatedData() {
    const { userId, indicationId } = getQueryParams();

    if (!userId || !indicationId) {
        alert('IDs do usuário ou indicação não fornecidos.');
        return;
    }

    // Verificar se os dados do indicador foram carregados
    const referrerName = document.getElementById('referrer-name').value;
    if (!referrerName) {
        alert('Nome do indicador não foi carregado corretamente.');
        return;
    }

    const clientName = document.getElementById('indicated-first-name').value;
    const clientPhone = document.getElementById('indicated-phone').value;
    const endereco = document.getElementById('indicated-endereco').value;
    const clientEmail = document.getElementById('indicated-email').value;
    const service1 = document.getElementById('service-type').value;
    const service2 = document.getElementById('service2-type').value;

    // Nova referência para o caminho 'indicated'
    const indicatedRef = ref(db, `indicated/${indicationId}`);

    try {
        await update(indicatedRef, {
            clientName,
            clientPhone,
            clientAddress: endereco,
            clientEmail,
            serviceType: service1,
            service2Type: service2,
            referrerName,
            status: 'confirmado' // exemplo de status após confirmação
        });

        alert('Dados confirmados com sucesso!');

        // Limpar campos
        document.getElementById('indicated-first-name').value = '';
        document.getElementById('indicated-phone').value = '';
        document.getElementById('indicated-endereco').value = '';
        document.getElementById('indicated-email').value = '';
        document.getElementById('service-type').value = '';
        document.getElementById('service2-type').value = '';
        document.getElementById('referrer-name').value = '';

        // Redirecionar para a página confirmed.html
        window.location.href = 'confirmed.html';
    } catch (error) {
        console.error('Erro ao atualizar dados do indicado:', error);
    }
}

// Adiciona evento ao botão
document.getElementById('submit-indicated').addEventListener('click', updateIndicatedData);

// Carregar dados quando a página for carregada
document.addEventListener('DOMContentLoaded', loadIndicatedData);
