import { withTag } from "@/lib/site";

/**
 * CTA de afiliado a Amazon.
 * - rel="sponsored nofollow noopener": obligatorio para enlaces de afiliado (Google).
 * - data-asin: deja el clic identificable para cualquier analítica futura.
 * - El CTR real del criterio de muerte (E8) lo da el panel de Amazon Associates.
 * - NO mostramos precio: los precios estáticos violan el ToS de Associates
 *   (lección Orbitoys) — el precio vivo se ve en Amazon.
 */
export default function AmazonButton({ url, asin, texto = "Ver precio en Amazon" }: {
  url: string;
  asin: string;
  texto?: string;
}) {
  return (
    <a
      className="btn-primary"
      href={withTag(url)}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-asin={asin}
    >
      <span aria-hidden="true">🧸</span> {texto}
    </a>
  );
}
