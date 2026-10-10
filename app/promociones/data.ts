/* =========================================================
   PROMOCIONES ANCOSUR

   Cada promoción tiene vigencia (startsAt / endsAt). La
   página muestra solo las vigentes y se regenera cada hora,
   así que una promoción vencida desaparece sola.

   Para publicar una nueva: agrega un objeto a `promotions`
   con su afiche en /public/assets/campanias/.
========================================================= */

export type PromotionBenefit = {
  title: string;
  description: string;
};

export type PromotionDetail = {
  label: string;
  value: string;
};

export type Promotion = {
  id: string;
  /* Texto corto para tarjetas, selector y CRM */
  name: string;
  /* Frase breve para la franja de la portada */
  teaser: string;
  kind: "evento" | "promocion";
  eyebrow: string;
  title: string;
  highlight: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  startsAt: string;
  endsAt: string;
  /* Texto visible de vigencia o fecha del evento */
  validityLabel: string;
  benefits: PromotionBenefit[];
  details: PromotionDetail[];
  primaryCta: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  whatsappMessage: string;
  legal: string;
};

export const WHATSAPP_NUMBER = "51971069763";

export const PROMOTIONS_PERIOD_LABEL =
  "Octubre 2026";

/* ---------------------------------------------------------
   SHOWROOM INMOBILIARIO
--------------------------------------------------------- */

export const SHOWROOM_START =
  "2026-10-17T11:00:00-05:00";

export const SHOWROOM_END =
  "2026-10-17T17:00:00-05:00";

export const SHOWROOM_DATE_LABEL =
  "Sábado 17 de octubre";

export const SHOWROOM_TIME_LABEL =
  "11:00 a. m. a 5:00 p. m.";

export const SHOWROOM_LOCATION =
  "Sala de ventas Ancosur";

export const SHOWROOM_ADDRESS =
  "Av. San Carlos 1481, Huancayo";

/* ---------------------------------------------------------
   LISTADO
--------------------------------------------------------- */

