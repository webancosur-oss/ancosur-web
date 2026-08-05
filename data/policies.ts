export type PolicyItem = {
  id: number;
  title: string;
  description: string;
  featured?: boolean;

  /*
   * Usa pdf únicamente para documentos
   * que deben abrirse en el visor.
   */
  pdf?: string;

  /*
   * Usa href para documentos que todavía
   * tienen una página propia.
   */
  href?: string;
};

export const policies: PolicyItem[] = [
  {
    id: 1,
    title: "Política del SIG",
    description:
      "Consulta la Política del Sistema Integrado de Gestión de Ancosur.",
    pdf: "/assets/politicas/sig-politica.pdf",
    featured: true,
  },
  {
    id: 2,
    title: "Alcance del SIG",
    description:
      "Consulta el alcance del Sistema Integrado de Gestión de Ancosur.",
    pdf: "/assets/politicas/sig-alcance.pdf",
    featured: true,
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
      "Condiciones de uso de nuestros servicios y canales digitales.",
    href: "/politicas/terminos-y-condiciones",
  },
  {
    id: 5,
    title: "Política de Cookies",
    description:
      "Conoce cómo utilizamos cookies para mejorar tu experiencia de navegación.",
    href: "/politicas/cookies",
  },
];