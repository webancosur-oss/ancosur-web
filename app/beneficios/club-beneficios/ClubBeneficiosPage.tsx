"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

import { clubBenefits } from "../data/clubBenefits";
import styles from "./ClubBeneficiosPage.module.css";

export default function ClubBeneficiosPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.benefitsSection}>
          <div className={styles.header}>
            <span>BENEFICIOS EXCLUSIVOS</span>

            <h1>
              Disfruta tus beneficios
            </h1>

            <p>
              Presenta tu constancia de compra ANCOSUR
              y accede a promociones especiales.
            </p>
          </div>

          <div className={styles.grid}>
            {clubBenefits.map((item) => (
              <article
                key={item.name}
                className={styles.card}
              >
                <div className={styles.imageBox}>
                  <Image
                    src={item.image}
                    alt={`Beneficio ANCOSUR - ${item.name}`}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1050px) 50vw,
                      33vw
                    "
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <span>
                    {item.category}
                  </span>

                  <h2>
                    {item.name}
                  </h2>

                  <div className={styles.discount}>
                    <strong>
                      {item.discount}
                    </strong>

                    <small>
                      Beneficio ANCOSUR
                    </small>
                  </div>

                  <p>
                    {item.description}
                  </p>

                  {item.termsHref && (
                    <a
                      href={item.termsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver términos y condiciones
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}