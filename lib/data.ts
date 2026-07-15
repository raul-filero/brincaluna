/**
 * Capa de datos de Brincaluna.
 * Fuente: data/products.json (64 productos activos + 5 reservas),
 * consolidado desde los catálogos curados y VERIFICADOS en amazon.es
 * el 2026-07-14 (rating ≥4.0, ≥50 reseñas, sin ASINs inventados).
 */
import raw from "@/data/products.json";

export type Producto = {
  asin: string;
  titulo: string;
  url: string;
  precio_aprox: string | null;
  precio_estable: boolean;
  rating: number;
  num_resenas: number;
  edad_recomendada: string | null;
  categoria: string;
  subcategoria: string | null;
  etapas: string[];
  habilidad_frase: string | null;
  nota_seguridad: string | null;
  reserva: boolean;
  /** Tipo de juguete (eje C: peluche, puzzle, cocinita...). Slug de TIPOS. */
  tipo?: string | null;
  /** Slug propio del producto para su ficha /juguete/<slug>/. */
  slug: string;
};

/** Solo los productos activos: las reservas anti-stock no se publican. */
export const PRODUCTOS: Producto[] = (raw.products as Producto[]).filter((p) => !p.reserva);

/** Categorías de habilidad (eje A). Etiqueta en lenguaje de padre; keyword clínica en title/H2. */
export type Categoria = {
  slug: string;
  etiqueta: string;   // lo que ve el padre en el chip
  emoji: string;
  color: string;      // acento del chip (border-bottom)
  colorSoft: string;  // fondo hover / viñeta
  title: string;      // <title> SEO con la keyword clínica
  h1: string;
  intro: string;      // 2 frases easy-read: qué trabaja y por qué
};

export const CATEGORIAS: Categoria[] = [
  {
    slug: "motricidad-fina",
    etiqueta: "Para las manitas",
    emoji: "🖐",
    color: "#1E6B47",
    colorSoft: "#DFF5EC",
    title: "Juguetes de motricidad fina para síndrome de Down",
    h1: "Para las manitas",
    intro: "Juguetes que entrenan la pinza y la precisión. Manos más fuertes, sin frustración.",
  },
  {
    slug: "lenguaje-comunicacion",
    etiqueta: "Para hablar y comunicarse",
    emoji: "💬",
    color: "#8A6D00",
    colorSoft: "#FFF1CC",
    title: "Juguetes de lenguaje y logopedia · síndrome de Down",
    h1: "Para hablar y comunicarse",
    intro: "Soplo, juegos de boca, imágenes y música. Pequeños juegos que despiertan el habla.",
  },
  {
    slug: "sensoriales",
    etiqueta: "Para calmarse y los sentidos",
    emoji: "🌈",
    color: "#4A3FA3",
    colorSoft: "#ECE8FF",
    title: "Juguetes sensoriales para síndrome de Down",
    h1: "Para calmarse y los sentidos",
    intro: "Texturas, peso y sonidos suaves. Ayudan a explorar y a encontrar la calma.",
  },
  {
    slug: "motricidad-gruesa",
    etiqueta: "Para moverse",
    emoji: "🏃",
    color: "#FF6B4A",
    colorSoft: "#FFE1D8",
    title: "Juguetes de motricidad gruesa · hipotonía y síndrome de Down",
    h1: "Para moverse",
    intro: "Equilibrio, fuerza y ganas de andar. El movimiento que el tono muscular necesita.",
  },
  {
    slug: "aprender-jugando",
    etiqueta: "Para aprender jugando",
    emoji: "🧩",
    color: "#2368B8",
    colorSoft: "#E1EDFA",
    title: "Juegos educativos para síndrome de Down",
    h1: "Para aprender jugando",
    intro: "Puzzles, memoria e imágenes. Aprovechan su gran memoria visual.",
  },
  {
    slug: "autonomia-juego-simbolico",
    etiqueta: "Para el día a día",
    emoji: "🏠",
    color: "#2E9E6B",
    colorSoft: "#E8F3EC",
    title: "Juego simbólico y autonomía · síndrome de Down",
    h1: "Para el día a día",
    intro: "Vestirse, cocinar, imitar. Jugar a la vida real para ganar autonomía.",
  },
];