export const promotions: Promotion[] = [
  {
    id: "showroom",
    name: "Showroom de Halloween",
    teaser: "Sáb. 17 de octubre · 11 a. m. a 5 p. m.",
    kind: "evento",
    eyebrow: "Edición Halloween",
    title: "Showroom",
    highlight: "de miedo",
    summary:
      "Un showroom de terror: todos nuestros proyectos, asesoría y promociones en un solo lugar.",
    description:
      "Este 17 de octubre nuestra sala de ventas se viste de Halloween. Recorre las maquetas de todos nuestros proyectos, resuelve tus dudas con nuestros asesores y que lo único que te asuste sea seguir pagando alquiler.",
    image: "/assets/campanias/showroom-halloween.webp",
    imageAlt:
      "Showroom inmobiliario Ancosur edición Halloween, sábado 17 de octubre en la sala de ventas",
    imageWidth: 1080,
    imageHeight: 1080,
    startsAt: "2026-10-01T00:00:00-05:00",
    endsAt: SHOWROOM_END,
    validityLabel: SHOWROOM_DATE_LABEL,
    benefits: [
      {
        title: "Todos los proyectos",
        description:
          "Maquetas y asesoría de departamentos y lotes en un solo lugar.",
      },
      {
        title: "Promociones de octubre",
        description:
          "Conoce en persona los beneficios vigentes de cada proyecto.",
      },
    ],
    details: [
      { label: "Fecha", value: SHOWROOM_DATE_LABEL },
      { label: "Horario", value: SHOWROOM_TIME_LABEL },
      { label: "Lugar", value: SHOWROOM_ADDRESS },
    ],
    primaryCta: "Quiero asistir",
    secondaryCta: {
      label: "Ver proyectos",
      href: "/proyectos",
    },
    whatsappMessage:
      "Hola, quiero asistir al Showroom de Halloween de Ancosur del sábado 17 de octubre.",
    legal:
      "Ingreso libre. Te recomendamos separar tu visita para recibir atención personalizada.",
  },
  {
    id: "depaween",
    name: "Depaween",
    teaser: "Que el alquiler no te siga dando miedo",
    kind: "promocion",
    eyebrow: "Especial Halloween",
    title: "Que el alquiler",
    highlight: "no te siga dando miedo",
    summary:
      "Déjanos tus datos y descubre los departamentos y lotes que pueden convertirse en tu próximo hogar.",
    description:
      "Este octubre te ayudamos a dar el paso a tu casa propia. Déjanos tus datos y descubre los departamentos y lotes en las mejores ubicaciones de Huancayo.",
    image: "/assets/campanias/depaween.webp",
    imageAlt:
      "Campaña Depaween Ancosur: que el alquiler no te siga dando miedo",
    imageWidth: 1081,
    imageHeight: 1351,
    startsAt: "2026-10-01T00:00:00-05:00",
    endsAt: "2026-10-31T23:59:59-05:00",
    validityLabel: "Válido hasta el 31 de octubre",
    benefits: [
      {
        title: "Departamentos",
        description:
          "Proyectos en las mejores ubicaciones de Huancayo.",
      },
      {
        title: "Lotes",
        description:
          "Terrenos para construir tu casa a tu manera.",
      },
    ],
    details: [
      { label: "Campaña", value: "Depaween" },
      { label: "Para", value: "Departamentos y lotes" },
      { label: "Vigencia", value: "1 al 31 de octubre" },
    ],
    primaryCta: "Quiero mi casa propia",
    secondaryCta: {
      label: "Ver departamentos",
      href: "/departamentos",
    },
    whatsappMessage:
      "Hola, vi la campaña Depaween y quiero dejar de pagar alquiler. ¿Qué departamentos o lotes tienen?",
    legal:
      "Válido del 1 al 31 de octubre de 2026. Sujeto a disponibilidad y evaluación comercial de cada proyecto.",
  },
  {
    id: "familia-ancosur",
    name: "Beneficios Familia Ancosur",
    teaser: "Beneficios exclusivos al comprar tu lote o depa",
    kind: "promocion",
    eyebrow: "Familia Ancosur",
    title: "Compra tu lote o depa",
    highlight: "y accede a beneficios exclusivos",
    summary:
      "Al comprar con nosotros entras al Club de Beneficios: descuentos en 15 marcas aliadas.",
    description:
      "Por ser parte de la familia Ancosur, al comprar tu lote o departamento accedes al Club de Beneficios: descuentos exclusivos en hogar, decoración, salud y bienestar con nuestras marcas aliadas.",
    image: "/assets/campanias/familia-ancosur.webp",
    imageAlt:
      "Compra tu lote o depa con Ancosur y accede a beneficios exclusivos del Club de Beneficios",
    imageWidth: 1080,
    imageHeight: 1080,
    /* Promoción permanente */
    startsAt: "2026-01-01T00:00:00-05:00",
    endsAt: "2099-12-31T23:59:59-05:00",
    validityLabel: "Siempre disponible",
    benefits: [
      {
        title: "Hasta 50% en estética y spa",
        description: "Daphne Makeup e Idola Spa.",
      },
      {
        title: "Hasta 30% en decoración y acabados",
        description:
          "DECORARQTE, además de 10% en domótica.",
      },
      {
        title: "Hogar y tecnología",
        description:
          "10% al 15% en Sole y 5% en La Curacao.",
      },
    ],
    details: [
      { label: "Para", value: "Clientes Ancosur" },
      { label: "Aliados", value: "15 marcas" },
      { label: "Vigencia", value: "Permanente" },
    ],
    primaryCta: "Quiero ser parte",
    secondaryCta: {
      label: "Ver Club de Beneficios",
      href: "/beneficios/club-beneficios",
    },
    whatsappMessage:
      "Hola, quiero comprar un lote o departamento y conocer los beneficios de la familia Ancosur.",
    legal:
      "Beneficios para clientes de Ancosur. Los descuentos y condiciones dependen de cada marca aliada y pueden variar.",
  },
  {
    id: "viaje-cusco",
    name: "Viaje a Cusco",
    teaser: "Tu depa viene con un viaje a Cusco",
    kind: "promocion",
    eyebrow: "Sorteo",
    title: "Tu depa viene",
    highlight: "con un viaje a Cusco",
    summary:
      "Participa en el sorteo de un viaje a Cusco para dos personas.",
    description:
      "Compra tu departamento y participa en el sorteo de un viaje de 3 días y 2 noches a Cusco para 2 personas.",
    image: "/assets/campanias/campania_cusco.webp",
    imageAlt: "Sorteo de un viaje a Cusco con Ancosur",
    imageWidth: 1081,
    imageHeight: 1081,
    startsAt: "2026-06-01T00:00:00-05:00",
    endsAt: "2026-07-31T23:59:59-05:00",
    validityLabel: "Válido hasta el 31 de julio",
    benefits: [],
    details: [],
    primaryCta: "Participar ahora",
    whatsappMessage:
      "Hola, quiero información del sorteo del viaje a Cusco.",
    legal:
      "Campaña vigente hasta el 31 de julio de 2026.",
  },
  {
    id: "cyber-house",
    name: "Cyber House",
    teaser: "Atrapa tu hogar ideal",
    kind: "evento",
    eyebrow: "Evento inmobiliario",
    title: "Cyber House",
    highlight: "Atrapa tu hogar ideal",
    summary:
      "Beneficios exclusivos durante el evento en nuestra sala de ventas.",
    description:
      "Conoce nuestros proyectos y accede a beneficios exclusivos durante el evento.",
    image: "/assets/campanias/hero-cyber.webp",
    imageAlt: "Cyber House Ancosur",
    imageWidth: 1081,
    imageHeight: 1150,
    startsAt: "2026-07-01T00:00:00-05:00",
    endsAt: "2026-07-18T17:00:00-05:00",
    validityLabel: "Sábado 18 de julio",
    benefits: [],
    details: [],
    primaryCta: "Registrar mi asistencia",
    whatsappMessage:
      "Hola, quiero información del Cyber House.",
    legal: "Evento realizado el 18 de julio de 2026.",
  },
];

export function getActivePromotions(
  now: Date = new Date(),
): Promotion[] {
  const time = now.getTime();

  return promotions.filter(
    (promotion) =>
      new Date(promotion.startsAt).getTime() <= time &&
      time <= new Date(promotion.endsAt).getTime(),
  );
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------
   PROYECTOS PARA EL FORMULARIO
--------------------------------------------------------- */

export const formProjects: string[] = [
  "Neo Eterna",
  "Neo Xport",
  "Neo Balto",
  "Distrito San Carlos",
  "Camino Real",
  "Zagari Resort Club",
];
