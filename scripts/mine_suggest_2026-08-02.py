# -*- coding: utf-8 -*-
"""
Minero de Google Suggest para el nicho BRINCALUNA (juguetes y síndrome de Down).

Adaptado del motor validado en Orbitoys (scripts/mine_suggest_2026-07-30.py),
con las semillas REEMPLAZADAS por las del nicho Down. Ni una semilla de TDAH:
el aislamiento entre las dos webs es regla dura del proyecto.

Solo stdlib (urllib + json). Ejecutar con PYTHONUTF8=1.

Insight heredado de Orbitoys que aquí vale doble: en español el padre pregunta
por el PROBLEMA ("mi hijo con Down no habla"), no por la categoría de producto
("juguetes de estimulación oromotora"). Por eso las semillas mezclan problema,
hito de desarrollo y jerga que le suelta el terapeuta.

Salida cruda (consulta -> lista de sugerencias) en
docs/geo/_mining/suggest_2026-08-02.json
"""

import json
import os
import random
import re
import sys
import time
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "docs", "geo", "_mining")
OUT_FILE = os.path.join(OUT_DIR, "suggest_2026-08-02.json")

ENDPOINT = "https://suggestqueries.google.com/complete/search?client=firefox&hl=es&q="

# Semillas del nicho Down: 3 familias mezcladas a propósito.
#  (a) producto/categoría — lo que acabará comprando
#  (b) problema en palabras del padre — como lo teclea a las 2 AM
#  (c) jerga del profesional — lo que le dijo la logopeda o el fisio
SEEDS = [
    # (a) producto
    "juguetes sindrome de down",
    "juguetes estimulacion temprana",
    "juguetes para estimular el habla",
    "juguetes motricidad fina",
    "juguetes sensoriales bebe",
    "regalo nino sindrome de down",
    "munecos con sindrome de down",
    # (b) problema
    "mi bebe con sindrome de down no gatea",
    "mi hijo con sindrome de down no habla",
    "nino sindrome de down no camina",
    "bebe muy blandito brazos",
    # (c) jerga profesional
    "hipotonia bebe",
    "atencion temprana bebe",
    "praxias soplo ninos",
    "edad de desarrollo sindrome de down",
    "metodo lectura global down",
]

# Patrones de pregunta: (plantilla con {s} = semilla)
PATTERNS = [
    "que {s}",
    "cual {s}",
    "como {s}",
    "por que {s}",
    "para que sirve {s}",
    "{s} es bueno",
    "a que edad {s}",
    "donde comprar {s}",
    "mejor {s}",
    "cuando {s}",
]

MAX_QUERIES = 90
MAX_NET_FAILS = 3

# Detección de sugerencia "tipo pregunta"
QUESTION_RE = re.compile(
    r"^(que|qué|cual|cuál|cuales|cuáles|como|cómo|por ?que|por ?qué|porque|"
    r"para que|para qué|donde|dónde|cuando|cuándo|cuanto|cuánto|cuanta|cuánta|"
    r"a que edad|a qué edad|es |son |sirve|sirven|se puede|puedo|debo|hay |mi )",
    re.IGNORECASE,
)
QUESTION_HINTS = (
    "es bueno", "es buena", "son buenos", "son buenas", "sirve", "sirven",
    "a que edad", "a qué edad", "donde comprar", "dónde comprar",
    "como funciona", "cómo funciona", "por que", "por qué", "para que", "para qué",
    "no habla", "no camina", "no gatea", "no come", "?",
)

# Guardarraíl de aislamiento: si una sugerencia trae vocabulario del OTRO nicho
# (Orbitoys/TDAH), se descarta aquí y no llega al corpus. Barato y evita el
# error que más caro saldría: cruzar los dos proyectos.
NICHO_AJENO = ("tdah", "tda ", "adhd", "hiperactiv", "deficit de atencion",
               "déficit de atención", "fidget", "spinner", "antiestres",
               "antiestrés", "squishy")


def es_del_otro_nicho(text: str) -> bool:
    t = text.strip().lower()
    return any(k in t for k in NICHO_AJENO)


def is_question(text: str) -> bool:
    t = text.strip().lower()
    if QUESTION_RE.match(t):
        return True
    return any(h in t for h in QUESTION_HINTS)


def build_queries():
    """Semillas a pelo + combinaciones semilla×patrón, cortado a MAX_QUERIES."""
    queries = list(SEEDS)
    for pat in PATTERNS:
        for seed in SEEDS:
            q = pat.format(s=seed)
            if q not in queries:
                queries.append(q)
            if len(queries) >= MAX_QUERIES:
                return queries[:MAX_QUERIES]
    return queries[:MAX_QUERIES]


def fetch_suggestions(query: str):
    url = ENDPOINT + urllib.parse.quote(query)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) "
                "Gecko/20100101 Firefox/128.0"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw = resp.read()
    # client=firefox devuelve JSON: ["query", ["sug1", "sug2", ...]]
    data = json.loads(raw.decode("utf-8", errors="replace"))
    if isinstance(data, list) and len(data) >= 2 and isinstance(data[1], list):
        return [str(s) for s in data[1]]
    return []


def save(results, meta):
    os.makedirs(OUT_DIR, exist_ok=True)
    payload = {"_meta": meta, "results": results}
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)


def main():
    queries = build_queries()
    results = {}
    consecutive_fails = 0

    for i, q in enumerate(queries):
        try:
            sugs = fetch_suggestions(q)
            results[q] = sugs
            consecutive_fails = 0
            print(f"[{i+1}/{len(queries)}] {q!r} -> {len(sugs)} sugerencias")
        except Exception as e:
            consecutive_fails += 1
            results[q] = []
            print(f"[{i+1}/{len(queries)}] {q!r} -> FALLO ({e})", file=sys.stderr)
            if consecutive_fails >= MAX_NET_FAILS:
                print("3 fallos de red seguidos: guardo lo que hay y paro.",
                      file=sys.stderr)
                break
        if i < len(queries) - 1:
            time.sleep(random.uniform(1.0, 2.0))

    all_sugs = set()
    descartadas_otro_nicho = set()
    for sugs in results.values():
        for s in sugs:
            limpio = s.strip().lower()
            if es_del_otro_nicho(limpio):
                descartadas_otro_nicho.add(limpio)
                continue
            all_sugs.add(limpio)

    question_sugs = sorted(s for s in all_sugs if is_question(s))

    meta = {
        "date": "2026-08-02",
        "nicho": "sindrome de down / juguetes y desarrollo",
        "endpoint": "suggestqueries.google.com client=firefox hl=es",
        "queries_executed": len(results),
        "unique_suggestions_total": len(all_sugs),
        "unique_question_suggestions": len(question_sugs),
        "question_suggestions": question_sugs,
        "descartadas_por_nicho_ajeno": sorted(descartadas_otro_nicho),
        "stopped_by_net_fails": consecutive_fails >= MAX_NET_FAILS,
    }
    save(results, meta)

    print(f"\nGuardado: {OUT_FILE}")
    print(f"Consultas ejecutadas: {len(results)}")
    print(f"Sugerencias unicas totales: {len(all_sugs)}")
    print(f"Descartadas por ser del otro nicho: {len(descartadas_otro_nicho)}")
    print(f"COUNT_PREGUNTAS={len(question_sugs)}")


if __name__ == "__main__":
    main()
