import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Normal document-flow scrolling — nothing here pins, snaps, or intercepts
// scroll input. Each section tracks its OWN local scroll progress (0 at the
// moment it starts entering the viewport from below, 1 at the moment it's
// fully scrolled past out the top) and maps narrow sub-ranges of that to a
// depth-of-field: blurred/dim/lifted while approaching, sharp while being
// read, very slightly receded once passed — never hidden or blocked from
// being read again if the visitor scrolls back up.
export default function FocusSection({ id, headingId, className = "", children }) {
  const ref = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const entryEnd = 0.32; // sharp/settled well before reaching center
  const exitStart = 0.86; // holds sharp through nearly all of its reading time

  const opacity = useTransform(scrollYProgress, [0, entryEnd, exitStart, 1], [0.55, 1, 1, 0.93]);
  const y = useTransform(scrollYProgress, [0, entryEnd, exitStart, 1], [26, 0, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, entryEnd, exitStart, 1], [0.985, 1, 1, 0.995]);
  // Blur only applies to the entry approach, never to already-read content —
  // "do not aggressively blur content after the visitor passes it".
  const blurPx = useTransform(scrollYProgress, [0, entryEnd], [isMobile ? 0 : 3.5, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  if (reducedMotion) {
    return (
      <section id={id} aria-labelledby={headingId} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={headingId} className={className} ref={ref}>
      <motion.div style={{ opacity, y, scale, filter, willChange: "opacity, transform, filter" }}>
        {children}
      </motion.div>
    </section>
  );
}
