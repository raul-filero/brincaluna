/**
 * Ficha de producto (PDP): contenido extendido OPCIONAL y helpers.
 * El contenido largo vive en data/pdp/<asin>.json (lo escribe otro flujo,
 * no el build). Si el fichero no existe, la ficha se renderiza igual sin
 * esas secciones. Se lee del filesystem en build (todo estático).
 */
import fs from "node:fs";
import path from "node:path";

export type PdpExtra = {
  descripcion: string[];              // párrafos "cómo es y cómo se juega"
  caracteristicas: string[];          // bullets
  faq: { q: string; a: string }[];    // preguntas frecuentes (sin desplegables)
};

const DIR = path.join(process.cwd(), "data", "pdp");

// Caché de módulo: generateStaticParams + generateMetadata + la página
// piden el mismo asin varias veces; leemos el disco una sola vez por asin.
const cache = new Map<string, PdpExtra | null>();

/** Devuelve el contenido extendido de un producto, o null si no hay json. */
export function contenidoExtra(asin: string): PdpExtra | null {
  if (cache.has(asin)) return cache.get(asin)!;
  const file = path.join(DIR, `${asin}.json`);
  let extra: PdpExtra | null = null;
  if (fs.existsSync(file)) {
    try {
      const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
      extra = {
        descripcion: Array.isArray(raw.descripcion) ? raw.descripcion.map(String) : [],
        caracteristicas: Array.isArray(raw.caracteristicas) ? raw.caracteristicas.map(String) : [],
        faq: Array.isArray(raw.faq)
          ? raw.faq
              .filter((x: unknown) => x && typeof x === "object")
              .map((x: { q?: unknown; a?: unknown }) => ({ q: String(x.q ?? ""), a: String(x.a ?? "") }))
              .filter((x: { q: string; a: string }) => x.q && x.a)
          : [],
      };
    } catch {
      // json malformado: nos comportamos como si no existiera (nunca rompe el build)
      extra = null;
    }
  }
  cache.set(asin, extra);
  return extra;
}

/**
 * Marca inferida del título para el schema Product (solo si hay confianza).
 * La mayoría de títulos son "Marca — Nombre del juguete"; si no hay guión,
 * no arriesgamos y devolvemos null.
 */
export function inferirMarca(titulo: string): string | null {
  const i = titulo.indexOf(" — ");
  if (i <= 0) return null;
  const marca = titulo.slice(0, i).trim();
  // descartamos "marcas" absurdamente largas (probable no es marca real)
  return marca.length > 0 && marca.length <= 40 ? marca : null;
}

/** Recorta un título a <=max chars por palabra entera, con elipsis. */
export function recortar(s: string, max = 60): string {
  if (s.length <= max) return s;
  const corte = s.slice(0, max - 1);
  const sp = corte.lastIndexOf(" ");
  return (sp > 20 ? corte.slice(0, sp) : corte).trimEnd() + "…";
}
