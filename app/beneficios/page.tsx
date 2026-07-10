import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { benefits } from "@/data/benefits";
import styles from "./BeneficiosPage.module.css";

export const metadata = {
  title: "Beneficios ANCOSUR | Socio Referido, Club de Beneficios y Terrenos",
  description:
    "Conoce los programas de beneficios de ANCOSUR: Socio Referido, Club de Beneficios y Compramos tu Terreno.",
};

export default function BeneficiosPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Beneficios ANCOSUR</span>
            <h1>Programas pensados para clientes, propietarios e inversionistas</h1>
            <p>
              Más formas de ganar, ahorrar e invertir con ANCOSUR. Conoce
              nuestros beneficios y elige el programa que más se adapta a ti.
            </p>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <div className={styles.sectionHeader}>
            <span>Programas disponibles</span>
            <h2>Elige el beneficio que necesitas</h2>
          </div>

          <div className={styles.grid}>
            {benefits.map((benefit) => (
              <article key={benefit.id} className={styles.card}>
                <div className={styles.imageBox}>
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <span>{benefit.title}</span>
                  <h3>{benefit.shortDescription}</h3>
                  <p>{benefit.description}</p>

                  <a
                    href={benefit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {benefit.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <span>¿Quieres acceder a un beneficio?</span>
            <h2>Comunícate con nuestro equipo y recibe asesoría personalizada</h2>
            <p>
              Te ayudamos a resolver tus dudas sobre nuestros programas,
              beneficios y oportunidades inmobiliarias.
            </p>
          </div>

          <a
            href="https://wa.me/51971069763?text=Hola,%20quiero%20información%20sobre%20los%20beneficios%20ANCOSUR"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}