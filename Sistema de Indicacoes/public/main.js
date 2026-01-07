// Espera o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o botão com o ID 'indicate'
    const indicateButton = document.getElementById('indicate');
    // Verifica se o botão existe antes de adicionar o evento
    if (indicateButton) {
      // Adiciona o evento de clique para redirecionar o usuário para 'indicado.html'
      indicateButton.addEventListener('click', function () {
        window.location.href = 'https://ophicinadosol.com.br/';
      });
    }
  
    // Seleciona o botão com o ID 'indicar'
    const indicarButton = document.getElementById('indicar');
    // Verifica se o botão existe antes de adicionar o evento
    if (indicarButton) {
      // Adiciona o evento de clique para redirecionar o usuário para 'indicar.html'
      indicarButton.addEventListener('click', function () {
        window.location.href = './indicação/indicar.html';
      });
    }
  
    // Seleciona o botão com o ID 'comercial'
    const comercialButton = document.getElementById('comercial');
    // Verifica se o botão existe antes de adicionar o evento
    if (comercialButton) {
      // Adiciona o evento de clique para redirecionar o usuário para 'comercial.html'
      comercialButton.addEventListener('click', function () {
        window.location.href = './comercial/comercial.html';
      });
    }
  });
  