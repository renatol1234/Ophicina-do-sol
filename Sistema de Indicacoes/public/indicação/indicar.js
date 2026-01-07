import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, push, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const authDiv = document.getElementById('auth');
const contentDiv = document.getElementById('content');
const indicationFormDiv = document.getElementById('indication-form');
const indicationsListDiv = document.getElementById('indications-list');
const backButton = document.getElementById('back');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');
const googleLoginButton = document.getElementById('google-login');

const backToAuthButtons = document.querySelectorAll('#back-to-auth');
const userNameSpan = document.getElementById('user-name');
const indicateSomeoneButton = document.getElementById('indicate-someone');
const viewIndicationsButton = document.getElementById('view-indications');
const logoutButton = document.getElementById('logout');

const clientNameInput = document.getElementById('client-name');
const clientEmailInput = document.getElementById('client-email');
const clientPhoneInput = document.getElementById('client-phone');
const clientAddressInput = document.getElementById('client-address'); // Adicionado campo de endereço do cliente
const submitIndicationButton = document.getElementById('submit-indication');
const backToContentButton = document.getElementById('back-to-content');
const backToContentFromIndicationsButton = document.getElementById('back-to-content-from-indications');
const indicationsUl = document.getElementById('indications-ul');

// Novos elementos para seleção de serviços
const serviceTypeSelect = document.getElementById('service-type');
const service2TypeSelect = document.getElementById('service2-type');

// Funções de manipulação de exibição
function showAuth() {
    authDiv.style.display = 'block';
    contentDiv.style.display = 'none';
    indicationFormDiv.style.display = 'none';
    indicationsListDiv.style.display = 'none';
}

function showContent() {
    authDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    indicationFormDiv.style.display = 'none';
    indicationsListDiv.style.display = 'none';
}

function showIndicationForm() {
    contentDiv.style.display = 'none';
    indicationFormDiv.style.display = 'block';
}

function showIndicationsList() {
    contentDiv.style.display = 'none';
    indicationsListDiv.style.display = 'block';
}

// Função para limpar o formulário de indicação
function clearIndicationForm() {
    clientNameInput.value = '';
    clientEmailInput.value = '';
    clientPhoneInput.value = '';
    clientcepInput.value = '';
    clientAddressInput.value = ''; // Limpar campo de endereço do cliente
    serviceTypeSelect.value = '';
    service2TypeSelect.value = '';
}

// Event Listeners
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log('Usuário logado:', userCredential.user);
            const userId = userCredential.user.uid;
            get(child(ref(db), `users/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    userNameSpan.textContent = `${userData.firstName} ${userData.lastName}`;
                    showContent();
                } else {
                    console.error("Nenhum dado disponível");
                }
            }).catch((error) => {
                console.error("Erro ao buscar dados do usuário:", error);
            });
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
});



//loguin google

googleLoginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            console.log('Usuário logado com Google:', user);
            const userId = user.uid;

            get(child(ref(db), `users/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    userNameSpan.textContent = `${userData.firstName} ${userData.lastName}`;
                    showContent();  // Transição para a próxima tela após login
                } else {
                    console.error("Nenhum dado disponível para o usuário.");
                    // Se os dados do usuário não existem, pode-se criar um novo usuário no banco de dados aqui.
                    set(ref(db, `users/${userId}`), {
                        firstName: user.displayName.split(' ')[0],
                        lastName: user.displayName.split(' ').slice(1).join(' '),
                        email: user.email
                    }).then(() => {
                        userNameSpan.textContent = `${user.displayName}`;
                        showContent();  // Mostra o conteúdo após criar os dados do usuário
                    }).catch(error => {
                        console.error('Erro ao criar dados do usuário:', error);
                    });
                }
            }).catch((error) => {
                console.error("Erro ao buscar dados do usuário:", error);
            });
        })
        .catch(error => {
            console.error('Erro ao fazer login com Google:', error);
            alert('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
        });
});









logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Usuário deslogado');
        showAuth();
    }).catch(error => {
        console.error('Erro ao deslogar:', error);
    });
});

indicateSomeoneButton.addEventListener('click', showIndicationForm);

