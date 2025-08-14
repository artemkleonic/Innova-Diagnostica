let slideIndex = 0;
        const slider = document.getElementById("slider");
        const slides = document.getElementsByClassName("slide");

        function plusSlides(n) {
            slideIndex += n;
            if (slideIndex >= slides.length) { slideIndex = 0; }
            if (slideIndex < 0) { slideIndex = slides.length - 1; }
            slider.style.transform = `translateX(-${slideIndex * 340}px)`;}