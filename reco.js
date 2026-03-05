// 1. Base de données des images par ville (reprend vos chemins de pagedegarde)
const cityImagesData = {
    "Tokyo": ["tokyotower.jpeg", "akihabara.jpeg", "sensojitemple.jpeg", "shibuyacrossing.jpeg", "tower.jpeg", "shinjuku.jpeg"],
    "Kyoto": ["trainmuseum.jpeg", "tower.jpeg", "kuramahead.jpeg", "tojitemple.jpeg", "pavillonor.jpeg", "fushimiinari.jpeg"],
    "Osaka": ["chateau.jpeg", "tower.jpeg", "place.jpeg", "deco.jpeg", "plaque.jpeg"],
    "Kobe": ["ville.jpeg", "plaque.jpeg", "cascade.jpeg", "mosquée.jpeg"],
    "Nara": ["arrivée.jpeg", "paguogue.jpeg", "biches.jpeg", "temple.jpeg"],
    "Uji": ["MurasakShikibuStatue.jpeg", "byodo-in_temple.jpeg", "amagaseDam.jpeg", "fleuve.jpeg"],
    "Takahama": ["wakasaWadaBeach.jpeg", "maison.jpeg", "rocher.jpeg", "plage.jpeg"]
};

let carouselInterval; // Variable pour stocker le timer

document.getElementById('reco-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('user-name').value;
    const formData = new FormData(this);
    const pref = formData.get('pref');
    const season = formData.get('season');

    // 2. Logique de recommandation
    let city = "Tokyo";
    let coords = { top: "69%", left: "63%" };

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

    // 3. Mise à jour du texte et de la carte
    document.getElementById('display-name').textContent = name;
    document.getElementById('recommended-city').textContent = city;
    document.getElementById('city-label').textContent = city; // Nom sur la carte
    
    const dot = document.getElementById('city-pointer');
    const label = document.getElementById('city-label');
    
    dot.style.top = coords.top;
    dot.style.left = coords.left;
    label.style.top = coords.top;
    label.style.left = coords.left;

    // 4. Lancer le carrousel automatique
    startAutoCarousel(city);

    // Basculer la vue
    document.getElementById('form-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    window.scrollTo(0, 0);
});

function startAutoCarousel(cityName) {
    const container = document.getElementById('carousel-images-container');
    container.innerHTML = ""; // Vider les anciennes images
    
    const imagesList = cityImagesData[cityName] || cityImagesData["Tokyo"];
    const folder = cityName.toLowerCase();

    // Créer les éléments images
    imagesList.forEach((imgName, index) => {
        const img = document.createElement('img');
        img.src = `./img/${folder}/${imgName}`;
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
    });

    // Gestion du défilement automatique
    let currentIndex = 0;
    const allImages = container.querySelectorAll('img');

    // Nettoyer l'ancien intervalle s'il existe
    if (carouselInterval) clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        allImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % allImages.length;
        allImages[currentIndex].classList.add('active');
    }, 2000); // Change toutes les 3 secondes
}