backToContentButton.addEventListener('click', showContent);
backToContentFromIndicationsButton.addEventListener('click', showContent);

clientPhoneInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/\D/g, '');
});

submitIndicationButton.addEventListener('click', () => {
    const clientName = clientNameInput.value;
    const clientEmail = clientEmailInput.value;
    const clientPhone = clientPhoneInput.value;
    const clientAddress = clientAddressInput.value; // Adicionado valor do campo de endereço do cliente
    const serviceType = serviceTypeSelect.value;
    const service2Type = service2TypeSelect.value;

    if (clientName === '' || clientEmail === '' || clientPhone === '' || clientAddress === '' || serviceType === '' || service2Type === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;
        const userIndicationsRef = ref(db, `users/${userId}/indications`);
        const newIndicationRef = push(userIndicationsRef);

        // Salva a indicação no Firebase
        set(newIndicationRef, {
            clientName,
            clientEmail,
            clientPhone,
            clientAddress, // Salvar campo de endereço do cliente
            serviceType,
            service2Type,
            timestamp: Date.now()
        }).then(() => {
            // Gera um link único com o ID da indicação
            const indicationId = newIndicationRef.key; // Pega o ID correto
            const encodedMessage = encodeURIComponent(`Parabéns, você foi indicado por ${userNameSpan.textContent}. Clique no link e confirme seu interesse: https://indica-ophicina.web.app/indicado/indicado.html?userId=${userId}&indicationId=${indicationId}`);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${clientPhone}&text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
            clearIndicationForm();
            showContent();
        }).catch((error) => {
            console.error("Erro ao salvar indicação:", error);
        });
    }
});

viewIndicationsButton.addEventListener('click', () => {
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;
        const userIndicationsRef = ref(db, `users/${userId}/indications`);

        onValue(userIndicationsRef, (snapshot) => {
            indicationsUl.innerHTML = '';

            snapshot.forEach((childSnapshot) => {
                const indication = childSnapshot.val();
                const li = document.createElement('li');

                // Usando innerHTML para permitir quebras de linha
                li.innerHTML = `Nome: ${indication.clientName}<br>
                                Email: ${indication.clientEmail}<br>
                                Telefone: ${indication.clientPhone}<br>
                                Endereço: ${indication.clientAddress}<br>
                                Serviços: ${indication.serviceType}, ${indication.service2Type}<br>
                                Status: ${indication.status}<br>
                                Comisão: ${indication.commission}<br><br>`;

                indicationsUl.appendChild(li);
            });

            showIndicationsList();
        }, {
            onlyOnce: true
        });
    }
});

// Verificação de autenticação ao carregar a página
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuário autenticado:', user);
        const userId = user.uid;
        get(child(ref(db), `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                userNameSpan.textContent = `${userData.firstName} ${userData.lastName}`;
                showContent();
            } else {
                console.error("Nenhum dado disponível");
            }
        }).catch((error) => {
            console.error("Erro ao buscar dados do usuário:", error);
        });
    } else {
        console.log('Nenhum usuário autenticado.');
        showAuth();
    }
});

// Adiciona evento ao botão de voltar
if (backButton) {
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html'; // Redireciona para index.html
    });
}

// endereço

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('client-address');
    const resultadoDiv = document.getElementById('resultado');

    cepInput.addEventListener('input', async function() {
        // Máscara de CEP
        let valor = cepInput.value;
        valor = valor.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (valor.length > 5) {
            valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
        }

        cepInput.value = valor;

        // Limpeza e busca de endereço
        const cep = valor.replace(/\D/g, ''); // Remove hífen para buscar o CEP

        if (cep.length === 8) {
            try {
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dados = await resposta.json();

                if (dados.erro) {
                    resultadoDiv.innerHTML = '<p class="error">CEP não encontrado.</p>';
                    enderecoInput.value = '';
                } else {
                    enderecoInput.value = `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`;
                    resultadoDiv.innerHTML = '';
                }
            } catch (erro) {
                resultadoDiv.innerHTML = '<p class="error">Erro ao buscar o endereço.</p>';
                enderecoInput.value = '';
            }
        } else {
            enderecoInput.value = '';
            resultadoDiv.innerHTML = '';
        }
    });
});
