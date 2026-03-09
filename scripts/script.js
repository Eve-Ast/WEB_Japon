//SCRIPT DE LA PAGE DE GARDE 

// On sélectionne toutes les villes et leur boîte d'information

// On récupère le nom des villes 
const cities = document.querySelectorAll('.city');

cities.forEach(city => {

    // 1. GESTION DU CARROUSEL D'IMAGES (Flèches)
    const images = city.querySelectorAll('.carousel-images img');
    const prevBtn = city.querySelector('.carousel-btn.prev');
    const nextBtn = city.querySelector('.carousel-btn.next');
    let currentIndex = 0; 

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.remove('active'); 
            if (i === index) {
                img.classList.add('active'); 
            }
        });
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche de déclencher le clic sur la ville
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche de déclencher le clic sur la ville
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    // 2. CLIC SUR LA VILLE (REDIRECTION HTML)
    city.addEventListener('click', (event) => {
        // On vérifie qu'on n'a pas cliqué sur une flèche du carrousel
        if (!event.target.closest('.carousel-container')) {
            const cityId = city.id;
            
            // Ligne à décommenter (enlever les //) quand vous aurez créé tokyo.html, etc.
            window.location.href = `${cityId}.html`; 
            
           
        }
    });
});