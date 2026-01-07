// Bloquear o botão direito do mouse
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Bloquear as teclas Ctrl e Ctrl+Shift
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
});
