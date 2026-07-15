import type { Metadata } from "next";
import Link from "next/link";
import { productosRegalos, munecosConRasgos } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AvalBadge from "@/components/AvalBadge";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

/**
 * Hub Regalos: para el comprador tercero (abuelos, tíos) que quiere acertar.
 * Incluye la colección identitaria "Muñecos que se parecen a él".
 */
export const metadata: Metadata = {
  title: "Regalos para niños con síndrome de Down",
  description:
    "Un regalo que acierta: ideas por etapa de desarrollo para niños con síndrome de Down, y muñecos con sus rasgos. Para abuelos, tíos y amigos.",
  alternates: { canonical: "/regalos/" },
};

export default function RegalosPage() {
  const regalos = productosRegalos();
  const munecos = munecosConRasgos();
  const resto = regalos.filter((p) => p.subcategoria !== "munecos-con-rasgos");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Regalos para niños con síndrome de Down",
          url: `${SITE_URL}/regalos/`,
          numberOfItems: regalos.length,
          itemListElement: regalos.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.titulo, url: p.url })),
        }}
      />
      <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>Un regalo que acierta</h1>
        <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>
          ¿Cumple o Navidad y no sabes qué llevar? Sin miedo: aquí todo está elegido con criterio.
          Si quieres afinar más, lee la <Link href="/guias/que-regalar-nino-sindrome-down/">guía por etapas</Link>.
        </p>
        <AvalBadge />
      </section>

      {munecos.length > 0 ? (
        <section className="container" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontSize: 28, margin: 0 }}>Muñecos que se le parecen</h2>
          <p style={{ margin: 0, fontSize: 17, maxWidth: 680, color: "var(--color-text-soft)" }}>
            Verse representado en su juguete importa. Estos muñecos tienen rasgos de síndrome de Down, con dignidad y ternura.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
            {munecos.map((p) => <ProductCard key={p.asin} p={p} />)}
          </div>
        </section>
      ) : null}

      <section className="container" style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>Más regalos con criterio</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
          {resto.map((p) => <ProductCard key={p.asin} p={p} />)}
        </div>
      </section>
    </>
  );
}
