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
  title: string;
  description: string;
  keyword: string;
  html: string;        // cuerpo ya renderizado
};

const DIR = path.join(process.cwd(), "content", "guias");

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
      return {
        slug,
        title: String(data.title || slug),
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
