export type TeamArea =
  | "Dirección"
  | "Administración y Finanzas"
  | "Comercial"
  | "Planeamiento, Proyectos y Obra"
  | "Marketing y Comunicaciones"
  | "Tecnología e Innovación"
  | "Experiencia del Cliente y Postventa"
  | "Logística y Servicios"
  | "Talento Humano"
  | "Seguridad";

export type TeamMemberBase = {
  id: number;
  name: string;
  position: string;
  phone: string;
  image: string;
};

export type TeamGroup = {
  area: TeamArea;
  members: TeamMemberBase[];
};

export type TeamMember = TeamMemberBase & {
  area: TeamArea;
};

export const teamGroups: TeamGroup[] = [
  {
    area: "Dirección",
    members: [
      {
        id: 1,
        name: "César Matamoros",
        position: "Gerente General",
        phone: "904 239 657",
        image: "/assets/colaboradores/cmatamoros.webp",
      },
    ],
  },
  {
    area: "Administración y Finanzas",
    members: [
      {
        id: 2,
        name: "Olinda Matamoros",
        position: "Gerente de Administración y Finanzas",
        phone: "957 402 888",
        image: "/assets/colaboradores/omatamoros.webp",
      },
      {
        id: 3,
        name: "Nayeli Pérez",
        position: "Analista Administrativo",
        phone: "938 710 397",
        image: "/assets/colaboradores/nperez.webp",
      },
      {
        id: 4,
        name: "Jasmyn Yauri",
        position: "Asistente General",
        phone: "949 871 510",
        image: "/assets/colaboradores/jyauri.webp",
      },
    ],
  },
  {
    area: "Comercial",
    members: [
      {
        id: 5,
        name: "Josep Heredia",
        position: "Jefe de Ventas",
        phone: "948 847 551",
        image: "/assets/colaboradores/jheredia.webp",
      },
      {
        id: 6,
        name: "Aldair Gonzales",
        position: "Asesor Inmobiliario",
        phone: "938 342 455",
        image: "/assets/colaboradores/agonzales.webp",
      },
      {
        id: 7,
        name: "Alicia Matamoros",
        position: "Asesora Inmobiliaria",
        phone: "964 017 870",
        image: "/assets/colaboradores/amatamoros.webp",
      },
      {
        id: 8,
        name: "Emilio Carrillo",
        position: "Asesor Inmobiliario",
        phone: "962 868 681",
        image: "/assets/colaboradores/ecarrillo.webp",
      },
      {
        id: 9,
        name: "Freddy Saez",
        position: "Asesor Inmobiliario",
        phone: "954 570 953",
        image: "/assets/colaboradores/fsaez.webp",
      },
      {
        id: 10,
        name: "Licceth Apaza",
        position: "Asesora Inmobiliaria",
        phone: "965 889 676",
        image: "/assets/colaboradores/lapaza.webp",
      },
      {
        id: 11,
        name: "Leslie Romero",
        position: "Asesora Inmobiliaria",
        phone: "907 088 871",
        image: "/assets/colaboradores/lromero.webp",
      },
      {
        id: 12,
        name: "Sandy Lizarraga",
        position: "Asesora Inmobiliaria",
        phone: "962 873 525",
        image: "/assets/colaboradores/slizarraga.webp",
      },
    ],
  },
  {
    area: "Planeamiento, Proyectos y Obra",
    members: [
      {
        id: 13,
        name: "Romy García",
        position: "Jefe de Proyectos",
        phone: "972 707 996",
        image: "/assets/colaboradores/rgarcia.webp",
      },
      {
        id: 14,
        name: "Joel Limas",
        position: "Jefe de Oficina Técnica",
        phone: "958 173 126",
        image: "/assets/colaboradores/jlimas.webp",
      },
      {
        id: 15,
        name: "Anthony Calderón",
        position: "Asistente de Oficina Técnica",
        phone: "975 936 688",
        image: "/assets/colaboradores/acalderon.webp",
      },
      {
        id: 16,
        name: "Fernando Laurente",
        position: "Asistente de Oficina Técnica",
        phone: "938 420 542",
        image: "/assets/colaboradores/flaurente.webp",
      },
      {
        id: 17,
        name: "Brayan Guerra",
        position: "Diseñador de Planos Técnicos",
        phone: "982 877 736",
        image: "/assets/colaboradores/bguerra.webp",
      },
      {
        id: 18,
        name: "Marcelo Barreto",
        position: "Diseñador Técnico",
        phone: "926 778 899",
        image: "/assets/colaboradores/mbarreto.webp",
      },
      {
        id: 19,
        name: "Enrique Pomayay",
        position: "Jefe de Planeamiento y Presupuesto",
        phone: "938 411 582",
        image: "/assets/colaboradores/epomayay.webp",
      },
      {
        id: 20,
        name: "Kamilo Santana",
        position: "Residente de Obra",
        phone: "939 585 681",
        image: "/assets/colaboradores/ksantana.webp",
      },
      {
        id: 21,
        name: "Wendy Taipe",
        position: "Arquitecta",
        phone: "966 253 873",
        image: "/assets/colaboradores/wtaipe.webp",
      },
    ],
  },
  {
    area: "Marketing y Comunicaciones",
    members: [
      {
        id: 22,
        name: "Juan Matamoros",
        position: "Director Creativo",
        phone: "982 592 612",
        image: "/assets/colaboradores/jmatamoros.webp",
      },
      {
        id: 23,
        name: "Margoth Peralta",
        position: "Jefe de Marketing",
        phone: "981 499 460",
        image: "/assets/colaboradores/mperalta.webp",
      },
      {
        id: 24,
        name: "Rafael Rosas",
        position: "Coordinador de Marketing",
        phone: "937 521 951",
        image: "/assets/colaboradores/rrosas.webp",
      },
      {
        id: 25,
        name: "Cielo Ortiz",
        position: "Relacionista Público",
        phone: "912 429 549",
        image: "/assets/colaboradores/cortiz.webp",
      },
      {
        id: 26,
        name: "Javier Taipe",
        position: "Diseñador Gráfico",
        phone: "927 088 904",
        image: "/assets/colaboradores/jtaipe.webp",
      },
      {
        id: 27,
        name: "Marlon Cosser",
        position: "Comunicador Audiovisual",
        phone: "960 870 080",
        image: "/assets/colaboradores/mcosser.webp",
      },
    ],
  },
  {
    area: "Tecnología e Innovación",
    members: [
      {
        id: 28,
        name: "William Puchoc",
        position: "Jefe de Tecnología de la Información",
        phone: "968 844 302",
        image: "/assets/colaboradores/wpuchoc.webp",
      },
      {
        id: 29,
        name: "Jean Quispe",
        position: "Jefe de Operaciones Tecnológicas",
        phone: "978 734 204",
        image: "/assets/colaboradores/jquispe.webp",
      },
      {
        id: 30,
        name: "Franz Cárdenas",
        position: "Ingeniero de Automatizaciones",
        phone: "919 507 887",
        image: "/assets/colaboradores/fcardenas.webp",
      },
      {
        id: 31,
        name: "Brayan Basurto",
        position: "Especialista Web",
        phone: "916 403 648",
        image: "/assets/colaboradores/bbasurto.webp",
      },
    ],
  },
  {
    area: "Experiencia del Cliente y Postventa",
    members: [
      {
        id: 32,
        name: "Anani Aliaga",
        position: "Jefe de Experiencia al Cliente",
        phone: "968 658 098",
        image: "/assets/colaboradores/aaliaga.webp",
      },
      {
        id: 33,
        name: "Samuel Aliaga",
        position: "Servicio de Post Venta",
        phone: "947 903 606",
        image: "/assets/colaboradores/saliaga.webp",
      },
      {
        id: 34,
        name: "Susan Alfaro",
        position: "Jefe de Gestión Documentaria",
        phone: "946 823 538",
        image: "/assets/colaboradores/salfaro.webp",
      },
    ],
  },
  {
    area: "Logística y Servicios",
    members: [
      {
        id: 35,
        name: "Adely Asto",
        position: "Jefe de Logística",
        phone: "970 706 459",
        image: "/assets/colaboradores/aasto.webp",
      },
      {
        id: 36,
        name: "Silvia Sánchez",
        position: "Conserje Neo Emperatriz",
        phone: "922 382 004",
        image: "/assets/colaboradores/ssanchez.webp",
      },
    ],
  },
  {
    area: "Talento Humano",
    members: [
      {
        id: 37,
        name: "Nataly Cano",
        position: "Jefe de Talento Humano",
        phone: "950 892 184",
        image: "/assets/colaboradores/ncano.webp",
      },
    ],
  },
  {
    area: "Seguridad",
    members: [
      {
        id: 38,
        name: "Allison Zorrilla",
        position: "Coordinador de Seguridad",
        phone: "925 109 049",
        image: "/assets/colaboradores/azorrilla.webp",
      },
      {
        id: 39,
        name: "Ruth Martínez",
        position: "Coordinador de Seguridad",
        phone: "940 518 231",
        image: "/assets/colaboradores/rmartinez.webp",
      },
    ],
  },
];

export const teamAreas: TeamArea[] = teamGroups.map((group) => group.area);

export const teamMembers: TeamMember[] = teamGroups.flatMap((group) =>
  group.members.map((member) => ({
    ...member,
    area: group.area,
  }))
);