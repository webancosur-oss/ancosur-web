export type FactItem = {
  label: string;
  value: string;
};

export type DetailItem = {
  label: string;
  value: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type LotOption = {
  id: string;
  name: string;
  area: string;
  initialPayment: string;
  description: string;
  image: string;
};

export type CommonArea = {
  id: string;
  title: string;
  description: string;
  image: string;
};

/* =========================================================
   CONTACTO Y DOCUMENTOS
========================================================= */

export const whatsappCaminoReal =
  "https://wa.me/51971069763?text=Hola%2C%20vengo%20de%20la%20web%20de%20ANCOSUR%20y%20quiero%20informaci%C3%B3n%20sobre%20Camino%20Real";

export const brochureCaminoReal =
  "/assets/docs/brochure/camino-real-brochure.pdf";

/* =========================================================
   HERO
========================================================= */

export const hero = {
  logo: "/assets/images/camino-real.svg",

  image:
    "/assets/projects/sliders/caminoreal.webp",
  status: "En construcción",

  title:
    "Invierte en un lote con respaldo y proyección en El Tambo",
};

/* =========================================================
   DATOS PRINCIPALES
========================================================= */

export const facts: FactItem[] = [
  {
    label: "Ubicación",
    value: "El Tambo · Av. Circuito Huaytapallana",
  },
  {
    label: "Área",
    value: "Desde 90 m²",
  },
  {
    label: "Inicial",
    value: "Desde S/ 12,000",
  },
];

/* =========================================================
   DETALLES DEL PROYECTO
========================================================= */

export const details: DetailItem[] = [
  {
    label: "Estado",
    value: "En construcción",
  },
  {
    label: "Tipo de proyecto",
    value: "Urbanización completa",
  },
  {
    label: "Documentación",
    value: "Título de propiedad",
  },
  {
    label: "Habilitación",
    value: "Habilitación urbana aprobada",
  },
  {
    label: "Servicios",
    value: "Servicios básicos",
  },
  {
    label: "Amenidades",
    value: "Parques, parrillas y pórtico de ingreso",
  },
];

/* =========================================================
   DESCRIPCIÓN
========================================================= */

export const projectDescription = {
  eyebrow: "Camino Real Residencial",

  title:
    "Un proyecto pensado para construir patrimonio con seguridad",

  introduction:
    "En un mercado saturado de promesas, Camino Real te ofrece realidades. Olvídate de terrenos sin futuro o con problemas legales.",

  paragraphs: [
    "Ubicado en El Tambo, Camino Real es un proyecto de urbanización completa diseñado para quienes buscan transparencia, seguridad jurídica y una revalorización progresiva.",

    "Cuenta con habilitación urbana aprobada, título de propiedad, servicios básicos, áreas de aporte y espacios comunes para disfrutar en familia.",

    "Una oportunidad para adquirir un lote desde 90 m² en una zona con crecimiento urbano y nuevas obras de infraestructura.",
  ],
};

/* =========================================================
   OPCIONES DE LOTES
========================================================= */

export const lotOptions = [
  {
    id: "lote-camino-real-90",

    name: "Lote desde 90 m²",

    area: "Desde 90 m²",

    tag: "Inicial desde S/ 12,000",

    description:
      "Una opción funcional para construir tu futura vivienda o realizar una inversión inmobiliaria dentro de una urbanización completa.",

    image:
      "/assets/projects/camino-real/lots/lote-desde-90.webp",
  },
  {
    id: "lote-camino-real-178",

    name: "Lote hasta 178 m²",

    area: "Hasta 178 m²",

    tag: "Mayor amplitud",

    description:
      "Un terreno con mayor espacio para desarrollar una vivienda amplia, áreas exteriores y ambientes adaptados a las necesidades de tu familia.",

    image:
      "/assets/projects/camino-real/lots/lote-hasta-178.webp",
  },
];

/* =========================================================
   BENEFICIOS
========================================================= */

export const benefits: BenefitItem[] = [
  {
    id: "titulo-propiedad",

    title: "Título de propiedad",

    description:
      "Adquiere un lote con documentación que respalda legalmente tu inversión.",
  },
  {
    id: "habilitacion-urbana",

    title: "Habilitación urbana",

    description:
      "Proyecto con habilitación urbana aprobada para un desarrollo ordenado.",
  },
  {
    id: "areas-aporte",

    title: "Áreas de aporte",

    description:
      "Espacios destinados para futuros servicios de educación, salud y equipamiento urbano.",
  },
  {
    id: "servicios-basicos",

    title: "Servicios básicos",

    description:
      "Urbanización preparada para brindar los servicios necesarios a sus propietarios.",
  },
  {
    id: "parques-amenidades",

    title: "Parques y amenidades",

    description:
      "Áreas comunes creadas para compartir, descansar y disfrutar en familia.",
  },
];

/* =========================================================
   ÁREAS COMUNES
========================================================= */

export const commonAreas: CommonArea[] = [
  {
    id: "zona-parrillas",

    title: "Zona de parrillas",

    description:
      "Un espacio al aire libre para compartir reuniones y momentos especiales.",

    image:
      "/assets/projects/camino-real/amenities/zona-parrillas.webp",
  },
  {
    id: "parques-equipados",

    title: "Parques equipados",

    description:
      "Áreas verdes y recreativas pensadas para toda la familia.",

    image:
      "/assets/projects/camino-real/amenities/parques-equipados.webp",
  },
  {
    id: "portico-ingreso",

    title: "Pórtico de ingreso",

    description:
      "Un acceso principal que identifica y jerarquiza el proyecto residencial.",

    image:
      "/assets/projects/camino-real/amenities/portico-ingreso.webp",
  },
];

/* =========================================================
   VIDEO
========================================================= */

export const projectMedia = {
  poster:
    "/assets/projects/camino-real/media/portada-camino-real.webp",

  video:
    "/assets/projects/camino-real/media/camino-real.mp4",

  badge: "Conoce el proyecto",

  title:
    "Camino Real: una inversión con futuro",

  description:
    "Conoce la ubicación, avances, documentación y espacios comunes del proyecto.",
};

/* =========================================================
   UBICACIÓN
========================================================= */

export const locationCaminoReal = {
  eyebrow: "Ubicación estratégica",

  title: "Tu futuro lote te espera en El Tambo",

  description:
    "Camino Real se encuentra en una zona con crecimiento urbano y proyección de valorización, cerca de nuevas obras de infraestructura vial.",

  legalStatus: {
    label: "Respaldo legal",
    value: "Título de propiedad",
  },

  development: {
    label: "Tipo de proyecto",
    value: "Urbanización completa",
  },

  district: "El Tambo",

  city: "Huancayo",

  projectAddress:
    "Av. Circuito Turístico Huaytapallana, El Tambo",

  projectReference:
    "Ubicado en el sector del Circuito Turístico Huaytapallana, en una zona con crecimiento urbano y nuevas vías.",

  googleMapsQuery:
    "Avenida Circuito Turístico Huaytapallana, El Tambo, Huancayo, Junín, Perú",

  officeAddress:
    "Av. San Carlos 1481, San Antonio, Huancayo",

  schedule:
    "Lunes a sábado, de 8:00 a. m. a 6:00 p. m.",
};

/* =========================================================
   FORMULARIO
========================================================= */

export const projectFormData = {
  projectName: "Camino Real",

  source: "camino-real-page",

  title: "Quiero información de Camino Real",

  description:
    "Completa tus datos y un asesor te brindará precios, disponibilidad y formas de pago.",

  interestOptions: [
    {
      value: "camino-real-lote",
      label: "Lote desde 90 m²",
    },
    {
      value: "camino-real-financiamiento",
      label: "Opciones de financiamiento",
    },
    {
      value: "camino-real-visita",
      label: "Agendar una visita",
    },
    {
      value: "camino-real-inversion",
      label: "Comprar para inversión",
    },
    {
      value: "camino-real-asesoria",
      label: "Asesoría personalizada",
    },
  ],
};

/* =========================================================
   SEO
========================================================= */

export const seoCaminoReal = {
  title:
    "Camino Real | Lotes en El Tambo desde 90 m²",

  description:
    "Conoce Camino Real Residencial, proyecto de lotes en El Tambo desde 90 m², con título de propiedad, habilitación urbana, servicios básicos y áreas comunes.",

  keywords: [
    "Camino Real",
    "lotes en El Tambo",
    "lotes en Huancayo",
    "terrenos en El Tambo",
    "lotes desde 90 m2",
    "Circuito Turístico Huaytapallana",
    "urbanización en Huancayo",
    "lotes ANCOSUR",
  ],

  openGraphImage:
    "/assets/projects/camino-real/hero/hero-camino-real.webp",
};

export const disclaimerCaminoReal =
  "Todas las imágenes, planos, medidas, áreas, precios y elementos decorativos son referenciales y pueden presentar modificaciones durante el desarrollo y comercialización del proyecto. La disponibilidad y las condiciones comerciales deben confirmarse con un asesor.";