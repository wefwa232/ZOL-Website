# ZOL — Zukunft Orientiertes Lernen

Eine statische Showcase-Website für das ZOL-Leseprojekt an der Gaißau Volksschule.

## Über

ZOL (Zukunft Orientiertes Lernen) ist eine von Schüler*innen initiierte Initiative, die sich der Leseförderung und dem interaktiven Lernen bei jungen Kindern an der Gaißau Volksschule widmet.

## Technologien

- HTML5
- Tailwind CSS (CLI build)
- Google Fonts (Outfit + Inter)
- GSAP + ScrollTrigger
- Typed.js
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
Öffne `index.html` in einem beliebigen Texteditor und finde den Abschnitt, den du bearbeiten möchtest. Der gesamte Text steht direkt im HTML.

### Bilder Aktualisieren
Lege neue Bilder im Ordner `images/` oder `images/gallery/` ab und passe die `src`-/`href`-Attribute der Galerieeinträge in `index.html` an.

### Teammitglieder Aktualisieren
Finde die Teamkarten im `#team`-Abschnitt und bearbeite Namen, Rollen und Beschreibungen. Füge weitere Karten hinzu, indem du einen bestehenden Karten-Block kopierst.

### Termine Aktualisieren
Finde die Ereigniskarten im `#schedule`-Abschnitt und bearbeite Daten, Titel und Beschreibungen.

## Veröffentlichung (GitHub Pages)

1. Führe `npm run build:css` aus
2. Pushe dieses Repository auf GitHub
3. Gehe zu Settings > Pages
4. Wähle den `main`-Branch als Quelle
5. Die Website ist unter `https://deinusername.github.io/repository-name` erreichbar

## Lizenz

Dieses Projekt dient Bildungszwecken.
