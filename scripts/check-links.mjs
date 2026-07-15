/**
 * Link-checker post-build (gate anti-A1 del dossier cazabugs).
 * Recorre TODOS los html de out/ y verifica que cada enlace interno
 * apunta a una página realmente generada. Si hay roto → exit 1 (rompe el build).
 * Se ejecuta en `npm run build` también en Cloudflare Pages.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

function htmls(dir) {
  const res = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) res.push(...htmls(p));
    else if (f.endsWith(".html")) res.push(p);
  }
  return res;
}

/** ¿Existe la ruta interna en out/? Acepta /ruta/ → out/ruta/index.html y ficheros sueltos. */
function existeRuta(ruta) {
  const limpia = ruta.replace(/[#?].*$/, "");
  if (limpia === "/" || limpia === "") return true;
  const rel = limpia.replace(/^\//, "").replace(/\/$/, "");
  return (
    existsSync(path.join(OUT, rel, "index.html")) ||
    existsSync(path.join(OUT, rel)) ||
    existsSync(path.join(OUT, `${rel}.html`))
  );
}

const rotos = [];
for (const file of htmls(OUT)) {
  const html = readFileSync(file, "utf-8");
  // hrefs internos: empiezan por / (los externos http(s) no se tocan)
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next/")) continue; // assets del framework
    if (!existeRuta(href)) rotos.push(`${path.relative(OUT, file)} → ${href}`);
  }
}

if (rotos.length) {
  console.error(`❌ ${rotos.length} enlaces internos rotos:`);
  for (const r of [...new Set(rotos)]) console.error("   " + r);
  process.exit(1);
}
console.log("✅ check-links: todos los enlaces internos resuelven.");
