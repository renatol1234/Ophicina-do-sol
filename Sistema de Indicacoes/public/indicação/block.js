// Bloquear o botão direito do mouse
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Bloquear as teclas Ctrl e Ctrl+Shift
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.key === "F12") {
        event.preventDefault();
    }
});



// script.js

document.addEventListener('scroll', () => {
    const footer = document.querySelector('.document-footer');
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});
