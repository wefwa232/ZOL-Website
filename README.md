# ZOL - Zukunft Orientiertes Lernen

Eine statische Showcase-Website für das ZOL-Leseprojekt an der Gaißau Volksschule.

## Über

ZOL (Zukunft Orientiertes Lernen) ist eine von Schüler*innen initiierte Initiative, die Leseförderung, interaktive Lesesessions und kreative Lernmomente an der Gaißau Volksschule unterstützt.

## Technologien

- HTML5
- Tailwind CSS (CLI build)
- Google Fonts (Bricolage Grotesque + Manrope)
- GSAP + ScrollTrigger
- Lucide Icons
- Swiper
- GLightbox
- Vanilla JavaScript

## Entwicklung

Installiere die Abhängigkeiten und baue das CSS:

```bash
npm install
npm run build:css
npm test
```

Während der Bearbeitung kann das CSS im Watch-Modus gebaut werden:

```bash
npm run dev:css
```

## Inhalte Bearbeiten

### Text Bearbeiten
Öffne `index.html` und bearbeite die Inhalte direkt in den jeweiligen Abschnitten.

### Bilder Aktualisieren
Lege neue Bilder im Ordner `images/` oder `images/gallery/` ab und passe die `src`-/`href`-Attribute der Galerieeinträge in `index.html` an.

### Termine Aktualisieren
Finde den `#termine`-Abschnitt und bearbeite Daten, Titel, Uhrzeiten und Beschreibungen.

## Veröffentlichung (GitHub Pages)

1. Führe `npm run build:css` aus
2. Führe `npm test` aus
3. Pushe das Repository auf GitHub
4. GitHub Pages veröffentlicht die statische Website aus dem `main`-Branch

## Lizenz

Dieses Projekt dient Bildungszwecken.
