import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Configuração do Firebase
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
const auth = getAuth(app);
const db = getDatabase(app);

// Elementos da página
const loginButton = document.getElementById('comercial-login');
const logoutButton = document.getElementById('logout');
const backButton = document.getElementById('back-to-users');
const confirmedButton = document.getElementById('view-confirmed-indications');
const dashboardDiv = document.getElementById('dashboard');
const comercialDiv = document.getElementById('comercial1');
const userSelect = document.getElementById('user-select');
const userDetailsDiv = document.getElementById('user-details');
const indicationsListDiv = document.getElementById('indications-list');
const back1Button = document.getElementById('back1');

// Variáveis de controle
const adminIds = ["ADMIN_ID_1", "tCqFCIIUYyYquPBV5yR0YU0jyfy1"];
const commercialIds = ["zZUHIP9wsKPeaoO3uSu5zPehwLw2", "COMMERCIAL_ID_2", "COMMERCIAL_ID_3"];

// Função para visualizar todos os usuários no select
function viewAllUsers() {
    const usersRef = ref(db, 'users');
    get(usersRef).then(snapshot => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            userSelect.innerHTML = '<option value="">Selecione um usuário</option>';
            for (const userId in users) {
                const user = users[userId];
                const option = document.createElement('option');
                option.value = userId;
                option.textContent = `${user.firstName} ${user.lastName}`;
                userSelect.appendChild(option);
            }
        }
    }).catch(error => {
        console.error(error);
    });
}

// Função para visualizar indicações de um usuário específico
function viewUserIndications(userId) {
    const userRef = ref(db, `users/${userId}/indications`);
    get(userRef).then(snapshot => {
        if (snapshot.exists()) {
            const indications = snapshot.val();
            indicationsListDiv.innerHTML = '';
            for (const indicationId in indications) {
                const indication = indications[indicationId];
                const indicationItem = document.createElement('div');
                indicationItem.innerHTML = `
                    <p>Nome do Indicado: ${indication.clientName}</p>
                    <p>Email: ${indication.clientEmail}</p>
                    <p>Telefone: ${indication.clientPhone}</p>
                    <p>Serviço: ${indication.serviceType}</p>
                    <p>Serviço 2: ${indication.service2Type}</p>
                    <p>Status: ${indication.status}</p>
                    <p>Comissão: ${indication.commission}</p>
                    <button class="edit-indication" data-user-id="${userId}" data-indication-id="${indicationId}">Editar</button>
                `;
                indicationsListDiv.appendChild(indicationItem);
            }

            // Adicionar event listeners para botões de editar
            const editButtons = document.querySelectorAll('.edit-indication');
            editButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const userId = event.target.getAttribute('data-user-id');
                    const indicationId = event.target.getAttribute('data-indication-id');
                    // Função para editar indicação
                    editIndication(userId, indicationId);
                });
            });

            userDetailsDiv.style.display = 'block';
        } else {
            indicationsListDiv.innerHTML = '<p>Não há indicações para este usuário.</p>';
        }
    }).catch(error => {
        console.error(error);
    });
}

// Função para visualizar indicações confirmadas
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
                    <p>________________________</p>
                `;
                indicationsListDiv.appendChild(indicationItem);
            }

            // Adicionar event listeners para botões de editar
            const editConfirmedButtons = document.querySelectorAll('.edit-confirmed-indication');
            editConfirmedButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const indicationId = event.target.getAttribute('data-indication-id');
                    // Função para editar indicação confirmada
                    editConfirmedIndication(indicationId);
                });
            });

            userDetailsDiv.style.display = 'block';
        } else {
            indicationsListDiv.innerHTML = '<p>Não há indicações confirmadas.</p>';
        }
    }).catch(error => {
        console.error(error);
    });
}

// Função para editar indicação
function editIndication(userId, indicationId) {
    const userRef = ref(db, `users/${userId}/indications/${indicationId}`);
    get(userRef).then(snapshot => {
        if (snapshot.exists()) {
            const indication = snapshot.val();
            const editFormDiv = document.createElement('div');
            editFormDiv.innerHTML = `
                <h3>Editar Indicação</h3>
                <p>Email do Indicado: ${indication.email}</p>
                <p>Telefone do Indicado: ${indication.phone}</p>
                <p>Serviço: ${indication.serviceType}</p>
                <input type="text" id="edit-status" placeholder="Status (Positivo/Negativo)" value="${indication.status || ''}">
                <input type="number" id="edit-commission" placeholder="Valor da Comissão" value="${indication.commission || ''}">
                <button id="submit-edit" data-user-id="${userId}" data-indication-id="${indicationId}">Salvar</button>
            `;
            indicationsListDiv.innerHTML = '';
            indicationsListDiv.appendChild(editFormDiv);

            document.getElementById('submit-edit').addEventListener('click', (event) => {
                const updatedStatus = document.getElementById('edit-status').value;
                const updatedCommission = document.getElementById('edit-commission').value;
                const userId = event.target.getAttribute('data-user-id');
                const indicationId = event.target.getAttribute('data-indication-id');
                const updateRef = ref(db, `users/${userId}/indications/${indicationId}`);

                update(updateRef, {
                    status: updatedStatus,
                    commission: updatedCommission
                }).then(() => {
                    alert('Indicação atualizada com sucesso!');
                    viewUserIndications(userId);
                }).catch(error => {
                    console.error(error);
                });
            });
        }
    }).catch(error => {
        console.error(error);
    });
}

// Função para editar indicação confirmada
function editConfirmedIndication(indicationId) {
    const indicationRef = ref(db, `indicated/${indicationId}`);
    get(indicationRef).then(snapshot => {
        if (snapshot.exists()) {
            const indication = snapshot.val();
            const editFormDiv = document.createElement('div');
            editFormDiv.innerHTML = `
                <h3>Editar Indicação Confirmada</h3>
                <p>Nome do Indicado: ${indication.firstName}</p>
                <p>Telefone do Indicado: ${indication.phone}</p>
                <p>Email: ${indication.email}</p>
                <p>Serviço: ${indication.serviceType}</p>
                <p>Indicação: ${indication.referrerName}</p>
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

// Função para exibir o conteúdo apropriado para o usuário
function showContent(user) {
    if (adminIds.includes(user.uid) || commercialIds.includes(user.uid)) {
        comercialDiv.style.display = 'none';
        dashboardDiv.style.display = 'block';
        viewAllUsers();
    } else {
        alert('Você não tem permissão para acessar esta área.');
    }
}

// Event listeners para navegação e autenticação
loginButton.addEventListener('click', () => {
    const email = document.getElementById('comercial-email').value;
    const password = document.getElementById('comercial-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            showContent(user);
        })
        .catch(error => {
            console.error(error);
        });
});

logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Redireciona para a página de login após o logout
        window.location.href = 'comercial.html';
    }).catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});

backButton.addEventListener('click', () => {
    userDetailsDiv.style.display = 'none';
    viewAllUsers();
});

confirmedButton.addEventListener('click', () => {
    viewConfirmedIndications();
});

userSelect.addEventListener('change', (event) => {
    const userId = event.target.value;
    if (userId) {
        viewUserIndications(userId);
    }
});

Button.addEventListener('click', () => {
    signOback1ut(auth).then(() => {
        // Redireciona para a página de login após o logout
        window.location.href = '../index.html';
    }).catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});




