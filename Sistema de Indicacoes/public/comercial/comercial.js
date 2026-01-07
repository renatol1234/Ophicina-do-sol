import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const dashboardDiv = document.getElementById('dashboard');
const comercialDiv = document.getElementById('comercial1');
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

// Função para mostrar o conteúdo após login
function showContent(user) {
    // Verifica se o usuário é um admin ou comercial e exibe o dashboard correspondente
    if (adminIds.includes(user.uid) || commercialIds.includes(user.uid)) {
        comercialDiv.style.display = 'none';  // Esconde a área de login
        dashboardDiv.style.display = 'block';  // Exibe o dashboard
        localStorage.setItem('isLoggedIn', 'true');  // Marca o usuário como logado
    } else {
        console.log("Usuário não autorizado.");
    }
}

loginButton.addEventListener('click', () => {
    const email = document.getElementById('comercial-email').value;
    const password = document.getElementById('comercial-password').value;
    console.log("Tentando fazer login com:", email);
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log("Login bem-sucedido para o usuário:", user.uid);

            // Verifica se o usuário é autorizado
            if (adminIds.includes(user.uid) || commercialIds.includes(user.uid)) {
                showContent(user);  // Mostrar o conteúdo do dashboard
                alert("Bem Vindo.");
            } else {
                // Exibe um alerta se o usuário não for autorizado
                alert("Usuário não autorizado.");
            }
        })
        .catch(error => {
            console.error("Erro ao fazer login:", error);
            // Exibe um alerta se houver erro no login
            alert("Erro ao fazer login. Verifique suas credenciais.");
        });
});






// Evento de logout
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Redireciona para a página de login após o logout
        window.location.href = 'comercial.html';
    }).catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});

// Navegação para outras páginas
const confirmedIndicationsButton = document.getElementById('confirmed-indications-button');
const usersButton = document.getElementById('users-button');

confirmedIndicationsButton.addEventListener('click', () => {
    window.location.href = 'confirmadas.html';
});

usersButton.addEventListener('click', () => {
    window.location.href = 'usuarios.html';
});

back1Button.addEventListener('click', () => {
    window.location.href = '../index.html';
});


// Após confirmar a ID e antes de redirecionar para a página de usuários ou indicações confirmadas
localStorage.setItem('isLoggedIn', 'true');

