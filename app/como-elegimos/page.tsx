import type { Metadata } from "next";
import Link from "next/link";
import AvalBadge from "@/components/AvalBadge";

/** Página de confianza: quiénes somos y con qué criterios elegimos. */
export const metadata: Metadata = {
  title: "Cómo elegimos los juguetes",
  description:
    "Nuestros criterios, con fuentes: guías de Down España, criterios de terapeutas, fichas verificadas y seguridad primero.",
  alternates: { canonical: "/como-elegimos/" },
};

const CRITERIOS = [
  { emoji: "🌱", titulo: "Edad de desarrollo, no la de la caja", texto: "Elegimos por lo que tu hijo ya hace, no por su cumpleaños. Cada etapa tiene su juguete." },
  { emoji: "🎯", titulo: "Reto justo", texto: "Ni tan fácil que aburra ni tan difícil que frustre. Juguetes que invitan a repetir." },
  { emoji: "⚡", titulo: "Causa-efecto que él controla", texto: "El niño hace, el juguete responde. Evitamos juguetes pasivos que lo hacen todo solos." },
  { emoji: "🛡️", titulo: "Seguridad primero", texto: "Sin piezas pequeñas aunque pase de 3 años (la exploración oral dura más). Volumen regulable. Nada de trampolines ni tacatás." },
  { emoji: "🤝", titulo: "Cooperar antes que competir", texto: "Juegos de mesa con los demás, no contra los demás. Su sociabilidad es su fortaleza." },
  { emoji: "🔍", titulo: "Ficha verificada", texto: "Cada juguete se comprueba en su ficha real de Amazon: valoración ≥4, más de 50 reseñas y edad recomendada." },
];

export default function ComoElegimosPage() {
  return (
    <section className="container" style={{ paddingTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: 0 }}>Cómo elegimos</h1>
      <p style={{ margin: 0, fontSize: 19, maxWidth: 680 }}>
        Brincaluna es una guía que vende: primero el criterio, después el catálogo.
        Estos son nuestros seis filtros, sacados de las guías de Down España y del trabajo
        de terapeutas ocupacionales y logopedas. Los contamos con fuentes en{" "}
        <Link href="/guias/como-elegir-juguete-criterios-down-espana/">la guía completa</Link>.
      </p>
      <AvalBadge />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {CRITERIOS.map((c) => (
          <div key={c.titulo} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 36 }} aria-hidden="true">{c.emoji}</span>
            <h2 style={{ margin: 0, fontSize: 21 }}>{c.titulo}</h2>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-soft)" }}>{c.texto}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>Y una cosa más</h2>
        <p style={{ margin: 0, fontSize: 17, maxWidth: 720 }}>
          Estos juguetes están elegidos pensando en niños con síndrome de Down, pero sirven
          para CUALQUIER niño: son buenos juguetes, sin más. Aquí jugamos todos juntos.
        </p>
      </div>
    </section>
  );
}
