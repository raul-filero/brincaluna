/**
 * Logo Brincaluna: mascota acuarela (niño saltando desde la luna, Codex
 * 2026-07-15) + wordmark en Baloo 2 con su swash coral debajo.
 */
export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img
        src="/illos/logo-nino-luna.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ borderRadius: "50%", display: "block" }}
      />
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
