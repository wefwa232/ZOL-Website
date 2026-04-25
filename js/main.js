// ZOL Website - Main JavaScript
gsap.registerPlugin(ScrollTrigger);

// ============ THEME TOGGLE ============
(function () {
    var toggle = document.getElementById('theme-toggle');
    var sunIcon = document.querySelector('.theme-icon-sun');
    var moonIcon = document.querySelector('.theme-icon-moon');
    var indicator = document.getElementById('theme-indicator');
    var isAnimating = false;

    function setTheme(dark) {
        document.documentElement.classList.toggle('dark', dark);
        if (toggle) toggle.setAttribute('aria-pressed', String(dark));
        try {
            localStorage.setItem('zol-theme', dark ? 'dark' : 'light');
        } catch (e) {
            // Theme still works when storage is unavailable.
        }
    }

    // Check saved preference or system preference
    var saved = null;
    try { saved = localStorage.getItem('zol-theme'); } catch (e) { saved = null; }
    var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Set initial indicator position
    if (isDark) {
        if (indicator) indicator.style.transform = 'translateX(36px)';
        setTheme(true);
    }

    function switchTheme() {
        if (isAnimating) return;
        isAnimating = true;

        var currentlyDark = document.documentElement.classList.contains('dark');
        var goingDark = !currentlyDark;

        // Animate indicator slide
        if (indicator) {
            gsap.to(indicator, {
                x: goingDark ? 36 : 0,
                duration: 0.4,
                ease: 'power2.inOut',
                backgroundColor: goingDark ? '#818CF8' : '#F59E0B',
                onComplete: function () {
                    setTheme(goingDark);
                    setTimeout(function () { isAnimating = false; }, 200);
                }
            });
        }

        // Icon spin animation
        if (sunIcon && moonIcon) {
            var spinIcon = goingDark ? sunIcon : moonIcon;
            gsap.to(spinIcon, {
                rotation: goingDark ? -180 : 180,
                scale: 0.5,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: function () {
                    if (goingDark) {
                        sunIcon.style.opacity = '0.4';
                        moonIcon.style.opacity = '1';
                    } else {
                        sunIcon.style.opacity = '1';
                        moonIcon.style.opacity = '0.4';
                    }
                    gsap.to(spinIcon, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
            });
        }
    }

    if (toggle) {
        toggle.addEventListener('click', switchTheme);
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTheme(); }
        });
    }

    // Set initial icon opacities
    if (sunIcon && moonIcon) {
        sunIcon.style.opacity = isDark ? '0.4' : '1';
        moonIcon.style.opacity = isDark ? '1' : '0.4';
    }
})();

// ============ PRELOADER ============
window.addEventListener('load', function () {
    setTimeout(function () {
        var preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
        initHeroAnimations();
    }, 250);
});

// ============ NAVIGATION ============
(function () {
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var heroSection = document.getElementById('hero');
    var navTicking = false;

    function isPastHero() {
        return heroSection ? heroSection.getBoundingClientRect().bottom <= 0 : window.scrollY > 0;
    }

    // Navbar: always visible, add shadow on scroll
    function handleNavScroll() {
        if (!navTicking && navbar) {
            window.requestAnimationFrame(function () {
                if (isPastHero()) {
                    navbar.classList.add('shadow-md');
                } else {
                    navbar.classList.remove('shadow-md');
                }
                navTicking = false;
            });
            navTicking = true;
        }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            var isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
            mobileMenu.setAttribute('aria-hidden', String(isOpen));
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.focus();
            }
        });
    }
})();

