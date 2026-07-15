/**
 * Badge de aval reutilizable (condición nº1 del council).
 * HONESTO: mientras no haya terapeuta propio, se citan las fuentes reales.
 */
export default function AvalBadge() {
  return (
    <span className="badge-aval">
      <span aria-hidden="true">✔</span> Basado en las guías de Down España y criterios de terapeutas
    </span>
  );
}
