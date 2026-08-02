# -*- coding: utf-8 -*-
"""
GATE DE PRIVACIDAD — que no se publique el testimonio de nadie (2026-08-02)

Por qué existe: para saber CÓMO habla una familia, la investigación de palabras
clave leyó hilos del foro de Down España y de los consultorios de Down21, donde
padres y madres cuentan el estado de salud y desarrollo de sus hijos. Eso es
información pública, sí, pero también es **dato de salud de un menor con
discapacidad**: categoría especial del RGPD (art. 9) y población vulnerable.

Usar ese material para APRENDER cómo se expresa la gente es legítimo y es lo que
hace cualquiera que investigue un nicho. Republicarlo en una web comercial que
gana dinero con afiliación, no: ni es necesario, ni esas personas lo consintieron,
ni resistiría una queja.

Este gate marca la frontera de forma mecánica: el corpus de investigación puede
contener las citas; lo PUBLICABLE, jamás. Si un fragmento largo de una cita del
corpus aparece en una guía, en una ficha o en el HTML final, el build se cae.

Uso:
    python scripts/gate_privacidad.py
Salida: 0 = verde · 2 = rojo (testimonio a punto de publicarse) · 1 = error
"""

import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS_GLOB = os.path.join(BASE_DIR, "docs", "geo", "PREGUNTAS_CORPUS_*.md")

# Dónde vive lo que SÍ se publica. El corpus y el minado crudo quedan fuera a
# propósito: son material de investigación, no salen al aire.
PUBLICABLE = [
    os.path.join(BASE_DIR, "content"),
    os.path.join(BASE_DIR, "data", "pdp"),
    os.path.join(BASE_DIR, "app"),
    os.path.join(BASE_DIR, "components"),
    os.path.join(BASE_DIR, "out"),
]
EXT = (".md", ".mdx", ".tsx", ".ts", ".json", ".html")

# Una cita se considera "testimonio" a partir de esta longitud: por debajo son
# frases de búsqueda genéricas ("como detectar hipotonia en bebes") que no
# identifican a nadie y que SÍ queremos usar como titulares.
MIN_TESTIMONIO = 120
# Longitud del fragmento que se busca en lo publicable. Suficientemente largo
# para que una coincidencia no sea casualidad del idioma.
VENTANA = 60

# Enlaces a hilos concretos: apuntan al mensaje de una persona identificable.
# El enlace a la sección del foro o a la home de la entidad es correcto.
RE_HILO = re.compile(
    r"https?://(?:www\.)?sindromedown\.org/foros/[a-z0-9-]+/[a-z0-9-]{10,}"
    r"|https?://(?:www\.)?down21\.org/consultanos[^\s)\"']*\?\S+",
    re.IGNORECASE,
)


def normalizar(t: str) -> str:
    return re.sub(r"\s+", " ", t).strip().lower()


def citas_del_corpus():
    """Fragmentos largos de la columna 'Pregunta' de los corpus = testimonios."""
    citas = []
    for ruta in glob.glob(CORPUS_GLOB):
        with open(ruta, encoding="utf-8") as f:
            for linea in f:
                if not linea.startswith("|"):
                    continue
                celdas = [c.strip() for c in linea.split("|")]
                if len(celdas) < 5:
                    continue
                texto = celdas[2]
                if len(texto) >= MIN_TESTIMONIO:
                    citas.append(texto)
    return citas


def ficheros_publicables():
    for raiz in PUBLICABLE:
        if not os.path.isdir(raiz):
            continue
        for dirpath, dirnames, filenames in os.walk(raiz):
            dirnames[:] = [d for d in dirnames if d not in {"node_modules", ".next", "_fichas_cache"}]
            for fn in filenames:
                if fn.endswith(EXT):
                    yield os.path.join(dirpath, fn)


def main():
    citas = citas_del_corpus()
    if not citas:
        print("[!! NO VERIFICADO] No encuentro corpus con testimonios que cruzar. "
              "Si el corpus existe y esto sale, el gate NO está comprobando nada.",
              file=sys.stderr)
        return 0

    # Huellas: un trozo del centro de cada cita, que es lo más específico.
    huellas = []
    for c in citas:
        n = normalizar(c)
        ini = max(0, (len(n) - VENTANA) // 2)
        huellas.append((n[ini:ini + VENTANA], c))

    print(f"== GATE DE PRIVACIDAD == {len(citas)} testimonios vigilados")

    rojo = []
    revisados = 0
    for ruta in ficheros_publicables():
        try:
            with open(ruta, encoding="utf-8", errors="replace") as f:
                contenido = normalizar(f.read())
        except OSError:
            continue
        revisados += 1
        rel = os.path.relpath(ruta, BASE_DIR)
        for huella, original in huellas:
            if huella and huella in contenido:
                rojo.append(f"TESTIMONIO PUBLICADO en {rel}: «{original[:90]}…»")
        for url in RE_HILO.findall(contenido):
            rojo.append(f"ENLACE A HILO PERSONAL en {rel}: {url}")

    if not revisados:
        print("[!! NO VERIFICADO] 0 ficheros publicables revisados.", file=sys.stderr)
        return 0

    if rojo:
        print(f"\nGATE ROJO — {len(set(rojo))} usos de testimonio ajeno en material publicable:",
              file=sys.stderr)
        for r in sorted(set(rojo)):
            print(f"   x {r}", file=sys.stderr)
        print("\nCómo se arregla: quédate con la DUDA, no con la PERSONA. En vez de "
              "copiar el mensaje, escribe la pregunta en general "
              "(«¿es normal que tarde en gatear?») y responde tú.", file=sys.stderr)
        return 2

    print(f"[OK] {revisados} ficheros publicables revisados, 0 testimonios ajenos")
    print("\nGATE VERDE: la investigación se ha quedado en la investigación.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
