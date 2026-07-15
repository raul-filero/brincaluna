import Link from "next/link";
import { ETAPAS } from "@/lib/data";

/** Las 4 etapas de desarrollo (doble entrada, eje B). Por hitos, no por edad. */
export default function EtapasList({ actual }: { actual?: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {ETAPAS.map((e) => (
        <Link
          key={e.slug}
          href={`/por-etapa/${e.slug}/`}
          className="pill-etapa"
          aria-current={actual === e.slug ? "true" : undefined}
        >
          <span aria-hidden="true">{e.emoji}</span> {e.etiqueta}
          <span style={{ fontWeight: 400, color: "var(--color-text-soft)", fontSize: 15 }}>· {e.rango}</span>
        </Link>
      ))}
    </div>
  );
}
