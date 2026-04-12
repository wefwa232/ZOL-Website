# ZOL Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visually striking, single-page showcase website for the ZOL reading project at Gaißau Volksschule, deployable on GitHub Pages.

**Architecture:** Single HTML file with Tailwind CSS (CDN), AOS animations, and minimal vanilla JavaScript. All content on one scrollable page with sticky navigation.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Google Fonts (Nunito + Source Sans 3), AOS library, Vanilla JavaScript, GitHub Pages.

---

### Task 1: Project Scaffold & Base HTML

**Files:**
- Create: `index.html`
- Create: `css/custom.css`
- Create: `js/main.js`
- Create: `images/` (empty directory)

- [ ] **Step 1: Create the base HTML structure**

Create `index.html` with:
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZOL — Zukunft Orientiertes Lernen</title>
    <meta name="description" content="ZOL brings reading and interactive learning projects to Gaißau Volksschule.">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
    
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            yellow: '#F59E0B',
                            green: '#10B981',
                            coral: '#F97316',
                            cream: '#FFFBEB',
                            charcoal: '#1F2937',
                            gray: '#6B7280',
                        }
                    },
                    fontFamily: {
                        heading: ['Nunito', 'sans-serif'],
                        body: ['Source Sans 3', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="font-body bg-brand-cream text-brand-charcoal antialiased">
    
    <!-- Navigation (will be populated in Task 2) -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50"></nav>
    
    <!-- Hero Section (will be populated in Task 3) -->
    <section id="hero"></section>
    
    <!-- About Section (will be populated in Task 4) -->
    <section id="about"></section>
    
    <!-- Team Section (will be populated in Task 5) -->
    <section id="team"></section>
    
    <!-- Activities Section (will be populated in Task 6) -->
    <section id="activities"></section>
    
    <!-- Schedule Section (will be populated in Task 7) -->
    <section id="schedule"></section>
    
    <!-- Contact Section (will be populated in Task 8) -->
    <section id="contact"></section>
    
    <!-- Footer (will be populated in Task 9) -->
    <footer id="footer"></footer>
    
    <!-- AOS Script -->
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    
    <!-- Main JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create custom.css with base styles**

Create `css/custom.css`:
```css
/* Custom styles for ZOL website */

/* Override Tailwind CDN limitations */
@layer base {
    html {
        font-family: 'Source Sans 3', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Nunito', sans-serif;
    }
}

@layer components {
    /* Custom component classes */
    .btn-primary {
        @apply bg-brand-yellow text-white font-heading font-semibold px-8 py-3 rounded-full 
               hover:bg-brand-coral hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg;
    }
    
    .btn-secondary {
        @apply bg-brand-green text-white font-heading font-semibold px-8 py-3 rounded-full 
               hover:bg-emerald-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg;
    }
    
    .card {
        @apply bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 
               transition-all duration-300 overflow-hidden;
    }
    
    .section-padding {
        @apply py-20 px-6 md:px-12 lg:px-24;
    }
    
    .section-title {
        @apply font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4;
    }
    
    .section-subtitle {
        @apply text-brand-gray text-lg md:text-xl max-w-2xl;
    }
}

@layer utilities {
    /* Custom utility classes */
    .text-gradient {
        @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-yellow to-brand-coral;
    }
}
```

- [ ] **Step 3: Create main.js with base setup**

Create `js/main.js`:
```javascript
// ZOL Website - Main JavaScript

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
});
```

- [ ] **Step 4: Verify the scaffold loads correctly**

Open `index.html` in a browser. Verify:
- Page loads with cream background
- No console errors
- Google Fonts are loaded (check Network tab)
- Tailwind classes work (add a temporary `<div class="bg-brand-yellow p-4">test</div>` to verify)

---

### Task 2: Navigation Bar

**Files:**
- Modify: `index.html` — populate `<nav id="navbar">`
- Modify: `js/main.js` — add nav scroll behavior

- [ ] **Step 1: Add navigation HTML**

Replace the `<nav id="navbar">` section in `index.html` with:
```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 -translate-y-full">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="#hero" class="font-heading font-bold text-2xl text-brand-charcoal hover:text-brand-yellow transition-colors">
            ZOL
        </a>
        
        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
            <a href="#about" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium">About</a>
            <a href="#team" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium">Team</a>
            <a href="#activities" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium">Activities</a>
            <a href="#schedule" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium">Schedule</a>
            <a href="#contact" class="btn-primary text-sm px-6 py-2">Contact</a>
        </div>
        
        <!-- Mobile Hamburger Button -->
        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-brand-yellow/10 transition-colors" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        </button>
    </div>
    
    <!-- Mobile Menu Dropdown -->
    <div id="mobile-menu" class="hidden md:hidden bg-white shadow-lg rounded-b-2xl mx-4 overflow-hidden">
        <div class="flex flex-col p-6 gap-4">
            <a href="#about" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium text-lg">About</a>
            <a href="#team" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium text-lg">Team</a>
            <a href="#activities" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium text-lg">Activities</a>
            <a href="#schedule" class="font-body text-brand-charcoal hover:text-brand-yellow transition-colors font-medium text-lg">Schedule</a>
            <a href="#contact" class="btn-primary text-center text-sm px-6 py-2">Contact</a>
        </div>
    </div>
</nav>
```

- [ ] **Step 2: Add navigation JavaScript**

Add to `js/main.js`:
```javascript
// Navigation behavior
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const heroSection = document.getElementById('hero');

// Show/hide navbar based on scroll position
function handleNavScroll() {
    if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
        } else {
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
        }
    }
}

window.addEventListener('scroll', handleNavScroll);

// Mobile menu toggle
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}
```

- [ ] **Step 3: Verify navigation**

Open `index.html` and verify:
- Nav is hidden initially (over the hero)
- Scroll down past hero — nav slides in with white background
- Scroll back to top — nav hides
- Mobile: hamburger button toggles menu
- All links scroll smoothly to their sections

---

### Task 3: Hero Section

**Files:**
- Modify: `index.html` — populate `<section id="hero">`
- Modify: `css/custom.css` — add hero-specific animations

- [ ] **Step 1: Add hero HTML**

Replace the `<section id="hero">` in `index.html` with:
```html
<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-cream via-amber-50 to-brand-cream">
    <!-- Floating SVG Background Shapes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <!-- Star 1 -->
        <svg class="absolute top-1/4 left-[10%] w-12 h-12 text-brand-yellow/30 floating-shape" style="animation-delay: 0s;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <!-- Book Icon -->
        <svg class="absolute top-1/3 right-[15%] w-16 h-16 text-brand-green/20 floating-shape" style="animation-delay: 1s;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zM4 18V6h7v12H4zm9 0V6h7v12h-7z"/>
        </svg>
        <!-- Star 2 -->
        <svg class="absolute bottom-1/3 left-[20%] w-8 h-8 text-brand-coral/25 floating-shape" style="animation-delay: 2s;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <!-- Leaf -->
        <svg class="absolute top-[60%] right-[25%] w-10 h-10 text-brand-green/20 floating-shape" style="animation-delay: 0.5s;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
    </div>
    
    <!-- Hero Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p class="text-brand-green font-heading font-semibold text-lg md:text-xl mb-4 tracking-wide" data-aos="fade-down" data-aos-delay="200">
            Zukunft Orientiertes Lernen
        </p>
        <h1 class="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl text-brand-charcoal mb-6 leading-tight" data-aos="fade-up" data-aos-delay="400">
            Reading Opens<br>
            <span class="text-gradient">New Worlds</span>
        </h1>
        <p class="text-brand-gray text-xl md:text-2xl mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="600">
            Interactive reading and learning projects at Gaißau Volksschule, inspiring young minds one story at a time.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="800">
            <a href="#about" class="btn-primary text-lg px-10 py-4">Discover Our Project</a>
            <a href="#activities" class="btn-secondary text-lg px-10 py-4">See Activities</a>
        </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2" data-aos="fade-up" data-aos-delay="1200">
        <a href="#about" class="block animate-bounce">
            <svg class="w-8 h-8 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
        </a>
    </div>
</section>
```

- [ ] **Step 2: Add floating animation CSS**

Add to `css/custom.css`:
```css
/* Floating animation for hero shapes */
@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(5deg);
    }
}

.floating-shape {
    animation: float 6s ease-in-out infinite;
}
```

- [ ] **Step 3: Verify hero section**

Open `index.html` and verify:
- Full viewport height hero with gradient background
- Floating SVG shapes animate gently
- Title has gradient text effect
- Both buttons are styled and clickable
- Scroll indicator bounces
- AOS animations fire on load
- Content is centered and readable

---

### Task 4: About Section

**Files:**
- Modify: `index.html` — populate `<section id="about">`

- [ ] **Step 1: Add about section HTML**

Replace the `<section id="about">` in `index.html` with:
```html
<section id="about" class="section-padding bg-white relative">
    <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="section-title">About ZOL</h2>
            <p class="section-subtitle mx-auto">Zukunft Orientiertes Lernen — Future-Oriented Learning</p>
        </div>
        
        <!-- Two Column Layout -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <!-- Left: Text Content -->
            <div data-aos="fade-right">
                <h3 class="font-heading text-2xl font-bold text-brand-charcoal mb-4">
                    Inspiring Young Readers at Gaißau Volksschule
                </h3>
                <div class="space-y-4 text-brand-gray text-lg leading-relaxed">
                    <p>
                        ZOL (Zukunft Orientiertes Lernen) is a student-led initiative dedicated to promoting reading and interactive learning among young children. Our project group regularly visits Gaißau Volksschule to create engaging, fun, and educational experiences.
                    </p>
                    <p>
                        Through storytelling, interactive reading sessions, and creative activities, we help children discover the joy of reading while building confidence and imagination. Every visit brings new adventures — from picture book explorations to collaborative story creation.
                    </p>
                    <p>
                        Our mission is simple: make learning feel like play, and reading feel like an adventure.
                    </p>
                </div>
            </div>
            
            <!-- Right: Image Card -->
            <div class="card p-2" data-aos="fade-left">
                <div class="bg-gradient-to-br from-brand-yellow/20 to-brand-green/20 rounded-xl aspect-[4/3] flex items-center justify-center">
                    <div class="text-center p-8">
                        <svg class="w-20 h-20 mx-auto text-brand-yellow/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <p class="text-brand-gray font-medium">Group Photo Placeholder</p>
                        <p class="text-brand-gray text-sm">Replace with actual image</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify about section**

Open `index.html` and scroll to the About section. Verify:
- Section has white background (contrasts with cream hero)
- Two-column layout on desktop, stacks on mobile
- Text is readable with good line height
- Image placeholder card has subtle styling
- AOS animations trigger on scroll

---

### Task 5: Team Section

**Files:**
- Modify: `index.html` — populate `<section id="team">`

- [ ] **Step 1: Add team section HTML**

Replace the `<section id="team">` in `index.html` with:
```html
<section id="team" class="section-padding bg-brand-cream relative">
    <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="section-title">Unser Team</h2>
            <p class="section-subtitle mx-auto">Meet the passionate students behind ZOL</p>
        </div>
        
        <!-- Team Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <!-- Team Member 1 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="100">
                <div class="bg-gradient-to-br from-amber-100 to-orange-50 aspect-square flex items-center justify-center">
                    <svg class="w-24 h-24 text-brand-yellow/40 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
                <div class="p-6 text-center">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal">Team Member</h3>
                    <p class="text-brand-green font-medium">Project Lead</p>
                </div>
            </div>
            
            <!-- Team Member 2 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="200">
                <div class="bg-gradient-to-br from-emerald-100 to-green-50 aspect-square flex items-center justify-center">
                    <svg class="w-24 h-24 text-brand-green/40 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
                <div class="p-6 text-center">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal">Team Member</h3>
                    <p class="text-brand-green font-medium">Reading Coordinator</p>
                </div>
            </div>
            
            <!-- Team Member 3 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="300">
                <div class="bg-gradient-to-br from-coral-100 to-orange-50 aspect-square flex items-center justify-center">
                    <svg class="w-24 h-24 text-brand-coral/40 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
                <div class="p-6 text-center">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal">Team Member</h3>
                    <p class="text-brand-green font-medium">Activity Designer</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add coral color to Tailwind config**

Update the Tailwind config script in `index.html` `<head>` to add coral:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    yellow: '#F59E0B',
                    green: '#10B981',
                    coral: '#F97316',
                    cream: '#FFFBEB',
                    charcoal: '#1F2937',
                    gray: '#6B7280',
                },
                coral: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                }
            },
            fontFamily: {
                heading: ['Nunito', 'sans-serif'],
                body: ['Source Sans 3', 'sans-serif'],
            }
        }
    }
}
```

- [ ] **Step 3: Verify team section**

Open `index.html` and scroll to the Team section. Verify:
- Three team cards in a responsive grid
- Each card has a placeholder avatar icon with different gradient backgrounds
- Cards lift on hover with shadow effect
- Names and roles are displayed
- Staggered AOS animations (100ms, 200ms, 300ms delays)

---

### Task 6: Activities Section

**Files:**
- Modify: `index.html` — populate `<section id="activities">`

- [ ] **Step 1: Add activities section HTML**

Replace the `<section id="activities">` in `index.html` with:
```html
<section id="activities" class="section-padding bg-white relative">
    <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="section-title">Unsere Aktivitäten</h2>
            <p class="section-subtitle mx-auto">Discover the fun and interactive learning experiences we create</p>
        </div>
        
        <!-- Activities Grid -->
        <div class="grid md:grid-cols-2 gap-8">
            <!-- Activity 1 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="100">
                <div class="bg-gradient-to-br from-yellow-50 to-amber-50 aspect-video flex items-center justify-center">
                    <svg class="w-16 h-16 text-brand-yellow/50 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                </div>
                <div class="p-6">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal mb-2">Interactive Storytelling</h3>
                    <p class="text-brand-gray">Bringing picture books to life with props, voices, and audience participation. Children become part of the story!</p>
                </div>
            </div>
            
            <!-- Activity 2 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="200">
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 aspect-video flex items-center justify-center">
                    <svg class="w-16 h-16 text-brand-green/50 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                </div>
                <div class="p-6">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal mb-2">Creative Reading Games</h3>
                    <p class="text-brand-gray">Word puzzles, reading challenges, and imagination exercises that make literacy skills feel like playtime.</p>
                </div>
            </div>
            
            <!-- Activity 3 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="300">
                <div class="bg-gradient-to-br from-orange-50 to-amber-50 aspect-video flex items-center justify-center">
                    <svg class="w-16 h-16 text-brand-coral/50 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                </div>
                <div class="p-6">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal mb-2">Group Reading Circles</h3>
                    <p class="text-brand-gray">Small groups reading together, taking turns, and discussing stories — building confidence and community.</p>
                </div>
            </div>
            
            <!-- Activity 4 -->
            <div class="card group" data-aos="fade-up" data-aos-delay="400">
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 aspect-video flex items-center justify-center">
                    <svg class="w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    </svg>
                </div>
                <div class="p-6">
                    <h3 class="font-heading font-bold text-xl text-brand-charcoal mb-2">Story Illustration Workshop</h3>
                    <p class="text-brand-gray">Children draw and create their own illustrations for stories, combining art and literacy in a hands-on way.</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify activities section**

