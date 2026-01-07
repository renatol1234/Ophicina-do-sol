// Inicialização do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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

const userSelect = document.getElementById('user-select');
const userDetailsDiv = document.getElementById('user-details');
const indicationsListDiv = document.getElementById('indications-list');
const searchUserInput = document.getElementById('search-user');
const saveButton = document.getElementById('save-indications'); // Botão Salvar
const userSuggestions = document.getElementById('user-suggestions');

let usersData = {};
let currentUserId = null; // Para acompanhar o usuário atualmente selecionado
let indicationsToUpdate = {}; // Para armazenar as indicações que serão editadas

// Carregar todos os usuários no select e no objeto usersData
function viewAllUsers() {
    const usersRef = ref(db, 'users');
    get(usersRef).then(snapshot => {
        if (snapshot.exists()) {
            usersData = snapshot.val();
            userSelect.innerHTML = '<option value="">Selecione um usuário</option>';
            for (const userId in usersData) {
                const user = usersData[userId];
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

// Filtra usuários pelo nome digitado e exibe a lista suspensa de sugestões
function filterUsersByName(query) {
    const filteredUsers = {};
    for (const userId in usersData) {
        const user = usersData[userId];
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        if (fullName.includes(query.toLowerCase())) {
            filteredUsers[userId] = user;
        }
    }
    displaySuggestions(filteredUsers);
}

// Exibe a lista suspensa com os nomes dos usuários filtrados
function displaySuggestions(users) {
    userSuggestions.innerHTML = ''; // Limpa as sugestões anteriores
    if (Object.keys(users).length > 0) {
        userSuggestions.style.display = 'block';
        for (const userId in users) {
            const user = users[userId];
            const li = document.createElement('li');
            li.textContent = `${user.firstName} ${user.lastName}`;
            li.setAttribute('data-user-id', userId);
            li.addEventListener('click', () => {
                searchUserInput.value = li.textContent;
                viewUserDetails(userId);
                userSuggestions.style.display = 'none'; // Esconde a lista suspensa após a seleção
            });
            userSuggestions.appendChild(li);
        }
    } else {
        userSuggestions.style.display = 'none'; // Esconde a lista suspensa se não houver resultados
    }
}

// Exibe detalhes do usuário selecionado
function viewUserDetails(userId) {
    currentUserId = userId;
    indicationsToUpdate = {}; // Reinicia as indicações a serem atualizadas
    const userRef = ref(db, `users/${userId}`);
    get(userRef).then(snapshot => {
        if (snapshot.exists()) {
            const user = snapshot.val();
            userDetailsDiv.innerHTML = `
                <p>Nome: ${user.firstName} ${user.lastName}</p>
                <p>Email: ${user.email}</p>
                <p>Endereço: ${user.address}</p>
                <p>Telefone: ${user.phone}</p>
                <p>Pix: ${user.pix}</p>
                <button id="delete-user" data-user-id="${userId}">Excluir Usuário</button>
            `;

            document.getElementById('delete-user').addEventListener('click', (event) => {
                const userId = event.target.getAttribute('data-user-id');
                deleteUser(userId);
            });

            viewUserIndications(userId); // Chama a função para ver as indicações do usuário
        } else {
            userDetailsDiv.innerHTML = '<p>Usuário não encontrado.</p>';
        }
    }).catch(error => {
        console.error(error);
    });
}

// Exibe as indicações do usuário
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
                    <p>Endereço: ${indication.clientAddress}</p>
                    <p>Serviço: ${indication.serviceType}</p>                
                    <p>Serviço 2: ${indication.service2Type}</p>
                    <p>Status: ${indication.status}</p>


                    <p>Status: <input type="text" class="edit-status" value="${indication.status}" data-indication-id="${indicationId}"></p>
                    <p>Comissão: <input type="text" class="edit-commission" value="${indication.commission}" data-indication-id="${indicationId}"></p>
                    <hr><br><p>
                `;
                indicationsListDiv.appendChild(indicationItem);
            }

            saveButton.style.display = 'block'; // Mostra o botão Salvar
        } else {
            indicationsListDiv.innerHTML = '<p>Sem indicações para este usuário.</p>';
            saveButton.style.display = 'none'; // Esconde o botão Salvar se não houver indicações
        }
    }).catch(error => {
        console.error(error);
    });
}

// Salva as alterações nas indicações
function saveIndications() {
    const statusInputs = document.querySelectorAll('.edit-status');
    const commissionInputs = document.querySelectorAll('.edit-commission');

    statusInputs.forEach(input => {
        const indicationId = input.getAttribute('data-indication-id');
        const newStatus = input.value;
        if (indicationsToUpdate[indicationId]) {
            indicationsToUpdate[indicationId].status = newStatus;
        } else {
            indicationsToUpdate[indicationId] = { status: newStatus };
        }
    });

    commissionInputs.forEach(input => {
        const indicationId = input.getAttribute('data-indication-id');
        const newCommission = input.value;
        if (indicationsToUpdate[indicationId]) {
            indicationsToUpdate[indicationId].commission = newCommission;
        } else {
            indicationsToUpdate[indicationId] = { commission: newCommission };
        }
    });

    for (const indicationId in indicationsToUpdate) {
        const indicationRef = ref(db, `users/${currentUserId}/indications/${indicationId}`);
        update(indicationRef, indicationsToUpdate[indicationId]).then(() => {
            console.log(`Indicação ${indicationId} atualizada com sucesso.`);
        }).catch(error => {
            console.error('Erro ao atualizar indicação:', error);
        });
    }

    alert('Indicações atualizadas com sucesso!');
    viewUserIndications(currentUserId); // Atualiza a lista de indicações após salvar
}

// Exclui um usuário
function deleteUser(userId) {
    const userRef = ref(db, `users/${userId}`);
    remove(userRef).then(() => {
        alert('Usuário excluído com sucesso!');
        userSelect.value = ''; // Restaura o select para a opção padrão
        userDetailsDiv.innerHTML = '';
        indicationsListDiv.innerHTML = ''; // Limpa a lista de indicações
        saveButton.style.display = 'none'; // Esconde o botão Salvar após excluir o usuário
        viewAllUsers(); // Atualiza a lista de usuários
    }).catch(error => {
        console.error('Erro ao excluir usuário:', error);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    viewAllUsers();

    searchUserInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        if (query.length > 0) {
            filterUsersByName(query);
        } else {
            userSuggestions.style.display = 'none'; // Esconde a lista suspensa se o campo de busca estiver vazio
        }
    });

    userSelect.addEventListener('change', (event) => {
        const userId = event.target.value;
        if (userId) {
            viewUserDetails(userId);
        } else {
            userDetailsDiv.innerHTML = '';
            indicationsListDiv.innerHTML = ''; // Limpa as indicações se nenhum usuário estiver selecionado
            saveButton.style.display = 'none'; // Esconde o botão Salvar se nenhum usuário estiver selecionado
        }
    });

    saveButton.addEventListener('click', saveIndications);
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
