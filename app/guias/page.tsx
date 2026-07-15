import type { Metadata } from "next";
import Link from "next/link";
import { todasLasGuias } from "@/lib/guias";

/** Índice de guías: el contenido que captura el hueco SEO edad-desarrollo × habilidad. */
export const metadata: Metadata = {
  title: "Guías para elegir juguetes · síndrome de Down",
  description:
    "Guías en fácil para elegir juguetes para niños con síndrome de Down: qué regalar, criterios de Down España y edad de desarrollo.",
  alternates: { canonical: "/guias/" },
};

export default function GuiasPage() {
  const guias = todasLasGuias();
  return (
    <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>Guías que se leen en cinco minutos</h1>
      <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>
        Sin jerga y con fuentes. Para dejar de dudar antes de comprar.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {guias.map((g) => (
          <Link key={g.slug} href={`/guias/${g.slug}/`} className="card" style={{ padding: 28, textDecoration: "none", color: "var(--color-text)", display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 36 }} aria-hidden="true">📖</span>
            <h2 style={{ margin: 0, fontSize: 22 }}>{g.title}</h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-soft)" }}>{g.description}</p>
            <span style={{ fontWeight: 800, color: "var(--color-secondary)", marginTop: "auto" }}>Leer →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
