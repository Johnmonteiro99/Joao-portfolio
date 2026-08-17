import { Github, Linkedin, Mail } from "lucide-react";
import { CONTACT } from "../../data/content";

export default function Footer() {
  return (
    <footer
      className="border-default"
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        maxWidth: 1280,
        margin: "0 auto",
        color: "var(--color-text-muted)",
      }}
    >
      <a href={CONTACT.github} target="_blank" rel="noreferrer" className="navbar-icon-btn" aria-label="GitHub">
        <Github size={18} />
      </a>
      <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="navbar-icon-btn" aria-label="LinkedIn">
        <Linkedin size={18} />
      </a>
      <a href={`mailto:${CONTACT.email}`} className="navbar-icon-btn" aria-label="Email">
        <Mail size={18} />
      </a>
      <span className="font-label" style={{ marginLeft: "auto", fontSize: "0.75rem" }}>
        zayverse.dev
      </span>
    </footer>
  );
}
