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
    "Inversionistas Ancosur | Inversión inmobiliaria en Huancayo",

  description:
    "Invierte en proyectos inmobiliarios de Ancosur en Huancayo con respaldo de activos tangibles, seguridad legal y oportunidades de rentabilidad.",

  pathname: "/inversionistas",

  keywords: [
    "inversionistas Ancosur",
    "inversión inmobiliaria Huancayo",
    "invertir en inmobiliaria",
    "invertir en proyectos inmobiliarios",
    "inversión en bienes raíces",
    "rentabilidad inmobiliaria",
    "inversión segura Huancayo",
    "desarrollo inmobiliario Huancayo",
    "activos inmobiliarios",
    "Ancosur",
    "Ancosur Inmobiliaria",
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