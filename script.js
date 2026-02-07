const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
document.querySelectorAll('.service-card').forEach(el => observer.observe(el));
document.querySelectorAll('.portfolio-item').forEach(el => observer.observe(el));
document.querySelectorAll('.info-box').forEach(el => observer.observe(el));

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            item.style.animation = 'none';
            setTimeout(() => { item.style.animation = ''; }, 10);

            if (filterValue === 'all') {
                item.style.display = 'block';
                item.classList.add('fade-in-up');
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('fade-in-up');
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});


const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.animation = 'progressBar 1.5s ease-out forwards';
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillSection) skillObserver.observe(skillSection);

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    else navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) link.style.color = 'var(--primary-color)';
        else link.style.color = '';
    });
});

const heroTitle = document.querySelector('.hero-title .highlight');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    let index = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typewriter() {
        const speed = isDeleting ? 50 : 100;
        const waitTime = 2000;
        if (!isWaiting) {
            if (!isDeleting && index < originalText.length) index++;
            else if (isDeleting && index > 0) index--;
            else { isDeleting = !isDeleting; isWaiting = true; setTimeout(typewriter, waitTime); return; }
            heroTitle.textContent = originalText.substring(0, index);
            setTimeout(typewriter, speed);
        }
    }
}

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) { element.textContent = target; clearInterval(timer); }
        else element.textContent = Math.floor(current);
    }, 16);
}

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        if (scrollPosition + windowHeight > elementOffset) {
            const yPos = (scrollPosition - elementOffset + windowHeight) * 0.5;
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

window.addEventListener('load', () => { document.body.style.opacity = '1'; });

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach((el, index) => setTimeout(() => { el.style.opacity = '1'; }, index * 100));
});

document.addEventListener('down', (e) => {
    if (e.key.toLowerCase() === 't') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (e.key.toLowerCase() === 'm') { hamburger.classList.toggle('active'); navMenu.classList.toggle('active'); }
});

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.smoothScroll = smoothScroll;

(function () {
    emailjs.init("iejvQidbZgQ0rLG8h");
})();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        formMessage.style.display = "block";
        formMessage.className = "form-message";
        formMessage.textContent = "Sending message...";

        emailjs
            .sendForm("service_obw4ll9", "template_0w44w7k", this)
            .then(() => {
                formMessage.classList.add("success");
                formMessage.textContent = "Message sent successfully!. I will get back to you soon.";
                contactForm.reset();

            
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            })
            .catch(() => {
                formMessage.classList.add("error");
                formMessage.textContent = "Failed to send message. Please try again.";

               
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            });
    });
}
