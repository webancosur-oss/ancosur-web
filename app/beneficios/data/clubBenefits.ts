export type ClubBenefit = {
  category: string;
  name: string;
  discount: string;
  image: string;
  description: string;
  terms: string;
  termsHref: string;
};

export const clubBenefits: ClubBenefit[] = [
 // =========================================================
  // NUEVOS CONVENIOS
  // =========================================================

  {
    category: "Hogar",
    name: "La Grande",
    discount: "Beneficios exclusivos",
    image:
      "/assets/benefits/club/lagrande.webp",
    description:
      "Beneficios exclusivos en productos para dormitorio y hogar. Delivery gratuito en Huancayo para compras superiores a S/ 1,000 y beneficios especiales para activaciones de ANCOSUR.",
    terms:
      "Aplican términos y condiciones del convenio comercial entre La Grande y ANCOSUR.",
    termsHref:
      "/assets/benefits/terms/la-grande.pdf",
  },

  {
    category: "Tecnología / Hogar",
    name: "La Curacao",
    discount: "5%",
    image:
      "/assets/benefits/club/curacao.webp",
    description:
      "5% de descuento corporativo en electrodomésticos, tecnología, telefonía, línea blanca, muebles y equipamiento para el hogar.",
    terms:
      "Aplican los términos y condiciones del beneficio corporativo de La Curacao para clientes y colaboradores de ANCOSUR.",
    termsHref:
      "/assets/benefits/terms/la-curacao.pdf",
  },

  {
    category: "Decoración / Domótica",
    name: "DECORARQTE",
    discount: "Hasta 30%",
    image:
      "/assets/benefits/club/decorarqte.webp",
    description:
      "Hasta 30% de descuento en decoración y acabados, además de 10% en soluciones de domótica con asesoría personalizada e instalación gratuita.",
    terms:
      "Aplican los términos y condiciones del convenio entre DECORARQTE y ANCOSUR.",
    termsHref:
      "/assets/benefits/terms/decorarqte.pdf",
  },

  {
    category: "Restaurantes",
    name: "Mamá Panchita",
    discount: "10%",
    image:
      "/assets/benefits/club/mama-panchita.webp",
    description:
      "10% de descuento en toda su carta de carnes.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/mama-panchita.pdf",
  },

  {
    category: "Salud",
    name: "Clínica Dermatológica Roald",
    discount: "30%",
    image:
      "/assets/benefits/club/roald.webp",
    description:
      "30% de descuento en limpiezas faciales, terapia LED, depilación láser y consultas.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/dermatologica-roald.pdf",
  },

  {
    category: "Salud",
    name: "Estudio Dental Essana",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/essana.webp",
    description:
      "Consulta general gratis y descuentos especiales en tratamientos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/dental-essana.pdf",
  },

  {
    category: "Belleza / Bienestar",
    name: "Montalvo",
    discount: "20%",
    image:
      "/assets/benefits/club/montalvo.webp",
    description:
      "20% de descuento en estética, spa y barbería: cortes, tintes, masajes y más.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/montalvo.pdf",
  },

  {
    category: "Belleza / Bienestar",
    name: "Daphne Makeup",
    discount: "50%",
    image:
      "/assets/benefits/club/daphne-makeup.webp",
    description:
      "50% de descuento en maquillaje, peinado y manicure profesional.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/daphne-makeup.pdf",
  },

  {
    category: "Belleza / Bienestar",
    name: "Idola Spa",
    discount: "50%",
    image:
      "/assets/benefits/club/idola-spa.webp",
    description:
      "50% de descuento en cortes, tintes, alisados, masajes e hidratación capilar.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/idola-spa.pdf",
  },

  {
    category: "Alimentos y bebidas",
    name: "Sulpaa",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/sulpaa.webp",
    description:
      "Precios especiales en bebidas y productos seleccionados.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/sulpaa.pdf",
  },

  {
    category: "Regalos / Detalles",
    name: "Modo Detalle",
    discount: "20%",
    image:
      "/assets/benefits/club/modo-detalle.webp",
    description:
      "20% de descuento en ramos personalizados y delicados detalles de caja.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/modo-detalle.pdf",
  },

  {
    category: "Equipamiento",
    name: "Soluz",
    discount: "37%",
    image:
      "/assets/benefits/club/soluz.webp",
    description:
      "37% de descuento en cocinas empotradas y productos domésticos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/sololuz.pdf",
  },

  {
    category: "Agua / Recargas",
    name: "Aquady",
    discount: "Dsctos. exclusivos",
    image:
      "/assets/benefits/club/aquady.webp",
    description:
      "Precios especiales en bidones, recargas y packs de botellas.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/aquady.pdf",
  },

  {
    category: "Mascotas",
    name: "Jeldic",
    discount: "10%",
    image:
      "/assets/benefits/club/jeldic.webp",
    description:
      "10% de descuento en alimento para perros y gatos.",
    terms:
      "Aplican términos y condiciones según la marca aliada.",
    termsHref:
      "/assets/benefits/terms/jeldic.pdf",
  },

  
];