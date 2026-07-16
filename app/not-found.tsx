import {
  ArrowLeftIcon,
  HouseIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div
        className={styles.backgroundNumber}
        aria-hidden={true}
      >
        404
      </div>

      <div
        className={styles.decoration}
        aria-hidden={true}
      >
        <span />
        <span />
        <span />
      </div>

      <section
        className={styles.content}
        aria-labelledby="not-found-title"
      >
        <Link
          href="/"
          className={styles.logoWrapper}
          aria-label="Ir al inicio de ANCOSUR Inmobiliaria"
        >
          <Image
            src="/assets/images/ancosur-logo-black.svg"
            alt="ANCOSUR Inmobiliaria"
            width={190}
            height={60}
            className={styles.logo}
            priority
          />
        </Link>

        <span className={styles.eyebrow}>
          Error 404
        </span>

        <h1 id="not-found-title">
          Esta página no está disponible
        </h1>

        <p>
          Es posible que el enlace haya cambiado, que el proyecto ya no se
          encuentre en esta dirección o que la ruta haya sido escrita
          incorrectamente.
        </p>

        <div className={styles.actions}>
          <Link
            href="/"
            className={styles.primaryButton}
          >
            <HouseIcon
              size={19}
              weight="fill"
              aria-hidden={true}
            />

            Volver al inicio
          </Link>

          <Link
            href="/#proyectos"
            className={styles.secondaryButton}
          >
            Ver proyectos

            <ArrowLeftIcon
              size={18}
              weight="bold"
              className={styles.projectArrow}
              aria-hidden={true}
            />
          </Link>
        </div>

        <div className={styles.help}>
          <span>
            ¿Buscas información sobre un proyecto?
          </span>

          <a
            href="https://wa.me/51971069763?text=Hola%2C%20vengo%20de%20la%20web%20de%20ANCOSUR%20y%20necesito%20informaci%C3%B3n"
            target="_blank"
            rel="noreferrer"
          >
            Comunícate con un asesor
          </a>
        </div>
      </section>
    </main>
  );
}