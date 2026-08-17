# Legacy Zayverse (Static Site)

This is the original Zayverse portfolio design, preserved for reference and possible future reuse.

- Predates the React/Vite redesign.
- Built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no dependencies.
- Cinematic dark-space aesthetic with animated atmospheric visuals and a project showcase.
- Kept here intentionally for historical reference and design reuse — **it is no longer the production version.**

## Permanent Git history reference

The exact final commit of this site (before the redesign replaced `main`) is preserved at:

- Branch: `legacy-static-site`
- Tag: `legacy-static-v1`

Even if this archive folder is ever modified or removed, the original site can always be recovered from either of those.

## Running it locally

This is a static site — no install, no build. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static file server, e.g. from this directory:

  ```bash
  npx serve .
  ```

## Structure

```
index.html          entry point
css/
  variables.css      design tokens (colors, spacing, etc.)
  styles.css         all site styles
js/
  main.js            page behavior/interactions
  animations.js       scroll/atmospheric animations
assets/images/       original artwork used throughout the site
```
