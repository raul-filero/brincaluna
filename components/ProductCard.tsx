import type { Producto } from "@/lib/data";
import { CATEGORIAS, ETAPAS } from "@/lib/data";
import AmazonButton from "./AmazonButton";
import imagenes from "@/data/images.json";

/**
 * Tarjeta de producto (capa producto = FOTO REAL de la ficha de Amazon,
 * descargada por scripts/fetch_images.py a public/products/<asin>.jpg).
 * Si un producto aún no tiene foto en el manifiesto data/images.json,
 * mostramos un hueco neutro con el emoji de su categoría — nunca una
 * imagen falsa ni un placeholder engañoso.
 */
const HAY_FOTO = imagenes as Record<string, boolean>;

export default function ProductCard({ p }: { p: Producto }) {
  const cat = CATEGORIAS.find((c) => c.slug === p.categoria);
  const etapa = ETAPAS.find((e) => e.slug === p.etapas[0]);
  return (
    <article className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      {HAY_FOTO[p.asin] ? (
        <div className="producto-media" style={{ background: "#FFFFFF" }}>
          {/* loading lazy: las cards de abajo no frenan el primer render */}
          <img
            src={`/products/${p.asin}.jpg`}
            alt={p.titulo}
            loading="lazy"
            width={250}
            height={170}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      ) : (
        <div className="producto-media" aria-hidden="true">{cat?.emoji ?? "🧸"}</div>
      )}
      {etapa ? (
        <span className="producto-etapa">
          <span aria-hidden="true">{etapa.emoji}</span> {etapa.etiqueta}
        </span>
      ) : null}
      <h3 style={{ fontSize: 20, margin: 0 }}>{p.titulo}</h3>
      {p.habilidad_frase ? <p className="producto-trabaja"><span aria-hidden="true">{cat?.emoji}</span> Trabaja: {p.habilidad_frase}</p> : null}
      <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-soft)" }}>
        <span className="sr-only">Valoración: </span>
        <span aria-hidden="true">⭐</span> {p.rating.toLocaleString("es-ES")} de 5 · {p.num_resenas.toLocaleString("es-ES")} reseñas
        {p.edad_recomendada ? ` · ${p.edad_recomendada}` : ""}
      </p>
      {p.nota_seguridad ? (
        <p style={{ margin: 0, fontSize: 15, color: "var(--color-primary-ink)" }}><span aria-hidden="true">⚠️</span> {p.nota_seguridad}</p>
      ) : null}
      <div style={{ marginTop: "auto" }}>
        <AmazonButton url={p.url} asin={p.asin} />
      </div>
    </article>
  );
}
