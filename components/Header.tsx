import Link from "next/link";
import Logo from "./Logo";

/**
 * Cabecera con el menú principal: MÁXIMO 5 ítems, icono SIEMPRE con texto,
 * targets ≥56px (evidencia Sensors 2018 + COGA — no negociable).
 * Las 6 habilidades NO van aquí: viven como chips en la home.
 */
const NAV = [
  { href: "/motricidad-fina/", emoji: "🎯", texto: "Por habilidad" },
  { href: "/por-etapa/", emoji: "🌱", texto: "Por etapa" },
  { href: "/regalos/", emoji: "🎁", texto: "Regalos" },
  { href: "/guias/", emoji: "📖", texto: "Guías" },
  { href: "/como-elegimos/", emoji: "🤝", texto: "Cómo elegimos" },
];

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--color-line)" }}>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "16px 24px" }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "var(--color-text)" }} aria-label="Brincaluna, inicio">
          <Logo />
        </Link>
        <nav aria-label="Menú principal" style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="pill">
              <span aria-hidden="true">{item.emoji}</span> {item.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
