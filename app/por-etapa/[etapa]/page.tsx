import type { Metadata } from "next";
import { ETAPAS, etapaPorSlug, productosDeEtapa } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import EtapasList from "@/components/EtapasList";
import AvalBadge from "@/components/AvalBadge";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import MedicalNote from "@/components/MedicalNote";
import AffiliateNote from "@/components/AffiliateNote";
import { SITE_URL } from "@/lib/site";

/** Landing de etapa (/por-etapa/primeros-meses ...). */
export const dynamicParams = false;

export function generateStaticParams() {
  return ETAPAS.map((e) => ({ etapa: e.slug }));
}

export function generateMetadata({ params }: { params: { etapa: string } }): Metadata {
  const et = etapaPorSlug(params.etapa);
  if (!et) return {};
  return {
    title: et.title,
    description: `${et.intro} Selección verificada para niños con síndrome de Down.`,
    alternates: { canonical: `/por-etapa/${et.slug}/` },
  };
}

export default function EtapaPage({ params }: { params: { etapa: string } }) {
  const et = etapaPorSlug(params.etapa)!;
  const productos = productosDeEtapa(et.slug);
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: `${SITE_URL}/` },
          { name: "Por etapa", url: `${SITE_URL}/por-etapa/` },
          { name: et.h1, url: `${SITE_URL}/por-etapa/${et.slug}/` },
        ])}
      />
      {productos.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: et.title,
            url: `${SITE_URL}/por-etapa/${et.slug}/`,
            numberOfItems: productos.length,
            itemListElement: productos.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.titulo,
              url: p.url,
            })),
          }}
        />
      ) : null}
      <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>
          <span aria-hidden="true">{et.emoji}</span> {et.h1}{" "}
          <span style={{ color: "var(--color-text-soft)", fontSize: "0.6em", fontWeight: 700 }}>({et.rango})</span>
        </h1>
        <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>{et.intro}</p>
        <AvalBadge />
        <EtapasList actual={et.slug} />
      </section>
      <section className="container" style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ fontSize: 26, margin: 0 }}>Juguetes para esta etapa</h2>
        <AffiliateNote />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
          {productos.map((p) => <ProductCard key={p.asin} p={p} />)}
        </div>
        <MedicalNote />
      </section>
    </>
  );
}
