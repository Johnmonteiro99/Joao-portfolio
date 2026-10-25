// Real CSS rules for every custom color/shadow/layout value used across the
// app. Tailwind's bracket arbitrary-value classes (e.g. bg-[#0A0A0B]) don't
// render reliably in this project's preview tooling, so anything non-default
// — including every theme-token proxy below — lives here instead.
export default function GlobalStyles() {
  return (
    <style>{`
      /* Cyber fonts stay reserved for the intro only. */
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap');
      .font-mono { font-family: 'Space Mono', monospace; }
      .bg-intro { background-color: #000000; }

      .font-display { font-family: var(--font-display); }
      .font-body { font-family: var(--font-body); }
      .font-label { font-family: var(--font-mono); }

      body { font-family: var(--font-body); }

      /* ---------- theme-token proxy classes ---------- */
      .bg-page { background: var(--color-bg); }
      .bg-surface { background: var(--color-surface); }
      .bg-surface-2 { background: var(--color-surface-2); }
      .text-primary { color: var(--color-text); }
      .text-muted { color: var(--color-text-muted); }
      .text-faint { color: var(--color-text-faint); }
      .text-accent { color: var(--color-accent); }
      .border-default { border-color: var(--color-border); }
      .border-strong { border-color: var(--color-border-strong); }
      .bg-inverse { background: var(--color-inverse-bg); color: var(--color-inverse-text); }
      .bg-accent-soft { background: var(--color-accent-soft); }
      .bg-accent { background: var(--color-accent); }

      ::selection { background: var(--color-accent); color: var(--color-inverse-text); }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }

      /* ---------- chapter section spacing (normal document flow, generous, editorial) ---------- */
      .chapter-section { padding: clamp(4rem, 9vw, 7rem) 1.5rem; }
      /* Content-driven height, not a forced min-height/flex-center — that was
         what made the hero read as an oversized, mostly-empty full screen
         regardless of how little content it held. */
      #hero.chapter-section { padding-top: clamp(6.5rem, 9vw, 7.5rem); padding-bottom: clamp(4rem, 6vw, 5.5rem); }
      .chapter-inner { max-width: 1280px; margin: 0 auto; width: 100%; }
      #hero .chapter-inner { max-width: 1440px; }

      /* ---------- section-to-section transitions: atmosphere, not a hard rule ----------
         Sits at the seam between two chapters, inside their existing padding
         (height: 0 — adds no extra scroll length of its own). A soft radial
         haze plus one small decorative coordinate waypoint replace the old
         border-top; the section number/heading stays the primary structural
         cue, this is just ambient hierarchy. */
      .section-divider { position: relative; height: 0; }
      .section-divider::before {
        content: "";
        position: absolute;
        left: 0; right: 0;
        top: clamp(-80px, -7vw, -56px);
        bottom: clamp(-80px, -7vw, -56px);
        /* Gentle multi-stop falloff (rather than a single 3-stop ramp, which
           can read as a soft but still-defined band against a very dark
           page background) so the haze stays diffuse atmosphere, never a
           visible edge/line. */
        background: linear-gradient(
          to bottom,
          transparent 0%,
          color-mix(in srgb, var(--color-divider-haze) 35%, transparent) 30%,
          var(--color-divider-haze) 50%,
          color-mix(in srgb, var(--color-divider-haze) 35%, transparent) 70%,
          transparent 100%
        );
        pointer-events: none;
      }
      /* Dark mode: no gradient wash at all — the deep canvas should blend
         section-to-section on its own. Only the coordinate label + dot
         (.section-divider-inner, unaffected by this) mark the seam. */
      :root[data-theme="dark"] .section-divider::before { background: none; }
      .section-divider-inner {
        position: absolute; left: 0; right: 0; top: 0; transform: translateY(-50%);
        display: flex; align-items: center; gap: 0.5rem;
        max-width: 1280px; margin: 0 auto; padding: 0 clamp(1.5rem, 4vw, 3rem);
      }
      .section-divider-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--color-accent); flex-shrink: 0; }

      /* ---------- section label / eyebrow ---------- */
      .section-label {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      /* Contact-exclusive: tracks --contact-text-muted (not the generic
         --color-inverse-muted) so it stays correctly light-on-dark in both
         light mode's charcoal panel and dark mode's umber panel — the two
         no longer share one inverse relationship the way they used to. */
      .section-label-light { color: var(--contact-text-muted); }
      .section-label-num { color: var(--color-accent); margin-right: 0.7em; font-weight: 600; }

      /* ---------- pill ---------- */
      .pill {
        display: inline-flex; align-items: center;
        border-radius: 0.35rem; padding: 0.32rem 0.7rem;
        font-size: 0.72rem; font-family: var(--font-mono);
        border: 1px solid var(--color-border); color: var(--color-text-muted);
        background: var(--color-surface);
      }

      /* ---------- card ---------- */
      .ui-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 0.6rem;
      }

      /* ---------- button system: precise, architectural, modest radius (never a pill) ---------- */
      .ui-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
        border-radius: 0.5rem; padding: 0.8rem 1.4rem;
        font-weight: 600; font-size: 0.82rem; font-family: var(--font-mono);
        letter-spacing: 0.02em;
        transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        cursor: pointer; border: 1px solid transparent; white-space: nowrap;
      }
      .ui-btn-arrow { transition: transform 0.2s ease; }
      .ui-btn:hover .ui-btn-arrow { transform: translate(2px, -2px); }
      .ui-btn-dot { width: 5px; height: 5px; border-radius: 9999px; background: var(--color-accent); transition: transform 0.2s ease; }
      .ui-btn:hover .ui-btn-dot { transform: scale(1.6); }

      .ui-btn-primary { background: var(--color-accent); color: var(--color-inverse-text); border-color: var(--color-accent); }
      .ui-btn-primary:hover { background: var(--color-accent-strong); border-color: var(--color-accent-strong); }

      .ui-btn-secondary { background: transparent; border-color: var(--color-border-strong); color: var(--color-text); }
      .ui-btn-secondary:hover { border-color: var(--color-accent); }
      .ui-btn-label { display: inline-block; transition: transform 0.2s ease; }
      .ui-btn-secondary:hover .ui-btn-label { transform: translateX(2px); }

      .ui-btn-resume { background: var(--color-surface); border-color: var(--color-border-strong); color: var(--color-text); padding: 0.62rem 1rem; font-size: 0.78rem; }
      .ui-btn-resume:hover { border-color: var(--color-accent); color: var(--color-accent); }

      .ui-btn-text { background: none; border: none; padding: 0; color: var(--color-text); font-family: var(--font-mono); font-size: 0.8rem; }
      .ui-btn-text:hover { color: var(--color-accent); }
      .ui-btn-text:hover .ui-btn-arrow { transform: translate(3px, -3px); }

      .ui-btn-dark { background: var(--color-inverse-bg); color: var(--color-inverse-text); }
      .ui-btn-dark:hover { opacity: 0.85; }

      /* ---------- theme toggle ---------- */
      .theme-toggle { display: inline-flex; align-items: center; }
      .theme-toggle-track {
        width: 36px; height: 20px; border-radius: 9999px;
        background: var(--color-surface-2); border: 1px solid var(--color-border-strong);
        display: flex; align-items: center; padding: 2px; position: relative;
      }
      .theme-toggle-thumb {
        width: 14px; height: 14px; border-radius: 9999px;
        background: var(--color-accent); color: var(--color-inverse-text);
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.25s ease;
      }

      /* ---------- navbar: thin, integrated into the page background, not a floating glass pill ---------- */
      .navbar {
        position: fixed; top: 0; left: 0; right: 0; z-index: 50;
        background: rgba(247,246,242,0.88);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--color-border);
      }
      :root[data-theme="dark"] .navbar { background: rgba(12,12,13,0.88); }
      .navbar-wordmark { font-family: var(--font-display); font-weight: 700; letter-spacing: 0.01em; color: var(--color-text); }
      .wordmark-dot { width: 6px; height: 6px; border-radius: 9999px; background: var(--color-accent); display: inline-block; }
      .navbar-link {
        font-family: var(--font-body); font-size: 0.88rem; font-weight: 500;
        color: var(--color-text-muted); position: relative; padding: 0.4rem 0;
        transition: color 0.2s ease; background: none; border: none; cursor: pointer;
      }
      .navbar-link:hover { color: var(--color-text); }
      .navbar-link-active { color: var(--color-text); }
      .navbar-underline { position: absolute; left: 0; right: 0; bottom: -2px; height: 1.5px; background: var(--color-accent); }
      .navbar-icon-btn { color: var(--color-text-muted); transition: color 0.2s ease; }
      .navbar-icon-btn:hover { color: var(--color-text); }

      .navbar-desktop-links, .navbar-desktop-item { display: none; }
      .navbar-icon-btn, .theme-toggle { min-width: 44px; min-height: 44px; align-items: center; justify-content: center; }
      .navbar-menu-toggle { display: inline-flex; }
      @media (min-width: 1024px) {
        .navbar-desktop-links { display: flex; }
        .navbar-desktop-item { display: inline-flex; }
        .navbar-menu-toggle { display: none; }
      }

      /* ---------- mobile nav ---------- */
      .mobile-nav-panel {
        position: fixed; inset: 0; z-index: 60; background: var(--color-bg);
        display: flex; flex-direction: column; padding: 5.5rem 2rem max(2rem, env(safe-area-inset-bottom));
        margin: 0; border: 0; color: var(--color-text);
        width: 100%; max-width: none; height: 100dvh; max-height: none;
        overflow-y: auto; overscroll-behavior: contain;
      }
      .mobile-nav-link {
        font-family: var(--font-display); font-size: 2rem; font-weight: 600;
        color: var(--color-text); text-align: left; background: none; border: none;
        padding: 0.5rem 0; cursor: pointer;
      }
      .mobile-nav-link-active { color: var(--color-accent); }

      /* ---------- technical / engineering-diagram accents (restrained) ---------- */
      .tech-mark { color: var(--color-border-strong); }
      .tech-coord { font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-faint); letter-spacing: 0.04em; }
      .tech-corner { position: absolute; width: 12px; height: 12px; border-color: var(--color-inverse-border); }
      .tech-corner-top-left { top: 20px; left: 20px; border-top: 1px solid; border-left: 1px solid; }
      .tech-corner-top-right { top: 20px; right: 20px; border-top: 1px solid; border-right: 1px solid; }
      .tech-corner-bottom-left { bottom: 20px; left: 20px; border-bottom: 1px solid; border-left: 1px solid; }
      .tech-corner-bottom-right { bottom: 20px; right: 20px; border-bottom: 1px solid; border-right: 1px solid; }
      .tech-grid-bg {
        background-image: linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
        background-size: 42px 42px; opacity: 0.4;
      }

      /* ---------- hero: personal identity, then professional position ---------- */
      .hero-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.25rem; align-items: center; }
      .hero-grid > * { min-width: 0; }
      @media (min-width: 1024px) {
        .hero-grid { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 2.5rem; align-items: start; }
        .hero-content-col { padding-top: 0.5rem; }
      }
      .hero-headline { font-family: var(--font-display); font-weight: 800; line-height: 1.02; letter-spacing: -0.02em; }
      #hero-heading { font-weight: 700; }
      .hero-professional-title { font: 600 clamp(1.125rem, 1.7vw, 1.4rem)/1.4 var(--font-display); color: var(--color-text); margin: 1.15rem 0 0; max-width: 520px; }
      .hero-professional-title span { display: inline-block; color: var(--color-accent-strong); white-space: nowrap; }
      .hero-supporting { margin-top: 1rem; font-size: 1rem; line-height: 1.65; max-width: 490px; }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }
      .hero-technologies { margin-top: 1.75rem; }
      .hero-technologies > .section-label { font-size: 0.65rem; letter-spacing: 0.12em; }
      .hero-tool-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .hero-image-wrap { position: relative; width: 100%; max-width: 560px; margin-inline: auto; }
      @media (min-width: 1024px) { .hero-image-wrap { max-width: none; } }
      .hero-tools-icon {
        width: 44px; height: 44px; padding: 0; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;
        background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease; position: relative;
      }
      .hero-tools-icon:hover { color: var(--color-accent); border-color: var(--color-accent-border); }
      .hero-tools-icon:focus-visible { outline: 2px solid var(--color-accent-strong); outline-offset: 3px; }
      .tech-tooltip-wrap { position: relative; display: inline-flex; }
      .tech-tooltip {
        position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
        background: var(--color-inverse-bg); color: var(--color-inverse-text);
        font: 0.7rem/1.4 var(--font-mono); letter-spacing: 0.03em;
        padding: 0.35rem 0.55rem; border-radius: 0.3rem; border: 1px solid var(--color-inverse-border);
        white-space: nowrap; z-index: 20; pointer-events: auto;
      }
      .tech-tooltip::after { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 10px; }
      @media (max-width: 639px) {
        .hero-tool-list { display: grid; grid-template-columns: repeat(4, 44px); gap: 0.35rem; }
        .hero-tools-icon:first-child .tech-tooltip { left: 0; transform: none; }
      }

      /* ---------- curated project gallery ---------- */
      .work-header-row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1.5rem; margin-bottom: 1.75rem; }
      .work-view-all { flex-shrink: 0; min-height: 44px; }
      .work-rail {
        --gallery-gap: 1.1rem;
        position: relative; display: grid; grid-auto-flow: column;
        grid-auto-columns: calc((100% - 0.15 * var(--gallery-gap)) / 1.15);
        gap: var(--gallery-gap); overflow-x: auto;
        scroll-snap-type: x proximity; overscroll-behavior-x: contain;
        padding: 0.5rem 0 1.5rem; scrollbar-width: none;
      }
      .work-rail::-webkit-scrollbar { display: none; }
      .work-rail:focus-visible { outline-offset: 5px; border-radius: 4px; }
      .work-rail-card { scroll-snap-align: start; }
      @media (min-width: 640px) { .work-rail { grid-auto-columns: calc((100% - 0.65 * var(--gallery-gap)) / 1.65); --gallery-gap: 1.25rem; } }
      @media (min-width: 900px) { .work-rail { grid-auto-columns: calc((100% - 1.2 * var(--gallery-gap)) / 2.2); } }
      @media (min-width: 1280px) { .work-rail { grid-auto-columns: calc((100% - 2.25 * var(--gallery-gap)) / 3.25); --gallery-gap: 1.5rem; } }

      .gallery-navigation { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
      .gallery-position { color: var(--color-text-muted); font: 0.75rem var(--font-mono); letter-spacing: 0.08em; font-variant-numeric: tabular-nums; }
      .gallery-navigation-buttons { display: flex; gap: 0.5rem; }
      .gallery-navigation button { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border: 1px solid var(--color-border-strong); border-radius: 50%; color: var(--color-text); background: transparent; transition: background 0.2s, border-color 0.2s; }
      .gallery-navigation button:hover:not(:disabled) { background: var(--color-accent-soft); border-color: var(--color-accent); }
      .gallery-navigation button:disabled { opacity: 0.35; cursor: default; }

      /* The square reserves layout space before images load. Landscape artwork
         uses its own matte and position so lettering and faces stay intact. */
      .project-card {
        position: relative; min-width: 0; width: 100%; aspect-ratio: 1;
        border: 1px solid var(--color-border); border-radius: 22px; overflow: hidden;
        background: var(--project-image-background, var(--color-surface-2));
        box-shadow: 0 7px 18px -12px rgba(20, 20, 18, 0.25);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        isolation: isolate;
      }
      .project-card-image { position: absolute; inset: 0; width: 100%; height: 100%; display: block; transition: transform 0.3s ease; }
      .project-card-number, .project-info-toggle { position: absolute; z-index: 3; top: 12px; color: #f7f6f2; background: rgba(20, 22, 20, 0.88); border: 1px solid rgba(255, 255, 255, 0.2); }
      .project-card-number { left: 12px; padding: 0.4rem 0.55rem; border-radius: 9px; font: 0.65rem var(--font-mono); letter-spacing: 0.06em; }
      .project-info-toggle { right: 12px; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; }
      .project-info-toggle:hover { background: #1c211b; }
      .project-card :focus-visible { outline: 2px solid #e1ebba; outline-offset: -4px; }
      .project-info-toggle:focus-visible { outline-offset: 3px; outline-color: var(--color-accent-strong); }
      .project-overlay {
        position: absolute; inset: auto 0 0; z-index: 2;
        height: min(85%, calc(100% - 64px));
        display: flex; flex-direction: column; min-height: 0;
        background: linear-gradient(180deg, rgba(17, 21, 18, 0.91), rgba(17, 21, 18, 0.98) 28%);
        color: #f7f6f2; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        visibility: hidden; opacity: 0; transform: translateY(100%);
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s;
      }
      .is-open .project-overlay { visibility: visible; opacity: 1; transform: translateY(0); transition-delay: 0s; }
      .project-overlay-body { flex: 1; min-height: 0; padding: 1.1rem 1.15rem 0.75rem; overflow-y: auto; overflow-wrap: anywhere; scrollbar-width: thin; scrollbar-color: #929d83 transparent; }
      .project-card-category { margin: 0 0 0.4rem; font: 0.625rem/1.5 var(--font-mono); letter-spacing: 0.09em; text-transform: uppercase; color: #d5dfbf; }
      .project-card-name { font: 650 clamp(1rem, 1.8vw, 1.25rem)/1.2 var(--font-display); margin: 0 0 0.6rem; color: #f7f6f2; }
      .project-card-slogan { font: italic 0.875rem/1.5 var(--font-body); margin: 0 0 0.65rem; color: #e5d2aa; }
      .project-card-description { font: 0.875rem/1.55 var(--font-body); margin: 0 0 0.8rem; color: #eeeee7; }
      .project-development-note { font: 0.8rem/1.5 var(--font-body); color: #d2d5ca; margin: 0 0 0.8rem; }
      .project-card-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; list-style: none; padding: 0; margin: 0; }
      .project-card-tags li { padding: 0.25rem 0.45rem; border: 1px solid rgba(247, 246, 242, 0.28); border-radius: 5px; color: #eeeee7; font: 0.625rem/1.4 var(--font-mono); }
      .project-card-actions { flex-shrink: 0; display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; padding: 0.35rem 1.15rem 0.5rem; border-top: 1px solid rgba(247, 246, 242, 0.16); background: rgba(17, 21, 18, 0.96); }
      .project-card-actions a { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 44px; font: 0.75rem/1.4 var(--font-mono); text-decoration: underline; text-underline-offset: 4px; color: #f7f6f2; }
      @media (hover: hover) and (pointer: fine) {
        .project-card.is-open { transform: translateY(-5px); box-shadow: 0 18px 30px -18px rgba(20, 20, 18, 0.4); }
        .project-card.is-open .project-card-image { transform: scale(1.03); }
      }
      @media (min-width: 900px) and (hover: hover) and (pointer: fine) { .project-overlay { height: 65%; } }
      @media (prefers-reduced-motion: reduce) {
        .project-card, .project-card-image, .project-overlay { transition: none; }
        .project-card.is-open, .project-card.is-open .project-card-image { transform: none; }
      }

      /* ---------- project archive: the same cards, in a quiet grid ---------- */
      .archive-back-btn { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 44px; }
      .archive-view { padding-inline: 1.5rem; }
      .archive-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
      @media (min-width: 640px) { .archive-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (min-width: 1100px) { .archive-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

      /* ---------- about ---------- */
      .about-grid > * { min-width: 0; }
      .about-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; align-items: center; }
      @media (min-width: 1024px) { .about-grid { grid-template-columns: 1.2fr 0.8fr; } }

      /* About Me section: dedicated layout (not shared with Resume/Contact's
         .about-grid) — mobile order is heading -> portrait -> story via
         grid-template-areas; desktop becomes a true two-column layout. */
      .about-layout {
        display: grid; grid-template-columns: 1fr; gap: 2.25rem;
        grid-template-areas: "heading" "portrait" "story";
        align-items: start;
      }
      .about-heading-area { grid-area: heading; }
      .about-portrait-area { grid-area: portrait; }
      .about-story-area { grid-area: story; }
      @media (min-width: 1024px) {
        .about-layout {
          grid-template-columns: 1.15fr 0.85fr;
          grid-template-areas: "heading portrait" "story portrait";
          column-gap: 3.5rem; row-gap: 1rem;
        }
        .about-portrait-area { align-self: center; }
      }

      /* ---------- story panel: one paragraph presented at a time ---------- */
      .story-panel {
        position: relative;
        border: 1px solid var(--color-border);
        border-radius: 0.6rem;
        background: var(--color-surface);
        padding: 1.5rem 1.6rem 1.25rem;
      }
      .story-panel:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
      .story-panel-top { margin-bottom: 0.9rem; }
      .story-progress { font-size: 0.72rem; letter-spacing: 0.08em; }

      .story-panel-body { min-height: 11.5rem; }
      @media (min-width: 1024px) { .story-panel-body { min-height: 10rem; } }
      .story-paragraph {
        font-family: var(--font-body); font-size: 1rem; line-height: 1.75;
        color: var(--color-text-muted); max-width: 520px; margin: 0 0 1rem;
      }

      .story-labels { display: flex; flex-wrap: wrap; gap: 0.6rem; }
      .story-label {
        font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase;
        color: var(--color-text-muted); border-bottom: 1px solid var(--color-border-strong); padding-bottom: 2px;
        display: inline-flex; align-items: center;
      }
      .story-label::before {
        content: ""; display: inline-block; width: 3px; height: 3px; border-radius: 9999px;
        background: var(--color-accent); margin-right: 0.45em;
      }

      .story-panel-bottom { display: flex; align-items: center; gap: 1.25rem; margin-top: 1.4rem; }
      .story-progress-track { flex: 1; height: 2px; background: var(--color-border); border-radius: 9999px; overflow: hidden; }
      .story-progress-fill { height: 100%; background: var(--color-accent); transition: width 0.5s ease; }
      .story-nav-controls { display: flex; gap: 0.5rem; flex-shrink: 0; }
      .story-nav-btn {
        width: 30px; height: 30px; border-radius: 0.4rem; display: flex; align-items: center; justify-content: center;
        background: transparent; border: 1px solid var(--color-border-strong); color: var(--color-text);
        cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
      }
      .story-nav-btn:hover:not(:disabled) { border-color: var(--color-accent); color: var(--color-accent); }
      .story-nav-btn:disabled { opacity: 0.3; cursor: default; }

      /* ---------- portrait panel: editorial block, not a circular avatar ---------- */
      .portrait-panel-wrap { position: relative; display: inline-flex; flex-direction: column; align-items: center; padding: 1.75rem 1.75rem 0; }
      .portrait-panel-coord { position: absolute; top: 0; left: 0.25rem; }

      .portrait-stack { position: relative; width: clamp(240px, 30vw, 340px); aspect-ratio: 4 / 5; margin-top: 1rem; }

      /* Offset sand/stone "paper layer" behind the portrait panel — the one
         layered accent replacing the old ring/halo composition. Falls back
         to the existing surface tone where no light-mode-only
         --color-portrait-plate token is defined (Theme 2 untouched). */
      .portrait-backing-plate {
        position: absolute; inset: 0; z-index: 1; border-radius: 0.85rem;
        background: var(--color-portrait-plate, var(--color-surface-2));
        transform: translate(16px, 16px);
      }

      .portrait-panel {
        position: absolute; inset: 0; z-index: 2; border-radius: 0.85rem; overflow: hidden;
        border: 1px solid var(--color-border-strong);
        box-shadow: 0 20px 40px -26px rgba(28, 28, 26, 0.3);
        background: var(--color-surface-2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .portrait-panel:hover, .portrait-panel:focus-within {
        transform: translateY(-4px) scale(1.015);
        box-shadow: 0 26px 48px -22px rgba(28, 28, 26, 0.34);
      }
      @media (prefers-reduced-motion: reduce) {
        .portrait-panel { transition: box-shadow 0.2s ease; }
        .portrait-panel:hover, .portrait-panel:focus-within { transform: none; }
      }
      .portrait-panel-img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .portrait-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--color-surface-2); }

      .portrait-panel-dot { position: absolute; top: -6px; right: 22px; z-index: 3; width: 5px; height: 5px; border-radius: 9999px; background: var(--color-accent); }
      .portrait-panel-tick { position: absolute; bottom: 14px; left: -14px; z-index: 0; width: 18px; height: 1px; background: var(--color-border-strong); }

      .portrait-meta { position: relative; z-index: 1; margin-top: 1.4rem; text-align: center; }

      /* ---------- scoped chapter rhythm; native page scrolling is unchanged ---------- */
      #expertise, #services { scroll-margin-top: 1rem; }
      #expertise.chapter-section { padding-top: clamp(3.5rem, 6vw, 5rem); padding-bottom: clamp(2.5rem, 4.5vw, 4rem); }
      #services.chapter-section { padding-top: clamp(3.5rem, 6vw, 5rem); padding-bottom: clamp(2.5rem, 4.5vw, 4rem); }

      /* ---------- expertise: accessible categories with educational controls ---------- */
      .expertise-tablist { position: relative; display: flex; gap: clamp(1rem, 3vw, 1.75rem); overflow-x: auto; scrollbar-width: thin; scrollbar-color: var(--color-border-strong) transparent; border-bottom: 1px solid var(--color-border); margin-bottom: 1.75rem; }
      .expertise-tab { position: relative; flex-shrink: 0; min-height: 44px; padding: 0.5rem 0 0.8rem; background: none; border: none; cursor: pointer; white-space: nowrap; font: 0.75rem/1.4 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-muted); transition: color 0.2s ease; }
      .expertise-tab:hover { color: var(--color-text); }
      .expertise-tab-active { color: var(--color-accent-strong); }
      .expertise-tab:focus-visible { outline: 2px solid var(--color-accent-strong); outline-offset: -3px; border-radius: 3px; }
      .expertise-underline { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--color-accent); }
      #expertise-panel:focus-visible { outline-offset: 6px; border-radius: 3px; }
      .expertise-content-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; align-items: start; }
      .expertise-content-grid > * { min-width: 0; }
      @media (min-width: 900px) { .expertise-content-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2rem, 4vw, 3.5rem); } }
      .expertise-number { font-size: 0.72rem; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
      .expertise-description { font-size: 0.98rem; line-height: 1.65; max-width: 480px; margin-bottom: 1.5rem; }
      .expertise-right { display: flex; flex-direction: column; gap: 1.5rem; }
      .expertise-group-title { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
      .expertise-item-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .expertise-item-block { display: inline-flex; align-items: center; gap: 0.5rem; max-width: 100%; border: 1px solid var(--color-border); border-radius: 0.4rem; padding: 0.5rem 0.7rem; font-size: 0.85rem; line-height: 1.4; color: var(--color-text); background: var(--color-surface); }
      .expertise-item-dot { width: 4px; height: 4px; border-radius: 9999px; background: var(--color-accent); flex-shrink: 0; }
      .expertise-evidence { padding-top: 1rem; border-top: 1px solid var(--color-border); }


      /* ---------- services ---------- */
      .services-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
      @media (min-width: 720px) { .services-grid { grid-template-columns: 1fr 1fr; } }
      @media (min-width: 1100px) { .services-grid { grid-template-columns: 1fr 1fr 1fr; } }
      .service-card {
        position: relative; overflow: hidden;
        border: 1px solid var(--color-border); border-radius: 0.6rem; padding: 1.4rem; background: var(--service-tint, transparent);
        transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
      }
      /* Thin accent line that grows in along the bottom edge on hover —
         the one extra affordance detail, kept singular per spec. */
      .service-card::after {
        content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
        background: var(--color-accent); transform: scaleX(0); transform-origin: left;
        transition: transform 0.3s ease;
      }
      .service-card:hover,
      .service-card:focus-within {
        border-color: var(--color-accent);
        transform: translateY(-3px);
        background: color-mix(in srgb, var(--color-accent-soft) 35%, var(--service-tint, transparent));
        box-shadow: 0 22px 44px -26px rgba(28, 28, 26, 0.28);
      }
      .service-card:hover::after,
      .service-card:focus-within::after { transform: scaleX(1); }
      .service-card-num { transition: color 0.25s ease; }
      .service-card-title { transition: color 0.25s ease; }
      .service-card:hover .service-card-num,
      .service-card:focus-within .service-card-num { color: var(--color-accent); }
      .service-card:hover .service-card-title,
      .service-card:focus-within .service-card-title { color: var(--color-accent-strong); }
      @media (prefers-reduced-motion: reduce) {
        .service-card { transition: border-color 0.2s ease, background-color 0.2s ease; }
        .service-card:hover, .service-card:focus-within { transform: none; }
      }

      .service-card-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
      .service-card-num { font-size: 0.7rem; }
      .service-card-icon { color: var(--color-accent-strong); flex-shrink: 0; }
      .service-card-title { font-weight: 700; font-size: 1.02rem; line-height: 1.35; margin: 0.65rem 0 0.45rem; }
      .service-card-description { font-size: 0.875rem; line-height: 1.6; }

      /* ---------- resume ---------- */
      .resume-preview-link {
        display: block; background: #ffffff; border-radius: 0.5rem; overflow: hidden;
        border: 1px solid var(--color-border); cursor: pointer;
        transform: rotate(-4deg);
        box-shadow: 0 26px 52px -26px rgba(28, 28, 26, 0.38);
        transition: transform 0.35s ease, box-shadow 0.35s ease;
      }
      .resume-preview-link:hover,
      .resume-preview-link:focus-visible {
        transform: rotate(-1deg) scale(1.035);
        box-shadow: 0 34px 64px -22px rgba(28, 28, 26, 0.44);
      }
      .resume-preview-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
      .resume-preview-img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
      @media (prefers-reduced-motion: reduce) {
        .resume-preview-link { transition: box-shadow 0.2s ease; transform: rotate(-4deg); }
        .resume-preview-link:hover, .resume-preview-link:focus-visible { transform: rotate(-4deg); }
      }
      .aspect-resume { aspect-ratio: 8.5 / 11; }

      /* ---------- contact: strongest dark-contrast moment on Theme 1 ----------
         Dedicated --contact-* tokens (tokens.css) instead of the generic
         --color-inverse-* / --color-accent ones, so this panel's surface and
         accent can be tuned independently of bg-inverse/ui-btn-dark/the
         sitewide accent used elsewhere. Light mode's tokens mirror the
         previous inverse values exactly, so its appearance is unchanged. */
      .contact-panel {
        overflow-wrap: anywhere;
        background: var(--contact-surface); color: var(--contact-text);
        border-radius: 0.75rem; padding: clamp(2rem, 5vw, 4rem); position: relative; overflow: hidden;
        box-shadow: var(--contact-panel-shadow);
      }
      .contact-panel .section-label-num { color: var(--contact-text-accent); }
      .contact-panel .text-accent { color: var(--contact-text-accent); }
      .contact-panel .tech-corner { border-color: var(--contact-border); }
      .contact-panel .ui-btn-primary {
        background: var(--contact-accent); border-color: var(--contact-accent); color: var(--contact-accent-text);
      }
      .contact-panel .ui-btn-primary:hover { background: var(--contact-accent-strong); border-color: var(--contact-accent-strong); }
      .contact-field {
        width: 100%; background: var(--color-surface); border: 1px solid var(--color-border);
        border-radius: 0.45rem; padding: 0.75rem 0.9rem; color: var(--color-text);
        font-family: var(--font-body); font-size: 1rem; min-width: 0; transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .contact-field-dark { background: var(--contact-input-surface); border-color: var(--contact-border); color: var(--contact-text); }
      .contact-field-dark:hover { border-color: var(--contact-border-hover); }
      .contact-field-dark::placeholder { color: var(--contact-placeholder); }
      .contact-field::placeholder { color: var(--color-text-faint); }
      .contact-field:focus {
        outline: none; border-color: var(--contact-accent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--contact-accent) 16%, transparent);
      }
      /* Keeps Chrome/Safari's autofill yellow/white flash from breaking the
         earthy dark palette — the huge inset shadow paints over the browser's
         own autofill background using the field's own surface color. */
      .contact-field-dark:-webkit-autofill,
      .contact-field-dark:-webkit-autofill:hover,
      .contact-field-dark:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--contact-text);
        -webkit-box-shadow: 0 0 0 1000px var(--contact-input-surface) inset;
        box-shadow: 0 0 0 1000px var(--contact-input-surface) inset;
        transition: background-color 9999s ease-in-out 0s;
      }
      .contact-field-error { border-color: #c2603f; }
      .contact-error-text { color: #d98363; font-size: 0.78rem; margin-top: 0.3rem; }
      .contact-label { font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 0.4rem; color: var(--contact-text-muted); }
      .contact-fields-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
      @media (min-width: 640px) { .contact-fields-grid-2 { grid-template-columns: 1fr 1fr; } }

      a, button { -webkit-tap-highlight-color: transparent; }
      :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    `}</style>
  );
}
