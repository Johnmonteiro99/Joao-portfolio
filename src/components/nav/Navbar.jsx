import { useState } from "react";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import ThemeToggle from "../../theme/ThemeToggle";
import MobileNav from "./MobileNav";
import { CONTACT, RESUME } from "../../data/content";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

// Tracks the page's own normal scroll via IntersectionObserver
// (useScrollSpy) — activeId/scrollToChapter carry no knowledge of how the
// page scrolls, just which section is current and how to reach one.
export default function Navbar({ activeId, scrollToChapter }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Primary">
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => scrollToChapter("hero")}
            className="navbar-wordmark"
            style={{ fontSize: "1rem", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            ZAYVERSE<span className="wordmark-dot" aria-hidden="true" />
          </button>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2rem" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToChapter(link.id)}
                className={`navbar-link ${activeId === link.id ? "navbar-link-active" : ""}`}
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {link.label}
                {activeId === link.id && <span className="navbar-underline" />}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="navbar-icon-btn hidden md:inline-flex"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="navbar-icon-btn hidden md:inline-flex"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={RESUME.href}
              target={RESUME.available ? "_blank" : undefined}
              rel={RESUME.available ? "noopener noreferrer" : undefined}
              className="ui-btn ui-btn-resume hidden md:inline-flex"
            >
              <span>Resume</span>
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </a>
            <ThemeToggle />
            <button
              className="md:hidden navbar-icon-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        activeId={activeId}
        onNavigate={(id) => {
          setMobileOpen(false);
          scrollToChapter(id);
        }}
      />
    </>
  );
}