// ============ HERO ANIMATIONS ============
function initHeroAnimations() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-headline', {
            strings: ['Lesen Eröffnet<br><span class="text-gradient">Neue Welten</span>', 'Geschichten Verbinden<br><span class="text-gradient">Menschen</span>', 'Lernen Macht<br><span class="text-gradient">Freude</span>'],
            typeSpeed: 50, backSpeed: 30, backDelay: 2500, loop: true, showCursor: true, cursorChar: '|', contentType: 'html'
        });
    }
    gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
    gsap.fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' });
    gsap.fromTo('.hero-buttons', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out' });
    gsap.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2, ease: 'power2.out' });

    var heroParticles = document.getElementById('hero-particles');
    if (heroParticles) {
        var particles = heroParticles.querySelectorAll('.particle');
        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;
            particles.forEach(function (p, i) {
                gsap.to(p, { x: x * (i + 1) * 8, y: y * (i + 1) * 8, duration: 1, ease: 'power2.out' });
            });
        });
    }
}

// ============ GSAP SCROLL ANIMATIONS (re-trigger on scroll up AND down) ============
function initScrollAnimations() {
    gsap.utils.toArray('.gs-reveal').forEach(function (el) {
        var delay = parseFloat(el.getAttribute('data-gs-delay')) || 0;
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8, delay: delay, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom top',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-left').forEach(function (el) {
        gsap.fromTo(el,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el, start: 'top 85%', end: 'bottom top',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-right').forEach(function (el) {
        gsap.fromTo(el,
            { opacity: 0, x: 50 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el, start: 'top 85%', end: 'bottom top',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });
}

// ============ COUNTERS (re-trigger) ============
function initCounters() {
    gsap.utils.toArray('.counter').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (!target) return;
        var counter = { val: 0 };

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            end: 'top 20%',
            onEnter: function () { animateCounter(el, counter, target); },
            onEnterBack: function () { animateCounter(el, counter, target); },
            onLeave: function () { counter.val = 0; el.textContent = '0'; },
            onLeaveBack: function () { counter.val = 0; el.textContent = '0'; }
        });
    });
}

function animateCounter(el, counter, target) {
    gsap.to(counter, {
        val: target, duration: 2, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(counter.val) + '+'; }
    });
}

// ============ 3D TILT ============
function initTiltCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.tilt-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
            var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
            gsap.to(card, { rotateX: rotateX, rotateY: rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
        });
        card.addEventListener('mouseleave', function () {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ============ MAGNETIC BUTTONS ============
function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', function () {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });
}

// ============ SCROLL PROGRESS ============
function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
        var scroll = window.scrollY;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (scroll / max * 100) : 0) + '%';
    }, { passive: true });
}

// ============ BACK TO TOP ============
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    var ring = btn.querySelector('.progress-ring');
    window.addEventListener('scroll', function () {
        var scroll = window.scrollY;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (scroll > 500) btn.classList.add('visible');
        else btn.classList.remove('visible');
        if (ring) ring.style.strokeDashoffset = 100 - (max > 0 ? (scroll / max * 100) : 0);
    }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ============ SWIPER ============
function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    new Swiper('.testimonial-swiper', {
        slidesPerView: 1, spaceBetween: 24, loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        speed: 600
    });
}

// ============ GLIGHTBOX ============
function initGLightbox() {
    if (typeof GLightbox === 'undefined') return;
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
}

// ============ FAQ ACCORDION ============
function initFAQ() {
    document.querySelectorAll('.faq-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var wasActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(function (faq) {
                faq.classList.remove('active');
                var faqBtn = faq.querySelector('.faq-toggle');
                if (faqBtn) faqBtn.setAttribute('aria-expanded', 'false');
            });

            if (!wasActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ============ MOUSE GLOW ============
function initMouseGlow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glow = document.getElementById('mouse-glow');
    if (!glow) return;

    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let targetX = -500, targetY = -500;
    let currentX = -500, currentY = -500;

    document.addEventListener('mousemove', function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        if (glow.style.opacity === '0' || glow.style.opacity === '') {
            glow.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', function () {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', function () {
    initMouseGlow();
    initScrollAnimations();
    initCounters();
    initTiltCards();
    initMagneticButtons();
    initScrollProgress();
    initBackToTop();
    initSwiper();
    initGLightbox();
    initFAQ();
    initSmoothScroll();
    ScrollTrigger.refresh();
});
