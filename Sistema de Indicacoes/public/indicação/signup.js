import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const phoneInput = document.getElementById('phone'); // Novo campo de telefone
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const cpfInput = document.getElementById('cpf');
const addressInput = document.getElementById('address');
const pixInput = document.getElementById('pix');
const submitSignupButton = document.getElementById('submit-signup');
const backToAuthButton = document.getElementById('back-to-auth');

// Event Listeners
submitSignupButton.addEventListener('click', () => {
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const phone = phoneInput.value; // Captura o valor do telefone
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value; // Captura o valor da senha corretamente
    const cpf = cpfInput.value;
    const address = addressInput.value;
    const pix = pixInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('Usuário cadastrado:', user);

            set(ref(db, 'users/' + user.uid), {
                firstName,
                lastName,
                phone, // Salva o telefone no banco de dados
                email,
                cpf,
                address,
                pix
            }).then(() => {
                window.location.href = 'indicar.html';
            });
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
        });
});

backToAuthButton.addEventListener('click', () => {
    window.location.href = 'indicar.html';
});



// endereço cadastro

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('address');
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



// verificar senhas 

// Seleciona os elementos do DOM

const signupPasswordRepeatInput = document.getElementById('signup-password-repeat');
const passwordErrorDiv = document.getElementById('password-error');

// Função para verificar se as senhas coincidem
function checkPasswordsMatch() {
    const password = signupPasswordInput.value.trim();
    const passwordRepeat = signupPasswordRepeatInput.value.trim();

    if (password && passwordRepeat) { // Verifica se ambos os campos têm valor
        if (password !== passwordRepeat) {
            passwordErrorDiv.textContent = 'As senhas não coincidem.';
        } else {
            passwordErrorDiv.textContent = ''; // Limpa a mensagem de erro
        }
    } else {
        passwordErrorDiv.textContent = ''; // Limpa a mensagem de erro se algum campo estiver vazio
    }
}

// Adiciona event listeners para verificar senhas em tempo real
signupPasswordInput.addEventListener('input', checkPasswordsMatch);
signupPasswordRepeatInput.addEventListener('input', checkPasswordsMatch);



// icone da senha

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('signup-password');
    const passwordRepeatInput = document.getElementById('signup-password-repeat');
    const passwordToggle = document.getElementById('password-toggle');
    const repeatPasswordToggle = document.getElementById('repeat-password-toggle');
    const passwordError = document.getElementById('password-error');

    function togglePasswordVisibility(input, toggleIcon) {
        if (input.type === 'password') {
            input.type = 'text';
            toggleIcon.textContent = '🙈 Ocultar senha'; // Ícone de olho fechado
        } else {
            input.type = 'password';
            toggleIcon.textContent = '👁️ Visualizar senha'; // Ícone de olho aberto
        }
    }

    passwordToggle.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, passwordToggle);
    });

    repeatPasswordToggle.addEventListener('click', function() {
        togglePasswordVisibility(passwordRepeatInput, repeatPasswordToggle);
    });

    // Opcional: Verifique se as senhas correspondem e exiba uma mensagem de erro
    document.getElementById('signup-password-repeat').addEventListener('input', function() {
        if (passwordInput.value !== passwordRepeatInput.value) {
            passwordError.textContent = 'As senhas não coincidem.';
        } else {
            passwordError.textContent = '';
        }
    });
});



// verificar email

firebase.auth().fetchSignInMethodsForEmail(email)
  .then((signInMethods) => {
    if (signInMethods.length > 0) {
      // O email já está cadastrado
      console.log("Este email já está em uso.");
    } else {
      // Prosseguir com o cadastro
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
          // Cadastro bem-sucedido
          console.log("Usuário cadastrado com sucesso:", userCredential);
        })
        .catch((error) => {
          // Tratar erros
          console.error("Erro ao cadastrar usuário:", error);
        });
    }
  })
  .catch((error) => {
    console.error("Erro ao verificar email:", error);
  });



  