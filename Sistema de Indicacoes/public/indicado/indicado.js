import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5oBTLCMZXbCIXMd_5UF3KmGLQ_aIo2Ns",
    authDomain: "formulario-d2bcb.firebaseapp.com",
    databaseURL: "https://formulario-d2bcb-default-rtdb.firebaseio.com",
    projectId: "formulario-d2bcb",
    storageBucket: "formulario-d2bcb.appspot.com",
    messagingSenderId: "959056580875",
    appId: "1:959056580875:web:a7247c18cccfc4acd5520e"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// Função para obter parâmetros da URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        userId: params.get('userId'),
        indicationId: params.get('indicationId')
    };
}

// Carregar dados do indicado
async function loadIndicatedData() {
    const { userId, indicationId } = getQueryParams();

    if (!userId || !indicationId) {
        console.error('IDs do usuário ou indicação não fornecidos na URL.');
        return;
    }

    // Referência para os dados da indicação
    const indicationRef = ref(db, `users/${userId}/indications/${indicationId}`);

    try {
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

// Atualizar dados do indicado no Firebase
function updateIndicatedData() {
    const { userId, indicationId } = getQueryParams();

    if (!userId || !indicationId) {
        alert('IDs do usuário ou indicação não fornecidos.');
        return;
    }

    const clientName = document.getElementById('indicated-first-name').value;
    const clientPhone = document.getElementById('indicated-phone').value;
    const endereco = document.getElementById('indicated-endereco').value;
    const clientEmail = document.getElementById('indicated-email').value;
    const service1 = document.getElementById('service-type').value;
    const service2 = document.getElementById('service2-type').value;
    const referrerName = document.getElementById('referrer-name').value;

    // Nova referência para o caminho 'indicated'
    const indicatedRef = ref(db, `indicated/${indicationId}`);

    update(indicatedRef, {
        clientName,
        clientPhone,
        clientAddress: endereco,
        clientEmail,
        serviceType: service1,
        service2Type: service2,
        referrerName,
        status: 'confirmado' // exemplo de status após confirmação
    }).then(() => {
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


    }).catch((error) => {
        console.error('Erro ao atualizar dados do indicado:', error);
    });
}

// Adiciona evento ao botão
document.getElementById('submit-indicated').addEventListener('click', updateIndicatedData);

// Carregar dados quando a página for carregada
document.addEventListener('DOMContentLoaded', loadIndicatedData);


