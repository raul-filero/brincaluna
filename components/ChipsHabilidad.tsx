import Link from "next/link";
import { CATEGORIAS } from "@/lib/data";

/** Los 6 chips de habilidad (doble entrada, eje A). Icono + texto siempre. */
export default function ChipsHabilidad() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {CATEGORIAS.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}/`}
          className="chip-habilidad"
          style={{ ["--chip-color" as string]: c.color, ["--chip-soft" as string]: c.colorSoft }}
        >
          <span aria-hidden="true">{c.emoji}</span> {c.etiqueta}
        </Link>
      ))}
    </div>
  );
}
