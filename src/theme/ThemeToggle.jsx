import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={`theme-toggle ${className}`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" style={{ transform: isDark ? "translateX(16px)" : "translateX(0)" }}>
          {isDark ? <Moon size={11} strokeWidth={2.25} /> : <Sun size={11} strokeWidth={2.25} />}
        </span>
      </span>
    </button>
  );
}
