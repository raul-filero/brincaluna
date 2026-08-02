import precios from "@/data/precios.json";

/**
 * Precio del producto, con la fecha en la que se leyó.
 *
 * La fecha va SIEMPRE visible y pegada al precio. No es un detalle de estilo:
 * un número sin fecha el usuario lo lee como el precio de hoy, y en Amazon
 * cambia solo. Con la fecha delante sabe qué está mirando y por qué el botón
 * dice "ver precio actual".
 *
 * Si un ASIN no tiene precio leído (sin stock, o Amazon no lo dio), no se
 * inventa nada: sencillamente no se pinta.
 */
const DATOS = precios as Record<string, { precio: string; moneda: string; fecha: string }>;

function fechaCorta(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
}

export default function Precio({ asin, tamano = "grande" }: {
  asin: string;
  tamano?: "grande" | "pequeno";
}) {
  const dato = DATOS[asin];
  if (!dato?.precio) return null;

  const grande = tamano === "grande";

  return (
    <p style={{ margin: grande ? "4px 0 0" : "6px 0 0", lineHeight: 1.3 }}>
      <span
        style={{
          fontSize: grande ? 30 : 19,
          fontWeight: 700,
          color: "var(--color-primary-ink)",
        }}
      >
        {dato.precio} €
      </span>
      <br />
      <span style={{ fontSize: grande ? 14 : 13, opacity: 0.7 }}>
        precio consultado el {fechaCorta(dato.fecha)} · puede haber cambiado
      </span>
    </p>
  );
}
