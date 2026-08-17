import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./theme/ThemeProvider";
import GlobalStyles from "./components/layout/GlobalStyles";
import MatrixIntro from "./intro/MatrixIntro";
import HomePage from "./HomePage";

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider>
      <GlobalStyles />
      <AnimatePresence>
        {!introDone && <MatrixIntro key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      {/* Mounted immediately (not gated on introDone) so its real assets —
          hero image, thumbnails, fonts — start loading while still hidden
          behind the intro's opaque full-screen overlay. MatrixIntro locks
          body scroll and marks #home-root inert for the duration. */}
      <div id="home-root">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}