/** Etapas de desarrollo (eje B). Por hitos, no por edad de la caja. */
export type Etapa = {
  slug: string;
  etiqueta: string;
  emoji: string;
  rango: string;
  title: string;
  h1: string;
  intro: string;
};

export const ETAPAS: Etapa[] = [
  {
    slug: "primeros-meses",
    etiqueta: "Primeros meses",
    emoji: "🍼",
    rango: "0-12 m",
    title: "Juguetes de estimulación temprana · síndrome de Down (0-3)",
    h1: "Primeros meses",
    intro: "Alto contraste, agarres fáciles y juego boca abajo. La estimulación temprana empieza jugando.",
  },
  {
    slug: "primeros-pasos",
    etiqueta: "Primeros pasos",
    emoji: "👣",
    rango: "1-3 años",
    title: "Juguetes para niño con síndrome de Down 2 años",
    h1: "Primeros pasos",
    intro: "Correpasillos estables, encajes y causa-efecto. Cada paso cuenta.",
  },
  {
    slug: "pequeno-explorador",
    etiqueta: "Pequeño explorador",
    emoji: "🧭",
    rango: "3-6 años",
    title: "Juguetes para niño con síndrome de Down 3-5 años",
    h1: "Pequeño explorador",
    intro: "Lenguaje, puzzles y juego simbólico. La etapa de descubrirlo todo.",
  },
  {
    slug: "ya-juega-con-otros",
    etiqueta: "Ya juega con otros",
    emoji: "🤝",
    rango: "6+ años",
    title: "Juegos cooperativos · síndrome de Down (6+)",
    h1: "Ya juega con otros",
    intro: "Juegos de mesa cooperativos: con los demás, no contra los demás.",
  },
];

/** Tipos de juguete (eje C). Por forma del juguete, no por habilidad ni etapa. */
export type Tipo = {
  slug: string;
  etiqueta: string;   // nombre easy-read del tipo
  emoji: string;
  title: string;      // <title> SEO ≤60 chars
  intro: string;      // 1 frase easy-read: qué es y para qué sirve
};

