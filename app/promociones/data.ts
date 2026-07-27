export type CyberProject = {
  id: number;
  name: string;
  location: string;
  status: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

export const CYBER_HOUSE_START =
  "2026-07-18T10:00:00-05:00";

export const CYBER_HOUSE_END =
  "2026-07-18T17:00:00-05:00";

export const CYBER_HOUSE_DATE_LABEL =
  "Sábado 18 de julio de 2026";

export const CYBER_HOUSE_TIME_LABEL =
  "De 10:00 a. m. a 5:00 p. m.";

export const CYBER_HOUSE_LOCATION =
  "Av. San Carlos 1481, Huancayo";

export const cyberProjects: CyberProject[] = [
  {
    id: 1,
    name: "Neo Eterna",
    location:
      "San Antonio, Huancayo",
    status: "PREVENTA",
    description:
      "Departamentos modernos en zona universitaria, ideales para vivir o invertir.",
    image:
      "/assets/projects/tarjetas/eterna.webp",
    href: "/neo-eterna",
    tags: [
      "1 a 3 dormitorios",
      "Zona universitaria",
      "Alta demanda",
    ],
  },
  {
    id: 2,
    name: "Neo Xport",
    location:
      "Frente al Polideportivo Wanka",
    status: "PREVENTA",
    description:
      "Un proyecto diseñado para personas que buscan una vida activa y saludable.",
    image:
      "/assets/projects/tarjetas/xport.webp",
    href: "/neo-xport",
    tags: [
      "Estilo fitness",
      "Áreas deportivas",
      "10% de inicial",
    ],
  },
  {
    id: 3,
    name: "Neo Balto",
    location:
      "San Carlos, Huancayo",
    status: "LANZAMIENTO",
    description:
      "El proyecto pet-centric que considera a tu mascota parte de la familia.",
    image:
      "/assets/projects/tarjetas/balto.webp",
    href: "/neo-balto",
    tags: [
      "Pet-friendly",
      "Spa para mascotas",
      "Rooftop",
    ],
  },
  {
    id: 4,
    name: "Distrito San Carlos",
    location:
      "San Carlos, Huancayo",
    status: "EN VENTA",
    description:
      "Vive conectado con servicios, comercio y espacios comunes dentro de tu distrito.",
    image:
      "/assets/projects/tarjetas/distrito.webp",
    href:
      "/distrito-san-carlos",
    tags: [
      "Ciudad de 15 minutos",
      "Áreas comunes",
      "Zona comercial",
    ],
  },
  {
    id: 5,
    name: "Camino Real",
    location:
      "El Tambo, Huancayo",
    status: "LOTES",
    description:
      "Lotes con acceso, servicios y espacios pensados para construir tu futuro.",
    image:
      "/assets/projects/tarjetas/caminoreal.webp",
    href: "/camino-real",
    tags: [
      "Lotes urbanos",
      "Financiamiento",
      "El Tambo",
    ],
  },
  {
    id: 6,
    name: "Zagari Resort Club",
    location: "San Ramón",
    status: "EN CONSTRUCCIÓN",
    description:
      "Invierte en un resort club rodeado de naturaleza y más de 20 amenidades.",
    image:
      "/assets/projects/tarjetas/zagari.webp",
    href:
      "/zagari-resort-club",
    tags: [
      "Selva Central",
      "Más de 20 amenidades",
      "Lotes desde 246 m²",
    ],
  },
];