Open `index.html` and scroll to the Activities section. Verify:
- Four activity cards in a 2-column grid
- Each card has a unique icon and gradient background
- Cards have hover lift effects
- Titles and descriptions are clear
- Staggered AOS animations

---

### Task 7: Schedule Section

**Files:**
- Modify: `index.html` — populate `<section id="schedule">`

- [ ] **Step 1: Add schedule section HTML**

Replace the `<section id="schedule">` in `index.html` with:
```html
<section id="schedule" class="section-padding bg-brand-cream relative">
    <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="section-title">Termine & Ereignisse</h2>
            <p class="section-subtitle mx-auto">Upcoming visits and events at Gaißau Volksschule</p>
        </div>
        
        <!-- Events Timeline -->
        <div class="space-y-6">
            <!-- Event 1 -->
            <div class="card flex items-start gap-6 p-6" data-aos="fade-up" data-aos-delay="100">
                <!-- Date Badge -->
                <div class="flex-shrink-0 w-16 h-16 bg-brand-yellow rounded-full flex flex-col items-center justify-center text-white">
                    <span class="font-heading font-bold text-xl leading-none">15</span>
                    <span class="text-xs font-medium">MAY</span>
                </div>
                <!-- Event Details -->
                <div class="flex-1">
                    <h3 class="font-heading font-bold text-lg text-brand-charcoal">First Reading Session</h3>
                    <p class="text-brand-gray mt-1">Introduction to interactive storytelling with Grade 1-2 students. Picture books and group reading activities.</p>
                    <p class="text-brand-gray text-sm mt-2">
                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        9:00 AM - 11:00 AM
                    </p>
                </div>
            </div>
            
            <!-- Event 2 -->
            <div class="card flex items-start gap-6 p-6" data-aos="fade-up" data-aos-delay="200">
                <div class="flex-shrink-0 w-16 h-16 bg-brand-green rounded-full flex flex-col items-center justify-center text-white">
                    <span class="font-heading font-bold text-xl leading-none">22</span>
                    <span class="text-xs font-medium">MAY</span>
                </div>
                <div class="flex-1">
                    <h3 class="font-heading font-bold text-lg text-brand-charcoal">Creative Writing Workshop</h3>
                    <p class="text-brand-gray mt-1">Children create their own stories with guidance from our team. Illustration and storytelling combined.</p>
                    <p class="text-brand-gray text-sm mt-2">
                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        9:00 AM - 12:00 PM
                    </p>
                </div>
            </div>
            
            <!-- Event 3 -->
            <div class="card flex items-start gap-6 p-6" data-aos="fade-up" data-aos-delay="300">
                <div class="flex-shrink-0 w-16 h-16 bg-brand-coral rounded-full flex flex-col items-center justify-center text-white">
                    <span class="font-heading font-bold text-xl leading-none">05</span>
                    <span class="text-xs font-medium">JUN</span>
                </div>
                <div class="flex-1">
                    <h3 class="font-heading font-bold text-lg text-brand-charcoal">Reading Festival</h3>
                    <p class="text-brand-gray mt-1">A special event celebrating reading with games, prizes, and a mini book fair. Parents welcome!</p>
                    <p class="text-brand-gray text-sm mt-2">
                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        10:00 AM - 2:00 PM
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Verify schedule section**

Open `index.html` and scroll to the Schedule section. Verify:
- Three event cards with colored date badges (yellow, green, coral)
- Each card shows event title, description, and time
- Cards have consistent styling
- Timeline-like visual flow

---

### Task 8: Contact Section

**Files:**
- Modify: `index.html` — populate `<section id="contact">`

- [ ] **Step 1: Add contact section HTML**

Replace the `<section id="contact">` in `index.html` with:
```html
<section id="contact" class="relative py-20 px-6 bg-gradient-to-r from-brand-yellow to-brand-coral overflow-hidden">
    <!-- Decorative Background -->
    <div class="absolute inset-0 opacity-10" aria-hidden="true">
        <svg class="absolute -top-10 -right-10 w-64 h-64" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg class="absolute -bottom-10 -left-10 w-48 h-48" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    </div>
    
    <div class="relative z-10 max-w-3xl mx-auto text-center" data-aos="fade-up">
        <h2 class="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Interested in Learning More?</h2>
        <p class="text-white/90 text-xl mb-8">We'd love to hear from you! Whether you're a parent, teacher, or fellow student — reach out and join our reading adventure.</p>
        <a href="mailto:zol@example.com" class="inline-block bg-white text-brand-charcoal font-heading font-semibold px-10 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Get in Touch
        </a>
    </div>
