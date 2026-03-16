// =================== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===================

const toggleBtn = document.getElementById('theme-toggle');

if (toggleBtn) {
    toggleBtn.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme', toggleBtn.checked);
    });
}


// =================== СЛАЙДЕР ГОРЯЧИХ НОВОСТЕЙ ===================

const topNewsTrack = document.getElementById('topNewsTrack');
const topNewsPrev = document.getElementById('topNewsPrev');
const topNewsNext = document.getElementById('topNewsNext');

if (topNewsTrack && topNewsPrev && topNewsNext) {

    const slides = document.querySelectorAll('.top-slide');
    let currentSlide = 0;

    function updateSlider() {
        topNewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    topNewsNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    topNewsPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });

}