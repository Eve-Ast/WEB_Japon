document.getElementById('reco-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Récupération des données
    const name = document.getElementById('user-name').value;
    const formData = new FormData(this);
    const pref = formData.get('pref');
    const season = formData.get('season');

    // 2. Logique de recommandation simplifiée
    let city = "Tokyo"; // Ville par défaut
    let coords = { top: "69%", left: "63%" }; // Coordonnées Tokyo

    if (pref === "Foret" || pref === "Montagne") {
        city = "Kyoto";
        coords = { top: "68%", left: "42.5%" };
    } else if (pref === "Mer") {
        city = "Takahama";
        coords = { top: "65%", left: "43%" };
    } else if (pref === "Ville" && season === "Ete") {
        city = "Osaka";
        coords = { top: "75%", left: "41%" };
    } else if (pref === "Foret" && season === "Automne") {
        city = "Nara";
        coords = { top: "73%", left: "43.5%" };
    }

    // 3. Mise à jour de l'affichage
    document.getElementById('display-name').textContent = name;
    document.getElementById('recommended-city').textContent = city;
    
    // Positionnement du point sur la carte
    const dot = document.getElementById('city-pointer');
    dot.style.top = coords.top;
    dot.style.left = coords.left;

    // Basculement des vues
    document.getElementById('form-view').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    
    // Scroll vers le haut pour voir le résultat
    window.scrollTo(0, 0);
});