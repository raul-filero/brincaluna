#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fetch_precios.py — Lee el precio actual de amazon.es de cada producto activo.

Salida: data/precios.json  ->  {ASIN: {"precio": "14,99", "moneda": "EUR",
                                       "fecha": "2026-08-02T21:05:00"}}

La FECHA no es decorativa: se pinta junto al precio en la web. Un precio sin
fecha visible es un precio que el usuario cree actual cuando puede tener
semanas — y eso es engañarle. Con la fecha delante, decide él.

Reanudable: si data/precios.json ya tiene un ASIN, no lo vuelve a pedir salvo
--todos. Amazon corta con CAPTCHA en sesiones largas, así que va con pausas.

Uso: python scripts/fetch_precios.py           # los que falten
     python scripts/fetch_precios.py --todos   # refresca todos
"""
import sys
import re
import json
import gzip
import time
import random
import pathlib
import urllib.request
from datetime import datetime

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PRODUCTS = RAIZ / "data" / "products.json"
SALIDA = RAIZ / "data" / "precios.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9",
    "Accept-Encoding": "gzip, deflate",
}


def fetch(asin: str) -> str | None:
    url = f"https://www.amazon.es/dp/{asin}"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            if r.headers.get("Content-Encoding") == "gzip":
                raw = gzip.decompress(raw)
            return raw.decode("utf-8", "ignore")
    except Exception as e:
        print(f"  [ERROR] {asin}: {e}")
        return None


def extraer_precio(html: str) -> str | None:
    """displayPrice es el campo que Amazon usa para el precio mostrado."""
    if "captcha" in html.lower() or "Introduce los caracteres" in html:
        return "__CAPTCHA__"
    m = re.search(r'"displayPrice"\s*:\s*"([^"]+)"', html)
    if m:
        # Viene como "14,99 €" con el símbolo en varios encodings
        p = re.sub(r"[^\d,\.]", "", m.group(1)).strip()
        return p or None
    return None


def main() -> int:
    todos = "--todos" in sys.argv
    productos = json.loads(PRODUCTS.read_text(encoding="utf-8"))["products"]
    activos = [p for p in productos if not p.get("reserva")]

    datos = {}
    if SALIDA.exists() and not todos:
        datos = json.loads(SALIDA.read_text(encoding="utf-8"))

    pendientes = [p for p in activos if p["asin"] not in datos]
    print(f"activos: {len(activos)} | ya cacheados: {len(datos)} | a pedir: {len(pendientes)}")

    captchas = 0
    for i, p in enumerate(pendientes, 1):
        asin = p["asin"]
        html = fetch(asin)
        if html is None:
            continue
        precio = extraer_precio(html)
        if precio == "__CAPTCHA__":
            captchas += 1
            print(f"  [{i}/{len(pendientes)}] {asin}: CAPTCHA (llevamos {captchas})")
            if captchas >= 3:
                print("  Amazon está bloqueando. Paro y guardo lo conseguido.")
                break
            time.sleep(60)
            continue
        if precio:
            datos[asin] = {
                "precio": precio,
                "moneda": "EUR",
                "fecha": datetime.now().isoformat(timespec="seconds"),
            }
            print(f"  [{i}/{len(pendientes)}] {asin}: {precio} €")
        else:
            print(f"  [{i}/{len(pendientes)}] {asin}: sin precio (¿sin stock?)")
        SALIDA.write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")
        time.sleep(random.uniform(2.0, 4.5))

    print(f"\nprecios guardados: {len(datos)}/{len(activos)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
