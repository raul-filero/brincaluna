import Link from "next/link";

/** 404 con la luna: estado de error amable, con salidas claras (COGA: ayudar a recuperarse del error). */
export default function NotFound() {
  return (
    <section className="container" style={{ paddingTop: 64, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center" }}>
      <span style={{ fontSize: 80 }} aria-hidden="true">🌙</span>
      <h1 style={{ fontSize: 36, margin: 0 }}>Esta página se fue a la luna</h1>
      <p style={{ margin: 0, fontSize: 19, maxWidth: 480 }}>
        No pasa nada. Vuelve al inicio o busca por lo que quieres trabajar.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary"><span aria-hidden="true">🏡</span> Volver al inicio</Link>
        <Link href="/motricidad-fina/" className="btn-secondary"><span aria-hidden="true">🎯</span> Ver juguetes</Link>
      </div>
    </section>
  );
}
