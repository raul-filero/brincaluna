import type { Metadata } from "next";

/**
 * Aviso legal: afiliación Amazon (obligatorio Associates), contenido IA
 * (AI Act art. 50, aplicable desde 2-ago-2026) y privacidad (sin cookies).
 */
export const metadata: Metadata = {
  title: "Aviso legal y transparencia",
  description: "Cómo funciona la afiliación de Amazon en Brincaluna, el uso de IA en las ilustraciones y nuestra política de privacidad.",
  alternates: { canonical: "/aviso-legal/" },
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <section className="container" style={{ paddingTop: 40 }}>
      <div className="prosa" style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>Aviso legal y transparencia</h1>

        <h2>Quién está detrás</h2>
        <p>
          Titular del sitio: <strong>Raúl Javier Jiménez Solaz</strong> · NIF 06012386W ·
          Contacto: <a href="mailto:hola@brincaluna.com">hola@brincaluna.com</a>.
        </p>

        <h2>Enlaces de afiliado</h2>
        <p>
          Brincaluna participa en el Programa de Afiliados de Amazon EU (Amazon Associates).
          En calidad de Afiliado de Amazon, Brincaluna obtiene ingresos por las compras
          adscritas que cumplen los requisitos aplicables. Para ti el precio es exactamente el mismo.
        </p>
        <p>
          Los precios y la disponibilidad se muestran siempre en Amazon en el momento de la
          compra: por eso no publicamos precios en esta web.
        </p>

        <h2>Contenido creado con IA</h2>
        <p>
          Las ilustraciones decorativas de esta web están creadas con ayuda de inteligencia
          artificial y revisadas por personas. Representan personajes ficticios. Las fotos de
          producto son las reales de cada ficha. Los textos citan sus fuentes (Down España,
          Down21, NDSS, DSE, AAP, entre otras).
        </p>

        <h2>Esto no es consejo médico</h2>
        <p>
          Brincaluna es una guía de juego, no un servicio sanitario. Ante cualquier duda sobre
          el desarrollo de tu hijo, habla con su equipo de atención temprana, su pediatra o su
          terapeuta.
        </p>

        <h2>Privacidad</h2>
        <p>
          No usamos cookies de rastreo ni formularios con datos personales. La analítica es
          Cloudflare Web Analytics, sin cookies y sin perfilado. Si nos escribes por correo,
          usamos tu dirección solo para responderte.
        </p>
      </div>
    </section>
  );
}
