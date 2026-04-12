// ZOL Website - Main JavaScript

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navigation behavior
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    var heroSection = document.getElementById('hero');
    
    // Cache hero bottom position
    var heroBottom = 0;
    
    function updateHeroBottom() {
        if (heroSection) {
            heroBottom = heroSection.getBoundingClientRect().bottom;
        }
    }
    
    // Compute once on load
    updateHeroBottom();
    
    // Recompute on resize
    window.addEventListener('resize', updateHeroBottom);
    
    // Show/hide navbar based on scroll position (throttled via rAF)
    var navTicking = false;
    
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
    
    window.addEventListener('scroll', handleNavScroll);
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            var isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        });
    }
});
