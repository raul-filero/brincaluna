# Corpus de preguntas reales — Brincaluna (2026-08-02)

## Como se hizo

Consolidación de dos materiales, sin añadir ni una pregunta que no venga de una fuente abierta y citable.

**Material 1 — cosecha de los tres mineros (161 preguntas brutas):**

| Minero | Aporte bruto | Fuente principal | Qué falló |
|---|---|---|---|
| Minero A (buscadores + FAQ de webs que rankean) | 70 | mihijonohabla.com, downsinmitos.com, downciclopedia.org, bloghoptoys.es, sindromedownnavarra.org, foro Down España | Los blogs comerciales de "top juguetes" (tododisca, gndiario, juguetutto) tienen **cero** preguntas: son listados expositivos. webconsultas.com está cerrada. davidt21down.com da 404. blog.akroseducational.es redirige a home (301) y no es fetchable. |
| Minero B (foro Down España en profundidad) | 54 | sindromedown.org/foros — 9 secciones, ~18 hilos abiertos uno a uno para transcribir el mensaje del padre, no solo el titular | La paginación del foro no funciona (`/page/2/` devuelve los mismos 8 hilos): el archivo solo es accesible por búsqueda restringida al dominio, así que quedan hilos sin descubrir. Los blogs de juguetes tienen formulario de comentarios pero 0 comentarios publicados. Quora ES: solo 1 pregunta útil, el resto es genética y curiosidad social. Foros de maternidad generalistas: muro de cookies, nada indexado. |
| Minero C (consultorios + FAQ institucionales + artículos con dato citable) | 37 | down21.org/consultanos (2.363 + 2.305 hilos), foro Down España, FAQ de Down Navarra, revista Down21 "El juego y los juguetes", Downciclopedia | Buena parte de su aporte solapa con A y B (era el precio de ir a por el dato citable). Su valor único: trae **dato de experto** pegado a la pregunta (Isidoro Candel, Emilio Ruiz, Jesús Flórez), material de oro para redactar. |

Tras deduplicar solapes entre los tres mineros (**22 preguntas repetidas**, sobre todo hilos del foro que A, B y C cosecharon a la vez), quedan **139 preguntas únicas** de Material 1.

**Material 2 — minado propio de Google Suggest** (`docs/geo/_mining/suggest_2026-08-02.json`):

- El campo `_meta.question_suggestions` trae **82 sugerencias**. La mayoría son ruido del minero: pegaba un prefijo interrogativo delante de la semilla y Google devolvía frankensteins que nadie teclea ("como juguetes sensoriales bebes", "para que sirve mi hijo con sindrome de down no hablar", "cual bebe muy blandito brazos caidos").
- **Descartadas por ruido: 58 de 82.** Criterio: fuera si la frase solo existe por el prefijo inyectado y no se sostiene sola; fuera también "como tratar hipotonia em bebe" (portugués) y "que juguetes sensoriales beben" (typo del propio autocompletado).
- **Conservadas: 24.** De ellas, 12 son literales tal cual las devolvió Google y 12 son el núcleo real con el prefijo del minero retirado (marcadas en la columna Fuente como *prefijo retirado*). Retirar el prefijo no es reescribir al usuario: el prefijo lo puso la herramienta, no la persona.
- Además se han rescatado **38 consultas del bloque `results`** del mismo JSON (sugerencias no interrogativas pero que son búsqueda real: "juguetes para adolescentes con sindrome de down", "muñecos reborn con sindrome de down", "juguetes motricidad fina 2 años"…). Van marcadas como `Suggest/results`. No son preguntas gramaticales, pero son la voz literal del buscador y mandan sobre el copy transaccional.
- Aporte total de Google Suggest al corpus: **62 filas** (12 + 12 + 38).
- **Descartadas por pertenecer al otro nicho: 0.** El JSON trae `descartadas_por_nicho_ajeno: []` y en la revisión manual no ha aparecido ni una sugerencia de TDAH, hiperactividad, autismo puro, fidgets, spinners o antiestrés. Los mineros tampoco: el Minero A dejó fuera a propósito las preguntas hermanas que convivían en la misma página de Hop'Toys ("¿Qué regalar a un niño TEA?", "¿Qué regalar a un niño con dislexia o dispraxia?").

**Total consolidado: 201 preguntas** (139 de Material 1 + 62 de Suggest). Se supera el mínimo de 120 sin rellenar con nada inventado. Cada fila lleva su URL o el identificador exacto de la sugerencia de Google.

