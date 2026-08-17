import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Informational, not actionable — focusable via tabIndex so the tooltip is
// reachable by keyboard, but not a <button> (nothing happens on activation).
export default function TechIcon({ icon: Icon, label }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="hero-tools-icon tech-tooltip-wrap"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Icon size={16} aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.span
            className="tech-tooltip"
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
