let slideIndex = 0;
let apparatusIndex = 0;
const slideshow = document.getElementById("slideshow");
const slideTexts = document.getElementsByClassName("slide-text");
const dots = document.getElementById("dots").getElementsByClassName("dot");
const apparatusSlider = document.getElementById("apparatus-slider");
const apparatusSlides = document.getElementsByClassName("slide");
let slideInterval;

function showSlides() {
    slideIndex = (slideIndex + 1) % slideTexts.length;
    slideshow.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateDots();
}

function currentSlide(n) {
    slideIndex = n >= 0 && n < slideTexts.length ? n : 0;
    slideshow.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateDots();
    clearInterval(slideInterval);
    slideInterval = setInterval(showSlides, 3000);
}

function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
        if (i === slideIndex) dots[i].className += " active";
    }
}

function plusSlidesApparatus(n) {
    apparatusIndex = (apparatusIndex + n + apparatusSlides.length) % apparatusSlides.length;
    apparatusSlider.style.transform = `translateX(-${apparatusIndex * 100}%)`;
}

// Инициализация карты с Leaflet
document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([46.480751, 30.732374], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([46.480751, 30.732374]).addTo(map)
        .bindPopup('Innova Diagnostica')
        .openPopup();
});

// Автоматическое переключение слайдов
slideInterval = setInterval(showSlides, 3000);

// Остановка/возобновление автопрокрутки при наведении
slideshow.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
slideshow.parentElement.addEventListener('mouseleave', () => { slideInterval = setInterval(showSlides, 3000); });

// Клавиатурная навигация для точек
document.querySelectorAll('.dot').forEach(elem => {
    elem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elem.click();
        }
    });
});