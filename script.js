document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        menu.setAttribute('aria-expanded', !isExpanded);

        // Toggle la classe pour l'animation
        menu.classList.toggle('active');
        });
});

document.addEventListener('click', function(e) {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
    }
});
