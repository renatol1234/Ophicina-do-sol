import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";




// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBlkEl5W51LVg780B6mPXn8TYICypOQ0MM",

    authDomain: "formulario-ophicina.firebaseapp.com",
  
    databaseURL: "https://formulario-ophicina-default-rtdb.firebaseio.com",
  
    projectId: "formulario-ophicina",
  
    storageBucket: "formulario-ophicina.appspot.com",
  
    messagingSenderId: "59141028634",
  
    appId: "1:59141028634:web:0a40dba85362976e724aa3"
  
};







// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Evento de clique no botão "Salvar e Enviar"
document.getElementById('submit-form').addEventListener('click', function() {
    // Coletando os valores dos campos do formulário
    const cliente = document.getElementById('cliente').value || '';
    const telefone = document.getElementById('telefone').value || '';
    const cep = document.getElementById('cep').value || '';
    const endereco = document.getElementById('endereco').value || '';
    const numero = document.getElementById('numero').value || '';
    const cidadeUf = document.getElementById('cidade-uf').value || '';
    const email = document.getElementById('email').value || '';
    const geometriaPiscina = document.querySelector('input[name="geometria-psicina"]:checked')?.value || '';
    const temperatura = document.getElementById('temperatura').value || '';

    // Logging para verificar os valores
    console.log("Dados coletados:", {
        cliente,
        telefone,
        cep,
        endereco,
        numero,
        cidadeUf,
        email,
        geometriaPiscina,
        temperatura
    });

    // Criando um objeto com os dados do formulário
    const dadosFormulario = {
        cliente: cliente,
        telefone: telefone,
        cep: cep,
        endereco: endereco,
        numero: numero,
        cidadeUf: cidadeUf,
        email: email,
        geometriaPiscina: geometriaPiscina,
        temperatura: temperatura,
        // ... adicione os outros campos aqui ...
    };

    // Salvando no Firebase
    const novaChave = database.ref().child('formularios').push().key;
    database.ref('formularios/' + novaChave).set(dadosFormulario)
        .then(() => {
            console.log('Dados salvos com sucesso!');
            alert('Dados salvos com sucesso!');
        })
        .catch((error) => {
            console.error('Falha ao salvar os dados:', error.message);
            alert('Falha ao salvar os dados: ' + error.message);
        });
});
