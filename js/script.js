// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Hero slideshow
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let currentSlide = 0;
let slideInterval;

// Reveal sections on scroll
const revealSections = document.querySelectorAll('section');

function revealOnScroll() {
    revealSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            section.classList.add('visible');
        }
    });
}

function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
    });
    currentSlide = index;
}

function startHeroSlider() {
    if (slides.length === 0) return;
    slideInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 5000);
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const index = Number(dot.dataset.slide);
        showSlide(index);
        clearInterval(slideInterval);
        startHeroSlider();
    });
});

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll to enrollment
function scrollToEnroll() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Form Submission
const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
    enrollForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
    });
}

// Success Message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your enrollment request has been submitted successfully.</p>
            <p>We'll contact you within 24 hours.</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Add success styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            animation: slideIn 0.5s ease-out;
        }
        
        .success-content {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .success-content i {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: scaleIn 0.5s ease-out;
        }
        
        .success-content h4 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .success-content p {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Add scroll animation for elements
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all cards and sections
    document.querySelectorAll('.about-card, .activity-card, .testimonial-card, .feature, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// Animate stats counters
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = Number(stat.getAttribute('data-target'));
        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            stat.textContent = `${value}${target === 100 ? '%' : '+'}`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = `${target}${target === 100 ? '%' : '+'}`;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Testimonial carousel
const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((card, cardIndex) => {
        card.classList.toggle('active', cardIndex === index);
    });
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
}

function prevTestimonial() {
    const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex);
}

if (prevBtn && nextBtn && testimonials.length) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    setInterval(nextTestimonial, 6000);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    showSlide(0);
    startHeroSlider();
    revealOnScroll();
    if (stats.length) {
        animateStats();
    }
});

window.addEventListener('scroll', () => {
    revealOnScroll();
    if (stats.length) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight - 120) {
            animateStats();
        }
    }

    const hero = document.querySelector('.hero-slider');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.setProperty('--parallax-offset', `${scrolled * 0.04}px`);
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.25)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.15)';
    }
});

// Add some interactive feedback
document.querySelectorAll('.cta-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.pointerEvents = 'none';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = ripple.style.height = size + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
