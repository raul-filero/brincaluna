/**
 * Configuración global del sitio Brincaluna.
 * El tag de Amazon Associates vive en la env NEXT_PUBLIC_AMAZON_TAG
 * (se pone en Cloudflare Pages → Settings → Environment variables).
 * Sin tag puesta, el enlace va limpio a Amazon: NUNCA un placeholder.
 * (Mismo patrón validado en Orbitoys/lib/site.ts.)
 */
export const SITE_NAME = "Brincaluna";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brincaluna.com";
export const SITE_TAGLINE = "Juguetes elegidos para cómo aprende tu hijo";

// --- Amazon Associates ---
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "";

/** Añade el tag de afiliado a una URL de Amazon si está configurado. */
export function withTag(url: string): string {
  if (!AMAZON_TAG) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}tag=${AMAZON_TAG}`;
}

// --- Web hermana (partner cruzado, mismo creador) ---
export const PARTNER_ORBITOYS = {
  nombre: "Orbitoys",
  url: "https://orbitoys.es",
  descripcion: "Juguetes y herramientas para peques con TDAH, del mismo equipo.",
};

// --- Analítica (E8): token del beacon de Cloudflare Web Analytics ---
// Si la env no está puesta, no se pinta nada (cero placeholders).
export const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON || "";
