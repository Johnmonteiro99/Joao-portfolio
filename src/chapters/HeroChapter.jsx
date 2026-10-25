import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SiReact, SiTypescript, SiPython, SiFastapi, SiNodedotjs, SiPostgresql, SiSupabase, SiFigma } from "react-icons/si";
import Button from "../components/ui/Button";
import TechIcon from "../components/ui/TechIcon";
import { HERO } from "../data/content";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTheme } from "../theme/ThemeProvider";

const HERO_IMAGE = {
  light: "/images/zayverse-theme1-hero-device-composition.png",
  dark: "/images/zayverse-theme1-hero-dark2.png",
};

const TOOL_ICONS = {
  React: SiReact,
  TypeScript: SiTypescript,
  Python: SiPython,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Figma: SiFigma,
};

function scrollTo(id) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

const [akaWord, ...zayWords] = HERO.handle.split(" ");

export default function HeroChapter() {
  const wrapRef = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const enableParallax = !reducedMotion && isDesktop;
  const { theme } = useTheme();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 16 });
  const springY = useSpring(my, { stiffness: 60, damping: 16 });

  const onPointerMove = (e) => {
    if (!enableParallax || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX * 10); // max ~5px of travel either direction
    my.set(relY * 10);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="chapter-inner">
      <div className="hero-grid" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <div className="hero-content-col" style={{ position: "relative" }}>
          <div className="section-label">{HERO.eyebrow}</div>
          <h1 id="hero-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.2rem)" }}>
            {HERO.name}
            <br />
            <span className="text-accent">{akaWord}</span> <span className="text-primary">{zayWords.join(" ")}</span>
            <span className="text-accent">_</span>
          </h1>
          <p className="hero-professional-title">{HERO.role} <span>· {HERO.focus}</span></p>
          <p className="text-muted font-body hero-supporting">
            {HERO.supporting}
          </p>

          <div className="hero-actions">
            <Button variant="primary" onClick={() => scrollTo(HERO.ctaPrimary.target)}>
              {HERO.ctaPrimary.label}
            </Button>
            <Button variant="secondary" onClick={() => scrollTo(HERO.ctaSecondary.target)}>
              {HERO.ctaSecondary.label}
            </Button>
          </div>

          <div className="hero-technologies">
            <div className="section-label" style={{ marginBottom: "0.75rem" }}>
              Tools &amp; Technologies
            </div>
            <div className="hero-tool-list">
              {HERO.tools.map((tool) => (
                <TechIcon key={tool} icon={TOOL_ICONS[tool]} label={tool} />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-image-wrap" ref={wrapRef}>
          <motion.img
            src={theme === "dark" ? HERO_IMAGE.dark : HERO_IMAGE.light}
            alt="Composition of a laptop and phone showing the ZAYVERSE homepage, alongside floating design-system, code, and performance panels"
            style={{ width: "100%", height: "auto", display: "block", x: springX, y: springY }}
          />
        </div>
      </div>
    </div>
  );
}
