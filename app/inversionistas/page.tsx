import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./InversionistasPage.module.css";

export const metadata = {
  title: "Inversionistas ANCOSUR | Invierte en el desarrollo inmobiliario",
  description:
    "Invierte en el desarrollo inmobiliario de Huancayo con respaldo de activos tangibles, rentabilidad fija y seguridad legal.",
};

const benefits = [
  {
    title: "Rentabilidad fija",
    description:
      "Hasta 15% anual estimado, con pagos anuales o al final del plazo.",
  },
  {
    title: "Sin comisiones",
    description:
      "No cobramos gastos administrativos ni de gestión por tu inversión.",
  },
  {
    title: "Seguridad legal",
    description:
      "Contrato de Mutuo Dinerario notariado y respaldo en activos inmobiliarios.",
  },
];

export default function InversionistasPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span>Inversionistas ANCOSUR</span>
            <h1>¿Por qué invertir en ANCOSUR?</h1>
            <p>
              Invierte en el desarrollo inmobiliario de Huancayo con respaldo de
              activos tangibles y una rentabilidad superior a la banca
              tradicional.
            </p>
          </div>
        </section>

        <section className={styles.benefitsBar}>
          {benefits.map((item) => (
            <article key={item.title} className={styles.benefitItem}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <article className={`${styles.statCard} ${styles.blackCard}`}>
              <strong>+10 Años</strong>
              <span>de experiencia en el sector</span>
            </article>

            <article className={`${styles.statCard} ${styles.greenCard}`}>
              <strong>S/100 MM</strong>
              <span>de capital invertido</span>
            </article>

            <div className={styles.imageCard}>
              <Image
                src="/assets/projects/balto.webp"
                alt="Proyecto inmobiliario ANCOSUR"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.cardImage}
              />
            </div>

            <article className={`${styles.statCard} ${styles.greenCard}`}>
              <strong>+200</strong>
              <span>propiedades en garantía</span>
            </article>

            <div className={styles.imageCard}>
              <Image
                src="/assets/projects/moro.webp"
                alt="Edificio inmobiliario ANCOSUR"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.cardImage}
              />
            </div>

            <article className={`${styles.statCard} ${styles.blackCard}`}>
              <strong>9</strong>
              <span>proyectos en ejecución</span>
            </article>
          </div>
        </section>

        <section className={styles.formSection} id="formulario">
          <div className={styles.formContent}>
            <span>Comienza a invertir</span>
            <h2>Déjanos tus datos y te contactaremos</h2>

            <form className={styles.form} action="/api/leads" method="post">
              <input type="hidden" name="source" value="pagina-inversionistas" />

              <div className={styles.formGrid}>
                <label>
                  Nombres y apellidos
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Ej. Angela Huayra"
                    required
                  />
                </label>

                <label>
                  Correo electrónico
                  <input
                    type="email"
                    name="email"
                    placeholder="Ej. correo@gmail.com"
                    required
                  />
                </label>

                <label>
                  Celular
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ej. 987654321"
                    inputMode="numeric"
                    required
                  />
                </label>

                <label>
                  Monto de inversión
                  <select name="investmentAmount" required defaultValue="">
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="Desde S/ 20,000">Desde S/ 20,000</option>
                    <option value="Desde S/ 50,000">Desde S/ 50,000</option>
                    <option value="Desde S/ 100,000">Desde S/ 100,000</option>
                    <option value="Deseo asesoría personalizada">
                      Deseo asesoría personalizada
                    </option>
                  </select>
                </label>

                <label className={styles.fullField}>
                  Mensaje
                  <textarea
                    name="message"
                    placeholder="Cuéntanos qué tipo de inversión estás buscando"
                  />
                </label>
              </div>

              <button type="submit">Enviar mensaje</button>
            </form>
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
        </section>
      </main>

      <Footer />
    </>
  );
}