</section>
```

- [ ] **Step 2: Verify contact section**

Open `index.html` and scroll to the Contact section. Verify:
- Gradient background (yellow to coral)
- White text and button
- Decorative star shapes in background
- Email link works (mailto:)
- Button has hover effect

---

### Task 9: Footer

**Files:**
- Modify: `index.html` — populate `<footer id="footer">`

- [ ] **Step 1: Add footer HTML**

Replace the `<footer id="footer">` in `index.html` with:
```html
<footer id="footer" class="bg-brand-charcoal py-8 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-white/60 text-sm">
            &copy; 2026 ZOL — Zukunft Orientiertes Lernen. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
            <a href="#hero" class="text-white/60 hover:text-brand-yellow transition-colors text-sm">Back to Top</a>
        </div>
    </div>
</footer>
```

- [ ] **Step 2: Verify footer**

Open `index.html` and scroll to the bottom. Verify:
- Dark charcoal background
- Copyright text is visible
- "Back to Top" link scrolls to hero
- Footer is responsive (stacks on mobile)

---

### Task 10: Final Polish & README

**Files:**
- Modify: `js/main.js` — add final touchups
- Create: `README.md`

- [ ] **Step 1: Add smooth scroll and final JS polish**

Update `js/main.js` to include smooth scroll for all anchor links:
```javascript
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
});

