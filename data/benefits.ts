export type Benefit = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  cta: string;
  href: string;
};

export const benefits: Benefit[] = [
  {
    id: 1,
    title: "Socio Referido",
    slug: "socio-referido",
    shortDescription: "Recomienda, conecta y gana beneficios con ANCOSUR.",
    description:
      "Si conoces a alguien que busca comprar un departamento, lote o invertir en un proyecto inmobiliario, puedes referirlo y acceder a beneficios especiales.",
    image: "/assets/benefits/socio.webp",
    cta: "Quiero referir",
    href: "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20Socio%20Referido",
  },
  {
    id: 2,
    title: "Club de Beneficios",
    slug: "club-beneficios",
    shortDescription:
      "Accede a descuentos, experiencias y alianzas exclusivas.",
    description:
      "Nuestros clientes forman parte de un club con beneficios especiales en marcas aliadas, servicios, experiencias y promociones pensadas para mejorar su estilo de vida.",
    image: "/assets/benefits/club.webp",
    cta: "Ver beneficios",
    href: "https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20el%20Club%20de%20Beneficios",
  },
  {
    id: 3,
    title: "Compramos tu Terreno",
    slug: "compramos-tu-terreno",
    shortDescription:
      "Si tienes un terreno con potencial inmobiliario, queremos conocerlo.",
    description:
      "Evaluamos terrenos estratégicos para futuros desarrollos inmobiliarios. Si cuentas con un terreno en una buena ubicación, puedes comunicarte con nuestro equipo.",
    image: "/assets/benefits/compra.webp",
    cta: "Ofrecer terreno",
    href: "https://wa.me/51971069763?text=Hola,%20tengo%20un%20terreno%20y%20quiero%20información",
  },
];