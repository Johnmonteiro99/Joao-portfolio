import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, Linkedin } from "lucide-react";
import ThemeToggle from "../../theme/ThemeToggle";
import { CONTACT, RESUME } from "../../data/content";

// Intentionally its own thing, not a squashed desktop nav: a full-screen
// overlay with large, tap-friendly stacked links.
function MenuDialog({ onClose, links, activeId, onNavigate }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialog.showModal();
    dialog.querySelector("button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
        <motion.dialog
          ref={dialogRef}
          id="mobile-navigation"
          aria-label="Navigation menu"
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const controls = [...dialogRef.current.querySelectorAll('button, a[href]')];
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault(); first.focus();
            }
          }}
          onCancel={(event) => { event.preventDefault(); onClose(); }}
          className="mobile-nav-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="navbar-icon-btn"
            style={{ position: "absolute", top: 22, right: 22, background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={22} />
          </button>

          <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {links.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                aria-current={activeId === link.id ? "location" : undefined}
                className={`mobile-nav-link ${activeId === link.id ? "mobile-nav-link-active" : ""}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <a
              href={RESUME.href}
              target={RESUME.available ? "_blank" : undefined}
              rel={RESUME.available ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className="ui-btn ui-btn-primary"
              style={{ justifyContent: "center" }}
            >
              <span>Resume</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "1.1rem" }}>
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="navbar-icon-btn" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="navbar-icon-btn" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </motion.dialog>
  );
}

export default function MobileNav(props) {
  return <AnimatePresence>{props.open && <MenuDialog {...props} />}</AnimatePresence>;
}
