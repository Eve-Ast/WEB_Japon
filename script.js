// On sélectionne toutes les villes et la boîte d'information
const cities = document.querySelectorAll('.city');
const infoBox = document.getElementById('info-box');

cities.forEach(city => {
    
    // 1. SURVOL : On met juste à jour la boîte d'info en bas
    city.addEventListener('mouseenter', () => {
        const cityId = city.id; 
        const cityName = city.querySelector('.city-name').innerText; // Récupère le nom
        
        if (cityDescriptions[cityId]) {
            infoBox.innerHTML = `<strong style="color: #e60000;">${cityName}</strong> : ${cityDescriptions[cityId]}`;
        }
    });

    // 2. FIN DU SURVOL : Remise à zéro de la boîte d'info
    city.addEventListener('mouseleave', () => {
        infoBox.innerHTML = "Survolez une ville pour voir sa description.";
    });

    // 3. GESTION DU CARROUSEL D'IMAGES (Flèches)
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

    // 4. CLIC SUR LA VILLE (REDIRECTION HTML)
    city.addEventListener('click', (event) => {
        // On vérifie qu'on n'a pas cliqué sur une flèche du carrousel
        if (!event.target.closest('.carousel-container')) {
            const cityId = city.id;
            
            // Ligne à décommenter (enlever les //) quand vous aurez créé tokyo.html, etc.
            window.location.href = `${cityId}.html`; 
            
            alert(`Déconvrons la ville de ${cityId} ensemble`);
        }
    });
});