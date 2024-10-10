// Gestion de la barre de navigation
function handleNavTransparency() {
    var header = document.getElementById("navbar");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        header.classList.remove("transparent");
    } else {
        header.classList.add("transparent");
        header.classList.remove("scrolled");
    }
}

window.addEventListener("load", handleNavTransparency);
window.addEventListener("scroll", handleNavTransparency);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
});

// Animation des barres de progression
document.addEventListener("DOMContentLoaded", function() {
    const progressBars = document.querySelectorAll(".progress");

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        progressBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.classList.contains('filled')) {
                const value = bar.getAttribute('data-value');
                bar.style.width = value + '%';
                bar.classList.add('filled');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

// Animation du texte typewriter
const textArray = ["ELIAS BOUZIT\nDÉVELOPPEUR WEB"];
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 1500;
let charIndex = 0;
let textArrayIndex = 0;
const typedTextSpan = document.querySelector("#typewriter");
const cursorSpan = document.querySelector(".blinking-cursor");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        const currentChar = textArray[textArrayIndex].charAt(charIndex);
        if (currentChar === "\n") {
            typedTextSpan.innerHTML += "<br>";
        } else {
            typedTextSpan.innerHTML += currentChar;
        }
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        const currentText = typedTextSpan.innerHTML;
        if (currentText.endsWith("<br>")) {
            typedTextSpan.innerHTML = currentText.slice(0, -4);
        } else {
            typedTextSpan.innerHTML = currentText.substring(0, typedTextSpan.innerHTML.length - 1);
        }
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay);
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const carousel = document.querySelector('.carousel');
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialiser le carousel sur le premier slide
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
});
function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('active');
}

// Ferme le menu lorsqu'on clique en dehors de celui-ci
document.addEventListener('click', function(event) {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Si le clic est en dehors du menu et du bouton de bascule, on ferme le menu
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Ferme le menu lorsqu'on clique sur un lien de navigation
const navLinks = document.querySelectorAll('.mobile-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.classList.remove('active');
    });
});
