import type { MetadataRoute } from "next";
import { CATEGORIAS, ETAPAS, TIPOS, PRODUCTOS } from "@/lib/data";
import { todasLasGuias } from "@/lib/guias";
import { SITE_URL } from "@/lib/site";

/** Sitemap estático: home + categorías + etapas + tipos + fichas + hubs + guías. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "/",
    "/por-etapa/",
    "/tipos/",
    "/regalos/",
    "/guias/",
    "/como-elegimos/",
    ...CATEGORIAS.map((c) => `/${c.slug}/`),
    ...ETAPAS.map((e) => `/por-etapa/${e.slug}/`),
    ...TIPOS.map((t) => `/tipo/${t.slug}/`),
    ...PRODUCTOS.map((p) => `/juguete/${p.slug}/`),
    ...todasLasGuias().map((g) => `/guias/${g.slug}/`),
  ];
  return rutas.map((r) => ({ url: `${SITE_URL}${r}`, changeFrequency: "weekly" as const }));
}
