# ZOL Website Design Specification

> **Project:** ZOL (Zukunft Orientiertes Lernen) — Gaißau Volksschule Reading Project
> **Date:** 2026-04-12
> **Status:** Updated after production hardening

## Overview

A single-page showcase website for the ZOL project at Gaißau Volksschule. The site informs parents, teachers, and interested students about reading and interactive learning activities. It is hosted as a static GitHub Pages site.

## Current Stack

- HTML5 single-page structure in `index.html`
- Tailwind CSS compiled with the CLI into `css/styles.css`
- Custom Tailwind source and component styles in `css/custom.css`
- Google Fonts: Outfit for headings, Inter for body copy
- GSAP + ScrollTrigger for reveal and interaction motion
- Typed.js for the animated hero headline
- Swiper for testimonials
- GLightbox for gallery viewing
- Vanilla JavaScript in `js/main.js`

## Design Direction

Warm, bright, and welcoming. The site should feel like a sunlit learning space: friendly enough for a school project, but polished enough for parents, teachers, and partners.

## Page Structure

1. Hero
2. Stats
3. About
4. Team
5. Activities
6. Gallery
7. Testimonials
8. Schedule
9. FAQ
10. Join / Mitmachen
11. Partners
12. Contact
13. Footer

## Production Notes

- Do not use the Tailwind browser CDN in production.
- Run `npm run build:css` after changing Tailwind classes or `css/custom.css`.
- Keep gallery media local under `images/` to avoid external placeholder dependencies.
- Keep FAQ, menu, and theme controls synchronized with ARIA state.
- Keep the hero readable with JavaScript disabled; JavaScript may enhance it but must not be required for the core text to appear.
