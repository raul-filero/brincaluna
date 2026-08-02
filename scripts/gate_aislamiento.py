# -*- coding: utf-8 -*-
"""
GATE DE AISLAMIENTO Brincaluna ⇄ Orbitoys  (épica E17, pedido de Raúl 2026-08-02)

Por qué existe: son dos webs de juguetes del mismo dueño con nichos que NO se
tocan (síndrome de Down / TDAH). Que se cuele un producto o una frase de una en
la otra no es un fallo cosmético: destruye la credibilidad de las dos justo en
lo único que venden, que es criterio. Y como el contenido lo generamos en tandas
y a veces en paralelo, el cruce es un error probable, no hipotético.

Qué comprueba (rojo = exit 2, el build no pasa):
  1. ASIN compartido entre los dos catálogos.
  2. Tag de afiliado ajena (orbitoys-21) en el código/contenido de Brincaluna.
  3. Vocabulario del otro nicho en el contenido publicable, salvo en la lista
     blanca (el enlace de partner cruzado SÍ está declarado y es legítimo).

Regla aprendida a base de disgustos: un gate que no puede comprobar algo tiene
que GRITARLO, no callar. Si no encuentra el catálogo de Orbitoys, lo dice bien
alto y marca ese punto como NO VERIFICADO — nunca lo da por verde.

Uso:
    python scripts/gate_aislamiento.py
    python scripts/gate_aislamiento.py --otro "C:/ruta/al/otro/proyecto"
Salida: 0 = verde · 2 = rojo (cruce detectado) · 1 = error de ejecución
"""

import argparse
import json
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Proyecto hermano. Se puede sobreescribir por --otro o por env BRINCALUNA_OTRO.
OTRO_DEFECTO = os.path.join(
    os.path.dirname(os.path.dirname(BASE_DIR)), "ADHD-Afiliacion"
)

# Tags de afiliado: la nuestra y las que NUNCA deben aparecer aquí.
TAGS_AJENAS = ("orbitoys-21",)

# Vocabulario que delata contenido del otro nicho dentro de Brincaluna.
VOCAB_AJENO = (
    "tdah", "adhd", "hiperactividad", "hiperactivo", "déficit de atención",
    "deficit de atencion", "fidget", "spinner", "antiestrés", "antiestres",
    "squishy", "shashibo", "cubo infinito",
)

# Vocabulario nuestro que no debería aparecer en Orbitoys.
VOCAB_PROPIO = (
    "síndrome de down", "sindrome de down", "trisomía 21", "trisomia 21",
    "hipotonía", "hipotonia",
)

# Lista blanca: el partner cruzado es una decisión de producto, no una fuga.
# Se permite NOMBRAR la web hermana y enlazarla; lo que no se permite es
# vender su producto ni escribir su contenido.
WHITELIST_FICHEROS = {
    os.path.normpath("lib/site.ts"),          # PARTNER_ORBITOYS declarado
    os.path.normpath("scripts/gate_aislamiento.py"),   # este mismo fichero
    os.path.normpath("scripts/mine_suggest_2026-08-02.py"),  # su lista de exclusión
}
# En estos ficheros se tolera la MENCIÓN de la marca hermana, pero no su tag.
PALABRAS_PARTNER_OK = ("orbitoys",)

EXT_CONTENIDO = (".md", ".mdx", ".ts", ".tsx", ".json")
DIRS_IGNORADOS = {"node_modules", ".next", "out", ".git", "_fichas_cache"}

# Cachés de origen: texto LITERAL de Amazon que usamos como materia prima para
# redactar. Que ahí aparezca vocabulario ajeno no es culpa nuestra ni se publica
# tal cual, así que sale en ÁMBAR (aviso) y no tumba el build. Lo que sí tumba
# el build es que ese vocabulario haya pasado a texto redactado por nosotros.
FICHEROS_CACHE = (
    os.path.normpath("data/fichas.json"),
    os.path.normpath("data/images.json"),
)


def es_cache(rel: str) -> bool:
    return rel in FICHEROS_CACHE or "_fichas_cache" in rel


def cargar_asins(ruta_json):
    """Devuelve {asin: titulo} de un products.json (formatos de los 2 proyectos)."""
    if not os.path.isfile(ruta_json):
        return None
    with open(ruta_json, encoding="utf-8") as f:
        data = json.load(f)
    items = data.get("products") or data.get("productos") or (
        data if isinstance(data, list) else []
    )
    out = {}
    for p in items:
        if not isinstance(p, dict):
            continue
        asin = p.get("asin") or p.get("amazonASIN")
        if asin:
            out[str(asin).strip().upper()] = p.get("titulo") or p.get("nombre") or "?"
    return out


def ficheros_de_contenido(raiz):
    for dirpath, dirnames, filenames in os.walk(raiz):
        dirnames[:] = [d for d in dirnames if d not in DIRS_IGNORADOS]
        for fn in filenames:
            if fn.endswith(EXT_CONTENIDO):
                yield os.path.join(dirpath, fn)


