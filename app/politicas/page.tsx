import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { policies } from "@/data/policies";
import styles from "./PoliticasPage.module.css";

export const metadata = {
  title: "Políticas | ANCOSUR Inmobiliaria",
  description:
    "Consulta las políticas, términos, condiciones y documentos del Sistema Integrado de Gestión de ANCOSUR Inmobiliaria.",
};

export default function PoliticasPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            
            <span>Documentos ANCOSUR</span>
            <h1>Políticas y documentos corporativos</h1>
            <p>
              Revisa nuestras políticas, términos, condiciones y documentos
              relacionados con la gestión, privacidad y uso de nuestros canales.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.header}>
            <span>Información oficial</span>
            <h2>Selecciona el documento que deseas consultar</h2>
          </div>

          <div className={styles.grid}>
            {policies.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.card} ${
                  item.featured ? styles.featured : ""
                }`}
              >
                <span>{String(item.id).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>Ver documento</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}