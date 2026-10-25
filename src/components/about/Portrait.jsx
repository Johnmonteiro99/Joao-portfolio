import { useState } from "react";
import { motion } from "framer-motion";
import { HERO, PORTRAIT_SRC } from "../../data/content";

// Display the current portrait, with a placeholder if the image cannot load.
export default function Portrait() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="portrait-panel-wrap">
      <span className="tech-coord portrait-panel-coord" aria-hidden="true">
        40.7128&deg; N
      </span>

      <div className="portrait-stack">
        <div className="portrait-backing-plate" aria-hidden="true" />

        <motion.div
          className="portrait-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {!imgFailed ? (
            <img
              src={PORTRAIT_SRC}
              alt="Portrait of João Monteiro"
              className="portrait-panel-img"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="portrait-placeholder">
              <span className="font-label text-faint" style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}>
                PORTRAIT
              </span>
            </div>
          )}
        </motion.div>

        <span className="portrait-panel-dot" aria-hidden="true" />
        <span className="portrait-panel-tick" aria-hidden="true" />
      </div>

      <div className="portrait-meta">
        <div className="text-primary font-display" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
          JOÃO MONTEIRO
        </div>
        <div className="font-label text-accent" style={{ fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {HERO.eyebrow}
        </div>
      </div>
    </div>
  );
}
