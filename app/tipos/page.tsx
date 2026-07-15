import type { Metadata } from "next";
import Link from "next/link";
import { TIPOS, productosDeTipo } from "@/lib/data";
import JsonLd, { itemListLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

/** Hub "Por tipo de juguete": entrada por la forma del juguete (eje C). */
export const metadata: Metadata = {
  title: "Juguetes por tipo · síndrome de Down",
  description:
    "Busca por el tipo de juguete: muñecos, puzzles, cocinitas, musicales, pelotas... Todos elegidos para niños con síndrome de Down.",
  alternates: { canonical: "/tipos/" },
};

export default function TiposPage() {
  return (
    <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <JsonLd
        data={itemListLd(
          "Juguetes por tipo",
          `${SITE_URL}/tipos/`,
          TIPOS.map((t) => ({ name: t.etiqueta, url: `${SITE_URL}/tipo/${t.slug}/` }))
        )}
      />
      <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>Busca por tipo de juguete</h1>
      <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>
        ¿Ya sabes qué buscas? Un peluche, un puzzle, una cocinita... Elige el tipo y verás los que hemos elegido con criterio.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        {TIPOS.map((t) => {
          const n = productosDeTipo(t.slug).length;
          return (
            <Link
              key={t.slug}
              href={`/tipo/${t.slug}/`}
              className="card"
              style={{ padding: 24, textDecoration: "none", color: "var(--color-text)", display: "flex", flexDirection: "column", gap: 8 }}
            >
              <span style={{ fontSize: 40 }} aria-hidden="true">{t.emoji}</span>
              <h2 style={{ margin: 0, fontSize: 22 }}>{t.etiqueta}</h2>
              <span style={{ fontWeight: 800, color: "var(--color-secondary)", marginTop: "auto" }}>
                {n} {n === 1 ? "juguete" : "juguetes"} →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
