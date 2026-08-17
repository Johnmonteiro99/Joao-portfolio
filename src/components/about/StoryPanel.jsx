import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const DWELL_MS = 9000; // 8-10s reading dwell per paragraph
const DWELL_LAST_MS = 15000; // linger longer on the final paragraph before stopping
const RESUME_DELAY_MS = 5000; // "wait several seconds" after any manual interaction
const VISIBLE_RESUME_DELAY_MS = 900;
const WHEEL_COOLDOWN_MS = 700; // one deliberate gesture = one paragraph, not a stream of them
const WHEEL_THRESHOLD = 12; // ignore trackpad micro-jitter

// activeIndex is the one and only source of truth for which paragraph is
// showing — nothing here infers it from scroll position, so "04 / 04" is
// exactly as reachable and stable as every other state.
export default function StoryPanel({ paragraphs }) {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = paragraphs.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = advancing, -1 = retreating (for transition offset)

  const activeIndexRef = useRef(0);
  const phaseRef = useRef("paused"); // 'paused' | 'playing' | 'done'
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const advanceTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const wheelCooldownRef = useRef(false);
  const touchStartXRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = null;
  };
  const clearResumeTimer = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  };

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(count - 1, index));
      if (clamped === activeIndexRef.current) return;
      setDirection(clamped > activeIndexRef.current ? 1 : -1);
      setActiveIndex(clamped);
    },
    [count]
  );

  const advance = useCallback(() => {
    if (reducedMotion || phaseRef.current !== "playing") return;
    const i = activeIndexRef.current;
    const isLast = i === count - 1;
    if (isLast) {
      // Reaching the end stops autoplay entirely — no loop back to 01.
      phaseRef.current = "done";
      return;
    }
    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== "playing") return;
      const next = i + 1;
      // Sync the ref immediately — the recursive advance() call below reads
      // it in the same tick, before the [activeIndex] effect would run.
      activeIndexRef.current = next;
      setDirection(1);
      setActiveIndex(next);
      if (next === count - 1) {
        // Linger on the final paragraph, then stop — never auto-resets to 01.
        advanceTimerRef.current = setTimeout(() => {
          phaseRef.current = "done";
        }, DWELL_LAST_MS);
      } else {
        // Start the new current paragraph's own DWELL_MS clock right away —
        // advance() is a stable useCallback, so this self-reference is safe.
        advance();
      }
    }, DWELL_MS);
  }, [count, reducedMotion]);

  const pause = useCallback(() => {
    if (phaseRef.current === "playing") phaseRef.current = "paused";
    clearAdvanceTimer();
    clearResumeTimer();
  }, []);

  // Starts (or resumes) the dwell clock for whichever paragraph is
  // currently showing — `delay` is only the settle/idle wait before that,
  // never an extra dwell period stacked on top of advance()'s own DWELL_MS.
  const scheduleResume = useCallback(
    (delay) => {
      if (reducedMotion) return;
      clearResumeTimer();
      resumeTimerRef.current = setTimeout(() => {
        if (isHoveringRef.current || !isVisibleRef.current || phaseRef.current !== "paused") return;
        if (activeIndexRef.current >= count - 1) return; // nothing left to advance to
        phaseRef.current = "playing";
        advance();
      }, delay);
    },
    [advance, count, reducedMotion]
  );

  // Gate the whole timer chain on real visibility.
  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) scheduleResume(VISIBLE_RESUME_DELAY_MS);
        else pause();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pause, scheduleResume, reducedMotion]);

  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      clearResumeTimer();
    };
  }, []);

  const onManualInteraction = () => {
    pause();
    scheduleResume(RESUME_DELAY_MS);
  };

  const goPrev = () => {
    onManualInteraction();
    goTo(activeIndex - 1);
  };
  const goNext = () => {
    onManualInteraction();
    goTo(activeIndex + 1);
  };

  // Deliberate wheel gestures step one paragraph at a time; at either
  // boundary the listener does nothing so the page scrolls normally — this
  // never traps vertical scroll. React's synthetic onWheel is attached
  // passively here (preventDefault silently fails, logging a console error
  // and letting the page scroll leak through anyway), so this is a real
  // native listener with passive:false, reading activeIndexRef rather than
  // closing over a stale `activeIndex` from whenever the effect last ran.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const handler = (e) => {
      const goingDown = e.deltaY > 0;
      const atBoundary = goingDown ? activeIndexRef.current === count - 1 : activeIndexRef.current === 0;
      if (atBoundary || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      e.preventDefault();
      if (wheelCooldownRef.current) return;
      wheelCooldownRef.current = true;
      pause();
      scheduleResume(RESUME_DELAY_MS);
      goTo(activeIndexRef.current + (goingDown ? 1 : -1));
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [count, goTo, pause, scheduleResume]);

  // Simple horizontal swipe — read at touchend only, so it never competes
  // with native vertical page scrolling mid-gesture.
  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    if (touchStartXRef.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 50) return;
    onManualInteraction();
    goTo(deltaX < 0 ? activeIndex + 1 : activeIndex - 1);
  };

  const current = paragraphs[activeIndex];
  const progressPct = ((activeIndex + 1) / count) * 100;

  const textVariants = reducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (dir) => ({ opacity: 0, y: dir > 0 ? 10 : -10, filter: "blur(2px)" }),
        center: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: (dir) => ({ opacity: 0, y: dir > 0 ? -10 : 10, filter: "blur(2px)" }),
      };

  return (
    <div ref={wrapperRef}>
      <div
        ref={panelRef}
        className="story-panel"
        tabIndex={0}
        role="group"
        aria-roledescription="story"
        aria-label={`About João, paragraph ${activeIndex + 1} of ${count}`}
        onMouseEnter={() => {
          isHoveringRef.current = true;
          pause();
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          scheduleResume(RESUME_DELAY_MS);
        }}
        onFocus={() => {
          isHoveringRef.current = true;
          pause();
        }}
        onBlur={() => {
          isHoveringRef.current = false;
          scheduleResume(RESUME_DELAY_MS);
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goNext();
          else if (e.key === "ArrowLeft") goPrev();
        }}
      >
        <div className="story-panel-top">
          <span className="font-label text-faint story-progress" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        <div className="story-panel-body" aria-live="polite">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reducedMotion ? 0.18 : 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="story-paragraph">{current.text}</p>
              <div className="story-labels">
                {current.labels.map((label) => (
                  <span key={label} className="story-label">
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="story-panel-bottom">
          <div className="story-progress-track" aria-hidden="true">
            <div className="story-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="story-nav-controls">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous story paragraph"
              className="story-nav-btn"
            >
              <ArrowLeft size={14} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === count - 1}
              aria-label="Next story paragraph"
              className="story-nav-btn"
            >
              <ArrowRight size={14} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
