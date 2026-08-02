/**
 * Lector de guías (content/guias/*.md).
 * Cada guía trae frontmatter: title, description, slug (/guias/<slug>), keyword.
 * El cuerpo se convierte a HTML con marked en build (todo estático).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Faq = { pregunta: string; respuesta: string };

export type Guia = {
  slug: string;        // sin prefijo /guias/
  title: string;       // titular largo (H1 y og:title)
  seoTitle: string;    // <title> corto ≤60 chars (fallback al largo)
  description: string;
  keyword: string;
  actualizado: string; // fecha ISO del frontmatter (""=sin declarar)
  faqs: Faq[];         // derivadas del propio markdown, ver extraerFaqs()
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
  // Guías nuevas (huecos del corpus, 2026-08-02). Solo llevan entrada aquí las
  // que tienen el titular largo por encima de 60 caracteres; el resto usa su
  // propio title, que ya cabe.
  "juguetes-a-partir-de-5-anos-y-adolescentes": "Juguetes para niños de 5+ años con síndrome de Down",
  "munecos-con-sindrome-de-down": "Muñecos con síndrome de Down: cuál elegir",
  "se-lo-lleva-todo-a-la-boca-y-tira-los-juguetes": "Se lo lleva todo a la boca y tira los juguetes",
};

// Caché de módulo: el build llama a todasLasGuias() desde varias páginas;
// leemos el filesystem una sola vez (M2 del dossier cazabugs).
let cache: Guia[] | null = null;

/** Quita el H1 del cuerpo (la plantilla ya pinta su propio <h1> desde el title). */
function sinH1(md: string): string {
  return md.replace(/^\s*# .+\n/, "");
}

/** Pasa el markdown en línea (negritas, enlaces, código) a texto plano. */
function aTextoPlano(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")  // [texto](url) -> texto
    .replace(/\*\*([^*]+)\*\*/g, "$1")        // **negrita**  -> negrita
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Saca los pares pregunta/respuesta del PROPIO markdown: cada H2 que termine en
 * "?" y el primer párrafo que le sigue.
 *
 * Por qué así y no con un .jsonld.json aparte (que es como se hizo en la web
 * hermana): un FAQPage que no coincide con lo que el usuario ve es motivo de
 * penalización de Google, y mantener a mano dos copias del mismo texto acaba
 * SIEMPRE en desincronización — allí ya pasó. Derivándolo del markdown, el
 * schema no puede mentir: si cambia el texto visible, cambia el schema.
 *
 * Se descartan las respuestas de menos de 40 caracteres: una respuesta que no
 * se sostiene sola no sirve para que un buscador o un LLM la cite.
 */
export function extraerFaqs(md: string): Faq[] {
  const faqs: Faq[] = [];
  const lineas = md.split("\n");

  for (let i = 0; i < lineas.length; i++) {
    const h2 = lineas[i].match(/^##\s+(.*\?)\s*$/);
    if (!h2) continue;

    const parrafo: string[] = [];
    for (let j = i + 1; j < lineas.length; j++) {
      const l = lineas[j].trim();
      if (!l) {
        if (parrafo.length) break;   // fin del primer párrafo
        continue;                    // aún no ha empezado
      }
      if (l.startsWith("#")) break;  // otro encabezado antes del texto
      if (/^([-*>|]|\d+\.)/.test(l)) {
        if (parrafo.length) break;   // lista o cita tras el párrafo
        continue;                    // arranca en lista: no sirve de respuesta
      }
      parrafo.push(l);
    }

    const respuesta = aTextoPlano(parrafo.join(" "));
    if (respuesta.length >= 40) {
      faqs.push({ pregunta: aTextoPlano(h2[1]), respuesta });
    }
  }
  return faqs;
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
        actualizado: String(data.actualizado || data.date || ""),
        // Las FAQ se leen del markdown ORIGINAL (con su H1), no del recortado:
        // así el orden de las secciones no depende de cómo se limpie el cuerpo.
        faqs: extraerFaqs(content),
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
