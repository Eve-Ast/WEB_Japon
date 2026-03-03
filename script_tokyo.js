// ===== SOMMAIRE : effet hover =====
// (Le CSS :has() gère déjà l'assombrissement des cartes non-survolées)
// Scroll smooth vers la section au clic (déjà géré par CSS scroll-behavior)

// ===== CAROUSEL =====
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
const itemWidth = () => {
    const item = track.querySelector('.carousel-item');
    return item ? item.offsetWidth + 19 : 280; // 19 = gap approx
};
const totalItems = () => track.querySelectorAll('.carousel-item').length;
const visibleCount = () => Math.floor(track.parentElement.offsetWidth / itemWidth());

function updateCarousel() {
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

// ===== HEADER : fond plus opaque au scroll =====
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 60
        ? 'rgba(14,12,10,0.98)'
        : 'rgba(14,12,10,0.92)';
});