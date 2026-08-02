/**
 * Brincaluna — export estático puro para Cloudflare Pages (Patrón B: dominio propio).
 * build: `npm run build` → carpeta `out/`. NUNCA Vercel.
 */
const nextConfig = {
  output: "export",        // genera HTML estático en out/
  trailingSlash: true,     // /categoria/ con barra final (mejor para Pages)
  images: { unoptimized: true }, // sin optimizador de imágenes (no hay servidor)
  // Un solo worker al recolectar datos de página. Con varios, en este equipo el
  // build muere de forma intermitente en "Collecting page data" con
  // `Zone Allocation failed` / exit 3221226505, y siempre cuando hay otros
  // procesos pesados a la vez. Tarda algo más, pero un build que falla 1 de
  // cada 3 veces no sirve para publicar.
  experimental: { cpus: 1, workerThreads: false },
};

export default nextConfig;
