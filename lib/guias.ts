/**
 * Lector de guías (content/guias/*.md).
 * Cada guía trae frontmatter: title, description, slug (/guias/<slug>), keyword.
 * El cuerpo se convierte a HTML con marked en build (todo estático).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Guia = {
  slug: string;        // sin prefijo /guias/
  title: string;       // titular largo (H1 y og:title)
  seoTitle: string;    // <title> corto ≤60 chars (fallback al largo)
  description: string;
  keyword: string;
  html: string;        // cuerpo ya renderizado
};

const DIR = path.join(process.cwd(), "content", "guias");

/**
 * Títulos SEO cortos (≤60 chars) por slug, para el <title> de cada guía.
 * Se definen aquí y NO en el frontmatter de los .md (esos los lleva otro flujo).
 * Si un slug no está en el mapa, se usa el title largo del markdown.
 */
const SEO_TITLES: Record<string, string> = {
  "que-regalar-nino-sindrome-down": "Qué regalar a un niño con síndrome de Down",
  "como-elegir-juguete-criterios-down-espana": "Cómo elegir juguete: criterios de Down España",
  "edad-desarrollo-vs-edad-cronologica": "Edad de desarrollo vs edad cronológica en juguetes",
  "juguetes-hipotonia-bebe": "Juguetes para bebé con hipotonía",
  "estimular-habla-jugando-soplo-musica": "Estimular el habla jugando: soplo y música",
  "leer-para-hablar-metodo-visual": "Enseñar a leer para enseñar a hablar",
  "juguetes-sensoriales-seguros": "Juguetes sensoriales seguros: cómo elegir",
};

// Caché de módulo: el build llama a todasLasGuias() desde varias páginas;
// leemos el filesystem una sola vez (M2 del dossier cazabugs).
let cache: Guia[] | null = null;

/** Quita el H1 del cuerpo (la plantilla ya pinta su propio <h1> desde el title). */
function sinH1(md: string): string {
  return md.replace(/^\s*# .+\n/, "");
}

export function todasLasGuias(): Guia[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf-8"));
      const slug = String(data.slug || "").replace(/^\/?guias\//, "").replace(/\/$/, "");
      const title = String(data.title || slug);
      return {
        slug,
        title,
        seoTitle: SEO_TITLES[slug] || title,
        description: String(data.description || ""),
        keyword: String(data.keyword || ""),
        // marked.parse devuelve string | Promise<string>; sin extensiones async
        // (nuestro caso) es siempre síncrono, por eso el cast es seguro.
        html: marked.parse(sinH1(content)) as string,
      };
    })
    .filter((g) => g.slug.length > 0);
  return cache;
}

export function guiaPorSlug(slug: string): Guia | undefined {
  return todasLasGuias().find((g) => g.slug === slug);
}