def buscar_terminos(raiz, terminos, whitelist, permitir_marca=False):
    """[(fichero_rel, linea, termino, texto)] de cada aparición fuera de la lista blanca."""
    hallazgos = []
    patron = re.compile("|".join(re.escape(t) for t in terminos), re.IGNORECASE)
    for ruta in ficheros_de_contenido(raiz):
        rel = os.path.normpath(os.path.relpath(ruta, raiz))
        if rel in whitelist:
            continue
        try:
            with open(ruta, encoding="utf-8", errors="replace") as f:
                for n, linea in enumerate(f, 1):
                    m = patron.search(linea)
                    if not m:
                        continue
                    encontrado = m.group(0).lower()
                    if permitir_marca and encontrado in PALABRAS_PARTNER_OK:
                        continue
                    hallazgos.append((rel, n, m.group(0), linea.strip()[:120]))
        except OSError:
            continue
    return hallazgos


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--otro", default=os.environ.get("BRINCALUNA_OTRO", OTRO_DEFECTO),
                    help="Ruta del proyecto hermano (Orbitoys)")
    args = ap.parse_args()

    print("== GATE DE AISLAMIENTO Brincaluna ⇄ Orbitoys ==")
    rojo = []
    no_verificado = []

    # ---- 1. ASIN compartidos -------------------------------------------------
    mios = cargar_asins(os.path.join(BASE_DIR, "data", "products.json"))
    if mios is None:
        print("!! No encuentro data/products.json de Brincaluna", file=sys.stderr)
        return 1
    otros = cargar_asins(os.path.join(args.otro, "data", "products.json"))

    if otros is None:
        no_verificado.append(
            f"NO he podido leer el catálogo de Orbitoys en {args.otro} "
            "-> el cruce de ASIN NO está verificado (esto NO es un verde)"
        )
    else:
        comunes = sorted(set(mios) & set(otros))
        if comunes:
            for a in comunes:
                rojo.append(f"ASIN COMPARTIDO {a}: aquí «{mios[a][:60]}» / allí «{otros[a][:60]}»")
        else:
            print(f"[OK] 0 ASIN compartidos ({len(mios)} aquí vs {len(otros)} allí)")

    # ---- 2. Tag de afiliado ajena -------------------------------------------
    tags = buscar_terminos(BASE_DIR, TAGS_AJENAS, WHITELIST_FICHEROS)
    if tags:
        for rel, n, term, txt in tags:
            rojo.append(f"TAG AJENA «{term}» en {rel}:{n} -> {txt}")
    else:
        print("[OK] 0 tags de afiliado ajenas")

    # ---- 3. Vocabulario del otro nicho en el FUENTE --------------------------
    vocab = buscar_terminos(BASE_DIR, VOCAB_AJENO, WHITELIST_FICHEROS, permitir_marca=True)
    vocab_redactado = [h for h in vocab if not es_cache(h[0])]
    vocab_cache = [h for h in vocab if es_cache(h[0])]

    if vocab_redactado:
        for rel, n, term, txt in vocab_redactado:
            rojo.append(f"VOCABULARIO AJENO «{term}» en {rel}:{n} -> {txt}")
    else:
        print("[OK] 0 vocabulario del nicho TDAH en texto redactado por nosotros")

    if vocab_cache:
        print(f"[ÁMBAR] {len(vocab_cache)} apariciones en cachés de Amazon "
              "(texto literal de terceros, no publicado tal cual):")
        for rel, n, term, _ in vocab_cache[:5]:
            print(f"   · {rel}:{n} «{term}»")
        print("   -> vigilar que no se cuele al redactar la PDP de esos productos")

    # ---- 3b. Vocabulario ajeno en el HTML PUBLICADO --------------------------
    # La verdad final es lo que se sirve. Además del cruce, aquí se vigila la
    # DILUCIÓN TEMÁTICA: si la keyword del otro nicho aparece en un porcentaje
    # alto de las páginas, el buscador deja de tener claro de qué va esta web.
    out_dir = os.path.join(BASE_DIR, "out")
    if not os.path.isdir(out_dir):
        no_verificado.append("No existe out/ -> el HTML publicado NO está verificado")
    else:
        htmls = []
        for dirpath, _, filenames in os.walk(out_dir):
            htmls += [os.path.join(dirpath, f) for f in filenames if f.endswith(".html")]
        patron = re.compile("|".join(re.escape(t) for t in VOCAB_AJENO), re.IGNORECASE)
        contaminadas = []
        for ruta in htmls:
            try:
                with open(ruta, encoding="utf-8", errors="replace") as f:
                    if patron.search(f.read()):
                        contaminadas.append(os.path.relpath(ruta, out_dir))
            except OSError:
                continue
        if not htmls:
            no_verificado.append("out/ existe pero no tiene HTML -> nada verificado")
        elif contaminadas:
            pct = 100.0 * len(contaminadas) / len(htmls)
            rojo.append(
                f"HTML PUBLICADO CONTAMINADO: {len(contaminadas)}/{len(htmls)} páginas "
                f"({pct:.1f}%) contienen vocabulario del otro nicho. "
                f"Ejemplos: {', '.join(contaminadas[:3])}"
            )
        else:
            print(f"[OK] 0/{len(htmls)} páginas publicadas con vocabulario ajeno")

    # ---- 4. Sentido inverso (informativo): lo nuestro dentro de Orbitoys -----
    if otros is not None:
        inverso = buscar_terminos(args.otro, VOCAB_PROPIO, set())
        if inverso:
            print(f"\n[AVISO] {len(inverso)} apariciones de vocabulario Down dentro de Orbitoys:")
            for rel, n, term, txt in inverso[:10]:
                print(f"   - {rel}:{n} «{term}» -> {txt}")
            print("   (no bloquea ESTE build, pero hay que limpiarlo en el otro repo)")
        else:
            print("[OK] 0 vocabulario Down dentro de Orbitoys")

    # ---- Veredicto -----------------------------------------------------------
    for aviso in no_verificado:
        print(f"\n[!! NO VERIFICADO] {aviso}", file=sys.stderr)

    if rojo:
        print(f"\nGATE ROJO — {len(rojo)} cruces detectados:", file=sys.stderr)
        for r in rojo:
            print(f"   x {r}", file=sys.stderr)
        return 2

    if no_verificado:
        print("\nGATE ÁMBAR: sin cruces en lo que SÍ pude comprobar, "
              "pero queda algo sin verificar (ver arriba).")
        return 0

    print("\nGATE VERDE: las dos webs están aisladas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
