//SCRIPT DE LA PAGE DE GARDE 

// On sélectionne toutes les villes et leur boîte d'information

// On récupère le nom des villes, elles sont de classe 'city' 
const cities = document.querySelectorAll('.city');

cities.forEach(city => { // on boucle sur les villes 

    // 1. GESTION DU CARROUSEL D'IMAGES 
    // Les images
    const images = city.querySelectorAll('.carousel-images img'); // on cherche les images uniquement à l'intérieur de la ville sur laquelle on travaille
    const prevBtn = city.querySelector('.carousel-btn.prev');
    const nextBtn = city.querySelector('.carousel-btn.next');
    let currentIndex = 0; // compteur qui retient quelle image est affichée (0 est la première)

    // fonction interne pour enlever la classe active à toutes les images de la ville, puis l'ajoute uniquement à celle désignée par index
    const showImage = (index) => { 
        images.forEach((img, i) => {
            img.classList.remove('active'); 
            if (i === index) {
                img.classList.add('active'); 
            }
        });
    };

    // Les flèches 
    // Passez à l'image suivante 
    if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche de déclencher le clic sur la ville (la redirection) quand on appuie sur les boutons
            currentIndex = (currentIndex + 1) % images.length; // permet de faire une boucle infinie
            showImage(currentIndex);
        });
    }

    // revenir à l'image précèdente 
    if (prevBtn) {
        prevBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche de déclencher le clic sur la ville (la redirection) quand on appuie sur les boutons
            currentIndex = (currentIndex - 1 + images.length) % images.length; // permet de faire une boucle infinie
            showImage(currentIndex);
        });
    }

    // 2. CLIC SUR LA VILLE (REDIRECTION VERS LE HTML DE LA VILLE)
    city.addEventListener('click', (event) => {
        // on vérifie qu'on n'a pas cliqué sur une flèche du carrousel
        if (!event.target.closest('.carousel-container')) {
            const cityId = city.id; // on récupère l'id écrit dans le HTML (ex: id="Tokyo")
            
            window.location.href = `${cityId}.html`; 
            
           
        }
    });
});