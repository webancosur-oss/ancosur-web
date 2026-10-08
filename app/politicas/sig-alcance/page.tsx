import BackButton from "@/components/BackButton";
import { createSeoMetadata } from "@/src/seo";

import styles from "./AlcanceSigPage.module.css";

export const metadata = createSeoMetadata({
  title:
    "Alcance del Sistema Integrado de Gestión | Ancosur",

  description:
    "Consulta el Alcance del Sistema Integrado de Gestión de Ancosur.",

  pathname: "/politicas/sig-alcance",
});

export default function AlcanceSIGPage() {
  return (
    <>

      <main className={styles.page}>
        <BackButton
          href="/politicas"
          label="Volver"
          variant="dark"
        />

        <iframe
          src="/politicas/sig-alcance.pdfv2#toolbar=0&navpanes=0&scrollbar=1"
          title="Alcance SIG Ancosur"
          className={styles.viewer}
        />
      </main>

    </>
  );
}