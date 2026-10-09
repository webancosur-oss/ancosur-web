import BackButton from "@/components/BackButton";
import { createSeoMetadata } from "@/src/seo";

import styles from "./PoliticaSigPage.module.css";

export const metadata = createSeoMetadata({
  title:
    "Política del Sistema Integrado de Gestión | Ancosur",

  description:
    "Consulta y descarga la Política del Sistema Integrado de Gestión (SIG) de Ancosur Inmobiliaria, empresa de proyectos inmobiliarios en Huancayo.",

  pathname: "/politicas/sig",
});

export default function PoliticaSIGPage() {
  return (
    <>

      <main className={styles.page}>
        <BackButton
          href="/politicas"
          label="Volver"
          variant="dark"
        />

        <iframe
          src="/assets/politicas/sig-politica.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="Política SIG Ancosur"
          className={styles.viewer}
        />
      </main>

    </>
  );
}