// Gestion de la barre de navigation : Modifie l'apparence de la barre de navigation lorsqu'on défile la page.
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

// Gère les liens de navigation pour effectuer un défilement fluide vers les sections de la page.
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

// Animation des barres de progression : Remplit les barres de compétences lorsque l'utilisateur les fait défiler dans la vue.
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

// Animation du texte typewriter : Écrit et efface le texte de présentation de manière dynamique avec un effet de machine à écrire.
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

// Gestion du carousel : Affiche le slide en cours et permet de naviguer entre les slides.
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

// Gestion du menu mobile : Ouvre et ferme le menu mobile avec le bouton hamburger.
function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('active');
}

// Ferme le menu mobile lorsqu'on clique en dehors de celui-ci
document.addEventListener('click', function(event) {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Ferme le menu mobile lorsqu'on clique sur un lien de navigation
const navLinks = document.querySelectorAll('.mobile-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.classList.remove('active');
    });
});

// Gestion de la modale pour les projets : Affiche une modale avec les détails du projet lorsque l'utilisateur clique sur une image du carousel.
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGithubLink = document.getElementById("modalGithubLink");
const closeModal = document.querySelector(".modal .close");

// Fonction pour ouvrir la modale avec les détails du projet
function openModal(title, description, githubLink) {
    modalTitle.innerHTML = title;
    modalDescription.innerHTML = description;
    modalGithubLink.href = githubLink;
    modal.style.display = "flex";
}

// Fonction pour fermer la modale
function closeModalFunction() {
    modal.style.display = "none";
}

// Événement pour fermer la modale en cliquant sur le bouton 'X'
closeModal.addEventListener("click", closeModalFunction);

// Événement pour fermer la modale en cliquant en dehors du contenu de la modale
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        closeModalFunction();
    }
});

// Associer les clics sur les images du carousel à l'ouverture de la modale
document.querySelectorAll(".clickable-img").forEach((img) => {
    img.addEventListener("click", (event) => {
        event.preventDefault(); 
        const title = img.getAttribute("data-title");
        const description = img.getAttribute("data-description");
        const githubLink = img.getAttribute("data-github");
        openModal(title, description, githubLink);
    });
});

// S'assurer que le bouton GitHub dans la modale fonctionne correctement
document.getElementById("modalGithubLink").addEventListener("click", function (e) {
    const url = e.target.href;
    if (url && url !== "#") {
        window.open(url, "_blank"); 
    }
});
