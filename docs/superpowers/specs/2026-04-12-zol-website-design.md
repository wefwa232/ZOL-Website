# ZOL Website Design Specification

> **Project:** ZOL (Zukunft Orientiertes Lernen) — Gaißau Volksschule Reading Project
> **Date:** 2026-04-12
> **Status:** Approved

---

## Overview

A single-page showcase website for the ZOL project at Gaißau Volksschule. The site informs parents and teachers about the reading/interactive activities the project group conducts with children. Hosted on GitHub Pages, built with static HTML + Tailwind CSS (CDN) + minimal JavaScript.

## Design Direction: "Warm, Bright & Welcoming"

Inspired by sunlit learning spaces — genuine, warm, and inviting. Not corporate, not childish.

### Aesthetic Pillars
1. **Warmth** — Earthy, sunny tones evoking sunlight, growth, optimism
2. **Rounded & Soft** — No sharp edges, everything approachable
3. **Organic touches** — Subtle hand-drawn-feel SVG elements
4. **Generous white space** — Clean, uncluttered, premium feel

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Sunflower Yellow | `#F59E0B` | Buttons, highlights, accents |
| Secondary | Sage Green | `#10B981` | Secondary CTAs, success states |
| Accent | Warm Coral | `#F97316` | Important callouts, hover states |
| Background | Warm Cream | `#FFFBEB` | Main page background |
| Surface | Pure White | `#FFFFFF` | Cards, containers |
| Text Primary | Deep Charcoal | `#1F2937` | Body text |
| Text Secondary | Warm Gray | `#6B7280` | Subtitles, metadata |

### Typography

| Role | Font | Source |
|------|------|--------|
| Headings | Nunito (rounded, friendly) | Google Fonts |
| Body | Source Sans 3 (clean, readable) | Google Fonts |

## Page Structure

Single-page website with smooth scrolling between sections:

1. **Hero** — Full viewport, headline, subtitle, floating SVG shapes, scroll indicator
2. **About** — Two-column: text + photo card
3. **Team** — Grid of team member cards with hover effects
4. **Activities** — Masonry-like grid of activity cards with images
5. **Schedule** — Timeline-style event cards with date badges
6. **Contact CTA** — Warm background block with contact link
7. **Footer** — Minimal copyright

## Navigation

Sticky nav bar appears after scrolling past hero. Logo left, links right. Collapses to hamburger on mobile.

## Animations

- Fade-in on scroll (AOS library)
- Floating SVG shapes in hero (CSS keyframes)
- Card hover lifts (4px + shadow)
- Nav slide-in on scroll
- Button hover scale transitions
- Bouncing scroll indicator

## Unique Element

"The Story Journey" — a subtle illustrated path connecting sections visually with small illustrated waypoints (book icons, stars), creating a narrative experience fitting for a reading-focused project.

## Technical Stack

- **HTML5** — Single `index.html` file
- **Tailwind CSS (CDN)** — Utility-first styling via `<script src="https://cdn.tailwindcss.com">`
- **Google Fonts** — Nunito + Source Sans 3
- **AOS** — Animate on Scroll library (CDN)
- **Vanilla JavaScript** — Scroll behavior, mobile menu, nav toggle
- **GitHub Pages** — Free hosting, auto-deploy from `main` branch

## File Structure

```
zol-website/
├── index.html          # Single page — all sections
├── css/
│   └── custom.css      # Custom styles, animations, Tailwind config
├── js/
│   └── main.js         # Nav behavior, scroll effects, mobile menu
├── images/
│   ├── hero-bg.svg     # Hero background illustration
│   ├── journey-path.svg # Story journey connecting line
│   ├── team/           # Team member photos (placeholders)
│   └── activities/     # Activity photos (placeholders)
└── README.md           # How to update content, deploy instructions
```
