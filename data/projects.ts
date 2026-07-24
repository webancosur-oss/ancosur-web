export type ProjectStatus =
  | "PRE VENTA"
  | "LANZAMIENTO"
  | "EN CONSTRUCCIÓN"
  | "ENTREGA INMEDIATA"
  | "ENTREGADO";

export type Project = {
  id: number;

  name: string;

  type: "Departamento" | "Lote" | "Resort" | "Casas";

  city: string;

  address: string;

  bedrooms: string;

  area: string;

  price: string;

  status: ProjectStatus;

  image: string;

  logo: string;

  href: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "Neo Rivera",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. Dalias - Parque La Rivera",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 42 m²",
    price: "S/ 269,900",
    status: "PRE VENTA",
    image: "/assets/projects/tarjetas/rivera.webp",
    logo: "/assets/projects/logos/rivera.webp",
    href: "/neo-rivera",
  },

  {
    id: 2,
    name: "Neo Balto",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. San Agustín 416",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 45 m²",
    price: "S/ 289,900",
    status: "PRE VENTA",
    image: "/assets/projects/tarjetas/balto.webp",
    logo: "/assets/projects/logos/balto.webp",
    href: "/neo-balto",
  },

  {
    id: 3,
    name: "Neo Xport",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. Chorrillos",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 63 m²",
    price: "S/ 359,900",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/tarjetas/xport.webp",
    logo: "/assets/projects/logos/xport.webp",
    href: "/neo-xport",
  },

  {
    id: 4,
    name: "Neo Eterna",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. San Carlos",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 43 m²",
    price: "S/ 279,900",
    status: "PRE VENTA",
    image: "/assets/projects/tarjetas/eterna.webp",
    logo: "/assets/projects/logos/eterna.webp",
    href: "/neo-eterna",
  },

  {
    id: 5,
    name: "Neo Emperatriz",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. San Carlos 1481",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 74 m²",
    price: "S/ 389,900",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/tarjetas/emperatriz.webp",
    logo: "/assets/projects/logos/emperatriz.webp",
    href: "/neo-emperatriz",
  },

  {
    id: 6,
    name: "Neo Origen",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. Libertad 1187",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 67 m²",
    price: "S/ 365,000",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/tarjetas/origen.webp",
    logo: "/assets/projects/logos/origen.webp",
    href: "/neo-origen",
  },
    {
    id: 7,
    name: "Distrito San Carlos",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. Chacabuco",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 45 m²",
    price: "S/ 295,000",
    status: "PRE VENTA",
    image: "/assets/projects/tarjetas/distrito.webp",
    logo: "/assets/projects/logos/distrito.webp",
    href: "/distrito-san-carlos",
  },

  {
    id: 8,
    name: "Moro 416",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. Giráldez",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 41 m²",
    price: "S/ 309,000",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/tarjetas/moro416.webp",
    logo: "/assets/projects/logos/moro416.webp",
    href: "/moro-416",
  },

  {
    id: 9,
    name: "Camino Real",
    type: "Lote",
    city: "El Tambo",
    address: "Huancayo",
    bedrooms: "-",
    area: "Desde 120 m²",
    price: "S/ 79,900",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/tarjetas/caminoreal.webp",
    logo: "/assets/projects/logos/caminoreal.webp",
    href: "/camino-real",
  },

  {
    id: 10,
    name: "Zagari Resort Club",
    type: "Resort",
    city: "San Ramón",
    address: "Chanchamayo",
    bedrooms: "Suites",
    area: "Desde 35 m²",
    price: "Consultar",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/tarjetas/zagari.webp",
    logo: "/assets/projects/logos/zagari.webp",
    href: "https://zagari.pe/",
  },

  {
    id: 11,
    name: "Las Colinas de Moro",
    type: "Lote",
    city: "Huancayo",
    address: "Huancayo",
    bedrooms: "-",
    area: "Desde 120 m²",
    price: "S/ 65,000",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/tarjetas/colinasdemoro.webp",
    logo: "/assets/projects/logos/colinas.webp",
    href: "/colinas-de-moro",
  },

  {
    id: 12,
    name: "Las Terrazas de Concepción",
    type: "Lote",
    city: "Concepción",
    address: "Junín",
    bedrooms: "-",
    area: "Desde 120 m²",
    price: "S/ 59,900",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/tarjetas/terrazas.webp",
    logo: "/assets/projects/logos/terrazas.webp",
    href: "/terrazas-concepcion",
  },
    {
    id: 13,
    name: "Neo Emperatriz",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "74 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-neo-emperatriz.webp",
    logo: "/assets/projects/logos/emperatriz.webp",
    href: "/neo-emperatriz",
  },

  {
    id: 14,
    name: "Neo 18",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 45 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-neo18.webp",
    logo: "/assets/projects/logos/neo18.webp",
    href: "/neo-18",
  },

  {
    id: 15,
    name: "Alta Luz",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 60 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-altaluz.webp",
    logo: "/assets/projects/logos/altaluz.webp",
    href: "/alta-luz",
  },

  {
    id: 16,
    name: "Serena",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 70 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-serena.webp",
    logo: "/assets/projects/logos/serena.webp",
    href: "/serena",
  },

  {
    id: 17,
    name: "Vita",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 70 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-vita.webp",
    logo: "/assets/projects/logos/vita.webp",
    href: "/vita",
  },

  {
    id: 18,
    name: "Zenda",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 68 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-zenda.webp",
    logo: "/assets/projects/logos/zenda.webp",
    href: "/zenda",
  },

  {
    id: 19,
    name: "Adamant",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 65 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-adamant.webp",
    logo: "/assets/projects/logos/adamant.webp",
    href: "/adamant",
  },

  {
    id: 20,
    name: "Dovle",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 65 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-dovle.webp",
    logo: "/assets/projects/logos/dovle.webp",
    href: "/dovle",
  },

  {
    id: 21,
    name: "La Huerta Vista Alegre",
    type: "Lote",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "-",
    area: "120 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-huerta.webp",
    logo: "/assets/projects/logos/huerta.webp",
    href: "/la-huerta-vista-alegre",
  },

  {
    id: 22,
    name: "+20 Viviendas Unifamiliares",
    type: "Casas",
    city: "Huancayo",
    address: "Proyecto Entregado",
    bedrooms: "3 Dorm.",
    area: "Desde 90 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/casas-uni.webp",
    logo: "/assets/projects/logos/casas.webp",
    href: "/viviendas-unifamiliares",
  },
];

