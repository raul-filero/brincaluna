import type { Metadata } from "next";
import Link from "next/link";
import { ETAPAS, productosDeEtapa } from "@/lib/data";
import JsonLd, { itemListLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

/** Hub "Por etapa": elige por su desarrollo, no por la edad de la caja. */
export const metadata: Metadata = {
  title: "Juguetes por etapa de desarrollo · síndrome de Down",
  description:
    "Elige el juguete por la etapa de desarrollo de tu hijo, no por la edad de la caja. Cuatro etapas explicadas en fácil.",
  alternates: { canonical: "/por-etapa/" },
};

export default function PorEtapaPage() {
  return (
    <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <JsonLd
        data={itemListLd(
          "Juguetes por etapa de desarrollo",
          `${SITE_URL}/por-etapa/`,
          ETAPAS.map((e) => ({ name: e.h1, url: `${SITE_URL}/por-etapa/${e.slug}/` }))
        )}
      />
      <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>Elige por su etapa, no por su edad</h1>
      <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>
        Los niños con síndrome de Down pasan por las mismas etapas. Solo van a su ritmo.
        La edad de la caja no manda: manda lo que tu hijo ya hace.{" "}
        <Link href="/guias/edad-desarrollo-vs-edad-cronologica/">Te lo contamos en esta guía</Link>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {ETAPAS.map((e) => (
          <Link key={e.slug} href={`/por-etapa/${e.slug}/`} className="card" style={{ padding: 28, textDecoration: "none", color: "var(--color-text)", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 40 }} aria-hidden="true">{e.emoji}</span>
            <h2 style={{ margin: 0, fontSize: 24 }}>{e.etiqueta}</h2>
            <span style={{ color: "var(--color-text-soft)", fontWeight: 800 }}>{e.rango}</span>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-soft)" }}>{e.intro}</p>
            <span style={{ fontWeight: 800, color: "var(--color-secondary)", marginTop: "auto" }}>
              Ver juguetes ({productosDeEtapa(e.slug).length}) →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
