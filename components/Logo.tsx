/**
 * Logo Brincaluna: luna dorada + órbita lila punteada + bola coral,
 * con el wordmark en Baloo 2 y su swash coral debajo.
 * (Del wordmark.svg entregado por Claude Design; cuando llegue la
 * ilustración de Codex —niño saltando de la luna, rollo Principito—
 * este SVG se sustituye por ella.)
 */
export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg viewBox="0 0 88 88" width={size} height={size} aria-hidden="true">
        <defs>
          <radialGradient id="lunaLogo" cx="38%" cy="34%" r="75%">
            <stop offset="0" stopColor="#FFEDBF" />
            <stop offset=".72" stopColor="#FFD766" />
            <stop offset="1" stopColor="#F2B72E" />
          </radialGradient>
        </defs>
        <g transform="translate(44,44)">
          <ellipse
            rx="36" ry="15" transform="rotate(-24)" fill="none"
            stroke="#9B8CFF" strokeWidth="3" strokeDasharray="0.5 8.5" strokeLinecap="round"
          />
          <circle r="19" fill="url(#lunaLogo)" />
          <circle cx="-6" cy="-4" r="4" fill="#F0B429" opacity=".6" />
          <circle cx="29" cy="-16" r="6" fill="#FF6B4A" />
        </g>
      </svg>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size > 40 ? 28 : 22 }}>
          brincaluna
        </span>
        <svg viewBox="0 0 150 10" width={size > 40 ? 130 : 100} height="9" aria-hidden="true">
          <path
            d="M4 7 q38 5 70 2 q34 -3 72 -6" fill="none"
            stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" opacity=".9"
          />
        </svg>
      </span>
    </span>
  );
}
