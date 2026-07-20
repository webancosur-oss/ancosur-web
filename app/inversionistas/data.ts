export type InvestorBenefit = {
  title: string;
  description: string;
};

export type InvestorStat =
  | {
      type: "stat";
      value: string;
      label: string;
      theme: "black" | "green";
    }
  | {
      type: "image";
      src: string;
      alt: string;
      position?: string;
    };

export const investorBenefits: InvestorBenefit[] = [
  {
    title: "Rentabilidad fija",
    description:
      "Hasta 15% anual estimado, con pagos anuales o al final del plazo.",
  },
  {
    title: "Sin comisiones",
    description:
      "No cobramos gastos administrativos ni de gestión por tu inversión.",
  },
  {
    title: "Seguridad legal",
    description:
      "Contrato de Mutuo Dinerario notariado y respaldo en activos inmobiliarios.",
  },
];

export const investorStats: InvestorStat[] = [
  {
    type: "stat",
    value: "+10 años",
    label: "de experiencia en el sector",
    theme: "black",
  },
  {
    type: "stat",
    value: "S/100 MM",
    label: "de capital invertido",
    theme: "green",
  },
  {
    type: "image",
    src: "/assets/projects/balto.webp",
    alt: "Proyecto inmobiliario ANCOSUR",
    position: "center",
  },
  {
    type: "stat",
    value: "+200",
    label: "propiedades en garantía",
    theme: "green",
  },
  {
    type: "image",
    src: "/assets/projects/moro.webp",
    alt: "Edificio inmobiliario ANCOSUR",
    position: "center",
  },
  {
    type: "stat",
    value: "9",
    label: "proyectos en ejecución",
    theme: "black",
  },
];

export const investmentOptions = [
  "Desde S/ 20,000",
  "Desde S/ 50,000",
  "Desde S/ 100,000",
  "Deseo asesoría personalizada",
];