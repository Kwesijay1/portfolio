// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');
const fadeInElements = document.querySelectorAll('.fade-in');

// Mobile Menu Functions
function toggleMenu() {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
}

function closeMenuOutside(e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
}

// Smooth Scrolling Function
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
    });
    // Close mobile menu after clicking a link
    if (window.innerWidth <= 768) {
        toggleMenu();
    }
}

// Animation Functions
const observerOptions = {
    threshold: 0.2
};

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function handleScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Initialize Intersection Observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Event Listeners
burger.addEventListener('click', toggleMenu);
document.addEventListener('click', closeMenuOutside);
navLinks.forEach(anchor => anchor.addEventListener('click', smoothScroll));
fadeInElements.forEach(element => observer.observe(element));
document.addEventListener('scroll', handleScroll);