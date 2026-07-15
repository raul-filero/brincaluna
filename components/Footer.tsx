import Link from "next/link";
import { PARTNER_ORBITOYS } from "@/lib/site";

/**
 * Footer: quiénes somos, cómo elegimos, TRANSPARENCIA de afiliación
 * (obligatoria para Amazon Associates) y el bloque de web hermana
 * (partner cruzado Brincaluna ⇄ Orbitoys: mismo creador, enlace honesto).
 */
export default function Footer() {
  return (
    <footer style={{ background: "var(--color-text)", color: "var(--color-bg)", marginTop: 64 }}>
      <div className="container" style={{ padding: "48px 24px", display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>brincaluna</span>
          <p style={{ margin: 0, fontSize: 16, opacity: 0.85 }}>
            Elegimos cada juguete por la habilidad que trabaja. Sin jerga y sin tópicos.
          </p>
          <p style={{ margin: 0, fontSize: 15, opacity: 0.7 }}>
            Las ilustraciones de esta web están creadas con ayuda de IA y revisadas por personas.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontSize: 15, letterSpacing: 1 }}>CÓMO ELEGIMOS</strong>
          <span style={{ fontSize: 16, opacity: 0.85 }}>✔ Basado en las guías de Down España</span>
          <span style={{ fontSize: 16, opacity: 0.85 }}>✔ Criterios de terapeutas, citados</span>
          <span style={{ fontSize: 16, opacity: 0.85 }}>✔ Solo fichas verificadas en Amazon</span>
          <Link href="/como-elegimos/" style={{ color: "#A7CBF2", fontSize: 16, display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Nuestros criterios →</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontSize: 15, letterSpacing: 1 }}>TRANSPARENCIA</strong>
          <p style={{ margin: 0, fontSize: 16, opacity: 0.85 }}>
            Si compras desde nuestros enlaces, Amazon nos paga una comisión. Tú pagas lo mismo.
          </p>
          <Link href="/aviso-legal/" style={{ color: "#A7CBF2", fontSize: 16, display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Aviso legal y privacidad</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontSize: 15, letterSpacing: 1 }}>WEB HERMANA</strong>
          <a href={PARTNER_ORBITOYS.url} style={{ color: "#A7CBF2", fontSize: 17, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8, minHeight: "var(--tap)" }}>
            <span aria-hidden="true">🪐</span> {PARTNER_ORBITOYS.nombre}
          </a>
          <p style={{ margin: 0, fontSize: 16, opacity: 0.85 }}>{PARTNER_ORBITOYS.descripcion}</p>
        </div>
      </div>
      <div className="container" style={{ borderTop: "1px solid rgba(255,249,240,.2)", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 20, fontSize: 16 }}>
        <Link href="/motricidad-fina/" style={{ color: "#A7CBF2", display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Por habilidad</Link>
        <Link href="/por-etapa/" style={{ color: "#A7CBF2", display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Por etapa</Link>
        <Link href="/regalos/" style={{ color: "#A7CBF2", display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Regalos</Link>
        <Link href="/guias/" style={{ color: "#A7CBF2", display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Guías</Link>
      </div>
    </footer>
  );
}
