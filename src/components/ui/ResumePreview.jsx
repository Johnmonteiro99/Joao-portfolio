import { RESUME } from "../../data/content";

// Shows the real resume (a first-page preview image generated from the
// actual PDF) inside a clickable link that opens the real file — never a
// fabricated text mock.
export default function ResumePreview({ compact }) {
  return (
    <a
      href={RESUME.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View resume in a new tab"
      className={`resume-preview-link ${compact ? "aspect-resume" : ""}`}
    >
      <img src={RESUME.previewImage} alt="Preview of João Monteiro's resume, first page" className="resume-preview-img" loading="lazy" />
    </a>
  );
}
