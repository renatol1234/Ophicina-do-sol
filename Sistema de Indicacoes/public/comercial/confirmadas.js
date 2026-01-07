import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpnbHSDF5_XpGcKMBQ1XRCy4Yxatzh6vQ",
    authDomain: "indica-ophicina.firebaseapp.com",
    databaseURL: "https://indica-ophicina-default-rtdb.firebaseio.com",
    projectId: "indica-ophicina",
    storageBucket: "indica-ophicina.appspot.com",
    messagingSenderId: "419496512361",
    appId: "1:419496512361:web:14c9a4a3e8072093f64bf8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const indicationsListDiv = document.getElementById('indications-list');

function viewConfirmedIndications() {
    const indicationsRef = ref(db, 'indicated');
    get(indicationsRef).then(snapshot => {
        if (snapshot.exists()) {
            const indications = snapshot.val();
            indicationsListDiv.innerHTML = '';
            for (const indicationId in indications) {
                const indication = indications[indicationId];
                const indicationItem = document.createElement('div');
                indicationItem.innerHTML = `
                    <p>Nome do Indicado: ${indication.clientName}</p>
                    <p>Telefone: ${indication.clientPhone}</p>
                    <p>Email: ${indication.clientEmail}</p>
                    <p>Endereço: ${indication.clientAddress}</p>
                    <p>Serviço: ${indication.serviceType}</p>
                    <p>Serviço 2: ${indication.service2Type}</p>
                    <p>Indicação: ${indication.referrerName}</p>
                    <p>Status: ${indication.status}</p>
                    <button class="edit-confirmed-indication" data-indication-id="${indicationId}">Editar</button>
                    <br><hr><br></p>
                `;
                indicationsListDiv.appendChild(indicationItem);
            }

            const editConfirmedButtons = document.querySelectorAll('.edit-confirmed-indication');
            editConfirmedButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const indicationId = event.target.getAttribute('data-indication-id');
                    editConfirmedIndication(indicationId);
                });
            });
        } else {
            indicationsListDiv.innerHTML = '<p>Não há indicações confirmadas.</p>';
        }
    }).catch(error => {
        console.error(error);
    });
}

function editConfirmedIndication(indicationId) {
    const indicationRef = ref(db, `indicated/${indicationId}`);
    get(indicationRef).then(snapshot => {
        if (snapshot.exists()) {
            const indication = snapshot.val();
            const editFormDiv = document.createElement('div');
            editFormDiv.innerHTML = `
                <h3>Editar Indicação Confirmada</h3>
                <p>Nome do Indicado: ${indication.clientName}</p>
                <p>Telefone do Indicado: ${indication.clientPhone}</p>
                <p>Email: ${indication.clientEmail}</p>
                <select id="edit-confirmed-status">
                    <option value="Não Respondido" ${indication.status === "Não Respondido" ? "selected" : ""}>Não Respondido</option>
                    <option value="Respondido" ${indication.status === "Respondido" ? "selected" : ""}>Respondido</option>
                </select>
                <button id="submit-confirmed-edit" data-indication-id="${indicationId}">Salvar</button>
            `;
            indicationsListDiv.innerHTML = '';
            indicationsListDiv.appendChild(editFormDiv);

            document.getElementById('submit-confirmed-edit').addEventListener('click', (event) => {
                const updatedStatus = document.getElementById('edit-confirmed-status').value;
                const indicationId = event.target.getAttribute('data-indication-id');
                const updateRef = ref(db, `indicated/${indicationId}`);

                update(updateRef, {
                    status: updatedStatus
                }).then(() => {
                    alert('Indicação atualizada com sucesso!');
                    viewConfirmedIndications();
                }).catch(error => {
                    console.error(error);
                });
            });
        }
    }).catch(error => {
        console.error(error);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    viewConfirmedIndications();
});



// Verificar o Status de Login na Página

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; // Redireciona para a página de login se o usuário não estiver logado
    } else {
        viewAllUsers(); // Continua com a carga da página se o usuário estiver logado
    }

    // Resto do código permanece igual
});
