import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

import styles from "./AlcanceSigPage.module.css";

export const metadata = {
  title:
    "Alcance del Sistema Integrado de Gestión | ANCOSUR",

  description:
    "Consulta el Alcance del Sistema Integrado de Gestión de ANCOSUR.",
};

export default function AlcanceSIGPage() {
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
          src="/politicas/sig-alcance.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="Alcance SIG ANCOSUR"
          className={styles.viewer}
        />
      </main>

      <Footer />
    </>
  );
}