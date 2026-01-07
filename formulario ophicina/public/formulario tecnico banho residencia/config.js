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