export const TIPOS: Tipo[] = [
  {
    slug: "munecos-peluches",
    etiqueta: "Muñecos y peluches",
    emoji: "🧸",
    title: "Muñecos y peluches para niños con síndrome de Down",
    intro: "Muñecos y peluches para abrazar, cuidar e imitar la vida. Dan compañía y calma.",
  },
  {
    slug: "construccion-apilables",
    etiqueta: "Construcción y apilables",
    emoji: "🧱",
    title: "Juguetes de construcción · síndrome de Down",
    intro: "Piezas para apilar, encajar y construir. Trabajan las manos y la paciencia.",
  },
  {
    slug: "puzzles-encajes",
    etiqueta: "Puzzles y encajes",
    emoji: "🧩",
    title: "Puzzles y encajes para síndrome de Down",
    intro: "Piezas que buscan su hueco. Aprovechan su gran memoria visual.",
  },
  {
    slug: "manipulativos",
    etiqueta: "Manipulativos y plastilina",
    emoji: "✋",
    title: "Manipulativos y plastilina · síndrome de Down",
    intro: "Amasar, ensartar y pellizcar. Manos fuertes y dedos precisos, sin frustración.",
  },
  {
    slug: "juegos-mesa",
    etiqueta: "Juegos de mesa",
    emoji: "🎲",
    title: "Juegos de mesa para niños con síndrome de Down",
    intro: "Jugar por turnos con los demás. Enseñan a esperar, ganar y perder juntos.",
  },
  {
    slug: "musicales",
    etiqueta: "Musicales",
    emoji: "🎵",
    title: "Juguetes musicales para síndrome de Down",
    intro: "Sonidos, ritmo y canciones. La música despierta el habla y las ganas de moverse.",
  },
  {
    slug: "tarjetas-libros",
    etiqueta: "Tarjetas y libros",
    emoji: "📚",
    title: "Tarjetas y libros para síndrome de Down",
    intro: "Imágenes claras para nombrar el mundo. Empujan el lenguaje y el vocabulario.",
  },
  {
    slug: "pelotas-sensoriales",
    etiqueta: "Pelotas sensoriales",
    emoji: "🏐",
    title: "Pelotas sensoriales · síndrome de Down",
    intro: "Pelotas con texturas y colores. Invitan a tocar, rodar y moverse.",
  },
  {
    slug: "sonajeros-mordedores",
    etiqueta: "Sonajeros y mordedores",
    emoji: "🔔",
    title: "Sonajeros y mordedores · síndrome de Down",
    intro: "Para los más pequeños: agarrar, sonar y morder. Primeros juegos de manos y boca.",
  },
  {
    slug: "calma-peso",
    etiqueta: "Calma y peso",
    emoji: "🌙",
    title: "Juguetes de calma y peso · síndrome de Down",
    intro: "Peso suave y presión que abraza. Ayudan a relajarse y a encontrar la calma.",
  },
  {
    slug: "gimnasios-mantas",
    etiqueta: "Gimnasios y mantas de actividades",
    emoji: "🤸",
    title: "Gimnasios y mantas de actividades · Down",
    intro: "Un espacio blando para jugar boca abajo. La estimulación temprana empieza en el suelo.",
  },
  {
    slug: "movimiento-aire-libre",
    etiqueta: "Movimiento y aire libre",
    emoji: "🏃",
    title: "Movimiento y aire libre · síndrome de Down",
    intro: "Correr, empujar y trepar. El cuerpo gana fuerza y equilibrio jugando.",
  },
  {
    slug: "cocinitas-imitacion",
    etiqueta: "Cocinitas e imitación",
    emoji: "🍳",
    title: "Cocinitas e imitación · síndrome de Down",
    intro: "Cocinar, cuidar e imitar a los mayores. Jugar a la vida real gana autonomía.",
  },
  {
    slug: "soplo-habla",
    etiqueta: "Soplo y habla",
    emoji: "💨",
    title: "Juguetes de soplo y habla · síndrome de Down",
    intro: "Soplar, hacer pompas y jugar con la boca. Preparan los músculos del habla.",
  },
];

// ---------- helpers ----------

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function tipoPorSlug(slug: string): Tipo | undefined {
  return TIPOS.find((t) => t.slug === slug);
}

export function productosDeTipo(slug: string): Producto[] {
  return PRODUCTOS.filter((p) => p.tipo === slug);
}

export function productoPorSlug(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug);
}

export function etapaPorSlug(slug: string): Etapa | undefined {
  return ETAPAS.find((e) => e.slug === slug);
}

export function productosDeCategoria(slug: string): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria === slug);
}

export function productosDeEtapa(slug: string): Producto[] {
  return PRODUCTOS.filter((p) => p.etapas.includes(slug));
}

/** Hub Regalos: los identitarios (muñecos con rasgos) + cooperativos + top valorados. */
export function productosRegalos(): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria === "regalos");
}

/** Muñecos con rasgos de síndrome de Down (producto identitario). */
export function munecosConRasgos(): Producto[] {
  return PRODUCTOS.filter((p) => p.subcategoria === "munecos-con-rasgos");
}

/** Destacados de la home: 1 por categoría con más reseñas (prueba social). */
export function destacadosHome(n = 4): Producto[] {
  const out: Producto[] = [];
  for (const c of CATEGORIAS) {
    const top = productosDeCategoria(c.slug).sort((a, b) => b.num_resenas - a.num_resenas)[0];
    if (top) out.push(top);
    if (out.length === n) break;
  }
  return out;
}
