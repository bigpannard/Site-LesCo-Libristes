function menuToggle() { 
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');
    
    if(menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            menu.setAttribute('aria-expanded', !isExpanded);

            // Toggle la classe pour l'animation
            menu.classList.toggle('active');
            });
    }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  } 
  menuToggle();
}



document.addEventListener('DOMContentLoaded', function() {
    menuToggle();
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
});