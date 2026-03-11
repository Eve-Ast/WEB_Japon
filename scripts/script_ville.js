// ===== SOMMAIRE : effet hover =====
// (Le CSS :has() gère déjà l'assombrissement des cartes non-survolées)
// Scroll smooth vers la section au clic (déjà géré par CSS scroll-behavior)

/// ===== CAROUSEL =====
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (track && prevBtn && nextBtn) { /// verification que les différents boutons existent
    let currentIndex = 0; /// variable qui stocke la position actuelle du carousel

    const itemWidth = () => {
        const item = track.querySelector('.carousel-item');
        return item ? item.offsetWidth + 19 : 280;
    }; /// fonction qui renvoie la largeur de la carte + espace 
    const totalItems = () => track.querySelectorAll('.carousel-item').length; /// sélectionne toutes les cartes et retourne leur nombre 
    const visibleCount = () => Math.floor(track.parentElement.offsetWidth / itemWidth()); /// calcule combien de cartes peuvent être visisble dans l'écran
    const needsCarousel = () => totalItems() > visibleCount(); /// permet de déterminer si on a besoin ou non d'un carousel renvoie false si tout les cartes tiennent dans l'écran

    function updateCarouselAlignment() { /// Fonction qui décide de centrer les cartes ou activer le carousel
        if (needsCarousel()) { /// cas besoin d'un carousel
            track.style.justifyContent = 'flex-start'; // aligne les cartes à gauche
            prevBtn.style.visibility = 'visible'; /// affiche les boutons
            nextBtn.style.visibility = 'visible';
        } else { /// cas pas besoin d'un carousel
            track.style.justifyContent = 'center';// centre les cartes
            track.style.transform = 'none'; /// Supprime toutes translation
            currentIndex = 0; /// reinitialise la position
            prevBtn.style.visibility = 'hidden'; /// masque les boutons
            nextBtn.style.visibility = 'hidden';
        }
    }

    function updateCarousel() { /// Fonction qui déplace les cartes 
        if (!needsCarousel()) return; /// si on n'a pas besoin d'un carousel ona rrête la fonction
        const max = totalItems() - visibleCount(); /// position max possible
        if (currentIndex < 0) currentIndex = 0; /// empeche de dépasser a gauche
        if (currentIndex > max) currentIndex = max; /// empeche de depasser à droite
        track.style.transform = `translateX(-${currentIndex * itemWidth()}px)`; /// deplacement horizontale
    }

    prevBtn.addEventListener('click', () => { currentIndex--; updateCarousel(); }); /// diminue l'index
    nextBtn.addEventListener('click', () => { currentIndex++; updateCarousel(); }); /// augmente l'index

    // Touch / swipe support pour mobile tactile
    let touchStartX = 0; /// stocke position du doigt
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }); /// enregistre position initiale du doigt
    track.addEventListener('touchend', e => { /// detecte la fin du geste
        const diff = touchStartX - e.changedTouches[0].clientX; /// calcule la distance du swipe
        if (Math.abs(diff) > 50) { /// Ignore les petits mouvements
            diff > 0 ? currentIndex++ : currentIndex--; /// swipe gauche = suivant / swipe droit = précedent
            updateCarousel(); /// met à jour le déplacement
        }
    }); 

    window.addEventListener('load', updateCarouselAlignment); /// quand la page charge ajuste l'aligneemnt
    window.addEventListener('resize', () => {
        updateCarouselAlignment();
        updateCarousel();
    }); /// Quand la fenetre change de taille : recalcul des cartes visible et repositionnement du carousel
}



// ===== FRISE ÉVÉNEMENTS =====
const tooltip = document.getElementById('event-tooltip');
const tooltipImg = document.getElementById('tooltip-img');
const tooltipName = document.getElementById('tooltip-name');
const tooltipDesc = document.getElementById('tooltip-desc');

document.querySelectorAll('.t-dot').forEach(dot => {/// sélections de tous les points de la frise
    dot.addEventListener('mouseenter', (e) => { /// ajout d'un event quand on survol

        tooltipImg.src = dot.dataset.img; /// recupeère la valeur data-img dans le HTML
        tooltipImg.alt = dot.dataset.event; /// definit le texte alternatif de l'image

        tooltipName.textContent = dot.dataset.event; /// affiche le nom de l'evenement dans le tooltip
        tooltipDesc.textContent = dot.dataset.desc; /// affiche la description de l'image

        tooltip.classList.add('visible'); /// ajoute la classe CSS visible --> le tooltip devient visible

        positionTooltip(e); /// appelle de la fonction qui place le tooltip près de la souris
    });

    dot.addEventListener('mousemove', positionTooltip); /// quand la souris bouge, le tooltip suit la souris

    dot.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    }); /// lorsque la souris sort de l'élément on supprime la classe visible --> le tooltip disparait

}); 

function positionTooltip(e) { /// fonction qui calcue la position du tooltip

    const margin = 16; // ajoute 16px d'espace autour du px

    let x = e.clientX + margin; /// clientX = position horizontale de la souris + marge pour décaler le tooltip a droite
    let y = e.clientY + margin; /// client Y = position vertical de la souris + marge pour décaler un peu veers le bas de la souris

    const tw = tooltip.offsetWidth || 260; /// offsetWidth = largeur réelle du tooltip sino on utilise 260px par défaut
    const th = tooltip.offsetHeight || 200; /// offsetHeight = hauteur réelle du tooltip

    const maxX = window.innerWidth - tw - margin; /// innerWidth = largeur de la fenetre --> maxX=position maximale autorisée à droite
    const maxY = window.innerHeight - th - margin; /// meme chose pour la limite basse de la fenetre

    // empêcher de sortir à droite
    if (x > maxX) x = maxX;

    // empêcher de sortir en bas
    if (y > maxY) y = maxY;

    // empêcher de sortir à gauche
    if (x < margin) x = margin;

    // empêcher de sortir en haut
    if (y < margin) y = margin;

    tooltip.style.left = x + "px"; /// position horizontale finale 
    tooltip.style.top = y + "px"; /// position verticale finale 
}


// ===== MANGER CAROUSELS =====
document.querySelectorAll('.manger-carousel').forEach(carousel => {/// selectionne tout les élément ayant la classe manger-carousel
    const track = carousel.querySelector('.manger-track');
    const slides = carousel.querySelectorAll('.manger-slide');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let index = 0; // stocke le slide affiché actuellement

    function update() { /// fonction qui déplace le carousel
        track.style.transform = `translateX(-${index * 100}%)`; /// déplacement horizontale
    }

    next.addEventListener('click', () => {
        index = (index + 1) % slides.length; /// passe au slide suivant %slides.length permet de boucler
        update(); /// met a jour la position
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length; /// passe au slide précedent et boucle 
        update(); /// met a jour la position 
    });
});
