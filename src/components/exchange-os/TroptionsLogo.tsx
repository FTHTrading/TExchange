// TROPTIONS Exchange OS — Official Double-T Logo (SVG, no external files needed)
// Matches the TROPTIONS brand: two overlapping serif T monograms in gold gradient.

interface Props {
  size?: number;
  variant?: "full" | "mark" | "wordmark";
  className?: string;
  style?: React.CSSProperties;
}

export function TroptionsLogo({ size = 48, variant = "full", className, style }: Props) {
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 320 80"
        width={size * (320 / 80)}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-label="TROPTIONS"
      >
        <defs>
          <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7D070" />
            <stop offset="45%" stopColor="#C9A24A" />
            <stop offset="100%" stopColor="#7A5208" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="60"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="68"
          fill="url(#wg)"
          letterSpacing="2"
        >
          TROPTIONS
        </text>
      </svg>
    );
  }

  if (variant === "mark") {
    return <TroptionsMarkSvg size={size} className={className} style={style} />;
  }

  // "full" — mark + wordmark stacked
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, ...style }}
    >
      <TroptionsMarkSvg size={size} />
      <svg
        viewBox="0 0 260 28"
        width={size * 1.85}
        height={size * 0.2}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0C860" />
            <stop offset="55%" stopColor="#C9A24A" />
            <stop offset="100%" stopColor="#8B6018" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="22"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="24"
          fill="url(#wg2)"
          letterSpacing="3"
        >
          TROPTIONS
        </text>
      </svg>
    </div>
  );
}

/** The double-T monogram mark */
export function TroptionsMarkSvg({
  size = 48,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="TROPTIONS mark"
    >
      <defs>
        {/* Primary gold gradient — fire amber to bright gold */}
        <linearGradient id="tg1" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#F7D070" />
          <stop offset="30%" stopColor="#E8A830" />
          <stop offset="65%" stopColor="#C9842A" />
          <stop offset="100%" stopColor="#8B5A08" />
        </linearGradient>
        {/* Secondary gradient — deeper for back T */}
        <linearGradient id="tg2" x1="40%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4982A" />
          <stop offset="50%" stopColor="#B07820" />
          <stop offset="100%" stopColor="#6B4A08" />
        </linearGradient>
        {/* Highlight sheen */}
        <linearGradient id="tg3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,230,140,0.6)" />
          <stop offset="40%" stopColor="rgba(255,200,80,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <filter id="gs" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Back T (right, deeper gold) ── */}
      {/* crossbar */}
      <rect x="58" y="18" width="88" height="22" rx="3" fill="url(#tg2)" />
      {/* stem */}
      <rect x="91" y="40" width="22" height="104" rx="3" fill="url(#tg2)" />

      {/* ── Front T (left, bright gold) ── */}
      {/* crossbar */}
      <rect x="14" y="18" width="88" height="22" rx="3" fill="url(#tg1)" />
      {/* stem */}
      <rect x="47" y="40" width="22" height="104" rx="3" fill="url(#tg1)" />

      {/* Sheen overlay on front T */}
      <rect x="14" y="18" width="88" height="22" rx="3" fill="url(#tg3)" opacity="0.5" />
      <rect x="47" y="40" width="22" height="40" rx="3" fill="url(#tg3)" opacity="0.4" />

      {/* Center overlap highlight */}
      <rect x="58" y="18" width="30" height="22" rx="2" fill="rgba(255,220,100,0.15)" />
    </svg>
  );
}

/** Inline logo lockup: mark + "TROPTIONS" + sub-label — for sidebar use */
export function TroptionsSidebarLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : "0.65rem", overflow: "hidden" }}>
      <TroptionsMarkSvg size={collapsed ? 28 : 32} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <div style={{ lineHeight: 1, overflow: "hidden" }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #F7D070 0%, #C9A24A 55%, #8B6018 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            TROPTIONS
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              color: "var(--xos-text-subtle)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Exchange OS
          </div>
        </div>
      )}
    </div>
  );
}
