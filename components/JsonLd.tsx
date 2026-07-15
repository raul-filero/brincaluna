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

type Nodo = { name: string; url: string };

/** BreadcrumbList (Inicio → hub → página actual). URLs absolutas con SITE_URL. */
export function breadcrumbLd(items: Nodo[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** ItemList genérico para hubs (etapas, guías). URLs absolutas con SITE_URL. */
export function itemListLd(name: string, url: string, items: Nodo[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}
