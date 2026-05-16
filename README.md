# Architecture Portfolio

Static first version of an architecture student's portfolio site, ready to publish from the repository root with GitHub Pages.

## Files

- `index.html` contains the split landing/detail layout.
- `styles.css` contains the editorial responsive styling.
- `script.js` loads project data and swaps the right panel between the CV/about page and project detail pages.
- `data/projects.json` is the editable project source.
- `assets/projects/` contains local SVG placeholder images.

## Editing Projects

Update `data/projects.json` to replace placeholder titles, descriptions, metadata, credits, alt text, and image paths. Add new images to `assets/projects/` and point each project's `image` field to the local file.

## Preview

Because the project uses `fetch()` to load JSON, preview it through a local static server from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

In the repository settings, enable GitHub Pages and publish from the root of the main branch. No build step is required.