// Navigation behavior
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const heroSection = document.getElementById('hero');

// Show/hide navbar based on scroll position
function handleNavScroll() {
    if (heroSection) {
        var heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
        } else {
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm', 'translate-y-0');
        }
    }
}

window.addEventListener('scroll', handleNavScroll);

// Mobile menu toggle
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}
```

- [ ] **Step 2: Create README.md**

Create `README.md`:
```markdown
# ZOL — Zukunft Orientiertes Lernen

A showcase website for the ZOL reading project at Gaißau Volksschule.

## About

ZOL (Zukunft Orientiertes Lernen) is a student-led initiative dedicated to promoting reading and interactive learning among young children at Gaißau Volksschule.

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Google Fonts (Nunito + Source Sans 3)
- AOS (Animate on Scroll)
- Vanilla JavaScript

## How to Update Content

### Editing Text
Open `index.html` in any text editor and find the section you want to edit. All text is directly in the HTML — just change the content between tags.

### Adding Images
1. Place your images in the `images/` folder
2. Replace placeholder SVG blocks with `<img>` tags:
   ```html
   <img src="images/your-photo.jpg" alt="Description" class="w-full h-full object-cover rounded-xl">
   ```

### Updating Team Members
Find the team cards in the `#team` section and edit the names/roles. Add more cards by copying an existing card block.

### Updating Events
Find the event cards in the `#schedule` section and edit dates, titles, and descriptions.

## Deployment (GitHub Pages)

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select `main` branch as source
4. Your site will be live at `https://yourusername.github.io/repository-name`

## License

This project is for educational purposes.
```

- [ ] **Step 3: Final verification**

Open `index.html` in a browser and do a full scroll-through. Verify:
- All sections load and display correctly
- Navigation works (desktop + mobile)
- All AOS animations trigger
- No console errors
- Page is fully responsive (test at different viewport sizes)
- All links work (internal scroll + email mailto)

---

### Task 11: GitHub Pages Deployment Setup

**Files:**
- No file changes needed

- [ ] **Step 1: Initialize git repository (if not already done)**

```bash
git init
git add .
git commit -m "Initial commit: ZOL website"
```

- [ ] **Step 2: Create GitHub repository and push**

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/zol-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select branch: `main`, folder: `/ (root)`
5. Click Save
6. Your site will be live at `https://YOUR_USERNAME.github.io/zol-website`
