// ===== Главный слайдер =====
let slideIndex = 0;
const slides = document.querySelectorAll(".slideshow .slide");
const dots = document.querySelectorAll(".dot");
let slideInterval;

function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove("fade-in");
    });
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex].style.display = "flex";
    slides[slideIndex].classList.add("fade-in"); // добавляем класс анимации
    dots[slideIndex].classList.add("active");
}


function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    resetSlideInterval();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// ===== Слайдер аппаратуры =====
let apparatusIndex = 0;
const apparatusSlider = document.getElementById("apparatus-slider");
const apparatusSlides = document.querySelectorAll("#apparatus-slider .apparatus-slide");

function showApparatusSlide(n) {
    if (n >= apparatusSlides.length) apparatusIndex = 0;
    else if (n < 0) apparatusIndex = apparatusSlides.length - 1;
    else apparatusIndex = n;

    const offset = -apparatusIndex * 100;
    apparatusSlider.style.transform = `translateX(${offset}%)`;
    apparatusSlider.style.transition = 'transform 0.5s ease-in-out';
}

function plusSlidesApparatus(n) {
    showApparatusSlide(apparatusIndex + n);
}

// ===== Инициализация карты Leaflet =====
function initMap() {
    const map = L.map('map').setView([46.480751, 30.732374], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([46.480751, 30.732374]).addTo(map)
        .bindPopup('Innova Diagnostica')
        .openPopup();
}

// ===== Инициализация всего =====
document.addEventListener("DOMContentLoaded", function() {
    // Главный слайдер
    showSlide(slideIndex);
    slideInterval = setInterval(nextSlide, 4000);

    // Слайдер аппаратуры
    showApparatusSlide(apparatusIndex);

    // Карта
    initMap();

    // Пауза автослайдера при наведении
    const slideshowContainer = document.getElementById("slideshow");
    slideshowContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slideshowContainer.addEventListener("mouseleave", resetSlideInterval);
});

// ===== Клавиатурная доступность для точек =====
dots.forEach(dot => {
    dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dot.click();
        }
    });
});

// ===== Клавиатурная доступность для стрелок слайдера аппаратуры =====
document.querySelectorAll('.arrow').forEach(elem => {
    elem.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elem.click();
        }
    });
});
