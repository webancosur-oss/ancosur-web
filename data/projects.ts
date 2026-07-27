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
  logo?: string;
  href: string;
};

const deliveredWhatsapp =
  "https://wa.me/51971069763?text=Hola%2C%20vengo%20de%20la%20web%20de%20ANCOSUR.%20Estaba%20revisando%20sus%20proyectos%20entregados%20y%20quiero%20conocer%20los%20proyectos%20que%20actualmente%20tienen%20disponibilidad%20para%20vivir%20o%20invertir.";

export const projects: Project[] = [
  /*==================================================
    PROYECTOS DISPONIBLES
  ==================================================*/

  {
    id: 1,
    name: "Neo Rivera",
    type: "Departamento",
    city: "LA RIBERA – ",
    address: "Jr. Dalias (Al costado del Parque La Rivera)",
    bedrooms: "2 Dorm.",
    area: "Desde 57.10 m²",
    price: "S/ 229,170",
    status: "PRE VENTA",
    image: "/assets/projects/rivera.webp",
    logo: "/assets/images/neo-rivera.svg",
    href: "/neo-rivera",
  },

  {
    id: 2,
    name: "Neo Balto",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. San Agustín 416",
    bedrooms: "2 Dorm.",
    area: "Desde 43 m²",
    price: "S/ 191,300",
    status: "PRE VENTA",
    image: "/assets/projects/balto.webp",
    logo: "/assets/images/neo-balto.svg",
    href: "/neo-balto",
  },

  {
    id: 3,
    name: "Neo Xport",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. Chorrillos",
    bedrooms: "2 Dorm.",
    area: "Desde 67.84 m²",
    price: "S/ 228,755",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/xport.webp",
    logo: "/assets/images/neo-xport.svg",
    href: "/neo-xport",
  },

  {
    id: 4,
    name: "Neo Eterna",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. San Carlos",
    bedrooms: "3 Dorm.",
    area: "Desde 76.15 m²",
    price: "S/ 311,292",
    status: "PRE VENTA",
    image: "/assets/projects/eterna.webp",
    logo: "/assets/images/neo-eterna.svg",
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
    price: "Consultar",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/emperatriz.webp",
    logo: "/assets/images/neo-emperatriz.svg",
    href: "/neo-emperatriz",
  },

  {
    id: 6,
    name: "Neo Origen",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. Libertad 1187",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 33 m²",
    price: "S/ 149,560",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/origen.webp",
    logo: "/assets/images/neo-origen.svg",
    href: "/neo-origen",
  },

  {
    id: 7,
    name: "Distrito San Carlos",
    type: "Departamento",
    city: "Huancayo",
    address: "Jr. Chacabuco",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 54.24 m²",
    price: "S/ 226,863",
    status: "PRE VENTA",
    image: "/assets/projects/distrito.webp",
    logo: "/assets/images/distrito-sancarlos.svg",
    href: "/distrito-san-carlos",
  },

  {
    id: 8,
    name: "Moro 416",
    type: "Departamento",
    city: "Huancayo",
    address: "Av. Giráldez",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 33 m²",
    price: "S/ 207,900",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/moro.webp",
    logo: "/assets/images/moro416.svg",
    href: "/moro416",
  },

  {
    id: 9,
    name: "Camino Real",
    type: "Lote",
    city: "El Tambo",
    address: "Huancayo",
    bedrooms: "Lote",
    area: "Desde 90 m²",
    price: "S/ 130,000",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/caminoreal.webp",
    logo: "/assets/images/camino-real.svg",
    href: "/camino-real",
  },

  {
    id: 10,
    name: "Zagari Resort Club",
    type: "Resort",
    city: "San Ramón",
    address: "Chanchamayo",
    bedrooms: "Lote",
    area: "Desde 300 m²",
    price: "S/ 82,185.54",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/zagari.webp",
    logo: "/assets/images/zagari.svg",
    href: "https://zagari.pe/",
  },

  {
    id: 11,
    name: "Las Colinas de Moro",
    type: "Lote",
    city: "Huancayo",
    address: "Huancayo",
    bedrooms: "Lote",
    area: "Desde 90 m²",
    price: "S/ 44,144",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/colinas.webp",
    logo: "/assets/images/colinas-de-moro.svg",
    href: "/colinas-de-moro",
  },

  {
    id: 12,
    name: "Las Terrazas de Concepción",
    type: "Lote",
    city: "Concepción",
    address: "Junín",
    bedrooms: "Lote",
    area: "Desde 82 m²",
    price: "S/ 18,000",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/terrazas.webp",
    logo: "/assets/images/las-terrazas-de-concepcion.svg",
    href: "/terrazas-concepcion",
  },

  /*==================================================
    PROYECTOS ENTREGADOS
  ==================================================*/


  {
    id: 13,
    name: "Neo 18",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "1, 2 y 3 Dorm.",
    area: "Desde 45 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-neo18.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 14,
    name: "Alta Luz",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 60 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-altaluz.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 15,
    name: "Serena",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 70 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-serena.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 16,
    name: "Vita",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 70 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-vita.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 17,
    name: "Zenda",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 68 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-zenda.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 18,
    name: "Adamant",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 65 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-adamant.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 19,
    name: "Dovle",
    type: "Departamento",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "2 y 3 Dorm.",
    area: "Desde 65 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-dovle.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 20,
    name: "La Huerta Vista Alegre",
    type: "Lote",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "Lote",
    area: "120 m²",
    price: "Entregado",
    status: "ENTREGADO",
    logo: "/assets/images/huerta.svg",
    image: "/assets/projects/entregados/fachada-huerta.webp",
    href: deliveredWhatsapp,
  },

  {
    id: 21,
    name: "+20 Viviendas Unifamiliares",
    type: "Casas",
    city: "Huancayo",
    address: "Proyecto entregado",
    bedrooms: "3 Dorm.",
    area: "Desde 90 m²",
    price: "Entregado",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/casas-uni.webp",
    href: deliveredWhatsapp,
  },
];