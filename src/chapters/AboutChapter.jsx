import StoryPanel from "../components/about/StoryPanel";
import Portrait from "../components/about/Portrait";
import { ABOUT } from "../data/content";

export default function AboutChapter() {
  return (
    <div className="chapter-inner">
      <div className="about-layout">
        <div className="about-heading-area">
          <div className="section-label">
            <span className="section-label-num">03</span>About Me
          </div>
          <h2 id="about-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            Who I am
          </h2>
        </div>
        <div className="about-portrait-area" style={{ display: "flex", justifyContent: "center" }}>
          <Portrait />
        </div>
        <div className="about-story-area">
          <StoryPanel paragraphs={ABOUT.paragraphs} />
        </div>
      </div>
    </div>
  );
}
