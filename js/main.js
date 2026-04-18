// ZOL Website - Main JavaScript
gsap.registerPlugin(ScrollTrigger);

// ============ THEME TOGGLE ============
(function () {
    var toggle = document.getElementById('theme-toggle');
    var sunIcon = document.querySelector('.theme-icon-sun');
    var moonIcon = document.querySelector('.theme-icon-moon');
    var indicator = document.getElementById('theme-indicator');
    var isAnimating = false;

    function setTheme(dark, animate) {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('zol-theme', 'dark');
            document.body.style.background = '#0F2818';
            document.body.style.color = '#F7F3EC';
            var hero = document.getElementById('hero');
            if (hero) hero.style.background = '#0F2818';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('zol-theme', 'light');
            document.body.style.background = '#F7F3EC';
            document.body.style.color = '#1A1208';
            var hero2 = document.getElementById('hero');
            if (hero2) hero2.style.background = '#F7F3EC';
        }
    }

    // Check saved preference or system preference
    var saved = localStorage.getItem('zol-theme');
    var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Set initial indicator position
    if (isDark) {
        if (indicator) indicator.style.transform = 'translateX(36px)';
        setTheme(true, false);
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
                    setTheme(goingDark, false);
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
        document.getElementById('preloader').classList.add('hidden');
        initHeroAnimations();
    }, 1600);
});

// ============ NAVIGATION ============
(function () {
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var heroSection = document.getElementById('hero');
    var heroBottom = 0;
    var navTicking = false;

    function updateHeroBottom() {
        if (heroSection) heroBottom = heroSection.getBoundingClientRect().bottom;
    }
    updateHeroBottom();
    window.addEventListener('resize', updateHeroBottom);

    // Navbar: always visible, add shadow on scroll
    function handleNavScroll() {
        if (!navTicking && navbar) {
            window.requestAnimationFrame(function () {
                if (heroBottom <= 0) {
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
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        });
    }
})();

// ============ HERO ANIMATIONS ============
function initHeroAnimations() {
    // Animate horizontal rules stretching out (print press effect)
    var rules = document.querySelectorAll('.hero-rule');
    rules.forEach(function(rule, i) {
        setTimeout(function() {
            rule.classList.add('revealed');
        }, 200 + i * 400);
    });

    // Animate title lines sliding up from below (masking)
    var titleLines = document.querySelectorAll('.hero-title-line');
    titleLines.forEach(function(line, i) {
        setTimeout(function() {
            line.classList.add('revealed');
        }, 400 + i * 160);
    });

    // Metadata row fade in
    gsap.from('.hero-subtitle', { opacity: 0, y: 14, duration: 0.9, delay: 0.15, ease: 'power2.out' });

    // Main headline container opacity
    gsap.to('.hero-description', { opacity: 1, duration: 0.01, delay: 0.35 });

    // Kicker description and buttons
    gsap.from('.hero-buttons', { opacity: 0, y: 24, duration: 0.9, delay: 0.9, ease: 'power2.out' });
    gsap.to('.hero-buttons', { opacity: 1, duration: 0.01, delay: 0.85 });

    // Scroll indicator
    gsap.from('.hero-scroll', { opacity: 0, y: 12, duration: 0.7, delay: 1.3, ease: 'power2.out' });
    gsap.to('.hero-scroll', { opacity: 1, duration: 0.01, delay: 1.25 });
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
        bar.style.width = (scroll / max * 100) + '%';
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
        if (ring) ring.style.strokeDashoffset = 100 - (scroll / max * 100);
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
            // Close all
            document.querySelectorAll('.faq-item').forEach(function (faq) { faq.classList.remove('active'); });
            // Toggle current
            if (!wasActive) item.classList.add('active');
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
