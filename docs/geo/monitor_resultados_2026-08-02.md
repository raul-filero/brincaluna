# E16 — Monitor GEO: medición DÍA 0 (baseline)

**Fecha de medición**: 2026-08-02, 17:45 (hora España)
**Dominio**: https://www.brincaluna.com (canónico CON www)
**Estado**: día 0 real — el dominio se compró y apuntó esta misma tarde. Todo cero es lo
esperado; el valor de este documento es tener el punto de partida para comparar a 90 días.

---

## 1. Indexación

| Motor | Método | URLs indexadas | Notas |
|---|---|---|---|
| Google | `site:brincaluna.com` (SERP directa) | **0** | Sin propiedad en GSC todavía (necesita login de Raúl) |
| Bing | `site:brincaluna.com` y `site:www.brincaluna.com` | **0** | IndexNow aceptado (202 + 200, 177 URLs) hoy mismo |
| DuckDuckGo | `site:brincaluna.com` | **0** | Se alimenta de Bing |

> Cuidado al medir: un `grep brincaluna.com` sobre el HTML de la SERP da falsos positivos
> (el propio texto del query aparece en la caja de búsqueda). Hay que contar **URLs
> únicas** con `grep -oE 'https?://(www\.)?brincaluna\.com[^"&<> ]*' | sort -u`.

## 2. Salud técnica en producción (verificado por curl, no contra `out/`)

| Comprobación | Resultado |
|---|---|
| `https://www.brincaluna.com/` | **200** |
| `https://brincaluna.com/` (raíz sin www) | **000** — sin certificado. Pendiente 301 en Don Dominio (ver §5) |
| `sitemap.xml` | **200**, **177 URLs** |
| `robots.txt` | **200**, `Allow: /` + línea Sitemap. **Limpio, sin el bloque anti-bots-IA** de Cloudflare (no hay zona en CF → no se anexa) |
| Clave IndexNow | **200** |
| Rutas muestreadas | `/` `/guias/` `/tipos/` `/por-etapa/` `/sensoriales/` `/motricidad-fina/` `/guias/munecos-con-sindrome-de-down/` → **200** todas |

Reparto del sitemap: 131 PDP `/juguete/` · 17 `/guias/` · 14 `/tipo/` · 5 `/por-etapa/` ·
8 hubs de categoría en raíz · home.
(`/categorias/` y `/juguete/` sin slug dan 404 **por diseño**: las categorías cuelgan de
la raíz —`/sensoriales/`— y no existe índice de PDP. No es un fallo.)

## 3. Citación en motores generativos

**Baseline: 0 citas.** No es medible con precisión sin consultar cada motor a mano; lo que
sí queda fijado hoy es que el dominio no existe para ellos (0 páginas indexadas, 0 enlaces
entrantes). Cualquier cita futura es ganancia neta sobre este cero.

Método para la remedición a 90 días (mismas consultas, mismo orden):
1. «muñecos con síndrome de Down comprar España»
2. «qué juguetes para un bebé con síndrome de Down que no gatea»
3. «material para trabajar el lenguaje síndrome de Down en casa»
4. «juguetes niños síndrome de Down 5 años»

## 4. Quién ocupa hoy el hueco más valioso

Consulta medida: **«muñecos con síndrome de Down comprar España»**. Los 10 resultados son
**tiendas vendiendo el muñeco** (jugarijugar, HopToys, Adrada, Cuiddo, Hola Caracola, La
Tienda del Maestro, La Tienda de la Familia, idealo, Hermex) — **ni una sola página
editorial** que explique qué muñeco elegir, a qué edad, o por qué importa la
representación.

Esto **confirma el insight nº5 del corpus**: hueco con demanda transaccional durante todo
el año y cobertura de contenido **cero**. Brincaluna entra ahí con guía + fichas propias
(Miniland ya está en catálogo). Es la primera consulta a vigilar.

## 5. Bloqueos vivos a día de hoy

| Bloqueo | Efecto medible | De quién depende |
|---|---|---|
| **Sin tracking ID de afiliado** | Los enlaces salen a Amazon **sin `tag=`** → el tráfico que compre **no genera comisión**. Verificado hoy sobre el HTML publicado: 0 apariciones de `tag=` | Raúl (crear `brincaluna-21`) |
| Raíz sin redirección | `brincaluna.com` no responde; solo funciona con `www.` | Raúl (301 en Don Dominio) |
| Sin GSC / Bing WMT | No hay datos de impresiones ni de cobertura; la indexación solo se puede estimar por `site:` | Raúl (login) |

## 6. Criterio de muerte (E8) — reloj y qué medir

**Fecha de evaluación: 2026-10-31** (90 días desde hoy).

Se sigue vivo si a esa fecha se cumple **al menos uno**:
- ≥ **1.000 sesiones orgánicas/mes**, o
- **CTR a afiliado ≥ 8 %** sobre ≥ 300 clics.

Fuentes del dato: sesiones = Cloudflare Web Analytics; clics y CTR = panel de Amazon
Associates filtrado por el tracking ID de Brincaluna. **El reloj de los 90 días solo
empieza a contar de verdad cuando exista el tracking ID** — sin él no hay denominador y el
KPI de conversión es inmedible.

---

*Remedición: repetir este mismo documento como `monitor_resultados_2026-10-31.md`
ejecutando las mismas comprobaciones, en el mismo orden, y comparar tabla a tabla.*
