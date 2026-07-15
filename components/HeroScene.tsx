/**
 * Escena acuarela del hero (capa emocional — SOLO decorativa, aria-hidden).
 * Blobs orgánicos + grano de papel + luna + órbita con juguetes, del mockup
 * de Claude Design. El medallón central queda reservado para la ilustración
 * encargada a Codex (niño saltando desde la luna, rollo El Principito).
 */
export default function HeroScene() {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", maxWidth: 560, aspectRatio: "600/470", flexShrink: 0 }}>
      {/* blobs acuarela */}
      <div style={{ position: "absolute", inset: "4% 0 6% 4%", borderRadius: "53% 47% 44% 56% / 49% 55% 45% 51%", background: "radial-gradient(circle at 38% 32%, var(--wash-sky) 0%, #D8F1EC 55%, rgba(216,241,236,0) 82%)" }} />
      <div style={{ position: "absolute", top: 0, right: "2%", width: "42%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,227,161,.9) 0%, rgba(255,227,161,0) 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: "6%", width: "83%", height: "30%", borderRadius: "50% 50% 46% 54% / 90% 100% 10% 0%", background: "radial-gradient(ellipse at 50% 100%, var(--wash-mint) 0%, rgba(205,239,223,0) 78%)" }} />
      <div className="grain" style={{ borderRadius: "53% 47% 44% 56% / 49% 55% 45% 51%" }} />
      {/* luna */}
      <div style={{ position: "absolute", top: "6%", right: "9%", width: "25%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle at 36% 32%, #FFEDBF 0%, #FFD766 62%, #F2B72E 100%)" }} />
      {/* órbita con juguetes */}
      <svg viewBox="0 0 600 470" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <ellipse cx="330" cy="225" rx="238" ry="118" transform="rotate(-18 330 225)" fill="none" stroke="#9B8CFF" strokeWidth="3.5" strokeDasharray="1 12" strokeLinecap="round" opacity=".85" />
        {/* pelota sonriente */}
        <g transform="translate(88,128)">
          <circle cx="18" cy="18" r="17" fill="#FF8A6E" />
          <path d="M3 14 q15 9 30 0" stroke="#FFF9F0" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M3 22 q15 9 30 0" stroke="#FFC93C" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity=".9" />
        </g>
        {/* apilable */}
        <g transform="translate(408,58) rotate(-6)">
          <rect x="4" y="26" width="40" height="11" rx="5.5" fill="#FF8A6E" />
          <rect x="9" y="15" width="30" height="11" rx="5.5" fill="#FFC93C" />
          <rect x="15" y="4" width="18" height="11" rx="5.5" fill="#9B8CFF" />
        </g>
        {/* cubo */}
        <g transform="translate(506,296) rotate(8)">
          <rect width="34" height="34" rx="8" fill="#7FD8BE" />
          <rect width="34" height="12" rx="6" fill="#A9E6D4" />
        </g>
        {/* estrellitas */}
        <path d="M262 88 l2.2 5.6 5.8 2.2 -5.8 2.2 -2.2 5.6 -2.2 -5.6 -5.8 -2.2 5.8 -2.2 z" fill="#FFC93C" opacity=".9" />
        <path d="M520 170 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#FF8A6E" opacity=".8" />
        <path d="M64 250 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8 z" fill="#9B8CFF" opacity=".8" />
      </svg>
      {/* medallón reservado para la ilustración final (Codex) */}
      <div style={{ position: "absolute", left: "22%", bottom: "5%", width: "42%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #FFF6E8, #FBEBD4)", boxShadow: "var(--shadow-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
        🌙
      </div>
    </div>
  );
}
