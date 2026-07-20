import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import InvestorsBenefits from "./components/InvestorsBenefits";
import InvestorsContact from "./components/InvestorsContact";
import InvestorsHero from "./components/InvestorsHero";
import InvestorsStats from "./components/InvestorsStats";

import styles from "./InversionistasPage.module.css";

export const metadata: Metadata = {
  title:
    "Inversionistas ANCOSUR | Invierte en el desarrollo inmobiliario",
  description:
    "Invierte en el desarrollo inmobiliario de Huancayo con respaldo de activos tangibles, rentabilidad fija y seguridad legal.",
};

export default function InversionistasPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <InvestorsHero />
        <InvestorsBenefits />
        <InvestorsStats />
        <InvestorsContact />
      </main>

    </>
  );
}