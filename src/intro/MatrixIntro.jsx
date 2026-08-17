import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ---------- Cyber rain intro ----------
// Digital rain is rendered on canvas (cheap: one clear + N glyph draws per
// frame) rather than as animated DOM nodes, so density can scale with
// viewport size without creating hundreds of React-managed elements.
const RAIN_CHARS =
  "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=<>{}#%&";

// Ordered so index i's "neighbor" (i+1, or i-1 at the end) is the color a
// stream may subtly drift toward — green leans cyan, violet leans magenta, etc.
const RAIN_PALETTE = [
  [57, 255, 20], // electric green
  [0, 229, 255], // cyber cyan
  [139, 92, 246], // electric violet
  [255, 60, 172], // hot magenta
];
const ICE_WHITE = [234, 251, 255];
const RAIN_WEIGHTS = [46, 23, 19, 12]; // ~green 46% / cyan 23% / violet 19% / magenta 12%

const RAIN_LAYERS = {
  bg: { weight: 0.42, font: [10, 12], speed: [0.3, 0.5], trail: [3, 5], alpha: [0.14, 0.26], glow: false },
  mid: { weight: 0.4, font: [13, 16], speed: [0.65, 0.95], trail: [6, 9], alpha: [0.42, 0.62], glow: "light" },
  fg: { weight: 0.18, font: [16, 20], speed: [1.0, 1.35], trail: [9, 14], alpha: [0.75, 0.95], glow: true },
};

// Theme 1's real palette — what the cyber colors resolve into as the system
// stabilizes. Kept here (not imported from theme/tokens.css, which is plain
// CSS) so the canvas can lerp toward the exact same values in RGB space.
const THEME1 = {
  olive: [116, 124, 60], // #747c3c
  charcoal: [28, 28, 26], // #1c1c1a
  bg: [247, 246, 242], // #f7f6f2
};

function rand(min, max) {
  return min + Math.random() * (max - min);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function pickRainColorIndex() {
  const total = RAIN_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < RAIN_WEIGHTS.length; i++) {
    if (r < RAIN_WEIGHTS[i]) return i;
    r -= RAIN_WEIGHTS[i];
  }
  return 0;
}

function pickRainLayer(calm) {
  if (calm) return Math.random() < 0.78 ? "bg" : "mid";
  const r = Math.random();
  if (r < RAIN_LAYERS.bg.weight) return "bg";
  if (r < RAIN_LAYERS.bg.weight + RAIN_LAYERS.mid.weight) return "mid";
  return "fg";
}

