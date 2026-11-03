// Decorative SVG mahjong-tile flourishes used as background accents.

export function TileBamboo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true">
      <rect x="2" y="2" width="56" height="76" rx="8" fill="#FBF7F2" stroke="#C9A961" strokeWidth="1.5" />
      <g stroke="#8FA88E" strokeWidth="2.5" strokeLinecap="round">
        <line x1="20" y1="18" x2="20" y2="62" />
        <line x1="30" y1="18" x2="30" y2="62" />
        <line x1="40" y1="18" x2="40" y2="62" />
      </g>
      <g fill="#8FA88E">
        <circle cx="20" cy="14" r="3" />
        <circle cx="30" cy="14" r="3" />
        <circle cx="40" cy="14" r="3" />
      </g>
    </svg>
  );
}

export function TileDragon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true">
      <rect x="2" y="2" width="56" height="76" rx="8" fill="#F4B8B0" stroke="#C9A961" strokeWidth="1.5" />
      <text
        x="30"
        y="52"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="34"
        fontWeight="700"
        fill="#E86A4C"
      >
        中
      </text>
    </svg>
  );
}

export function TileFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true">
      <rect x="2" y="2" width="56" height="76" rx="8" fill="#FBF7F2" stroke="#C9A961" strokeWidth="1.5" />
      <g transform="translate(30 42)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse
            key={r}
            cx="0"
            cy="-12"
            rx="6"
            ry="12"
            fill="#E86A4C"
            transform={`rotate(${r})`}
            opacity="0.85"
          />
        ))}
        <circle r="5" fill="#C9A961" />
      </g>
    </svg>
  );
}
