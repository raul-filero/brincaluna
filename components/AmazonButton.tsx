import { withTag } from "@/lib/site";

/**
 * CTA de afiliado a Amazon.
 * - rel="sponsored nofollow noopener": obligatorio para enlaces de afiliado (Google).
 * - data-asin: deja el clic identificable para cualquier analítica futura.
 * - El CTR real del criterio de muerte (E8) lo da el panel de Amazon Associates.
 * - NO mostramos precio: los precios estáticos violan el ToS de Associates
 *   (lección Orbitoys) — el precio vivo se ve en Amazon.
 */
export default function AmazonButton({ url, asin, texto = "Comprar en Amazon", nota = false }: {
  url: string;
  asin: string;
  texto?: string;
  /**
   * Línea de confianza bajo el botón. Desde que la ficha muestra precio, ya no
   * explica una ausencia: avisa de que el importe final manda en Amazon y de
   * que al usuario no le cuesta más comprar por aquí. Solo en la ficha, que es
   * donde se decide la compra.
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
        El precio final y la disponibilidad los confirma Amazon. A ti te cuesta
        lo mismo comprar desde aquí.
      </p>
    </>
  );
}
