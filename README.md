# Zayverse

João Monteiro's personal portfolio and digital workspace.

## Purpose

Zayverse showcases full-stack software engineering and UI-focused work: web development, interface/UI design, selected projects, technical expertise, freelance/client services, résumé, and a project-inquiry contact flow.

## Stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Framer Motion](https://www.framer.com/motion/) 11
- [lucide-react](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/) for iconography

## Features

- Responsive, modern portfolio design with light and dark themes
- Cyber/data-rain entrance sequence that stabilizes into the homepage
- Framer Motion interactions and section reveals throughout
- Selected project showcase, with a full projects archive view
- Interactive About section (multi-step personal story)
- Interactive Expertise section (tabbed categories with diagrams)
- Résumé viewing and download
- Project-inquiry contact form
- Mobile-responsive layout and `prefers-reduced-motion` support
- Native modal mobile menu with focus containment, Escape dismissal, focus restoration, and background scroll locking; desktop navigation starts at 1024px
- Keyboard-focusable project rail and padded mobile archive

## Selected Projects

- **[HAVEN · Listing Search](https://haven-listing-search.vercel.app/)** — full-stack React/Vite/TypeScript and FastAPI/Python project. Price, bedroom, city, and keyword filters; budget/recency ranking; server-side pagination; responsive light/dark editorial UI. Uses a sample JSON dataset. The Live Demo action opens the deployed Vercel application; a separate Source Code action links to https://github.com/Johnmonteiro99/haven-listing-search. Shared cards provide separate actions for available `liveUrl`, `githubUrl`, and `detailUrl` links. Its thumbnail is captured from the local application.

- **Astral Veil** — [astralveil.world](https://astralveil.world)
- **Pawsitive** — [johnmonteiro99.github.io/pawsitive](https://johnmonteiro99.github.io/pawsitive/)

## Project Gallery

`PROJECTS` in `src/data/content.js` is the single dataset. Set `featured: true` and a numeric `featuredOrder` to include an item on the homepage. `getFeaturedProjects()` returns at most seven, without changing archive order. The archive includes all projects.

`WorkChapter` owns a native scrolling gallery with proximity snapping, Previous/Next controls, a position readout, and Arrow/Home/End keys when the rail itself is focused. Boundary states update on scroll and resize; all-fit galleries disable both arrows. There is no autoplay, loop, drag-to-navigate handler, or wheel interception.

`ProjectCard` is an article with an information button and individual action links. Fine-pointer hover and keyboard focus reveal its overlay; touch users explicitly toggle it. Escape closes details and returns focus to the information button. Outside pointer presses and leaving keyboard focus dismiss details. The hidden panel is inert. `ProjectCardOverlay` keeps links in a fixed footer while longer details scroll above it. Desktop overlays occupy about 65%; touch layouts allow up to 85%, leaving space for the close control. Reduced motion removes lift, zoom, and animated gallery scrolling.

The homepage and archive reuse the same square card. Landscape HAVEN and Pawsitive images retain their full composition on project-specific warm backgrounds. Astral Veil uses the supplied square artwork. Responsive WebP derivatives in `public/images/projects/` are resized encodings; original uploaded artwork is preserved. Astral Veil copy distinguishes its established focus from broader experiences still evolving.

Archive entry focuses its heading; returning home restores the View All Projects control. Section observation reconnects when the homepage remounts.

Run project-selection tests with `npm run test:projects`. Browser and accessibility verification requires a browser runtime; no lint configuration or browser-testing dependency is installed; selection tests use Node’s built-in runner. Automated Chromium checks do not certify physical devices, other browser engines, or human screen-reader behavior.

### Gallery verification - October 24, 2026

- Production build and all four project-selection tests passed; whitespace checks passed.
- Chromium checks passed at 320×740, 390×844, 667×375, 768×1024, 1024×768, 1280×800, 1440×900, and 1920×1080 in both themes. Cards stayed square and the page had no horizontal overflow.
- All 44 scoped axe WCAG A/AA scans passed across the gallery, archive, and individual open cards. These automated scans are not accessibility certification.
- Keyboard details/escape/focus return, hidden-panel tab order, arrow boundaries, resizing, horizontal wheel scrolling, normal vertical scrolling, archive navigation, reduced motion, emulated touch swiping, internal detail scrolling, and individual action activation passed.
- Temporary browser-only fixtures verified zero, one, two, seven, and eight projects, plus a non-featured archive entry. Production data still contains only the three real projects.
- Uploaded résumé/photo assets and unrelated source changes were preserved. No lint task exists. Physical devices, Safari/Firefox, and human screen-reader testing were not performed. No deployment was made.

## Professional Positioning and Expertise

The hero separates `HERO.eyebrow` (Creative Engineer, also used by the portrait) from `HERO.role` and `HERO.focus`. The title and introduction describe full-stack engineering with a UI focus. The laptop artwork, name, and personal branding are unchanged. Technology-label buttons support focus, tap, Escape, and dismissal on blur.

`EXPERTISE` defines five categories, their groups, diagram keys, and project IDs. `getProjectEvidence()` resolves titles, descriptions, thumbnails, and URLs from `PROJECTS`, preferring live demos over source links. `ProjectEvidenceCard` renders compact, fully clickable thumbnail cards with keyboard focus and reduced-motion support, so evidence does not duplicate gallery data. HAVEN demonstrates React/TypeScript, Python/FastAPI, validated search logic, and tests over JSON data; it is not presented as using a database. Node.js reflects the developer's stated/résumé background. Astral Veil's existing metadata supplies its project link and stack; no new production capability claims are made.

`src/data/expertise-diagrams.js` stores short educational explanations. `ExpertiseDiagram` coordinates native selection buttons and a polite live explanation; category-specific views live in `ExpertiseVisuals.jsx` with scoped `expertise.css` styles. Full-Stack uses a pipeline; Front-End a component blueprint; UI/UX an illustrative interaction preview; Back-End a request responsibility flow; Quality a review control panel without fabricated metrics. Focus, click/tap, or mouse hover selects a node. Selection is also indicated with pressed state and text; no behavior depends on animation or color alone. Connector highlights transition once, with no looping motion. Reduced motion removes these transitions and category entry animation.

`CategoryNav` retains automatic Left/Right/Home/End activation and roving tabindex. Only the tab strip scrolls to expose the active tab. The tabpanel keeps a stable ID and current label while its contents change. Services remain informational articles, with six revised descriptions and decorative icons. They do not gain artificial tab stops.

Spacing overrides apply only to Expertise and Services, with content-driven heights. Native page scrolling, chapter transitions, and the completed Projects gallery are retained. No dependencies were added. Metadata uses the same full-stack positioning.

### Positioning verification - October 24, 2026

- `npm run test:positioning` (3 tests), `npm run test:projects` (4 tests), `npm run build`, and whitespace checks passed. No dependencies were added.
- Chromium checks passed at 320×740, 390×844, 667×375, 768×1024, 1024×768, 1440×900, and 1920×1080 in light and dark themes, with no horizontal page overflow or browser runtime errors.
- All 99 scoped axe WCAG A/AA scans passed: 98 across Hero, all five Expertise categories, and Services, plus a final tab-resize check. Automated scans are not accessibility certification.
- Checked both hero CTAs, technology labels and Escape dismissal, tab wrapping/Home/End/roving focus, active-tab visibility after resize, every diagram node and explanation, native Tab/Space/Enter activation, touch selection, hoverable tooltips, evidence URL mappings, reduced motion, and 3px service-card lift.
- The large-desktop Expertise/Services content gap is now 144px instead of 224px, through scoped padding changes. Normal page scrolling and the chapter architecture are retained.
- Completed Projects carousel code, project records, gallery styles, and original images remain unchanged. Its touch swipes, action link activation, desktop hover, arrow boundaries, resizing, and reduced-motion behavior passed regression checks. Uploaded résumé/portrait assets and protected unrelated components passed byte-for-byte preservation checks.
- No lint task/configuration exists. Physical devices, Safari/Firefox, and human screen-reader testing were not performed. No commit, push, or deployment was made.

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

## Production

Live at [zayverse.dev](https://zayverse.dev).

## Legacy Version

The original portfolio — built with plain HTML, CSS, and vanilla JavaScript — has been preserved for historical reference and possible future design reuse. It is no longer the production version.

- Archived copy: [`archive/legacy-static-site/`](archive/legacy-static-site/)
- Permanent Git history reference: branch `legacy-static-site`, tag `legacy-static-v1`

## Future Work

Additional theme variants are in progress but not yet part of the production release.


## Approved portfolio release — October 24, 2026

This release includes the shared Projects carousel/archive, public HAVEN demo and separate source action, Astral Veil artwork, full-stack hero and service copy, updated résumé/portrait, category-specific Expertise visuals, and shared-data thumbnail evidence cards. Source uploads remain preserved; the duplicate root résumé upload is not part of the release.

Final local release verification: nine Node tests, Vite production build, and whitespace checks passed. The actual production build was served in a temporary directory outside the repository for browser checks. Fifteen scoped axe WCAG A/AA scans reported no violations across Expertise (all five categories, both themes) and the visible hero, projects, About, Services, and contact sections. Some contrast checks involving imagery/backgrounds were marked incomplete and require manual review. Offscreen entrance-fade snapshots are not treated as settled-section audits. Contact validation was checked without sending an inquiry. Recent responsive checks covered 320px through desktop, portrait/landscape, all diagram selections, and project-card focus/links. Reduced-motion safeguards were source-reviewed; this final run did not emulate the operating-system preference. Physical devices, other browser engines, and human screen-reader certification were not tested.

Production uses the existing `.github/workflows` GitHub Pages pipeline on `main`. The custom domain is `www.zayverse.dev`; `https://zayverse.dev` redirects to that canonical host. No new hosting service is required.
