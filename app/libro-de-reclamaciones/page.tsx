import ReclamoForm from "./components/ReclamoForm";
import styles from "./page.module.css";

export default function LibroReclamacionesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>ATENCIÓN AL CLIENTE</span>

          <h1>Libro de Reclamaciones</h1>

          <p>
            Registra tu reclamo o queja. Completa los datos solicitados para
            que podamos atender tu solicitud correctamente.
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <ReclamoForm />
        </div>
      </section>
    </main>
  );
}