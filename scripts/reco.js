/* ================================================= */
/* 1. CONFIGURATION DES VILLES (COORDONNÉES ET IMAGES) */
/* ================================================= */
// On centralise tout ici pour que ce soit identique à la page de garde
const cityConfigs = {
    "Tokyo": { 
        top: "69%", left: "63%", 
        labelClass: "", 
        images: ["tokyotower.jpeg", "akihabara.jpeg", "sensojitemple.jpeg", "shibuyacrossing.jpeg", "tower.jpeg", "shinjuku.jpeg"] 
    },
    "Kyoto": { 
        top: "68%", left: "42.5%", 
        labelClass: "label-topleft", 
        images: ["trainmuseum.jpeg", "tower.jpeg", "kuramahead.jpeg", "tojitemple.jpeg", "pavillonor.jpeg", "fushimiinari.jpeg"] 
    },
    "Osaka": { 
        top: "75%", left: "41%", 
        labelClass: "", 
        images: ["chateau.jpeg", "tower.jpeg", "place.jpeg", "deco.jpeg", "plaque.jpeg"] 
    },
    "Kobe": { 
        top: "70%", left: "40%", 
        labelClass: "label-left", 
        images: ["ville.jpeg", "plaque.jpeg", "cascade.jpeg", "mosquée.jpeg"] 
    },
    "Nara": { 
        top: "73%", left: "43.5%", 
        labelClass: "label-right", 
        images: ["arrivée.jpeg", "paguogue.jpeg", "biches.jpeg", "temple.jpeg"] 
    },
    "Uji": { 
        top: "70%", left: "44%", 
        labelClass: "label-right", 
        images: ["MurasakShikibuStatue.jpeg", "byodo-in_temple.jpeg", "amagaseDam.jpeg", "fleuve.jpeg"] 
    },
    "Takahama": { 
        top: "65%", left: "43%", 
        labelClass: "label-topright", 
        images: ["wakasaWadaBeach.jpeg", "maison.jpeg", "rocher.jpeg", "plage.jpeg"] 
    }
};

/* Variables de contrôle */
let carouselInterval;
let currentRecommendedCity = ""; 

/* ================================================= */
/* 2. GESTION DU FORMULAIRE                         */
/* ================================================= */
document.getElementById('reco-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupération de TOUTES les données
    const name = document.getElementById('user-name').value;
    const formData = new FormData(this);
    const age = formData.get('age');
    const duration = formData.get('duration');
    const pref = formData.get('pref');
    const season = formData.get('season');
    const who = formData.get('who');
    

    // --- LOGIQUE DE RECOMMANDATION ---
       let city = "Tokyo"; // Valeur par défaut

    // Condition 1 : Ville ou Montagne + Seul ou Amis -> Tokyo
    if ((pref === "Ville" || pref === "Montagne") && (who === "Seul" || who === "Amis")) {
        city = "Tokyo";
    } 
    // Condition 2 : Forêt -> Kyoto
    else if (pref === "Foret") {
        city = "Kyoto";
    } 
    // Condition 3 : Ville + Amis ou Famille -> Osaka
    else if (pref === "Ville" && (who === "Amis" || who === "Famille")) {
        city = "Osaka";
    } 
    // Condition 4 : Mer + Été -> Takahama
    else if (pref === "Mer" && season === "Ete") {
        city = "Takahama";
    }
    // Sinon, par défaut c'est déjà Tokyo
    else {
        city = "Tokyo";
    }


    currentRecommendedCity = city;
    const config = cityConfigs[city];

    /* --- MISE À JOUR DE L'INTERFACE --- */
    
    // 1. Texte de recommandation
    document.getElementById('display-name').textContent = name;
    document.getElementById('recommended-city').textContent = city;
    
    // 2. Point et étiquette sur la carte
    const cityDiv = document.getElementById('dynamic-city-result');
    const label = document.getElementById('city-label');

    label.textContent = city;
    cityDiv.style.top = config.top;
    cityDiv.style.left = config.left;
    
    // On applique la classe spécifique pour que le texte soit bien placé autour du point
    // On garde la classe "city" et on ajoute celle de la config (ex: label-topleft)
    cityDiv.className = "city " + config.labelClass;

    // 3. Lancement du carrousel avec les images de la config
    startAutoCarousel(city, config.images);

    // 4. Basculement visuel
    document.getElementById('form-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================= */
/* 3. INTERACTIONS (CLIC VILLE ET RESTART)          */
/* ================================================= */

// Clic sur le point/nom de la ville pour aller sur sa page dédiée
document.getElementById('dynamic-city-result').addEventListener('click', () => {
    if (currentRecommendedCity) {
        window.location.href = `${currentRecommendedCity.toLowerCase()}.html`;
    }
});

// Bouton refaire le quizz
document.getElementById('btn-restart').addEventListener('click', () => {
    if (carouselInterval) clearInterval(carouselInterval);
    document.getElementById('reco-form').reset();
    document.getElementById('result-view').classList.add('hidden');
    document.getElementById('form-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================= */
/* 4. FONCTION CARROUSEL AUTOMATIQUE                */
/* ================================================= */
function startAutoCarousel(cityName, imagesList) {
    const container = document.getElementById('carousel-images-container');
    container.innerHTML = ""; 
    
    const folder = cityName.toLowerCase();

    // Injection des images dans le DOM
    imagesList.forEach((imgName, index) => {
        const img = document.createElement('img');
        img.src = `../img/${folder}/${imgName}`;
        img.alt = `${cityName} photo ${index + 1}`;
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
    });

    let currentIndex = 0;
    const allImages = container.querySelectorAll('img');

    if (carouselInterval) clearInterval(carouselInterval);

    if (allImages.length > 0) {
        carouselInterval = setInterval(() => {
            allImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % allImages.length;
            allImages[currentIndex].classList.add('active');
        }, 2000); // Défilement toutes les 2 secondes
    }
}