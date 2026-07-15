import Link from "next/link";
import type { Metadata } from "next";
import HeroScene from "@/components/HeroScene";
import ChipsHabilidad from "@/components/ChipsHabilidad";
import EtapasList from "@/components/EtapasList";
import TrustBand from "@/components/TrustBand";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { destacadosHome, TIPOS, productosDeTipo } from "@/lib/data";
import { SITE_NAME, SITE_URL, PARTNER_ORBITOYS } from "@/lib/site";

/** Home: hero de álbum ilustrado + doble entrada (habilidad / etapa) + confianza. */
export const metadata: Metadata = {
  // absolute: evita el sufijo del template para no pasar de 60 chars en la home
  title: { absolute: "Juguetes para niños con síndrome de Down · Brincaluna" },
  description:
    "Tienda-guía de juguetes para niños con síndrome de Down: por habilidad (manitas, lenguaje, calma, movimiento) y por etapa de desarrollo. Con el porqué, sin jerga.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const destacados = destacadosHome(4);
  // 8 tipos con más juguetes: entrada rápida por forma del juguete (eje C).
  const tiposPopulares = [...TIPOS]
    .sort((a, b) => productosDeTipo(b.slug).length - productosDeTipo(a.slug).length)
    .slice(0, 8);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          description: "Guía de juguetes para niños con síndrome de Down, elegidos por la habilidad que trabajan.",
          knowsAbout: ["síndrome de Down", "juguetes educativos", "estimulación temprana", "motricidad fina", "logopedia"],
          sameAs: [PARTNER_ORBITOYS.url],
        }}
      />

      {/* HERO */}
      <section className="container" style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", paddingTop: 48 }}>
        <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 54px)", margin: 0, maxWidth: 620 }}>
            Juguetes elegidos para cómo aprende tu hijo
          </h1>
          <p style={{ margin: 0, fontSize: 22, maxWidth: 540 }}>
            Cada juguete trabaja una habilidad real. Te explicamos cuál y por qué, sin jerga.
          </p>
          <p style={{ margin: 0, fontSize: 17, color: "var(--color-text-soft)", maxWidth: 540 }}>
            Como un cuento: él salta, tú entiendes el porqué.
          </p>
        </div>
        <HeroScene />
      </section>

      {/* DOBLE ENTRADA */}
      <section className="container" style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 24 }}>
        <div className="card" style={{ flex: "1.4 1 420px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontSize: 26, margin: 0 }}>Busca por habilidad</h2>
          <p style={{ margin: 0, fontSize: 17, color: "var(--color-text-soft)" }}>
            ¿Qué quieres trabajar? Elige y te contamos el porqué.
          </p>
          <ChipsHabilidad />
        </div>
        <div className="card" style={{ flex: "1 1 320px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontSize: 26, margin: 0 }}>Busca por su etapa</h2>
          <p style={{ margin: 0, fontSize: 17, color: "var(--color-text-soft)" }}>
            Por desarrollo, no por edad. Cada peque lleva su ritmo.
          </p>
          <EtapasList />
        </div>
      </section>

      {/* DESCUBRIMIENTO POR TIPO */}
      <section className="container" style={{ marginTop: 24 }}>
        <div className="card" style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 24, margin: 0 }}>¿Buscas un tipo de juguete?</h2>
            <Link href="/tipos/" style={{ fontWeight: 800, fontSize: 16, display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Todos los tipos →</Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tiposPopulares.map((t) => (
              <Link
                key={t.slug}
                href={`/tipo/${t.slug}/`}
                className="chip-habilidad"
                style={{ ["--chip-color" as string]: "var(--color-accent-lilac)", ["--chip-soft" as string]: "var(--wash-lilac)" }}
              >
                <span aria-hidden="true">{t.emoji}</span> {t.etiqueta}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* banda acuarela decorativa */}
      <div className="wash-band container" aria-hidden="true">
        <div className="wash-blob" style={{ top: 14, left: "8%", width: "34%", height: 56, background: "radial-gradient(ellipse, rgba(196,234,228,.8), rgba(196,234,228,0) 75%)" }} />
        <div className="wash-blob" style={{ top: 26, left: "40%", width: "28%", height: 48, background: "radial-gradient(ellipse, rgba(255,227,161,.7), rgba(255,227,161,0) 75%)" }} />
        <div className="wash-blob" style={{ top: 18, right: "9%", width: "26%", height: 52, background: "radial-gradient(ellipse, rgba(228,221,255,.7), rgba(228,221,255,0) 75%)" }} />
        <div className="grain" />
      </div>

      {/* CONFIANZA */}
      <section className="container" style={{ marginTop: 8 }}>
        <TrustBand />
      </section>

      {/* DESTACADOS */}
      <section className="container" style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 32, margin: 0 }}>Los más útiles</h2>
          <Link href="/motricidad-fina/" style={{ fontWeight: 800, fontSize: 17, display: "inline-flex", alignItems: "center", minHeight: "var(--tap)" }}>Ver más juguetes →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
          {destacados.map((p) => <ProductCard key={p.asin} p={p} />)}
        </div>
      </section>

      {/* GUÍA DESTACADA */}
      <section className="container" style={{ marginTop: 48 }}>
        <div style={{ position: "relative", background: "var(--wash-lilac)", borderRadius: "var(--radius-card)", padding: "36px 40px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", right: 120, top: -30, width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,227,161,.9), rgba(255,227,161,0) 70%)" }} />
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: 1, color: "var(--color-accent-lilac-ink)", position: "relative" }}>
            📖 GUÍA DESTACADA
          </span>
          <h2 style={{ fontSize: 30, margin: 0, position: "relative" }}>Qué regalar a un niño con síndrome de Down</h2>
          <p style={{ margin: 0, maxWidth: 520, position: "relative" }}>
            Por etapas, sin jerga y sin tópicos. Como un cuento que se lee en cinco minutos.
          </p>
          <Link href="/guias/que-regalar-nino-sindrome-down/" className="btn-secondary" style={{ alignSelf: "flex-start", marginTop: 6 }}>
            <span aria-hidden="true">📖</span> Leer la guía
          </Link>
        </div>
      </section>
    </>
  );
}
