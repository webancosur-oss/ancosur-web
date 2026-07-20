import {
  CheckCircleIcon,
  HandshakeIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import InvestorsLeadForm from "./InvestorsLeadForm";

import styles from "./InvestorsContact.module.css";

export default function InvestorsContact() {
  return (
    <section
      className={styles.section}
      id="formulario"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <HandshakeIcon
              size={18}
              weight="fill"
              aria-hidden="true"
            />

            Comienza a invertir
          </span>

          <h2>
            Déjanos tus datos y te contactaremos
          </h2>

          <p className={styles.description}>
            Un asesor de inversiones te brindará información sobre las
            opciones, condiciones y plazos disponibles.
          </p>

          <div className={styles.trustPoints}>
            <span>
              <CheckCircleIcon
                size={17}
                weight="fill"
                aria-hidden="true"
              />

              Atención personalizada
            </span>

            <span>
              <CheckCircleIcon
                size={17}
                weight="fill"
                aria-hidden="true"
              />

              Información clara
            </span>

            <span>
              <CheckCircleIcon
                size={17}
                weight="fill"
                aria-hidden="true"
              />

              Sin compromiso de inversión
            </span>
          </div>

          <InvestorsLeadForm />
        </div>

        <div className={styles.advisorBox}>

          <Image
            src="/assets/icons/inversor.png"
            alt="Asesor de inversiones ANCOSUR"
            width={520}
            height={620}
            className={styles.advisorImage}
          />
        </div>
      </div>
    </section>
  );
}