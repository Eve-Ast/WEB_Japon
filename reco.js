/* ================================================= */
/* 1. DONNÉES DES VILLES (IMAGES ET CHEMINS)        */
/* ================================================= */
const cityImagesData = {
    "Tokyo": ["tokyotower.jpeg", "akihabara.jpeg", "sensojitemple.jpeg", "shibuyacrossing.jpeg", "tower.jpeg", "shinjuku.jpeg"],
    "Kyoto": ["trainmuseum.jpeg", "tower.jpeg", "kuramahead.jpeg", "tojitemple.jpeg", "pavillonor.jpeg", "fushimiinari.jpeg"],
    "Osaka": ["chateau.jpeg", "tower.jpeg", "place.jpeg", "deco.jpeg", "plaque.jpeg"],
    "Kobe": ["ville.jpeg", "plaque.jpeg", "cascade.jpeg", "mosquée.jpeg"],
    "Nara": ["arrivée.jpeg", "paguogue.jpeg", "biches.jpeg", "temple.jpeg"],
    "Uji": ["MurasakShikibuStatue.jpeg", "byodo-in_temple.jpeg", "amagaseDam.jpeg", "fleuve.jpeg"],
    "Takahama": ["wakasaWadaBeach.jpeg", "maison.jpeg", "rocher.jpeg", "plage.jpeg"]
};

/* Variables de contrôle globales */
let carouselInterval;
let currentRecommendedCity = ""; 

/* ================================================= */
/* 2. GESTION DU FORMULAIRE DE RECOMMANDATION       */
/* ================================================= */
document.getElementById('reco-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupération des données du formulaire
    const name = document.getElementById('user-name').value;
    const formData = new FormData(this);
    const pref = formData.get('pref');
    const season = formData.get('season');

    // Initialisation par défaut (Tokyo)
    let city = "Tokyo";
    let coords = { top: "69%", left: "63%" };

    // Logique de recommandation personnalisée
    if (pref === "Foret" || pref === "Montagne") {
        city = "Kyoto";
        coords = { top: "68%", left: "42.5%" };
    } else if (pref === "Mer") {
        city = "Takahama";
        coords = { top: "65%", left: "43%" };
    } else if (pref === "Ville" && season === "Ete") {
        city = "Osaka";
        coords = { top: "75%", left: "41%" };
    }

    // On mémorise la ville pour le clic de redirection
    currentRecommendedCity = city; 

    /* Mise à jour de l'interface utilisateur */
    // Modification du texte
    document.getElementById('display-name').textContent = name;
    document.getElementById('recommended-city').textContent = city;
    document.getElementById('city-label').textContent = city;
    
    // Positionnement de la ville sur la carte
    const cityDiv = document.getElementById('dynamic-city-result');
    cityDiv.style.top = coords.top;
    cityDiv.style.left = coords.left;

    // Lancement du carrousel automatique
    startAutoCarousel(city);

    // Basculement visuel (Formulaire -> Résultat)
    document.getElementById('form-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    
    // Retour en haut de page pour voir le résultat
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================= */
/* 3. GESTION DES INTERACTIONS (CLIC ET RESTART)    */
/* ================================================= */

// Clic sur le point/nom de la ville pour aller sur sa page dédiée
document.getElementById('dynamic-city-result').addEventListener('click', () => {
    if (currentRecommendedCity) {
        // Redirige vers tokyo.html, kyoto.html, etc.
        window.location.href = `${currentRecommendedCity.toLowerCase()}.html`;
    }
});

// Bouton pour refaire le quizz
document.getElementById('btn-restart').addEventListener('click', () => {
    // Arrête le défilement des images
    if (carouselInterval) clearInterval(carouselInterval);
    
    // Réinitialise le formulaire
    document.getElementById('reco-form').reset();
    
    // Change les vues
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('form-view').classList.remove('hidden');
    
    // Retour en haut de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================= */
/* 4. FONCTION DU CARROUSEL AUTOMATIQUE             */
/* ================================================= */
function startAutoCarousel(cityName) {
    const container = document.getElementById('carousel-images-container');
    container.innerHTML = ""; // On vide les images précédentes
    
    const imagesList = cityImagesData[cityName] || cityImagesData["Tokyo"];
    const folder = cityName.toLowerCase();

    // Création dynamique des balises images
    imagesList.forEach((imgName, index) => {
        const img = document.createElement('img');
        img.src = `./img/${folder}/${imgName}`;
        img.alt = `${cityName} photo ${index + 1}`;
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
    });

    let currentIndex = 0;
    const allImages = container.querySelectorAll('img');

    // Sécurité : on nettoie un éventuel intervalle encore actif
    if (carouselInterval) clearInterval(carouselInterval);

    // Si la ville possède des images, on lance le cycle
    if (allImages.length > 0) {
        carouselInterval = setInterval(() => {
            allImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % allImages.length;
            allImages[currentIndex].classList.add('active');
        }, 3000); // Défilement toutes les 3 secondes
    }
}