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

document.querySelectorAll('.t-dot').forEach(dot => {

    dot.addEventListener('mouseenter', (e) => {

        tooltipImg.src = dot.dataset.img;
        tooltipImg.alt = dot.dataset.event;

        tooltipName.textContent = dot.dataset.event;
        tooltipDesc.textContent = dot.dataset.desc;

        tooltip.classList.add('visible');

        positionTooltip(e);
    });

    dot.addEventListener('mousemove', positionTooltip);

    dot.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });

});

function positionTooltip(e) {

    const margin = 16;

    let x = e.clientX + margin;
    let y = e.clientY + margin;

    const tw = tooltip.offsetWidth || 260;
    const th = tooltip.offsetHeight || 200;

    // const 

    // if (x + tw > window.innerWidth - margin) {
    //     x = e.clientX - tw - margin;
    // }

    // if (y + th > window.innerHeight - margin) {
    //     y = e.clientY - th - margin;
    // }

    // tooltip.style.left = x + 'px';
    // tooltip.style.top = y + 'px';
    const maxX = window.innerWidth - tw - margin;
    const maxY = window.innerHeight - th - margin;

    // empêcher de sortir à droite
    if (x > maxX) x = maxX;

    // empêcher de sortir en bas
    if (y > maxY) y = maxY;

    // empêcher de sortir à gauche
    if (x < margin) x = margin;

    // empêcher de sortir en haut
    if (y < margin) y = margin;

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
}


// ===== MANGER CAROUSELS =====
document.querySelectorAll('.manger-carousel').forEach(carousel => {
    const track = carousel.querySelector('.manger-track');
    const slides = carousel.querySelectorAll('.manger-slide');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let index = 0;

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        update();
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
    });
});
