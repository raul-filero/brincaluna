/**
 * Transparencia de afiliación (obligatoria para Amazon Associates).
 * Va encima del grid de productos, bajo el intro de cada landing.
 */
export default function AffiliateNote() {
  return (
    <p style={{ margin: 0, fontSize: 15, color: "var(--color-text-soft)" }}>
      Enlaces de afiliado: si compras desde ellos, Amazon nos paga una comisión. Tú pagas lo mismo.
    </p>
  );
}
