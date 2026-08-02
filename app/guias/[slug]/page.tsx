import type { Metadata } from "next";
import Link from "next/link";
import { todasLasGuias, guiaPorSlug } from "@/lib/guias";
import AvalBadge from "@/components/AvalBadge";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import MedicalNote from "@/components/MedicalNote";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Plantilla editorial de guía (easy-read, fuentes citadas en el propio MD). */
export const dynamicParams = false;

export function generateStaticParams() {
  return todasLasGuias().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guiaPorSlug(params.slug);
  if (!g) return {};
  return {
    title: g.seoTitle, // <title> corto ≤60; el H1 sigue usando el title largo
    description: g.description,
    alternates: { canonical: `/guias/${g.slug}/` },
  };
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-08-02" -> "2 de agosto de 2026". Devuelve "" si la fecha no es válida. */
function fechaLarga(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return "";
  const mes = MESES[Number(m[2]) - 1];
  if (!mes) return "";
  return `${Number(m[3])} de ${mes} de ${m[1]}`;
}

export default function GuiaPage({ params }: { params: { slug: string } }) {
  const g = guiaPorSlug(params.slug)!;
  const actualizado = fechaLarga(g.actualizado);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          inLanguage: "es",
          url: `${SITE_URL}/guias/${g.slug}/`,
          ...(g.actualizado ? { dateModified: g.actualizado } : {}),
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      {/* FAQPage derivado del propio texto de la guía (ver lib/guias.ts):
          cada pregunta del schema es LITERALMENTE un H2 visible y cada respuesta
          su primer párrafo, así que no puede desincronizarse del contenido. */}
      {g.faqs.length >= 2 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "es",
            url: `${SITE_URL}/guias/${g.slug}/`,
            mainEntity: g.faqs.map((f) => ({
              "@type": "Question",
              name: f.pregunta,
              acceptedAnswer: { "@type": "Answer", text: f.respuesta },
            })),
          }}
        />
      )}
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Guías", url: `${SITE_URL}/guias/` },
          { name: g.title, url: `${SITE_URL}/guias/${g.slug}/` },
        ])}
      />
      <article className="container" style={{ paddingTop: 40 }}>
        <div className="prosa" style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* miga de vuelta: orientación (COGA) — el lector siempre sabe dónde está */}
          <Link href="/guias/" style={{ fontWeight: 800, fontSize: 16, display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>← Todas las guías</Link>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>{g.title}</h1>
          <AvalBadge />
          {/* Fecha visible: al lector le dice que la guía está viva, y a los
              buscadores y modelos les da la señal de frescura que usan para
              decidir a quién citan. */}
          {actualizado && (
            <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-soft, #5b5470)" }}>
              Actualizado: {actualizado}
            </p>
          )}
          {/* HTML generado en build desde el markdown de la guía (marked) */}
          <div dangerouslySetInnerHTML={{ __html: g.html }} />

          {/* interlinking: las otras guías, para que el lector (y Google) sigan el hilo */}
          <aside style={{ marginTop: 24, borderTop: "1px solid var(--color-line)", paddingTop: 24 }}>
            <h2 style={{ fontSize: 22, marginTop: 0 }}>Sigue leyendo</h2>
            <ul style={{ margin: 0, paddingLeft: 24 }}>
              {todasLasGuias()
                .filter((otra) => otra.slug !== g.slug)
                .map((otra) => (
                  <li key={otra.slug}>
                    <Link href={`/guias/${otra.slug}/`}>{otra.title}</Link>
                  </li>
                ))}
            </ul>
          </aside>
          <MedicalNote />
        </div>
      </article>
    </>
  );
}
