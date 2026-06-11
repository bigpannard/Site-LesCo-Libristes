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


document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour filtrer les éléments du glossaire
    function filterGlossary() {
        const searchTerm = document.getElementById('glossary-search').value.trim().toLowerCase();
        const listItems = document.querySelectorAll('.content-grid-large li');
        const cards = document.querySelectorAll('.content-grid-large .card');

        // Si le champ est vide, réafficher tous les éléments
        if (searchTerm === '') {
            listItems.forEach(item => {
                item.style.display = '';
            });
            cards.forEach(card => {
                card.style.display = '';
            });
            return;
        }

        // Filtrer les éléments
        listItems.forEach(item => {
            const strongElement = item.querySelector('strong');
            if (strongElement) {
                const text = strongElement.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = ''; // Afficher si correspondance
                } else {
                    item.style.display = 'none'; // Cacher sinon
                }
            } else {
                item.style.display = 'none'; // Cacher si pas de <strong>
            }
        });

        cards.forEach(card => {
            const listItems = card.getElementsByTagName('li');
            let hasVisibleItem = false;

            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].style.display !== 'none') {
                    hasVisibleItem = true;
                    break;
                }
            }

            card.style.display = hasVisibleItem ? '' : 'none';
        });
    }

    // Ajouter l'écouteur d'événement sur le champ de recherche
    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterGlossary);
    }

    // Style pour le champ de recherche (optionnel, peut aussi être dans style.css)
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            margin: 1rem 0;
            width: 100%;
        }
        #glossary-search {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
});
