import type { Producto } from "@/lib/data";
import { CATEGORIAS, ETAPAS } from "@/lib/data";
import AmazonButton from "./AmazonButton";

/**
 * Tarjeta de producto (capa producto = foto real; mientras las fotos
 * reales de Amazon no estén descargadas, mostramos un hueco neutro con
 * el emoji de su categoría — nunca una imagen falsa).
 */
export default function ProductCard({ p }: { p: Producto }) {
  const cat = CATEGORIAS.find((c) => c.slug === p.categoria);
  const etapa = ETAPAS.find((e) => e.slug === p.etapas[0]);
  return (
    <article className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="producto-media" aria-hidden="true">{cat?.emoji ?? "🧸"}</div>
      {etapa ? (
        <span className="producto-etapa">
          <span aria-hidden="true">{etapa.emoji}</span> {etapa.etiqueta}
        </span>
      ) : null}
      <h3 style={{ fontSize: 20, margin: 0 }}>{p.titulo}</h3>
      {p.habilidad_frase ? <p className="producto-trabaja">{cat?.emoji} Trabaja: {p.habilidad_frase}</p> : null}
      <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-soft)" }}>
        ⭐ {p.rating.toLocaleString("es-ES")} · {p.num_resenas.toLocaleString("es-ES")} reseñas
        {p.edad_recomendada ? ` · ${p.edad_recomendada}` : ""}
      </p>
      {p.nota_seguridad ? (
        <p style={{ margin: 0, fontSize: 15, color: "var(--color-primary-ink)" }}>⚠️ {p.nota_seguridad}</p>
      ) : null}
      <div style={{ marginTop: "auto" }}>
        <AmazonButton url={p.url} asin={p.asin} />
      </div>
    </article>
  );
}
