import type { Metadata } from "next";
import Link from "next/link";
import { TIPOS, tipoPorSlug, productosDeTipo } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AvalBadge from "@/components/AvalBadge";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import MedicalNote from "@/components/MedicalNote";
import AffiliateNote from "@/components/AffiliateNote";
import { SITE_URL } from "@/lib/site";

/**
 * Página de tipo de juguete (/tipo/munecos-peluches, /tipo/puzzles-encajes...).
 * Eje C: por la forma del juguete. Rutas cerradas a los 14 slugs (dynamicParams=false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return TIPOS.map((t) => ({ tipo: t.slug }));
}

export function generateMetadata({ params }: { params: { tipo: string } }): Metadata {
  const t = tipoPorSlug(params.tipo);
  if (!t) return {};
  return {
    title: t.title,
    description: `${t.intro} Selección verificada para niños con síndrome de Down.`,
    alternates: { canonical: `/tipo/${t.slug}/` },
  };
}

export default function TipoPage({ params }: { params: { tipo: string } }) {
  // "!" seguro: dynamicParams=false solo genera los 14 slugs de generateStaticParams.
  const t = tipoPorSlug(params.tipo)!;
  const productos = productosDeTipo(t.slug);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Por tipo", url: `${SITE_URL}/tipos/` },
          { name: t.etiqueta, url: `${SITE_URL}/tipo/${t.slug}/` },
        ])}
      />
      {/* ItemList SOLO si hay productos: un numberOfItems:0 no aporta a Google */}
      {productos.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: t.title,
            url: `${SITE_URL}/tipo/${t.slug}/`,
            numberOfItems: productos.length,
            itemListElement: productos.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.titulo,
              url: `${SITE_URL}/juguete/${p.slug}/`,
            })),
          }}
        />
      ) : null}

      <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {/* emoji del tipo sobre círculo neutro (sin viñeta ilustrada) */}
          <div
            aria-hidden="true"
            style={{
              width: 96, height: 96, borderRadius: "50%", background: "#F6F1E8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 44, flexShrink: 0, boxShadow: "var(--shadow-card)",
            }}
          >
            {t.emoji}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>{t.etiqueta}</h1>
            <p style={{ margin: 0, fontSize: 19, maxWidth: 640 }}>{t.intro}</p>
          </div>
        </div>
        <AvalBadge />
      </section>

      <section className="container" style={{ marginTop: 32 }}>
        {productos.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: 26, margin: 0 }}>Los juguetes elegidos</h2>
            <AffiliateNote />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
              {productos.map((p) => <ProductCard key={p.asin} p={p} />)}
            </div>
            <MedicalNote />
          </div>
        ) : (
          <div className="card" style={{ padding: 40, textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 56 }} aria-hidden="true">🌙</span>
            <h2 style={{ margin: 0, fontSize: 24 }}>Estamos eligiendo estos juguetes con lupa</h2>
            <p style={{ margin: 0, maxWidth: 480, color: "var(--color-text-soft)" }}>
              Muy pronto. Mientras, mira <Link href="/tipos/">todos los tipos de juguete</Link>.
            </p>
          </div>
        )}
      </section>

      {/* interlinking: chips a los otros tipos (SEO + navegación) */}
      <section className="container" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 22, margin: 0 }}>Otros tipos de juguete</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {TIPOS.filter((o) => o.slug !== t.slug).map((o) => (
            <Link
              key={o.slug}
              href={`/tipo/${o.slug}/`}
              className="chip-habilidad"
              style={{ ["--chip-color" as string]: "var(--color-accent-lilac)", ["--chip-soft" as string]: "var(--wash-lilac)" }}
            >
              <span aria-hidden="true">{o.emoji}</span> {o.etiqueta}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
