// Restrained "design documentation / engineering diagram" motifs — thin
// crosshairs and coordinate-style labels used sparingly as accents, never as
// a dominant pattern. Decorative only; coordinates are abstract, not real.
export function Crosshair({ className = "", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" className={`tech-mark ${className}`} aria-hidden="true">
      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function CoordinateLabel({ children, className = "", ...rest }) {
  return (
    <span className={`tech-coord ${className}`} {...rest}>
      {children}
    </span>
  );
}

export function TechCorner({ position = "top-left" }) {
  return <div className={`tech-corner tech-corner-${position}`} aria-hidden="true" />;
}
