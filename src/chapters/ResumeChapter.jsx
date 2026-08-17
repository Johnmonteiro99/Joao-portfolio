import { Download, Maximize2, Mail } from "lucide-react";
import ResumePreview from "../components/ui/ResumePreview";
import { CONTACT, RESUME } from "../data/content";

export default function ResumeChapter() {
  return (
    <div className="chapter-inner">
      <div className="about-grid">
        <div>
          <div className="section-label">
            <span className="section-label-num">06</span>Resume
          </div>
          <h2 id="resume-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1.1rem" }}>
            Take a closer look
          </h2>
          <p className="text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 460, marginBottom: "1.5rem" }}>
            {RESUME.available
              ? "A full snapshot of my background, experience, and education — view it online or download a copy to keep."
              : "A full PDF is being finalized. In the meantime, I'm happy to send a copy directly."}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
            {RESUME.available ? (
              <>
                <a href={RESUME.href} target="_blank" rel="noopener noreferrer" className="ui-btn ui-btn-primary">
                  <span>View Resume</span>
                  <Maximize2 size={14} />
                </a>
                <a href={RESUME.href} download className="ui-btn ui-btn-secondary">
                  <span>Download a Copy</span>
                  <Download size={15} />
                </a>
              </>
            ) : (
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Resume request")}`} className="ui-btn ui-btn-primary">
                <span>Email me for a copy</span>
                <Mail size={15} />
              </a>
            )}
          </div>
        </div>

        <div style={{ maxWidth: 320, margin: "0 auto", width: "100%" }}>
          <ResumePreview compact />
        </div>
      </div>
    </div>
  );
}
