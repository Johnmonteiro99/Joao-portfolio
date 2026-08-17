import { SERVICES } from "../data/content";

export default function ServicesChapter() {
  return (
    <div className="chapter-inner">
      <div className="section-label">
        <span className="section-label-num">05</span>Services
      </div>
      <h2 id="services-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1.6rem" }}>
        How I can help
      </h2>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="service-card" style={{ backgroundColor: `var(--color-service-tint-${(i % 6) + 1}, transparent)` }}>
            <span className="service-card-num font-label text-faint" style={{ fontSize: "0.7rem" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="service-card-title text-primary font-display" style={{ fontWeight: 700, fontSize: "1.02rem", margin: "0.5rem 0 0.4rem" }}>
              {s.title}
            </h3>
            <p className="text-muted" style={{ fontSize: "0.87rem", lineHeight: 1.6 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
