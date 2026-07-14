export type ProjectStatus =
  | "EN CONSTRUCCIÓN"
  | "ENTREGADO"
  | "PRE VENTA"
  | "LANZAMIENTO"
  | "ENTREGA INMEDIATA";

export type Project = {
  id: number;
  name: string;
  type: "Departamento" | "Lote" | "Resort" | "Casas";
  location?: string;
  status: ProjectStatus;
  image: string;
  href?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "Neo Rivera",
    type: "Departamento",
    location: "LA RIBERA – Jr. Dalias (Al costado del Parque La Rivera)",
    status: "PRE VENTA",
    image: "/assets/projects/rivera.webp",
    href: "/neo-rivera",
  },
  {
    id: 2,
    name: "Neo Balto",
    type: "Departamento",
    location: "Jr. San Agustín 416 (Cerca al Parque Allqu Park)",
    status: "PRE VENTA",
    image: "/assets/projects/balto.webp",
    href: "/neo-balto",
  },
  {
    id: 4,
    name: "Neo Eterna",
    type: "Departamento",
    location: "SAN CARLOS – Av. San Carlos Cdra 24 (Cerca a Universidades)",
    status: "PRE VENTA",
    image: "/assets/projects/eterna.webp",
    href: "/neo-eterna",
  },
  {
    id: 8,
    name: "Distrito San Carlos",
    type: "Departamento",
    location: "HUANCAYO – Jr. Chacabuco (A minutos del Obelisco)",
    status: "PRE VENTA",
    image: "/assets/projects/distrito.webp",
    href: "/distrito-san-carlos",
  },

  {
    id: 5,
    name: "Neo Emperatriz",
    type: "Departamento",
    location: "Av. San Carlos n°1481(Cerca a la Universidad Continental)",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/eterna.webp",
    href: "/neo-eterna",
  },
  {
    id: 12,
    name: "Las Colinas de Moro",
    type: "Lote",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/entregados/fachada-colinas-moro.webp",
    href: "/colinas-moro",
  },
  {
    id: 15,
    name: "Las Terrazas de Concepción",
    type: "Lote",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/entregados/fachada-terrazas-concepcion.webp",
    href: "terrazas-concepcion",
  },

  {
    id: 3,
    name: "Neo Xport",
    type: "Departamento",
    location: "SAN ANTONIO – Av. Chorillos (Frente al Polideportivo)",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/neo-xport.webp",
    href: "/neo-xport",
  },
  {
    id: 9,
    name: "Moro 416",
    type: "Departamento",
    location: "HUANCAYO – Av. Giráldez (Frente a Real Plaza)",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/moro.webp",
    href: "/moro-416",
  },
  {
    id: 10,
    name: "Camino Real",
    type: "Lote",
    location: "El Tambo",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/caminoreal.webp",
    href: "/camino-real",
  },
  {
    id: 11,
    name: "Zagari Resort Club",
    type: "Resort",
    location: "San Ramón",
    status: "EN CONSTRUCCIÓN",
    image: "/assets/projects/zagaari.webp",
    href: "https://zagari.pe/",
  },

  {
    id: 6,
    name: "Neo Origen",
    type: "Departamento",
    location: "EL TAMBO – Jr. Libertad 1187 (A minutos de Plaza Vea)",
    status: "ENTREGA INMEDIATA",
    image: "/assets/projects/origen.webp",
    href: "/neo-origen",
  },
  {
    id: 7,
    name: "Neo 18",
    type: "Departamento",
    location: "HUANCAYO – Av. San Carlos Cdra 24 (Cerca a la UPLA)",
    status: "ENTREGADO",
    image: "/assets/projects/18.webp",
    href: "/neo-18",
  },
  {
    id: 13,
    name: "Neo Emperatriz",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-neo-emperatriz.webp",
  },
  {
    id: 14,
    name: "Neo 18",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-neo18.webp",
  },
  {
    id: 16,
    name: "Alta luz",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-altaluz.webp",
  },
  {
    id: 17,
    name: "Serena",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-serena.webp",
  },
  {
    id: 18,
    name: "Vita",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-vita.webp",
  },
  {
    id: 19,
    name: "Zenda",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-zenda.webp",
  },
  {
    id: 20,
    name: "Adamant",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-adamant.webp",
  },
  {
    id: 21,
    name: "Dovle",
    type: "Departamento",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-dovle.webp",
  },
  {
    id: 22,
    name: "La Huerta Vista Alegre",
    type: "Lote",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/fachada-huerta.webp",
  },
  {
    id: 23,
    name: "+20 viviendas Unifamiliares",
    type: "Casas",
    status: "ENTREGADO",
    image: "/assets/projects/entregados/casas-uni.webp",
  },
];