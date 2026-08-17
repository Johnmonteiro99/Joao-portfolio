import { ArrowUpRight } from "lucide-react";

// variant: "primary" (solid olive, arrow) | "secondary" (outline, dot accent)
// | "text" (bare text + arrow, no chrome) | "resume" (thin-border utility)
export default function Button({ as = "button", variant = "primary", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag className={`ui-btn ui-btn-${variant} ${className}`} {...rest}>
      <span className="ui-btn-label">{children}</span>
      {variant === "secondary" ? (
        <span className="ui-btn-dot" aria-hidden="true" />
      ) : variant === "text" ? (
        <ArrowUpRight size={14} strokeWidth={2.25} className="ui-btn-arrow" />
      ) : (
        <ArrowUpRight size={15} strokeWidth={2.25} className="ui-btn-arrow" />
      )}
    </Tag>
  );
}
