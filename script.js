// On sélectionne toutes les villes de la carte
const cities = document.querySelectorAll('.city');

cities.forEach(city => {
    const textElement = city.querySelector('.city-name');
    const originalName = textElement.getAttribute('data-original');

    // 1. CHANGEMENT DE TEXTE AU SURVOL
    city.addEventListener('mouseenter', () => {
        textElement.innerText = `📍 ${originalName} !`;
    });

    city.addEventListener('mouseleave', () => {
        textElement.innerText = originalName;
    });

    // 2. GESTION DU CARROUSEL D'IMAGES
    const images = city.querySelectorAll('.carousel-images img');
    const prevBtn = city.querySelector('.carousel-btn.prev');
    const nextBtn = city.querySelector('.carousel-btn.next');
    let currentIndex = 0; // On commence à la première image (index 0)

    // Fonction pour afficher une image précise
    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.remove('active'); // Cache toutes les images
            if (i === index) {
                img.classList.add('active'); // Affiche la bonne
            }
        });
    };

    // Si le bouton "Suivant" existe, on lui ajoute l'action de clic
    if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // EMPÊCHE LA REDIRECTION VERS L'AUTRE PAGE
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    // Si le bouton "Précédent" existe
    if (prevBtn) {
        prevBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // EMPÊCHE LA REDIRECTION VERS L'AUTRE PAGE
            // Calcul pour revenir en arrière sans faire d'erreur
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    // 3. REDIRECTION VERS LA PAGE DE LA VILLE (Le lien)
    city.addEventListener('click', (event) => {
        // Si on a cliqué sur le point rouge ou le nom (mais PAS sur le carrousel)
        if (!event.target.closest('.carousel-container')) {
            const cityId = city.id;
            
            // CORRECTION ICI : On a enlevé les "//" au début de la ligne !
            window.location.href = `${cityId}.html`;
        }
    });
});