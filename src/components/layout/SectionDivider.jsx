import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const JUSTIFY = { left: "flex-start", center: "center", right: "flex-end" };

// Decorative-only waypoint marking the seam between two chapters — reuses
// Theme 1's existing tech-coord vocabulary (see Portrait.jsx). Purely a
// visual motif; the coordinate is not real location data.
export default function SectionDivider({ coord, align = "center" }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="section-divider" aria-hidden="true">
      <motion.div
        className="section-divider-inner"
        style={{ justifyContent: JUSTIFY[align] || "center" }}
        initial={reducedMotion ? false : { opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
      >
        <span className="tech-coord">{coord}</span>
        <span className="section-divider-dot" />
      </motion.div>
    </div>
  );
}
