import type { Metadata } from "next";
import Link from "next/link";
import {
  PRODUCTOS, productoPorSlug, categoriaPorSlug, tipoPorSlug, etapaPorSlug,
} from "@/lib/data";
import AmazonButton from "@/components/AmazonButton";
import AvalBadge from "@/components/AvalBadge";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import MedicalNote from "@/components/MedicalNote";
import AffiliateNote from "@/components/AffiliateNote";
import { contenidoExtra, inferirMarca, recortar } from "@/lib/pdp";
import { SITE_URL } from "@/lib/site";
import imagenes from "@/data/images.json";

/** Ficha de producto (/juguete/<slug>/). Solo productos activos (no reserva). */
export const dynamicParams = false;

const HAY_FOTO = imagenes as Record<string, boolean>;

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

/** Migaja de categoría: las CATEGORIAS tienen su landing; "regalos" es el hub. */
function crumbCategoria(categoria: string): { etiqueta: string; href: string } | null {
  const cat = categoriaPorSlug(categoria);
  if (cat) return { etiqueta: cat.etiqueta, href: `/${cat.slug}/` };
  if (categoria === "regalos") return { etiqueta: "Regalos", href: "/regalos/" };
  return null;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = productoPorSlug(params.slug);
  if (!p) return {};
  return {
    // absolute: el título ya es descriptivo; evitamos el sufijo · Brincaluna
    // para no pasar de 60 chars (los títulos de Amazon son largos).
    title: { absolute: recortar(p.titulo, 60) },
    description: p.habilidad_frase ?? `${p.titulo}, elegido para niños con síndrome de Down.`,
    alternates: { canonical: `/juguete/${p.slug}/` },
  };
}

export default function JuguetePage({ params }: { params: { slug: string } }) {
  // "!" seguro: dynamicParams=false solo genera los slugs de PRODUCTOS.
  const p = productoPorSlug(params.slug)!;
  const cat = crumbCategoria(p.categoria);
  const tipo = p.tipo ? tipoPorSlug(p.tipo) : undefined;
  const etapas = p.etapas.map((s) => etapaPorSlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof etapaPorSlug>>[];
  const marca = inferirMarca(p.titulo);
  const foto = HAY_FOTO[p.asin];
  const extra = contenidoExtra(p.asin);

  // JSON-LD Product — PROHIBIDO offers/price (ToS Amazon Associates).
  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.titulo,
    description: p.habilidad_frase ?? p.titulo,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.num_resenas,
      bestRating: 5,
    },
  };
  if (foto) productLd.image = `${SITE_URL}/products/${p.asin}.jpg`;
  if (marca) productLd.brand = { "@type": "Brand", name: marca };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: `${SITE_URL}/` },
          ...(cat ? [{ name: cat.etiqueta, url: `${SITE_URL}${cat.href}` }] : []),
          { name: recortar(p.titulo, 60), url: `${SITE_URL}/juguete/${p.slug}/` },
        ])}
      />
      {extra && extra.faq.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: extra.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      ) : null}

      {/* breadcrumb visible */}
      <nav className="container" aria-label="Miga de pan" style={{ paddingTop: 24, fontSize: 15 }}>
        <Link href="/">Inicio</Link>
        {cat ? (<><span aria-hidden="true" style={{ margin: "0 8px", color: "var(--color-text-soft)" }}>›</span><Link href={cat.href}>{cat.etiqueta}</Link></>) : null}
        <span aria-hidden="true" style={{ margin: "0 8px", color: "var(--color-text-soft)" }}>›</span>
        <span style={{ color: "var(--color-text-soft)" }}>{recortar(p.titulo, 48)}</span>
      </nav>

      <section className="container" style={{ marginTop: 16, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* foto grande */}
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          {foto ? (
            <div className="card" style={{ padding: 20, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={`/products/${p.asin}.jpg`}
                alt={p.titulo}
                width={520}
                height={400}
                style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain" }}
              />
            </div>
          ) : (
            <div className="card" aria-hidden="true" style={{ padding: 20, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, background: "#F6F1E8" }}>
              {tipo?.emoji ?? "🧸"}
            </div>
          )}
        </div>

        {/* datos + CTA */}
        <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ fontSize: "clamp(26px, 3.4vw, 36px)", margin: 0 }}>{p.titulo}</h1>

          <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-soft)" }}>
            <span className="sr-only">Valoración: </span>
            <span aria-hidden="true">⭐</span> {p.rating.toLocaleString("es-ES")} de 5 · {p.num_resenas.toLocaleString("es-ES")} reseñas
          </p>

          {/* chips: categoría, tipo, etapas, edad */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {cat ? <Link href={cat.href} className="chip-pdp"><span aria-hidden="true">🎯</span> {cat.etiqueta}</Link> : null}
            {tipo ? <Link href={`/tipo/${tipo.slug}/`} className="chip-pdp"><span aria-hidden="true">{tipo.emoji}</span> {tipo.etiqueta}</Link> : null}
            {etapas.map((e) => (
              <Link key={e.slug} href={`/por-etapa/${e.slug}/`} className="chip-pdp"><span aria-hidden="true">{e.emoji}</span> {e.etiqueta}</Link>
            ))}
            {p.edad_recomendada ? <span className="chip-pdp chip-pdp--plano"><span aria-hidden="true">🎂</span> {p.edad_recomendada}</span> : null}
          </div>

          {/* qué habilidad trabaja (bloque destacado) */}
          {p.habilidad_frase ? (
            <div style={{ background: "var(--color-success-soft)", borderRadius: 14, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.5, color: "var(--color-success-ink)" }}>QUÉ HABILIDAD TRABAJA</span>
              <p style={{ margin: 0, fontSize: 18, color: "var(--color-success-ink)", fontWeight: 700 }}>{p.habilidad_frase}</p>
            </div>
          ) : null}

          {p.nota_seguridad ? (
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-primary-ink)" }}>
              <span aria-hidden="true">⚠️</span> <strong>Ojo:</strong> {p.nota_seguridad}
            </p>
          ) : null}

          <AmazonButton url={p.url} asin={p.asin} texto="Ver precio en Amazon" />
          <AffiliateNote />
          <AvalBadge />
        </div>
      </section>

      {/* CONTENIDO EXTENDIDO OPCIONAL (data/pdp/<asin>.json) */}
      {extra && extra.descripcion.length > 0 ? (
        <section className="container prosa" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 26, margin: "0 0 12px" }}>Cómo es y cómo se juega</h2>
          {extra.descripcion.map((par, i) => <p key={i} style={{ fontSize: 18 }}>{par}</p>)}
        </section>
      ) : null}

      {extra && extra.caracteristicas.length > 0 ? (
        <section className="container" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 26, margin: "0 0 12px" }}>Características</h2>
          <ul style={{ maxWidth: 760, paddingLeft: 24, display: "flex", flexDirection: "column", gap: 6 }}>
            {extra.caracteristicas.map((c, i) => <li key={i} style={{ fontSize: 18 }}>{c}</li>)}
          </ul>
        </section>
      ) : null}

      {extra && extra.faq.length > 0 ? (
        <section className="container" style={{ marginTop: 24, maxWidth: 760 }}>
          <h2 style={{ fontSize: 26, margin: "0 0 12px" }}>Preguntas frecuentes</h2>
          {/* Sin <details>/dropdown: regla COGA, todo visible sin desplegar */}
          {extra.faq.map((f, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, margin: "0 0 4px" }}>{f.q}</h3>
              <p style={{ margin: 0, fontSize: 18 }}>{f.a}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="container" style={{ marginTop: 40 }}>
        <MedicalNote />
      </section>
    </>
  );
}
