// Respect user's motion preferences
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 769px)').matches;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Unified scroll engine (rAF-throttled) ---
const nav = document.querySelector('nav');
const heroContent = document.querySelector('.hero-content');
const sections = document.querySelectorAll('section, header.hero');
const navLinks = document.querySelectorAll('.nav-links a');

let ticking = false;

function onScroll() {
    const scrollY = window.scrollY;

    // Navbar state
    if (scrollY > 60) {
        nav.classList.add('scrolled');
        document.body.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
        document.body.classList.remove('scrolled');
    }

    // Subtle hero parallax (desktop only, motion-safe)
    if (heroContent && !reduceMotion && isDesktop() && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.18}px)`;
        heroContent.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
    } else if (heroContent) {
        heroContent.style.transform = '';
        heroContent.style.opacity = '';
    }

    // Active navigation link
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id') || current;
        }
    });
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href').slice(1) === current;
        link.style.color = isActive ? 'var(--primary-color)' : 'var(--text-gray)';
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

// --- Scroll reveal for sections & cards ---
document.addEventListener('DOMContentLoaded', () => {
    const revealEls = document.querySelectorAll(
        '.project, .trust, .about-content, .portfolio h2, .portfolio .section-subtitle, .about h2, .contact h2, .contact .section-subtitle, .contact-info, .social-links'
    );

    if (reduceMotion) {
        revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
        revealEls.forEach(el => el.classList.add('reveal'));
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // Run scroll handler once to set initial state
    onScroll();
});

// --- Video lazy loading ---
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.load();
                videoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    videos.forEach(video => videoObserver.observe(video));
});

// --- Count-up animation for key stats ---
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number[data-target]');

    const formatValue = (el, value) => {
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        return value.toFixed(decimals) + suffix;
    };

    if (reduceMotion) {
        // Values already correct in HTML; nothing to animate
        return;
    }

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            countObserver.unobserve(el);

            const target = parseFloat(el.dataset.target);
            const duration = 1600;
            let startTime = null;

            const step = (timestamp) => {
                if (startTime === null) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // easeOutQuart
                const eased = 1 - Math.pow(1 - progress, 4);
                el.textContent = formatValue(el, target * eased);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = formatValue(el, target);
                }
            };
            window.requestAnimationFrame(step);
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => countObserver.observe(stat));
});
