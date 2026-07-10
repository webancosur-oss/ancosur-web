export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "invertir-en-huancayo",
    title: "¿Por qué invertir en departamentos en Huancayo?",
    excerpt:
      "Conoce las ventajas de invertir en una ciudad en crecimiento y con alta demanda inmobiliaria.",
    category: "Inversión",
    date: "11/07/2026",
    image: "/assets/images/blog/blog-inversion.webp",
    content: [
      "Huancayo es una ciudad con crecimiento constante, mayor demanda de vivienda y nuevas oportunidades de inversión.",
      "Invertir en un departamento puede ayudarte a generar patrimonio, obtener rentabilidad por alquiler o asegurar una vivienda para tu familia.",
      "La ubicación, el respaldo de la inmobiliaria y la etapa del proyecto son factores importantes antes de tomar una decisión.",
    ],
  },
  {
    slug: "primer-departamento",
    title: "Cómo elegir tu primer departamento",
    excerpt:
      "Ubicación, financiamiento, distribución y respaldo: claves antes de comprar.",
    category: "Guía de compra",
    date: "11/07/2026",
    image: "/assets/images/blog/blog-primer-depa.webp",
    content: [
      "Comprar tu primer departamento es una decisión importante. Por eso debes evaluar ubicación, precio, distribución y financiamiento.",
      "También es clave revisar el avance del proyecto, la experiencia de la inmobiliaria y los beneficios disponibles.",
    ],
  },
  {
    slug: "vivir-cerca-de-todo",
    title: "Beneficios de vivir cerca de todo",
    excerpt:
      "Vivir conectado mejora tu tiempo, comodidad y calidad de vida.",
    category: "Estilo de vida",
    date: "11/07/2026",
    image: "/assets/images/blog/blog-ubicacion.webp",
    content: [
      "Vivir cerca de colegios, universidades, comercios y avenidas principales mejora tu rutina diaria.",
      "Una buena ubicación también puede aumentar el valor de tu propiedad con el tiempo.",
    ],
  },
];