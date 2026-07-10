export type PolicyItem = {
  id: number;
  title: string;
  description: string;
  href: string;
  featured?: boolean;
};

export const policies: PolicyItem[] = [
  {
    id: 1,
    title: "Política SIG",
    description:
      "Conoce nuestra política del Sistema Integrado de Gestión.",
    href: "/politicas/politica-sig",
    featured: true,
  },
  {
    id: 2,
    title: "Alcance de SIG",
    description:
      "Revisa el alcance del Sistema Integrado de Gestión de ANCOSUR.",
    href: "/politicas/alcance-sig",
  },
  {
    id: 3,
    title: "Política de Privacidad",
    description:
      "Información sobre el tratamiento y protección de datos personales.",
    href: "/politicas/politica-de-privacidad",
  },
  {
    id: 4,
    title: "Términos y Condiciones",
    description:
      "Condiciones de uso de nuestros canales digitales y servicios.",
    href: "/politicas/terminos-y-condiciones",
  },
  {
    id: 5,
    title: "Política de Cookies",
    description:
      "Conoce cómo usamos cookies para mejorar tu experiencia de navegación.",
    href: "/politicas/cookies",
  },
];