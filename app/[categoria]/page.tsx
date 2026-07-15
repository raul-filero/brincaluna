import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIAS, categoriaPorSlug, productosDeCategoria } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import EtapasList from "@/components/EtapasList";
import AvalBadge from "@/components/AvalBadge";
import JsonLd from "@/components/JsonLd";
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

      <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {/* viñeta de la categoría: hueco para la acuarela encargada; mientras, su emoji sobre el color suave */}
          <div aria-hidden="true" style={{ width: 96, height: 96, borderRadius: "50%", background: cat.colorSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, flexShrink: 0 }}>
            {cat.emoji}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
            {productos.map((p) => <ProductCard key={p.asin} p={p} />)}
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
    </>
  );
}
