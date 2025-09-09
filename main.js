// --- Main Slideshow ---
let slideIndex = 0;
const slides = document.querySelectorAll(".slideshow .slide");
const dots = document.querySelectorAll(".dot");
let slideInterval;

function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;

    slides.forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove("fade-in");
    });

    dots.forEach(dot => dot.classList.remove("active"));

    if (slides[slideIndex]) {
        slides[slideIndex].style.display = "flex";
        slides[slideIndex].classList.add("fade-in");
    }

    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
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
    slideInterval = setInterval(nextSlide, 5000); // 5 seconds
}

// --- Equipment Slider ---
let equipmentIndex = 0;
const equipmentSlider = document.getElementById("equipment-slider");
const equipmentSlides = document.querySelectorAll(".equipment-slide");

function showEquipmentSlide(index) {
    if (!equipmentSlider || equipmentSlides.length === 0) {
        console.error("Equipment slider or slides not found!");
        return;
    }

    equipmentIndex = (index + equipmentSlides.length) % equipmentSlides.length;
    equipmentSlider.style.transform = `translateX(-${equipmentIndex * 50}%)`;
    equipmentSlider.style.transition = "transform 0.6s ease-in-out";
}

function plusSlidesEquipment(n) {
    showEquipmentSlide(equipmentIndex + n);
}

// --- Map ---
function initMap() {
    const mapElement = document.getElementById("map");
    if (mapElement) {
        console.log("Initializing map...");
        const map = L.map(mapElement, { zoomControl: true }).setView([46.47120, 30.75300], 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([46.47120, 30.75300]).addTo(map)
            .bindPopup("Іннова Діагностика, м. Одеса, Велика Арнаутська, 2А")
            .openPopup();

        setTimeout(() => {
            map.invalidateSize();
            console.log("Map size invalidated");
        }, 100);
    } else {
        console.error("Map element not found!");
    }
}

// --- Accordion (Price) ---
function initAccordion() {
    const headers = document.querySelectorAll(".price h3");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const table = header.nextElementSibling;
            if (table && table.classList.contains("price-table")) {
                table.classList.toggle("active");
                header.classList.toggle("active");
            } else {
                let sibling = header.nextElementSibling;
                while (sibling && !sibling.classList.contains("price-table")) {
                    sibling = sibling.nextElementSibling;
                }
                if (sibling) {
                    sibling.classList.toggle("active");
                    header.classList.toggle("active");
                }
            }
        });
    });
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", function () {
    // Slideshow
    if (slides.length > 0) {
        showSlide(slideIndex);
        slideInterval = setInterval(nextSlide, 5000);

        const slideshowContainer = document.getElementById("slideshow");
        if (slideshowContainer) {
            slideshowContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
            slideshowContainer.addEventListener("mouseleave", resetSlideInterval);
        }

        dots.forEach(dot => {
            dot.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    dot.click();
                }
            });
        });
    } else {
        console.warn("No slideshow slides found, skipping slideshow initialization.");
    }

    // Equipment slider
    if (equipmentSlides.length > 0) {
        showEquipmentSlide(0);

        const leftArrow = document.querySelector(".equipment-slider .arrow.left");
        const rightArrow = document.querySelector(".equipment-slider .arrow.right");

        if (leftArrow) {
            leftArrow.addEventListener("click", () => plusSlidesEquipment(-1));
            leftArrow.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    leftArrow.click();
                }
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", () => plusSlidesEquipment(1));
            rightArrow.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    rightArrow.click();
                }
            });
        }
    } else {
        console.warn("No equipment slides found, skipping equipment slider initialization.");
    }

    initMap();
    initAccordion();
});