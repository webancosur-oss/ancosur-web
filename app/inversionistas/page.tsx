import { createSeoMetadata } from "@/src/lib/seo";

import InvestorsBenefits from "./components/InvestorsBenefits";
import InvestorsContact from "./components/InvestorsContact";
import InvestorsHero from "./components/InvestorsHero";
import InvestorsStats from "./components/InvestorsStats";

import styles from "./InversionistasPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata = createSeoMetadata({
  title:
    "Inversionistas ANCOSUR | Inversión inmobiliaria en Huancayo",

  description:
    "Invierte en proyectos inmobiliarios de ANCOSUR en Huancayo con respaldo de activos tangibles, seguridad legal y oportunidades de rentabilidad.",

  pathname: "/inversionistas",

  keywords: [
    "inversionistas ANCOSUR",
    "inversión inmobiliaria Huancayo",
    "invertir en inmobiliaria",
    "invertir en proyectos inmobiliarios",
    "inversión en bienes raíces",
    "rentabilidad inmobiliaria",
    "inversión segura Huancayo",
    "desarrollo inmobiliario Huancayo",
    "activos inmobiliarios",
    "ANCOSUR",
    "ANCOSUR Inmobiliaria",
  ],

  image: "/opengraph-image.png",
});

/* =========================================================
   PÁGINA
========================================================= */

export default function InversionistasPage() {
  return (
    <main
      id="main-content"
      className={styles.page}
    >
      <InvestorsHero />

      <InvestorsBenefits />

      <InvestorsStats />

      <InvestorsContact />
    </main>
  );
}