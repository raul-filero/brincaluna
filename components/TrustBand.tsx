/**
 * Banda de confianza: los 3 reductores de ansiedad de compra.
 * Honestidad radical con el modelo de afiliación (la compra acaba en Amazon).
 */
const ITEMS = [
  { emoji: "✅", titulo: "Criterio con aval", texto: "Seguimos las guías de Down España y criterios de terapeutas, citados." },
  { emoji: "🔍", titulo: "Fichas verificadas", texto: "Cada juguete tiene ficha real comprobada: valoración, reseñas y edad." },
  { emoji: "🔒", titulo: "Compra segura", texto: "La compra se completa en Amazon, con sus envíos y devoluciones." },
];

export default function TrustBand() {
  return (
    <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {ITEMS.map((it, i) => (
        <div key={it.titulo} style={{ padding: "22px 26px", display: "flex", gap: 14, alignItems: "flex-start", borderRight: i < ITEMS.length - 1 ? "1px solid var(--color-line)" : "none" }}>
          <span style={{ fontSize: 28 }} aria-hidden="true">{it.emoji}</span>
          <div>
            <strong>{it.titulo}</strong>
            <br />
            <span style={{ fontSize: 16, color: "var(--color-text-soft)" }}>{it.texto}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
