/**
 * Brincaluna — export estático puro para Cloudflare Pages (Patrón B: dominio propio).
 * build: `npm run build` → carpeta `out/`. NUNCA Vercel.
 */
const nextConfig = {
  output: "export",        // genera HTML estático en out/
  trailingSlash: true,     // /categoria/ con barra final (mejor para Pages)
  images: { unoptimized: true }, // sin optimizador de imágenes (no hay servidor)
  // Un solo worker al recolectar datos de página: cada worker es un proceso de
  // Node con su propio heap, y en este equipo la RAM se agota.
  //
  // La causa NO son los workers en sí (eso creí al principio): el build muere
  // con `Zone Allocation failed` / exit 3221226505 cuando ComfyUI está abierto
  // ocupando ~7 GB de los 16 GB de la máquina. Con un solo worker el build
  // aguanta bastante más, pero si la RAM libre baja de ~1 GB no hay ajuste que
  // valga — hay que cerrar lo que sobre. Ver notas de lanzamiento.
  experimental: { cpus: 1, workerThreads: false },
};

export default nextConfig;
