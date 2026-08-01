import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

import styles from "./PoliticaSigPage.module.css";

export const metadata = {
  title:
    "Política del Sistema Integrado de Gestión | ANCOSUR",

  description:
    "Consulta la Política del Sistema Integrado de Gestión de ANCOSUR.",
};

export default function PoliticaSIGPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <BackButton
          href="/politicas"
          label="Volver"
          variant="dark"
        />

        <iframe
          src="/politicas/sig-politica.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="Política SIG ANCOSUR"
          className={styles.viewer}
        />
      </main>

      <Footer />
    </>
  );
}