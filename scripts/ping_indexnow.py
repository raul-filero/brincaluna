# -*- coding: utf-8 -*-
"""
Aviso a IndexNow de las URLs de Brincaluna (épica E15).

IndexNow notifica a Bing, Yandex, DuckDuckGo, Ecosia y Yahoo. Google NO lo usa
(a Google se le avisa por sitemap en Search Console). Importa porque hasta que
Bing no indexe la web, ChatGPT-Search y Copilot no pueden citarla: en Orbitoys
ese fue justo el cuello de botella durante semanas.

Las URLs salen del sitemap.xml del build, así que siempre van sincronizadas con
lo que realmente existe. Si el sitemap está vacío o no existe, el script FALLA
en vez de reportar un éxito hueco.

Uso:
    python scripts/ping_indexnow.py                 # lee out/sitemap.xml
    python scripts/ping_indexnow.py --url <a> <b>   # solo esas URLs
"""

import argparse
import glob
import json
import os
import re
import sys
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# CON www: es el host canónico real. El dominio raíz no se pudo activar en
# Cloudflare Pages porque el DNS vive en Don Dominio y allí el raíz necesita un
# ANAME, que no expone el CNAME que Cloudflare exige para validar. El host de
# IndexNow tiene que coincidir con el de las URLs y con el de la clave, o el
# endpoint rechaza el envío entero.
HOST = "www.brincaluna.com"
ENDPOINT = "https://api.indexnow.org/indexnow"


def localizar_clave():
    """La clave es el nombre del .txt de public/ cuyo contenido es él mismo."""
    for ruta in glob.glob(os.path.join(BASE_DIR, "public", "*.txt")):
        nombre = os.path.splitext(os.path.basename(ruta))[0]
        if len(nombre) < 32:
            continue
        try:
            with open(ruta, encoding="utf-8") as f:
                if f.read().strip() == nombre:
                    return nombre
        except OSError:
            continue
    return None


def urls_del_sitemap():
    ruta = os.path.join(BASE_DIR, "out", "sitemap.xml")
    if not os.path.isfile(ruta):
        print(f"ERROR: no existe {ruta}. Haz el build antes.", file=sys.stderr)
        return []
    with open(ruta, encoding="utf-8") as f:
        return re.findall(r"<loc>([^<]+)</loc>", f.read())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", nargs="*", help="URLs concretas en vez del sitemap entero")
    args = ap.parse_args()

    clave = localizar_clave()
    if not clave:
        print("ERROR: no encuentro la clave de IndexNow en public/*.txt", file=sys.stderr)
        return 1

    urls = args.url or urls_del_sitemap()
    if not urls:
        print("ERROR: 0 URLs que enviar — no aviso de nada.", file=sys.stderr)
        return 1

    payload = {
        "host": HOST,
        "key": clave,
        "keyLocation": f"https://{HOST}/{clave}.txt",
        "urlList": urls,
    }
    req = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"IndexNow HTTP {resp.status} — {len(urls)} URLs enviadas")
            return 0 if resp.status in (200, 202) else 1
    except Exception as e:
        print(f"ERROR al avisar a IndexNow: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
