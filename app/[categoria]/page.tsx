import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIAS, categoriaPorSlug, productosDeCategoria } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import EtapasList from "@/components/EtapasList";
import AvalBadge from "@/components/AvalBadge";
import JsonLd from "@/components/JsonLd";
import MedicalNote from "@/components/MedicalNote";
import AffiliateNote from "@/components/AffiliateNote";
import { SITE_URL } from "@/lib/site";

/**
 * Página de categoría de habilidad (/motricidad-fina, /sensoriales...).
 * Rutas cerradas a los 6 slugs de la arquitectura (dynamicParams=false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ categoria: c.slug }));
}

export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
  const cat = categoriaPorSlug(params.categoria);
  if (!cat) return {};
  return {
    title: cat.title,
    description: `${cat.intro} Selección verificada para niños con síndrome de Down.`,
    alternates: { canonical: `/${cat.slug}/` },
  };
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  // El "!" es seguro: dynamicParams=false garantiza que solo se generan
  // los 6 slugs de generateStaticParams — nunca llega un slug desconocido.
  const cat = categoriaPorSlug(params.categoria)!;
  const productos = productosDeCategoria(cat.slug);
  return (
    <>
      {/* ItemList SOLO si hay productos: un numberOfItems:0 no aporta a Google */}
      {productos.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: cat.title,
            url: `${SITE_URL}/${cat.slug}/`,
            numberOfItems: productos.length,
            itemListElement: productos.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.titulo,
              url: p.url, // el destino real es la ficha de Amazon (sin precio: vive allí)
            })),
          }}
        />
      ) : null}

      <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {/* viñeta acuarela de la categoría (capa emocional, al lado del H1) */}
          <div aria-hidden="true" style={{ width: 120, height: 120, borderRadius: "50%", background: cat.colorSoft, overflow: "hidden", flexShrink: 0, boxShadow: "var(--shadow-card)" }}>
            <img src={`/illos/vineta-${cat.slug}.jpg`} alt="" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>{cat.h1}</h1>
            <p style={{ margin: 0, fontSize: 19, maxWidth: 640 }}>{cat.intro}</p>
          </div>
        </div>
        <AvalBadge />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "var(--color-text-soft)" }}>Filtra por su etapa:</span>
          <EtapasList />
        </div>
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
          /* Estado vacío digno: estas categorías se llenan en la 2ª pasada del curador */
          <div className="card" style={{ padding: 40, textAlign: "center", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 56 }} aria-hidden="true">🌙</span>
            <h2 style={{ margin: 0, fontSize: 24 }}>Estamos eligiendo estos juguetes con lupa</h2>
            <p style={{ margin: 0, maxWidth: 480, color: "var(--color-text-soft)" }}>
              Muy pronto. Mientras, mira los de <Link href="/motricidad-fina/">las manitas</Link> o{" "}
              <Link href="/regalos/">los regalos</Link>.
            </p>
          </div>
        )}
      </section>

      {/* interlinking: chips a las otras habilidades (SEO + navegación) */}
      <section className="container" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 22, margin: 0 }}>Otras habilidades</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {CATEGORIAS.filter((c) => c.slug !== cat.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/`}
              className="chip-habilidad"
              style={{ ["--chip-color" as string]: c.color, ["--chip-soft" as string]: c.colorSoft }}
            >
              <span aria-hidden="true">{c.emoji}</span> {c.etiqueta}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
