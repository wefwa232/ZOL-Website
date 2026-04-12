# ZOL -- Zukunft Orientiertes Lernen

A showcase website for the ZOL reading project at Gaiau Volksschule.

## About

ZOL (Zukunft Orientiertes Lernen) is a student-led initiative dedicated to promoting reading and interactive learning among young children at Gaiau Volksschule.

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Google Fonts (Nunito + Source Sans 3)
- AOS (Animate on Scroll)
- Vanilla JavaScript

## How to Update Content

### Editing Text
Open `index.html` in any text editor and find the section you want to edit. All text is directly in the HTML -- just change the content between tags.

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
