import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** robots.txt generado (misma fuente de URL que sitemap.ts). Export estático. */
export const dynamic = "force-static";

/**
 * Bots de IA que Cloudflare BLOQUEA por su cuenta en cuanto se activa la zona.
 *
 * Cloudflare ANEXA (no sustituye) un bloque `# BEGIN Cloudflare Managed content`
 * con `Disallow: /` para estos agentes. Para una web cuya estrategia es que
 * ChatGPT, Claude o Perplexity la CITEN, ese bloque es letal: apaga justo el
 * canal que queremos abrir.
 *
 * No hace falta tocar el dashboard. Los grupos del mismo user-agent se FUSIONAN
 * y, ante reglas en conflicto de igual longitud de ruta, gana la MENOS
 * restrictiva — así que un `Allow: /` nominal nuestro se impone al `Disallow: /`
 * de Cloudflare, bot a bot. (Patrón ya validado en Orbitoys.)
 *
 * La lista es copia literal de los agentes del bloque gestionado observado en
 * producción el 2026-08-02, no una lista inventada de bots de IA.
 */
const BOTS_IA_BLOQUEADOS_POR_CLOUDFLARE = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...BOTS_IA_BLOQUEADOS_POR_CLOUDFLARE.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
