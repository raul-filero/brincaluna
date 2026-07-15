/**
 * Brincaluna — export estático puro para Cloudflare Pages (Patrón B: dominio propio).
 * build: `npm run build` → carpeta `out/`. NUNCA Vercel.
 */
const nextConfig = {
  output: "export",        // genera HTML estático en out/
  trailingSlash: true,     // /categoria/ con barra final (mejor para Pages)
  images: { unoptimized: true }, // sin optimizador de imágenes (no hay servidor)
};

export default nextConfig;
