// ===== SOMMAIRE : effet hover =====
// (Le CSS :has() gère déjà l'assombrissement des cartes non-survolées)
// Scroll smooth vers la section au clic (déjà géré par CSS scroll-behavior)

/// ===== CAROUSEL =====
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;

    const itemWidth = () => {
        const item = track.querySelector('.carousel-item');
        return item ? item.offsetWidth + 19 : 280;
    };
    const totalItems = () => track.querySelectorAll('.carousel-item').length;
    const visibleCount = () => Math.floor(track.parentElement.offsetWidth / itemWidth());
    const needsCarousel = () => totalItems() > visibleCount();

    function updateCarouselAlignment() {
        if (needsCarousel()) {
            track.style.justifyContent = 'flex-start';
            prevBtn.style.visibility = 'visible';
            nextBtn.style.visibility = 'visible';
        } else {
            track.style.justifyContent = 'center';
            track.style.transform = 'none';
            currentIndex = 0;
            prevBtn.style.visibility = 'hidden';
            nextBtn.style.visibility = 'hidden';
        }
    }

    function updateCarousel() {
        if (!needsCarousel()) return;
        const max = totalItems() - visibleCount();
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > max) currentIndex = max;
        track.style.transform = `translateX(-${currentIndex * itemWidth()}px)`;
    }

    prevBtn.addEventListener('click', () => { currentIndex--; updateCarousel(); });
    nextBtn.addEventListener('click', () => { currentIndex++; updateCarousel(); });

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? currentIndex++ : currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('load', updateCarouselAlignment);
    window.addEventListener('resize', () => {
        updateCarouselAlignment();
        updateCarousel();
    });
}
window.addEventListener('load', updateCarouselAlignment);
window.addEventListener('resize', updateCarouselAlignment);

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
    if (x + tw > window.innerWidth - margin) x = e.clientX - tw - margin;
    if (y + th > window.innerHeight - margin) y = e.clientY - th - margin;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
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
