import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, CF_BEACON_TOKEN } from "@/lib/site";

/**
 * Layout raíz: fuentes (Baloo 2 display + Nunito Sans cuerpo),
 * header/footer comunes y el beacon de Cloudflare Web Analytics (E8)
 * solo si la env NEXT_PUBLIC_CF_BEACON está configurada.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Juguetes para niños con síndrome de Down elegidos por la habilidad que trabajan: manitas, lenguaje, calma, movimiento. Con el porqué y sin jerga.",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "es_ES" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito+Sans:ital,wght@0,400;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        {CF_BEACON_TOKEN ? (
          // Cloudflare Web Analytics (sin cookies). E8: las visitas orgánicas
          // del criterio de muerte a 90 días se miden aquí; los clics a Amazon
          // los reporta el panel de Amazon Associates por tracking ID.
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_BEACON_TOKEN}"}`}
          />
        ) : null}
      </body>
    </html>
  );
}
