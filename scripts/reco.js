//SCRIPT DE LA PAGE RECOMMANDATION 

/* ================================================= */
/* 1. CONFIGURATION DES VILLES (COORDONNÉES ET IMAGES) */
/* ================================================= */
// Contient les positions, les classes d'affichage et les images.
const cityConfigs = { // on crée une sorte de dictionnaire pour stocker toutes ces informations
    "Tokyo": { 
        top: "69%", left: "63%", // position sur la carte (les memes que dans le HTML de la page de recommandation)
        labelClass: "", // la classe dans le fichier css
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
document.getElementById('reco-form').addEventListener('submit', function(e) { // le script attend que l'utilisateur envoie le formulaire 
    e.preventDefault(); // empêche le rechargement de la page une fois le formulaire envoyé pour que le script puisse afficher le résultat sur la même page

    // Récupération de toutes les données
    const formData = new FormData(this); //prend toutes les réponses du formulaire d'un coup 
    const name = formData.get('name'); //le nom de l'utilisateur 
    const pref = formData.get('pref'); // la préfèrence d'environnement
    const season = formData.get('season'); // sa saison de voyage
    const who = formData.get('who'); // avec qui il voyage
    

    // --- LOGIQUE DE RECOMMANDATION ---
       let city = "Tokyo"; // Valeur par défaut

    // Condition 1 : Ville ou Montagne + Seul ou Amis -> Tokyo
    if ((pref === "Ville" || pref === "Montagne") && (who === "Seul" || who === "Amis")) {
        city = "Tokyo";
    } 
    // Condition 2 : Forêt -> Kyoto
    else if (pref === "Foret" || who === "Couple" ) {
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

// Mise à jour de l'état global
    currentRecommendedCity = city;
    //on récupère les réglages de la ville recommandée dans notre dictionnaire
    const config = cityConfigs[city];

    /* --- MISE À JOUR DE L'INTERFACE --- */
    
    // 1. Texte de recommandation
    // on change le texte pour afficher le prenom de l'utilisateur 
    document.getElementById('display-name').textContent = name;
    // on change le texte pour afficher la ville recomandée 
    document.getElementById('recommended-city').textContent = city;
    
    // 2. Point et étiquette sur la carte
    const cityDiv = document.getElementById('dynamic-city-result');
    const label = document.getElementById('city-label');
    
  // Injection des données de la ville recommandée
    label.textContent = city;
    cityDiv.style.top = config.top; // On déplace le point rouge
    cityDiv.style.left = config.left;
    
    // On applique la classe spécifique pour que le texte soit bien placé autour du point
    // On garde la classe "city" et on ajoute celle de la config (ex: label-topleft)
    cityDiv.className = "city " + config.labelClass;

    // 3. Lancement du carrousel avec les images de la config
    startAutoCarousel(city, config.images);

    // 4. Basculement visuel
    // On ajoute la classe hidden au formulaire (pour le cacher) et on l'enlève au résultat (pour l'afficher)
    document.getElementById('form-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    
    // on remonte automatiquement en haut de la page pour que l'utilisateur voie son résultat immédiatement.
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
    container.innerHTML = ""; // efface les photos de la recherche précédente.
    
    const folder = cityName.toLowerCase();

    // pour chaque image dans la liste de la ville, on crée une balise <img>,
    // pour donner le bon chemin (src) et on ajoute la classe "active" à la première pour l'afficher
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
            // Enlever la classe active de l'image actuelle
            allImages[currentIndex].classList.remove('active');
            //quand on affiche la dernière image, on revient au début
            currentIndex = (currentIndex + 1) % allImages.length;
            // activer/afficher l'image suivante 
            allImages[currentIndex].classList.add('active');
        }, 2000); // Défilement toutes les 2 secondes
    }
}