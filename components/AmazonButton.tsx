import { withTag } from "@/lib/site";

/**
 * CTA de afiliado a Amazon.
 * - rel="sponsored nofollow noopener": obligatorio para enlaces de afiliado (Google).
 * - data-asin: deja el clic identificable para cualquier analítica futura.
 * - El CTR real del criterio de muerte (E8) lo da el panel de Amazon Associates.
 * - NO mostramos precio: los precios estáticos violan el ToS de Associates
 *   (lección Orbitoys) — el precio vivo se ve en Amazon.
 */
export default function AmazonButton({ url, asin, texto = "Ver precio en Amazon", nota = false }: {
  url: string;
  asin: string;
  texto?: string;
  /**
   * Explica bajo el botón POR QUÉ no hay un precio escrito en la página.
   * No es relleno: sin explicación, quien quiere saber el precio se va a
   * buscarlo a Amazon por su cuenta —sin pasar por este enlace— y esa visita
   * deja de acreditar la comisión. Decirlo convierte la ausencia en un motivo
   * para pulsar. Solo en la ficha, que es donde se decide la compra.
   */
  nota?: boolean;
}) {
  const enlace = (
    <a
      className="btn-primary"
      href={withTag(url)}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      data-asin={asin}
    >
      <span aria-hidden="true">🧸</span> {texto}
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  );

  if (!nota) return enlace;

  return (
    <>
      {enlace}
      <p style={{ fontSize: 15, opacity: 0.75, margin: "10px 0 0", maxWidth: "46ch" }}>
        El precio y la disponibilidad los pone Amazon y cambian a menudo, así que
        los verás allí siempre actualizados.
      </p>
    </>
  );
}
