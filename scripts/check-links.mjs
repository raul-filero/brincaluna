/**
 * Link-checker post-build (gate anti-A1 del dossier cazabugs).
 * Recorre TODOS los html de out/ y verifica que cada href/src interno
 * apunta a un fichero realmente generado. Si hay roto → exit 1 (rompe el build).
 * Se ejecuta en `npm run build` también en Cloudflare Pages.
 *
 * - Valida href Y src (imágenes incluidas).
 * - Comprueba contra el listado REAL de ficheros de out/ (recursivo,
 *   case-sensitive: Cloudflare Pages sirve rutas sensibles a mayúsculas).
 * - AVISA (no rompe) cuando un href interno de página no acaba en "/".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

/** Rutas .html de out/ (para escanear su contenido). */
function htmls(dir) {
  const res = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) res.push(...htmls(p));
    else if (f.endsWith(".html")) res.push(p);
  }
  return res;
}

/** Todos los ficheros de out/ como rutas relativas con "/" (para comparación case-sensitive). */
function listarFicheros(dir) {
  const res = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) res.push(...listarFicheros(p));
    else res.push(path.relative(OUT, p).split(path.sep).join("/"));
  }
  return res;
}

const FICHEROS = new Set(listarFicheros(OUT));

/** ¿Existe la ruta interna en out/? Acepta /ruta/ → ruta/index.html y ficheros sueltos. */
function existeRuta(ruta) {
  const limpia = ruta.replace(/[#?].*$/, "");
  if (limpia === "/" || limpia === "") return FICHEROS.has("index.html");
  const rel = limpia.replace(/^\//, "").replace(/\/$/, "");
  return (
    FICHEROS.has(`${rel}/index.html`) ||
    FICHEROS.has(rel) ||
    FICHEROS.has(`${rel}.html`)
  );
}

/** ¿El href interno apunta a una página (no a un asset con extensión)? */
function esPagina(href) {
  const limpia = href.replace(/[#?].*$/, "");
  const ultimo = limpia.replace(/\/$/, "").split("/").pop() || "";
  return !ultimo.includes("."); // sin extensión = página
}

const rotos = [];
const sinBarra = [];
for (const file of htmls(OUT)) {
  const html = readFileSync(file, "utf-8");
  // href y src internos: empiezan por / (los externos http(s) no se tocan)
  for (const m of html.matchAll(/(href|src)="(\/[^"]*)"/g)) {
    const attr = m[1];
    const ref = m[2];
    if (ref.startsWith("/_next/")) continue; // assets del framework
    if (!existeRuta(ref)) {
      rotos.push(`${path.relative(OUT, file)} → ${ref}`);
      continue;
    }
    // aviso: un href de página sin barra final provoca redirección extra en Pages
    const soloRuta = ref.replace(/[#?].*$/, "");
    if (attr === "href" && soloRuta !== "/" && esPagina(ref) && !soloRuta.endsWith("/")) {
      sinBarra.push(`${path.relative(OUT, file)} → ${ref}`);
    }
  }
}

if (sinBarra.length) {
  console.warn(`⚠️ ${sinBarra.length} href internos de página sin "/" final:`);
  for (const r of [...new Set(sinBarra)]) console.warn("   " + r);
}

if (rotos.length) {
  console.error(`❌ ${rotos.length} enlaces internos rotos:`);
  for (const r of [...new Set(rotos)]) console.error("   " + r);
  process.exit(1);
}
console.log("✅ check-links: todos los enlaces internos resuelven.");
