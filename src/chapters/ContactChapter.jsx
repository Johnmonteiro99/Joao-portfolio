import { useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Button from "../components/ui/Button";
import { TechCorner } from "../components/decor/TechMarks";
import { CONTACT } from "../data/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPES = ["New Website", "Website Redesign", "Front-End Development", "Web Application", "Performance / SEO", "Other"];

const initialFields = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  budget: "",
  message: "",
};

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Enter a valid email.";
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "Tell me a bit more about the project (10+ characters).";
  }
  return errors;
}

export default function ContactChapter() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const onChange = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  // No backend exists (and none is fabricated here) — a valid submission
  // opens a pre-filled mailto: link, a real channel with zero credentials.
  // See project report for what's needed to wire up true in-page submission.
  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const subject = encodeURIComponent(`Project inquiry from ${fields.name}${fields.company ? ` (${fields.company})` : ""}`);
    const lines = [
      fields.message,
      "",
      `— ${fields.name} (${fields.email})`,
      fields.company && `Company: ${fields.company}`,
      fields.projectType && `Project type: ${fields.projectType}`,
      fields.timeline && `Timeline: ${fields.timeline}`,
      fields.budget && `Budget: ${fields.budget}`,
    ].filter(Boolean);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <div className="chapter-inner">
      <div className="contact-panel">
        <TechCorner position="top-left" />
        <TechCorner position="bottom-right" />
        <div className="section-label section-label-light">
          <span className="section-label-num">07</span>Contact
        </div>
        <div className="about-grid" style={{ alignItems: "start" }}>
          <div>
            <h2 id="contact-heading" className="hero-headline" style={{ fontSize: "clamp(2rem, 4.5vw, 3.1rem)", marginBottom: "1.1rem" }}>
              Let&rsquo;s build something
              <br />
              <span className="text-accent">extraordinary</span>
            </h2>
            <p style={{ color: "var(--contact-text-muted)", fontSize: "0.98rem", lineHeight: 1.65, maxWidth: 440, marginBottom: "1.75rem" }}>
              Whether you're a recruiter evaluating fit, a team looking to collaborate, or a client with a project
              in mind — I'd love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "1.75rem" }}>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", color: "var(--contact-text)" }}>
                <Mail size={16} /> {CONTACT.email}
              </a>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="font-label"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--contact-text-muted)", fontSize: "0.78rem", letterSpacing: "0.08em" }}
              >
                <Github size={19} />
                <span className="text-accent">GITHUB</span>
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="font-label"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--contact-text-muted)", fontSize: "0.78rem", letterSpacing: "0.08em" }}
              >
                <Linkedin size={19} />
                <span className="text-accent">LINKEDIN</span>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="contact-fields-grid contact-fields-grid-2">
              <div>
                <label htmlFor="ci-name" className="contact-label">Name</label>
                <input
                  id="ci-name"
                  type="text"
                  value={fields.name}
                  onChange={onChange("name")}
                  className={`contact-field contact-field-dark ${errors.name ? "contact-field-error" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "ci-name-error" : undefined}
                />
                {errors.name && <div id="ci-name-error" className="contact-error-text">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="ci-email" className="contact-label">Email</label>
                <input
                  id="ci-email"
                  type="email"
                  value={fields.email}
                  onChange={onChange("email")}
                  className={`contact-field contact-field-dark ${errors.email ? "contact-field-error" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "ci-email-error" : undefined}
                />
                {errors.email && <div id="ci-email-error" className="contact-error-text">{errors.email}</div>}
              </div>
            </div>

            <div className="contact-fields-grid contact-fields-grid-2">
              <div>
                <label htmlFor="ci-company" className="contact-label">Company / Business (optional)</label>
                <input id="ci-company" type="text" value={fields.company} onChange={onChange("company")} className="contact-field contact-field-dark" />
              </div>
              <div>
                <label htmlFor="ci-type" className="contact-label">Type of project</label>
                <select id="ci-type" value={fields.projectType} onChange={onChange("projectType")} className="contact-field contact-field-dark">
                  <option value="">Select one</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-fields-grid contact-fields-grid-2">
              <div>
                <label htmlFor="ci-timeline" className="contact-label">Desired timeline (optional)</label>
                <input id="ci-timeline" type="text" placeholder="e.g. 4–6 weeks" value={fields.timeline} onChange={onChange("timeline")} className="contact-field contact-field-dark" />
              </div>
              <div>
                <label htmlFor="ci-budget" className="contact-label">Budget (optional)</label>
                <input id="ci-budget" type="text" placeholder="e.g. Not sure yet" value={fields.budget} onChange={onChange("budget")} className="contact-field contact-field-dark" />
              </div>
            </div>

            <div>
              <label htmlFor="ci-message" className="contact-label">Project description</label>
              <textarea
                id="ci-message"
                rows={4}
                value={fields.message}
                onChange={onChange("message")}
                className={`contact-field contact-field-dark ${errors.message ? "contact-field-error" : ""}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "ci-message-error" : undefined}
              />
              {errors.message && <div id="ci-message-error" className="contact-error-text">{errors.message}</div>}
            </div>

            <Button as="button" type="submit" variant="primary" className="w-full" style={{ justifyContent: "center" }}>
              {status === "sent" ? "Opening email…" : "Start a Project"}
            </Button>
            {status === "sent" && (
              <p style={{ color: "var(--contact-text-muted)", fontSize: "0.78rem", textAlign: "center" }}>
                Opening your email client with everything filled in — send it over and I'll reply soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
