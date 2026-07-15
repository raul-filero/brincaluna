#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fetch_images.py — Descarga la FOTO REAL de cada producto desde su ficha
de amazon.es (misma técnica stdlib + rate-limit del amazon_stats.py de Orbitoys).

Por qué: la capa producto de Brincaluna exige foto real, nunca imagen inventada.
Salida:
  public/products/<ASIN>.jpg      (imagen principal de la ficha)
  data/images.json                (manifiesto {asin: true} para el build)

Uso:  python scripts/fetch_images.py           # todos los activos sin foto aún
      python scripts/fetch_images.py B0XXXXXX  # solo esos ASIN
"""
import sys
import re
import json
import gzip
import time
import random
import pathlib
import urllib.request

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DEST = RAIZ / "public" / "products"
MANIFEST = RAIZ / "data" / "images.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9",
    "Accept-Encoding": "gzip, deflate",
}

# Tope anti-runaway: 64 fichas + 64 imágenes + margen de reintentos.
MAX_REQUESTS = 170
_req = 0


def fetch(url: str) -> bytes | None:
    """GET educado con gzip. None si falla o si se agota el tope."""
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
    except Exception as e:  # noqa: BLE001 — un fallo de red no debe tumbar el lote
        print(f"[ERR] {url}: {e}", file=sys.stderr)
        return None


def url_imagen(html: str) -> str | None:
    """
    Extrae la URL de la imagen principal de la ficha.
    Orden de intento: hiRes del bloque de imágenes → data-old-hires
    del landingImage → "large". Siempre dominio media-amazon.
    """
    for pat in (
        r'"hiRes":"(https://m\.media-amazon\.com/images/I/[^"]+)"',
        r'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"',
        r'"large":"(https://m\.media-amazon\.com/images/I/[^"]+)"',
    ):
        m = re.search(pat, html)
        if m:
            return m.group(1)
    return None


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    productos = json.loads((RAIZ / "data" / "products.json").read_text(encoding="utf-8"))["products"]
    activos = [p for p in productos if not p.get("reserva")]
    solo = set(sys.argv[1:])
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}

    ok = fallos = 0
    for p in activos:
        asin = p["asin"]
        if solo and asin not in solo:
            continue
        destino = DEST / f"{asin}.jpg"
        if destino.exists():
            manifest[asin] = True
            continue

        html_raw = fetch(f"https://www.amazon.es/dp/{asin}")
        if not html_raw:
            fallos += 1
            continue
        html = html_raw.decode("utf-8", "ignore")
        low = html.lower()
        if "captcha" in low or "api-services-support@amazon.com" in low:
            print(f"[CAPTCHA] en {asin} — paro el lote para no quemar la IP", file=sys.stderr)
            break

        img_url = url_imagen(html)
        if not img_url:
            print(f"[SIN-IMG] {asin}", file=sys.stderr)
            fallos += 1
            time.sleep(random.uniform(2.5, 4.5))
            continue

        img = fetch(img_url)
        # Guardia: una "imagen" de <5KB suele ser un error/placeholder de Amazon.
        if img and len(img) > 5000:
            destino.write_bytes(img)
            manifest[asin] = True
            ok += 1
            print(f"[OK] {asin} ({len(img)//1024} KB)")
        else:
            fallos += 1
            print(f"[ERR-IMG] {asin}", file=sys.stderr)

        time.sleep(random.uniform(2.5, 4.5))  # rate-limit educado entre fichas

    MANIFEST.write_text(json.dumps(manifest, indent=1, sort_keys=True), encoding="utf-8")
    print(f"\nRESUMEN: {ok} descargadas · {fallos} fallos · manifiesto {MANIFEST.name} con {len(manifest)} entradas")


if __name__ == "__main__":
    main()
