#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fetch_fichas.py — Cachea la ficha real de amazon.es de cada producto activo
y extrae los feature bullets para alimentar las páginas de producto (PDP).

Por qué: la descripción larga de cada PDP se REDACTA (nunca se copia) a partir
de las características reales del fabricante — sin ficha no hay PDP honesta.

Salida:
  ../catalogo/_fichas_cache/<ASIN>.html   (HTML crudo, fuera del repo web)
  data/fichas.json                        ({asin: {titulo_amazon, bullets[]}})

Uso: python scripts/fetch_fichas.py            # todos los activos sin ficha
     python scripts/fetch_fichas.py B0XXXXXX   # solo esos ASIN
"""
import sys
import re
import json
import gzip
import time
import random
import pathlib
import html as H
import urllib.request

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CACHE = RAIZ.parent / "catalogo" / "_fichas_cache"
SALIDA = RAIZ / "data" / "fichas.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9",
    "Accept-Encoding": "gzip, deflate",
}

MAX_REQUESTS = 120
_req = 0


def fetch(url: str) -> bytes | None:
    global _req
    if _req >= MAX_REQUESTS:
        print(f"[STOP] tope {MAX_REQUESTS} peticiones", file=sys.stderr)
        return None
    _req += 1
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=30) as r:
            raw = r.read()
            if "gzip" in (r.headers.get("Content-Encoding") or ""):
                try:
                    raw = gzip.decompress(raw)
                except OSError:
                    pass
            return raw
    except Exception as e:  # noqa: BLE001
        print(f"[ERR] {url}: {e}", file=sys.stderr)
        return None


def extraer(html_txt: str) -> dict:
    """Título de la ficha + feature bullets, limpios de HTML."""
    out = {"titulo_amazon": "", "bullets": []}
    m = re.search(r'id="productTitle"[^>]*>\s*([^<]+)', html_txt)
    if m:
        out["titulo_amazon"] = H.unescape(m.group(1)).strip()
    bloque = re.search(r'id="feature-bullets".*?</ul>', html_txt, re.S)
    if bloque:
        for li in re.findall(r"<span[^>]*a-list-item[^>]*>\s*(.*?)\s*</span>", bloque.group(0), re.S):
            txt = H.unescape(re.sub(r"<[^>]+>", " ", li))
            txt = re.sub(r"\s+", " ", txt).strip()
            if txt and len(txt) > 3:
                out["bullets"].append(txt)
    return out


def main() -> None:
    CACHE.mkdir(exist_ok=True)
    productos = json.loads((RAIZ / "data" / "products.json").read_text(encoding="utf-8"))["products"]
    solo = set(sys.argv[1:])
    fichas = {}
    if SALIDA.exists():
        fichas = json.loads(SALIDA.read_text(encoding="utf-8"))

    ok = fallos = 0
    for p in productos:
        asin = p["asin"]
        if p.get("reserva") or (solo and asin not in solo):
            continue
        if asin in fichas and fichas[asin].get("bullets") and not solo:
            continue
        crudo = CACHE / f"{asin}.html"
        if crudo.exists() and not solo:
            html_txt = crudo.read_text(encoding="utf-8", errors="replace")
        else:
            raw = fetch(f"https://www.amazon.es/dp/{asin}")
            if not raw:
                fallos += 1
                continue
            html_txt = raw.decode("utf-8", "ignore")
            if "captcha" in html_txt.lower() or "api-services-support@amazon.com" in html_txt.lower():
                print(f"[CAPTCHA] en {asin} — paro el lote", file=sys.stderr)
                break
            crudo.write_text(html_txt, encoding="utf-8")
            time.sleep(random.uniform(2.5, 4.5))
        datos = extraer(html_txt)
        if datos["bullets"]:
            fichas[asin] = datos
            ok += 1
            print(f"[OK] {asin} ({len(datos['bullets'])} bullets)")
        else:
            fallos += 1
            print(f"[SIN-BULLETS] {asin}", file=sys.stderr)

    SALIDA.write_text(json.dumps(fichas, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nRESUMEN: {ok} fichas nuevas · {fallos} fallos · fichas.json con {len(fichas)} entradas")


if __name__ == "__main__":
    main()
