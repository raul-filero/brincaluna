/**
 * Bloque JSON-LD genérico.
 * REGLA (lección Orbitoys): NUNCA schema Product con offers/price —
 * los precios viven en Amazon. Aquí solo ItemList / Article / Organization / FAQ.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
