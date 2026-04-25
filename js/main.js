// ZOL Website - minimal interaction system
(function () {
    var hasGsap = typeof gsap !== 'undefined';
    if (hasGsap && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    function createIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    function hidePreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) return;
        setTimeout(function () {
            preloader.classList.add('hidden');
            initHeroAnimations();
        }, 220);
    }

    function initNavigation() {
        var navbar = document.getElementById('navbar');
        var mobileMenuBtn = document.getElementById('mobile-menu-btn');
        var mobileMenu = document.getElementById('mobile-menu');
        var ticking = false;

        function updateNav() {
            if (!navbar) return;
            navbar.classList.toggle('scrolled', window.scrollY > 16);
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
        updateNav();

        function setMenu(open) {
            if (!mobileMenuBtn || !mobileMenu) return;
            mobileMenu.classList.toggle('hidden', !open);
            mobileMenuBtn.setAttribute('aria-expanded', String(open));
            mobileMenu.setAttribute('aria-hidden', String(!open));
        }

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function () {
                setMenu(mobileMenu.classList.contains('hidden'));
            });

            mobileMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () { setMenu(false); });
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    setMenu(false);
                    mobileMenuBtn.focus();
                }
            });
        }
    }

    function initHeroAnimations() {
        if (!hasGsap) {
            document.querySelectorAll('.hero-copy, .hero-visual, .learning-board, .floating-note, .floating-strip').forEach(function (el) {
                el.style.opacity = '1';
            });
            return;
        }

        var timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        timeline
            .fromTo('.hero-copy', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9 })
            .fromTo('.learning-board', { opacity: 0, y: 44, rotate: -2, scale: 0.96 }, { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.1 }, '-=0.45')
            .fromTo('.floating-note', { opacity: 0, x: -28, y: 18 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, '-=0.65')
            .fromTo('.floating-strip', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
            .fromTo('.hero-visual', { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0);

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('.learning-board', {
                y: -42,
                rotate: 1.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    function initScrollReveals() {
        if (!hasGsap || typeof ScrollTrigger === 'undefined') {
            document.querySelectorAll('.gs-reveal').forEach(function (el) { el.style.opacity = '1'; });
            return;
        }

        gsap.utils.toArray('.gs-reveal').forEach(function (el) {
            var delay = parseFloat(el.getAttribute('data-gs-delay')) || 0;
            gsap.fromTo(el,
                { opacity: 0, y: 42 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 86%',
                        once: true
                    }
                }
            );
        });
    }

    function initCounters() {
        if (!hasGsap || typeof ScrollTrigger === 'undefined') return;

        gsap.utils.toArray('.counter').forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (!target) return;
            var counter = { val: 0 };

            ScrollTrigger.create({
                trigger: el,
                start: 'top 88%',
                once: true,
                onEnter: function () {
                    gsap.to(counter, {
                        val: target,
                        duration: 1.8,
                        ease: 'power2.out',
                        onUpdate: function () {
                            el.textContent = Math.round(counter.val) + (target === 100 ? '%' : '+');
                        }
                    });
                }
            });
        });
    }

    function initTiltCards() {
        if (!hasGsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.tilt-card').forEach(function (card) {
            card.addEventListener('mousemove', function (event) {
                var rect = card.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
                var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
                gsap.to(card, { rotateX: rotateX, rotateY: rotateY, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
            });
        });
    }

    function initMagneticButtons() {
        if (!hasGsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
            btn.addEventListener('mousemove', function (event) {
                var rect = btn.getBoundingClientRect();
                gsap.to(btn, {
                    x: (event.clientX - rect.left - rect.width / 2) * 0.18,
                    y: (event.clientY - rect.top - rect.height / 2) * 0.18,
                    duration: 0.25,
                    ease: 'power2.out'
                });
            });
            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.35)' });
            });
        });
    }

    function initCursorLight() {
        var glow = document.getElementById('cursor-light');
        if (!glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        var currentX = -400;
        var currentY = -400;
        var targetX = -400;
        var targetY = -400;

        document.addEventListener('mousemove', function (event) {
            targetX = event.clientX;
            targetY = event.clientY;
        });

        function tick() {
            currentX += (targetX - currentX) * 0.09;
            currentY += (targetY - currentY) * 0.09;
            glow.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px) translate(-50%, -50%)';
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    function initScrollProgress() {
        var bar = document.getElementById('scroll-progress');
        if (!bar) return;

        window.addEventListener('scroll', function () {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var progress = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = progress + '%';
        }, { passive: true });
    }

    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 520);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initSwiper() {
        if (typeof Swiper === 'undefined') return;
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 22,
            loop: true,
            speed: 700,
            autoplay: { delay: 5200, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    }

    function initGLightbox() {
        if (typeof GLightbox === 'undefined') return;
        GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
    }

    function initFAQ() {
        document.querySelectorAll('.faq-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var item = btn.closest('.faq-item');
                if (!item) return;
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

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                var selector = anchor.getAttribute('href');
                if (!selector || selector === '#') return;
                var target = document.querySelector(selector);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        createIcons();
        initNavigation();
        initScrollReveals();
        initCounters();
        initTiltCards();
        initMagneticButtons();
        initCursorLight();
        initScrollProgress();
        initBackToTop();
        initSwiper();
        initGLightbox();
        initFAQ();
        initSmoothScroll();
        if (hasGsap && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });

    window.addEventListener('load', hidePreloader);
})();