function lerpRgb(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function makeRainStream(x, isMobile, calm) {
  const layer = pickRainLayer(calm);
  const cfg = RAIN_LAYERS[layer];
  const colorIndex = pickRainColorIndex();
  let trailLength = Math.round(rand(cfg.trail[0], cfg.trail[1]));
  if (isMobile) trailLength = Math.max(3, Math.round(trailLength * 0.7));

  return {
    x,
    layer,
    colorIndex,
    driftTarget: colorIndex < RAIN_PALETTE.length - 1 ? colorIndex + 1 : colorIndex - 1,
    driftPhase: Math.random() * Math.PI * 2,
    fontSize: rand(cfg.font[0], cfg.font[1]) * (isMobile ? 0.9 : 1),
    speed: rand(cfg.speed[0], cfg.speed[1]),
    trailLength,
    baseAlpha: rand(cfg.alpha[0], cfg.alpha[1]) * (calm ? 0.75 : 1),
    glow: !calm && !isMobile && cfg.glow,
    y: rand(-40, 0),
    nearEdge: false,
    attracted: false,
  };
}

const INTRO_NAME = "JOÃO MONTEIRO";
const INTRO_NAME_CLASS = "font-mono font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl";
const NAME_GLOW_CYBER =
  "0 0 14px rgba(57,255,20,0.65), 0 0 26px rgba(0,229,255,0.22), 0 0 38px rgba(139,92,246,0.16)";
const NAME_GLOW_NONE = "0 0 0px rgba(28,28,26,0), 0 0 0px rgba(28,28,26,0), 0 0 0px rgba(28,28,26,0)";

function NameReveal({ phase, reducedMotion }) {
  if (reducedMotion) {
    const visible = phase === "reveal" || phase === "collapse";
    return (
      <motion.h1
        className={`relative tracking-widest text-center px-6 ${INTRO_NAME_CLASS}`}
        style={{ maxWidth: "min(94vw, 920px)" }}
        initial={{ opacity: 0, color: "#39FF14" }}
        animate={{ opacity: visible ? 1 : 0, color: phase === "collapse" ? "#1c1c1a" : "#39FF14" }}
        transition={{ duration: 0.3 }}
      >
        {INTRO_NAME}
      </motion.h1>
    );
  }

  // rain: letters hidden · reveal: letters settle in and hold, green + cyber
  // glow · collapse: color/glow resolve toward Theme 1's charcoal, no glow ·
  // settle: the whole name fades out as the real hero underneath takes over.
  const lettersIn = phase !== "rain";
  const stabilizing = phase === "collapse" || phase === "settle";

  return (
    <motion.div
      className="relative px-6"
      style={{ maxWidth: "min(94vw, 920px)" }}
      animate={{ opacity: phase === "settle" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.h1
        className={`relative flex flex-wrap justify-center tracking-widest ${INTRO_NAME_CLASS}`}
        animate={{
          color: stabilizing ? "#1c1c1a" : "#39FF14",
          textShadow: stabilizing ? NAME_GLOW_NONE : NAME_GLOW_CYBER,
        }}
        transition={{ duration: stabilizing ? 1.1 : 0.5, ease: "easeInOut" }}
      >
        {INTRO_NAME.split("").map((ch, i) => (
          <motion.span
            key={i}
            animate={
              lettersIn
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 10, filter: "blur(6px)" }
            }
            transition={lettersIn ? { delay: i * 0.05, duration: 0.35, ease: "easeOut" } : { duration: 0 }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        className="font-mono text-center"
        style={{ marginTop: "0.75rem", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(28,28,26,0.55)" }}
        animate={{ opacity: phase === "collapse" ? [0, 1, 1, 0] : 0 }}
        transition={{ duration: 0.8, times: [0, 0.2, 0.75, 1], ease: "easeInOut" }}
      >
        IDENTITY RESOLVED
      </motion.div>
    </motion.div>
  );
}

const REVEAL_AT_MS = 2400;
const COLLAPSE_AT_MS = 3200;
const COLLAPSE_DURATION_MS = 1500;
const SETTLE_DURATION_MS = 600;
const DONE_AT_MS = COLLAPSE_AT_MS + COLLAPSE_DURATION_MS + SETTLE_DURATION_MS;

export default function MatrixIntro({ onDone }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("rain"); // rain -> reveal -> collapse -> settle
  const phaseRef = useRef("rain");
  const phaseStartRef = useRef(performance.now());
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    phaseRef.current = phase;
    phaseStartRef.current = performance.now();
  }, [phase]);

  // Locks page scroll and hides the (already-mounted, see Portfolio.jsx)
  // homepage from keyboard/AT while the decorative intro plays, since it now
  // exists in the DOM underneath rather than mounting only after onDone.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const homeRoot = document.getElementById("home-root");
    if (homeRoot) homeRoot.setAttribute("inert", "");
    return () => {
      document.body.style.overflow = prevOverflow;
      if (homeRoot) homeRoot.removeAttribute("inert");
    };
  }, []);

  // Phase timeline: rain settles in, letters reveal one by one and hold,
  // then the environment collapses/stabilizes into Theme 1 and hands off.
  useEffect(() => {
    const timers = reducedMotion
      ? [setTimeout(() => setPhase("reveal"), 150), setTimeout(() => setPhase("collapse"), 500), setTimeout(onDone, 900)]
      : [
          setTimeout(() => setPhase("reveal"), REVEAL_AT_MS),
          setTimeout(() => setPhase("collapse"), COLLAPSE_AT_MS),
          setTimeout(() => setPhase("settle"), COLLAPSE_AT_MS + COLLAPSE_DURATION_MS),
          setTimeout(onDone, DONE_AT_MS),
        ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, streams, zoneHalfW, isMobile;
    let collapseReady = false;
    let collapseStartTime = 0;
    let raf = null;
    let resizeTimer = null;
    let lastTime = performance.now();

    function setup() {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 480 ? 26 : width < 768 ? 20 : width < 1200 ? 17 : 15;
      const maxColumns = isMobile ? 46 : 150;
      const columnCount = Math.min(Math.floor(width / spacing), maxColumns);
      streams = new Array(columnCount)
        .fill(0)
        .map((_, i) => makeRainStream(i * spacing + spacing / 2, isMobile, reducedMotion));

      zoneHalfW = Math.min(width * 0.4, 430);
      const edgeMargin = spacing * 3;
      streams.forEach((s) => {
        const distFromZone = Math.abs(s.x - width / 2) - zoneHalfW;
        s.nearEdge = distFromZone > 0 && distFromZone < edgeMargin;
      });

      collapseReady = false;
    }
    setup();

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 150);
    }
    window.addEventListener("resize", onResize);

    // Marks a portion of streams (skewed toward the more visible mid/fg
    // layers) as "attracted" — these drift toward a loose grid of guide
    // points near the center instead of continuing to fall, and gradually
    // render as small geometry marks instead of glyphs. One attracted
    // fragment is chosen as the subtle easter-egg: it resists settling,
    // flickers once, then fades rather than joining the stable structure.
    function initCollapse(now) {
      collapseReady = true;
      collapseStartTime = now;
      const attractRatio = isMobile ? 0.22 : 0.36;
      const guideYFractions = [0.3, 0.46, 0.62, 0.78];
      const gridSpacing = isMobile ? 74 : 92;
      let gi = 0;
      const eligible = [];
      streams.forEach((s) => {
        s.attracted = s.layer !== "bg" && Math.random() < attractRatio;
        if (s.attracted) {
          s.originX = s.x;
          s.originRow = s.y;
          s.targetX = Math.round(s.x / gridSpacing) * gridSpacing;
          s.targetRow = (height * guideYFractions[gi % guideYFractions.length]) / s.fontSize;
          gi++;
          s.shapeSeed = Math.random();
          s.eggFragment = false;
          eligible.push(s);
        }
      });
      if (eligible.length) {
        eligible[(Math.random() * eligible.length) | 0].eggFragment = true;
      }
    }

    function drawGeometryMark(x, y, size, seed, rgb, alpha) {
      ctx.strokeStyle = ctx.fillStyle = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha})`;
      ctx.lineWidth = 1;
      if (seed < 0.25) {
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        ctx.stroke();
      } else if (seed < 0.5) {
        ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      } else if (seed < 0.75) {
        ctx.beginPath();
        ctx.arc(x, y, size / 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        ctx.stroke();
      }
    }

    // The core of the new sequence: streams decelerate, a portion collapse
    // into a loose grid of technical marks (data becoming structure), the
    // rest fade out, and every color gradually resolves toward Theme 1.
    function drawCollapse(now) {
      if (!collapseReady) initCollapse(now);
      const t = Math.min(1, (now - collapseStartTime) / COLLAPSE_DURATION_MS);
      const easeT = easeInOutCubic(t);
      const fallSpeedMul = lerp(1, 0.12, Math.min(1, t * 1.4));

      ctx.font = `13px monospace`;
      for (const s of streams) {
        if (s.attracted) {
          const rgb = s.eggFragment
            ? t < 0.78
              ? RAIN_PALETTE[s.colorIndex]
              : t < 0.9
              ? RAIN_PALETTE[Math.random() < 0.5 ? 3 : 1]
              : null // vanished
            : lerpRgb(RAIN_PALETTE[s.colorIndex], s.colorIndex <= 1 ? THEME1.olive : THEME1.charcoal, easeT);
          if (!rgb) continue;

          const drawX = lerp(s.originX, s.targetX, easeT);
          const drawRow = lerp(s.originRow, s.targetRow, easeT);
          const drawY = drawRow * s.fontSize;
          const alpha = Math.min(0.6, easeT * 0.75) * (s.eggFragment && t > 0.9 ? (1 - (t - 0.9) / 0.1) : 1);
          if (alpha <= 0.02) continue;

          if (easeT < 0.4) {
            ctx.font = `${s.fontSize}px monospace`;
            const char = RAIN_CHARS[(Math.random() * RAIN_CHARS.length) | 0];
            ctx.fillStyle = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha})`;
            ctx.fillText(char, drawX, drawY);
          } else {
            drawGeometryMark(drawX, drawY, s.fontSize * 0.55, s.shapeSeed, rgb, alpha);
          }
          continue;
        }

        // Non-attracted streams: keep falling but decelerate and fade —
        // "losing chaotic momentum" rather than stopping all at once.
        s.y += s.speed * fallSpeedMul;
        const fadeAlphaMul = Math.max(0, 1 - easeT * 0.95);
        if (fadeAlphaMul <= 0.02) continue;

        const driftT = (Math.sin(now * 0.0006 + s.driftPhase) * 0.5 + 0.5) * 0.32;
        const targetRgb = s.colorIndex <= 1 ? THEME1.olive : THEME1.charcoal;
        ctx.font = `${s.fontSize}px monospace`;
        for (let tr = 0; tr < s.trailLength; tr++) {
          const row = s.y - tr;
          const y = row * s.fontSize;
          if (y < -s.fontSize || y > height + s.fontSize) continue;
          const isHead = tr === 0;
          const posT = tr / s.trailLength;
          let alpha = (isHead ? Math.min(1, s.baseAlpha * 1.5 + 0.15) : s.baseAlpha * Math.pow(1 - posT, 1.6)) * fadeAlphaMul;
          if (alpha <= 0.02) continue;
          const rgb = lerpRgb(lerpRgb(RAIN_PALETTE[s.colorIndex], RAIN_PALETTE[s.driftTarget], driftT), targetRgb, easeT * 0.6);
          const char = RAIN_CHARS[(Math.random() * RAIN_CHARS.length) | 0];
          ctx.fillStyle = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha})`;
          ctx.fillText(char, s.x, y);
        }
      }
      return t;
    }

    function drawRain(dtFactor, now) {
      const currentPhase = phaseRef.current;
      const timeInPhase = now - phaseStartRef.current;
      const zoneActive = currentPhase === "reveal";
      const edgeBoost = currentPhase === "reveal" && timeInPhase < 400;

      for (let s of streams) {
        const inZone = zoneActive && Math.abs(s.x - width / 2) < zoneHalfW;
        const brighten = edgeBoost && s.nearEdge;

        s.y += s.speed * dtFactor * (inZone ? 0.6 : 1);

        const driftT = (Math.sin(now * 0.0006 + s.driftPhase) * 0.5 + 0.5) * 0.32;
        const baseRgb = RAIN_PALETTE[s.colorIndex];
        const targetRgb = RAIN_PALETTE[s.driftTarget];

        ctx.font = `${s.fontSize}px monospace`;

        for (let t = 0; t < s.trailLength; t++) {
          const row = s.y - t;
          const y = row * s.fontSize;
          if (y < -s.fontSize || y > height + s.fontSize) continue;

          const isHead = t === 0;
          const posT = t / s.trailLength;
          let alpha = isHead ? Math.min(1, s.baseAlpha * 1.5 + 0.15) : s.baseAlpha * Math.pow(1 - posT, 1.6);
          if (inZone) alpha *= 0.35;
          if (brighten) alpha = Math.min(1, alpha * 1.4);
          if (alpha <= 0.02) continue;

          let rgb = lerpRgb(baseRgb, targetRgb, isHead ? Math.min(1, driftT * 1.5) : driftT);
          let isWhite = false;
          if (isHead && s.layer !== "bg" && Math.random() < 0.006) {
            rgb = ICE_WHITE;
            isWhite = true;
          }

          const char = RAIN_CHARS[(Math.random() * RAIN_CHARS.length) | 0];
          ctx.fillStyle = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, ${alpha})`;

          if (isHead && s.glow && (isWhite || brighten || s.layer === "fg")) {
            ctx.shadowColor = `rgba(${rgb[0] | 0}, ${rgb[1] | 0}, ${rgb[2] | 0}, 0.8)`;
            ctx.shadowBlur = s.layer === "fg" ? 9 : 5;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, s.x, y);
        }
        ctx.shadowBlur = 0;

        if ((s.y - s.trailLength) * s.fontSize > height) {
          s.y = rand(-40, -4);
        }
      }
    }

    function drawFrame(dtFactor, now) {
      // Fully transparent clear: every frame is redrawn from scratch, so
      // nothing relies on persistence.
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0;
      if (phaseRef.current === "collapse") {
        const t = drawCollapse(now);
        if (t >= 1) return "stop"; // geometry has settled — freeze this frame, stop the loop
      } else if (phaseRef.current === "settle") {
        return "stop";
      } else {
        drawRain(dtFactor, now);
      }
      return "continue";
    }

    if (reducedMotion) {
      drawFrame(0, performance.now());
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeTimer);
      };
    }

    function loop(now) {
      const dtFactor = Math.min(2, (now - lastTime) / 16.7);
      lastTime = now;
      const result = drawFrame(dtFactor, now);
      if (result === "stop") {
        raf = null;
        return;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [reducedMotion]);

  // Background resolves black -> charcoal -> stone -> Theme 1's exact off-
  // white during collapse, THEN (already color-matched) simply fades opacity
  // to 0 during settle — never a black-to-white cut, always a "brightening".
  const bgTarget =
    phase === "collapse"
      ? ["#050506", "#1c1c1a", "#4b4a45", "#f7f6f2"]
      : phase === "settle"
      ? "#f7f6f2"
      : "#050506";

  return (
    <motion.div
      className="bg-intro"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: phase === "settle" ? "none" : "auto",
      }}
      animate={{
        backgroundColor: bgTarget,
        opacity: phase === "settle" ? 0 : 1,
      }}
      transition={{
        backgroundColor: { duration: reducedMotion ? 0.4 : COLLAPSE_DURATION_MS / 1000, times: phase === "collapse" ? [0, 0.35, 0.7, 1] : undefined, ease: "easeInOut" },
        opacity: { duration: reducedMotion ? 0.3 : SETTLE_DURATION_MS / 1000, ease: "easeInOut" },
      }}
      exit={{ opacity: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: reducedMotion ? 0.35 : phase === "reveal" ? 0.72 : 0.85,
          transition: "opacity 0.5s ease",
        }}
      />
      <div className="relative z-10">
        <NameReveal phase={phase} reducedMotion={reducedMotion} />
      </div>
    </motion.div>
  );
}
