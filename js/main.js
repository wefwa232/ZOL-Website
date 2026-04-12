// ZOL Website - Main JavaScript

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============ LENIS SMOOTH SCROLL ============
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// ============ PRELOADER ============
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    setTimeout(function() {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Start hero animations after preloader
        initHeroAnimations();
    }, 1600);
});

// ============ NAVIGATION ============
(function() {
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var heroSection = document.getElementById('hero');
    var heroBottom = 0;
    var navTicking = false;

    function updateHeroBottom() {
        if (heroSection) {
            heroBottom = heroSection.getBoundingClientRect().bottom;
        }
    }

    updateHeroBottom();
    window.addEventListener('resize', updateHeroBottom);

    function handleNavScroll() {
        if (!navTicking && navbar) {
            window.requestAnimationFrame(function() {
                if (heroBottom <= 0) {
                    navbar.classList.remove('-translate-y-full');
                    navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
                } else {
                    navbar.classList.add('-translate-y-full');
                    navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
                }
                navTicking = false;
            });
            navTicking = true;
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            var isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', function(e) {
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
    // Typed.js headline
    var typedElement = document.getElementById('typed-headline');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-headline', {
            strings: ['Lesen Eröffnet<br><span class="text-gradient">Neue Welten</span>', 'Geschichten Verbinden<br><span class="text-gradient">Menschen</span>', 'Lernen Macht<br><span class="text-gradient">Freude</span>'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            contentType: 'html'
        });
    }

    // GSAP hero entrance
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: 'power2.out' });
    gsap.from('.hero-description', { opacity: 0, y: 30, duration: 0.8, delay: 0.5, ease: 'power2.out' });
    gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, delay: 0.7, ease: 'power2.out' });
    gsap.from('.hero-scroll', { opacity: 0, duration: 0.6, delay: 1.2, ease: 'power2.out' });

    // Particle parallax on mouse move
    var heroParticles = document.getElementById('hero-particles');
    if (heroParticles) {
        var particles = heroParticles.querySelectorAll('.particle');
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            particles.forEach(function(p, i) {
                var speed = (i + 1) * 8;
                gsap.to(p, {
                    x: x * speed,
                    y: y * speed,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ============ GSAP SCROLL ANIMATIONS ============
// General reveal animations with re-triggering
function initScrollAnimations() {
    // Fade up reveals
    gsap.utils.toArray('.gs-reveal').forEach(function(el) {
        var delay = parseFloat(el.getAttribute('data-gs-delay')) || 0;
        gsap.fromTo(el, 
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8, delay: delay, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Fade left reveals
    gsap.utils.toArray('.gs-reveal-left').forEach(function(el) {
        gsap.fromTo(el,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Fade right reveals
    gsap.utils.toArray('.gs-reveal-right').forEach(function(el) {
        gsap.fromTo(el,
            { opacity: 0, x: 50 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Section number fade-in
    gsap.utils.toArray('.section-number').forEach(function(el) {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1, scale: 1, duration: 1, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// ============ ANIMATED COUNTERS ============
function initCounters() {
    gsap.utils.toArray('.counter').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (!target) return;

        var counter = { val: 0 };
        
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: function() {
                gsap.to(counter, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        el.textContent = Math.round(counter.val) + (target >= 100 && el.closest('.stat-item') && el.nextElementSibling && el.nextElementSibling.textContent.includes('%') ? '' : '+');
                    }
                });
            },
            onLeaveBack: function() {
                counter.val = 0;
                el.textContent = '0';
            }
        });
    });
}

// ============ 3D TILT EFFECT ============
function initTiltCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.tilt-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -8;
            var rotateY = ((x - centerX) / centerX) * 8;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.4,
                ease: 'power2.out',
                transformPerspective: 800
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ============ MAGNETIC BUTTONS ============
function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.magnetic-btn').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ============ SCROLL PROGRESS BAR ============
function initScrollProgress() {
    var progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

// ============ BACK TO TOP BUTTON ============
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var progressRing = btn.querySelector('.progress-ring');
    
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = scrollTop / docHeight;
        
        // Show/hide button
        if (scrollTop > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }

        // Update progress ring
        if (progressRing) {
            var circumference = 100;
            progressRing.style.strokeDashoffset = circumference - (progress * circumference);
        }
    }, { passive: true });

    btn.addEventListener('click', function() {
        lenis.scrollTo(0);
    });
}

// ============ SWIPER TESTIMONIALS ============
function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        speed: 600,
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 32
            }
        }
    });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });
}

// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCounters();
    initTiltCards();
    initMagneticButtons();
    initScrollProgress();
    initBackToTop();
    initSwiper();
    initSmoothScroll();

    // Refresh ScrollTrigger after all elements are rendered
    ScrollTrigger.refresh();
});