**Lo que NO hay y conviene saberlo:** no existe en todo el corpus una sola pregunta real de tipo *"¿qué le regalo a mi sobrino con síndrome de Down?"* escrita por un particular. Existen artículos que la responden (Hop'Toys, Down España, Akros), y existe la consulta en Google Suggest ("regalo para niño con sindrome de down"), pero no se ha podido citar a una persona formulándola en un foro. Si el eje regalos se vuelve prioritario, hace falta otra fuente: grupos de Facebook de familias, comentarios de YouTube o el Q&A de fichas de producto de Amazon.

## Resumen

- Total de preguntas: **201**
- Por intención: **informativa 130 / transaccional 67 / navegacional 4**
- Clusters: **9**
- Preguntas con destino existente: **98** · Preguntas huérfanas (HUECO): **84** · Marcadas `fuera de alcance — no crear`: **19**
- Es decir: **182 preguntas accionables** para Brincaluna (98 ya tienen página + 84 la necesitan), y 19 que son reales y citadas pero que la web no debe responder (genética, salud, escolarización, conducta): no es su terreno y diluirían la autoridad temática.

*(Los cuatro números se han contado sobre las filas del documento con `grep -cE '^\| [0-9]+ \|'`, no a ojo: 130 + 67 + 4 = 201, y 98 + 84 + 19 = 201.)*

## Clusters

Destinos existentes disponibles (leídos de `content/guias/*.md` y `lib/data.ts`):
`/guias/que-regalar-nino-sindrome-down/` · `/guias/como-elegir-juguete-criterios-down-espana/` · `/guias/edad-desarrollo-vs-edad-cronologica/` · `/guias/juguetes-hipotonia-bebe/` · `/guias/estimular-habla-jugando-soplo-musica/` · `/guias/leer-para-hablar-metodo-visual/` · `/guias/juguetes-sensoriales-seguros/` · categorías `/motricidad-fina/ /lenguaje-comunicacion/ /sensoriales/ /motricidad-gruesa/ /aprender-jugando/ /autonomia-juego-simbolico/` · etapas `/por-etapa/{primeros-meses,primeros-pasos,pequeno-explorador,ya-juega-con-otros}/` · tipos `/tipo/<slug>/` · `/regalos/` · `/como-elegimos/`

---

### C1 — Hipotonía y el bebé "blandito"

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 1 | ¿Qué es la hipotonía, y dónde podemos observarla? | informativa | downsinmitos.com/salud/hipotonia-en-las-personas-con-sindrome-de-down/ | /guias/juguetes-hipotonia-bebe/ |
| 2 | ¿Cómo podemos ayudar a aumentar el tono muscular de nuestros hijos? | informativa | downsinmitos.com/salud/hipotonia-en-las-personas-con-sindrome-de-down/ | /guias/juguetes-hipotonia-bebe/ |
| 3 | Quisiera saber por que la causa de la hipotonia en el sindrome.down.??? | informativa | sindromedown.org/foros/salud/quisiera-saber-por-que-la-causa-de-la-hipotonia-en-el-sindrome-down/ | /guias/juguetes-hipotonia-bebe/ |
| 4 | que es hipotonia bebe | informativa | Google Suggest (literal) | /guias/juguetes-hipotonia-bebe/ |
| 5 | como detectar hipotonia en bebes | informativa | Google Suggest (literal) | HUECO |
| 6 | como tratar hipotonia en bebe | informativa | Google Suggest (literal) | /guias/juguetes-hipotonia-bebe/ |
| 7 | hipotonia bebe causas | informativa | Suggest/results, semilla "hipotonia bebe" | /guias/juguetes-hipotonia-bebe/ |
| 8 | hipotonia bebe sintomas | informativa | Suggest/results, semilla "hipotonia bebe" | HUECO |
| 9 | hipotonia bebe 6 meses | informativa | Suggest/results, semilla "hipotonia bebe" | HUECO |
| 10 | hipotonia bebe 1 año | informativa | Suggest/results, semilla "hipotonia bebe" | HUECO |
| 11 | bebe muy blandito brazos caidos | informativa | Google Suggest (prefijo retirado) | HUECO |
| 12 | bebe muy blandito brazos y piernas | informativa | Google Suggest (prefijo retirado) | HUECO |
| 13 | bebe muy blandito brazos, que hago | informativa | Google Suggest (prefijo retirado) | HUECO |
| 14 | En este momento su movilidad es completamente reducida todavía, se sienta con ayuda… pero tiene las piernas todavía muy rígidas y en forma de rana, y ni hablar de intentar ponerlas rectas para tratar de estar de pie | informativa | sindromedown.org/foros/atencion-temprana/dudas-aspecto-motor/ | /guias/juguetes-hipotonia-bebe/ |
| 15 | Ejercicios de estimulación de brazos y hombros | informativa | sindromedown.org/foros/atencion-temprana/ejercicios-de-estimulacion-de-brazos-y-hombros/ | /motricidad-gruesa/ |
| 16 | ¿Pueden hacer deporte? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | /motricidad-gruesa/ |
| 17 | ¿Cómo desarrollan los niños con síndrome de Down sus habilidades sensoriales? | informativa | downciclopedia.org/psicologia/motricidad/3010-como-desarrollan-los-ninos-con-sindrome-de-down-sus-habilidades-sensoriales.html | /sensoriales/ |

---

### C2 — Hitos motores: sentarse, gatear, caminar

El cluster más caliente del foro después del habla, y el que **más preguntas huérfanas concentra**.

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 18 | Mi bebe no se sienta ni gatea | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-no-se-sienta-ni-gatea/ | HUECO |
| 19 | Hola soy madre de un bebe de 10 meses con sindrome de Down… quisiera saber que podria hacer para estimular a mi hijo para que pueda lograr sentarse, gatear y posteriormente caminar. Actualmente el se arrastra pero no logra ponerse en 4 puntos y no tiene control en el cuello | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-no-se-sienta-ni-gatea/ | HUECO |
| 20 | Mi bebe tiene 11 meses y no camina ni gartea que puede tener mi niño estoy de cosolada | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-de-11-meses-no-camina-ni-gatea/ | HUECO |
| 21 | Mi bebé no gatea mucho, ¿qué tengo que hacer para estimular su gateo? | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-no-gatea-mucho-que-tengo-que-hacer-para-estimular-su-gateo/ | HUECO |
| 22 | Hola tengo un bebe de 2 años y aún no logra gatear mucho menos caminar quiero saber si es normal q tarde tanto tiempo en lograr su desarrollo | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-no-gatea-mucho-que-tengo-que-hacer-para-estimular-su-gateo/ | HUECO |
| 23 | Mi hijo con casi dos años no camina | informativa | sindromedown.org/foros/atencion-temprana/mi-hijo-con-casi-dos-anos-no-camina/ | HUECO |
| 24 | Niño de 2 años que no camina | informativa | sindromedown.org/foros/atencion-temprana/nino-de-2-anos-que-no-camina/ | HUECO |
| 25 | Mi hijo de tres años no camina y no habla | informativa | sindromedown.org/foros/atencion-temprana/mi-hijo-de-tres-anos-no-camina-y-no-habla/ | HUECO |
| 26 | Mi hija no camina | informativa | sindromedown.org/foros/salud/mi-hija-no-camina/ | HUECO |
| 27 | ¿Cuándo caminan los niños con Síndrome de Down? | informativa | creciendocondani.org/2015/02/cuando-caminan-los-ninos-con-sindrome.html | HUECO |
| 28 | A qué edad se sientan los niños con síndrome de Down? | informativa | sindromededownalmundo.wordpress.com/2012/04/20/a-que-edad-se-sientan-los-ninos-con-sindrome-de-down/ | HUECO |
| 29 | mi bebe con sindrome de down no gatea que hago | informativa | Google Suggest (prefijo retirado) | HUECO |
| 30 | mi bebe con sindrome de down no gatea solo | informativa | Google Suggest (prefijo retirado) | HUECO |
| 31 | nino sindrome de down no camina bien | informativa | Google Suggest (prefijo retirado) | HUECO |
| 32 | nino sindrome de down no camina solo | informativa | Google Suggest (prefijo retirado) | HUECO |
| 33 | nino sindrome de down no caminar | informativa | Google Suggest (literal) | HUECO |
| 34 | Síndrome de Down y West…cuándo hablará y cuándo caminará | informativa | sindromedown.org/foros/atencion-temprana/sindrome-de-down-y-westcuando-hablara-y-cuando-caminara/ | HUECO |
| 35 | Equivalencia edad biológica – edad psicológica | informativa | sindromedown.org/foros/educacion/equivalencia-edad-biologica-edad-psicologica/ | /guias/edad-desarrollo-vs-edad-cronologica/ |
| 36 | edad de desarrollo sindrome de down en españa | informativa | Google Suggest (prefijo retirado) | /guias/edad-desarrollo-vs-edad-cronologica/ |
| 37 | ¿Cómo será mi bebé de mayor? | informativa | downelejido.org/ejido/inicio/nuevos-padres/56-primeras-preguntas.html | /guias/edad-desarrollo-vs-edad-cronologica/ |
| 38 | Control de esfinter *(hito madurativo con dato: vejiga 48 meses de media, intervalo 20-95)* | informativa | down21.org/consultanos/1-salud-y-biomedicina/58915-control-de-esfinter.html | HUECO |

---

### C3 — Habla y lenguaje ("entiende todo pero no habla")

El cluster con más demanda del nicho. Ojo: `mihijonohabla.com` ya monopoliza el cluster informativo con secciones-pregunta bien montadas; el ángulo diferencial de Brincaluna es **el juguete concreto por objetivo de habla**.

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 39 | mi hijo con síndrome de down no habla | informativa | Google Suggest (literal) | /guias/estimular-habla-jugando-soplo-musica/ |
| 40 | mi hijo con sindrome de down no habla bien | informativa | Google Suggest (literal) | /guias/estimular-habla-jugando-soplo-musica/ |
| 41 | ¿Hablará algún día mi hijo con Síndrome de Down? | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 42 | Por qué mi hijo con Síndrome de Down no habla | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 43 | ¿Qué puedo hacer para que mi hijo con Síndrome de Down hable? | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 44 | ¿Y qué pasa si mi hijo no habla a cierta edad? | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 45 | A qué edad empiezan a hablar los niños | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | HUECO |
| 46 | Cuándo llevar al niño al logopeda | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 47 | ¿Cómo es el lenguaje de los niños con Síndrome de Down? | informativa | mihijonohabla.com/ninos-con-sindrome-de-down-como-es-su-lenguaje/ | /lenguaje-comunicacion/ |
| 48 | ¿hablará mejor si gesticula más? | informativa | mihijonohabla.com/ninos-con-sindrome-de-down-como-es-su-lenguaje/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 49 | ¿Los adultos con síndrome de Down y los adolescentes pierden lenguaje? | informativa | mihijonohabla.com/ninos-con-sindrome-de-down-como-es-su-lenguaje/ | fuera de alcance comercial — no crear |
| 50 | ¿Y qué pasa con el lenguaje de los niños con Síndrome de Down cuando crecen, qué pasa en la adolescencia? | informativa | mihijonohabla.com/mi-hijo-con-sindrome-de-down-no-habla-que-hacer/ | HUECO |
| 51 | ¿Cómo enseñar a hablar a un niño con síndrome de Down? | informativa | criarconsentidocomun.com/desarrollar-habla-sindrome-down-hijo/ (título de resultado) | /guias/estimular-habla-jugando-soplo-musica/ |
| 52 | Mi hijo de 4 años entiende todo pero no quiere hablar, ¿qué puedo hacer? | informativa | sindromedown.org/foros/atencion-temprana/mi-hijo-de-4-anos-entiende-todo-pero-no-quiere-hablar-que-puedo-hacer/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 53 | Cómo ayudo a mi hijo a qué diga palabras nuevas? Yo sé que el me entiende todo y sabe el nombre de todo.. pero no quiere hablar! | informativa | down21.org/consultanos/1-salud-y-biomedicina/58900-mi-hijo-de-4-anos-no-habla.html | /guias/estimular-habla-jugando-soplo-musica/ |
| 54 | Mi hijo de 4 años no habla | informativa | down21.org/consultanos/1-salud-y-biomedicina/58900-mi-hijo-de-4-anos-no-habla.html | /guias/estimular-habla-jugando-soplo-musica/ |
| 55 | ¿Cómo puedo ayudar a un niño con SD a que desarrolle el lenguaje oral y comprensivo? | informativa | sindromedown.org/foros/atencion-temprana/como-puedo-ayudar-a-un-nino-con-sd-a-que-desarrolle-el-lenguaje-oral-y-comprensivo/ | /lenguaje-comunicacion/ |
| 56 | Consulta niño 6 años que no habla | informativa | sindromedown.org/foros/atencion-temprana/consulta-nino-6-anos-que-no-habla/ | HUECO |
| 57 | Niño con síndrome de down de 5 años que no habla | informativa | sindromedown.org/foros/atencion-temprana/nino-con-sindrome-de-down-de-5-anos-que-no-habla/ | HUECO |
| 58 | Niña 5 años no habla y tiene pañal | informativa | sindromedown.org/foros/atencion-temprana/nina-5-anos-no-habla-y-tiene-panal/ | HUECO |
| 59 | A mi hijo de 15 años le cuesta pronunciar palabras, ¿cómo podemos ayudarle? | informativa | sindromedown.org/foros/educacion/a-mi-hijo-de-15-anos-le-cuesta-pronunciar-palabras-como-podemos-ayudarle/ | HUECO |
| 60 | mi hija tiene 4 años, corta mucho más palabras, cuesta un poco para componer frases. Por ejemplo en vez de decir «vamos para allá» dice: «vamos allá». Estilo indio. Quisiera de su asesoría | informativa | sindromedown.org/foros/atencion-temprana/consejos-de-estimulacion-de-habla/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 61 | Me gustaria saber si tienen un metodo o un libro o algunas cosas recomendadas para desde ahora yo también estimular su lenguaje | transaccional | sindromedown.org/foros/atencion-temprana/consejos-de-estimulacion-de-habla/ | /lenguaje-comunicacion/ |
| 62 | Me gustaría conocer más acerca de la posibilidad de un trastorno específico del lenguaje… Querríamos saber que métodos podríamos utilizar además del que actualmente utilizamos como métodos aumentativos de comunicación | informativa | sindromedown.org/foros/psicologia/logopedia-2/ | HUECO |
| 63 | Lenguaje bimodal | informativa | sindromedown.org/foros/educacion/lenguaje-bimodal/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 64 | Mordida de lengua y desarrollo de lenguaje | informativa | sindromedown.org/foros/atencion-temprana/mordida-de-lengua-y-desarrollo-de-lenguaje/ | /guias/estimular-habla-jugando-soplo-musica/ |
| 65 | que juguetes para estimular el habla de los niños | transaccional | Google Suggest (literal) | /tipo/soplo-habla/ |
| 66 | juguetes para estimular el habla en bebes | transaccional | Suggest/results, semilla "juguetes para estimular el habla" | /tipo/soplo-habla/ |
| 67 | juguetes para estimular el habla de un niño de 2 años | transaccional | Suggest/results, semilla "juguetes para estimular el habla" | /por-etapa/primeros-pasos/ |
| 68 | juguetes para estimular el habla en niños de 3 años | transaccional | Suggest/results, semilla "juguetes para estimular el habla" | /por-etapa/pequeno-explorador/ |
| 69 | praxias soplo niños pdf | transaccional | Google Suggest (prefijo retirado) | HUECO |
| 70 | Investigaciones sobre la integración de la música al desarrollo cognitivo | informativa | sindromedown.org/foros/educacion/investigaciones-sobre-la-integracin-de-la-msica-al-desarrollo-cognitivo/ | /tipo/musicales/ |
| 71 | ¿Le gusta la música? | informativa | bloghoptoys.es/que-regalar-nino-sindrome-down/ | /tipo/musicales/ |

---

### C4 — Sensorial y exploración oral (boca, tirar los juguetes, texturas)

Este cluster es puro long-tail emocional del foro y **casi nadie lo cubre en formato pregunta**.

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 72 | Sentidos boca y manos | informativa | sindromedown.org/foros/atencion-temprana/sentidos-boca-y-manos/ | /guias/juguetes-sensoriales-seguros/ |
| 73 | Mi hija de casi 2 años… su conducta es que todo lo prueba con la lengua: los juguetes… todo lo q tenga en sus manos lo prueba con la lengua. Por q lo hace? será solo una etapa ??? | informativa | sindromedown.org/foros/atencion-temprana/sentidos-boca-y-manos/ *(hilo con 0 respuestas)* | HUECO |
| 74 | Cómo hacer para que no se eche todo a la boca ??? | informativa | sindromedown.org/foros/atencion-temprana/como-hacer-para-que-no-se-eche-todo-a-la-boca/ | HUECO |
| 75 | mi nieta tiene 3 años, y todo se lo mete a la boca. Los papeles se los come y lograr quitárselo es todo un esfuerzo y además a veces, nos muerde… Pero, cómo se puede ser severo, hay algún método? | informativa | sindromedown.org/foros/atencion-temprana/como-hacer-para-que-no-se-eche-todo-a-la-boca/ | HUECO |
| 76 | si le damos un juguete se lo hecha a la boca, cualquier objeto lo quiere explorar primero con su boca… ademas si le damos un juguete o cualquier objeto no lo sostiene mucho tiempo lo vota y asi es con todos sus juguetes los vota | informativa | sindromedown.org/foros/atencion-temprana/todo-se-va-para-la-boca-es-brusco-con-los-demas-ninos/ | HUECO |
| 77 | Niña con SD se lleva la mano a la boca todo el tiempo | informativa | sindromedown.org/foros/foro-general/nina-con-sd-se-lleva-la-mano-a-la-boca-todo-el-tiempo/ | HUECO |
| 78 | Mi bebe muerde y pellizca… | informativa | sindromedown.org/foros/atencion-temprana/mi-bebe-muerde-y-pellizca/ | HUECO |
| 79 | Porque tira todo lo que tiene en la mano *(«tiene un juguete en la mano y lo lanza a cualquier dirección»)* | informativa | down21.org/consultanos/educacion-y-psicologia/52119-porque-tira-todo-lo-que-tiene-en-la-mano.html | HUECO |
| 80 | Consulta sobre Episodios de Ahogo en Niño con Síndrome de Down | informativa | sindromedown.org/foros/atencion-temprana/consulta-sobre-episodios-de-ahogo-en-nino-con-sindrome-de-down/ | /guias/juguetes-sensoriales-seguros/ |
| 81 | Estimulación auditiva | informativa | sindromedown.org/foros/atencion-temprana/estimulacion-auditiva/ | /sensoriales/ |
| 82 | tengo un bebé de seis meses con Síndrome de Down… Estaría interesada en adquirir un buen libro de estimulación auditiva para trabajar este área con mi bebé… no he encontrado un libro interesante | transaccional | sindromedown.org/foros/atencion-temprana/estimulacion-auditiva/ | /sensoriales/ |
| 83 | juguetes sensoriales para niños con sindrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | /sensoriales/ |
| 84 | como hacer juguetes sensoriales para bebes | transaccional | Google Suggest (literal) | HUECO |
| 85 | juguetes sensoriales bebe 6 meses | transaccional | Suggest/results, semilla "juguetes sensoriales bebe" | /por-etapa/primeros-meses/ |
| 86 | juguetes sensoriales bebe 1 año | transaccional | Suggest/results, semilla "juguetes sensoriales bebe" | /por-etapa/primeros-pasos/ |
| 87 | juguetes sensoriales bebe 3 meses | transaccional | Suggest/results, semilla "juguetes sensoriales bebe" | /por-etapa/primeros-meses/ |
| 88 | juguetes sensoriales bebe 9 meses | transaccional | Suggest/results, semilla "juguetes sensoriales bebe" | /por-etapa/primeros-meses/ |

---

### C5 — Atención temprana: cuándo empezar y qué hacer en casa

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 89 | ¿A qué edad conviene iniciar ejercicios de estimulación con bebés con síndrome de Down? | informativa | sindromedown.org/foros/atencion-temprana/a-que-edad-conviene-iniciar-ejercicios-de-estimulacion-con-bebes-con-sindrome-de-down/ | HUECO |
| 90 | ¿Estimulación o atención temprana? | informativa | sindromedown.org/foros/atencion-temprana/estimulacion-o-atencion-temprana/ | HUECO |
| 91 | La importancia de la atención temprana | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | HUECO |
| 92 | Quería saber cuál es la edad más adecuada para empezar con la estimulación de la motricidad gruesa y fina con un niño con síndrome de Down | informativa | sindromedown.org/foros/atencion-temprana/edad-para-comenzar-motricidad-fina/ | HUECO |
| 93 | Existe un programa de estimulacion en funcion de la edad del niño, mi hija tiene 9 meses y me gustaria saber si esta recibiendo la estimulacion adecuada | informativa | sindromedown.org/foros/atencion-temprana/programa-de-estimulacion/ | HUECO |
| 94 | El medico que nos esta atendiendo dice que no es necesario la estimulacion y me dio unos ejercicios, tardo aprox 2 min y ya. Estoy desesperada buscando ayudar a mi bebe a salir adelante | informativa | sindromedown.org/foros/atencion-temprana/atencion-temprana-2/ | HUECO |
| 95 | Si tienen algun manual de informacion al que pudiera yo tener acceso sobre las terapias fisicas o de estimulacion temprana que pudiera yo aplicar a mi bebe de 10 meses | transaccional | sindromedown.org/foros/atencion-temprana/mi-bebe-no-se-sienta-ni-gatea/ | HUECO |
| 96 | la estimulación que ha recibido durante todo este tiempo para nosotros ha sido insuficiente… ha consistido en ponerle una pelota delante durante todo un año, semana tras semana | informativa | sindromedown.org/foros/atencion-temprana/dudas-aspecto-motor/ | HUECO |
| 97 | ¿Cómo estimulé a mi hijo con síndrome de Down? | informativa | clubmamasypapas.com/contenidos/post/a-divertirnos-estimulacion-en-casa-y-sindrome-de-down (título de resultado) | HUECO |
| 98 | ¿Cómo puedo ayudar a mi hijo con Síndrome de Down? | informativa | mihijonohabla.com/ninos-con-sindrome-de-down-como-es-su-lenguaje/ | /como-elegimos/ |
| 99 | Metodo Cemedete, dr Moya | navegacional | sindromedown.org/foros/atencion-temprana/metodo-cemedete-dr-moya/ | fuera de alcance — no crear |
| 100 | Guardería, sí o no. | informativa | sindromedown.org/foros/atencion-temprana/guarderia-si-o-no/ | fuera de alcance — no crear |
| 101 | Educacion en casa (homeschooling) educacion inicial | informativa | sindromedown.org/foros/educacion/educacion-en-casa-homeschooling-educacion-inicial/ | fuera de alcance — no crear |
| 102 | atencion temprana bebe madrid | navegacional | Google Suggest (prefijo retirado) | HUECO |
| 103 | juguetes estimulacion temprana madrid | navegacional | Google Suggest (prefijo retirado) | HUECO |
| 104 | que es juguetes de estimulacion temprana | informativa | Google Suggest (literal) | /por-etapa/primeros-meses/ |
| 105 | como hacer juguetes de estimulación temprana para bebés | transaccional | Google Suggest (literal) | HUECO |
| 106 | como hacer juguetes para estimulacion temprana | transaccional | Google Suggest (literal) | HUECO |
| 107 | juguetes estimulacion temprana bebes | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | /por-etapa/primeros-meses/ |
| 108 | juguetes estimulacion temprana 6 meses | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | /por-etapa/primeros-meses/ |
| 109 | juguetes estimulación temprana 1 año | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | /por-etapa/primeros-pasos/ |
| 110 | juguetes estimulacion temprana 0 3 meses | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | /por-etapa/primeros-meses/ |
| 111 | juguetes estimulacion temprana recien nacido | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | /por-etapa/primeros-meses/ |
| 112 | juguetes estimulacion temprana montessori | transaccional | Suggest/results, semilla "juguetes estimulacion temprana" | HUECO |
| 113 | Recién me enteré que mí hija tiene síndrome de down ¿Qué va a necesitar, como me preparo para eso? | informativa | es.quora.com/Recién-me-enteré-que-mí-hija-tiene-síndrome-de-down-Qué-va-a-necesitar-como-me-preparo-para-eso | HUECO |

---

### C6 — Elegir el juguete: criterios, seguridad y edad de desarrollo

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 114 | ¿Cómo elegir el juguete? | transaccional | bloghoptoys.es/recomendaciones-de-down-espana-para-elegir-los-juegos-para-ninos-con-sindrome-de-down/ | /guias/como-elegir-juguete-criterios-down-espana/ |
| 115 | ¿Estás buscando un juego para un niño con Síndrome de Down? | transaccional | bloghoptoys.es/recomendaciones-de-down-espana-para-elegir-los-juegos-para-ninos-con-sindrome-de-down/ | /guias/como-elegir-juguete-criterios-down-espana/ |
| 116 | ¿Qué juegos o juguetes son recomendables? | transaccional | bloghoptoys.es/recomendaciones-de-down-espana-para-elegir-los-juegos-para-ninos-con-sindrome-de-down/ | /guias/como-elegir-juguete-criterios-down-espana/ |
| 117 | ¿Qué criterios hay que tener en cuenta? | informativa | bloghoptoys.es/recomendaciones-de-down-espana-para-elegir-los-juegos-para-ninos-con-sindrome-de-down/ | /guias/como-elegir-juguete-criterios-down-espana/ |
| 118 | ¿La discapacidad debe condicionar la elección o es mejor elegir juguetes más generalista? | informativa | bloghoptoys.es/recomendaciones-de-down-espana-para-elegir-los-juegos-para-ninos-con-sindrome-de-down/ | /guias/como-elegir-juguete-criterios-down-espana/ |
| 119 | ¿Hace falta comprar juguetes distintos a los del resto de niños? | informativa | downciclopedia.org/educacion/atencion-temprana/320-motricidad-fina.html + down21.org (revista dic-2005, "El juego y los juguetes…") | /guias/como-elegir-juguete-criterios-down-espana/ |
| 120 | ¿Qué condiciones deben cumplir los juguetes para un niño con síndrome de Down? | transaccional | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes-para-los-ninos-con-sindrome-de-down.html | /guias/como-elegir-juguete-criterios-down-espana/ |
| 121 | ¿Qué juguetes están recomendados para un bebé con síndrome de Down en su primer año? | transaccional | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes… | /por-etapa/primeros-meses/ |
| 122 | ¿Qué juguetes van bien en la segunda etapa, cuando ya manipula y encaja? | transaccional | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes… | /por-etapa/primeros-pasos/ |
| 123 | ¿Qué juguetes se recomiendan a partir de los 3 años? | transaccional | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes… | /por-etapa/pequeno-explorador/ |
| 124 | ¿Merece la pena comprar juguetes nuevos o es mejor intercambiarlos con otras familias? | transaccional | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes… | /como-elegimos/ |
| 125 | ¿Son buenos los juegos de mesa cooperativos para un niño con síndrome de Down? | transaccional | bloghoptoys.es/recomendaciones-de-down-espana-… | HUECO |
| 126 | ¿Cuáles son los juegos o juguetes recomendados para jugar juntos (en familia, entre hermanos, con primos..) y que fomenten la inclusión? | transaccional | sindromedown.org/articulo-criterios-para-elegir-los-regalos-de-navidad-para-mi-hijo-con-sindrome-de-down/ | HUECO |
| 127 | ¿Qué juegos o juguetes fomentan la inclusión? | transaccional | bloghoptoys.es/recomendaciones-de-down-espana-… | HUECO |
| 128 | que juguetes son buenos para niños con sindrome de.down | transaccional | Google Suggest (literal, con el typo original) | /guias/como-elegir-juguete-criterios-down-espana/ |
| 129 | juguetes recomendados para niños con sindrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | /regalos/ |
| 130 | juguetes adaptados para niños con síndrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | HUECO |
| 131 | juguetes didácticos para niños con síndrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | /aprender-jugando/ |
| 132 | juguetes para bebes con sindrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | /por-etapa/primeros-meses/ |
| 133 | juguetes para niños con sindrome de down 5 años | transaccional | Suggest/results, semilla "juguetes sindrome de down" | /por-etapa/pequeno-explorador/ |
| 134 | juguetes para niños con sindrome de down 7 años | transaccional | Suggest/results, semilla "juguetes sindrome de down" | HUECO |
| 135 | juguetes para adolescentes con sindrome de down | transaccional | Suggest/results, semilla "juguetes sindrome de down" | HUECO |
| 136 | Juegos nintendo para niño con sindrome de down | transaccional | sindromedown.org/foros/foro-general/juegos-nintendo-para-nino-con-sindrome-de-down/ | HUECO |
| 137 | Cómo puedo trabajar Motricidad Fina con mi hijo con síndrome de Down? | informativa | downsinmitos.com/terapias-y-educacion/motricidad-fina/ | /motricidad-fina/ |
| 138 | esto es normal dentro del desarrollo evolutivo en la motricidad de las manos o es algo propio del síndrome de down o de un retraso | informativa | sindromedown.org/foros/atencion-temprana/agarrar-objetos/ | /motricidad-fina/ |
| 139 | Agarrar objetos | informativa | sindromedown.org/foros/atencion-temprana/agarrar-objetos/ | /motricidad-fina/ |
| 140 | juguetes motricidad fina 1 año | transaccional | Suggest/results, semilla "juguetes motricidad fina" | /por-etapa/primeros-pasos/ |
| 141 | juguetes motricidad fina 2 años | transaccional | Suggest/results, semilla "juguetes motricidad fina" | /por-etapa/primeros-pasos/ |
| 142 | juguetes motricidad fina 3 años | transaccional | Suggest/results, semilla "juguetes motricidad fina" | /por-etapa/pequeno-explorador/ |
| 143 | juguetes motricidad fina 18 meses | transaccional | Suggest/results, semilla "juguetes motricidad fina" | /por-etapa/primeros-pasos/ |
| 144 | juguetes motricidad fina 6 meses | transaccional | Suggest/results, semilla "juguetes motricidad fina" | /por-etapa/primeros-meses/ |
| 145 | juguetes que estimulan la motricidad fina | transaccional | Suggest/results, semilla "que juguetes motricidad fina" | /motricidad-fina/ |

---

### C7 — Regalos, Navidad/Reyes y muñecos con síndrome de Down

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 146 | ¿Qué regalar a un niño con Síndrome de Down? | transaccional | bloghoptoys.es/que-regalar-nino-sindrome-down/ | /guias/que-regalar-nino-sindrome-down/ |
| 147 | ¿Cómo acertar con el regalo de Reyes? | transaccional | bloghoptoys.es/que-regalar-nino-sindrome-down/ | /guias/que-regalar-nino-sindrome-down/ |
| 148 | ¿Qué regalar a un niño con discapacidad mental? | transaccional | bloghoptoys.es/que-regalar-nino-sindrome-down/ | /guias/que-regalar-nino-sindrome-down/ |
| 149 | Regalo para persona con sd | transaccional | sindromedown.org/foros/foro-general/regalo-para-persona-con-sd/ | /regalos/ |
| 150 | ¿qué criterios debo tener en cuenta para redactar la carta con los juguetes que Papá Noel o los Reyes Magos traerán a mi hijo con síndrome de Down? | transaccional | sindromedown.org/articulo-criterios-para-elegir-los-regalos-de-navidad-para-mi-hijo-con-sindrome-de-down/ | /guias/que-regalar-nino-sindrome-down/ |
| 151 | regalo para niño con sindrome de down | transaccional | Suggest/results, semilla "regalo nino sindrome de down" | /regalos/ |
| 152 | regalo nino sindrome de down madrid | navegacional | Suggest/results, semilla "regalo nino sindrome de down" | HUECO |
| 153 | muñecos con sindrome de down | transaccional | Suggest/results, semilla "munecos con sindrome de down" | HUECO |
| 154 | muñecos bebes con sindrome de down | transaccional | Suggest/results, semilla "munecos con sindrome de down" | HUECO |
| 155 | muñecos reborn con sindrome de down | transaccional | Suggest/results, semilla "munecos con sindrome de down" | HUECO |
| 156 | miniland muñecos sindrome de down | transaccional | Suggest/results, semilla "munecos con sindrome de down" | HUECO |
| 157 | munecos con sindrome de down en españa | transaccional | Google Suggest (prefijo retirado) | HUECO |
| 158 | ¿Cuánto tiempo hay que leerle un cuento cada día a un niño con síndrome de Down? | informativa | down21.org/revista-virtual/…/1916-el-juego-y-los-juguetes… | /tipo/tarjetas-libros/ |

---

### C8 — Aprender jugando: lectura, tarjetas, colores y números

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 159 | ¿Buen método para enseñar a leer y escribir a un niños con síndrome de Down? | informativa | sindromedown.org/foros/educacion/buen-metodo-para-ensenar-a-leer-y-escribir-a-un-ninos-con-sindrome-de-down/ | /guias/leer-para-hablar-metodo-visual/ |
| 160 | La profesora me ha dicho que no le compre los libros del curso, porque van a aplicar el método de Mª Victoria Troncoso. ¿Es el método más adecuado? Creo que también hay otro método «Doman». ¿cuál es mejor para Down? | informativa | sindromedown.org/foros/educacion/lecto-escritura/ | /guias/leer-para-hablar-metodo-visual/ |
| 161 | ¿Cómo enseñar a leer a los niños con Síndrome de Down? | informativa | didacticaconnieves.blogspot.com/2024/09/como-ensenar-leer-los-ninos-con.html | /guias/leer-para-hablar-metodo-visual/ |
| 162 | Cuándo empiezan a leer? | informativa | sindromedown.org/foros/educacion/cuando-empiezan-a-leer/ | /guias/leer-para-hablar-metodo-visual/ |
| 163 | ¿Qué método puedo utilizar para enseñar a mi hijo de 7 años a leer y escribir? | informativa | sindromedown.org/foros/educacion/que-metodo-puedo-utilizar-para-ensenar-a-mi-hijo-de-7-anos-a-leer-y-escribir/ | /guias/leer-para-hablar-metodo-visual/ |
| 164 | ¿Buen método para enseñar a leer y escribir a un niño de 12 años? | informativa | sindromedown.org/foros/educacion/buen-metodo-para-ensenar-a-leer-y-escribir-a-un-nino-de-12-anos/ | HUECO |
| 165 | Métodos de lectoescritura para estudiantes con síndrome de Down | informativa | sindromedown.org/foros/educacion/metodos-de-lectoescritura-para-estudiantes-con-sindrome-de-down/ | /guias/leer-para-hablar-metodo-visual/ |
| 166 | metodo lectura global sindrome down (variantes teclean "download" / "download pdf" / "download gratis") | transaccional | Suggest/results, semilla "metodo lectura global down" | HUECO |
| 167 | queria saber donde puedo descargarme o encontrar tarjetas con ilustraciones de animales, objetos, frutas etc. para poder utilizarlas con mi hijo en casa, tiene 20 meses | transaccional | sindromedown.org/foros/educacion/material-didactico/ | HUECO |
| 168 | Tengo en mi aula de 4 años un niño sindrome de Down. Me gustaría que me facilitaran material adaptado o páginas o bibliografía. Por ejemplo, si trabajamos el 1 y el color rojo, qué materiales puedo utilizar? | transaccional | sindromedown.org/foros/educacion/material-adaptado/ | HUECO |
| 169 | me gustaria conocer buenas páginas con juegos educativos para trabajar con ellos, yo conozco algunas, pero hay que variar mucho para que no se aburran de lo mismo | transaccional | sindromedown.org/foros/educacion/juegos/ | HUECO |
| 170 | ¿Qué herramientas puedo utilizar para que aprendan los colores y las vocales? | transaccional | sindromedown.org/foros/educacion/que-herramientas-puedo-utilizar-para-que-aprendan-los-colores-y-las-vocales/ | /aprender-jugando/ |
| 171 | Mi hijo olvida el número 6 y la vocal e: ¿qué puedo hacer? | informativa | sindromedown.org/foros/educacion/mi-hijo-olvida-el-numero-6-y-la-vocal-e-que-puedo-hacer/ | /aprender-jugando/ |
| 172 | Las vocales y los numeros | informativa | sindromedown.org/foros/educacion/las-vocales-y-los-numeros/ | /aprender-jugando/ |
| 173 | Estimulación temprana de pensamiento lógico-matemático | informativa | sindromedown.org/foros/atencion-temprana/estimulacion-temprana-de-pensamiento-logico-matematico/ | /aprender-jugando/ |
| 174 | tengo que trabajar con él actividades y la verdad que me faltan ideas algo originales | transaccional | sindromedown.org/foros/educacion/actividades-educativas-para-ninos-con-sd/ | HUECO |
| 175 | Actividades para verano | transaccional | sindromedown.org/foros/educacion/actividades-para-verano/ | HUECO |
| 176 | Programas informaticos | transaccional | sindromedown.org/foros/educacion/programas-informaticos/ | fuera de alcance — no crear |
| 177 | Seguimiento a Instrucciones | informativa | sindromedown.org/foros/atencion-temprana/seguimiento-a-instrucciones/ | HUECO |
| 178 | en las actividades en casa, juegos, con juguetes de encaje, y en general juguetes inteligentes, no suele hacer mucho caso… toma los cubos y los tira en lugar de apilarlos… ¿Qué sugiere hacer en este caso? | informativa | sindromedown.org/foros/atencion-temprana/seguimiento-a-instrucciones/ | HUECO |

---

### C9 — Autonomía, vida diaria y las primeras dudas del diagnóstico

| # | Pregunta | Intención | Fuente | Destino |
|---|---|---|---|---|
| 179 | AUTONOMIA – APRENDER A VESTIRSE | informativa | sindromedown.org/foros/atencion-temprana/autonomia-aprender-a-vestirse/ *(0 respuestas de experto)* | HUECO |
| 180 | Tengo una niña down que cumple 3 años… Rechaza sentarse en el wc para hacerlo y le hemos comprado un orinal de colores y con música, pero tampoco hace nada en él… Podéis darme ideas para poder enseñarla? | informativa | sindromedown.org/foros/atencion-temprana/quitar-el-panal/ | HUECO |
| 181 | ¿Cómo enseño a un hiño de 4 años a que controle esfínteres? | informativa | sindromedown.org/foros/atencion-temprana/como-enseno-a-un-hino-de-4-anos-a-que-controle-esfinteres/ | HUECO |
| 182 | Quitar pañal por las noches | informativa | sindromedown.org/foros/atencion-temprana/quitar-panal-por-las-noches/ | HUECO |
| 183 | Quitar el pañal a los 4 años, y evitar que juegue… | informativa | sindromedown.org/foros/atencion-temprana/quitar-el-panal-a-los-4-anos-y-evitar-que-juegue/ | HUECO |
| 184 | Comer con utensilios cuchara y/o tenerdor | informativa | down21.org/foro/educacion-y-psicologia/58228-comer-con-utensilios-cuchara-y-o-tenerdor.html | HUECO |
| 185 | Alimentación mixta de mi bebe | informativa | down21.org/consultanos/1-salud-y-biomedicina/58916-alimentacion-mixta-de-mi-bebe.html | fuera de alcance — no crear |
| 186 | ¿Podrá valerse por sí mismo? | informativa | downelejido.org/ejido/inicio/nuevos-padres/56-primeras-preguntas.html | /autonomia-juego-simbolico/ |
| 187 | ¿Qué capacidad intelectual tendrá? | informativa | downelejido.org/ejido/inicio/nuevos-padres/56-primeras-preguntas.html | /guias/edad-desarrollo-vs-edad-cronologica/ |
| 188 | ¿Cómo será la salud de nuestro hijo? | informativa | downelejido.org/ejido/inicio/nuevos-padres/56-primeras-preguntas.html | fuera de alcance — no crear |
| 189 | ¿Cuáles son los problemas de salud habituales? | informativa | downelejido.org/ejido/inicio/nuevos-padres/56-primeras-preguntas.html | fuera de alcance — no crear |
| 190 | Pero ¿cómo son los niños con Síndrome de Down? | informativa | mihijonohabla.com/ninos-con-sindrome-de-down-como-es-su-lenguaje/ | /guias/edad-desarrollo-vs-edad-cronologica/ |
| 191 | ¿Por qué aparece el Sindrome de Down? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 192 | ¿Son personas enfermas? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 193 | El síndrome de Down, ¿tiene cura? | informativa | espanol.nichd.nih.gov/salud/temas/down/informacion/preguntas | fuera de alcance — no crear |
| 194 | Porque algunos bebés no tienen todas las características físicas y solo se tiene algunas? | informativa | sindromedown.org/foros/salud/porque-algunos-bebs-no-tienen-todas-las-caractersticas-fsicas-y-solo-se-tiene-algunas/ | fuera de alcance — no crear |
| 195 | Alteraciones cromosómicas frecuentes en el Síndrome de Down | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 196 | ¿Se puede repetir el síndrome en embarazos posteriores? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 197 | ¿Se puede prevenir el síndrome de Down? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 198 | ¿Pueden tener descendencia? | informativa | sindromedownnavarra.org/preguntas-frecuentes/ | fuera de alcance — no crear |
| 199 | problemas de conducta | informativa | sindromedown.org/foros/psicologia/ (título de hilo) | fuera de alcance — no crear |
| 200 | Conductas niños SD | informativa | sindromedown.org/foros/atencion-temprana/conductas-ninos-sd/ | fuera de alcance — no crear |
| 201 | Escolarización | informativa | sindromedown.org/foros/educacion/ (título de hilo) | fuera de alcance — no crear |

> **Nota de recuento.** 201 filas numeradas en total. De ellas, 19 llevan `fuera de alcance — no crear`: son dudas médicas, genéticas o de escolarización reales y citadas, pero que Brincaluna no debe responder. **Preguntas accionables: 182** (98 con destino existente + 84 huérfanas).

---

## HUECOS — preguntas sin página que las responda

Las 84 preguntas huérfanas están **repartidas una sola vez cada una** entre los 10 huecos (sin dobles asignaciones que inflen la cuenta): 17+11+11+10+10+7+7+6+3+2 = **84**. La columna "Preguntas que absorbe" lleva los números exactos de fila para poder auditarlo.

| # | Hueco propuesto (slug) | Preguntas que absorbe | Intención dominante | Por qué merece página propia |
|---|---|---|---|---|
| 1 | `/guias/mi-bebe-no-gatea-juguetes-para-el-arrastre-y-el-gateo/` | **17** — #18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34 | informativa | El segundo cluster de demanda del nicho y el sitio **no tiene nada**: `/guias/juguetes-hipotonia-bebe/` para en el tummy time y `/motricidad-gruesa/` es un listado de producto, no una respuesta. Es el hilo más repetido del foro de Down España — "no se sienta", "no gatea", "no camina" — con la edad exacta dentro del título. Debe llevar tabla de hitos con **rango real** (Down21/Pueschel) para desactivar el pánico, y desembocar en producto: rulo, túnel, pelota grande, juguetes de arrastre, correpasillos. Puerta de entrada informativa nº2 durante todo el año, no estacional. |
| 2 | `/guias/juguete-para-cada-hito-del-desarrollo/` | **11** — #5, 8, 9, 10, 11, 12, 13, 45, 92, 96, 130 | informativa→transaccional | El hueco que ningún competidor cubre: **la gente pregunta por el HITO y nadie le contesta con el PRODUCTO**. Tabla hito → qué juguete → por qué (control cefálico, agarre y pinza, sedestación, arrastre, primeros pasos, apilar, encajar). Convierte el tráfico informativo de C1+C2+C5 en clic a ficha, y es la pieza que une los dos ejes que la web ya tiene (habilidad × etapa) y que hoy el usuario tiene que cruzar solo. Absorbe también las búsquedas de síntoma sin diagnóstico ("bebe muy blandito brazos caidos"), que hoy no tienen entrada. |
| 3 | `/guias/atencion-temprana-en-casa-que-puedo-hacer-yo/` | **11** — #89, 90, 91, 93, 94, 95, 97, 105, 106, 112, 113 | informativa | Todas las variantes de "¿cuándo empiezo?", "¿estimulación o atención temprana?", "¿existe un programa según la edad?" y el desgarrador "el médico dice que no es necesario, estoy desesperada". Hoy no hay página. El dato de Isidoro Candel es oro citable: se empieza **inmediatamente** tras el diagnóstico, el programa **no se ajusta por edad** sino por evaluación de todas las áreas, y **la familia es agente activo de la intervención**. Aquí encajan además las dos consultas de "cómo hacer juguetes de estimulación temprana" (DIY con material barato) y la vía Montessori. |
| 4 | `/guias/se-lo-lleva-todo-a-la-boca-y-tira-los-juguetes/` | **10** — #73, 74, 75, 76, 77, 78, 79, 84, 177, 178 | informativa | Cluster emocional puro y con una peculiaridad demoledora: **varios de estos hilos figuran con 0 respuestas**. Nadie del sector los ha contestado. `/guias/juguetes-sensoriales-seguros/` toca los mordedores de pasada, pero no responde "¿por qué lo hace?", "¿es solo una etapa?", "¿por qué tira los cubos en vez de apilarlos?". Emilio Ruiz (Down21) ya da la respuesta citable: es exploración normal que llega más tarde por maduración más lenta, no se recoge lo lanzado (refuerza la conducta) y se trabaja con el juego de "toma-dame". Sale solo hacia mordedores, pelotas sensoriales y encajables. |
| 5 | `/guias/juguetes-a-partir-de-5-anos-y-adolescentes/` | **10** — #50, 56, 57, 58, 59, 62, 134, 135, 136, 164 | transaccional | **Sesgo de edad detectado por los tres mineros**: el corpus y la web entera se concentran en 0-4 años, mientras Suggest pide explícitamente "5 años", "7 años" y "adolescentes", y el foro trae consultas de 6, 12 y 15 años (incluida la de comunicación aumentativa/SAAC). La etapa `/por-etapa/ya-juega-con-otros/` existe pero es un listado sin narrativa. Aquí manda la **dignidad estética** (que no parezca de bebé) y el juego con otros. Competencia casi nula. |
| 6 | `/guias/tarjetas-y-material-descargable-para-casa/` | **7** — #69, 166, 167, 168, 169, 174, 175 | transaccional | El puente comercial real que detectó el Minero B: **en el foro nadie pide "un juguete", piden "material"** — tarjetas de vocabulario, praxias en PDF, el método de lectura global (que la gente teclea literalmente como "metodo lectura global download pdf gratis"), páginas de juegos, ideas para verano. Demanda transaccional disfrazada de informativa. Descargable gratis como imán + venta del material físico (tarjetas, loto, imprimibles plastificados). Conecta con `/guias/leer-para-hablar-metodo-visual/`, que hoy explica el método pero no entrega el material. |
| 7 | `/guias/quitar-el-panal-vestirse-y-comer-solo/` | **7** — #38, 179, 180, 181, 182, 183, 184 | informativa | Autonomía es una categoría del sitio (`/autonomia-juego-simbolico/`) **sin ninguna guía detrás**. El foro trae siete consultas reales, dos de ellas sin respuesta de experto, y hay dato duro citable (control de vejiga 48 meses de media con intervalo 20-95; cuchara hacia los 20 meses; comer solo entre 2 y 3 años; cuchillo a los 7-8; habilidad adquirida = 80% de acierto). Producto asociado evidente: orinal con música — que una madre ya menciona haber comprado —, tableros de vestir, cubiertos adaptados, secuencias visuales. |
| 8 | `/guias/munecos-con-sindrome-de-down/` | **6** — #152, 153, 154, 155, 156, 157 | **transaccional** | Menos preguntas que los anteriores, pero **el mejor ratio esfuerzo/ingreso del documento**. Cobertura actual: cero. Cinco variantes distintas en Google Suggest (muñecos, muñecos bebés, reborn, Miniland, "en España") y todas son compra directa, una con marca dentro. El tipo `/tipo/munecos-peluches/` existe pero es genérico: no responde a "muñeco que representa a un niño con síndrome de Down", que es una compra con carga emocional (representación, que el niño se vea reflejado) y ticket alto. Además es el único cluster transaccional **no estacional** del corpus. |
| 9 | `/guias/jugar-en-familia-y-con-hermanos-juegos-cooperativos/` | **3** — #125, 126, 127 | transaccional | Down España destaca expresamente los **juegos de mesa cooperativos** (se juega juntos, no unos contra otros, sin discriminación) y la pregunta por la inclusión aparece en dos fuentes distintas. El tipo `/tipo/juegos-mesa/` existe pero no explica el criterio cooperativo, que es justo el argumento de venta. Encaja con abuelos y tíos (el público de `/regalos/`) y con la etapa 6+. |
| 10 | `/guias/atencion-temprana-por-comunidades/` (o bloque local dentro del hueco nº3) | **2** — #102, 103 | navegacional | Intención local recurrente en Suggest: "madrid" aparece pegado a atención temprana, a juguetes de estimulación y a regalo. Prioridad baja y no monetiza directo, pero un bloque "dónde pedir atención temprana en tu comunidad" con enlaces a las asociaciones federadas es señal E-E-A-T barata y un imán de enlaces entrantes desde esas mismas asociaciones. **No merece guía propia todavía**: nace como sección dentro del hueco nº3. |

---

## Insights

1. **La gente escribe el síntoma, no el diagnóstico ni el producto.** El 100% de las consultas de más valor empiezan por una observación literal: "bebe muy blandito brazos caidos", "no se sienta ni gatea", "entiende todo pero no habla", "todo lo prueba con la lengua", "todos sus juguetes los vota". Nadie teclea "juguete para trabajar la prensión palmar". El H1 y el primer párrafo de cada guía deben devolverle **su propia frase**; la palabra clínica (hipotonía, pinza digital, praxias) va después, como traducción — igual que ya hace bien `/guias/juguetes-hipotonia-bebe/` con "hipotonía = tono muscular bajo".

2. **Lo que da miedo es el tiempo, no la discapacidad.** Casi todas las consultas llevan **una edad exacta pegada** ("10 meses", "casi dos años", "cumple 3 años", "de 4 años", "12 años"). Lo que aterra al padre no es el síndrome, es ir tarde: "¿es normal q tarde tanto?", "estoy de cosolada", "estoy desesperada buscando ayudar a mi bebe". Contenido que funciona = **rango, no media**: "el control de vejiga llega de media a los 48 meses, con un intervalo real de 20 a 95 meses". El rango tranquiliza; la media sola culpabiliza. Y toda página con edad en la pregunta necesita la edad en el título.

3. **La confusión número uno es edad de la caja vs edad de desarrollo, y ya tiene guía — pero la gente no llega por ahí.** Nadie busca "edad de desarrollo vs edad cronológica": buscan "juguetes para niños con sindrome de down 5 años". La guía G3 es correcta pero es **destino, no puerta**. Hay que enlazarla desde dentro de las páginas de edad, no esperar que la encuentren. Segunda confusión, terminológica y muy repetida: "¿estimulación o atención temprana?" — dos palabras que el padre nuevo no distingue y que valen un H2 entero.

4. **Antes de comprar, lo que se pregunta es seguridad y "si le vendrá grande".** Los dos frenos previos al clic son: piezas pequeñas y atragantamiento (hay hasta un hilo de episodios de ahogo), y el miedo a frustrar al niño con un juguete demasiado difícil. Down España lo cierra con cuatro criterios (edad apropiada sin adelantar etapas, gustos del niño, reto sin exceso, seguridad con CE). Cada ficha de producto debería llevar, sin excusa, una línea de **"por qué es seguro"** y otra de **"qué tiene que saber hacer ya tu hijo para disfrutarlo"**.

5. **El transaccional del nicho está disfrazado de "material", y es estacional salvo en dos temas.** En el foro nadie pregunta "qué compro en Amazon": preguntan "dónde puedo **descargarme** tarjetas", "un buen **libro** de estimulación auditiva", "**material adaptado**", "**páginas** con juegos educativos". Traducción para el copy: la palabra que convierte en este nicho no es *juguete*, es **material**. Y la intención de compra pura solo se dispara en Navidad/Reyes (todos los artículos de regalo son de campaña) y en **muñecos con síndrome de Down**, que es transaccional durante todo el año y no lo cubre nadie.

6. **El competidor a batir es un solo sitio, y solo en un cluster.** `mihijonohabla.com` monopoliza el cluster habla con secciones-pregunta bien montadas, así que ahí no hay que pelear por la duda genérica sino por el ángulo que ellos no tienen: **el juguete concreto por objetivo** (soplo, praxias, imitación, canción con gestos). En el resto del mapa la competencia comercial es sorprendentemente débil: los blogs españoles de "top juguetes" son listados expositivos **sin una sola pregunta**, sin comentarios y sin FAQ. Un bloque de preguntas reales en cada ficha y cada hub se queda el hueco entero, y es exactamente lo que los motores generativos citan.
